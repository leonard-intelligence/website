// 06 · PRODUITS & INTERFACES — « Dans votre flux, pas dans un onglet. »
// Une maquette de produit SaaS réaliste, claire et embossée : sidebar généraliste
// (workspace + menu de features + bouton assistant agent), conversation de l'agent
// au centre (message utilisateur, réponse, tâche outillée en cours), et une colonne
// d'outils/widgets à droite (tuile métrique, liste de tâches, pastille de statut).
// Palette claire + Geist. Niveau de finition aligné sur IlluHarness (gravure embossée).
import { useEffect, useState } from 'react';
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

// ── Avatar de l'agent : un noyau forest qui « vit » (respire) dans un petit
//    cercle, avec une impulsion (ping) qui irradie — présence vivante. ─────────
function AgentDot({ size = 12 }: { size?: number }) {
    const { forest } = TOKENS;
    const core = Math.max(3.5, size * 0.44);
    return (
        <span style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
            <span className="agent-ping" style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `1px solid ${forest}` }} />
            <span className="agent-core" style={{ width: core, height: core, borderRadius: 999, background: forest }} />
        </span>
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
            <span style={{ width: 18, height: 18, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: TOKENS.white, boxShadow: EMBOSS_SOFT }}><AgentDot /></span>
            <p className="font-sans" style={{ margin: 0, flex: '1 1 0%', fontSize: 11.5, fontWeight: 440, lineHeight: 1.6, color: mutedText }}>{children}</p>
        </div>
    );
}

