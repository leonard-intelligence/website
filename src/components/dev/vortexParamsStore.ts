// Store for the bead "vortex" panels — parametric shape generator (several
// algorithms) with live DevTools control. Multi-section: each section that
// renders a vortex has its own params, selectable in DevTools › Vortex.
// Same useSyncExternalStore pattern as the other dev stores.
import { useSyncExternalStore } from 'react';

export type VortexShape = 'spiral' | 'phyllo' | 'rings' | 'radial' | 'rose' | 'lissajous' | 'scatter';
export type VortexColorMode = 'image' | 'radial' | 'solid';

export type VortexParams = {
    shape: VortexShape;
    count: number;       // beads per arm / ring / spoke (or total density for phyllo)
    arms: number;        // arms / rings / spokes / petals / fréquence a
    turns: number;       // total rotations along an arm (spiral) / fréquence b (lissajous)
    startRadius: number; // px (innermost radius)
    growth: number;      // endRadius / startRadius
    rotation: number;    // deg (global rotation)
    thickness: number;   // beads across an arm
    beadSize: number;    // px (each bead)
    snap: number;        // px grid snap (0 = off)
    colorMode: VortexColorMode;
    color: string;        // solid-mode color
    radialInvert: boolean; // radial mode: invert the center↔edge mapping
};

// ── Sections with a vortex effect (selectable in DevTools) ──────────────────
export type VortexSectionId = 'expertises' | 'modeles';

export const VORTEX_SECTIONS: { id: VortexSectionId; label: string }[] = [
    { id: 'expertises', label: 'Expertises' },
    { id: 'modeles', label: '01 · Modèles' },
];

const DEFAULTS: Record<VortexSectionId, VortexParams> = {
    expertises: {
        shape: 'rings',
        count: 46,
        arms: 8,
        turns: 2.2,
        startRadius: 112,
        growth: 5,
        rotation: 50,
        thickness: 1,
        beadSize: 12,
        snap: 0,
        colorMode: 'radial',
        color: '#D97757',
        radialInvert: true,
    },
    modeles: {
        // champ phyllotaxie (tournesol) derrière les cartes logos
        shape: 'phyllo',
        count: 60,
        arms: 4,
        turns: 2.2,
        startRadius: 20,
        growth: 14,
        rotation: 0,
        thickness: 1,
        beadSize: 12,
        snap: 0,
        colorMode: 'radial',
        color: '#D97757',
        radialInvert: false,
    },
};

let state: Record<VortexSectionId, VortexParams> = {
    expertises: { ...DEFAULTS.expertises },
    modeles: { ...DEFAULTS.modeles },
};
const subscribers = new Set<() => void>();

export function setVortexParams(section: VortexSectionId, next: Partial<VortexParams>) {
    state = { ...state, [section]: { ...state[section], ...next } };
    subscribers.forEach((s) => s());
}

export function resetVortexParams(section: VortexSectionId) {
    state = { ...state, [section]: { ...DEFAULTS[section] } };
    subscribers.forEach((s) => s());
}

export function useVortexParams(section: VortexSectionId): VortexParams {
    return useSyncExternalStore(
        (subscriber) => {
            subscribers.add(subscriber);
            return () => subscribers.delete(subscriber);
        },
        () => state[section],
        () => state[section],
    );
}

export type VortexPoint = { x: number; y: number; idx: number; r: number; ang: number };

