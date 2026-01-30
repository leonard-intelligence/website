import { Suspense, lazy, useLayoutEffect } from 'react';
import { useReveal } from './hooks/useReveal';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { FxProvider } from './components/fx';
import { SectionLoader } from './components/ui/SectionLoader';

// Lazy load below-the-fold sections
const UseCaseGrid = lazy(() => import('./components/layout/UseCaseGrid').then(m => ({ default: m.UseCaseGrid })));
const SectionVision = lazy(() => import('./components/layout/SectionVision').then(m => ({ default: m.SectionVision })));
const SectionText = lazy(() => import('./components/layout/SectionText').then(m => ({ default: m.SectionText })));
const SectionAudio = lazy(() => import('./components/layout/SectionAudio').then(m => ({ default: m.SectionAudio })));
const Methodology = lazy(() => import('./components/layout/Methodology').then(m => ({ default: m.Methodology })));
const SectionROI = lazy(() => import('./components/layout/SectionROI').then(m => ({ default: m.SectionROI })));
const SectionSecurity = lazy(() => import('./components/layout/SectionSecurity').then(m => ({ default: m.SectionSecurity })));
const SectionPatrimoine = lazy(() => import('./components/layout/SectionPatrimoine').then(m => ({ default: m.SectionPatrimoine })));
const SectionStrategy = lazy(() => import('./components/layout/SectionStrategy').then(m => ({ default: m.SectionStrategy })));
const CTASection = lazy(() => import('./components/layout/CTASection').then(m => ({ default: m.CTASection })));
const Contact = lazy(() => import('./components/layout/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/layout/Footer').then(m => ({ default: m.Footer })));

export function App() {
    // Initialize reveal animations
    useReveal();

    // Force scroll to top on mount/refresh to prevent browser scroll restoration
    useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        return () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
        };
    }, []);

    return (
        <FxProvider>
            <div className="min-h-screen bg-background text-foreground font-sans">
                {/* Light Gradient Overlay */}
                <div className="gradient-overlay"></div>

                <Navbar />
                <main>
                    <Hero />

                    <Suspense fallback={<SectionLoader />}>
                        {/* 1. Deep Dive Sections by Module */}
                        <section id="section-expertises" className="flex flex-col gap-24 py-24 expertises" aria-label="Nos Expertises">
                            <SectionVision />
                            <SectionText />
                            <SectionAudio />
                        </section>

                        {/* 2. Methodology ("Architecture Agnostique") */}
                        <section id="section-methodology" aria-label="Notre Méthodologie">
                            <Methodology />
                        </section>

                        {/* 3. Catalog / Use Cases ("Impact Mesuré") */}
                        <section id="section-solutions" aria-label="Cas d'usage et Solutions">
                            <UseCaseGrid />
                        </section>

                        {/* 4. Arguments Marketing (ROI, Sécurité, Patrimoine, Stratégie) */}
                        <SectionROI />
                        <SectionSecurity />
                        <SectionPatrimoine />
                        <SectionStrategy />

                        <section id="section-cta" aria-label="Commencer">
                            <CTASection />
                        </section>

                        <section id="section-contact" aria-label="Contact">
                            <Contact />
                        </section>
                    </Suspense>
                </main>
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>

            </div>
        </FxProvider >
    );
}

export default App;