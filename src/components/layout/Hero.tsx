
import { FxImage } from '../fx/FxImage';
import { TrustBar } from './TrustBar';

export function Hero() {


    return (
        <section
            id="section-hero"
            className="relative min-h-[100dvh] w-full flex flex-col group bg-pattern-grid overflow-hidden"
            aria-label="Introduction"
        >
            {/* UPPER TIER: Main Visual & Content Area (Flex Grow) */}
            <div className="relative flex-grow flex items-end w-full">
                {/* Content Layer - Constrained by Container */}
                <div
                    className="container mx-auto z-20 relative w-full transition-all duration-1000 opacity-100 translate-y-0"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
                        {/* LEFT COLUMN: Content */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left pl-6 pb-12 pt-32 lg:pt-20">
                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full text-[0.8rem] border border-white/10 mb-8 lg:mb-10 text-[#E67E22]">
                                <span className="w-1.5 h-1.5 bg-[#E67E22] rounded-full animate-pulse"></span>
                                <span>Expert Mistral AI</span>
                            </div>

                            <h1
                                id="hero-headline"
                                className="font-mono text-[1.75rem] sm:text-4xl lg:text-[4rem] font-medium leading-[1.1] tracking-[-0.04em] mb-6 lg:mb-8 max-w-[950px] uppercase text-white drop-shadow-xl"
                            >
                                L'IA opérationnelle pour les entreprises françaises.
                            </h1>

                            <p className="text-[0.9rem] lg:text-[1.1rem] text-white/90 leading-relaxed max-w-xl mb-10 lg:mb-12 drop-shadow-lg font-normal pr-4">
                                Agents autonomes, automatisation, souveraineté des données. Déployé sur votre
                                infrastructure.
                            </p>

                            <div className="flex flex-row flex-wrap gap-4 mt-2 w-full sm:w-auto">
                                <a
                                    href="#section-contact"
                                    id="hero-cta-primary"
                                    className="bg-[#D35400] text-white border border-[#D35400] px-6 py-3 font-semibold uppercase text-sm sm:text-base inline-block transition-all hover:bg-white hover:text-[#D35400] hover:-translate-y-0.5 shadow-lg shadow-orange-500/20 text-center whitespace-nowrap backdrop-blur-sm"
                                >
                                    PARLONS DE VOTRE PROJET
                                </a>
                                <a
                                    href="#section-solutions"
                                    className="bg-white/5 text-white border border-white/20 px-6 py-3 font-normal uppercase text-sm sm:text-base inline-block transition-all hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 text-center whitespace-nowrap backdrop-blur-sm"
                                >
                                    EXPLORER NOS SOLUTIONS
                                </a>
                            </div>
                        </div>

                        {/* Grid Spacer to maintain text alignment */}
                        <div className="hidden lg:block lg:col-span-5"></div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Visual (Hero Image) - Desktop
                    FxImage is the sole element. Its internal <img> serves as the texture source
                    and LCP fallback (benefits from the <link rel="preload"> in index.html).
                    Once WebGL compiles, the canvas renders the duotone + interaction effect. */}
                <div className="hidden lg:block absolute bottom-0 right-0 h-[90%] w-[65%] z-10">
                    <FxImage
                        src={'/assets/hero-concepts/licorne-3-lg.webp'}
                        alt="Une licorne stylisée représentant la créativité de l'IA générative"
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-full"
                        style={{ width: '100%', height: '100%' }}
                        imgStyle={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'bottom right',
                        }}
                        config={{
                            fitMode: 'contain',
                            duotone: { enabled: true, colorA: '#000000', colorB: '#ffffff', strength: 1 },
                            interaction: {
                                enabled: true,
                                mode: 'shape',
                                variant: 'push',
                                radius: 0.15,
                                softness: 0.5,
                                activeSize: 15,
                            },
                        }}
                    />
                </div>


            </div>

            {/* LOWER TIER: Footer Block (TrustBar) - Distinct Background */}
            <div className="w-full z-30 bg-black border-l border-t border-b border-white/5 relative">
                <TrustBar />
            </div>
        </section>
    );
}
