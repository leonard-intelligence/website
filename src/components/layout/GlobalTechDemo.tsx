import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { useEffect, useState } from "react";

type ModelNode = {
    id: string;
    icon: any;
    angle: number;
    distance: number;
    label: string;
    stats: string;
    isActive: boolean;
};

export function GlobalTechDemo() {
    const [scanAngle, setScanAngle] = useState(0);
    const [nodes, setNodes] = useState<ModelNode[]>([
        { id: "gpt", icon: leonardIcons.sparkles, angle: -0.8, distance: 100, label: "GPT-5.2", stats: "99.2% SOTA", isActive: false },
        { id: "claude", icon: leonardIcons.visualIntelligence, angle: 0.5, distance: 120, label: "Claude 4.5", stats: "12ms Latency", isActive: false },
        { id: "gemini", icon: leonardIcons.languageProcess, angle: 2.5, distance: 90, label: "Gemini 3 Pro", stats: "1M Context", isActive: false },
        { id: "mistral", icon: leonardIcons.openSourceFirst, angle: 4.2, distance: 110, label: "Pixtral Large", stats: "Sovereign SOTA", isActive: false },
    ]);

    useEffect(() => {
        let animationFrameId: number;
        let startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const currentAngle = (elapsed * 0.001) % (Math.PI * 2);
            setScanAngle(currentAngle);

            setNodes(prev => prev.map(node => {
                // Normalize node angle to 0-2PI
                const nodeAngle = (node.angle + Math.PI * 2) % (Math.PI * 2);
                const diff = Math.abs(currentAngle - nodeAngle);
                // Beam width is about 0.5 rad
                const isActive = diff < 0.3 || diff > (Math.PI * 2 - 0.3);
                return { ...node, isActive };
            }));

            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
            {/* Constellation Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

            {/* Star Grid */}
            <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random(),
                        }}
                    />
                ))}
            </div>

            <div className="relative w-80 h-80 flex items-center justify-center">

                {/* 1. THE NEURAL LIGHTHOUSE (BEAM) */}
                <div
                    className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-10"
                    style={{
                        background: `conic-gradient(from ${scanAngle}rad, transparent 0deg, rgba(230,126,34,0.15) 350deg, rgba(230,126,34,0.4) 360deg)`,
                        transform: 'rotate(-90deg)' // Align gradient start with Math.cos/sin
                    }}
                />

                {/* 2. CENTRAL ORCHESTRATOR */}
                <div className="relative z-20 w-12 h-12 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-6 h-6 rounded-full bg-[#E67E22]/10 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22] animate-ping" />
                    </div>
                </div>

                {/* 3. MODEL NODES */}
                {nodes.map((node) => {
                    const x = Math.cos(node.angle) * node.distance;
                    const y = Math.sin(node.angle) * node.distance;

                    return (
                        <div
                            key={node.id}
                            className={`absolute flex flex-col items-center transition-all duration-300 ${node.isActive ? "scale-110 z-30" : "scale-90 opacity-30 z-20"}`}
                            style={{ transform: `translate(${x}px, ${y}px)` }}
                        >
                            <div className={`w-10 h-10 rounded-xl bg-zinc-900 border flex items-center justify-center transition-all duration-500 ${node.isActive ? "border-[#E67E22] shadow-[0_0_20px_rgba(230,126,34,0.4)]" : "border-white/10"}`}>
                                <DotIcon icon={node.icon} size={20} fillColor={node.isActive ? "#E67E22" : "white"} />
                            </div>

                            {/* Floating Stats Label */}
                            <div className={`mt-2 flex flex-col items-center transition-all duration-500 ${node.isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                <span className="text-[8px] text-white font-mono uppercase tracking-widest">{node.label}</span>
                                <span className="text-[6px] text-[#E67E22] font-bold uppercase tracking-tighter">{node.stats}</span>
                            </div>
                        </div>
                    );
                })}

                {/* 4. SCANNER HUD */}
                <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none" />
                <div className="absolute inset-4 border border-white/5 rounded-full pointer-events-none" />

                {/* HUD Data */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[1px] bg-white/5" />
                    <div className="h-full w-[1px] bg-white/5 absolute" />
                </div>
            </div>
        </div>
    );
}
