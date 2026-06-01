// 03 · DONNÉES & INTÉGRATIONS — dense layered illustration (cofounder idiom).
// BASE: WindowCard with 6 connector rows + dashed SVG convergence lines → "Contexte unifié" node.
// OVERLAY: FloatPanel with live ingestion log + status.
import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    IconTile,
    StatusPill,
    PulseDot,
    Check,
    EMBOSS,
    EMBOSS_SOFT,
    ROW_BG,
    ROW_SHADOW,
} from './kit';

// ── Local helper: tiny mono eyebrow tag ─────────────────────────────────────
function Tag({ label }: { label: string }) {
    return (
        <span
            className="font-mono"
            style={{
                fontSize: 8.5,
                letterSpacing: '0.08em',
                color: TOKENS.mutedText,
                background: TOKENS.pale,
                boxShadow: EMBOSS_SOFT,
                borderRadius: 4,
                padding: '1px 5px',
            }}
        >
            {label}
        </span>
    );
}

// ── Local helper: dashed SVG convergence lines ───────────────────────────────
// Draws lines from each connector row midpoint toward a central "Contexte unifié" node.
// rowCount = number of rows; containerWidth rendered width reference.
function ConvergenceLines({
    rowCount,
    rowHeight,
    rowGap,
    accent,
}: {
    rowCount: number;
    rowHeight: number;
    rowGap: number;
    accent: string;
}) {
    const W = 52; // narrow strip on right side
    const totalH = rowCount * rowHeight + (rowCount - 1) * rowGap;
    // Target node center (right edge center)
    const tx = W - 6;
    const ty = totalH / 2;

    return (
        <svg
            viewBox={`0 0 ${W} ${totalH}`}
            width={W}
            height={totalH}
            aria-hidden="true"
            style={{ display: 'block', flexShrink: 0 }}
        >
            {Array.from({ length: rowCount }).map((_, i) => {
                const y = i * (rowHeight + rowGap) + rowHeight / 2;
                return (
                    <line
                        key={i}
                        x1={0}
                        y1={y}
                        x2={tx}
                        y2={ty}
                        stroke={accent}
                        strokeWidth="1.1"
                        strokeDasharray="3 2.5"
                        opacity={0.38 + i * 0.04}
                    />
                );
            })}
            {/* Convergence node */}
            <circle cx={tx} cy={ty} r={6} fill={accent} opacity="0.18" />
            <circle cx={tx} cy={ty} r={3.5} fill={accent} opacity="0.9" />
        </svg>
    );
}

// ── Connector row definition ─────────────────────────────────────────────────
interface Connector {
    code: string;
    name: string;
    sub: string;
    online: boolean;
}

