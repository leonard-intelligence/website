// Sections V2 — Leonard Intelligence (design.md: warm neutrals, soft shadows, rounded corners)
import { ArrowRight, Users, Map as MapIcon, Ruler, ShieldCheck, Boxes, Plug, Rocket, Gauge, Cpu, Workflow, Database, Layers, LayoutDashboard, Sparkles, type LucideIcon } from 'lucide-react';
import { PixelLayer } from '../pixels/PixelLayer';
import { Pixel } from '../pixels/Pixel';
import { useBeadCtx, SOURCE_URL } from '../pixels/BeadPxContext';
import { useNotchParams } from '../dev/notchParamsStore';
import { useVitruveParams } from '../dev/vitruveParamsStore';
import { QrBadge } from './QrBadge';
import { ReliefButton } from '../ui/ReliefButton';
import { ConstruitSur } from './ConstruitSur';
import { Fragment } from 'react';
import { useInViewReveal } from '../../hooks/useInViewReveal';

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
    const { ref, shown } = useInViewReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'none' : 'translateY(12px)',
                transition: 'opacity 600ms cubic-bezier(0.25,0,0.15,1), transform 600ms cubic-bezier(0.25,0,0.15,1)',
            }}
        >
            {children}
        </div>
    );
}

export const TOKENS = {
    paper: '#F7F7F5',
    surface: '#F5F5F2',
    pale: '#FBFBF8',
    white: '#FFFFFF',
    ink: '#171717',
    mutedText: 'rgba(23, 23, 23, 0.7)',
    lime: '#A3E635',
    gold: '#EEC75D',
    forest: '#71CE45',
    border: 'rgba(32, 32, 32, 0.1)',
};

export const CARD_SHADOW =
    'rgb(255, 255, 255) 0px 0px 0px 0.714px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 0.714px, rgba(0, 0, 0, 0.04) 0px 0px 14.284px 0px, rgba(0, 0, 0, 0.01) 0px 16.427px 19.998px 0px, rgba(0, 0, 0, 0.02) 0px 7.142px 14.284px 0px, rgba(0, 0, 0, 0.03) 0px 2.143px 7.856px 0px';

// Subtle relief for CTAs & pills (light bg) — top white highlight + soft drop shadow + 0.5px hairline border.
// Inspired by Cofounder's button/badge treatment: feels pressable without being skeumorphic.
const RELIEF_LIGHT =
    'rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.06) 0px 0px 0px 0.5px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.04) 0px 2px 6px 0px';

// Solid button bgs — relief comes purely from inset highlight + hairline border + drop shadow (no gradients)
export const BTN_LIGHT_BG = '#F5F5F2';
export const BTN_LIGHT_SHADOW =
    'rgba(255, 255, 255, 1) 0px 1px 0px 0px inset, rgba(255, 255, 255, 1) 0px 2px 0px 0px inset, rgba(0, 0, 0, 0.04) 0px -1px 0px 0px inset, rgba(0, 0, 0, 0.08) 0px 0px 0px 0.5px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 2px 5px 0px';
export const BTN_DARK_BG = '#1f1f1f';
export const BTN_DARK_SHADOW =
    'rgba(255, 255, 255, 0.35) 0px 1px 0px 0px inset, rgba(255, 255, 255, 0.12) 0px 2px 0px 0px inset, rgba(0, 0, 0, 0.5) 0px 0px 0px 0.5px, rgba(0, 0, 0, 0.4) 0px 1px 2px 0px, rgba(0, 0, 0, 0.28) 0px 3px 10px 0px';

// Two text tones, both with true SVG inner shadow (filter defined once below).
// Colors driven by CSS variables so the debug panel can update them live.
export const EMBOSS_DARK: React.CSSProperties = {
    color: 'var(--emboss-color-dark, #555555)',
    filter: 'url(#inset-shadow-dark)',
};
export const EMBOSS_MUTED: React.CSSProperties = {
    color: 'var(--emboss-color-muted, #9a9a9a)',
    filter: 'url(#inset-shadow-dark)',
};

// NB: Inner-shadow SVG filters + the debug panel have moved to src/components/dev/DevTools.tsx.
// Sections.tsx now only exports the section components and the EMBOSS_* style objects above.

// (HeroToIntroDrip removed — user will paint the drip manually via Paint mode.)

// ============================================================================
// SECTION 1 — Tagline + 3-col features
// ============================================================================
// ── Capabilities overview grid (intro) — "Do it all" style, links to each layer ─
const CAPS: { n: string; title: string; desc: string; href: string; icon: LucideIcon }[] = [
    { n: '01', title: 'Grands modèles de langage', desc: 'Le bon modèle pour chaque tâche — propriétaire ou open-weight.', href: '#section-modeles', icon: Cpu },
    { n: '02', title: 'Harnais agentique', desc: "Routage d'outils, mémoire, garde-fous. Des sous-agents en parallèle.", href: '#section-harnais', icon: Workflow },
    { n: '03', title: 'Données & intégrations', desc: "Ce à quoi l'agent se branche : API, CRM, bases, connecteurs MCP.", href: '#section-donnees', icon: Database },
    { n: '04', title: 'Contexte & connaissance', desc: 'Une mémoire qui se capitalise au fil des tours.', href: '#section-contexte', icon: Layers },
    { n: '05', title: 'Capacités métier', desc: "Les compétences qui font de l'agent un expert de votre domaine.", href: '#section-capabilities', icon: Sparkles },
    { n: '06', title: 'Produits & interfaces', desc: 'Les surfaces où humains et agents travaillent.', href: '#section-produits', icon: LayoutDashboard },
    { n: '07', title: 'Sécurité & gouvernance', desc: 'Cloisonnement, traçabilité, accès par rôle — dans chaque couche.', href: '#section-securite', icon: ShieldCheck },
];

function CapCard({ cap }: { cap: (typeof CAPS)[number] }) {
    const Icon = cap.icon;
    return (
        <a
            href={cap.href}
            className="flex flex-col"
            style={{ padding: '22px 22px 20px', borderRadius: 14, background: TOKENS.white, boxShadow: RM_CARD_SHADOW, textDecoration: 'none' }}
        >
            <div className="flex items-start justify-between" style={{ marginBottom: 18 }}>
                <span
                    className="inline-flex items-center justify-center"
                    style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F2 100%)', boxShadow: RM_TILE_SHADOW }}
                >
                    <Icon size={18} strokeWidth={1.6} color={TOKENS.ink} style={{ opacity: 0.7 }} />
                </span>
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: TOKENS.mutedText }}>{cap.n}</span>
            </div>
            <h3 className="font-sans" style={{ fontSize: 18, fontWeight: 600, color: TOKENS.ink, lineHeight: 1.2 }}>{cap.title}</h3>
            <p className="font-sans" style={{ fontSize: 14, lineHeight: '20px', fontWeight: 440, color: TOKENS.mutedText, marginTop: 8, flex: '1 1 auto' }}>{cap.desc}</p>
            <span className="inline-flex items-center font-mono" style={{ gap: 6, marginTop: 18, fontSize: 11, letterSpacing: '0.08em', color: TOKENS.ink }}>
                Découvrir <ArrowRight size={12} />
            </span>
        </a>
    );
}

