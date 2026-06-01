import { TOKENS } from '../Sections';
import {
    WindowCard,
    FloatPanel,
    Layered,
    IconTile,
    Check,
    Cross,
    PulseDot,
    EMBOSS,
    EMBOSS_SOFT,
    ROW_BG,
    ROW_SHADOW,
    PILL_EMBOSS,
    DIVIDER,
} from './kit';

// ── Local helpers ──────────────────────────────────────────────────────────────

// Padlock SVG — used inside IconTile for compartment tiles.
function LockGlyph({ color = TOKENS.mutedText }: { color?: string }) {
    return (
        <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
            <rect x="3" y="6.5" width="8" height="5.5" rx="1.5" fill="none" stroke={color} strokeWidth="1.2" />
            <path d="M4.8 6.5 V4.8 a2.2 2.2 0 0 1 4.4 0 V6.5" fill="none" stroke={color} strokeWidth="1.2" />
            <circle cx="7" cy="9.2" r="0.8" fill={color} />
        </svg>
    );
}

// Thin horizontal rule with a mono label on the left.
function SectionLabel({ label }: { label: string }) {
    return (
        <div className="flex items-center" style={{ gap: 8, marginBottom: 8 }}>
            <span
                className="font-mono"
                style={{ fontSize: 9, letterSpacing: '0.15em', color: TOKENS.mutedText, whiteSpace: 'nowrap' }}
            >
                {label}
            </span>
            <span style={{ flex: 1, height: 1, background: DIVIDER }} />
        </div>
    );
}

// Single RBAC compartment tile.
function CompartmentTile({
    name,
    role,
    level,
    levelColor,
}: {
    name: string;
    role: string;
    level: string;
    levelColor: string;
}) {
    return (
        <div
            style={{
                padding: '10px 9px',
                borderRadius: 10,
                background: TOKENS.pale,
                boxShadow: EMBOSS,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
            }}
        >
            <IconTile size={28}>
                <LockGlyph />
            </IconTile>
            <div style={{ textAlign: 'center' }}>
                <div
                    className="font-mono"
                    style={{ fontSize: 10, color: TOKENS.ink, lineHeight: '14px', fontWeight: 600 }}
                >
                    {name}
                </div>
                <div
                    className="font-mono"
                    style={{ fontSize: 8.5, color: TOKENS.mutedText, lineHeight: '12px', marginTop: 1 }}
                >
                    {role}
                </div>
            </div>
            {/* Access-level badge */}
            <span
                className="font-mono"
                style={{
                    fontSize: 8,
                    letterSpacing: '0.08em',
                    color: levelColor,
                    padding: '2px 6px',
                    borderRadius: 999,
                    background: `${levelColor}12`,
                    boxShadow: PILL_EMBOSS,
                }}
            >
                {level}
            </span>
        </div>
    );
}

// Single audit-log row.
function AuditRow({
    ok,
    action,
    actor,
    status,
}: {
    ok: boolean;
    action: string;
    actor: string;
    status: string;
}) {
    return (
        <div
            className="flex items-center"
            style={{
                gap: 8,
                padding: '6px 9px',
                borderRadius: 8,
                background: ok ? ROW_BG : `linear-gradient(180deg, ${TOKENS.gold}14 0%, ${TOKENS.gold}08 100%)`,
                boxShadow: ok ? ROW_SHADOW : `${ROW_SHADOW}, 0 0 0 0.8px ${TOKENS.gold}30`,
            }}
        >
            {ok ? <Check color={TOKENS.forest} size={11} /> : <Cross color={TOKENS.gold} size={11} />}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-mono" style={{ fontSize: 10.5, color: TOKENS.ink, lineHeight: '14px' }}>
                    {action}
                </div>
                <div className="font-mono" style={{ fontSize: 9, color: TOKENS.mutedText, lineHeight: '12px' }}>
                    {actor}
                </div>
            </div>
            <span
                className="font-mono"
                style={{
                    fontSize: 9.5,
                    color: ok ? TOKENS.mutedText : TOKENS.gold,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.04em',
                }}
            >
                {status}
            </span>
        </div>
    );
}

