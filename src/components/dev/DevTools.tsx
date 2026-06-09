import { useEffect, useState } from 'react';
import { PaintMode } from './PaintMode';
import { useNotchParams, setNotchParams, resetNotchParams, type NotchParams, type CornerStyle } from './notchParamsStore';
import { useVitruveParams, setVitruveParams, resetVitruveParams, type VitruveParams } from './vitruveParamsStore';
import { useHeroTitleParams, setHeroTitleParams, resetHeroTitleParams, type PixelVariant } from './heroTitleStore';
import { useVortexParams, setVortexParams, resetVortexParams, type VortexShape, type VortexColorMode } from './vortexParamsStore';

// ============================================================================
// Inner-shadow tab (state, filters, controls)
// ============================================================================
type ShadowParams = {
    blur: number;
    dx: number;
    dy: number;
    floodColor: string;
    floodOpacity: number;
};

const DEFAULT_PARAMS_DARK: ShadowParams = { blur: 1.3, dx: -0.5, dy: 2.5, floodColor: '#000000', floodOpacity: 0.55 };
const DEFAULT_PARAMS_LIGHT: ShadowParams = { blur: 1.3, dx: -0.5, dy: 2.5, floodColor: '#000000', floodOpacity: 0.55 };

function ShadowFilter({ id, params }: { id: string; params: ShadowParams }) {
    return (
        <filter id={id} key={JSON.stringify(params)} x="-15%" y="-15%" width="130%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation={params.blur} result="blur" />
            <feOffset in="blur" dx={params.dx} dy={params.dy} result="offsetBlur" />
            <feComposite in="SourceAlpha" in2="offsetBlur" operator="arithmetic" k2={1} k3={-1} result="diff" />
            <feFlood floodColor={params.floodColor} floodOpacity={params.floodOpacity} result="shadowColor" />
            <feComposite in="shadowColor" in2="diff" operator="in" result="shadowOnly" />
            <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="shadowOnly" />
            </feMerge>
        </filter>
    );
}

// ============================================================================
// DevTools — unified floating panel with tabs (always renders SVG filters)
// ============================================================================
type Tab = 'shadow' | 'paint' | 'notch' | 'illu' | 'hero' | 'vortex';