export function SectionIntro() {
    const { beadW, leftPx, heroBottomGap } = useBeadCtx();
    return (
        <section
            id="section-intro"
            className="relative"
            style={{ backgroundColor: TOKENS.surface, paddingBlock: '76px', paddingInline: '32px' }}
            aria-label="Leonard Intelligence"
        >
            {/* Painted drip layer — constrained to the hero bead area width (clip horizontally).
                The wrapper top sits exactly at the hero bead image bottom (no overlap).
                Painted pixels at row 1 land 1 bead below that (= 1 row beneath the hero image). */}
            <div
                style={{
                    position: 'absolute',
                    top: -heroBottomGap,
                    left: leftPx,
                    width: beadW || '100%',
                    height: `calc(100% + ${heroBottomGap}px)`,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: 5,
                }}
            >
                <div style={{ position: 'absolute', inset: 0 }}>
            <PixelLayer>
                <Pixel src={[67, 71]} at={[50, 0]} />
                <Pixel src={[73, 66]} at={[2, 0]} />
                <Pixel src={[46, 71]} at={[3, 0]} />
                <Pixel src={[20, 70]} at={[4, 0]} />
                <Pixel src={[100, 66]} at={[5, 0]} />
                <Pixel src={[45, 68]} at={[7, 0]} />
                <Pixel src={[32, 73]} at={[8, 0]} />
                <Pixel src={[97, 72]} at={[9, 0]} />
                <Pixel src={[26, 70]} at={[11, 0]} />
                <Pixel src={[39, 72]} at={[13, 0]} />
                <Pixel src={[76, 72]} at={[14, 0]} />
                <Pixel src={[27, 67]} at={[16, 0]} />
                <Pixel src={[39, 71]} at={[18, 0]} />
                <Pixel src={[21, 68]} at={[19, 0]} />
                <Pixel src={[57, 69]} at={[20, 0]} />
                <Pixel src={[61, 67]} at={[21, 0]} />
                <Pixel src={[55, 69]} at={[23, 0]} />
                <Pixel src={[54, 67]} at={[24, 0]} />
                <Pixel src={[33, 71]} at={[27, 0]} />
                <Pixel src={[65, 70]} at={[28, 0]} />
                <Pixel src={[29, 68]} at={[29, 0]} />
                <Pixel src={[13, 66]} at={[30, 0]} />
                <Pixel src={[5, 69]} at={[31, 0]} />
                <Pixel src={[48, 70]} at={[33, 0]} />
                <Pixel src={[24, 74]} at={[34, 0]} />
                <Pixel src={[76, 74]} at={[35, 0]} />
                <Pixel src={[78, 69]} at={[37, 0]} />
                <Pixel src={[11, 69]} at={[38, 0]} />
                <Pixel src={[92, 67]} at={[39, 0]} />
                <Pixel src={[38, 69]} at={[40, 0]} />
                <Pixel src={[85, 71]} at={[41, 0]} />
                <Pixel src={[10, 70]} at={[43, 0]} />
                <Pixel src={[86, 67]} at={[45, 0]} />
                <Pixel src={[83, 71]} at={[46, 0]} />
                <Pixel src={[59, 67]} at={[48, 0]} />
                <Pixel src={[7, 69]} at={[49, 0]} />
                <Pixel src={[73, 71]} at={[52, 0]} />
                <Pixel src={[36, 69]} at={[53, 0]} />
                <Pixel src={[34, 71]} at={[55, 0]} />
                <Pixel src={[21, 70]} at={[56, 0]} />
                <Pixel src={[45, 67]} at={[57, 0]} />
                <Pixel src={[78, 70]} at={[58, 0]} />
                <Pixel src={[92, 68]} at={[60, 0]} />
                <Pixel src={[39, 67]} at={[62, 0]} />
                <Pixel src={[92, 66]} at={[63, 0]} />
                <Pixel src={[37, 71]} at={[64, 0]} />
                <Pixel src={[47, 66]} at={[65, 0]} />
                <Pixel src={[17, 74]} at={[66, 0]} />
                <Pixel src={[44, 70]} at={[68, 0]} />
                <Pixel src={[60, 67]} at={[69, 0]} />
                <Pixel src={[75, 72]} at={[71, 0]} />
                <Pixel src={[57, 66]} at={[72, 0]} />
                <Pixel src={[69, 67]} at={[73, 0]} />
                <Pixel src={[14, 71]} at={[74, 0]} />
                <Pixel src={[30, 69]} at={[76, 0]} />
                <Pixel src={[85, 67]} at={[77, 0]} />
                <Pixel src={[98, 70]} at={[78, 0]} />
                <Pixel src={[12, 66]} at={[80, 0]} />
                <Pixel src={[65, 68]} at={[82, 0]} />
                <Pixel src={[17, 67]} at={[85, 0]} />
                <Pixel src={[87, 73]} at={[86, 0]} />
                <Pixel src={[11, 69]} at={[87, 0]} />
                <Pixel src={[85, 67]} at={[88, 0]} />
                <Pixel src={[28, 72]} at={[89, 0]} />
                <Pixel src={[79, 67]} at={[91, 0]} />
                <Pixel src={[58, 67]} at={[92, 0]} />
                <Pixel src={[36, 70]} at={[93, 0]} />
                <Pixel src={[63, 74]} at={[94, 0]} />
                <Pixel src={[66, 74]} at={[95, 0]} />
                <Pixel src={[67, 67]} at={[97, 0]} />
                <Pixel src={[77, 71]} at={[98, 0]} />
                <Pixel src={[58, 68]} at={[99, 0]} />
                <Pixel src={[53, 66]} at={[101, 0]} />
                <Pixel src={[85, 68]} at={[77, 0]} />
                <Pixel src={[84, 69]} at={[77, 0]} />
                <Pixel src={[74, 70]} at={[77, 0]} />
                <Pixel src={[87, 66]} at={[85, 0]} />
                <Pixel src={[72, 74]} at={[88, 0]} />
                <Pixel src={[75, 69]} at={[101, 0]} />
                <Pixel src={[63, 72]} at={[69, 0]} />
                <Pixel src={[50, 71]} at={[68, 0]} />
                <Pixel src={[45, 71]} at={[65, 0]} />
                <Pixel src={[57, 68]} at={[64, 0]} />
                <Pixel src={[40, 73]} at={[63, 0]} />
                <Pixel src={[45, 72]} at={[60, 0]} />
                <Pixel src={[49, 72]} at={[58, 0]} />
                <Pixel src={[45, 73]} at={[46, 0]} />
                <Pixel src={[44, 68]} at={[39, 0]} />
                <Pixel src={[39, 72]} at={[34, 0]} />
                <Pixel src={[44, 68]} at={[43, 0]} />
                <Pixel src={[38, 73]} at={[49, 0]} />
                <Pixel src={[12, 69]} at={[15, 0]} />
                <Pixel src={[19, 74]} at={[5, 0]} />
                <Pixel src={[19, 73]} at={[14, 0]} />
                <Pixel src={[1, 74]} at={[9, 0]} />
                <Pixel src={[86, 66]} at={[83, 0]} />
                <Pixel src={[4, 74]} at={[1, 0]} />
                <Pixel src={[80, 73]} at={[14, 0]} />
                <Pixel src={[27, 71]} at={[31, 0]} />
                <Pixel src={[17, 71]} at={[32, 0]} />
                <Pixel src={[88, 73]} at={[58, 0]} />
                <Pixel src={[20, 70]} at={[59, 0]} />
                <Pixel src={[84, 73]} at={[60, 0]} />
                <Pixel src={[7, 66]} at={[64, 1]} />
                <Pixel src={[85, 69]} at={[2, 2]} />
                <Pixel src={[12, 68]} at={[3, 1]} />
                <Pixel src={[97, 72]} at={[4, 3]} />
                <Pixel src={[50, 73]} at={[7, 0]} />
                <Pixel src={[45, 72]} at={[7, 2]} />
                <Pixel src={[19, 73]} at={[8, 1]} />
                <Pixel src={[15, 66]} at={[9, 3]} />
                <Pixel src={[40, 66]} at={[11, 1]} />
                <Pixel src={[46, 66]} at={[10, 1]} />
                <Pixel src={[35, 68]} at={[10, 0]} />
                <Pixel src={[85, 67]} at={[18, 0]} />
                <Pixel src={[20, 67]} at={[18, 1]} />
                <Pixel src={[46, 73]} at={[18, 3]} />
                <Pixel src={[45, 71]} at={[20, 0]} />
                <Pixel src={[8, 66]} at={[19, 1]} />
                <Pixel src={[52, 73]} at={[19, 0]} />
                <Pixel src={[42, 68]} at={[23, 1]} />
                <Pixel src={[91, 72]} at={[21, 2]} />
                <Pixel src={[86, 74]} at={[39, 0]} />
                <Pixel src={[25, 73]} at={[40, 0]} />
                <Pixel src={[45, 74]} at={[39, 1]} />
                <Pixel src={[6, 70]} at={[34, 1]} />
                <Pixel src={[45, 71]} at={[27, 1]} />
                <Pixel src={[97, 67]} at={[28, 1]} />
                <Pixel src={[8, 74]} at={[28, 0]} />
                <Pixel src={[37, 70]} at={[101, 0]} />
                <Pixel src={[40, 72]} at={[99, 2]} />
                <Pixel src={[9, 70]} at={[97, 1]} />
                <Pixel src={[29, 70]} at={[97, 2]} />
                <Pixel src={[62, 74]} at={[97, 4]} />
                <Pixel src={[59, 73]} at={[99, 0]} />
                <Pixel src={[63, 66]} at={[84, 1]} />
                <Pixel src={[11, 73]} at={[84, 3]} />
                <Pixel src={[73, 70]} at={[88, 0]} />
                <Pixel src={[40, 74]} at={[88, 1]} />
                <Pixel src={[19, 68]} at={[86, 1]} />
                <Pixel src={[68, 67]} at={[86, 2]} />
                <Pixel src={[57, 69]} at={[92, 0]} />
                <Pixel src={[34, 68]} at={[92, 2]} />
                <Pixel src={[13, 73]} at={[93, 0]} />
                <Pixel src={[96, 74]} at={[93, 3]} />
                <Pixel src={[41, 72]} at={[96, 0]} />
                <Pixel src={[40, 74]} at={[72, 0]} />
                <Pixel src={[57, 66]} at={[73, 0]} />
                <Pixel src={[19, 69]} at={[73, 2]} />
                <Pixel src={[8, 71]} at={[50, 2]} />
                <Pixel src={[95, 69]} at={[50, 3]} />
                <Pixel src={[96, 69]} at={[46, 0]} />
                <Pixel src={[41, 72]} at={[14, 2]} />
                <Pixel src={[71, 68]} at={[80, 0]} />
                <Pixel src={[69, 67]} at={[76, 1]} />
                <Pixel src={[77, 69]} at={[78, 0]} />
                <Pixel src={[72, 66]} at={[89, 3]} />
                <Pixel src={[73, 74]} at={[89, 3]} />
                <Pixel src={[37, 68]} at={[66, 0]} />
                <Pixel src={[43, 71]} at={[46, 0]} />
                <Pixel src={[41, 73]} at={[43, 2]} />
                <Pixel src={[49, 69]} at={[32, 1]} />
                <Pixel src={[55, 68]} at={[9, 4]} />
                <Pixel src={[3, 68]} at={[1, 1]} />
                <Pixel src={[18, 72]} at={[1, 2]} />
                <Pixel src={[6, 61]} at={[1, 3]} />
                <Pixel src={[0, 71]} at={[6, 3]} />
                <Pixel src={[14, 65]} at={[6, 4]} />
                <Pixel src={[10, 61]} at={[12, 2]} />
                <Pixel src={[0, 63]} at={[59, 1]} />
                <Pixel src={[90, 66]} at={[101, 1]} />
                <Pixel src={[81, 73]} at={[101, 2]} />
                <Pixel src={[96, 68]} at={[101, 3]} />
                <Pixel src={[81, 72]} at={[92, 4]} />
                <Pixel src={[78, 71]} at={[92, 3]} />
                <Pixel src={[80, 71]} at={[95, 2]} />
                <Pixel src={[90, 67]} at={[95, 3]} />
                <Pixel src={[77, 73]} at={[83, 0]} />
                <Pixel src={[13, 59]} at={[4, 0]} />
                <Pixel src={[4, 62]} at={[2, 4]} />
                <Pixel src={[17, 71]} at={[2, 5]} />
                <Pixel src={[20, 67]} at={[6, 1]} />
                <Pixel src={[12, 69]} at={[2, 1]} />
                <Pixel src={[2, 74]} at={[2, 0]} />
                <Pixel src={[0, 70]} at={[13, 4]} />
                <Pixel src={[20, 61]} at={[12, 4]} />
                <Pixel src={[20, 66]} at={[12, 3]} />
                <Pixel src={[3, 61]} at={[55, 1]} />
                <Pixel src={[84, 71]} at={[99, 5]} />
                <Pixel src={[81, 68]} at={[95, 5]} />
                <Pixel src={[80, 69]} at={[94, 5]} />
                <Pixel src={[47, 55]} at={[49, 0]} />
                <Pixel src={[64, 59]} at={[52, 0]} />
                <Pixel src={[61, 60]} at={[60, 2]} />
                <Pixel src={[59, 56]} at={[37, 1]} />
                <Pixel src={[61, 61]} at={[36, 2]} />
                <Pixel src={[45, 61]} at={[69, 0]} />
                <Pixel src={[77, 69]} at={[90, 1]} />
                <Pixel src={[77, 67]} at={[91, 1]} />
                <Pixel src={[81, 68]} at={[91, 1]} />
                <Pixel src={[85, 69]} at={[91, 0]} />
                {/* Edge fill — left side (cols 0-2) and right side (cols 99-101) */}
                <Pixel src={[12, 70]} at={[0, 0]} />
                <Pixel src={[8, 68]} at={[0, 1]} />
                <Pixel src={[15, 66]} at={[0, 2]} />
                <Pixel src={[3, 71]} at={[0, 3]} />
                <Pixel src={[20, 74]} at={[1, 1]} />
                <Pixel src={[5, 69]} at={[1, 2]} />
                <Pixel src={[18, 67]} at={[1, 3]} />
                <Pixel src={[10, 72]} at={[2, 4]} />
                <Pixel src={[6, 68]} at={[2, 5]} />
                <Pixel src={[92, 71]} at={[100, 0]} />
                <Pixel src={[88, 67]} at={[100, 1]} />
                <Pixel src={[95, 69]} at={[100, 2]} />
                <Pixel src={[83, 73]} at={[100, 3]} />
                <Pixel src={[78, 70]} at={[101, 1]} />
                <Pixel src={[91, 68]} at={[101, 2]} />
                <Pixel src={[85, 72]} at={[101, 3]} />
                <Pixel src={[99, 66]} at={[99, 4]} />
                <Pixel src={[81, 74]} at={[99, 5]} />
            </PixelLayer>
                </div>
            </div>

            <Reveal>
            <div className="max-w-[1200px] mx-auto">
                <ConstruitSur />
                <header className="text-center mb-14" style={{ marginTop: 64 }}>
                    <div className="font-mono" style={{ fontSize: 12, letterSpacing: '0.22em', color: 'rgba(23,23,23,0.5)' }}>
                        LE SYSTÈME
                    </div>
                    <h2
                        className="font-sans mt-4 mx-auto"
                        style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)', lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', maxWidth: '20ch', ...EMBOSS_DARK }}
                    >
                        Un seul système, de bout en bout.
                    </h2>
                    <p
                        className="font-sans mt-4 mx-auto"
                        style={{ fontSize: 17, lineHeight: '24px', fontWeight: 460, color: TOKENS.mutedText, maxWidth: '54ch' }}
                    >
                        Du choix du modèle au pilotage en production — chaque couche est maîtrisée, branchée à votre entreprise.
                    </p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 18 }}>
                    {CAPS.map((c) => (
                        <CapCard key={c.n} cap={c} />
                    ))}
                </div>
            </div>
            </Reveal>
        </section>
    );
}

// ============================================================================
// SECTION 2 — Method (4 steps, like Cofounder chapters)
// ============================================================================
// ── Roadmap board (méthode) — staged flow of agent/human tasks (cofounder idiom) ─
const RM_CARD_SHADOW =
    '0 0 0 0.67px rgba(0,0,0,0.08), 0 13.4px 13.4px rgba(0,0,0,0.01), 0 4px 6px rgba(0,0,0,0.02), 0 2px 5.4px rgba(0,0,0,0.03), inset 0 0 0 0.67px #FFFFFF';
const RM_TILE_SHADOW =
    'inset 0 0.33px 0.67px rgba(255,255,255,0.4), 0 0.33px 0.4px rgba(0,0,0,0.22), 0 0 1.34px rgba(0,0,0,0.18)';
const RM_PILL_SHADOW =
    '0 0.15px 0 rgba(0,0,0,0.2), 0 0.3px 0.3px #FFFFFF, 0 0 0.6px rgba(0,0,0,0.3), inset 0 0.3px 0.3px rgba(255,255,255,0.6), inset 0 -0.3px 0.3px rgba(0,0,0,0.05)';

type RoadType = 'client' | 'agent' | 'approval';
type RoadTask = { label: string; type: RoadType; icon: LucideIcon };
type RoadStage = { stage: string; sub: string; tasks: RoadTask[] };

const ROADMAP: RoadStage[] = [
    {
        stage: 'I · Cartographier',
        sub: 'Workflows à fort levier',
        tasks: [
            { label: 'Atelier de cadrage', type: 'client', icon: Users },
            { label: 'Cartographie des flux', type: 'agent', icon: MapIcon },
        ],
    },
    {
        stage: 'II · Spécifier',
        sub: "Plan d'architecte · zéro code avant validation",
        tasks: [
            { label: "Plan d'architecte", type: 'agent', icon: Ruler },
            { label: 'Périmètre & garde-fous', type: 'approval', icon: ShieldCheck },
        ],
    },
    {
        stage: 'III · Construire & brancher',
        sub: 'Assemblage + connexion à votre stack',
        tasks: [
            { label: "Assemblage de l'agent", type: 'agent', icon: Boxes },
            { label: 'Connexion MCP · API', type: 'agent', icon: Plug },
        ],
    },
    {
        stage: 'IV · Piloter',
        sub: 'Production + métriques de décision',
        tasks: [
            { label: 'Mise en production', type: 'approval', icon: Rocket },
            { label: 'Métriques de décision', type: 'agent', icon: Gauge },
        ],
    },
];

const ROAD_LABEL: Record<RoadType, string> = {
    client: 'Tâche client',
    agent: 'Tâche agent',
    approval: 'Validation requise',
};