// ── 07 · Sécurité & gouvernance ───────────────────────────────────────────────
export function IlluSecurity({ accent }: { accent: string }) {
    const compartments: { name: string; role: string; level: string; levelColor: string }[] = [
        { name: 'Dossier A', role: 'Direction', level: 'LECTURE+ÉCRITURE', levelColor: TOKENS.forest },
        { name: 'Dossier B', role: 'Opérations', level: 'LECTURE SEULE', levelColor: TOKENS.gold },
        { name: 'Dossier C', role: 'Externe', level: 'AUCUN ACCÈS', levelColor: 'rgba(23,23,23,0.45)' },
    ];

    const auditLog: { ok: boolean; action: string; actor: string; status: string }[] = [
        { ok: true,  action: 'Accès lecture',    actor: 'agent:synthèse · dossier A', status: 'Autorisé' },
        { ok: true,  action: 'Appel outil',       actor: 'agent:analyse · règle R-04', status: 'Autorisé' },
        { ok: false, action: 'Export externe',    actor: 'agent:rapport · dossier C',  status: 'Refusé'   },
        { ok: true,  action: 'Application règle', actor: 'agent:synthèse · règle R-11', status: 'Autorisé' },
        { ok: true,  action: 'Lecture dossier',   actor: 'agent:analyse · dossier B',  status: 'Autorisé' },
    ];

    const base = (
        <WindowCard
            title="GOUVERNANCE"
            maxWidth={480}
            right={
                <span
                    className="inline-flex items-center font-mono"
                    style={{
                        gap: 5,
                        fontSize: 9.5,
                        color: TOKENS.ink,
                        padding: '3px 8px',
                        borderRadius: 999,
                        background: TOKENS.white,
                        letterSpacing: '0.1em',
                        boxShadow: PILL_EMBOSS,
                    }}
                >
                    <span
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            background: accent,
                            display: 'inline-block',
                        }}
                    />
                    RBAC
                </span>
            }
        >
            {/* ── RBAC Compartiments ── */}
            <SectionLabel label="COMPARTIMENTS RBAC" />
            <div
                className="grid"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 7, marginBottom: 14 }}
            >
                {compartments.map((c) => (
                    <CompartmentTile key={c.name} {...c} />
                ))}
            </div>

            {/* ── Journal d'audit ── */}
            <SectionLabel label="JOURNAL D'AUDIT" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {auditLog.map((row) => (
                    <AuditRow key={row.action + row.actor} {...row} />
                ))}
            </div>
        </WindowCard>
    );

    const overlay = (
        <FloatPanel title="APPROBATION REQUISE" accent={TOKENS.gold}>
            {/* Blocked action pill */}
            <div
                className="font-mono"
                style={{
                    fontSize: 10,
                    color: TOKENS.ink,
                    background: `${TOKENS.gold}14`,
                    borderRadius: 7,
                    padding: '5px 9px',
                    marginBottom: 10,
                    letterSpacing: '0.04em',
                    lineHeight: '15px',
                    boxShadow: `${EMBOSS_SOFT}, 0 0 0 0.8px ${TOKENS.gold}40`,
                }}
            >
                Export externe · Dossier C
            </div>

            {/* Context lines */}
            <div
                className="font-mono"
                style={{ fontSize: 9, color: TOKENS.mutedText, marginBottom: 6, letterSpacing: '0.04em' }}
            >
                Demandeur : agent:rapport
            </div>
            <div
                className="font-mono"
                style={{ fontSize: 9, color: TOKENS.mutedText, marginBottom: 10, letterSpacing: '0.04em' }}
            >
                Règle déclenchée : EX-EXTERN-GATE
            </div>

            {/* Waiting status */}
            <div className="flex items-center" style={{ gap: 7, marginBottom: 13 }}>
                <PulseDot color={TOKENS.gold} size={8} />
                <span className="font-mono" style={{ fontSize: 10, color: TOKENS.mutedText, letterSpacing: '0.04em' }}>
                    En attente d'approbation
                </span>
            </div>

            {/* Decorative action affordances */}
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
                        background: TOKENS.white,
                        letterSpacing: '0.06em',
                        cursor: 'default',
                        boxShadow: PILL_EMBOSS,
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
                        background: TOKENS.forest,
                        letterSpacing: '0.06em',
                        cursor: 'default',
                        boxShadow: PILL_EMBOSS,
                    }}
                >
                    Approuver
                </span>
            </div>
        </FloatPanel>
    );

    return <Layered base={base} overlay={overlay} baseWidth="88%" overlayWidth="60%" />;
}