export function DevTools() {
    const [dark, setDark] = useState<ShadowParams>(DEFAULT_PARAMS_DARK);
    const [light, setLight] = useState<ShadowParams>(DEFAULT_PARAMS_LIGHT);
    const [colorDark, setColorDark] = useState('#555555');
    const [colorMuted, setColorMuted] = useState('#9a9a9a');
    const [open, setOpen] = useState(true);
    const [tab, setTab] = useState<Tab>('shadow');
    const [paintActive, setPaintActive] = useState(false);
    const [activeShadow, setActiveShadow] = useState<'dark' | 'light'>('dark');

    // Sync text colors to CSS vars
    useEffect(() => {
        document.documentElement.style.setProperty('--emboss-color-dark', colorDark);
        document.documentElement.style.setProperty('--emboss-color-muted', colorMuted);
    }, [colorDark, colorMuted]);

    // Keyboard: ⌘+Shift+D toggle panel, ⌘P toggle paint mode
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const mod = e.metaKey || e.ctrlKey;
            if (mod && e.shiftKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                setOpen((o) => !o);
            }
            if (mod && !e.shiftKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                setTab('paint');
                setPaintActive((a) => !a);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const currentShadow = activeShadow === 'dark' ? dark : light;
    const setCurrentShadow = (p: ShadowParams) => (activeShadow === 'dark' ? setDark(p) : setLight(p));

    return (
        <>
            {/* SVG filter defs — always rendered */}
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                <defs>
                    <ShadowFilter id="inset-shadow-dark" params={dark} />
                    <ShadowFilter id="inset-shadow-light" params={light} />
                </defs>
            </svg>

            {/* Paint mode logic (mouse handlers + scratchpad rendering) */}
            <PaintMode active={paintActive} onActiveChange={setPaintActive} />

            {/* Floating panel */}
            <div
                data-devtools
                style={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 9999,
                    backgroundColor: '#0e0e10',
                    color: '#e7e7ee',
                    padding: 14,
                    borderRadius: 10,
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    fontSize: 12,
                    width: open ? 320 : 'auto',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                    border: '1px solid #2a2a30',
                    maxHeight: open ? '90vh' : 'auto',
                    overflowY: 'auto',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a9aa6' }}>Dev tools</span>
                    <button onClick={() => setOpen(!open)} style={btn}>
                        {open ? '−' : '+'}
                    </button>
                </div>

                {open && (
                    <>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: 4, marginBottom: 12, borderBottom: '1px solid #2a2a30', paddingBottom: 8 }}>
                            {(['shadow', 'notch', 'illu', 'hero', 'vortex', 'paint'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    style={{
                                        ...btn,
                                        flex: 1,
                                        background: tab === t ? '#3a3aff' : 'transparent',
                                        color: '#fff',
                                        border: tab === t ? '1px solid #3a3aff' : '1px solid transparent',
                                    }}
                                >
                                    {t === 'shadow' ? 'Shadow' : t === 'notch' ? 'Notch' : t === 'illu' ? 'Illu' : t === 'hero' ? 'Héro' : t === 'vortex' ? 'Vortex' : 'Paint'}
                                </button>
                            ))}
                        </div>

                        {tab === 'shadow' && (
                            <ShadowTab
                                active={activeShadow}
                                onSwitch={setActiveShadow}
                                params={currentShadow}
                                onChange={setCurrentShadow}
                                colorDark={colorDark}
                                setColorDark={setColorDark}
                                colorMuted={colorMuted}
                                setColorMuted={setColorMuted}
                            />
                        )}

                        {tab === 'notch' && <NotchTab />}

                        {tab === 'illu' && <IlluTab />}

                        {tab === 'hero' && <HeroTab />}

                        {tab === 'vortex' && <VortexTab />}

                        {tab === 'paint' && <PaintTabFooter active={paintActive} onActiveChange={setPaintActive} />}
                    </>
                )}
            </div>
        </>
    );
}

