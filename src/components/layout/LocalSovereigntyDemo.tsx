import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { useEffect, useState, useRef } from "react";

export function LocalSovereigntyDemo() {
    const [rotation, setRotation] = useState(0);
    const [pulse, setPulse] = useState(1);
    const [threats, setThreats] = useState<{ id: number; angle: number; distance: number }[]>([]);

    useEffect(() => {
        let animationFrameId: number;
        let startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            setRotation(elapsed * 0.05);
            setPulse(1 + Math.sin(elapsed * 0.003) * 0.05);

            // Randomly spawn threats
            if (Math.random() > 0.95) {
                setThreats(prev => [
                    ...prev.filter(t => t.distance > 80), // Remove threats that hit the shield
                    { id: now + Math.random(), angle: Math.random() * Math.PI * 2, distance: 200 }
                ]);
            }

            setThreats(prev => prev.map(t => ({
                ...t,
                distance: t.distance - 2 // Movement towards center
            })));

            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
            {/* Dark Technical Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-pattern-grid opacity-[0.03]" />

            <div className="relative w-80 h-80 flex items-center justify-center">

                {/* 1. LAYER 3: OUTER SENSORS */}
                <div className="absolute w-[240px] h-[240px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite]" />

                {/* 2. LAYER 2: REACTIVE SHIELD GRID */}
                <div className="absolute w-[180px] h-[180px] flex items-center justify-center">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="absolute w-full h-full rounded-full border border-dashed border-[#E67E22]/10"
                            style={{ transform: `rotate(${rotation * (i + 1) * 0.5}deg)` }}
                        />
                    ))}
                    {/* Shield Arc Segments */}
                    <div className="absolute w-full h-full rounded-full border-t-2 border-[#E67E22]/40" style={{ transform: `rotate(${rotation * 1.5}deg)` }} />
                    <div className="absolute w-full h-full rounded-full border-b-2 border-white/20" style={{ transform: `rotate(${-rotation * 0.8}deg)` }} />
                </div>

                {/* 3. LAYER 1: THE CORE (THE "CRYSTAL") */}
                <div className="relative z-30 flex items-center justify-center transition-transform duration-300" style={{ transform: `scale(${pulse})` }}>
                    <div className="w-16 h-16 bg-zinc-900 border-2 border-[#E67E22] rotate-45 rounded-sm flex items-center justify-center shadow-[0_0_40px_rgba(230,126,34,0.3)]">
                        <div className="rotate-[-45deg]">
                            <DotIcon icon={leonardIcons.onPremise} size={28} fillColor="#E67E22" />
                        </div>
                        {/* Inner Pulse */}
                        <div className="absolute inset-0 bg-[#E67E22]/20 animate-pulse rounded-sm" />
                    </div>
                </div>

                {/* 4. THREAT PARTICLES (BLOCKED BY SHIELD) */}
                {threats.map((t) => (
                    <div
                        key={t.id}
                        className="absolute w-1 h-1 bg-white rounded-full transition-opacity duration-300"
                        style={{
                            transform: `rotate(${t.angle}rad) translate(${t.distance}px)`,
                            opacity: t.distance < 95 ? 0 : 0.6,
                        }}
                    />
                ))}

                {/* 5. LABELS */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group">
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.4em] font-mono group-hover:text-white transition-colors">Local Vault System v4.2</span>
                    <div className="flex gap-2">
                        <div className="w-1 h-1 bg-[#E67E22] rounded-full animate-pulse" />
                        <span className="text-[7px] text-[#E67E22] uppercase tracking-widest font-bold">Encrypted & Sovereign</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
