/**
 * LAB - Page de Test des Effets Hero
 * 
 * Page isolée permettant de tester toutes les interactions souris et effets automatiques
 * proposés par les experts UX/Motion.
 * 
 * IMPORTANT: Ce fichier peut être supprimé une fois les tests terminés.
 * Tout le dossier src/lab/ est isolé du reste du site.
 */

import { useState, useMemo, useRef } from 'react';
import { FxProvider } from '../components/fx/FxProvider';
import { FxImage } from '../components/fx/FxImage';
import type { InteractionConfig, AutoInteractionConfig } from '../components/fx/fxConfig';

// ============================================
// PRESETS DES 3 EXPERTS
// ============================================

type PresetKey = 'mel_conseil' | 'current' | 'eveil_neural' | 'surface_vivante' | 'pluie_digitale' | 'custom';

interface Preset {
    name: string;
    author: string;
    description: string;
    config: InteractionConfig;
}

const PRESETS: Record<Exclude<PresetKey, 'custom'>, Preset> = {
    mel_conseil: {
        name: "⭐ Mel Conseil",
        author: "Ton choix",
        description: "Matrix bleu coloré + zoom souris sans coloration",
        config: {
            enabled: true,
            mode: 'shape',
            variant: 'push',
            radius: 0.15,       // Petit rayon 
            softness: 0.5,      // Transition douce
            activeSize: 15,     // Zoom significatif au survol
            auto: {
                enabled: true,               // Animation matrix activée
                type: 'matrix',
                speed: 0.1,
                strength: 1,
                scale: 1.5,
                duotoneModulation: true,     // Matrix coloré en bleu
                modulationColor: '#001133',  // Ombre bleu foncé
                modulationColor2: '#0066ff', // Highlight bleu vif
                useLuminanceAsDepth: true
            }
        }
    },
    current: {
        name: "Configuration Actuelle",
        author: "Production",
        description: "L'effet actuellement en place sur le site",
        config: {
            enabled: true,
            mode: 'shape',
            variant: 'push',
            radius: 0.3,
            softness: 0,
            activeSize: 10
        }
    },
    eveil_neural: {
        name: "L'Éveil Neural",
        author: "Kenji Nakamura",
        description: "L'intelligence s'éveille au contact de l'humain - flux de données tech avec beads qui grandissent",
        config: {
            enabled: true,
            mode: 'shape',
            variant: 'overlap',
            radius: 0.25,
            softness: 0.8,
            activeSize: 18,
            auto: {
                enabled: true,
                type: 'circuit',
                speed: 0.2,
                strength: 0.4,
                scale: 1.5,
                duotoneModulation: true,
                modulationColor: '#0a0a0a',
                modulationColor2: '#10b981',
                useLuminanceAsDepth: true
            }
        }
    },
    surface_vivante: {
        name: "La Surface Vivante",
        author: "Sofia Marchetti",
        description: "Une technologie réactive et humaine - ondulations liquides avec révélation progressive",
        config: {
            enabled: true,
            mode: 'reveal',
            variant: 'overlap',
            radius: 0.2,
            softness: 0.6,
            activeSize: 8,
            auto: {
                enabled: true,
                type: 'liquid',
                speed: 0.15,
                strength: 0.3,
                scale: 2.0,
                duotoneModulation: false
            }
        }
    },
    pluie_digitale: {
        name: "Pluie Digitale",
        author: "Kenji + Sofia",
        description: "L'interface entre deux mondes - pluie + ripples 3D sur une vitre virtuelle",
        config: {
            enabled: true,
            mode: 'shape',
            variant: 'push',
            radius: 0.15,
            softness: 0.5,
            activeSize: 15,
            auto: {
                enabled: true,
                type: 'rain',
                speed: 0.3,
                strength: 0.6,
                scale: 1.0,
                useLuminanceAsDepth: true,
                rain: {
                    dropSpeed: 0.4,
                    density: 25,
                    surfaceDepth: 0.7,
                    rippleSpeed: 0.6,
                    rippleDecay: 4.0,
                    rippleStrength: 0.5
                }
            }
        }
    }
};

