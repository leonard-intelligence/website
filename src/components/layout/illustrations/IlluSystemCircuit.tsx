// LE SYSTÈME — circuit en relief (référence AgentMail) : les couches du
// système comme nœuds carrés arrondis embossés, reliés par des pistes en
// relief ton sur ton. 01 Modèles → 02 Harnais → 05 Capacités → 06 Interfaces
// sur la dorsale ; 03 Données et 04 Contexte s'y branchent par en dessous ;
// 07 Sécurité est LE CADRE qui entoure tout. Chaque nœud est cliquable
// (ancre vers sa section). Séquence : les couches s'allument une à une
// (fond encre + liseré blanc), des impulsions parcourent les pistes.
import { useEffect, useRef, useState } from 'react';
import { TOKENS } from '../Sections';

const W = 1000;
const H = 400;
const NODE = 76; // côté d'un nœud
const TRACE = 10; // épaisseur d'une piste

const SPINE_Y = 150; // dorsale
const SUB_Y = 312; // rangée données/contexte

type Node = { id: string; label: string; x: number; y: number; href: string };
const NODES: Node[] = [
    { id: '01', label: 'Modèles', x: 120, y: SPINE_Y, href: '#section-modeles' },
    { id: '02', label: 'Harnais', x: 380, y: SPINE_Y, href: '#section-harnais' },
    { id: '05', label: 'Capacités', x: 620, y: SPINE_Y, href: '#section-capabilities' },
    { id: '06', label: 'Interfaces', x: 860, y: SPINE_Y, href: '#section-produits' },
    { id: '03', label: 'Données', x: 310, y: SUB_Y, href: '#section-donnees' },
    { id: '04', label: 'Contexte', x: 520, y: SUB_Y, href: '#section-contexte' },
];

// pistes : [x1, y1, x2, y2] (barres horizontales ou verticales entre nœuds)
const R = NODE / 2;
const TRACES: [number, number, number, number][] = [
    [120 + R, SPINE_Y, 380 - R, SPINE_Y], // 01 → 02
    [380 + R, SPINE_Y, 620 - R, SPINE_Y], // 02 → 05
    [620 + R, SPINE_Y, 860 - R, SPINE_Y], // 05 → 06
    [310, SPINE_Y + TRACE / 2, 310, SUB_Y - R], // 03 ↑ dorsale
    [520, SPINE_Y + TRACE / 2, 520, SUB_Y - R], // 04 ↑ dorsale
];

// impulsions ambiantes le long des pistes (SMIL, timeline commune)
const PULSES: { path: string; dur: number; begin: number }[] = [
    { path: `M${120 + R} ${SPINE_Y} L${380 - R} ${SPINE_Y}`, dur: 2.4, begin: 0 },
    { path: `M310 ${SUB_Y - R} L310 ${SPINE_Y + 4}`, dur: 1.8, begin: 0.9 },
    { path: `M520 ${SUB_Y - R} L520 ${SPINE_Y + 4}`, dur: 1.8, begin: 1.5 },
    { path: `M${380 + R} ${SPINE_Y} L${620 - R} ${SPINE_Y}`, dur: 2.4, begin: 0.6 },
    { path: `M${620 + R} ${SPINE_Y} L${860 - R} ${SPINE_Y}`, dur: 2.4, begin: 1.2 },
];

// tuiles décoratives gravées (vides) — le grain « circuit » de la référence
const DECO: [number, number, number][] = [
    [205, 62, 30], [705, 58, 24], [945, 240, 28], [62, 262, 24], [663, 318, 22], [880, 330, 26],
];

// séquence d'activation
const SEQ: string[][] = [['01'], ['03', '04'], ['02'], ['05'], ['06'], ['07'], []];
const DURS = [1500, 1700, 1500, 1500, 1500, 1700, 2200];
const TOTAL = DURS.reduce((a, b) => a + b, 0);

// relief
const TILE_UP = 'linear-gradient(180deg, #FFFFFF 0%, #F2F2ED 100%)';
const TILE_SHADOW = '0 1px 2px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)';
const TRACE_BG = 'linear-gradient(180deg, #FBFBF8 0%, #EEEEE9 100%)';
const TRACE_SHADOW = '0 1px 1.5px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.9)';
const DECO_SHADOW = 'inset 1px 1.5px 3px rgba(0,0,0,0.10), inset -1px -1px 1px rgba(255,255,255,0.85)';

