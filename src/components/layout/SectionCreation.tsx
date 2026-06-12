import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { contactSignal } from "@/lib/contactSignal";

import visionBg from '@/assets/images/illustrations/illustration-expertise-codegen-04.webp';

export function SectionCreation() {
    return (
        <section id="section-expertise-creation" className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black" aria-labelledby="expertise-creation-heading">
            <div className="flex flex-col">

                {/* TOP ROW: 1 + 1 Large -- ALTERNATED: Image Left, Intro Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">

                    {/* Main Visual & Heading - Spans 8 cols - FIRST ON DESKTOP */}
                    <div className="lg:col-span-8 relative p-6 md:p-12 min-h-[400px] flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                        {/* Header Area */}
                        <div className="relative z-10 mb-12 text-left reveal-right">
                            <div className="text-[#e67d23] mb-2 text-lg">Module 04 · Création</div>
                            <h2 id="expertise-creation-heading" className="text-4xl md:text-5xl font-mono text-white leading-tight ml-auto max-w-4xl uppercase tracking-[-0.02em]">
                                PRODUISEZ EN HEURES CE QUI PRENAIT DES SEMAINES.
                            </h2>
                        </div>

                        {/* Central Image Area */}
                        <div className="absolute inset-0 z-0 flex items-center justify-center">
                            <TechIllustration
                                src={visionBg}
                                alt="Creation & Production Background"
                                className="absolute inset-0 w-full h-full"
                                aspectRatio=""
                            />
                        </div>
                    </div>

                    {/* Intro / Description - Spans 4 cols - SECOND ON DESKTOP */}
                    <div className="lg:col-span-4 p-6 md:p-12 bg-zinc-900/20 bg-pattern-diagonal relative overflow-hidden group flex flex-col items-start justify-start min-h-[400px]">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] text-white tracking-widest leading-none">
                                /// MODULE 04 ///
                            </div>
                        </div>

                        <div className="text-left relative z-10">
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-0">
                                Produisez en heures ce qui prenait des semaines. Visuels marketing, vidéos produit, avatars de formation : l'IA devient votre bras armé de production.
                            </p>
                        </div>

                        <button
                            onClick={() => contactSignal.trigger('Création & Production')}
                            className="absolute bottom-6 md:bottom-10 right-6 md:right-10 group/btn text-[#e67d23] hover:text-[#cc6d1e] text-sm font-medium uppercase tracking-wider flex items-center gap-2 transition-colors w-fit border-none bg-transparent p-0 cursor-pointer z-20"
                        >
                            En savoir plus
                            <span className="transform transition-transform group-hover/btn:translate-x-1">
                                <DotIcon icon={leonardIcons.arrowRight} size={16} fillColor="currentColor" />
                            </span>
                        </button>
                    </div>

                </div>

                {/* BOTTOM ROW: 3 Feature Cases */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div id="expertise-creation-item-1" className="border-b md:border-b-0 md:border-r border-white/10 p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-1 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white icon-bounce">
                            <DotIcon icon={leonardIcons.imageGeneration} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">Génération Visuelle</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Packshots, assets sociaux, virtual staging : du prompt au livrable, qualité pro.</p>
                    </div>

                    <div id="expertise-creation-item-2" className="border-b md:border-b-0 md:border-r border-white/10 p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-2 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white">
                            <DotIcon icon={leonardIcons.avatarsIA} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">Vidéo & Avatars</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Clips marketing, formations, onboarding : des avatars réalistes dans toutes les langues.</p>
                    </div>

                    <div id="expertise-creation-item-3" className="p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-3 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white">
                            <DotIcon icon={leonardIcons.computerVision} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">Vision Industrielle</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Contrôle qualité en temps réel, détection de défauts, surveillance de ligne automatisée.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
