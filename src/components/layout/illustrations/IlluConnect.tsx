// 03 · DONNÉES & INTÉGRATIONS — dense layered illustration (cofounder idiom).
// BASE: WindowCard with 5 connector rows + unified-context bar.
// OVERLAY: FloatPanel with a hub-and-spoke convergence SVG + sync status.
import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    IconTile,
    StatusPill,
    PulseDot,
} from './kit';

// ── Overlay: hub-and-spoke convergence graph ─────────────────────────────────
function ConvergenceGraph({ accent }: { accent: string }) {
    // 120×120 viewBox, 4 source nodes at corners, 1 center "Agent" node.
    const cx = 60;
    const cy = 58;
    const nodes: { x: number; y: number; label: string }[] = [
        { x: 14, y: 18, label: 'CRM' },
        { x: 106, y: 18, label: 'ERP' },
        { x: 14, y: 98, label: 'DMS' },
        { x: 106, y: 98, label: 'MCP' },
    ];
    return (
        <svg
            viewBox="0 0 120 120"
            width="100%"
            style={{ display: 'block', height: 120 }}
            aria-hidden="true"
        >
            {/* Spoke lines from each source to center */}
            {nodes.map((n) => (
                <line
                    key={n.label}
                    x1={n.x}
                    y1={n.y}
                    x2={cx}
                    y2={cy}
                    stroke={accent}
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    opacity="0.55"
                />
            ))}
            {/* Center "Agent" node */}
            <circle cx={cx} cy={cy} r={14} fill={accent} opacity="0.15" />
            <circle cx={cx} cy={cy} r={9} fill={accent} />
            <text
                x={cx}
                y={cy + 3.5}
                textAnchor="middle"
                style={{ fontFamily: 'monospace', fontSize: 6.5, fill: TOKENS.ink, fontWeight: 600 }}
            >
                Agent
            </text>
            {/* Source nodes */}
            {nodes.map((n) => (
                <g key={n.label}>
                    <rect
                        x={n.x - 14}
                        y={n.y - 9}
                        width={28}
                        height={18}
                        rx={5}
                        fill={TOKENS.pale}
                        stroke={TOKENS.border}
                        strokeWidth="1"
                    />
                    <text
                        x={n.x}
                        y={n.y + 3.5}
                        textAnchor="middle"
                        style={{ fontFamily: 'monospace', fontSize: 7.5, fill: TOKENS.mutedText }}
                    >
                        {n.label}
                    </text>
                </g>
            ))}
        </svg>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function IlluConnect({ accent }: { accent: string }) {
    const connectors: { code: string; name: string; online: boolean }[] = [
        { code: 'CRM', name: 'Connecteur CRM', online: true },
        { code: 'ERP', name: 'Connecteur ERP', online: true },
        { code: 'DMS', name: 'Connecteur DMS', online: true },
        { code: 'MCP', name: 'Connecteur MCP', online: true },
        { code: 'API', name: 'API externe',     online: false },
    ];
    const onCount = connectors.filter((c) => c.online).length;
    const total   = connectors.length;

    const base = (
        <WindowCard
            title="INTÉGRATIONS"
            maxWidth={360}
            right={
                <span className="font-mono" style={{ fontSize: 10, color: TOKENS.mutedText }}>
                    {onCount}/{total}
                </span>
            }
        >
            {/* Connector rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
                {connectors.map((c) => (
                    <div
                        key={c.code}
                        className="flex items-center"
                        style={{
                            gap: 10,
                            padding: '7px 11px',
                            borderRadius: 10,
                            border: `1px solid ${TOKENS.border}`,
                            background: c.online ? TOKENS.white : TOKENS.pale,
                            opacity: c.online ? 1 : 0.68,
                        }}
                    >
                        <IconTile size={28}>{c.code}</IconTile>
                        <span
                            className="font-mono"
                            style={{ fontSize: 11, color: TOKENS.ink, flex: '1 1 auto' }}
                        >
                            {c.name}
                        </span>
                        {c.online ? (
                            <StatusPill color={TOKENS.forest} label="Connecté" />
                        ) : (
                            <StatusPill color={TOKENS.mutedText} label="Hors ligne" muted />
                        )}
                    </div>
                ))}
            </div>

            {/* Unified-context summary bar */}
            <div
                className="flex items-center"
                style={{
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 11,
                    border: `1px solid ${accent}`,
                    background: TOKENS.white,
                    boxShadow: `0 0 0 1px ${accent}`,
                }}
            >
                <PulseDot color={accent} size={9} />
                <span
                    className="font-mono"
                    style={{ fontSize: 11, color: TOKENS.ink, flex: '1 1 auto' }}
                >
                    Contexte unifié
                </span>
                <span className="font-mono" style={{ fontSize: 9.5, color: TOKENS.mutedText }}>
                    1 agent · 0 silo
                </span>
            </div>
        </WindowCard>
    );

    const overlay = (
        <FloatPanel title="CONTEXTE UNIFIÉ" accent={accent}>
            {/* Hub-and-spoke SVG */}
            <div style={{ marginBottom: 10 }}>
                <ConvergenceGraph accent={accent} />
            </div>

            {/* Sync status row */}
            <div
                className="flex items-center"
                style={{
                    gap: 7,
                    padding: '7px 10px',
                    borderRadius: 8,
                    background: TOKENS.pale,
                    border: `1px solid ${TOKENS.border}`,
                }}
            >
                <PulseDot color={accent} size={7} />
                <span className="font-mono" style={{ fontSize: 9.5, color: TOKENS.ink }}>
                    Synchronisé · temps réel
                </span>
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} baseWidth="80%" overlayWidth="56%" />;
}
