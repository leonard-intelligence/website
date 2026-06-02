// Tiny module-scoped store for the AgentCard notch parameters.
// No context provider needed — uses useSyncExternalStore so both the DevTools
// panel and AgentCardStack can read/write the same state from anywhere.
import { useSyncExternalStore } from 'react';

export type CornerStyle = 'cross' | 'dot' | 'ring' | 'bracket' | 'target' | 'crosshead' | 'square' | 'screw' | 'none';

export type NotchParams = {
    topCy: number;
    topHeight: number;
    bottomCy: number;
    bottomHeight: number;
    depth: number;
    innerR: number;
    outerR: number;
    cornerStyle: CornerStyle;
};

export const DEFAULT_NOTCH_PARAMS: NotchParams = {
    topCy: 0.22,
    topHeight: 0.021,
    bottomCy: 0.465,
    bottomHeight: 0.035,
    depth: 0.05,
    innerR: 0.015,
    outerR: 0.025,
    cornerStyle: 'none',
};

let state: NotchParams = { ...DEFAULT_NOTCH_PARAMS };
const subscribers = new Set<() => void>();

export function setNotchParams(next: Partial<NotchParams>) {
    state = { ...state, ...next };
    subscribers.forEach((s) => s());
}

export function resetNotchParams() {
    state = { ...DEFAULT_NOTCH_PARAMS };
    subscribers.forEach((s) => s());
}

export function useNotchParams(): NotchParams {
    return useSyncExternalStore(
        (subscriber) => {
            subscribers.add(subscriber);
            return () => subscribers.delete(subscriber);
        },
        () => state,
        () => state,
    );
}
