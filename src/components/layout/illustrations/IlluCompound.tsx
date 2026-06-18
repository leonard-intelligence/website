// 04 · CONTEXTE & CONNAISSANCE — un graphe de connaissance qui se construit.
// Croissance en phyllotaxie (tournesol) : « l'intelligence se cultive ». Le
// graphe part d'un point au centre et grandit beaucoup ; les points deviennent
// de plus en plus petits à mesure que le corpus s'étend vers l'extérieur, puis
// ça repart en boucle (croissance → palier → fondu → ça repart). Cœur accentué
// (forest) = la connaissance vivante reliée ; périphérie grise = le corpus.
// Désactivé sous prefers-reduced-motion (graphe complet figé).
import { useEffect, useRef, useState } from 'react';
import { TOKENS } from '../Sections';
import { EMBOSS } from './kit';

// ── Graphe précalculé sur un repère 100×100, en spirale de phyllotaxie. ───────
const GOLDEN = Math.PI * (3 - Math.sqrt(5)); // angle d'or ≈ 2.39996 rad
const N = 64;            // nombre de nœuds à terme
const SPREAD = 5.2;      // espacement radial (unités viewBox)
const CX = 50, CY = 50;  // centre
const R_MAX = 3.2, R_MIN = 0.55, R_POW = 1.25; // les points rétrécissent vers l'extérieur

type GNode = { x: number; y: number; r: number; parent: number; hot: boolean };

const GNODES: GNode[] = (() => {
    const nodes: GNode[] = [];
    for (let i = 0; i < N; i++) {
        const rad = SPREAD * Math.sqrt(i);
        const a = i * GOLDEN;
        const x = CX + rad * Math.cos(a);
        const y = CY + rad * Math.sin(a);
        // rayon : grand au cœur, de plus en plus petit vers la périphérie
        const r = R_MAX * Math.pow(1 - i / N, R_POW) + R_MIN;
        // parent = le nœud antérieur le plus proche → relie le graphe en arbre
        let parent = -1;
        if (i > 0) {
            let best = Infinity;
            for (let j = Math.max(0, i - 14); j < i; j++) {
                const d = (nodes[j].x - x) ** 2 + (nodes[j].y - y) ** 2;
                if (d < best) { best = d; parent = j; }
            }
        }
        nodes.push({ x, y, r, parent, hot: i < N * 0.32 });
    }
    return nodes;
})();

// ── Phases du cycle (ms) : croissance → palier → fondu, puis ça repart. ───────
const GROW = 5200, HOLD = 1500, FADE = 700;
const CYCLE = GROW + HOLD + FADE;
const APPEAR = 0.045; // fenêtre d'apparition d'un nœud (fraction de la croissance)

export function IlluCompound({ accent }: { accent: string }) {
    const { white, pale, surface } = TOKENS;
    const forest = accent; // l'accent transmis (TOKENS.forest) pilote la couleur

    const reduce =
        typeof window !== 'undefined' &&
        !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // horloge du cycle (ms) — figée au graphe complet sous reduced-motion
    const [clock, setClock] = useState(reduce ? GROW : 0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (reduce) return;
        let start = 0;
        const tick = (ts: number) => {
            if (!start) start = ts;
            setClock((ts - start) % CYCLE);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [reduce]);

    // Avancement de la croissance (eased) + opacité globale (fondu de fin).
    let growE: number;
    let globalOp: number;
    if (reduce) {
        growE = 1; globalOp = 1;
    } else if (clock < GROW) {
        const t = clock / GROW;
        growE = 1 - (1 - t) * (1 - t); // easeOut : la croissance décélère
        globalOp = 1;
    } else if (clock < GROW + HOLD) {
        growE = 1; globalOp = 1;
    } else {
        growE = 1; globalOp = 1 - (clock - GROW - HOLD) / FADE;
    }

    const nodeOp = (i: number) => Math.max(0, Math.min(1, (growE - i / N) / APPEAR)) * globalOp;
    const nodeScale = (i: number) => {
        const local = Math.max(0, Math.min(1, (growE - i / N) / APPEAR));
        return 0.3 + 0.7 * local;
    };

    return (
        <div className="w-full mx-auto font-sans" style={{ maxWidth: 520 }} aria-hidden="true">
            <div
                className="relative w-full"
                style={{
                    aspectRatio: '1 / 1',
                    borderRadius: 16,
                    background: `radial-gradient(120% 120% at 50% 50%, ${white} 0%, ${pale} 58%, ${surface} 100%)`,
                    boxShadow: EMBOSS,
                    overflow: 'hidden',
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ position: 'absolute', inset: 0, display: 'block' }}
                    aria-hidden="true"
                >
                    {/* halo doux au cœur */}
                    <circle cx={CX} cy={CY} r="18" fill={`${forest}12`} opacity={globalOp} />

                    {/* arêtes — chaque nœud relié à son parent, apparaît avec lui */}
                    {GNODES.map((n, i) => {
                        if (n.parent < 0) return null;
                        const p = GNODES[n.parent];
                        const op = Math.min(nodeOp(i), nodeOp(n.parent));
                        if (op <= 0.01) return null;
                        const hot = n.hot && p.hot;
                        return (
                            <line
                                key={`e${i}`}
                                x1={p.x} y1={p.y} x2={n.x} y2={n.y}
                                stroke={hot ? `${forest}80` : 'rgba(23,23,23,0.16)'}
                                strokeWidth={hot ? 0.55 : 0.4}
                                strokeLinecap="round"
                                opacity={op}
                            />
                        );
                    })}

                    {/* nœuds — grands au cœur, de plus en plus petits vers l'extérieur */}
                    {GNODES.map((n, i) => {
                        const op = nodeOp(i);
                        if (op <= 0.01) return null;
                        const rr = n.r * nodeScale(i);
                        const fill = n.hot ? forest : 'rgba(23,23,23,0.34)';
                        return (
                            <g key={`n${i}`} opacity={op}>
                                <circle cx={n.x} cy={n.y} r={rr + 1.1} fill="none" stroke={n.hot ? `${forest}33` : 'rgba(23,23,23,0.10)'} strokeWidth="0.6" />
                                <circle cx={n.x} cy={n.y} r={rr} fill={white} stroke={fill} strokeWidth="0.8" />
                                <circle cx={n.x} cy={n.y} r={rr} fill={n.hot ? `${forest}26` : 'rgba(23,23,23,0.06)'} />
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
