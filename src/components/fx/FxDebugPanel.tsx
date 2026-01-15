/**
 * FxDebugPanel - Debug UI for tuning FX parameters
 * Only visible when ?fxdebug=1 or localStorage.FX_DEBUG === '1'
 */

import { useState } from 'react';
import type { FxConfig, InteractionConfig, AutoInteractionConfig, RainConfig } from './fxConfig';
import { useFxDebug } from './FxContext';

interface FxDebugPanelProps {
    onConfigChange?: (config: FxConfig) => void;
}

function isDebugEnabled(): boolean {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('fxdebug') === '1' || localStorage.getItem('FX_DEBUG') === '1';
}

export function FxDebugPanel({ onConfigChange }: FxDebugPanelProps) {
    const [isVisible, setIsVisible] = useState(isDebugEnabled);
    const { config, updateConfig: contextUpdateConfig } = useFxDebug();
    const [copied, setCopied] = useState(false);

    const updateConfig = (updates: Partial<FxConfig>) => {
        contextUpdateConfig(updates);
        onConfigChange?.({ ...config, ...updates });
    };

    const updateBeads = (updates: Partial<FxConfig['beads']>) => {
        updateConfig({ beads: { ...config.beads, ...updates } });
    };

    const updateDuotone = (updates: Partial<FxConfig['duotone']>) => {
        updateConfig({ duotone: { ...config.duotone, ...updates } });
    };

    const updateHover = (updates: Partial<FxConfig['hover']>) => {
        updateConfig({ hover: { ...config.hover, ...updates } });
    };

    const updateInteraction = (updates: Partial<FxConfig['interaction']>) => {
        updateConfig({ interaction: { ...config.interaction, ...updates } });
    };

    const updateGlassBeads = (updates: Partial<FxConfig['glassBeads']>) => {
        updateConfig({ glassBeads: { ...config.glassBeads, ...updates } });
    };

    const copyToClipboard = () => {
        const jsonConfig = JSON.stringify(config, null, 2);
        navigator.clipboard.writeText(jsonConfig);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    const moveOrder = (index: number, direction: 'up' | 'down') => {
        const newOrder = [...(config.order || ['beads', 'glassBeads', 'duotone'])];
        if (direction === 'up' && index > 0) {
            [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
        } else if (direction === 'down' && index < newOrder.length - 1) {
            [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        }
        updateConfig({ order: newOrder });
    };



    // If debug is not enabled via URL/Storage, generally render nothing.
    // BUT we want to allow re-opening if it was closed.
    // So we need to track if "debug mode" itself is authorized.
    const isAuthorized = isDebugEnabled();

    if (!isAuthorized) return null;

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                style={styles.reopenBtn}
                title="Open FX Debug"
            >
                FX
            </button>
        );
    }

    return (
        <div style={styles.panel}>
            <div style={styles.header}>
                <span style={styles.title}>FX Debug</span>
                <button style={styles.closeBtn} onClick={() => setIsVisible(false)}>×</button>
            </div>

            {/* Global Toggle */}
            <div style={styles.section}>
                <label style={styles.row}>
                    <input
                        type="checkbox"
                        checked={config.enabled}
                        onChange={e => updateConfig({ enabled: e.target.checked })}
                    />
                    <span>Effects Enabled</span>
                </label>
            </div>

            {/* --- Interactive Cursor (Moved Up) --- */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>Interactive Cursor</div>

                <label style={styles.row}>
                    <input
                        type="checkbox"
                        checked={config.interaction?.enabled ?? true}
                        onChange={e => updateInteraction({ enabled: e.target.checked })}
                    />
                    <span>Enabled</span>
                </label>

                <div style={styles.row}>
                    <span>Mode</span>
                    <select
                        value={config.interaction?.mode ?? 'shape'}
                        onChange={e => updateInteraction({ mode: e.target.value as InteractionConfig['mode'] })}
                        style={styles.select}
                    >
                        <option value="none">None</option>
                        <option value="reveal">Revelator</option>
                        <option value="shape">Shape Shift</option>
                    </select>
                </div>

                {config.interaction?.mode === 'shape' && (
                    <>
                        <div style={styles.row}>
                            <span>Variant</span>
                            <select
                                value={config.interaction?.variant ?? 'overlap'}
                                onChange={e => updateInteraction({ variant: e.target.value as 'overlap' | 'push' })}
                                style={styles.select}
                            >
                                <option value="overlap">Overlap (3D Z)</option>
                                <option value="push">Push (Lens)</option>
                            </select>
                        </div>

                        <div style={styles.row}>
                            <span>Active Size: {(config.interaction?.activeSize ?? 12)}px</span>
                            <input
                                type="range"
                                min="2"
                                max="60"
                                step="1"
                                value={config.interaction?.activeSize ?? 12}
                                onChange={e => updateInteraction({ activeSize: Number(e.target.value) })}
                                style={styles.slider}
                            />
                        </div>
                    </>
                )}

                <div style={styles.row}>
                    <span>Radius: {(config.interaction?.radius ?? 0.15).toFixed(2)}</span>
                    <input
                        type="range"
                        min="0.05"
                        max="0.5"
                        step="0.01"
                        value={config.interaction?.radius ?? 0.15}
                        onChange={e => updateInteraction({ radius: Number(e.target.value) })}
                        style={styles.slider}
                    />
                </div>

                <div style={styles.row}>
                    <span>Softness: {(config.interaction?.softness ?? 0.5).toFixed(2)}</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={config.interaction?.softness ?? 0.5}
                        onChange={e => updateInteraction({ softness: Number(e.target.value) })}
                        style={styles.slider}
                    />
                </div>

                <div style={{ ...styles.row, marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#60a5fa' }}>
                        <input
                            type="checkbox"
                            checked={config.interaction?.auto?.enabled ?? false}
                            onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto || { type: 'wave', speed: 0.5, strength: 0.5 }) as AutoInteractionConfig, enabled: e.target.checked ?? false } })}
                        />
                        <span>Automated (Wave/Noise)</span>
                    </label>
                </div>

                {config.interaction?.auto?.enabled && (
                    <div style={{ paddingLeft: '8px', borderLeft: '2px solid #60a5fa' }}>
                        <div style={styles.row}>
                            <span>Type</span>
                            <select
                                value={config.interaction?.auto?.type ?? 'wave'}
                                onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto || { enabled: true, speed: 0.5, strength: 0.5 }) as AutoInteractionConfig, type: e.target.value as AutoInteractionConfig['type'] } })}
                                style={styles.select}
                            >
                                <option value="wave">Wave</option>
                                <option value="noise">Noise</option>
                                <option value="pulse">Pulse</option>
                                <option value="spiral">Spiral</option>
                                <option value="glitch">Pixel Sort (Glitch)</option>
                                <option value="net">Constellation (Net)</option>
                                <option value="liquid">Liquid (Organic)</option>
                                <option value="circuit">Circuit (Tech)</option>
                                <option value="matrix">Matrix (Data)</option>
                                <option value="scanline">Scanline (Holo)</option>
                                <option value="aurora">Aurora (Cosmic)</option>
                                <option value="solar">Solar (Plasma)</option>
                                <option value="hex">Hex (Cyber)</option>
                                <option value="blueprint">Blueprint (Schematic)</option>
                                <option value="stream">Stream (High Speed)</option>
                                <option value="rain">🌧️ Rain + Ripple (3D)</option>
                            </select>
                        </div>
                        <div style={styles.row}>
                            <span>Speed: {(config.interaction?.auto?.speed ?? 0.5).toFixed(2)}</span>
                            <input
                                type="range"
                                min="0.1"
                                max="2.0"
                                step="0.1"
                                value={config.interaction?.auto?.speed ?? 0.5}
                                onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), speed: Number(e.target.value) } })}
                                style={styles.slider}
                            />
                        </div>
                        <div style={styles.row}>
                            <span>Scale: {(config.interaction?.auto?.scale ?? 1.0).toFixed(1)}</span>
                            <input
                                type="range"
                                min="0.1"
                                max="5.0"
                                step="0.1"
                                value={config.interaction?.auto?.scale ?? 1.0}
                                onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), scale: Number(e.target.value) } })}
                                style={styles.slider}
                            />
                        </div>
                        <div style={styles.row}>
                            <span>Strength: {(config.interaction?.auto?.strength ?? 0.5).toFixed(2)}</span>
                            <input
                                type="range"
                                min="0.0"
                                max="1.0"
                                step="0.05"
                                value={config.interaction?.auto?.strength ?? 0.5}
                                onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), strength: Number(e.target.value) } })}
                                style={styles.slider}
                            />
                        </div>

                        <div style={styles.row}>
                            <span>Depth Speed: {(config.interaction?.auto?.depthSpeed ?? 3.0).toFixed(1)}</span>
                            <input
                                type="range"
                                min="0.0"
                                max="10.0"
                                step="0.5"
                                value={config.interaction?.auto?.depthSpeed ?? 3.0}
                                onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), depthSpeed: Number(e.target.value) } })}
                                style={styles.slider}
                            />
                        </div>
                        <div style={styles.row}>
                            <span>Depth Bright: {(config.interaction?.auto?.depthBrightness ?? 0.8).toFixed(2)}</span>
                            <input
                                type="range"
                                min="0.0"
                                max="2.0"
                                step="0.1"
                                value={config.interaction?.auto?.depthBrightness ?? 0.8}
                                onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), depthBrightness: Number(e.target.value) } })}
                                style={styles.slider}
                            />
                        </div>
                        <div style={{ ...styles.row, marginTop: '8px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#60a5fa' }}>
                                <input
                                    type="checkbox"
                                    checked={config.interaction?.auto?.duotoneModulation ?? false}
                                    onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), duotoneModulation: e.target.checked } })}
                                />
                                <span>Tint on FX</span>
                            </label>
                            {config.interaction?.auto?.duotoneModulation && (
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <input
                                        type="color"
                                        title="Shadow Color"
                                        value={config.interaction?.auto?.modulationColor || '#60a5fa'}
                                        onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), modulationColor: e.target.value } })}
                                        style={{ width: '24px', height: '24px', border: 'none', background: 'none', cursor: 'pointer' }}
                                    />
                                    <input
                                        type="color"
                                        title="Highlight Color"
                                        value={config.interaction?.auto?.modulationColor2 || config.interaction?.auto?.modulationColor || '#60a5fa'}
                                        onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), modulationColor2: e.target.value } })}
                                        style={{ width: '24px', height: '24px', border: 'none', background: 'none', cursor: 'pointer' }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Rain-specific controls */}
                        {config.interaction?.auto?.type === 'rain' && (
                            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontSize: '11px', color: '#60a5fa', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🌧️ Rain Settings</div>

                                <div style={styles.row}>
                                    <span>Drop Speed: {(config.interaction?.auto?.rain?.dropSpeed ?? 0.5).toFixed(2)}</span>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="2.0"
                                        step="0.1"
                                        value={config.interaction?.auto?.rain?.dropSpeed ?? 0.5}
                                        onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), rain: { ...(config.interaction?.auto?.rain || { dropSpeed: 0.5, density: 20, surfaceDepth: 0.5, rippleSpeed: 0.5, rippleDecay: 3, rippleStrength: 0.8 }) as RainConfig, dropSpeed: Number(e.target.value) } } })}
                                        style={styles.slider}
                                    />
                                </div>

                                <div style={styles.row}>
                                    <span>Density: {Math.round(config.interaction?.auto?.rain?.density ?? 20)}</span>
                                    <input
                                        type="range"
                                        min="5"
                                        max="50"
                                        step="1"
                                        value={config.interaction?.auto?.rain?.density ?? 20}
                                        onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), rain: { ...(config.interaction?.auto?.rain || { dropSpeed: 0.5, density: 20, surfaceDepth: 0.5, rippleSpeed: 0.5, rippleDecay: 3, rippleStrength: 0.8 }) as RainConfig, density: Number(e.target.value) } } })}
                                        style={styles.slider}
                                    />
                                </div>

                                <div style={styles.row}>
                                    <span>Surface Depth: {(config.interaction?.auto?.rain?.surfaceDepth ?? 0.5).toFixed(2)}</span>
                                    <input
                                        type="range"
                                        min="0.0"
                                        max="1.0"
                                        step="0.05"
                                        value={config.interaction?.auto?.rain?.surfaceDepth ?? 0.5}
                                        onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), rain: { ...(config.interaction?.auto?.rain || { dropSpeed: 0.5, density: 20, surfaceDepth: 0.5, rippleSpeed: 0.5, rippleDecay: 3, rippleStrength: 0.8 }) as RainConfig, surfaceDepth: Number(e.target.value) } } })}
                                        style={styles.slider}
                                    />
                                </div>

                                <div style={{ fontSize: '11px', color: '#60a5fa', marginTop: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💧 Ripple Settings</div>

                                <div style={styles.row}>
                                    <span>Ripple Speed: {(config.interaction?.auto?.rain?.rippleSpeed ?? 0.5).toFixed(2)}</span>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="2.0"
                                        step="0.1"
                                        value={config.interaction?.auto?.rain?.rippleSpeed ?? 0.5}
                                        onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), rain: { ...(config.interaction?.auto?.rain || { dropSpeed: 0.5, density: 20, surfaceDepth: 0.5, rippleSpeed: 0.5, rippleDecay: 3, rippleStrength: 0.8 }) as RainConfig, rippleSpeed: Number(e.target.value) } } })}
                                        style={styles.slider}
                                    />
                                </div>

                                <div style={styles.row}>
                                    <span>Ripple Decay: {(config.interaction?.auto?.rain?.rippleDecay ?? 3.0).toFixed(1)}</span>
                                    <input
                                        type="range"
                                        min="1.0"
                                        max="10.0"
                                        step="0.5"
                                        value={config.interaction?.auto?.rain?.rippleDecay ?? 3.0}
                                        onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), rain: { ...(config.interaction?.auto?.rain || { dropSpeed: 0.5, density: 20, surfaceDepth: 0.5, rippleSpeed: 0.5, rippleDecay: 3, rippleStrength: 0.8 }) as RainConfig, rippleDecay: Number(e.target.value) } } })}
                                        style={styles.slider}
                                    />
                                </div>

                                <div style={styles.row}>
                                    <span>Ripple Strength: {(config.interaction?.auto?.rain?.rippleStrength ?? 0.8).toFixed(2)}</span>
                                    <input
                                        type="range"
                                        min="0.0"
                                        max="1.0"
                                        step="0.05"
                                        value={config.interaction?.auto?.rain?.rippleStrength ?? 0.8}
                                        onChange={e => updateInteraction({ auto: { ...(config.interaction?.auto as AutoInteractionConfig), rain: { ...(config.interaction?.auto?.rain || { dropSpeed: 0.5, density: 20, surfaceDepth: 0.5, rippleSpeed: 0.5, rippleDecay: 3, rippleStrength: 0.8 }) as RainConfig, rippleStrength: Number(e.target.value) } } })}
                                        style={styles.slider}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Glass Beads Section */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>Glass Beads</div>

                <label style={styles.row}>
                    <input
                        type="checkbox"
                        checked={config.glassBeads?.enabled ?? false}
                        onChange={e => updateGlassBeads({ enabled: e.target.checked })}
                    />
                    <span>Enabled</span>
                </label>

                <div style={styles.row}>
                    <span>Shape</span>
                    <select
                        value={config.glassBeads?.shape ?? 'circle'}
                        onChange={e => updateGlassBeads({ shape: e.target.value as 'circle' | 'square' })}
                        style={styles.select}
                    >
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                    </select>
                </div>

                <div style={styles.row}>
                    <span>Size (px): {config.glassBeads?.sizePx ?? 20}</span>
                    <input
                        type="range"
                        min="2"
                        max="60"
                        value={config.glassBeads?.sizePx ?? 20}
                        onChange={e => updateGlassBeads({ sizePx: Number(e.target.value) })}
                        style={styles.slider}
                    />
                </div>

                <div style={styles.row}>
                    <span>Softness: {(config.glassBeads?.softness ?? 0.2).toFixed(2)}</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={config.glassBeads?.softness ?? 0.2}
                        onChange={e => updateGlassBeads({ softness: Number(e.target.value) })}
                        style={styles.slider}
                    />
                </div>

                <div style={styles.row}>
                    <span>Strength: {(config.glassBeads?.strength ?? 0.5).toFixed(2)}</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={config.glassBeads?.strength ?? 0.5}
                        onChange={e => updateGlassBeads({ strength: Number(e.target.value) })}
                        style={styles.slider}
                    />
                </div>
            </div>

            {/* Layer Order */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>Layer Order</div>
                {(config.order || ['beads', 'glassBeads', 'duotone']).map((id, index) => (
                    <div key={id} style={styles.row}>
                        <span style={{ textTransform: 'capitalize', fontSize: '13px' }}>
                            {index + 1}. {id === 'glassBeads' ? 'Glass Beads' : id}
                        </span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                                onClick={() => moveOrder(index, 'up')}
                                disabled={index === 0}
                                style={{ ...styles.moveBtn, opacity: index === 0 ? 0.3 : 1 }}
                            >↑</button>
                            <button
                                onClick={() => moveOrder(index, 'down')}
                                disabled={index === 2}
                                style={{ ...styles.moveBtn, opacity: index === 2 ? 0.3 : 1 }}
                            >↓</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Hero Background --- */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>Hero Background</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {[
                        { label: 'v1 (Original)', value: '/assets/hero_background.webp' },
                        { label: 'v2 (Flowers)', value: '/assets/hero_background_v2.jpg' },
                        { label: 'v3 (Lines)', value: '/assets/hero_background_v3.png' },
                        { label: 'v4 (Gold)', value: '/assets/hero_background_v4.jpg' },
                        { label: 'v5 (Mountains)', value: '/assets/mountains.png' },
                    ].map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => updateConfig({ heroImage: opt.value })}
                            style={{
                                ...styles.button,
                                background: config.heroImage === opt.value ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                                border: config.heroImage === opt.value ? '1px solid #60a5fa' : '1px solid transparent',
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hover Duotone Section */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>Hover Duotone</div>
                <label style={styles.row}>
                    <input
                        type="checkbox"
                        checked={config.hover.duotoneEnabled ?? false}
                        onChange={e => updateHover({ duotoneEnabled: e.target.checked })}
                    />
                    <span>Enable Hover Tint</span>
                </label>

                {config.hover.duotoneEnabled && (
                    <>
                        <div style={styles.row}>
                            <span>Hover Shadow</span>
                            <input
                                type="color"
                                value={config.hover.colorA || '#ff0000'}
                                onChange={e => updateHover({ colorA: e.target.value })}
                                style={styles.colorPicker}
                            />
                        </div>
                        <div style={styles.row}>
                            <span>Hover Highlight</span>
                            <input
                                type="color"
                                value={config.hover.colorB || '#ffff00'}
                                onChange={e => updateHover({ colorB: e.target.value })}
                                style={styles.colorPicker}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Beads Section */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>Pixel Beads</div>

                <label style={styles.row}>
                    <input
                        type="checkbox"
                        checked={config.beads.enabled}
                        onChange={e => updateBeads({ enabled: e.target.checked })}
                    />
                    <span>Enabled</span>
                </label>

                <div style={styles.row}>
                    <span>Shape</span>
                    <select
                        value={config.beads.shape}
                        onChange={e => updateBeads({ shape: e.target.value as 'circle' | 'square' })}
                        style={styles.select}
                    >
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                    </select>
                </div>

                <div style={styles.row}>
                    <span>Size (px): {config.beads.sizePx}</span>
                    <input
                        type="range"
                        min="2"
                        max="30"
                        value={config.beads.sizePx}
                        onChange={e => updateBeads({ sizePx: Number(e.target.value) })}
                        style={styles.slider}
                    />
                </div>
            </div>



            {/* Duotone Section */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>Duotone</div>

                <label style={styles.row}>
                    <input
                        type="checkbox"
                        checked={config.duotone.enabled}
                        onChange={e => updateDuotone({ enabled: e.target.checked })}
                    />
                    <span>Enabled</span>
                </label>

                <div style={styles.row}>
                    <span>Shadow</span>
                    <input
                        type="color"
                        value={config.duotone.colorA}
                        onChange={e => updateDuotone({ colorA: e.target.value })}
                        style={styles.colorPicker}
                    />
                </div>

                <div style={styles.row}>
                    <span>Highlight</span>
                    <input
                        type="color"
                        value={config.duotone.colorB}
                        onChange={e => updateDuotone({ colorB: e.target.value })}
                        style={styles.colorPicker}
                    />
                </div>

                <div style={styles.row}>
                    <span>Strength: {config.duotone.strength.toFixed(2)}</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={config.duotone.strength}
                        onChange={e => updateDuotone({ strength: Number(e.target.value) })}
                        style={styles.slider}
                    />
                </div>
            </div>

            {/* Export Button */}
            <button onClick={copyToClipboard} style={styles.exportBtn}>
                {copied ? '✓ Copied!' : 'Copy JSON Config'}
            </button>
        </div >
    );
}

const styles: Record<string, React.CSSProperties> = {
    panel: {
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '340px',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '24px',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        color: '#e5e5e5',
        zIndex: 9999,
        maxHeight: '85vh',
        overflowY: 'auto',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '12px',
    },
    title: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#fff',
        letterSpacing: '-0.02em',
    },
    closeBtn: {
        background: 'rgba(255,255,255,0.1)',
        border: 'none',
        color: '#fff',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    section: {
        marginBottom: '24px',
        padding: '16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: '16px',
        color: '#9ca3af',
        textTransform: 'uppercase',
        fontSize: '11px',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        gap: '12px',
    },
    slider: {
        width: '120px',
        cursor: 'pointer',
        height: '4px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '2px',
        appearance: 'none',
    },
    select: {
        background: '#171717',
        color: '#e5e5e5',
        border: '1px solid #404040',
        borderRadius: '8px',
        padding: '6px 12px',
        fontSize: '13px',
        minWidth: '100px',
        cursor: 'pointer',
    },
    colorPicker: {
        width: '48px',
        height: '32px',
        padding: '2px',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '6px',
        cursor: 'pointer',
        background: 'transparent',
    },
    exportBtn: {
        width: '100%',
        padding: '14px',
        background: '#fff',
        color: '#000',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'transform 0.1s',
        marginTop: '8px',
    },
    moveBtn: {
        background: 'rgba(255,255,255,0.1)',
        border: 'none',
        color: '#fff',
        borderRadius: '4px',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    button: {
        padding: '8px 12px',
        border: '1px solid transparent',
        borderRadius: '8px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '13px',
        transition: 'all 0.2s',
        textAlign: 'left',
    },
    reopenBtn: {
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(10, 10, 10, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    },
};

export default FxDebugPanel;
