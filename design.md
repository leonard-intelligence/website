# Leonard Intelligence — Design System

## 1. Visual Theme & Atmosphere

Leonard Intelligence's design system embodies a modern, minimalist aesthetic grounded in professional technology with natural, organic touches. The visual language combines a serene, approachable quality with sophisticated efficiency — evoking a sense of clarity and calm orchestration. The interface prioritizes clean typography, ample whitespace, and subtle depth to create an environment where complexity feels manageable. The brand's personality is forward-thinking yet grounded, speaking to operators and technical teams who value both aesthetics and functionality. The color palette draws from nature — soft greens and golden tones — paired with a sophisticated neutral foundation, creating visual warmth without sacrificing professionalism.

**Key Characteristics**
- Minimalist, distraction-free interface design
- Warm neutrals as primary canvas with nature-inspired accent colors
- Refined typography hierarchy with generous spacing
- Subtle depth and elevation creating visual structure without heaviness
- Professional yet approachable, speaking to technical and non-technical audiences
- Pixel-perfect precision in component styling
- Emphasis on whitespace and breathing room in layouts
- Soft, rounded corners suggesting accessibility and friendliness

## 2. Color Palette & Roles

### Primary
- **Text Base** (`#171717`): Primary text color used dominantly throughout interface; high contrast against light backgrounds
- **Text Dark** (`#202020`): Slightly deeper variation for hierarchy emphasis in specialized contexts

### Accent Colors
- **Lime Green** (`#A3E635`): Vibrant accent for highlights, interactive states, and calls-to-action; energetic and growth-oriented
- **Golden Yellow** (`#EEC75D`): Warm accent for secondary highlights and decorative elements; creates visual warmth
- **Forest Green** (`#71CE45`): Mid-tone green used for success states and environmental theme reinforcement
- **Teal Accent** (`#34D399`): Subtle accent color for tertiary highlights and specialized interactive states

### Interactive
- **Button Primary** (`#F5F5F2`): Light neutral background for primary button states
- **Button Secondary** (`#F1F1EE`): Softer light neutral for secondary button treatment
- **Button Disabled** (`#E7E7E1`): Muted background for disabled button states

### Neutral Scale
- **Surface Light** (`#FBFBF8`): Lightest neutral used for card backgrounds and floating containers
- **Surface Medium** (`#F5F5F2`): Mid-light neutral for panels and surface content areas
- **Background Default** (`#FFFFFF`): Pure white for body backgrounds and high-contrast sections
- **Border Subtle** (`#262323`): Dark subtle border color for soft delineation
- **Text Muted** (`#1A1A1A`): Darkest neutral, reserved for emphasis and heavy text layers

## 3. Typography Rules

