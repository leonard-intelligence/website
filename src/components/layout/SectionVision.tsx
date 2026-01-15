import { ArrowUpRight, Eye, Video, ScanFace } from 'lucide-react';
import { TechCard } from "@/components/ui/TechCard";
import { TechIllustration } from "@/components/ui/TechIllustration";

export function SectionVision() {
    return (
        <section id="section-expertise-vision" className="sections-container expertise expertise--vision border-y border-border bg-black" aria-labelledby="expertise-vision-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] expertise__grid">

                {/* LEFT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 border-r border-border relative p-12 flex flex-col justify-between overflow-hidden expertise__main">

                    {/* Header Area */}
                    <div className="relative z-10 mb-12 expertise__header">
                        <div className="text-blue-500 font-mono mb-2 text-lg expertise__number expertise__number--01">01 Vision.</div>
                        <h2 id="expertise-vision-heading" className="text-4xl md:text-5xl font-mono text-white max-w-2xl leading-tight expertise__heading">
                            Donnez des yeux à votre IA. <br />
                            <span className="text-muted-foreground expertise__heading-sub">Analyse multimodale en temps réel.</span>
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none expertise__background">
                        <TechIllustration
                            src="/assets/vision_background.png"
                            alt="Vision AI Background"
                            className="absolute inset-0 w-full h-full"
                            aspectRatio="aspect-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    {/* Bottom Left Card */}
                    <div className="mt-auto relative z-10 expertise__card-wrapper">
                        <TechCard id="expertise-vision-card" className="max-w-md bg-black/80 backdrop-blur-sm p-6 transition-colors group expertise__card">
                            <div className="flex justify-between items-start mb-4 expertise__card-header">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl text-white font-mono expertise__card-title">Vision-1B</h3>
                                    <span className="text-[10px] uppercase border border-blue-500/30 text-blue-500 px-1 py-0.5 expertise__card-badge">Live</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground expertise__card-meta">
                                    <Eye className="w-3 h-3" /> Suivi d'objets
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm font-mono leading-relaxed mb-6 expertise__card-description">
                                Vision par ordinateur avancée capable de détecter les anomalies, suivre les stocks et assurer la conformité de sécurité sur les flux vidéo.
                            </p>
                            <div className="text-xs text-muted-foreground font-mono flex items-center gap-4 expertise__card-stats">
                                <span>FPS: 60+</span>
                                <span>Latence: &lt;50ms</span>
                            </div>
                        </TechCard>
                    </div>
                </div>

                {/* RIGHT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col expertise__sidebar">

                    {/* Top Description Block */}
                    <div className="p-12 border-b border-border bg-zinc-900/20 relative overflow-hidden group expertise__description">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none expertise__watermark">
                            <div className="text-[10px] font-mono text-white tracking-widest leading-none">
                                /// VISION /// DETECTION ///
                            </div>
                        </div>
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-8 expertise__text">
                            Du contrôle qualité industriel à l'analyse retail. Nos modèles de vision comprennent le monde, pas seulement les pixels.
                        </p>
                        <button id="expertise-vision-cta" className="bg-white text-black font-mono font-bold uppercase px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors w-full justify-center expertise__cta">
                            Explorer les Cas Vision <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Research Items List */}
                    <div className="flex-1 flex flex-col expertise__items">
                        <div id="expertise-vision-item-1" className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative expertise__item">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 bg-black tech-strips border border-white/10 flex items-center justify-center mb-4 text-white expertise__item-icon">
                                <ScanFace className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 expertise__item-title">Contrôle Qualité</h3>
                            <p className="text-muted-foreground text-sm font-mono expertise__item-description">Détection de défauts avec 99.9% de précision sur lignes de production.</p>
                        </div>

                        <div id="expertise-vision-item-2" className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative expertise__item">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 bg-black tech-strips border border-white/10 flex items-center justify-center mb-4 text-white expertise__item-icon">
                                <Video className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 expertise__item-title">Sécurité & Sûreté</h3>
                            <p className="text-muted-foreground text-sm font-mono expertise__item-description">Détection automatisée d'intrusion et conformité EPI.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
