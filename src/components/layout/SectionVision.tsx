import { ArrowUpRight, Eye, Video, ScanFace } from 'lucide-react';
import { TechCard } from "@/components/ui/TechCard";

export function SectionVision() {
    return (
        <section className="sections-container border-b border-border bg-black">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                {/* LEFT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 border-r border-border relative p-12 flex flex-col justify-between overflow-hidden">

                    {/* Header Area */}
                    <div className="relative z-10 mb-12">
                        <div className="text-brand-blue font-mono mb-2 text-lg">01 Vision.</div>
                        <h2 className="text-4xl md:text-5xl font-mono text-white max-w-2xl leading-tight">
                            Donnez des yeux à votre IA. <br />
                            <span className="text-muted-foreground">Analyse multimodale en temps réel.</span>
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
                        {/* Placeholder visual - ideal for a 'vision' graphic */}
                        <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/10 blur-3xl animate-pulse" />
                    </div>

                    {/* Bottom Left Card */}
                    <div className="mt-auto relative z-10">
                        <TechCard className="max-w-md bg-black/80 backdrop-blur-sm border border-border p-6 hover:border-brand-blue/50 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl text-white font-mono">Vision-1B</h3>
                                    <span className="text-[10px] uppercase border border-brand-blue/30 text-brand-blue px-1 py-0.5">Live</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
                                    <Eye className="w-3 h-3" /> Suivi d'objets
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm font-mono leading-relaxed mb-6">
                                Vision par ordinateur avancée capable de détecter les anomalies, suivre les stocks et assurer la conformité de sécurité sur les flux vidéo.
                            </p>
                            <div className="text-xs text-muted-foreground font-mono flex items-center gap-4">
                                <span>FPS: 60+</span>
                                <span>Latence: &lt;50ms</span>
                            </div>
                        </TechCard>
                    </div>
                </div>

                {/* RIGHT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col">

                    {/* Top Description Block */}
                    <div className="p-12 border-b border-border bg-zinc-900/20">
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-8">
                            Du contrôle qualité industriel à l'analyse retail. Nos modèles de vision comprennent le monde, pas seulement les pixels.
                        </p>
                        <button className="bg-white text-black font-mono font-bold uppercase px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors w-full justify-center">
                            Explorer les Cas Vision <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Research Items List */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center mb-4 text-white">
                                <ScanFace className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Contrôle Qualité</h3>
                            <p className="text-muted-foreground text-sm font-mono">Détection de défauts avec 99.9% de précision sur lignes de production.</p>
                        </div>

                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center mb-4 text-white">
                                <Video className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Sécurité & Sûreté</h3>
                            <p className="text-muted-foreground text-sm font-mono">Détection automatisée d'intrusion et conformité EPI.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