// ── Main export ───────────────────────────────────────────────────────────────
export function IlluConnect({ accent }: { accent: string }) {
    const connectors: Connector[] = [
        { code: 'CRM', name: 'CRM',      sub: 'lecture · écriture', online: true  },
        { code: 'ERP', name: 'ERP',      sub: 'lecture seule',       online: true  },
        { code: 'DMS', name: 'DMS',      sub: 'documents · index',   online: true  },
        { code: 'MCP', name: 'MCP',      sub: 'outils · contexte',   online: true  },
        { code: 'API', name: 'API REST',  sub: 'webhooks sortants',   online: true  },
        { code: 'WH',  name: 'Webhooks', sub: 'événements entrants',  online: false },
    ];

    const onCount = connectors.filter((c) => c.online).length;
    const total   = connectors.length;

    // Row geometry (must match ConvergenceLines props)
    const ROW_H  = 42;
    const ROW_GAP = 5;

    const base = (
        <WindowCard
            title="INTÉGRATIONS"
            maxWidth={380}
            right={
                <StatusPill
                    color={TOKENS.forest}
                    label={`${onCount} / ${total} connectés`}
                />
            }
        >
            {/* Section eyebrow */}
            <div
                className="font-mono"
                style={{ fontSize: 9, letterSpacing: '0.14em', color: TOKENS.mutedText, marginBottom: 8, paddingLeft: 2 }}
            >
                SOURCES · CONNECTEURS
            </div>

            {/* Connector rows + convergence lines side-by-side */}
            <div className="flex" style={{ gap: 0, alignItems: 'flex-start' }}>
                {/* Left: connector rows */}
                <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: ROW_GAP }}>
                    {connectors.map((c) => (
                        <div
                            key={c.code}
                            className="flex items-center"
                            style={{
                                height: ROW_H,
                                gap: 9,
                                padding: '0 10px',
                                borderRadius: 10,
                                background: c.online ? ROW_BG : TOKENS.pale,
                                boxShadow: c.online ? ROW_SHADOW : EMBOSS_SOFT,
                                opacity: c.online ? 1 : 0.62,
                                boxSizing: 'border-box',
                            }}
                        >
                            <IconTile size={26}>{c.code}</IconTile>
                            <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <span
                                    className="font-sans"
                                    style={{ fontSize: 11.5, fontWeight: 600, color: TOKENS.ink, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                >
                                    {c.name}
                                </span>
                                <span
                                    className="font-mono"
                                    style={{ fontSize: 9, color: TOKENS.mutedText, lineHeight: 1 }}
                                >
                                    {c.sub}
                                </span>
                            </div>
                            {c.online ? (
                                <StatusPill color={TOKENS.forest} label="Connecté" />
                            ) : (
                                <StatusPill color="rgba(23,23,23,0.28)" label="Hors ligne" muted />
                            )}
                        </div>
                    ))}
                </div>

                {/* Right: dashed SVG convergence lines (visual connector) */}
                <div style={{ paddingTop: 0, alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                    <ConvergenceLines
                        rowCount={connectors.length}
                        rowHeight={ROW_H}
                        rowGap={ROW_GAP}
                        accent={accent}
                    />
                </div>
            </div>

            {/* Unified context bar at bottom */}
            <div
                className="flex items-center"
                style={{
                    gap: 10,
                    marginTop: 10,
                    padding: '10px 13px',
                    borderRadius: 11,
                    background: `linear-gradient(90deg, ${accent}12, ${TOKENS.white})`,
                    boxShadow: `0 0 0 1px ${accent}, ${EMBOSS}`,
                }}
            >
                <PulseDot color={accent} size={9} />
                <div style={{ flex: '1 1 auto' }}>
                    <span className="font-sans" style={{ fontSize: 12, fontWeight: 700, color: TOKENS.ink }}>
                        Contexte unifié
                    </span>
                    <span className="font-mono" style={{ fontSize: 9, color: TOKENS.mutedText, marginLeft: 8 }}>
                        1 agent · 0 silo · temps réel
                    </span>
                </div>
                <Tag label={`${onCount} actifs`} />
            </div>
        </WindowCard>
    );

    // ── Ingestion log entries ────────────────────────────────────────────────
    const logs: { msg: string; time: string; ok: boolean }[] = [
        { msg: 'Sync CRM terminée',    time: 'il y a 2s',  ok: true  },
        { msg: 'Document ingéré (DMS)', time: 'il y a 8s',  ok: true  },
        { msg: 'Webhook reçu · API',   time: 'il y a 14s', ok: true  },
        { msg: 'Index MCP mis à jour', time: 'il y a 31s', ok: true  },
    ];

    const overlay = (
        <FloatPanel title="CONTEXTE UNIFIÉ" accent={accent}>
            {/* Core status */}
            <div
                className="flex items-center"
                style={{
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 9,
                    background: TOKENS.pale,
                    boxShadow: EMBOSS_SOFT,
                    marginBottom: 9,
                }}
            >
                <PulseDot color={accent} size={8} />
                <div style={{ flex: '1 1 auto' }}>
                    <div className="font-sans" style={{ fontSize: 11, fontWeight: 700, color: TOKENS.ink, lineHeight: 1.2 }}>
                        1 agent · 0 silo
                    </div>
                    <div className="font-mono" style={{ fontSize: 8.5, color: TOKENS.mutedText, marginTop: 2 }}>
                        synchronisation active
                    </div>
                </div>
                <Tag label="LIVE" />
            </div>

            {/* Live ingestion log */}
            <div
                className="font-mono"
                style={{ fontSize: 8.5, letterSpacing: '0.08em', color: TOKENS.mutedText, marginBottom: 5 }}
            >
                JOURNAL D'INGESTION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {logs.map((l, i) => (
                    <div
                        key={i}
                        className="flex items-center"
                        style={{
                            gap: 7,
                            padding: '5px 8px',
                            borderRadius: 7,
                            background: i === 0 ? `${accent}10` : TOKENS.pale,
                            boxShadow: i === 0 ? `0 0 0 1px ${accent}55, ${EMBOSS}` : EMBOSS_SOFT,
                        }}
                    >
                        <Check color={TOKENS.forest} size={10} />
                        <span
                            className="font-mono"
                            style={{ fontSize: 9.5, color: TOKENS.ink, flex: '1 1 auto', lineHeight: 1.2 }}
                        >
                            {l.msg}
                        </span>
                        <span
                            className="font-mono"
                            style={{ fontSize: 8, color: TOKENS.mutedText, whiteSpace: 'nowrap' }}
                        >
                            {l.time}
                        </span>
                    </div>
                ))}
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} baseWidth="82%" overlayWidth="60%" />;
}
