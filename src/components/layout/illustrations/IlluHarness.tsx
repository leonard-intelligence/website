// 02 · HARNAIS AGENTIQUE — orchestration command-center (cofounder idiom, Leonard light palette).
// Canvas (toolbar + radial graph: central Orchestrateur, 8 specialized sub-agents on a dashed
// ring with capped spokes + a faint outer network) alongside a conversational console.
// Clean "embossed hairline" cards (layered box-shadows, not 1px borders). accent = TOKENS.ink.
import { TOKENS } from '../Sections';
import { Spinner, PulseDot, Check } from './kit';

// ── Signature embossed-card shadow (cofounder technique) ─────────────────────
const EMBOSS = '0 0 0 0.8px #FFFFFF inset, 0 0 0 0.8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)';
const ROW_BG = 'linear-gradient(180deg, #F5F5F2 0%, rgba(245,245,242,0.55) 100%)';
const ROW_SHADOW = '0 0 0 1px rgba(0,0,0,0.04), inset 0 1.4px 0 #FFFFFF, 0 0 1.4px rgba(0,0,0,0.05)';
const STROKE = 'rgba(23,23,23,0.12)';
const STROKE_FAINT = 'rgba(23,23,23,0.08)';

type SubState = 'run' | 'queue' | 'done';
type Sub = { label: string; state: SubState };

// 8 nodes clockwise from top. Short labels at the horizontal (0°/180°) slots so they fit.
const SUBS: Sub[] = [
    { label: 'Recherche', state: 'run' }, // top
    { label: 'Extraction', state: 'run' }, // upper-right
    { label: 'Analyse', state: 'done' }, // right
    { label: 'Vérification', state: 'queue' }, // lower-right
    { label: 'Rédaction', state: 'run' }, // bottom
    { label: 'Classification', state: 'queue' }, // lower-left
    { label: 'Synthèse', state: 'run' }, // left
    { label: 'Indexation', state: 'done' }, // upper-left
];

const R_CARD = 39; // card centers
const R_INNER = 7; // inner spoke dot (near center)
const R_OUTER = 33; // outer spoke dot (just inside card)
const R_GHOST = 46; // faint outer ring
const placed = SUBS.map((s, i) => {
    const a = ((-90 + i * 45) * Math.PI) / 180;
    const at = (r: number) => ({ x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) });
    return { ...s, card: at(R_CARD), inner: at(R_INNER), outer: at(R_OUTER), ghost: at(R_GHOST) };
});

// ── Status atoms ─────────────────────────────────────────────────────────────
function SeedDot({ color, inner }: { color: string; inner: string }) {
    return <span style={{ width: 6, height: 6, borderRadius: 999, background: color, boxShadow: `inset 0 0.8px 0.8px ${inner}`, flex: '0 0 auto', display: 'inline-block' }} />;
}

function StateMark({ state, accent }: { state: SubState; accent: string }) {
    const { gold, forest } = TOKENS;
    if (state === 'run') return <Spinner color={accent} size={9} />;
    if (state === 'queue') return <SeedDot color={gold} inner="rgba(120,90,20,0.55)" />;
    return <Check color={forest} size={10} />;
}

// ── A specialized sub-agent node (embossed card) ─────────────────────────────
function NodeCard({ label, state, accent }: { label: string; state: SubState; accent: string }) {
    const { mutedText, pale } = TOKENS;
    return (
        <span
            className="inline-flex items-center font-mono"
            style={{ gap: 6, padding: '7px 11px', borderRadius: 8, background: pale, boxShadow: EMBOSS, fontSize: 10.5, color: mutedText, whiteSpace: 'nowrap' }}
        >
            <StateMark state={state} accent={accent} />
            {label}
        </span>
    );
}

// ── Header status-count cluster ──────────────────────────────────────────────
function CountCluster({ accent }: { accent: string }) {
    const { mutedText, gold, forest } = TOKENS;
    const item = (glyph: React.ReactNode, n: number) => (
        <span className="inline-flex items-center" style={{ gap: 5 }}>{glyph}<span style={{ fontVariantNumeric: 'tabular-nums' }}>{n}</span></span>
    );
    return (
        <span
            className="inline-flex items-center font-mono"
            style={{ gap: 9, fontSize: 9.5, color: mutedText, padding: '4px 9px', borderRadius: 7, background: 'rgba(245,245,242,0.95)', boxShadow: '0 0 0 0.6px #FFFFFF inset, 0 0 0 0.9px rgba(0,0,0,0.08)' }}
        >
            {item(<Spinner color={accent} size={8} />, 4)}
            {item(<SeedDot color={gold} inner="rgba(120,90,20,0.55)" />, 2)}
            {item(<Check color={forest} size={9} />, 2)}
        </span>
    );
}

