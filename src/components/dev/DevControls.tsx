// Reusable, site-aligned controls for the DevTools panel.
// Light "Intelligence cultivée" language: warm-neutral surface, white embossed
// cards, ink as the default accent (lime reserved for the live/paint state),
// Geist Sans + Mono. Replaces the old dark ad-hoc styling.
import type { CSSProperties, ReactNode } from 'react';
import { TOKENS } from '../layout/Sections';

export const D = {
    panel: TOKENS.surface,            // #F5F5F2
    card: TOKENS.white,               // #FFFFFF
    ink: TOKENS.ink,                  // #171717
    muted: TOKENS.mutedText,          // rgba(23,23,23,0.7)
    faint: 'rgba(23,23,23,0.45)',
    hairline: 'rgba(23,23,23,0.10)',
    live: TOKENS.lime,                // #A3E635 — reserved for "live"
};

// Embossed shadows mirroring the site's card language.
export const PANEL_SHADOW = '0 18px 44px rgba(0,0,0,0.16), 0 0 0 0.8px rgba(0,0,0,0.06)';
export const CARD_SHADOW = 'inset 0 0 0 0.8px #FFFFFF, 0 0 0 0.8px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)';
export const TILE_SHADOW = 'inset 0 0 0 0.8px #FFFFFF, 0 0 0 0.8px rgba(0,0,0,0.10)';
export const RECESS_SHADOW = 'inset 0 0 0 0.8px rgba(0,0,0,0.07)';

const LABEL: CSSProperties = { fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 460, color: D.muted };
const VALUE: CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: 12, fontVariantNumeric: 'tabular-nums', color: D.ink };
const SECTION_LABEL: CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: D.faint,
};

/** Base style for a pressable control (segmented option / button). */
export function pressable(selected: boolean): CSSProperties {
    return {
        fontFamily: 'var(--font-sans)',
        fontSize: 12.5,
        fontWeight: 500,
        lineHeight: 1.1,
        color: selected ? '#FFFFFF' : D.muted,
        background: selected ? D.ink : D.card,
        border: 'none',
        borderRadius: 8,
        padding: '7px 10px',
        cursor: 'pointer',
        boxShadow: selected ? 'inset 0 0 0 1px rgba(255,255,255,0.14)' : TILE_SHADOW,
        transition: 'background 120ms ease, color 120ms ease, box-shadow 120ms ease',
    };
}

export function SectionLabel({ children }: { children: ReactNode }) {
    return <div style={{ ...SECTION_LABEL, marginTop: 16, marginBottom: 8 }}>{children}</div>;
}

export function Card({ children }: { children: ReactNode }) {
    return (
        <div style={{ background: D.card, borderRadius: 12, boxShadow: CARD_SHADOW, padding: '14px 14px 16px' }}>
            {children}
        </div>
    );
}

export function Slider({
    label, min, max, step, value, onChange, unit,
}: {
    label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void; unit?: string;
}) {
    const clamp = (v: number) => Math.min(max, Math.max(min, v));
    return (
        <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                <span style={LABEL}>{label}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <input
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (!Number.isNaN(v)) onChange(clamp(v));
                        }}
                        style={{
                            width: 56, textAlign: 'right', ...VALUE, background: D.card, border: 'none',
                            boxShadow: TILE_SHADOW, borderRadius: 6, padding: '3px 7px',
                        }}
                    />
                    {unit && <span style={{ ...VALUE, color: D.faint, fontSize: 11 }}>{unit}</span>}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: D.ink, cursor: 'pointer' }}
            />
        </div>
    );
}

export type SegOption<T extends string> = { id: T; label?: string; glyph?: string; title?: string; font?: string };

export function Segmented<T extends string>({
    value, options, onChange, columns,
}: {
    value: T; options: SegOption<T>[]; onChange: (v: T) => void; columns?: number;
}) {
    return (
        <div role="radiogroup" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {options.map((o) => {
                const sel = o.id === value;
                return (
                    <button
                        key={o.id}
                        role="radio"
                        aria-checked={sel}
                        aria-label={o.title ?? o.label ?? o.id}
                        title={o.title}
                        onClick={() => onChange(o.id)}
                        style={{
                            ...pressable(sel),
                            flex: columns ? `1 1 calc(${100 / columns}% - ${(6 * (columns - 1)) / columns}px)` : '1 1 auto',
                            ...(o.glyph ? { minWidth: 32, padding: '6px 0', fontSize: 14, textAlign: 'center' } : null),
                            ...(o.font ? { fontFamily: o.font } : null),
                        }}
                    >
                        {o.glyph ?? o.label}
                    </button>
                );
            })}
        </div>
    );
}

export function ColorField({
    label, value, onChange, presets,
}: {
    label: string; value: string; onChange: (v: string) => void; presets?: string[];
}) {
    return (
        <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={LABEL}>{label}</span>
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{ width: 30, height: 24, borderRadius: 6, border: 'none', boxShadow: TILE_SHADOW, background: 'transparent', cursor: 'pointer', padding: 2 }}
                />
            </div>
            {presets && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                    {presets.map((c) => (
                        <button
                            key={c}
                            aria-label={c}
                            aria-pressed={value.toLowerCase() === c.toLowerCase()}
                            onClick={() => onChange(c)}
                            style={{
                                width: 22, height: 22, borderRadius: 6, background: c, cursor: 'pointer',
                                border: value.toLowerCase() === c.toLowerCase() ? `2px solid ${D.ink}` : '1px solid rgba(0,0,0,0.12)',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export function Toggle({
    active, onChange, label, activeLabel,
}: {
    active: boolean; onChange: (a: boolean) => void; label: string; activeLabel?: string;
}) {
    return (
        <button
            onClick={() => onChange(!active)}
            aria-pressed={active}
            style={{
                width: '100%', padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12.5,
                color: D.ink, background: active ? D.live : D.card,
                boxShadow: active ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : TILE_SHADOW,
                transition: 'background 120ms ease',
            }}
        >
            {active ? activeLabel ?? label : label}
        </button>
    );
}

export function ResetButton({ onClick, label = 'Réinitialiser' }: { onClick: () => void; label?: string }) {
    return (
        <button onClick={onClick} style={{ ...pressable(false), width: '100%', marginTop: 14, padding: '9px 10px', fontWeight: 500 }}>
            ↺ {label}
        </button>
    );
}

export function Readout({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'warn' }) {
    const warn = tone === 'warn';
    return (
        <div
            style={{
                marginTop: 12, padding: '9px 11px', borderRadius: 8, wordBreak: 'break-word',
                fontFamily: 'var(--font-mono)', fontSize: 10.5, lineHeight: 1.5,
                background: warn ? 'rgba(238,199,93,0.16)' : D.panel,
                boxShadow: warn ? 'inset 0 0 0 0.8px rgba(238,199,93,0.5)' : RECESS_SHADOW,
                color: warn ? '#8a6a16' : D.muted,
            }}
        >
            {children}
        </div>
    );
}
