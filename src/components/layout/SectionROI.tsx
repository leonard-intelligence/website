import { Clock, Mail, FileText, Workflow } from 'lucide-react';

export function SectionROI() {
    const gains = [
        { icon: FileText, label: 'Saisie automatisée' },
        { icon: Mail, label: 'Emails triés' },
        { icon: FileText, label: 'Rapports générés' },
        { icon: Workflow, label: 'Workflows simplifiés' },
    ];

    return (
        <section
            id="section-roi"
            className="py-24 bg-black border-b border-white/10 relative overflow-hidden"
            aria-labelledby="roi-heading"
        >
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Big Stat */}
                    <div className="text-center lg:text-left">
                        <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4 block">
                            Productivité
                        </span>

                        <div className="mb-6">
                            <div className="flex items-baseline justify-center lg:justify-start gap-2">
                                <span className="text-8xl md:text-9xl font-mono font-bold text-white tracking-tighter">
                                    6
                                </span>
                                <span className="text-4xl md:text-5xl font-mono text-emerald-400">
                                    heures
                                </span>
                            </div>
                            <p className="text-2xl md:text-3xl font-mono text-white/60 mt-2">
                                récupérées. Chaque semaine. Par personne.
                            </p>
                        </div>

                        <h2 id="roi-heading" className="text-xl md:text-2xl font-mono text-white/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            L'IA absorbe le répétitif.<br />
                            <span className="text-white">Vos équipes se concentrent sur l'essentiel.</span>
                        </h2>
                    </div>

                    {/* Right: Gains List */}
                    <div className="grid grid-cols-2 gap-4">
                        {gains.map((gain, index) => (
                            <div
                                key={index}
                                className="group p-6 border border-white/10 bg-white/[0.02] hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all duration-300"
                            >
                                <div className="w-10 h-10 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:border-emerald-400 transition-colors">
                                    <gain.icon className="w-5 h-5 text-emerald-400" />
                                </div>
                                <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">
                                    {gain.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom stat bar */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                        <div>
                            <div className="text-3xl font-mono font-bold text-emerald-400">-40%</div>
                            <div className="text-xs font-mono text-white/50 uppercase tracking-wider mt-1">Charge admin</div>
                        </div>
                        <div className="w-px h-12 bg-white/10" aria-hidden="true" />
                        <div>
                            <div className="text-3xl font-mono font-bold text-emerald-400">+25%</div>
                            <div className="text-xs font-mono text-white/50 uppercase tracking-wider mt-1">Productivité</div>
                        </div>
                        <div className="w-px h-12 bg-white/10" aria-hidden="true" />
                        <div>
                            <div className="text-3xl font-mono font-bold text-emerald-400">3 mois</div>
                            <div className="text-xs font-mono text-white/50 uppercase tracking-wider mt-1">Retour sur invest.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
