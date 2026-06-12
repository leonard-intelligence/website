import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export const SAMPLE_W = 102;
export const SAMPLE_H = 77;
export const SOURCE_URL = '/assets/backgrounds/flowers-beads.webp';

type BeadCtx = {
    beadPx: number;
    /** Hero bead area width in px (integer × beadPx) */
    beadW: number;
    /** Hero bead area left offset from viewport in px (centered, ≥ beadPx) */
    leftPx: number;
    /** Number of px of paper between the hero bead image bottom and the hero section bottom (= intro top). */
    heroBottomGap: number;
};

const BeadCtxObj = createContext<BeadCtx>({ beadPx: 0, beadW: 0, leftPx: 0, heroBottomGap: 0 });

/** Returns the current beadPx for the viewport. Same calc as Hero. */
export function useBeadPx() {
    return useContext(BeadCtxObj).beadPx;
}

/** Returns the full bead context (beadPx + bead area width + left offset). */
export function useBeadCtx() {
    return useContext(BeadCtxObj);
}

export function BeadPxProvider({ children }: { children: ReactNode }) {
    const [ctx, setCtx] = useState<BeadCtx>({ beadPx: 0, beadW: 0, leftPx: 0, heroBottomGap: 0 });

    useEffect(() => {
        const update = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // Same formula as Hero
            const beadPx = Math.max(1, Math.ceil(Math.max(vw / (SAMPLE_W + 2), vh / (SAMPLE_H + 1))));
            const visibleCols = Math.max(1, Math.floor((vw - 2 * beadPx) / beadPx));
            const visibleRows = Math.max(1, Math.floor((vh - beadPx) / beadPx));
            const beadW = visibleCols * beadPx;
            const beadH = visibleRows * beadPx;
            const leftPx = Math.floor((vw - beadW) / 2);
            const heroBottomGap = vh - beadPx - beadH; // paper between bead image bottom and hero section bottom
            setCtx({ beadPx, beadW, leftPx, heroBottomGap });
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return <BeadCtxObj.Provider value={ctx}>{children}</BeadCtxObj.Provider>;
}
