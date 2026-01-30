import { GLSL_UTILS } from './shaderUtils';

// Vertex Shader - Simple fullscreen quad
export const VERTEX_SHADER = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
}
`;

// Fragment Shader - Combined Advanced Effects
export const FRAGMENT_SHADER = `
${GLSL_UTILS}

varying vec2 v_texCoord;

uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform float u_dpr;
uniform float u_time;

// Aspect Ratio Uniforms
uniform float u_containerAspect; // width / height of container
uniform float u_imageAspect;     // width / height of image
uniform vec2 u_objectPosition;   // (0.0=Top/Left, 0.5=Center, 1.0=Bottom/Right)
uniform int u_fitMode;           // 0=Cover (default), 1=Fit Height (Vertical Contain)

// Order: Array of 3 ints. 0=none, 1=beads, 2=duotone
uniform int u_order[3];

// Mouse Interaction
uniform vec2 u_mouse;      // (x, y) normalized 0-1 (0 at top)
uniform int u_interMode;   // 0=none, 1=reveal, 2=shape
uniform int u_interVariant;// 0=overlap, 1=push
uniform float u_interRadius;
uniform float u_interSoftness;
uniform float u_interActiveSize; // Target size for interaction

// Beads uniforms
uniform bool u_beadsEnabled;
uniform float u_beadSize;        // CSS pixels
uniform float u_beadSoftness;
uniform float u_beadStrength;
uniform float u_beadShape;       // 0.0 = circle, 1.0 = square (Float for smooth transition)


// Duotone uniforms
uniform bool u_duotoneEnabled;
uniform vec3 u_colorA;           // Shadow color
uniform vec3 u_colorB;           // Highlight color
uniform float u_duotoneStrength;

// Auto Interaction
uniform bool u_autoEnabled;
uniform int u_autoType;     // 0=wave, 1=noise
uniform float u_autoSpeed;
uniform float u_autoScale;  // New
uniform float u_autoStrength;
uniform bool u_autoDuotone; // New: Modulate duotone
uniform vec3 u_autoColor;   // New: Tint color (Shadow)
uniform vec3 u_autoColor2;  // New: Tint color (Highlight)

uniform float u_autoDepthSpeed;      // New
uniform float u_autoDepthBrightness; // New

// Depth Uniforms
uniform sampler2D u_depthMap;
uniform bool u_hasDepth;
uniform bool u_useLuminanceAsDepth;

// Rain Effect Uniforms
uniform float u_rainDropSpeed;
uniform float u_rainDensity;
uniform float u_rainSurfaceDepth;
uniform float u_rippleSpeed;
uniform float u_rippleDecay;
uniform float u_rippleStrength;

// Click Ripple Uniforms (up to 4 simultaneous ripples)
uniform vec4 u_clickRipplePos;   // (x1, y1, x2, y2) normalized 0-1
uniform vec4 u_clickRipplePos2;  // (x3, y3, x4, y4) for ripples 3-4
uniform vec4 u_clickRippleTime;  // (t1, t2, t3, t4) time since each click in seconds
uniform float u_clickRippleSpeed;
uniform float u_clickRippleDecay;

