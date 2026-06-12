import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SAMPLE_W, SAMPLE_H, SOURCE_URL, useBeadPx } from '../pixels/BeadPxContext';

type Tool = 'paint' | 'eraser';
type SrcMode = 'locked' | 'region';

/** A painted bead. Coords stored in PAGE-absolute pixels for live rendering;
 *  exported to section-relative grid coords at export time. */
type PaintedPixel = {
    id: string;
    src: [number, number];        // 102×77 grid coord
    pageX: number;                // top-left in document px (snapped to beadPx grid)
    pageY: number;
};
type Stroke = PaintedPixel[];

const SECTION_SELECTOR = '[id^="section-"]';

export function PaintMode({ active, onActiveChange }: { active: boolean; onActiveChange: (a: boolean) => void }) {
    const beadPx = useBeadPx();
    const [tool, setTool] = useState<Tool>('paint');
    const [srcMode, setSrcMode] = useState<SrcMode>('locked');
    const [lockedSrc, setLockedSrc] = useState<[number, number]>([50, 30]);
    // region = [colMin, rowMin, colMax, rowMax] inclusive
    const [region, setRegion] = useState<[number, number, number, number]>([20, 50, 80, 70]);
    const [regionDrawing, setRegionDrawing] = useState<{ startCol: number; startRow: number } | null>(null);

    const [strokes, setStrokes] = useState<Stroke[]>([]);
    const [activeStroke, setActiveStroke] = useState<PaintedPixel[]>([]);
    const isDraggingRef = useRef(false);
    const lastCellKeyRef = useRef<string>('');
    const allPixels = useMemo(() => strokes.flat().concat(activeStroke), [strokes, activeStroke]);

    const pickSrc = useCallback((): [number, number] => {
        if (srcMode === 'locked') return lockedSrc;
        const [c0, r0, c1, r1] = region;
        const col = c0 + Math.floor(Math.random() * (c1 - c0 + 1));
        const row = r0 + Math.floor(Math.random() * (r1 - r0 + 1));
        return [col, row];
    }, [srcMode, lockedSrc, region]);

    /** From an event clientX/Y, compute the document-absolute (x, y) snapped to beadPx grid. */
    const snapToGrid = useCallback(
        (clientX: number, clientY: number) => {
            const pageX = clientX + window.scrollX;
            const pageY = clientY + window.scrollY;
            const snappedX = Math.round(pageX / beadPx) * beadPx;
            const snappedY = Math.round(pageY / beadPx) * beadPx;
            return { snappedX, snappedY };
        },
        [beadPx]
    );

    const addPixelAt = useCallback(
        (clientX: number, clientY: number) => {
            if (!beadPx) return;
            const { snappedX, snappedY } = snapToGrid(clientX, clientY);
            const cellKey = `${snappedX}:${snappedY}`;
            if (cellKey === lastCellKeyRef.current) return; // dedupe within stroke
            lastCellKeyRef.current = cellKey;
            const src = pickSrc();
            setActiveStroke((prev) => [
                ...prev,
                { id: `${Date.now()}-${prev.length}-${Math.random().toString(36).slice(2, 7)}`, src, pageX: snappedX, pageY: snappedY },
            ]);
        },
        [beadPx, pickSrc, snapToGrid]
    );

    const erasePixelAt = useCallback(
        (clientX: number, clientY: number) => {
            const { snappedX, snappedY } = snapToGrid(clientX, clientY);
            const key = `${snappedX}:${snappedY}`;
            setStrokes((prev) =>
                prev
                    .map((s) => s.filter((p) => `${p.pageX}:${p.pageY}` !== key))
                    .filter((s) => s.length > 0)
            );
        },
        [snapToGrid]
    );

    // Mouse handlers on document while active
    useEffect(() => {
        if (!active) return;

        const onDown = (e: MouseEvent) => {
            if (e.button !== 0) return;
            // Ignore if clicked inside dev panel
            if ((e.target as HTMLElement).closest('[data-devtools]')) return;
            e.preventDefault();
            isDraggingRef.current = true;
            lastCellKeyRef.current = '';
            if (tool === 'paint') {
                addPixelAt(e.clientX, e.clientY);
            } else {
                erasePixelAt(e.clientX, e.clientY);
            }
        };
        const onMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            if (tool === 'paint') {
                addPixelAt(e.clientX, e.clientY);
            } else {
                erasePixelAt(e.clientX, e.clientY);
            }
        };
        const onUp = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            lastCellKeyRef.current = '';
            setActiveStroke((cur) => {
                if (cur.length > 0) setStrokes((s) => [...s, cur]);
                return [];
            });
        };

        document.addEventListener('mousedown', onDown, { capture: true });
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        return () => {
            document.removeEventListener('mousedown', onDown, { capture: true } as EventListenerOptions);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
    }, [active, tool, addPixelAt, erasePixelAt]);

    // Keyboard shortcuts (active only when paint mode is on)
    useEffect(() => {
        if (!active) return;
        const onKey = (e: KeyboardEvent) => {
            // Cmd/Ctrl+Z = undo last stroke
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
                e.preventDefault();
                setStrokes((prev) => prev.slice(0, -1));
            }
            // Cmd/Ctrl+E = export
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
                e.preventDefault();
                exportToClipboard(strokes, beadPx);
            }
            // E = toggle eraser
            if (!e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 'e' && (e.target as HTMLElement).tagName !== 'INPUT') {
                setTool((t) => (t === 'paint' ? 'eraser' : 'paint'));
            }
            // Escape = exit paint mode
            if (e.key === 'Escape') onActiveChange(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active, strokes, beadPx, onActiveChange]);

    // Body cursor while painting
    useEffect(() => {
        if (!active) {
            document.body.style.cursor = '';
            return;
        }
        document.body.style.cursor = tool === 'paint' ? 'crosshair' : 'not-allowed';
        return () => {
            document.body.style.cursor = '';
        };
    }, [active, tool]);

    return (
        <>
            {/* Scratchpad overlay — painted pixels rendered at document-absolute positions */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9000,
                }}
                aria-hidden="true"
            >
                {allPixels.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            top: p.pageY,
                            left: p.pageX,
                            width: beadPx,
                            height: beadPx,
                            backgroundImage: `url(${SOURCE_URL})`,
                            backgroundSize: `${SAMPLE_W * beadPx}px ${SAMPLE_H * beadPx}px`,
                            backgroundPosition: `-${p.src[0] * beadPx}px -${p.src[1] * beadPx}px`,
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                ))}
            </div>

            {/* Paint panel UI — only visible when paint mode is active */}
            {active && (
                <div
                    data-devtools
                    style={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        zIndex: 9999,
                        background: '#0e0e10',
                        padding: 14,
                        borderRadius: 10,
                        border: '1px solid #2a2a30',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                        width: 320,
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                        fontSize: 12,
                    }}
                >
                    <PaintPanel
                        active={active}
                        onToggle={() => onActiveChange(!active)}
                        tool={tool}
                        onToolChange={setTool}
                        srcMode={srcMode}
                        onSrcModeChange={setSrcMode}
                        lockedSrc={lockedSrc}
                        onLockedSrcChange={setLockedSrc}
                        region={region}
                        onRegionChange={setRegion}
                        regionDrawing={regionDrawing}
                        onRegionDrawingChange={setRegionDrawing}
                        strokes={strokes}
                        onWipe={() => setStrokes([])}
                        onUndo={() => setStrokes((p) => p.slice(0, -1))}
                        onExport={() => exportToClipboard(strokes, beadPx)}
                        beadPx={beadPx}
                    />
                </div>
            )}
        </>
    );
}

