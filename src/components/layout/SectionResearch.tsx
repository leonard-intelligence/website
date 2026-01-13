import { ArrowUpRight } from 'lucide-react';
import { TechCard, TechCardImage } from "@/components/ui/TechCard";

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
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 pointer-events-none">
                        {/* Placeholder for the "3" Graphic - In real implementation, this is an image */}
                        {/* We use TechCardImage just for the logic/FX, but positioned absolutely */}
                        <TechCardImage
                            src="/assets/visual-research.png"
                            alt="Intellect 3"
                            className="w-[60%] h-auto object-contain border-none bg-transparent"
                            layout="contained"
                        />
                    </div>


                    {/* Bottom Left Card "Intellect 3" */}
                    <div className="mt-auto relative z-10">
                        <TechCard className="max-w-md bg-black/80 backdrop-blur-sm border border-border p-6 hover:border-white transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl text-white font-mono">Intellect 3</h3>
                                    <span className="text-[10px] uppercase border border-white/20 px-1 py-0.5 text-muted-foreground">New</span>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-mono uppercase bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 transition-colors">
                                    Chat with Intellect-3 <ArrowUpRight className="w-3 h-3" />
                                </button>
                            </div>
                            <p className="text-muted-foreground text-sm font-mono leading-relaxed mb-6">
                                Today, we release INTELLECT-3, a 100B+ parameter Mixture-of-Experts model trained on our RL stack(...)
                            </p>
                            <div className="text-xs text-muted-foreground font-mono">Nov. 2025</div>
                        </TechCard>
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
