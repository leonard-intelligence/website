// 02 · HARNAIS AGENTIQUE — séquence vivante : l'Orchestrateur central déroule
// un vrai workflow sous les yeux du visiteur. Recherche s'exécute puis se
// termine (impulsion verte de retour), l'orchestrateur dispatche les étapes
// suivantes — dont deux en PARALLÈLE — jusqu'au workflow terminé, puis la
// boucle recommence. Langage graphique : gravure en creux (lignes doublées
// blanc/ombre), cartes embossées, anneau pointillé qui tourne lentement.
import { useEffect, useState } from 'react';
import { TOKENS } from '../Sections';
import { Spinner, Check } from './kit';

const EMBOSS = '0 0 0 0.8px #FFFFFF inset, 0 0 0 0.8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)';
const STROKE = 'rgba(23,23,23,0.16)';
const STROKE_HI = 'rgba(255,255,255,0.9)'; // arête claire sous le trait = gravure

type SubState = 'run' | 'queue' | 'done';

// 6 sous-agents sur l'anneau (sens horaire depuis le haut).
const LABELS = ['Recherche', 'Extraction', 'Vérification', 'Rédaction', 'Classification', 'Synthèse'];

const R_CARD = 40; // rayon de l'anneau (en % du conteneur)
const placed = LABELS.map((label, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { label, x: 50 + R_CARD * Math.cos(a), y: 50 + R_CARD * Math.sin(a) };
});

// ── Le scénario — un workflow réel qui se déroule puis reboucle ──────────────
// states = [Recherche, Extraction, Vérification, Rédaction, Classification, Synthèse]
// doneNow = indices qui viennent de se terminer (impulsion verte de retour)
type Step = { states: SubState[]; doneNow: number[]; ms: number };
const SEQ: Step[] = [
    { states: ['run', 'queue', 'queue', 'queue', 'queue', 'queue'], doneNow: [], ms: 2600 },
    { states: ['done', 'run', 'queue', 'queue', 'run', 'queue'], doneNow: [0], ms: 2800 },
    { states: ['done', 'done', 'run', 'queue', 'done', 'queue'], doneNow: [1, 4], ms: 2600 },
    { states: ['done', 'done', 'done', 'run', 'done', 'queue'], doneNow: [2], ms: 2400 },
    { states: ['done', 'done', 'done', 'done', 'done', 'run'], doneNow: [3], ms: 2600 },
    { states: ['done', 'done', 'done', 'done', 'done', 'done'], doneNow: [5], ms: 3400 },
];

// ── Horloge partagée — le schéma radial ET la trace d'exécution se calent
// dessus : même origine, même période, synchronisation parfaite. ─────────────
export const SEQ_TOTAL = SEQ.reduce((a, s) => a + s.ms, 0); // 16400 ms
let clockT0: number | null = null;
export function getHarnessClockT0(): number {
    if (clockT0 === null) clockT0 = performance.now();
    return clockT0;
}

// ── Atomes d'état ────────────────────────────────────────────────────────────
function SeedDot({ color, inner }: { color: string; inner: string }) {
    return <span style={{ width: 6, height: 6, borderRadius: 999, background: color, boxShadow: `inset 0 0.8px 0.8px ${inner}`, flex: '0 0 auto', display: 'inline-block' }} />;
}

function StateMark({ state, accent }: { state: SubState; accent: string }) {
    const { gold, forest } = TOKENS;
    if (state === 'run') return <Spinner color={accent} size={10} />;
    if (state === 'queue') return <SeedDot color={gold} inner="rgba(120,90,20,0.55)" />;
    return <Check color={forest} size={11} />;
}

// ── Nœud sous-agent (carte embossée) ─────────────────────────────────────────
function NodeCard({ label, state, accent }: { label: string; state: SubState; accent: string }) {
    const { mutedText, ink, pale, forest } = TOKENS;
    const active = state === 'run';
    const done = state === 'done';
    return (
        <span
            className="inline-flex items-center font-mono"
            style={{
                gap: 7,
                padding: '8px 13px',
                borderRadius: 9,
                background: pale,
                // terminé = bordure verte translucide (même langage que les barres
                // vertes de la trace en dessous)
                boxShadow: active
                    ? `0 0 0 1px ${accent}30, ${EMBOSS}`
                    : done
                        ? `0 0 0 1.5px ${forest}59, ${EMBOSS}`
                        : EMBOSS,
                fontSize: 11.5,
                color: active ? ink : mutedText,
                whiteSpace: 'nowrap',
                opacity: state === 'queue' ? 0.78 : 1,
                transform: active ? 'scale(1.05)' : 'scale(1)',
                transition: 'box-shadow 400ms ease, color 400ms ease, opacity 400ms ease, transform 400ms ease',
            }}
        >
            <StateMark state={state} accent={accent} />
            {label}
        </span>
    );
}

