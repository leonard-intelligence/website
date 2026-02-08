import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { useEffect, useRef, useState } from "react";

// Types
type Particle = {
    id: number;
    x: number;
    y: number;
    target: "SERVER" | "AI";
    progress: number; // 0 to 1
    speed: number;
};

const SERVER_POS = { x: -60, y: 0 };
const AI_POS = { x: 60, y: 0 };
const PARTICLE_COUNT = 16;

const DS_FRAME_INTERVAL = 1000 / 30;

export function DataSovereigntyDemo() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const isVisibleRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize
    useEffect(() => {
        const initParticles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
            id: i,
            x: SERVER_POS.x,
            y: SERVER_POS.y,
            target: "AI" as const,
            progress: Math.random(),
            speed: 0.005 + Math.random() * 0.005,
        }));
        setParticles(initParticles);
    }, []);

    // IntersectionObserver
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { isVisibleRef.current = e.isIntersecting; }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Animation Loop — throttled to 30fps
    useEffect(() => {
        let animationFrameId: number;
        let lastFrame = 0;

        const animate = (now: number) => {
            if (!isVisibleRef.current) { animationFrameId = requestAnimationFrame(animate); return; }
            if (now - lastFrame < DS_FRAME_INTERVAL) { animationFrameId = requestAnimationFrame(animate); return; }
            lastFrame = now;

            setParticles((prev) => prev.map((p) => {
                let newProgress = p.progress + p.speed;
                let newTarget = p.target;

                if (newProgress >= 1) {
                    newProgress = 0;
                    newTarget = p.target === "SERVER" ? "AI" : "SERVER";
                }

                const start = p.target === "AI" ? SERVER_POS : AI_POS;
                const end = p.target === "AI" ? AI_POS : SERVER_POS;

                const arcHeight = 40;
                const arc = Math.sin(newProgress * Math.PI) * (p.target === "AI" ? -arcHeight : arcHeight);

                const currentX = start.x + (end.x - start.x) * newProgress;
                const currentY = start.y + (end.y - start.y) * newProgress + arc;

                return {
                    ...p,
                    x: currentX,
                    y: currentY,
                    progress: newProgress,
                    target: newTarget,
                };
            }));

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden bg-zinc-900/50 rounded-xl border border-white/10">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(230,126,34,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(230,126,34,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Security Badge (Top Right) */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                <div className="bg-[#E67E22]/10 border border-[#E67E22]/20 rounded-full px-3 py-1.5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#E67E22] rounded-full animate-pulse" />
                    <span className="text-[10px] text-[#E67E22] tracking-widest font-bold">DONNÉES PROTÉGÉES</span>
                </div>
            </div>

            <div className="relative w-[300px] h-[300px] flex items-center justify-center">

                {/* 1. SECURE PERIMETER (The Firewall) */}
                <div className="absolute w-[260px] h-[260px] rounded-full border-2 border-dashed border-[#E67E22]/20 animate-[spin_120s_linear_infinite]" />
                <div className="absolute w-[260px] h-[260px] rounded-full border border-[#E67E22]/10" />

                {/* Perimeter Glow */}
                <div className="absolute w-[260px] h-[260px] rounded-full bg-[#E67E22]/5 blur-xl" />

                {/* 2. NODES */}

                {/* Node A: Client Infrastructure (Left) */}
                <div
                    className="absolute w-16 h-16 bg-zinc-900 border border-white/10 rounded-2xl flex flex-col items-center justify-center z-10 shadow-lg"
                    style={{ transform: `translate(${SERVER_POS.x}px, ${SERVER_POS.y}px)` }}
                >
                    <DotIcon icon={leonardIcons.onPremise} size={24} fillColor="white" />
                    <div className="absolute -bottom-6 w-32 text-center">
                        <span className="text-[10px] text-white/60 uppercase">Infra Client</span>
                    </div>
                </div>

                {/* Node B: Private AI (Right) */}
                <div
                    className="absolute w-16 h-16 bg-zinc-900 border border-[#E67E22]/30 rounded-2xl flex flex-col items-center justify-center z-10 shadow-[0_0_15px_rgba(230,126,34,0.1)]"
                    style={{ transform: `translate(${AI_POS.x}px, ${AI_POS.y}px)` }}
                >
                    <DotIcon icon={leonardIcons.sparkles} size={24} fillColor="#E67E22" />
                    <div className="absolute -bottom-6 w-32 text-center">
                        <span className="text-[10px] text-[#E67E22] uppercase">IA Privée</span>
                    </div>
                </div>

                {/* 3. DATA FLOW (Particles) */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute rounded-full transition-colors duration-300"
                        style={{
                            width: 3,
                            height: 3,
                            transform: `translate(${p.x}px, ${p.y}px)`,
                            backgroundColor: p.target === "SERVER" ? "#E67E22" : "white", // Orange returning from AI, White going to AI
                            boxShadow: p.target === "SERVER" ? "0 0 5px #E67E22" : "0 0 2px white",
                        }}
                    />
                ))}

            </div>
        </div>
    );
}
