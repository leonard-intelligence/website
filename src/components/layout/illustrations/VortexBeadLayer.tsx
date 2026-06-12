// Calque de beads généré par algorithme (réglable : DevTools › Vortex).
// Rendu partagé entre toutes les sections à effet vortex (Expertises, Modèles…) :
// chaque bead est un div absolu qui échantillonne l'œuvre source (ou une couleur).
// À poser dans un conteneur `position: relative` — les beads sont centrées.
import { buildVortex, type VortexParams } from '../../dev/vortexParamsStore';
import { SAMPLE_W, SAMPLE_H, SOURCE_URL } from '../../pixels/BeadPxContext';

// Palette de beads colorées (fleurs orange) recyclées le long du vortex (mode image).
const VORTEX_SRC: [number, number][] = [
    [96, 66], [91, 67], [74, 72], [68, 43], [100, 60], [79, 75],
    [66, 49], [80, 70], [6, 39], [86, 70], [53, 61], [47, 62],
];

export function VortexBeadLayer({ params }: { params: VortexParams }) {
    const beads = buildVortex(params);
    const bs = params.beadSize;
    const maxR = Math.max(1, ...beads.map((b) => b.r));
    return (
        <>
            {beads.map((b) => {
                let bg: React.CSSProperties;
                if (params.colorMode === 'solid') {
                    bg = { backgroundColor: params.color };
                } else {
                    let sc: number;
                    let sr: number;
                    if (params.colorMode === 'radial') {
                        // près du centre = bas de l'image (fleurs) ; loin = haut (ciel) — inversable
                        const rNorm = Math.min(1, b.r / maxR);
                        const tNorm = params.radialInvert ? rNorm : 1 - rNorm;
                        sr = Math.round(tNorm * (SAMPLE_H - 1));
                        const a = ((b.ang % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                        sc = Math.min(SAMPLE_W - 1, Math.floor((a / (2 * Math.PI)) * SAMPLE_W));
                    } else {
                        [sc, sr] = VORTEX_SRC[b.idx % VORTEX_SRC.length];
                    }
                    bg = {
                        backgroundImage: `url(${SOURCE_URL})`,
                        backgroundSize: `${SAMPLE_W * bs}px ${SAMPLE_H * bs}px`,
                        backgroundPosition: `-${sc * bs}px -${sr * bs}px`,
                        backgroundRepeat: 'no-repeat',
                    };
                }
                return (
                    <div
                        key={b.idx}
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            left: `calc(50% + ${b.x - bs / 2}px)`,
                            top: `calc(50% + ${b.y - bs / 2}px)`,
                            width: bs,
                            height: bs,
                            ...bg,
                            borderRadius: 2,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.16)',
                            imageRendering: 'pixelated',
                        }}
                    />
                );
            })}
        </>
    );
}