// ── Le graphe radial — gravure animée, séquence pilotée par le scénario ──────
function RadialGraph({ accent }: { accent: string }) {
    const { ink, mutedText, forest } = TOKENS;
    const [step, setStep] = useState(0);
    const seq = SEQ[step];
    const finished = seq.states.every((s) => s === 'done');

    // L'étape est dérivée de l'horloge partagée (pas d'accumulation de dérive).
    // setInterval plutôt que rAF : continue de tourner même si l'onglet est
    // throttlé, et se resynchronise de lui-même puisque tout vient de t0.
    useEffect(() => {
        const t0 = getHarnessClockT0();
        const tick = () => {
            const e = (performance.now() - t0) % SEQ_TOTAL;
            let acc = 0;
            let s = SEQ.length - 1;
            for (let i = 0; i < SEQ.length; i++) {
                acc += SEQ[i].ms;
                if (e < acc) { s = i; break; }
            }
            setStep(s);
        };
        tick();
        const id = setInterval(tick, 120);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="relative w-full" style={{ maxWidth: 396, aspectRatio: '1 / 1' }}>
            <style>{`
                @keyframes ih-dash { to { stroke-dashoffset: -24; } }
                @keyframes ih-halo {
                    0% { box-shadow: 0 0 0 0 ${accent}33, 0 0 0 1px ${accent}22, ${EMBOSS}; }
                    70% { box-shadow: 0 0 0 16px transparent, 0 0 0 1px ${accent}22, ${EMBOSS}; }
                    100% { box-shadow: 0 0 0 0 transparent, 0 0 0 1px ${accent}22, ${EMBOSS}; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .ih-anim, .ih-halo { animation: none !important; }
                }
            `}</style>
            <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, display: 'block', overflow: 'visible' }} aria-hidden="true">
                {/* gravure : arête claire décalée sous chaque trait */}
                <circle cx="50" cy="50.45" r={R_CARD} fill="none" stroke={STROKE_HI} strokeWidth="0.3" strokeDasharray="1 1.4" />
                <circle
                    className="ih-anim"
                    cx="50" cy="50" r={R_CARD}
                    fill="none" stroke={STROKE} strokeWidth="0.26" strokeDasharray="1 1.4"
                    style={{ animation: 'ih-dash 26s linear infinite' }}
                />
                {placed.map((p) => (
                    <g key={p.label}>
                        <line x1="50" y1="50.4" x2={p.x} y2={p.y + 0.4} stroke={STROKE_HI} strokeWidth="0.3" strokeLinecap="round" strokeDasharray="1.1 1.1" />
                        <line x1="50" y1="50" x2={p.x} y2={p.y} stroke={STROKE} strokeWidth="0.26" strokeLinecap="round" strokeDasharray="1.1 1.1" />
                    </g>
                ))}
                {/* dispatch : impulsions du centre vers les sous-agents en cours */}
                {placed.map((p, i) => seq.states[i] === 'run' && (
                    <circle key={`pulse-${step}-${p.label}`} r="0.65" fill={accent} opacity="0">
                        <animateMotion dur="1.15s" repeatCount="indefinite" path={`M50,50 L${p.x},${p.y}`} />
                        <animate attributeName="opacity" values="0;0.55;0.55;0" keyTimes="0;0.15;0.8;1" dur="1.15s" repeatCount="indefinite" />
                    </circle>
                ))}
                {/* retour : le paquet (résultat) revient à l'orchestrateur quand une
                    étape se termine — rien ne bouge sur l'état final (workflow terminé) */}
                {!finished && seq.doneNow.map((i) => (
                    <g key={`ret-${step}-${i}`}>
                        {/* le paquet : carré bead qui voyage vers le centre
                            (repeatCount indefinite : SMIL cale begin="0" sur la timeline du
                            document, un repeat fini serait déjà consommé à l'insertion) */}
                        <rect x="-1.1" y="-1.1" width="2.2" height="2.2" rx="0.4" fill={forest} opacity="0">
                            <animateMotion dur="1.4s" repeatCount="indefinite" path={`M${placed[i].x},${placed[i].y} L50,50`} />
                            <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.12;0.85;1" dur="1.4s" repeatCount="indefinite" />
                        </rect>
                        {/* sa traîne */}
                        <circle r="0.55" fill={forest} opacity="0">
                            <animateMotion dur="1.4s" begin="0.18s" repeatCount="indefinite" path={`M${placed[i].x},${placed[i].y} L50,50`} />
                            <animate attributeName="opacity" values="0;0.45;0.45;0" keyTimes="0;0.12;0.85;1" dur="1.4s" begin="0.18s" repeatCount="indefinite" />
                        </circle>
                    </g>
                ))}
            </svg>

            {placed.map((p, i) => (
                <span key={p.label} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                    <NodeCard label={p.label} state={seq.states[i]} accent={accent} />
                </span>
            ))}

            {/* Orchestrateur central — halo pendant la boucle, vert au terminé */}
            <span
                className={`inline-flex font-mono${finished ? '' : ' ih-halo'}`}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    padding: '12px 17px',
                    borderRadius: 11,
                    background: '#F0F0EB',
                    boxShadow: finished ? `0 0 0 1px ${forest}44, ${EMBOSS}` : `0 0 0 1px ${accent}22, ${EMBOSS}`,
                    whiteSpace: 'nowrap',
                    animation: finished ? 'none' : 'ih-halo 2.6s cubic-bezier(0.25, 0, 0.4, 1) infinite',
                    transition: 'box-shadow 400ms ease',
                }}
            >
                <span className="inline-flex items-center" style={{ gap: 7 }}>
                    {finished ? <Check color={forest} size={12} /> : <Spinner color={accent} size={12} />}
                    <span style={{ fontSize: 12.5, color: ink }}>Orchestrateur</span>
                </span>
                <span style={{ fontSize: 8.5, letterSpacing: '0.16em', color: finished ? forest : mutedText, transition: 'color 400ms ease' }}>
                    {finished ? 'WORKFLOW TERMINÉ' : `BOUCLE ACTIVE · ${step + 1}/5`}
                </span>
            </span>

        </div>
    );
}

export function IlluHarness({ accent }: { accent: string }) {
    return (
        <div className="w-full font-sans flex justify-center" aria-hidden="true" style={{ padding: '8px 0' }}>
            <RadialGraph accent={accent} />
        </div>
    );
}
