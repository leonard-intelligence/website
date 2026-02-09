import { useEffect, useRef, useState, useCallback } from "react";

type DataPacket = {
    id: number;
    angle: number;
    progress: number;
    speed: number;
    orbitRadius: number;
};

type Threat = {
    id: number;
    angle: number;
    distance: number;
    flashOpacity: number;
};

const PERIMETER_RADIUS = 95;
const CENTER_X = 160;
const CENTER_Y = 155;
const PACKET_COUNT = 10;
const HEX_POINTS = 6;

function getHexPoint(cx: number, cy: number, radius: number, index: number): [number, number] {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function getHexPath(cx: number, cy: number, radius: number): string {
    const points = Array.from({ length: HEX_POINTS }, (_, i) => getHexPoint(cx, cy, radius, i));
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
}

const FRAME_INTERVAL = 1000 / 30; // Target ~30fps

export function ServerVaultDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const startTimeRef = useRef(Date.now());
    const lastFrameRef = useRef<number>(0);
    const isVisibleRef = useRef(false);
    const [dashOffset, setDashOffset] = useState(0);
    const [packets, setPackets] = useState<DataPacket[]>(() =>
        Array.from({ length: PACKET_COUNT }, (_, i) => ({
            id: i,
            angle: (Math.PI * 2 / PACKET_COUNT) * i,
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.004,
            orbitRadius: 50 + Math.random() * 35,
        }))
    );
    const [threats, setThreats] = useState<Threat[]>([]);
    const [pulse, setPulse] = useState(1);

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

        setDashOffset(elapsed * 0.015);
        setPulse(1 + Math.sin(elapsed * 0.002) * 0.06);

        // Update packets — orbit inside perimeter
        setPackets(prev => prev.map(p => ({
            ...p,
            angle: p.angle + p.speed,
            progress: (p.progress + p.speed * 0.5) % 1,
        })));

        // Spawn threats randomly
        if (Math.random() > 0.985) {
            const id = elapsed + Math.random();
            const angle = Math.random() * Math.PI * 2;
            setThreats(prev => [
                ...prev.filter(t => t.distance > PERIMETER_RADIUS + 5 || t.flashOpacity > 0),
                { id, angle, distance: PERIMETER_RADIUS + 80, flashOpacity: 0 }
            ]);
        }

        // Move threats inward, flash and remove on contact
        setThreats(prev => prev
            .map(t => {
                if (t.distance <= PERIMETER_RADIUS + 8) {
                    return { ...t, distance: t.distance, flashOpacity: Math.max(0, t.flashOpacity - 0.03) };
                }
                return { ...t, distance: t.distance - 0.8 };
            })
            .map(t => {
                if (t.distance <= PERIMETER_RADIUS + 10 && t.flashOpacity === 0 && t.distance > PERIMETER_RADIUS + 7) {
                    return { ...t, flashOpacity: 1 };
                }
                return t;
            })
            .filter(t => t.flashOpacity > 0.01 || t.distance > PERIMETER_RADIUS + 8)
        );

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

    const hexPath = getHexPath(CENTER_X, CENTER_Y, PERIMETER_RADIUS);
    const innerHexPath = getHexPath(CENTER_X, CENTER_Y, PERIMETER_RADIUS - 8);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,126,34,0.04)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-pattern-grid opacity-[0.03]" />

            <svg viewBox="0 0 320 310" className="w-full h-full max-w-[320px] max-h-[310px]" aria-hidden="true">
                {/* Outer perimeter — dashed scanning */}
                <path
                    d={hexPath}
                    fill="none"
                    stroke="rgba(230,126,34,0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="8 6"
                    strokeDashoffset={dashOffset}
                />

                {/* Inner perimeter — solid subtle */}
                <path
                    d={innerHexPath}
                    fill="none"
                    stroke="rgba(230,126,34,0.08)"
                    strokeWidth="0.5"
                />

                {/* Perimeter glow */}
                <path
                    d={hexPath}
                    fill="none"
                    stroke="rgba(230,126,34,0.06)"
                    strokeWidth="6"
                    style={{ filter: 'blur(4px)' }}
                />

                {/* Lock nodes at hex vertices */}
                {Array.from({ length: HEX_POINTS }, (_, i) => {
                    const [x, y] = getHexPoint(CENTER_X, CENTER_Y, PERIMETER_RADIUS, i);
                    return (
                        <g key={`lock-${i}`}>
                            <circle cx={x} cy={y} r="6" fill="#121110" stroke="rgba(230,126,34,0.4)" strokeWidth="1" />
                            {/* Lock icon simplified */}
                            <rect x={x - 2.5} y={y - 1} width="5" height="4" rx="0.5" fill="none" stroke="#e67d23" strokeWidth="0.8" />
                            <path d={`M${x - 1.5},${y - 1} L${x - 1.5},${y - 2.5} A1.5,1.5 0 0 1 ${x + 1.5},${y - 2.5} L${x + 1.5},${y - 1}`} fill="none" stroke="#e67d23" strokeWidth="0.7" />
                        </g>
                    );
                })}

                {/* SERVER RACK 1 (center-left) */}
                <g transform={`translate(${CENTER_X - 30}, ${CENTER_Y - 20})`}>
                    <rect x="0" y="0" width="20" height="40" rx="2" fill="#1A1918" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    {[0, 1, 2, 3, 4].map(j => (
                        <g key={`rack1-${j}`}>
                            <rect x="3" y={4 + j * 7} width="14" height="4" rx="0.5" fill="#0F0F0F" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
                            <circle cx="15" cy={6 + j * 7} r="1" fill="#e67d23" opacity={0.4 + Math.sin(j) * 0.3}>
                                <animate attributeName="opacity" values={`${0.3 + j * 0.1};${0.7 + j * 0.05};${0.3 + j * 0.1}`} dur={`${2 + j * 0.3}s`} repeatCount="indefinite" />
                            </circle>
                        </g>
                    ))}
                </g>

                {/* SERVER RACK 2 (center-right) */}
                <g transform={`translate(${CENTER_X + 10}, ${CENTER_Y - 20})`}>
                    <rect x="0" y="0" width="20" height="40" rx="2" fill="#1A1918" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    {[0, 1, 2, 3, 4].map(j => (
                        <g key={`rack2-${j}`}>
                            <rect x="3" y={4 + j * 7} width="14" height="4" rx="0.5" fill="#0F0F0F" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
                            <circle cx="15" cy={6 + j * 7} r="1" fill="#e67d23" opacity={0.5}>
                                <animate attributeName="opacity" values={`${0.4 + j * 0.08};${0.8};${0.4 + j * 0.08}`} dur={`${2.5 + j * 0.2}s`} repeatCount="indefinite" />
                            </circle>
                        </g>
                    ))}
                </g>

                {/* SERVER RACK 3 (center-bottom) */}
                <g transform={`translate(${CENTER_X - 10}, ${CENTER_Y + 12})`}>
                    <rect x="0" y="0" width="20" height="30" rx="2" fill="#1A1918" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    {[0, 1, 2, 3].map(j => (
                        <g key={`rack3-${j}`}>
                            <rect x="3" y={3 + j * 6} width="14" height="4" rx="0.5" fill="#0F0F0F" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
                            <circle cx="15" cy={5 + j * 6} r="1" fill="#e67d23" opacity={0.5}>
                                <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${1.8 + j * 0.4}s`} repeatCount="indefinite" />
                            </circle>
                        </g>
                    ))}
                    {/* French flag on center rack */}
                    <rect x="3" y="-5" width="3" height="4" fill="#002395" rx="0.3" />
                    <rect x="6" y="-5" width="3" height="4" fill="#FFFFFF" rx="0.3" />
                    <rect x="9" y="-5" width="3" height="4" fill="#ED2939" rx="0.3" />
                </g>

                {/* Center pulse glow */}
                <circle
                    cx={CENTER_X}
                    cy={CENTER_Y}
                    r={20}
                    fill="rgba(230,126,34,0.03)"
                    style={{ transform: `scale(${pulse})`, transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
                />

                {/* User node (top) */}
                <g transform={`translate(${CENTER_X}, ${CENTER_Y - PERIMETER_RADIUS + 20})`}>
                    <circle r="8" fill="#121110" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                    {/* User icon simplified */}
                    <circle cx="0" cy="-2" r="2.5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
                    <path d="M-4,5 A4,3 0 0 1 4,5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
                </g>

                {/* Data packets circulating inside perimeter */}
                {packets.map((p) => {
                    const x = CENTER_X + Math.cos(p.angle) * p.orbitRadius;
                    const y = CENTER_Y + Math.sin(p.angle) * p.orbitRadius;
                    return (
                        <g key={p.id}>
                            <circle
                                cx={x}
                                cy={y}
                                r="2"
                                fill="#e67d23"
                                opacity={0.6 + Math.sin(p.progress * Math.PI * 2) * 0.3}
                            />
                            <circle
                                cx={x}
                                cy={y}
                                r="4"
                                fill="rgba(230,126,34,0.15)"
                                style={{ filter: 'blur(2px)' }}
                            />
                        </g>
                    );
                })}

                {/* Threat particles approaching from outside */}
                {threats.map((t) => {
                    const x = CENTER_X + Math.cos(t.angle) * t.distance;
                    const y = CENTER_Y + Math.sin(t.angle) * t.distance;
                    const isFlashing = t.flashOpacity > 0 && t.distance <= PERIMETER_RADIUS + 10;

                    return (
                        <g key={t.id}>
                            {/* Threat dot */}
                            <circle
                                cx={x}
                                cy={y}
                                r="2"
                                fill={isFlashing ? "#FF4444" : "rgba(255,255,255,0.25)"}
                                opacity={isFlashing ? t.flashOpacity : 0.4}
                            />
                            {/* Flash on perimeter impact */}
                            {isFlashing && (
                                <circle
                                    cx={CENTER_X + Math.cos(t.angle) * PERIMETER_RADIUS}
                                    cy={CENTER_Y + Math.sin(t.angle) * PERIMETER_RADIUS}
                                    r="8"
                                    fill="none"
                                    stroke="#e67d23"
                                    strokeWidth="1.5"
                                    opacity={t.flashOpacity * 0.6}
                                    style={{ filter: 'blur(2px)' }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* HUD Labels */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] text-white/60 uppercase tracking-[0.3em] font-mono">Déploiement local</span>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-[#e67d23] rounded-full animate-pulse" />
                    <span className="text-[7px] text-[#e67d23] uppercase tracking-widest font-bold font-mono">Périmètre chiffré // AES-256</span>
                </div>
                <span className="text-[7px] text-white/30 uppercase tracking-[0.2em] font-mono">100% on-premise · vos serveurs</span>
            </div>
        </div>
    );
}
