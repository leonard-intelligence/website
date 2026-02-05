import { TechCard } from "../ui/TechCard";

export function Methodology() {
    return (
        <section id="section-methodology" className="py-24 bg-black" aria-labelledby="methodology-heading">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="reveal-up">
                        <div className="absolute -inset-4 bg-[#E67E22]/10 blur-3xl -z-10 rounded-full opacity-50" aria-hidden="true" />
                        <span className="text-[#E67E22] font-mono text-sm tracking-widest uppercase mb-4 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#E67E22] rounded-full animate-pulse"></span>
                            Approche Sur-Mesure
                        </span>
                        <h2 id="methodology-heading" className="text-4xl font-medium font-mono text-white relative z-10">
                            Liberté <span className="text-[#E67E22]">Architecturale.</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-lg text-right hidden md:block font-mono text-sm">
                        Nous choisissons la meilleure technologie pour votre besoin,<br />
                        sans dogmatisme.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
                    {/* LEFT COLUMN: THE CORE (OPEN SOURCE) - 7 COLUMNS */}
                    <TechCard
                        className="lg:col-span-7 group relative !bg-[#121110] p-10 flex flex-col justify-between overflow-hidden"
                        style={{ "--hover-border-color": "#E67E22" } as React.CSSProperties}
                    >
                        {/* Technical Grid Background */}
                        <div className="absolute inset-0 bg-pattern-grid opacity-[0.03]" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E67E22]/5 blur-[100px] -z-10" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-12">
                                <div className="font-mono text-xs text-[#E67E22] flex items-center gap-4">
                                    <span className="w-8 h-[1px] bg-[#E67E22]"></span>
                                    SOUVERAINETÉ & CONTRÔLE
                                </div>
                            </div>

                            <h3 className="text-4xl font-mono font-medium text-white mb-8 group-hover:translate-x-2 transition-transform duration-500">
                                Construisez <br />
                                <span className="text-[#E67E22]">en local</span>
                            </h3>

                            <div className="flex flex-col gap-8">
                                <div className="space-y-4 max-w-2xl">
                                    <h4 className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Notre Priorité</h4>
                                    <p className="text-zinc-300 font-mono text-sm leading-relaxed">
                                        Favoriser les solutions Open Source et locales pour une confidentialité totale de vos données et l'indépendance technologique.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">LLM / Texte</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Qwen 3', 'Mistral Large 3 🇫🇷', 'MiniMax M1', 'GPT-OSS'].map(t => (
                                                <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-[9px] font-mono hover:border-[#E67E22]/50 hover:text-white transition-colors cursor-default whitespace-nowrap">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Code</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Kimi k2.5 Think', 'GLM 4.7', 'MiniMax M2.1', 'DeepSeek V3.2 Think', 'Qwen 3 Coder'].map(t => (
                                                <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-[9px] font-mono hover:border-[#E67E22]/50 hover:text-white transition-colors cursor-default whitespace-nowrap">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Vision</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Nvila 15B', 'Qwen 3 VL', 'Mistral Small 3 🇫🇷'].map(t => (
                                                <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-[9px] font-mono hover:border-[#E67E22]/50 hover:text-white transition-colors cursor-default whitespace-nowrap">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Text to Image</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Flux 2 Klein', 'Qwen Image 2.5', 'SD 3.5 Large', 'GLM Image'].map(t => (
                                                <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-[9px] font-mono hover:border-[#E67E22]/50 hover:text-white transition-colors cursor-default whitespace-nowrap">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Image Edit</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Qwen Edit 2.5', 'Flux 2 Klein'].map(t => (
                                                <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-[9px] font-mono hover:border-[#E67E22]/50 hover:text-white transition-colors cursor-default whitespace-nowrap">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Text to Video</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Wan 2.2', 'Mochi v1', 'LTX 2'].map(t => (
                                                <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-[9px] font-mono hover:border-[#E67E22]/50 hover:text-white transition-colors cursor-default whitespace-nowrap">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                            <span className="text-zinc-600 font-mono text-[10px]">INFRASTRUCTURE : ON-PREMISE / CLOUD PRIVÉ</span>
                            <div className="w-12 h-12 rounded-full border border-[#E67E22]/20 flex items-center justify-center group-hover:bg-[#E67E22] group-hover:text-black transition-all duration-500">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </TechCard>

                    {/* RIGHT COLUMN: THE EDGE (PROPRIETARY) - 5 COLUMNS */}
                    <TechCard
                        className="lg:col-span-5 group relative !bg-[#0A0B10] p-10 flex flex-col justify-between overflow-hidden"
                        style={{ "--hover-border-color": "#E67E22" } as React.CSSProperties}
                    >
                        {/* Orange Glow Effect (Replaces Blue) */}
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E67E22]/5 blur-[80px] -z-10" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-12">
                                <div className="font-mono text-xs text-[#E67E22] flex items-center gap-4">
                                    <span className="w-8 h-[1px] bg-[#E67E22]"></span>
                                    PERFORMANCE SOTA
                                </div>
                            </div>

                            <h3 className="text-4xl font-mono font-medium text-white mb-8 group-hover:translate-x-2 transition-transform duration-500">
                                À la pointe <br />
                                <span className="text-[#E67E22]">de la technologie</span>
                            </h3>

                            <div className="space-y-6">
                                <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-6">
                                    Nous connectons votre infrastructure à l'élite des modèles mondiaux. Une sélection rigoureuse et agnostique pour l'excellence sur chaque modalité.
                                </p>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                    {/* Row 1 */}
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">LLM / Texte</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Gemini 3 Pro', 'Claude 4.5', 'GPT-5.1'].map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-[#E67E22]/5 border border-[#E67E22]/10 text-zinc-300 text-[9px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Code</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Claude 4.5', 'GPT-5.2', 'Gemini 3'].map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-[#E67E22]/5 border border-[#E67E22]/10 text-zinc-300 text-[9px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Vision</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Gemini 3 Pro', 'GPT-5.2', 'Kimi k2.5'].map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-[#E67E22]/5 border border-[#E67E22]/10 text-zinc-300 text-[9px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Search</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Gemini Grounding', 'GPT-5.2', 'PPL Sonar'].map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-[#E67E22]/5 border border-[#E67E22]/10 text-zinc-300 text-[9px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Row 3 */}
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Text to Image</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['GPT Image 1.5', 'Flux 2 Max', 'Hunyuan 3'].map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-[#E67E22]/5 border border-[#E67E22]/10 text-zinc-300 text-[9px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Image Edit</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['ChatGPT Edit', 'Seedream 4.5', 'Hunyuan Instruct'].map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-[#E67E22]/5 border border-[#E67E22]/10 text-zinc-300 text-[9px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Row 4 */}
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Text to Video</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Veo 3.1', 'Sora 2 Pro', 'Wan 2.5'].map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-[#E67E22]/5 border border-[#E67E22]/10 text-zinc-300 text-[9px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-1">Video Edit</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Veo 3.1', 'Wan 2.5', 'Kling 2.6'].map(t => (
                                                <span key={t} className="px-1.5 py-0.5 bg-[#E67E22]/5 border border-[#E67E22]/10 text-zinc-300 text-[9px] font-mono">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px]">
                                <span className="w-2 h-2 rounded-full bg-[#E67E22]/40 animate-pulse"></span>
                                STATUS : INTEGRATION PREVIEW
                            </div>
                        </div>
                    </TechCard>
                </div>

                {/* ALTERNATIVE VIEW: CAPABILITY CARDS */}
                <div className="mt-32 border-t border-white/5 pt-24">
                    <div className="text-center mb-16 reveal-up">
                        <span className="text-[#E67E22] font-mono text-xs tracking-widest uppercase mb-4 block">Catalogue de Puissance</span>
                        <h3 className="text-3xl font-mono font-medium text-white mb-4">
                            L'Arsenal <span className="text-[#E67E22]">Technologique.</span>
                        </h3>
                        <p className="text-zinc-400 font-mono text-sm max-w-xl mx-auto">
                            Déployez la meilleure intelligence pour chaque tâche. Comparez et sélectionnez vos modèles par capacité critique.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Génération de Texte",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                ),
                                os: ['Qwen 3', 'Mistral Large 3 🇫🇷', 'MiniMax M1', 'GPT-OSS'],
                                prop: ['Gemini 3 Pro', 'Claude 4.5', 'GPT-5.1']
                            },
                            {
                                title: "Code & Raisonnement",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                ),
                                os: ['Kimi k2.5 Think', 'GLM 4.7', 'MiniMax M2.1', 'DeepSeek V3.2 Think', 'Qwen 3 Coder'],
                                prop: ['Claude 4.5', 'GPT-5.2', 'Gemini 3']
                            },
                            {
                                title: "Vision Multimodale",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ),
                                os: ['Nvila 15B', 'Qwen 3 VL', 'Mistral Small 3 🇫🇷'],
                                prop: ['Gemini 3 Pro', 'GPT-5.2', 'Kimi k2.5']
                            },
                            {
                                title: "Génération d'Image",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                ),
                                os: ['Flux 2 Klein', 'Qwen Image 2.5', 'SD 3.5 Large', 'GLM Image'],
                                prop: ['GPT Image 1.5', 'Flux 2 Max', 'Hunyuan 3']
                            },
                            {
                                title: "Génération Vidéo",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                ),
                                os: ['Wan 2.2', 'Mochi v1', 'LTX 2'],
                                prop: ['Veo 3.1', 'Sora 2 Pro', 'Wan 2.5']
                            },
                            {
                                title: "Édition Avancée",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                ),
                                os: ['Qwen Edit 2.5', 'Flux 2 Klein'],
                                prop: ['ChatGPT Edit', 'Seedream 4.5', 'Hunyuan Instruct']
                            }
                        ].map((card, i) => (
                            <div key={i} className="group relative bg-[#121110] border border-white/5 hover:border-[#E67E22]/30 transition-all duration-500 overflow-hidden flex flex-col">
                                <div className="absolute inset-0 bg-pattern-grid opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />

                                <div className="p-6 border-b border-white/5 relative z-10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#E67E22]">{card.icon}</span>
                                        <h4 className="text-zinc-200 font-mono text-sm tracking-wide uppercase">{card.title}</h4>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22]/20 group-hover:bg-[#E67E22] transition-colors" />
                                </div>

                                <div className="p-6 grid grid-cols-2 gap-6 relative z-10 flex-1">
                                    <div className="space-y-3">
                                        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1 h-1 bg-white/30 rounded-full" />
                                            Open Source
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            {card.os.map(m => (
                                                <span key={m} className="text-zinc-400 text-xs font-mono hover:text-white transition-colors cursor-default whitespace-nowrap overflow-hidden text-ellipsis">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3 border-l border-white/5 pl-6">
                                        <div className="text-[10px] text-[#E67E22] font-mono uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1 h-1 bg-[#E67E22] rounded-full" />
                                            Propriétaire
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            {card.prop.map(m => (
                                                <span key={m} className="text-zinc-400 text-xs font-mono hover:text-white transition-colors cursor-default whitespace-nowrap overflow-hidden text-ellipsis">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
