// Shared visual kit for the section illustrations (cofounder idiom, Leonard light palette).
// All primitives are decorative (aria-hidden handled by composition wrappers).
// Motion is encapsulated here (Spinner / PulseDot) so section files never touch the CSS module.
// IMPORTANT: this file is typechecked under noUnusedLocals/noUnusedParameters — exports are
// always "used", but local consts/params are not. Reference TOKENS.* inline to stay safe.
import { TOKENS, CARD_SHADOW } from '../Sections';
import styles from '../Illustrations.module.css';

// Elevated shadow for floating overlay panels (the layered "cofounder" look).
export const FLOAT_SHADOW =
    '0 22px 48px -16px rgba(20,20,20,0.26), 0 6px 16px -6px rgba(20,20,20,0.12)';

// Inner track color for bars/meters and the "empty" pixel color.
const TRACK = '#ECECE6';
const EMPTY = '#E2E2DB';
const CORAL = '#E6675A';

// ── Window-chrome card (the main product surface) ────────────────────────────
export function WindowCard({
    title,
    right,
    footer,
    maxWidth = 360,
    children,
}: {
    title: string;
    right?: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: number;
    children: React.ReactNode;
}) {
    return (
        <div
            className="w-full font-sans"
            style={{
                width: '100%',
                maxWidth,
                borderRadius: 16,
                border: `1px solid ${TOKENS.border}`,
                background: `linear-gradient(180deg, ${TOKENS.white}, ${TOKENS.pale})`,
                boxShadow: CARD_SHADOW,
                overflow: 'hidden',
            }}
        >
            <div
                className="flex items-center"
                style={{ gap: 8, padding: '11px 14px', borderBottom: `1px solid ${TOKENS.border}` }}
            >
                <div className="flex" style={{ gap: 5 }}>
                    {['#E6675A', '#E8B53D', '#5BB85B'].map((c) => (
                        <span key={c} style={{ width: 8, height: 8, borderRadius: 999, background: c, opacity: 0.5 }} />
                    ))}
                </div>
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: TOKENS.mutedText, marginLeft: 4 }}>
                    {title}
                </span>
                {right && <div className="ml-auto">{right}</div>}
            </div>
            <div style={{ padding: 12 }}>{children}</div>
            {footer && <div style={{ borderTop: `1px solid ${TOKENS.border}` }}>{footer}</div>}
        </div>
    );
}

// Back-compat alias (older call sites used MockCard).
export const MockCard = WindowCard;

// ── Floating overlay panel (raised, with a decorative close affordance) ──────
export function FloatPanel({
    title,
    accent,
    right,
    children,
}: {
    title: string;
    accent?: string;
    right?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div
            className="font-sans"
            style={{
                borderRadius: 14,
                border: `1px solid ${TOKENS.border}`,
                background: TOKENS.white,
                boxShadow: FLOAT_SHADOW,
                overflow: 'hidden',
            }}
        >
            <div
                className="flex items-center"
                style={{ gap: 8, padding: '9px 12px', borderBottom: `1px solid ${TOKENS.border}` }}
            >
                {accent && <span style={{ width: 7, height: 7, borderRadius: 999, background: accent, flex: '0 0 auto' }} />}
                <span className="font-mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: TOKENS.ink }}>{title}</span>
                {right ? (
                    <span className="ml-auto">{right}</span>
                ) : (
                    <span className="ml-auto" style={{ color: TOKENS.mutedText, fontSize: 14, lineHeight: 1 }}>×</span>
                )}
            </div>
            <div style={{ padding: 11 }}>{children}</div>
        </div>
    );
}

// ── Layered composition: dense base card + floating overlay bottom-right ─────
// This wrapper is what gives every section the signature depth. Make `base` the
// taller/denser surface and `overlay` a shorter floating panel.
export function Layered({
    base,
    overlay,
    baseWidth = '82%',
    overlayWidth = '58%',
}: {
    base: React.ReactNode;
    overlay: React.ReactNode;
    baseWidth?: string;
    overlayWidth?: string;
}) {
    return (
        <div className="relative w-full" style={{ maxWidth: 480, margin: '0 auto' }} aria-hidden="true">
            <div style={{ width: baseWidth }}>{base}</div>
            <div className="absolute" style={{ right: -10, bottom: 20, width: overlayWidth, minWidth: 200, zIndex: 2 }}>
                {overlay}
            </div>
        </div>
    );
}

// A single-surface composition (when a section reads better without an overlay).
export function Solo({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex justify-center" style={{ maxWidth: 420, margin: '0 auto' }} aria-hidden="true">
            {children}
        </div>
    );
}

// ── Status + motion atoms ────────────────────────────────────────────────────
export function StatusPill({ color, label, muted }: { color: string; label: string; muted?: boolean }) {
    return (
        <span
            className="inline-flex items-center font-mono"
            style={{
                gap: 6,
                fontSize: 10,
                color: muted ? TOKENS.mutedText : TOKENS.ink,
                padding: '3px 9px',
                borderRadius: 999,
                border: `1px solid ${TOKENS.border}`,
                background: TOKENS.white,
            }}
        >
            <span style={{ width: 6, height: 6, borderRadius: 999, background: color, display: 'inline-block' }} />
            {label}
        </span>
    );
}

export function LivePill({ color, label }: { color: string; label: string }) {
    return (
        <span
            className="inline-flex items-center font-mono"
            style={{ gap: 6, fontSize: 10, color: TOKENS.ink, padding: '3px 9px', borderRadius: 999, border: `1px solid ${TOKENS.border}`, background: TOKENS.white }}
        >
            <span className={styles.pulse} style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
            {label}
        </span>
    );
}

