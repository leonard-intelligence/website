import { useRef } from "react";
import { TechCard, TechCardImage } from "../ui/TechCard";
import { USE_CASES } from "../../data/catalogue";
import { TrendingUp } from "lucide-react";

export function UseCaseGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} id="section-solutions" className="py-24 bg-black reveal delay-200 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl font-bold font-mono text-white mb-4">
                            Impact Mesuré.
                        </h2>
                        <p className="text-gray-400 font-mono text-sm">
                            Performance Monitor<span className="animate-pulse">_</span>
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {USE_CASES.map((item, index) => (
                        <TechCard key={index} className="flex flex-col h-full group bg-black p-0 transition-all duration-500 border-white/10 hover:border-white/20">
                            {/* Image Area */}
                            <div className="aspect-video w-full overflow-hidden relative bg-gray-900/50">
                                <TechCardImage
                                    src={item.image || ''}
                                    alt={item.mission}
                                    layout="full"
                                    useFx={false}
                                    className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="font-mono text-xs font-bold text-black bg-white px-2 py-1 uppercase tracking-wider">
                                        CASE #{index + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <h4 className="text-sm font-mono text-blue-400 uppercase tracking-wider mb-2">
                                        {item.sector}
                                    </h4>
                                    <p className="text-white font-bold text-lg leading-snug">
                                        {item.mission}
                                    </p>
                                </div>

                                <div className="mt-auto border-t border-white/10 pt-4">
                                    <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                                        <TrendingUp className="w-3 h-3" /> Résultats
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {item.stats.map((stat, i) => (
                                            <div key={i}>
                                                <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
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
