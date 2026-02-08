import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";

export function InterimCTA() {
    return (
        <section className="relative py-24 border-y border-white/5 bg-[#1C1816] overflow-hidden">
            {/* Background Pattern for Visual Break */}
            <div className="absolute inset-0 bg-pattern-diagonal opacity-20 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-6 text-center">
                <h3 className="text-2xl md:text-3xl font-mono text-white mb-8">
                    Vos données ont du potentiel. On le prouve en 30 minutes.
                </h3>
                <div className="flex justify-center">
                    <a
                        href="#section-contact"
                        className="group relative px-8 py-4 bg-[#D35400] text-white font-semibold uppercase text-sm tracking-wider hover:bg-white hover:text-[#D35400] transition-colors duration-300 flex items-center gap-3"
                    >
                        <span>Réserver un créneau</span>
                        <div className="group-hover:translate-x-1 transition-transform">
                            <DotIcon icon={leonardIcons.arrowRight} size={16} fillColor="currentColor" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
