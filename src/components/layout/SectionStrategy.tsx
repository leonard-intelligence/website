import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";

export function SectionStrategy() {
    return (
        <section
            id="section-strategy"
            className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black"
            aria-labelledby="strategy-heading"
        >
            {/* TOP: Header with CTA */}
            <div className="p-12 border-b border-white/10 text-center">
                <div className="text-[#E67E22] font-mono mb-2 text-lg">Avantage Concurrentiel.</div>
                <h2
                    id="strategy-heading"
                    className="text-4xl md:text-5xl font-mono text-white leading-tight uppercase tracking-[-0.02em] mb-4"
                >
                    <span className="text-white/50">Vos concurrents s'équipent,</span><br />
                    prenez l'avantage.
                </h2>
                <p className="font-mono text-sm text-gray-400 max-w-lg mx-auto mb-8">
                    Chaque jour qui passe creuse l'écart. L'hésitation a un coût.
                </p>

                {/* CTA in header */}
                <a
                    href="#section-contact"
                    className="group inline-flex items-center gap-3 bg-[#E67E22] hover:bg-[#D35400] text-[#3D2314] px-8 py-4 font-mono font-semibold uppercase text-sm transition-all hover:-translate-y-0.5 border border-[#E67E22]"
                >
                    <DotIcon icon={leonardIcons.automatisation} size={16} fillColor="#3D2314" />
                    Prendre l'avantage
                    <div className="group-hover:translate-x-1 transition-transform">
                        <DotIcon icon={leonardIcons.arrowRight} size={16} fillColor="#3D2314" />
                    </div>
                </a>
            </div>

            {/* DASHBOARD GRID: Mixed sizes */}
            <div className="grid grid-cols-2 lg:grid-cols-4">

                {/* Large stat card - spans 2 cols */}
                <div className="col-span-2 p-8 border-r border-white/10 bg-[#E67E22]/5 flex items-center gap-8">
                    <div className="text-center">
                        <div className="font-mono text-6xl font-semibold text-white/30 mb-1">23%</div>
                        <div className="text-xs font-mono text-white/40 uppercase">Aujourd'hui</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <DotIcon icon={leonardIcons.arrowRight} size={32} fillColor="#E67E22" />
                    </div>
                    <div className="text-center">
                        <div className="font-mono text-6xl font-semibold text-[#E67E22] mb-1">80%</div>
                        <div className="text-xs font-mono text-[#E67E22] uppercase">2027</div>
                    </div>
                </div>

                {/* Small cards */}
                <div className="p-6 border-r border-white/10 hover:bg-white/5 transition-colors">
                    <div className="mb-3">
                        <DotIcon icon={leonardIcons.users} size={20} fillColor="#E67E22" />
                    </div>
                    <div className="font-mono text-2xl font-semibold text-white mb-1">58%</div>
                    <div className="text-xs font-mono text-white/50">Dirigeants convaincus</div>
                </div>

                <div className="p-6 hover:bg-white/5 transition-colors">
                    <div className="mb-3">
                        <DotIcon icon={leonardIcons.performanceMonitor} size={20} fillColor="#E67E22" />
                    </div>
                    <div className="font-mono text-2xl font-semibold text-white mb-1">2025-27</div>
                    <div className="text-xs font-mono text-white/50">Fenêtre critique</div>
                </div>

                {/* Progress bar card - spans 2 cols */}
                <div className="col-span-2 lg:col-span-2 p-6 border-t border-r border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-white/80 uppercase">Fenêtre d'opportunité</span>
                        <span className="font-mono text-xs text-[#E67E22]">35%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#D35400] via-[#E67E22] to-[#FF9F43] w-[35%] rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Quote card - spans 2 cols */}
                <div className="col-span-2 p-6 border-t border-white/10 bg-zinc-900/30 flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <DotIcon icon={leonardIcons.avantageConcurrentiel} size={20} fillColor="#E67E22" />
                    </div>
                    <p className="font-mono text-xs text-white/70 leading-relaxed">
                        "Les premiers à s'équiper captent l'avantage concurrentiel"
                    </p>
                </div>
            </div>
        </section>
    );
}

