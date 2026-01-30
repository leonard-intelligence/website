

import { useState } from 'react';
import { FxImage } from '../fx/FxImage';
import { useFxConfig } from '../fx/FxContext';
import { TrustBar } from './TrustBar';

export function Hero() {
    const config = useFxConfig();

    // TEST: Toggle for Hero A/B testing (Door vs Unicorn)
    // TODO: REMOVE THIS STATE AND BUTTON BEFORE PRODUCTION
    const [isUnicornMode, setIsUnicornMode] = useState(false);

    return (
        /* Root Container: Full Viewport Height, Vertical Column */
        /* Replaced .hero-section with direct styles */
        <section
            id="section-hero"
            className="relative min-h-[100dvh] w-full flex flex-col group bg-background bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
            aria-label="Introduction"
        >

            {/* UPPER TIER: Main Visual & Content Area (Flex Grow) */}
            <div className="relative flex-grow flex items-center w-full">

                {/* Content Layer */}
                <div className="container mx-auto px-6 z-20 relative w-full pt-20 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">

                        {/* LEFT COLUMN: Content */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left">

                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full text-[0.8rem] font-mono border border-white/10 mb-10 text-teal-100">
                                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
                                <span>Expert Mistral AI · Infrastructure SecNumCloud</span>
                            </div>

                            <h1 id="hero-headline" className="font-mono text-[4rem] font-medium leading-[1.1] tracking-[-0.04em] mb-8 max-w-[950px] uppercase text-white drop-shadow-xl">
                                Prenez l'avantage.<br />
                                <span className="text-white/70">IA souveraine.<br />Sur-mesure.</span>
                            </h1>

                            <h2 className="font-mono text-xl text-emerald-400 mb-6 tracking-wide">
                                TEXTE. IMAGE. AUDIO. VIDÉO.
                            </h2>

                            <p className="font-mono text-[1.1rem] text-white/90 leading-relaxed max-w-xl mb-12 drop-shadow-lg font-medium">
                                Intégration IA complète. Vos données restent chez vous.
                                Open-source prioritaire, propriétaire si nécessaire. Déploiement sur-mesure.
                            </p>

                            <div className="flex gap-4 mt-2">
                                <a
                                    href="#section-contact"
                                    id="hero-cta-primary"
                                    className="bg-white text-black px-6 py-3 font-mono font-semibold uppercase text-base inline-block transition-transform hover:-translate-y-0.5 shadow-lg"
                                >
                                    DEMANDER UN AUDIT
                                </a>
                                <a
                                    href="#section-solutions"
                                    id="hero-cta-secondary"
                                    className="bg-transparent text-white px-6 py-3 font-mono font-medium text-[0.85rem] uppercase inline-block border border-white/30 transition-all hover:bg-white/10 hover:border-white/50"
                                >
                                    EXPLORER NOS SOLUTIONS
                                </a>
                            </div>
                        </div>


                        {/* RIGHT COLUMN: Visual (Hero Image) */}
                        <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative">
                            {/* Constrained Container for "Left Block Height" matching and Spacing */}
                            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                                <FxImage
                                    src={config.heroImage || '/assets/hero-tests/hero%2014.png'}
                                    alt="Visualisation abstraite de l'intelligence artificielle"
                                    className="w-full h-full"
                                    style={{ width: '100%', height: '100%' }}
                                    imgStyle={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center center'
                                    }}
                                    config={{
                                        fitMode: 'cover',
                                        duotone: {
                                            enabled: true,
                                            colorA: '#000000',
                                            colorB: '#ffffff',
                                            strength: 1
                                        },
                                        interaction: {
                                            enabled: true,
                                            mode: 'shape',
                                            variant: 'push',
                                            radius: 0.15,
                                            softness: 0.5,
                                            activeSize: 15,
                                            auto: {
                                                enabled: true,
                                                type: 'matrix',
                                                speed: 0.1,
                                                strength: 1,
                                                scale: 1.5,
                                                duotoneModulation: true,
                                                modulationColor: '#001133',
                                                modulationColor2: '#0066ff',
                                                useLuminanceAsDepth: true
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* LOWER TIER: Footer Block (TrustBar) - Distinct Background */}
            <div className="w-full z-30 bg-black border-t border-b border-white/5 relative">
                <TrustBar />
            </div>
        </section>
    );
}
