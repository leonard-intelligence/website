import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { useEffect, useState } from "react";

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
                    <div className="font-mono text-xs text-white font-medium truncate">Assistant Documentaire</div>
                    <div className="font-mono text-[10px] text-white/40 truncate">584 documents connectés</div>
                </div>
                <div className="flex-shrink-0 ml-auto flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#E67E22] rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-[#E67E22] hidden sm:inline">En ligne</span>
                </div>
            </div>

            {/* Chat messages area */}
            <div className="p-2 lg:p-4 space-y-4 flex-1 overflow-y-auto flex flex-col justify-end min-h-0">
                {visibleMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        {msg.role === "user" ? (
                            // USER BUBBLE
                            <div className="bg-[#E67E22]/20 border border-[#E67E22]/30 rounded-xl rounded-br-sm px-3 py-2 max-w-[95%] md:max-w-xs">
                                <p className="font-mono text-xs text-white">
                                    {msg.content}
                                </p>
                            </div>
                        ) : (
                            // ASSISTANT BUBBLE
                            <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-sm px-3 py-3 max-w-[95%] md:max-w-sm">
                                {msg.source && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <DotIcon icon={leonardIcons.saisieAutomatisee} size={12} fillColor="#E67E22" />
                                        <span className="font-mono text-[10px] text-[#E67E22]">{msg.source}</span>
                                    </div>
                                )}
                                <p className="font-mono text-xs text-white/80 leading-relaxed">
                                    {msg.content}
                                </p>
                                {msg.metadata && (
                                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-3 text-[10px] font-mono text-white/40">
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
                    <div className="lg:col-span-8 p-6 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                        <div className="mb-0">
                            <div className="text-[#E67E22] font-mono mb-2 text-lg">
                                Mémoire d'Entreprise.
                            </div>
                            <h2
                                id="patrimoine-heading"
                                className="text-3xl md:text-5xl font-mono text-white max-w-xl leading-tight uppercase tracking-[-0.02em]"
                            >
                                <span className="text-zinc-400">Ne perdez plus</span><br />
                                le savoir-faire de vos experts.
                            </h2>
                            <p className="mt-6 font-mono text-gray-400 text-sm leading-relaxed max-w-lg">
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
                            <p className="text-gray-400 text-sm font-mono">Tous vos documents internes accessibles instantanément.</p>
                        </div>

                        <div className="flex-1 border-b border-white/10 p-6 lg:p-8 group hover:bg-white/5 transition-colors relative">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-[#E67E22]">
                                <DotIcon icon={leonardIcons.questionsNaturelles} size={20} fillColor="#E67E22" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Questions Naturelles</h3>
                            <p className="text-gray-400 text-sm font-mono">Posez vos questions comme à un collègue expert.</p>
                        </div>

                        <div className="flex-1 p-6 lg:p-8 group hover:bg-white/5 transition-colors relative">
                            <div className="w-8 h-8 bg-black border border-white/10 flex items-center justify-center mb-4 text-[#E67E22]">
                                <DotIcon icon={leonardIcons.sourcesCitees} size={20} fillColor="#E67E22" />
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2 uppercase tracking-[-0.02em]">Sources Citées</h3>
                            <p className="text-gray-400 text-sm font-mono">Chaque réponse avec références vérifiables.</p>
                        </div>
                    </div>
                </div>

                {/* ROW 2: Interactive Demos */}
                <div className="flex flex-col lg:grid lg:grid-cols-2">

                    {/* LEFT BENTO: Chat Interface */}
                    <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-4 lg:p-12 bg-zinc-900/10 flex flex-col justify-center min-h-0 lg:min-h-[500px]">
                        <div className="mb-6 mt-8 lg:mt-0">
                            <div className="text-xs font-mono text-[#E67E22] mb-2">/// DÉMO INTERACTIVE</div>
                            <h3 className="text-white font-mono text-xl uppercase tracking-tight">Assistant Documentaire</h3>
                        </div>

                        {/* Chat Interface Container */}
                        <ChatInterface />
                    </div>

                    {/* RIGHT BENTO: Placeholder */}
                    <div className="p-12 b-zinc-900 flex flex-col justify-center items-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-pattern-diagonal opacity-5"></div>

                        <div className="border border-white/10 bg-white/5 rounded-2xl p-8 max-w-md w-full text-center relative z-10 backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 text-white/40">
                                <span className="font-mono text-xl">+</span>
                            </div>
                            <h3 className="text-white font-mono text-lg mb-2">Prochain Module</h3>
                            <p className="text-white/40 font-mono text-sm leading-relaxed">
                                Espace réservé pour une future démonstration interactive.
                                <br />
                                <span className="text-[#E67E22] text-xs mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">En attente de développement...</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

