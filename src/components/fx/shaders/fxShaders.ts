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
precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform float u_dpr;
uniform float u_time;

// Aspect Ratio Uniforms
uniform float u_containerAspect; // width / height of container
uniform float u_imageAspect;     // width / height of image

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

float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

// Simplex Noise (vec3)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,
                      0.366025403784439,
                     -0.577350269189626,
                      0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
// Helper: Sample texture with object-fit: cover logic
vec4 getCoverColor(vec2 uv) {
    vec2 ratio = vec2(
        min((u_containerAspect / u_imageAspect), 1.0),
        min((u_imageAspect / u_containerAspect), 1.0)
    );

    vec2 projectUV = vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    
    return texture2D(u_image, projectUV);
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
            }

            return autoVal;
}

// Helper: Calculate bead size/shape at a specific cell center based on Mouse OR Auto
void getInteractionParams(vec2 cellCenter, out float sizeOut, out float shapeParamOut) {
    // Default
    sizeOut = u_beadSize;
    shapeParamOut = float(u_beadShape);
    
    if (u_interMode == 2) { // Shape Shift Mode
        
        // 1. Mouse Interaction
        vec2 mouseGL = vec2(u_mouse.x, 1.0 - u_mouse.y);
        vec2 mDelta = cellCenter - (mouseGL * u_resolution);
        float mDist = length(mDelta);
        float radPx = u_interRadius * max(u_resolution.x, u_resolution.y);
        
        // Soft mask from 0 (far) to 1 (near)
        float interactionMask = 1.0 - smoothstep(radPx * (1.0 - u_interSoftness), radPx, mDist);
        
        // 2. Auto Interaction (Blend)
        if (u_autoEnabled) {
            vec2 uv = cellCenter / u_resolution;
            float autoVal = getAutoInteractionValue(uv);
            
            // Combine: Take max of mouse or auto
            interactionMask = max(interactionMask, autoVal);
        }
        
        // Shape Mixing
        shapeParamOut = mix(float(u_beadShape), 1.0 - float(u_beadShape), interactionMask);
        
        // Size Mixing (If Overlap Mode)
        if (u_interVariant == 0) {
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
    
    // 5x5 Search to allow for large beads (ActiveSize >> BeadSize)
    for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
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
    
    // Auto Duotone Modulation
    // If enabled, we tint the effect with the specific modulation color (or duotone gradient)
    if (u_autoEnabled && u_autoDuotone) {
        // Combined mask
        float autoVal = getAutoInteractionValue(v_texCoord);
        float combinedMask = max(interMask, autoVal);
        
        // Duotone Tint Logic
        // Calculate luminance of the source color
        float lum = luminance(color.rgb);
        
        // Mix between Color A (Shadow) and Color B (Highlight)
        // If u_autoColor2 is same as u_autoColor (or similar), it's a flat tint.
        vec3 tintColor = mix(u_autoColor, u_autoColor2, lum);
        
        // Apply opacity/strength of the tint based on the mask
        color.rgb = mix(color.rgb, tintColor, combinedMask * 0.8);
    }

    gl_FragColor = color;
}
`;
