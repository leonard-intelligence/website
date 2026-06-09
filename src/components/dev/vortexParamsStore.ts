// Store for the bead "vortex" in SectionExpertise — a parametric log-spiral
// arm generator. Same useSyncExternalStore pattern as the other dev stores so
// the DevTools panel and the section share live state.
import { useSyncExternalStore } from 'react';

export type VortexParams = {
    count: number;       // beads per arm
    arms: number;        // number of spiral arms
    turns: number;       // total rotations along an arm
    startRadius: number; // px (radius of the innermost bead)
    growth: number;      // endRadius / startRadius (log growth over the arm)
    rotation: number;    // deg (global rotation)
    beadSize: number;    // px (each bead; multiple of the bg grid)
    snap: number;        // px grid snap (0 = off)
};

export const DEFAULT_VORTEX_PARAMS: VortexParams = {
    count: 14,
    arms: 2,
    turns: 2.6,
    startRadius: 36,
    growth: 6,
    rotation: 0,
    beadSize: 12,
    snap: 24,
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

/** Bead offsets (px) from the vortex center, following log-spiral arms. */
export function buildVortex(p: VortexParams): { x: number; y: number; idx: number }[] {
    const pts: { x: number; y: number; idx: number }[] = [];
    let k = 0;
    for (let a = 0; a < p.arms; a++) {
        const armOffset = (2 * Math.PI / p.arms) * a;
        for (let i = 0; i < p.count; i++) {
            const t = p.count > 1 ? i / (p.count - 1) : 0;
            const ang = (p.rotation * Math.PI) / 180 + armOffset + t * p.turns * 2 * Math.PI;
            const r = p.startRadius * Math.pow(Math.max(0.001, p.growth), t);
            let x = Math.cos(ang) * r;
            let y = Math.sin(ang) * r;
            if (p.snap > 0) {
                x = Math.round(x / p.snap) * p.snap;
                y = Math.round(y / p.snap) * p.snap;
            }
            pts.push({ x, y, idx: k });
            k++;
        }
    }
    return pts;
}
