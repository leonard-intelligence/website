import { useEffect, useRef, useState } from 'react';
import { PaintMode } from './PaintMode';
import { useNotchParams, setNotchParams, resetNotchParams, type NotchParams, type CornerStyle } from './notchParamsStore';
import { useVitruveParams, setVitruveParams, resetVitruveParams, type VitruveParams } from './vitruveParamsStore';
import { useHeroTitleParams, setHeroTitleParams, resetHeroTitleParams, type PixelVariant } from './heroTitleStore';
import { useHoloParams, setHoloParams, resetHoloParams, type FoilKind, type WindowEffect } from './holoParamsStore';
import {
    useVortexParams, setVortexParams, resetVortexParams, VORTEX_SECTIONS,
    type VortexShape, type VortexColorMode, type VortexParams, type VortexSectionId,
} from './vortexParamsStore';
import {
    D, PANEL_SHADOW, SectionLabel, Card, Slider, Segmented, ColorField, Toggle, ResetButton, Readout,
    pressable, type SegOption,
} from './DevControls';

// ============================================================================
// SVG inset-shadow filter (drives the section / hero embossed shadows)
// ============================================================================
type ShadowParams = { blur: number; dx: number; dy: number; floodColor: string; floodOpacity: number };
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
// DevTools — floating panel, site-aligned (sticky header/tabs, scrolling body)
// ============================================================================
type Tab = 'shadow' | 'notch' | 'illu' | 'hero' | 'vortex' | 'holo' | 'paint';
const TABS: SegOption<Tab>[] = [
    { id: 'shadow', label: 'Shadow' },
    { id: 'notch', label: 'Notch' },
    { id: 'illu', label: 'Illu' },
    { id: 'hero', label: 'Héro' },
    { id: 'vortex', label: 'Vortex' },
    { id: 'holo', label: 'Holo' },
    { id: 'paint', label: 'Paint' },
];

