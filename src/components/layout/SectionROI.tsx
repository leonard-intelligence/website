import { FileText, Mail, Workflow, TrendingDown, Clock, Zap } from 'lucide-react';

export function SectionROI() {
    return (
        <section
            id="section-roi"
            className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black"
            aria-labelledby="roi-heading"
        >
            {/* TOP ROW: Header spanning full width */}
            <div className="p-12 border-b border-white/10">
                <div className="text-emerald-500 font-mono mb-2 text-lg">01 Productivité.</div>
                <h2
                    id="roi-heading"
                    className="text-4xl md:text-5xl font-mono text-white max-w-2xl leading-tight uppercase tracking-[-0.02em]"
                >
                    Réduisez vos coûts<br />
                    <span className="text-muted-foreground">opérationnels immédiatement.</span>
                </h2>
            </div>

            {/* BENTO GRID: 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4">

                {/* Card 1: Big Stat */}
                <div className="p-8 border-r border-b border-white/10 bg-emerald-500/5 flex flex-col justify-between min-h-[200px]">
                    <div className="w-10 h-10 border border-emerald-500/30 flex items-center justify-center mb-4">
                        <TrendingDown className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-4xl font-mono font-bold text-emerald-400 mb-1">-40%</div>
                        <div className="text-xs font-mono text-white/50 uppercase tracking-wider">Charge admin</div>
                    </div>
                </div>

                {/* Card 2: Big Stat */}
                <div className="p-8 border-r border-b border-white/10 flex flex-col justify-between min-h-[200px]">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-4">
                        <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-4xl font-mono font-bold text-emerald-400 mb-1">+25%</div>
                        <div className="text-xs font-mono text-white/50 uppercase tracking-wider">Productivité</div>
                    </div>
                </div>

                {/* Card 3: Big Stat */}
                <div className="p-8 border-r border-b border-white/10 flex flex-col justify-between min-h-[200px]">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-4">
                        <Clock className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-4xl font-mono font-bold text-emerald-400 mb-1">3 mois</div>
                        <div className="text-xs font-mono text-white/50 uppercase tracking-wider">ROI garanti</div>
                    </div>
                </div>

                {/* Card 4: Description */}
                <div className="p-8 border-b border-white/10 bg-zinc-900/30 flex flex-col justify-center min-h-[200px]">
                    <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                        L'IA absorbe le répétitif. Vos équipes se concentrent sur l'essentiel.
                    </p>
                </div>

                {/* Card 5: Feature */}
                <div className="p-8 border-r border-white/10 group hover:bg-white/5 transition-colors min-h-[180px]">
                    <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-emerald-400">
                        <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-white font-mono text-sm mb-2 uppercase tracking-[-0.02em]">Saisie Automatisée</h3>
                    <p className="text-muted-foreground text-xs font-mono">Extraction documentaire sans intervention.</p>
                </div>

                {/* Card 6: Feature */}
                <div className="p-8 border-r border-white/10 group hover:bg-white/5 transition-colors min-h-[180px]">
                    <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-emerald-400">
                        <Mail className="w-4 h-4" />
                    </div>
                    <h3 className="text-white font-mono text-sm mb-2 uppercase tracking-[-0.02em]">Emails Triés</h3>
                    <p className="text-muted-foreground text-xs font-mono">Priorisation intelligente automatique.</p>
                </div>

                {/* Card 7: Feature */}
                <div className="p-8 border-r border-white/10 group hover:bg-white/5 transition-colors min-h-[180px]">
                    <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-emerald-400">
                        <Workflow className="w-4 h-4" />
                    </div>
                    <h3 className="text-white font-mono text-sm mb-2 uppercase tracking-[-0.02em]">Workflows</h3>
                    <p className="text-muted-foreground text-xs font-mono">Orchestration automatique.</p>
                </div>

                {/* Card 8: CTA hint */}
                <div className="p-8 bg-emerald-500/10 group hover:bg-emerald-500/20 transition-colors flex items-center justify-center min-h-[180px]">
                    <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">/// MODULE ROI ///</span>
                </div>
            </div>
        </section>
    );
}
