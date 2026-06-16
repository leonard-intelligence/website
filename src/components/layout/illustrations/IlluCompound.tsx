// 04 · CONTEXTE & CONNAISSANCE — "Une mémoire qui se capitalise." (decorative).
// Vue façon Obsidian : un graphe de connaissance où les notes se lient et
// s'accumulent. Cœur accentué (forest) = la connaissance vivante, reliée ;
// périphérie grise = le reste du corpus. Positions placées à la main (look
// force-directed, pas de physique), respiration CSS très lente et désactivée
// sous prefers-reduced-motion. Gravure embossée comme les autres sections.
import { TOKENS } from '../Sections';
import { EMBOSS } from './kit';

// ── Le graphe — coordonnées sur un repère 100×100, placées à la main pour
//    un rendu organique (amas central dense, satellites épars). ───────────────
type Node = {
    id: string;
    x: number;
    y: number;
    r: number;          // rayon (plus grand = note plus reliée / importante)
    label?: string;
    pos?: 'top' | 'bottom' | 'left' | 'right'; // côté du libellé
    hot?: boolean;      // appartient au cœur accentué (forest)
    drift?: number;     // index de respiration (0–3), répartit les phases
};

const NODES: Node[] = [
    // ── Cœur accentué — la connaissance reliée qui se capitalise ──
    { id: 'dossier', x: 47, y: 49, r: 6.2, label: 'Dossier client', pos: 'right', hot: true, drift: 0 },
    { id: 'playbook', x: 33, y: 35, r: 4.6, label: 'Playbook', pos: 'left', hot: true, drift: 2 },
    { id: 'regle', x: 62, y: 36, r: 4.0, label: 'Règle métier', pos: 'right', hot: true, drift: 1 },
    { id: 'decision', x: 58, y: 63, r: 4.3, label: 'Décision', pos: 'right', hot: true, drift: 3 },
    { id: 'synthese', x: 38, y: 64, r: 3.4, label: 'Synthèse', pos: 'left', hot: true, drift: 1 },
    { id: 'h1', x: 49, y: 33, r: 2.0, hot: true, drift: 2 },
    { id: 'h2', x: 46, y: 64, r: 1.8, hot: true, drift: 0 },

    // ── Périphérie grise — le corpus accumulé ──
    { id: 'historique', x: 22, y: 56, r: 3.6, label: 'Historique', pos: 'left', drift: 3 },
    { id: 'precedent', x: 75, y: 55, r: 3.4, label: 'Précédent', pos: 'right', drift: 0 },
    { id: 'contrat', x: 70, y: 22, r: 3.2, label: 'Contrat', pos: 'top', drift: 2 },
    { id: 'note', x: 26, y: 22, r: 2.8, label: 'Note', pos: 'top', drift: 1 },
    { id: 'd1', x: 84, y: 38, r: 1.7, drift: 3 },
    { id: 'd2', x: 16, y: 38, r: 1.6, drift: 0 },
    { id: 'd3', x: 78, y: 72, r: 2.0, drift: 1 },
    { id: 'd4', x: 33, y: 78, r: 1.7, drift: 2 },
    { id: 'd5', x: 58, y: 80, r: 1.5, drift: 3 },
];

const NODE = (id: string): Node => NODES.find((n) => n.id === id)!;

// ── Les liens. `hot` = arête du cœur (forest), sinon gris translucide. ────────
type Edge = { a: string; b: string; hot?: boolean };
const EDGES: Edge[] = [
    // tissu du cœur
    { a: 'dossier', b: 'playbook', hot: true },
    { a: 'dossier', b: 'regle', hot: true },
    { a: 'dossier', b: 'decision', hot: true },
    { a: 'dossier', b: 'synthese', hot: true },
    { a: 'dossier', b: 'h1', hot: true },
    { a: 'dossier', b: 'h2', hot: true },
    { a: 'playbook', b: 'regle', hot: true },
    { a: 'regle', b: 'decision', hot: true },
    { a: 'synthese', b: 'decision', hot: true },
    { a: 'playbook', b: 'synthese', hot: true },
    // accroches vers le corpus
    { a: 'playbook', b: 'historique' },
    { a: 'synthese', b: 'historique' },
    { a: 'decision', b: 'precedent' },
    { a: 'regle', b: 'precedent' },
    { a: 'regle', b: 'contrat' },
    { a: 'playbook', b: 'note' },
    { a: 'historique', b: 'd2' },
    { a: 'precedent', b: 'd1' },
    { a: 'contrat', b: 'd1' },
    { a: 'precedent', b: 'd3' },
    { a: 'historique', b: 'd4' },
    { a: 'decision', b: 'd5' },
    { a: 'd3', b: 'd5' },
    { a: 'note', b: 'd2' },
];

const GREY_EDGE = 'rgba(23,23,23,0.13)';
const GREY_NODE = 'rgba(23,23,23,0.34)';
const GREY_RING = 'rgba(23,23,23,0.10)';

