import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { useEffect, useState } from "react";

// Types
type FileType = "PDF" | "XLS" | "DOC" | "MAIL";

type FileNode = {
    id: number;
    type: FileType;
    x: number;
    y: number;
    angle: number;
    distance: number;
    color: string;
    isRelevant: boolean; // For current query
    opacity: number;
};

const FILE_TYPES = [
    { type: "PDF", color: "#EF4444" }, // Red
    { type: "XLS", color: "#10B981" }, // Green
    { type: "DOC", color: "#3B82F6" }, // Blue
    { type: "MAIL", color: "#F59E0B" }, // Orange
] as const;

const SCENARIOS = [
    {
        query: "Procédure note de frais 2024",
        targetTypes: ["PDF", "XLS"],
    },
    {
        query: "Contrat client Acme Corp",
        targetTypes: ["DOC", "MAIL"],
    },
    {
        query: "Bilan carbone Q3",
        targetTypes: ["XLS", "PDF"],
    },
];

// Simple File Icon Component
function FileIcon({ type, color, isActive }: { type: string; color: string; isActive: boolean }) {
    return (
        <div className={`relative flex items-center justify-center transition-all duration-300 ${isActive ? "scale-125 z-50" : "scale-100 opacity-30 z-10"}`}>
            {/* SVG File Shape */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                <path
                    d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                    fill={isActive ? "#FFFFFF" : "#18181B"} // White when active, Zinc-900 when inactive
                    stroke={isActive ? color : "rgba(255,255,255,0.2)"} // Colored border when active
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                />
                <path
                    d="M14 2V8H20"
                    stroke={isActive ? color : "rgba(255,255,255,0.2)"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                />
            </svg>

            {/* Label inside */}
            <span
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] text-[8px] font-bold tracking-tighter transition-colors duration-300`}
                style={{ color: isActive ? color : "rgba(255,255,255,0.3)" }}
            >
                {type}
            </span>
        </div>
    );
}

export function KnowledgeBaseDemo() {
    const [nodes, setNodes] = useState<FileNode[]>([]);
    const [phase, setPhase] = useState<"IDLE" | "TYPING" | "SCANNING" | "RESULTS">("IDLE");
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [typedQuery, setTypedQuery] = useState("");
    const [scanAngle, setScanAngle] = useState(0);

    // Initialize Nodes
    useEffect(() => {
        const newNodes: FileNode[] = [];
        for (let i = 0; i < 16; i++) {
            const fType = FILE_TYPES[i % FILE_TYPES.length];
            const angle = (i / 16) * Math.PI * 2;
            const distance = 100 + Math.random() * 50; // Increased distance to avoid overlap

            newNodes.push({
                id: i,
                type: fType.type as FileType,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                angle: angle,
                distance: distance,
                color: fType.color,
                isRelevant: false,
                opacity: 0.3, // Dim by default
            });
        }
        setNodes(newNodes);

        // Start Loop
        setTimeout(() => setPhase("TYPING"), 1000);
    }, []);

    // Scenario Logic
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        const scenario = SCENARIOS[currentScenarioIndex];

        if (phase === "TYPING") {
            // Reset relevant status
            setNodes(prev => prev.map(n => ({ ...n, isRelevant: false, opacity: 0.3 })));

            let charIndex = 0;
            const typeTick = setInterval(() => {
                setTypedQuery(scenario.query.slice(0, charIndex + 1));
                charIndex++;
                if (charIndex >= scenario.query.length) {
                    clearInterval(typeTick);
                    setTimeout(() => setPhase("SCANNING"), 500);
                }
            }, 50);

            return () => clearInterval(typeTick);
        }

        if (phase === "SCANNING") {
            // Identify targets
            setNodes(prev => prev.map(n => ({
                ...n,
                isRelevant: scenario.targetTypes.includes(n.type) && Math.random() > 0.6, // Random subset of matching types
            })));

            timeout = setTimeout(() => setPhase("RESULTS"), 1500);
        }

        if (phase === "RESULTS") {
            // Highlight targets
            setNodes(prev => prev.map(n => ({
                ...n,
                opacity: n.isRelevant ? 1 : 0.1, // Highlight relevant, dim others more
            })));

            timeout = setTimeout(() => {
                setTypedQuery("");
                setCurrentScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
                setPhase("TYPING");
            }, 3500);
        }

        return () => clearTimeout(timeout);
    }, [phase, currentScenarioIndex]);


    // Animation Loop (Orbit + Scan)
    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            setNodes((prev) => prev.map((node) => {
                const newAngle = node.angle + 0.001;
                return {
                    ...node,
                    angle: newAngle,
                    x: Math.cos(newAngle) * node.distance,
                    y: Math.sin(newAngle) * node.distance,
                };
            }));

            if (phase === "SCANNING") {
                setScanAngle(prev => prev + 0.15);
            } else {
                setScanAngle(prev => prev + 0.01);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [phase]);

    return (
        <div className="border border-white/20 bg-zinc-900/50 rounded-lg overflow-hidden shadow-2xl relative z-10 w-full h-[450px] flex flex-col">
            {/* Context Header */}
            <div className="flex items-center justify-between px-3 lg:px-5 py-3 bg-zinc-800/50 border-b border-white/10 shrink-0">
                {/* Search Bar - Widened & Larger */}
                <div className="flex-1 max-w-[480px] bg-black/40 border border-white/10 rounded px-3 py-2 flex items-center gap-3">
                    <DotIcon icon={leonardIcons.search || leonardIcons.saisieAutomatisee} size={14} fillColor="#E67E22" />
                    <div className="text-sm text-white h-5 overflow-hidden relative w-full flex items-center">
                        {typedQuery}<span className="animate-pulse ml-0.5 w-1.5 h-4 bg-[#E67E22] block"></span>
                    </div>
                </div>
                {/* Label */}
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse" />
                    <span className="text-[10px] text-white/60 tracking-wider uppercase">Moteur de Recherche</span>
                </div>
            </div>

            {/* Visual Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Radar/Scan Effect */}
                <div
                    className="absolute w-[400px] h-[400px] rounded-full opacity-10 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(230,126,34,0.5)_360deg)] duration-0 transition-opacity pointer-events-none"
                    style={{
                        transform: `rotate(${scanAngle}rad)`,
                        opacity: phase === "SCANNING" ? 0.2 : 0.05
                    }}
                />

                {/* LAYER 1: Connection Lines (Deepest Z-Index) */}
                <div className="absolute top-1/2 left-1/2 w-0 h-0 z-10">
                    {nodes.map(node => (
                        <div
                            key={`line-${node.id}`}
                            className={`absolute top-0 left-0 h-[1px] origin-left transition-all duration-500`}
                            style={{
                                width: node.distance,
                                transform: `rotate(${node.angle}rad)`,
                                background: node.isRelevant && phase === "RESULTS"
                                    ? "linear-gradient(90deg, #E67E22 0%, rgba(230,126,34,0) 100%)" // Active: Orange fade
                                    : "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)", // Inactive: Very faint grey fade
                                opacity: node.isRelevant && phase === "RESULTS" ? 1 : 0.5
                            }}
                        />
                    ))}
                </div>

                {/* LAYER 2: Central Brain (Middle Z-Index) */}
                <div className="absolute z-20 flex flex-col items-center justify-center">
                    <div className={`w-16 h-16 bg-zinc-900 border border-[#E67E22]/50 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(230,126,34,0.2)] transition-all duration-300 ${phase === "SCANNING" ? "scale-105 shadow-[0_0_50px_rgba(230,126,34,0.4)] border-[#E67E22]" : ""}`}>
                        <DotIcon icon={leonardIcons.memoireEntreprise} size={24} fillColor="#E67E22" />
                    </div>
                </div>

                {/* LAYER 3: Nodes (Highest Z-Index) */}
                <div className="absolute top-1/2 left-1/2 w-0 h-0 z-30">
                    {nodes.map(node => (
                        <div
                            key={`node-${node.id}`}
                            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                            style={{
                                transform: `translate(${node.x}px, ${node.y}px)`,
                                zIndex: node.isRelevant && phase === "RESULTS" ? 50 : 10
                            }}
                        >
                            <FileIcon
                                type={node.type}
                                color={node.color}
                                isActive={node.isRelevant && phase === "RESULTS"}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Status Footer */}
            <div className="px-5 py-3 bg-zinc-800/30 border-t border-white/5 flex justify-between text-[10px] text-white/30">
                <div className="flex gap-4">
                    <span className={phase === "SCANNING" ? "text-[#E67E22] animate-pulse" : ""}>SCAN</span>
                    <span className={phase === "RESULTS" ? "text-white" : ""}>RÉSULTATS</span>
                </div>
                <div>
                    {phase === "RESULTS" ? `${nodes.filter(n => n.isRelevant).length} documents trouvés` : "En attente..."}
                </div>
            </div>
        </div>
    );
}