// ----------------------------------------------------------------------------
// Shadow tab body
// ----------------------------------------------------------------------------
function ShadowTab({
    active,
    onSwitch,
    params,
    onChange,
    colorDark,
    setColorDark,
    colorMuted,
    setColorMuted,
}: {
    active: 'dark' | 'light';
    onSwitch: (a: 'dark' | 'light') => void;
    params: ShadowParams;
    onChange: (p: ShadowParams) => void;
    colorDark: string;
    setColorDark: (c: string) => void;
    colorMuted: string;
    setColorMuted: (c: string) => void;
}) {
    const set = (k: keyof ShadowParams, v: number | string) => onChange({ ...params, [k]: v });
    const css = `feGaussianBlur stdDeviation=${params.blur}  ·  feOffset dx=${params.dx} dy=${params.dy}  ·  feFlood ${params.floodColor} @ ${params.floodOpacity}`;
    const grayPresets = ['#171717', '#2a2a2a', '#3a3a3a', '#4a4a4a', '#555555', '#6a6a6a', '#7a7a7a', '#9a9a9a'];

    return (
        <>
            <div style={{ display: 'flex', gap: 6 }}>
                {(['dark', 'light'] as const).map((k) => (
                    <button
                        key={k}
                        onClick={() => onSwitch(k)}
                        style={{ ...btn, flex: 1, background: active === k ? '#3a3aff' : '#1a1a20', color: '#fff' }}
                    >
                        {k === 'dark' ? 'Dark (sections)' : 'Light (hero)'}
                    </button>
                ))}
            </div>

            <Slider label="Blur (stdDeviation)" min={0} max={6} step={0.1} value={params.blur} onChange={(v) => set('blur', v)} />
            <Slider label="Offset Y (dy)" min={-6} max={10} step={0.5} value={params.dy} onChange={(v) => set('dy', v)} />
            <Slider label="Offset X (dx)" min={-6} max={6} step={0.5} value={params.dx} onChange={(v) => set('dx', v)} />
            <Slider label="Opacity" min={0} max={1} step={0.01} value={params.floodOpacity} onChange={(v) => set('floodOpacity', v)} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, color: '#9a9aa6' }}>
                Shadow color
                <input
                    type="color"
                    value={params.floodColor}
                    onChange={(e) => set('floodColor', e.target.value)}
                    style={{ width: 36, height: 24, border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
            </label>

            <div style={{ marginTop: 14, borderTop: '1px solid #2a2a30', paddingTop: 12 }}>
                <div style={{ color: '#9a9aa6', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>
                    Text colors
                </div>
                <ColorRow label="Dark (Leonard…)" value={colorDark} onChange={setColorDark} presets={grayPresets} />
                <ColorRow label="Muted (qui conçoit…)" value={colorMuted} onChange={setColorMuted} presets={grayPresets} />
            </div>

            <div
                style={{
                    marginTop: 12,
                    padding: 8,
                    background: '#1a1a20',
                    borderRadius: 6,
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: 11,
                    lineHeight: 1.4,
                    color: '#c8c8d0',
                    wordBreak: 'break-word',
                }}
            >
                {css}
            </div>
        </>
    );
}

// ----------------------------------------------------------------------------
// Paint tab body — actual paint controls are rendered inside <PaintMode> itself,
// because they need to share state with mouse handlers. This tab just embeds them.
// ----------------------------------------------------------------------------
function PaintTabFooter({ active, onActiveChange }: { active: boolean; onActiveChange: (a: boolean) => void }) {
    return (
        <div style={{ color: '#9a9aa6', fontSize: 12, lineHeight: 1.5 }}>
            {/* Paint UI is rendered separately by the <PaintMode> instance at DevTools root.
                That instance includes its own panel content (paint tab body) — but we render
                only a small placeholder here, with a toggle, so the tab feels active. */}
            <button
                onClick={() => onActiveChange(!active)}
                style={{
                    ...btn,
                    width: '100%',
                    background: active ? '#A3E635' : '#1a1a20',
                    color: active ? '#0a0a14' : '#e7e7ee',
                    fontWeight: 600,
                    padding: '8px 12px',
                }}
            >
                {active ? '● Paint mode active — click to stop' : 'Start paint mode (⌘P)'}
            </button>
            <p style={{ marginTop: 10, color: '#7a7a86', fontSize: 11 }}>
                The full paint controls (source picker, tools, export) appear in a separate panel below the dev tools when paint mode is active.
            </p>
        </div>
    );
}

// ----------------------------------------------------------------------------
// Notch tab body — live tuning of AgentCard notch geometry
// ----------------------------------------------------------------------------
function NotchTab() {
    const p = useNotchParams();
    const set = (k: keyof NotchParams, v: number) => setNotchParams({ [k]: v });

    // Geometric sanity warning: with INNER_R chosen, the inner arcs need
    // ≥ 2 × innerR × 0.7 (ASPECT) of vertical space inside each notch.
    const minH = +(2 * p.innerR * 0.7).toFixed(4);
    const topOK = p.topHeight >= minH;
    const botOK = p.bottomHeight >= minH;
    // Top edge of cut needs DEPTH ≥ INNER_R + OUTER_R
    const depthOK = p.depth >= p.innerR + p.outerR;

    return (
        <>
            <SectionLabel>Notch top</SectionLabel>
            <Slider label="cy (vertical position)" min={0.05} max={0.95} step={0.005} value={p.topCy} onChange={(v) => set('topCy', v)} />
            <Slider label={`height ${topOK ? '' : '⚠'}`} min={0.005} max={0.15} step={0.001} value={p.topHeight} onChange={(v) => set('topHeight', v)} />

            <SectionLabel>Notch bottom</SectionLabel>
            <Slider label="cy (vertical position)" min={0.05} max={0.95} step={0.005} value={p.bottomCy} onChange={(v) => set('bottomCy', v)} />
            <Slider label={`height ${botOK ? '' : '⚠'}`} min={0.005} max={0.15} step={0.001} value={p.bottomHeight} onChange={(v) => set('bottomHeight', v)} />

            <SectionLabel>Shape (both notches)</SectionLabel>
            <Slider label={`depth ${depthOK ? '' : '⚠'}`} min={0.005} max={0.15} step={0.001} value={p.depth} onChange={(v) => set('depth', v)} />
            <Slider label="inner corner R" min={0} max={0.05} step={0.001} value={p.innerR} onChange={(v) => set('innerR', v)} />
            <Slider label="outer corner R" min={0} max={0.05} step={0.001} value={p.outerR} onChange={(v) => set('outerR', v)} />

            <SectionLabel>Corner marks</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {([
                    ['cross', '+'],
                    ['dot', '●'],
                    ['ring', '○'],
                    ['bracket', '⌐'],
                    ['target', '◎'],
                    ['crosshead', '⊕'],
                    ['square', '▫'],
                    ['screw', '⊘'],
                    ['none', '∅'],
                ] as const).map(([cs, glyph]) => (
                    <button
                        key={cs}
                        title={cs}
                        onClick={() => setNotchParams({ cornerStyle: cs as CornerStyle })}
                        style={{
                            ...btn,
                            width: 34,
                            background: p.cornerStyle === cs ? '#3a3aff' : '#1a1a20',
                            color: '#fff',
                            fontSize: 13,
                            padding: '5px 0',
                        }}
                    >
                        {glyph}
                    </button>
                ))}
            </div>

            <button
                onClick={() => resetNotchParams()}
                style={{ ...btn, width: '100%', marginTop: 12, background: '#1a1a20' }}
            >
                Reset to defaults
            </button>

            {(!topOK || !botOK || !depthOK) && (
                <div
                    style={{
                        marginTop: 10,
                        padding: 8,
                        background: 'rgba(220, 80, 60, 0.15)',
                        border: '1px solid rgba(220, 80, 60, 0.4)',
                        borderRadius: 6,
                        color: '#ffb4a8',
                        fontSize: 11,
                        lineHeight: 1.4,
                    }}
                >
                    {!topOK && <div>⚠ Top notch too short: need height ≥ {minH} (= 2 × innerR × 0.7)</div>}
                    {!botOK && <div>⚠ Bottom notch too short: need height ≥ {minH}</div>}
                    {!depthOK && <div>⚠ Depth ({p.depth}) &lt; innerR + outerR ({+(p.innerR + p.outerR).toFixed(3)}) — top edge would invert</div>}
                </div>
            )}

            <div
                style={{
                    marginTop: 10,
                    padding: 8,
                    background: '#1a1a20',
                    borderRadius: 6,
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: 10,
                    lineHeight: 1.5,
                    color: '#9a9aa6',
                    wordBreak: 'break-word',
                }}
            >
                NOTCHES = [<br />
                &nbsp;&nbsp;{`{ cy: ${p.topCy}, height: ${p.topHeight} }`},<br />
                &nbsp;&nbsp;{`{ cy: ${p.bottomCy}, height: ${p.bottomHeight} }`},<br />
                ];<br />
                DEPTH = {p.depth} · INNER_R = {p.innerR} · OUTER_R = {p.outerR}
            </div>
        </>
    );
}

// ----------------------------------------------------------------------------
// Illu tab body — live tuning of the Vitruvian illustration (position + size)
// ----------------------------------------------------------------------------
function IlluTab() {
    const p = useVitruveParams();
    const set = (k: keyof VitruveParams, v: number) => setVitruveParams({ [k]: v });
    return (
        <>
            <SectionLabel>Vitruve · size</SectionLabel>
            <Slider label="width (zoom)" min={50} max={300} step={1} value={p.width} onChange={(v) => set('width', v)} />

            <SectionLabel>Vitruve · position</SectionLabel>
            <Slider label="top (vertical)" min={-150} max={50} step={1} value={p.top} onChange={(v) => set('top', v)} />
            <Slider label="left (horizontal)" min={0} max={100} step={1} value={p.left} onChange={(v) => set('left', v)} />

            <SectionLabel>Vitruve · render</SectionLabel>
            <Slider label="opacity" min={0} max={1} step={0.01} value={p.opacity} onChange={(v) => set('opacity', v)} />

            <button
                onClick={() => resetVitruveParams()}
                style={{ ...btn, width: '100%', marginTop: 12, background: '#1a1a20' }}
            >
                Reset to defaults
            </button>

            <div
                style={{
                    marginTop: 10,
                    padding: 8,
                    background: '#1a1a20',
                    borderRadius: 6,
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: 10,
                    lineHeight: 1.5,
                    color: '#9a9aa6',
                    wordBreak: 'break-word',
                }}
            >
                width: {p.width} · top: {p.top} · left: {p.left} · opacity: {p.opacity}
            </div>
        </>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                marginTop: 14,
                marginBottom: 2,
                color: '#9a9aa6',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: 10,
            }}
        >
            {children}
        </div>
    );
}

