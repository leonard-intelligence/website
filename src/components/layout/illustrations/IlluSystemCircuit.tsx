// LE SYSTÈME — circuit en relief (référence AgentMail) : tuiles et pistes
// forment UNE SEULE FORME continue. Le réseau (tuiles + connecteurs) est
// dessiné en SVG en trois couches superposées — ombre portée, liseré blanc,
// corps en dégradé — appliquées à l'UNION des formes : aucune couture entre
// une piste et une tuile. Les 7 couches numérotées sont cliquables et
// s'allument une à une (encre + liseré blanc) ; des impulsions parcourent
// la piste ; 07 Sécurité est LE CADRE qui entoure tout.
import { useEffect, useRef, useState } from 'react';
import { TOKENS } from '../Sections';

const W = 1000;
const H = 440;

const ROW_Y = 165; // dorsale
const MID_Y = 252; // tuiles relais des branches
const SUB_Y = 332; // rangée données/contexte

type Tile = { x: number; y: number; s: number; id?: string; label?: string; href?: string };

// La dorsale : tuiles presque adjacentes, tailles variées, le chemin passe au travers.
const TILES: Tile[] = [
    // — chaîne principale (gauche → droite)
    { x: 110, y: ROW_Y, s: 76, id: '01', label: 'Modèles', href: '#section-modeles' },
    { x: 205, y: ROW_Y, s: 44 },
    { x: 287, y: ROW_Y, s: 56 },
    { x: 382, y: ROW_Y, s: 76, id: '02', label: 'Harnais', href: '#section-harnais' },
    { x: 474, y: ROW_Y, s: 44 },
    { x: 553, y: ROW_Y, s: 56 },
    { x: 648, y: ROW_Y, s: 76, id: '05', label: 'Capacités', href: '#section-capabilities' },
    { x: 740, y: ROW_Y, s: 44 },
    { x: 818, y: ROW_Y, s: 56 },
    { x: 912, y: ROW_Y, s: 76, id: '06', label: 'Interfaces', href: '#section-produits' },
    // — branche Données (sous la tuile relais x=287)
    { x: 287, y: MID_Y, s: 36 },
    { x: 287, y: SUB_Y, s: 76, id: '03', label: 'Données', href: '#section-donnees' },
    // — branche Contexte (sous la tuile relais x=553)
    { x: 553, y: MID_Y, s: 36 },
    { x: 553, y: SUB_Y, s: 76, id: '04', label: 'Contexte', href: '#section-contexte' },
];

// pistes : centre à centre (l'union masque les jonctions)
const LINKS: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
    [2, 10], [10, 11],
    [5, 12], [12, 13],
];

// tuiles décoratives non reliées — éparpillées comme dans la référence
const DECO: Tile[] = [
    { x: 178, y: 58, s: 44 }, { x: 424, y: 66, s: 32 }, { x: 762, y: 54, s: 44 }, { x: 952, y: 86, s: 32 },
    { x: 86, y: 296, s: 32 }, { x: 168, y: 356, s: 44 }, { x: 724, y: 330, s: 44 }, { x: 842, y: 296, s: 32 }, { x: 944, y: 348, s: 44 },
];

// impulsions ambiantes (SMIL) — la dorsale entière + les deux branches
const PULSES: { path: string; dur: number; begin: number }[] = [
    { path: `M110 ${ROW_Y} L912 ${ROW_Y}`, dur: 7, begin: 0 },
    { path: `M287 ${SUB_Y} L287 ${ROW_Y}`, dur: 2.2, begin: 1.2 },
    { path: `M553 ${SUB_Y} L553 ${ROW_Y}`, dur: 2.2, begin: 2.6 },
];

// séquence d'activation
const SEQ: string[][] = [['01'], ['03', '04'], ['02'], ['05'], ['06'], ['07'], []];
const DURS = [1500, 1700, 1500, 1500, 1500, 1700, 2200];
const TOTAL = DURS.reduce((a, b) => a + b, 0);

const TRACE_W = 12;
const radiusFor = (s: number) => (s >= 76 ? 18 : s >= 56 ? 14 : s >= 44 ? 12 : 10);

