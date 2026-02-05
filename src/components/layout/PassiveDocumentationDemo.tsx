import { useEffect, useState } from 'react';
import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";

export function PassiveDocumentationDemo() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        {
            id: 'action',
            title: "Action",
            desc: "Réalisez vos tâches habituelles sans changer vos outils.",
            icon: leonardIcons.avantageConcurrentiel,
            color: "#E67E22"
        },
        {
            id: 'capture',
            title: "Capture",
            desc: "L'IA détecte les étapes clés et documente le flux métier.",
            icon: leonardIcons.saisieAutomatisee,
            color: "#E67E22"
        },
        {
            id: 'result',
            title: "Procédure Rédigée",
            desc: "Un guide complet et structuré est généré instantanément.",
            icon: leonardIcons.rgpdCompliant,
            color: "#E67E22"
        }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/10 min-h-[500px]">
            {/* LEFT: Text & Steps */}
            <div className="p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 bg-zinc-900/10">
                <div className="mb-12">
                    <h3 className="text-3xl md:text-4xl font-mono text-white mb-6 uppercase tracking-[-0.03em] leading-none">
                        Documentation <span className="text-white/30 text-stroke-1">Passive.</span>
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed max-w-md">
                        Rédigez la documentation en temps réel pendant que vous travaillez. Plus de temps perdu à expliquer.
                    </p>
                </div>

                <div className="space-y-6 relative">
                    {/* Vertical line connector */}
                    <div className="absolute left-6 top-8 bottom-8 w-px bg-white/5 z-0" />

                    {steps.map((step, idx) => (
                        <div
                            key={step.id}
                            className={`flex items-start gap-6 transition-all duration-500 relative z-10 ${activeStep === idx ? 'opacity-100 translate-x-2' : 'opacity-40'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${activeStep === idx
                                ? 'bg-[#E67E22]/20 border-[#E67E22] shadow-[0_0_15px_rgba(230,126,34,0.3)]'
                                : 'bg-black border-white/10'
                                }`}>
                                <DotIcon icon={step.icon} size={20} fillColor={activeStep === idx ? "#E67E22" : "#444"} />
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className={`font-mono text-lg uppercase tracking-tight mb-1 transition-colors duration-500 ${activeStep === idx ? 'text-white' : 'text-zinc-500'
                                    }`}>
                                    {step.title}
                                </h4>
                                <p className={`text-sm transition-colors duration-500 ${activeStep === idx ? 'text-gray-300' : 'text-zinc-600'
                                    }`}>
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: Animated Illustration */}
            <div className="relative overflow-hidden bg-black flex items-center justify-center p-8 lg:p-12">
                {/* Grid Pattern Background */}
                <div className="absolute inset-0 z-0 bg-pattern-grid" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />

                {/* Animated Elements Container */}
                <div className="relative z-10 w-full max-w-[400px] aspect-square border border-white/10 bg-zinc-900/40 backdrop-blur-sm rounded-2xl flex items-center justify-center">

                    {/* Step 1 Animation: User Interaction */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${activeStep === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="relative w-48 h-32 border border-white/20 bg-white/5 rounded-lg flex flex-col p-3">
                            <div className="w-1/2 h-2 bg-white/10 rounded mb-2" />
                            <div className="w-1/3 h-2 bg-white/10 rounded mb-4" />
                            <div className="mt-auto flex gap-2">
                                <div className="w-8 h-8 rounded bg-[#E67E22]/20 border border-[#E67E22]/40" />
                                <div className="flex-1 flex flex-col gap-1 justify-center">
                                    <div className="w-full h-1.5 bg-white/10 rounded" />
                                    <div className="w-2/3 h-1.5 bg-white/10 rounded" />
                                </div>
                            </div>
                            {/* Animated Cursor */}
                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full opacity-20 animate-pulse pointer-events-none" />
                        </div>
                    </div>

                    {/* Step 2 Animation: Capture Radar */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${activeStep === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="relative">
                            {/* Circular Radar pulses */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[#E67E22]/30 rounded-full animate-ping" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-[#E67E22]/50 rounded-full" />

                            {/* Central Icon */}
                            <div className="relative w-16 h-16 bg-[#E67E22]/20 border border-[#E67E22] rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(230,126,34,0.4)]">
                                <DotIcon icon={leonardIcons.search} size={24} fillColor="#E67E22" />
                            </div>

                            {/* Floating "bits" of data */}
                            <div className="absolute -top-12 -left-8 w-12 h-1 bg-[#E67E22] opacity-40 animate-[bounce_2s_infinite]" />
                            <div className="absolute top-4 -right-16 w-8 h-1 bg-[#E67E22] opacity-40 animate-[bounce_2.5s_infinite]" />
                            <div className="absolute -bottom-8 right-2 w-10 h-1 bg-[#E67E22] opacity-40 animate-[bounce_1.8s_infinite]" />
                        </div>
                    </div>

                    {/* Step 3 Animation: Final Document */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${activeStep === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="relative w-56 h-72 bg-zinc-800 border border-white/20 rounded shadow-2xl overflow-hidden flex flex-col p-6 animate-in slide-in-from-bottom-8">
                            {/* Doc Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-[#E67E22]/20 rounded flex items-center justify-center">
                                    <DotIcon icon={leonardIcons.rgpdCompliant} size={16} fillColor="#E67E22" />
                                </div>
                                <div className="flex-1">
                                    <div className="w-24 h-2 bg-white/20 rounded mb-1" />
                                    <div className="w-16 h-1.5 bg-white/10 rounded" />
                                </div>
                            </div>

                            {/* Doc Body */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="w-full h-1.5 bg-white/10 rounded" />
                                    <div className="w-full h-1.5 bg-white/10 rounded" />
                                    <div className="w-4/5 h-1.5 bg-white/10 rounded" />
                                </div>

                                <div className="p-3 bg-white/5 border-l-2 border-[#E67E22] space-y-2">
                                    <div className="w-full h-1.5 bg-white/20 rounded" />
                                    <div className="w-2/3 h-1.5 bg-white/20 rounded" />
                                </div>

                                <div className="space-y-2">
                                    <div className="w-full h-1.5 bg-white/10 rounded" />
                                    <div className="w-1/2 h-1.5 bg-white/10 rounded" />
                                </div>
                            </div>

                            {/* Success Badge */}
                            <div className="absolute bottom-4 right-4 px-2 py-1 bg-[#E67E22] text-[8px] font-mono text-black font-bold uppercase tracking-wider rounded">
                                Généré
                            </div>
                        </div>
                    </div>

                    {/* Floating decoration dots */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-[#E67E22]/30 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `pulse ${2 + i % 3}s infinite ${i * 0.5}s`
                            }}
                        />
                    ))}
                </div>

                {/* Corner markers */}
                <div className="absolute top-12 left-12 w-4 h-4 border-t border-l border-[#E67E22]/40" />
                <div className="absolute top-12 right-12 w-4 h-4 border-t border-r border-[#E67E22]/40" />
                <div className="absolute bottom-12 left-12 w-4 h-4 border-b border-l border-[#E67E22]/40" />
                <div className="absolute bottom-12 right-12 w-4 h-4 border-b border-r border-[#E67E22]/40" />
            </div>
        </div>
    );
}