function RoadTaskCard({ task }: { task: RoadTask }) {
    const Icon = task.icon;
    const approval = task.type === 'approval';
    return (
        <div
            className="flex items-center justify-between"
            style={{ height: 44, paddingLeft: 6, paddingRight: 8, borderRadius: 8, background: TOKENS.white, boxShadow: RM_CARD_SHADOW }}
        >
            <div className="flex items-center" style={{ gap: 8, minWidth: 0 }}>
                <span
                    className="inline-flex items-center justify-center shrink-0"
                    style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F2 100%)', boxShadow: RM_TILE_SHADOW }}
                >
                    <Icon size={14} strokeWidth={1.6} color={TOKENS.ink} style={{ opacity: 0.66 }} />
                </span>
                <div className="flex flex-col" style={{ gap: 3, minWidth: 0 }}>
                    <span className="font-sans truncate" style={{ fontSize: 11, fontWeight: 500, color: TOKENS.ink, lineHeight: 1 }}>{task.label}</span>
                    <span className="font-mono inline-flex items-center" style={{ gap: 5, fontSize: 8.5, color: TOKENS.mutedText, lineHeight: 1 }}>
                        {approval && <span style={{ width: 5, height: 5, borderRadius: 999, background: TOKENS.gold, display: 'inline-block' }} />}
                        {ROAD_LABEL[task.type]}
                    </span>
                </div>
            </div>
            <span
                className="inline-flex items-center justify-center shrink-0"
                style={{ width: 16, height: 17, borderRadius: 4, background: 'linear-gradient(180deg, #EBEBE8, #F5F5F2)', boxShadow: 'inset 0 -0.5px 0 rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.24)' }}
            >
                <ArrowRight size={9} color="rgba(32,32,32,0.4)" />
            </span>
        </div>
    );
}

function RoadFlow() {
    return (
        <div className="hidden min-[768px]:flex items-center justify-center" style={{ width: 30, flex: '0 0 auto', alignSelf: 'center' }} aria-hidden="true">
            <svg width="30" height="10" viewBox="0 0 30 10" fill="none">
                <circle cx="2" cy="5" r="1.6" fill={TOKENS.surface} stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />
                <path d="M5 5 H23" stroke="rgba(23,23,23,0.35)" strokeWidth="0.9" strokeDasharray="2 2" strokeLinecap="round" />
                <path d="M22 2.5 L25.5 5 L22 7.5" stroke="rgba(23,23,23,0.35)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}

function RoadStageCol({ st }: { st: RoadStage }) {
    return (
        <div className="flex-1 min-w-0 flex flex-col" style={{ padding: '14px 12px' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                <span
                    className="inline-flex items-center font-mono"
                    style={{ fontSize: 9, color: TOKENS.mutedText, padding: '3px 9px', borderRadius: 999, background: TOKENS.surface, boxShadow: RM_PILL_SHADOW, whiteSpace: 'nowrap' }}
                >
                    {st.stage}
                </span>
                <span className="font-mono" style={{ fontSize: 8, color: TOKENS.mutedText }}>{st.tasks.length}</span>
            </div>
            <span className="font-sans" style={{ fontSize: 10.5, color: TOKENS.mutedText, lineHeight: 1.3, marginBottom: 12, minHeight: 28 }}>{st.sub}</span>
            <div className="flex flex-col" style={{ gap: 10 }}>
                {st.tasks.map((t) => (
                    <RoadTaskCard key={t.label} task={t} />
                ))}
            </div>
        </div>
    );
}

function RoadmapBoard() {
    return (
        <div
            className="relative w-full mx-auto"
            style={{
                maxWidth: 1040,
                borderRadius: 14,
                backgroundColor: '#EAEAE6',
                backgroundImage: 'radial-gradient(rgba(23,23,23,0.08) 0.6px, transparent 0.6px)',
                backgroundSize: '12px 12px',
                boxShadow: '1px 2px 2px #FFFFFF, 1px 4px 5px #FFFFFF',
                padding: 10,
            }}
        >
            <div className="flex flex-col min-[768px]:flex-row min-[768px]:items-stretch" style={{ gap: 8 }}>
                {ROADMAP.map((st, i) => (
                    <Fragment key={st.stage}>
                        <RoadStageCol st={st} />
                        {i < ROADMAP.length - 1 && <RoadFlow />}
                    </Fragment>
                ))}
            </div>
            <div className="pointer-events-none absolute inset-0" style={{ borderRadius: 14, boxShadow: 'inset 2px 3px 4px rgba(152,146,140,0.16)' }} aria-hidden="true" />
        </div>
    );
}

// ============================================================================
// SECTION — Services (full-bleed color blocks, crop marks, line-art)
// Inspired by an "Our services" reference: saturated blocks side-by-side, each
// with corner "+" registration marks, a [ 0N ] mono index, a bold sans title,
// a centered single-stroke illustration, and a bottom description.
// ============================================================================
type ServiceBlock = {
    bg: string;
    fg: string;       // text/line color on this block
    index: string;    // "01"
    title: string;
    body: string;
    visual: React.ReactNode;
};

// — Line-art illustrations (single-stroke, currentColor) —
function IlluOrbital() {
    // Central agent node orchestrating satellites.
    const sats = [0, 1, 2, 3, 4, 5];
    return (
        <svg viewBox="0 0 200 200" width="148" height="148" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
            <circle cx="100" cy="100" r="78" strokeDasharray="2 4" opacity="0.5" />
            {sats.map((i) => {
                const a = (i / sats.length) * Math.PI * 2 - Math.PI / 2;
                const x = 100 + 78 * Math.cos(a);
                const y = 100 + 78 * Math.sin(a);
                return (
                    <g key={i}>
                        <line x1="100" y1="100" x2={x} y2={y} opacity="0.45" />
                        <circle cx={x} cy={y} r="9" fill="none" />
                    </g>
                );
            })}
            <circle cx="100" cy="100" r="16" />
            <circle cx="100" cy="100" r="4" fill="currentColor" stroke="none" />
        </svg>
    );
}

function IlluPipeline() {
    // Row of nodes joined by alternating arcs above/below — a workflow.
    const xs = [24, 64, 104, 144, 184];
    const baseY = 100;
    const arcs = xs.slice(0, -1).map((x, i) => {
        const x2 = xs[i + 1];
        const up = i % 2 === 0;
        const cy = up ? baseY - 46 : baseY + 46;
        return `M ${x} ${baseY} Q ${(x + x2) / 2} ${cy} ${x2} ${baseY}`;
    });
    return (
        <svg viewBox="0 0 208 200" width="170" height="148" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
            {arcs.map((d, i) => (
                <path key={i} d={d} opacity="0.8" />
            ))}
            {xs.map((x, i) => (
                <circle key={i} cx={x} cy={baseY} r="9" fill="none" />
            ))}
        </svg>
    );
}

function IlluLink() {
    // Three interlocking rings — connecting systems.
    return (
        <svg viewBox="0 0 200 200" width="156" height="148" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
            <circle cx="74" cy="86" r="42" />
            <circle cx="126" cy="86" r="42" />
            <circle cx="100" cy="128" r="42" />
        </svg>
    );
}

const SERVICE_BLOCKS: ServiceBlock[] = [
    {
        bg: '#A3E635', // lime
        fg: '#171717',
        index: '01',
        title: 'Conception d\'agents',
        body: 'Architecture multi-agents, sélection et fine-tuning du modèle (ouvert ou privé, hébergeable chez vous), outils et connecteurs métier. Livrable : un agent de production testé et documenté.',
        visual: <IlluOrbital />,
    },
    {
        bg: '#171717', // dark contrast block
        fg: '#F5F5F2',
        index: '02',
        title: 'Automatisation de workflows',
        body: 'Orchestration d\'agents sur vos flux — documents, qualification, reporting, relances — intégrée à vos outils (CRM, ERP, API internes). Les étapes critiques restent sous validation humaine.',
        visual: <IlluPipeline />,
    },
    {
        bg: '#EEC75D', // gold
        fg: '#171717',
        index: '03',
        title: 'Déploiement & pilotage',
        body: 'Mise en production sur votre infra (cloud souverain, on-prem, hybride), monitoring continu, SLA, itérations après go-live. Livrable : agents en production et tableau de bord de supervision.',
        visual: <IlluLink />,
    },
];

function CornerMarks({ color }: { color: string }) {
    const mark: React.CSSProperties = {
        position: 'absolute',
        fontSize: 16,
        lineHeight: 1,
        fontWeight: 300,
        color,
        opacity: 0.55,
        userSelect: 'none',
    };
    return (
        <div aria-hidden="true">
            <span style={{ ...mark, top: 14, left: 16 }}>+</span>
            <span style={{ ...mark, top: 14, right: 16 }}>+</span>
            <span style={{ ...mark, bottom: 14, left: 16 }}>+</span>
            <span style={{ ...mark, bottom: 14, right: 16 }}>+</span>
        </div>
    );
}

export function SectionServices() {
    return (
        <section
            id="section-services"
            className="relative"
            style={{ backgroundColor: TOKENS.surface, paddingBlock: '76px', paddingInline: '32px' }}
            aria-label="Nos services"
        >
            <Reveal>
            <div className="max-w-[1280px] mx-auto">
                <header className="mb-12">
                    <div className="font-mono" style={{ fontSize: 13, letterSpacing: '0.22em', ...EMBOSS_MUTED }}>
                        NOS SERVICES
                    </div>
                    <h2
                        className="font-sans mt-3"
                        style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.05, fontWeight: 500, letterSpacing: '-0.025em', ...EMBOSS_DARK }}
                    >
                        Ce que nous concevons
                    </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 14 }}>
                    {SERVICE_BLOCKS.map((s) => (
                        <article
                            key={s.index}
                            className="relative flex flex-col font-sans"
                            style={{
                                backgroundColor: s.bg,
                                color: s.fg,
                                borderRadius: 14,
                                padding: '40px 32px',
                                minHeight: 560,
                                boxShadow: 'rgba(0,0,0,0.06) 0px 1px 2px, rgba(0,0,0,0.08) 0px 8px 24px',
                            }}
                        >
                            <CornerMarks color={s.fg} />

                            {/* Index */}
                            <div
                                className="text-center font-mono"
                                style={{ fontSize: 13, letterSpacing: '0.15em', opacity: 0.85 }}
                            >
                                [ {s.index} ]
                            </div>

                            {/* Title — testing Geist Mono */}
                            <h3
                                className="text-center font-mono"
                                style={{ fontSize: 'clamp(1.35rem, 1.8vw, 1.7rem)', fontWeight: 500, letterSpacing: '-0.01em', marginTop: 24 }}
                            >
                                {s.title}
                            </h3>

                            {/* Illustration — centered, fills the middle */}
                            <div className="flex-1 flex items-center justify-center" style={{ paddingBlock: 32 }}>
                                {s.visual}
                            </div>

                            {/* Description */}
                            <p
                                className="text-center mx-auto"
                                style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 450, maxWidth: '26ch', opacity: 0.92 }}
                            >
                                {s.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
            </Reveal>
        </section>
    );
}

// ============================================================================
// BEAD SECTION — full-bleed bead image (reused from Hero) + overlaid illustration
// + frosted-glass text panel. A reusable "vision/manifesto" break band.
// ============================================================================
export function BeadSection({
    eyebrow,
    title,
    body,
}: {
    eyebrow: string;
    title: string;
    body?: string;
}) {
    return (
        <section
            className="relative overflow-hidden"
            style={{ minHeight: 560, paddingBlock: '96px', paddingInline: '32px' }}
            aria-label={eyebrow}
        >
            {/* Bead image (same source as the Hero) */}
            <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ backgroundImage: `url(${SOURCE_URL})`, backgroundSize: 'cover', backgroundPosition: 'center 65%' }}
            />
            {/* Legibility scrim */}
            <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, rgba(16,16,16,0.66) 0%, rgba(16,16,16,0.34) 52%, rgba(16,16,16,0.10) 100%)' }}
            />
            {/* Frosted-glass text panel */}
            <Reveal>
                <div className="relative max-w-[1100px] mx-auto flex items-center" style={{ minHeight: 368 }}>
                    <div
                        style={{
                            maxWidth: 540,
                            padding: '34px 36px',
                            borderRadius: 18,
                            background: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(20px) saturate(1.2)',
                            WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
                            border: '1px solid rgba(255,255,255,0.14)',
                        }}
                    >
                        <div className="font-mono" style={{ fontSize: 12, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.72)' }}>
                            {eyebrow}
                        </div>
                        <h2
                            className="font-sans mt-4"
                            style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.75rem)', lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', color: '#FFFFFF', textShadow: '0 2px 16px rgba(0,0,0,0.32)' }}
                        >
                            {title}
                        </h2>
                        {body && (
                            <p
                                className="font-sans mt-5"
                                style={{ fontSize: 17, lineHeight: '26px', fontWeight: 460, color: 'rgba(255,255,255,0.9)', maxWidth: '42ch', textShadow: '0 1px 10px rgba(0,0,0,0.28)' }}
                            >
                                {body}
                            </p>
                        )}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

export function SectionMethod() {
    return (
        <section
            id="section-method"
            className="relative"
            style={{ backgroundColor: TOKENS.white, paddingBlock: '76px', paddingInline: '32px' }}
            aria-label="Notre méthode"
        >
            <Reveal>
            <div className="max-w-[1200px] mx-auto">
                <header className="text-center mb-16">
                    <h2
                        className="font-sans"
                        style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', lineHeight: 1.15, fontWeight: 400, ...EMBOSS_DARK }}
                    >
                        Notre méthode
                    </h2>
                    <p
                        className="font-sans mt-3 max-w-[52ch] mx-auto"
                        style={{ fontSize: '17px', lineHeight: '24px', fontWeight: 460, color: TOKENS.mutedText }}
                    >
                        De l'idée à la production. Comment nous fabriquons des agents qui tiennent — avec vous, dans votre réalité.
                    </p>
                </header>

                <RoadmapBoard />
            </div>
            </Reveal>
        </section>
    );
}

