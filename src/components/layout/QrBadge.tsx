// Gooey-stylized QR badge — inlined so it inherits `currentColor` (for the
// card tint) and can be run through the card-text-emboss filter like the text.
// The internal "gooey" SVG filter (blur + alpha-sharpen + atop) melts adjacent
// modules together; it preserves SourceGraphic color, so currentColor flows through.

// Connected modules: each group = a circle + 0–2 connector rects (melted by gooey).
const GROUPS: { c: [number, number]; r: [number, number, number, number][] }[] = [
    { c: [120, 40], r: [[114.456, 40, 11.088, 80]] },
    { c: [280, 40], r: [[280, 34.456, 80, 11.088]] },
    { c: [360, 40], r: [[360, 34.456, 80, 11.088]] },
    { c: [440, 40], r: [] },
    { c: [600, 40], r: [[594.456, 40, 11.088, 80]] },
    { c: [40, 120], r: [[40, 114.456, 80, 11.088]] },
    { c: [120, 120], r: [[114.456, 120, 11.088, 80]] },
    { c: [600, 120], r: [[594.456, 120, 11.088, 80]] },
    { c: [120, 200], r: [[120, 194.456, 80, 11.088]] },
    { c: [200, 200], r: [[194.456, 200, 11.088, 80]] },
    { c: [360, 200], r: [[354.456, 200, 11.088, 80]] },
    { c: [600, 200], r: [[594.456, 200, 11.088, 80]] },
    { c: [200, 280], r: [[200, 274.456, 80, 11.088]] },
    { c: [280, 280], r: [[280, 274.456, 80, 11.088]] },
    { c: [360, 280], r: [] },
    { c: [600, 280], r: [] },
    { c: [40, 360], r: [[40, 354.456, 80, 11.088]] },
    { c: [120, 360], r: [] },
    { c: [440, 360], r: [[434.456, 360, 11.088, 80]] },
    { c: [280, 440], r: [[274.456, 440, 11.088, 80]] },
    { c: [440, 440], r: [[434.456, 440, 11.088, 80]] },
    { c: [40, 520], r: [[40, 514.456, 80, 11.088]] },
    { c: [120, 520], r: [[120, 514.456, 80, 11.088], [114.456, 520, 11.088, 80]] },
    { c: [200, 520], r: [[200, 514.456, 80, 11.088]] },
    { c: [280, 520], r: [[274.456, 520, 11.088, 80]] },
    { c: [440, 520], r: [[440, 514.456, 80, 11.088], [434.456, 520, 11.088, 80]] },
    { c: [520, 520], r: [[520, 514.456, 80, 11.088]] },
    { c: [600, 520], r: [] },
    { c: [120, 600], r: [] },
    { c: [280, 600], r: [] },
    { c: [440, 600], r: [] },
];

// Standalone modules (no connectors, rendered outside the gooey group).
const SOLO: [number, number][] = [
    [40, 40], [200, 40], [520, 40],
    [200, 120], [280, 120], [360, 120], [440, 120], [520, 120],
    [40, 200], [280, 200], [440, 200], [520, 200],
    [40, 280], [120, 280], [440, 280], [520, 280],
    [200, 360], [280, 360], [360, 360], [520, 360], [600, 360],
    [40, 440], [120, 440], [200, 440], [360, 440], [520, 440], [600, 440],
    [360, 520],
    [40, 600], [200, 600], [360, 600], [520, 600], [600, 600],
];

const R = 26.4;
const RECT_RX = 5.544;

export function QrBadge({ size = '100%' }: { size?: number | string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 640 640"
            fill="currentColor"
            aria-hidden="true"
        >
            <defs>
                <filter id="qr-gooey" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -16"
                        result="goo"
                    />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </defs>

            {/* Connected modules — melted together by the gooey filter */}
            <g filter="url(#qr-gooey)">
                {GROUPS.map(({ c, r }, i) => (
                    <g key={`g${i}`}>
                        {r.map((rect, j) => (
                            <rect
                                key={`r${j}`}
                                x={rect[0]}
                                y={rect[1]}
                                width={rect[2]}
                                height={rect[3]}
                                rx={RECT_RX}
                            />
                        ))}
                        <circle cx={c[0]} cy={c[1]} r={R} />
                    </g>
                ))}
            </g>

            {/* Standalone modules */}
            {SOLO.map(([cx, cy], i) => (
                <circle key={`s${i}`} cx={cx} cy={cy} r={R} />
            ))}
        </svg>
    );
}
