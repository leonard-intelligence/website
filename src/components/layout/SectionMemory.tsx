import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { contactSignal } from "@/lib/contactSignal";
import { useEffect, useState } from "react";
import { KnowledgeBaseDemo } from "./KnowledgeBaseDemo";

import memoryBg from '@/assets/images/illustrations/illustration-vision-massive-01.webp';

// --- Types & Data for ChatInterface ---

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
                <div className="w-8 h-8 bg-[#e67d23]/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <DotIcon icon={leonardIcons.sparkles} size={16} fillColor="#e67d23" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-xs text-white font-medium truncate">Assistant Documentaire</div>
                    <div className="text-[10px] text-white/60 truncate">584 documents connectés</div>
                </div>
            </div>

            {/* Chat messages area */}
            <div className="p-2 lg:p-4 space-y-4 flex-1 overflow-y-auto flex flex-col justify-end min-h-0">
                {visibleMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        {msg.role === "user" ? (
                            // USER BUBBLE
                            <div className="bg-[#e67d23]/20 border border-[#e67d23]/30 rounded-xl rounded-br-sm px-3 py-2 max-w-[95%] md:max-w-xs">
                                <p className="text-xs text-white">
                                    {msg.content}
                                </p>
                            </div>
                        ) : (
                            // ASSISTANT BUBBLE
                            <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-sm px-3 py-3 max-w-[95%] md:max-w-sm">
                                {msg.source && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <DotIcon icon={leonardIcons.saisieAutomatisee} size={12} fillColor="#e67d23" />
                                        <span className="text-[10px] text-[#e67d23]">{msg.source}</span>
                                    </div>
                                )}
                                <p className="text-xs text-white/80 leading-relaxed">
                                    {msg.content}
                                </p>
                                {msg.metadata && (
                                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-3 text-[10px] text-white/60">
                                        {msg.metadata.sourcesCount && <span>✓ {msg.metadata.sourcesCount} sources</span>}
                                        {msg.metadata.confidence && <span className="text-[#e67d23]">{msg.metadata.confidence}</span>}
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
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-[bounce_1s_infinite_100ms] will-change-transform"></span>
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-[bounce_1s_infinite_200ms] will-change-transform"></span>
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-[bounce_1s_infinite_300ms] will-change-transform"></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function SectionMemory() {
    return (
        <section id="section-expertise-memory" className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black" aria-labelledby="expertise-memory-heading">
            <div className="flex flex-col">

                {/* TOP ROW: 1 + 1 Large -- ALTERNATED: Image Left, Intro Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">

                    {/* Main Visual & Heading - Spans 8 cols - FIRST ON DESKTOP */}
                    <div className="lg:col-span-8 relative p-6 md:p-12 min-h-[400px] flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                        {/* Header Area */}
                        <div className="relative z-10 mb-12 text-left reveal-right">
                            <div className="text-[#e67d23] mb-2 text-lg">Module 02 — Base de connaissance</div>
                            <h2 id="expertise-memory-heading" className="text-4xl md:text-5xl font-mono text-white leading-tight max-w-4xl uppercase tracking-[-0.02em]">
                                <span className="text-muted-foreground">Ne perdez plus</span><br />
                                le savoir de vos experts.
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
                    </div>

                    {/* Intro / Description - Spans 4 cols - SECOND ON DESKTOP */}
                    <div className="lg:col-span-4 p-6 md:p-12 bg-zinc-900/20 bg-pattern-diagonal relative overflow-hidden group flex flex-col items-start justify-start min-h-[400px]">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                            <div className="text-[10px] text-white tracking-widest leading-none">
                                /// MODULE 02 ///
                            </div>
                        </div>

                        <div className="text-left relative z-10">
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-0">
                                Quand votre expert est absent, personne ne retrouve les procédures. On change ça. Votre IA connaît tous vos documents et répond à sa place avec les bonnes sources.
                            </p>
                        </div>

                        <button
                            onClick={() => contactSignal.trigger('Mémoire & Connaissance')}
                            className="absolute bottom-6 md:bottom-10 right-6 md:right-10 group/btn text-[#e67d23] hover:text-[#cc6d1e] text-sm font-medium uppercase tracking-wider flex items-center gap-2 transition-colors w-fit border-none bg-transparent p-0 cursor-pointer z-20"
                        >
                            En savoir plus
                            <span className="transform transition-transform group-hover/btn:translate-x-1">
                                <DotIcon icon={leonardIcons.arrowRight} size={16} fillColor="currentColor" />
                            </span>
                        </button>
                    </div>

                </div>

                {/* BOTTOM ROW 1: 3 Feature Cases */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10">
                    <div id="expertise-memory-item-1" className="border-b md:border-b-0 md:border-r border-white/10 p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-1 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white icon-bounce">
                            <DotIcon icon={leonardIcons.ragChatbot} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">RAG & Base de Connaissances</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Vos documents internes deviennent un assistant interrogeable.</p>
                    </div>

                    <div id="expertise-memory-item-2" className="border-b md:border-b-0 md:border-r border-white/10 p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-2 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white">
                            <DotIcon icon={leonardIcons.memoireEntreprise} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">Documentation Automatique</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Capture de process et génération de guides en temps réel.</p>
                    </div>

                    <div id="expertise-memory-item-3" className="p-6 sm:p-8 group hover:bg-white/5 transition-colors relative reveal-up stagger-3 hover-lift">
                        <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center mb-6 text-white">
                            <DotIcon icon={leonardIcons.fineTuning} size={24} fillColor="white" />
                        </div>
                        <p className="text-white font-mono text-lg sm:text-xl mb-3 uppercase tracking-[-0.02em]">Fine-Tuning Métier</p>
                        <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">Le modèle parle votre langue et adopte votre ton.</p>
                    </div>
                </div>

                {/* BOTTOM ROW 2: Interactive Demos */}
                <div className="flex flex-col lg:grid lg:grid-cols-2">

                    {/* LEFT BENTO: Chat Interface */}
                    <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-12 bg-zinc-900/10 flex flex-col justify-center min-h-0 lg:min-h-[500px]">
                        <div className="mb-6 mt-8 lg:mt-0">
                            <div className="text-xs text-[#e67d23] mb-2">/// INTERFACE CONVERSATIONNELLE</div>
                            <h3 className="text-white font-mono text-xl uppercase tracking-tight">Assistant Documentaire</h3>
                        </div>

                        {/* Chat Interface Container */}
                        <ChatInterface />
                    </div>

                    {/* RIGHT BENTO: Knowledge Base Demo */}
                    <div className="p-4 lg:p-12 b-zinc-900 flex flex-col justify-center relative min-h-0 lg:min-h-[500px]">
                        <div className="mb-6 w-full max-w-[450px]">
                            <div className="text-xs text-[#e67d23] mb-2">/// INDEXATION INTELLIGENTE</div>
                            <h3 className="text-white font-mono text-xl uppercase tracking-tight">Base de Connaissances</h3>
                        </div>

                        <KnowledgeBaseDemo />
                    </div>
                </div>

            </div>
        </section>
    );
}
