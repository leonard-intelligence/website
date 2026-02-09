import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { contactSignal } from "@/lib/contactSignal";

import visionBg from '@/assets/images/illustrations/illustration-vision-massive-02.webp';

export function SectionVision() {
    return (
        <section id="section-expertise-vision" className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black" aria-labelledby="expertise-vision-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] lg:min-h-[600px]">

                {/* LEFT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 border-r border-white/10 relative p-6 md:p-12 flex flex-col justify-between overflow-hidden">


                    {/* Header Area */}
                    <div className="relative z-10 mb-12 reveal-left">
                        <div className="text-[#e67d23] mb-2 text-lg">01 Visual Intelligence.</div>
                        <h2 id="expertise-vision-heading" className="text-4xl md:text-5xl font-mono text-white max-w-4xl leading-tight uppercase tracking-[-0.02em]">
                            <span className="text-muted-foreground">Pour la logistique, la qualité</span><br />
                            et le marketing visuel.
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <TechIllustration
                            src={visionBg}
                            alt="Visual Intelligence Background"
                            className="absolute inset-0 w-full h-full"
                            aspectRatio=""
                        />
                    </div>

                    {/* Bottom Left Card */}
                    <div className="mt-auto relative z-10">
                        <div id="expertise-vision-card" className="max-w-lg border border-white/20 bg-black/60 backdrop-blur-md rounded transition-colors p-6 group reveal-scale stagger-2 hover-glow">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e67d23] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e67d23]"></span>
                                    </span>
                                    <span className="text-xs text-[#e67d23] tracking-widest">STACK TECHNIQUE</span>
                                </div>
                                <span className="text-xs text-zinc-400">HYBRID</span>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl text-white font-mono uppercase tracking-[-0.02em]">Computer Vision</h3>
                            </div>

                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                YOLO · Stable Diffusion · Flux · Midjourney API · ComfyUI
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400 bg-white/5 p-3 rounded border border-white/5">
                                <div className="flex justify-between"><span>TYPE</span><span className="text-white">VISION</span></div>
                                <div className="flex justify-between"><span>MODELS</span><span className="text-[#e67d23]">SOTA</span></div>
                                <div className="flex justify-between"><span>LATENCE</span><span className="text-[#e67d23]">REALTIME</span></div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col">

                    {/* Top Description Block */}
                    <div className="p-6 md:p-12 border-b border-white/10 bg-zinc-900/20 bg-pattern-diagonal relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] text-white tracking-widest leading-none">
                                /// MODULE 01 ///
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            De l'analyse de défauts industriels à la création automatisée de visuels marketing. Si ça se voit, on peut l'automatiser.
                        </p>

                        <button
                            onClick={() => contactSignal.trigger('Visual Intelligence')}
                            className="text-[#e67d23] hover:text-[#cc6d1e] text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-colors w-fit border-none bg-transparent p-0 mb-2"
                        >
                            En savoir plus
                            <DotIcon icon={leonardIcons.arrowRight} size={14} fillColor="currentColor" />
                        </button>
                    </div>

                    {/* Research Items List */}
                    <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-col">
                        <div id="expertise-vision-item-1" className="border-b lg:border-b border-r lg:border-r-0 border-white/10 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-right stagger-1 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white icon-bounce">
                                <DotIcon icon={leonardIcons.computerVision} size={20} fillColor="white" />
                            </div>
                            <h3 className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">Computer Vision</h3>
                            <p className="text-zinc-400 text-[10px] sm:text-sm">Contrôle qualité, détection en temps réel, surveillance.</p>
                        </div>

                        <div id="expertise-vision-item-2" className="border-b lg:border-b-0 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-right stagger-2 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white icon-bounce">
                                <DotIcon icon={leonardIcons.imageGeneration} size={20} fillColor="white" />
                            </div>
                            <h3 className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">Image Gen</h3>
                            <p className="text-zinc-400 text-[10px] sm:text-sm">Assets marketing, virtual staging, retouche auto.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

