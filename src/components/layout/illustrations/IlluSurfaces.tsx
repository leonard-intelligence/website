// 06 · PRODUITS & INTERFACES — supervision dashboard (cofounder idiom, light palette).
// BASE: WindowCard "SUPERVISION" — fleet of 5 varied agent rows (spinner / progress /
//   queued / done states) + status-count summary strip header + "ACTIVITÉ · 24H" sparkbar footer.
// OVERLAY: FloatPanel "FLOTTE" — status-count chips + a decorative breakdown bar.
// All sample data is illustrative process/status chrome — never a business outcome.
import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    IconTile,
    LivePill,
    PulseDot,
    Check,
    Spinner,
    StatusPill,
    ProgressBar,
    Sparkbars,
} from './kit';

// ── Local helper: a compact status-count chip ("3 en cours", glyph + count + label) ──
function CountChip({
    glyph,
    count,
    label,
    tone,
}: {
    glyph: React.ReactNode;
    count: number;
    label: string;
    tone?: string;
}) {
    return (
        <span
            className="inline-flex items-center"
            style={{
                gap: 6,
                padding: '4px 9px',
                borderRadius: 999,
                border: `1px solid ${TOKENS.border}`,
                background: TOKENS.white,
                flex: '0 0 auto',
            }}
        >
            <span className="inline-flex items-center" style={{ width: 12, justifyContent: 'center' }}>
                {glyph}
            </span>
            <span className="font-sans" style={{ fontSize: 11, fontWeight: 600, color: tone ?? TOKENS.ink, lineHeight: 1 }}>
                {count}
            </span>
            <span className="font-mono" style={{ fontSize: 9, color: TOKENS.mutedText, lineHeight: 1 }}>
                {label}
            </span>
        </span>
    );
}

// ── Local helper: a stacked proportional breakdown bar (run / queue / done) ──
function BreakdownBar({ segments, height = 7 }: { segments: { value: number; color: string }[]; height?: number }) {
    const total = Math.max(1, segments.reduce((s, x) => s + x.value, 0));
    return (
        <span
            className="inline-flex"
            style={{ width: '100%', height, borderRadius: 999, overflow: 'hidden', background: '#ECECE6', gap: 1.5 }}
        >
            {segments.map((s, i) => (
                <span key={i} style={{ width: `${(s.value / total) * 100}%`, height: '100%', background: s.color, display: 'inline-block' }} />
            ))}
        </span>
    );
}

// ── Local helper: one agent row (icon id · name · task · live state) ──
function AgentRow({
    id,
    name,
    task,
    state,
}: {
    id: string;
    name: string;
    task: string;
    state: React.ReactNode;
}) {
    return (
        <div
            className="flex items-center"
            style={{
                gap: 10,
                padding: '8px 10px',
                borderRadius: 11,
                border: `1px solid ${TOKENS.border}`,
                background: TOKENS.white,
            }}
        >
            <IconTile size={28}>{id}</IconTile>
            <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <div className="font-sans truncate" style={{ fontSize: 11.5, fontWeight: 600, color: TOKENS.ink, lineHeight: '15px' }}>
                    {name}
                </div>
                <div className="font-mono truncate" style={{ fontSize: 10, color: TOKENS.mutedText, lineHeight: '14px' }}>
                    {task}
                </div>
            </div>
            <span style={{ flex: '0 0 auto' }}>{state}</span>
        </div>
    );
}

