// IlluCompound — 04 · CONTEXTE & CONNAISSANCE
// Composition: WindowCard "MÉMOIRE" with a compounding dual-series LineChart +
// source chips, overlaid by a FloatPanel "REPRISE DE CONTEXTE" memory thread.
// Purely decorative; no state, no handlers.
import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    Check,
    LineChart,
} from './kit';

const GREY_FLAT = '#C9C9C2';

export function IlluCompound({ accent }: { accent: string }) {
    const sources = ['Playbooks', 'Dossiers', 'Règles'];

    const memoryEntries: { label: string }[] = [
        { label: 'Décision validée' },
        { label: 'Préférence retenue' },
        { label: 'Règle appliquée' },
    ];

    const base = (
        <WindowCard
            title="MÉMOIRE"
            right={
                <span
                    className="font-mono"
                    style={{ fontSize: 10, color: TOKENS.mutedText }}
                >
                    T0 → T+n
                </span>
            }
        >
            {/* Dual-series line chart: compounding vs. flat */}
            <div
                style={{
                    borderRadius: 10,
                    border: `1px solid ${TOKENS.border}`,
                    background: TOKENS.white,
                    padding: '10px 10px 6px',
                    marginBottom: 10,
                }}
            >
                <LineChart
                    series={[
                        { color: accent, pts: [3, 4, 5, 7, 9, 12, 15, 19] },
                        { color: GREY_FLAT, pts: [3, 3, 4, 4, 5, 5, 6, 6] },
                    ]}
                    height={96}
                    yMax={20}
                    xLabels={['T0', '', '', '', '', '', '', 'T+n']}
                />
            </div>

            {/* Legend row */}
            <div
                className="flex items-center"
                style={{ gap: 14, marginBottom: 9, paddingLeft: 2 }}
            >
                <span
                    className="inline-flex items-center font-mono"
                    style={{ gap: 5, fontSize: 9.5, color: TOKENS.ink }}
                >
                    <span
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: accent,
                            display: 'inline-block',
                            flex: '0 0 auto',
                        }}
                    />
                    Avec mémoire
                </span>
                <span
                    className="inline-flex items-center font-mono"
                    style={{ gap: 5, fontSize: 9.5, color: TOKENS.mutedText }}
                >
                    <span
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: GREY_FLAT,
                            display: 'inline-block',
                            flex: '0 0 auto',
                        }}
                    />
                    Sans mémoire
                </span>
            </div>

            {/* Caption */}
            <div style={{ marginBottom: 11, paddingLeft: 2 }}>
                <span
                    className="font-mono"
                    style={{ fontSize: 9, letterSpacing: '0.13em', color: TOKENS.mutedText }}
                >
                    La connaissance se capitalise
                </span>
            </div>

            {/* Source chips */}
            <div className="flex" style={{ gap: 6 }}>
                {sources.map((s) => (
                    <span
                        key={s}
                        className="font-mono inline-flex items-center justify-center"
                        style={{
                            gap: 5,
                            flex: '1 1 0',
                            fontSize: 9.5,
                            color: TOKENS.ink,
                            padding: '7px 6px',
                            borderRadius: 8,
                            border: `1px solid ${TOKENS.border}`,
                            background: TOKENS.pale,
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
                        {s}
                    </span>
                ))}
            </div>
        </WindowCard>
    );

    const overlay = (
        <FloatPanel title="REPRISE DE CONTEXTE" accent={accent}>
            {/* Sub-header */}
            <div style={{ marginBottom: 9 }}>
                <span
                    className="font-mono"
                    style={{ fontSize: 9, letterSpacing: '0.1em', color: TOKENS.mutedText }}
                >
                    Tour précédent → Tour actuel
                </span>
            </div>

            {/* Memory thread with vertical connector */}
            <div className="flex" style={{ gap: 8 }}>
                {/* Vertical thread line — dots + connectors interleaved */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: 2,
                        flex: '0 0 auto',
                    }}
                >
                    {memoryEntries.flatMap((_, i) => {
                        const dot = (
                            <span
                                key={`dot-${i}`}
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 999,
                                    background: accent,
                                    flex: '0 0 auto',
                                    display: 'block',
                                    opacity: 1 - i * 0.2,
                                }}
                            />
                        );
                        if (i < memoryEntries.length - 1) {
                            const line = (
                                <span
                                    key={`line-${i}`}
                                    style={{
                                        width: 1,
                                        height: 14,
                                        background: `${accent}44`,
                                        display: 'block',
                                    }}
                                />
                            );
                            return [dot, line];
                        }
                        return [dot];
                    })}
                </div>

                {/* Memory entry labels */}
                <div className="flex" style={{ flexDirection: 'column', gap: 8 }}>
                    {memoryEntries.map((entry, i) => (
                        <div
                            key={i}
                            className="inline-flex items-center"
                            style={{ gap: 6 }}
                        >
                            <Check color={accent} size={10} />
                            <span
                                className="font-mono"
                                style={{
                                    fontSize: 9.5,
                                    color: TOKENS.ink,
                                    opacity: 1 - i * 0.15,
                                }}
                            >
                                {entry.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} overlayWidth="54%" />;
}