export function IlluSystemCircuit() {
    const { ink, mutedText } = TOKENS;

    // canvas fixe auto-scalé
    const wrapRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setScale(Math.min(1.18, el.clientWidth / W)));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // horloge de séquence (dérivée du temps, même mécanique que le Harnais)
    const [step, setStep] = useState(0);
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setStep(SEQ.length - 1);
            return;
        }
        const t0 = performance.now();
        const id = setInterval(() => {
            const e = (performance.now() - t0) % TOTAL;
            let acc = 0;
            let s = DURS.length - 1;
            for (let i = 0; i < DURS.length; i++) {
                acc += DURS[i];
                if (e < acc) { s = i; break; }
            }
            setStep(s);
        }, 140);
        return () => clearInterval(id);
    }, []);

    const activeIds = SEQ[step];
    const isActive = (id: string) => activeIds.includes(id);

    return (
        <div ref={wrapRef} className="w-full mx-auto" aria-hidden="false" style={{ maxWidth: W * 1.18 }}>
            <style>{`@media (prefers-reduced-motion: reduce) { .sc-smil { display: none; } }`}</style>
            <div className="relative" style={{ height: H * scale }}>
                <div
                    className="absolute font-sans"
                    style={{ left: '50%', top: 0, width: W, height: H, transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'top center' }}
                >
                    {/* 07 — le cadre de sécurité, autour de tout */}
                    <a
                        href="#section-securite"
                        className="absolute block"
                        style={{
                            inset: 4,
                            borderRadius: 30,
                            border: '8px solid #F1F1EC',
                            boxShadow: isActive('07')
                                ? `0 0 0 1.5px ${ink}38, 0 1px 2px rgba(0,0,0,0.10), inset 0 1px 1px rgba(0,0,0,0.05), inset 0 -1px 0 rgba(255,255,255,0.9)`
                                : '0 1px 2px rgba(0,0,0,0.10), inset 0 1px 1px rgba(0,0,0,0.05), inset 0 -1px 0 rgba(255,255,255,0.9)',
                            transition: 'box-shadow 400ms ease',
                        }}
                        aria-label="07 · Sécurité & gouvernance"
                    />
                    {/* étiquette du cadre, posée sur la bordure */}
                    <a
                        href="#section-securite"
                        className="absolute font-mono"
                        style={{
                            right: 52,
                            bottom: 3,
                            fontSize: 9.5,
                            letterSpacing: '0.14em',
                            color: isActive('07') ? '#FFFFFF' : mutedText,
                            padding: '4px 11px',
                            borderRadius: 999,
                            background: isActive('07') ? ink : TILE_UP,
                            boxShadow: isActive('07') ? `0 0 0 1.5px rgba(255,255,255,0.85), ${TILE_SHADOW}` : TILE_SHADOW,
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            transition: 'background 400ms ease, color 400ms ease, box-shadow 400ms ease',
                        }}
                    >
                        07 · SÉCURITÉ · LE CADRE
                    </a>

                    {/* pistes en relief */}
                    {TRACES.map(([x1, y1, x2, y2], i) => {
                        const horiz = y1 === y2;
                        return (
                            <span
                                key={i}
                                className="absolute"
                                style={
                                    horiz
                                        ? { left: x1, top: y1 - TRACE / 2, width: x2 - x1, height: TRACE, borderRadius: TRACE / 2, background: TRACE_BG, boxShadow: TRACE_SHADOW }
                                        : { left: x1 - TRACE / 2, top: y1, width: TRACE, height: y2 - y1, borderRadius: TRACE / 2, background: TRACE_BG, boxShadow: TRACE_SHADOW }
                                }
                            />
                        );
                    })}

                    {/* impulsions le long des pistes */}
                    <svg className="sc-smil absolute" viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ inset: 0, pointerEvents: 'none' }}>
                        {PULSES.map((p, i) => (
                            <circle key={i} r="3.2" fill={ink} opacity="0">
                                <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.begin}s`} path={p.path} />
                                <animate attributeName="opacity" values="0;0.4;0.4;0" keyTimes="0;0.15;0.8;1" dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.begin}s`} />
                            </circle>
                        ))}
                    </svg>

                    {/* tuiles décoratives gravées */}
                    {DECO.map(([x, y, s], i) => (
                        <span key={i} className="absolute" style={{ left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: 8, boxShadow: DECO_SHADOW }} />
                    ))}

                    {/* nœuds */}
                    {NODES.map((n) => {
                        const active = isActive(n.id);
                        return (
                            <a
                                key={n.id}
                                href={n.href}
                                className="absolute flex flex-col items-center group"
                                style={{ left: n.x - R, top: n.y - R, width: NODE, textDecoration: 'none' }}
                            >
                                <span
                                    className="flex items-center justify-center font-mono"
                                    style={{
                                        width: NODE,
                                        height: NODE,
                                        borderRadius: 18,
                                        fontSize: 15,
                                        letterSpacing: '0.06em',
                                        color: active ? '#FFFFFF' : TOKENS.ink,
                                        background: active ? ink : TILE_UP,
                                        boxShadow: active
                                            ? `0 0 0 2px rgba(255,255,255,0.9), 0 6px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.25)`
                                            : TILE_SHADOW,
                                        transform: active ? 'translateY(-2px)' : 'none',
                                        transition: 'background 400ms ease, color 400ms ease, box-shadow 400ms ease, transform 400ms ease',
                                    }}
                                >
                                    {n.id}
                                </span>
                                <span
                                    className="font-mono"
                                    style={{ marginTop: 8, fontSize: 10, letterSpacing: '0.1em', color: active ? TOKENS.ink : mutedText, whiteSpace: 'nowrap', transition: 'color 400ms ease' }}
                                >
                                    {n.label}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
