// 02 · HARNAIS — TRACE D'EXÉCUTION compacte, intégrée sous le schéma radial
// dans le même cadre parent. Style « Demande #2481 » (IlluSurfaces) : carte
// embossée posée sur la surface, fond uni. Juste les labels à gauche et les
// timelines : la barre se remplit au passage de la tête de lecture puis PASSE
// AU VERT quand l'étape est terminée. Synchronisation parfaite avec le schéma
// radial : même horloge (getHarnessClockT0), phase appliquée en animation-delay
// négatif, mêmes bornes temporelles que SEQ.
import { useState } from 'react';
import { TOKENS } from '../Sections';
import { SEQ_TOTAL, getHarnessClockT0 } from './IlluHarness';

const EMBOSS = '0 0 0 0.8px #FFFFFF inset, 0 0 0 0.8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)';

// Timeline en % du cycle — calée sur la séquence du schéma radial (IlluHarness,
// SEQ : 2.6 + 2.8 + 2.6 + 2.4 + 2.6 + 3.4 = 16.4 s) pour que les deux vues
// montrent la même étape au même moment. Extraction & Classification se
// chevauchent (parallèle).
const LANES = [
    { label: 'Recherche', start: 1, end: 15.9 },
    { label: 'Extraction', start: 16.5, end: 32.9 },
    { label: 'Classification', start: 16.5, end: 29.5 },
    { label: 'Vérification', start: 33.5, end: 48.8 },
    { label: 'Rédaction', start: 49.4, end: 63.4 },
    { label: 'Synthèse', start: 64, end: 79.3 },
];
const LABEL_W = 96;
const COL_GAP = 12;
const ROW_H = 21;
const ROW_GAP = 5;
const BAR_H = 10;

export function IlluHarnessTrace({ accent }: { accent: string }) {
    const { mutedText, forest, pale, ink } = TOKENS;

    // Phase de l'horloge partagée au montage → animation-delay négatif :
    // les animations CSS démarrent « comme si » elles avaient commencé à t0.
    const [delayMs] = useState(() => -((performance.now() - getHarnessClockT0()) % SEQ_TOTAL));
    const anim = (name: string) => ({
        animation: `${name} ${SEQ_TOTAL}ms linear infinite`,
        animationDelay: `${delayMs}ms`,
    });

    // Boucle douce : en fin de cycle (95 % → 99.5 %), tout s'estompe en fondu
    // au lieu d'un reset sec, puis le cycle repart à zéro invisible.
    const lanesCss = LANES.map((l, i) => `
        @keyframes ht-bar-${i} {
            0% { transform: scaleX(0); opacity: 1; }
            ${l.start}% { transform: scaleX(0); opacity: 1; }
            ${l.end}%, 95% { transform: scaleX(1); opacity: 1; }
            99.5%, 100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes ht-done-${i} {
            0%, ${Math.min(l.end + 0.4, 94)}% { opacity: 0; }
            ${Math.min(l.end + 2, 94.5)}%, 95% { opacity: 1; }
            99.5%, 100% { opacity: 0; }
        }
    `).join('\n');

    return (
        <div
            className="relative w-full overflow-hidden font-sans"
            aria-hidden="true"
            style={{ borderRadius: 10, background: pale, boxShadow: EMBOSS, padding: '13px 16px' }}
        >
            <style>{`
                ${lanesCss}
                @keyframes ht-sweep {
                    0% { left: 0%; opacity: 0; }
                    1.5% { left: 1.5%; opacity: 1; }
                    95% { left: 95%; opacity: 1; }
                    99% { left: 99%; opacity: 0; }
                    100% { left: 100%; opacity: 0; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ht-anim { animation: none !important; }
                }
            `}</style>

            <div className="relative">
                {/* tête de lecture — balaie la zone des barres */}
                <div className="absolute" style={{ left: LABEL_W + COL_GAP, right: 0, top: -3, bottom: -3 }}>
                    <span
                        className="ht-anim absolute"
                        style={{
                            top: 0,
                            bottom: 0,
                            width: 1,
                            background: `linear-gradient(180deg, ${ink}50, ${ink}1c)`,
                            ...anim('ht-sweep'),
                            zIndex: 3,
                        }}
                    >
                        <span style={{ position: 'absolute', top: -2, left: -2.5, width: 5, height: 5, transform: 'rotate(45deg)', background: ink, opacity: 0.5, borderRadius: 1 }} />
                    </span>
                </div>

                {LANES.map((l, i) => (
                    <div key={l.label} className="flex items-center" style={{ height: ROW_H, marginBottom: i < LANES.length - 1 ? ROW_GAP : 0, gap: COL_GAP }}>
                        {/* label */}
                        <span
                            className="font-mono shrink-0 truncate"
                            style={{ width: LABEL_W, textAlign: 'right', fontSize: 9.5, color: mutedText }}
                        >
                            {l.label}
                        </span>
                        {/* piste gravée */}
                        <div
                            className="relative flex-1"
                            style={{
                                height: BAR_H,
                                borderRadius: BAR_H / 2,
                                background: 'rgba(23,23,23,0.05)',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.09), 0 1px 0 rgba(255,255,255,0.85)',
                            }}
                        >
                            {/* barre d'exécution — se remplit au passage de la tête */}
                            <span
                                className="ht-anim absolute"
                                style={{
                                    left: `${l.start}%`,
                                    width: `${l.end - l.start}%`,
                                    top: 0,
                                    height: BAR_H,
                                    borderRadius: BAR_H / 2,
                                    background: `linear-gradient(180deg, #FFFFFF 0%, #F2F2ED 100%)`,
                                    boxShadow: `0 0 0 1px ${accent}1c, ${EMBOSS}`,
                                    transformOrigin: 'left center',
                                    transform: 'scaleX(1)',
                                    ...anim(`ht-bar-${i}`),
                                }}
                            />
                            {/* la barre passe au vert quand l'étape est terminée */}
                            <span
                                className="ht-anim absolute"
                                style={{
                                    left: `${l.start}%`,
                                    width: `${l.end - l.start}%`,
                                    top: 0,
                                    height: BAR_H,
                                    borderRadius: BAR_H / 2,
                                    background: `linear-gradient(180deg, #8FE468 0%, ${forest} 100%)`,
                                    boxShadow: `0 0 0 1px ${forest}55, inset 0 1px 0 rgba(255,255,255,0.45), 0 2px 6px ${forest}33`,
                                    opacity: 1,
                                    ...anim(`ht-done-${i}`),
                                    zIndex: 2,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