// ── Overlay: fleet status summary ──────────────────────────────────────────────
function FlotteOverlay({ accent }: { accent: string }) {
    return (
        <FloatPanel title="FLOTTE" accent={accent} right={<span className="font-mono" style={{ fontSize: 9, color: TOKENS.mutedText }}>12</span>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {/* Top line — total agents */}
                <div className="flex items-baseline" style={{ gap: 6 }}>
                    <span className="font-sans" style={{ fontSize: 22, fontWeight: 700, color: TOKENS.ink, lineHeight: 1 }}>
                        12
                    </span>
                    <span className="font-mono" style={{ fontSize: 9.5, color: TOKENS.mutedText }}>
                        agents · supervisés
                    </span>
                </div>

                {/* Status-count chips */}
                <div className="flex" style={{ gap: 6, flexWrap: 'wrap' }}>
                    <CountChip glyph={<Spinner color={accent} size={10} />} count={3} label="en cours" />
                    <CountChip glyph={<span style={{ width: 6, height: 6, borderRadius: 999, background: TOKENS.gold, display: 'inline-block' }} />} count={1} label="en file" tone={TOKENS.ink} />
                    <CountChip glyph={<Check color={TOKENS.forest} size={10} />} count={8} label="terminés" />
                </div>

                {/* Breakdown bar */}
                <BreakdownBar segments={[{ value: 3, color: accent }, { value: 1, color: TOKENS.gold }, { value: 8, color: TOKENS.forest }]} />

                {/* Legend */}
                <div className="flex items-center" style={{ gap: 12 }}>
                    {[
                        { c: accent, l: 'cours' },
                        { c: TOKENS.gold, l: 'file' },
                        { c: TOKENS.forest, l: 'fini' },
                    ].map((x) => (
                        <span key={x.l} className="inline-flex items-center font-mono" style={{ gap: 5, fontSize: 8.5, color: TOKENS.mutedText }}>
                            <span style={{ width: 6, height: 6, borderRadius: 2, background: x.c, display: 'inline-block' }} />
                            {x.l}
                        </span>
                    ))}
                </div>
            </div>
        </FloatPanel>
    );
}

// ── Reusable inline label for a row's text state ──
function StateLabel({ children, color }: { children: React.ReactNode; color?: string }) {
    return (
        <span className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 10, color: color ?? TOKENS.ink, flex: '0 0 auto' }}>
            {children}
        </span>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function IlluSurfaces({ accent }: { accent: string }) {
    const sparkData = [5, 8, 6, 11, 7, 13, 9, 15, 10, 14, 8, 16, 12, 18, 11, 9, 14, 10];

    const base = (
        <WindowCard
            title="SUPERVISION"
            maxWidth={372}
            right={<LivePill color={TOKENS.forest} label="En ligne" />}
            footer={
                <div className="flex items-center" style={{ gap: 10, padding: '10px 14px' }}>
                    <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: TOKENS.mutedText }}>
                        ACTIVITÉ · 24H
                    </span>
                    <span className="ml-auto flex items-center" style={{ gap: 8 }}>
                        <Sparkbars data={sparkData} color={accent} accentCount={5} height={24} />
                    </span>
                </div>
            }
        >
            {/* Summary strip — live status counts across the fleet */}
            <div
                className="flex items-center"
                style={{ gap: 7, padding: '4px 2px 10px', marginBottom: 2, borderBottom: `1px solid ${TOKENS.border}` }}
            >
                <span className="inline-flex items-center font-sans" style={{ gap: 5, fontSize: 11, fontWeight: 600, color: TOKENS.ink }}>
                    <Spinner color={accent} size={10} /> 3
                </span>
                <span className="inline-flex items-center font-sans" style={{ gap: 5, fontSize: 11, fontWeight: 600, color: TOKENS.ink }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: TOKENS.gold, display: 'inline-block' }} /> 1
                </span>
                <span className="inline-flex items-center font-sans" style={{ gap: 5, fontSize: 11, fontWeight: 600, color: TOKENS.ink }}>
                    <Check color={TOKENS.forest} size={10} /> 8
                </span>
                <span className="ml-auto inline-flex items-center font-mono" style={{ gap: 5, fontSize: 9, color: TOKENS.mutedText }}>
                    <PulseDot color={TOKENS.forest} size={6} /> temps réel
                </span>
            </div>

            {/* Fleet — 5 varied agent rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                <AgentRow
                    id="SUP"
                    name="Agent · Support"
                    task="Triage des tickets"
                    state={
                        <StateLabel>
                            <Spinner color={accent} size={12} /> En cours
                        </StateLabel>
                    }
                />
                <AgentRow
                    id="REL"
                    name="Agent · Relance"
                    task="Séquence email J+3"
                    state={
                        <StateLabel color={TOKENS.mutedText}>
                            <ProgressBar pct={64} color={accent} width={50} /> 64%
                        </StateLabel>
                    }
                />
                <AgentRow
                    id="VEI"
                    name="Agent · Veille"
                    task="Synthèse hebdomadaire"
                    state={<StatusPill color={TOKENS.gold} label="En file" muted />}
                />
                <AgentRow
                    id="CNF"
                    name="Agent · Conformité"
                    task="Contrôle des accès"
                    state={
                        <StateLabel color={TOKENS.forest}>
                            <Check color={TOKENS.forest} size={11} /> Terminé
                        </StateLabel>
                    }
                />
                <AgentRow
                    id="DON"
                    name="Agent · Données"
                    task="Enrichissement CRM"
                    state={
                        <StateLabel color={TOKENS.mutedText}>
                            <ProgressBar pct={38} color={accent} width={50} /> 38%
                        </StateLabel>
                    }
                />
            </div>
        </WindowCard>
    );

    return <Layered base={base} overlay={<FlotteOverlay accent={accent} />} baseWidth="84%" overlayWidth="54%" />;
}
