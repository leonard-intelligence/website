import { useState } from "react";
import { TechCard, TechCardImage } from "../ui/TechCard";
import { CATALOGUE } from "../../data/catalogue";
import { ArrowUpRight } from "lucide-react";

// Map some default images for categories if they don't have specifics
// For now we'll adhere to a simple logic or random allocation to avoid broken images
const DEFAULT_IMAGES = [
    'assets/illu-1.png', 'assets/illu-2.png', 'assets/illu-3.png', 'assets/illu-4.png', 'assets/illu-5.png'
];

export function UseCaseGrid() {
    const [activeTabId, setActiveTabId] = useState(CATALOGUE[0].id);

    const activeCategory = CATALOGUE.find(c => c.id === activeTabId) || CATALOGUE[0];

    return (
        <section className="catalogue-section py-24 bg-black reveal delay-200 border-b border-white/10">
            <div className="section-header centered mb-12 px-6 text-center">
                <h2 className="text-4xl font-bold mb-4 font-mono">CATALOGUE STRATÉGIQUE</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Nos solutions IA souveraines classées par domaines d'application.
                </p>
            </div>

            {/* Scrollable Tabs */}
            <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-md border-y border-white/10 mb-12">
                <div className="flex flex-wrap justify-center py-4 px-6 gap-2 max-w-7xl mx-auto">
                    {CATALOGUE.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTabId(cat.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 border transition-all duration-300 font-mono text-xs uppercase tracking-wider
                                ${activeTabId === cat.id
                                    ? 'border-brand-blue text-white bg-white/5'
                                    : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20'}
                            `}
                        >
                            <span className="text-base">{cat.emoji}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Content */}
            <div className="max-w-7xl mx-auto px-6 min-h-[500px]">
                <div key={activeTabId} className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Category Intro Block */}
                    <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 border border-white/10 bg-white/5 rounded-none">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">{activeCategory.emoji}</span>
                                <h3 className="text-2xl font-bold font-mono text-white">{activeCategory.label}</h3>
                            </div>
                            <p className="text-gray-400 text-sm md:text-base max-w-2xl">{activeCategory.description}</p>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="font-mono text-4xl font-bold text-white/10">0{CATALOGUE.findIndex(c => c.id === activeTabId) + 1}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeCategory.items.map((item, index) => (
                            <TechCard key={index} className="flex flex-col h-full group border border-white/10 bg-black p-0 transition-all duration-500">
                                {/* Large Square/Rect Image Area */}
                                <div className="aspect-square w-full overflow-hidden relative border-white/10 bg-gray-900/50">
                                    <TechCardImage
                                        src={DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]}
                                        alt={item.title}
                                        layout="full"
                                        className="grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur border border-white/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div className="px-8 pb-8 flex flex-col flex-grow">
                                    <h4 className="text-xl font-bold mb-3 font-mono text-white group-hover:text-brand-blue transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                                        {item.description}
                                    </p>
                                </div>
                            </TechCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
