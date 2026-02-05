import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { useEffect, useState } from "react";

// --- Types & Data ---

type AgentRole = "PM" | "UX" | "SEO" | "DEV";

type AgentStep = {
    id: string;
    role: AgentRole;
    label: string;
    message: string;
    duration: number; // ms to stay on this step
};

const WORKFLOW_STEPS: AgentStep[] = [
    {
        id: "step-1",
        role: "PM",
        label: "Chef de Projet",
        message: "Objectif : Optimiser le taux de conversion sur la page produit.",
        duration: 3000,
    },
    {
        id: "step-2",
        role: "UX",
        label: "Expert UX",
        message: "Analyse : Le CTA est peu visible. Recommandation : Contraste élevé + placement au-dessus de la ligne de flottaison.",
        duration: 4000,
    },
    {
        id: "step-3",
        role: "SEO",
        label: "Expert SEO",
        message: "Contrainte : Garder le H1 descriptif pour les mots-clés transactionnels. Attention au CLS.",
        duration: 3500,
    },
    {
        id: "step-4",
        role: "DEV",
        label: "Lead Tech",
        message: "Faisabilité : OK. Implémentation via composant ButtonV2. Impact perf négligeable.",
        duration: 3500,
    },
    {
        id: "step-5",
        role: "PM",
        label: "Chef de Projet",
        message: "Validation : Plan approuvé. Lancement de l'implémentation.",
        duration: 3000,
    },
];

const AGENT_CONFIG: Record<AgentRole, { icon: any; color: string }> = {
    PM: { icon: leonardIcons.sparkles, color: "#E67E22" }, // Orange Antigravity
    UX: { icon: leonardIcons.visualIntelligence, color: "#A855F7" }, // Purple
    SEO: { icon: leonardIcons.globe, color: "#3B82F6" }, // Blue
    DEV: { icon: leonardIcons.openSourceFirst, color: "#10B981" }, // Green
};

export function AgentWorkflowDemo() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const currentStep = WORKFLOW_STEPS[currentStepIndex];
    const agent = AGENT_CONFIG[currentStep.role];

    useEffect(() => {
        let startTime = Date.now();
        let animationFrameId: number;

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const newProgress = Math.min((elapsed / currentStep.duration) * 100, 100);

            setProgress(newProgress);

            if (elapsed < currentStep.duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Next step
                setTimeout(() => {
                    setCurrentStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length);
                    setProgress(0);
                }, 200); // Short pause between steps
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [currentStepIndex]);

    return (
        <div className="border border-white/20 bg-zinc-900/50 rounded-lg overflow-hidden shadow-2xl relative z-10 w-full h-[450px] flex flex-col">
            {/* Context Header */}
            <div className="flex items-center justify-between px-3 lg:px-5 py-3 bg-zinc-800/50 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse" />
                    <span className="text-[10px] text-white/60 tracking-wider uppercase">Workflow Actif</span>
                </div>
                <div className="text-[10px] text-white/40">
                    Mission #{2490 + currentStepIndex}
                </div>
            </div>

            {/* Main Visual Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10 relative">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

                {/* Connecting Lines (Visual) */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/5 -z-10" />

                {/* Active Agent Card */}
                <div className="relative z-10 w-full max-w-sm">
                    {/* Agent Icon (Floating) */}
                    <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 transition-all duration-500 ease-out">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl shadow-black/50"
                            style={{ borderColor: `${agent.color}40`, boxShadow: `0 0 20px ${agent.color}20` }}>
                            <DotIcon icon={agent.icon} size={24} fillColor={agent.color} />
                        </div>
                    </div>

                    {/* Content Box */}
                    <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-xl p-6 lg:p-8 pt-8 lg:pt-10 shadow-xl overflow-hidden group">
                        {/* Progress Bar Top */}
                        <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
                            <div
                                className="h-full transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%`, backgroundColor: agent.color }}
                            />
                        </div>

                        {/* Label */}
                        <div className="flex justify-end mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: agent.color }}>
                                {currentStep.label}
                            </span>
                        </div>

                        {/* Message */}
                        <div className="min-h-[80px]">
                            <p className="text-sm md:text-base text-white leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300 key={currentStep.id}">
                                {(currentStep.role === "PM" || currentStep.role === "UX") ? (
                                    <>
                                        <span className="opacity-50 text-xs block mb-1 uppercase tracking-widest">{currentStep.message.split(":")[0]}</span>
                                        {currentStep.message.split(":")[1]}
                                    </>
                                ) : (
                                    currentStep.message
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Workflow Nodes (Small indicators below) */}
                <div className="absolute bottom-8 flex gap-2">
                    {WORKFLOW_STEPS.map((step, idx) => (
                        <div
                            key={`dot-${idx}`}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentStepIndex
                                ? `bg-[${AGENT_CONFIG[step.role].color}] scale-150`
                                : idx < currentStepIndex
                                    ? "bg-white/40"
                                    : "bg-white/10"
                                }`}
                            style={{ backgroundColor: idx === currentStepIndex ? AGENT_CONFIG[step.role].color : undefined }}
                        />
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <div className="px-5 py-3 bg-zinc-800/30 border-t border-white/5 flex justify-between items-center text-[10px] text-white/30">
                <span>Mode: Séquentiel</span>
                <span>Antigravity Engine</span>
            </div>
        </div>
    );
}
