import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    IconTile,
    Check,
    Cross,
    PulseDot,
} from './kit';

// ── Lock glyph (padlock: body rect + shackle arc) ──────────────────────────
function LockGlyph() {
    return (
        <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true">
            <rect x="3" y="6" width="8" height="6" rx="1.4" fill="none" stroke={TOKENS.mutedText} strokeWidth="1.1" />
            <path d="M4.6 6 V4.5 a2.4 2.4 0 0 1 4.8 0 V6" fill="none" stroke={TOKENS.mutedText} strokeWidth="1.1" />
        </svg>
    );
}

// ── 07 · Sécurité & gouvernance ── Layered: RBAC compartments + audit log + approval overlay
export function IlluSecurity({ accent }: { accent: string }) {
    const compartments = [
        { name: 'Dossier A', role: 'Direction' },
        { name: 'Dossier B', role: 'Opérations' },
        { name: 'Dossier C', role: 'Externe' },
    ];

    const log: { label: string; status: string; ok: boolean }[] = [
        { label: 'Accès lecture', status: 'Autorisé', ok: true },
        { label: 'Appel outil', status: 'Autorisé', ok: true },
        { label: 'Export externe', status: 'Refusé', ok: false },
        { label: 'Application règle', status: 'Autorisé', ok: true },
    ];

    const base = (
        <WindowCard
            title="GOUVERNANCE"
            right={
                <span
                    className="inline-flex items-center font-mono"
                    style={{
                        gap: 6,
                        fontSize: 10,
                        color: TOKENS.ink,
                        padding: '3px 9px',
                        borderRadius: 999,
                        border: `1px solid ${TOKENS.border}`,
                        background: TOKENS.white,
                    }}
                >
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: accent, display: 'inline-block' }} />
                    RBAC
                </span>
            }
            footer={
                <div style={{ padding: '11px 14px' }}>
                    <div
                        className="font-mono"
                        style={{ fontSize: 9, letterSpacing: '0.14em', color: TOKENS.mutedText, marginBottom: 9 }}
                    >
                        JOURNAL D'AUDIT
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {log.map((l) => (
                            <div key={l.label} className="flex items-center" style={{ gap: 9 }}>
                                {l.ok ? (
                                    <Check color={TOKENS.forest} />
                                ) : (
                                    <Cross color={TOKENS.gold} />
                                )}
                                <span className="font-mono" style={{ fontSize: 11, color: TOKENS.ink }}>{l.label}</span>
                                <span className="font-mono ml-auto" style={{ fontSize: 10, color: l.ok ? TOKENS.mutedText : TOKENS.gold }}>
                                    {l.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        >
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {compartments.map((c) => (
                    <div
                        key={c.name}
                        style={{
                            padding: '11px 10px',
                            borderRadius: 11,
                            border: `1px solid ${TOKENS.border}`,
                            background: TOKENS.pale,
                            textAlign: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                            <IconTile>
                                <LockGlyph />
                            </IconTile>
                        </div>
                        <div className="font-mono" style={{ fontSize: 10.5, color: TOKENS.ink, lineHeight: '14px' }}>
                            {c.name}
                        </div>
                        <div className="font-mono" style={{ fontSize: 9, color: TOKENS.mutedText, lineHeight: '13px', marginTop: 2 }}>
                            {c.role}
                        </div>
                    </div>
                ))}
            </div>
        </WindowCard>
    );

    const overlay = (
        <FloatPanel title="APPROBATION REQUISE" accent={TOKENS.gold}>
            {/* Action identifier */}
            <div
                className="font-mono"
                style={{
                    fontSize: 10,
                    color: TOKENS.ink,
                    background: TOKENS.pale,
                    border: `1px solid ${TOKENS.border}`,
                    borderRadius: 7,
                    padding: '5px 8px',
                    marginBottom: 9,
                    letterSpacing: '0.04em',
                }}
            >
                Export externe · Dossier C
            </div>

            {/* Status row */}
            <div className="flex items-center" style={{ gap: 7, marginBottom: 11 }}>
                <PulseDot color={TOKENS.gold} size={8} />
                <span className="font-mono" style={{ fontSize: 10, color: TOKENS.mutedText }}>
                    Agent en attente
                </span>
            </div>

            {/* Action buttons (decorative spans) */}
            <div className="flex" style={{ gap: 7 }}>
                <span
                    className="font-mono"
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 10,
                        color: TOKENS.mutedText,
                        padding: '5px 0',
                        borderRadius: 8,
                        border: `1px solid ${TOKENS.border}`,
                        background: TOKENS.white,
                        letterSpacing: '0.04em',
                        cursor: 'default',
                    }}
                >
                    Refuser
                </span>
                <span
                    className="font-mono"
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 10,
                        color: TOKENS.white,
                        padding: '5px 0',
                        borderRadius: 8,
                        background: accent,
                        letterSpacing: '0.04em',
                        cursor: 'default',
                    }}
                >
                    Approuver
                </span>
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} overlayWidth="56%" />;
}
