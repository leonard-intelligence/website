import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { contactSignal } from "@/lib/contactSignal";


import { Button } from "@/components/ui/button";

import { PassiveDocumentationDemo } from "./PassiveDocumentationDemo";
import { useEffect, useState } from "react";
import { KnowledgeBaseDemo } from "./KnowledgeBaseDemo";

import memoryBg from '@/assets/images/illustrations/illustration-doc-matrix-01.webp';

// --- Types & Data ---

type Message = {
    id: string;
    role: "user" | "assistant";
    content: React.ReactNode;
    source?: string;
    metadata?: {
        sourcesCount?: number;
        confidence?: string;
    };
};

const SCENARIO: Message[] = [
    {
        id: "msg-1",
        role: "user",
        content: "Quelle est la procédure pour valider une facture ?",
    },
    {
        id: "msg-2",
        role: "assistant",
        source: "Guide Comptabilité, p.12",
        content: (
            <>
                Déposez le PDF sur <span className="text-white">SharePoint / Factures</span>. L'OCR extrait les données, vous recevez une notif pour valider.
            </>
        ),
    },
    {
        id: "msg-3",
        role: "user",
        content: "Et pour un montant supérieur à 10k€ ?",
    },
    {
        id: "msg-4",
        role: "assistant",
        source: "Politique Achat, Art. 4",
        metadata: { sourcesCount: 2, confidence: "98%" },
        content: (
            <>
                Validation requise du <span className="text-white">Directeur Financier</span>. Le workflow est automatique.
            </>
        ),
    },
];

