import { ArrowRight, Shield, Scale, Server } from "lucide-react";

export function CTASection() {
    return (
        <section id="section-cta" className="py-32 bg-black relative overflow-hidden border-b border-white/10">
            {/* Background Grain/Noise could go here */}

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                {/* Sovereignty-focused headline like Onepoint */}
                <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold font-mono text-white mb-6">
                    Passez à l'action.
                </h2>
                <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
                    Audit gratuit de 30 minutes. Identification des opportunités d'automatisation pour votre entreprise.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <a href="#section-contact" id="cta-btn-primary" className="group relative px-8 h-14 flex items-center justify-center bg-white text-black font-mono font-bold uppercase text-lg hover:bg-emerald-400 transition-all w-full md:w-auto rounded-full">
                        <span className="flex items-center gap-3">
                            RÉSERVER UN CRÉNEAU
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>
                </div>

                {/* Enhanced compliance badges like Sia Partners */}
                <div className="mt-16 pt-16 border-t border-white/5">
                    <p className="text-xs text-gray-500 font-mono mb-6 uppercase tracking-wider">Conformité & Certifications</p>
                    <div className="flex flex-wrap justify-center gap-8 items-center">
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Scale className="w-4 h-4 text-emerald-400" />
                            <span className="font-mono text-xs">AI ACT READY</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Shield className="w-4 h-4 text-blue-400" />
                            <span className="font-mono text-xs">RGPD COMPLIANT</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Server className="w-4 h-4 text-purple-400" />
                            <span className="font-mono text-xs">SecNumCloud</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <span className="text-sm">🏥</span>
                            <span className="font-mono text-xs">HDS COMPATIBLE</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <span className="text-sm">🇪🇺</span>
                            <span className="font-mono text-xs">HÉBERGEMENT UE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