// ============================================================================
// SECTION 3 — Capabilities (alternating text + visual)
// ============================================================================
export function SectionCapabilities() {
    return (
        <section
            id="section-capabilities"
            className="relative"
            style={{ backgroundColor: TOKENS.surface, paddingBlock: '76px', paddingInline: '32px' }}
            aria-label="Capacités"
        >
            <Reveal>
            <div className="max-w-[1100px] mx-auto">
                <header className="text-center mb-14">
                    <div className="font-mono" style={{ fontSize: 13, letterSpacing: '0.22em', ...EMBOSS_MUTED }}>
                        05 — CAPACITÉS MÉTIER
                    </div>
                    <h2
                        className="font-sans mt-3 mx-auto"
                        style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)', lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', maxWidth: '20ch', ...EMBOSS_DARK }}
                    >
                        Chaque agent, une fiche technique.
                    </h2>
                    <p
                        className="font-sans mt-4 mx-auto"
                        style={{ fontSize: '17px', lineHeight: '24px', fontWeight: 460, color: TOKENS.mutedText, maxWidth: '52ch' }}
                    >
                        Instructions, sous-agents, outils branchés, garde-fous, latence — tout est spécifié, mesurable, auditable. Pas de boîte noire.
                    </p>
                </header>

                <div className="flex flex-col items-center gap-5">
                    <div className="relative w-full" style={{ maxWidth: 560, aspectRatio: '4 / 3' }}>
                        <AgentCardStack sel={0} />
                    </div>
                    <span
                        className="font-mono"
                        style={{ fontSize: 10, letterSpacing: '0.18em', color: TOKENS.mutedText, opacity: 0.7 }}
                    >
                        SPÉCIMEN · DÉMONSTRATION DE SAVOIR-FAIRE
                    </span>
                </div>
            </div>
            </Reveal>
        </section>
    );
}

// ============================================================================
// Agent Card — industrial spec-sheet (inspired Exa AI Labs)
// Original text/layout kept identical; outline = rounded rectangle with
// 8 mounting holes (corners + middle of top/bottom + sides) and 4 binding
// notches cut into the long sides.
// ============================================================================
type AgentSpec = { label: string; value: string };
type AgentCardData = {
    id: string;
    bg: string;
    ink: string;
    name: string;
    codename: string;
    type: string;
    specs: AgentSpec[];
    action: string;
};

const AGENT_CARDS: AgentCardData[] = [
    {
        id: 'GTM-001',
        bg: '#d8d8d3',
        ink: '#171717',
        name: 'Leonard',
        type: 'TYPE · AGENT VENTE',
        codename: 'PROSPECTOR',
        specs: [
            { label: 'EXECUTION', value: '24/7' },
            { label: 'SUBAGENTS', value: '03' },
            { label: 'OUTILS', value: '12' },
            { label: 'LATENCE', value: '<2s' },
            { label: 'VALIDATION', value: '01' },
        ],
        action: 'QUALIFIE ET RELANCE LES LEADS ENTRANTS',
    },
    {
        id: 'SUP-002',
        bg: '#71CE45',
        ink: '#0a0a0a',
        name: 'Leonard',
        type: 'TYPE · AGENT SUPPORT',
        codename: 'DISPATCHER',
        specs: [
            { label: 'EXECUTION', value: '24/7' },
            { label: 'SUBAGENTS', value: '04' },
            { label: 'OUTILS', value: '08' },
            { label: 'LATENCE', value: '<1s' },
            { label: 'VALIDATION', value: '00' },
        ],
        action: 'ROUTE ET RÉSOUT LES TICKETS DE NIVEAU 1',
    },
    {
        id: 'OPS-003',
        bg: '#FBFBF8',
        ink: '#171717',
        name: 'Leonard',
        type: 'TYPE · AGENT OPS',
        codename: 'SCHEDULER',
        specs: [
            { label: 'CADENCE', value: '07:00' },
            { label: 'SUBAGENTS', value: '02' },
            { label: 'OUTILS', value: '06' },
            { label: 'MODE', value: 'BATCH' },
            { label: 'VALIDATION', value: '01' },
        ],
        action: 'GÉNÈRE LE RAPPORT OPS HEBDOMADAIRE',
    },
];

// Card text emboss style — "letters pressed INTO the card surface" look:
// dark inner shadow at the top of each glyph + white shine on the bottom rim.
// Used for every text element on the AgentCard.
const CARD_TEXT_EMBOSS: React.CSSProperties = {
    color: 'var(--emboss-color-dark, #555555)',
    filter: 'url(#card-text-emboss)',
};

// Tints for the card icons. ICON_LIGHT = the soft gray used by the QR badge;
// ICON_MED = one shade darker, used by Citizen eye + Oasis so they read a touch
// stronger than the QR.
const ICON_LIGHT = '#9a9a9a';
const ICON_MED = '#7e7e7e';

// Agent logo — Leonard's official "Citizen" icon (globe + eye + sparkle).
// Inlined so it inherits currentColor and runs through the card-text-emboss filter.
const AGENT_LOGO_EYE_SPARKLE_PATH =
    'M118.905 147.896C141.138 147.896 159.162 129.873 159.162 107.64C159.162 85.4064 141.138 67.3828 118.905 67.3828C96.672 67.3828 78.6484 85.4064 78.6484 107.64C78.6484 129.873 96.672 147.896 118.905 147.896ZM131.695 82.6587C129.276 76.1208 120.029 76.1208 117.61 82.6587L113.935 92.5896C113.174 94.6451 111.554 96.2657 109.498 97.0263L99.5674 100.701C93.0295 103.12 93.0295 112.367 99.5674 114.787L109.498 118.461C111.554 119.222 113.174 120.843 113.935 122.898L117.61 132.829C120.029 139.367 129.276 139.367 131.695 132.829L135.37 122.898C136.131 120.843 137.751 119.222 139.807 118.461L149.738 114.787C156.276 112.367 156.276 103.12 149.738 100.701L139.807 97.0263C137.751 96.2657 136.131 94.6451 135.37 92.5896L131.695 82.6587Z';
const AGENT_LOGO_GLOBE_PATH =
    'M117.61 82.6587L124.464 85.1951V85.1951L117.61 82.6587ZM131.695 82.6587L124.841 85.1951V85.1951L131.695 82.6587ZM113.935 92.5896L107.08 90.0532V90.0532L113.935 92.5896ZM109.498 97.0263L112.035 103.881V103.881L109.498 97.0263ZM99.5674 100.701L97.031 93.8466V93.8466L99.5674 100.701ZM99.5674 114.787L97.031 121.641V121.641L99.5674 114.787ZM109.498 118.461L106.962 125.316H106.962L109.498 118.461ZM113.935 122.898L107.08 125.434V125.434L113.935 122.898ZM117.61 132.829L124.464 130.293V130.293L117.61 132.829ZM131.695 132.829L124.841 130.293V130.293L131.695 132.829ZM135.37 122.898L142.225 125.434L142.225 125.434L135.37 122.898ZM139.807 118.461L142.343 125.316H142.343L139.807 118.461ZM149.738 114.787L147.201 107.932V107.932L149.738 114.787ZM149.738 100.701L152.274 93.8466L149.738 100.701ZM139.807 97.0263L142.343 90.1718L142.343 90.1718L139.807 97.0263ZM135.37 92.5896L142.225 90.0532V90.0532L135.37 92.5896ZM106.809 64.4925V71.8013V64.4925ZM162.648 77.979L159.539 84.5935H159.539L162.648 77.979ZM106.809 149.125L106.809 141.816H106.809V149.125ZM51.0429 77.9447L54.1489 84.5607V84.5607L51.0429 77.9447ZM50.9641 135.635L54.0736 129.021H54.0736L50.9641 135.635ZM159.162 107.64H151.853C151.853 125.836 137.102 140.587 118.905 140.587V147.896V155.205C145.175 155.205 166.471 133.909 166.471 107.64H159.162ZM118.905 67.3828V74.6916C137.102 74.6916 151.853 89.4429 151.853 107.64H159.162H166.471C166.471 81.3698 145.175 60.074 118.905 60.074V67.3828ZM78.6484 107.64H85.9572C85.9572 89.4429 100.709 74.6916 118.905 74.6916V67.3828V60.074C92.6355 60.074 71.3396 81.3698 71.3396 107.64H78.6484ZM118.905 147.896V140.587C100.709 140.587 85.9572 125.836 85.9572 107.64H78.6484H71.3396C71.3396 133.909 92.6355 155.205 118.905 155.205V147.896ZM117.61 82.6587L124.464 85.1951C124.501 85.0958 124.528 85.0656 124.523 85.0722C124.519 85.0769 124.51 85.0856 124.502 85.091C124.493 85.0968 124.543 85.0641 124.653 85.0641C124.762 85.0641 124.812 85.0968 124.803 85.091C124.795 85.0856 124.786 85.0769 124.782 85.0722C124.777 85.0656 124.804 85.0958 124.841 85.1951L131.695 82.6587L138.55 80.1222C133.776 67.2212 115.529 67.2213 110.755 80.1222L117.61 82.6587ZM113.935 92.5896L120.79 95.1261L124.464 85.1951L117.61 82.6587L110.755 80.1222L107.08 90.0532L113.935 92.5896ZM109.498 97.0263L112.035 103.881C116.091 102.38 119.289 99.1821 120.79 95.1261L113.935 92.5896L107.08 90.0532C107.06 90.1081 107.017 90.1514 106.962 90.1718L109.498 97.0263ZM99.5674 100.701L102.104 107.556L112.035 103.881L109.498 97.0263L106.962 90.1718L97.031 93.8466L99.5674 100.701ZM99.5674 114.787L102.104 107.932C102.004 107.895 101.974 107.868 101.981 107.873C101.986 107.877 101.994 107.886 102 107.894C102.006 107.903 101.973 107.853 101.973 107.744C101.973 107.634 102.006 107.584 102 107.593C101.994 107.602 101.986 107.611 101.981 107.615C101.974 107.62 102.004 107.592 102.104 107.556L99.5674 100.701L97.031 93.8466C84.1299 98.6204 84.13 116.867 97.031 121.641L99.5674 114.787ZM109.498 118.461L112.035 111.607L102.104 107.932L99.5674 114.787L97.031 121.641L106.962 125.316L109.498 118.461ZM113.935 122.898L120.79 120.362C119.289 116.306 116.091 113.108 112.035 111.607L109.498 118.461L106.962 125.316C107.017 125.336 107.06 125.38 107.08 125.434L113.935 122.898ZM117.61 132.829L124.464 130.293L120.79 120.362L113.935 122.898L107.08 125.434L110.755 135.365L117.61 132.829ZM131.695 132.829L124.841 130.293C124.804 130.392 124.777 130.422 124.782 130.416C124.786 130.411 124.795 130.402 124.803 130.397C124.812 130.391 124.762 130.424 124.653 130.424C124.543 130.424 124.493 130.391 124.502 130.397C124.51 130.402 124.519 130.411 124.523 130.416C124.528 130.422 124.501 130.392 124.464 130.293L117.61 132.829L110.755 135.365C115.529 148.266 133.776 148.266 138.55 135.365L131.695 132.829ZM135.37 122.898L128.516 120.362L124.841 130.293L131.695 132.829L138.55 135.365L142.225 125.434L135.37 122.898ZM139.807 118.461L137.27 111.607C133.214 113.108 130.016 116.306 128.516 120.362L135.37 122.898L142.225 125.434C142.245 125.38 142.288 125.336 142.343 125.316L139.807 118.461ZM149.738 114.787L147.201 107.932L137.27 111.607L139.807 118.461L142.343 125.316L152.274 121.641L149.738 114.787ZM149.738 100.701L147.201 107.556C147.301 107.592 147.331 107.62 147.324 107.615C147.32 107.611 147.311 107.602 147.305 107.593C147.3 107.584 147.332 107.634 147.332 107.744C147.332 107.853 147.3 107.903 147.305 107.894C147.311 107.886 147.32 107.877 147.324 107.873C147.331 107.868 147.301 107.895 147.201 107.932L149.738 114.787L152.274 121.641C165.175 116.867 165.175 98.6204 152.274 93.8466L149.738 100.701ZM139.807 97.0263L137.27 103.881L147.201 107.556L149.738 100.701L152.274 93.8466L142.343 90.1718L139.807 97.0263ZM135.37 92.5896L128.516 95.1261C130.016 99.1821 133.214 102.38 137.27 103.881L139.807 97.0263L142.343 90.1718C142.288 90.1514 142.245 90.1081 142.225 90.0532L135.37 92.5896ZM131.695 82.6587L124.841 85.1951L128.516 95.1261L135.37 92.5896L142.225 90.0532L138.55 80.1222L131.695 82.6587ZM206.309 106.809H199C199 157.724 157.725 198.998 106.809 198.998V206.307V213.616C165.798 213.616 213.618 165.798 213.618 106.809H206.309ZM106.809 206.307V198.998C55.893 198.998 14.6177 157.724 14.6177 106.809H7.30891H0.000114441C0.000114441 165.798 47.8202 213.616 106.809 213.616V206.307ZM7.30891 106.809H14.6177C14.6177 55.8927 55.8933 14.6162 106.809 14.6162V7.30742V-0.00137329C47.82 -0.00137329 0.000114441 47.8199 0.000114441 106.809H7.30891ZM106.809 7.30742V14.6162C157.725 14.6162 199 55.8927 199 106.809H206.309H213.618C213.618 47.8199 165.798 -0.00137329 106.809 -0.00137329V7.30742ZM106.809 64.4925V71.8013C126.115 71.8013 144.256 77.41 159.539 84.5935L162.648 77.979L165.757 71.3645C149.197 63.5806 128.897 57.1838 106.809 57.1838V64.4925ZM162.648 77.979L159.539 84.5935C172.165 90.5286 182.661 97.4551 190.003 102.907C193.666 105.627 196.525 107.965 198.45 109.607C199.412 110.427 200.139 111.072 200.616 111.503C200.854 111.718 201.029 111.879 201.14 111.982C201.195 112.033 201.234 112.069 201.257 112.091C201.268 112.101 201.276 112.108 201.279 112.111C201.28 112.112 201.281 112.113 201.28 112.112C201.28 112.112 201.279 112.112 201.278 112.111C201.278 112.11 201.277 112.11 201.277 112.109C201.276 112.109 201.275 112.108 206.309 106.809C211.343 101.509 211.342 101.508 211.34 101.507C211.34 101.507 211.339 101.506 211.338 101.505C211.336 101.503 211.334 101.501 211.331 101.499C211.327 101.494 211.321 101.489 211.314 101.482C211.3 101.469 211.282 101.452 211.26 101.431C211.215 101.39 211.154 101.332 211.076 101.26C210.92 101.116 210.698 100.912 210.411 100.653C209.838 100.136 209.008 99.3993 207.935 98.4846C205.791 96.656 202.675 94.1095 198.717 91.1706C190.816 85.304 179.481 77.8157 165.757 71.3645L162.648 77.979ZM106.806 7.30742V14.6162C117.001 14.6162 127.228 20.3627 136.116 31.7939C144.989 43.2055 151.985 59.6899 155.451 79.254L162.648 77.979L169.845 76.704C166.066 55.3734 158.309 36.5219 147.656 22.8214C137.019 9.14049 122.948 -0.00137329 106.806 -0.00137329V7.30742ZM206.309 106.809C201.275 101.509 201.276 101.509 201.277 101.508C201.277 101.508 201.278 101.507 201.278 101.506C201.279 101.506 201.28 101.505 201.28 101.505C201.281 101.504 201.28 101.505 201.279 101.506C201.276 101.509 201.268 101.516 201.257 101.527C201.234 101.548 201.195 101.584 201.14 101.636C201.029 101.738 200.854 101.899 200.616 102.114C200.139 102.545 199.412 103.19 198.45 104.01C196.525 105.652 193.666 107.99 190.003 110.711C182.661 116.162 172.165 123.089 159.538 129.024L162.647 135.638L165.757 142.253C179.481 135.802 190.816 128.313 198.717 122.447C202.675 119.508 205.791 116.961 207.935 115.133C209.008 114.218 209.838 113.482 210.411 112.964C210.698 112.706 210.92 112.501 211.076 112.357C211.154 112.285 211.215 112.228 211.26 112.186C211.282 112.165 211.3 112.148 211.314 112.135C211.321 112.128 211.327 112.123 211.331 112.118C211.334 112.116 211.336 112.114 211.338 112.112C211.339 112.111 211.34 112.11 211.34 112.11C211.342 112.109 211.343 112.108 206.309 106.809ZM162.647 135.638L159.538 129.024C144.256 136.207 126.114 141.816 106.809 141.816L106.809 149.125L106.809 156.433C128.897 156.433 149.197 150.037 165.757 142.253L162.647 135.638ZM162.647 135.638L155.451 134.363C151.984 153.927 144.989 170.41 136.116 181.821C127.228 193.252 117.001 198.998 106.806 198.998V206.307V213.616C122.948 213.616 137.018 204.475 147.656 190.794C158.308 177.094 166.065 158.243 169.844 136.914L162.647 135.638ZM7.30891 106.809C12.3426 112.108 12.3416 112.109 12.3408 112.109C12.3406 112.11 12.3398 112.11 12.3394 112.111C12.3386 112.112 12.338 112.112 12.3378 112.112C12.3372 112.113 12.3377 112.112 12.3392 112.111C12.3422 112.108 12.3494 112.101 12.3608 112.091C12.3834 112.069 12.4226 112.033 12.478 111.981C12.5889 111.879 12.7646 111.717 13.0033 111.502C13.4808 111.07 14.2095 110.424 15.1733 109.602C17.1018 107.958 19.9655 105.616 23.6354 102.892C30.99 97.4322 41.5033 90.4975 54.1489 84.5607L51.0429 77.9447L47.9369 71.3288C34.1909 77.7822 22.8372 85.2794 14.9227 91.1544C10.9581 94.0973 7.83676 96.648 5.68877 98.4796C4.6143 99.3958 3.78194 100.133 3.20792 100.652C2.92087 100.911 2.69829 101.115 2.5422 101.26C2.46415 101.332 2.40271 101.389 2.35814 101.431C2.33585 101.452 2.31778 101.469 2.30396 101.482C2.29704 101.489 2.29119 101.494 2.28641 101.499C2.28401 101.501 2.28188 101.503 2.28003 101.505C2.2791 101.506 2.2779 101.507 2.27744 101.507C2.27631 101.508 2.27525 101.509 7.30891 106.809ZM51.0429 77.9447L54.1489 84.5607C69.4169 77.3928 87.5328 71.8013 106.809 71.8013V64.4925V57.1838C84.7543 57.1838 64.4823 63.5611 47.9369 71.3288L51.0429 77.9447ZM106.809 149.125V141.816C87.5008 141.816 69.3569 136.206 54.0736 129.021L50.9641 135.635L47.8547 142.25C64.4154 150.035 84.718 156.433 106.809 156.433V149.125ZM50.9641 135.635L54.0736 129.021C41.4488 123.086 30.9544 116.16 23.6135 110.709C19.9504 107.989 17.0922 105.651 15.1675 104.01C14.2057 103.19 13.4784 102.545 13.0019 102.114C12.7637 101.899 12.5883 101.738 12.4777 101.636C12.4224 101.584 12.3833 101.548 12.3607 101.527C12.3494 101.516 12.3422 101.509 12.3392 101.506C12.3377 101.505 12.3372 101.504 12.3378 101.505C12.338 101.505 12.3386 101.506 12.3394 101.506C12.3398 101.507 12.3406 101.508 12.3408 101.508C12.3416 101.509 12.3426 101.509 7.30891 106.809C2.27525 112.108 2.27631 112.109 2.27744 112.11C2.2779 112.11 2.27909 112.111 2.28002 112.112C2.28188 112.114 2.284 112.116 2.28639 112.118C2.29118 112.123 2.29701 112.128 2.30392 112.135C2.31772 112.148 2.33576 112.165 2.35801 112.186C2.4025 112.228 2.46383 112.285 2.54173 112.357C2.69753 112.501 2.9197 112.705 3.20621 112.964C3.77914 113.481 4.60992 114.218 5.68237 115.132C7.82628 116.961 10.9417 119.507 14.8991 122.445C22.799 128.311 34.1321 135.799 47.8547 142.25L50.9641 135.635ZM106.806 206.307V198.998C96.6112 198.998 86.3837 193.252 77.4956 181.821C68.6227 170.409 61.6269 153.925 58.1608 134.36L50.9641 135.635L43.7674 136.91C47.5464 158.241 55.3031 177.093 65.9558 190.793C76.5931 204.474 90.664 213.616 106.806 213.616V206.307ZM51.0429 77.9447L58.2456 79.1856C61.648 59.4353 68.5878 42.9794 77.4211 31.643C86.2544 20.3065 96.4902 14.6162 106.806 14.6162V7.30742V-0.00137329C90.6296 -0.00137329 76.5385 8.9932 65.8906 22.6585C55.2426 36.3239 47.547 55.1866 43.8402 76.7039L51.0429 77.9447Z';

