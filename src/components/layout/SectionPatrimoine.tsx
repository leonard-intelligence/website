import { BookOpen, MessageCircle, FileText, Sparkles } from 'lucide-react';

export function SectionPatrimoine() {
    return (
        <section
            id="section-patrimoine"
            className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black"
            aria-labelledby="patrimoine-heading"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                {/* LEFT COLUMN: Main Content - 8 cols */}
                <div className="lg:col-span-8 border-r border-white/10 p-12 flex flex-col justify-between">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="text-amber-500 font-mono mb-2 text-lg">
                            03 Mémoire d'Entreprise.
                        </div>
                        <h2
                            id="patrimoine-heading"
                            className="text-4xl md:text-5xl font-mono text-white max-w-xl leading-tight uppercase tracking-[-0.02em]"
                        >
                            Ne perdez plus le savoir-faire<br />
                            <span className="text-muted-foreground">de vos experts.</span>
                        </h2>
                    </div>

                    {/* Chat Interface Demo */}
                    <div className="max-w-xl">
                        <div className="border border-white/20 bg-zinc-900/50 rounded-lg overflow-hidden">
                            {/* Chat header */}
                            <div className="flex items-center gap-3 px-5 py-3 bg-zinc-800/50 border-b border-white/10">
                                <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                </div>
                                <div>
                                    <div className="font-mono text-xs text-white font-medium">Assistant Documentaire</div>
                                    <div className="font-mono text-[10px] text-white/40">47 documents connectés</div>
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="font-mono text-[10px] text-emerald-400">En ligne</span>
                                </div>
                            </div>

                            {/* Chat messages */}
                            <div className="p-4 space-y-3">
                                {/* User message */}
                                <div className="flex justify-end">
                                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl rounded-br-sm px-4 py-2 max-w-xs">
                                        <p className="font-mono text-xs text-white">
                                            Comment calibrer la machine XR-500 ?
                                        </p>
                                    </div>
                                </div>

                                {/* AI response */}
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-sm px-4 py-3 max-w-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FileText className="w-3 h-3 text-amber-400" />
                                            <span className="font-mono text-[10px] text-amber-400">Manuel XR-500, p.47</span>
                                        </div>
                                        <p className="font-mono text-xs text-white/80 leading-relaxed">
                                            Menu <span className="text-white">Paramètres → Calibration</span>. Lancez la séquence auto, attendez 3 cycles.
                                        </p>
                                        <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-3 text-[10px] font-mono text-white/40">
                                            <span>✓ 3 sources</span>
                                            <span className="text-emerald-400">94%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Satellite Items - 4 cols */}
                <div className="lg:col-span-4 flex flex-col">

                    {/* Top Description Block */}
                    <div className="p-12 border-b border-white/10 bg-zinc-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] font-mono text-white tracking-widest leading-none">
                                /// MODULE DOC ///
                            </div>
                        </div>
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed">
                            Votre assistant IA indexe vos procédures, vos documents, votre expertise. Questions en langage naturel.
                        </p>
                    </div>

                    {/* Feature Items */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 border-b border-white/10 p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-amber-400">
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Procédures Indexées</h3>
                            <p className="text-muted-foreground text-sm font-mono">Tous vos documents internes accessibles instantanément.</p>
                        </div>

                        <div className="flex-1 border-b border-white/10 p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-amber-400">
                                <MessageCircle className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Questions Naturelles</h3>
                            <p className="text-muted-foreground text-sm font-mono">Posez vos questions comme à un collègue expert.</p>
                        </div>

                        <div className="flex-1 p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-amber-400">
                                <FileText className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Sources Citées</h3>
                            <p className="text-muted-foreground text-sm font-mono">Chaque réponse avec références vérifiables.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
