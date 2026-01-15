import { ArrowUpRight, Image as ImageIcon, Paintbrush, Layers } from 'lucide-react';
import { TechIllustration } from "@/components/ui/TechIllustration";

export function SectionImage() {
    return (
        <section id="section-expertise-image" className="sections-container expertise expertise--image border-y border-border bg-black" aria-labelledby="expertise-image-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] expertise__grid">

                {/* LEFT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 border-r border-border relative p-12 flex flex-col justify-between overflow-hidden expertise__main">

                    {/* Header Area */}
                    <div className="relative z-10 mb-12 expertise__header">
                        <div className="text-orange-500 font-mono mb-2 text-lg expertise__number expertise__number--03">03 Generation.</div>
                        <h2 id="expertise-image-heading" className="text-4xl md:text-5xl font-mono text-white max-w-2xl leading-tight expertise__heading">
                            Contenus créatifs infinis. <br />
                            <span className="text-muted-foreground expertise__heading-sub">À votre image. À la demande.</span>
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center expertise__background">
                        <TechIllustration
                            src="/assets/flux_bg.png"
                            alt="Flux Background"
                            className="absolute inset-0 w-full h-full opacity-50"
                            aspectRatio=""
                        />
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black/40 to-black opacity-80 absolute inset-0 pointer-events-none" />
                    </div>

                    {/* Bottom Left Card */}
                    <div className="mt-auto relative z-10 expertise__card-wrapper">
                        <div id="expertise-image-card" className="max-w-md tech-panel p-6 group expertise__card">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3 expertise__card-header">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="font-mono text-xs text-green-400 tracking-widest">SYSTEM ONLINE</span>
                                </div>
                                <span className="font-mono text-xs text-zinc-500 expertise__card-badge">FLUX-PRO v1.0</span>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl text-white font-mono expertise__card-title">Flux-Pro Gen_AI</h3>
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-muted-foreground border border-white/10 px-2 py-1 rounded expertise__card-meta">
                                    <Paintbrush className="w-3 h-3" /> Génératif LoRA
                                </div>
                            </div>

                            <p className="text-zinc-400 text-sm font-mono leading-relaxed mb-6 expertise__card-description">
                                Modèles entraînés sur mesure qui respectent parfaitement votre charte graphique, vos palettes de couleurs et vos produits.
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500 bg-white/5 p-3 rounded border border-white/5 expertise__card-stats">
                                <div className="flex justify-between"><span>TRAINING</span><span className="text-white">COMPLETED</span></div>
                                <div className="flex justify-between"><span>ACCURACY</span><span className="text-green-400">99.8%</span></div>
                                <div className="flex justify-between"><span>RES</span><span className="text-white">4K+ UBER_REAL</span></div>
                                <div className="flex justify-between"><span>LATENCY</span><span className="text-white">24ms</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col expertise__sidebar">

                    {/* Top Description Block */}
                    <div className="p-12 border-b border-border bg-zinc-900/20 relative overflow-hidden group expertise__description">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none expertise__watermark">
                            <div className="text-[10px] font-mono text-white tracking-widest leading-none">
                                /// CREATIVE /// GEN-AI ///
                            </div>
                        </div>
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-8 expertise__text">
                            Arrêtez les banques d'images. Générez des assets marketing uniques et haute qualité qui racontent votre histoire spécifique.
                        </p>
                        <button id="expertise-image-cta" className="bg-white text-black font-mono font-bold uppercase px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors w-full justify-center expertise__cta">
                            Voir la Galerie <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Research Items List */}
                    <div className="flex-1 flex flex-col expertise__items">
                        <div id="expertise-image-item-1" className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative expertise__item">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 bg-black tech-strips border border-white/10 flex items-center justify-center mb-4 text-white expertise__item-icon">
                                <Layers className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 expertise__item-title">Mise en Scène Produit</h3>
                            <p className="text-muted-foreground text-sm font-mono expertise__item-description">Placez vos produits dans n'importe quel environnement sans shooting photo coûteux.</p>
                        </div>

                        <div id="expertise-image-item-2" className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative expertise__item">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 bg-black tech-strips border border-white/10 flex items-center justify-center mb-4 text-white expertise__item-icon">
                                <ImageIcon className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 expertise__item-title">Réseaux Sociaux</h3>
                            <p className="text-muted-foreground text-sm font-mono expertise__item-description">Génération de contenu quotidien aligné avec les tendances actuelles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
