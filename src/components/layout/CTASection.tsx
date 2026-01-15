import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <section id="section-cta" className="cta-section cta py-32 bg-black relative overflow-hidden border-b border-white/10">
            {/* Background Grain/Noise could go here */}

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10 cta__container">
                <h2 id="cta-heading" className="text-5xl md:text-7xl font-bold font-display text-white mb-8 tracking-tight cta__heading">
                    Prêt à reprendre le <br />
                    contrôle ?
                </h2>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed cta__subtext">
                    Discutons de vos enjeux de souveraineté et identifions ensemble votre premier cas d'usage à fort impact.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 cta__actions">
                    <a href="#section-contact" id="cta-btn-primary" className="group relative px-8 h-14 flex items-center justify-center bg-white text-black font-mono font-bold uppercase text-lg hover:bg-gray-200 transition-all w-full md:w-auto cta__btn cta__btn--primary">
                        <span className="flex items-center gap-3">
                            Réserver un Audit
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>

                    <a href="#section-contact" id="cta-btn-secondary" className="px-8 h-14 flex items-center justify-center border border-white/20 text-white font-mono uppercase text-sm hover:bg-white/5 transition-all w-full md:w-auto cta__btn cta__btn--secondary">
                        Voir les disponibilités
                    </a>
                </div>

                <div className="mt-16 pt-16 border-t border-white/5 flex justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700 cta__badges">
                    {/* Trust indicators / badges could go here */}
                    <span className="font-mono text-xs cta__badge">SOC2 COMPLIANT</span>
                    <span className="font-mono text-xs cta__badge">ISO 27001</span>
                    <span className="font-mono text-xs cta__badge">GDPR READY</span>
                </div>
            </div>
        </section>
    );
}
