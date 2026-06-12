import type { ReactNode } from 'react';

/**
 * Container for Pixels. Fills its (positioned) parent, overflow visible so
 * Pixels can spill into adjacent sections. The parent must be `position: relative`
 * (or absolute/fixed) so this layer anchors correctly.
 */
export function PixelLayer({
    children,
    z = 'under',
    debugId,
}: {
    children: ReactNode;
    z?: 'under' | 'over';
    /** Optional id used by Paint mode to target this layer. */
    debugId?: string;
}) {
    return (
        <div
            data-pixel-layer={debugId ?? true}
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'visible',
                pointerEvents: 'none',
                zIndex: z === 'over' ? 50 : 0,
            }}
        >
            {children}
        </div>
    );
}