export function PulseDot({ color, size = 9 }: { color: string; size?: number }) {
    return <span className={styles.pulse} style={{ width: size, height: size, borderRadius: 999, background: color, display: 'inline-block', flex: '0 0 auto' }} />;
}

export function Spinner({ color, size = 12 }: { color: string; size?: number }) {
    return (
        <span
            className={styles.spinner}
            style={{ width: size, height: size, borderRadius: 999, border: `2px solid ${color}55`, borderTopColor: color, display: 'inline-block', flex: '0 0 auto' }}
        />
    );
}

export function Check({ color, size = 11 }: { color: string; size?: number }) {
    return (
        <svg viewBox="0 0 10 10" width={size} height={size} aria-hidden="true" style={{ flex: '0 0 auto' }}>
            <path d="M1 5 l3 3 l5 -7" fill="none" stroke={color} strokeWidth="1.6" />
        </svg>
    );
}

export function Cross({ color, size = 11 }: { color: string; size?: number }) {
    return (
        <svg viewBox="0 0 10 10" width={size} height={size} aria-hidden="true" style={{ flex: '0 0 auto' }}>
            <path d="M2 2 l6 6 M8 2 l-6 6" fill="none" stroke={color} strokeWidth="1.6" />
        </svg>
    );
}

// Rounded square container for a glyph / short ID (e.g. "SUP", a lock icon).
export function IconTile({ children, size = 26 }: { children: React.ReactNode; size?: number }) {
    return (
        <span
            className="inline-flex items-center justify-center font-mono"
            style={{ width: size, height: size, borderRadius: 8, background: TOKENS.pale, border: `1px solid ${TOKENS.border}`, fontSize: 8.5, color: TOKENS.mutedText, flex: '0 0 auto' }}
        >
            {children}
        </span>
    );
}

// ── Meters + charts ──────────────────────────────────────────────────────────
export function ProgressBar({ pct, color, width = 54 }: { pct: number; color: string; width?: number }) {
    return (
        <span style={{ width, height: 5, borderRadius: 999, background: TRACK, overflow: 'hidden', display: 'inline-block' }}>
            <span style={{ width: `${pct}%`, height: '100%', background: color, display: 'block' }} />
        </span>
    );
}

// 5-square rating meter (criterion intensity).
export function Squares({ n, total = 5, color }: { n: number; total?: number; color: string }) {
    return (
        <span className="inline-flex" style={{ gap: 3 }}>
            {Array.from({ length: total }).map((_, k) => (
                <span key={k} style={{ width: 7, height: 7, borderRadius: 2, background: k < n ? color : '#E6E6E0', display: 'inline-block' }} />
            ))}
        </span>
    );
}

// Decorative pixel-bar (cofounder's signature green→amber→red distribution strip).
// Purely illustrative intensity; not a measured business metric.
export function PixelBar({ total = 26, filled, color, height = 11 }: { total?: number; filled?: number; color?: string; height?: number }) {
    const grad = (i: number) => {
        const t = total <= 1 ? 0 : i / (total - 1);
        return t < 0.45 ? TOKENS.forest : t < 0.72 ? TOKENS.gold : CORAL;
    };
    return (
        <span className="inline-flex" style={{ gap: 2 }}>
            {Array.from({ length: total }).map((_, i) => {
                const on = filled === undefined ? true : i < filled;
                return <span key={i} style={{ width: 5, height, borderRadius: 1.5, background: on ? (color ?? grad(i)) : EMPTY, display: 'inline-block' }} />;
            })}
        </span>
    );
}

// Small bar sparkline. `accentCount` colors the trailing N bars with `color`.
export function Sparkbars({ data, color, accentCount = 0, height = 22 }: { data: number[]; color: string; accentCount?: number; height?: number }) {
    const max = Math.max(1, ...data);
    return (
        <span className="inline-flex items-end" style={{ gap: 3, height }}>
            {data.map((h, i) => (
                <span
                    key={i}
                    style={{ width: 4, height: `${Math.max(12, (h / max) * 100)}%`, borderRadius: 2, background: i >= data.length - accentCount ? color : '#D8D8D2', display: 'inline-block' }}
                />
            ))}
        </span>
    );
}

// Multi-series line chart (the "Time Series" surface). Vector, crisp, decorative.
export function LineChart({
    series,
    height = 96,
    yMax,
    xLabels,
}: {
    series: { color: string; pts: number[] }[];
    height?: number;
    yMax?: number;
    xLabels?: string[];
}) {
    const W = 280;
    const padL = 4;
    const padR = 4;
    const padT = 8;
    const padB = xLabels ? 16 : 6;
    const innerW = W - padL - padR;
    const innerH = height - padT - padB;
    const allMax = yMax ?? Math.max(1, ...series.flatMap((s) => s.pts));
    const xAt = (i: number, n: number) => padL + (n <= 1 ? 0 : (i / (n - 1)) * innerW);
    const yAt = (v: number) => padT + innerH - (v / allMax) * innerH;
    return (
        <svg viewBox={`0 0 ${W} ${height}`} width="100%" aria-hidden="true" style={{ display: 'block' }}>
            {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1={padL} x2={W - padR} y1={padT + innerH * g} y2={padT + innerH * g} stroke={TOKENS.border} strokeWidth="1" />
            ))}
            {series.map((s, si) => (
                <polyline
                    key={si}
                    points={s.pts.map((v, i) => `${xAt(i, s.pts.length)},${yAt(v)}`).join(' ')}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ))}
            {xLabels?.map((l, i) => (
                <text key={l + i} x={xAt(i, xLabels.length)} y={height - 4} textAnchor={i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle'} className="font-mono" style={{ fontSize: 7.5, fill: TOKENS.mutedText }}>
                    {l}
                </text>
            ))}
        </svg>
    );
}