// Helper: Sample texture with object-fit: cover logic
vec4 getCoverColor(vec2 uv) {
    vec2 ratio = vec2(1.0, 1.0);
    
    // Fit Mode Logic
    if (u_fitMode == 1) { // Fit Height
        // Map 1.0 Height to 1.0 Image Height
        // Aspect ratio correction applied to Width
        // Ratio X = ImageAspect / ContainerAspect
        // Ratio Y = 1.0
        float rw = u_imageAspect / u_containerAspect;
        ratio = vec2(rw, 1.0);
        
        // Inverse Projection for Texture Sampling
        // textureCoord = (screenUV - AlignOffset) / Ratio
        // AlignOffset:
        //  Left (0.0): 0.0
        //  Center (0.5): (1.0 - rw) * 0.5
        //  Right (1.0): (1.0 - rw) * 1.0
         vec2 projectUV = vec2(
            (uv.x - (1.0 - ratio.x) * u_objectPosition.x) / ratio.x,
            // Y is simple 1:1 map since we fit height
            uv.y 
        );
        
        // Clamp/Repeat Check? Textures might repeat if outside 0-1
        // We generally want background to be 'empty' if outside range?
        // GL_CLAMP_TO_EDGE is likely set.
        // So we will just clamp (smear edge).
        // If we want transparency for margins (contain behavior), we should check bounds.
        if (projectUV.x < 0.0 || projectUV.x > 1.0 || projectUV.y < 0.0 || projectUV.y > 1.0) {
            // Return transparent (or base background color?)
            // Returning vec4(0.0) implies transparent.
             return vec4(0.0);
        }
        return texture2D(u_image, projectUV);

    } else { // Default Cover (0)
        // Ratio here is "Coverage per Screen Unit"
        ratio = vec2(
            min((u_containerAspect / u_imageAspect), 1.0),
            min((u_imageAspect / u_containerAspect), 1.0)
        );
        
        // Apply alignment based on u_objectPosition using 'Zoom In' logic
        vec2 projectUV = vec2(
            uv.x * ratio.x + (1.0 - ratio.x) * u_objectPosition.x,
            uv.y * ratio.y + (1.0 - ratio.y) * u_objectPosition.y
        );
        return texture2D(u_image, projectUV);
    }
}
// Helper: Calculate Automated Interaction Value at a UV
float getAutoInteractionValue(vec2 uv) {
            float autoVal = 0.0;
            float time = u_time * u_autoSpeed;
            float scale = u_autoScale > 0.0 ? u_autoScale : 1.0;
            
            vec2 scaledUV = uv * scale;
            
            if (u_autoType == 0) { // Wave
                // Diagonal wave
                float wave = sin(dot(scaledUV, vec2(5.0, 3.0)) + time * 3.0);
                autoVal = (wave * 0.5 + 0.5) * u_autoStrength; 
            } else if (u_autoType == 1) { // Noise
                float noise = snoise(scaledUV * 3.0 + time);
                autoVal = (noise * 0.5 + 0.5) * u_autoStrength;
            } else if (u_autoType == 2) { // Pulse
                // Radial pulse from center
                vec2 center = vec2(0.5, 0.5);
                vec2 distVec = (uv - center); // Do not scale center distance, but scale frequency
                distVec.x *= (u_resolution.x / u_resolution.y); 
                float dist = length(distVec);
                
                // Expanding rings - scale affects frequency of rings
                float pulse = sin(dist * 20.0 * scale - time * 5.0);
                autoVal = (pulse * 0.5 + 0.5) * u_autoStrength; 
            } else if (u_autoType == 3) { // Spiral
                 vec2 center = vec2(0.5, 0.5);
                 vec2 distVec = (uv - center);
                 
                 float angle = atan(distVec.y, distVec.x);
                 float dist = length(distVec);
                 
                 // Spiral
                 float spiral = sin(angle * 5.0 * scale + dist * 20.0 * scale - time * 5.0);
                 autoVal = (spiral * 0.5 + 0.5) * u_autoStrength;
            } else if (u_autoType == 4) { // Glitch
                 vec2 glitchUV = scaledUV * vec2(1.0, 20.0);
                 glitchUV.y += time * 2.0;
                 float noise = snoise(glitchUV);
                 noise = smoothstep(0.3, 0.8, noise);
                 autoVal = noise * u_autoStrength;
            } else if (u_autoType == 5) { // Net
                 vec2 p = scaledUV * 6.0;
                 p += vec2(sin(time), cos(time)) * 0.2;
                 vec2 i_st = floor(p);
                 vec2 f_st = fract(p);
                 float m_dist = 1.0;
                 for (int y= -1; y <= 1; y++) {
                     for (int x= -1; x <= 1; x++) {
                         vec2 neighbor = vec2(float(x),float(y));
                         vec2 point = vec2(fract(sin(dot(i_st + neighbor, vec2(12.9898,78.233))) * 43758.5453)); 
                         point = 0.5 + 0.5*sin(time + 6.2831*point);
                         vec2 diff = neighbor + point - f_st;
                         float dist = length(diff);
                         m_dist = min(m_dist, dist);
                     }
                 }
                 autoVal = (1.0 - m_dist) * u_autoStrength; 
                 autoVal = pow(autoVal, 3.0); 
            } else if (u_autoType == 6) { // Liquid (Domaine Warping)
                 vec2 p = scaledUV * 3.0;
                 float n = snoise(p + time * 0.5);
                 float n2 = snoise(p + n * 2.0 - time * 0.3);
                 autoVal = (n2 * 0.5 + 0.5) * u_autoStrength;
                 autoVal = smoothstep(0.2, 0.8, autoVal); // Increase contrast
            } else if (u_autoType == 7) { // Circuit (Tech)
                 vec2 p = scaledUV * 4.0;
                 // Grid movement
                 p.x += time * 0.2;
                 
                 vec2 grid = fract(p) - 0.5;
                 float d = min(abs(grid.x), abs(grid.y));
                 float line = 1.0 - smoothstep(0.0, 0.05, d);
                 
                 // Random packets
                 vec2 id = floor(p);
                 float r = fract(sin(dot(id, vec2(12.9898, 78.233))) * 43758.5453);
                 float packet = smoothstep(0.8, 1.0, sin(time * 5.0 + r * 10.0));
                 
                 autoVal = (line * 0.3 + packet * 0.7) * u_autoStrength;
            } else if (u_autoType == 8) { // Matrix (Rain)
                 // DEPTH LOGIC
                 float depthRef = 0.0; // Default flat
                 if (u_hasDepth) {
                     depthRef = texture2D(u_depthMap, uv).r;
                 } else if (u_useLuminanceAsDepth) {
                     depthRef = luminance(texture2D(u_image, uv).rgb);
                 }
                 
                 // Increase contrast on depth to make it "pop" on edges
                 depthRef = smoothstep(0.1, 0.6, depthRef);

                 vec2 uvSt = scaledUV * vec2(1.0, 0.5); 
                 vec2 ipos = floor(uvSt * 15.0);
                 
                 float speed = 1.0 + random(vec2(ipos.x, 0.0)) * 2.0;
                 // Dynamic Speed based on Depth
                 speed += depthRef * u_autoDepthSpeed; 

                 float yOffset = time * speed;
                 float charVal = random(ipos + floor(yOffset));
                 float trail = fract(uvSt.y * 2.0 + yOffset);
                 trail = pow(1.0 - trail, 4.0);
                 
                 // Depth Boosts visibility/brightness
                 float depthBoost = (depthRef * u_autoDepthBrightness) + 0.4;
                 
                 autoVal = step(0.5, charVal) * trail * u_autoStrength * depthBoost;
            } else if (u_autoType == 9) { // Scanline (Holo)
                 float scan = sin(scaledUV.y * 50.0 - time * 5.0);
                 scan = smoothstep(0.4, 0.6, scan);
                 float bar = smoothstep(0.0, 0.2, sin(scaledUV.y * 2.0 + time));
                 float n = snoise(scaledUV + time * 0.1);
                 autoVal = ((scan * 0.5) + (bar * 0.3) + (n * 0.1)) * u_autoStrength;
            } else if (u_autoType == 10) { // Aurora (Cosmic)
                 vec2 p = scaledUV * 2.0;
                 float q = snoise(p + time * 0.2);
                 float r = snoise(p + q + time * 0.3);
                 float s = snoise(p + r + time * 0.1);
                 autoVal = (s * 0.5 + 0.5) * u_autoStrength;
                 // Soften edges
                 autoVal = smoothstep(0.0, 1.0, autoVal);
            } else if (u_autoType == 11) { // Solar (Plasma)
                 vec2 p = scaledUV * 4.0;
                 float n1 = snoise(p + time);
                 float n2 = snoise(p * 2.0 - time * 1.5);
                 float n3 = snoise(p * 4.0 + time * 2.0);
                 float plasma = (n1 + n2 * 0.5 + n3 * 0.25) / 1.75;
                 autoVal = (plasma * 0.5 + 0.5);
                 autoVal = pow(autoVal, 2.0) * u_autoStrength; // Increase contrast for 'hot' feel
            } else if (u_autoType == 12) { // Hex (Cyber)
                 vec2 uvHex = scaledUV * 3.0; // Scale grid
                 // Skew to make hex grid
                 vec2 r = vec2(1.0, 1.73);
                 vec2 h = r * 0.5;
                 vec2 a = mod(uvHex, r) - h;
                 vec2 b = mod(uvHex - h, r) - h;
                 vec2 g = dot(a, a) < dot(b, b) ? a : b;
                 // Dist to center of hex
                 float dist = length(g);
                 
                 // Hex borders
                 float border = smoothstep(0.45, 0.5, dist) - smoothstep(0.5, 0.55, dist);
                 
                 // Pulsing centers
                 vec2 id = uvHex - g;
                 float pulse = sin(time * 2.0 + length(id) * 0.5);
                 float fill = smoothstep(0.4, 0.5, dist) * step(0.5, pulse);
                 
                 autoVal = (border + fill * 0.3) * u_autoStrength;

            } else if (u_autoType == 13) { // Blueprint (Schematic)
                 vec2 grid = fract(scaledUV * 10.0);
                 float line = step(0.95, grid.x) + step(0.95, grid.y);
                 
                 // Moving measurement crosshair
                 vec2 crossPos = vec2(0.5) + vec2(sin(time * 0.5), cos(time * 0.3)) * 0.3;
                 float d = length(scaledUV - crossPos);
                 float crosshair = step(d, 0.05) * (step(abs(scaledUV.x - crossPos.x), 0.005) + step(abs(scaledUV.y - crossPos.y), 0.005));
                 
                 // "Scanning" wave
                 float scan = smoothstep(0.0, 0.1, abs(scaledUV.y - fract(time * 0.2)));
                 
                 autoVal = (line * 0.2 + crosshair + (1.0 - scan) * 0.2) * u_autoStrength;

            } else if (u_autoType == 14) { // Stream (High Speed)
                 vec2 st = scaledUV;
                 st.x += time * 1.5; // Fast horizontal movement
                 
                 float n = snoise(vec2(st.x, st.y * 10.0)); // Stretched Y noise for trails
                 float lines = smoothstep(0.4, 0.8, n);
                 
                 // Intermittent bright bursts
                 float burst = smoothstep(0.8, 1.0, snoise(st * 0.5 + time));
                 
                 autoVal = (lines * 0.5 + burst) * u_autoStrength;
            } else if (u_autoType == 15) { // Rain + Ripple (3D-aware)
                 // Get depth for 3D surface simulation
                 float depth = 0.5;
                 if (u_hasDepth) {
                     depth = texture2D(u_depthMap, uv).r;
                 } else if (u_useLuminanceAsDepth) {
                     depth = luminance(texture2D(u_image, uv).rgb);
                 }
                 depth = smoothstep(0.1, 0.9, depth); // Increase contrast
                 
                 // Rain column parameters
                 float columnWidth = 1.0 / u_rainDensity;
                 float columnId = floor(uv.x / columnWidth);
                 float columnRandom = random(vec2(columnId, 0.0));
                 float columnRandom2 = random(vec2(columnId, 1.0));
                 
                 // Drop position (falls down with time)
                 float dropSpeed = u_rainDropSpeed * (0.3 + columnRandom * 0.7);
                 float dropPhase = fract(time * dropSpeed * 0.5 + columnRandom2);
                 float dropY = dropPhase; // 0 = top, 1 = bottom
                 
                 // Surface collision threshold based on depth
                 // Bright areas (high depth) = closer surface = collides earlier
                 float surfaceThreshold = 1.0 - depth * u_rainSurfaceDepth;
                 bool hasCollided = dropY > surfaceThreshold;
                 
                 float ripple = 0.0;
                 float trail = 0.0;
                 
                 // Multiple rain layers for density
                 for (int layer = 0; layer < 3; layer++) {
                     float layerOffset = float(layer) * 0.33;
                     float layerColumnId = floor((uv.x + layerOffset * columnWidth * 0.5) / columnWidth);
                     float layerRandom = random(vec2(layerColumnId, float(layer)));
                     float layerRandom2 = random(vec2(layerColumnId, float(layer) + 10.0));
                     
                     float layerDropSpeed = u_rainDropSpeed * (0.3 + layerRandom * 0.7);
                     float layerDropPhase = fract(time * layerDropSpeed * 0.5 + layerRandom2 + layerOffset);
                     
                     // Get depth at this column center
                     vec2 colCenterUV = vec2((layerColumnId + 0.5) * columnWidth, uv.y);
                     float colDepth = 0.5;
                     if (u_hasDepth) {
                         colDepth = texture2D(u_depthMap, colCenterUV).r;
                     } else if (u_useLuminanceAsDepth) {
                         colDepth = luminance(texture2D(u_image, colCenterUV).rgb);
                     }
                     colDepth = smoothstep(0.1, 0.9, colDepth);
                     
                     float layerSurfaceThreshold = 1.0 - colDepth * u_rainSurfaceDepth;
                     bool layerCollided = layerDropPhase > layerSurfaceThreshold;
                     
                     if (layerCollided) {
                         // Time since collision
                         float collisionTime = (layerDropPhase - layerSurfaceThreshold) / (layerDropSpeed * 0.5);
                         collisionTime = min(collisionTime, 2.0); // Clamp max time
                         
                         // Ripple center
                         vec2 rippleCenter = vec2(
                             (layerColumnId + 0.5) * columnWidth,
                             1.0 - layerSurfaceThreshold
                         );
                         
                         // Distance to ripple center (aspect corrected)
                         vec2 delta = uv - rippleCenter;
                         delta.x *= u_resolution.x / u_resolution.y;
                         float dist = length(delta);
                         
                         // Expanding ring
                         float waveRadius = collisionTime * u_rippleSpeed * 0.3;
                         float waveThickness = 0.015 + collisionTime * 0.01;
                         
                         // Ring pattern
                         float ring = smoothstep(waveRadius - waveThickness, waveRadius, dist)
                                    - smoothstep(waveRadius, waveRadius + waveThickness, dist);
                         
                         // Attenuation over time and distance
                         float attenuation = exp(-collisionTime * u_rippleDecay) * exp(-dist * 8.0);
                         
                         // Depth gradient modulation (follows 3D contours)
                         // Use local depth samples to simulate wave following surface
                         float depthHere = depth;
                         float depthRight = 0.5;
                         float depthUp = 0.5;
                         vec2 texelSize = 1.0 / u_resolution;
                         if (u_hasDepth) {
                             depthRight = texture2D(u_depthMap, uv + vec2(texelSize.x * 2.0, 0.0)).r;
                             depthUp = texture2D(u_depthMap, uv + vec2(0.0, texelSize.y * 2.0)).r;
                         } else if (u_useLuminanceAsDepth) {
                             depthRight = luminance(texture2D(u_image, uv + vec2(texelSize.x * 2.0, 0.0)).rgb);
                             depthUp = luminance(texture2D(u_image, uv + vec2(0.0, texelSize.y * 2.0)).rgb);
                         }
                         float depthGradient = abs(depthRight - depthHere) + abs(depthUp - depthHere);
                         float surfaceModulation = 1.0 + depthGradient * 3.0;
                         
                         ripple += ring * attenuation * u_rippleStrength * surfaceModulation * (0.5 + float(layer) * 0.25);
                     } else {
                         // Rain drop trail (before collision)
                         float dropX = (layerColumnId + 0.5) * columnWidth;
                         float dx = abs(uv.x - dropX);
                         float dropScreenY = 1.0 - layerDropPhase;
                         float dy = uv.y - dropScreenY;
                         
                         // Thin vertical trail
                         float trailWidth = 0.003 * (1.0 - float(layer) * 0.2);
                         float trailLength = 0.08;
                         float trailMask = smoothstep(trailWidth, 0.0, dx) 
                                         * smoothstep(0.0, 0.02, dy) 
                                         * smoothstep(trailLength, 0.0, dy);
                         
                         // Fade based on layer
                         trail += trailMask * (0.4 - float(layer) * 0.1);
                     }
                 }
                 
                 autoVal = clamp(ripple + trail, 0.0, 1.0) * u_autoStrength;
            }

            return autoVal;
}

