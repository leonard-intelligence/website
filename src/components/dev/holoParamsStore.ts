// Store for the reverse-holo card effect (motif logo + foil + glare + tilt).
// Same useSyncExternalStore pattern as the other dev stores so the DevTools
// panel and the card share live state.
import { useSyncExternalStore } from 'react';

export type FoilKind = 'rainbow' | 'silver' | 'gold';
// Effets de la zone illustration, inspirés de pokemon-cards-css (Simey).
export type WindowEffect = 'sheen' | 'holo' | 'rainbow' | 'radiant' | 'glitter';

export type HoloParams = {
    motifSize: number; // taille du logo dans la tuile (px)
    motifSpace: number; // espace entre les motifs (px) — cell = size + space
    foilStrength: number; // 0..1 — intensité de l'irisé/métal (corps de la carte)
    glareStrength: number; // 0..1 — intensité du reflet lumineux mobile
    saturation: number; // 1..3 — saturation du foil
    tilt: number; // degrés d'inclinaison max
    foil: FoilKind;
    // Zone « illustration » (fenêtre de l'image) — traitée différemment du corps.
    splitWindow: boolean; // active une 2e zone holo dans la fenêtre image
    windowEffect: WindowEffect; // style holo de la fenêtre (façon Simey)
    windowFoil: FoilKind; // couleur du foil (effets sheen / glitter)
    windowStrength: number; // 0..1 — intensité du foil dans la fenêtre
};

export const DEFAULT_HOLO_PARAMS: HoloParams = {
    motifSize: 30,
    motifSpace: 18,
    foilStrength: 0.5,
    glareStrength: 0.35,
    saturation: 1.7,
    tilt: 7,
    foil: 'rainbow',
    splitWindow: true,
    windowEffect: 'holo',
    windowFoil: 'silver',
    windowStrength: 0.5,
};

let state: HoloParams = { ...DEFAULT_HOLO_PARAMS };
const subscribers = new Set<() => void>();

export function setHoloParams(next: Partial<HoloParams>) {
    state = { ...state, ...next };
    subscribers.forEach((s) => s());
}

export function resetHoloParams() {
    state = { ...DEFAULT_HOLO_PARAMS };
    subscribers.forEach((s) => s());
}

export function useHoloParams(): HoloParams {
    return useSyncExternalStore(
        (subscriber) => {
            subscribers.add(subscriber);
            return () => subscribers.delete(subscriber);
        },
        () => state,
        () => state,
    );
}
