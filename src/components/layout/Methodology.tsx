import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { cn } from "@/lib/utils";
import { LocalSovereigntyDemo } from "./LocalSovereigntyDemo";
import { GlobalTechDemo } from "./GlobalTechDemo";
import sovereigntyBg from "@/assets/images/illustrations/illustration-infra-dark-side.webp";
import performanceBg from "@/assets/images/illustrations/illustration-tech-blade-runner.webp";

export function Methodology() {
    return (
        <section id="section-methodology" className="py-24 bg-black" aria-labelledby="methodology-heading">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col mb-16">
                    <div className="reveal-up mb-12">
                        <div className="absolute -inset-4 bg-[#E67E22]/10 blur-3xl -z-10 rounded-full opacity-50" aria-hidden="true" />
                        <span className="text-[#E67E22] text-sm tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#E67E22] rounded-full animate-pulse"></span>
                            Approche Sur-Mesure
                        </span>
                        <h2 id="methodology-heading" className="text-4xl md:text-5xl font-medium font-mono text-white relative z-10 uppercase mb-4">
                            De l'audit au déploiement. <br className="hidden md:block" />
                            <span className="text-zinc-500">En 8 semaines.</span>
                        </h2>
                        <p className="text-zinc-400 font-mono text-sm">
                            Souverain par défaut. Open-source en priorité.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-[#E67E22]/0 via-[#E67E22]/30 to-[#E67E22]/0 z-0"></div>

                        {/* STEP 1 */}
                        <div className="group relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-[#121110] border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-[#E67E22]/50 group-hover:bg-[#E67E22]/5 transition-all duration-500 relative">
                                <div className="absolute inset-0 bg-[#E67E22]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                                <DotIcon icon={leonardIcons.search} size={32} fillColor="#E67E22" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1A1918] border border-white/10 flex items-center justify-center text-[#E67E22] font-mono text-xs font-bold">1</div>
                            </div>
                            <h3 className="text-xl font-mono text-white uppercase mb-2 group-hover:text-[#E67E22] transition-colors">Audit & Quick Wins</h3>
                            <span className="text-[#E67E22] text-xs font-mono mb-3 py-1 px-2 bg-[#E67E22]/10 rounded border border-[#E67E22]/20">Semaine 1-2</span>
                            <p className="text-zinc-400 text-sm max-w-[240px]">On identifie vos cas d'usage à fort ROI. Vous voyez les <span className="text-white">premiers résultats</span>.</p>
                        </div>

                        {/* STEP 2 */}
                        <div className="group relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-[#121110] border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-[#E67E22]/50 group-hover:bg-[#E67E22]/5 transition-all duration-500 relative">
                                <div className="absolute inset-0 bg-[#E67E22]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                                <DotIcon icon={leonardIcons.sparkles} size={32} fillColor="#E67E22" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1A1918] border border-white/10 flex items-center justify-center text-[#E67E22] font-mono text-xs font-bold">2</div>
                            </div>
                            <h3 className="text-xl font-mono text-white uppercase mb-2 group-hover:text-[#E67E22] transition-colors">POC sur cas réel</h3>
                            <span className="text-[#E67E22] text-xs font-mono mb-3 py-1 px-2 bg-[#E67E22]/10 rounded border border-[#E67E22]/20">Semaine 3-5</span>
                            <p className="text-zinc-400 text-sm max-w-[240px]">Un agent fonctionnel, sur vos données, <span className="text-white">intégré à vos outils</span>.</p>
                        </div>

                        {/* STEP 3 */}
                        <div className="group relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-[#121110] border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-[#E67E22]/50 group-hover:bg-[#E67E22]/5 transition-all duration-500 relative">
                                <div className="absolute inset-0 bg-[#E67E22]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                                <DotIcon icon={leonardIcons.building} size={32} fillColor="#E67E22" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1A1918] border border-white/10 flex items-center justify-center text-[#E67E22] font-mono text-xs font-bold">3</div>
                            </div>
                            <h3 className="text-xl font-mono text-white uppercase mb-2 group-hover:text-[#E67E22] transition-colors">Production</h3>
                            <span className="text-[#E67E22] text-xs font-mono mb-3 py-1 px-2 bg-[#E67E22]/10 rounded border border-[#E67E22]/20">Semaine 6-8</span>
                            <p className="text-zinc-400 text-sm max-w-[240px]">Déploiement, formation des équipes, <span className="text-white">monitoring</span>.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border border-white/10 overflow-hidden">

                    {/* SECTION 1: OPEN SOURCE (CONSTRUISEZ EN LOCAL) */}
                    <div className="border-b border-white/10">
                        {/* Header Row: Title (8) + Animation (4) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                            <div className="lg:col-span-8 relative border-r border-white/10 bg-[#121110]/20 p-12 flex flex-col justify-between group overflow-hidden">
                                <div className="absolute inset-0 z-0">
                                    <TechIllustration
                                        src={sovereigntyBg}
                                        alt=""
                                        className="w-full h-full"
                                        overlayGradient="bg-gradient-to-r from-[#121110] via-transparent to-transparent opacity-80"
                                        imageClassName="opacity-10 group-hover:opacity-20"
                                        aspectRatio=""
                                    />
                                </div>
                                <div className="absolute inset-0 bg-pattern-grid opacity-[0.03]" />
                                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E67E22]/5 blur-[120px] -z-10" />

                                <div className="relative z-10">
                                    <div className="font-mono text-sm text-[#E67E22] flex items-center gap-4 mb-8">
                                        <span className="w-8 h-[1px] bg-[#E67E22]"></span>
                                        SOUVERAINETÉ & CONTRÔLE
                                    </div>
                                    <h3 className="text-5xl font-mono font-medium text-white max-w-lg leading-tight uppercase tracking-tight">
                                        Construisez <br />
                                        <span className="text-[#E67E22]">en local.</span>
                                    </h3>
                                </div>
                                <p className="text-zinc-500 font-mono text-sm max-w-md relative z-10 mt-16 leading-relaxed">
                                    Favoriser les solutions Open Source et locales pour une confidentialité totale et l'indépendance technologique.
                                </p>
                            </div>

                            {/* Animation Placeholder -> Replaced with LocalSovereigntyDemo */}
                            <div className="lg:col-span-4 bg-[#1A1918] flex items-center justify-center relative overflow-hidden group min-h-[300px]">
                                <LocalSovereigntyDemo />
                            </div>
                        </div>

                        {/* Content Grid: 6 Cells Glued */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-white/10">
                            {[
                                { title: "LLM", icon: leonardIcons.languageProcess, models: ['Qwen 3', 'Mistral Large 3 🇫🇷', 'MiniMax M1', 'GPT-OSS'] },
                                { title: "Code", icon: leonardIcons.architectureAgnostique, models: ['Kimi k2.5 Think', 'GLM 4.7', 'MiniMax M2.1', 'DeepSeek V3.2 Think', 'Qwen 3 Coder'] },
                                { title: "Vision", icon: leonardIcons.computerVision, models: ['Nvila 15B', 'Qwen 3 VL', 'Mistral Small 3 🇫🇷'] },
                                { title: "Image Gen", icon: leonardIcons.imageGeneration, models: ['Flux 2 Klein', 'Qwen Image 2.5', 'SD 3.5 Large', 'GLM Image'] },
                                { title: "Image Edit", icon: leonardIcons.productionAutomatisee, models: ['Qwen Edit 2.5', 'Flux 2 Klein'] },
                                { title: "Video Gen", icon: leonardIcons.videoIntelligence, models: ['Wan 2.2', 'Mochi v1', 'LTX 2'] }
                            ].map((card, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "group relative flex flex-col p-8 border-white/10 hover:bg-white/5 transition-all duration-300",
                                        i % 6 !== 5 ? "lg:border-r" : "",
                                        i % 2 !== 1 ? "border-r md:border-r" : "",
                                        i > 1 ? "border-t md:border-t-0" : ""
                                    )}
                                >
                                    <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-[#E67E22] group-hover:scale-110 transition-transform duration-300">
                                        <DotIcon icon={card.icon} size={20} fillColor="#E67E22" />
                                    </div>
                                    <h4 className="text-white font-mono text-sm uppercase tracking-wider mb-4 group-hover:text-[#E67E22] transition-colors">
                                        {card.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {card.models.map(m => (
                                            <span key={m} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/10 transition-colors cursor-default whitespace-nowrap">
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 2: PROPRIETARY (A LA POINTE) */}
                    <div>
                        {/* Header Row: Animation (4) + Title (8) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                            {/* Animation Placeholder -> Replaced with GlobalTechDemo */}
                            <div className="lg:col-span-4 bg-[#1A1918] border-r border-white/10 flex items-center justify-center relative overflow-hidden group min-h-[300px] order-2 lg:order-1">
                                <GlobalTechDemo />
                            </div>

                            <div className="lg:col-span-8 relative bg-[#121110]/20 p-12 flex flex-col justify-between order-1 lg:order-2 group overflow-hidden">
                                <div className="absolute inset-0 z-0">
                                    <TechIllustration
                                        src={performanceBg}
                                        alt=""
                                        className="w-full h-full"
                                        overlayGradient="bg-gradient-to-l from-[#121110] via-transparent to-transparent opacity-80"
                                        imageClassName="opacity-10 group-hover:opacity-20"
                                        aspectRatio=""
                                    />
                                </div>
                                <div className="absolute inset-0 bg-pattern-grid opacity-[0.03]" />
                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E67E22]/5 blur-[120px] -z-10" />

                                <div className="relative z-10 w-full text-right">
                                    <div className="font-mono text-sm text-[#E67E22] flex items-center justify-end gap-4 mb-8">
                                        PERFORMANCE SOTA
                                        <span className="w-8 h-[1px] bg-[#E67E22]"></span>
                                    </div>
                                    <h3 className="text-5xl font-mono font-medium text-white leading-tight uppercase tracking-tight">
                                        À la pointe <br />
                                        <span className="text-[#E67E22]">de la technologie.</span>
                                    </h3>
                                </div>
                                <p className="text-zinc-500 font-mono text-sm max-w-md ml-auto text-right relative z-10 mt-16 leading-relaxed">
                                    Nous connectons votre infrastructure à l'élite des modèles mondiaux. Une sélection rigoureuse pour l'excellence.
                                </p>
                            </div>
                        </div>

                        {/* Content Grid: 6 Cells Glued */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-white/10">
                            {[
                                { title: "LLM", icon: leonardIcons.languageProcess, models: ['Gemini 3 Pro', 'Claude 4.5', 'GPT-5.1'] },
                                { title: "Code", icon: leonardIcons.architectureAgnostique, models: ['Claude 4.5', 'GPT-5.2', 'Gemini 3'] },
                                { title: "Vision", icon: leonardIcons.computerVision, models: ['Gemini 3 Pro', 'GPT-5.2', 'Kimi k2.5'] },
                                { title: "Image Gen", icon: leonardIcons.imageGeneration, models: ['GPT Image 1.5', 'Flux 2 Max', 'Hunyuan 3'] },
                                { title: "Image Edit", icon: leonardIcons.productionAutomatisee, models: ['ChatGPT Edit', 'Seedream 4.5', 'Hunyuan Instruct'] },
                                { title: "Video Gen", icon: leonardIcons.videoIntelligence, models: ['Veo 3.1', 'Sora 2 Pro', 'Kling 3.0', 'Runway gen 4.5'] }
                            ].map((card, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "group relative flex flex-col p-8 border-white/10 hover:bg-white/5 transition-all duration-300",
                                        i % 6 !== 5 ? "lg:border-r" : "",
                                        i % 2 !== 1 ? "border-r md:border-r" : "",
                                        i > 1 ? "border-t md:border-t-0" : ""
                                    )}
                                >
                                    <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-[#E67E22] group-hover:scale-110 transition-transform duration-300">
                                        <DotIcon icon={card.icon} size={20} fillColor="#E67E22" />
                                    </div>
                                    <h4 className="text-white font-mono text-sm uppercase tracking-wider mb-4 group-hover:text-[#E67E22] transition-colors">
                                        {card.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {card.models.map(m => (
                                            <span key={m} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/10 transition-colors cursor-default whitespace-nowrap">
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
