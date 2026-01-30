import { useLayoutEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface LegalPageLayoutProps {
    title: string;
    lastUpdate?: string;
    children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdate, children }: LegalPageLayoutProps) {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black">
            {/* Header with Logo */}
            <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-3 group transition-opacity hover:opacity-80"
                        aria-label="Retour à l'accueil"
                    >
                        <img
                            src={logo}
                            alt="Leonard Intelligence Logo"
                            className="h-8 w-auto object-contain"
                        />
                    </Link>
                    <Link
                        to="/"
                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Retour au site
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Title Section */}
                    <div className="mb-12 pb-8 border-b border-white/10">
                        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                            {title}
                        </h1>
                        {lastUpdate && (
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                Dernière mise à jour : {lastUpdate}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-10 text-gray-300 leading-relaxed">
                        {children}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8">
                <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Leonard Intelligence. Tous droits réservés.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <Link to="/cgv" className="hover:text-white transition-colors">
                            CGV
                        </Link>
                        <Link to="/mentions-legales" className="hover:text-white transition-colors">
                            Mentions légales
                        </Link>
                        <a
                            href="mailto:hello@leonardintelligence.com"
                            className="text-[#E67E22] hover:text-[#F39C12] transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LegalPageLayout;
