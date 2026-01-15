/**
 * FX Configuration Types and Defaults
 * Configuration for Beads + Duotone effects on illustration images
 */

export interface BeadsConfig {
    enabled: boolean;
    shape: 'circle' | 'square';
    sizePx: number;        // CSS pixels (uniform across all images)
    softness: number;      // 0-1: edge smoothness
    strength: number;      // 0-1: blend with original
}

export interface DuotoneConfig {
    enabled: boolean;
    colorA: string;        // #RRGGBB (shadows)
    colorB: string;        // #RRGGBB (highlights)
    strength: number;      // 0-1: blend with original
}

export interface HoverConfig {
    preset: 'none' | 'duotoneBoost' | 'shapeSwap' | 'disable';
    durationMs: number;
    duotoneEnabled?: boolean; // New: Override duotone on hover
    colorA?: string;
    colorB?: string;
    strength?: number;
}

export interface InteractionConfig {
    enabled: boolean;
    mode: 'none' | 'reveal' | 'shape';
    variant: 'overlap' | 'push'; // New variant selector
    radius: number;        // 0.0 - 0.5
    softness: number;      // 0.0 - 1.0
    activeSize: number;    // Target pixel size
    auto?: AutoInteractionConfig;
}

export interface FxConfig {
    enabled: boolean;
    order: string[];
    heroImage: string;
    beads: BeadsConfig;
    glassBeads: BeadsConfig; // New: Secondary beads layer
    duotone: DuotoneConfig;
    hover: HoverConfig;
    interaction: InteractionConfig;
}

export const FX_DEFAULTS: FxConfig = {
    enabled: true,
    order: ['beads', 'duotone'],
    heroImage: '/assets/mountains.png',
    beads: {
        enabled: true,
        shape: 'circle',
        sizePx: 10,
        softness: 0.2,
        strength: 1,
    },
    glassBeads: {
        enabled: false,
        shape: 'circle',
        sizePx: 20,
        softness: 0.2,
        strength: 0.5,
    },
    duotone: {
        enabled: true,
        colorA: '#000000',
        colorB: '#ffffff',
        strength: 1,
    },
    hover: {
        preset: 'duotoneBoost',
        durationMs: 200,
        duotoneEnabled: true,
        colorA: '#0a0094',
        colorB: '#ffffff',
    },
    interaction: {
        enabled: true,
        mode: 'shape',
        variant: 'overlap',
        radius: 0.17,
        softness: 1,
        activeSize: 10,
        auto: {
            enabled: true,
            type: 'matrix',
            speed: 0.1,
            strength: 1,
            scale: 1.5,
            duotoneModulation: true,
            modulationColor: '#000000',
            modulationColor2: '#0011ff',
            useLuminanceAsDepth: true,
        }
    }
};

export interface RainConfig {
    dropSpeed: number;      // 0.1 - 2.0: vitesse de chute des gouttes
    density: number;        // 1 - 50: nombre de colonnes de pluie
    surfaceDepth: number;   // 0.0 - 1.0: influence de la profondeur sur la collision
    rippleSpeed: number;    // 0.1 - 2.0: vitesse de propagation des ondes
    rippleDecay: number;    // 1.0 - 10.0: vitesse d'atténuation
    rippleStrength: number; // 0.0 - 1.0: intensité des ondes
}

export interface AutoInteractionConfig {
    enabled: boolean;
    type: 'wave' | 'noise' | 'pulse' | 'spiral' | 'glitch' | 'net' | 'liquid' | 'circuit' | 'matrix' | 'scanline' | 'aurora' | 'solar' | 'hex' | 'blueprint' | 'stream' | 'rain';
    speed: number;       // 0.1 - 2.0
    scale: number;       // 0.1 - 5.0 (frequency/zoom)
    strength: number;    // 0.0 - 1.0 (modifier for radius/intensity)
    duotoneModulation?: boolean; // If true, auto effect modulates duotone intensity
    modulationColor?: string; // Optional custom color for modulation (Color A / Shadow)
    modulationColor2?: string; // Optional second color (Color B / Highlight) for Duotone Tint
    useLuminanceAsDepth?: boolean; // New: Use image luminance as fallback for depth
    depthSpeed?: number;        // New: How much depth affects speed (0.0 - 10.0)
    depthBrightness?: number;   // New: How much depth affects brightness (0.0 - 2.0)
    rain?: RainConfig;          // Rain-specific configuration
}

/**
 * Parse hex color to RGB array [0-1]
 */
export function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [0, 0, 0];
    return [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
    ];
}
