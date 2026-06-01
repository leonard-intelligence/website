// 01 · MODÈLES — routage par tâche (section illustration, decorative).
// Composition: WindowCard (model router console) + FloatPanel (verdict DÉCISION).
import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    StatusPill,
    LivePill,
    Check,
    ProgressBar,
    Squares,
    Sparkbars,
    EMBOSS,
    EMBOSS_SOFT,
    DIVIDER,
} from './kit';

// ── Local helper: section divider with mono label ────────────────────────────
function SectionLabel({ label }: { label: string }) {
    return (
        <div
            className="flex items-center font-mono"
            style={{ gap: 8, marginBottom: 7 }}
        >
            <span style={{ fontSize: 9, letterSpacing: '0.18em', color: TOKENS.mutedText, textTransform: 'uppercase' as const }}>
                {label}
            </span>
            <span style={{ flex: 1, height: 1, background: DIVIDER }} />
        </div>
    );
}

// ── Local helper: mono key → value one-liner ─────────────────────────────────
function KV({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
    return (
        <div className="flex items-center font-mono" style={{ gap: 6 }}>
            <span style={{ fontSize: 9, color: TOKENS.mutedText, flex: '0 0 auto' }}>{k}</span>
            <span
                style={{
                    flex: 1,
                    height: 1,
                    borderBottom: `1px dashed ${DIVIDER}`,
                }}
            />
            <span
                style={{
                    fontSize: 9,
                    color: accent ? TOKENS.ink : TOKENS.mutedText,
                    fontWeight: accent ? 600 : 400,
                    flex: '0 0 auto',
                }}
            >
                {v}
            </span>
        </div>
    );
}

// ── Local helper: task tag chip ──────────────────────────────────────────────
function TaskChip({ label }: { label: string }) {
    return (
        <span
            className="font-mono"
            style={{
                fontSize: 8.5,
                color: TOKENS.mutedText,
                padding: '2px 7px',
                borderRadius: 5,
                boxShadow: EMBOSS_SOFT,
                background: TOKENS.pale,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap' as const,
            }}
        >
            {label}
        </span>
    );
}

// ── Main illustration ────────────────────────────────────────────────────────
export function IlluModels({ accent }: { accent: string }) {
    const { ink, mutedText, white, pale, surface } = TOKENS;

    // Current task being routed
    const task = {
        id: 'TSK-0041',
        label: 'Analyse contrat NDA',
        type: 'juridique',
    };

    // 4 constraint criteria with intensity (1–5)
    const criteria: { l: string; n: number; hint: string }[] = [
        { l: 'Précision',       n: 5, hint: 'critique' },
        { l: 'Coût / token',    n: 2, hint: 'faible' },
        { l: 'Latence',         n: 3, hint: 'modérée' },
        { l: 'Confidentialité', n: 5, hint: 'élevée' },
    ];

    // Candidate models with fit scores
    const models: { name: string; sub: string; fit: number; sel: boolean; spark: number[] }[] = [
        { name: 'Claude 3.7',      sub: 'Anthropic',   fit: 88, sel: false, spark: [52,61,70,75,82,88] },
        { name: 'GPT-4o',          sub: 'OpenAI',      fit: 71, sel: false, spark: [60,65,68,70,71,71] },
        { name: 'Mistral Large',   sub: 'Mistral AI',  fit: 64, sel: false, spark: [40,48,55,60,62,64] },
        { name: 'Llama 3.1 héb.', sub: 'Open-weight', fit: 94, sel: true,  spark: [68,75,80,87,91,94] },
    ];

    const base = (
        <WindowCard
            title="ROUTAGE · PAR TÂCHE"
            right={
                <LivePill color={accent} label="actif" />
            }
            maxWidth={400}
        >
            {/* ── Task header ── */}
            <div
                style={{
                    borderRadius: 10,
                    boxShadow: EMBOSS,
                    background: white,
                    padding: '9px 11px',
                    marginBottom: 9,
                }}
            >
                <div className="flex items-center" style={{ gap: 7, marginBottom: 8 }}>
                    <span
                        className="font-mono"
                        style={{
                            fontSize: 9,
                            color: mutedText,
                            background: pale,
                            boxShadow: EMBOSS_SOFT,
                            borderRadius: 5,
                            padding: '1px 6px',
                            letterSpacing: '0.1em',
                        }}
                    >
                        {task.id}
                    </span>
                    <span className="font-sans" style={{ fontSize: 11.5, fontWeight: 600, color: ink, flex: 1 }}>
                        {task.label}
                    </span>
                    <TaskChip label={task.type} />
                </div>

                {/* ── Constraint grid: 2 columns ── */}
                <SectionLabel label="Profil de contraintes" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 14px' }}>
                    {criteria.map((c) => (
                        <div key={c.l} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <div className="flex items-center" style={{ gap: 5, justifyContent: 'space-between' }}>
                                <span className="font-mono" style={{ fontSize: 9, color: mutedText }}>
                                    {c.l}
                                </span>
                                <span
                                    className="font-mono"
                                    style={{
                                        fontSize: 8,
                                        color: c.n >= 4 ? ink : mutedText,
                                        fontWeight: c.n >= 4 ? 600 : 400,
                                    }}
                                >
                                    {c.hint}
                                </span>
                            </div>
                            <Squares n={c.n} color={accent} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Model ranking ── */}
            <SectionLabel label="Candidats — score d'adéquation" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {models.map((m) => (
                    <div
                        key={m.name}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '130px 1fr 32px 22px 18px',
                            alignItems: 'center',
                            gap: 8,
                            padding: '7px 10px',
                            borderRadius: 9,
                            background: m.sel ? white : surface,
                            boxShadow: m.sel ? `0 0 0 1px ${accent}, ${EMBOSS}` : EMBOSS,
                        }}
                    >
                        {/* Name + sub */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 0 }}>
                            <span
                                className="font-mono"
                                style={{
                                    fontSize: 10.5,
                                    color: m.sel ? ink : mutedText,
                                    fontWeight: m.sel ? 600 : 400,
                                    whiteSpace: 'nowrap' as const,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {m.name}
                            </span>
                            <span className="font-mono" style={{ fontSize: 8, color: mutedText, opacity: 0.7 }}>
                                {m.sub}
                            </span>
                        </div>

                        {/* Progress bar */}
                        <ProgressBar pct={m.fit} color={m.sel ? accent : '#C8C8C0'} />

                        {/* Sparkbars */}
                        <Sparkbars
                            data={m.spark}
                            color={m.sel ? accent : '#C4C4BC'}
                            accentCount={m.sel ? 3 : 0}
                            height={18}
                        />

                        {/* Score */}
                        <span
                            className="font-mono"
                            style={{
                                fontSize: 10,
                                color: m.sel ? ink : mutedText,
                                textAlign: 'right' as const,
                                fontWeight: m.sel ? 700 : 400,
                            }}
                        >
                            {m.fit}
                        </span>

                        {/* Check or empty */}
                        {m.sel ? (
                            <Check color={accent} size={12} />
                        ) : (
                            <span style={{ width: 12 }} />
                        )}
                    </div>
                ))}
            </div>

            {/* ── Footer status bar ── */}
            <div
                className="flex items-center font-mono"
                style={{
                    marginTop: 10,
                    gap: 8,
                    padding: '6px 8px',
                    borderRadius: 8,
                    background: pale,
                    boxShadow: EMBOSS_SOFT,
                }}
            >
                <StatusPill color={accent} label="routé" muted />
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 8.5, color: mutedText }}>4 modèles évalués</span>
                <span style={{ width: 1, height: 10, background: DIVIDER, flex: '0 0 auto' }} />
                <span style={{ fontSize: 8.5, color: mutedText }}>∅ 12 ms</span>
            </div>
        </WindowCard>
    );

    const overlay = (
        <FloatPanel title="DÉCISION" accent={accent}>
            {/* Chosen model chip + score badge */}
            <div className="flex items-center" style={{ gap: 7, marginBottom: 9 }}>
                <span
                    className="font-sans"
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: ink,
                        padding: '4px 11px',
                        borderRadius: 8,
                        boxShadow: `0 0 0 1.5px ${accent}, ${EMBOSS}`,
                        background: white,
                        letterSpacing: '0.01em',
                        lineHeight: 1.2,
                    }}
                >
                    Llama 3.1 hébergé
                </span>
                <span
                    className="font-mono"
                    style={{
                        fontSize: 9,
                        color: white,
                        background: accent,
                        padding: '2px 6px',
                        borderRadius: 5,
                        fontWeight: 700,
                    }}
                >
                    94
                </span>
            </div>

            {/* Mono rationale */}
            <div
                className="font-mono"
                style={{
                    fontSize: 9,
                    color: ink,
                    padding: '6px 9px',
                    borderRadius: 7,
                    background: pale,
                    boxShadow: EMBOSS_SOFT,
                    marginBottom: 8,
                    letterSpacing: '0.01em',
                    lineHeight: 1.55,
                }}
            >
                Confidentialité max → open-weight hébergé chez vous. Précision 5/5 satisfaite.
            </div>

            {/* Par-tâche mapping list */}
            <SectionLabel label="Par tâche · routage" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <KV k="Rédaction"     v="Claude 3.7"      accent />
                <KV k="Extraction"    v="Mistral Large"   />
                <KV k="Analyse NDA"   v="Llama 3.1 héb."  accent />
                <KV k="Résumé court"  v="GPT-4o"          />
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} baseWidth="80%" overlayWidth="60%" />;
}
