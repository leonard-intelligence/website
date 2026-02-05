import { useRef } from "react";
import { USE_CASES } from "../../data/catalogue";
import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { cn } from "@/lib/utils";
import { TechCard } from "../ui/TechCard";
import type { CSSProperties } from "react";

export function SectionCapabilitiesBento() {
    const sectionRef = useRef<HTMLElement>(null);

    // Filter for the new "Expertise Technique" category
    const capabilities = USE_CASES.filter(item => item.category === "Expertise Technique");

    return (
        <section ref={sectionRef} id="section-capabilities" className="py-24 bg-black border-t border-b border-white/10 -mr-px relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-pattern-grid opacity-[0.02]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E67E22]/5 blur-[120px] -z-10 rounded-full" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col mb-16 items-center text-center">
                    <span className="text-[#E67E22] text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#E67E22] rounded-full animate-pulse"></span>
                        Expertise Technique
                    </span>
                    <h2 className="text-4xl md:text-5xl font-medium font-mono text-white mb-6">
                        Construisez <span className="text-zinc-500">le futur.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
                        Intégrez les dernières avancées de l'IA générative directement dans vos produits.
                        Une suite complète de modèles et d'outils pour chaque cas d'usage.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {capabilities.map((item, index) => (
                        <TechCard
                            key={item.id}
                            className={cn(
                                "group relative flex flex-col justify-between overflow-hidden bg-zinc-900/20 border border-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:bg-zinc-900/40",
                                // Highlight the first item significantly
                                index === 0 ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-zinc-900/50 to-black/50" : ""
                            )}
                            style={{ "--hover-border-color": "#E67E22" } as CSSProperties}
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon & Tag */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E67E22] group-hover:scale-110 transition-transform duration-300">
                                        <DotIcon icon={leonardIcons.sparkles} size={20} fillColor="#E67E22" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 border border-white/5 px-2 py-1 rounded bg-black/20">
                                        {item.sector}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="mt-auto">
                                    <h3 className="text-xl font-mono text-white mb-3 group-hover:text-[#E67E22] transition-colors">
                                        {item.id === 'tech-codegen' ? 'Assistant de Développement' : item.sector}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                        {item.mission}
                                    </p>

                                    {/* Features */}
                                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                        {item.features?.map((feat, i) => (
                                            <div key={i} className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-wide">
                                                <div className="w-1 h-1 bg-[#E67E22] rounded-full" />
                                                {feat.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TechCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
