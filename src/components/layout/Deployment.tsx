import { TechCard, TechCardImage } from "@/components/ui/TechCard";
import serverImage from "../../assets/abstract-network.png"; // Using available abstract asset

export function Deployment() {
    return (
        <section className="deployment-section py-24 bg-black border-b border-white/10 reveal" id="deployment">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-brand-blue font-mono text-sm tracking-widest uppercase mb-4 block">Infrastructure</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-white leading-tight">
                            Déploiement <span className="text-white/50">Souverain</span> & Sécurisé.
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            Votre IA doit tourner chez vous. Nous maîtrisons l'art du déploiement sur infrastructures isolées, garantissant que vos données ne quittent jamais votre périmètre de confiance.
                        </p>

                        <div className="space-y-4">
                            <TechCard className="bg-white/5 border border-white/10 p-6 hover:border-brand-blue/50 transition-colors cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl">🏰</div>
                                    <div>
                                        <h4 className="text-white font-bold font-mono">On-Premise (Air-Gapped)</h4>
                                        <p className="text-sm text-gray-400">Installation sur vos serveurs physiques, sans aucun accès internet.</p>
                                    </div>
                                </div>
                            </TechCard>

                            <TechCard className="bg-white/5 border border-white/10 p-6 hover:border-purple-500/50 transition-colors cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl">☁️</div>
                                    <div>
                                        <h4 className="text-white font-bold font-mono">Private Cloud (SecNumCloud)</h4>
                                        <p className="text-sm text-gray-400">Déploiement sur instances dédiées (OVH, NumSpot, Outscale).</p>
                                    </div>
                                </div>
                            </TechCard>

                            <TechCard className="bg-white/5 border border-white/10 p-6 hover:border-green-500/50 transition-colors cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-green-500/20 text-green-400 flex items-center justify-center text-xl">⚡</div>
                                    <div>
                                        <h4 className="text-white font-bold font-mono">Edge AI</h4>
                                        <p className="text-sm text-gray-400">Inférence optimisée sur postes de travail ou équipements industriels.</p>
                                    </div>
                                </div>
                            </TechCard>
                        </div>
                    </div>

                    <div className="relative h-[600px] hidden lg:block">
                        <TechCard className="h-full border-none" showMarkers={false}>
                            <TechCardImage
                                src={serverImage}
                                alt="Server Rack"
                                layout="full"
                                className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            {/* Overlay UI elements to make it look 'tech' */}
                            <div className="absolute top-10 left-10 right-10 p-6 border border-white/20 bg-black/60 backdrop-blur-md rounded">
                                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                                    <span className="font-mono text-xs text-green-400">● SYSTEM ONLINE</span>
                                    <span className="font-mono text-xs text-gray-500">UNK-800 X1</span>
                                </div>
                                <div className="space-y-2 font-mono text-xs text-gray-300">
                                    <div className="flex justify-between"><span>GPU_LOAD</span><span>[||||||||||--] 84%</span></div>
                                    <div className="flex justify-between"><span>MEM_USAGE</span><span>[||||||-----] 42%</span></div>
                                    <div className="flex justify-between"><span>TEMP</span><span>62°C</span></div>
                                </div>
                            </div>
                        </TechCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
