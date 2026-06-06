// Store for the Hero title — Geist Pixel variant + glow. Same useSyncExternalStore
// pattern as the other dev stores so the DevTools panel and the Hero share live state.
import { useSyncExternalStore } from 'react';

export type PixelVariant = 'line' | 'square' | 'grid' | 'circle' | 'triangle';

export type HeroTitleParams = {
    variant: PixelVariant;
    glow: number; // px blur radius of the glow (0 = none)
    glowColor: string; // glow color
};

export const DEFAULT_HERO_TITLE_PARAMS: HeroTitleParams = {
    variant: 'line',
    glow: 0,
    glowColor: '#ffffff',
};

let state: HeroTitleParams = { ...DEFAULT_HERO_TITLE_PARAMS };
const subscribers = new Set<() => void>();

export function setHeroTitleParams(next: Partial<HeroTitleParams>) {
    state = { ...state, ...next };
    subscribers.forEach((s) => s());
}

export function resetHeroTitleParams() {
    state = { ...DEFAULT_HERO_TITLE_PARAMS };
    subscribers.forEach((s) => s());
}

export function useHeroTitleParams(): HeroTitleParams {
    return useSyncExternalStore(
        (subscriber) => {
            subscribers.add(subscriber);
            return () => subscribers.delete(subscriber);
        },
        () => state,
        () => state,
    );
}
