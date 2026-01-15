import { useState, useRef } from "react";
import { TechCard, TechCardImage } from "../ui/TechCard";
import { CATALOGUE } from "../../data/catalogue";
import { ArrowUpRight } from "lucide-react";

// Map some default images for categories if they don't have specifics
// For now we'll adhere to a simple logic or random allocation to avoid broken images
const DEFAULT_IMAGES = [
    'assets/illu-1.webp', 'assets/illu-2.webp', 'assets/illu-3.webp', 'assets/illu-4.webp', 'assets/illu-5.webp'
];

export function UseCaseGrid() {
    const [activeTabId, setActiveTabId] = useState(CATALOGUE[0].id);
    const sectionRef = useRef<HTMLElement>(null);

    const activeCategory = CATALOGUE.find(c => c.id === activeTabId) || CATALOGUE[0];

    const handleTabClick = (tabId: string) => {
        setActiveTabId(tabId);
        // Scroll to the top of the section with a small offset to account for sticky nav
        if (sectionRef.current) {
            const offset = 80; // Account for sticky navbar height
            const elementPosition = sectionRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section ref={sectionRef} id="section-solutions" className="catalogue-section catalogue py-24 bg-black reveal delay-200 border-b border-white/10">


            {/* Scrollable Tabs */}
            <div className="sticky top-[60px] z-40 bg-black/80 backdrop-blur-md mb-12 catalogue__tabs-container">
                <div className="flex flex-wrap justify-center py-4 px-6 gap-2 max-w-7xl mx-auto catalogue__tabs">
                    {CATALOGUE.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleTabClick(cat.id)}
                            className={`
                                flex items-center gap-3 px-6 py-3 border transition-all duration-300 font-mono text-sm uppercase tracking-wider
                                ${activeTabId === cat.id
                                    ? 'border-brand-blue text-white bg-brand-blue/10 shadow-[0_0_20px_-5px_rgba(var(--brand-blue-rgb),0.3)]'
                                    : 'border-white/5 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20'}
                            `}
                        >
                            <span className="text-xl">{cat.emoji}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Content */}
            <div className="max-w-7xl mx-auto px-6 min-h-[500px] catalogue__content">
                <div key={activeTabId} className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Category Intro Block */}
                    <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 border border-white/10 bg-white/5 rounded-none catalogue__intro">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 catalogue__grid">
                        {activeCategory.items.map((item, index) => (
                            <TechCard key={index} className="flex flex-col h-full group bg-black p-0 transition-all duration-500">
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
                                <div className="px-8 pb-8 pt-6 flex flex-col flex-grow">
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
