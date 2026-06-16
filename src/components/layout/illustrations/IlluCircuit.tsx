// UN SEUL SYSTÈME — bande décorative pleine largeur : tout le système agentique
// rendu comme UN circuit imprimé intégré. Gravure claire et premium (pas de
// néon / hacker sombre) : pistes cuivre en lignes doublées (arête claire décalée
// sous le trait d'encre = relief en creux), pads/vias discrets aux jonctions,
// et des composants = petites cartes embossées étiquetées en mono. Le cœur
// central (ORCHESTRATEUR) est relié à chaque capacité. Une seule piste accent
// (lime) guide l'œil, parcourue d'une impulsion de signal — désactivée sous
// prefers-reduced-motion.
import { TOKENS } from '../Sections';

// ── Recettes de gravure / emboss (mêmes idiomes que IlluHarness) ─────────────
const EMBOSS = '0 0 0 0.8px #FFFFFF inset, 0 0 0 0.8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04), 0 8px 20px -6px rgba(0,0,0,0.06)';
const STROKE = 'rgba(23,23,23,0.18)';      // cuivre / encre muette
const STROKE_HI = 'rgba(255,255,255,0.9)'; // arête claire décalée = gravure en creux
const PAD = 'rgba(23,23,23,0.28)';         // anneaux de soudure / vias

// ── Géométrie sur une grille de 24px (cohérence avec l'esthétique bead) ──────
const VB_W = 1100;
const VB_H = 300;
const GRID = 24;
const g = (n: number) => n * GRID; // helper grille → coordonnée viewBox

// Composants périphériques : { étiquette, position centre (x,y), taille }.
// Placés sur la grille, deux de chaque côté du cœur + un en bas.
type Comp = { label: string; x: number; y: number; w: number; h: number };
const CORE: Comp = { label: 'ORCHESTRATEUR', x: g(22.9), y: g(6.25), w: 168, h: 70 };

const COMPS: Comp[] = [
    { label: 'MODÈLES', x: g(6), y: g(3), w: 104, h: 44 },
    { label: 'HARNAIS', x: g(6), y: g(9.5), w: 104, h: 44 },
    { label: 'DONNÉES', x: g(39.8), y: g(3), w: 104, h: 44 },
    { label: 'CONTEXTE', x: g(39.8), y: g(9.5), w: 104, h: 44 },
    { label: 'SÉCURITÉ', x: g(22.9), y: g(11), w: 116, h: 44 },
];

// Le bord d'un composant le plus proche du cœur (point d'attache de la piste).
function attach(c: Comp, toward: { x: number; y: number }) {
    const dx = toward.x - c.x;
    const dy = toward.y - c.y;
    const hw = c.w / 2 + 4;
    const hh = c.h / 2 + 4;
    // attache horizontale si le composant est nettement à gauche/droite, sinon verticale
    if (Math.abs(dx) * hh > Math.abs(dy) * hw) {
        return { x: c.x + Math.sign(dx) * hw, y: c.y };
    }
    return { x: c.x, y: c.y + Math.sign(dy) * hh };
}

// Construit une piste orthogonale avec coude en L à 90° (segment horizontal puis
// vertical, départ depuis le composant). Coins arrondis via une jonction
// chanfreinée à 45° pour le look « cuivre gravé ».
function tracePath(from: { x: number; y: number }, to: { x: number; y: number }) {
    const chamfer = 12;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    if (Math.abs(dx) < 1 || Math.abs(dy) < 1) {
        return `M ${from.x} ${from.y} L ${to.x} ${to.y}`; // droit
    }
    const sx = Math.sign(dx);
    const sy = Math.sign(dy);
    // coude à l'aplomb du composant cible (segment horizontal d'abord)
    const cornerX = to.x;
    const cornerY = from.y;
    const c = Math.min(chamfer, Math.abs(dx) - 1, Math.abs(dy) - 1);
    return [
        `M ${from.x} ${from.y}`,
        `L ${cornerX - sx * c} ${cornerY}`,
        `L ${cornerX} ${cornerY + sy * c}`, // chanfrein 45°
        `L ${to.x} ${to.y}`,
    ].join(' ');
}

