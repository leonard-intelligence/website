import { BookOpen, MessageCircle, FileText, Sparkles } from 'lucide-react';

export function SectionPatrimoine() {
    return (
        <section
            id="section-patrimoine"
            className="py-24 bg-black border-b border-white/10 relative overflow-hidden"
            aria-labelledby="patrimoine-heading"
        >
            {/* Subtle gradient accent */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-amber-500/5 blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-4 block">
                        Mémoire d'Entreprise
                    </span>

                    <h2 id="patrimoine-heading" className="text-4xl md:text-5xl font-mono font-bold text-white mb-6 leading-tight">
                        Votre expert part.<br />
                        <span className="text-amber-400">Son savoir reste.</span>
                    </h2>

                    <p className="text-lg font-mono text-white/60 leading-relaxed max-w-2xl mx-auto">
                        Votre assistant IA indexe vos procédures, vos documents, votre expertise.
                        Posez vos questions en langage naturel, obtenez des réponses instantanées.
                    </p>
                </div>

                {/* Chat Interface Demo */}
                <div className="max-w-2xl mx-auto">
                    <div className="border border-white/10 bg-zinc-900/50 rounded-2xl overflow-hidden shadow-2xl">
                        {/* Chat header */}
                        <div className="flex items-center gap-3 px-6 py-4 bg-zinc-800/50 border-b border-white/10">
                            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <div className="font-mono text-sm text-white font-medium">Assistant Documentaire</div>
                                <div className="font-mono text-xs text-white/40">Connecté à 47 documents</div>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="font-mono text-xs text-emerald-400">En ligne</span>
                            </div>
                        </div>

                        {/* Chat messages */}
                        <div className="p-6 space-y-4">
                            {/* User message */}
                            <div className="flex justify-end">
                                <div className="bg-amber-500/20 border border-amber-500/30 rounded-2xl rounded-br-md px-5 py-3 max-w-md">
                                    <p className="font-mono text-sm text-white">
                                        Comment calibrer la machine XR-500 ?
                                    </p>
                                </div>
                            </div>

                            {/* AI response */}
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-5 py-4 max-w-md">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FileText className="w-4 h-4 text-amber-400" />
                                        <span className="font-mono text-xs text-amber-400">Manuel Technique XR-500, page 47</span>
                                    </div>
                                    <p className="font-mono text-sm text-white/80 leading-relaxed">
                                        Accédez au menu <span className="text-white">Paramètres → Calibration</span>.
                                        Lancez la séquence automatique et attendez 3 cycles complets.
                                        L'indicateur passe au vert une fois terminé.
                                    </p>
                                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-4 text-xs font-mono text-white/40">
                                        <span>✓ 3 sources</span>
                                        <span>⚡ 0.8s</span>
                                        <span className="text-emerald-400">94% confiance</span>
                                    </div>
                                </div>
                            </div>

                            {/* Typing indicator */}
                            <div className="flex items-center gap-3 px-2">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                                <span className="font-mono text-xs text-white/30">Posez votre prochaine question...</span>
                            </div>
                        </div>
                    </div>

                    {/* Features below chat */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="text-center p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                            <BookOpen className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                            <div className="font-mono text-xs text-white/60">
                                Procédures indexées
                            </div>
                        </div>
                        <div className="text-center p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                            <MessageCircle className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                            <div className="font-mono text-xs text-white/60">
                                Questions naturelles
                            </div>
                        </div>
                        <div className="text-center p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                            <FileText className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                            <div className="font-mono text-xs text-white/60">
                                Sources citées
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
