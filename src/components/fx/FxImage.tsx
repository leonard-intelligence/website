/**
 * FxImage Component
 * WebGL-based image effect renderer for Beads + Duotone
 * Applies effects with uniform screen-space bead size
 */

import { useEffect, useRef, useState, useCallback, useMemo, type CSSProperties } from 'react';
import type { FxConfig } from './fxConfig';
import { hexToRgb } from './fxConfig';
import { useFxConfig } from './FxContext';
import { VERTEX_SHADER, FRAGMENT_SHADER } from './shaders/fxShaders';

interface FxImageProps {
    src: string;
    depthSrc?: string; // New: Optional depth map source
    alt?: string;
    className?: string;
    config?: Partial<FxConfig>;
    style?: CSSProperties; // Container style
    imgStyle?: CSSProperties; // Inner Image style override
}

interface WebGLState {
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    texture: WebGLTexture;
    depthTexture?: WebGLTexture | null; // New
    uniforms: Record<string, WebGLUniformLocation | null>;
    colorState?: { cA: number[], cB: number[] };
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
 * Create WebGL program from vertex and fragment shaders
 */
function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

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
    const positions = new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        1, 1,
    ]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Texture coordinate buffer
    const texCoords = new Float32Array([
        0, 1,
        1, 1,
        0, 0,
        1, 0,
    ]);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const texLoc = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
}

