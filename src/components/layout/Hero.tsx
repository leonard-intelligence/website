import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SAMPLE_W, SAMPLE_H, SOURCE_URL } from '../pixels/BeadPxContext';
import { ReliefButton } from '../ui/ReliefButton';
import { useHeroTitleParams } from '../dev/heroTitleStore';

// Lien de prise de rendez-vous (boutons de contact)
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/leonard-intelligence/30min';

type Sz = {
    beadPx: number;
    beadW: number;     // bead area width in px (integer × beadPx)
    beadH: number;     // bead area height in px (integer × beadPx)
    leftPx: number;    // bead area top-left in viewport px
    topPx: number;
};

// Taille des beads à partir du viewport. Calculée dès le premier rendu (init lazy
// du useState) pour que la navbar ne saute pas de 0×0 à sa taille réelle → CLS.
function computeSz(): Sz {
    if (typeof window === 'undefined') return { beadPx: 0, beadW: 0, beadH: 0, leftPx: 0, topPx: 0 };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const beadPx = Math.max(1, Math.ceil(Math.max(vw / (SAMPLE_W + 2), vh / (SAMPLE_H + 1))));
    const visibleCols = Math.max(1, Math.floor((vw - 2 * beadPx) / beadPx));
    const visibleRows = Math.max(1, Math.floor((vh - beadPx) / beadPx));
    const beadW = visibleCols * beadPx;
    const beadH = visibleRows * beadPx;
    const leftPx = Math.floor((vw - beadW) / 2);
    const topPx = beadPx;
    return { beadPx, beadW, beadH, leftPx, topPx };
}