function AgentLogo({ size }: { size?: number | string }) {
    return (
        <svg
            width={size ?? '100%'}
            height={size ?? '100%'}
            viewBox="0 0 214 214"
            fill="currentColor"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
        >
            <path fillRule="evenodd" clipRule="evenodd" d={AGENT_LOGO_EYE_SPARKLE_PATH} />
            <path d={AGENT_LOGO_GLOBE_PATH} />
        </svg>
    );
}

// Leonard official symbol — pixel LI monogram inside circle + square frame.
// All strokes + fills use currentColor so it inherits text color and the
// card-text-emboss filter works on it.
const LEONARD_SYMBOL_PATH =
    'M63.5531 75.7351H66.5298V78.7118H63.5531V75.7351ZM60.5764 75.7351H63.5531V78.7118H60.5764V75.7351ZM60.5764 78.7118H63.5531V81.6886H60.5764V78.7118ZM66.5298 72.7583H69.5066V75.7351H66.5298V72.7583ZM66.5298 69.7816H69.5066V72.7583H66.5298V69.7816ZM69.5066 69.7816H72.4833V72.7583H69.5066V69.7816ZM69.5066 72.7583H72.4833V75.7351H69.5066V72.7583ZM72.4833 69.7816H75.4601V72.7583H72.4833V69.7816ZM75.4601 72.7583H78.4368V75.7351H75.4601V72.7583ZM72.4833 72.7583H75.4601V75.7351H72.4833V72.7583ZM72.4833 75.7351H75.4601V78.7118H72.4833V75.7351ZM75.4601 75.7351H78.4368V78.7118H75.4601V75.7351ZM75.4601 78.7118H78.4368V81.6886H75.4601V78.7118ZM78.4368 75.7351H81.4136V78.7118H78.4368V75.7351ZM81.4136 75.7351H84.3903V78.7118H81.4136V75.7351ZM81.4136 78.7118H84.3903V81.6886H81.4136V78.7118ZM78.4368 78.7118H81.4136V81.6886H78.4368V78.7118ZM87.3671 81.6886H90.3438V84.6653H87.3671V81.6886ZM84.3903 81.6886H87.3671V84.6653H84.3903V81.6886ZM84.3903 84.6653H87.3671V87.6421H84.3903V84.6653ZM87.3671 84.6653H90.3438V87.6421H87.3671V84.6653ZM87.3671 87.6421H90.3438V90.6188H87.3671V87.6421ZM87.3671 90.6188H90.3438V93.5955H87.3671V90.6188ZM84.3903 90.6188H87.3671V93.5955H84.3903V90.6188ZM84.3903 87.6421H87.3671V90.6188H84.3903V87.6421ZM84.3903 93.5955H87.3671V96.5723H84.3903V93.5955ZM84.3903 96.5723H87.3671V99.549H84.3903V96.5723ZM87.3671 96.5723H90.3438V99.549H87.3671V96.5723ZM87.3671 93.5955H90.3438V96.5723H87.3671V93.5955ZM84.3903 99.549H87.3671V102.526H84.3903V99.549ZM87.3671 99.549H90.3438V102.526H87.3671V99.549ZM87.3671 102.526H90.3438V105.503H87.3671V102.526ZM84.3903 102.526H87.3671V105.503H84.3903V102.526ZM84.3903 105.503H87.3671V108.479H84.3903V105.503ZM84.3903 108.479H87.3671V111.456H84.3903V108.479ZM87.3671 108.479H90.3438V111.456H87.3671V108.479ZM87.3671 105.503H90.3438V108.479H87.3671V105.503ZM102.251 81.6886H105.228V84.6653H102.251V81.6886ZM105.228 81.6886H108.204V84.6653H105.228V81.6886ZM105.228 84.6653H108.204V87.6421H105.228V84.6653ZM105.228 87.6421H108.204V90.6188H105.228V87.6421ZM105.228 90.6188H108.204V93.5955H105.228V90.6188ZM105.228 93.5955H108.204V96.5723H105.228V93.5955ZM105.228 96.5723H108.204V99.549H105.228V96.5723ZM105.228 99.549H108.204V102.526H105.228V99.549ZM105.228 102.526H108.204V105.503H105.228V102.526ZM102.251 102.526H105.228V105.503H102.251V102.526ZM102.251 105.503H105.228V108.479H102.251V105.503ZM102.251 108.479H105.228V111.456H102.251V108.479ZM105.228 108.479H108.204V111.456H105.228V108.479ZM105.228 105.503H108.204V108.479H105.228V105.503ZM102.251 99.549H105.228V102.526H102.251V99.549ZM102.251 84.6653H105.228V87.6421H102.251V84.6653ZM84.3903 123.363H87.3671V126.34H84.3903V123.363ZM84.3903 120.386H87.3671V123.363H84.3903V120.386ZM84.3903 117.409H87.3671V120.386H84.3903V117.409ZM84.3903 114.433H87.3671V117.409H84.3903V114.433ZM87.3671 114.433H90.3438V117.409H87.3671V114.433ZM87.3671 111.456H90.3438V114.433H87.3671V111.456ZM87.3671 117.409H90.3438V120.386H87.3671V117.409ZM87.3671 120.386H90.3438V123.363H87.3671V120.386ZM87.3671 123.363H90.3438V126.34H87.3671V123.363ZM84.3903 111.456H87.3671V114.433H84.3903V111.456ZM102.251 126.34H105.228V129.316H102.251V126.34ZM105.228 126.34H108.204V129.316H105.228V126.34ZM105.228 123.363H108.204V126.34H105.228V123.363ZM105.228 120.386H108.204V123.363H105.228V120.386ZM105.228 117.409H108.204V120.386H105.228V117.409ZM105.228 114.433H108.204V117.409H105.228V114.433ZM105.228 111.456H108.204V114.433H105.228V111.456ZM102.251 111.456H105.228V114.433H102.251V111.456ZM102.251 114.433H105.228V117.409H102.251V114.433ZM102.251 117.409H105.228V120.386H102.251V117.409ZM102.251 120.386H105.228V123.363H102.251V120.386ZM102.251 123.363H105.228V126.34H102.251V123.363ZM63.5531 72.7583H66.5298V75.7351H63.5531V72.7583ZM75.4601 69.7816H78.4368V72.7583H75.4601V69.7816ZM78.4368 72.7583H81.4136V75.7351H78.4368V72.7583ZM87.3671 78.7118H90.3438V81.6886H87.3671V78.7118ZM81.4136 81.6886H84.3903V84.6653H81.4136V81.6886ZM84.3903 78.7118H87.3671V81.6886H84.3903V78.7118ZM78.4368 81.6886H81.4136V84.6653H78.4368V81.6886ZM81.4136 84.6653H84.3903V87.6421H81.4136V84.6653ZM78.4368 69.7816H81.4136V72.7583H78.4368V69.7816ZM81.4136 72.7583H84.3903V75.7351H81.4136V72.7583ZM84.3903 75.7351H87.3671V78.7118H84.3903V75.7351ZM69.5066 75.7351H72.4833V78.7118H69.5066V75.7351ZM72.4833 78.7118H75.4601V81.6886H72.4833V78.7118ZM75.4601 81.6886H78.4368V84.6653H75.4601V81.6886ZM78.4368 84.6653H81.4136V87.6421H78.4368V84.6653ZM81.4136 87.6421H84.3903V90.6188H81.4136V87.6421ZM102.251 129.316H105.228V132.293H102.251V129.316ZM102.251 132.293H105.228V135.27H102.251V132.293ZM105.228 132.293H108.204V135.27H105.228V132.293ZM105.228 135.27H108.204V138.247H105.228V135.27ZM105.228 129.316H108.204V132.293H105.228V129.316ZM102.251 135.27H105.228V138.247H102.251V135.27ZM99.274 135.27H102.251V138.247H99.274V135.27ZM96.2973 135.27H99.274V138.247H96.2973V135.27ZM90.3438 81.6886H93.3205V84.6653H90.3438V81.6886ZM93.3205 81.6886H96.2973V84.6653H93.3205V81.6886ZM93.3205 84.6653H96.2973V87.6421H93.3205V84.6653ZM93.3205 87.6421H96.2973V90.6188H93.3205V87.6421ZM93.3205 90.6188H96.2973V93.5955H93.3205V90.6188ZM93.3205 93.5955H96.2973V96.5723H93.3205V93.5955ZM93.3205 99.549H96.2973V102.526H93.3205V99.549ZM93.3205 105.503H96.2973V108.479H93.3205V105.503ZM93.3205 108.479H96.2973V111.456H93.3205V108.479ZM93.3205 111.456H96.2973V114.433H93.3205V111.456ZM93.3205 114.433H96.2973V117.409H93.3205V114.433ZM93.3205 117.409H96.2973V120.386H93.3205V117.409ZM93.3205 123.363H96.2973V126.34H93.3205V123.363ZM93.3205 120.386H96.2973V123.363H93.3205V120.386ZM93.3205 102.526H96.2973V105.503H93.3205V102.526ZM93.3205 96.5723H96.2973V99.549H93.3205V96.5723ZM90.3438 84.6653H93.3205V87.6421H90.3438V84.6653ZM90.3438 87.6421H93.3205V90.6188H90.3438V87.6421ZM90.3438 90.6188H93.3205V93.5955H90.3438V90.6188ZM90.3438 99.549H93.3205V102.526H90.3438V99.549ZM90.3438 102.526H93.3205V105.503H90.3438V102.526ZM90.3438 105.503H93.3205V108.479H90.3438V105.503ZM90.3438 108.479H93.3205V111.456H90.3438V108.479ZM90.3438 111.456H93.3205V114.433H90.3438V111.456ZM90.3438 114.433H93.3205V117.409H90.3438V114.433ZM90.3438 117.409H93.3205V120.386H90.3438V117.409ZM90.3438 120.386H93.3205V123.363H90.3438V120.386ZM90.3438 123.363H93.3205V126.34H90.3438V123.363ZM90.3438 96.5723H93.3205V99.549H90.3438V96.5723ZM90.3438 93.5955H93.3205V96.5723H90.3438V93.5955ZM102.251 96.5723H105.228V99.549H102.251V96.5723ZM102.251 93.5955H105.228V96.5723H102.251V93.5955ZM102.251 90.6188H105.228V93.5955H102.251V90.6188ZM102.251 87.6421H105.228V90.6188H102.251V87.6421ZM87.3671 135.27H90.3438V138.247H87.3671V135.27ZM90.3438 135.27H93.3205V138.247H90.3438V135.27ZM93.3205 135.27H96.2973V138.247H93.3205V135.27ZM84.3903 132.293H87.3671V135.27H84.3903V132.293ZM87.3671 132.293H90.3438V135.27H87.3671V132.293ZM90.3438 132.293H93.3205V135.27H90.3438V132.293ZM87.3671 138.247H90.3438V141.223H87.3671V138.247ZM87.3671 141.223H90.3438V144.2H87.3671V141.223ZM84.3903 138.247H87.3671V141.223H84.3903V138.247ZM84.3903 135.27H87.3671V138.247H84.3903V135.27ZM93.3205 132.293H96.2973V135.27H93.3205V132.293ZM96.2973 132.293H99.274V135.27H96.2973V132.293ZM99.274 132.293H102.251V135.27H99.274V132.293ZM81.4136 132.293H84.3903V135.27H81.4136V132.293ZM78.4368 132.293H81.4136V135.27H78.4368V132.293ZM78.4368 135.27H81.4136V138.247H78.4368V135.27ZM81.4136 135.27H84.3903V138.247H81.4136V135.27ZM75.4601 138.247H78.4368V141.223H75.4601V138.247ZM72.4833 141.223H75.4601V144.2H72.4833V141.223ZM90.3438 138.247H93.3205V141.223H90.3438V138.247ZM93.3205 138.247H96.2973V141.223H93.3205V138.247ZM93.3205 141.223H96.2973V144.2H93.3205V141.223ZM90.3438 141.223H93.3205V144.2H90.3438V141.223ZM96.2973 138.247H99.274V141.223H96.2973V138.247ZM99.274 138.247H102.251V141.223H99.274V138.247ZM96.2973 141.223H99.274V144.2H96.2973V141.223ZM111.181 138.247H114.158V141.223H111.181V138.247ZM108.204 138.247H111.181V141.223H108.204V138.247ZM111.181 141.223H114.158V144.2H111.181V141.223ZM114.158 141.223H117.134V144.2H114.158V141.223ZM117.134 138.247H120.111V141.223H117.134V138.247ZM114.158 138.247H117.134V141.223H114.158V138.247ZM108.204 132.293H111.181V135.27H108.204V132.293ZM111.181 132.293H114.158V135.27H111.181V132.293ZM114.158 132.293H117.134V135.27H114.158V132.293ZM117.134 132.293H120.111V135.27H117.134V132.293ZM117.134 135.27H120.111V138.247H117.134V135.27ZM114.158 135.27H117.134V138.247H114.158V135.27ZM111.181 135.27H114.158V138.247H111.181V135.27ZM108.204 135.27H111.181V138.247H108.204V135.27ZM120.111 132.293H123.088V135.27H120.111V132.293ZM123.088 132.293H126.065V135.27H123.088V132.293ZM120.111 135.27H123.088V138.247H120.111V135.27ZM126.065 129.316H129.041V132.293H126.065V129.316ZM126.065 126.34H129.041V129.316H126.065V126.34ZM108.204 78.7118H111.181V81.6886H108.204V78.7118ZM111.181 78.7118H114.158V81.6886H111.181V78.7118ZM111.181 75.7351H114.158V78.7118H111.181V75.7351ZM96.2973 78.7118H99.274V81.6886H96.2973V78.7118ZM99.274 78.7118H102.251V81.6886H99.274V78.7118ZM102.251 78.7118H105.228V81.6886H102.251V78.7118ZM93.3205 78.7118H96.2973V81.6886H93.3205V78.7118ZM96.2973 75.7351H99.274V78.7118H96.2973V75.7351ZM99.274 75.7351H102.251V78.7118H99.274V75.7351ZM108.204 81.6886H111.181V84.6653H108.204V81.6886ZM75.4601 135.27H78.4368V138.247H75.4601V135.27ZM72.4833 138.247H75.4601V141.223H72.4833V138.247ZM123.088 129.316H126.065V132.293H123.088V129.316ZM108.204 129.316H111.181V132.293H108.204V129.316ZM81.4136 93.5955H84.3903V96.5723H81.4136V93.5955ZM78.4368 93.5955H81.4136V96.5723H78.4368V93.5955ZM78.4368 96.5723H81.4136V99.549H78.4368V96.5723ZM81.4136 96.5723H84.3903V99.549H81.4136V96.5723ZM81.4136 105.503H84.3903V108.479H81.4136V105.503ZM78.4368 105.503H81.4136V108.479H78.4368V105.503ZM78.4368 108.479H81.4136V111.456H78.4368V108.479ZM81.4136 108.479H84.3903V111.456H81.4136V108.479ZM75.4601 93.5955H78.4368V96.5723H75.4601V93.5955ZM72.4833 93.5955H75.4601V96.5723H72.4833V93.5955ZM72.4833 96.5723H75.4601V99.549H72.4833V96.5723ZM75.4601 96.5723H78.4368V99.549H75.4601V96.5723ZM75.4601 105.503H78.4368V108.479H75.4601V105.503ZM72.4833 105.503H75.4601V108.479H72.4833V105.503ZM72.4833 108.479H75.4601V111.456H72.4833V108.479ZM75.4601 108.479H78.4368V111.456H75.4601V108.479Z';

