
import { Suspense, lazy, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { FxProvider } from './components/fx';
import { SectionLoader } from './components/ui/SectionLoader';
import { SplashScreen } from './components/layout/SplashScreen';

// Eager load Home since it's the main entry
import Home from './pages/Home';

// Lazy load Legal pages
const CGV = lazy(() => import('./pages/Legal/CGV'));
const MentionsLegales = lazy(() => import('./pages/Legal/MentionsLegales'));
const Footer = lazy(() => import('./components/layout/Footer').then(m => ({ default: m.Footer })));

// Component to conditionally render layout based on route
function AppLayout({ showContent }: { showContent: boolean }) {
    const location = useLocation();
    const isLegalPage = location.pathname === '/cgv' || location.pathname === '/mentions-legales';

    return (
        <div className={`min-h-screen bg-background text-foreground font-sans transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {/* Light Gradient Overlay */}
            <div className="gradient-overlay"></div>

            {/* Show Navbar only on non-legal pages */}
            {!isLegalPage && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cgv" element={
                    <Suspense fallback={<SectionLoader />}>
                        <CGV />
                    </Suspense>
                } />
                <Route path="/mentions-legales" element={
                    <Suspense fallback={<SectionLoader />}>
                        <MentionsLegales />
                    </Suspense>
                } />
            </Routes>

            {/* Show Footer only on non-legal pages (legal pages have their own footer) */}
            {!isLegalPage && (
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>
            )}
        </div>
    );
}

export default function App() {
    const [splashComplete, setSplashComplete] = useState(false);
    const [showSite, setShowSite] = useState(false);

    const handleExitStart = useCallback(() => {
        setShowSite(true); // Reveal site when exit animation starts
    }, []);

    const handleSplashComplete = useCallback(() => {
        setSplashComplete(true);
    }, []);

    return (
        <FxProvider>
            <Router>
                {/* Splash Screen - Shows on first load */}
                {!splashComplete && <SplashScreen onExitStart={handleExitStart} onComplete={handleSplashComplete} />}

                {/* Main App Content */}
                <AppLayout showContent={showSite} />
            </Router>
        </FxProvider>
    );
}
