import { useReveal } from './hooks/useReveal';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { TrustBar } from './components/layout/TrustBar';
import { UseCaseGrid } from './components/layout/UseCaseGrid';
import { SectionVision } from './components/layout/SectionVision';
import { SectionText } from './components/layout/SectionText';
import { SectionImage } from './components/layout/SectionImage';
import { Methodology } from './components/layout/Methodology';
import { Deployment } from './components/layout/Deployment';
import { CTASection } from './components/layout/CTASection';
import { Footer } from './components/layout/Footer';
import { FxDebugPanel, FxProvider } from './components/fx';

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

                {/* 1. Catalog / Use Cases */}
                <UseCaseGrid />

                {/* 2. Deep Dive Sections */}
                <SectionVision />
                <SectionText />
                <SectionImage />

                {/* 3. Deployment & Methodology */}
                <Deployment />
                <Methodology />

                <CTASection />
                <Footer />

                {/* Debug Panel - visible with ?fxdebug=1 */}
                <FxDebugPanel />
            </div>
        </FxProvider>
    );
}

export default App;