import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="lg:hidden flex items-center h-full mr-4">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="relative z-[120] w-12 h-12 flex flex-col justify-center items-center group focus:outline-none"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
                <span className={`block w-7 h-[3px] bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-[5px]' : '-translate-y-1.5'}`} />
                <span className={`block w-7 h-[3px] bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block w-7 h-[3px] bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-[5px]' : 'translate-y-1.5'}`} />
            </button>

            {/* Full Screen Overlay */}
            {typeof document !== 'undefined' && createPortal(
                <div
                    className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-center items-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                        }`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeMenu();
                    }}
                >
                    <nav className="flex flex-col items-center gap-8">
                        <a
                            href="#section-expertises"
                            onClick={closeMenu}
                            className="text-2xl font-mono text-white hover:text-[#E67E22] transition-colors tracking-tight"
                        >
                            EXPERTISES
                        </a>
                        <a
                            href="#section-methodology"
                            onClick={closeMenu}
                            className="text-2xl font-mono text-white hover:text-[#E67E22] transition-colors tracking-tight"
                        >
                            MÉTHODOLOGIE
                        </a>
                        <a
                            href="#section-solutions"
                            onClick={closeMenu}
                            className="text-2xl font-mono text-white hover:text-[#E67E22] transition-colors tracking-tight"
                        >
                            SOLUTIONS
                        </a>
                        <div className="w-12 h-[1px] bg-white/20 my-4"></div>
                        <a
                            href="#section-contact"
                            onClick={closeMenu}
                            className="text-xl font-mono text-[#E67E22] border border-[#E67E22] px-6 py-3 hover:bg-[#E67E22] hover:text-black transition-all"
                        >
                            CONTACT
                        </a>
                    </nav>
                </div>,
                document.body
            )}
        </div>
    );
}
