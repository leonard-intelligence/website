import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import docMatrixImage from "@/assets/images/illustrations/illustration-doc-matrix-01.png";
import { useEffect, useState } from "react";
import { KnowledgeBaseDemo } from "./KnowledgeBaseDemo";

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
                    <span className="w-2 h-2 bg-[#E67E22] rounded-full animate-pulse" />
                    <span className="text-[10px] text-[#E67E22] hidden sm:inline">En ligne</span>
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

export function SectionPatrimoine() {
    return (
        <section
            id="section-patrimoine"
            className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black"
            aria-labelledby="patrimoine-heading"
        >
            <div className="flex flex-col min-h-[600px]">

                {/* ROW 1: Header & Features */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
                    {/* LEFT: Header - 8 cols */}
                    <div className="lg:col-span-8 p-6 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <img
                                src={docMatrixImage}
                                alt=""
                                className="w-full h-full object-cover opacity-20 mix-blend-screen"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
                        </div>

                        <div className="mb-0 relative z-10">
                            <div className="text-[#E67E22] mb-2 text-lg">
                                Mémoire d'Entreprise.
                            </div>
                            <h2
                                id="patrimoine-heading"
                                className="text-3xl md:text-5xl font-mono text-white max-w-xl leading-tight uppercase tracking-[-0.02em]"
                            >
                                <span className="text-zinc-400">Ne perdez plus</span><br />
                                le savoir-faire de vos experts.
                            </h2>
                            <p className="mt-6 text-gray-400 text-sm leading-relaxed max-w-lg">
                                Votre assistant IA indexe vos procédures, vos documents, votre expertise. Questions en langage naturel.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Features - 4 cols */}
                    <div className="lg:col-span-4 flex flex-col bg-zinc-900/20 bg-pattern-diagonal">
                        <div className="flex-1 border-b border-white/10 p-6 lg:p-8 group hover:bg-white/5 transition-colors relative">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-[#E67E22]">
                                <DotIcon icon={leonardIcons.saisieAutomatisee} size={20} fillColor="#E67E22" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Procédures Indexées</h3>
                            <p className="text-gray-400 text-sm">Tous vos documents internes accessibles instantanément.</p>
                        </div>

                        <div className="flex-1 border-b border-white/10 p-6 lg:p-8 group hover:bg-white/5 transition-colors relative">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-[#E67E22]">
                                <DotIcon icon={leonardIcons.questionsNaturelles} size={20} fillColor="#E67E22" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Parlez avec vos documents</h3>
                            <p className="text-gray-400 text-sm">Posez vos questions comme à un collègue expert.</p>
                        </div>

                        <div className="flex-1 p-6 lg:p-8 group hover:bg-white/5 transition-colors relative">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-[#E67E22]">
                                <DotIcon icon={leonardIcons.sourcesCitees} size={20} fillColor="#E67E22" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Sources Citées</h3>
                            <p className="text-gray-400 text-sm">Chaque réponse avec références vérifiables.</p>
                        </div>
                    </div>
                </div>

                {/* ROW 2: Active Documentation Feature (Moved up) */}
                <div className="border-b border-white/10 bg-zinc-900/30">
                    <div className="p-8 lg:p-12 flex flex-col justify-center bg-zinc-900/50 relative overflow-hidden group min-h-[300px]">
                        {/* Background decorative element */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E67E22]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#E67E22]/10 transition-colors duration-700" />

                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <h3 className="text-3xl md:text-4xl font-mono text-white mb-6 uppercase tracking-[-0.03em] leading-none">
                                Documentation <span className="text-white/30 text-stroke-1">Passive.</span>
                            </h3>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                                Rédigez la documentation en temps réel pendant que vous travaillez.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-3 opacity-60">
                                <div className="px-3 py-2 border border-white/10 bg-white/5 text-[10px] text-gray-400 uppercase tracking-wide">
                                    Action
                                </div>
                                <span className="text-white/20">→</span>
                                <div className="px-3 py-2 border border-white/10 bg-white/5 text-[10px] text-gray-400 uppercase tracking-wide bg-pattern-tiny">
                                    Capture
                                </div>
                                <span className="text-white/20">→</span>
                                <div className="px-3 py-2 bg-[#E67E22]/10 border border-[#E67E22]/20 text-[10px] text-[#E67E22] uppercase tracking-wide">
                                    Procédure Rédigée
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROW 2: Interactive Demos */}
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

            </div>
        </section>
    );
}

