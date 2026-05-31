import { useEffect, useState } from 'react';

export function Navbar() {
    const [solid, setSolid] = useState(false);

    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            id="section-navbar"
            className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center transition-all duration-300"
            style={{
                paddingInline: 20,
                paddingBlock: solid ? 10 : 20,
                backgroundColor: solid ? '#F7F7F5' : 'transparent',
                boxShadow: solid ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
            }}
            aria-label="Navigation principale"
        >
            <a href="/" className="inline-flex items-center" aria-label="Retour à l'accueil">
                <img
                    src={solid ? '/assets/logos/leonard-logo-black.png' : '/assets/logos/leonard-logo-white.png'}
                    alt="Leonard Intelligence"
                    width={512}
                    height={79}
                    className="h-7 w-auto object-contain"
                />
            </a>
            <a
                href="#contact"
                className="font-sans text-sm hover:opacity-70 transition-opacity px-3 py-2"
                style={{ color: solid ? '#171717' : '#ffffff' }}
            >
                Contact
            </a>
        </nav>
    );
}