export function IlluCompound({ accent }: { accent: string }) {
    const { ink, mutedText, white, pale, surface } = TOKENS;
    const forest = accent; // l'accent transmis (TOKENS.forest) pilote la couleur du graphe

    return (
        <div className="w-full mx-auto font-sans" style={{ maxWidth: 520 }} aria-hidden="true">
            <div className="font-sans" style={{ fontSize: 16, fontWeight: 600, color: ink, lineHeight: 1.2 }}>
                Une mémoire qui se capitalise
            </div>
            <div className="font-mono" style={{ fontSize: 10.5, color: mutedText, marginTop: 6, marginBottom: 16 }}>
                Chaque dossier se relie aux précédents, et le savoir s'accumule.
            </div>

            <div
                className="relative w-full"
                style={{
                    aspectRatio: '1 / 1',
                    borderRadius: 16,
                    background: `radial-gradient(120% 120% at 47% 49%, ${white} 0%, ${pale} 58%, ${surface} 100%)`,
                    boxShadow: EMBOSS,
                    overflow: 'hidden',
                }}
            >
                <style>{`
                    @keyframes ic-breathe-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(0.5px,-0.7px); } }
                    @keyframes ic-breathe-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-0.6px,0.5px); } }
                    @keyframes ic-breathe-2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(0.7px,0.4px); } }
                    @keyframes ic-breathe-3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-0.4px,-0.6px); } }
                    @keyframes ic-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 0.95; } }
                    .ic-n0 { animation: ic-breathe-0 9s ease-in-out infinite; }
                    .ic-n1 { animation: ic-breathe-1 11s ease-in-out infinite; }
                    .ic-n2 { animation: ic-breathe-2 10s ease-in-out infinite; }
                    .ic-n3 { animation: ic-breathe-3 12s ease-in-out infinite; }
                    .ic-core { animation: ic-pulse 6.5s ease-in-out infinite; }
                    @media (prefers-reduced-motion: reduce) {
                        .ic-n0, .ic-n1, .ic-n2, .ic-n3, .ic-core { animation: none !important; }
                    }
                `}</style>

                <svg
                    viewBox="0 0 100 100"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ position: 'absolute', inset: 0, display: 'block', overflow: 'visible' }}
                    aria-hidden="true"
                >
                    {/* halo doux sous le cœur accentué */}
                    <circle className="ic-core" cx={NODE('dossier').x} cy={NODE('dossier').y} r="20" fill={`${forest}14`} />

                    {/* arêtes — gris d'abord (dessous), forest ensuite (dessus) */}
                    {EDGES.filter((e) => !e.hot).map((e, i) => {
                        const a = NODE(e.a);
                        const b = NODE(e.b);
                        return (
                            <line
                                key={`g${i}`}
                                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                                stroke={GREY_EDGE} strokeWidth="0.5" strokeLinecap="round"
                            />
                        );
                    })}
                    {EDGES.filter((e) => e.hot).map((e, i) => {
                        const a = NODE(e.a);
                        const b = NODE(e.b);
                        return (
                            <line
                                key={`h${i}`}
                                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                                stroke={`${forest}80`} strokeWidth="0.62" strokeLinecap="round"
                            />
                        );
                    })}

                    {/* nœuds */}
                    {NODES.map((n) => {
                        const fill = n.hot ? forest : GREY_NODE;
                        const ring = n.hot ? `${forest}33` : GREY_RING;
                        return (
                            <g key={n.id} className={`ic-n${n.drift ?? 0}`}>
                                {/* anneau translucide */}
                                <circle cx={n.x} cy={n.y} r={n.r + 1.5} fill="none" stroke={ring} strokeWidth="0.7" />
                                {/* corps : fond clair + liseré coloré, façon note */}
                                <circle cx={n.x} cy={n.y} r={n.r} fill={white} stroke={fill} strokeWidth="0.9" />
                                <circle cx={n.x} cy={n.y} r={n.r} fill={n.hot ? `${forest}26` : 'rgba(23,23,23,0.06)'} />
                            </g>
                        );
                    })}
                </svg>

                {/* libellés mono, placés en absolu (même technique qu'IlluHarness) */}
                {NODES.filter((n) => n.label).map((n) => {
                    const off = n.r + 3.4; // distance du libellé au bord, en unités de viewBox
                    const place: Record<string, { left: string; top: string; tx: string }> = {
                        right: { left: `${n.x + off}%`, top: `${n.y}%`, tx: 'translate(0, -50%)' },
                        left: { left: `${n.x - off}%`, top: `${n.y}%`, tx: 'translate(-100%, -50%)' },
                        top: { left: `${n.x}%`, top: `${n.y - off}%`, tx: 'translate(-50%, -100%)' },
                        bottom: { left: `${n.x}%`, top: `${n.y + off}%`, tx: 'translate(-50%, 0)' },
                    };
                    const p = place[n.pos ?? 'right'];
                    return (
                        <span
                            key={`l-${n.id}`}
                            className="font-mono"
                            style={{
                                position: 'absolute',
                                left: p.left,
                                top: p.top,
                                transform: p.tx,
                                fontSize: 10,
                                letterSpacing: '0.01em',
                                lineHeight: 1,
                                whiteSpace: 'nowrap',
                                color: n.hot ? ink : mutedText,
                                pointerEvents: 'none',
                            }}
                        >
                            {n.label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