// ── Canvas toolbar (workspace chip + zoom · folder/search) ───────────────────
function Toolbar() {
    const { ink, mutedText } = TOKENS;
    return (
        <div className="flex items-center justify-between" style={{ padding: '2px 4px 14px' }}>
            <div className="flex items-center" style={{ gap: 10 }}>
                <div
                    className="inline-flex items-center font-sans"
                    style={{ gap: 8, padding: '5px 8px 5px 6px', borderRadius: 7, border: '0.5px solid rgba(0,0,0,0.10)', background: 'rgba(32,32,32,0.03)' }}
                >
                    <span className="inline-flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: 999, background: '#D9D9D6' }}>
                        <span className="font-mono" style={{ fontSize: 7.5, fontWeight: 500, color: mutedText }}>LI</span>
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 500, color: mutedText, whiteSpace: 'nowrap' }}>Orchestration</span>
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true"><path d="M1 1L4 4L7 1" stroke="rgba(32,32,32,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span className="inline-flex items-center font-mono" style={{ gap: 5, fontSize: 10 }}>
                    <span style={{ color: 'rgba(32,32,32,0.3)' }}>Z</span>
                    <span style={{ color: 'rgba(32,32,32,0.45)' }}>100%</span>
                </span>
            </div>
            <div className="flex items-center" style={{ gap: 11, color: ink }}>
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" aria-hidden="true"><path d="M0.357 3.857H10.356M9.356 8.856a1 1 0 0 0 1-1V2.857a1 1 0 0 0-1-1H5.406a1 1 0 0 1-.845-.45l-.405-.6a1 1 0 0 0-.834-.45H1.357a1 1 0 0 0-1 1V7.856a1 1 0 0 0 1 1H9.356Z" stroke="#202020" strokeOpacity="0.4" strokeWidth="0.71" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M9.995 9.999 7.929 7.933M9.047 5.238a3.809 3.809 0 1 1-7.618 0 3.809 3.809 0 0 1 7.618 0Z" stroke="#202020" strokeOpacity="0.4" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
        </div>
    );
}

// ── The radial graph (square: SVG connectors + absolutely-placed nodes) ───────
function RadialGraph({ accent }: { accent: string }) {
    const { ink, mutedText, surface, pale } = TOKENS;
    const Dot = ({ p, faint }: { p: { x: number; y: number }; faint?: boolean }) => (
        <circle cx={p.x} cy={p.y} r="0.55" fill={surface} stroke="rgba(0,0,0,0.14)" strokeWidth="0.18" opacity={faint ? 0.6 : 1} />
    );
    return (
        <div className="relative w-full" style={{ maxWidth: 500, aspectRatio: '1 / 1', margin: '0 auto' }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, display: 'block' }} aria-hidden="true">
                <circle cx="50" cy="50" r={R_CARD} fill="none" stroke={STROKE} strokeWidth="0.2" />
                <circle cx="50" cy="50" r={R_GHOST} fill="none" stroke={STROKE_FAINT} strokeWidth="0.18" strokeDasharray="0.9 1.4" />
                {placed.map((p) => (
                    <g key={p.label}>
                        <line x1={p.inner.x} y1={p.inner.y} x2={p.outer.x} y2={p.outer.y} stroke={STROKE} strokeWidth="0.22" strokeLinecap="round" strokeDasharray="0.9 0.9" />
                        <line x1={p.outer.x} y1={p.outer.y} x2={p.ghost.x} y2={p.ghost.y} stroke={STROKE_FAINT} strokeWidth="0.18" strokeLinecap="round" strokeDasharray="0.8 1.2" />
                        <Dot p={p.inner} />
                        <Dot p={p.outer} />
                        <Dot p={p.ghost} faint />
                    </g>
                ))}
            </svg>

            {placed.map((p) => (
                <span key={p.label} style={{ position: 'absolute', left: `${p.card.x}%`, top: `${p.card.y}%`, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                    <NodeCard label={p.label} state={p.state} accent={accent} />
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
                    padding: '10px 15px',
                    borderRadius: 10,
                    background: '#F0F0EB',
                    boxShadow: `0 0 0 1px ${accent}22, ${EMBOSS}`,
                    whiteSpace: 'nowrap',
                }}
            >
                <span className="inline-flex items-center" style={{ gap: 7 }}>
                    <Spinner color={accent} size={11} />
                    <span style={{ fontSize: 11.5, color: ink }}>Orchestrateur</span>
                </span>
                <span style={{ fontSize: 8, letterSpacing: '0.16em', color: mutedText }}>BOUCLE ACTIVE</span>
            </span>

            <span className="font-mono" style={{ position: 'absolute', left: 2, bottom: 0, fontSize: 8.5, letterSpacing: '0.12em', color: mutedText, background: pale, padding: '2px 6px', borderRadius: 6, boxShadow: EMBOSS }}>
                SOUS-AGENTS · PARALLÈLE
            </span>
        </div>
    );
}

// ── Console (right rail) atoms ───────────────────────────────────────────────
function Tab({ label, active }: { label: string; active?: boolean }) {
    const { ink, mutedText } = TOKENS;
    return (
        <span
            className="inline-flex items-center justify-center font-sans"
            style={{
                height: 18,
                padding: '0 7px',
                borderRadius: 5,
                fontSize: 10,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                color: active ? ink : mutedText,
                background: active ? 'rgba(0,0,0,0.05)' : 'transparent',
                boxShadow: active ? '0 0 0 0.6px rgba(0,0,0,0.06)' : 'none',
            }}
        >
            {label}
        </span>
    );
}

function AgentGlyph() {
    const c = 'rgba(23,23,23,0.6)';
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 3 }} aria-hidden="true">
            <rect x="3" y="3" width="2" height="2" fill={c} />
            <rect x="7" y="3" width="2" height="2" fill={c} />
            <rect x="2" y="7" width="2" height="2" fill={c} />
            <rect x="8" y="7" width="2" height="2" fill={c} />
            <rect x="5" y="7" width="2" height="2" fill="rgba(23,23,23,0.2)" />
        </svg>
    );
}

