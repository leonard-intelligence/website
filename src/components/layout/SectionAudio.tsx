import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { contactSignal } from "@/lib/contactSignal";

import audioBg from '@/assets/images/illustrations/illustration-tech-blade-runner-04.webp';

export function SectionAudio() {
    return (
        <section id="section-expertise-audio" className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black" aria-labelledby="expertise-audio-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] lg:min-h-[600px]">

                {/* LEFT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col order-2 lg:order-2">
                    <div className="p-6 md:p-12 border-b border-white/10 bg-zinc-900/20 bg-pattern-diagonal relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] text-white tracking-widest leading-none">
                                /// MODULE 03 ///
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Vos réunions durent une heure, le compte-rendu prend trente minutes, et personne ne le relit. On change ça. L'IA transcrit, résume, extrait les décisions et les actions.
                        </p>

                        <button
                            onClick={() => contactSignal.trigger('Audio & Signal')}
                            className="text-[#e67d23] hover:text-[#cc6d1e] text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-colors w-fit border-none bg-transparent p-0 mb-2"
                        >
                            En savoir plus
                            <DotIcon icon={leonardIcons.arrowRight} size={14} fillColor="currentColor" />
                        </button>
                    </div>

                    <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-col">
                        <div id="expertise-audio-item-1" className="border-b lg:border-b border-r lg:border-r-0 border-white/10 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-right stagger-1 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white icon-bounce">
                                <DotIcon icon={leonardIcons.speechToText} size={20} fillColor="white" />
                            </div>
                            <p className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">Intelligence de Réunion</p>
                            <p className="text-zinc-400 text-[10px] sm:text-sm">Transcription automatique, résumés stratégiques et extraction de "Next Steps".</p>
                        </div>

                        <div id="expertise-audio-item-2" className="border-b lg:border-b-0 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-right stagger-2 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white">
                                <DotIcon icon={leonardIcons.textToSpeech} size={20} fillColor="white" />
                            </div>
                            <p className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">Audio Generation (TTS)</p>
                            <p className="text-zinc-400 text-[10px] sm:text-sm">Voix de synthèse pour vidéos, accueil téléphonique, doublage multilingue.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 border-r border-white/10 relative p-6 md:p-12 flex flex-col justify-between overflow-hidden order-1 lg:order-1">
                    {/* Header Area */}
                    <div className="relative z-10 mb-12 reveal-left">
                        <div className="text-[#e67d23] mb-2 text-lg">03 Audio & Réunions.</div>
                        <h2 id="expertise-audio-heading" className="text-4xl md:text-5xl font-mono text-white leading-tight max-w-4xl uppercase tracking-[-0.02em]">
                            <span className="text-zinc-400">Chaque réunion capturée.</span><br />
                            Chaque décision retrouvée.
                        </h2>
                    </div>

                    {/* Central Image Area - Waveform Visualization */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen">
                        <TechIllustration
                            src={audioBg}
                            alt="Audio Analytics Visualization"
                            className="absolute inset-0 w-full h-full"
                            aspectRatio=""
                        />
                    </div>

                    {/* Bottom Right Card */}
                    <div className="mt-auto relative z-10">
                        <div id="expertise-audio-card" className="w-full max-w-[500px] border border-white/20 bg-black/60 backdrop-blur-md rounded transition-colors p-6 group reveal-scale stagger-2 hover-glow">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e67d23] opacity-75 will-change-transform"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e67d23]"></span>
                                    </span>
                                    <span className="text-xs text-[#e67d23] tracking-widest">STACK TECHNIQUE</span>
                                </div>
                                <span className="text-xs text-zinc-400">AUDIO</span>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl text-white font-mono uppercase tracking-[-0.02em]">Audio Pipeline</h3>
                            </div>

                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                Whisper · ElevenLabs · Voxtral
                            </p>

                            <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-400 bg-white/5 p-3 rounded border border-white/5">
                                <div className="flex justify-between items-center"><span>PRÉCISION</span><span className="text-white">&lt;5% WER</span></div>
                                <div className="flex justify-between items-center"><span>TEMPS GAGNÉ</span><span className="text-[#E67E22]">-80%</span></div>
                                <div className="flex justify-between items-center"><span>ANALYSE</span><span className="text-[#E67E22]">IA</span></div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section >
    );
}
