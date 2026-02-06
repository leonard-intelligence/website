import { Suspense, lazy, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { Hero } from '../components/layout/Hero';
import { SEO } from '../components/seo/SEO';
import { JsonLd } from '../components/seo/JsonLd';

import { SectionLoader } from '../components/ui/SectionLoader';

// Lazy load below-the-fold sections
const UseCaseGrid = lazy(() => import('../components/layout/UseCaseGrid').then(m => ({ default: m.UseCaseGrid })));
const SectionAgents = lazy(() => import('../components/layout/SectionAgents').then(m => ({ default: m.SectionAgents })));
const SectionMemory = lazy(() => import('../components/layout/SectionMemory').then(m => ({ default: m.SectionMemory })));
const SectionVoice = lazy(() => import('../components/layout/SectionVoice').then(m => ({ default: m.SectionVoice })));
const SectionCreation = lazy(() => import('../components/layout/SectionCreation').then(m => ({ default: m.SectionCreation })));
const Methodology = lazy(() => import('../components/layout/Methodology').then(m => ({ default: m.Methodology })));
const SectionROI = lazy(() => import('../components/layout/SectionROI').then(m => ({ default: m.SectionROI })));
const SectionSecurity = lazy(() => import('../components/layout/SectionSecurity').then(m => ({ default: m.SectionSecurity })));

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
            <SEO />
            <JsonLd />
            <Hero />

            <Suspense fallback={<SectionLoader />}>
                {/* 1. Deep Dive Sections by Module */}
                <section id="section-expertises" className="flex flex-col gap-24 py-24 expertises" aria-label="Nos Expertises">
                    <SectionAgents />
                    <SectionMemory />
                    <SectionVoice />
                    <SectionCreation />
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

                    <SectionCapabilitiesBento />
                    <SectionStrategy />
                </section>



                <section aria-label="Contact">
                    <Contact />
                </section>
            </Suspense>
        </main>
    );
}

export default Home;
