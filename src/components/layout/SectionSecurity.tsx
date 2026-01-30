import { Shield, Server, Lock, Globe } from 'lucide-react';

export function SectionSecurity() {
    const badges = [
        { icon: Server, label: 'SecNumCloud', color: 'text-blue-400' },
        { icon: Shield, label: 'RGPD Compliant', color: 'text-blue-400' },
        { icon: Globe, label: 'Hébergement UE', color: 'text-blue-400' },
        { icon: Lock, label: 'Cloud Act Exempt', color: 'text-emerald-400' },
    ];

    return (
        <section
            id="section-security"
            className="py-24 bg-black border-b border-white/10 relative overflow-hidden"
            aria-labelledby="security-heading"
        >
            {/* Subtle gradient accent */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Shield Visual */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative">
                            {/* Animated rings */}
                            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                <div className="w-64 h-64 border border-blue-500/10 rounded-full animate-pulse" />
                                <div className="absolute w-48 h-48 border border-blue-500/20 rounded-full" />
                                <div className="absolute w-32 h-32 border border-blue-500/30 rounded-full" />
                            </div>

                            {/* Central icon */}
                            <div className="relative w-64 h-64 flex items-center justify-center">
                                <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                                    <Shield className="w-12 h-12 text-blue-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:col-span-7">
                        <span className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-4 block">
                            Souveraineté Numérique
                        </span>

                        <h2 id="security-heading" className="text-4xl md:text-5xl font-mono font-bold text-white mb-6 leading-tight">
                            Vos données restent<br />
                            <span className="text-blue-400">les vôtres.</span>
                        </h2>

                        <p className="text-lg font-mono text-white/60 leading-relaxed mb-8 max-w-xl">
                            Déploiement local ou cloud privé européen. Zéro dépendance aux géants américains.
                            <span className="text-white"> Cloud Act ? Pas concerné.</span>
                        </p>

                        {/* Compliance badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {badges.map((badge, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-4 border border-white/10 bg-white/[0.02] hover:bg-blue-500/5 hover:border-blue-500/20 transition-all"
                                >
                                    <badge.icon className={`w-5 h-5 ${badge.color}`} />
                                    <span className="font-mono text-xs text-white/80 uppercase tracking-wider">
                                        {badge.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Infrastructure note */}
                        <div className="mt-8 p-4 border-l-2 border-blue-500/50 bg-blue-500/5">
                            <p className="font-mono text-sm text-white/70">
                                <span className="text-blue-400 font-bold">Infrastructure dédiée</span> chez OVH, NumSpot ou Outscale (certifié SecNumCloud).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