// Helper: Calculate bead size/shape at a specific cell center based on Mouse OR Auto
void getInteractionParams(vec2 cellCenter, out float sizeOut, out float shapeParamOut) {
    // Default
    sizeOut = u_beadSize;
    shapeParamOut = float(u_beadShape);
    
    float interactionMask = 0.0;
    
    // 1. Mouse Interaction (only in Shape Shift Mode)
    if (u_interMode == 2) {
        vec2 mouseGL = vec2(u_mouse.x, 1.0 - u_mouse.y);
        vec2 mDelta = cellCenter - (mouseGL * u_resolution);
        float mDist = length(mDelta);
        float radPx = u_interRadius * max(u_resolution.x, u_resolution.y);
        
        // Soft mask from 0 (far) to 1 (near)
        interactionMask = 1.0 - smoothstep(radPx * (1.0 - u_interSoftness), radPx, mDist);
    }
    
    // 2. Auto Interaction (Blend) - only if enabled AND mode is shape
    if (u_autoEnabled && u_interMode == 2) {
        vec2 uv = cellCenter / u_resolution;
        float autoVal = getAutoInteractionValue(uv);
        
        // Combine: Take max of mouse or auto
        interactionMask = max(interactionMask, autoVal);
    }
    
    // 3. Click Ripples - PULSE STYLE (independent of interaction mode)
    // Creates concentric wave rings expanding from click point, like the Pulse auto-effect
    float clickRippleMask = 0.0;
    float waveFrequency = 15.0; // Number of rings
    float waveSpeed = 8.0;      // Animation speed
    
    // Helper function to calculate pulse-style ripple at a point
    // Ripple 1
    if (u_clickRippleTime.x > 0.0 && u_clickRippleTime.x < 4.0) {
        vec2 rippleCenter = vec2(u_clickRipplePos.x, 1.0 - u_clickRipplePos.y) * u_resolution;
        vec2 distVec = cellCenter - rippleCenter;
        // Correct for aspect ratio
        distVec.x *= (u_resolution.y / u_resolution.x);
        float dist = length(distVec) / max(u_resolution.x, u_resolution.y);
        
        // Expanding pulse waves (sin creates multiple rings)
        float expandOffset = u_clickRippleTime.x * u_clickRippleSpeed * 0.5;
        float pulse = sin((dist - expandOffset) * waveFrequency * 3.14159 * 2.0);
        pulse = (pulse * 0.5 + 0.5); // Normalize to 0-1
        
        // Decay over time and distance
        float decay = exp(-u_clickRippleTime.x * u_clickRippleDecay);
        float distFade = 1.0 - smoothstep(0.0, expandOffset + 0.1, dist - expandOffset);
        
        clickRippleMask = max(clickRippleMask, pulse * decay * distFade);
    }
    
    // Ripple 2
    if (u_clickRippleTime.y > 0.0 && u_clickRippleTime.y < 4.0) {
        vec2 rippleCenter = vec2(u_clickRipplePos.z, 1.0 - u_clickRipplePos.w) * u_resolution;
        vec2 distVec = cellCenter - rippleCenter;
        distVec.x *= (u_resolution.y / u_resolution.x);
        float dist = length(distVec) / max(u_resolution.x, u_resolution.y);
        
        float expandOffset = u_clickRippleTime.y * u_clickRippleSpeed * 0.5;
        float pulse = sin((dist - expandOffset) * waveFrequency * 3.14159 * 2.0);
        pulse = (pulse * 0.5 + 0.5);
        
        float decay = exp(-u_clickRippleTime.y * u_clickRippleDecay);
        float distFade = 1.0 - smoothstep(0.0, expandOffset + 0.1, dist - expandOffset);
        
        clickRippleMask = max(clickRippleMask, pulse * decay * distFade);
    }
    
    // Ripple 3
    if (u_clickRippleTime.z > 0.0 && u_clickRippleTime.z < 4.0) {
        vec2 rippleCenter = vec2(u_clickRipplePos2.x, 1.0 - u_clickRipplePos2.y) * u_resolution;
        vec2 distVec = cellCenter - rippleCenter;
        distVec.x *= (u_resolution.y / u_resolution.x);
        float dist = length(distVec) / max(u_resolution.x, u_resolution.y);
        
        float expandOffset = u_clickRippleTime.z * u_clickRippleSpeed * 0.5;
        float pulse = sin((dist - expandOffset) * waveFrequency * 3.14159 * 2.0);
        pulse = (pulse * 0.5 + 0.5);
        
        float decay = exp(-u_clickRippleTime.z * u_clickRippleDecay);
        float distFade = 1.0 - smoothstep(0.0, expandOffset + 0.1, dist - expandOffset);
        
        clickRippleMask = max(clickRippleMask, pulse * decay * distFade);
    }
    
    // Ripple 4
    if (u_clickRippleTime.w > 0.0 && u_clickRippleTime.w < 4.0) {
        vec2 rippleCenter = vec2(u_clickRipplePos2.z, 1.0 - u_clickRipplePos2.w) * u_resolution;
        vec2 distVec = cellCenter - rippleCenter;
        distVec.x *= (u_resolution.y / u_resolution.x);
        float dist = length(distVec) / max(u_resolution.x, u_resolution.y);
        
        float expandOffset = u_clickRippleTime.w * u_clickRippleSpeed * 0.5;
        float pulse = sin((dist - expandOffset) * waveFrequency * 3.14159 * 2.0);
        pulse = (pulse * 0.5 + 0.5);
        
        float decay = exp(-u_clickRippleTime.w * u_clickRippleDecay);
        float distFade = 1.0 - smoothstep(0.0, expandOffset + 0.1, dist - expandOffset);
        
        clickRippleMask = max(clickRippleMask, pulse * decay * distFade);
    }
    
    // Combine click ripples with other interactions
    interactionMask = max(interactionMask, clickRippleMask);
    
    // Apply effects if there's any interaction (mouse, auto, OR click ripples)
    if (interactionMask > 0.0) {
        // Shape Mixing
        shapeParamOut = mix(float(u_beadShape), 1.0 - float(u_beadShape), interactionMask);
        
        // Size Mixing (If Overlap Mode OR if click ripples are active)
        if (u_interVariant == 0 || clickRippleMask > 0.0) {
             sizeOut = mix(u_beadSize, u_interActiveSize, interactionMask);
        }
    }
}