// Oasis icon — raster-embedded SVG (color baked at #262626), so we can't use
// currentColor. Instead we render it as a CSS mask over a solid background
// color → the icon's alpha defines the shape, the bg color tints it freely.
function OasisIcon({ size = 14, color = ICON_MED }: { size?: number; color?: string }) {
    return (
        <span
            aria-hidden="true"
            style={{
                display: 'block',
                flexShrink: 0,
                width: size,
                height: size,
                backgroundColor: color,
                maskImage: 'url(/assets/logos/oasis-icon.svg)',
                WebkitMaskImage: 'url(/assets/logos/oasis-icon.svg)',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
            }}
        />
    );
}

function LeonardSymbol({ size = 14 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 192 192"
            fill="none"
            aria-hidden="true"
        >
            <circle cx="96" cy="96" r="92.8" stroke="currentColor" strokeWidth="6.4" />
            <rect x="15.0516" y="26.9041" width="161.896" height="161.896" stroke="currentColor" strokeWidth="6.4" />
            <path d={LEONARD_SYMBOL_PATH} fill="currentColor" />
        </svg>
    );
}

// Grain texture for the AgentCard background — tiny SVG of fractal noise,
// embedded as a data URL so no extra HTTP request. Tiles every 200px.
// Sits inside the masked inner div so it's clipped to the card silhouette
// (notches included) and stays inside the card relief.
const CARD_GRAIN_URL =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

