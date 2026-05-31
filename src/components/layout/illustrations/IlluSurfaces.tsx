// 06 · PRODUITS & INTERFACES — supervision dashboard (cofounder idiom).
// BASE: WindowCard "SUPERVISION" with 4 agent rows + sparkbar footer.
// OVERLAY: FloatPanel "JOURNAL EN DIRECT" — live timestamped agent event feed.
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

// ── Overlay: live event journal ───────────────────────────────────────────────
function JournalOverlay() {
    const events: { time: string; text: string; done: boolean }[] = [
        { time: '09:14', text: 'Support · ticket clos', done: true },
        { time: '09:12', text: 'Relance · email envoyé', done: true },
        { time: '09:09', text: 'Veille · source ajoutée', done: false },
    ];
    return (
        <FloatPanel title="JOURNAL EN DIRECT" accent={TOKENS.forest}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {events.map((e) => (
                    <div
                        key={e.time + e.text}
                        className="flex items-center"
                        style={{ gap: 8 }}
                    >
                        {e.done ? (
                            <Check color={TOKENS.forest} size={11} />
                        ) : (
                            <PulseDot color={TOKENS.forest} size={7} />
                        )}
                        <span
                            className="font-mono"
                            style={{ fontSize: 9.5, color: TOKENS.mutedText, flex: '0 0 auto' }}
                        >
                            {e.time}
                        </span>
                        <span
                            className="font-mono truncate"
                            style={{ fontSize: 9.5, color: TOKENS.ink, flex: '1 1 auto', minWidth: 0 }}
                        >
                            {e.text}
                        </span>
                    </div>
                ))}
            </div>
            {/* Decorative footer */}
            <div
                style={{
                    marginTop: 10,
                    paddingTop: 8,
                    borderTop: `1px solid ${TOKENS.border}`,
                }}
            >
                <span
                    className="font-mono"
                    style={{ fontSize: 8.5, color: TOKENS.mutedText, letterSpacing: '0.1em' }}
                >
                    flux · décoratif
                </span>
            </div>
        </FloatPanel>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function IlluSurfaces({ accent }: { accent: string }) {
    const sparkData = [5, 8, 6, 11, 7, 13, 9, 15, 10, 14, 8, 16, 12, 18, 11, 9];

    const base = (
        <WindowCard
            title="SUPERVISION"
            maxWidth={360}
            right={<LivePill color={TOKENS.forest} label="En ligne" />}
            footer={
                <div
                    className="flex items-center"
                    style={{ gap: 10, padding: '10px 14px' }}
                >
                    <span
                        className="font-mono"
                        style={{ fontSize: 9, letterSpacing: '0.14em', color: TOKENS.mutedText }}
                    >
                        ACTIVITÉ
                    </span>
                    <span className="ml-auto">
                        <Sparkbars data={sparkData} color={accent} accentCount={4} height={22} />
                    </span>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {/* Row 1 — Agent · Support / En cours */}
                <div
                    className="flex items-center"
                    style={{
                        gap: 11,
                        padding: '9px 11px',
                        borderRadius: 11,
                        border: `1px solid ${TOKENS.border}`,
                        background: TOKENS.white,
                    }}
                >
                    <IconTile size={26}>SUP</IconTile>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div className="font-mono" style={{ fontSize: 11.5, color: TOKENS.ink, lineHeight: '15px' }}>
                            Agent · Support
                        </div>
                        <div className="truncate" style={{ fontSize: 11, color: TOKENS.mutedText, lineHeight: '15px' }}>
                            Triage des tickets
                        </div>
                    </div>
                    <span
                        className="inline-flex items-center font-mono"
                        style={{ gap: 6, fontSize: 10, color: TOKENS.ink, flex: '0 0 auto' }}
                    >
                        <Spinner color={accent} size={12} />
                        En cours
                    </span>
                </div>

                {/* Row 2 — Agent · Relance / Progress 64% */}
                <div
                    className="flex items-center"
                    style={{
                        gap: 11,
                        padding: '9px 11px',
                        borderRadius: 11,
                        border: `1px solid ${TOKENS.border}`,
                        background: TOKENS.white,
                    }}
                >
                    <IconTile size={26}>REL</IconTile>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div className="font-mono" style={{ fontSize: 11.5, color: TOKENS.ink, lineHeight: '15px' }}>
                            Agent · Relance
                        </div>
                        <div className="truncate" style={{ fontSize: 11, color: TOKENS.mutedText, lineHeight: '15px' }}>
                            Séquence email J+3
                        </div>
                    </div>
                    <span
                        className="inline-flex items-center font-mono"
                        style={{ gap: 7, fontSize: 10, color: TOKENS.mutedText, flex: '0 0 auto' }}
                    >
                        <ProgressBar pct={64} color={accent} width={54} />
                        64%
                    </span>
                </div>

                {/* Row 3 — Agent · Veille / En file (gold) */}
                <div
                    className="flex items-center"
                    style={{
                        gap: 11,
                        padding: '9px 11px',
                        borderRadius: 11,
                        border: `1px solid ${TOKENS.border}`,
                        background: TOKENS.white,
                    }}
                >
                    <IconTile size={26}>VEI</IconTile>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div className="font-mono" style={{ fontSize: 11.5, color: TOKENS.ink, lineHeight: '15px' }}>
                            Agent · Veille
                        </div>
                        <div className="truncate" style={{ fontSize: 11, color: TOKENS.mutedText, lineHeight: '15px' }}>
                            Synthèse hebdomadaire
                        </div>
                    </div>
                    <span style={{ flex: '0 0 auto' }}>
                        <StatusPill color={TOKENS.gold} label="En file" muted />
                    </span>
                </div>

                {/* Row 4 — Agent · Conformité / Terminé (forest) */}
                <div
                    className="flex items-center"
                    style={{
                        gap: 11,
                        padding: '9px 11px',
                        borderRadius: 11,
                        border: `1px solid ${TOKENS.border}`,
                        background: TOKENS.white,
                    }}
                >
                    <IconTile size={26}>CNF</IconTile>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div className="font-mono" style={{ fontSize: 11.5, color: TOKENS.ink, lineHeight: '15px' }}>
                            Agent · Conformité
                        </div>
                        <div className="truncate" style={{ fontSize: 11, color: TOKENS.mutedText, lineHeight: '15px' }}>
                            Contrôle des accès
                        </div>
                    </div>
                    <span
                        className="inline-flex items-center font-mono"
                        style={{ gap: 5, fontSize: 10, color: TOKENS.forest, flex: '0 0 auto' }}
                    >
                        <Check color={TOKENS.forest} size={11} />
                        Terminé
                    </span>
                </div>
            </div>
        </WindowCard>
    );

    const overlay = <JournalOverlay />;

    return <Layered base={base} overlay={overlay} baseWidth="82%" overlayWidth="56%" />;
}