// L'union du réseau : toutes les formes (tuiles, pistes, déco) en rects SVG.
// Rendue trois fois (ombre, liseré, corps) pour un relief sans couture.
function NetworkShapes() {
    return (
        <>
            {LINKS.map(([a, b], i) => {
                const ta = TILES[a];
                const tb = TILES[b];
                const horiz = ta.y === tb.y;
                return horiz ? (
                    <rect key={`l${i}`} x={Math.min(ta.x, tb.x)} y={ta.y - TRACE_W / 2} width={Math.abs(tb.x - ta.x)} height={TRACE_W} rx={TRACE_W / 2} />
                ) : (
                    <rect key={`l${i}`} x={ta.x - TRACE_W / 2} y={Math.min(ta.y, tb.y)} width={TRACE_W} height={Math.abs(tb.y - ta.y)} rx={TRACE_W / 2} />
                );
            })}
            {[...TILES, ...DECO].map((t, i) => (
                <rect key={`t${i}`} x={t.x - t.s / 2} y={t.y - t.s / 2} width={t.s} height={t.s} rx={radiusFor(t.s)} />
            ))}
        </>
    );
}

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
    const isActive = (id?: string) => !!id && activeIds.includes(id);

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

                    {/* le réseau — une seule forme continue, relief en 3 couches */}
                    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ position: 'absolute', inset: 0, display: 'block', pointerEvents: 'none' }}>
                        <defs>
                            <linearGradient id="sc-body" x1="0" y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#FDFDFB" />
                                <stop offset="1" stopColor="#EFEFEA" />
                            </linearGradient>
                            <filter id="sc-blur" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" />
                            </filter>
                        </defs>
                        {/* 1 · ombre portée de l'union */}
                        <g fill="rgba(23,23,23,0.16)" filter="url(#sc-blur)" transform="translate(0 3)">
                            <NetworkShapes />
                        </g>
                        {/* 2 · liseré blanc (arête haute) */}
                        <g fill="rgba(255,255,255,0.95)" transform="translate(0 -1.4)">
                            <NetworkShapes />
                        </g>
                        {/* 3 · corps */}
                        <g fill="url(#sc-body)">
                            <NetworkShapes />
                        </g>

                        {/* impulsions le long de la piste */}
                        <g className="sc-smil">
                            {PULSES.map((p, i) => (
                                <circle key={i} r="3.4" fill={ink} opacity="0">
                                    <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.begin}s`} path={p.path} />
                                    <animate attributeName="opacity" values="0;0.4;0.4;0" keyTimes="0;0.06;0.94;1" dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.begin}s`} />
                                </circle>
                            ))}
                        </g>
                    </svg>

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
                            background: isActive('07') ? ink : 'linear-gradient(180deg, #FFFFFF 0%, #F2F2ED 100%)',
                            boxShadow: isActive('07')
                                ? '0 0 0 1.5px rgba(255,255,255,0.85), 0 1px 2px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.06)'
                                : '0 1px 2px rgba(0,0,0,0.14), 0 3px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            transition: 'background 400ms ease, color 400ms ease, box-shadow 400ms ease',
                        }}
                    >
                        07 · SÉCURITÉ · LE CADRE
                    </a>

                    {/* couches numérotées : numéro + label + état actif en overlay
                        (le visuel au repos vient de la forme continue dessous) */}
                    {TILES.filter((t) => t.id).map((t) => {
                        const active = isActive(t.id);
                        return (
                            <a
                                key={t.id}
                                href={t.href}
                                className="absolute flex flex-col items-center"
                                style={{ left: t.x - t.s / 2, top: t.y - t.s / 2, width: t.s, textDecoration: 'none' }}
                            >
                                <span
                                    className="flex items-center justify-center font-mono"
                                    style={{
                                        width: t.s,
                                        height: t.s,
                                        borderRadius: radiusFor(t.s),
                                        fontSize: 15,
                                        letterSpacing: '0.06em',
                                        color: active ? '#FFFFFF' : TOKENS.ink,
                                        background: active ? ink : 'transparent',
                                        boxShadow: active
                                            ? '0 0 0 2px rgba(255,255,255,0.9), 0 6px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.25)'
                                            : 'none',
                                        transform: active ? 'translateY(-2px)' : 'none',
                                        transition: 'background 400ms ease, color 400ms ease, box-shadow 400ms ease, transform 400ms ease',
                                    }}
                                >
                                    {t.id}
                                </span>
                                <span
                                    className="font-mono"
                                    style={{ marginTop: 8, fontSize: 10, letterSpacing: '0.1em', color: active ? TOKENS.ink : mutedText, whiteSpace: 'nowrap', transition: 'color 400ms ease' }}
                                >
                                    {t.label}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
