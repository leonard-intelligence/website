import { TechCard } from "../ui/TechCard";

export function Methodology() {
    const steps = [
        {
            num: "01",
            title: "Cadrage & Audit",
            desc: "Analyse technique et juridique. Identification des cas d'usage à fort ROI et qualification de la donnée.",
            duration: "1-2 semaines"
        },
        {
            num: "02",
            title: "Prototypage (POC)",
            desc: "Développement d'une solution fonctionnelle sur un périmètre restreint pour valider la faisabilité et la valeur.",
            duration: "2-4 semaines"
        },
        {
            num: "03",
            title: "Mise en Production",
            desc: "Industrialisation, intégration SI, tests de charge et sécurisation (Red Teaming).",
            duration: "1-3 mois"
        },
        {
            num: "04",
            title: "Run & Amélioration",
            desc: "Monitoring de la performance, fine-tuning continu et formation des équipes.",
            duration: "Continu"
        }
    ];

    return (
        <section id="section-methodology" className="method-section methodology py-24 bg-black border-b border-white/10 reveal" aria-labelledby="methodology-heading">
            <div className="max-w-7xl mx-auto px-6 methodology__container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 methodology__header">
                    <div>
                        <div className="absolute -inset-4 bg-blue-500/10 blur-3xl -z-10 rounded-full opacity-50" aria-hidden="true" />
                        <span className="text-brand-blue font-mono text-sm tracking-widest uppercase mb-4 block">Processus</span>
                        <h2 id="methodology-heading" className="text-4xl font-bold font-display text-white relative z-10 methodology__heading">
                            De l'idée à <span className="text-white">l'impact</span>.
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-md text-right hidden md:block">
                        Une méthodologie éprouvée pour dérisquer vos projets IA<br /> et garantir une livraison rapide.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative methodology__steps">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/10 -z-10 translate-y-1/2" />

                    {steps.map((step, i) => (
                        <TechCard key={i} className="bg-black p-6 group transition-transform duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <span className={`font-mono text-4xl font-bold opacity-30 group-hover:opacity-100 transition-opacity ${i === 0 ? 'text-orange-500' :
                                    i === 1 ? 'text-blue-500' :
                                        i === 2 ? 'text-purple-500' : 'text-green-500'
                                    }`}>{step.num}</span>
                                <span className="text-xs font-mono border border-white/10 px-2 py-1 rounded text-gray-500 group-hover:text-white transition-colors">{step.duration}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {step.desc}
                            </p>
                        </TechCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
