import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { contactSignal } from "@/lib/contactSignal";
import { Button } from "@/components/ui/button";

import videoBg from '@/assets/images/illustrations/illustration-video-element.webp';

export function SectionVideo() {
    return (
        <section id="section-expertise-video" className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black" aria-labelledby="expertise-video-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] lg:min-h-[600px]">

                {/* LEFT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 relative p-6 md:p-12 flex flex-col justify-between overflow-hidden order-1 lg:order-2">

                    {/* Header Area */}
                    <div className="relative z-10 mb-12 text-right reveal-right">
                        <div className="text-[#E67E22] mb-2 text-lg">04 Video Intelligence.</div>
                        <h2 id="expertise-video-heading" className="text-4xl md:text-5xl font-mono text-white max-w-4xl leading-tight ml-auto uppercase tracking-[-0.02em]">
                            <span className="text-muted-foreground">Contenus dynamiques,</span><br />
                            Avatars & Motion.
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <TechIllustration
                            src={videoBg}
                            alt="Video Intelligence Background"
                            className="absolute inset-0 w-full h-full"
                            aspectRatio=""
                        />
                    </div>

                    {/* Bottom Left Card */}
                    <div className="mt-auto relative z-10 ml-auto">
                        <div id="expertise-video-card" className="max-w-lg border border-white/20 bg-black/60 backdrop-blur-md rounded transition-colors p-6 group reveal-scale stagger-2 hover-glow">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E67E22] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E67E22]"></span>
                                    </span>
                                    <span className="text-xs text-[#E67E22] tracking-widest">STACK TECHNIQUE</span>
                                </div>
                                <span className="text-xs text-zinc-500">GENERATIVE</span>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl text-white font-mono uppercase tracking-[-0.02em]">Motion & Avatars</h3>
                            </div>

                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                Runway · Pika · HeyGen · Sora · Kling
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-500 bg-white/5 p-3 rounded border border-white/5">
                                <div className="flex justify-between"><span>TYPE</span><span className="text-white">MOTION</span></div>
                                <div className="flex justify-between"><span>QUALITY</span><span className="text-[#E67E22]">CINEMATIC</span></div>
                                <div className="flex justify-between"><span>FPS</span><span className="text-[#E67E22]">60+</span></div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col border-r border-white/10 order-2 lg:order-1">

                    {/* Top Description Block */}
                    <div className="p-6 md:p-12 border-b border-white/10 bg-zinc-900/20 bg-pattern-diagonal relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] text-white tracking-widest leading-none">
                                /// MODULE 04 ///
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                            Automatisation de la production vidéo, avatars interactifs pour la formation et le support. L'image en mouvement.
                        </p>

                        <Button
                            variant="outline"
                            className="bg-black text-[#E67E22] border-[#E67E22]/50 hover:bg-[#E67E22] hover:text-black text-xs uppercase tracking-wider mb-2"
                            onClick={() => contactSignal.trigger('Video Intelligence')}
                        >
                            <span className="flex items-center gap-2">
                                Discuter de ce sujet
                                <DotIcon icon={leonardIcons.arrowRight} size={14} fillColor="currentColor" />
                            </span>
                        </Button>
                    </div>

                    {/* Research Items List */}
                    <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-col">
                        <div id="expertise-video-item-1" className="border-b lg:border-b border-r lg:border-r-0 border-white/10 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-left stagger-1 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white icon-bounce">
                                <DotIcon icon={leonardIcons.avatarsIA} size={20} fillColor="white" />
                            </div>
                            <h3 className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">Avatars IA</h3>
                            <p className="text-zinc-500 text-[10px] sm:text-sm">Formation, personnalisation vidéo.</p>
                        </div>

                        <div id="expertise-video-item-2" className="border-b lg:border-b-0 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-left stagger-2 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white icon-bounce">
                                <DotIcon icon={leonardIcons.productionAutomatisee} size={20} fillColor="white" />
                            </div>
                            <h3 className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">Vidéo Auto</h3>
                            <p className="text-zinc-500 text-[10px] sm:text-sm">Montage assisté, clips marketing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
