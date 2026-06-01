// 02 · HARNAIS AGENTIQUE — radial orchestration command-center (cofounder idiom, light palette).
// BASE: WindowCard "ORCHESTRATION" wrapping a radial graph — a central "Orchestrateur"
//   node, six specialized sub-agents on a dashed orbital ring with live states, and a
//   real-time delegation footer.
// OVERLAY: FloatPanel "GARDE-FOU" — the human-in-the-loop approval moment.
// accent = TOKENS.ink (#171717): high-contrast on light cards.
import { TOKENS } from '../Sections';
import { WindowCard, FloatPanel, Spinner, PulseDot, Check } from './kit';

type SubState = 'run' | 'queue' | 'done';
type Sub = { label: string; state: SubState };

// Order = clockwise from top. Mix of states keeps the graph alive (3 run · 2 file · 1 ok).
const SUBS: Sub[] = [
    { label: 'Recherche', state: 'run' }, // top
    { label: 'Rédaction', state: 'run' }, // upper-right
    { label: 'Vérification', state: 'queue' }, // lower-right (partly behind overlay = depth)
    { label: 'Synthèse', state: 'queue' }, // bottom
    { label: 'Extraction', state: 'run' }, // lower-left
    { label: 'Analyse', state: 'done' }, // upper-left
];

const R = 33; // node-ring radius, in % of the square
const positioned = SUBS.map((s, i) => {
    const ang = ((-90 + i * 60) * Math.PI) / 180;
    return { ...s, x: 50 + R * Math.cos(ang), y: 50 + R * Math.sin(ang) };
});

// ── A specialized sub-agent node ─────────────────────────────────────────────
function NodeChip({ label, state, accent }: { label: string; state: SubState; accent: string }) {
    const { ink, border, white, gold, forest } = TOKENS;
    return (
        <span
            className="inline-flex items-center font-mono"
            style={{
                gap: 6,
                padding: '5px 9px',
                borderRadius: 9,
                border: `1px solid ${border}`,
                background: white,
                boxShadow: '0 1px 3px rgba(20,20,20,0.06)',
                fontSize: 10,
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
        <span className="inline-flex items-center font-mono" style={{ gap: 10, fontSize: 10, color: mutedText }}>
            {item(<Spinner color={accent} size={8} />, 3)}
            {item(<span style={{ width: 6, height: 6, borderRadius: 999, background: gold, display: 'inline-block' }} />, 2)}
            {item(<Check color={forest} size={9} />, 1)}
        </span>
    );
}

// ── The radial graph itself (square: SVG connectors + absolutely-placed nodes) ─
function RadialGraph({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, pale } = TOKENS;
    const spoke = 'rgba(23,23,23,0.14)';
    return (
        <div
            className="relative"
            style={{
                width: '100%',
                maxWidth: 360,
                aspectRatio: '1 / 1',
                margin: '0 auto',
                background: pale,
                borderRadius: 14,
                border: `1px solid ${border}`,
            }}
        >
            {/* connectors + orbital rings */}
            <svg
                viewBox="0 0 100 100"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                style={{ position: 'absolute', inset: 0, display: 'block' }}
                aria-hidden="true"
            >
                <circle cx="50" cy="50" r={R} fill="none" stroke={border} strokeWidth="0.5" />
                <circle cx="50" cy="50" r={R + 9} fill="none" stroke={border} strokeWidth="0.4" strokeDasharray="1.5 2.5" opacity="0.7" />
                {positioned.map((p) => (
                    <line key={p.label} x1="50" y1="50" x2={p.x} y2={p.y} stroke={spoke} strokeWidth="0.5" strokeDasharray="2 2" />
                ))}
                {/* faint off-graph stubs imply a larger network */}
                {positioned.map((p) => {
                    const ang = Math.atan2(p.y - 50, p.x - 50);
                    return (
                        <line
                            key={'stub' + p.label}
                            x1={p.x}
                            y1={p.y}
                            x2={p.x + 12 * Math.cos(ang)}
                            y2={p.y + 12 * Math.sin(ang)}
                            stroke={border}
                            strokeWidth="0.4"
                            strokeDasharray="1.5 2.5"
                            opacity="0.6"
                        />
                    );
                })}
            </svg>

            {/* sub-agent nodes */}
            {positioned.map((p) => (
                <span key={p.label} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                    <NodeChip label={p.label} state={p.state} accent={accent} />
                </span>
            ))}

            {/* center orchestrator */}
            <span
                className="inline-flex items-center font-mono"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    gap: 7,
                    padding: '8px 12px',
                    borderRadius: 11,
                    border: `1.5px solid ${accent}`,
                    background: white,
                    boxShadow: `0 0 0 4px ${accent}10, 0 6px 14px -4px rgba(20,20,20,0.18)`,
                    fontSize: 11,
                    color: ink,
                    whiteSpace: 'nowrap',
                }}
            >
                <Spinner color={accent} size={11} />
                Orchestrateur
            </span>

            {/* corner caption */}
            <span
                className="font-mono"
                style={{ position: 'absolute', left: 10, bottom: 8, fontSize: 8.5, letterSpacing: '0.12em', color: mutedText }}
            >
                SOUS-AGENTS · PARALLÈLE
            </span>
        </div>
    );
}

