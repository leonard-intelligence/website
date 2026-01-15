import { ArrowUpRight } from 'lucide-react';
import { TechIllustration } from "@/components/ui/TechIllustration";

export function SectionResearch() {
    return (
        <section className="sections-container border-b border-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                {/* LEFT COLUMN: Main Visual (The "3") - Spans 8 cols */}
                <div className="lg:col-span-8 border-r border-border relative p-12 flex flex-col justify-between">

                    {/* Header Area */}
                    <div className="mb-12">
                        <div className="text-blue-500 font-mono mb-2 text-lg">03 Research.</div>
                        <h2 className="text-4xl md:text-5xl font-mono text-white max-w-2xl leading-tight">
                            Our Contributions to the Frontier of Open-Source AI
                        </h2>
                    </div>

                    {/* Central Image Area (The "3") */}
                    {/* Using FxImage for the "3" effect. 
                        We'll use a placeholder or the hero mockup if no specific "3" image exists yet. 
                        Ideally, this would be a specific transparent "3" image. 
                        For now using a placeholder visual. 
                     */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 expertise__background">
                        <TechIllustration
                            src="/assets/visual-research.png"
                            alt="Intellect 3"
                            className="absolute inset-0 w-full h-full"
                            aspectRatio=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                    </div>


                    {/* Bottom Left Card "Intellect 3" */}
                    <div className="mt-auto relative z-10">
                        <div className="max-w-md tech-panel p-6 group">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                    </span>
                                    <span className="font-mono text-xs text-orange-400 tracking-widest">RELEASED</span>
                                </div>
                                <span className="font-mono text-xs text-zinc-500 border border-white/10 px-1 py-0.5 rounded">INTELLECT-3 v1.0</span>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl text-white font-mono mb-1">Intellect 3</h3>
                                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-muted-foreground">
                                        <span className="border border-white/10 px-2 py-1 rounded">RL-Foundation</span>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-mono uppercase bg-white text-black font-bold px-3 py-1.5 hover:bg-zinc-200 transition-colors">
                                    Chat <ArrowUpRight className="w-3 h-3" />
                                </button>
                            </div>

                            <p className="text-zinc-400 text-sm font-mono leading-relaxed mb-6">
                                Today, we release INTELLECT-3, a 100B+ parameter Mixture-of-Experts model trained on our RL stack. Use it for complex reasoning tasks.
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500 bg-white/5 p-3 rounded border border-white/5">
                                <div className="flex justify-between"><span>PARAMS</span><span className="text-white">100B+</span></div>
                                <div className="flex justify-between"><span>ARCH</span><span className="text-orange-400">MoE</span></div>
                                <div className="flex justify-between"><span>LICENSE</span><span className="text-white">APACHE 2.0</span></div>
                                <div className="flex justify-between"><span>DATE</span><span className="text-white">NOV. 2025</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col">

                    {/* Top Description Block */}
                    <div className="p-12 border-b border-border">
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-8">
                            Our end to end agent infrastructure allows you to build, share and train on RL environments with a full suite of tools to support.
                        </p>
                        <button className="bg-white text-black font-mono font-bold uppercase px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
                            Train <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Research Items List */}
                    <div className="flex-1 flex flex-col">
                        {/* Item 1 */}
                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative overflow-hidden">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="text-white w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Synthetic 2</h3>
                            <p className="text-muted-foreground text-sm mb-8 font-mono">Launching our next-gen open reasoning dataset</p>
                            <div className="mt-auto text-xs text-muted-foreground font-mono">Jun. 2025</div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="text-white w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Intellect 2</h3>
                            <p className="text-muted-foreground text-sm mb-8 font-mono">The first 32B parameter decentralized RL training run</p>
                            <div className="mt-auto text-xs text-muted-foreground font-mono">May. 2025</div>
                        </div>

                        {/* Bottom Links */}
                        <div className="p-8 space-y-4">
                            <a href="#" className="flex items-center justify-between text-white font-mono text-sm hover:text-blue-400 group">
                                Explore all models <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 text-white font-mono text-sm hover:text-blue-400 group">
                                <img src="/vite.svg" className="w-4 h-4 grayscale group-hover:grayscale-0" alt="HF" /> Hugging Face <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default SectionResearch;