vec4 applyBeads(vec4 currentColor, float mouseMask) {
    if (!u_beadsEnabled || u_beadStrength <= 0.0) return currentColor;
    
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 mouseGL = vec2(u_mouse.x, 1.0 - u_mouse.y);
    float beadSizeDevice = u_beadSize * u_dpr;

    // --- VARIANT 1: PUSH (Lens Distortion) ---
    if (u_interVariant == 1) {
        // Warp coordinates (Lens Effect)
        vec2 warpedCoord = fragCoord;
        
        // Anisotropic Scale Factors (Radial vs Tangential)
        float scaleRad = 1.0;
        float scaleTan = 1.0;
        vec2 toMouseDir = vec2(1.0, 0.0);
        
        if (u_interMode == 2) {
             vec2 delta = fragCoord - (mouseGL * u_resolution);
             float dist = length(delta);
             float radiusPx = u_interRadius * max(u_resolution.x, u_resolution.y);
             
             if (dist > 0.001) toMouseDir = delta / dist;
             
             if (dist < radiusPx) {
                 float t = dist / radiusPx;
                 // Cubic Smoothstep: 3t^2 - 2t^3 -> F = 1 - (3t^2 - 2t^3)
                 // Math from previous success:
                 float t2 = t * t;
                 float F = 1.0 - 3.0 * t2 + 2.0 * t2 * t; // Falloff curve
                 float F_prime = 6.0 * (t2 - t);          // Derivative
                 
                 float ratio = u_interActiveSize / u_beadSize; 
                 float S = 1.0 - (1.0 / ratio); 
                 
                 // Apply Warp
                 warpedCoord -= delta * (F * S); // F is falloff
                 
                 // Calculate Scales
                 scaleTan = 1.0 - S * F;
                 scaleRad = scaleTan - S * t * F_prime;
                 
                 scaleTan = max(scaleTan, 0.1);
                 scaleRad = max(scaleRad, 0.1);
             }
        }
        
        // Determine cell in warped space
        vec2 cellIndex = floor(warpedCoord / beadSizeDevice);
        vec2 cellCenter = (cellIndex + 0.5) * beadSizeDevice;
        vec2 rawDelta = warpedCoord - cellCenter; 
        
        // Anisotropic Correction
        // Project rawDelta onto radial vector (toMouseDir)
        // Be careful: cellCenter is in Warped Space. 
        // We need direction relative to the 'Lens Center' which is effectively Mouse.
        // It's approximate to use the same toMouseDir calculated at fragCoord.
        
        float radialComp = dot(rawDelta, toMouseDir);
        vec2 radialVec = radialComp * toMouseDir;
        vec2 tangentVec = rawDelta - radialVec;
        
        // Un-distort components
        vec2 screenDelta = (radialVec / scaleRad) + (tangentVec / scaleTan);
        
        vec2 centerUV = vec2(cellCenter.x / u_resolution.x, 1.0 - (cellCenter.y / u_resolution.y));
        vec4 beadColor = getCoverColor(centerUV);
        
        // Interaction Shape
        float shapeParam; float dummySize;
        getInteractionParams(fragCoord, dummySize, shapeParam); 
        
        // Render
        float distCircle = length(screenDelta);
        float distSquare = max(abs(screenDelta.x), abs(screenDelta.y));
        float realDist = mix(distCircle, distSquare, shapeParam);
        
        // Screen Radius -> Use Tangential Scale as reference for "Size"
        float screenRadius = (beadSizeDevice * 0.5) / scaleTan;
        
        float mask = 1.0 - smoothstep(1.0 - u_beadSoftness, 1.0, realDist / screenRadius);
        
        // Lighting
        float factor = 1.0;
        float nx = screenDelta.x / screenRadius; 
        float ny = -screenDelta.y / screenRadius;
        
        float lightIntensity = -(nx + ny) * 0.5;
        if (lightIntensity > 0.3) factor = 1.0 + (0.3 * u_beadStrength);
        else if (lightIntensity < -0.3) factor = 1.0 - (0.3 * u_beadStrength);
        float specDist = sqrt(pow(nx + 0.3, 2.0) + pow(ny + 0.3, 2.0));
        if (shapeParam > 0.5) specDist = max(abs(nx + 0.3), abs(ny + 0.3));
        if (specDist < 0.3) factor = 1.0 + (0.6 * u_beadStrength);
        
        vec3 shadedRgb = clamp(beadColor.rgb * factor, 0.0, 1.0);
        vec4 beadResult = vec4(shadedRgb, beadColor.a * mask);
        
        vec4 finalColor = mix(currentColor, beadResult, u_beadStrength);
        if (u_beadStrength > 0.8) finalColor.a = mix(currentColor.a, beadResult.a, u_beadStrength);
        return finalColor;
    }
    
    // --- VARIANT 0: OVERLAP (Neighbor Search) ---
    // No grid warping. Grid is fixed.
    // We check neighbors to see who is on top.
    
    vec2 baseCellIndex = floor(fragCoord / beadSizeDevice);
    
    // We need to find the "Winning" bead for this pixel.
    float bestZ = -10000.0; // Start very low
    vec4 bestColor = vec4(0.0); // Default to empty/transparent
    
    // 3x3 Search (Optimized from 5x5)
    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
             vec2 neighborIndex = baseCellIndex + vec2(float(x), float(y));
             vec2 neighborCenter = (neighborIndex + 0.5) * beadSizeDevice;
             
             // Get Params for this neighbor
             float nSize, nShape;
             getInteractionParams(neighborCenter, nSize, nShape);
             
             float nSizeDevice = nSize * u_dpr; 
             
             // Distance from pixel to neighbor center
             vec2 delta = fragCoord - neighborCenter;
             
             // SDF
             float distCircle = length(delta);
             float distSquare = max(abs(delta.x), abs(delta.y));
             float dist = mix(distCircle, distSquare, nShape);
             
             float radius = nSizeDevice * 0.5;
             
             // Check if inside
             if (dist < radius) {
                 // Calculate "Z" (Depth)
                 // 1. Base Z = Size (Larger beads = Higher/Closer)
                 // 2. Bias Z = Y Position (Higher Y = Higher/Closer)
                 // The user wants "Pixel Above" to be closer.
                 // "Pixel Above" -> Higher Y screen coordinate within the container.
                 // We add a tiny bias based on Y index to break ties for equal-sized beads.
                 // bias = neighborIndex.y * 0.0001
                 
                 float z = nSize + (neighborIndex.y * 0.001);
                 
                 // If this bead is 'above' the current best
                 if (z > bestZ) {
                     bestZ = z;
                     
                     // Sample Color
                     vec2 centerUV = vec2(neighborCenter.x / u_resolution.x, 1.0 - (neighborCenter.y / u_resolution.y));
                     vec4 beadColor = getCoverColor(centerUV);
                     
                     // Mask
                     float mask = 1.0 - smoothstep(radius * (1.0 - u_beadSoftness), radius, dist);
                     
                     // Shading
                     // Re-calculate normals for the winner
                     float factor = 1.0;
                     float nx = delta.x / radius; 
                     float ny = -delta.y / radius;
                     
                     float lightIntensity = -(nx + ny) * 0.5;
                     if (lightIntensity > 0.3) factor = 1.0 + (0.3 * u_beadStrength);
                     else if (lightIntensity < -0.3) factor = 1.0 - (0.3 * u_beadStrength);

                     float specDist = sqrt(pow(nx + 0.3, 2.0) + pow(ny + 0.3, 2.0));
                     if (nShape > 0.5) specDist = max(abs(nx + 0.3), abs(ny + 0.3));
                     if (specDist < 0.3) factor = 1.0 + (0.6 * u_beadStrength);
                     
                     vec3 shadedRgb = clamp(beadColor.rgb * factor, 0.0, 1.0);
                     bestColor = vec4(shadedRgb, beadColor.a * mask);
                 }
             }
        }
    }
    
    // Apply result (mix with background based on bead strength)
    // If bestColor is transparent (no hit), we mix to transparent (if strength is 1).
    vec4 result = mix(currentColor, bestColor, u_beadStrength);
    if (u_beadStrength > 0.8) {
         result.a = mix(currentColor.a, bestColor.a, u_beadStrength);
    }
    return result;
}

