import { ArrowUpRight, Mic, Activity, Waves } from 'lucide-react';
import { TechCard } from "@/components/ui/TechCard";

export function SectionAudio() {
    return (
        <section className="sections-container border-y border-border bg-black" aria-labelledby="audio-heading">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                {/* LEFT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col border-r border-border order-2 lg:order-1">
                    <div className="p-12 border-b border-border bg-zinc-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] font-mono text-white tracking-widest leading-none">
                                /// AUDIO /// SIGNAL ///
                            </div>
                        </div>
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-8">
                            Transformez la voix et les sons en données structurées. Identification, séparation et analyse sémantique temps réel.
                        </p>
                        <button className="bg-white text-black font-mono font-bold uppercase px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors w-full justify-center">
                            Découvrir les Modèles Audio <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 bg-black tech-strips border border-white/10 flex items-center justify-center mb-4 text-white">
                                <Activity className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Retranscription (STT)</h3>
                            <p className="text-muted-foreground text-sm font-mono">Conversion parole-texte haute fidélité, multi-locuteurs et multilingue.</p>
                        </div>

                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 bg-black tech-strips border border-white/10 flex items-center justify-center mb-4 text-white">
                                <Waves className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Isolation Sonore</h3>
                            <p className="text-muted-foreground text-sm font-mono">Séparation de sources audio (voix/bruit) pour un nettoyage parfait.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 relative p-12 flex flex-col justify-between overflow-hidden order-1 lg:order-2">
                    {/* Header Area */}
                    <div className="relative z-10 mb-12 text-right">
                        <div className="text-cyan-500 font-mono mb-2 text-lg">04 Audio & Voice.</div>
                        <h2 id="audio-heading" className="text-4xl md:text-5xl font-mono text-white leading-tight ml-auto max-w-2xl">
                            Captez chaque nuance <br />
                            <span className="text-muted-foreground">de votre environnement sonore.</span>
                        </h2>
                    </div>

                    {/* Central Image Area - Waveform Visualization */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
                        {/* CSS-only Abstract Waveform */}
                        <div className="flex items-end gap-1 h-64">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-4 bg-cyan-500/50 rounded-t-sm animate-pulse"
                                    style={{
                                        height: `${Math.random() * 100}%`,
                                        animationDelay: `${i * 0.1}s`,
                                        animationDuration: '1.5s'
                                    }}
                                />
                            ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    {/* Bottom Right Card */}
                    <div className="mt-auto relative z-10 ml-auto">
                        <TechCard className="max-w-md bg-black/80 backdrop-blur-sm p-6 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl text-white font-mono">Whisper-v3-Turbo</h3>
                                    <span className="text-[10px] uppercase border border-cyan-500/30 text-cyan-500 px-1 py-0.5">Optimized</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
                                    <Mic className="w-3 h-3" /> <span className="text-cyan-400">Live Stream</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm font-mono leading-relaxed mb-6">
                                Pipeline d'analyse audio temps réel capable d'identifier les locuteurs, les émotions et les intentions derrière les mots.
                            </p>
                            <div className="text-xs text-muted-foreground font-mono flex items-center gap-4">
                                <span>WER: &lt;5%</span>
                                <span>Diarization: ON</span>
                            </div>
                        </TechCard>
                    </div>
                </div>

            </div>
        </section>
    );
}
