// Layer sections — "Un seul système connecté" broken into one section per layer.
// Each layer = its own section with a distinct single-stroke illustration + accent.
// Layer 05 (Capacités métier) is the existing SectionCapabilities (Agent ID card).
import { useInViewReveal } from '../../hooks/useInViewReveal';
import { TOKENS, EMBOSS_DARK, EMBOSS_MUTED, CARD_SHADOW } from './Sections';
import styles from './Illustrations.module.css';

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

// ── Shared product-UI mockup frame (cofounder idiom) ────────────────────────
const cardFrame: React.CSSProperties = {
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
    border: `1px solid ${TOKENS.border}`,
    background: `linear-gradient(180deg, ${TOKENS.white}, ${TOKENS.pale})`,
    boxShadow: CARD_SHADOW,
    overflow: 'hidden',
};

function MockCard({ title, right, footer, children }: {
    title: string;
    right?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
}) {
    const { mutedText, border } = TOKENS;
    return (
        <div className="w-full font-sans" style={cardFrame} aria-hidden="true">
            <div className="flex items-center" style={{ gap: 8, padding: '11px 14px', borderBottom: `1px solid ${border}` }}>
                <div className="flex" style={{ gap: 5 }}>
                    {['#E6675A', '#E8B53D', '#5BB85B'].map((c) => (
                        <span key={c} style={{ width: 8, height: 8, borderRadius: 999, background: c, opacity: 0.5 }} />
                    ))}
                </div>
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: mutedText, marginLeft: 4 }}>{title}</span>
                {right && <div className="ml-auto">{right}</div>}
            </div>
            <div style={{ padding: 12 }}>{children}</div>
            {footer && <div style={{ borderTop: `1px solid ${border}` }}>{footer}</div>}
        </div>
    );
}

function LivePill({ color, label }: { color: string; label: string }) {
    return (
        <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 10, color: TOKENS.ink, padding: '3px 9px', borderRadius: 999, border: `1px solid ${TOKENS.border}`, background: TOKENS.white }}>
            <span className={styles.pulse} style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
            {label}
        </span>
    );
}

