// 02 · HARNAIS AGENTIQUE — wide orchestration command-center (cofounder idiom, light palette).
// A single large window: LEFT = radial graph (central Orchestrateur + 6 specialized
//   sub-agents on a dashed orbital ring, with faint "ghost" cards implying a larger fleet).
//   RIGHT = a conversational console (tabs, message thread, live agent rows, an inline
//   garde-fou approval card, input bar).
// accent = TOKENS.ink (#171717): high-contrast on light cards.
import { TOKENS, CARD_SHADOW } from '../Sections';
import { Spinner, PulseDot, Check } from './kit';

type SubState = 'run' | 'queue' | 'done';
type Sub = { label: string; state: SubState };

// Order = clockwise from top. 3 run · 2 file · 1 ok keeps the graph alive.
const SUBS: Sub[] = [
    { label: 'Recherche', state: 'run' }, // top
    { label: 'Rédaction', state: 'run' }, // upper-right
    { label: 'Vérification', state: 'queue' }, // lower-right
    { label: 'Synthèse', state: 'queue' }, // bottom
    { label: 'Extraction', state: 'run' }, // lower-left
    { label: 'Analyse', state: 'done' }, // upper-left
];

const R = 33; // node-ring radius, in % of the square
const positioned = SUBS.map((s, i) => {
    const ang = ((-90 + i * 60) * Math.PI) / 180;
    return { ...s, x: 50 + R * Math.cos(ang), y: 50 + R * Math.sin(ang) };
});

// Faint "ghost" cards sit on the outer dashed ring, between the spokes.
const GHOST_R = 42;
const ghosts = [-60, 0, 60, 120, 180, 240].map((d) => {
    const a = (d * Math.PI) / 180;
    return { x: 50 + GHOST_R * Math.cos(a), y: 50 + GHOST_R * Math.sin(a) };
});

// ── A specialized sub-agent node ─────────────────────────────────────────────
function NodeChip({ label, state, accent }: { label: string; state: SubState; accent: string }) {
    const { ink, border, white, gold, forest } = TOKENS;
    return (
        <span
            className="inline-flex items-center font-mono"
            style={{
                gap: 6,
                padding: '5px 10px',
                borderRadius: 9,
                border: `1px solid ${border}`,
                background: white,
                boxShadow: '0 1px 3px rgba(20,20,20,0.06)',
                fontSize: 10.5,
                color: ink,
                whiteSpace: 'nowrap',
            }}
        >
            {state === 'run' && <Spinner color={accent} size={9} />}
            {state === 'queue' && <span style={{ width: 7, height: 7, borderRadius: 999, background: gold, flex: '0 0 auto' }} />}
            {state === 'done' && <Check color={forest} size={10} />}
            {label}
        </span>
    );
}

// ── Header status-count cluster (cofounder's "4 ◐ 3 ● 3") ────────────────────
function CountCluster({ accent }: { accent: string }) {
    const { mutedText, gold, forest } = TOKENS;
    const item = (glyph: React.ReactNode, n: number) => (
        <span className="inline-flex items-center" style={{ gap: 4 }}>
            {glyph}
            <span>{n}</span>
        </span>
    );
    return (
        <span className="inline-flex items-center font-mono" style={{ gap: 11, fontSize: 10, color: mutedText }}>
            {item(<Spinner color={accent} size={8} />, 3)}
            {item(<span style={{ width: 6, height: 6, borderRadius: 999, background: gold, display: 'inline-block' }} />, 2)}
            {item(<Check color={forest} size={9} />, 1)}
        </span>
    );
}

