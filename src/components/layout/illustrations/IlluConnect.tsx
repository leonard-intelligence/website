// 03 · DONNÉES & INTÉGRATIONS — la centralisation : les flux arrivent de
// PARTOUT (BDD, chat du site, WhatsApp, e-mails, Discord), chacun avec SA
// forme et SA couleur — triangle, rond, losange… — et ressortent du contexte
// UNIFIÉS : mêmes paquets, même couleur, prêts pour l'agent. La normalisation
// se voit. Langage graphique : gravure en creux, cartes embossées.
import { useEffect, useRef, useState } from 'react';
import { TOKENS } from '../Sections';
import { EMBOSS, EMBOSS_SOFT, PulseDot } from './kit';

const STROKE = 'rgba(23,23,23,0.16)';
const STROKE_HI = 'rgba(255,255,255,0.9)';

// chaque source a sa forme et sa couleur — des données hétérogènes
type SourceShape = 'square' | 'circle' | 'triangle' | 'diamond' | 'pentagon';
const SOURCES: { label: string; shape: SourceShape; color: string }[] = [
    { label: 'BDD', shape: 'square', color: '#EEC75D' },
    { label: 'Chat du site', shape: 'circle', color: '#A3E635' },
    { label: 'WhatsApp', shape: 'triangle', color: '#71CE45' },
    { label: 'E-mails', shape: 'diamond', color: '#D97757' },
    { label: 'Discord', shape: 'pentagon', color: '#8C9EFF' },
];
const YS = [30, 90, 150, 210, 270]; // viewBox-space y centers (0..300)

// la forme d'un paquet de données (centrée sur 0,0 — suit un animateMotion)
function PacketShape({ shape, color }: { shape: SourceShape; color: string }) {
    switch (shape) {
        case 'circle':
            return <circle r="3.4" fill={color} />;
        case 'triangle':
            return <polygon points="0,-4 3.6,2.8 -3.6,2.8" fill={color} />;
        case 'diamond':
            return <polygon points="0,-4.2 4.2,0 0,4.2 -4.2,0" fill={color} />;
        case 'pentagon':
            return <polygon points="0,-4 3.8,-1.2 2.4,3.4 -2.4,3.4 -3.8,-1.2" fill={color} />;
        default:
            return <rect x="-3" y="-3" width="6" height="6" rx="1" fill={color} />;
    }
}

// courbe d'entrée : départ des puces (x=148) vers le nœud unifié (x=268, y=150)
const inPath = (cy: number) => `M148 ${cy} C 208 ${cy}, 208 150, 268 150`;
// sortie : du nœud unifié (x=388) vers l'agent (x=432, y=150)
const OUT_PATH = 'M388 150 L 432 150';

const CANVAS_W = 460;
const CANVAS_H = 300;