export function Hero() {
    const [sz, setSz] = useState<Sz>(computeSz);
    const heroTitle = useHeroTitleParams();
    // Preload every Geist Pixel variant so the DevTools switch is instant
    // (otherwise a variant is only fetched on first use → swap/blank flash).
    useEffect(() => {
        if (typeof document === 'undefined' || !document.fonts?.load) return;
        ['Line', 'Square', 'Grid', 'Circle', 'Triangle'].forEach((v) => {
            document.fonts.load(`32px "Geist Pixel ${v}"`).catch(() => {});
        });
    }, []);

    const [revealed, setRevealed] = useState(false);
    useEffect(() => {
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (reduce) { setRevealed(true); return; }
        const t = requestAnimationFrame(() => setRevealed(true));
        return () => cancelAnimationFrame(t);
    }, []);

    useEffect(() => {
        const update = () => setSz(computeSz());
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const sourceW = SAMPLE_W * sz.beadPx; // ≥ beadW
    const sourceH = SAMPLE_H * sz.beadPx; // ≥ beadH

    return (
        <section
            id="section-hero"
            className="relative bg-[#F7F7F5] overflow-hidden"
            style={{ width: '100dvw', height: '100dvh' }}
            aria-label="Introduction"
        >
            {/* Bead image — integer-cell area, anchored at (leftPx, topPx). */}
            <div
                className="absolute"
                style={{
                    top: sz.topPx,
                    left: sz.leftPx,
                    width: sz.beadW || 0,
                    height: sz.beadH || 0,
                    backgroundImage: `url(${SOURCE_URL})`,
                    backgroundSize: `${sourceW}px ${sourceH}px`,
                    // Anchor source to the BOTTOM of the bead area so the flower foreground
                    // is what's visible (vertical crop happens at the top, in the sky/clouds).
                    backgroundPosition: '0 100%',
                    backgroundRepeat: 'no-repeat',
                    // Clip painted overflow so it doesn't escape the bead area on the sides.
                    // The drip down into the next section is rendered by the intro PixelLayer,
                    // so we don't need vertical overflow here.
                    overflow: 'hidden',
                }}
                aria-hidden="true"
            >
                {/* Reveal "grain par grain" — un voile papier qui s'efface par bandes au montage */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#F7F7F5',
                        opacity: revealed ? 0 : 1,
                        transition: 'opacity 800ms cubic-bezier(0.25,0,0.15,1)',
                        maskImage: revealed
                            ? 'none'
                            : `repeating-linear-gradient(90deg, #000 0, #000 ${sz.beadPx}px, transparent ${sz.beadPx}px, transparent ${2 * sz.beadPx}px)`,
                        WebkitMaskImage: revealed
                            ? 'none'
                            : `repeating-linear-gradient(90deg, #000 0, #000 ${sz.beadPx}px, transparent ${sz.beadPx}px, transparent ${2 * sz.beadPx}px)`,
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                />

                {/* Navbar — inside the bead image, inset by 1 bead on top + L + R */}
                <nav
                    className="absolute z-20 flex justify-between items-start"
                    style={{
                        top: sz.beadPx,
                        left: sz.beadPx,
                        right: sz.beadPx,
                    }}
                >
                    <a
                        href="/"
                        className="bg-[#F7F7F5] inline-flex items-center justify-center"
                        style={{ width: `${15 * sz.beadPx}px`, height: `${3 * sz.beadPx}px` }}
                        aria-label="Retour à l'accueil"
                    >
                        <img
                            src="/assets/logos/leonard-logo-black.png"
                            alt="Leonard Intelligence"
                            width={512}
                            height={79}
                            style={{ height: `${2 * sz.beadPx}px` }}
                            className="w-auto object-contain"
                        />
                    </a>
                    <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-90 transition-opacity inline-flex items-center px-5"
                        style={{
                            height: `${3 * sz.beadPx}px`,
                            fontSize: '15px',
                            fontWeight: 410,
                            borderRadius: 13,
                            background: 'linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0.10))',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(15px) saturate(118%)',
                            WebkitBackdropFilter: 'blur(15px) saturate(118%)',
                            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.15)',
                        }}
                    >
                        Contact
                    </a>
                </nav>

                {/* Hero painted layer removed — pixels moved into the intro section
                    where they render at row 1, touching the hero image bottom (0px gap). */}
            </div>

            {/* Content overlay — headline top-center, frosted card bottom-right */}
            <div
                className="relative z-10 h-full flex flex-col justify-between"
                style={{ paddingInline: `${3 * sz.beadPx}px`, paddingTop: `${5 * sz.beadPx}px`, paddingBottom: `${3 * sz.beadPx}px` }}
            >
                {/* Top-center headline */}
                <h1
                    className="font-sans text-center mx-auto"
                    style={{
                        fontFamily: `var(--font-pixel-${heroTitle.variant})`,
                        fontSize: 'clamp(2rem, 5.6vw, 4.5rem)',
                        lineHeight: 1.15,
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        maxWidth: '20ch',
                        marginTop: '12vh',
                        color: '#ffffff',
                        filter: `drop-shadow(0 2px 14px rgba(0, 0, 0, 0.35))${heroTitle.glow > 0 ? ` drop-shadow(0 0 ${heroTitle.glow}px ${heroTitle.glowColor})` : ''}`,
                    }}
                >
                    Cultivez l'intelligence de votre entreprise
                </h1>

                {/* Bottom-left frosted card */}
                <div className="flex justify-start">
                    <div
                        className="font-sans"
                        style={{
                            maxWidth: 560,
                            padding: '22px 24px',
                            borderRadius: 16,
                            background: 'rgba(255, 255, 255, 0.10)',
                            backdropFilter: 'blur(20px) saturate(1.2)',
                            WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: `var(--font-pixel-${heroTitle.variant})`,
                                fontSize: 'clamp(1.25rem, 2.4vw, 1.9rem)',
                                lineHeight: 1.2,
                                fontWeight: 400,
                                letterSpacing: '0.01em',
                                color: '#ffffff',
                                marginBottom: 14,
                                filter: 'drop-shadow(0 1px 8px rgba(0, 0, 0, 0.35))',
                            }}
                        >
                            Automatisez votre organisation
                        </h2>
                        <p
                            style={{
                                fontSize: '16px',
                                lineHeight: '23px',
                                fontWeight: 460,
                                color: 'rgba(255, 255, 255, 0.92)',
                                textShadow: '0 1px 8px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            Leonard Intelligence est une agence agentique qui met au service les meilleurs outils d'intelligence artificielle pour augmenter les performances de votre business.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <ReliefButton tone="lime" size="md" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" iconRight={<ArrowRight />}>
                                Discutons de votre projet
                            </ReliefButton>

                            <ReliefButton tone="light" size="md" href="#section-capabilities">
                                Voir une fiche agent
                            </ReliefButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