// Liste des effets auto disponibles
const AUTO_EFFECTS: AutoInteractionConfig['type'][] = [
    'wave', 'noise', 'pulse', 'spiral', 'glitch', 'net', 'liquid',
    'circuit', 'matrix', 'scanline', 'aurora', 'solar', 'hex',
    'blueprint', 'stream', 'rain'
];

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export function LabPage() {
    // Preset sélectionné
    const [selectedPreset, setSelectedPreset] = useState<PresetKey>('mel_conseil');

    // Configuration custom (modifiable)
    const [customConfig, setCustomConfig] = useState<InteractionConfig>(PRESETS.mel_conseil.config);

    // Image héro sélectionnée
    const [heroImage, setHeroImage] = useState('/assets/hero-concepts/hero%2014.png');

    // Ref pour la zone de preview
    const previewRef = useRef<HTMLDivElement>(null);

    // Configuration fusionnée
    const activeConfig = useMemo(() => {
        if (selectedPreset === 'custom') {
            return customConfig;
        }
        return PRESETS[selectedPreset].config;
    }, [selectedPreset, customConfig]);

    // Handlers pour les contrôles custom
    const updateCustom = (updates: Partial<InteractionConfig>) => {
        setCustomConfig(prev => ({ ...prev, ...updates }));
        setSelectedPreset('custom');
    };

    const updateAutoConfig = (updates: Partial<AutoInteractionConfig>) => {
        setCustomConfig(prev => ({
            ...prev,
            auto: { ...prev.auto, ...updates } as AutoInteractionConfig
        }));
        setSelectedPreset('custom');
    };

    // Copier dans le presse-papier
    const copyConfig = () => {
        const configStr = JSON.stringify(activeConfig, null, 2);
        navigator.clipboard.writeText(configStr);
        alert('Configuration copiée !');
    };

    return (
        <FxProvider>
            <div className="lab-container">
                {/* Header */}
                <header className="lab-header">
                    <h1>🧪 LAB - Test des Effets Hero</h1>
                    <p>Testez les propositions des experts UX/Motion</p>
                    <a href="/" className="lab-back-link">← Retour au site</a>
                </header>

                <div className="lab-content">
                    {/* Zone de prévisualisation */}
                    <div className="lab-preview">
                        <div
                            ref={previewRef}
                            className="lab-preview-container"
                            style={{ position: 'relative' }}
                        >
                            <FxImage
                                src={heroImage}
                                alt="Test Hero"
                                className="lab-preview-image"
                                style={{ width: '100%', height: '100%' }}
                                imgStyle={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center center'
                                }}
                                config={{
                                    fitMode: 'height', // Affiche l'image entière
                                    beads: {
                                        enabled: true,
                                        shape: 'circle',
                                        sizePx: 10,
                                        softness: 0.2,
                                        strength: 1
                                    },
                                    duotone: {
                                        enabled: false,
                                        colorA: '#000000',
                                        colorB: '#ffffff',
                                        strength: 0
                                    },
                                    interaction: activeConfig
                                }}
                            />
                        </div>
                        <p className="lab-hint">👆 Survolez l'image pour tester le zoom</p>
                    </div>

                    {/* Panneau de contrôle */}
                    <div className="lab-controls">
                        {/* Sélecteur de preset */}
                        <section className="lab-section">
                            <h2>🎨 Presets des Experts</h2>
                            <div className="lab-presets">
                                {(Object.entries(PRESETS) as [Exclude<PresetKey, 'custom'>, Preset][]).map(([key, preset]) => (
                                    <button
                                        key={key}
                                        className={`lab-preset-btn ${selectedPreset === key ? 'active' : ''}`}
                                        onClick={() => setSelectedPreset(key)}
                                    >
                                        <strong>{preset.name}</strong>
                                        <span className="lab-preset-author">par {preset.author}</span>
                                        <p>{preset.description}</p>
                                    </button>
                                ))}
                                <button
                                    className={`lab-preset-btn custom ${selectedPreset === 'custom' ? 'active' : ''}`}
                                    onClick={() => setSelectedPreset('custom')}
                                >
                                    <strong>🔧 Configuration Custom</strong>
                                    <p>Modifiez les paramètres manuellement</p>
                                </button>
                            </div>
                        </section>

                        {/* Contrôles manuels */}
                        <section className="lab-section">
                            <h2>⚙️ Paramètres</h2>

                            <div className="lab-control-group">
                                <label>Mode d'interaction</label>
                                <select
                                    value={activeConfig.mode}
                                    onChange={(e) => updateCustom({ mode: e.target.value as 'none' | 'reveal' | 'shape' })}
                                >
                                    <option value="none">Aucun</option>
                                    <option value="reveal">Reveal (révèle l'image)</option>
                                    <option value="shape">Shape (change la forme)</option>
                                </select>
                            </div>

                            <div className="lab-control-group">
                                <label>Variante</label>
                                <select
                                    value={activeConfig.variant}
                                    onChange={(e) => updateCustom({ variant: e.target.value as 'overlap' | 'push' })}
                                >
                                    <option value="overlap">Overlap (beads superposées)</option>
                                    <option value="push">Push (effet lentille)</option>
                                </select>
                            </div>

                            <div className="lab-control-group">
                                <label>Rayon: {activeConfig.radius.toFixed(2)}</label>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="0.5"
                                    step="0.01"
                                    value={activeConfig.radius}
                                    onChange={(e) => updateCustom({ radius: parseFloat(e.target.value) })}
                                />
                            </div>

                            <div className="lab-control-group">
                                <label>Softness: {activeConfig.softness.toFixed(2)}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={activeConfig.softness}
                                    onChange={(e) => updateCustom({ softness: parseFloat(e.target.value) })}
                                />
                            </div>

                            <div className="lab-control-group">
                                <label>Taille Active: {activeConfig.activeSize}</label>
                                <input
                                    type="range"
                                    min="5"
                                    max="30"
                                    step="1"
                                    value={activeConfig.activeSize}
                                    onChange={(e) => updateCustom({ activeSize: parseInt(e.target.value) })}
                                />
                            </div>
                        </section>

                        {/* Effet Auto */}
                        <section className="lab-section">
                            <h2>🌊 Effet Automatique</h2>

                            <div className="lab-control-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={activeConfig.auto?.enabled ?? false}
                                        onChange={(e) => updateAutoConfig({ enabled: e.target.checked })}
                                    />
                                    Activer l'effet auto
                                </label>
                            </div>

                            {activeConfig.auto?.enabled && (
                                <>
                                    <div className="lab-control-group">
                                        <label>Type d'effet</label>
                                        <select
                                            value={activeConfig.auto?.type || 'wave'}
                                            onChange={(e) => updateAutoConfig({ type: e.target.value as AutoInteractionConfig['type'] })}
                                        >
                                            {AUTO_EFFECTS.map(effect => (
                                                <option key={effect} value={effect}>
                                                    {effect.charAt(0).toUpperCase() + effect.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="lab-control-group">
                                        <label>Vitesse: {(activeConfig.auto?.speed ?? 0.5).toFixed(2)}</label>
                                        <input
                                            type="range"
                                            min="0.05"
                                            max="2"
                                            step="0.05"
                                            value={activeConfig.auto?.speed ?? 0.5}
                                            onChange={(e) => updateAutoConfig({ speed: parseFloat(e.target.value) })}
                                        />
                                    </div>

                                    <div className="lab-control-group">
                                        <label>Intensité: {(activeConfig.auto?.strength ?? 0.5).toFixed(2)}</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.05"
                                            value={activeConfig.auto?.strength ?? 0.5}
                                            onChange={(e) => updateAutoConfig({ strength: parseFloat(e.target.value) })}
                                        />
                                    </div>

                                    <div className="lab-control-group">
                                        <label>Scale: {(activeConfig.auto?.scale ?? 1).toFixed(2)}</label>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="5"
                                            step="0.1"
                                            value={activeConfig.auto?.scale ?? 1}
                                            onChange={(e) => updateAutoConfig({ scale: parseFloat(e.target.value) })}
                                        />
                                    </div>


                                    <div className="lab-control-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={activeConfig.auto?.duotoneModulation ?? false}
                                                onChange={(e) => updateAutoConfig({ duotoneModulation: e.target.checked })}
                                            />
                                            Activer la teinte des traits
                                        </label>
                                    </div>

                                    {activeConfig.auto?.duotoneModulation && (
                                        <>
                                            <div className="lab-control-group">
                                                <label>Style de teinte</label>
                                                <div className="lab-tint-presets">
                                                    <button
                                                        type="button"
                                                        className={`lab-tint-btn ${activeConfig.auto?.modulationColor === '#000000' && activeConfig.auto?.modulationColor2 === '#0011ff' ? 'active' : ''}`}
                                                        onClick={() => updateAutoConfig({ modulationColor: '#000000', modulationColor2: '#0011ff' })}
                                                        style={{ background: 'linear-gradient(135deg, #000000, #0011ff)' }}
                                                        title="Matrix Bleu"
                                                    >💙</button>
                                                    <button
                                                        type="button"
                                                        className={`lab-tint-btn ${activeConfig.auto?.modulationColor === '#000000' && activeConfig.auto?.modulationColor2 === '#10b981' ? 'active' : ''}`}
                                                        onClick={() => updateAutoConfig({ modulationColor: '#000000', modulationColor2: '#10b981' })}
                                                        style={{ background: 'linear-gradient(135deg, #000000, #10b981)' }}
                                                        title="Émeraude"
                                                    >💚</button>
                                                    <button
                                                        type="button"
                                                        className={`lab-tint-btn ${activeConfig.auto?.modulationColor === '#000000' && activeConfig.auto?.modulationColor2 === '#a855f7' ? 'active' : ''}`}
                                                        onClick={() => updateAutoConfig({ modulationColor: '#000000', modulationColor2: '#a855f7' })}
                                                        style={{ background: 'linear-gradient(135deg, #000000, #a855f7)' }}
                                                        title="Violet"
                                                    >💜</button>
                                                    <button
                                                        type="button"
                                                        className={`lab-tint-btn ${activeConfig.auto?.modulationColor === '#000000' && activeConfig.auto?.modulationColor2 === '#f59e0b' ? 'active' : ''}`}
                                                        onClick={() => updateAutoConfig({ modulationColor: '#000000', modulationColor2: '#f59e0b' })}
                                                        style={{ background: 'linear-gradient(135deg, #000000, #f59e0b)' }}
                                                        title="Or"
                                                    >💛</button>
                                                    <button
                                                        type="button"
                                                        className={`lab-tint-btn ${activeConfig.auto?.modulationColor === '#000000' && activeConfig.auto?.modulationColor2 === '#ef4444' ? 'active' : ''}`}
                                                        onClick={() => updateAutoConfig({ modulationColor: '#000000', modulationColor2: '#ef4444' })}
                                                        style={{ background: 'linear-gradient(135deg, #000000, #ef4444)' }}
                                                        title="Rouge"
                                                    >❤️</button>
                                                    <button
                                                        type="button"
                                                        className={`lab-tint-btn ${activeConfig.auto?.modulationColor === '#ffffff' && activeConfig.auto?.modulationColor2 === '#000000' ? 'active' : ''}`}
                                                        onClick={() => updateAutoConfig({ modulationColor: '#ffffff', modulationColor2: '#000000' })}
                                                        style={{ background: 'linear-gradient(135deg, #ffffff, #000000)' }}
                                                        title="Négatif"
                                                    >🔲</button>
                                                    <button
                                                        type="button"
                                                        className={`lab-tint-btn ${activeConfig.auto?.modulationColor === '#06b6d4' && activeConfig.auto?.modulationColor2 === '#8b5cf6' ? 'active' : ''}`}
                                                        onClick={() => updateAutoConfig({ modulationColor: '#06b6d4', modulationColor2: '#8b5cf6' })}
                                                        style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' }}
                                                        title="Cyber"
                                                    >🌈</button>
                                                </div>
                                            </div>
                                            <div className="lab-control-group colors">
                                                <label>Couleurs custom</label>
                                                <div className="lab-color-inputs">
                                                    <input
                                                        type="color"
                                                        value={activeConfig.auto?.modulationColor || '#000000'}
                                                        onChange={(e) => updateAutoConfig({ modulationColor: e.target.value })}
                                                    />
                                                    <input
                                                        type="color"
                                                        value={activeConfig.auto?.modulationColor2 || '#10b981'}
                                                        onChange={(e) => updateAutoConfig({ modulationColor2: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="lab-control-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={activeConfig.auto?.useLuminanceAsDepth ?? false}
                                                onChange={(e) => updateAutoConfig({ useLuminanceAsDepth: e.target.checked })}
                                            />
                                            Utiliser luminance comme depth
                                        </label>
                                    </div>
                                </>
                            )}
                        </section>

                        {/* Export */}
                        <section className="lab-section">
                            <h2>📋 Export</h2>
                            <button className="lab-copy-btn" onClick={copyConfig}>
                                Copier la configuration
                            </button>
                            <pre className="lab-config-preview">
                                {JSON.stringify(activeConfig, null, 2)}
                            </pre>
                        </section>
                    </div>
                </div>

                {/* Sélecteur d'image */}
                <section className="lab-image-selector">
                    <h2>🖼️ Choisir l'image Hero</h2>
                    <div className="lab-image-options">
                        {[
                            '/assets/hero-concepts/hero%2014.png',
                            '/assets/hero-concepts/hero%2013.png',
                            '/assets/hero-concepts/hero%2012.png',
                            '/assets/hero-concepts/hero%2011.png',
                            '/assets/hero-concepts/hero%2010.png'
                        ].map((img, i) => (
                            <button
                                key={i}
                                className={`lab-image-btn ${heroImage === img ? 'active' : ''}`}
                                onClick={() => setHeroImage(img)}
                            >
                                <img src={img} alt={`Hero ${14 - i}`} />
                                <span>Hero {14 - i}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="lab-footer">
                    <p>🗑️ Ce dossier (<code>src/lab/</code>) peut être supprimé une fois les tests terminés.</p>
                </footer>
            </div>
        </FxProvider>
    );
}

export default LabPage;