// Carte « appel d'outil / tâche » — les étapes progressent au fil de la conversation.
type StepState = 'done' | 'run' | 'queue';
const TOOL_STEPS = ['Lecture du dossier client', "Synthèse de l'historique", 'Rédaction de la réponse'];
function ToolCard({ states, done }: { states: StepState[]; done: boolean }) {
    const { ink, mutedText, white, surface, border } = TOKENS;
    return (
        <div style={{ marginLeft: 27, width: 'calc(100% - 27px)' }}>
            <div style={{ borderRadius: 10, background: white, boxShadow: EMBOSS, overflow: 'hidden' }}>
                <div className="flex items-center" style={{ gap: 8, padding: '8px 11px', borderBottom: `1px solid ${border}`, background: surface }}>
                    <span className="inline-flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: 6, background: white, boxShadow: EMBOSS_SOFT, flex: '0 0 auto' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 6-4 6 4 6M16 6l4 6-4 6" /></svg>
                    </span>
                    <span className="font-mono" style={{ flex: '1 1 auto', fontSize: 10, letterSpacing: '0.02em', color: ink }}>Tâche · Traiter la demande #2481</span>
                    <span className="font-mono inline-flex items-center" style={{ gap: 5, fontSize: 8.5, color: mutedText }}>
                        {done ? <><Check color={TOKENS.forest} size={10} /> terminé</> : <><Spinner color={ink} size={9} /> en cours</>}
                    </span>
                </div>
                <div className="flex flex-col" style={{ gap: 6, padding: '9px 11px' }}>
                    {TOOL_STEPS.map((label, i) => {
                        const s = states[i];
                        return (
                            <div key={label} className="flex items-center" style={{ gap: 8 }}>
                                <span className="inline-flex items-center justify-center" style={{ width: 13, flex: '0 0 auto' }}>
                                    {s === 'done' && <Check color={TOKENS.forest} size={11} />}
                                    {s === 'run' && <Spinner color={ink} size={11} />}
                                    {s === 'queue' && <span style={{ width: 6, height: 6, borderRadius: 999, background: TOKENS.gold }} />}
                                </span>
                                <span className="font-sans truncate" style={{ flex: '1 1 auto', fontSize: 10.5, color: s === 'run' ? ink : mutedText, fontWeight: s === 'run' ? 500 : 440 }}>{label}</span>
                                {s === 'done' && <span className="font-mono" style={{ fontSize: 8.5, color: mutedText, flex: '0 0 auto' }}>ok</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Indicateur « l'agent écrit… » — trois points qui rebondissent.
function Typing() {
    const { mutedText, white } = TOKENS;
    return (
        <div className="flex items-start" style={{ gap: 9, width: '100%' }}>
            <span style={{ width: 18, height: 18, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: white, boxShadow: EMBOSS_SOFT }}><AgentDot /></span>
            <span className="inline-flex items-center" style={{ gap: 4, padding: '9px 12px', borderRadius: 9, background: ROW_BG, boxShadow: BUBBLE_SHADOW }}>
                {[0, 1, 2].map((i) => (
                    <span key={i} className="conv-dot" style={{ width: 5, height: 5, borderRadius: 999, background: mutedText, animationDelay: `${i * 160}ms` }} />
                ))}
            </span>
        </div>
    );
}

// Conversation simulée : se rejoue en boucle (message → écrit… → réponse →
// tâche outillée qui progresse → réponse finale → pause → fondu → ça repart).
// Durée de chaque phase (ms), index = numéro de phase ; 11 = fondu de sortie.
const CONV_PHASES = [400, 1000, 900, 900, 900, 850, 850, 800, 900, 1000, 2800, 600];
const CONV_FINAL = 9; // état complet figé sous prefers-reduced-motion

function Conversation() {
    const { ink, mutedText, white, surface, border, pale } = TOKENS;
    const reduce =
        typeof window !== 'undefined' &&
        !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const [phase, setPhase] = useState(reduce ? CONV_FINAL : 0);

    useEffect(() => {
        if (reduce) return;
        let timer: number;
        const run = (p: number) => {
            setPhase(p);
            timer = window.setTimeout(() => run((p + 1) % CONV_PHASES.length), CONV_PHASES[p]);
        };
        run(0);
        return () => clearTimeout(timer);
    }, [reduce]);

    const toolStates: StepState[] =
        phase <= 4 ? ['run', 'queue', 'queue']
        : phase === 5 ? ['done', 'run', 'queue']
        : phase === 6 ? ['done', 'done', 'run']
        : ['done', 'done', 'done'];

    return (
        <div className="flex flex-col" style={{ flex: '1 1 auto', minWidth: 0, background: white }}>
            <style>{`
                @keyframes conv-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                .conv-in { animation: conv-in 360ms cubic-bezier(0.22,1,0.36,1) both; }
                @keyframes conv-dot { 0%,80%,100% { opacity: 0.25; transform: translateY(0); } 40% { opacity: 0.9; transform: translateY(-2px); } }
                .conv-dot { animation: conv-dot 1100ms ease-in-out infinite; }
                @keyframes agent-ping { 0% { transform: scale(0.6); opacity: 0.7; } 100% { transform: scale(1.5); opacity: 0; } }
                .agent-ping { animation: agent-ping 1700ms ease-out infinite; transform-origin: center; }
                @keyframes agent-core { 0%,100% { transform: scale(0.85); opacity: 0.8; } 50% { transform: scale(1.08); opacity: 1; } }
                .agent-core { animation: agent-core 1700ms ease-in-out infinite; transform-origin: center; }
                @media (prefers-reduced-motion: reduce) { .conv-in, .conv-dot, .agent-ping, .agent-core { animation: none !important; } .agent-ping { opacity: 0.4; transform: none; } }
            `}</style>

            {/* en-tête de la conversation */}
            <div className="flex items-center" style={{ gap: 9, padding: '11px 16px', borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
                <span style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: surface, boxShadow: EMBOSS_SOFT }}><AgentDot size={12} /></span>
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
                <div className="flex flex-col" style={{ gap: 11, padding: '16px 16px 54px', opacity: phase === 11 ? 0 : 1, transition: 'opacity 450ms ease' }}>
                    {phase >= 1 && <div className="conv-in"><UserBubble>Traite la demande #2481 et prépare une réponse au client.</UserBubble></div>}
                    {phase === 2 && <Typing />}
                    {phase >= 3 && <div className="conv-in"><AgentMsg>Je récupère le contexte du dossier et je m'appuie sur les outils branchés à votre espace.</AgentMsg></div>}
                    {phase >= 4 && <div className="conv-in"><ToolCard states={toolStates} done={phase >= 7} /></div>}
                    {phase === 8 && <Typing />}
                    {phase >= 9 && <div className="conv-in"><AgentMsg>Réponse rédigée. Une action sensible (envoi) requiert votre validation avant départ.</AgentMsg></div>}
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
// (MetricTile + TaskList retirés — remplacés par les modules d'avancement ci-dessous)

function ToolsColumn() {
    const { ink, mutedText, white, surface, border, forest, pale } = TOKENS;
    // Checklist de la routine de l'agent — les tâches du sujet traité (relation client).
    const tasks: { label: string; done: boolean }[] = [
        { label: 'Récupérer les nouvelles demandes', done: true },
        { label: "Lire l'historique de chaque dossier", done: true },
        { label: 'Qualifier et prioriser les demandes', done: true },
        { label: 'Rédiger les réponses personnalisées', done: true },
        { label: 'Soumettre les actions sensibles à validation', done: true },
        { label: 'Mettre à jour le CRM', done: false },
    ];
    const doneCount = tasks.filter((t) => t.done).length;
    return (
        <div
            className="hidden min-[1040px]:flex flex-col"
            style={{ width: 224, flexShrink: 0, gap: 11, padding: 14, background: pale, borderLeft: `1px solid ${border}` }}
        >
            {/* Module PROGRESSION — checklist de la routine, façon Cowork (coché + barré) */}
            <div style={{ borderRadius: 11, background: white, boxShadow: EMBOSS, overflow: 'hidden' }}>
                <div className="flex items-center" style={{ gap: 8, padding: '9px 12px', borderBottom: `1px solid ${border}`, background: surface }}>
                    <span className="font-mono" style={{ flex: '1 1 auto', fontSize: 8.5, letterSpacing: '0.12em', color: mutedText }}>PROGRESSION</span>
                    <span className="font-mono" style={{ fontSize: 8, color: mutedText, padding: '1px 7px', borderRadius: 999, background: white, boxShadow: PILL_SHADOW }}>{doneCount} / {tasks.length}</span>
                </div>
                <div className="flex flex-col" style={{ gap: 9, padding: '11px 11px' }}>
                    {tasks.map((t, i) => (
                        <div key={i} className="flex items-start" style={{ gap: 9 }}>
                            <span className="inline-flex items-center justify-center" style={{ width: 16, height: 16, borderRadius: 999, flex: '0 0 auto', marginTop: 1, background: t.done ? forest : 'transparent' }}>
                                {t.done
                                    ? <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.4 6.3 4.9 8.7 9.6 3.4" /></svg>
                                    : <Spinner color={ink} size={11} />}
                            </span>
                            <span className="font-sans" style={{ flex: '1 1 auto', fontSize: 10.5, lineHeight: '14px', color: t.done ? mutedText : ink, fontWeight: t.done ? 440 : 500, textDecoration: t.done ? 'line-through' : 'none' }}>{t.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Module CONTEXTE — la routine + les connecteurs branchés */}
            <div style={{ marginTop: 'auto', borderRadius: 11, background: white, boxShadow: EMBOSS, overflow: 'hidden' }}>
                <div className="flex items-center" style={{ gap: 8, padding: '9px 12px', borderBottom: `1px solid ${border}`, background: surface }}>
                    <span className="font-mono" style={{ flex: '1 1 auto', fontSize: 8.5, letterSpacing: '0.12em', color: mutedText }}>CONTEXTE</span>
                </div>
                <div className="flex flex-col" style={{ gap: 9, padding: 10 }}>
                    <div className="flex items-center" style={{ gap: 8 }}>
                        <span className="inline-flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: 6, background: pale, boxShadow: EMBOSS_SOFT, flex: '0 0 auto' }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={mutedText} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                        </span>
                        <span className="font-sans truncate" style={{ flex: '1 1 auto', fontSize: 10.5, fontWeight: 500, color: ink }}>Relation client · quotidien</span>
                    </div>
                    <div className="flex items-center" style={{ gap: 8 }}>
                        <span style={{ flex: '0 0 auto', display: 'inline-flex' }}><PulseDot color={forest} size={7} /></span>
                        <span className="font-sans truncate" style={{ flex: '1 1 auto', fontSize: 10, color: mutedText }}>5 connecteurs actifs</span>
                    </div>
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
                            <AgentDot size={9} />
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
        </div>
    );
}
