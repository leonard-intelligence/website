import { TrendingUp, Zap, ArrowRight } from 'lucide-react';

export function SectionStrategy() {
    return (
        <section
            id="section-strategy"
            className="py-24 bg-black border-b border-white/10 relative overflow-hidden"
            aria-labelledby="strategy-heading"
        >
            {/* Subtle gradient accent */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <div>
                        <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4 block">
                            Avantage Concurrentiel
                        </span>

                        <h2 id="strategy-heading" className="text-4xl md:text-6xl font-mono font-bold text-white mb-6 leading-tight">
                            Prenez<br />
                            <span className="text-purple-400">l'avantage.</span>
                        </h2>

                        <p className="text-lg font-mono text-white/60 leading-relaxed mb-8 max-w-xl">
                            Vos concurrents automatisent. Chaque jour qui passe creuse l'écart.
                            <span className="text-white"> L'hésitation a un coût.</span>
                        </p>

                        {/* CTA */}
                        <a
                            href="#section-contact"
                            className="group inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 font-mono font-semibold uppercase text-sm transition-all hover:-translate-y-0.5"
                        >
                            <Zap className="w-4 h-4" />
                            Prendre l'avantage
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right: Visual comparison */}
                    <div className="space-y-6">
                        {/* Today vs Tomorrow */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 border border-white/10 bg-white/[0.02] text-center">
                                <div className="font-mono text-xs text-white/40 uppercase tracking-wider mb-3">Aujourd'hui</div>
                                <div className="font-mono text-4xl font-bold text-white/30 mb-2">23%</div>
                                <div className="font-mono text-xs text-white/40">des entreprises équipées</div>
                            </div>
                            <div className="p-6 border border-purple-500/30 bg-purple-500/5 text-center">
                                <div className="font-mono text-xs text-purple-400 uppercase tracking-wider mb-3">Demain</div>
                                <div className="font-mono text-4xl font-bold text-purple-400 mb-2">80%</div>
                                <div className="font-mono text-xs text-white/60">projection 2027</div>
                            </div>
                        </div>

                        {/* Progress indicator */}
                        <div className="p-6 border border-white/10 bg-white/[0.02]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-sm text-white/80">Fenêtre d'opportunité</span>
                                <span className="font-mono text-xs text-purple-400 uppercase">2025-2027</span>
                            </div>
                            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-emerald-400 w-[35%] rounded-full animate-pulse" />
                            </div>
                            <p className="font-mono text-xs text-white/40 mt-3">
                                Les premiers à s'équiper captent l'avantage concurrentiel
                            </p>
                        </div>

                        {/* Social proof */}
                        <div className="flex items-center gap-4 p-4 border-l-2 border-purple-500/50">
                            <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                            <p className="font-mono text-sm text-white/70">
                                <span className="text-purple-400 font-bold">58% des dirigeants</span> considèrent l'IA comme vitale pour leur compétitivité.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
