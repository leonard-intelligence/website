// Store for the bead "vortex" in SectionExpertise — parametric shape generator
// (several algorithms) with live DevTools control. Same useSyncExternalStore
// pattern as the other dev stores.
import { useSyncExternalStore } from 'react';

export type VortexShape = 'spiral' | 'phyllo' | 'rings' | 'radial';
export type VortexColorMode = 'image' | 'radial' | 'solid';

export type VortexParams = {
    shape: VortexShape;
    count: number;       // beads per arm / ring / spoke (or total density for phyllo)
    arms: number;        // arms / rings / spokes
    turns: number;       // total rotations along an arm (spiral)
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

export const DEFAULT_VORTEX_PARAMS: VortexParams = {
    shape: 'spiral',
    count: 48,
    arms: 8,
    turns: 2.7,
    startRadius: 92,
    growth: 6.5,
    rotation: 50,
    thickness: 1,
    beadSize: 12,
    snap: 0,
    colorMode: 'radial',
    color: '#D97757',
    radialInvert: false,
};

let state: VortexParams = { ...DEFAULT_VORTEX_PARAMS };
const subscribers = new Set<() => void>();

export function setVortexParams(next: Partial<VortexParams>) {
    state = { ...state, ...next };
    subscribers.forEach((s) => s());
}

export function resetVortexParams() {
    state = { ...DEFAULT_VORTEX_PARAMS };
    subscribers.forEach((s) => s());
}

export function useVortexParams(): VortexParams {
    return useSyncExternalStore(
        (subscriber) => {
            subscribers.add(subscriber);
            return () => subscribers.delete(subscriber);
        },
        () => state,
        () => state,
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