function AgentCard({ data, rotate, offsetX, offsetY, z }: { data: AgentCardData; rotate: number; offsetX: number; offsetY: number; z: number }) {
    // Pull notch params from the store so we can align decorative elements (like
    // the horizontal separator) with the top notch position.
    const notchP = useNotchParams();
    // Vitruve illustration params (position + size inside the frame).
    const vitruveP = useVitruveParams();
    // 4 corner registration marks ("+" crosses, like the Services section).
    const cornerMarks = [
        { x: '6.5%', y: '4.5%' }, { x: '93.5%', y: '4.5%' },
        { x: '6.5%', y: '95.5%' }, { x: '93.5%', y: '95.5%' },
    ];
    // NOTE: split into two nested divs because in CSS the rendering order is
    // filter → mask. If both were on the same element, the filter would only
    // see the rectangular alpha and the notch rims would be masked away.
    // By putting the mask on the INNER div, its rendered output already has the
    // notched silhouette; the OUTER div's filter then operates on that alpha
    // and produces rim highlights/shadows along the notch boundaries too.
    return (
        <div
            className="absolute agent-card-fade"
            style={{
                width: '58%',
                aspectRatio: '0.7',
                top: `${offsetY}%`,
                left: `${offsetX}%`,
                transform: `rotate(${rotate}deg)`,
                filter: 'url(#card-relief) drop-shadow(0 2px 4px rgba(0,0,0,0.1)) drop-shadow(0 8px 16px rgba(0,0,0,0.14)) drop-shadow(0 22px 40px rgba(0,0,0,0.18))',
                zIndex: z,
            }}
        >
        <div
            className="relative font-mono w-full h-full"
            style={{
                background: data.bg,
                color: data.ink,
                borderRadius: 10,
                mask: 'url(#agent-card-notches)',
                WebkitMask: 'url(#agent-card-notches)',
                padding: '6% 8%',
                boxSizing: 'border-box',
                // Geist Mono OpenType features:
                //   tnum = tabular figures (number columns align)
                //   zero = slashed zero (tech-document feel)
                //   ss01 = stylistic set 1 (alternate letterforms)
                //   cv11 = character variant 11 (single-story 'a')
                //   calt = contextual alternates
                fontFeatureSettings: "'tnum' 1, 'zero' 1, 'ss01' 1, 'cv11' 1, 'calt' 1",
            }}
        >
            {/* Grain overlay — tiles SVG noise, blended multiply with the card bg.
                Sits at z=0 above the background but below all content. */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: CARD_GRAIN_URL,
                    backgroundSize: '200px 200px',
                    backgroundRepeat: 'repeat',
                    opacity: 0.35,
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                }}
            />

            {/* Separator at top-notch level — vertical pills laid out as a
                dotted line. Each pill is exactly as tall as the notch (so it
                visually rhymes with the notch openings on the sides) and the
                mask clips the pills that fall inside the notch zones. */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: `${(notchP.topCy - notchP.topHeight / 2) * 100}%`,
                    // Bound the wrapper to the space BETWEEN the two notches:
                    // starts at the inner edge of the left notch and ends at
                    // the inner edge of the right notch. With space-evenly
                    // inside, the edge gaps = inter-pill gaps exactly.
                    left: `${notchP.depth * 100}%`,
                    right: `${notchP.depth * 100}%`,
                    height: `${notchP.topHeight * 100}%`,
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'space-evenly',
                    pointerEvents: 'none',
                }}
            >
                {Array.from({ length: 28 }).map((_, i) => (
                    <span
                        key={i}
                        style={{
                            width: 2.5,
                            height: '100%',
                            borderRadius: 999,
                            // Fully transparent — only the inset shadow + outer
                            // highlight carve the pill into the surface. Lets the
                            // grain underneath show through the pill area.
                            background: 'rgba(0, 0, 0, 0)',
                            boxShadow: [
                                // Inner shadow at the top — the carved depth
                                'inset 0 1px 1.5px rgba(0, 0, 0, 0.55)',
                                // Subtle inner bottom highlight — bottom of the carve
                                'inset 0 -0.5px 0 rgba(255, 255, 255, 0.25)',
                                // Outer 1px white highlight just below — surface lip
                                '0 1px 0 rgba(255, 255, 255, 0.5)',
                            ].join(', '),
                            flexShrink: 0,
                        }}
                    />
                ))}
            </div>

            {/* Corner marks — shape driven by the DevTools "Notch" panel toggle. */}
            {notchP.cornerStyle !== 'none' && cornerMarks.map((m, i) => {
                const style = notchP.cornerStyle;
                const common: React.CSSProperties = {
                    position: 'absolute',
                    left: m.x,
                    top: m.y,
                    transform: 'translate(-50%, -50%)',
                };
                // 'cross' = "+" glyph
                if (style === 'cross') {
                    return (
                        <span key={i} style={{ ...common, fontSize: 16, lineHeight: 1, fontWeight: 300, ...CARD_TEXT_EMBOSS }} aria-hidden="true">
                            +
                        </span>
                    );
                }
                // 'screw' = slotted screw head (filled-ish disc + diagonal slot)
                if (style === 'screw') {
                    return (
                        <span key={i} style={{ ...common, display: 'flex', ...CARD_TEXT_EMBOSS }} aria-hidden="true">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                                <circle cx="5.5" cy="5.5" r="4.4" />
                                <line x1="2.6" y1="3.4" x2="8.4" y2="7.6" />
                            </svg>
                        </span>
                    );
                }
                // 'target' = registration target (ring + crosshair), via SVG
                if (style === 'target') {
                    return (
                        <span key={i} style={{ ...common, display: 'flex', ...CARD_TEXT_EMBOSS }} aria-hidden="true">
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1">
                                <circle cx="6.5" cy="6.5" r="4.3" />
                                <line x1="6.5" y1="0.5" x2="6.5" y2="12.5" />
                                <line x1="0.5" y1="6.5" x2="12.5" y2="6.5" />
                            </svg>
                        </span>
                    );
                }
                // 'crosshead' = filled disc with a recessed "+" (Phillips-screw look).
                // Cross lines use the card bg color so they read as carved slots.
                if (style === 'crosshead') {
                    return (
                        <span key={i} style={{ ...common, display: 'flex', ...CARD_TEXT_EMBOSS }} aria-hidden="true">
                            <svg width="12" height="12" viewBox="0 0 12 12">
                                <circle cx="6" cy="6" r="5.4" fill="currentColor" />
                                <line x1="6" y1="3.6" x2="6" y2="8.4" stroke={data.bg} strokeWidth="1.1" strokeLinecap="round" />
                                <line x1="3.6" y1="6" x2="8.4" y2="6" stroke={data.bg} strokeWidth="1.1" strokeLinecap="round" />
                            </svg>
                        </span>
                    );
                }
                // 'bracket' = L-shaped crop mark, oriented toward its corner
                if (style === 'bracket') {
                    const isTop = i < 2;       // marks ordered: TL, TR, BL, BR
                    const isLeft = i % 2 === 0;
                    const sz = 9;
                    const line = '1.2px solid currentColor';
                    return (
                        <span
                            key={i}
                            style={{
                                ...common,
                                width: sz,
                                height: sz,
                                borderTop: isTop ? line : undefined,
                                borderBottom: !isTop ? line : undefined,
                                borderLeft: isLeft ? line : undefined,
                                borderRight: !isLeft ? line : undefined,
                                ...CARD_TEXT_EMBOSS,
                            }}
                            aria-hidden="true"
                        />
                    );
                }
                // 'square' = small bordered square
                if (style === 'square') {
                    const sz = 6;
                    return (
                        <span key={i} style={{ ...common, width: sz, height: sz, border: '1.2px solid currentColor', ...CARD_TEXT_EMBOSS }} aria-hidden="true" />
                    );
                }
                // 'dot' = filled circle, 'ring' = outlined circle
                const sz = 7;
                return (
                    <span
                        key={i}
                        style={{
                            ...common,
                            width: sz,
                            height: sz,
                            borderRadius: 999,
                            background: style === 'dot' ? 'currentColor' : 'transparent',
                            border: style === 'ring' ? '1.2px solid currentColor' : 'none',
                            ...CARD_TEXT_EMBOSS,
                        }}
                        aria-hidden="true"
                    />
                );
            })}

            {/* ────── TOP ZONE (above first notch ≈ top 20%) ──────
                Agent info (left) + Citizen eye symbol (right). Simple flex with
                a fixed symbol size matching the left stack height (LEONARD 7px
                + gap 6 + PROSPECTOR 30px ≈ 43px ≈ symbol size 44). */}
            <div
                className="flex items-center justify-between"
                style={{ ...CARD_TEXT_EMBOSS }}
            >
                {/* LEFT: card header eyebrow + AGENT hero */}
                <div className="flex flex-col" style={{ gap: 8 }}>
                    <div style={{ fontSize: 7, letterSpacing: '0.22em', fontWeight: 500, opacity: 0.85, lineHeight: 1 }}>
                        LEONARD INTELLIGENCE · AGENT ID
                    </div>
                    <div
                        style={{
                            fontFamily: 'var(--font-pixel-line)',
                            fontSize: 30,
                            letterSpacing: '0.02em',
                            lineHeight: 1,
                        }}
                    >
                        AGENT
                    </div>
                    <div style={{ fontSize: 8, letterSpacing: '0.2em', fontWeight: 500, opacity: 0.85, lineHeight: 1 }}>
                        {data.codename}
                    </div>
                </div>

                {/* RIGHT: Citizen eye — lighter-gray tint (keeps the emboss filter
                    inherited from the wrapper, only overrides the color). */}
                <span style={{ color: ICON_MED, display: 'flex' }}>
                    <AgentLogo size={34} />
                </span>
            </div>

            {/* ────── QR badge + technical spec rows on ONE flex row, vertically
                centered between the two notches. The QR is square; the spec column
                stretches to the QR's height (alignSelf: stretch) and distributes its
                rows with space-between, so the stats span exactly the QR — no clip. */}
            <div
                aria-hidden="true"
                className="absolute"
                style={{
                    top: `${((notchP.topCy + notchP.bottomCy) / 2) * 100}%`,
                    left: '8%',
                    right: '8%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7%',
                    ...CARD_TEXT_EMBOSS,
                }}
            >
                <div style={{ width: '27%', aspectRatio: '1 / 1', flexShrink: 0, color: ICON_LIGHT }}>
                    <QrBadge />
                </div>
                <div
                    className="font-mono"
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        fontSize: 9,
                        fontWeight: 450,
                    }}
                >
                    {data.specs.map((s) => (
                        <div key={s.label} className="flex items-baseline" style={{ letterSpacing: '0.04em' }}>
                            <span style={{ opacity: 0.85 }}>{s.label}</span>
                            <span
                                aria-hidden="true"
                                style={{ flex: 1, margin: '0 6px', borderBottom: '1px dotted currentColor', opacity: 0.4, transform: 'translateY(-2px)' }}
                            />
                            <span style={{ fontWeight: 550 }}>{s.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ────── Framed Vitruvian illustration — occupies the whole lower
                zone, from just below the SECOND notch down to above the footer.
                Image positioned at top → only the top portion of the figure is
                visible (rest cut by overflow: hidden). 4-sided engraved frame. */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    // Starts 4% below the bottom notch; ends above the footer.
                    top: `calc(${(notchP.bottomCy + notchP.bottomHeight / 2) * 100}% + 4%)`,
                    bottom: '12%',
                    // Inset to match the card's horizontal padding (8%).
                    left: '8%',
                    right: '8%',
                    overflow: 'hidden',
                    borderRadius: 4,
                    // Full 4-sided engraved frame: 1px dark border all around +
                    // inner-top dark shadow (depth) + outer-bottom white highlight.
                    border: '1px solid rgba(0, 0, 0, 0.22)',
                    boxShadow: [
                        'inset 0 1px 1px rgba(0, 0, 0, 0.12)',     // inner top shadow (carved depth)
                        'inset 0 -1px 0 rgba(255, 255, 255, 0.4)', // inner bottom highlight
                        '0 1px 0 rgba(255, 255, 255, 0.5)',        // outer bottom lip
                    ].join(', '),
                    pointerEvents: 'none',
                }}
            >
                <img
                    src="/assets/illustrations/hand-sync.svg"
                    alt=""
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        // Position + size driven by the DevTools "Illu" panel.
                        top: `${vitruveP.top}%`,
                        left: `${vitruveP.left}%`,
                        transform: 'translateX(-50%)',
                        width: `${vitruveP.width}%`,
                        height: 'auto',
                        // Override Tailwind preflight's `img { max-width: 100% }`,
                        // otherwise width > 100% is capped and zoom does nothing.
                        maxWidth: 'none',
                        mixBlendMode: 'multiply',
                        opacity: vitruveP.opacity,
                        filter: 'sepia(0.4) saturate(0.55) hue-rotate(-8deg) brightness(1.05) contrast(0.9)',
                    }}
                />
            </div>

            {/* ────── BOTTOM FOOTER — two blocks in ONE flex row (justify-between)
                so they can never overlap regardless of label length. ────── */}
            <div
                className="absolute"
                style={{
                    left: '8%',
                    right: '8%',
                    bottom: '4.5%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '6%',
                    fontSize: 9,
                    fontWeight: 500,
                    lineHeight: 1.45,
                    letterSpacing: '0.04em',
                    ...CARD_TEXT_EMBOSS,
                }}
            >
                <div className="flex items-center" style={{ gap: 9 }}>
                    <LeonardSymbol size={24} />
                    <span style={{ whiteSpace: 'nowrap' }}>
                        LEONARD INTELLIGENCE<br />
                        AGENT DE PRODUCTION
                    </span>
                </div>
                <div className="flex items-center" style={{ gap: 9 }}>
                    <OasisIcon size={24} />
                    <span style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                        SPÉCIMEN<br />
                        GTM-001
                    </span>
                </div>
            </div>
        </div>
        </div>
    );
}

