import { ArrowUpRight, Mic, Activity, Waves } from 'lucide-react';
import { TechIllustration } from "@/components/ui/TechIllustration";

export function SectionAudio() {
    return (
        <section id="section-expertise-audio" className="sections-container expertise expertise--audio border-y border-border bg-black" aria-labelledby="expertise-audio-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] expertise__grid">

                {/* LEFT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col border-r border-border order-2 lg:order-1 expertise__sidebar">
                    <div className="p-12 border-b border-border bg-zinc-900/20 relative overflow-hidden group expertise__description">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none expertise__watermark">
                            <div className="text-[10px] font-mono text-white tracking-widest leading-none">
                                /// AUDIO /// SIGNAL ///
                            </div>
                        </div>
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-8 expertise__text">
                            Transformez la voix et les sons en données structurées. Identification, séparation et analyse sémantique temps réel.
                        </p>
                        <button id="expertise-audio-cta" className="bg-white text-black font-mono font-bold uppercase px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors w-full justify-center expertise__cta">
                            Découvrir les Modèles Audio <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col expertise__items">
                        <div id="expertise-audio-item-1" className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative expertise__item">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 bg-black tech-strips border border-white/10 flex items-center justify-center mb-4 text-white expertise__item-icon">
                                <Activity className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 expertise__item-title">Retranscription (STT)</h3>
                            <p className="text-muted-foreground text-sm font-mono expertise__item-description">Conversion parole-texte haute fidélité, multi-locuteurs et multilingue.</p>
                        </div>

                        <div id="expertise-audio-item-2" className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative expertise__item">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 bg-black tech-strips border border-white/10 flex items-center justify-center mb-4 text-white expertise__item-icon">
                                <Waves className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 expertise__item-title">Isolation Sonore</h3>
                            <p className="text-muted-foreground text-sm font-mono expertise__item-description">Séparation de sources audio (voix/bruit) pour un nettoyage parfait.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 relative p-12 flex flex-col justify-between overflow-hidden order-1 lg:order-2 expertise__main">
                    {/* Header Area */}
                    <div className="relative z-10 mb-12 text-right expertise__header">
                        <div className="text-cyan-500 font-mono mb-2 text-lg expertise__number expertise__number--04">04 Audio & Voice.</div>
                        <h2 id="expertise-audio-heading" className="text-4xl md:text-5xl font-mono text-white leading-tight ml-auto max-w-2xl expertise__heading">
                            Captez chaque nuance <br />
                            <span className="text-muted-foreground expertise__heading-sub">de votre environnement sonore.</span>
                        </h2>
                    </div>

                    {/* Central Image Area - Waveform Visualization */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen expertise__background">
                        <TechIllustration
                            src="/assets/audio_background.jpg"
                            alt="Audio Analytics Visualization"
                            className="absolute inset-0 w-full h-full"
                            aspectRatio=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Bottom Right Card */}
                    <div className="mt-auto relative z-10 ml-auto expertise__card-wrapper">
                        <div id="expertise-audio-card" className="max-w-md tech-panel p-6 group expertise__card">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3 expertise__card-header">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                    </span>
                                    <span className="font-mono text-xs text-cyan-400 tracking-widest">LIVE STREAM</span>
                                </div>
                                <span className="font-mono text-xs text-zinc-500 expertise__card-badge">WHISPER-V3 TURBO</span>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl text-white font-mono expertise__card-title">Whisper-v3-Turbo</h3>
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-muted-foreground border border-white/10 px-2 py-1 rounded expertise__card-meta">
                                    <Mic className="w-3 h-3" /> Optimized
                                </div>
                            </div>

                            <p className="text-zinc-400 text-sm font-mono leading-relaxed mb-6 expertise__card-description">
                                Pipeline d'analyse audio temps réel capable d'identifier les locuteurs, les émotions et les intentions derrière les mots.
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500 bg-white/5 p-3 rounded border border-white/5 expertise__card-stats">
                                <div className="flex justify-between"><span>WER</span><span className="text-white">&lt;5%</span></div>
                                <div className="flex justify-between"><span>DIARIZATION</span><span className="text-cyan-400">ON</span></div>
                                <div className="flex justify-between"><span>LANGUAGES</span><span className="text-white">99+</span></div>
                                <div className="flex justify-between"><span>STATUS</span><span className="text-green-400">ACTIVE</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
