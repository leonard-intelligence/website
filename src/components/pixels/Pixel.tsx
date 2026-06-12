import { SAMPLE_W, SAMPLE_H, SOURCE_URL, useBeadPx } from './BeadPxContext';

export type PixelData = {
    /** Source coord in the 102×77 grid */
    src: [number, number];
    /** Destination coord in the layer's local grid */
    at: [number, number];
};

/** One bead from the source image, placed at a grid coordinate within its layer. */
export function Pixel({ src, at }: PixelData) {
    const beadPx = useBeadPx();
    if (!beadPx) return null;

    const [srcCol, srcRow] = src;
    const [atCol, atRow] = at;

    return (
        <div
            data-pixel
            style={{
                position: 'absolute',
                top: atRow * beadPx,
                left: atCol * beadPx,
                width: beadPx,
                height: beadPx,
                backgroundImage: `url(${SOURCE_URL})`,
                backgroundSize: `${SAMPLE_W * beadPx}px ${SAMPLE_H * beadPx}px`,
                backgroundPosition: `-${srcCol * beadPx}px -${srcRow * beadPx}px`,
                backgroundRepeat: 'no-repeat',
                pointerEvents: 'none',
            }}
        />
    );
}