// ── Real-time delegation footer ──────────────────────────────────────────────
function DelegationFooter({ accent }: { accent: string }) {
    const { ink, mutedText, gold } = TOKENS;
    return (
        <div style={{ padding: '10px 14px' }}>
            <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: mutedText, marginBottom: 8 }}>
                DÉLÉGATION · TEMPS RÉEL
            </div>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 6 }}>
                <Spinner color={accent} size={10} />
                <span className="font-mono" style={{ fontSize: 11, color: ink }}>Recherche</span>
                <span className="font-mono" style={{ fontSize: 10.5, color: mutedText, flex: '1 1 auto' }}>collecte des sources</span>
                <span className="font-mono" style={{ fontSize: 9.5, color: mutedText }}>1m 12s</span>
            </div>
            <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: gold, flex: '0 0 auto' }} />
                <span className="font-mono" style={{ fontSize: 11, color: ink }}>Vérification</span>
                <span className="font-mono" style={{ fontSize: 10.5, color: mutedText, flex: '1 1 auto' }}>en file d'attente</span>
            </div>
        </div>
    );
}

// ── Human-in-the-loop guardrail overlay ──────────────────────────────────────
function GuardrailOverlay({ accent }: { accent: string }) {
    const { ink, mutedText, gold, forest, border } = TOKENS;
    const pill = (label: string, textColor: string, borderColor: string) => (
        <span
            className="inline-flex items-center font-mono"
            style={{ fontSize: 9.5, color: textColor, padding: '4px 11px', borderRadius: 999, border: `1px solid ${borderColor}` }}
        >
            {label}
        </span>
    );
    return (
        <FloatPanel title="GARDE-FOU" accent={accent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="font-mono" style={{ fontSize: 10, color: ink, lineHeight: 1.4 }}>
                    Action sensible — envoi externe détecté.
                </span>
                <div className="flex items-center" style={{ gap: 7 }}>
                    <PulseDot color={gold} size={8} />
                    <span className="font-mono" style={{ fontSize: 10, color: mutedText }}>En attente d'approbation</span>
                </div>
                <div className="flex items-center" style={{ gap: 7, marginTop: 1, paddingTop: 8, borderTop: `1px solid ${border}` }}>
                    {pill('Approuver', forest, `${forest}55`)}
                    {pill('Refuser', mutedText, border)}
                </div>
            </div>
        </FloatPanel>
    );
}

export function IlluHarness({ accent }: { accent: string }) {
    return (
        <div className="relative w-full" style={{ maxWidth: 460, margin: '0 auto' }} aria-hidden="true">
            <WindowCard
                title="ORCHESTRATION"
                right={<CountCluster accent={accent} />}
                footer={<DelegationFooter accent={accent} />}
                maxWidth={460}
            >
                <RadialGraph accent={accent} />
            </WindowCard>
            <div className="absolute" style={{ right: -6, bottom: 10, width: '52%', minWidth: 188, zIndex: 5 }}>
                <GuardrailOverlay accent={accent} />
            </div>
        </div>
    );
}
