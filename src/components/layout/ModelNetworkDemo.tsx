import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { useEffect, useRef, useState, useCallback } from "react";

type ModelNode = {
    id: string;
    icon: any;
    x: number;
    y: number;
    label: string;
    specialty: string;
};

type Pulse = {
    id: number;
    nodeIndex: number;
    progress: number;
    returning: boolean;
};

const CENTER_X = 160;
const CENTER_Y = 150;

// Nœuds éloignés ~15% du centre vs version précédente pour éviter chevauchement
const MODELS: ModelNode[] = [
    { id: "gpt", icon: leonardIcons.sparkles, x: CENTER_X + 110, y: CENTER_Y - 65, label: "GPT-5", specialty: "LLM" },
    { id: "claude", icon: leonardIcons.visualIntelligence, x: CENTER_X + 95, y: CENTER_Y + 75, label: "Claude 4.5", specialty: "Code" },
    { id: "gemini", icon: leonardIcons.languageProcess, x: CENTER_X - 15, y: CENTER_Y - 105, label: "Gemini 3", specialty: "Vision" },
    { id: "mistral", icon: leonardIcons.openSourceFirst, x: CENTER_X - 115, y: CENTER_Y - 35, label: "Mistral L3", specialty: "LLM 🇫🇷" },
    { id: "flux", icon: leonardIcons.imageGeneration, x: CENTER_X - 95, y: CENTER_Y + 80, label: "Flux 2", specialty: "Image" },
    { id: "sora", icon: leonardIcons.videoIntelligence, x: CENTER_X + 10, y: CENTER_Y + 110, label: "Sora 2", specialty: "Video" },
];

const FRAME_INTERVAL = 1000 / 30; // Target ~30fps