function UserBubble({ children }: { children: React.ReactNode }) {
    const { ink } = TOKENS;
    return (
        <div className="self-end" style={{ maxWidth: '82%', padding: '9px 12px', borderRadius: 9, background: 'rgba(23,23,23,0.04)', boxShadow: '0 0 0 0.7px rgba(0,0,0,0.06)' }}>
            <span className="font-sans" style={{ fontSize: 11.5, fontWeight: 500, color: ink, lineHeight: 1.5 }}>{children}</span>
        </div>
    );
}

function AgentMsg({ children }: { children: React.ReactNode }) {
    const { mutedText } = TOKENS;
    return (
        <div className="flex items-start" style={{ gap: 8, marginTop: 16 }}>
            <AgentGlyph />
            <p className="font-sans" style={{ margin: 0, flex: '1 1 0%', fontSize: 11.5, fontWeight: 400, color: mutedText, lineHeight: 1.6 }}>{children}</p>
        </div>
    );
}

function Strong({ children }: { children: React.ReactNode }) {
    return <span className="font-sans" style={{ fontWeight: 600, color: TOKENS.ink }}>{children}</span>;
}

function AgentRow({ name, task, state, accent }: { name: string; task: string; state: 'run' | 'queue'; accent: string }) {
    const { ink, mutedText } = TOKENS;
    return (
        <div className="flex items-center" style={{ gap: 8, padding: '8px 10px', borderRadius: 8, background: ROW_BG, boxShadow: ROW_SHADOW }}>
            {state === 'run' ? <Spinner color={accent} size={9} /> : <span style={{ width: 6, height: 6, borderRadius: 999, background: '#BFBFBF', boxShadow: '0 0.6px 0 #FFFFFF', flex: '0 0 auto' }} />}
            <span className="font-sans" style={{ fontSize: 10, fontWeight: 500, color: ink, flex: '0 0 auto' }}>{name}</span>
            <span className="font-sans truncate" style={{ fontSize: 9, color: mutedText, flex: '1 1 0%' }}>{task}</span>
            <span
                className="font-mono"
                style={{
                    fontSize: 8,
                    padding: '2px 6px',
                    borderRadius: 3,
                    flex: '0 0 auto',
                    color: state === 'run' ? ink : mutedText,
                    background: state === 'run' ? 'rgba(23,23,23,0.06)' : 'transparent',
                    boxShadow: state === 'run' ? 'none' : '0 0 0 0.6px rgba(0,0,0,0.15)',
                }}
            >
                {state === 'run' ? 'En cours' : 'En file'}
            </span>
        </div>
    );
}

function ApprovalCard() {
    const { ink, mutedText, gold, forest } = TOKENS;
    const pill = (label: string, color: string, ring: string) => (
        <span className="inline-flex items-center font-mono" style={{ fontSize: 8.5, color, padding: '3px 9px', borderRadius: 999, boxShadow: `0 0 0 0.7px ${ring}` }}>{label}</span>
    );
    return (
        <div style={{ marginTop: 10, padding: '9px 11px', borderRadius: 9, background: ROW_BG, boxShadow: `0 0 0 0.8px ${ink}1f, inset 0 1.4px 0 #FFFFFF` }}>
            <div className="flex items-center" style={{ gap: 7, marginBottom: 6 }}>
                <span className="font-mono" style={{ fontSize: 8, letterSpacing: '0.12em', color: mutedText }}>GARDE-FOU</span>
                <span className="ml-auto inline-flex items-center" style={{ gap: 6 }}>
                    <PulseDot color={gold} size={7} />
                    <span className="font-mono" style={{ fontSize: 8.5, color: mutedText }}>En attente</span>
                </span>
            </div>
            <div className="font-sans" style={{ fontSize: 11, color: ink, lineHeight: 1.4, marginBottom: 8 }}>Action sensible : envoi externe avant validation.</div>
            <div className="flex items-center" style={{ gap: 8 }}>
                {pill('Approuver', forest, `${forest}66`)}
                {pill('Refuser', mutedText, 'rgba(0,0,0,0.15)')}
            </div>
        </div>
    );
}

