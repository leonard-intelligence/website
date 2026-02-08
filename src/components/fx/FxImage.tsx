/**
 * FxImage Component
 * WebGL-based image effect renderer for Beads + Duotone
 * Applies effects with uniform screen-space bead size
 */

import { useEffect, useRef, useState, useCallback, useMemo, useContext, type CSSProperties } from 'react';
import type { FxConfig } from './fxConfig';
import { hexToRgb } from './fxConfig';
import { useFxConfig, FxContext } from './FxContext';

// Detect mobile/low-end devices to disable WebGL
const isMobileDevice = typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches || navigator.maxTouchPoints > 0);

// Throttle interval for desktop RAF loop (target ~30fps)
const FRAME_INTERVAL = 1000 / 30;

// Lazy-loaded shader cache to avoid bloating the initial JS bundle
let _shaderCache: { VERTEX_SHADER: string; FRAGMENT_SHADER: string } | null = null;
async function loadShaders() {
    if (_shaderCache) return _shaderCache;
    const mod = await import('./shaders/fxShaders');
    _shaderCache = { VERTEX_SHADER: mod.VERTEX_SHADER, FRAGMENT_SHADER: mod.FRAGMENT_SHADER };
    return _shaderCache;
}

// Interface for click ripples
export interface ClickRipple {
    x: number; // normalized 0-1
    y: number; // normalized 0-1
    startTime: number; // performance.now() when clicked
}

interface FxImageProps {
    src: string;
    depthSrc?: string; // New: Optional depth map source
    alt?: string;
    className?: string;
    config?: Partial<FxConfig>;
    style?: CSSProperties; // Container style
    imgStyle?: CSSProperties; // Inner Image style override
    clickRipples?: ClickRipple[]; // New: Click ripples for expanding zoom effect
    loading?: 'lazy' | 'eager';
    fetchPriority?: 'high' | 'low' | 'auto';
}

interface WebGLState {
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    texture: WebGLTexture;
    depthTexture?: WebGLTexture | null; // New
    uniforms: Record<string, WebGLUniformLocation | null>;
    colorState?: { cA: number[]; cB: number[] };
}

/**
 * Compile a WebGL shader
 */
function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/**
 * Create WebGL program from vertex and fragment shaders (loaded dynamically)
 */