// ── The radial graph (square: SVG connectors + absolutely-placed nodes) ───────
function RadialGraph({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, pale } = TOKENS;
    const spoke = 'rgba(23,23,23,0.14)';
    return (
        <div
            className="relative"
            style={{
                width: '100%',
                maxWidth: 480,
                aspectRatio: '1 / 1',
                margin: '0 auto',
                background: pale,
                borderRadius: 14,
                border: `1px solid ${border}`,
            }}
        >
            <svg
                viewBox="0 0 100 100"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                style={{ position: 'absolute', inset: 0, display: 'block' }}
                aria-hidden="true"
            >
                <circle cx="50" cy="50" r={R} fill="none" stroke={border} strokeWidth="0.5" />
                <circle cx="50" cy="50" r={GHOST_R} fill="none" stroke={border} strokeWidth="0.4" strokeDasharray="1.5 2.5" opacity="0.7" />
                {positioned.map((p) => (
                    <line key={p.label} x1="50" y1="50" x2={p.x} y2={p.y} stroke={spoke} strokeWidth="0.5" strokeDasharray="2 2" />
                ))}
                {ghosts.map((g, i) => (
                    <line key={'gl' + i} x1="50" y1="50" x2={g.x} y2={g.y} stroke={border} strokeWidth="0.35" strokeDasharray="1.5 3" opacity="0.5" />
                ))}
            </svg>

            {/* faint ghost cards (a larger fleet, implied) */}
            {ghosts.map((g, i) => (
                <span
                    key={'g' + i}
                    style={{
                        position: 'absolute',
                        left: `${g.x}%`,
                        top: `${g.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: 30,
                        height: 18,
                        borderRadius: 6,
                        border: `1px solid ${border}`,
                        background: white,
                        opacity: 0.5,
                        zIndex: 1,
                    }}
                />
            ))}

            {/* sub-agent nodes */}
            {positioned.map((p) => (
                <span key={p.label} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                    <NodeChip label={p.label} state={p.state} accent={accent} />
                </span>
            ))}

            {/* center orchestrator */}
            <span
                className="inline-flex font-mono"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    padding: '9px 14px',
                    borderRadius: 12,
                    border: `1.5px solid ${accent}`,
                    background: white,
                    boxShadow: `0 0 0 4px ${accent}10, 0 6px 14px -4px rgba(20,20,20,0.18)`,
                    whiteSpace: 'nowrap',
                }}
            >
                <span className="inline-flex items-center" style={{ gap: 7 }}>
                    <Spinner color={accent} size={11} />
                    <span style={{ fontSize: 11.5, color: ink }}>Orchestrateur</span>
                </span>
                <span style={{ fontSize: 8, letterSpacing: '0.14em', color: mutedText }}>BOUCLE ACTIVE</span>
            </span>

            <span
                className="font-mono"
                style={{ position: 'absolute', left: 11, bottom: 9, fontSize: 8.5, letterSpacing: '0.12em', color: mutedText }}
            >
                SOUS-AGENTS · PARALLÈLE
            </span>
        </div>
    );
}

// ── Console (right rail) atoms ───────────────────────────────────────────────
function Tab({ label, active, accent }: { label: string; active?: boolean; accent: string }) {
    const { ink, mutedText } = TOKENS;
    return (
        <span className="font-mono relative" style={{ fontSize: 11, color: active ? ink : mutedText, fontWeight: active ? 600 : 400, paddingBottom: 10 }}>
            {label}
            {active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, borderRadius: 2, background: accent }} />}
        </span>
    );
}

function UserBubble({ children }: { children: React.ReactNode }) {
    const { ink, border, surface } = TOKENS;
    return (
        <div className="self-end" style={{ maxWidth: '86%', background: surface, border: `1px solid ${border}`, borderRadius: '13px 13px 4px 13px', padding: '9px 12px' }}>
            <span className="font-sans" style={{ fontSize: 12.5, color: ink, lineHeight: 1.45 }}>{children}</span>
        </div>
    );
}

function AgentMsg({ children }: { children: React.ReactNode }) {
    const { ink, mutedText } = TOKENS;
    return (
        <div className="flex items-start" style={{ gap: 8, maxWidth: '94%' }}>
            <span className="font-mono" style={{ fontSize: 11, color: mutedText, marginTop: 2, flex: '0 0 auto' }}>::</span>
            <span className="font-sans" style={{ fontSize: 12.5, color: ink, lineHeight: 1.5 }}>{children}</span>
        </div>
    );
}

function AgentRow({ id, task, state, accent }: { id: string; task: string; state: SubState; accent: string }) {
    const { ink, mutedText, border, white, gold } = TOKENS;
    return (
        <div className="flex items-center" style={{ gap: 9, padding: '8px 11px', borderRadius: 10, border: `1px solid ${border}`, background: white }}>
            {state === 'run' ? <Spinner color={accent} size={11} /> : <span style={{ width: 8, height: 8, borderRadius: 999, background: gold, flex: '0 0 auto' }} />}
            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <div className="font-mono truncate" style={{ fontSize: 11, color: ink, lineHeight: '15px' }}>Sous-agent · {id}</div>
                <div className="font-sans truncate" style={{ fontSize: 11, color: mutedText, lineHeight: '15px' }}>{task}</div>
            </div>
            <span
                className="font-mono"
                style={{ fontSize: 9.5, color: state === 'run' ? ink : mutedText, padding: '3px 9px', borderRadius: 999, border: `1px solid ${border}`, flex: '0 0 auto' }}
            >
                {state === 'run' ? 'En cours' : 'En file'}
            </span>
        </div>
    );
}

function ApprovalCard({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, gold, forest } = TOKENS;
    const pill = (label: string, textColor: string, borderColor: string) => (
        <span className="inline-flex items-center font-mono" style={{ fontSize: 9.5, color: textColor, padding: '4px 12px', borderRadius: 999, border: `1px solid ${borderColor}` }}>
            {label}
        </span>
    );
    return (
        <div style={{ borderRadius: 11, border: `1px solid ${accent}`, background: white, boxShadow: `0 0 0 3px ${accent}0d`, padding: '10px 12px' }}>
            <div className="flex items-center" style={{ gap: 7, marginBottom: 7 }}>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.12em', color: mutedText }}>GARDE-FOU</span>
                <span className="ml-auto inline-flex items-center" style={{ gap: 6 }}>
                    <PulseDot color={gold} size={7} />
                    <span className="font-mono" style={{ fontSize: 9.5, color: mutedText }}>En attente</span>
                </span>
            </div>
            <div className="font-sans" style={{ fontSize: 12, color: ink, lineHeight: 1.4, marginBottom: 9 }}>
                Action sensible — envoi externe avant validation.
            </div>
            <div className="flex items-center" style={{ gap: 8 }}>
                {pill('Approuver', forest, `${forest}66`)}
                {pill('Refuser', mutedText, border)}
            </div>
        </div>
    );
}

function ConsolePanel({ accent }: { accent: string }) {
    const { mutedText, border, white, ink } = TOKENS;
    const tabs = ['Système', 'Agents', 'Mémoire', 'Journal'];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 360 }}>
            <div className="flex items-center" style={{ gap: 18, padding: '11px 16px 0', borderBottom: `1px solid ${border}` }}>
                {tabs.map((t, i) => (
                    <Tab key={t} label={t} active={i === 0} accent={accent} />
                ))}
            </div>

            <div style={{ flex: '1 1 auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
                <UserBubble>Traite le lot de dossiers en attente.</UserBubble>
                <AgentMsg>Je décompose en sous-agents spécialisés et je te fais valider les actions sensibles avant exécution.</AgentMsg>
                <AgentRow id="Recherche" task="Collecte des sources" state="run" accent={accent} />
                <AgentRow id="Vérification" task="Contrôle des règles" state="queue" accent={accent} />
                <UserBubble>Prépare la synthèse une fois vérifié.</UserBubble>
                <AgentMsg>Compris — synthèse mise en file derrière la vérification. Je te notifie avant tout envoi externe.</AgentMsg>
                <ApprovalCard accent={accent} />
            </div>

            <div style={{ padding: '12px 16px', borderTop: `1px solid ${border}` }}>
                <div className="flex items-center" style={{ gap: 8, border: `1px solid ${border}`, borderRadius: 12, background: white, padding: '9px 9px 9px 13px' }}>
                    <span className="font-mono" style={{ fontSize: 12, color: mutedText, flex: '1 1 auto' }}>Demander à l'orchestrateur…</span>
                    <span className="inline-flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: 9, background: ink, color: white, fontSize: 15, flex: '0 0 auto' }}>↑</span>
                </div>
            </div>
        </div>
    );
}

export function IlluHarness({ accent }: { accent: string }) {
    const { mutedText, border, white, pale } = TOKENS;
    return (
        <div
            className="w-full font-sans"
            style={{
                maxWidth: 1080,
                margin: '0 auto',
                borderRadius: 16,
                border: `1px solid ${border}`,
                background: `linear-gradient(180deg, ${white}, ${pale})`,
                boxShadow: CARD_SHADOW,
                overflow: 'hidden',
            }}
            aria-hidden="true"
        >
            {/* toolbar */}
            <div className="flex items-center" style={{ gap: 10, padding: '12px 16px', borderBottom: `1px solid ${border}` }}>
                <div className="flex" style={{ gap: 5 }}>
                    {['#E6675A', '#E8B53D', '#5BB85B'].map((c) => (
                        <span key={c} style={{ width: 8, height: 8, borderRadius: 999, background: c, opacity: 0.5 }} />
                    ))}
                </div>
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: mutedText, marginLeft: 4 }}>ORCHESTRATION</span>
                <span className="font-mono" style={{ fontSize: 10, color: mutedText, padding: '2px 8px', borderRadius: 6, border: `1px solid ${border}` }}>z 100%</span>
                <div className="ml-auto">
                    <CountCluster accent={accent} />
                </div>
            </div>

            {/* body: graph | console */}
            <div className="flex flex-col lg:flex-row">
                <div className="flex items-center justify-center" style={{ flex: '1.45 1 0', minWidth: 0, padding: '22px 20px' }}>
                    <RadialGraph accent={accent} />
                </div>
                <div
                    className="border-t lg:border-t-0 lg:border-l"
                    style={{ flex: '1 1 0', minWidth: 320, borderColor: border, background: pale }}
                >
                    <ConsolePanel accent={accent} />
                </div>
            </div>
        </div>
    );
}
