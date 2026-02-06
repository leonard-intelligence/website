import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { TechCard, TechCardImage } from "../ui/TechCard";
import { USE_CASES } from "../../data/catalogue";
import { cn } from "@/lib/utils";
import { leonardIcons, DotIcon } from "../ui/LeonardIcons";

export function UseCaseGrid() {
    // Extract unique categories
    const categories = Array.from(new Set(USE_CASES.map(item => item.category || 'Other')));

    const sectionRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState(categories[0]);

    const getIconForCategory = (cat: string) => {
        switch (cat) {

            case "Conversation IA": return leonardIcons.solutionConversation;
            case "Vision & Industrie": return leonardIcons.solutionVision;
            case "Intelligence Documentaire": return leonardIcons.solutionDoc;
            case "Infrastructure & Sécurité": return leonardIcons.solutionInfra;
            case "Marketing & Ventes": return leonardIcons.marketingAutomation;
            case "Expertise Technique": return leonardIcons.architectureAgnostique;
            default: return leonardIcons.sparkles;
        }
    };

    const filteredCases = USE_CASES.filter(item => item.category === activeTab);

    return (
        <section ref={sectionRef} id="section-solutions" className="py-24 bg-transparent reveal delay-200 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col mb-8 md:mb-16">
                    <div className="mb-8">
                        <h2 className="text-4xl font-medium font-mono text-white mb-4">
                            Solutions AI.
                        </h2>
                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                            <span>Performance Monitor<span className="animate-pulse">_</span></span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-4 justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={cn(
                                    "px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 whitespace-nowrap cursor-pointer rounded-sm backdrop-blur-sm",
                                    activeTab === cat
                                        ? "bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                        : "bg-zinc-900/50 text-zinc-400 border-white/5 hover:bg-zinc-800 hover:text-white hover:border-white/20 hover:shadow-sm"
                                )}
                            >
                                <DotIcon
                                    icon={getIconForCategory(cat)}
                                    size={16}
                                    gap={0.12}
                                    className={activeTab === cat ? "text-[#E67E22]" : "text-zinc-600 group-hover:text-zinc-400"}
                                    fillColor={activeTab === cat ? "#E67E22" : undefined}
                                />
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {filteredCases.map((item, index) => (
                        <TechCard
                            key={index}
                            className="flex flex-col h-full group bg-black p-0 transition-all duration-500 border-white/10 hover:border-white/20"
                            style={{ '--hover-border-color': '#ffffff' } as CSSProperties}
                        >
                            {/* Image Area */}
                            <div className="aspect-video w-full overflow-hidden relative bg-gray-900/50">
                                <TechCardImage
                                    src={item.image || ''}
                                    alt={item.mission}
                                    layout="full"
                                    useFx={false}
                                    className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {item.tags?.map((tag, i) => (
                                        <span key={i} className="text-[10px] font-medium text-white/80 bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-1 uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 pb-6 pt-6 flex flex-col flex-grow">
                                <div className="mb-6">
                                    <h4 className="text-xs text-[#E67E22] uppercase tracking-wider mb-3">
                                        {item.sector}
                                    </h4>
                                    <p className="text-zinc-300 font-normal text-base leading-relaxed">
                                        {item.mission}
                                    </p>
                                </div>

                                {/* Footer Info / Features */}
                                {item.features && (
                                    <div className="mt-auto pt-4 border-t border-white/5 grid grid-cols-2 gap-y-2 gap-x-4">
                                        {item.features.map((feat, i) => (
                                            <div key={i} className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                                {/* Simple generic icon fallback */}
                                                <div className="w-1 h-1 rounded-full bg-[#E67E22]" />
                                                <span className="text-[10px] uppercase tracking-wide truncate">
                                                    {feat.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </TechCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