// ── 01 · Modèles — model router (product-UI mockup) ──────────────────────────
function IlluModels({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, pale } = TOKENS;
    const reqs = [
        { l: 'Précision', n: 4 },
        { l: 'Coût', n: 2 },
        { l: 'Latence', n: 3 },
        { l: 'Confidentiel', n: 4 },
    ];
    const models = [
        { name: 'Claude', fit: 92, sel: true },
        { name: 'GPT', fit: 74, sel: false },
        { name: 'Mistral', fit: 61, sel: false },
        { name: 'Open-weight', fit: 50, sel: false },
    ];
    return (
        <MockCard title="ROUTAGE" right={<span className="font-mono" style={{ fontSize: 10, color: mutedText, padding: '3px 9px', borderRadius: 999, border: `1px solid ${border}` }}>par tâche</span>}>
            <div style={{ borderRadius: 11, border: `1px solid ${border}`, background: white, padding: 11, marginBottom: 10 }}>
                <div className="flex items-center" style={{ gap: 6, marginBottom: 9 }}>
                    <span className="font-mono" style={{ fontSize: 10.5, color: ink }}>Tâche</span>
                    <span className="font-mono" style={{ marginLeft: 'auto', fontSize: 9.5, color: mutedText }}>4 critères</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px 14px' }}>
                    {reqs.map((r) => (
                        <div key={r.l} className="flex items-center" style={{ gap: 7 }}>
                            <span className="font-mono" style={{ fontSize: 9.5, color: mutedText, width: 74, flex: '0 0 auto' }}>{r.l}</span>
                            <span className="inline-flex" style={{ gap: 3 }}>
                                {[0, 1, 2, 3, 4].map((k) => (
                                    <span key={k} style={{ width: 7, height: 7, borderRadius: 2, background: k < r.n ? accent : '#E6E6E0', display: 'inline-block' }} />
                                ))}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {models.map((m) => (
                    <div key={m.name} className="flex items-center" style={{ gap: 10, padding: '8px 11px', borderRadius: 10, border: `1px solid ${m.sel ? accent : border}`, background: m.sel ? white : pale, boxShadow: m.sel ? `0 0 0 1px ${accent}` : undefined }}>
                        <span className="font-mono" style={{ fontSize: 11.5, color: ink, width: 92, flex: '0 0 auto' }}>{m.name}</span>
                        <span style={{ flex: '1 1 auto', minWidth: 0, height: 5, borderRadius: 999, background: '#ECECE6', overflow: 'hidden' }}>
                            <span style={{ display: 'block', height: '100%', width: `${m.fit}%`, background: m.sel ? accent : '#C9C9C2' }} />
                        </span>
                        <span className="font-mono" style={{ fontSize: 10, color: m.sel ? ink : mutedText, width: 22, textAlign: 'right', flex: '0 0 auto' }}>{m.fit}</span>
                        {m.sel ? (
                            <svg viewBox="0 0 12 12" width="13" height="13" aria-hidden="true" style={{ flex: '0 0 auto' }}><path d="M2 6 l2.5 2.5 l5.5 -6" fill="none" stroke={accent} strokeWidth="1.8" /></svg>
                        ) : (
                            <span style={{ width: 13, flex: '0 0 auto' }} />
                        )}
                    </div>
                ))}
            </div>
        </MockCard>
    );
}

// ── 02 · Harnais agentique — orchestrator pipeline (product-UI mockup) ───────
function IlluHarness({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, gold } = TOKENS;
    const stages = ['Route', 'Outils', 'Mémoire', 'Garde-fou'];
    const subs: { l: string; state: 'run' | 'queue' }[] = [
        { l: 'Recherche', state: 'run' },
        { l: 'Rédaction', state: 'run' },
        { l: 'Vérification', state: 'queue' },
    ];
    return (
        <MockCard title="ORCHESTRATEUR" right={<LivePill color={accent} label="Boucle active" />}>
            <div className="flex items-center" style={{ gap: 6, marginBottom: 13, flexWrap: 'wrap' }}>
                {stages.map((s, i) => (
                    <span key={s} className="inline-flex items-center" style={{ gap: 6 }}>
                        <span className="font-mono" style={{ fontSize: 10, color: ink, padding: '5px 9px', borderRadius: 8, border: `1px solid ${border}`, background: white }}>{s}</span>
                        {i < stages.length - 1 && <span style={{ color: mutedText, fontSize: 11 }}>→</span>}
                    </span>
                ))}
            </div>
            <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: mutedText, marginBottom: 8 }}>SOUS-AGENTS · PARALLÈLE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {subs.map((s) => (
                    <div key={s.l} className="flex items-center" style={{ gap: 10, padding: '8px 11px', borderRadius: 10, border: `1px solid ${border}`, background: white }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: accent, flex: '0 0 auto' }} />
                        <span className="font-mono" style={{ fontSize: 11, color: ink, flex: '1 1 auto' }}>{s.l}</span>
                        {s.state === 'run' ? (
                            <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 10, color: ink }}>
                                <span className={styles.spinner} style={{ width: 12, height: 12, borderRadius: 999, border: `2px solid ${accent}55`, borderTopColor: accent, display: 'inline-block' }} />
                                En cours
                            </span>
                        ) : (
                            <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 10, color: mutedText, padding: '3px 9px', borderRadius: 999, border: `1px solid ${border}` }}>
                                <span style={{ width: 6, height: 6, borderRadius: 999, background: gold, display: 'inline-block' }} />
                                En file
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </MockCard>
    );
}

// ── 03 · Données & intégrations — connectors → unified context (mockup) ──────
function IlluConnect({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, pale, forest } = TOKENS;
    const sources = [
        { l: 'CRM', on: true },
        { l: 'ERP', on: true },
        { l: 'DMS', on: true },
        { l: 'MCP', on: true },
        { l: 'API', on: false },
    ];
    const onCount = sources.filter((s) => s.on).length;
    return (
        <MockCard title="INTÉGRATIONS" right={<span className="font-mono" style={{ fontSize: 10, color: mutedText }}>{onCount}/{sources.length}</span>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 11 }}>
                {sources.map((s) => (
                    <div key={s.l} className="flex items-center" style={{ gap: 10, padding: '7px 11px', borderRadius: 10, border: `1px solid ${border}`, background: s.on ? white : pale, opacity: s.on ? 1 : 0.72 }}>
                        <span className="font-mono inline-flex items-center justify-center" style={{ width: 32, height: 22, borderRadius: 6, background: pale, border: `1px solid ${border}`, fontSize: 8.5, color: mutedText, flex: '0 0 auto' }}>{s.l}</span>
                        <span className="font-mono" style={{ fontSize: 11, color: ink, flex: '1 1 auto' }}>{s.l === 'API' ? 'API externe' : `Connecteur ${s.l}`}</span>
                        {s.on ? (
                            <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 9.5, color: forest }}>
                                <span style={{ width: 6, height: 6, borderRadius: 999, background: forest, display: 'inline-block' }} /> Connecté
                            </span>
                        ) : (
                            <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 9.5, color: mutedText }}>
                                <span style={{ width: 6, height: 6, borderRadius: 999, border: `1px solid ${mutedText}`, display: 'inline-block' }} /> Hors ligne
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center" style={{ gap: 10, padding: '10px 12px', borderRadius: 11, border: `1px solid ${accent}`, background: white, boxShadow: `0 0 0 1px ${accent}` }}>
                <span className={styles.pulse} style={{ width: 9, height: 9, borderRadius: 999, background: accent, flex: '0 0 auto' }} />
                <span className="font-mono" style={{ fontSize: 11, color: ink, flex: '1 1 auto' }}>Contexte unifié</span>
                <span className="font-mono" style={{ fontSize: 9.5, color: mutedText }}>1 agent · 0 silo</span>
            </div>
        </MockCard>
    );
}

// ── 04 · Contexte & connaissance — compounding memory (product-UI mockup) ────
function IlluCompound({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, pale } = TOKENS;
    const series = [3, 4, 4, 6, 7, 7, 9, 11, 12, 14, 16, 19];
    const max = Math.max(...series);
    const sources = ['Playbooks', 'Dossiers', 'Règles'];
    return (
        <MockCard title="MÉMOIRE" right={<span className="font-mono" style={{ fontSize: 10, color: mutedText }}>T0 → T+n</span>}>
            <div style={{ borderRadius: 11, border: `1px solid ${border}`, background: white, padding: '12px 12px 9px', marginBottom: 11 }}>
                <div className="flex items-end" style={{ gap: 3, height: 66 }}>
                    {series.map((v, i) => (
                        <span key={i} style={{ flex: '1 1 0', height: `${(v / max) * 100}%`, borderRadius: '2px 2px 0 0', background: i >= series.length - 3 ? accent : '#E2E2DB', display: 'inline-block' }} />
                    ))}
                </div>
                <div className="flex items-center" style={{ marginTop: 8, justifyContent: 'space-between' }}>
                    <span className="font-mono" style={{ fontSize: 9, color: mutedText }}>T0</span>
                    <span className="font-mono" style={{ fontSize: 9.5, color: ink }}>La connaissance se capitalise</span>
                    <span className="font-mono" style={{ fontSize: 9, color: mutedText }}>T+n</span>
                </div>
            </div>
            <div className="flex" style={{ gap: 7 }}>
                {sources.map((s) => (
                    <span key={s} className="font-mono inline-flex items-center justify-center" style={{ gap: 6, flex: '1 1 0', fontSize: 10, color: ink, padding: '8px 6px', borderRadius: 9, border: `1px solid ${border}`, background: pale }}>
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: accent, flex: '0 0 auto' }} />
                        {s}
                    </span>
                ))}
            </div>
        </MockCard>
    );
}

