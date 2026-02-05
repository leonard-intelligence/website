import { Suspense, lazy, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { Hero } from '../components/layout/Hero';

import { SectionLoader } from '../components/ui/SectionLoader';

// Lazy load below-the-fold sections
const UseCaseGrid = lazy(() => import('../components/layout/UseCaseGrid').then(m => ({ default: m.UseCaseGrid })));
const SectionVision = lazy(() => import('../components/layout/SectionVision').then(m => ({ default: m.SectionVision })));
const SectionText = lazy(() => import('../components/layout/SectionText').then(m => ({ default: m.SectionText })));
const SectionAudio = lazy(() => import('../components/layout/SectionAudio').then(m => ({ default: m.SectionAudio })));
const SectionVideo = lazy(() => import('../components/layout/SectionVideo').then(m => ({ default: m.SectionVideo })));
const Methodology = lazy(() => import('../components/layout/Methodology').then(m => ({ default: m.Methodology })));
const SectionROI = lazy(() => import('../components/layout/SectionROI').then(m => ({ default: m.SectionROI })));
const SectionSecurity = lazy(() => import('../components/layout/SectionSecurity').then(m => ({ default: m.SectionSecurity })));
const SectionPatrimoine = lazy(() => import('../components/layout/SectionPatrimoine').then(m => ({ default: m.SectionPatrimoine })));
const SectionCapabilitiesBento = lazy(() => import('../components/layout/SectionCapabilitiesBento').then(m => ({ default: m.SectionCapabilitiesBento })));
const InterimCTA = lazy(() => import('../components/layout/InterimCTA').then(m => ({ default: m.InterimCTA })));
const SectionStrategy = lazy(() => import('../components/layout/SectionStrategy').then(m => ({ default: m.SectionStrategy })));

const Contact = lazy(() => import('../components/layout/Contact').then(m => ({ default: m.Contact })));


export function Home() {
    // Initialize reveal animations
    useReveal();
    const location = useLocation();

    // Force scroll to top on mount/refresh to prevent browser scroll restoration
    // Handle hash scrolling
    useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        const handleScroll = () => {
            // Standard scroll to top if no hash
            if (!location.hash) {
                window.scrollTo(0, 0);
                return;
            }

            // If hash exists, try to scroll to it with polling
            const hash = location.hash;
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds max

            const attemptScroll = () => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(attemptScroll, 100);
                }
            };

            attemptScroll();
        };

        handleScroll();

        return () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
        };
    }, [location]); // Re-run when location changes (including hash)

    return (
        <main>
            <Hero />

            <Suspense fallback={<SectionLoader />}>
                {/* 1. Deep Dive Sections by Module */}
                <section id="section-expertises" className="flex flex-col gap-24 py-24 expertises" aria-label="Nos Expertises">
                    <SectionVision />
                    <SectionText />
                    <SectionAudio />
                    <SectionVideo />
                </section>

                <InterimCTA />

                {/* 2. Methodology ("Architecture Agnostique") */}
                <section id="section-methodology" aria-label="Notre Méthodologie">
                    <Methodology />
                </section>

                {/* 3. Catalog / Use Cases ("Impact Mesuré") */}
                <section id="section-solutions" aria-label="Cas d'usage et Solutions">
                    <UseCaseGrid />
                </section>

                {/* 4. Arguments Marketing (ROI, Sécurité, Patrimoine, Stratégie) */}
                <section id="section-strategic-impact" className="space-y-16 py-16 bg-pattern-grid" aria-label="Impact Stratégique">
                    <SectionROI />
                    <SectionSecurity />
                    <SectionPatrimoine />
                    <SectionCapabilitiesBento />
                    <SectionStrategy />
                </section>



                <section id="section-contact" aria-label="Contact">
                    <Contact />
                </section>
            </Suspense>
        </main>
    );
}

export default Home;
