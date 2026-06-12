// Store for the Vitruvian illustration inside the AgentCard frame.
// Same useSyncExternalStore pattern as notchParamsStore so the DevTools panel
// and the card can share live state with no context provider.
import { useSyncExternalStore } from 'react';

export type VitruveParams = {
    width: number;   // % of the frame width — zoom level (>100 = zoom in)
    top: number;     // % vertical offset (0 = top-aligned, negative = move image up)
    left: number;    // % horizontal position of the image center (50 = centered)
    opacity: number; // 0–1
};

export const DEFAULT_VITRUVE_PARAMS: VitruveParams = {
    width: 112,
    top: 0,
    left: 50,
    opacity: 0.54,
};

let state: VitruveParams = { ...DEFAULT_VITRUVE_PARAMS };
const subscribers = new Set<() => void>();

export function setVitruveParams(next: Partial<VitruveParams>) {
    state = { ...state, ...next };
    subscribers.forEach((s) => s());
}

export function resetVitruveParams() {
    state = { ...DEFAULT_VITRUVE_PARAMS };
    subscribers.forEach((s) => s());
}

export function useVitruveParams(): VitruveParams {
    return useSyncExternalStore(
        (subscriber) => {
            subscribers.add(subscriber);
            return () => subscribers.delete(subscriber);
        },
        () => state,
        () => state,
    );
}