// ── 06 · Produits & interfaces — supervision dashboard (product-UI mockup) ───
type AgentState = 'run' | 'prog' | 'queue' | 'done';
function IlluSurfaces({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, pale, gold, forest } = TOKENS;
    const agents: { id: string; name: string; task: string; state: AgentState; pct?: number }[] = [
        { id: 'SUP', name: 'Agent · Support', task: 'Triage des tickets', state: 'run' },
        { id: 'REL', name: 'Agent · Relance', task: 'Séquence email J+3', state: 'prog', pct: 64 },
        { id: 'VEI', name: 'Agent · Veille', task: 'Synthèse hebdomadaire', state: 'queue' },
        { id: 'CNF', name: 'Agent · Conformité', task: 'Contrôle des accès', state: 'done' },
    ];
    const bars = [5, 8, 6, 11, 7, 13, 9, 15, 10, 14, 8, 16, 12, 18, 11, 9];
    return (
        <MockCard
            title="SUPERVISION"
            right={<LivePill color={forest} label="En ligne" />}
            footer={
                <div className="flex items-center" style={{ gap: 10, padding: '10px 14px' }}>
                    <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: mutedText }}>ACTIVITÉ · 24H</span>
                    <span className="ml-auto inline-flex items-end" style={{ gap: 3, height: 22 }}>
                        {bars.map((h, i) => (
                            <span key={i} style={{ width: 4, height: h + 4, borderRadius: 2, background: i >= bars.length - 4 ? accent : '#D8D8D2', display: 'inline-block' }} />
                        ))}
                    </span>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {agents.map((a) => (
                    <div key={a.id} className="flex items-center" style={{ gap: 11, padding: '9px 11px', borderRadius: 11, border: `1px solid ${border}`, background: white }}>
                        <span className="font-mono inline-flex items-center justify-center" style={{ width: 26, height: 26, borderRadius: 8, background: pale, border: `1px solid ${border}`, fontSize: 8.5, color: mutedText, flex: '0 0 auto' }}>{a.id}</span>
                        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                            <div className="font-mono" style={{ fontSize: 11.5, color: ink, lineHeight: '15px' }}>{a.name}</div>
                            <div className="truncate" style={{ fontSize: 11, color: mutedText, lineHeight: '15px' }}>{a.task}</div>
                        </div>
                        <div className="inline-flex items-center" style={{ flex: '0 0 auto' }}>
                            {a.state === 'run' && (
                                <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 10, color: ink }}>
                                    <span className={styles.spinner} style={{ width: 12, height: 12, borderRadius: 999, border: `2px solid ${accent}55`, borderTopColor: accent, display: 'inline-block' }} />
                                    En cours
                                </span>
                            )}
                            {a.state === 'prog' && (
                                <span className="inline-flex items-center font-mono" style={{ gap: 8, fontSize: 10, color: mutedText }}>
                                    <span style={{ width: 54, height: 5, borderRadius: 999, background: '#ECECE6', overflow: 'hidden', display: 'inline-block' }}>
                                        <span style={{ width: `${a.pct}%`, height: '100%', background: accent, display: 'block' }} />
                                    </span>
                                    {a.pct}%
                                </span>
                            )}
                            {a.state === 'queue' && (
                                <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 10, color: mutedText, padding: '3px 9px', borderRadius: 999, border: `1px solid ${border}` }}>
                                    <span style={{ width: 6, height: 6, borderRadius: 999, background: gold, display: 'inline-block' }} />
                                    En file
                                </span>
                            )}
                            {a.state === 'done' && (
                                <span className="inline-flex items-center font-mono" style={{ gap: 5, fontSize: 10, color: forest }}>
                                    <svg viewBox="0 0 10 10" width="11" height="11" aria-hidden="true"><path d="M1 5 l3 3 l5 -7" fill="none" stroke={forest} strokeWidth="1.6" /></svg>
                                    Terminé
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </MockCard>
    );
}

