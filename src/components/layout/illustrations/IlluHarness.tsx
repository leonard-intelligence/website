// 02 · Harnais agentique — orchestrator + parallel sub-agents (cofounder-idiom, rich layered).
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

export function IlluHarness({ accent }: { accent: string }) {
    const { mutedText, border, white, gold } = TOKENS;

    // Pipeline stages
    const stages = ['Route', 'Outils', 'Mémoire', 'Garde-fou'];

    // Sub-agent rows
    const subs: { label: string; state: 'run' | 'queue' }[] = [
        { label: 'Recherche', state: 'run' },
        { label: 'Rédaction', state: 'run' },
        { label: 'Vérification', state: 'queue' },
    ];

    const base = (
        <WindowCard
            title="ORCHESTRATEUR"
            right={<LivePill color={accent} label="Boucle active" />}
            maxWidth={360}
        >
            {/* Pipeline stage chips with arrow separators */}
            <div
                className="flex items-center"
                style={{ gap: 6, marginBottom: 14, flexWrap: 'wrap' }}
            >
                {stages.map((s, i) => (
                    <span key={s} className="inline-flex items-center" style={{ gap: 6 }}>
                        <span
                            className="font-mono"
                            style={{
                                fontSize: 10,
                                color: TOKENS.ink,
                                padding: '5px 9px',
                                borderRadius: 8,
                                border: `1px solid ${border}`,
                                background: white,
                                letterSpacing: '0.04em',
                            }}
                        >
                            {s}
                        </span>
                        {i < stages.length - 1 && (
                            <span style={{ color: mutedText, fontSize: 11 }}>→</span>
                        )}
                    </span>
                ))}
            </div>

            {/* Sub-agents section label */}
            <div
                className="font-mono"
                style={{
                    fontSize: 9.5,
                    letterSpacing: '0.14em',
                    color: mutedText,
                    marginBottom: 9,
                }}
            >
                SOUS-AGENTS · PARALLÈLE
            </div>

            {/* Sub-agent rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {subs.map((sub) => (
                    <div
                        key={sub.label}
                        className="flex items-center"
                        style={{
                            gap: 10,
                            padding: '8px 11px',
                            borderRadius: 10,
                            border: `1px solid ${border}`,
                            background: white,
                        }}
                    >
                        {/* accent square glyph */}
                        <span
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 2,
                                background: accent,
                                flex: '0 0 auto',
                            }}
                        />
                        <span
                            className="font-mono"
                            style={{ fontSize: 11, color: TOKENS.ink, flex: '1 1 auto' }}
                        >
                            {sub.label}
                        </span>
                        {sub.state === 'run' ? (
                            <span
                                className="inline-flex items-center font-mono"
                                style={{ gap: 6, fontSize: 10, color: TOKENS.ink }}
                            >
                                <Spinner color={accent} size={12} />
                                En cours
                            </span>
                        ) : (
                            <StatusPill color={gold} label="En file" muted />
                        )}
                    </div>
                ))}
            </div>
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

                {/* Nested run row — Planification */}
                <div
                    className="flex items-center"
                    style={{
                        gap: 8,
                        paddingLeft: 10,
                        borderLeft: `2px solid ${border}`,
                    }}
                >
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

                {/* Nested queue row — Synthèse */}
                <div
                    className="flex items-center"
                    style={{
                        gap: 8,
                        paddingLeft: 10,
                        borderLeft: `2px solid ${border}`,
                    }}
                >
                    <StatusPill color={gold} label="En file" muted />
                    <span
                        className="font-mono"
                        style={{ fontSize: 10, color: mutedText, flex: '1 1 auto' }}
                    >
                        Sous-agent · Synthèse
                    </span>
                </div>
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} baseWidth="80%" overlayWidth="58%" />;
}