// ============================================================================
// Source picker + Paint panel UI
// ============================================================================
function PaintPanel({
    active,
    onToggle,
    tool,
    onToolChange,
    srcMode,
    onSrcModeChange,
    lockedSrc,
    onLockedSrcChange,
    region,
    onRegionChange,
    regionDrawing,
    onRegionDrawingChange,
    strokes,
    onWipe,
    onUndo,
    onExport,
    beadPx,
}: {
    active: boolean;
    onToggle: () => void;
    tool: Tool;
    onToolChange: (t: Tool) => void;
    srcMode: SrcMode;
    onSrcModeChange: (m: SrcMode) => void;
    lockedSrc: [number, number];
    onLockedSrcChange: (s: [number, number]) => void;
    region: [number, number, number, number];
    onRegionChange: (r: [number, number, number, number]) => void;
    regionDrawing: { startCol: number; startRow: number } | null;
    onRegionDrawingChange: (d: { startCol: number; startRow: number } | null) => void;
    strokes: Stroke[];
    onWipe: () => void;
    onUndo: () => void;
    onExport: () => void;
    beadPx: number;
}) {
    const PREVIEW_WIDTH = 260;
    const previewCellPx = PREVIEW_WIDTH / SAMPLE_W; // ~2.55
    const previewHeight = previewCellPx * SAMPLE_H;
    const totalPixels = strokes.reduce((acc, s) => acc + s.length, 0);

    const previewToCell = (clientX: number, clientY: number, el: HTMLDivElement) => {
        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        return {
            col: Math.max(0, Math.min(SAMPLE_W - 1, Math.floor(x / previewCellPx))),
            row: Math.max(0, Math.min(SAMPLE_H - 1, Math.floor(y / previewCellPx))),
        };
    };

    return (
        <div style={{ color: '#e7e7ee' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <button
                    onClick={onToggle}
                    style={{
                        background: active ? '#A3E635' : '#1a1a20',
                        color: active ? '#0a0a14' : '#e7e7ee',
                        border: '1px solid #2a2a30',
                        padding: '6px 12px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 12,
                    }}
                >
                    {active ? '● PAINTING' : 'Start paint mode'}
                </button>
                <span style={{ fontSize: 11, color: '#7a7a86' }}>⌘P toggle · Esc exit</span>
            </div>

            {/* Tool */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {(['paint', 'eraser'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => onToolChange(t)}
                        style={{
                            ...btn,
                            flex: 1,
                            background: tool === t ? '#3a3aff' : '#1a1a20',
                            color: '#fff',
                        }}
                    >
                        {t === 'paint' ? 'Paint' : 'Eraser (E)'}
                    </button>
                ))}
            </div>

            {/* Source mode */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {(['locked', 'region'] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => onSrcModeChange(m)}
                        style={{
                            ...btn,
                            flex: 1,
                            background: srcMode === m ? '#3a3aff' : '#1a1a20',
                            color: '#fff',
                        }}
                    >
                        {m === 'locked' ? 'Locked' : 'Region'}
                    </button>
                ))}
            </div>

            {/* Source preview */}
            <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#9a9aa6', marginBottom: 4 }}>
                    Source {srcMode === 'locked' ? `[${lockedSrc[0]}, ${lockedSrc[1]}]` : `[${region[0]}-${region[2]}, ${region[1]}-${region[3]}]`}
                </div>
                <div
                    style={{
                        position: 'relative',
                        width: PREVIEW_WIDTH,
                        height: previewHeight,
                        backgroundImage: `url(${SOURCE_URL})`,
                        backgroundSize: '100% 100%',
                        cursor: 'crosshair',
                    }}
                    onMouseDown={(e) => {
                        const { col, row } = previewToCell(e.clientX, e.clientY, e.currentTarget);
                        if (srcMode === 'locked') {
                            onLockedSrcChange([col, row]);
                        } else {
                            onRegionDrawingChange({ startCol: col, startRow: row });
                            onRegionChange([col, row, col, row]);
                        }
                    }}
                    onMouseMove={(e) => {
                        if (srcMode === 'region' && regionDrawing) {
                            const { col, row } = previewToCell(e.clientX, e.clientY, e.currentTarget);
                            const c0 = Math.min(regionDrawing.startCol, col);
                            const r0 = Math.min(regionDrawing.startRow, row);
                            const c1 = Math.max(regionDrawing.startCol, col);
                            const r1 = Math.max(regionDrawing.startRow, row);
                            onRegionChange([c0, r0, c1, r1]);
                        }
                    }}
                    onMouseUp={() => onRegionDrawingChange(null)}
                    onMouseLeave={() => onRegionDrawingChange(null)}
                >
                    {/* Overlay marker */}
                    {srcMode === 'locked' ? (
                        <div
                            style={{
                                position: 'absolute',
                                left: lockedSrc[0] * previewCellPx,
                                top: lockedSrc[1] * previewCellPx,
                                width: previewCellPx,
                                height: previewCellPx,
                                outline: '2px solid #A3E635',
                                pointerEvents: 'none',
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                position: 'absolute',
                                left: region[0] * previewCellPx,
                                top: region[1] * previewCellPx,
                                width: (region[2] - region[0] + 1) * previewCellPx,
                                height: (region[3] - region[1] + 1) * previewCellPx,
                                outline: '2px solid #A3E635',
                                background: 'rgba(163, 230, 53, 0.18)',
                                pointerEvents: 'none',
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                <button onClick={onUndo} style={{ ...btn, flex: 1 }}>
                    Undo (⌘Z)
                </button>
                <button onClick={onWipe} style={{ ...btn, flex: 1 }}>
                    Wipe all
                </button>
            </div>
            <button
                onClick={onExport}
                style={{
                    ...btn,
                    width: '100%',
                    background: '#A3E635',
                    color: '#0a0a14',
                    fontWeight: 600,
                }}
            >
                Export JSX (⌘E)
            </button>

            <div style={{ marginTop: 10, fontSize: 11, color: '#7a7a86' }}>
                {strokes.length} stroke{strokes.length !== 1 ? 's' : ''} · {totalPixels} pixel{totalPixels !== 1 ? 's' : ''} · beadPx={beadPx}
            </div>
        </div>
    );
}

const btn: React.CSSProperties = {
    background: '#1a1a20',
    border: '1px solid #2a2a30',
    color: '#e7e7ee',
    padding: '6px 10px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 12,
};

// ============================================================================
// Export — group painted pixels by section, generate JSX
// ============================================================================
function exportToClipboard(strokes: Stroke[], beadPx: number) {
    if (strokes.length === 0 || !beadPx) {
        // eslint-disable-next-line no-console
        console.warn('[paint] nothing to export');
        return;
    }
    const allPixels = strokes.flat();

    // Find sections in document order
    const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)).map((el) => {
        const r = el.getBoundingClientRect();
        return {
            id: el.id,
            top: r.top + window.scrollY,
            left: r.left + window.scrollX,
            bottom: r.bottom + window.scrollY,
            right: r.right + window.scrollX,
        };
    });

    // For each pixel, attribute it to a section based on its start-of-stroke containment.
    // Simple heuristic: a pixel belongs to the section that contains its (pageX, pageY).
    // If it overflows past sections (pixel below all section.bottom values), attribute to
    // the closest section above it.
    const grouped = new Map<string, Array<{ src: [number, number]; at: [number, number] }>>();
    for (const px of allPixels) {
        let owner = sections.find((s) => px.pageY >= s.top && px.pageY < s.bottom);
        if (!owner) {
            // fallback: closest section above
            const above = sections.filter((s) => s.top <= px.pageY).pop();
            owner = above ?? sections[0];
        }
        if (!owner) continue;
        const atCol = Math.round((px.pageX - owner.left) / beadPx);
        const atRow = Math.round((px.pageY - owner.top) / beadPx);
        if (!grouped.has(owner.id)) grouped.set(owner.id, []);
        grouped.get(owner.id)!.push({ src: px.src, at: [atCol, atRow] });
    }

    // Generate JSX
    const blocks: string[] = [];
    for (const [sectionId, pixels] of grouped) {
        const lines = pixels
            .map((p) => `    <Pixel src={[${p.src[0]}, ${p.src[1]}]} at={[${p.at[0]}, ${p.at[1]}]} />`)
            .join('\n');
        blocks.push(`{/* Paste inside #${sectionId} (it must be position: relative) */}\n<PixelLayer>\n${lines}\n</PixelLayer>`);
    }
    const out = blocks.join('\n\n');

    navigator.clipboard
        .writeText(out)
        .then(() => {
            // eslint-disable-next-line no-console
            console.log('[paint] exported to clipboard:\n' + out);
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.error('[paint] clipboard write failed', err);
            // eslint-disable-next-line no-console
            console.log(out);
        });
}
