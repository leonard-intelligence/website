import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SAMPLE_W, SAMPLE_H, SOURCE_URL } from '../pixels/BeadPxContext';
import { ReliefButton } from '../ui/ReliefButton';

type Sz = {
    beadPx: number;
    beadW: number;     // bead area width in px (integer × beadPx)
    beadH: number;     // bead area height in px (integer × beadPx)
    leftPx: number;    // bead area top-left in viewport px
    topPx: number;
};

export function Hero() {
    const [sz, setSz] = useState<Sz>({ beadPx: 0, beadW: 0, beadH: 0, leftPx: 0, topPx: 0 });

    useEffect(() => {
        const update = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // 1-bead minimum border on top + L + R; bottom absorbs the modulo.
            // Smallest integer beadPx that fits at least one full bead margin around.
            const beadPx = Math.max(1, Math.ceil(Math.max(vw / (SAMPLE_W + 2), vh / (SAMPLE_H + 1))));
            // Integer-cell bead area
            const visibleCols = Math.max(1, Math.floor((vw - 2 * beadPx) / beadPx));
            const visibleRows = Math.max(1, Math.floor((vh - beadPx) / beadPx));
            const beadW = visibleCols * beadPx;
            const beadH = visibleRows * beadPx;
            // Anchor: top fixed at 1 bead, left centered horizontally (absorbs slack on L/R)
            const leftPx = Math.floor((vw - beadW) / 2);
            const topPx = beadPx;
            setSz({ beadPx, beadW, beadH, leftPx, topPx });
        };
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
                        href="#contact"
                        className="text-white hover:opacity-70 transition-opacity inline-flex items-center px-5"
                        style={{ height: `${3 * sz.beadPx}px`, fontSize: '15px', fontWeight: 410 }}
                    >
                        Contact
                    </a>
                </nav>

                {/* Hero painted layer removed — pixels moved into the intro section
                    where they render at row 1, touching the hero image bottom (0px gap). */}
            </div>

            {/* Content overlay — text left, anchored to the bottom of the hero */}
            <div
                className="relative z-10 h-full flex flex-col justify-end"
                style={{ paddingInline: `${3 * sz.beadPx}px`, paddingTop: `${5 * sz.beadPx}px`, paddingBottom: `${3 * sz.beadPx}px` }}
            >
                <h1
                    className="font-sans"
                    style={{
                        fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                        lineHeight: 1.05,
                        fontWeight: 500,
                        letterSpacing: '-0.025em',
                        maxWidth: '16ch',
                        color: '#ffffff',
                        filter: 'drop-shadow(0 2px 14px rgba(0, 0, 0, 0.35))',
                    }}
                >
                    Bienvenue dans l'ère des agents.
                </h1>

                <p
                    className="font-sans text-white/90 mt-6 max-w-[52ch]"
                    style={{
                        fontSize: '17px',
                        lineHeight: '24px',
                        fontWeight: 460,
                        textShadow: '0 1px 8px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    Leonard conçoit, déploie et pilote les agents sur-mesure de votre entreprise — branchés à vos systèmes, sur vos modèles et vos données.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                    <ReliefButton tone="lime" size="md" href="#contact" iconRight={<ArrowRight />}>
                        Discutons de votre projet
                    </ReliefButton>

                    <ReliefButton tone="frost" size="md" href="#section-capabilities">
                        Voir une fiche agent
                    </ReliefButton>
                </div>
            </div>
        </section>
    );
}