vec4 applyDuotone(vec4 currentColor) {
    if (!u_duotoneEnabled || u_duotoneStrength <= 0.0) return currentColor;
    
    float lum = luminance(currentColor.rgb);
    vec3 duotoneColor = mix(u_colorA, u_colorB, lum);
    return vec4(mix(currentColor.rgb, duotoneColor, u_duotoneStrength), currentColor.a);
}

void main() {
    // 1. Calculate Interaction Mask
    // We need standard UV (0 at Top, 1 at Bottom) for mouse comparison
    // v_texCoord is coming from Vertex Shader.
    // Vertex Shader: TL(-1,1) -> (0,0). BR(1,-1) -> (1,1).
    // So v_texCoord.y is 0 at Top.
    // u_mouse.y is 0 at Top.
    // Perfect.
    
    // Correct for Container Aspect Ratio to get circular mask
    float aspect = u_containerAspect;
    vec2 aspectUV = v_texCoord;
    aspectUV.x *= aspect;
    vec2 aspectMouse = u_mouse;
    aspectMouse.x *= aspect;
    
    float distToMouse = distance(aspectUV, aspectMouse);
    float interMask = smoothstep(u_interRadius, u_interRadius * (1.0 - u_interSoftness), distToMouse);
    
    // Base color
    vec4 color = getCoverColor(v_texCoord);
    vec4 original = color; // Save for reveal

    // Apply Effects
    // Note: We ignore u_order for simplicity here to ensure interaction passes are clean
    // Beads typically replace the image, Duotone applied after.
    
    color = applyBeads(color, interMask);
    color = applyDuotone(color);
    
    // Interaction: Reveal
    if (u_interMode == 1) {
        color = mix(color, original, interMask);
    }
    
    // Auto Duotone Modulation - ONLY for auto effects, NOT mouse interaction
    // If enabled, we tint the auto effect (e.g., Matrix) with the specific modulation color
    if (u_autoEnabled && u_autoDuotone) {
        // Only use auto mask, NOT mouse interaction mask
        float autoVal = getAutoInteractionValue(v_texCoord);
        
        // Duotone Tint Logic
        // Calculate luminance of the source color
        float lum = luminance(color.rgb);
        
        // Mix between Color A (Shadow) and Color B (Highlight)
        vec3 tintColor = mix(u_autoColor, u_autoColor2, lum);
        
        // Apply opacity/strength of the tint based on auto mask ONLY
        color.rgb = mix(color.rgb, tintColor, autoVal * 0.8);
    }

    gl_FragColor = color;
}
`;