export function DevTools() {
    const [dark, setDark] = useState<ShadowParams>(DEFAULT_PARAMS_DARK);
    const [light, setLight] = useState<ShadowParams>(DEFAULT_PARAMS_LIGHT);
    const [colorDark, setColorDark] = useState('#555555');
    const [colorMuted, setColorMuted] = useState('#9a9a9a');
    const [open, setOpen] = useState(true);
    const [tab, setTab] = useState<Tab>('shadow');
    const [paintActive, setPaintActive] = useState(false);
    const [activeShadow, setActiveShadow] = useState<'dark' | 'light'>('dark');

    // Drag du panneau par son header (position par défaut : haut-droite)
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const onDragStart = (e: React.PointerEvent) => {
        if ((e.target as HTMLElement).closest('button')) return; // le bouton +/– reste cliquable
        const rect = panelRef.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - rect.left;
        const dy = e.clientY - rect.top;
        const onMove = (ev: PointerEvent) => {
            const x = Math.min(Math.max(ev.clientX - dx, 8 - rect.width + 80), window.innerWidth - 80);
            const y = Math.min(Math.max(ev.clientY - dy, 8), window.innerHeight - 48);
            setPos({ x, y });
        };
        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        e.preventDefault();
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--emboss-color-dark', colorDark);
        document.documentElement.style.setProperty('--emboss-color-muted', colorMuted);
    }, [colorDark, colorMuted]);

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
    const activeLabel = TABS.find((t) => t.id === tab)?.label;

    return (
        <>
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                <defs>
                    <ShadowFilter id="inset-shadow-dark" params={dark} />
                    <ShadowFilter id="inset-shadow-light" params={light} />
                </defs>
            </svg>

            <PaintMode active={paintActive} onActiveChange={setPaintActive} />

            <div
                ref={panelRef}
                data-devtools
                role="dialog"
                aria-label="Dev tools"
                style={{
                    position: 'fixed',
                    top: pos ? pos.y : 16,
                    left: pos ? pos.x : undefined,
                    right: pos ? undefined : 16,
                    zIndex: 9999,
                    background: D.panel,
                    color: D.ink,
                    borderRadius: 16,
                    width: open ? 340 : 'auto',
                    maxHeight: '90vh',
                    boxShadow: PANEL_SHADOW,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                }}
            >
                <style>{`
                    [data-devtools] button:focus-visible, [data-devtools] input:focus-visible { outline: 2px solid ${D.ink}; outline-offset: 2px; }
                    [data-devtools] input[type=number]::-webkit-inner-spin-button, [data-devtools] input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
                    [data-devtools] input[type=number] { -moz-appearance: textfield; }
                    [data-devtools] ::-webkit-scrollbar { width: 8px; }
                    [data-devtools] ::-webkit-scrollbar-thumb { background: rgba(23,23,23,0.18); border-radius: 8px; }
                `}</style>

                {/* Header (fixed) — poignée de drag */}
                <div
                    onPointerDown={onDragStart}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                        padding: '13px 15px', flex: '0 0 auto',
                        cursor: 'grab', touchAction: 'none', userSelect: 'none',
                    }}
                    title="Glisser pour déplacer"
                >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: D.faint }}>
                        Dev tools{!open && activeLabel ? ` · ${activeLabel}` : ''}
                    </span>
                    <button
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        aria-label={open ? 'Réduire' : 'Ouvrir'}
                        title="⌘⇧D"
                        style={{ ...pressable(false), width: 28, height: 26, padding: 0, fontSize: 15, lineHeight: 1, color: D.ink }}
                    >
                        {open ? '–' : '+'}
                    </button>
                </div>

                {open && (
                    <>
                        {/* Tabs (fixed) */}
                        <div style={{ padding: '0 15px 12px', flex: '0 0 auto' }}>
                            <Segmented value={tab} options={TABS} onChange={setTab} columns={3} />
                        </div>

                        {/* Body (scrolls) */}
                        <div style={{ padding: '0 15px 15px', overflowY: 'auto', flex: '1 1 auto', minHeight: 0 }}>
                            <Card>
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
                                {tab === 'holo' && <HoloTab />}
                                {tab === 'paint' && <PaintTab active={paintActive} onActiveChange={setPaintActive} />}
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

// ----------------------------------------------------------------------------
// Shadow tab
// ----------------------------------------------------------------------------
function ShadowTab({
    active, onSwitch, params, onChange, colorDark, setColorDark, colorMuted, setColorMuted,
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
    const css = `feGaussianBlur stdDeviation=${params.blur} · feOffset dx=${params.dx} dy=${params.dy} · feFlood ${params.floodColor} @ ${params.floodOpacity}`;
    const grayPresets = ['#171717', '#2a2a2a', '#3a3a3a', '#4a4a4a', '#555555', '#6a6a6a', '#7a7a7a', '#9a9a9a'];

    return (
        <>
            <Segmented
                value={active}
                onChange={onSwitch}
                columns={2}
                options={[{ id: 'dark', label: 'Dark (sections)' }, { id: 'light', label: 'Light (héro)' }]}
            />
            <Slider label="Flou (stdDeviation)" min={0} max={6} step={0.1} value={params.blur} onChange={(v) => set('blur', v)} />
            <Slider label="Décalage Y" min={-6} max={10} step={0.5} value={params.dy} onChange={(v) => set('dy', v)} unit="px" />
            <Slider label="Décalage X" min={-6} max={6} step={0.5} value={params.dx} onChange={(v) => set('dx', v)} unit="px" />
            <Slider label="Opacité" min={0} max={1} step={0.01} value={params.floodOpacity} onChange={(v) => set('floodOpacity', v)} />
            <ColorField label="Couleur de l'ombre" value={params.floodColor} onChange={(v) => set('floodColor', v)} />

            <SectionLabel>Couleurs de texte</SectionLabel>
            <ColorField label="Dark (Leonard…)" value={colorDark} onChange={setColorDark} presets={grayPresets} />
            <ColorField label="Muted (qui conçoit…)" value={colorMuted} onChange={setColorMuted} presets={grayPresets} />

            <Readout>{css}</Readout>
        </>
    );
}

// ----------------------------------------------------------------------------
// Notch tab — AgentCard notch geometry
// ----------------------------------------------------------------------------
const CORNER_MARKS: SegOption<CornerStyle>[] = [
    { id: 'cross', glyph: '+', title: 'cross' },
    { id: 'dot', glyph: '●', title: 'dot' },
    { id: 'ring', glyph: '○', title: 'ring' },
    { id: 'bracket', glyph: '⌐', title: 'bracket' },
    { id: 'target', glyph: '◎', title: 'target' },
    { id: 'crosshead', glyph: '⊕', title: 'crosshead' },
    { id: 'square', glyph: '▫', title: 'square' },
    { id: 'screw', glyph: '⊘', title: 'screw' },
    { id: 'none', glyph: '∅', title: 'none' },
];

function NotchTab() {
    const p = useNotchParams();
    const set = (k: keyof NotchParams, v: number) => setNotchParams({ [k]: v });
    const minH = +(2 * p.innerR * 0.7).toFixed(4);
    const topOK = p.topHeight >= minH;
    const botOK = p.bottomHeight >= minH;
    const depthOK = p.depth >= p.innerR + p.outerR;

    return (
        <>
            <SectionLabel>Encoche haut</SectionLabel>
            <Slider label="cy (position)" min={0.05} max={0.95} step={0.005} value={p.topCy} onChange={(v) => set('topCy', v)} />
            <Slider label={`hauteur ${topOK ? '' : '⚠'}`} min={0.005} max={0.15} step={0.001} value={p.topHeight} onChange={(v) => set('topHeight', v)} />

            <SectionLabel>Encoche bas</SectionLabel>
            <Slider label="cy (position)" min={0.05} max={0.95} step={0.005} value={p.bottomCy} onChange={(v) => set('bottomCy', v)} />
            <Slider label={`hauteur ${botOK ? '' : '⚠'}`} min={0.005} max={0.15} step={0.001} value={p.bottomHeight} onChange={(v) => set('bottomHeight', v)} />

            <SectionLabel>Forme (les deux)</SectionLabel>
            <Slider label={`profondeur ${depthOK ? '' : '⚠'}`} min={0.005} max={0.15} step={0.001} value={p.depth} onChange={(v) => set('depth', v)} />
            <Slider label="rayon interne" min={0} max={0.05} step={0.001} value={p.innerR} onChange={(v) => set('innerR', v)} />
            <Slider label="rayon externe" min={0} max={0.05} step={0.001} value={p.outerR} onChange={(v) => set('outerR', v)} />

            <SectionLabel>Marques d'angle</SectionLabel>
            <Segmented value={p.cornerStyle} onChange={(v) => setNotchParams({ cornerStyle: v })} options={CORNER_MARKS} />

            <ResetButton onClick={() => resetNotchParams()} />

            {(!topOK || !botOK || !depthOK) && (
                <Readout tone="warn">
                    {!topOK && <div>⚠ Encoche haut trop courte : hauteur ≥ {minH}</div>}
                    {!botOK && <div>⚠ Encoche bas trop courte : hauteur ≥ {minH}</div>}
                    {!depthOK && <div>⚠ Profondeur ({p.depth}) &lt; interne + externe ({+(p.innerR + p.outerR).toFixed(3)})</div>}
                </Readout>
            )}

            <Readout>
                NOTCHES = [<br />
                &nbsp;&nbsp;{`{ cy: ${p.topCy}, height: ${p.topHeight} }`},<br />
                &nbsp;&nbsp;{`{ cy: ${p.bottomCy}, height: ${p.bottomHeight} }`},<br />
                ]; DEPTH = {p.depth} · INNER_R = {p.innerR} · OUTER_R = {p.outerR}
            </Readout>
        </>
    );
}

// ----------------------------------------------------------------------------
// Illu tab — Vitruvian illustration position + size
// ----------------------------------------------------------------------------
function IlluTab() {
    const p = useVitruveParams();
    const set = (k: keyof VitruveParams, v: number) => setVitruveParams({ [k]: v });
    return (
        <>
            <SectionLabel>Vitruve · taille</SectionLabel>
            <Slider label="largeur (zoom)" min={50} max={300} step={1} value={p.width} onChange={(v) => set('width', v)} unit="px" />

            <SectionLabel>Vitruve · position</SectionLabel>
            <Slider label="haut (vertical)" min={-150} max={50} step={1} value={p.top} onChange={(v) => set('top', v)} unit="px" />
            <Slider label="gauche (horizontal)" min={0} max={100} step={1} value={p.left} onChange={(v) => set('left', v)} unit="%" />

            <SectionLabel>Vitruve · rendu</SectionLabel>
            <Slider label="opacité" min={0} max={1} step={0.01} value={p.opacity} onChange={(v) => set('opacity', v)} />

            <ResetButton onClick={() => resetVitruveParams()} />
            <Readout>width: {p.width} · top: {p.top} · left: {p.left} · opacity: {p.opacity}</Readout>
        </>
    );
}

// ----------------------------------------------------------------------------
// Héro tab — Geist Pixel variant + glow
// ----------------------------------------------------------------------------
const PIXEL_VARIANTS: SegOption<PixelVariant>[] = [
    { id: 'line', label: 'Line', font: 'var(--font-pixel-line)' },
    { id: 'square', label: 'Square', font: 'var(--font-pixel-square)' },
    { id: 'grid', label: 'Grid', font: 'var(--font-pixel-grid)' },
    { id: 'circle', label: 'Circle', font: 'var(--font-pixel-circle)' },
    { id: 'triangle', label: 'Triangle', font: 'var(--font-pixel-triangle)' },
];

function HeroTab() {
    const p = useHeroTitleParams();
    return (
        <>
            <SectionLabel>Variante Geist Pixel</SectionLabel>
            <Segmented value={p.variant} onChange={(v) => setHeroTitleParams({ variant: v })} options={PIXEL_VARIANTS} columns={3} />
            <Slider label="Glow" min={0} max={48} step={1} value={p.glow} onChange={(v) => setHeroTitleParams({ glow: v })} unit="px" />
            <ColorField label="Couleur du glow" value={p.glowColor} onChange={(v) => setHeroTitleParams({ glowColor: v })} />
            <ResetButton onClick={() => resetHeroTitleParams()} />
        </>
    );
}

// ----------------------------------------------------------------------------
// Holo tab — carte reverse-holo (motif logo + foil + reflet)
// ----------------------------------------------------------------------------
const FOIL_OPTS: SegOption<FoilKind>[] = [
    { id: 'rainbow', label: 'Irisé' },
    { id: 'silver', label: 'Argent' },
    { id: 'gold', label: 'Or' },
];
const WINDOW_EFFECTS: SegOption<WindowEffect>[] = [
    { id: 'holo', label: 'Holo' },
    { id: 'rainbow', label: 'Rainbow' },
    { id: 'radiant', label: 'Radiant' },
    { id: 'glitter', label: 'Glitter' },
    { id: 'amazing', label: 'Amazing' },
    { id: 'empreinte', label: 'Empreinte' },
    { id: 'sheen', label: 'Sheen' },
];

function HoloTab() {
    const p = useHoloParams();
    return (
        <>
            <SectionLabel>Foil</SectionLabel>
            <Segmented value={p.foil} onChange={(v) => setHoloParams({ foil: v })} options={FOIL_OPTS} columns={3} />

            <SectionLabel>Reflet</SectionLabel>
            <Slider label="Intensité du foil" min={0} max={1} step={0.01} value={p.foilStrength} onChange={(v) => setHoloParams({ foilStrength: v })} />
            <Slider label="Reflet lumineux" min={0} max={1} step={0.01} value={p.glareStrength} onChange={(v) => setHoloParams({ glareStrength: v })} />
            <Slider label="Saturation" min={1} max={3} step={0.05} value={p.saturation} onChange={(v) => setHoloParams({ saturation: v })} />

            <SectionLabel>Motif logo</SectionLabel>
            <Slider label="Taille du motif" min={10} max={120} step={1} value={p.motifSize} onChange={(v) => setHoloParams({ motifSize: v })} unit="px" />
            <Slider label="Espace entre motifs" min={0} max={120} step={1} value={p.motifSpace} onChange={(v) => setHoloParams({ motifSpace: v })} unit="px" />

            <SectionLabel>Mouvement</SectionLabel>
            <Slider label="Inclinaison" min={0} max={16} step={0.5} value={p.tilt} onChange={(v) => setHoloParams({ tilt: v })} unit="°" />

            <SectionLabel>Zone illustration (fenêtre image)</SectionLabel>
            <Toggle active={p.splitWindow} onChange={(v) => setHoloParams({ splitWindow: v })} label="Holo séparé dans l'illustration" />
            <Segmented value={p.windowEffect} onChange={(v) => setHoloParams({ windowEffect: v })} options={WINDOW_EFFECTS} columns={3} />
            <Segmented value={p.windowFoil} onChange={(v) => setHoloParams({ windowFoil: v })} options={FOIL_OPTS} columns={3} />
            <Slider label="Reflet illustration" min={0} max={1} step={0.01} value={p.windowStrength} onChange={(v) => setHoloParams({ windowStrength: v })} />

            <ResetButton onClick={() => resetHoloParams()} />
        </>
    );
}

// ----------------------------------------------------------------------------
// Vortex tab — bead-vortex generator
// ----------------------------------------------------------------------------
const VORTEX_SECTION_OPTS: SegOption<VortexSectionId>[] = VORTEX_SECTIONS.map((s) => ({ id: s.id, label: s.label }));
const VORTEX_SHAPES: SegOption<VortexShape>[] = [
    { id: 'spiral', label: 'Spirale' },
    { id: 'phyllo', label: 'Tournesol' },
    { id: 'rings', label: 'Anneaux' },
    { id: 'radial', label: 'Radial' },
    { id: 'rose', label: 'Rosace' },
    { id: 'lissajous', label: 'Lissajous' },
    { id: 'scatter', label: 'Nuage' },
];
const VORTEX_COLORS: SegOption<VortexColorMode>[] = [
    { id: 'image', label: 'Image' },
    { id: 'radial', label: 'Radial' },
    { id: 'solid', label: 'Couleur' },
];

function VortexTab() {
    const [section, setSection] = useState<VortexSectionId>('expertises');
    const p = useVortexParams(section);
    const set = (next: Partial<VortexParams>) => setVortexParams(section, next);
    return (
        <>
            <SectionLabel>Section</SectionLabel>
            <Segmented value={section} onChange={setSection} options={VORTEX_SECTION_OPTS} columns={2} />

            <SectionLabel>Algorithme</SectionLabel>
            <Segmented value={p.shape} onChange={(v) => set({ shape: v })} options={VORTEX_SHAPES} columns={2} />

            <SectionLabel>Forme</SectionLabel>
            <Slider label="Bras / anneaux / pétales" min={1} max={12} step={1} value={p.arms} onChange={(v) => set({ arms: v })} />
            <Slider label="Beads" min={3} max={96} step={1} value={p.count} onChange={(v) => set({ count: v })} />
            <Slider label="Épaisseur des bras" min={1} max={6} step={1} value={p.thickness} onChange={(v) => set({ thickness: v })} />
            <Slider label="Tours / fréq. b" min={0.5} max={5} step={0.1} value={p.turns} onChange={(v) => set({ turns: v })} />
            <Slider label="Rayon de départ" min={0} max={160} step={4} value={p.startRadius} onChange={(v) => set({ startRadius: v })} unit="px" />
            <Slider label="Croissance" min={1} max={14} step={0.5} value={p.growth} onChange={(v) => set({ growth: v })} unit="×" />
            <Slider label="Rotation" min={0} max={360} step={5} value={p.rotation} onChange={(v) => set({ rotation: v })} unit="°" />

            <SectionLabel>Beads</SectionLabel>
            <Slider label="Taille bead" min={6} max={48} step={6} value={p.beadSize} onChange={(v) => set({ beadSize: v })} unit="px" />
            <Slider label="Snap grille" min={0} max={48} step={12} value={p.snap} onChange={(v) => set({ snap: v })} unit="px" />

            <SectionLabel>Couleur</SectionLabel>
            <Segmented value={p.colorMode} onChange={(v) => set({ colorMode: v })} options={VORTEX_COLORS} columns={3} />
            {p.colorMode === 'solid' && <ColorField label="Couleur unie" value={p.color} onChange={(v) => set({ color: v })} />}
            {p.colorMode === 'radial' && (
                <>
                    <div style={{ marginTop: 8 }}>
                        <Segmented
                            value={p.radialInvert ? 'inv' : 'std'}
                            onChange={(v) => set({ radialInvert: v === 'inv' })}
                            columns={2}
                            options={[{ id: 'std', label: 'Centre = fleurs' }, { id: 'inv', label: 'Centre = ciel' }]}
                        />
                    </div>
                    <div style={{ color: D.faint, fontSize: 11, marginTop: 8, lineHeight: 1.4 }}>
                        {p.radialInvert
                            ? 'Près du centre = haut de l\'image (ciel), loin = bas (fleurs).'
                            : 'Près du centre = bas de l\'image (fleurs), loin = haut (ciel).'}
                    </div>
                </>
            )}

            <ResetButton onClick={() => resetVortexParams(section)} />
        </>
    );
}

// ----------------------------------------------------------------------------
// Paint tab
// ----------------------------------------------------------------------------
function PaintTab({ active, onActiveChange }: { active: boolean; onActiveChange: (a: boolean) => void }) {
    return (
        <div style={{ color: D.muted, fontSize: 12, lineHeight: 1.5 }}>
            <Toggle
                active={active}
                onChange={onActiveChange}
                label="Démarrer le mode peinture (⌘P)"
                activeLabel="● Mode peinture actif · cliquer pour arrêter"
            />
            <p style={{ marginTop: 10, color: D.faint, fontSize: 11 }}>
                Les contrôles de peinture (source, outils, export) apparaissent dans un panneau séparé quand le mode est actif.
            </p>
        </div>
    );
}