// Pads décoratifs (vias) répartis sur la grille, hors des cartes.
const VIAS: { x: number; y: number; ring?: boolean }[] = [
    { x: g(2), y: g(2), ring: true }, { x: g(4), y: g(6.5) }, { x: g(2.5), y: g(10.5), ring: true },
    { x: g(13), y: g(1.5) }, { x: g(13), y: g(11) }, { x: g(33), y: g(1.5), ring: true },
    { x: g(33), y: g(11) }, { x: g(44), y: g(6.5) }, { x: g(45.5), y: g(2), ring: true },
    { x: g(45.5), y: g(10.5) }, { x: g(18), y: g(1.5) }, { x: g(28), y: g(11.5), ring: true },
    { x: g(9), y: g(6.25) }, { x: g(37), y: g(6.25), ring: true },
];

// ── Une piste gravée : arête claire décalée sous le trait d'encre ────────────
function EngravedTrace({ d, accent }: { d: string; accent?: string }) {
    return (
        <g>
            <path d={d} fill="none" stroke={STROKE_HI} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" transform="translate(0,0.7)" />
            <path d={d} fill="none" stroke={accent ?? STROKE} strokeWidth={accent ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round" opacity={accent ? 0.9 : 1} />
        </g>
    );
}

export function IlluCircuit({ accent }: { accent?: string }) {
    const acc = accent ?? TOKENS.lime;
    const { ink, mutedText } = TOKENS;

    // Attaches cœur → composants (point sur le cœur le plus proche de chaque carte).
    const coreAttach = (c: Comp) => attach(CORE, c);
    const compAttach = (c: Comp) => attach(c, CORE);

    // La piste accent : du cœur vers DONNÉES (haut-droite) — celle qui guide l'œil.
    const accentTarget = COMPS[2];

    return (
        <div className="w-full font-sans" aria-hidden="true">
            <style>{`
                @keyframes illu-circuit-pulse {
                    0%   { offset-distance: 0%;   opacity: 0; }
                    8%   { opacity: 1; }
                    92%  { opacity: 1; }
                    100% { offset-distance: 100%; opacity: 0; }
                }
                .illu-circuit-signal {
                    offset-rotate: 0deg;
                    animation: illu-circuit-pulse 3.4s cubic-bezier(0.45,0,0.25,1) infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .illu-circuit-signal { animation: none; opacity: 0; }
                }
            `}</style>

            <div
                style={{
                    width: '100%',
                    maxWidth: 1100,
                    margin: '0 auto',
                    aspectRatio: `${VB_W} / ${VB_H}`,
                    minHeight: 'clamp(200px, 26vw, 320px)',
                }}
            >
                <svg
                    viewBox={`0 0 ${VB_W} ${VB_H}`}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ display: 'block', overflow: 'visible' }}
                >
                    {/* Pistes gravées : cœur → chaque composant */}
                    {COMPS.map((c) => (
                        <EngravedTrace key={`t-${c.label}`} d={tracePath(coreAttach(c), compAttach(c))} />
                    ))}

                    {/* Pads / vias discrets aux jonctions de pistes (sur le cœur) */}
                    {COMPS.map((c) => {
                        const p = coreAttach(c);
                        return <circle key={`pc-${c.label}`} cx={p.x} cy={p.y} r={3.4} fill="none" stroke={PAD} strokeWidth={1.4} />;
                    })}
                    {COMPS.map((c) => {
                        const p = compAttach(c);
                        return <circle key={`pp-${c.label}`} cx={p.x} cy={p.y} r={2.6} fill={PAD} opacity={0.7} />;
                    })}

                    {/* Vias décoratifs gravés */}
                    {VIAS.map((v, i) =>
                        v.ring ? (
                            <g key={`v-${i}`}>
                                <circle cx={v.x} cy={v.y + 0.7} r={3.2} fill="none" stroke={STROKE_HI} strokeWidth={1.4} />
                                <circle cx={v.x} cy={v.y} r={3.2} fill="none" stroke={PAD} strokeWidth={1.1} />
                                <circle cx={v.x} cy={v.y} r={1} fill={PAD} />
                            </g>
                        ) : (
                            <circle key={`v-${i}`} cx={v.x} cy={v.y} r={2} fill={STROKE} opacity={0.55} />
                        )
                    )}

                    {/* Piste accent (lime) — guide l'œil, par-dessus les pistes neutres */}
                    {(() => {
                        const d = tracePath(coreAttach(accentTarget), compAttach(accentTarget));
                        return (
                            <g key="accent-trace">
                                <EngravedTrace d={d} accent={acc} />
                                {/* impulsion de signal voyageant le long de la piste */}
                                <circle
                                    className="illu-circuit-signal"
                                    r={4}
                                    fill={acc}
                                    style={{
                                        offsetPath: `path('${d}')`,
                                        filter: `drop-shadow(0 0 5px ${acc})`,
                                    }}
                                />
                                {/* halo terne d'accroche au point d'attache accent */}
                                {(() => {
                                    const p = coreAttach(accentTarget);
                                    return <circle cx={p.x} cy={p.y} r={4.2} fill="none" stroke={acc} strokeWidth={1.6} opacity={0.85} />;
                                })()}
                            </g>
                        );
                    })()}
                </svg>

                {/* Cartes-composants embossées, positionnées en % par-dessus le SVG.
                    On repasse en superposition absolue pour profiter de l'emboss CSS
                    réel (mêmes ombres que les autres illustrations). */}
                <div style={{ position: 'relative', width: '100%', marginTop: `-${(VB_H / VB_W) * 100}%`, aspectRatio: `${VB_W} / ${VB_H}` }}>
                    {/* Cœur / orchestrateur */}
                    <CompCard comp={CORE} accent={acc} ink={ink} muted={mutedText} core />
                    {COMPS.map((c) => (
                        <CompCard key={c.label} comp={c} accent={acc} ink={ink} muted={mutedText} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Carte embossée d'un composant, placée par son centre en pourcentage du viewBox.
function CompCard({
    comp,
    accent,
    ink,
    muted,
    core = false,
}: {
    comp: Comp;
    accent: string;
    ink: string;
    muted: string;
    core?: boolean;
}) {
    const leftPct = (comp.x / VB_W) * 100;
    const topPct = (comp.y / VB_H) * 100;
    const wPct = (comp.w / VB_W) * 100;
    const hPct = (comp.h / VB_H) * 100;
    return (
        <div
            className="font-mono inline-flex items-center justify-center"
            style={{
                position: 'absolute',
                left: `${leftPct}%`,
                top: `${topPct}%`,
                width: `${wPct}%`,
                height: `${hPct}%`,
                transform: 'translate(-50%, -50%)',
                borderRadius: core ? 12 : 9,
                background: core ? '#F0F0EB' : 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F2 100%)',
                boxShadow: core ? `0 0 0 1px ${accent}26, ${EMBOSS}` : EMBOSS,
                gap: 8,
            }}
        >
            {/* pastille de circuit : carrée pour le cœur (puce), point pour les capacités */}
            <span
                style={{
                    width: core ? 9 : 6,
                    height: core ? 9 : 6,
                    borderRadius: core ? 2 : 999,
                    background: core ? accent : 'rgba(23,23,23,0.4)',
                    boxShadow: core ? `inset 0 0.8px 0.8px rgba(120,140,40,0.5)` : 'none',
                    flex: '0 0 auto',
                }}
            />
            <span
                style={{
                    fontSize: core ? 12 : 10,
                    letterSpacing: '0.16em',
                    color: core ? ink : muted,
                    whiteSpace: 'nowrap',
                }}
            >
                {comp.label}
            </span>
        </div>
    );
}
