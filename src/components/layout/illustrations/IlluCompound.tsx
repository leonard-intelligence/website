// IlluCompound — 04 · CONTEXTE & CONNAISSANCE
// "Un contexte qui prend de la valeur."
// Composition: WindowCard "MÉMOIRE" with a hero LineChart (knowledge-capitalisation
// abstract curve) + source-chip row + turn-stat mini-table, overlaid by a dense
// FloatPanel "RAPPEL DE CONTEXTE" showing a context-restore log.
// Purely decorative — aria-hidden set by Layered.
import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    Check,
    LineChart,
    StatusPill,
    LivePill,
    EMBOSS,
    EMBOSS_SOFT,
    PILL_EMBOSS,
    DIVIDER,
    ROW_BG,
    ROW_SHADOW,
} from './kit';

// ── Local helpers ────────────────────────────────────────────────────────────

/** Thin horizontal divider */
function Divider() {
    return (
        <div
            style={{
                height: 1,
                background: DIVIDER,
                margin: '8px 0',
            }}
        />
    );
}

/** Inline mono eyebrow label */
function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span
            className="font-mono"
            style={{ fontSize: 8.5, letterSpacing: '0.13em', color: TOKENS.mutedText, textTransform: 'uppercase' as React.CSSProperties['textTransform'] }}
        >
            {children}
        </span>
    );
}

/** A single row in the context-restore log */
function LogRow({ label, sub, accent }: { label: string; sub?: string; accent: string }) {
    return (
        <div
            className="flex items-start"
            style={{
                gap: 7,
                padding: '5px 8px',
                borderRadius: 6,
                background: ROW_BG,
                boxShadow: ROW_SHADOW,
                marginBottom: 4,
            }}
        >
            <Check color={accent} size={11} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span className="font-sans" style={{ fontSize: 10.5, color: TOKENS.ink, lineHeight: 1.3 }}>
                    {label}
                </span>
                {sub && (
                    <span className="font-mono" style={{ fontSize: 8.5, color: TOKENS.mutedText }}>
                        {sub}
                    </span>
                )}
            </div>
        </div>
    );
}

