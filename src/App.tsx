
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

// Lazy load Legal pages

// Component to conditionally render layout based on route
function AppLayout() {
    const location = useLocation();
    const isLegalPage = location.pathname === '/cgv' || location.pathname === '/mentions-legales';

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Light Gradient Overlay */}
            {/* Light Gradient Overlay - Removed as it was undefined and potentially blocking interactions */}
            {/* <div className="gradient-overlay"></div> */}

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
    const [splashComplete, setSplashComplete] = useState(() => {
        // Check if splash has already been shown in this session
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('splash_shown') === 'true';
        }
        return false;
    });

    const handleExitStart = useCallback(() => {
        // No-op now as content is always visible
    }, []);

    const handleSplashComplete = useCallback(() => {
        setSplashComplete(true);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('splash_shown', 'true');
        }
    }, []);

    return (
        <FxProvider>
            <Router>
                {/* Splash Screen - Shows on first load */}
                {!splashComplete && <SplashScreen onExitStart={handleExitStart} onComplete={handleSplashComplete} />}

                {/* Main App Content */}
                {/* Main App Content */}
                <AppLayout />
            </Router>
        </FxProvider>
    );
}
