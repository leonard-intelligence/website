// 01 · MODÈLES — routage par tâche (section illustration, decorative).
// Composition: WindowCard (model router) + FloatPanel (décision CLAUDE).
import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    StatusPill,
    Check,
    ProgressBar,
    Squares,
    PixelBar,
} from './kit';

export function IlluModels({ accent }: { accent: string }) {
    const { ink, mutedText, border, white, pale } = TOKENS;

    const criteria: { l: string; n: number }[] = [
        { l: 'Précision', n: 4 },
        { l: 'Coût', n: 2 },
        { l: 'Latence', n: 3 },
        { l: 'Confidentiel', n: 4 },
    ];

    const models: { name: string; fit: number; sel: boolean }[] = [
        { name: 'Claude', fit: 92, sel: true },
        { name: 'GPT', fit: 74, sel: false },
        { name: 'Mistral', fit: 61, sel: false },
        { name: 'Open-weight', fit: 50, sel: false },
    ];

    const base = (
        <WindowCard
            title="ROUTAGE · PAR TÂCHE"
            right={
                <span
                    className="font-mono"
                    style={{
                        fontSize: 9.5,
                        color: mutedText,
                        padding: '3px 8px',
                        borderRadius: 999,
                        border: `1px solid ${border}`,
                        background: white,
                    }}
                >
                    4 critères
                </span>
            }
        >
            {/* Tâche sub-card */}
            <div
                style={{
                    borderRadius: 11,
                    border: `1px solid ${border}`,
                    background: white,
                    padding: 11,
                    marginBottom: 10,
                }}
            >
                <div className="flex items-center" style={{ gap: 6, marginBottom: 9 }}>
                    <span className="font-mono" style={{ fontSize: 10.5, color: ink, fontWeight: 500 }}>
                        Tâche
                    </span>
                    <StatusPill color={accent} label="4 critères" muted />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 10px' }}>
                    {criteria.map((c) => (
                        <div key={c.l} className="flex items-center" style={{ gap: 6 }}>
                            <span
                                className="font-mono"
                                style={{ fontSize: 9, color: mutedText, width: 66, flex: '0 0 auto' }}
                            >
                                {c.l}
                            </span>
                            <Squares n={c.n} color={accent} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Model rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {models.map((m) => (
                    <div
                        key={m.name}
                        className="flex items-center"
                        style={{
                            gap: 9,
                            padding: '7px 10px',
                            borderRadius: 10,
                            border: `1px solid ${m.sel ? accent : border}`,
                            background: m.sel ? white : pale,
                            boxShadow: m.sel ? `0 0 0 1px ${accent}` : undefined,
                        }}
                    >
                        <span
                            className="font-mono"
                            style={{
                                fontSize: 11,
                                color: m.sel ? ink : mutedText,
                                width: 88,
                                flex: '0 0 auto',
                            }}
                        >
                            {m.name}
                        </span>
                        <ProgressBar pct={m.fit} color={m.sel ? accent : '#C9C9C2'} width={60} />
                        <span
                            className="font-mono"
                            style={{
                                fontSize: 10,
                                color: m.sel ? ink : mutedText,
                                width: 20,
                                textAlign: 'right',
                                flex: '0 0 auto',
                            }}
                        >
                            {m.fit}
                        </span>
                        {m.sel ? (
                            <Check color={accent} size={12} />
                        ) : (
                            <span style={{ width: 12, flex: '0 0 auto' }} />
                        )}
                    </div>
                ))}
            </div>
        </WindowCard>
    );

    const overlay = (
        <FloatPanel title="DÉCISION" accent={accent}>
            {/* Selected model chip */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    marginBottom: 8,
                }}
            >
                <span
                    className="font-mono"
                    style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: ink,
                        padding: '3px 10px',
                        borderRadius: 7,
                        border: `1.5px solid ${accent}`,
                        background: white,
                        letterSpacing: '0.04em',
                    }}
                >
                    Claude
                </span>
                <span
                    className="font-mono"
                    style={{
                        fontSize: 9,
                        color: mutedText,
                    }}
                >
                    score 92
                </span>
            </div>

            {/* Mono rationale */}
            <div
                className="font-mono"
                style={{
                    fontSize: 9.5,
                    color: ink,
                    padding: '5px 8px',
                    borderRadius: 7,
                    background: pale,
                    border: `1px solid ${border}`,
                    marginBottom: 7,
                    letterSpacing: '0.01em',
                }}
            >
                précision ↑ · confidentiel ✓
            </div>

            {/* Hosting tag */}
            <div
                className="font-mono"
                style={{
                    fontSize: 8.5,
                    color: mutedText,
                    padding: '3px 7px',
                    borderRadius: 6,
                    border: `1px solid ${border}`,
                    background: white,
                    display: 'inline-block',
                    marginBottom: 9,
                    letterSpacing: '0.04em',
                }}
            >
                hébergé · périmètre client
            </div>

            {/* Confidence pixel strip */}
            <div>
                <PixelBar total={20} filled={17} color={accent} height={9} />
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} baseWidth="80%" overlayWidth="56%" />;
}
