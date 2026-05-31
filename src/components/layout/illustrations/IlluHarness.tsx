// 02 · HARNAIS AGENTIQUE — flagship orchestration graph + live delegation thread.
// BASE: WindowCard "ORCHESTRATEUR" wrapping an SVG node graph — a central
//   Orchestrateur node, the control loop (Route → Outils → Mémoire → Garde-fou)
//   as a dashed ring, and 3 parallel sub-agent node cards branching off w/ live state.
// OVERLAY: FloatPanel "DÉLÉGATION" — a cofounder-style delegation thread.
// accent = TOKENS.ink (#171717): high-contrast on light cards.
import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    LivePill,
    StatusPill,
    Spinner,
    IconTile,
} from './kit';

// ── Local helper: spinner rendered in SVG-space (kit.Spinner is a DOM atom, so
//    we embed it via <foreignObject> to keep the running sub-agents alive). ────
function SvgSpinner({ x, y, color }: { x: number; y: number; color: string }) {
    return (
        <foreignObject x={x - 7} y={y - 7} width={14} height={14}>
            <span style={{ display: 'inline-flex' }}>
                <Spinner color={color} size={12} />
            </span>
        </foreignObject>
    );
}

// ── Base: the orchestration graph (the wow factor) ───────────────────────────
function OrchestratorGraph({ accent }: { accent: string }) {
    const { mutedText, border, pale, white, gold, ink } = TOKENS;
    const W = 320;
    const H = 226;
    const cx = 160; // orchestrator centre
    const cy = 96;

    // Control-loop stages, placed as a clockwise ring around the orchestrator.
    const ring = [
        { x: 160, y: 26, label: 'Route' },
        { x: 270, y: 96, label: 'Outils' },
        { x: 160, y: 166, label: 'Mémoire' },
        { x: 50, y: 96, label: 'Garde-fou' },
    ];

    // Parallel sub-agents branching off the bottom of the orchestrator.
    const subs: { x: number; label: string; state: 'run' | 'queue' }[] = [
        { x: 52, label: 'Recherche', state: 'run' },
        { x: 160, label: 'Rédaction', state: 'run' },
        { x: 268, label: 'Vérification', state: 'queue' },
    ];
    const subY = 200;

    const fontMono = 'ui-monospace, SFMono-Regular, monospace';

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ display: 'block' }}
            aria-hidden="true"
        >
            {/* ── Control-loop ring (dashed) threading through the 4 stages ── */}
            <ellipse
                cx={cx}
                cy={cy}
                rx={104}
                ry={64}
                fill="none"
                stroke={border}
                strokeWidth="1.2"
                strokeDasharray="4 4"
            />
            {/* direction marker on the loop */}
            <circle cx={cx + 104} cy={cy} r={2.4} fill={accent} opacity="0.5" />

            {/* ── Spokes: orchestrator → each ring stage ── */}
            {ring.map((n) => (
                <line
                    key={`spoke-${n.label}`}
                    x1={cx}
                    y1={cy}
                    x2={n.x}
                    y2={n.y}
                    stroke={accent}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.28"
                />
            ))}

            {/* ── Branches: orchestrator → each parallel sub-agent ── */}
            {subs.map((s) => (
                <path
                    key={`branch-${s.label}`}
                    d={`M ${cx} ${cy + 16} C ${cx} ${cy + 56}, ${s.x} ${subY - 44}, ${s.x} ${subY - 14}`}
                    fill="none"
                    stroke={accent}
                    strokeWidth="1.1"
                    strokeDasharray="4 3"
                    opacity="0.4"
                />
            ))}

            {/* ── Ring stage cards ── */}
            {ring.map((n) => {
                const w = n.label.length > 6 ? 66 : 52;
                return (
                    <g key={`stage-${n.label}`}>
                        <rect
                            x={n.x - w / 2}
                            y={n.y - 11}
                            width={w}
                            height={22}
                            rx={7}
                            fill={white}
                            stroke={border}
                            strokeWidth="1"
                        />
                        <circle cx={n.x - w / 2 + 9} cy={n.y} r={2.2} fill={accent} opacity="0.55" />
                        <text
                            x={n.x + 5}
                            y={n.y + 3.4}
                            textAnchor="middle"
                            style={{ fontFamily: fontMono, fontSize: 8.5, fill: mutedText }}
                        >
                            {n.label}
                        </text>
                    </g>
                );
            })}

            {/* ── Central orchestrator node ── */}
            <circle cx={cx} cy={cy} r={26} fill={accent} opacity="0.08" />
            <rect x={cx - 38} y={cy - 16} width={76} height={32} rx={9} fill={accent} />
            <text
                x={cx}
                y={cy - 1}
                textAnchor="middle"
                style={{ fontFamily: fontMono, fontSize: 9, fontWeight: 600, fill: white }}
            >
                Orchestrateur
            </text>
            <text
                x={cx}
                y={cy + 9}
                textAnchor="middle"
                style={{ fontFamily: fontMono, fontSize: 6.5, fill: 'rgba(255,255,255,0.66)', letterSpacing: '0.08em' }}
            >
                BOUCLE · RUN
            </text>

            {/* ── Parallel sub-agent node cards ── */}
            {subs.map((s) => {
                const w = 88;
                const x = s.x - w / 2;
                const clampedX = Math.max(2, Math.min(x, W - w - 2));
                const running = s.state === 'run';
                return (
                    <g key={`sub-${s.label}`}>
                        <rect
                            x={clampedX}
                            y={subY - 14}
                            width={w}
                            height={28}
                            rx={8}
                            fill={running ? white : pale}
                            stroke={border}
                            strokeWidth="1"
                        />
                        {running ? (
                            <SvgSpinner x={clampedX + 13} y={subY} color={accent} />
                        ) : (
                            <circle cx={clampedX + 13} cy={subY} r={3.4} fill={gold} />
                        )}
                        <text
                            x={clampedX + 25}
                            y={subY - 1}
                            style={{ fontFamily: fontMono, fontSize: 8, fill: ink }}
                        >
                            {s.label}
                        </text>
                        <text
                            x={clampedX + 25}
                            y={subY + 8.5}
                            style={{ fontFamily: fontMono, fontSize: 6.5, fill: mutedText, letterSpacing: '0.06em' }}
                        >
                            {running ? 'EN COURS' : 'EN FILE'}
                        </text>
                    </g>
                );
            })}

            {/* eyebrow above the sub-agent row */}
            <text
                x={6}
                y={subY - 24}
                style={{ fontFamily: fontMono, fontSize: 7, fill: mutedText, letterSpacing: '0.14em' }}
            >
                SOUS-AGENTS · PARALLÈLE
            </text>
        </svg>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function IlluHarness({ accent }: { accent: string }) {
    const { mutedText, border, gold } = TOKENS;

    const base = (
        <WindowCard
            title="ORCHESTRATEUR"
            right={<LivePill color={accent} label="Boucle active" />}
            maxWidth={360}
            footer={
                <div
                    className="flex items-center"
                    style={{ gap: 10, padding: '9px 14px' }}
                >
                    <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: mutedText }}>
                        ROUTAGE
                    </span>
                    <span className="font-mono" style={{ fontSize: 10, color: TOKENS.ink, flex: '1 1 auto' }}>
                        Claude Opus → sous-agents
                    </span>
                    <span className="font-mono" style={{ fontSize: 9.5, color: mutedText }}>
                        3 actifs
                    </span>
                </div>
            }
        >
            <OrchestratorGraph accent={accent} />
        </WindowCard>
    );

    const overlay = (
        <FloatPanel title="DÉLÉGATION" accent={accent}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {/* Agent message row */}
                <div className="flex items-start" style={{ gap: 8 }}>
                    <IconTile size={24}>:·.</IconTile>
                    <span
                        className="font-mono"
                        style={{ fontSize: 10, color: TOKENS.ink, lineHeight: 1.4, flex: '1 1 auto' }}
                    >
                        Délégation à un sous-agent…
                    </span>
                </div>

                {/* Nested thread — left rail */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        paddingLeft: 11,
                        borderLeft: `2px solid ${border}`,
                    }}
                >
                    {/* Planification — running */}
                    <div className="flex items-center" style={{ gap: 8 }}>
                        <Spinner color={accent} size={11} />
                        <span
                            className="font-mono"
                            style={{ fontSize: 10, color: TOKENS.ink, flex: '1 1 auto' }}
                        >
                            Sous-agent · Planification
                        </span>
                        <span
                            className="font-mono"
                            style={{ fontSize: 9.5, color: mutedText, flex: '0 0 auto' }}
                        >
                            2m 40s
                        </span>
                    </div>

                    {/* Exécution — running */}
                    <div className="flex items-center" style={{ gap: 8 }}>
                        <Spinner color={accent} size={11} />
                        <span
                            className="font-mono"
                            style={{ fontSize: 10, color: TOKENS.ink, flex: '1 1 auto' }}
                        >
                            Sous-agent · Exécution
                        </span>
                        <span
                            className="font-mono"
                            style={{ fontSize: 9.5, color: mutedText, flex: '0 0 auto' }}
                        >
                            0m 54s
                        </span>
                    </div>

                    {/* Synthèse — queued */}
                    <div className="flex items-center" style={{ gap: 8 }}>
                        <StatusPill color={gold} label="En file" muted />
                        <span
                            className="font-mono"
                            style={{ fontSize: 10, color: mutedText, flex: '1 1 auto' }}
                        >
                            Sous-agent · Synthèse
                        </span>
                    </div>
                </div>
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} baseWidth="82%" overlayWidth="58%" />;
}