export function IlluConnect({ accent }: { accent: string }) {
    const { ink, mutedText, surface, white, pale, forest } = TOKENS;

    // Canvas de conception fixe (460×300) mis à l'échelle du conteneur réel :
    // les cartes gardent leurs proportions sur toutes les largeurs.
    const wrapRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / CANVAS_W)));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div ref={wrapRef} className="w-full mx-auto font-sans" style={{ maxWidth: 480 }} aria-hidden="true">
            <style>{`
                @media (prefers-reduced-motion: reduce) { .ic-smil { display: none; } }
            `}</style>
            <div className="relative" style={{ height: CANVAS_H * scale }}>
            <div
                className="absolute"
                style={{ left: '50%', top: 0, width: CANVAS_W, height: CANVAS_H, transform: `translateX(-50%) scale(${scale})`, transformOrigin: 'top center' }}
            >
                <svg viewBox="0 0 460 300" width="100%" height="100%" style={{ position: 'absolute', inset: 0, display: 'block' }} aria-hidden="true">
                    {/* courbes gravées : arête claire sous le trait */}
                    {YS.map((cy, i) => (
                        <g key={i}>
                            <path d={inPath(cy + 0.9)} fill="none" stroke={STROKE_HI} strokeWidth="1.4" strokeDasharray="4 4" strokeLinecap="round" />
                            <path d={inPath(cy)} fill="none" stroke={STROKE} strokeWidth="1.2" strokeDasharray="4 4" strokeLinecap="round" />
                        </g>
                    ))}
                    <path d="M388 150.9 L 432 150.9" stroke={STROKE_HI} strokeWidth="1.4" strokeDasharray="4 4" strokeLinecap="round" />
                    <path d={OUT_PATH} stroke={STROKE} strokeWidth="1.2" strokeDasharray="4 4" strokeLinecap="round" />

                    {/* points d'ancrage gravés */}
                    {YS.map((cy, i) => (
                        <circle key={'s' + i} cx="148" cy={cy} r="2.4" fill={surface} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
                    ))}
                    <circle cx="268" cy="150" r="3" fill={surface} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
                    <circle cx="432" cy="150" r="2.4" fill={surface} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />

                    {/* paquets de données — chaque source envoie SA forme, SA couleur */}
                    <g className="ic-smil">
                        {SOURCES.map((s, i) => (
                            <g key={'p' + i} opacity="0">
                                <PacketShape shape={s.shape} color={s.color} />
                                <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.5}s`} path={inPath(YS[i])} />
                                <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.12;0.82;1" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                            </g>
                        ))}
                        {/* en sortie : tout ressort UNIFIÉ — même forme, même couleur */}
                        {[0, 0.55].map((b, i) => (
                            <rect key={'u' + i} x="-2.8" y="-2.8" width="5.6" height="5.6" rx="1.2" fill={ink} opacity="0">
                                <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${b}s`} path={OUT_PATH} />
                                <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.15;0.8;1" dur="1.6s" repeatCount="indefinite" begin={`${b}s`} />
                            </rect>
                        ))}
                    </g>
                </svg>

                {/* puces sources — la pastille reprend la couleur du flux */}
                {SOURCES.map((s, i) => (
                    <div
                        key={s.label}
                        className="flex items-center"
                        style={{ position: 'absolute', left: 0, top: `${(YS[i] / 300) * 100}%`, transform: 'translateY(-50%)', width: '30%', gap: 8, padding: '9px 12px', borderRadius: 10, background: surface, boxShadow: EMBOSS_SOFT }}
                    >
                        <span style={{ width: 7, height: 7, flex: '0 0 auto', display: 'inline-block' }}>
                            <svg viewBox="-5 -5 10 10" width="7" height="7"><PacketShape shape={s.shape} color={s.color} /></svg>
                        </span>
                        <span className="font-mono truncate" style={{ fontSize: 11, color: ink, letterSpacing: '0.03em' }}>{s.label}</span>
                    </div>
                ))}

                {/* nœud contexte unifié — dominant, au centre du flux */}
                <div
                    style={{
                        position: 'absolute',
                        left: '58.5%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: 14,
                        background: `linear-gradient(180deg, ${white}, ${pale})`,
                        boxShadow: `0 0 0 1.5px ${accent}, ${EMBOSS}`,
                        padding: '13px 16px',
                    }}
                >
                    <span className="inline-flex items-center" style={{ gap: 7, marginBottom: 6 }}>
                        <PulseDot color={accent} size={7} />
                        <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: mutedText }}>UNIFIÉ</span>
                    </span>
                    <div className="font-sans" style={{ fontSize: 14.5, fontWeight: 600, color: ink, lineHeight: 1.15, whiteSpace: 'nowrap' }}>Contexte unifié</div>
                    <div className="font-mono" style={{ fontSize: 10, color: mutedText, marginTop: 5, whiteSpace: 'nowrap' }}>un environnement standardisé</div>
                </div>

                {/* l'agent en sortie — celui qui consomme le contexte */}
                <div
                    className="flex flex-col items-center"
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        gap: 5,
                        padding: '10px 11px',
                        borderRadius: 11,
                        background: surface,
                        boxShadow: `0 0 0 1px ${forest}40, ${EMBOSS_SOFT}`,
                    }}
                >
                    <span style={{ width: 18, height: 18, borderRadius: 5, background: TOKENS.lime, boxShadow: 'inset 0 0 0 0.7px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.15)' }} />
                    <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: mutedText }}>AGENT</span>
                </div>
            </div>
            </div>

            <div className="font-mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: mutedText, textAlign: 'center', marginTop: 10 }}>
                TOUS FORMATS EN ENTRÉE · UNIFIÉS EN SORTIE
            </div>
        </div>
    );
}
