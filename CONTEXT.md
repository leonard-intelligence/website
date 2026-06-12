# Leonard Intelligence Website — Context

## Glossary

### Bead-pixel system

**Source image** — `public/assets/backgrounds/flowers-beads.webp` (2448×1848). The hero illustration, already passed through the bead filter. 102 columns × 77 rows of beads, each cell exactly 24 source pixels.

**Pixel** — a single bead sampled from the source image. Identified by its `(col, row)` coordinate in the 102×77 grid. Rendered at the current page bead size (`beadPx`, integer, varies with viewport per the hero size calculation). NOT a 1×1 framebuffer pixel.

**Painting** — the act of placing a Pixel at a chosen destination on the page. The source coordinate dictates what color/shape the placed Pixel has; the destination dictates where it appears.

**Grid** — the page coordinate system used to position Pixels. One cell = `beadPx × beadPx` (the same value that drives hero bead size, varies with viewport). Sections keep their internal design.md spacing, but their **vertical boundaries** (where one section ends and the next begins) snap to the Grid. This guarantees that liaisons (drips between sections) land on a clean row of Pixels.

**PixelLayer** — a React container that defines a local Grid origin. Pixels placed inside it are positioned in grid coords (`[col, row]`) relative to that layer. Layers are composed in the JSX tree (a layer can be a child of a section, a wrapper between two sections, etc.). Multiple layers can coexist on the page. A layer typically allows `overflow: visible` so painted Pixels can spill past its bounds (e.g. drip from hero into intro).

**Source coordinate (strict)** — the primitive `<Pixel src={[col, row]} />` references an exact bead in the 102×77 source grid. Deterministic: same coord = same rendered bead.

**Region** — a named area of the source grid (e.g. `cloud`, `field`, `flower`). Used by **helper components** (`<Drip>`, `<Cluster>`, etc.) to pseudo-randomly sample source coords when generating many Pixels at once. Regions are defined as rectangles in the 102×77 grid space (precise shapes TBD).

**Rendering** — each Pixel is a DOM `<div>` of size `beadPx × beadPx`, with `background-image: url(<source>)`, `background-size: ${SAMPLE_W*beadPx}px ${SAMPLE_H*beadPx}px`, `background-position: -${col*beadPx}px -${row*beadPx}px`. Browser caches the image and reuses it for every Pixel — single network load, native CSS positioning, no JS render loop.

**Paint mode** (browser-based, dev-only) — toggles a visual painter on the live dev site. Click drops one Pixel; click-and-drag deposits a continuous stroke of Pixels. Source coord defaults to a **locked** single bead (deterministic stroke). A **region toggle** lets the author select a rectangle on the source image instead — Pixels in the stroke then sample pseudo-randomly inside that region (varied colors, used for drip effects).

Paint mode supports: **undo** (per stroke, Cmd+Z), **eraser** (toggle E, click/drag to delete Pixels), **export** (Cmd+E → JSX snippet `<PixelLayer> <Pixel src={[c,r]} at={[c,r]} /> ... </PixelLayer>` copied to clipboard, paste anywhere in source).

When painting, the system **auto-detects** which section the cursor is over at stroke start. Pixels are coord-relative to that section (origin = section's top-left). On export, the generated `<PixelLayer>` is intended to be pasted **inside that section**; it fills its parent absolutely with `overflow: visible` so a stroke that drags past the section's bottom drips into the next section.

**Z-stacking** — each PixelLayer accepts a `z` prop. Default places Pixels above section backgrounds (`z-index: 5`) but below textual content (`z-index: 10+`). Author can pass `z="over"` to surface a layer above content for creative compositions.

**Scope V1** — only the primitive (`<PixelLayer>` + `<Pixel>`) and Paint mode. No declarative helpers (`<Drip>`, `<Cluster>`, etc.) until a real use-case justifies them (e.g. responsive density that the painted output can't express). The painter solves the visual workflow; helpers stay an opt-in upgrade.

**Grid alignment policy** — same as the hero: the **internal grid** of a PixelLayer is always pixel-perfect (positions are exact integer multiples of `beadPx`). The **outer fit** to surrounding sections is loose — sections keep their CSS-driven heights, the layer absorbs the small modulo. No JS layout enforcement on section heights.

**Dev tools panel** — single floating UI (dev-only, `import.meta.env.DEV`) housing all author tooling under tabs. Currently: `Inner shadow` (existing controls) + `Paint` (the painter). Future tools (theme, motion, etc.) add new tabs. Global toggle `Cmd+Shift+D`. The Paint tab has its own shortcut `Cmd+P` to enter/exit paint cursor mode.