/** A mini stat tile (used for the "turns table" under the chart) */
function StatTile({ value, label }: { value: string; label: string }) {
    return (
        <div
            style={{
                flex: '1 1 0',
                padding: '7px 8px',
                borderRadius: 8,
                background: TOKENS.pale,
                boxShadow: EMBOSS_SOFT,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <span className="font-sans" style={{ fontSize: 14, fontWeight: 600, color: TOKENS.ink, lineHeight: 1 }}>
                {value}
            </span>
            <span className="font-mono" style={{ fontSize: 8, color: TOKENS.mutedText, lineHeight: 1.3 }}>
                {label}
            </span>
        </div>
    );
}

// ── Main component ───────────────────────────────────────────────────────────

export function IlluCompound({ accent }: { accent: string }) {
    // Monotonically-rising series for "cumulative knowledge" (abstract, illustrative)
    const knowledgePts = [2, 4, 5, 8, 11, 15, 20, 27, 34];
    // Slowly-rising secondary series (no-memory baseline for contrast)
    const baselinePts  = [2, 2, 3, 3, 4,  4,  5,  5,  6 ];
    const xLabels      = ['T0', '', '', '', '', '', '', '', 'T+n'];

    const sources = [
        { label: 'Playbooks', key: 'pb' },
        { label: 'Dossiers',  key: 'do' },
        { label: 'Règles',    key: 'rg' },
    ];

    const base = (
        <WindowCard
            title="MÉMOIRE"
            right={
                <span
                    className="font-mono"
                    style={{
                        fontSize: 9.5,
                        color: TOKENS.mutedText,
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: TOKENS.pale,
                        boxShadow: PILL_EMBOSS,
                    }}
                >
                    T0 → T+n
                </span>
            }
        >
            {/* ── Hero chart ────────────────────────────── */}
            <div
                style={{
                    borderRadius: 10,
                    background: TOKENS.white,
                    boxShadow: EMBOSS,
                    padding: '10px 10px 4px',
                    marginBottom: 8,
                }}
            >
                {/* Chart eyebrow */}
                <div className="flex items-center" style={{ marginBottom: 6, gap: 8 }}>
                    <Eyebrow>Connaissance accumulée (illustration)</Eyebrow>
                    <span className="ml-auto">
                        <LivePill color={accent} label="actif" />
                    </span>
                </div>

                {/* Dual-series line chart */}
                <LineChart
                    series={[
                        { color: accent,   pts: knowledgePts },
                        { color: '#C9C9C2', pts: baselinePts  },
                    ]}
                    height={110}
                    yMax={36}
                    xLabels={xLabels}
                />

                {/* Legend */}
                <div className="flex items-center" style={{ gap: 12, padding: '6px 2px 2px' }}>
                    <span className="inline-flex items-center font-mono" style={{ gap: 5, fontSize: 9, color: TOKENS.ink }}>
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: accent,    display: 'inline-block', flex: '0 0 auto' }} />
                        Avec mémoire
                    </span>
                    <span className="inline-flex items-center font-mono" style={{ gap: 5, fontSize: 9, color: TOKENS.mutedText }}>
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: '#C9C9C2', display: 'inline-block', flex: '0 0 auto' }} />
                        Sans mémoire
                    </span>
                    <span className="ml-auto font-mono" style={{ fontSize: 8.5, color: TOKENS.mutedText, fontStyle: 'italic' }}>
                        illustratif
                    </span>
                </div>
            </div>

            {/* ── Caption ───────────────────────────────── */}
            <div style={{ paddingLeft: 2, marginBottom: 8 }}>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: TOKENS.mutedText }}>
                    La connaissance se capitalise — chaque tour enrichit le suivant
                </span>
            </div>

            {/* ── Stats row ─────────────────────────────── */}
            <div className="flex" style={{ gap: 6, marginBottom: 10 }}>
                <StatTile value="4 218" label="Dossier actif" />
                <StatTile value="×11"   label="Tours accumulés" />
                <StatTile value="3"     label="Règles actives" />
            </div>

            <Divider />

            {/* ── Source chips ──────────────────────────── */}
            <div className="flex items-center" style={{ gap: 6, paddingTop: 2 }}>
                <Eyebrow>Sources&nbsp;</Eyebrow>
                <div className="flex" style={{ gap: 6 }}>
                    {sources.map((s) => (
                        <span
                            key={s.key}
                            className="font-mono inline-flex items-center"
                            style={{
                                gap: 5,
                                fontSize: 9.5,
                                color: TOKENS.ink,
                                padding: '4px 9px',
                                borderRadius: 999,
                                background: TOKENS.white,
                                boxShadow: PILL_EMBOSS,
                            }}
                        >
                            <span
                                style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: 999,
                                    background: accent,
                                    flex: '0 0 auto',
                                    display: 'inline-block',
                                }}
                            />
                            {s.label}
                        </span>
                    ))}
                </div>
                <span className="ml-auto">
                    <StatusPill color={accent} label="chargé" />
                </span>
            </div>
        </WindowCard>
    );

    const overlay = (
        <FloatPanel title="RAPPEL DE CONTEXTE" accent={accent}>
            {/* Sub-header */}
            <div style={{ marginBottom: 7 }}>
                <Eyebrow>Tour précédent → Tour actuel</Eyebrow>
            </div>

            {/* Context-restore log rows */}
            <LogRow
                label="Reprend au dossier #4218"
                sub="dernier état · il y a 2 min"
                accent={accent}
            />
            <LogRow
                label="Règle métier appliquée"
                sub="RGL-07 · prix plancher confirmé"
                accent={accent}
            />
            <LogRow
                label="Position connue · validée"
                sub="Fournisseur B · préférence retenue"
                accent={accent}
            />
            <div
                className="flex items-start"
                style={{
                    gap: 7,
                    padding: '5px 8px',
                    borderRadius: 6,
                    background: ROW_BG,
                    boxShadow: ROW_SHADOW,
                }}
            >
                <Check color={accent} size={11} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span className="font-sans" style={{ fontSize: 10.5, color: TOKENS.ink, lineHeight: 1.3 }}>
                        Historique chargé
                    </span>
                    <span className="font-mono" style={{ fontSize: 8.5, color: TOKENS.mutedText }}>
                        11 tours · 3 playbooks actifs
                    </span>
                </div>
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} overlayWidth="56%" />;
}
