import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { contactSignal } from "@/lib/contactSignal";

import audioBg from '@/assets/images/illustrations/illustration-expertise-agents-04.webp';

export function SectionVoice() {
    return (
        <section id="section-expertise-voice" className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black" aria-labelledby="expertise-voice-heading">
            <div className="flex flex-col">

                {/* TOP ROW: 1 + 1 Large */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
                    {/* Intro / Description - Spans 4 cols */}
                    <div className="lg:col-span-4 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-zinc-900/20 bg-pattern-diagonal relative overflow-hidden group flex flex-col items-start justify-start min-h-[400px]">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] text-white tracking-widest leading-none">
                                /// MODULE 03 ///
                            </div>
                        </div>

                        <div className="text-left relative z-10">
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-0">
                                Vos réunions durent une heure, le compte-rendu prend trente minutes, et personne ne le relit. On change ça. L'IA transcrit, résume, extrait les décisions et les actions.
                            </p>
                        </div>

                        <button
                            onClick={() => contactSignal.trigger('Audio & Réunions')}
                            className="absolute bottom-6 md:bottom-10 right-6 md:right-10 group/btn text-[#e67d23] hover:text-[#cc6d1e] text-sm font-medium uppercase tracking-wider flex items-center gap-2 transition-colors w-fit border-none bg-transparent p-0 cursor-pointer z-20"
                        >
                            En savoir plus
                            <span className="transform transition-transform group-hover/btn:translate-x-1">
                                <DotIcon icon={leonardIcons.arrowRight} size={16} fillColor="currentColor" />
                            </span>
                        </button>
                    </div>

                    {/* Main Visual & Heading - Spans 8 cols */}
                    <div className="lg:col-span-8 relative p-6 md:p-12 min-h-[400px] flex flex-col justify-between overflow-hidden">
                        {/* Header Area */}
                        <div className="relative z-10 mb-12 text-right reveal-right">
                            <div className="text-[#e67d23] mb-2 text-lg">Module 03 · Audio</div>
                            <h2 id="expertise-voice-heading" className="text-4xl md:text-5xl font-mono text-white leading-tight ml-auto max-w-4xl uppercase tracking-[-0.02em]">
                                <span className="text-zinc-400">CHAQUE RÉUNION CAPTURÉE.</span><br />
                                CHAQUE DÉCISION RETROUVÉE.
                            </h2>
                        </div>

                        {/* Central Image Area */}
                        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen">
                            <TechIllustration
                                src={audioBg}
                                alt="Audio Analytics Visualization"
                                className="absolute inset-0 w-full h-full"
                                aspectRatio=""
                            />
                        </div>
                    </div>
                </div>

                {/* BOTTOM ROW: 3 Feature Cases */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div id="expertise-voice-item-1" className="border-b md:border-b-0 md:border-r border-white/10 p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-1 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white icon-bounce">
                            <DotIcon icon={leonardIcons.speechToText} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">Transcription & Analyse</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Réunions, appels, consultations : transcrits, résumés et transformés en actions.</p>
                    </div>

                    <div id="expertise-voice-item-2" className="border-b md:border-b-0 md:border-r border-white/10 p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-2 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white">
                            <DotIcon icon={leonardIcons.sparkles} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">Intelligence Conversationnelle</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Sentiment, intentions, coaching commercial : insights extraits de chaque interaction.</p>
                    </div>

                    <div id="expertise-voice-item-3" className="p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-3 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white">
                            <DotIcon icon={leonardIcons.reponse24h} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">Agents Vocaux 24/7</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Prise de commande, qualification, support niveau 1 : une voix naturelle qui ne dort jamais.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
