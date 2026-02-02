import { TechCard } from "../ui/TechCard";

export function Methodology() {
    return (
        <section id="section-methodology" className="py-24 bg-black border-b border-white/10" aria-labelledby="methodology-heading">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="reveal-up">
                        <div className="absolute -inset-4 bg-[#E67E22]/10 blur-3xl -z-10 rounded-full opacity-50" aria-hidden="true" />
                        <span className="text-[#E67E22] font-mono text-sm tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#E67E22] rounded-full animate-pulse"></span>
                            Approche Technique
                        </span>
                        <h2 id="methodology-heading" className="text-4xl font-semibold font-mono text-white relative z-10">
                            <span className="text-zinc-500">Architecture</span> Agnostique.
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-lg text-right hidden md:block font-mono text-sm">
                        Nous choisissons la meilleure technologie pour votre besoin,<br />
                        sans dogmatisme.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* OPEN SOURCE FIRST */}
                    <TechCard className="bg-[#E67E22]/5 border-[#E67E22]/20 p-8 group relative overflow-hidden reveal-left stagger-1 hover-lift">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-semibold text-[#E67E22] select-none">
                            OPEN
                        </div>
                        <h3 className="text-2xl font-semibold mb-6 text-[#E67E22] font-mono border-b border-[#E67E22]/20 pb-4">
                            OPEN SOURCE FIRST
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-white font-mono font-semibold text-sm uppercase tracking-wider mb-2">Pourquoi ?</h4>
                                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                    Coût réduit, confidentialité totale, pérennité. Vous maîtrisez votre infrastructure.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white font-mono font-semibold text-sm uppercase tracking-wider mb-2">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Mistral', 'Llama', 'Flux', 'Whisper'].map(tech => (
                                        <span key={tech} className="text-xs font-mono bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/20 px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-mono font-semibold text-sm uppercase tracking-wider mb-2">Usage Privilégié</h4>
                                <p className="text-muted-foreground font-mono text-sm leading-relaxed border-l-2 border-[#E67E22]/50 pl-3">
                                    Données sensibles, déploiement long terme, indépendance stratégique.
                                </p>
                            </div>
                        </div>
                    </TechCard>

                    {/* PROPRIÉTAIRE */}
                    <TechCard className="bg-[#E67E22]/10 border-[#E67E22]/20 p-8 group relative overflow-hidden reveal-right stagger-2 hover-lift">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-semibold text-[#E67E22] select-none">
                            PROP
                        </div>
                        <h3 className="text-2xl font-semibold mb-6 text-[#E67E22] font-mono border-b border-[#E67E22]/20 pb-4">
                            PROPRIÉTAIRE SI REQUIS
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-white font-mono font-semibold text-sm uppercase tracking-wider mb-2">Pourquoi ?</h4>
                                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                    Performance extrême immédiate, facilité d'intégration, capacités de raisonnement supérieures (SOTA).
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white font-mono font-semibold text-sm uppercase tracking-wider mb-2">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['OpenAI', 'Claude', 'Midjourney', 'DeepL'].map(tech => (
                                        <span key={tech} className="text-xs font-mono bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/20 px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-mono font-semibold text-sm uppercase tracking-wider mb-2">Usage Privilégié</h4>
                                <p className="text-muted-foreground font-mono text-sm leading-relaxed border-l-2 border-[#E67E22]/50 pl-3">
                                    Prototypage rapide, performances critiques complexe, tâches généralistes.
                                </p>
                            </div>
                        </div>
                    </TechCard>
                </div>
            </div>
        </section>
    );
}
