import { useState, useEffect } from 'react';
import { DotIcon, leonardIcons } from "@/components/ui/LeonardIcons";
import { TechIllustration } from "@/components/ui/TechIllustration";
import { CalendlyWidget } from "@/components/ui/CalendlyWidget";
import { Modal } from "@/components/ui/Modal";
import ctaBg from '@/assets/images/illustrations/illustration-conversation-night-01.png';

export function CTASection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPreloaded, setIsPreloaded] = useState(false);

    // Lazy preload strategy:
    // Load the widget 2.5s after mount (when network is likely idle)
    // This allows instant open without blocking initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPreloaded(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="section-cta" className="py-32 bg-black relative overflow-hidden border-b border-white/10">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <TechIllustration
                    src={ctaBg}
                    alt="Future City Background"
                    className="absolute inset-0 w-full h-full opacity-40"
                    aspectRatio=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                {/* Sovereignty-focused headline like Onepoint */}
                <h2 id="cta-heading" className="text-4xl md:text-5xl font-medium font-mono text-white mb-6">
                    Passez à l'action.
                </h2>
                <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
                    Audit gratuit de 30 minutes. Identification des opportunités d'automatisation pour votre entreprise.
                </p>

                <div className="flex flex-col items-center justify-center gap-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        id="cta-btn-primary"
                        className="group relative px-8 h-14 flex items-center justify-center bg-[#E67E22] text-white border border-[#E67E22] font-mono font-medium uppercase text-lg hover:bg-white hover:text-[#E67E22] transition-colors duration-300 w-full md:w-auto cursor-pointer"
                    >
                        <span className="flex items-center gap-3">
                            RÉSERVER UN CRÉNEAU
                            <div className="group-hover:translate-x-1 transition-transform">
                                <DotIcon icon={leonardIcons.arrowRight} size={20} fillColor="currentColor" />
                            </div>
                        </span>
                    </button>

                    {/* Render if open OR preloaded (persisted) */}
                    {(isModalOpen || isPreloaded) && (
                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            fullScreen
                            persist
                        >
                            <CalendlyWidget
                                className="mt-0 h-full"
                                style={{ minWidth: '320px', height: '100%' }}
                                url="https://calendly.com/leonard-intelligence/30min"
                            />
                        </Modal>
                    )}
                </div>

                {/* Enhanced compliance badges like Sia Partners */}
                <div className="mt-16 pt-16 border-t border-white/5">
                    <p className="text-xs text-gray-500 font-mono mb-6 uppercase tracking-wider">Conformité</p>
                    <div className="flex flex-wrap justify-center gap-8 items-center">
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <DotIcon icon={leonardIcons.aiActReady} size={16} fillColor="#E67E22" />
                            <span className="font-mono text-xs">AI ACT READY</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <DotIcon icon={leonardIcons.rgpdCompliant} size={16} fillColor="#E67E22" />
                            <span className="font-mono text-xs">RGPD COMPLIANT</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <DotIcon icon={leonardIcons.hdsReady} size={16} fillColor="#E67E22" />
                            <span className="font-mono text-xs">HDS COMPATIBLE</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <DotIcon icon={leonardIcons.hebergementUE} size={16} fillColor="#E67E22" />
                            <span className="font-mono text-xs">HÉBERGEMENT UE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

