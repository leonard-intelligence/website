// 06 · PRODUITS & INTERFACES — « Dans votre flux, pas dans un onglet. »
// Une maquette de produit SaaS réaliste, claire et embossée : sidebar généraliste
// (workspace + menu de features + bouton assistant agent), conversation de l'agent
// au centre (message utilisateur, réponse, tâche outillée en cours), et une colonne
// d'outils/widgets à droite (tuile métrique, liste de tâches, pastille de statut).
// Palette claire + Geist. Niveau de finition aligné sur IlluHarness (gravure embossée).
import { TOKENS } from '../Sections';
import { Spinner, Check, PulseDot } from './kit';

const EMBOSS = '0 0 0 0.8px #FFFFFF inset, 0 0 0 0.8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)';
const EMBOSS_SOFT = '0 0 0 0.8px #FFFFFF inset, 0 0 0 0.8px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)';
const WINDOW_SHADOW =
    '0 0 2px rgba(0,0,0,0.22), 0 0 0 4px rgba(232,231,230,0.32), 0 25px 25px rgba(0,0,0,0.03), 0 15px 15px rgba(0,0,0,0.03), inset 0 0 0.357px 1.5px rgba(255,255,255,0.35), inset 0 2px 0 #FFFFFF';
const BUBBLE_SHADOW =
    'inset 0 0 0.26px 1.1px rgba(255,255,255,0.35), inset 0 1.47px 0 #FFFFFF, 0 0 1.47px rgba(0,0,0,0.22)';
const ROW_BG = 'linear-gradient(180deg, #F5F5F2 0%, rgba(245,245,242,0.5) 100%)';
const PILL_SHADOW =
    '0 0.2px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.05)';
const SEND_BG =
    'linear-gradient(0deg, rgba(32,32,32,0.10), rgba(32,32,32,0.10)), linear-gradient(180deg, #4F4F4F 0%, rgba(32,32,32,0.85) 100%)';
const SEND_SHADOW =
    '0 0 0 1px rgba(64,64,64,0.12), 0 3px 4px rgba(0,0,0,0.16), inset 0 2px 0 rgba(255,255,255,0.24), inset 0 -0.5px 2px rgba(0,0,0,0.25)';
const INK_PILL_BG = 'linear-gradient(180deg, #2C2C2C 0%, #1A1A1A 100%)';
const INK_PILL_SHADOW =
    '0 0 0 1px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 2px rgba(0,0,0,0.35)';

// ── Pixel agent glyph (avatar de l'agent) ────────────────────────────────────
function PixelGlyph({ size = 12, tone = 0.6 }: { size?: number; tone?: number }) {
    const c = (o: number) => `rgba(23,23,23,${o})`;
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
            <rect x="5.27" y="1.84" width="1.47" height="1.47" fill={c(tone)} />
            <rect x="5.27" y="8.45" width="1.47" height="1.47" fill={c(tone)} />
            <rect x="5.63" y="5.88" width="0.73" height="0.73" fill={c(tone * 0.33)} />
            <rect x="3.06" y="8.81" width="0.73" height="0.73" fill={c(tone * 0.33)} />
            <rect x="8.2" y="8.81" width="0.73" height="0.73" fill={c(tone * 0.33)} />
            <rect x="0.12" y="8.45" width="1.47" height="1.47" fill={c(tone)} />
            <rect x="2.33" y="5.14" width="1.47" height="1.47" fill={c(tone)} />
            <rect x="8.2" y="5.14" width="1.47" height="1.47" fill={c(tone)} />
            <rect x="10.41" y="8.45" width="1.47" height="1.47" fill={c(tone)} />
        </svg>
    );
}

