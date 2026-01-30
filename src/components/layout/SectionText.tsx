import { FileText, Database, MessageSquare } from 'lucide-react';
import { TechIllustration } from "@/components/ui/TechIllustration";

export function SectionText() {
    return (
        <section id="section-expertise-text" className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black" aria-labelledby="expertise-text-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] lg:min-h-[600px]">

                {/* LEFT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col border-r border-white/10 order-2 lg:order-1">
                    <div className="p-6 md:p-12 border-b border-white/10 bg-zinc-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] font-mono text-white tracking-widest leading-none">
                                /// MODULE 02 ///
                            </div>
                        </div>
                        <p className="font-mono text-gray-400 text-sm leading-relaxed mb-8">
                            Pour le service client, les RH et l'administratif. Automatisez la rédaction et le traitement de vos flux documentaires.
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div id="expertise-text-item-1" className="flex-1 border-b border-white/10 p-8 group hover:bg-white/5 transition-colors relative reveal-left stagger-1 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white bg-pattern-diagonal icon-bounce">
                                <FileText className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Marketing Automation</h3>
                            <p className="text-gray-400 text-sm font-mono">Rédaction auto de fiches produits, SEO, personnalisation d'emails.</p>
                        </div>

                        <div id="expertise-text-item-2" className="flex-1 border-b border-white/10 p-8 group hover:bg-white/5 transition-colors relative reveal-left stagger-2 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white bg-pattern-diagonal">
                                <Database className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">RAG & Chatbots</h3>
                            <p className="text-gray-400 text-sm font-mono">Assistants connectés à votre base documentaire. Support 24/7.</p>
                        </div>

                        <div id="expertise-text-item-3" className="flex-1 p-8 group hover:bg-white/5 transition-colors relative reveal-left stagger-3 hover-lift">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white bg-pattern-diagonal">
                                <MessageSquare className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Fine-Tuning</h3>
                            <p className="text-gray-400 text-sm font-mono">Entraînement de modèles sur votre ton de marque et vocabulaire métier.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 relative p-6 md:p-12 flex flex-col justify-between overflow-hidden order-1 lg:order-2">
                    {/* Header Area */}
                    <div className="relative z-10 mb-12 text-right reveal-right">
                        <div className="text-[#E67E22] font-mono mb-2 text-lg">02 Language & Process.</div>
                        <h2 id="expertise-text-heading" className="text-4xl md:text-5xl font-mono text-white leading-tight ml-auto max-w-4xl uppercase tracking-[-0.02em]">
                            <span className="text-white/50">Pour le service client,</span><br />
                            les RH et l'administratif.
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <TechIllustration
                            src="/assets/textdata_background.png"
                            alt="Text & Data AI Background"
                            className="absolute inset-0 w-full h-full"
                            aspectRatio=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Bottom Right Card */}
                    <div className="mt-auto relative z-10 ml-auto">
                        <div id="expertise-text-card" className="max-w-lg border border-white/20 bg-black/60 backdrop-blur-md rounded transition-colors p-6 group reveal-scale stagger-2 hover-glow">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E67E22] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E67E22]"></span>
                                    </span>
                                    <span className="font-mono text-xs text-[#E67E22] tracking-widest">STACK TECHNIQUE</span>
                                </div>
                                <span className="font-mono text-xs text-zinc-500">LLM</span>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl text-white font-mono uppercase tracking-[-0.02em]">LLM Agnostique</h3>
                            </div>

                            <p className="text-zinc-400 text-sm font-mono leading-relaxed mb-6">
                                Mistral · Llama · Claude · GPT-4 · LangChain · RAG
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500 bg-white/5 p-3 rounded border border-white/5">
                                <div className="flex justify-between"><span>CONTEXTE</span><span className="text-white">128k</span></div>
                                <div className="flex justify-between"><span>SOUVERAIN</span><span className="text-[#E67E22]">OUI</span></div>
                                <div className="flex justify-between"><span>FINE-TUNE</span><span className="text-[#E67E22]">READY</span></div>
                                <div className="flex justify-between"><span>STATUS</span><span className="text-[#E67E22]">ONLINE</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