### Font Family
**Primary Font:** Neoris (with fallback: `neoris, TT Neoris Trial Variable, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)

**Secondary Font:** TT Neoris Trial Variable (fallback: `TT Neoris Trial Variable, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / H1 | Neoris | 46px | 400 | 49.68px | 0px | Hero headlines and primary page titles |
| Heading / H2 | Neoris | 40px | 400 | 46px | 0px | Section headers and major divisions |
| Subheading / H3 | Neoris | 20px | 440 | 22px | 0px | Card titles and subsection headers |
| Heading / H4 | Neoris | 24px | 400 | 27.6px | 0px | Medium-weight headers and labels |
| Body / Paragraph | TT Neoris Trial Variable | 16px | 460 | 22.4px | 0px | Primary body copy and UI text |
| Span / Inline | Neoris | 16px | 400 | 24px | 0px | Inline text and annotations |
| Small / Caption | Neoris | 14px | 400 | 19.6px | 0px | Metadata, captions, and helper text |
| Button / CTA | Neoris | 16px | 400 | 24px | 0px | Interactive button labels |

### Principles
- **Clarity First:** Typography hierarchy prioritizes legibility and scanability; font weights are restrained (400–460 range) to avoid visual noise
- **Generous Line Height:** Spacing between lines creates breathing room and reduces cognitive load
- **Consistent Font:** Single primary typeface (Neoris) creates visual unity and brand coherence
- **Size Constraints:** Limited size palette (14px, 16px, 20px, 24px, 40px, 46px) maintains rhythm and reduces decision fatigue
- **Weight Variation:** Subtle weight shifts (400–440–460) achieve hierarchy without drastic visual breaks

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background Color:** `#F5F5F2`
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `0px` (inline)
- **Border Radius:** `8px`
- **Border:** `1px solid rgba(32, 32, 32, 0.1)`
- **Box Shadow:** `rgba(0, 0, 0, 0.06) 0px 2px 3px 0px, rgba(255, 255, 255, 0.35) 0px 0px 0.357px 1.5px inset, rgb(255, 255, 255) 0px 2px 0px 0px inset`
- **Height:** `41px`
- **Hover State:** Opacity increase to `0.85`, shadow deepens slightly
- **Active State:** Box shadow becomes `rgba(255, 255, 255, 0.35) 0px 0px 0.357px 1.5px inset`

#### Secondary Button
- **Background Color:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `0px` (inline)
- **Border Radius:** `8px`
- **Border:** `1px solid rgb(56, 56, 56)`
- **Box Shadow:** `rgba(64, 64, 64, 0.12) 0px 0px 0px 1px, rgba(255, 255, 255, 0.24) 0px 2px 0px 0px inset, rgba(0, 0, 0, 0.25) 0px -0.5px 2px 0px inset, rgba(0, 0, 0, 0.03) 0px 2px 8px 0px, rgba(0, 0, 0, 0.16) 0px 3px 4px 0px`
- **Height:** `41px`
- **Hover State:** Background becomes `rgba(32, 32, 32, 0.05)`
- **Active State:** Background becomes `rgba(32, 32, 32, 0.08)`

#### Ghost Button
- **Background Color:** `rgb(241, 241, 238)`
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `0px` (inline)
- **Border Radius:** `8px`
- **Border:** `1px solid rgba(32, 32, 32, 0.1)`
- **Box Shadow:** `rgba(0, 0, 0, 0.5) 0px 1px 1px 0px, rgba(255, 255, 255, 0.23) 0px 0px 0px 1px`
- **Height:** `41px`
- **Hover State:** Background becomes `rgb(245, 245, 242)`
- **Active State:** Background becomes `rgb(231, 231, 225)`

#### Minimal Button
- **Background Color:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `0px` (inline)
- **Border Radius:** `8px`
- **Border:** `1px solid rgb(56, 56, 56)`
- **Box Shadow:** `rgba(64, 64, 64, 0.12) 0px 0px 0px 1px, rgba(255, 255, 255, 0.24) 0px 2px 0px 0px inset, rgba(0, 0, 0, 0.25) 0px -0.5px 2px 0px inset, rgba(0, 0, 0, 0.03) 0px 2px 8px 0px, rgba(0, 0, 0, 0.16) 0px 3px 4px 0px`
- **Height:** `auto`
- **Hover State:** Border becomes `1px solid rgba(32, 32, 32, 0.3)`

### Cards & Containers

#### Card Light
- **Background Color:** `#F5F5F2`
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `4px` (inset)
- **Border Radius:** `7.142px`
- **Border:** `0px`
- **Box Shadow:** `rgb(255, 255, 255) 0px 0px 0px 0.714px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 0.714px, rgba(0, 0, 0, 0.04) 0px 0px 14.284px 0px, rgba(0, 0, 0, 0.01) 0px 16.427px 19.998px 0px, rgba(0, 0, 0, 0.02) 0px 7.142px 14.284px 0px, rgba(0, 0, 0, 0.03) 0px 2.143px 7.856px 0px`
- **Hover State:** Box shadow increases to `rgb(255, 255, 255) 0px 0px 0px 0.714px inset, rgba(0, 0, 0, 0.12) 0px 0px 0px 0.714px, rgba(0, 0, 0, 0.06) 0px 0px 20px 0px, rgba(0, 0, 0, 0.02) 0px 20px 28px 0px, rgba(0, 0, 0, 0.03) 0px 8px 16px 0px, rgba(0, 0, 0, 0.04) 0px 2px 9px 0px`

#### Card Pale
- **Background Color:** `#FBFBF8`
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `0px`
- **Border Radius:** `7.142px`
- **Border:** `0px`
- **Box Shadow:** `rgb(255, 255, 255) 0px 0px 0px 0.714px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 0.714px, rgba(0, 0, 0, 0.04) 0px 0px 14.284px 0px, rgba(0, 0, 0, 0.01) 0px 16.427px 19.998px 0px, rgba(0, 0, 0, 0.02) 0px 7.142px 14.284px 0px, rgba(0, 0, 0, 0.03) 0px 2.143px 7.856px 0px`

#### Card Full-Width
- **Background Color:** `#F5F5F2`
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `4px`
- **Border Radius:** `7.142px`
- **Border:** `0px`
- **Box Shadow:** `rgb(255, 255, 255) 0px 0px 0px 0.714px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 0.714px, rgba(0, 0, 0, 0.04) 0px 0px 14.284px 0px, rgba(0, 0, 0, 0.01) 0px 16.427px 19.998px 0px, rgba(0, 0, 0, 0.02) 0px 7.142px 14.284px 0px, rgba(0, 0, 0, 0.03) 0px 2.143px 7.856px 0px`
- **Width:** `100%`

### Inputs & Forms

#### Text Input
- **Background Color:** `#FFFFFF`
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `12px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid rgba(32, 32, 32, 0.15)`
- **Box Shadow:** `rgba(0, 0, 0, 0.02) 0px 1px 3px inset`
- **Height:** `41px`
- **Focus State:** Border becomes `1px solid #171717`, box shadow becomes `rgba(0, 0, 0, 0.06) 0px 0px 0px 3px rgba(23, 23, 23, 0.1)`

#### Text Input Placeholder
- **Color:** `rgba(23, 23, 23, 0.5)`
- **Font:** Neoris, 16px, weight 400, line-height 24px

### Navigation

#### Navigation Bar
- **Background Color:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `16px 32px`
- **Border Radius:** `0px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Height:** `41px`
- **Link Spacing:** `24px` between navigation items

#### Navigation Link
- **Background Color:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#171717`
- **Font:** Neoris, 16px, weight 400, line-height 24px
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Hover State:** Text color becomes `rgba(23, 23, 23, 0.7)`, underline appears at `2px` height

#### Navigation Link Inverted (Light Background)
- **Background Color:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#FBFBF8`
- **Font:** Neoris, 15px, weight 410, line-height 22.5px
- **Padding:** `0px 6px`
- **Border Radius:** `0px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Hover State:** Opacity becomes `0.8`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Spacing Scale:**
- `4px` (xxs): Micro gaps between tightly grouped elements
- `8px` (xs): Tight spacing for related elements
- `12px` (sm): Small gaps within component groups
- `16px` (md): Standard padding and moderate spacing
- `20px` (lg): Comfortable spacing between sections
- `24px` (xl): Large padding for card interiors and sections
- `28px` (2xl): Extra-large spacing for visual separation
- `32px` (3xl): Component-level spacing and section separation
- `40px` (4xl): Prominent spacing between major sections
- `52px` (5xl): Large layout spacing
- `60px` (6xl): Extra-large layout spacing between page sections
- `76px` (7xl): Maximum spacing for major page divisions

**Usage Contexts:**
- Padding within cards: `16px`, `24px`, `32px`
- Gap between navigation items: `24px`
- Section margins: `40px`, `60px`, `76px`
- Internal component gaps: `4px`, `8px`, `12px`

### Grid & Container

**Max Width:** `1200px` (desktop container maximum)

**Column Strategy:** 12-column flexible grid system; columns adapt based on breakpoint

**Section Patterns:**
- **Hero Section:** Full-width with `76px` top/bottom padding, centered content to `1200px` max-width
- **Content Section:** `60px` vertical spacing between sections
- **Card Grid:** 3-column layout on desktop, 2-column on tablet, single column on mobile; `24px` gap between cards
- **Two-Column Layout:** 50/50 split with `40px` gutter on desktop; stacks vertically with `32px` gap on tablet/mobile

### Whitespace Philosophy

This design system prioritizes generous whitespace to create calm, focused environments. Spacing is not merely functional but compositional — whitespace guides the eye and establishes visual hierarchy without relying on color or weight alone. Sections breathe with 40–60px margins, components maintain internal padding of 16–24px, and text has 1.5x line height creating vertical breathing room. This approach reduces cognitive friction, allowing users to process information without visual clutter.

### Border Radius Scale

- `2.857px`: Micro radius for minimal rounding on small buttons
- `6px`: Small radius for compact interactive elements
- `7.142px`: Standard card radius, used for most surface components
- `8px`: Primary button radius, consistent with modern design systems
- `16px`: Large radius for prominent cards and containers
- `17px`: Extra-large radius for badge and decorative elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (None) | `box-shadow: none` | Navigation bars, minimal buttons, backgrounds |
| Subtle (Small) | `rgba(0, 0, 0, 0.06) 0px 2px 3px 0px, rgba(255, 255, 255, 0.35) 0px 0px 0.357px 1.5px inset, rgb(255, 255, 255) 0px 2px 0px 0px inset` | Primary buttons, light interactive elements |
| Standard (Medium) | `rgb(255, 255, 255) 0px 0px 0px 0.714px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 0.714px, rgba(0, 0, 0, 0.04) 0px 0px 14.284px 0px, rgba(0, 0, 0, 0.01) 0px 16.427px 19.998px 0px, rgba(0, 0, 0, 0.02) 0px 7.142px 14.284px 0px, rgba(0, 0, 0, 0.03) 0px 2.143px 7.856px 0px` | Cards, floating containers, primary surfaces |
| Deep (Large) | `rgba(64, 64, 64, 0.12) 0px 0px 0px 1px, rgba(255, 255, 255, 0.24) 0px 2px 0px 0px inset, rgba(0, 0, 0, 0.25) 0px -0.5px 2px 0px inset, rgba(0, 0, 0, 0.03) 0px 2px 8px 0px, rgba(0, 0, 0, 0.16) 0px 3px 4px 0px` | Secondary buttons, modal overlays, elevated content |
| Maximum (Extra Large) | `rgba(0, 0, 0, 0.5) 0px 1px 1px 0px, rgba(255, 255, 255, 0.23) 0px 0px 0px 1px` | Ghost buttons, modals, overlays |

**Shadow Philosophy:**
The shadow system creates subtle depth layering that enhances spatial hierarchy without dominating the interface. Shadows are soft and diffused, suggesting gentle elevation rather than dramatic drop-offs. The system uses inset highlights (white inner shadows) to create refined, almost jewel-like quality to surfaces. This approach maintains visual lightness while ensuring clear depth distinction between layered elements.

## 7. Do's and Don'ts

### Do

- **Use the full spacing scale intentionally:** Leverage `40px`, `60px`, and `76px` for major section separation to create breathing room
- **Maintain typography hierarchy:** Stick to the defined size palette (14px–46px) to ensure visual consistency
- **Apply shadows conservatively:** Use subtle shadow levels for cards and standard surfaces; reserve deep shadows for special states
- **Leverage accent colors sparingly:** Lime green (`#A3E635`) works best for CTAs and highlights; limit to 2–3 per page
- **Keep border radius consistent:** Prefer `8px` for buttons and interactive elements, `7.142px` for cards
- **Ensure sufficient padding:** Always use at least `16px` internal padding in cards and containers
- **Prioritize whitespace:** Generous margins between sections improve cognitive load and visual hierarchy
- **Test color contrast:** Maintain `#171717` text on `#FBFBF8`–`#FFFFFF` backgrounds for WCAG AA compliance

### Don't

- **Don't mix font families:** Stick to Neoris and TT Neoris Trial Variable; avoid introducing additional typefaces
- **Don't use extreme font weights:** Weights outside the 400–460 range feel inconsistent; use size changes for emphasis
- **Don't create buttons smaller than `41px` height:** Maintain minimum touch target size for accessibility
- **Don't apply multiple shadow levels simultaneously:** Layer only one shadow level per element
- **Don't over-saturate with accent colors:** Reserve lime green and golden yellow for primary actions; avoid background fills
- **Don't use `#171717` on dark backgrounds:** This creates insufficient contrast; use `#FBFBF8` or `#FFFFFF` for light text
- **Don't add borders to cards:** Cards rely on shadows for definition; hard borders conflict with the refined aesthetic
- **Don't space sections closer than `40px`:** Cramped layouts undermine the calm, breathing philosophy
- **Don't reduce line-height below `1.4x` font size:** Tighter leading impacts readability and visual comfort

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–767px | Single-column layout, `12px`–`16px` padding, heading size reduced to 28px (H1), card padding `12px`, navigation stack vertically |
| Tablet | 768px–1023px | 2-column grid, `20px`–`24px` padding, heading size 36px (H1), card padding `16px`, navigation items wrap or collapse to menu |
| Desktop | 1024px–1440px | 3-column grid, `32px`–`40px` padding, full typography hierarchy, card padding `24px`, full navigation bar visible |
| Large Desktop | 1440px+ | Max-width container `1200px` centered, generous `40px`–`76px` section margins, full feature set |

### Touch Targets

- **Minimum height:** `44px` for buttons, links, and form inputs on touch devices
- **Minimum width:** `44px` for interactive elements
- **Spacing between targets:** `12px` minimum to prevent accidental adjacent taps
- **Navigation items:** `48px` height on mobile for comfortable tapping
- **Form inputs:** `44px` height on mobile, `41px` on desktop

### Collapsing Strategy

- **Hero Section:** On mobile, reduce heading from 46px to 28px; stack elements vertically with `20px` gap
- **Card Grid:** Desktop 3-column → tablet 2-column → mobile single column
- **Navigation:** Desktop horizontal bar → tablet wrapped or collapsible menu → mobile hamburger menu
- **Padding Reduction:** Desktop `32px`–`40px` → tablet `20px`–`24px` → mobile `12px`–`16px`
- **Max Width:** Maintain 100% width on mobile, constrain to `100% - 24px` (12px margins on each side)
- **Typography:** Reduce line lengths to 50–60 characters on mobile by constraining content width
- **Spacing Between Sections:** Desktop `60px`–`76px` → tablet `40px`–`52px` → mobile `28px`–`32px`

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Lime Green (`#A3E635`) for call-to-action buttons and highlights
- **Primary Text:** Neutral Dark (`#171717`) for all body text and primary UI elements
- **Button Background (Primary):** Light Neutral (`#F5F5F2`) for main button fills
- **Button Background (Secondary):** Transparent with dark border (`rgba(0, 0, 0, 0)` + `1px solid rgb(56, 56, 56)`)
- **Card Background:** Light Surface (`#F5F5F2`) or Pale Surface (`#FBFBF8`)
- **Accent Highlight:** Golden Yellow (`#EEC75D`) for secondary accents and decorative elements
- **Success State:** Forest Green (`#71CE45`) for confirmation and positive feedback
- **Background:** Pure White (`#FFFFFF`) or Light Neutral (`#F5F5F2`)
- **Heading Text:** Neutral Dark (`#171717`)
- **Link Text:** Neutral Dark (`#171717`) with underline on hover
- **Inverted Text (on dark):** Light Surface (`#FBFBF8`)
- **Border/Divider:** Subtle Dark (`#262323`) or semi-transparent `rgba(32, 32, 32, 0.1)`

### Iteration Guide

1. **Use Neoris exclusively:** Primary font is Neoris (400 weight default); TT Neoris Trial Variable for body only. No other typefaces.

2. **Typography hierarchy strictly:** H1 = 46px/400wt, H2 = 40px/400wt, H3 = 20px/440wt, H4 = 24px/400wt, body = 16px/460wt. No exceptions.

3. **Button minimum dimensions:** All buttons must be at least `41px` height, with `8px` border-radius and appropriate shadow (Subtle, Standard, or Deep only).

4. **Card styling formula:** Background + `7.142px` border-radius + Standard shadow (`rgb(255, 255, 255) 0px 0px 0px 0.714px inset...`). Never add borders to cards.

5. **Spacing scale enforcement:** Use only values from scale (4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 52px, 60px, 76px). No arbitrary spacing.

6. **Section spacing minimum:** Between major sections, minimum `40px` (comfortable), typically `60px` (large), up to `76px` (extra-large page divisions).

7. **Color contrast rule:** `#171717` text only on light backgrounds (`#F5F5F2`, `#FBFBF8`, `#FFFFFF`); reverse with `#FBFBF8` on dark.

8. **Accent color usage:** Lime Green (`#A3E635`) for primary CTAs only (max 2–3 per page); Golden Yellow (`#EEC75D`) for secondary highlights sparingly.

9. **Shadow depth progression:** Use Subtle for buttons, Standard for cards, Deep for secondary buttons/modals, Maximum for overlays. Only one shadow level per element.

10. **Mobile breakpoint implementation:** At 768px and below, shift to single column, reduce padding to `16px`, stack navigation, reduce H1 to 28px, maintain `44px` touch targets.

11. **Whitespace-first design:** Prioritize breathing room over content density. When in doubt, add more space; tight layouts conflict with brand philosophy.

12. **Input styling standard:** `41px` height, `12px 16px` padding, `8px` border-radius, `1px solid rgba(32, 32, 32, 0.15)` border, focus border becomes solid `#171717`.