/** Bead offsets (px) from the center, per the selected shape algorithm. */
export function buildVortex(p: VortexParams): VortexPoint[] {
    const raw: VortexPoint[] = [];
    const rot = (p.rotation * Math.PI) / 180;
    const grow = Math.max(0.001, p.growth);
    let gi = 0;

    // place `thickness` beads across the arm (tangential to the radius)
    const place = (ang: number, r: number) => {
        const T = Math.max(1, Math.round(p.thickness));
        for (let w = 0; w < T; w++) {
            const off = (w - (T - 1) / 2) * p.beadSize;
            const x = Math.cos(ang) * r - Math.sin(ang) * off;
            const y = Math.sin(ang) * r + Math.cos(ang) * off;
            raw.push({ x, y, idx: gi++, r: Math.hypot(x, y), ang });
        }
    };

    if (p.shape === 'spiral') {
        for (let a = 0; a < p.arms; a++) {
            const armOff = (2 * Math.PI / p.arms) * a;
            for (let i = 0; i < p.count; i++) {
                const t = p.count > 1 ? i / (p.count - 1) : 0;
                place(rot + armOff + t * p.turns * 2 * Math.PI, p.startRadius * Math.pow(grow, t));
            }
        }
    } else if (p.shape === 'radial') {
        for (let a = 0; a < p.arms; a++) {
            const ang = rot + (2 * Math.PI / p.arms) * a;
            for (let i = 0; i < p.count; i++) {
                const t = p.count > 1 ? i / (p.count - 1) : 0;
                place(ang, p.startRadius * Math.pow(grow, t));
            }
        }
    } else if (p.shape === 'rings') {
        const rings = Math.max(1, p.arms);
        for (let ring = 0; ring < rings; ring++) {
            const rt = rings > 1 ? ring / (rings - 1) : 0;
            const r = p.startRadius * Math.pow(grow, rt);
            for (let i = 0; i < p.count; i++) place(rot + (2 * Math.PI / p.count) * i, r);
        }
    } else if (p.shape === 'rose') {
        // rosace (rhodonea) — r = base + amplitude·cos(k·θ), k = bras (pétales)
        const N = Math.max(2, p.count * Math.max(1, p.arms));
        const k = Math.max(1, Math.round(p.arms));
        const amp = p.startRadius * (grow - 1);
        const span = p.turns * 2 * Math.PI;
        for (let i = 0; i < N; i++) {
            const th = (i / (N - 1)) * span;
            place(rot + th, p.startRadius + amp * Math.cos(k * th));
        }
    } else if (p.shape === 'lissajous') {
        // courbe de Lissajous — x = R·sin(a·t + φ), y = R·sin(b·t)
        const N = Math.max(2, p.count * Math.max(1, p.arms));
        const R = p.startRadius * grow;
        const fa = Math.max(1, Math.round(p.arms));
        const fb = Math.max(1, Math.round(p.turns));
        for (let i = 0; i < N; i++) {
            const t = (i / N) * 2 * Math.PI;
            const x = R * Math.sin(fa * t + rot);
            const y = R * Math.sin(fb * t);
            raw.push({ x, y, idx: gi++, r: Math.hypot(x, y), ang: Math.atan2(y, x) });
        }
    } else if (p.shape === 'scatter') {
        // nuage déterministe — séquence R2 low-discrepancy (quasi-aléatoire stable)
        const N = Math.max(1, p.count * Math.max(1, p.arms));
        const R = p.startRadius * grow;
        const g = 1.32471795724474602596; // nombre plastique
        const a1 = 1 / g;
        const a2 = 1 / (g * g);
        const cos = Math.cos(rot);
        const sin = Math.sin(rot);
        for (let i = 0; i < N; i++) {
            const u = (0.5 + a1 * (i + 1)) % 1;
            const v = (0.5 + a2 * (i + 1)) % 1;
            const px = (u - 0.5) * 2 * R;
            const py = (v - 0.5) * 2 * R;
            const x = px * cos - py * sin;
            const y = px * sin + py * cos;
            raw.push({ x, y, idx: gi++, r: Math.hypot(x, y), ang: Math.atan2(y, x) });
        }
    } else {
        // phyllotaxis (sunflower) — golden angle + sqrt density
        const N = Math.max(1, p.count * p.arms);
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
            place(rot + i * golden, p.startRadius + p.startRadius * (grow - 1) * Math.sqrt(i / N));
        }
    }

    // snap to grid + dedupe overlapping cells
    const seen = new Set<string>();
    const out: VortexPoint[] = [];
    for (const pt of raw) {
        let { x, y } = pt;
        if (p.snap > 0) {
            x = Math.round(x / p.snap) * p.snap;
            y = Math.round(y / p.snap) * p.snap;
        }
        const key = `${x},${y}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ ...pt, x, y });
    }
    return out;
}