function AgentCardStack({ sel }: { sel: number }) {
    // Notches with BOTH inner AND outer corners rounded, built as a single
    // SVG <path> per notch+side. All geometry params live in the shared store
    // so the DevTools "Notch" panel can drive them live.
    const p = useNotchParams();
    const NOTCHES = [
        { cy: p.topCy, height: p.topHeight },
        { cy: p.bottomCy, height: p.bottomHeight },
    ];
    const DEPTH = p.depth;
    const INNER_R = p.innerR;
    const OUTER_R = p.outerR;
    const ASPECT = 0.7;      // card aspect (W/H) → ry_bbox = rx_bbox * ASPECT for pixel circles

    const notchPath = (cy: number, height: number, side: 'L' | 'R'): string => {
        const yT = cy - height / 2;
        const yB = cy + height / 2;
        const rxO = OUTER_R, ryO = OUTER_R * ASPECT;
        const rxI = INNER_R, ryI = INNER_R * ASPECT;
        if (side === 'R') {
            const xE = 1;          // edge x
            const xI = 1 - DEPTH;  // inner wall x
            return [
                `M ${xE} ${yT - ryO}`,                           // start on edge, above cut
                `A ${rxO} ${ryO} 0 0 1 ${xE - rxO} ${yT}`,       // outer-top concave arc (CW)
                `L ${xI + rxI} ${yT}`,                           // top edge of cut
                `A ${rxI} ${ryI} 0 0 0 ${xI} ${yT + ryI}`,       // inner-top convex arc (CCW)
                `L ${xI} ${yB - ryI}`,                           // inner wall
                `A ${rxI} ${ryI} 0 0 0 ${xI + rxI} ${yB}`,       // inner-bottom convex arc (CCW)
                `L ${xE - rxO} ${yB}`,                           // bottom edge of cut
                `A ${rxO} ${ryO} 0 0 1 ${xE} ${yB + ryO}`,       // outer-bottom concave arc (CW)
                `Z`,                                             // close along card edge
            ].join(' ');
        } else {
            const xE = 0;
            const xI = DEPTH;
            return [
                `M ${xE} ${yT - ryO}`,
                `A ${rxO} ${ryO} 0 0 0 ${xE + rxO} ${yT}`,       // outer-top (CCW for left)
                `L ${xI - rxI} ${yT}`,
                `A ${rxI} ${ryI} 0 0 1 ${xI} ${yT + ryI}`,       // inner-top (CW for left)
                `L ${xI} ${yB - ryI}`,
                `A ${rxI} ${ryI} 0 0 1 ${xI - rxI} ${yB}`,       // inner-bottom (CW)
                `L ${xE + rxO} ${yB}`,
                `A ${rxO} ${ryO} 0 0 0 ${xE} ${yB + ryO}`,       // outer-bottom (CCW)
                `Z`,
            ].join(' ');
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                <defs>
                    <mask
                        id="agent-card-notches"
                        maskUnits="objectBoundingBox"
                        maskContentUnits="objectBoundingBox"
                        x="0"
                        y="0"
                        width="1"
                        height="1"
                    >
                        <rect x="0" y="0" width="1" height="1" fill="white" rx="0.025" ry="0.025" />
                        {NOTCHES.flatMap(({ cy, height }) => [
                            <path key={`l-${cy}`} d={notchPath(cy, height, 'L')} fill="black" />,
                            <path key={`r-${cy}`} d={notchPath(cy, height, 'R')} fill="black" />,
                        ])}
                    </mask>

                    {/* Text "embossed/debossed into the card" filter — applied to
                        every text on the agent card. Two combined effects:
                          1. INNER SHADOW: dark pixels at the TOP INSIDE of each
                             letter → the letter looks carved INTO the surface.
                          2. BOTTOM-OUTER HIGHLIGHT: a 1px white rim just BELOW
                             each letter (in the surface around) → simulates the
                             card surface catching light at the lower lip of the carve.
                    */}
                    <filter id="card-text-emboss" x="-50%" y="-50%" width="200%" height="200%">
                        {/* 1. Inner shadow (top inside of letters) */}
                        <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" result="emBlur" />
                        <feOffset in="emBlur" dx="0" dy="1.2" result="emOffset" />
                        <feComposite in="SourceAlpha" in2="emOffset" operator="arithmetic" k2="1" k3="-1" result="emInsideMask" />
                        <feFlood floodColor="#000000" floodOpacity="0.65" result="emShadowColor" />
                        <feComposite in="emShadowColor" in2="emInsideMask" operator="in" result="emInnerShadow" />

                        {/* 2. Outer highlight — soft white drop-shadow BELOW each letter
                            (like a glow that fades out instead of a hard 1px line).
                            Trick: blur the alpha → offset down → keep only the part
                            OUTSIDE the letter via composite "out" with SourceAlpha. */}
                        <feGaussianBlur in="SourceAlpha" stdDeviation="0.4" result="emHaloBlur" />
                        <feOffset in="emHaloBlur" dx="0" dy="0.9" result="emHaloOffset" />
                        <feComposite in="emHaloOffset" in2="SourceAlpha" operator="out" result="emHaloMasked" />
                        <feFlood floodColor="#ffffff" floodOpacity="1" result="emHighlightColor" />
                        <feComposite in="emHighlightColor" in2="emHaloMasked" operator="in" result="emBottomHighlight" />

                        {/* Compose: source (bottom) → inner shadow (overlays top of letter)
                            → outer highlight (renders OUTSIDE the letter, below — so the
                            stack order doesn't even matter since shapes don't overlap) */}
                        <feMerge>
                            <feMergeNode in="emBottomHighlight" />
                            <feMergeNode in="SourceGraphic" />
                            <feMergeNode in="emInnerShadow" />
                        </feMerge>
                    </filter>

                    {/* Relief filter — alpha-based rim lights/shadows that follow
                        the masked silhouette (so the notches get the same treatment
                        as the outer card edges). Soft 1.2–1.5px lines:
                          - TOP highlight (white) at edges that face UP (outer top + notch lower rim)
                          - BOTTOM shadow (dark) at edges that face DOWN (outer bottom + notch upper rim)
                    */}
                    <filter id="card-relief" x="-2%" y="-2%" width="104%" height="104%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="0.35" result="blurAlpha" />

                        {/* White highlight on UP-facing edges */}
                        <feOffset in="blurAlpha" dx="0" dy="1.4" result="downShift" />
                        <feComposite in="SourceAlpha" in2="downShift" operator="out" result="topEdges" />
                        <feFlood floodColor="#ffffff" floodOpacity="0.95" result="whiteFlood" />
                        <feComposite in="whiteFlood" in2="topEdges" operator="in" result="topHighlight" />

                        {/* Dark shadow on DOWN-facing edges */}
                        <feOffset in="blurAlpha" dx="0" dy="-1" result="upShift" />
                        <feComposite in="SourceAlpha" in2="upShift" operator="out" result="bottomEdges" />
                        <feFlood floodColor="#000000" floodOpacity="0.18" result="darkFlood" />
                        <feComposite in="darkFlood" in2="bottomEdges" operator="in" result="bottomShadow" />

                        {/* Compose: original + highlight + shadow */}
                        <feMerge>
                            <feMergeNode in="SourceGraphic" />
                            <feMergeNode in="topHighlight" />
                            <feMergeNode in="bottomShadow" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>
            <AgentCard key={sel} data={AGENT_CARDS[sel]} rotate={0} offsetX={21} offsetY={5} z={1} />
        </div>
    );
}

// ============================================================================
// Agent Template — mocked configuration card (Name + Instructions + Subagents)
// ============================================================================
export function AgentTemplate() {
    return (
        <div
            className="absolute inset-4 p-5 rounded-md flex flex-col gap-4 font-sans"
            style={{ backgroundColor: TOKENS.pale, boxShadow: RELIEF_LIGHT }}
        >
            <div className="flex items-center gap-2">
                <span style={{ fontSize: 11, color: TOKENS.mutedText, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Agent Template
                </span>
                <span
                    className="px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: TOKENS.lime, color: TOKENS.ink, fontSize: 10, fontWeight: 500 }}
                >
                    Active
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <label style={{ fontSize: 11, color: TOKENS.mutedText, fontWeight: 460 }}>Name</label>
                <div
                    className="px-3 py-2 rounded-md"
                    style={{
                        backgroundColor: TOKENS.white,
                        boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 0.5px, rgba(0,0,0,0.02) 0px 1px 2px inset',
                        fontSize: 14,
                        color: TOKENS.ink,
                    }}
                >
                    GTM Lead
                </div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <label style={{ fontSize: 11, color: TOKENS.mutedText, fontWeight: 460 }}>Custom instructions</label>
                <div
                    className="px-3 py-2 rounded-md flex-1"
                    style={{
                        backgroundColor: TOKENS.white,
                        boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 0.5px, rgba(0,0,0,0.02) 0px 1px 2px inset',
                        fontSize: 13,
                        color: TOKENS.mutedText,
                        lineHeight: '1.5',
                    }}
                >
                    Tu prospectes les ICP SaaS B2B, tu cherches les signaux d'achat sur LinkedIn, tu prépares un cold email personnalisé par lead. Ne jamais envoyer sans validation.
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label style={{ fontSize: 11, color: TOKENS.mutedText, fontWeight: 460 }}>Subagents</label>
                <div className="flex gap-2 flex-wrap">
                    {['Research', 'Copywriter', 'Execution'].map((s) => (
                        <span
                            key={s}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                            style={{
                                backgroundColor: TOKENS.surface,
                                boxShadow: RELIEF_LIGHT,
                                fontSize: 11,
                                color: TOKENS.ink,
                                fontWeight: 460,
                            }}
                        >
                            <span style={{ width: 5, height: 5, borderRadius: 999, background: TOKENS.lime }} aria-hidden="true" />
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// SECTION 4 — Final CTA
// ============================================================================
export function SectionCTA() {
    return (
        <section
            id="section-cta"
            className="relative"
            style={{ backgroundColor: TOKENS.white, paddingBlock: '76px', paddingInline: '32px' }}
            aria-label="Démarrer un projet"
        >
            <Reveal>
            <div className="max-w-[800px] mx-auto text-center">
                <h2
                    className="font-sans"
                    style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)', lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', ...EMBOSS_DARK }}
                >
                    30 minutes pour savoir où un agent vous fait gagner du temps.
                </h2>
                <p
                    className="font-sans mt-5 mx-auto"
                    style={{ fontSize: '17px', lineHeight: '24px', fontWeight: 460, color: TOKENS.mutedText, maxWidth: '48ch' }}
                >
                    On cartographie vos workflows à fort levier. À l'issue : un diagnostic écrit des 2-3 processus où un agent de production aurait le plus d'impact, et une estimation de faisabilité. Sans engagement.
                </p>
                <dl
                    className="font-mono mx-auto mt-8 text-left"
                    style={{ maxWidth: 360, padding: '20px 24px', borderRadius: 12, backgroundColor: TOKENS.pale, boxShadow: CARD_SHADOW, fontSize: 13, lineHeight: 1.9 }}
                >
                    {[
                        ['DURÉE', '30:00'],
                        ['FORMAT', 'APPEL VISIO'],
                        ['LIVRABLE', 'DIAGNOSTIC_WORKFLOWS.PDF'],
                        ['ENGAGEMENT', 'AUCUN'],
                    ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4">
                            <dt style={{ color: TOKENS.mutedText, letterSpacing: '0.08em' }}>{k}</dt>
                            <dd style={{ color: TOKENS.ink }}>{v}</dd>
                        </div>
                    ))}
                </dl>
                <div className="mt-10 flex flex-wrap justify-center items-center gap-3">
                    <ReliefButton tone="lime" size="md" href="#contact" id="contact" iconRight={<ArrowRight />}>
                        Réserver la cartographie
                    </ReliefButton>
                </div>
            </div>
            </Reveal>
        </section>
    );
}

// ============================================================================
// SECTION 5 — Footer
// ============================================================================
export function FooterV2() {
    return (
        <footer
            className="relative"
            style={{ backgroundColor: TOKENS.surface, paddingBlock: '60px', paddingInline: '32px' }}
        >
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="flex flex-col gap-6">
                    <img
                        src="/assets/logos/leonard-logo-black.png"
                        alt="Leonard Intelligence"
                        className="h-7 w-auto object-contain"
                    />
                    <p
                        className="font-sans"
                        style={{ fontSize: '15px', lineHeight: '22px', fontWeight: 460, color: TOKENS.mutedText, maxWidth: '40ch' }}
                    >
                        Agence agentique. Nous concevons, déployons et pilotons les agents IA de production — sur-mesure, branchés à vos systèmes.
                    </p>

                    <nav className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                        {['Méthode', 'Services', 'Mentions légales', 'Contact'].map((l) => (
                            <a
                                key={l}
                                href="#"
                                className="hover:underline"
                                style={{ fontSize: '14px', color: TOKENS.ink, fontWeight: 460 }}
                            >
                                {l}
                            </a>
                        ))}
                    </nav>

                    <a
                        href="mailto:guillaume3301@proton.me"
                        className="font-mono hover:underline"
                        style={{ fontSize: '13px', color: TOKENS.mutedText, letterSpacing: '0.02em' }}
                    >
                        guillaume3301@proton.me
                    </a>
                </div>

                <div className="flex justify-end">
                    <div
                        className="p-6 max-w-[380px] w-full"
                        style={{
                            backgroundColor: TOKENS.pale,
                            borderRadius: '7.142px',
                            boxShadow: CARD_SHADOW,
                        }}
                    >
                        <p
                            className="font-sans"
                            style={{ fontSize: '16px', lineHeight: '22.4px', fontWeight: 460, color: TOKENS.ink }}
                        >
                            Leonard Intelligence est une agence agentique
                            <span style={{ color: TOKENS.mutedText }}> dédiée aux opérations des entreprises.</span>
                        </p>
                        <ReliefButton tone="dark" size="sm" href="#contact" className="mt-5" iconRight={<ArrowRight />}>
                            Discutons
                        </ReliefButton>
                    </div>
                </div>
            </div>

            <div
                className="max-w-[1200px] mx-auto mt-16 pt-6 relative flex flex-wrap justify-between items-center gap-3"
                style={{ borderTop: `1px solid ${TOKENS.border}` }}
            >
                {/* repères de coin */}
                <span aria-hidden="true" style={{ position: 'absolute', left: 0, bottom: -4, width: 10, height: 10, borderLeft: `1px solid ${TOKENS.border}`, borderBottom: `1px solid ${TOKENS.border}` }} />
                <span aria-hidden="true" style={{ position: 'absolute', right: 0, bottom: -4, width: 10, height: 10, borderRight: `1px solid ${TOKENS.border}`, borderBottom: `1px solid ${TOKENS.border}` }} />

                <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: TOKENS.mutedText }}>
                    © {new Date().getFullYear()} LEONARD INTELLIGENCE · BUILD v2 · PARIS, FRANCE
                </span>
                <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.04em', color: TOKENS.mutedText }}>
                    Construit en France 🇫🇷
                </span>
            </div>
        </footer>
    );
}
