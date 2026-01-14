import { ArrowUpRight, FileText, Database, MessageSquare } from 'lucide-react';
import { TechCard } from "@/components/ui/TechCard";

export function SectionText() {
    return (
        <section className="sections-container border-b border-border bg-black">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">

                {/* RIGHT COLUMN (Visual) placed LEFT here for alternating layout? 
                    Actually, let's keep the layout consistent (Visual Left) OR alternate.
                    The user asked for 'sections' like Research which was Visual Left.
                    Let's alternate for visual interest -> Visual Right for this one?
                    Wait, SectionResearch was Visual Left (8 cols) and List Right (4 cols).
                    Let's swap order for variety: List Left (4), Visual Right (8).
                 */}

                {/* LEFT COLUMN: List / Descriptions - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col border-r border-border order-2 lg:order-1">
                    <div className="p-12 border-b border-border bg-zinc-900/20">
                        <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-8">
                            Transformez vos documents non structurés en données exploitables. Systèmes RAG qui dialoguent avec toute votre base de connaissances.
                        </p>
                        <button className="bg-white text-black font-mono font-bold uppercase px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors w-full justify-center">
                            Essayer le Chat Documentaire <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center mb-4 text-white">
                                <FileText className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Extraction Intelligente</h3>
                            <p className="text-muted-foreground text-sm font-mono">Traitement de factures, CV, Contrats avec sortie JSON structurée.</p>
                        </div>

                        <div className="flex-1 border-b border-border p-8 group hover:bg-white/5 transition-colors cursor-pointer relative">
                            <ArrowUpRight className="absolute top-8 right-8 text-white w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center mb-4 text-white">
                                <Database className="w-4 h-4" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">RAG d'Entreprise</h3>
                            <p className="text-muted-foreground text-sm font-mono">Accès chat sécurisé à des millions de fichiers PDF/Docx internes.</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Main Visual - Spans 8 cols */}
                <div className="lg:col-span-8 relative p-12 flex flex-col justify-between overflow-hidden order-1 lg:order-2">
                    {/* Header Area */}
                    <div className="relative z-10 mb-12 text-right">
                        <div className="text-purple-500 font-mono mb-2 text-lg">02 Text & Data.</div>
                        <h2 className="text-4xl md:text-5xl font-mono text-white leading-tight ml-auto max-w-2xl">
                            Valorisez le potentiel de <br />
                            <span className="text-muted-foreground">votre patrimoine documentaire.</span>
                        </h2>
                    </div>

                    {/* Central Image Area */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 mix-blend-screen pointer-events-none">
                        <div className="w-[60%] h-[60%] border border-purple-500/30 rounded-lg rotate-12 backdrop-blur-sm" />
                        <div className="w-[60%] h-[60%] border border-white/10 rounded-lg -rotate-6 absolute" />
                    </div>

                    {/* Bottom Right Card */}
                    <div className="mt-auto relative z-10 ml-auto">
                        <TechCard className="max-w-md bg-black/80 backdrop-blur-sm border border-border p-6 hover:border-purple-500/50 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl text-white font-mono">Llama-3-Instruct</h3>
                                    <span className="text-[10px] uppercase border border-purple-500/30 text-purple-500 px-1 py-0.5">Fine-tuned</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
                                    <MessageSquare className="w-3 h-3" /> <span className="text-green-400">Sécurisé</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm font-mono leading-relaxed mb-6">
                                Modèles de langage spécialisés (juridique, technique) fonctionnant entièrement sur votre infrastructure. Aucune fuite de données.
                            </p>
                            <div className="text-xs text-muted-foreground font-mono">
                                <span>Ctx Window: 128k</span>
                            </div>
                        </TechCard>
                    </div>
                </div>

            </div>
        </section>
    );
}