// ── 07 · Sécurité & gouvernance — RBAC compartments + audit log (product-UI mockup) ──
function IlluSecurity({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, pale, forest, gold } = TOKENS;
    const compartments = [
        { name: 'Dossier A', role: 'Direction' },
        { name: 'Dossier B', role: 'Opérations' },
        { name: 'Dossier C', role: 'Externe' },
    ];
    const log: { label: string; status: string; ok: boolean }[] = [
        { label: 'Accès lecture', status: 'Autorisé', ok: true },
        { label: 'Appel outil', status: 'Autorisé', ok: true },
        { label: 'Export externe', status: 'Refusé', ok: false },
        { label: 'Application règle', status: 'Autorisé', ok: true },
    ];
    return (
        <MockCard
            title="GOUVERNANCE"
            right={
                <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 10, color: ink, padding: '3px 9px', borderRadius: 999, border: `1px solid ${border}`, background: white }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: accent, display: 'inline-block' }} />
                    RBAC
                </span>
            }
            footer={
                <div style={{ padding: '11px 14px' }}>
                    <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: mutedText, marginBottom: 9 }}>JOURNAL D'AUDIT</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {log.map((l) => (
                            <div key={l.label} className="flex items-center" style={{ gap: 9 }}>
                                {l.ok ? (
                                    <svg viewBox="0 0 10 10" width="11" height="11" aria-hidden="true"><path d="M1 5 l3 3 l5 -7" fill="none" stroke={forest} strokeWidth="1.6" /></svg>
                                ) : (
                                    <svg viewBox="0 0 10 10" width="11" height="11" aria-hidden="true"><path d="M2 2 l6 6 M8 2 l-6 6" fill="none" stroke={gold} strokeWidth="1.6" /></svg>
                                )}
                                <span className="font-mono" style={{ fontSize: 11, color: ink }}>{l.label}</span>
                                <span className="font-mono ml-auto" style={{ fontSize: 10, color: l.ok ? mutedText : gold }}>{l.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        >
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {compartments.map((c) => (
                    <div key={c.name} style={{ padding: '11px 10px', borderRadius: 11, border: `1px solid ${border}`, background: pale, textAlign: 'center' }}>
                        <span className="inline-flex items-center justify-center" style={{ width: 26, height: 26, borderRadius: 8, background: white, border: `1px solid ${border}`, marginBottom: 8 }}>
                            <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true">
                                <rect x="3" y="6" width="8" height="6" rx="1.4" fill="none" stroke={mutedText} strokeWidth="1.1" />
                                <path d="M4.6 6 V4.5 a2.4 2.4 0 0 1 4.8 0 V6" fill="none" stroke={mutedText} strokeWidth="1.1" />
                            </svg>
                        </span>
                        <div className="font-mono" style={{ fontSize: 10.5, color: ink, lineHeight: '14px' }}>{c.name}</div>
                        <div className="font-mono" style={{ fontSize: 9, color: mutedText, lineHeight: '13px', marginTop: 2 }}>{c.role}</div>
                    </div>
                ))}
            </div>
        </MockCard>
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
