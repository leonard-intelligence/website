import { FileText, Mail, Workflow, TrendingDown, Clock, Zap } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

export function SectionROI() {
    // Animated counters for stats
    const counter1 = useAnimatedCounter(40, { prefix: '-', suffix: '%', duration: 2000 });
    const counter2 = useAnimatedCounter(25, { prefix: '+', suffix: '%', duration: 2000 });
    const counter3 = useAnimatedCounter(3, { suffix: ' mois', duration: 1500 });

    return (
        <section
            id="section-roi"
            className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black"
            aria-labelledby="roi-heading"
        >
            {/* TOP ROW: Header spanning full width */}
            <div className="p-6 md:p-12 border-b border-white/10 reveal-up">
                <div className="text-[#E67E22] font-mono mb-2 text-lg">Productivité.</div>
                <h2
                    id="roi-heading"
                    className="text-4xl md:text-5xl font-mono text-white max-w-2xl leading-tight uppercase tracking-[-0.02em]"
                >
                    Réduisez vos coûts<br />
                    <span className="text-white/50">opérationnels immédiatement.</span>
                </h2>
            </div>

            {/* BENTO GRID: 1 col on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

                {/* Card 1: Big Stat - Animated Counter */}
                <div
                    ref={counter1.ref}
                    className="p-8 border-r border-b border-white/10 bg-[#E67E22]/5 flex flex-col justify-between min-h-[200px] reveal-up stagger-1 hover-glow"
                >
                    <div className="w-10 h-10 border border-[#E67E22]/30 flex items-center justify-center mb-4 icon-bounce">
                        <TrendingDown className="w-5 h-5 text-[#E67E22]" />
                    </div>
                    <div>
                        <div className="text-4xl font-mono font-semibold text-[#E67E22] mb-1 counter-animate">
                            {counter1.displayValue}
                        </div>
                        <div className="text-xs font-mono text-white/50 uppercase tracking-wider">Charge admin</div>
                    </div>
                </div>

                {/* Card 2: Big Stat - Animated Counter */}
                <div
                    ref={counter2.ref}
                    className="p-8 border-r border-b border-white/10 flex flex-col justify-between min-h-[200px] reveal-up stagger-2 hover-glow"
                >
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-4 icon-bounce">
                        <Zap className="w-5 h-5 text-[#E67E22]" />
                    </div>
                    <div>
                        <div className="text-4xl font-mono font-semibold text-[#E67E22] mb-1 counter-animate">
                            {counter2.displayValue}
                        </div>
                        <div className="text-xs font-mono text-white/50 uppercase tracking-wider">Productivité</div>
                    </div>
                </div>

                {/* Card 3: Big Stat - Animated Counter */}
                <div
                    ref={counter3.ref}
                    className="p-8 border-r border-b border-white/10 flex flex-col justify-between min-h-[200px] reveal-up stagger-3 hover-glow"
                >
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-4 icon-bounce">
                        <Clock className="w-5 h-5 text-[#E67E22]" />
                    </div>
                    <div>
                        <div className="text-4xl font-mono font-semibold text-[#E67E22] mb-1 counter-animate">
                            {counter3.displayValue}
                        </div>
                        <div className="text-xs font-mono text-white/50 uppercase tracking-wider">ROI garanti</div>
                    </div>
                </div>

                {/* Card 4: Description */}
                <div className="p-8 border-b border-white/10 bg-zinc-900/30 flex flex-col justify-center min-h-[200px] reveal-up stagger-4">
                    <p className="font-mono text-sm text-gray-400 leading-relaxed">
                        L'IA absorbe le répétitif. Vos équipes se concentrent sur l'essentiel.
                    </p>
                </div>

                {/* Card 5: Feature */}
                <div className="p-8 border-r border-white/10 group hover:bg-white/5 transition-colors min-h-[180px] reveal-up stagger-1 hover-lift">
                    <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-[#E67E22] icon-bounce">
                        <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-white font-mono text-sm mb-2 uppercase tracking-[-0.02em]">Saisie Automatisée</h3>
                    <p className="text-gray-400 text-xs font-mono">Extraction documentaire sans intervention.</p>
                </div>

                {/* Card 6: Feature */}
                <div className="p-8 border-r border-white/10 group hover:bg-white/5 transition-colors min-h-[180px] reveal-up stagger-2 hover-lift">
                    <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-[#E67E22] icon-bounce">
                        <Mail className="w-4 h-4" />
                    </div>
                    <h3 className="text-white font-mono text-sm mb-2 uppercase tracking-[-0.02em]">Emails Triés</h3>
                    <p className="text-gray-400 text-xs font-mono">Priorisation intelligente automatique.</p>
                </div>

                {/* Card 7: Feature */}
                <div className="p-8 border-r border-white/10 group hover:bg-white/5 transition-colors min-h-[180px] reveal-up stagger-3 hover-lift">
                    <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-[#E67E22] icon-bounce">
                        <Workflow className="w-4 h-4" />
                    </div>
                    <h3 className="text-white font-mono text-sm mb-2 uppercase tracking-[-0.02em]">Workflows</h3>
                    <p className="text-gray-400 text-xs font-mono">Orchestration automatique.</p>
                </div>

                {/* Card 8: CTA hint */}
                <div className="p-8 bg-[#E67E22]/10 group hover:bg-[#E67E22]/20 transition-colors flex items-center justify-center min-h-[180px] reveal-up stagger-4 animate-pulse-glow">
                    <span className="font-mono text-xs text-[#E67E22] uppercase tracking-widest">/// MODULE ROI ///</span>
                </div>
            </div>
        </section>
    );
}
