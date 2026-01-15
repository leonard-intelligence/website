import { Suspense, lazy } from 'react';
import { useReveal } from './hooks/useReveal';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { TrustBar } from './components/layout/TrustBar';
import { FxDebugPanel, FxProvider } from './components/fx';
import { SectionLoader } from './components/ui/SectionLoader';

// Lazy load below-the-fold sections
const UseCaseGrid = lazy(() => import('./components/layout/UseCaseGrid').then(m => ({ default: m.UseCaseGrid })));
const SectionVision = lazy(() => import('./components/layout/SectionVision').then(m => ({ default: m.SectionVision })));
const SectionText = lazy(() => import('./components/layout/SectionText').then(m => ({ default: m.SectionText })));
const SectionImage = lazy(() => import('./components/layout/SectionImage').then(m => ({ default: m.SectionImage })));
const SectionAudio = lazy(() => import('./components/layout/SectionAudio').then(m => ({ default: m.SectionAudio })));
const Methodology = lazy(() => import('./components/layout/Methodology').then(m => ({ default: m.Methodology })));
const Deployment = lazy(() => import('./components/layout/Deployment').then(m => ({ default: m.Deployment })));
const CTASection = lazy(() => import('./components/layout/CTASection').then(m => ({ default: m.CTASection })));
const Contact = lazy(() => import('./components/layout/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./components/layout/Footer').then(m => ({ default: m.Footer })));

export function App() {
    // Initialize reveal animations
    useReveal();

    return (
        <FxProvider>
            <div className="min-h-screen bg-background text-foreground font-sans">
                {/* Light Gradient Overlay */}
                <div className="gradient-overlay"></div>

                <Navbar />
                <Hero />
                <TrustBar />

                <Suspense fallback={<SectionLoader />}>
                    {/* 1. Catalog / Use Cases */}
                    <UseCaseGrid />

                    {/* 2. Deep Dive Sections */}
                    <div id="section-expertises" className="flex flex-col gap-32 py-24 expertises">
                        <SectionVision />
                        <SectionText />
                        <SectionImage />
                        <SectionAudio />
                    </div>

                    {/* 3. Deployment & Methodology */}
                    <Deployment />
                    <Methodology />

                    <CTASection />
                    <Contact />
                    <Footer />
                </Suspense>

                {/* Debug Panel - visible with ?fxdebug=1 */}
                <FxDebugPanel />
            </div>
        </FxProvider>
    );
}

export default App;