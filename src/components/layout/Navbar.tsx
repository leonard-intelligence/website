// import logo from '../../assets/images/common/logo.png'; // Removed
import { MobileNav } from './MobileNav';

export function Navbar() {
    return (
        <nav
            id="section-navbar"
            className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] flex justify-between items-center h-[60px] bg-black/50 backdrop-blur-md border-b border-white/10 z-[100] p-0 reveal delay-100"
            aria-label="Navigation principale"
        >
            {/* Branding Area */}
            <div className="flex items-center h-full">
                <div className="px-6 font-mono font-medium text-lg -tracking-[0.05em] flex items-center h-full border-r border-white/10">
                    <a href="/" className="flex items-center gap-1" aria-label="Retour à l'accueil">
                        <img
                            src="/assets/logos/leonard-logo-white.png"
                            alt="Leonard Intelligence Logo"
                            className="h-8 mr-2.5 w-auto object-contain"
                        />
                    </a>
                </div>
            </div>

            {/* Navigation Tabs (Desktop only) */}
            <div className="hidden lg:flex h-full">
                <a
                    href="#section-expertises"
                    className="group flex items-center gap-3 px-6 h-full text-muted-foreground no-underline font-mono text-[0.85rem] border-l border-r border-white/10 transition-all bg-white/[0.02] hover:bg-white/[0.08] hover:text-white "
                >
                    <span className="font-normal tracking-tight">EXPERTISES</span>
                    <span className="opacity-40 text-xs">01</span>
                </a>

                <a
                    href="#section-methodology"
                    className="group flex items-center gap-3 px-6 h-full text-muted-foreground no-underline font-mono text-[0.85rem] border-r border-white/10 transition-all bg-white/[0.02] hover:bg-white/[0.08] hover:text-white "
                >
                    <span className="font-normal tracking-tight">MÉTHODOLOGIE</span>
                    <span className="opacity-40 text-xs">02</span>
                </a>

                <a
                    href="#section-solutions"
                    className="group flex items-center gap-3 px-6 h-full text-muted-foreground no-underline font-mono text-[0.85rem] border-r border-white/10 transition-all bg-white/[0.02] hover:bg-white/[0.08] hover:text-white "
                >
                    <span className="font-normal tracking-tight">SOLUTIONS</span>
                    <span className="opacity-40 text-xs">03</span>
                </a>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />

            {/* Actions Area (Desktop only) */}
            <div className="hidden lg:flex items-center h-full">
                <a
                    href="#section-contact"
                    id="navbar-cta"
                    className="cta-contact-btn text-white h-full flex items-center px-6 font-medium no-underline text-[0.9rem] uppercase transition-all duration-300"
                >
                    CONTACT <span className="cta-arrow ml-2">→</span>
                </a>
            </div>
        </nav>
    );
}