// ----------------------------------------------------------------------------
// Shared UI helpers
// ----------------------------------------------------------------------------
const btn: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid #2a2a30',
    color: '#e7e7ee',
    padding: '4px 8px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 12,
};

// ----------------------------------------------------------------------------
// Hero tab body — Geist Pixel variant + glow for the hero title
// ----------------------------------------------------------------------------
function HeroTab() {
    const p = useHeroTitleParams();
    const variants: { id: PixelVariant; label: string }[] = [
        { id: 'line', label: 'Line' },
        { id: 'square', label: 'Square' },
        { id: 'grid', label: 'Grid' },
        { id: 'circle', label: 'Circle' },
        { id: 'triangle', label: 'Triangle' },
    ];
    return (
        <>
            <div style={{ color: '#9a9aa6', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11, marginBottom: 8 }}>
                Variante Geist Pixel
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {variants.map((v) => (
                    <button
                        key={v.id}
                        onClick={() => setHeroTitleParams({ variant: v.id })}
                        style={{
                            ...btn,
                            flex: '1 1 30%',
                            background: p.variant === v.id ? '#3a3aff' : '#1a1a20',
                            color: '#fff',
                            fontFamily: `var(--font-pixel-${v.id})`,
                        }}
                    >
                        {v.label}
                    </button>
                ))}
            </div>

            <Slider label="Glow (px)" min={0} max={48} step={1} value={p.glow} onChange={(v) => setHeroTitleParams({ glow: v })} />

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, color: '#9a9aa6' }}>
                Couleur du glow
                <input
                    type="color"
                    value={p.glowColor}
                    onChange={(e) => setHeroTitleParams({ glowColor: e.target.value })}
                    style={{ width: 36, height: 24, border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
            </label>

            <button onClick={() => resetHeroTitleParams()} style={{ ...btn, marginTop: 12, width: '100%', background: '#1a1a20', color: '#fff' }}>
                Reset
            </button>
        </>
    );
}

