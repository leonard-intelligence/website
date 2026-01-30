import { TrendingUp, Zap, ArrowRight, Target, Users, BarChart3, Rocket } from 'lucide-react';

export function SectionStrategy() {
    return (
        <section
            id="section-strategy"
            className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black"
            aria-labelledby="strategy-heading"
        >
            {/* TOP: Header */}
            <div className="p-12 border-b border-white/10 text-center">
                <div className="text-purple-500 font-mono mb-2 text-lg">04 Avantage Concurrentiel.</div>
                <h2
                    id="strategy-heading"
                    className="text-4xl md:text-5xl font-mono text-white leading-tight uppercase tracking-[-0.02em] mb-4"
                >
                    Vos concurrents s'équipent,<br />
                    <span className="text-muted-foreground">prenez l'avantage.</span>
                </h2>
                <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto">
                    Chaque jour qui passe creuse l'écart. L'hésitation a un coût.
                </p>
            </div>

            {/* DASHBOARD GRID: Mixed sizes */}
            <div className="grid grid-cols-2 lg:grid-cols-4">

                {/* Large stat card - spans 2 cols */}
                <div className="col-span-2 p-8 border-r border-b border-white/10 bg-purple-500/5 flex items-center gap-8">
                    <div className="text-center">
                        <div className="font-mono text-6xl font-bold text-white/30 mb-1">23%</div>
                        <div className="text-xs font-mono text-white/40 uppercase">Aujourd'hui</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <ArrowRight className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="text-center">
                        <div className="font-mono text-6xl font-bold text-purple-400 mb-1">80%</div>
                        <div className="text-xs font-mono text-purple-400 uppercase">2027</div>
                    </div>
                </div>

                {/* Small cards */}
                <div className="p-6 border-r border-b border-white/10 hover:bg-white/5 transition-colors">
                    <Users className="w-5 h-5 text-purple-400 mb-3" />
                    <div className="font-mono text-2xl font-bold text-white mb-1">58%</div>
                    <div className="text-xs font-mono text-white/50">Dirigeants convaincus</div>
                </div>

                <div className="p-6 border-b border-white/10 hover:bg-white/5 transition-colors">
                    <BarChart3 className="w-5 h-5 text-purple-400 mb-3" />
                    <div className="font-mono text-2xl font-bold text-white mb-1">2025-27</div>
                    <div className="text-xs font-mono text-white/50">Fenêtre critique</div>
                </div>

                {/* Progress bar card - spans 2 cols */}
                <div className="col-span-2 p-6 border-r border-b border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-white/80 uppercase">Fenêtre d'opportunité</span>
                        <span className="font-mono text-xs text-purple-400">35%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-emerald-400 w-[35%] rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Quote card */}
                <div className="p-6 border-r border-b border-white/10 bg-zinc-900/30">
                    <TrendingUp className="w-5 h-5 text-purple-400 mb-3" />
                    <p className="font-mono text-xs text-white/70 leading-relaxed">
                        "Les premiers à s'équiper captent l'avantage concurrentiel"
                    </p>
                </div>

                {/* CTA card */}
                <div className="p-6 border-b border-white/10 bg-purple-500/10 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-purple-400" />
                </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="p-8 flex justify-center">
                <a
                    href="#section-contact"
                    className="group inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 font-mono font-semibold uppercase text-sm transition-all hover:-translate-y-0.5"
                >
                    <Zap className="w-4 h-4" />
                    Prendre l'avantage
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </section>
    );
}