function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram | null {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

/**
 * Setup fullscreen quad geometry
 */
function setupQuad(gl: WebGLRenderingContext, program: WebGLProgram) {
    // Position buffer (clip space coordinates)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Texture coordinate buffer
    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const texLoc = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
}

export function FxImage({
    src,
    depthSrc,
    alt = '',
    className = '',
    config,
    style,
    imgStyle,
    clickRipples = [],
    loading = 'lazy',
    fetchPriority,
}: FxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const imgRef = useRef<HTMLImageElement>(null);
    const depthImgRef = useRef<HTMLImageElement>(null); // New
    const webglRef = useRef<WebGLState | null>(null);
    // Remove local mouseRef, we will use the one from context (or pass it in render loop)

    const [imageLoaded, setImageLoaded] = useState(false);
    const [depthLoaded, setDepthLoaded] = useState(false); // New
    const [webglSupported, setWebglSupported] = useState(true);
    const [webglReady, setWebglReady] = useState(false); // Prevents white flash during shader compilation

    const context = useContext(FxContext);
    // We need the mouseRef from context
    const globalMouseRef = context?.mouseRef;

    // Get global config from context
    const contextConfig = useFxConfig();

    // Merge: context config (from debug panel) + explicit prop overrides
    const mergedConfig: FxConfig = useMemo(
        () => ({
            ...contextConfig,
            ...config,
            order: config?.order || contextConfig.order || ['beads', 'glassBeads', 'duotone'],
            beads: { ...contextConfig.beads, ...config?.beads },
            glassBeads: { ...contextConfig.glassBeads, ...config?.glassBeads },
            duotone: { ...contextConfig.duotone, ...config?.duotone },
            hover: { ...contextConfig.hover, ...config?.hover },
            interaction: { ...contextConfig.interaction, ...config?.interaction },
        }),
        [contextConfig, config]
    );

    /**
     * Initialize WebGL context and program
     */

    // State for smooth transitions
    const shapeValueRef = useRef(0); // 0 = circle, 1 = square

    // Ref to hold latest config for the animation loop
    const configRef = useRef(mergedConfig);

    // Update ref when config changes
    useEffect(() => {
        configRef.current = mergedConfig;
    }, [mergedConfig]);

    // Animation Frame ID ref
    const requestRef = useRef<number>(0);

    // Throttle: track last frame time for 30fps cap
    const lastFrameTimeRef = useRef<number>(0);

    // Visibility tracking for animation pause (performance optimization)
    const isInViewportRef = useRef(false);

    // Ref to track webglReady for closure in render callback
    const webglReadyRef = useRef(false);

    /**
     * Render the effect (throttled to ~30fps on desktop)
     */
    const render = useCallback(() => {
        const webgl = webglRef.current;
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!webgl || !canvas || !img) return;

        // Throttle to ~30fps to reduce TBT
        const now = performance.now();
        if (now - lastFrameTimeRef.current < FRAME_INTERVAL) {
            if (isInViewportRef.current) {
                requestRef.current = requestAnimationFrame(render);
            }
            return;
        }
        lastFrameTimeRef.current = now;

        // ALWAYS READ FROM REF inside the loop
        const currentConfig = configRef.current;

        const { gl, uniforms, texture, depthTexture } = webgl;
        const dpr = Math.min(window.devicePixelRatio, 2);

        // ... resizing logic ...
        // Set canvas size to match container
        const rect = canvas.getBoundingClientRect();
        const width = rect.width * dpr;
        const height = rect.height * dpr;

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        gl.viewport(0, 0, width, height);

        const containerAspect = width / height;
        const imageAspect = (img.naturalWidth || width) / (img.naturalHeight || height);

        const orderMap: Record<string, number> = { beads: 1, duotone: 2 };
        const orderInts = (currentConfig.order || ['beads', 'duotone'])
            .map((id) => orderMap[id] || 0)
            .concat([0, 0, 0])
            .slice(0, 3);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(uniforms.u_image, 0);

        if (depthTexture) {
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.uniform1i(uniforms.u_depthMap, 1);
            gl.uniform1i(uniforms.u_hasDepth, 1);
        } else {
            gl.uniform1i(uniforms.u_hasDepth, 0);
        }

        gl.uniform1i(uniforms.u_useLuminanceAsDepth, currentConfig.interaction?.auto?.useLuminanceAsDepth ? 1 : 0);

        gl.uniform2f(uniforms.u_resolution, width, height);
        gl.uniform1f(uniforms.u_dpr, dpr);
        gl.uniform1f(uniforms.u_time, performance.now() / 1000);

        const mouse = globalMouseRef?.current || { x: -1, y: -1 };
        const mx = (mouse.x - rect.left) / rect.width;
        const my = (mouse.y - rect.top) / rect.height;
        gl.uniform2f(uniforms.u_mouse, mx, my);

        const modeMap: Record<string, number> = { none: 0, reveal: 1, shape: 2 };
        const mode = currentConfig.interaction?.enabled ? modeMap[currentConfig.interaction?.mode] || 0 : 0;
        gl.uniform1i(uniforms.u_interMode, mode);
        const variant = currentConfig.interaction?.variant === 'push' ? 1 : 0;
        gl.uniform1i(uniforms.u_interVariant, variant);
        gl.uniform1f(uniforms.u_interRadius, currentConfig.interaction?.radius || 0.15);
        gl.uniform1f(uniforms.u_interSoftness, currentConfig.interaction?.softness || 0.5);
        gl.uniform1f(uniforms.u_interActiveSize, currentConfig.interaction?.activeSize || 12.0);

        // Auto Interaction Uniforms
        const auto = currentConfig.interaction?.auto;
        let autoTypeInt = 0;
        if (auto?.type === 'noise') autoTypeInt = 1;
        else if (auto?.type === 'pulse') autoTypeInt = 2;
        else if (auto?.type === 'spiral') autoTypeInt = 3;
        else if (auto?.type === 'glitch') autoTypeInt = 4;
        else if (auto?.type === 'net') autoTypeInt = 5;
        else if (auto?.type === 'liquid') autoTypeInt = 6;
        else if (auto?.type === 'circuit') autoTypeInt = 7;
        else if (auto?.type === 'matrix') autoTypeInt = 8;
        else if (auto?.type === 'scanline') autoTypeInt = 9;
        else if (auto?.type === 'aurora') autoTypeInt = 10;
        else if (auto?.type === 'solar') autoTypeInt = 11;
        else if (auto?.type === 'hex') autoTypeInt = 12;
        else if (auto?.type === 'blueprint') autoTypeInt = 13;
        else if (auto?.type === 'stream') autoTypeInt = 14;
        else if (auto?.type === 'rain') autoTypeInt = 15;

        gl.uniform1i(uniforms.u_autoEnabled, auto?.enabled ? 1 : 0);
        gl.uniform1i(uniforms.u_autoType, autoTypeInt);
        gl.uniform1f(uniforms.u_autoSpeed, auto?.speed ?? 0.5);
        gl.uniform1f(uniforms.u_autoScale, auto?.scale ?? 1.0);
        gl.uniform1f(uniforms.u_autoStrength, auto?.strength ?? 0.5);
        gl.uniform1f(uniforms.u_autoDepthSpeed, auto?.depthSpeed ?? 3.0);
        gl.uniform1f(uniforms.u_autoDepthBrightness, auto?.depthBrightness ?? 0.8);
        gl.uniform1i(uniforms.u_autoDuotone, auto?.duotoneModulation ? 1 : 0);

        // Rain-specific uniforms
        const rain = auto?.rain;
        gl.uniform1f(uniforms.u_rainDropSpeed, rain?.dropSpeed ?? 0.5);
        gl.uniform1f(uniforms.u_rainDensity, rain?.density ?? 20.0);
        gl.uniform1f(uniforms.u_rainSurfaceDepth, rain?.surfaceDepth ?? 0.5);
        gl.uniform1f(uniforms.u_rippleSpeed, rain?.rippleSpeed ?? 0.5);
        gl.uniform1f(uniforms.u_rippleDecay, rain?.rippleDecay ?? 3.0);
        gl.uniform1f(uniforms.u_rippleStrength, rain?.rippleStrength ?? 0.8);

        // Click Ripples - pass up to 4 ripples to shader
        const rippleNow = performance.now();
        const rippleTimes = [0, 0, 0, 0];
        const ripplePos = [0, 0, 0, 0]; // x1, y1, x2, y2 for first 2 ripples
        const ripplePos2 = [0, 0, 0, 0]; // x3, y3, x4, y4 for ripples 3-4

        // Get the last 4 ripples (most recent)
        const recentRipples = clickRipples.slice(-4);
        recentRipples.forEach((ripple, i) => {
            const elapsed = (rippleNow - ripple.startTime) / 1000; // seconds
            rippleTimes[i] = elapsed;
            if (i < 2) {
                ripplePos[i * 2] = ripple.x;
                ripplePos[i * 2 + 1] = ripple.y;
            } else {
                ripplePos2[(i - 2) * 2] = ripple.x;
                ripplePos2[(i - 2) * 2 + 1] = ripple.y;
            }
        });

        gl.uniform4f(uniforms.u_clickRipplePos, ripplePos[0], ripplePos[1], ripplePos[2], ripplePos[3]);
        gl.uniform4f(uniforms.u_clickRipplePos2, ripplePos2[0], ripplePos2[1], ripplePos2[2], ripplePos2[3]);
        gl.uniform4f(uniforms.u_clickRippleTime, rippleTimes[0], rippleTimes[1], rippleTimes[2], rippleTimes[3]);
        gl.uniform1f(uniforms.u_clickRippleSpeed, 0.5); // Expansion speed (slower = more visible)
        gl.uniform1f(uniforms.u_clickRippleDecay, 0.8); // Decay rate (lower = lasts longer)

        const autoColor = hexToRgb(auto?.modulationColor || '#60a5fa');
        gl.uniform3f(uniforms.u_autoColor, autoColor[0], autoColor[1], autoColor[2]);

        // Default second color to first color if not set (flat tint), or maybe default to white?
        // Let's default to first color to keep backwards compatibility with "flat tint" if user ignores second picker.
        const autoColor2 = hexToRgb(auto?.modulationColor2 || auto?.modulationColor || '#60a5fa');
        gl.uniform3f(uniforms.u_autoColor2, autoColor2[0], autoColor2[1], autoColor2[2]);

        gl.uniform1f(uniforms.u_containerAspect, containerAspect);
        gl.uniform1f(uniforms.u_imageAspect, imageAspect);

        // Fit Mode: 0 = Cover, 1 = Height, 2 = Contain
        let fitInt = 0;
        if (currentConfig.fitMode === 'height') fitInt = 1;
        else if (currentConfig.fitMode === 'contain') fitInt = 2;
        gl.uniform1i(uniforms.u_fitMode, fitInt);

        // Calculate Object Position from imgStyle
        let objPosX = 0.5;
        let objPosY = 0.5;

        if (imgStyle?.objectPosition) {
            const posStr = String(imgStyle.objectPosition).toLowerCase();
            const parts = posStr.split(' ').filter((p) => p.trim() !== '');

            // Helper to parse keywords
            const parsePos = (val: string, isX: boolean) => {
                if (val === 'center') return 0.5;
                if (isX) {
                    if (val === 'left') return 0.0;
                    if (val === 'right') return 1.0;
                } else {
                    if (val === 'top') return 0.0;
                    if (val === 'bottom') return 1.0;
                }
                if (val.endsWith('%')) return parseFloat(val) / 100;
                return null; // No match for this axis
            };

            // Identify which part is X and which is Y
            parts.forEach((p) => {
                const xVal = parsePos(p, true);
                const yVal = parsePos(p, false);

                // If it's explicitly a Y keyword
                if (['top', 'bottom'].includes(p)) objPosY = yVal ?? objPosY;
                // If it's explicitly an X keyword
                else if (['left', 'right'].includes(p)) objPosX = xVal ?? objPosX;
                // If it's a percentage or center, assign based on first-available
                else {
                    if (p === 'center') {
                        /* already default 0.5 */
                    } else if (p.endsWith('%')) {
                        // First numeric value is X in CSS unless specified
                        // Simple heuristic for now
                        if (parts.indexOf(p) === 0) objPosX = xVal ?? objPosX;
                        else objPosY = yVal ?? objPosY;
                    }
                }
            });
        }
        gl.uniform2f(uniforms.u_objectPosition, objPosX, objPosY);

        gl.uniform1iv(uniforms.u_order, orderInts);

        gl.uniform1i(uniforms.u_beadsEnabled, currentConfig.beads.enabled ? 1 : 0);
        gl.uniform1f(uniforms.u_beadSize, currentConfig.beads.sizePx);
        gl.uniform1f(uniforms.u_beadSoftness, currentConfig.beads.softness);
        gl.uniform1f(uniforms.u_beadStrength, currentConfig.beads.strength);

        // Smooth Morphing Logic
        // Smooth Morphing Logic for Shape
        const targetShape = currentConfig.beads.shape === 'square' ? 1.0 : 0.0;
        const speed = 0.1;
        shapeValueRef.current += (targetShape - shapeValueRef.current) * speed;
        gl.uniform1f(uniforms.u_beadShape, shapeValueRef.current);

        // Smooth Morphin Logic for Colors (Duotone)
        // We need refs for current color values to lerp them
        if (!webgl.colorState) {
            webgl.colorState = {
                cA: hexToRgb(currentConfig.duotone.colorA),
                cB: hexToRgb(currentConfig.duotone.colorB),
            };
        }

        const targetCA = hexToRgb(currentConfig.duotone.colorA);
        const targetCB = hexToRgb(currentConfig.duotone.colorB);

        // Simple Lerp Vector3
        const lerp3 = (a: number[], b: number[], t: number) => [
            a[0] + (b[0] - a[0]) * t,
            a[1] + (b[1] - a[1]) * t,
            a[2] + (b[2] - a[2]) * t,
        ];

        webgl.colorState.cA = lerp3(webgl.colorState.cA, targetCA, 0.1);
        webgl.colorState.cB = lerp3(webgl.colorState.cB, targetCB, 0.1);

        gl.uniform1i(uniforms.u_duotoneEnabled, currentConfig.duotone.enabled ? 1 : 0);
        gl.uniform3f(uniforms.u_colorA, webgl.colorState.cA[0], webgl.colorState.cA[1], webgl.colorState.cA[2]);
        gl.uniform3f(uniforms.u_colorB, webgl.colorState.cB[0], webgl.colorState.cB[1], webgl.colorState.cB[2]);
        gl.uniform1f(uniforms.u_duotoneStrength, currentConfig.duotone.strength);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Mark WebGL as ready after first successful draw (prevents white flash)
        if (!webglReadyRef.current) {
            webglReadyRef.current = true;
            setWebglReady(true);
        }

        // Only continue loop if visible in viewport (performance optimization)
        if (isInViewportRef.current) {
            requestRef.current = requestAnimationFrame(render);
        } else {
            // Reset ref so loop can be restarted when visible again
            requestRef.current = 0;
        }
    }, []); // Check deps: empty array means render is stable. Reading configRef.current is safe.

    /**
     * Initialize WebGL context and program
     */
    const initWebGL = useCallback(async () => {
        const canvas = canvasRef.current;

        const img = imgRef.current;
        const depthImg = depthImgRef.current;
        // If depthSrc is provided, wait for it to load too
        if (!canvas || !img || !imageLoaded) return;
        if (depthSrc && !depthLoaded) return;

        const gl = canvas.getContext('webgl', {
            premultipliedAlpha: false,
            preserveDrawingBuffer: false, // optimizing memory
        });
        if (!gl) {
            console.warn('WebGL not supported, falling back to original image');
            setWebglSupported(false);
            return;
        }

        // Handle Context Lost/Restored
        const handleContextLost = (e: Event) => {
            e.preventDefault();
            console.log('WebGL Context Lost', src);
        };

        const handleContextRestored = () => {
            console.log('WebGL Context Restored', src);
            setImageLoaded(false);
            setTimeout(() => setImageLoaded(true), 10);
        };

        canvas.addEventListener('webglcontextlost', handleContextLost, false);
        canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

        // Load shaders dynamically (deferred from initial bundle)
        const shaders = await loadShaders();
        const program = createProgram(gl, shaders.VERTEX_SHADER, shaders.FRAGMENT_SHADER);
        if (!program) {
            setWebglSupported(false);
            return;
        }

        gl.useProgram(program);
        setupQuad(gl, program);

        // Create and configure texture
        const texture = gl.createTexture();
        if (!texture) {
            setWebglSupported(false);
            return;
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        // Create Depth Texture if available
        let depthTexture: WebGLTexture | null = null;
        if (depthSrc && depthImg) {
            depthTexture = gl.createTexture();
            if (depthTexture) {
                gl.bindTexture(gl.TEXTURE_2D, depthTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, depthImg);
            }
        }

        const uniforms = {
            u_image: gl.getUniformLocation(program, 'u_image'),
            u_depthMap: gl.getUniformLocation(program, 'u_depthMap'), // New
            u_hasDepth: gl.getUniformLocation(program, 'u_hasDepth'), // New
            u_useLuminanceAsDepth: gl.getUniformLocation(program, 'u_useLuminanceAsDepth'), // New
            u_resolution: gl.getUniformLocation(program, 'u_resolution'),
            u_dpr: gl.getUniformLocation(program, 'u_dpr'),
            u_time: gl.getUniformLocation(program, 'u_time'),
            u_containerAspect: gl.getUniformLocation(program, 'u_containerAspect'),
            u_imageAspect: gl.getUniformLocation(program, 'u_imageAspect'),
            u_objectPosition: gl.getUniformLocation(program, 'u_objectPosition'),
            u_fitMode: gl.getUniformLocation(program, 'u_fitMode'),
            u_order: gl.getUniformLocation(program, 'u_order'),
            // Mouse Interaction
            u_mouse: gl.getUniformLocation(program, 'u_mouse'),
            u_interMode: gl.getUniformLocation(program, 'u_interMode'), // 0=none, 1=reveal, 2=shape
            u_interVariant: gl.getUniformLocation(program, 'u_interVariant'), // 0=overlap, 1=push
            u_interRadius: gl.getUniformLocation(program, 'u_interRadius'),
            u_interSoftness: gl.getUniformLocation(program, 'u_interSoftness'),
            u_interActiveSize: gl.getUniformLocation(program, 'u_interActiveSize'),
            // Auto
            u_autoEnabled: gl.getUniformLocation(program, 'u_autoEnabled'),
            u_autoType: gl.getUniformLocation(program, 'u_autoType'),
            u_autoSpeed: gl.getUniformLocation(program, 'u_autoSpeed'),
            u_autoScale: gl.getUniformLocation(program, 'u_autoScale'),
            u_autoStrength: gl.getUniformLocation(program, 'u_autoStrength'),
            u_autoDepthSpeed: gl.getUniformLocation(program, 'u_autoDepthSpeed'),
            u_autoDepthBrightness: gl.getUniformLocation(program, 'u_autoDepthBrightness'),
            u_autoDuotone: gl.getUniformLocation(program, 'u_autoDuotone'),
            u_autoColor: gl.getUniformLocation(program, 'u_autoColor'),
            u_autoColor2: gl.getUniformLocation(program, 'u_autoColor2'),
            // Rain
            u_rainDropSpeed: gl.getUniformLocation(program, 'u_rainDropSpeed'),
            u_rainDensity: gl.getUniformLocation(program, 'u_rainDensity'),
            u_rainSurfaceDepth: gl.getUniformLocation(program, 'u_rainSurfaceDepth'),
            u_rippleSpeed: gl.getUniformLocation(program, 'u_rippleSpeed'),
            u_rippleDecay: gl.getUniformLocation(program, 'u_rippleDecay'),
            u_rippleStrength: gl.getUniformLocation(program, 'u_rippleStrength'),
            // Beads
            u_beadsEnabled: gl.getUniformLocation(program, 'u_beadsEnabled'),
            u_beadSize: gl.getUniformLocation(program, 'u_beadSize'),
            u_beadSoftness: gl.getUniformLocation(program, 'u_beadSoftness'),
            u_beadStrength: gl.getUniformLocation(program, 'u_beadStrength'),
            u_beadShape: gl.getUniformLocation(program, 'u_beadShape'),
            // Duotone
            u_duotoneEnabled: gl.getUniformLocation(program, 'u_duotoneEnabled'),
            u_colorA: gl.getUniformLocation(program, 'u_colorA'),
            u_colorB: gl.getUniformLocation(program, 'u_colorB'),
            u_duotoneStrength: gl.getUniformLocation(program, 'u_duotoneStrength'),
            // Click Ripples
            u_clickRipplePos: gl.getUniformLocation(program, 'u_clickRipplePos'),
            u_clickRipplePos2: gl.getUniformLocation(program, 'u_clickRipplePos2'),
            u_clickRippleTime: gl.getUniformLocation(program, 'u_clickRippleTime'),
            u_clickRippleSpeed: gl.getUniformLocation(program, 'u_clickRippleSpeed'),
            u_clickRippleDecay: gl.getUniformLocation(program, 'u_clickRippleDecay'),
        };

        webglRef.current = { gl, program, texture, depthTexture, uniforms };

        render();
    }, [imageLoaded, depthLoaded, depthSrc, render, src]);

    /**
     * Handle image load
     */
    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    // Reset state when src changes
    useEffect(() => {
        setImageLoaded(false);
        setDepthLoaded(false);
        setWebglSupported(true); // Retry WebGL for new image
        setWebglReady(false); // Reset ready state for new image
        webglReadyRef.current = false; // Reset ref too
    }, [src, depthSrc]);

    // Check if effects should be applied
    // Disable WebGL for GIFs to allow animation, and on mobile devices for performance
    const isGif = src.toLowerCase().endsWith('.gif');
    const effectsActive = mergedConfig.enabled && webglSupported && !isGif && !isMobileDevice;

    const [isVisible, setIsVisible] = useState(false);

    // Visibility Observer (Lazy Init + Animation Pause)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Update viewport ref for animation loop control
                    isInViewportRef.current = entry.isIntersecting;

                    // Dynamic visibility: Create/Destroy context based on viewport
                    // This prevents "Too Many WebGL Contexts" error on pages with many FX images
                    setIsVisible(entry.isIntersecting);

                    // No need to manually restart loop here; initWebGL effect will trigger
                    // when isVisible becomes true and component mounts canvas.
                });
            },
            { threshold: 0.0, rootMargin: '200px' }
        ); // Load 200px before appearing

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    /**
     * Initialize WebGL when image loads and is visible
     */
    useEffect(() => {
        if (imageLoaded && effectsActive && isVisible) {
            // Defer WebGL init (shader compilation) to idle time to avoid blocking main thread TBT
            const rIC = typeof requestIdleCallback === 'function'
                ? requestIdleCallback
                : (cb: IdleRequestCallback, _opts?: IdleRequestOptions) => setTimeout(cb as unknown as () => void, 1) as unknown as number;
            const id = rIC(() => initWebGL(), { timeout: 3000 });
            const cancel = typeof cancelIdleCallback === 'function' ? cancelIdleCallback : clearTimeout;
            return () => {
                cancel(id);
                const gl = webglRef.current?.gl;
                if (gl) {
                    gl.bindTexture(gl.TEXTURE_2D, null);
                    gl.useProgram(null);
                }
                webglRef.current = null;
            };
        }

        // Cleanup
        return () => {
            const gl = webglRef.current?.gl;
            if (gl) {
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.useProgram(null);
            }
            webglRef.current = null;
        };
    }, [imageLoaded, depthLoaded, effectsActive, isVisible, initWebGL]);

    /**
     * Re-render when config changes
     */
    useEffect(() => {
        if (webglRef.current && isVisible) {
            // Cancel any existing frame to prevent double loops
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            requestRef.current = requestAnimationFrame(render);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [render, webglSupported, imageLoaded, isVisible, mergedConfig]);

    /**
     * Handle resize
     */
    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (webglRef.current && isVisible) {
                render();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [render, isVisible]);

    // Handle Global Mouse - REMOVED (Centralized in FxProvider)

    return (
        <div
            ref={containerRef}
            className={`fx-image-container ${className}`}
            style={{ position: 'relative', display: 'inline-block', ...style }}
            // Events removed here as we track window globally for background support
        >
            {/* Source image - always visible when effects disabled OR when canvas is hidden (e.g. out of viewport), hidden when effects active AND visible */}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                crossOrigin="anonymous"
                onLoad={handleImageLoad}
                loading={loading}
                fetchPriority={fetchPriority}
                decoding="async"
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    // Hide image only after WebGL canvas has rendered first frame (prevents white flash during shader compilation)
                    visibility: (effectsActive && webglReady) ? 'hidden' : 'visible',
                    // On mobile, simulate duotone with CSS grayscale when WebGL is disabled
                    filter: isMobileDevice && mergedConfig.duotone?.enabled ? 'grayscale(1)' : undefined,
                    pointerEvents: 'none', // Allow clicks to pass through to parent container
                    ...imgStyle,
                }}
            />

            {/* Hidden Depth Image loader */}
            {depthSrc && (
                <img
                    ref={depthImgRef}
                    src={depthSrc}
                    alt=""
                    crossOrigin="anonymous"
                    onLoad={() => setDepthLoaded(true)}
                    style={{ display: 'none' }}
                />
            )}

            {/* WebGL canvas overlay - only show when effects are active AND visible */}
            {effectsActive && imageLoaded && isVisible && (
                <canvas
                    ref={canvasRef}
                    className="fx-image-canvas"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
}

export default FxImage;