export function FxImage({ src, depthSrc, alt = '', className = '', config, style, imgStyle }: FxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const imgRef = useRef<HTMLImageElement>(null);
    const depthImgRef = useRef<HTMLImageElement>(null); // New
    const webglRef = useRef<WebGLState | null>(null);
    const mouseRef = useRef<{ x: number, y: number } | null>(null);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [depthLoaded, setDepthLoaded] = useState(false); // New
    const [webglSupported, setWebglSupported] = useState(true);

    // Get global config from context
    const contextConfig = useFxConfig();

    // Merge: context config (from debug panel) + explicit prop overrides
    const mergedConfig: FxConfig = useMemo(() => ({
        ...contextConfig,
        ...config,
        order: config?.order || contextConfig.order || ['beads', 'glassBeads', 'duotone'],
        beads: { ...contextConfig.beads, ...config?.beads },
        glassBeads: { ...contextConfig.glassBeads, ...config?.glassBeads },
        duotone: { ...contextConfig.duotone, ...config?.duotone },
        hover: { ...contextConfig.hover, ...config?.hover },
        interaction: { ...contextConfig.interaction, ...config?.interaction },
    }), [contextConfig, config]);

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

    // Visibility tracking for animation pause (performance optimization)
    const isInViewportRef = useRef(false);

    /**
     * Render the effect
     */
    const render = useCallback(() => {
        const webgl = webglRef.current;
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!webgl || !canvas || !img) return;

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

        const orderMap: Record<string, number> = { 'beads': 1, 'duotone': 2 };
        const orderInts = (currentConfig.order || ['beads', 'duotone'])
            .map(id => orderMap[id] || 0)
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

        const mouse = mouseRef.current || { x: -1, y: -1 };
        const mx = (mouse.x - rect.left) / rect.width;
        const my = (mouse.y - rect.top) / rect.height;
        gl.uniform2f(uniforms.u_mouse, mx, my);

        const modeMap: Record<string, number> = { 'none': 0, 'reveal': 1, 'shape': 2 };
        const mode = currentConfig.interaction?.enabled ? (modeMap[currentConfig.interaction?.mode] || 0) : 0;
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

        const autoColor = hexToRgb(auto?.modulationColor || '#60a5fa');
        gl.uniform3f(uniforms.u_autoColor, autoColor[0], autoColor[1], autoColor[2]);

        // Default second color to first color if not set (flat tint), or maybe default to white?
        // Let's default to first color to keep backwards compatibility with "flat tint" if user ignores second picker.
        const autoColor2 = hexToRgb(auto?.modulationColor2 || auto?.modulationColor || '#60a5fa');
        gl.uniform3f(uniforms.u_autoColor2, autoColor2[0], autoColor2[1], autoColor2[2]);

        gl.uniform1f(uniforms.u_containerAspect, containerAspect);
        gl.uniform1f(uniforms.u_imageAspect, imageAspect);
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
                cB: hexToRgb(currentConfig.duotone.colorB)
            };
        }

        const targetCA = hexToRgb(currentConfig.duotone.colorA);
        const targetCB = hexToRgb(currentConfig.duotone.colorB);

        // Simple Lerp Vector3
        const lerp3 = (a: number[], b: number[], t: number) => [
            a[0] + (b[0] - a[0]) * t,
            a[1] + (b[1] - a[1]) * t,
            a[2] + (b[2] - a[2]) * t
        ];

        webgl.colorState.cA = lerp3(webgl.colorState.cA, targetCA, 0.1);
        webgl.colorState.cB = lerp3(webgl.colorState.cB, targetCB, 0.1);

        gl.uniform1i(uniforms.u_duotoneEnabled, currentConfig.duotone.enabled ? 1 : 0);
        gl.uniform3f(uniforms.u_colorA, webgl.colorState.cA[0], webgl.colorState.cA[1], webgl.colorState.cA[2]);
        gl.uniform3f(uniforms.u_colorB, webgl.colorState.cB[0], webgl.colorState.cB[1], webgl.colorState.cB[2]);
        gl.uniform1f(uniforms.u_duotoneStrength, currentConfig.duotone.strength);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

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
    const initWebGL = useCallback(() => {
        const canvas = canvasRef.current;

        const img = imgRef.current;
        const depthImg = depthImgRef.current;
        // If depthSrc is provided, wait for it to load too
        if (!canvas || !img || !imageLoaded) return;
        if (depthSrc && !depthLoaded) return;

        const gl = canvas.getContext('webgl', {
            premultipliedAlpha: false,
            preserveDrawingBuffer: false // optimizing memory
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
            // Animation frame usage will stop naturally as webglRef is likely invalidated or checking gl.isContextLost()
        };

        const handleContextRestored = () => {
            // initWebGL depends on definition of initWebGL - hoisting of function expression issues?
            // Actually, initWebGL is a const, so we cannot reference it inside itself unless it's defined.
            // But we can reference a container or use a mutable ref for the recursive call in restore.
            // Let's rely on React state/effects to re-trigger if needed, or just warn.
            console.log('WebGL Context Restored', src);
            // Since initWebGL is a callback, it might be stale or not hoisted. 
            // Ideally we should just set a state that triggers the effect again.
            setImageLoaded(false); setTimeout(() => setImageLoaded(true), 10);
        };

        canvas.addEventListener('webglcontextlost', handleContextLost, false);
        canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

        const program = createProgram(gl);
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
    }, [src, depthSrc]);

    // Check if effects should be applied
    // Disable WebGL for GIFs to allow animation
    const isGif = src.toLowerCase().endsWith('.gif');
    const effectsActive = mergedConfig.enabled && webglSupported && !isGif;

    const [isVisible, setIsVisible] = useState(false);

    // Visibility Observer (Lazy Init + Animation Pause)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Update viewport ref for animation loop control
                isInViewportRef.current = entry.isIntersecting;

                if (entry.isIntersecting) {
                    // First time visible: trigger lazy init
                    if (!isVisible) {
                        setIsVisible(true);
                    }
                    // Restart animation loop if WebGL is ready
                    if (webglRef.current && !requestRef.current) {
                        requestRef.current = requestAnimationFrame(render);
                    }
                }
            });
        }, { threshold: 0.01 }); // Trigger when even 1% visible

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible, render]);

    /**
     * Initialize WebGL when image loads and is visible
     */
    useEffect(() => {
        if (imageLoaded && effectsActive && isVisible) {
            initWebGL();
        }

        // Cleanup
        return () => {
            // We rely on Garbage Collection for the context. 
            // Explicitly losing context can cause issues if the canvas is reused or rapidly remounted.
            const gl = webglRef.current?.gl;
            // Unbind textures to help GC
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
        if (webglRef.current) {
            // Cancel any existing frame to prevent double loops
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            requestRef.current = requestAnimationFrame(render);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [render, webglSupported, imageLoaded]);

    /**
     * Handle resize
     */
    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (webglRef.current) {
                render();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [render]);

    // Handle Global Mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        // We don't strictly need mouseleave for window, 
        // as the shader distance check handles 'out of bounds' naturally.

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`fx-image-container ${className}`}
            style={{ position: 'relative', display: 'inline-block', ...style }}
        // Events removed here as we track window globally for background support
        >
            {/* Source image - always visible when effects disabled, hidden when effects active */}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                crossOrigin="anonymous"
                onLoad={handleImageLoad}
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    visibility: (effectsActive && imageLoaded) ? 'hidden' : 'visible',
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

            {/* WebGL canvas overlay - only show when effects are active */}
            {effectsActive && imageLoaded && (
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