function ChatInterface() {
    const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    // Cycle phases:
    // 0: Initial wait
    // 1: User Msg 1
    // 2: Typing...
    // 3: Assistant Msg 1
    // 4: User Msg 2
    // 5: Typing...
    // 6: Assistant Msg 2
    // 7: Pause (reading)
    // -> Reset
    const [step, setStep] = useState(0);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        switch (step) {
            case 0: // Reset / Start
                setVisibleMessages([]);
                setIsTyping(false);
                timeout = setTimeout(() => setStep(1), 1000);
                break;

            case 1: // Show User Msg 1
                setVisibleMessages([SCENARIO[0]]);
                timeout = setTimeout(() => setStep(2), 1000);
                break;

            case 2: // Typing...
                setIsTyping(true);
                timeout = setTimeout(() => setStep(3), 1500);
                break;

            case 3: // Show Assistant Msg 1
                setIsTyping(false);
                setVisibleMessages((prev) => [...prev, SCENARIO[1]]);
                timeout = setTimeout(() => setStep(4), 2500);
                break;

            case 4: // Show User Msg 2
                setVisibleMessages((prev) => [...prev, SCENARIO[2]]);
                timeout = setTimeout(() => setStep(5), 1000);
                break;

            case 5: // Typing...
                setIsTyping(true);
                timeout = setTimeout(() => setStep(6), 1500);
                break;

            case 6: // Show Assistant Msg 2
                setIsTyping(false);
                setVisibleMessages((prev) => [...prev, SCENARIO[3]]);
                timeout = setTimeout(() => setStep(7), 6000); // Long read time
                break;

            case 7: // Loop back
                timeout = setTimeout(() => setStep(0), 500);
                break;

            default:
                break;
        }

        return () => clearTimeout(timeout);
    }, [step]);

    return (
        <div className="border border-white/20 bg-zinc-900/50 rounded-lg overflow-hidden shadow-2xl relative z-10 w-full h-[450px] flex flex-col">
            {/* Chat header */}
            <div className="flex items-center gap-2 px-3 lg:px-5 py-3 bg-zinc-800/50 border-b border-white/10 shrink-0">
                <div className="w-8 h-8 bg-[#E67E22]/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <DotIcon icon={leonardIcons.sparkles} size={16} fillColor="#E67E22" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-xs text-white font-medium truncate">Assistant Documentaire</div>
                    <div className="text-[10px] text-white/40 truncate">584 documents connectés</div>
                </div>
                <div className="flex-shrink-0 ml-auto flex items-center gap-2">
                    {/* Status removed as per user request */}
                </div>
            </div>

            {/* Chat messages area */}
            <div className="p-2 lg:p-4 space-y-4 flex-1 overflow-y-auto flex flex-col justify-end min-h-0">
                {visibleMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        {msg.role === "user" ? (
                            // USER BUBBLE
                            <div className="bg-[#E67E22]/20 border border-[#E67E22]/30 rounded-xl rounded-br-sm px-3 py-2 max-w-[95%] md:max-w-xs">
                                <p className="text-xs text-white">
                                    {msg.content}
                                </p>
                            </div>
                        ) : (
                            // ASSISTANT BUBBLE
                            <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-sm px-3 py-3 max-w-[95%] md:max-w-sm">
                                {msg.source && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <DotIcon icon={leonardIcons.saisieAutomatisee} size={12} fillColor="#E67E22" />
                                        <span className="text-[10px] text-[#E67E22]">{msg.source}</span>
                                    </div>
                                )}
                                <p className="text-xs text-white/80 leading-relaxed">
                                    {msg.content}
                                </p>
                                {msg.metadata && (
                                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-3 text-[10px] text-white/40">
                                        {msg.metadata.sourcesCount && <span>✓ {msg.metadata.sourcesCount} sources</span>}
                                        {msg.metadata.confidence && <span className="text-[#E67E22]">{msg.metadata.confidence}</span>}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start animate-in fade-in zoom-in duration-200">
                        <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-sm px-3 py-3 w-12 flex items-center justify-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-[bounce_1s_infinite_100ms]"></span>
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-[bounce_1s_infinite_300ms]"></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- End Chat Component ---

export function SectionMemory() {
    return (
        <section id="section-expertise-memory" className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black" aria-labelledby="expertise-memory-heading">
            <div className="flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] lg:min-h-[600px]">

                    {/* LEFT COLUMN: Main Visual - Spans 8 cols */}
                    <div className="lg:col-span-8 border-r border-white/10 relative p-6 md:p-12 flex flex-col justify-between overflow-hidden">
                        {/* Header Area */}
                        <div className="relative z-10 mb-12 reveal-left">
                            <div className="text-[#E67E22] mb-2 text-lg">02 Mémoire & Connaissance.</div>
                            <h2 id="expertise-memory-heading" className="text-4xl md:text-5xl font-mono text-white max-w-4xl leading-tight uppercase tracking-[-0.02em]">
                                <span className="text-muted-foreground">Ne perdez plus</span><br />
                                Ce que vos experts savent.
                            </h2>
                        </div>

                        {/* Central Image Area */}
                        <div className="absolute inset-0 z-0 flex items-center justify-center">
                            <TechIllustration
                                src={memoryBg}
                                alt="Memory & Knowledge Background"
                                className="absolute inset-0 w-full h-full"
                                aspectRatio=""
                            />
                        </div>

                        {/* Bottom Left Card */}
                        <div className="mt-auto relative z-10">
                            <div id="expertise-memory-card" className="max-w-lg border border-white/20 bg-black/60 backdrop-blur-md rounded transition-colors p-6 group reveal-scale stagger-2 hover-glow">
                                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E67E22] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E67E22]"></span>
                                        </span>
                                        <span className="text-xs text-[#E67E22] tracking-widest">STACK TECHNIQUE</span>
                                    </div>
                                    <span className="text-xs text-zinc-500">RAG</span>
                                </div>

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl text-white font-mono uppercase tracking-[-0.02em]">Knowledge Pipeline</h3>
                                </div>

                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                    Mistral · Claude · LlamaIndex · LangChain · Qdrant
                                </p>

                                <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-500 bg-white/5 p-3 rounded border border-white/5">
                                    <div className="flex justify-between"><span>CONTEXTE</span><span className="text-white">1M</span></div>
                                    <div className="flex justify-between"><span>HYBRID SEARCH</span><span className="text-[#E67E22]">ENABLED</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: List / Descriptions - Spans 4 cols */}
                    <div className="lg:col-span-4 flex flex-col">

                        {/* Top Description Block */}
                        <div className="p-6 md:p-12 border-b border-white/10 bg-zinc-900/20 bg-pattern-diagonal relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                                <div className="text-[10px] text-white tracking-widest leading-none">
                                /// MODULE 02 ///
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Votre IA indexe vos procédures, vos documents, votre expertise métier. Vos équipes posent leurs questions en langage naturel — et obtiennent des réponses sourcées en secondes.
                            </p>

                            <Button
                                variant="outline"
                                className="bg-black text-[#E67E22] border-[#E67E22]/50 hover:bg-[#E67E22] hover:text-black text-xs uppercase tracking-wider mb-2"
                                onClick={() => contactSignal.trigger('Mémoire & Connaissance')}
                            >
                                <span className="flex items-center gap-2">
                                    ACTIVER LA MÉMOIRE
                                    <DotIcon icon={leonardIcons.arrowRight} size={14} fillColor="currentColor" />
                                </span>
                            </Button>
                        </div>

                        {/* Research Items List */}
                        <div className="flex-1 grid grid-cols-2 lg:flex lg:flex-col">
                            <div id="expertise-memory-item-1" className="border-b lg:border-b border-r lg:border-r-0 border-white/10 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-right stagger-1 hover-lift">
                                <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white icon-bounce">
                                    <DotIcon icon={leonardIcons.ragChatbot} size={20} fillColor="white" />
                                </div>
                                <h3 className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">RAG & Base de Connaissances</h3>
                                <p className="text-zinc-500 text-[10px] sm:text-sm">Vos documents internes deviennent un assistant interrogeable.</p>
                            </div>

                            <div id="expertise-memory-item-2" className="border-b lg:border-b border-white/10 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-right stagger-2 hover-lift">
                                <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white hover:text-[#E67E22] transition-colors">
                                    <DotIcon icon={leonardIcons.memoireEntreprise} size={20} fillColor="white" />
                                </div>
                                <h3 className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">Documentation Automatique</h3>
                                <p className="text-zinc-500 text-[10px] sm:text-sm">Capture de process et génération de guides en temps réel.</p>
                            </div>

                            <div id="expertise-memory-item-3" className="border-b lg:border-b-0 p-4 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-right stagger-3 hover-lift">
                                <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-white">
                                    <DotIcon icon={leonardIcons.fineTuning} size={20} fillColor="white" />
                                </div>
                                <h3 className="text-white font-mono text-sm sm:text-lg mb-2 uppercase tracking-[-0.02em]">Fine-Tuning Métier</h3>
                                <p className="text-zinc-500 text-[10px] sm:text-sm">Le modèle parle votre langue et adopte votre ton.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 2: Active Documentation Feature (Passive Documentation) */}
            <PassiveDocumentationDemo />

            {/* ROW 3: Interactive Demos */}
            <div className="flex flex-col lg:grid lg:grid-cols-2">

                {/* LEFT BENTO: Chat Interface */}
                <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-12 bg-zinc-900/10 flex flex-col justify-center min-h-0 lg:min-h-[500px]">
                    <div className="mb-6 mt-8 lg:mt-0">
                        <div className="text-xs text-[#E67E22] mb-2">/// INTERFACE CONVERSATIONNELLE</div>
                        <h3 className="text-white font-mono text-xl uppercase tracking-tight">Assistant Documentaire</h3>
                    </div>

                    {/* Chat Interface Container */}
                    <ChatInterface />
                </div>

                {/* RIGHT BENTO: Knowledge Base Demo */}
                <div className="p-4 lg:p-12 b-zinc-900 flex flex-col justify-center relative min-h-0 lg:min-h-[500px]">
                    <div className="mb-6 w-full max-w-[450px]">
                        <div className="text-xs text-[#E67E22] mb-2">/// INDEXATION INTELLIGENTE</div>
                        <h3 className="text-white font-mono text-xl uppercase tracking-tight">Base de Connaissances</h3>
                    </div>

                    <KnowledgeBaseDemo />
                </div>
            </div>
        </section >
    );
}
