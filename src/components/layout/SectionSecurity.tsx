import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { DataSovereigntyDemo } from "./DataSovereigntyDemo";

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
                    <div className="text-[#E67E22] mb-2 text-lg">Souveraineté Numérique.</div>
                    <h2
                        id="security-heading"
                        className="text-4xl md:text-5xl font-mono text-white max-w-xl leading-tight uppercase tracking-[-0.02em] mb-6"
                    >
                        <span className="text-zinc-400">Vos données ne sortent</span><br />
                        pas de chez vous.
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                        Déploiement local ou cloud privé européen. Zéro dépendance aux géants américains.
                    </p>
                </div>

                {/* Right: Data Sovereignty Demo visually demonstrating 'No data leak' */}
                <div className="lg:col-span-5 p-6 lg:p-12 border-b border-white/10 flex items-center justify-center bg-[#E67E22]/5">
                    <DataSovereigntyDemo />
                </div>
            </div>

            {/* BADGES ROW: 6 columns -> now 5 columns essentially, but grid is 6. Maybe we should adjusting grid or just remove the item. 
                Let's remove the item. The grid-cols-6 might look empty with 5 items if we don't adjust it.
                The user just said "supprime toute apparition".
                original grid was: grid-cols-2 md:grid-cols-3 lg:grid-cols-6
                With 5 items, lg:grid-cols-6 will leave a gap. 
                However, simply removing the div is the most direct compliance. 
                Wait, I should probably adjust the grid to center or fit 5 items if possible, or just leave it. 
                Let's checking the original code again. 
                It has `lg:grid-cols-6`. 
                If I remove one, I have 5 items. 
                `lg:grid-cols-5` would be better if Tailwind supports it (it usually does or we can use generic).
                But let's just remove the block first. 
            */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <div className="mb-3">
                        <DotIcon icon={leonardIcons.rgpdCompliant} size={24} fillColor="#E67E22" />
                    </div>
                    <span className="text-xs text-white uppercase tracking-wider">RGPD</span>
                </div>
                <div className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <div className="mb-3">
                        <DotIcon icon={leonardIcons.hebergementUE} size={24} fillColor="#E67E22" />
                    </div>
                    <span className="text-xs text-white uppercase tracking-wider">Héberg. UE</span>
                </div>
                <div className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <div className="mb-3">
                        <DotIcon icon={leonardIcons.hdsReady} size={24} fillColor="#E67E22" />
                    </div>
                    <span className="text-xs text-white uppercase tracking-wider">HDS Ready</span>
                </div>
                <div className="p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                    <div className="mb-3">
                        <DotIcon icon={leonardIcons.onPremise} size={24} fillColor="#E67E22" />
                    </div>
                    <span className="text-xs text-white uppercase tracking-wider">On-Premise</span>
                </div>
            </div>

            {/* BOTTOM: Infrastructure note */}
            <div className="p-6 border-t border-white/10 bg-[#E67E22]/5">
                <p className="text-xs text-center text-white/60">
                    Infrastructure dédiée chez <span className="text-[#E67E22]">OVH</span>, <span className="text-[#E67E22]">NumSpot</span> ou <span className="text-[#E67E22]">Outscale</span>
                </p>
            </div>
        </section>
    );
}

