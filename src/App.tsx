import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FxProvider } from './components/fx/FxProvider';
import { SectionLoader } from './components/ui/SectionLoader';

import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load all pages to reduce initial bundle size
const Home = lazy(() => import('./pages/Home'));
const CGV = lazy(() => import('./pages/Legal/CGV'));
const MentionsLegales = lazy(() => import('./pages/Legal/MentionsLegales'));
const ButtonsLab = lazy(() => import('./pages/Lab/Buttons'));

// 404 page component
function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-6xl font-mono font-bold text-white mb-4">404</h1>
            <p className="text-gray-400 text-lg mb-8">Cette page n'existe pas.</p>
            <a
                href="/"
                className="bg-[#D35400] text-white px-6 py-3 font-semibold uppercase text-sm inline-block transition-all hover:bg-white hover:text-[#D35400]"
            >
                Retour a l'accueil
            </a>
        </div>
    );
}

// Component to conditionally render layout based on route
function AppLayout() {
    useLocation();

    return (
        <div className="min-h-screen bg-[#F7F7F5] text-foreground font-sans">
            {/* Skip to content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[300] focus:bg-[#D35400] focus:text-white focus:px-4 focus:py-2 focus:text-sm"
            >
                Aller au contenu principal
            </a>

            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Suspense fallback={<SectionLoader />}><Home /></Suspense>} />
                    <Route
                        path="/cgv"
                        element={
                            <Suspense fallback={<SectionLoader />}>
                                <CGV />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/mentions-legales"
                        element={
                            <Suspense fallback={<SectionLoader />}>
                                <MentionsLegales />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/lab/buttons"
                        element={
                            <Suspense fallback={<SectionLoader />}>
                                <ButtonsLab />
                            </Suspense>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ErrorBoundary>
        </div>
    );
}

export default function App() {
    return (
        <FxProvider>
            <Router>
                <AppLayout />
            </Router>
        </FxProvider>
    );
}