// ── Icônes inline (trait fin, jeu de menu généraliste) ───────────────────────
type IconProps = { size?: number; color: string };
const S = (color: string, size: number) => ({
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    'aria-hidden': true as const, style: { display: 'block', flexShrink: 0 },
});
const IconGrid = ({ size = 16, color }: IconProps) => (
    <svg {...S(color, size)}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
);
const IconFolder = ({ size = 16, color }: IconProps) => (
    <svg {...S(color, size)}><path d="M3 7a2 2 0 0 1 2-2h3.5l2 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></svg>
);
const IconAgents = ({ size = 16, color }: IconProps) => (
    <svg {...S(color, size)}><rect x="4" y="8" width="16" height="11" rx="2.5" /><path d="M12 3v3M9 13h.01M15 13h.01" /></svg>
);
const IconChart = ({ size = 16, color }: IconProps) => (
    <svg {...S(color, size)}><path d="M5 19V5M5 19h14M9 15v-3M13 15V8M17 15v-5" /></svg>
);
const IconPlug = ({ size = 16, color }: IconProps) => (
    <svg {...S(color, size)}><path d="M9 3v5M15 3v5M7 8h10v2a5 5 0 0 1-10 0V8ZM12 15v6" /></svg>
);
const IconGear = ({ size = 16, color }: IconProps) => (
    <svg {...S(color, size)}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M5 5l2 2M17 17l2 2M2 12h3M19 12h3M5 19l2-2M17 7l2-2" /></svg>
);
const IconSearch = ({ size = 14, color }: IconProps) => (
    <svg {...S(color, size)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
);

// ── Sidebar : navigation produit généraliste ─────────────────────────────────
type NavItem = { label: string; Icon: (p: IconProps) => React.ReactElement; active?: boolean; badge?: string };
function Sidebar() {
    const { ink, mutedText, white, pale, surface, border } = TOKENS;
    const items: NavItem[] = [
        { label: 'Tableau de bord', Icon: IconGrid, active: true },
        { label: 'Dossiers', Icon: IconFolder, badge: '12' },
        { label: 'Agents', Icon: IconAgents },
        { label: 'Analyses', Icon: IconChart },
        { label: 'Connecteurs', Icon: IconPlug },
        { label: 'Réglages', Icon: IconGear },
    ];
    return (
        <div
            className="hidden min-[860px]:flex flex-col"
            style={{ width: 196, flexShrink: 0, background: pale, borderRight: `1px solid ${border}` }}
        >
            {/* workspace switcher */}
            <div style={{ padding: '12px 12px 10px' }}>
                <div
                    className="flex items-center"
                    style={{ gap: 9, padding: '7px 9px', borderRadius: 9, background: white, boxShadow: EMBOSS_SOFT }}
                >
                    <span
                        className="inline-flex items-center justify-center font-mono"
                        style={{ width: 24, height: 24, borderRadius: 7, background: INK_PILL_BG, boxShadow: INK_PILL_SHADOW, color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '-0.02em', flex: '0 0 auto' }}
                    >
                        LI
                    </span>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div className="font-sans truncate" style={{ fontSize: 11.5, fontWeight: 600, color: ink, lineHeight: '14px' }}>Leonard</div>
                        <div className="font-mono truncate" style={{ fontSize: 8.5, letterSpacing: '0.04em', color: mutedText, lineHeight: '12px' }}>Espace · Équipe</div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={mutedText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><path d="m8 9 4-4 4 4M8 15l4 4 4-4" /></svg>
                </div>
            </div>

            {/* recherche */}
            <div style={{ padding: '0 12px 10px' }}>
                <div className="flex items-center" style={{ gap: 7, padding: '6px 9px', borderRadius: 8, background: surface, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.05)' }}>
                    <IconSearch color={mutedText} />
                    <span className="font-sans" style={{ fontSize: 10.5, color: '#B6B6B0' }}>Rechercher…</span>
                </div>
            </div>

            {/* menu */}
            <div className="flex flex-col" style={{ gap: 2, padding: '0 8px' }}>
                <span className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.14em', color: mutedText, padding: '4px 8px 6px' }}>NAVIGATION</span>
                {items.map(({ label, Icon, active, badge }) => (
                    <div
                        key={label}
                        className="flex items-center"
                        style={{
                            gap: 10, padding: '7px 9px', borderRadius: 8,
                            background: active ? white : 'transparent',
                            boxShadow: active ? EMBOSS_SOFT : undefined,
                        }}
                    >
                        <Icon size={15} color={active ? ink : mutedText} />
                        <span className="font-sans truncate" style={{ flex: '1 1 auto', fontSize: 11.5, fontWeight: active ? 600 : 460, color: active ? ink : mutedText }}>{label}</span>
                        {badge && (
                            <span className="font-mono" style={{ fontSize: 8.5, color: mutedText, padding: '1px 6px', borderRadius: 999, background: surface, boxShadow: PILL_SHADOW }}>{badge}</span>
                        )}
                    </div>
                ))}
            </div>

            {/* bouton assistant agent — proéminent, pilule encre */}
            <div style={{ marginTop: 'auto', padding: 12 }}>
                <div
                    className="flex items-center"
                    style={{ gap: 9, padding: '9px 12px', borderRadius: 10, background: INK_PILL_BG, boxShadow: INK_PILL_SHADOW }}
                >
                    <span className="font-mono" style={{ fontSize: 13, color: '#fff', lineHeight: 1, flex: '0 0 auto' }}>✦</span>
                    <span className="font-sans" style={{ flex: '1 1 auto', fontSize: 11.5, fontWeight: 600, color: '#fff' }}>Assistant agent</span>
                    <span style={{ flex: '0 0 auto' }}><PulseDot color={TOKENS.forest} size={6} /></span>
                </div>
            </div>
        </div>
    );
}

// ── Conversation : atomes ────────────────────────────────────────────────────
function UserBubble({ children }: { children: React.ReactNode }) {
    const { ink } = TOKENS;
    return (
        <div className="flex" style={{ justifyContent: 'flex-end', width: '100%' }}>
            <div style={{ maxWidth: '82%', padding: '9px 12px', borderRadius: 9, background: ROW_BG, boxShadow: BUBBLE_SHADOW }}>
                <p className="font-sans" style={{ margin: 0, fontSize: 11.5, fontWeight: 500, lineHeight: 1.5, color: ink }}>{children}</p>
            </div>
        </div>
    );
}

function AgentMsg({ children }: { children: React.ReactNode }) {
    const { mutedText } = TOKENS;
    return (
        <div className="flex items-start" style={{ gap: 9, width: '100%' }}>
            <span style={{ width: 18, height: 18, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: TOKENS.white, boxShadow: EMBOSS_SOFT }}><PixelGlyph /></span>
            <p className="font-sans" style={{ margin: 0, flex: '1 1 0%', fontSize: 11.5, fontWeight: 440, lineHeight: 1.6, color: mutedText }}>{children}</p>
        </div>
    );
}

// Carte « appel d'outil / tâche en cours » — l'agent exécute une étape.
function ToolCard() {
    const { ink, mutedText, white, surface, border } = TOKENS;
    const steps: { label: string; state: 'done' | 'run' | 'queue' }[] = [
        { label: 'Lecture du dossier client', state: 'done' },
        { label: 'Synthèse de l\'historique', state: 'done' },
        { label: 'Rédaction de la réponse', state: 'run' },
    ];
    return (
        <div style={{ marginLeft: 27, width: 'calc(100% - 27px)' }}>
            <div style={{ borderRadius: 10, background: white, boxShadow: EMBOSS, overflow: 'hidden' }}>
                <div className="flex items-center" style={{ gap: 8, padding: '8px 11px', borderBottom: `1px solid ${border}`, background: surface }}>
                    <span className="inline-flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: 6, background: white, boxShadow: EMBOSS_SOFT, flex: '0 0 auto' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 6-4 6 4 6M16 6l4 6-4 6" /></svg>
                    </span>
                    <span className="font-mono" style={{ flex: '1 1 auto', fontSize: 10, letterSpacing: '0.02em', color: ink }}>Tâche · Traiter la demande #2481</span>
                    <span className="font-mono inline-flex items-center" style={{ gap: 5, fontSize: 8.5, color: mutedText }}>
                        <Spinner color={ink} size={9} /> en cours
                    </span>
                </div>
                <div className="flex flex-col" style={{ gap: 6, padding: '9px 11px' }}>
                    {steps.map((s) => (
                        <div key={s.label} className="flex items-center" style={{ gap: 8 }}>
                            <span className="inline-flex items-center justify-center" style={{ width: 13, flex: '0 0 auto' }}>
                                {s.state === 'done' && <Check color={TOKENS.forest} size={11} />}
                                {s.state === 'run' && <Spinner color={ink} size={11} />}
                                {s.state === 'queue' && <span style={{ width: 6, height: 6, borderRadius: 999, background: TOKENS.gold }} />}
                            </span>
                            <span className="font-sans truncate" style={{ flex: '1 1 auto', fontSize: 10.5, color: s.state === 'run' ? ink : mutedText, fontWeight: s.state === 'run' ? 500 : 440 }}>{s.label}</span>
                            {s.state === 'done' && <span className="font-mono" style={{ fontSize: 8.5, color: mutedText, flex: '0 0 auto' }}>ok</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Conversation() {
    const { ink, mutedText, white, surface, border, pale } = TOKENS;
    return (
        <div className="flex flex-col" style={{ flex: '1 1 auto', minWidth: 0, background: white }}>
            {/* en-tête de la conversation */}
            <div className="flex items-center" style={{ gap: 9, padding: '11px 16px', borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
                <span style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: surface, boxShadow: EMBOSS_SOFT }}><PixelGlyph size={12} /></span>
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <div className="font-sans" style={{ fontSize: 12, fontWeight: 600, color: ink, lineHeight: '15px' }}>Assistant agent</div>
                    <div className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.04em', color: mutedText, lineHeight: '12px' }}>Relation client · Session active</div>
                </div>
                <span className="ml-auto inline-flex items-center font-mono" style={{ gap: 6, fontSize: 9, color: mutedText, padding: '3px 9px', borderRadius: 100, background: surface, boxShadow: PILL_SHADOW, whiteSpace: 'nowrap' }}>
                    <PulseDot color={TOKENS.forest} size={6} /> en ligne
                </span>
            </div>

            {/* fil */}
            <div className="relative" style={{ flex: '1 1 auto', minHeight: 0, overflow: 'hidden' }}>
                <div className="flex flex-col" style={{ gap: 11, padding: '16px 16px 54px' }}>
                    <UserBubble>Traite la demande #2481 et prépare une réponse au client.</UserBubble>
                    <AgentMsg>Je récupère le contexte du dossier et je m'appuie sur les outils branchés à votre espace.</AgentMsg>
                    <ToolCard />
                    <AgentMsg>Réponse rédigée. Une action sensible (envoi) requiert votre validation avant départ.</AgentMsg>
                </div>
                {/* fondu bas */}
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 64, background: 'linear-gradient(rgba(255,255,255,0) 0%, #FFFFFF 72%)', pointerEvents: 'none' }} />
            </div>

            {/* barre de saisie */}
            <div style={{ flexShrink: 0, margin: '0 14px 14px', height: 44, borderRadius: 9, background: pale, boxShadow: '0 2px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 1px #FFFFFF', position: 'relative' }}>
                <span className="font-sans" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 11.5, fontWeight: 500, color: '#BFBFBF', whiteSpace: 'nowrap' }}>Demander à l'agent…</span>
                <span className="inline-flex items-center justify-center" style={{ position: 'absolute', right: 7, top: 7, width: 30, height: 30, borderRadius: 7, border: '1px solid #383838', background: SEND_BG, boxShadow: SEND_SHADOW }}>
                    <svg width="13" height="13" viewBox="0 0 17 17" fill="none" aria-hidden="true"><path d="M8.5 14.17V2.83M8.5 2.83 3.54 7.79M8.5 2.83 13.46 7.79" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
            </div>
        </div>
    );
}

// ── Colonne d'outils / widgets ───────────────────────────────────────────────
function MetricTile({ value, unit, label, delta }: { value: string; unit?: string; label: string; delta: string }) {
    const { ink, mutedText, white, forest } = TOKENS;
    return (
        <div style={{ padding: '12px 13px', borderRadius: 11, background: white, boxShadow: EMBOSS }}>
            <div className="flex items-center justify-between">
                <span className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.12em', color: mutedText }}>{label}</span>
                <span className="font-mono inline-flex items-center" style={{ gap: 3, fontSize: 9, color: forest }}>
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke={forest} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8 6 4l3.5 4" /></svg>
                    {delta}
                </span>
            </div>
            <div className="flex items-baseline" style={{ gap: 3, marginTop: 7 }}>
                <span className="font-sans" style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', color: ink, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
                {unit && <span className="font-sans" style={{ fontSize: 12, fontWeight: 500, color: mutedText }}>{unit}</span>}
            </div>
        </div>
    );
}

function TaskList() {
    const { ink, mutedText, white, surface, border, gold } = TOKENS;
    const tasks: { label: string; state: 'done' | 'run' | 'queue' }[] = [
        { label: 'Qualifier #2482', state: 'run' },
        { label: 'Relancer #2479', state: 'done' },
        { label: 'Vérifier #2483', state: 'queue' },
    ];
    return (
        <div style={{ borderRadius: 11, background: white, boxShadow: EMBOSS, overflow: 'hidden' }}>
            <div className="flex items-center" style={{ gap: 8, padding: '9px 12px', borderBottom: `1px solid ${border}`, background: surface }}>
                <span className="font-mono" style={{ flex: '1 1 auto', fontSize: 8.5, letterSpacing: '0.12em', color: mutedText }}>FILE D'ATTENTE</span>
                <span className="font-mono" style={{ fontSize: 8.5, color: mutedText, padding: '1px 7px', borderRadius: 999, background: white, boxShadow: PILL_SHADOW }}>3</span>
            </div>
            <div className="flex flex-col" style={{ gap: 6, padding: 10 }}>
                {tasks.map((t) => (
                    <div key={t.label} className="flex items-center" style={{ gap: 9, padding: '7px 9px', borderRadius: 8, background: TOKENS.pale, boxShadow: EMBOSS_SOFT }}>
                        <span className="inline-flex items-center justify-center" style={{ width: 13, flex: '0 0 auto' }}>
                            {t.state === 'done' && <Check color={TOKENS.forest} size={11} />}
                            {t.state === 'run' && <Spinner color={ink} size={11} />}
                            {t.state === 'queue' && <span style={{ width: 6, height: 6, borderRadius: 999, background: gold }} />}
                        </span>
                        <span className="font-sans truncate" style={{ flex: '1 1 auto', fontSize: 10.5, fontWeight: t.state === 'run' ? 500 : 440, color: t.state === 'queue' ? mutedText : ink }}>{t.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ToolsColumn() {
    const { mutedText, forest, pale, border } = TOKENS;
    return (
        <div
            className="hidden min-[1040px]:flex flex-col"
            style={{ width: 224, flexShrink: 0, gap: 11, padding: 14, background: pale, borderLeft: `1px solid ${border}` }}
        >
            <span className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.14em', color: mutedText }}>OUTILS</span>
            <MetricTile value="98" unit="%" label="RÉSOLU AUTO." delta="+6" />
            <TaskList />
            {/* pastille de statut */}
            <div className="flex items-center" style={{ gap: 8, marginTop: 'auto', padding: '8px 11px', borderRadius: 9, background: TOKENS.white, boxShadow: EMBOSS_SOFT }}>
                <PulseDot color={forest} size={7} />
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <div className="font-sans" style={{ fontSize: 10.5, fontWeight: 600, color: TOKENS.ink, lineHeight: '13px' }}>Agent opérationnel</div>
                    <div className="font-mono" style={{ fontSize: 8, letterSpacing: '0.04em', color: mutedText, lineHeight: '11px' }}>5 connecteurs actifs</div>
                </div>
            </div>
        </div>
    );
}

// ── Fenêtre complète : sidebar + conversation + outils ───────────────────────
export function IlluSurfaces({ accent, onImage }: { accent: string; onImage?: boolean }) {
    // accent (lime) réservé au cadrage de la section ; la maquette lit en chrome
    // produit neutre. onImage : posée sur le fond bead → ombre portée plus profonde.
    void accent;
    const { mutedText, border, white, surface } = TOKENS;
    return (
        <div className="w-full font-sans mx-auto" style={{ maxWidth: 1060 }} aria-hidden="true">
            <div style={{ padding: 2, borderRadius: 14, background: surface, boxShadow: onImage ? `${WINDOW_SHADOW}, 0 36px 70px rgba(0,0,0,0.38)` : WINDOW_SHADOW }}>
                <div style={{ borderRadius: 12, background: white, overflow: 'hidden', border: `1px solid ${border}` }}>
                    {/* barre de titre */}
                    <div className="flex items-center" style={{ gap: 9, padding: '10px 15px', borderBottom: `1px solid ${border}`, background: white }}>
                        <span className="flex" style={{ gap: 5 }}>
                            {['#E6675A', '#E8B53D', '#5BB85B'].map((c) => (
                                <span key={c} style={{ width: 7, height: 7, borderRadius: 999, background: c, opacity: 0.55 }} />
                            ))}
                        </span>
                        <span className="font-mono truncate" style={{ fontSize: 9.5, letterSpacing: '0.12em', color: mutedText, minWidth: 0, flex: '1 1 auto', textAlign: 'center' }}>LEONARD · ESPACE DE TRAVAIL</span>
                        <span className="ml-auto inline-flex items-center font-mono" style={{ gap: 6, fontSize: 9, color: mutedText, padding: '3px 9px', borderRadius: 100, background: surface, boxShadow: PILL_SHADOW, whiteSpace: 'nowrap', flexShrink: 0 }}>
                            <PixelGlyph size={9} />
                            Agent intégré
                        </span>
                    </div>
                    {/* corps : sidebar + conversation + outils */}
                    <div className="flex" style={{ minHeight: 452 }}>
                        <Sidebar />
                        <Conversation />
                        <ToolsColumn />
                    </div>
                </div>
            </div>
            {/* légende */}
            <div className="flex justify-center" style={{ padding: '13px 4px 0' }}>
                <span
                    className="font-sans"
                    style={{
                        fontSize: 9,
                        fontWeight: 500,
                        color: onImage ? 'rgba(255,255,255,0.85)' : mutedText,
                        textShadow: onImage ? '0 1px 8px rgba(0,0,0,0.4)' : undefined,
                    }}
                >
                    L'agent, intégré à votre outil. Pas dans un onglet à côté.
                </span>
            </div>
        </div>
    );
}