function ConsolePanel({ accent }: { accent: string }) {
    const { ink, surface, pale } = TOKENS;
    const tabs = ['Système', 'Agents', 'Mémoire', 'Journal'];
    return (
        <div className="flex flex-col" style={{ width: '100%', height: '100%', minHeight: 360, padding: 4, borderRadius: 9, background: surface }}>
            <div className="flex items-center" style={{ gap: 6, padding: '9px 6px' }}>
                {tabs.map((t, i) => (
                    <Tab key={t} label={t} active={i === 0} />
                ))}
            </div>

            <div className="flex flex-col" style={{ flex: '1 1 auto', borderRadius: 8, background: pale, overflow: 'hidden' }}>
                <div className="flex flex-col" style={{ flex: '1 1 auto', padding: '12px 12px 8px' }}>
                    <UserBubble>Traite le lot de dossiers en attente.</UserBubble>
                    <AgentMsg>
                        Je décompose en sous-agents spécialisés : recherche, vérification, synthèse.{' '}
                        <Strong>Je te fais valider les actions sensibles avant tout envoi externe.</Strong>
                    </AgentMsg>
                    <div className="flex flex-col" style={{ gap: 6, marginTop: 16 }}>
                        <AgentRow name="Recherche" task="Collecte et dédoublonne les sources" state="run" accent={accent} />
                        <AgentRow name="Vérification" task="Contrôle des règles métier" state="queue" accent={accent} />
                    </div>
                    <ApprovalCard />
                    <div style={{ marginTop: 22 }}>
                        <UserBubble>Lance la synthèse une fois vérifié.</UserBubble>
                    </div>
                    <AgentMsg>
                        Compris. La synthèse démarre après la vérification. <Strong>Tu auras un récapitulatif à valider.</Strong>
                    </AgentMsg>
                    <div className="flex flex-col" style={{ gap: 6, marginTop: 16 }}>
                        <AgentRow name="Synthèse" task="Rédige le récapitulatif" state="run" accent={accent} />
                        <AgentRow name="Rédaction" task="Met en forme le livrable" state="queue" accent={accent} />
                    </div>
                </div>

                <div style={{ margin: 8 }}>
                    <div className="flex items-center" style={{ gap: 12, borderRadius: 8, background: pale, padding: '8px 10px', boxShadow: '0 0 0 0.8px rgba(0,0,0,0.06)' }}>
                        <span className="font-sans" style={{ flex: '1 1 auto', fontSize: 10, color: 'rgba(32,32,32,0.35)' }}>Demander à l'orchestrateur…</span>
                        <span className="inline-flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: 5, background: ink, flex: '0 0 auto' }}>
                            <svg width="12" height="12" viewBox="0 0 17 17" fill="none" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M8.5 3.4a.5.5 0 0 1 .354.146l3.683 3.683a.5.5 0 0 1-.708.707L9 5.104V13.1a.5.5 0 0 1-1 0V5.104L5.171 7.934a.5.5 0 0 1-.708-.707l3.683-3.683A.5.5 0 0 1 8.5 3.4Z" fill={pale} opacity="0.92" /></svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function IlluHarness({ accent }: { accent: string }) {
    return (
        <div className="w-full font-sans" style={{ maxWidth: 1060, margin: '0 auto' }} aria-hidden="true">
            <div className="flex flex-col min-[1000px]:flex-row items-stretch" style={{ gap: 14 }}>
                {/* canvas: toolbar + graph */}
                <div className="flex flex-col" style={{ flex: '1.5 1 0', minWidth: 0 }}>
                    <Toolbar />
                    <div className="flex items-center justify-center" style={{ flex: '1 1 auto' }}>
                        <RadialGraph accent={accent} />
                    </div>
                    <div className="ml-auto" style={{ paddingTop: 12 }}>
                        <CountCluster accent={accent} />
                    </div>
                </div>

                {/* console */}
                <div className="shrink-0" style={{ width: '100%', maxWidth: 332 }}>
                    <ConsolePanel accent={accent} />
                </div>
            </div>
        </div>
    );
}
