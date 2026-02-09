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
            {/* Hamburger Button - Portaled when open to stay fixed to viewport */}
            {isOpen ? (
                typeof document !== 'undefined' && createPortal(
                    <button
                        onClick={toggleMenu}
                        className="fixed top-[6px] right-4 z-[210] w-12 h-12 flex flex-col justify-center items-center group focus:outline-none cursor-pointer"
                        aria-label="Fermer le menu"
                    >
                        <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out translate-y-[7px] rotate-45" />
                        <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out my-1.5 opacity-0" />
                        <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out -translate-y-[7px] -rotate-45" />
                    </button>,
                    document.body
                )
            ) : (
                <button
                    onClick={toggleMenu}
                    className="relative z-[120] w-12 h-12 flex flex-col justify-center items-center group focus:outline-none cursor-pointer"
                    aria-label="Ouvrir le menu"
                >
                    <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out translate-y-0" />
                    <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out my-1.5 opacity-100" />
                    <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ease-out translate-y-0" />
                </button>
            )}

            {/* Full Screen Overlay */}
            {typeof document !== 'undefined' && createPortal(
                <div
                    className={`fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl transition-opacity duration-500 flex flex-col justify-center items-center cursor-pointer ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                        }`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeMenu();
                    }}
                >
                    <nav className="flex flex-col items-center gap-8">
                        <a
                            href="#section-expertises"
                            onClick={closeMenu}
                            className="text-2xl text-white hover:text-[#e67d23] transition-colors tracking-tight"
                        >
                            EXPERTISES
                        </a>
                        <a
                            href="#section-methodology"
                            onClick={closeMenu}
                            className="text-2xl text-white hover:text-[#e67d23] transition-colors tracking-tight"
                        >
                            APPROCHE
                        </a>
                        <a
                            href="#section-solutions"
                            onClick={closeMenu}
                            className="text-2xl text-white hover:text-[#e67d23] transition-colors tracking-tight"
                        >
                            SOLUTIONS
                        </a>
                        <div className="w-12 h-[1px] bg-white/20 my-4"></div>
                        <a
                            href="#section-contact"
                            onClick={closeMenu}
                            className="text-xl text-[#e67d23] border border-[#e67d23] px-6 py-3 hover:bg-[#e67d23] hover:text-black transition-all"
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