function VortexTab() {
    const p = useVortexParams();
    const shapes: { id: VortexShape; label: string }[] = [
        { id: 'spiral', label: 'Spirale' },
        { id: 'phyllo', label: 'Tournesol' },
        { id: 'rings', label: 'Anneaux' },
        { id: 'radial', label: 'Radial' },
    ];
    const colorModes: { id: VortexColorMode; label: string }[] = [
        { id: 'image', label: 'Image' },
        { id: 'radial', label: 'Radial' },
        { id: 'solid', label: 'Couleur' },
    ];
    return (
        <>
            <div style={{ color: '#9a9aa6', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11, marginBottom: 6 }}>
                Algorithme
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {shapes.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setVortexParams({ shape: s.id })}
                        style={{ ...btn, flex: '1 1 45%', background: p.shape === s.id ? '#3a3aff' : '#1a1a20', color: '#fff' }}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            <Slider label="Bras / anneaux" min={1} max={8} step={1} value={p.arms} onChange={(v) => setVortexParams({ arms: v })} />
            <Slider label="Beads" min={3} max={48} step={1} value={p.count} onChange={(v) => setVortexParams({ count: v })} />
            <Slider label="Épaisseur des bras" min={1} max={6} step={1} value={p.thickness} onChange={(v) => setVortexParams({ thickness: v })} />
            <Slider label="Tours" min={0.5} max={5} step={0.1} value={p.turns} onChange={(v) => setVortexParams({ turns: v })} />
            <Slider label="Rayon de départ" min={0} max={160} step={4} value={p.startRadius} onChange={(v) => setVortexParams({ startRadius: v })} />
            <Slider label="Croissance" min={1} max={14} step={0.5} value={p.growth} onChange={(v) => setVortexParams({ growth: v })} />
            <Slider label="Rotation" min={0} max={360} step={5} value={p.rotation} onChange={(v) => setVortexParams({ rotation: v })} />
            <Slider label="Taille bead (px)" min={6} max={48} step={6} value={p.beadSize} onChange={(v) => setVortexParams({ beadSize: v })} />
            <Slider label="Snap grille (px)" min={0} max={48} step={12} value={p.snap} onChange={(v) => setVortexParams({ snap: v })} />

            <div style={{ color: '#9a9aa6', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11, margin: '12px 0 6px' }}>
                Couleur
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
                {colorModes.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setVortexParams({ colorMode: c.id })}
                        style={{ ...btn, flex: 1, background: p.colorMode === c.id ? '#3a3aff' : '#1a1a20', color: '#fff' }}
                    >
                        {c.label}
                    </button>
                ))}
            </div>
            {p.colorMode === 'solid' && (
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, color: '#9a9aa6' }}>
                    Couleur unie
                    <input
                        type="color"
                        value={p.color}
                        onChange={(e) => setVortexParams({ color: e.target.value })}
                        style={{ width: 36, height: 24, border: 'none', background: 'transparent', cursor: 'pointer' }}
                    />
                </label>
            )}
            {p.colorMode === 'radial' && (
                <div style={{ color: '#7a7a86', fontSize: 11, marginTop: 8, lineHeight: 1.4 }}>
                    Près du centre = bas de l'image (fleurs), loin = haut (ciel).
                </div>
            )}

            <button onClick={() => resetVortexParams()} style={{ ...btn, marginTop: 12, width: '100%', background: '#1a1a20', color: '#fff' }}>
                Reset
            </button>
        </>
    );
}

function ColorRow({
    label,
    value,
    onChange,
    presets,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    presets: string[];
}) {
    return (
        <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ color: '#9a9aa6' }}>{label}</span>
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{ width: 32, height: 22, border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {presets.map((c) => (
                    <button
                        key={c}
                        onClick={() => onChange(c)}
                        title={c}
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: 4,
                            background: c,
                            border: value.toLowerCase() === c.toLowerCase() ? '2px solid #3a3aff' : '1px solid #2a2a30',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function Slider({
    label,
    min,
    max,
    step,
    value,
    onChange,
}: {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (v: number) => void;
}) {
    return (
        <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9a9aa6', marginBottom: 4 }}>
                <span>{label}</span>
                <span style={{ color: '#e7e7ee', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: '100%' }}
            />
        </div>
    );
}