export function ModelNetworkDemo() {
    const rafRef = useRef<number>(0);
    const startTimeRef = useRef(Date.now());
    const lastFrameRef = useRef<number>(0);
    const isVisibleRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pulses, setPulses] = useState<Pulse[]>([]);
    const [selectionRing, setSelectionRing] = useState(0);

    const animate = useCallback(() => {
        // Throttle to ~30fps
        const now = Date.now();
        if (now - lastFrameRef.current < FRAME_INTERVAL) {
            if (isVisibleRef.current) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                rafRef.current = 0;
            }
            return;
        }
        lastFrameRef.current = now;

        const elapsed = now - startTimeRef.current;

        // Rotate active model every 4 seconds
        const newActiveIndex = Math.floor(elapsed / 4000) % MODELS.length;
        setActiveIndex(prev => {
            if (prev !== newActiveIndex) {
                setSelectionRing(1);
            }
            return newActiveIndex;
        });

        // Selection ring fade out
        setSelectionRing(prev => Math.max(0, prev - 0.02));

        // Update pulses
        setPulses(prev => {
            const updated = prev
                .map(p => ({
                    ...p,
                    progress: p.progress + 0.012,
                }))
                .filter(p => p.progress < 1);

            // Spawn new pulses periodically for each node
            if (elapsed % 80 < 17) {
                const nodeIdx = Math.floor((elapsed / 800)) % MODELS.length;
                const exists = updated.some(p => p.nodeIndex === nodeIdx && p.progress < 0.5);
                if (!exists) {
                    updated.push({
                        id: elapsed + Math.random(),
                        nodeIndex: nodeIdx,
                        progress: 0,
                        returning: nodeIdx === newActiveIndex,
                    });
                }
            }

            return updated;
        });

        if (isVisibleRef.current) {
            rafRef.current = requestAnimationFrame(animate);
        } else {
            rafRef.current = 0;
        }
    }, []);

    // IntersectionObserver to pause animation when not visible
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
                if (entry.isIntersecting && !rafRef.current) {
                    rafRef.current = requestAnimationFrame(animate);
                }
            },
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [animate]);

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        isVisibleRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        };
    }, [animate]);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)]" />

            {/* Star field */}
            <div className="absolute inset-0 opacity-15">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                        style={{
                            top: `${(i * 37 + 13) % 100}%`,
                            left: `${(i * 53 + 7) % 100}%`,
                            opacity: ((i * 17) % 10) / 10,
                        }}
                    />
                ))}
            </div>

            <svg viewBox="0 0 320 300" className="w-full h-full max-w-[320px] max-h-[300px]" aria-hidden="true">
                {/* Connection lines */}
                {MODELS.map((model, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <line
                            key={`line-${model.id}`}
                            x1={CENTER_X}
                            y1={CENTER_Y}
                            x2={model.x}
                            y2={model.y}
                            stroke={isActive ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.07)"}
                            strokeWidth={isActive ? "1.5" : "0.5"}
                            strokeDasharray={isActive ? "none" : "3 3"}
                        />
                    );
                })}

                {/* Data pulses traveling along lines */}
                {pulses.map((p) => {
                    const model = MODELS[p.nodeIndex];
                    const t = p.returning ? 1 - p.progress : p.progress;
                    const x = CENTER_X + (model.x - CENTER_X) * t;
                    const y = CENTER_Y + (model.y - CENTER_Y) * t;
                    const isActivePulse = p.nodeIndex === activeIndex;

                    return (
                        <g key={p.id}>
                            <circle
                                cx={x}
                                cy={y}
                                r="2.5"
                                fill={isActivePulse ? "#3B82F6" : "rgba(255,255,255,0.4)"}
                                opacity={1 - p.progress * 0.6}
                            />
                            {isActivePulse && (
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="5"
                                    fill="rgba(59,130,246,0.15)"
                                    style={{ filter: 'blur(2px)' }}
                                />
                            )}
                        </g>
                    );
                })}

                {/* Selection ring expanding from center */}
                {selectionRing > 0 && (
                    <circle
                        cx={CENTER_X}
                        cy={CENTER_Y}
                        r={30 + (1 - selectionRing) * 50}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="1"
                        opacity={selectionRing * 0.4}
                    />
                )}

                {/* Central Leonard node */}
                <g>
                    {/* Outer glow */}
                    <circle cx={CENTER_X} cy={CENTER_Y} r="20" fill="rgba(59,130,246,0.06)" style={{ filter: 'blur(6px)' }} />
                    {/* Node bg */}
                    <circle cx={CENTER_X} cy={CENTER_Y} r="16" fill="#121110" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
                    {/* Inner dot */}
                    <circle cx={CENTER_X} cy={CENTER_Y} r="3" fill="#3B82F6" opacity="0.8">
                        <animate attributeName="r" values="2.5;3.5;2.5" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    {/* Leonard label directly in SVG to avoid overlap issues */}
                    <text x={CENTER_X} y={CENTER_Y + 28} textAnchor="middle" className="text-[8px] fill-[#3B82F6]/50 font-mono uppercase tracking-widest">Leonard</text>
                </g>
            </svg>

            {/* Model nodes rendered as DOM elements for DotIcon compatibility */}
            {MODELS.map((model, i) => {
                const isActive = i === activeIndex;
                const leftPct = (model.x / 320) * 100;
                const topPct = (model.y / 300) * 100;

                return (
                    <div
                        key={model.id}
                        className="absolute flex flex-col items-center transition-all duration-300"
                        style={{
                            left: `${leftPct}%`,
                            top: `${topPct}%`,
                            transform: `translate(-50%, -50%) scale(${isActive ? 1.1 : 0.9})`,
                            opacity: isActive ? 1 : 0.4,
                            zIndex: isActive ? 30 : 20,
                        }}
                    >
                        {/* Icône — rounded-full, pas de bordure visible, juste un glow subtil quand actif */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? "bg-[#0A0A0A] shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "bg-[#0A0A0A]/80"}`}>
                            <DotIcon icon={model.icon} size={20} fillColor={isActive ? "#3B82F6" : "white"} />
                        </div>

                        {/* Label et spécialité — toujours visibles, taille lisible */}
                        <div className={`mt-2 flex flex-col items-center transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-0"}`}>
                            <span className="text-[9px] text-white font-mono uppercase tracking-widest whitespace-nowrap">{model.label}</span>
                            <span className={`text-[8px] font-bold uppercase tracking-wider whitespace-nowrap ${isActive ? "text-[#3B82F6]" : "text-white/60"}`}>{model.specialty}</span>
                        </div>
                    </div>
                );
            })}

            {/* Seul HUD restant — bottom center */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-[#3B82F6] rounded-full animate-pulse" />
                <span className="text-[7px] text-[#3B82F6] uppercase tracking-widest font-bold font-mono">Agnostique · Sur-mesure</span>
            </div>
        </div>
    );
}
