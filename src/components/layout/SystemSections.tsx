// Layer sections — "Un seul système connecté" broken into one section per layer.
// Each layer = its own section with a distinct single-stroke illustration + accent.
// Layer 05 (Capacités métier) is the existing SectionCapabilities (Agent ID card).
import { useInViewReveal } from '../../hooks/useInViewReveal';
import { TOKENS, EMBOSS_DARK, EMBOSS_MUTED, CARD_SHADOW } from './Sections';

function Reveal({ children }: { children: React.ReactNode }) {
    const { ref, shown } = useInViewReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'none' : 'translateY(14px)',
                transition: 'opacity 700ms cubic-bezier(0.25,0,0.15,1), transform 700ms cubic-bezier(0.25,0,0.15,1)',
            }}
        >
            {children}
        </div>
    );
}

// ── Shared scaffold ─────────────────────────────────────────────────────────
type LayerProps = {
    id: string;
    index: string;
    eyebrow: string;
    title: string;
    lead: string;
    points: string[];
    accent: string;
    bg: string;
    flip?: boolean;
    visual: React.ReactNode;
};

function LayerSection({ id, index, eyebrow, title, lead, points, accent, bg, flip, visual }: LayerProps) {
    const panelBg = bg === TOKENS.white ? TOKENS.surface : TOKENS.white;
    return (
        <section
            id={id}
            className="relative"
            style={{ backgroundColor: bg, paddingBlock: '88px', paddingInline: '32px' }}
            aria-label={eyebrow}
        >
            <Reveal>
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Text */}
                    <div className={flip ? 'md:order-2' : ''}>
                        <div className="font-mono" style={{ fontSize: 13, letterSpacing: '0.22em', ...EMBOSS_MUTED }}>
                            {index} — {eyebrow}
                        </div>
                        <h2
                            className="font-sans mt-4"
                            style={{
                                fontSize: 'clamp(1.6rem, 2.7vw, 2.25rem)',
                                lineHeight: 1.12,
                                fontWeight: 500,
                                letterSpacing: '-0.02em',
                                maxWidth: '18ch',
                                ...EMBOSS_DARK,
                            }}
                        >
                            {title}
                        </h2>
                        <p
                            className="font-sans mt-5"
                            style={{ fontSize: 17, lineHeight: '26px', fontWeight: 460, color: TOKENS.mutedText, maxWidth: '46ch' }}
                        >
                            {lead}
                        </p>
                        <ul className="mt-7 flex flex-col gap-2.5">
                            {points.map((p) => (
                                <li
                                    key={p}
                                    className="font-mono flex items-start gap-3"
                                    style={{ fontSize: 13, lineHeight: '18px', color: TOKENS.mutedText }}
                                >
                                    <span aria-hidden="true" style={{ color: accent === TOKENS.ink ? TOKENS.ink : accent, opacity: 0.9 }}>→</span>
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visual */}
                    <div className={flip ? 'md:order-1' : ''}>
                        <div
                            className="flex items-center justify-center"
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${TOKENS.border}`,
                                backgroundColor: panelBg,
                                boxShadow: CARD_SHADOW,
                                minHeight: 360,
                                padding: 28,
                            }}
                        >
                            {visual}
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

const svgBox: React.CSSProperties = { width: '100%', maxWidth: 360, height: 'auto' };

// ── 01 · Modèles — model router with per-task fit scoring ────────────────────
function IlluModels({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const reqs = [
        { l: 'PRÉCISION', n: 4 },
        { l: 'COÛT', n: 2 },
        { l: 'LATENCE', n: 3 },
        { l: 'CONFIDENTIEL', n: 4 },
    ];
    const models = [
        { name: 'CLAUDE', fit: 0.92, sel: true },
        { name: 'GPT', fit: 0.74, sel: false },
        { name: 'MISTRAL', fit: 0.61, sel: false },
        { name: 'OPEN-WEIGHT', fit: 0.5, sel: false },
    ];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            <text x="14" y="18" className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', fill: stroke, opacity: 0.5 }}>ROUTAGE · PAR TÂCHE</text>
            <circle cx="340" cy="14" r="8" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
            <circle cx="340" cy="14" r="3" fill={accent} />

            {/* task card with requirement meters */}
            <rect x="14" y="38" width="130" height="206" rx="10" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
            <line x1="14" y1="66" x2="144" y2="66" stroke={stroke} strokeWidth="1" opacity="0.32" />
            <text x="28" y="58" className="font-mono" style={{ fontSize: 11, fill: stroke, opacity: 0.7 }}>TÂCHE</text>
            <circle cx="130" cy="53" r="2.5" fill={stroke} opacity="0.4" />
            {reqs.map((r, i) => {
                const ry = 92 + i * 38;
                return (
                    <g key={r.l}>
                        <text x="28" y={ry} className="font-mono" style={{ fontSize: 8, fill: stroke, opacity: 0.55 }}>{r.l}</text>
                        {[0, 1, 2, 3, 4].map((k) => (
                            <rect key={k} x={28 + k * 21} y={ry + 8} width="15" height="6" rx="1.5"
                                fill={k < r.n ? accent : 'none'} stroke={stroke} strokeWidth="0.75"
                                opacity={k < r.n ? 0.85 : 0.28} />
                        ))}
                    </g>
                );
            })}

            {/* connectors + model cards with fit bars */}
            {models.map((m, i) => {
                const y = 46 + i * 50;
                const cy = y + 22;
                return (
                    <g key={m.name}>
                        <path d={`M144 141 C 186 141, 188 ${cy}, 214 ${cy}`} fill="none"
                            stroke={m.sel ? accent : stroke} strokeWidth={m.sel ? 1.75 : 1}
                            opacity={m.sel ? 0.95 : 0.22} strokeDasharray={m.sel ? undefined : '2 4'} />
                        <rect x="214" y={y} width="132" height="44" rx="9" fill={m.sel ? TOKENS.white : 'none'}
                            stroke={m.sel ? accent : stroke} strokeWidth={m.sel ? 1.75 : 1.1} opacity={m.sel ? 1 : 0.4} />
                        <text x="228" y={cy - 4} className="font-mono" style={{ fontSize: 11, fill: stroke, opacity: m.sel ? 0.9 : 0.55 }}>{m.name}</text>
                        {m.sel && <path d={`M306 ${cy - 8} l3.5 3.5 l7 -8`} fill="none" stroke={accent} strokeWidth="1.6" />}
                        <rect x="228" y={cy + 6} width="78" height="4" rx="2" fill="none" stroke={stroke} strokeWidth="0.75" opacity="0.3" />
                        <rect x="228" y={cy + 6} width={78 * m.fit} height="4" rx="2" fill={m.sel ? accent : stroke} opacity={m.sel ? 0.9 : 0.32} />
                        <text x="338" y={cy + 10} textAnchor="end" className="font-mono" style={{ fontSize: 8.5, fill: stroke, opacity: m.sel ? 0.75 : 0.4 }}>{Math.round(m.fit * 100)}</text>
                    </g>
                );
            })}
        </svg>
    );
}

// ── 02 · Harnais agentique — orchestration loop + parallel sub-agents ────────
function IlluHarness({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const cx = 180, cy = 100, rx = 128, ry = 66;
    const nodes = [
        { l: 'ROUTE', x: cx, y: cy - ry },
        { l: 'OUTILS', x: cx + rx, y: cy },
        { l: 'MÉMOIRE', x: cx, y: cy + ry },
        { l: 'GARDE-FOU', x: cx - rx, y: cy },
    ];
    const subs = [
        { x: 80, l: 'RECHERCHE' },
        { x: 180, l: 'RÉDACTION' },
        { x: 280, l: 'VÉRIF.' },
    ];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            <defs>
                <marker id="ah-harness" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                    <path d="M1.5,1.5 L8,5 L1.5,8.5" fill="none" stroke={stroke} strokeWidth="1.3" opacity="0.55" />
                </marker>
            </defs>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={stroke} strokeWidth="0.75" opacity="0.12" />
            {/* clockwise feedback loop */}
            {nodes.map((n, i) => {
                const next = nodes[(i + 1) % 4];
                const dx = next.x - n.x, dy = next.y - n.y;
                const len = Math.hypot(dx, dy);
                const ux = dx / len, uy = dy / len;
                const sx = n.x + ux * 30, sy = n.y + uy * 30;
                const ex = next.x - ux * 30, ey = next.y - uy * 30;
                const mx = (n.x + next.x) / 2 + ((n.x + next.x) / 2 - cx) * 0.22;
                const my = (n.y + next.y) / 2 + ((n.y + next.y) / 2 - cy) * 0.22;
                return (
                    <path key={i} d={`M${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`} fill="none"
                        stroke={stroke} strokeWidth="1" opacity="0.32" strokeDasharray="3 4"
                        markerEnd="url(#ah-harness)" />
                );
            })}
            {/* spokes */}
            {nodes.map((n, i) => (
                <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke={stroke} strokeWidth="0.75" opacity="0.16" />
            ))}
            {/* stage nodes */}
            {nodes.map((n) => (
                <g key={n.l}>
                    <rect x={n.x - 36} y={n.y - 12} width="72" height="24" rx="12" fill={TOKENS.white} stroke={stroke} strokeWidth="1.1" opacity="0.55" />
                    <text x={n.x} y={n.y + 3.5} textAnchor="middle" className="font-mono" style={{ fontSize: 8.5, fill: stroke, opacity: 0.7 }}>{n.l}</text>
                </g>
            ))}
            {/* orchestrator core */}
            <rect x={cx - 56} y={cy - 21} width="112" height="42" rx="10" fill={TOKENS.white} stroke={accent} strokeWidth="1.75" />
            <circle cx={cx - 40} cy={cy} r="3" fill={accent} />
            <text x={cx + 6} y={cy + 4} textAnchor="middle" className="font-mono" style={{ fontSize: 9.5, fill: stroke, opacity: 0.9 }}>ORCHESTRATEUR</text>
            {/* parallel sub-agents */}
            <text x="14" y="208" className="font-mono" style={{ fontSize: 8.5, fill: stroke, opacity: 0.5 }}>SOUS-AGENTS · PARALLÈLE</text>
            {subs.map((s) => (
                <g key={s.l}>
                    <line x1={cx} y1={cy + ry + 12} x2={s.x} y2="224" stroke={stroke} strokeWidth="0.9" opacity="0.3" markerEnd="url(#ah-harness)" />
                    <rect x={s.x - 44} y="226" width="88" height="40" rx="8" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
                    <circle cx={s.x - 30} cy="240" r="4.5" fill="none" stroke={stroke} strokeWidth="1" opacity="0.6" />
                    <text x={s.x - 18} y="243" className="font-mono" style={{ fontSize: 7.5, fill: stroke, opacity: 0.6 }}>{s.l}</text>
                    {[0, 1, 2].map((d) => (
                        <circle key={d} cx={s.x - 30 + d * 7} cy="256" r="1.8" fill={d === 0 ? accent : 'none'} stroke={stroke} strokeWidth="0.6" opacity={d === 0 ? 0.9 : 0.4} />
                    ))}
                </g>
            ))}
        </svg>
    );
}

// ── 03 · Données & intégrations — connectors converging into a hub ───────────
function IlluConnect({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const sources = [
        { l: 'CRM', on: true },
        { l: 'ERP', on: true },
        { l: 'DMS', on: true },
        { l: 'MCP', on: true },
        { l: 'API', on: false },
    ];
    const hub = { x: 244, y: 132 };
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            <defs>
                <marker id="ah-connect" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
                    <path d="M1.5,1.5 L8,5 L1.5,8.5" fill="none" stroke={accent} strokeWidth="1.3" />
                </marker>
            </defs>
            <text x="14" y="18" className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', fill: stroke, opacity: 0.5 }}>INTÉGRATIONS</text>
            {sources.map((s, i) => {
                const y = 36 + i * 42;
                const cy = y + 17;
                return (
                    <g key={s.l}>
                        <rect x="12" y={y} width="120" height="34" rx="8" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
                        <rect x="22" y={y + 9} width="16" height="16" rx="3.5" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" />
                        <text x="48" y={cy + 4} className="font-mono" style={{ fontSize: 10.5, fill: stroke, opacity: 0.62 }}>{s.l}</text>
                        <circle cx="120" cy={cy} r="3" fill={s.on ? accent : 'none'} stroke={s.on ? accent : stroke} strokeWidth="1" opacity={s.on ? 1 : 0.5} />
                        <path d={`M132 ${cy} C 188 ${cy}, 190 ${hub.y}, ${hub.x - 32} ${hub.y}`} fill="none"
                            stroke={accent} strokeWidth={s.on ? 1.25 : 1} opacity={s.on ? 0.5 : 0.22}
                            strokeDasharray={s.on ? undefined : '2 4'} markerEnd={s.on ? 'url(#ah-connect)' : undefined} />
                    </g>
                );
            })}
            {/* unified hub */}
            <circle cx={hub.x} cy={hub.y} r="34" fill="none" stroke={accent} strokeWidth="1.1" opacity="0.4" />
            <circle cx={hub.x} cy={hub.y} r="26" fill={TOKENS.white} stroke={accent} strokeWidth="1.75" />
            <circle cx={hub.x} cy={hub.y} r="4.5" fill={accent} />
            <text x={hub.x} y={hub.y + 50} textAnchor="middle" className="font-mono" style={{ fontSize: 10, fill: stroke, opacity: 0.7 }}>AGENT</text>
            {/* output to unified context */}
            <path d={`M${hub.x + 34} ${hub.y} L 300 ${hub.y}`} fill="none" stroke={accent} strokeWidth="1.25" opacity="0.55" markerEnd="url(#ah-connect)" />
            <rect x="300" y={hub.y - 16} width="52" height="32" rx="7" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
            <text x="326" y={hub.y - 2} textAnchor="middle" className="font-mono" style={{ fontSize: 7.5, fill: stroke, opacity: 0.62 }}>CONTEXTE</text>
            <text x="326" y={hub.y + 9} textAnchor="middle" className="font-mono" style={{ fontSize: 7.5, fill: stroke, opacity: 0.62 }}>UNIFIÉ</text>
        </svg>
    );
}

// ── 04 · Contexte & connaissance — growth rings compounding T0 → T+n ─────────
function IlluCompound({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const cx = 168, cy = 120;
    const rings = [22, 42, 62, 82, 100];
    const sources = [
        { l: 'PLAYBOOKS', x: 36, y: 30 },
        { l: 'DOSSIERS', x: 300, y: 40 },
        { l: 'RÈGLES', x: 34, y: 210 },
    ];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            <defs>
                <marker id="ah-compound" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M1.5,1.5 L8,5 L1.5,8.5" fill="none" stroke={accent} strokeWidth="1.3" />
                </marker>
            </defs>
            {/* radial spokes */}
            {Array.from({ length: 12 }).map((_, k) => {
                const a = (k / 12) * Math.PI * 2;
                return (
                    <line key={k} x1={cx + 18 * Math.cos(a)} y1={cy + 18 * Math.sin(a)}
                        x2={cx + 100 * Math.cos(a)} y2={cy + 100 * Math.sin(a)}
                        stroke={stroke} strokeWidth="0.6" opacity="0.08" />
                );
            })}
            {/* growth rings — thicken outward, compounding */}
            {rings.map((r, i) => (
                <circle key={r} cx={cx} cy={cy} r={r} fill="none"
                    stroke={i === rings.length - 1 ? accent : stroke}
                    strokeWidth={0.9 + i * 0.55} opacity={0.22 + i * 0.15} />
            ))}
            <circle cx={cx} cy={cy} r="4" fill={accent} />
            {/* accreting deposits */}
            {rings.map((r, i) => {
                const a = -Math.PI / 2 + (i + 1) * 0.7;
                return <circle key={`d${r}`} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r="2.6" fill={accent} opacity={0.45 + i * 0.1} />;
            })}
            {/* time markers up the right radius */}
            {rings.map((r) => (
                <line key={`t${r}`} x1={cx + r} y1={cy} x2={cx + r} y2={cy - 4} stroke={stroke} strokeWidth="0.8" opacity="0.4" />
            ))}
            <text x={cx + 4} y={cy + 14} className="font-mono" style={{ fontSize: 8, fill: stroke, opacity: 0.55 }}>T0</text>
            <text x={cx + 100} y={cy - 8} textAnchor="middle" className="font-mono" style={{ fontSize: 8, fill: stroke, opacity: 0.55 }}>T+n</text>
            {/* knowledge sources feeding the core */}
            {sources.map((s) => {
                const dx = cx - s.x, dy = cy - s.y;
                const len = Math.hypot(dx, dy);
                const ex = s.x + (dx / len) * (len - 104);
                const ey = s.y + (dy / len) * (len - 104);
                return (
                    <g key={s.l}>
                        <line x1={s.x} y1={s.y} x2={ex} y2={ey} stroke={accent} strokeWidth="1" opacity="0.4" strokeDasharray="2 4" markerEnd="url(#ah-compound)" />
                        <rect x={s.x - 34} y={s.y - 12} width="68" height="24" rx="12" fill={TOKENS.white} stroke={stroke} strokeWidth="1.1" opacity="0.55" />
                        <text x={s.x} y={s.y + 3.5} textAnchor="middle" className="font-mono" style={{ fontSize: 8, fill: stroke, opacity: 0.65 }}>{s.l}</text>
                    </g>
                );
            })}
        </svg>
    );
}

// ── 06 · Produits & interfaces — supervision dashboard + stacked surfaces ────
function IlluSurfaces({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const fx = 90, fy = 56, fw = 250, fh = 188;
    const rows = ['actif', 'prog', 'file'];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            {/* surfaces stacked behind */}
            <rect x="46" y="24" width="246" height="184" rx="10" fill={TOKENS.white} stroke={stroke} strokeWidth="1.1" opacity="0.28" />
            <text x="280" y="38" textAnchor="end" className="font-mono" style={{ fontSize: 8, fill: stroke, opacity: 0.4 }}>ADD-IN</text>
            <rect x="68" y="40" width="246" height="184" rx="10" fill={TOKENS.white} stroke={stroke} strokeWidth="1.1" opacity="0.42" />
            <text x="302" y="52" textAnchor="end" className="font-mono" style={{ fontSize: 8, fill: stroke, opacity: 0.45 }}>API</text>

            {/* front supervision dashboard */}
            <rect x={fx} y={fy} width={fw} height={fh} rx="10" fill={TOKENS.white} stroke={accent} strokeWidth="1.75" />
            <line x1={fx} y1={fy + 28} x2={fx + fw} y2={fy + 28} stroke={stroke} strokeWidth="1" opacity="0.25" />
            {[0, 1, 2].map((d) => (
                <circle key={d} cx={fx + 16 + d * 11} cy={fy + 14} r="3" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" />
            ))}
            <text x={fx + 60} y={fy + 18} className="font-mono" style={{ fontSize: 9, fill: stroke, opacity: 0.7 }}>SUPERVISION</text>
            <rect x={fx + fw - 74} y={fy + 7} width="62" height="15" rx="7.5" fill="none" stroke={accent} strokeWidth="1.1" />
            <circle cx={fx + fw - 64} cy={fy + 14.5} r="2.5" fill={accent} />
            <text x={fx + fw - 56} y={fy + 18} className="font-mono" style={{ fontSize: 7.5, fill: stroke, opacity: 0.7 }}>EN LIGNE</text>

            {/* sidebar */}
            <line x1={fx + 46} y1={fy + 28} x2={fx + 46} y2={fy + fh} stroke={stroke} strokeWidth="1" opacity="0.2" />
            {[0, 1, 2, 3].map((n) => (
                <g key={n}>
                    <rect x={fx + 12} y={fy + 44 + n * 30} width="12" height="12" rx="3" fill={n === 0 ? accent : 'none'} stroke={stroke} strokeWidth="0.9" opacity={n === 0 ? 0.9 : 0.45} />
                    <line x1={fx + 30} y1={fy + 50 + n * 30} x2={fx + 40} y2={fy + 50 + n * 30} stroke={stroke} strokeWidth="1" opacity="0.3" />
                </g>
            ))}

            {/* agent rows */}
            <text x={fx + 58} y={fy + 46} className="font-mono" style={{ fontSize: 8, fill: stroke, opacity: 0.55 }}>AGENTS ACTIFS</text>
            {rows.map((st, n) => {
                const ry = fy + 60 + n * 34;
                return (
                    <g key={n}>
                        <circle cx={fx + 66} cy={ry + 6} r="6" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" />
                        <line x1={fx + 80} y1={ry + 2} x2={fx + 150} y2={ry + 2} stroke={stroke} strokeWidth="2" opacity="0.28" strokeLinecap="round" />
                        <line x1={fx + 80} y1={ry + 11} x2={fx + 124} y2={ry + 11} stroke={stroke} strokeWidth="1.5" opacity="0.16" strokeLinecap="round" />
                        {st === 'actif' && (
                            <>
                                <rect x={fx + 176} y={ry - 1} width="46" height="15" rx="7.5" fill={accent} opacity="0.18" />
                                <text x={fx + 199} y={ry + 9.5} textAnchor="middle" className="font-mono" style={{ fontSize: 7, fill: stroke, opacity: 0.75 }}>ACTIF</text>
                            </>
                        )}
                        {st === 'prog' && (
                            <>
                                <rect x={fx + 176} y={ry + 4} width="46" height="5" rx="2.5" fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.3" />
                                <rect x={fx + 176} y={ry + 4} width="28" height="5" rx="2.5" fill={accent} opacity="0.8" />
                            </>
                        )}
                        {st === 'file' && (
                            <>
                                <rect x={fx + 176} y={ry - 1} width="46" height="15" rx="7.5" fill="none" stroke={stroke} strokeWidth="0.9" opacity="0.4" />
                                <text x={fx + 199} y={ry + 9.5} textAnchor="middle" className="font-mono" style={{ fontSize: 7, fill: stroke, opacity: 0.5 }}>EN FILE</text>
                            </>
                        )}
                    </g>
                );
            })}

            {/* actions */}
            <rect x={fx + 58} y={fy + fh - 30} width="96" height="22" rx="7" fill={accent} opacity="0.9" />
            <rect x={fx + 166} y={fy + fh - 30} width="56" height="22" rx="7" fill="none" stroke={stroke} strokeWidth="1" opacity="0.4" />
        </svg>
    );
}

// ── 07 · Sécurité & gouvernance — compartments + shield + audit log ──────────
function IlluSecurity({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const x = 28, y = 50, w = 304, h = 110;
    const cells = [
        { l: 'DOSSIER A', r: 'RÔLE · DIR' },
        { l: 'DOSSIER B', r: 'RÔLE · OPS' },
        { l: 'DOSSIER C', r: 'RÔLE · EXT' },
    ];
    const log = ['ACCÈS · OK', 'OUTIL · OK', 'EXPORT · REFUSÉ', 'RÈGLE · OK'];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            {/* shield straddling the top edge */}
            <path d="M180 14 l20 7 v12 c0 14 -9 22 -20 27 c-11 -5 -20 -13 -20 -27 v-12 z" fill={TOKENS.white} stroke={accent} strokeWidth="1.6" />
            <path d="M171 38 l6 6 l12 -13" fill="none" stroke={accent} strokeWidth="1.8" />
            {/* compartmented container */}
            <rect x={x} y={y} width={w} height={h} rx="10" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
            {[1, 2].map((k) => (
                <line key={k} x1={x + (k * w) / 3} y1={y} x2={x + (k * w) / 3} y2={y + h} stroke={accent} strokeWidth="1.4" strokeDasharray="4 5" opacity="0.8" />
            ))}
            {cells.map((c, i) => {
                const cxc = x + w / 6 + (i * w) / 3;
                return (
                    <g key={c.l}>
                        <rect x={cxc - 9} y={y + 22} width="18" height="14" rx="3" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.6" />
                        <path d={`M${cxc - 5} ${y + 22} v-4 a5 5 0 0 1 10 0 v4`} fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.6" />
                        <text x={cxc} y={y + 60} textAnchor="middle" className="font-mono" style={{ fontSize: 9, fill: stroke, opacity: 0.6 }}>{c.l}</text>
                        <text x={cxc} y={y + 76} textAnchor="middle" className="font-mono" style={{ fontSize: 7.5, fill: stroke, opacity: 0.45 }}>{c.r}</text>
                    </g>
                );
            })}
            {/* audit log */}
            <text x={x} y={y + h + 28} className="font-mono" style={{ fontSize: 9, letterSpacing: '0.12em', fill: stroke, opacity: 0.55 }}>JOURNAL D'AUDIT</text>
            {log.map((l, r) => {
                const ay = y + h + 44 + r * 16;
                const refused = l.includes('REFUSÉ');
                return (
                    <g key={l}>
                        {refused ? (
                            <g>
                                <line x1={x + 2} y1={ay - 4} x2={x + 10} y2={ay + 4} stroke={stroke} strokeWidth="1.3" opacity="0.6" />
                                <line x1={x + 10} y1={ay - 4} x2={x + 2} y2={ay + 4} stroke={stroke} strokeWidth="1.3" opacity="0.6" />
                            </g>
                        ) : (
                            <path d={`M${x + 1} ${ay} l4 4 l8 -9`} fill="none" stroke={accent} strokeWidth="1.5" />
                        )}
                        <text x={x + 22} y={ay + 4} className="font-mono" style={{ fontSize: 8.5, fill: stroke, opacity: refused ? 0.5 : 0.62 }}>{l}</text>
                        <line x1={x + 120} y1={ay} x2={x + (r % 2 ? 300 : 268)} y2={ay} stroke={stroke} strokeWidth="0.8" opacity="0.14" />
                    </g>
                );
            })}
        </svg>
    );
}

// ── Layer sections ───────────────────────────────────────────────────────────
export function LayerModeles() {
    return (
        <LayerSection
            id="section-modeles"
            index="01"
            eyebrow="MODÈLES"
            title="On choisit le modèle. Par tâche."
            lead="Claude, GPT, Mistral ou un modèle open-weight hébergé chez vous. Chaque tâche a ses contraintes — précision, coût, latence, confidentialité. On sélectionne le bon modèle pour chacune, jamais un seul par défaut."
            points={['Modèles propriétaires ou open-weight', 'Hébergeable dans votre périmètre', 'Arbitrage précision / coût / latence']}
            accent={TOKENS.lime}
            bg={TOKENS.paper}
            visual={<IlluModels accent={TOKENS.lime} />}
        />
    );
}

export function LayerHarnais() {
    return (
        <LayerSection
            id="section-harnais"
            index="02"
            eyebrow="HARNAIS AGENTIQUE"
            title="Ce qui transforme un LLM en agent."
            lead="La couche d'orchestration : routage d'outils, contrôle de flux, mémoire, sélection de modèle et garde-fous. Des sous-agents spécialisés s'exécutent en parallèle pour mener un workflow de bout en bout."
            points={["Routage d'outils & contrôle de flux", 'Mémoire et garde-fous intégrés', 'Sous-agents en parallèle']}
            accent={TOKENS.ink}
            bg={TOKENS.white}
            flip
            visual={<IlluHarness accent={TOKENS.ink} />}
        />
    );
}

export function LayerDonnees() {
    return (
        <LayerSection
            id="section-donnees"
            index="03"
            eyebrow="DONNÉES & INTÉGRATIONS"
            title="Ce à quoi l'agent se branche."
            lead="APIs internes, CRM, ERP, bases documentaires, connecteurs MCP. Tout converge sous un même toit pour alimenter le contexte de l'agent — sans recopie, sans silo."
            points={['Connecteurs MCP, API, webhooks', 'CRM · ERP · DMS · bases internes', 'Ingestion documentaire']}
            accent={TOKENS.gold}
            bg={TOKENS.surface}
            visual={<IlluConnect accent={TOKENS.gold} />}
        />
    );
}

export function LayerContexte() {
    return (
        <LayerSection
            id="section-contexte"
            index="04"
            eyebrow="CONTEXTE & CONNAISSANCE"
            title="Un contexte qui prend de la valeur."
            lead="Playbooks, historique des dossiers, règles et positions de l'entreprise s'intègrent à chaque action de l'agent. Il reprend là où le tour précédent s'est arrêté — la connaissance s'accumule au lieu de se perdre."
            points={['Playbooks & règles métier', 'Historique et mémoire des dossiers', 'La connaissance se capitalise']}
            accent={TOKENS.forest}
            bg={TOKENS.white}
            flip
            visual={<IlluCompound accent={TOKENS.forest} />}
        />
    );
}

export function LayerProduits() {
    return (
        <LayerSection
            id="section-produits"
            index="06"
            eyebrow="PRODUITS & INTERFACES"
            title="Là où vos équipes travaillent."
            lead="Les surfaces où humains et agents collaborent : add-in dans vos outils, tableau de bord de supervision, API. L'agent vit dans votre environnement de travail — pas dans un onglet à côté."
            points={['Add-ins dans vos outils', 'Tableau de bord de supervision', 'API & intégration sur-mesure']}
            accent={TOKENS.lime}
            bg={TOKENS.white}
            visual={<IlluSurfaces accent={TOKENS.lime} />}
        />
    );
}

export function LayerSecurite() {
    return (
        <LayerSection
            id="section-securite"
            index="07"
            eyebrow="SÉCURITÉ & GOUVERNANCE"
            title="Prêt pour l'entreprise, par construction."
            lead="Cloisonnement entre dossiers, traçabilité complète de chaque appel d'outil, contrôle d'accès par rôle, souveraineté des données. Intégré à chaque couche — pas ajouté après coup."
            points={["Cloisonnement & contrôle d'accès", 'Traçabilité de chaque action', 'Souveraineté des données']}
            accent={TOKENS.ink}
            bg={TOKENS.surface}
            flip
            visual={<IlluSecurity accent={TOKENS.ink} />}
        />
    );
}
