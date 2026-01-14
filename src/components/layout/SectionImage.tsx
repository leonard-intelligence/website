import { ArrowUpRight, Image as ImageIcon, Paintbrush, Layers } from 'lucide-react';
import { TechCard } from "@/components/ui/TechCard";

export function SectionImage() {
    return (
        <section className="sections-container border-b border-border bg-black">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                {/* LEFT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 border-r border-border relative p-12 flex flex-col justify-between overflow-hidden">

                    {/* Header Area */}
                    <div className="relative z-10 mb-12">
                        <div className="text-orange-500 font-mono mb-2 text-lg">03 Generation.</div>
                        <h2 className="text-4xl md:text-5xl font-mono text-white max-w-2xl leading-tight">
                            Contenus créatifs infinis. <br />
                            <span className="text-muted-foreground">À votre image. À la demande.</span>
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-50 mix-blend-overlay pointer-events-none">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black" />
                    </div>

                    {/* Bottom Left Card */}
                    <div className="mt-auto relative z-10">
                        <TechCard className="max-w-md bg-black/80 backdrop-blur-sm border border-border p-6 hover:border-orange-500/50 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl text-white font-mono">Flux-Pro</h3>
                                    <span className="text-[10px] uppercase border border-orange-500/30 text-orange-500 px-1 py-0.5">LoRA</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
                                    <Paintbrush className="w-3 h-3" /> Génératif
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm font-mono leading-relaxed mb-6">
                                Modèles entraînés sur mesure qui respectent parfaitement votre charte graphique, vos palettes de couleurs et vos produits.
                            </p>
                            <div className="text-xs text-muted-foreground font-mono">
                                <span>Res: 4K+</span>
                            </div>
                        </TechCard>
                    </div>
                </div>

                {/* RIGHT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col">

                    {/* Top Description Block */}
                    <div className="p-12 border-b border-border bg-zinc-900/20">
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-8">
                            Arrêtez les banques d'images. Générez des assets marketing uniques et haute qualité qui racontent votre histoire spécifique.
                        </p>
                        <button className="bg-white text-black font-mono font-bold uppercase px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors w-full justify-center">
                            Voir la Galerie <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Research Items List */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center mb-4 text-white">
                                <Layers className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Mise en Scène Produit</h3>
                            <p className="text-muted-foreground text-sm font-mono">Placez vos produits dans n'importe quel environnement sans shooting photo coûteux.</p>
                        </div>

                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center mb-4 text-white">
                                <ImageIcon className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Réseaux Sociaux</h3>
                            <p className="text-muted-foreground text-sm font-mono">Génération de contenu quotidien aligné avec les tendances actuelles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
