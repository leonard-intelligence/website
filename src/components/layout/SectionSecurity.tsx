import { Shield, Server, Lock, Globe, CheckCircle, Building } from 'lucide-react';

export function SectionSecurity() {
    return (
        <section
            id="section-security"
            className="max-w-[1400px] mx-auto border-t border-x border-b border-white/10 bg-black"
            aria-labelledby="security-heading"
        >
            {/* HERO BANNER: Full width */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Content */}
                <div className="lg:col-span-7 p-12 border-r border-b border-white/10">
                    <div className="text-blue-500 font-mono mb-2 text-lg">02 Souveraineté Numérique.</div>
                    <h2
                        id="security-heading"
                        className="text-4xl md:text-5xl font-mono text-white max-w-xl leading-tight uppercase tracking-[-0.02em] mb-6"
                    >
                        Vos données ne sortent<br />
                        <span className="text-muted-foreground">pas de chez vous.</span>
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
                        Déploiement local ou cloud privé européen. Zéro dépendance aux géants américains. Cloud Act ? Pas concerné.
                    </p>
                </div>

                {/* Right: Shield Visual */}
                <div className="lg:col-span-5 p-12 border-b border-white/10 flex items-center justify-center bg-blue-500/5">
                    <div className="relative">
                        <div className="w-32 h-32 border-2 border-blue-500/30 flex items-center justify-center">
                            <Shield className="w-16 h-16 text-blue-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* BADGES ROW: 6 columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <div className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <Server className="w-6 h-6 text-blue-400 mb-3" />
                    <span className="font-mono text-xs text-white uppercase tracking-wider">SecNumCloud</span>
                </div>
                <div className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <Shield className="w-6 h-6 text-blue-400 mb-3" />
                    <span className="font-mono text-xs text-white uppercase tracking-wider">RGPD</span>
                </div>
                <div className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <Globe className="w-6 h-6 text-blue-400 mb-3" />
                    <span className="font-mono text-xs text-white uppercase tracking-wider">Héberg. UE</span>
                </div>
                <div className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <Lock className="w-6 h-6 text-emerald-400 mb-3" />
                    <span className="font-mono text-xs text-white uppercase tracking-wider">Cloud Act ✗</span>
                </div>
                <div className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mb-3" />
                    <span className="font-mono text-xs text-white uppercase tracking-wider">HDS Ready</span>
                </div>
                <div className="p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <Building className="w-6 h-6 text-blue-400 mb-3" />
                    <span className="font-mono text-xs text-white uppercase tracking-wider">On-Premise</span>
                </div>
            </div>

            {/* BOTTOM: Infrastructure note */}
            <div className="p-6 border-t border-white/10 bg-blue-500/5">
                <p className="font-mono text-xs text-center text-white/60">
                    Infrastructure dédiée chez <span className="text-blue-400">OVH</span>, <span className="text-blue-400">NumSpot</span> ou <span className="text-blue-400">Outscale</span> (certifié SecNumCloud)
                </p>
            </div>
        </section>
    );
}
