import { TechCard, TechCardImage } from "@/components/ui/TechCard";
import serverImage from "../../assets/abstract-network.png"; // Using available abstract asset
import { DeploymentIcon } from "./DeploymentIcon";
import iconShield from "../../assets/icon-shield.png";
import iconCloud from "../../assets/icon-astrolab.png"; // Using astrolab for 'complex structure/cloud' metaphor
import iconEdge from "../../assets/icon-loupe.png"; // Using loupe for 'edge/analysis' metaphor

export function Deployment() {
    return (
        <section id="section-deployment" className="deployment-section deployment py-24 bg-black border-b border-white/10 reveal" aria-labelledby="deployment-heading">
            <div className="max-w-7xl mx-auto px-6 deployment__container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center deployment__grid">
                    <div className="deployment__content">
                        <span className="text-brand-blue font-mono text-sm tracking-widest uppercase mb-4 block">Infrastructure</span>
                        <h2 id="deployment-heading" className="text-4xl md:text-5xl font-bold mb-6 font-display text-white leading-tight deployment__heading">
                            Déploiement <span className="text-white/50">Souverain</span> & Sécurisé.
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            Votre IA doit tourner chez vous. Nous maîtrisons l'art du déploiement sur infrastructures isolées, garantissant que vos données ne quittent jamais votre périmètre de confiance.
                        </p>

                        <div className="space-y-4 deployment__cards">
                            <TechCard id="deployment-card-1" className="bg-white/5 p-0 !pb-0 transition-colors cursor-default group deployment__card">
                                <div className="flex items-stretch h-32">
                                    <div className="w-32 h-full shrink-0 border-r border-white/10">
                                        <DeploymentIcon
                                            src={iconShield}
                                            alt="On-Premise Icon"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col justify-center">
                                        <h4 className="text-white font-bold font-mono text-lg mb-1 group-hover:text-brand-blue transition-colors">On-Premise (Air-Gapped)</h4>
                                        <p className="text-sm text-gray-400">Installation sur vos serveurs physiques, sans aucun accès internet.</p>
                                    </div>
                                </div>
                            </TechCard>

                            <TechCard id="deployment-card-2" className="bg-white/5 p-0 !pb-0 transition-colors cursor-default group deployment__card">
                                <div className="flex items-stretch h-32">
                                    <div className="w-32 h-full shrink-0 border-r border-white/10">
                                        <DeploymentIcon
                                            src={iconCloud}
                                            alt="Private Cloud Icon"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col justify-center">
                                        <h4 className="text-white font-bold font-mono text-lg mb-1 group-hover:text-brand-blue transition-colors">Private Cloud (SecNumCloud)</h4>
                                        <p className="text-sm text-gray-400">Déploiement sur instances dédiées (OVH, NumSpot, Outscale).</p>
                                    </div>
                                </div>
                            </TechCard>

                            <TechCard id="deployment-card-3" className="bg-white/5 p-0 !pb-0 transition-colors cursor-default group deployment__card">
                                <div className="flex items-stretch h-32">
                                    <div className="w-32 h-full shrink-0 border-r border-white/10">
                                        <DeploymentIcon
                                            src={iconEdge}
                                            alt="Edge AI Icon"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col justify-center">
                                        <h4 className="text-white font-bold font-mono text-lg mb-1 group-hover:text-brand-blue transition-colors">Edge AI</h4>
                                        <p className="text-sm text-gray-400">Inférence optimisée sur postes de travail ou équipements industriels.</p>
                                    </div>
                                </div>
                            </TechCard>
                        </div>
                    </div>

                    <div className="relative h-[600px] hidden lg:block deployment__visual">
                        <TechCard className="h-full border-none" showMarkers={false}>
                            <TechCardImage
                                src={serverImage}
                                alt="Server Rack"
                                layout="full"
                                className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            {/* Overlay UI elements to make it look 'tech' */}
                            <div id="deployment-panel" className="absolute top-10 left-10 right-10 tech-panel p-6 deployment__panel">
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
