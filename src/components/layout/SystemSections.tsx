// Layer sections — "Un seul système connecté" broken into one section per layer.
// Each layer = its own section with a distinct single-stroke illustration + accent.
// Layer 05 (Capacités métier) is the existing SectionCapabilities (Agent ID card).
import { useInViewReveal } from '../../hooks/useInViewReveal';
import { TOKENS, EMBOSS_DARK, CARD_SHADOW } from './Sections';
import { SOURCE_URL } from '../pixels/BeadPxContext';
import { IlluModelField } from './illustrations/IlluModelField';
import { IlluHarness } from './illustrations/IlluHarness';
import { IlluHarnessTrace } from './illustrations/IlluHarnessTrace';
import { IlluConnect } from './illustrations/IlluConnect';
import { IlluCompound } from './illustrations/IlluCompound';
import { IlluSurfaces } from './illustrations/IlluSurfaces';
import { IlluSecurity } from './illustrations/IlluSecurity';

function Reveal({ children }: { children: React.ReactNode }) {
    const { ref, shown } = useInViewReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'none' : 'translateY(14px)',
                transition: 'opacity 700ms cubic-bezier(0.25,0,0.15,1), transform 700ms cubic-bezier(0.25,0,0.15,1)',
            }}
        >
            {children}
        </div>
    );
}

// ── Shared scaffold ─────────────────────────────────────────────────────────
type LayerProps = {
    id: string;
    eyebrow: string;
    title: string;
    lead: string;
    points: string[];
    accent: string;
    bg: string;
    flip?: boolean;
    wide?: boolean;
    /** Render the visual without the white card panel (flat on the section bg). */
    barePanel?: boolean;
    visual: React.ReactNode;
    /** Optional full-width block rendered under the text/visual grid. */
    below?: React.ReactNode;
};

function LayerSection({ id, eyebrow, title, lead, points, accent, bg, flip, wide, barePanel, visual, below }: LayerProps) {
    const panelBg = bg === TOKENS.white ? TOKENS.surface : TOKENS.white;

    const heading = (
        <>
            <h2
                className="font-sans"
                style={{
                    fontSize: 'clamp(1.6rem, 2.7vw, 2.25rem)',
                    lineHeight: 1.12,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    maxWidth: '18ch',
                    ...EMBOSS_DARK,
                }}
            >
                {title}
            </h2>
        </>
    );

    const body = (
        <>
            <p
                className="font-sans"
                style={{ fontSize: 17, lineHeight: '26px', fontWeight: 460, color: TOKENS.mutedText, maxWidth: '46ch' }}
            >
                {lead}
            </p>
            <ul className="mt-7 flex flex-col gap-2.5">
                {points.map((p) => (
                    <li
                        key={p}
                        className="font-mono flex items-start gap-3"
                        style={{ fontSize: 13, lineHeight: '18px', color: TOKENS.mutedText }}
                    >
                        <span aria-hidden="true" style={{ color: accent === TOKENS.ink ? TOKENS.ink : accent, opacity: 0.9 }}>→</span>
                        <span>{p}</span>
                    </li>
                ))}
            </ul>
        </>
    );

    const visualPanel = (
        <div
            className="flex items-center justify-center"
            style={{
                borderRadius: 16,
                border: `1px solid ${TOKENS.border}`,
                backgroundColor: panelBg,
                boxShadow: CARD_SHADOW,
                minHeight: wide ? 440 : 360,
                padding: wide ? 32 : 28,
            }}
        >
            {visual}
        </div>
    );

    return (
        <section
            id={id}
            className="relative"
            style={{ backgroundColor: bg, paddingBlock: '88px', paddingInline: '32px' }}
            aria-label={eyebrow}
        >
            <Reveal>
                {wide ? (
                    <div className="max-w-[1240px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-end mb-10">
                            <div>{heading}</div>
                            <div>{body}</div>
                        </div>
                        {barePanel ? visual : visualPanel}
                        {below && <div style={{ marginTop: 28 }}>{below}</div>}
                    </div>
                ) : (
                    <div className="max-w-[1100px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <div className={flip ? 'md:order-2' : ''}>
                                {heading}
                                <div className="mt-5">{body}</div>
                            </div>
                            <div className={flip ? 'md:order-1' : ''}>{barePanel ? visual : visualPanel}</div>
                        </div>
                        {below && <div style={{ marginTop: 28 }}>{below}</div>}
                    </div>
                )}
            </Reveal>
        </section>
    );
}

// ── Layer sections ───────────────────────────────────────────────────────────
export function LayerModeles() {
    return (
        <LayerSection
            id="section-modeles"
            eyebrow="GRANDS MODÈLES DE LANGAGE"
            title="À chaque solution, son modèle."
            lead="Claude, GPT, Mistral ou open-weight hébergé chez vous : chaque tâche a son optimum. Nous arbitrons précision, coût, latence et confidentialité, et nous remplaçons un modèle dès qu'un meilleur existe."
            points={['Frontier ou open-weight, par tâche', 'Hébergeable dans votre périmètre', 'Remplaçable sans réécrire le système']}
            accent={TOKENS.lime}
            bg={TOKENS.paper}
            barePanel
            visual={<IlluModelField />}
        />
    );
}

export function LayerHarnais() {
    return (
        <LayerSection
            id="section-harnais"
            eyebrow="ÉCOSYSTÈME AGENTIQUE"
            title="Un écosystème qui crée de la valeur."
            lead="Nous construisons un véritable écosystème agentique adapté à votre entreprise : des agents équipés de compétences et d'outils pour accomplir un maximum de tâches en autonomie et apporter de la valeur réelle, mesurable, chaque jour."
            points={['Compétences & outils adaptés à votre métier', 'Un maximum de tâches en autonomie', 'De la valeur réelle, mesurable']}
            accent={TOKENS.ink}
            bg={TOKENS.white}
            flip
            barePanel
            visual={
                /* Un seul cadre parent : le schéma rond en haut, la trace d'exécution
                   compacte en dessous, posée sur la surface (style « Demande #2481 ») */
                <div
                    className="w-full"
                    style={{
                        borderRadius: 16,
                        border: `1px solid ${TOKENS.border}`,
                        backgroundColor: TOKENS.surface,
                        boxShadow: CARD_SHADOW,
                        padding: 5,
                    }}
                >
                    {/* le schéma garde son air via son propre padding */}
                    <div className="flex justify-center" style={{ padding: 'clamp(14px, 2.2vw, 22px) clamp(14px, 2.2vw, 22px) 0' }}>
                        <IlluHarness accent={TOKENS.ink} />
                    </div>
                    {/* la trace colle aux bords du parent à 5px */}
                    <div style={{ marginTop: 5 }}>
                        <IlluHarnessTrace accent={TOKENS.ink} />
                    </div>
                </div>
            }
        />
    );
}

export function LayerDonnees() {
    return (
        <LayerSection
            id="section-donnees"
            eyebrow="DONNÉES & INTÉGRATIONS"
            title="Toutes vos sources, un seul environnement."
            lead="Base de données, chatbot de votre site, WhatsApp, e-mails, Discord : nous canalisons toutes vos sources vers un même environnement, standardisé. Les flux arrivent dans tous les formats, ils ressortent unifiés, prêts à nourrir vos agents."
            points={['Toutes les sources pertinentes, sans exception', 'Centralisées dans un environnement standardisé', "Des données unifiées, prêtes à l'emploi"]}
            accent={TOKENS.gold}
            bg={TOKENS.surface}
            visual={<IlluConnect accent={TOKENS.gold} />}
        />
    );
}

export function LayerContexte() {
    return (
        <LayerSection
            id="section-contexte"
            eyebrow="CONTEXTE & CONNAISSANCE"
            title="Capitalisez sur votre savoir. Il travaille pour vous."
            lead="Chaque échange, chaque décision, chaque dossier nourrit la mémoire de vos agents. L'information ne s'évapore plus : elle se capitalise, et chaque nouvelle tâche démarre avec tout l'historique. Vous gagnez en productivité à chaque itération."
            points={['Aucune information perdue', 'Une mémoire qui se capitalise', "De la productivité qui s'accumule"]}
            accent={TOKENS.forest}
            bg={TOKENS.white}
            flip
            visual={<IlluCompound accent={TOKENS.forest} />}
        />
    );
}

export function LayerProduits() {
    return (
        <LayerSection
            id="section-produits"
            eyebrow="PRODUITS & INTERFACES"
            title="Votre dashboard, cousu main."
            lead="Nous construisons votre tableau de bord sur mesure : exactement les fonctionnalités dont vous avez besoin, et nous en ajoutons à la demande. Spécialistes des interfaces agentiques, nous concevons la meilleure expérience entre vous et vos agents, sans jamais vous plonger dans la technique."
            points={['Sur mesure pour vos workflows', 'Nouvelles fonctionnalités à la demande', 'Toute la puissance, zéro technique']}
            accent={TOKENS.lime}
            bg={TOKENS.white}
            wide
            barePanel
            visual={
                /* Cadre fond bead contenant la fenêtre flottante — même idiome que la carte Agent ID */
                <div
                    className="relative overflow-hidden w-full"
                    style={{
                        borderRadius: 22,
                        boxShadow: '0 20px 48px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.12)',
                        padding: 'clamp(20px, 4.5vw, 56px)',
                    }}
                >
                    {/* fond bead (même source que le héro, cadrage ciel) */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{ backgroundImage: `url(${SOURCE_URL})`, backgroundSize: 'cover', backgroundPosition: 'center 22%' }}
                    />
                    <div className="relative">
                        <IlluSurfaces accent={TOKENS.lime} onImage />
                    </div>
                </div>
            }
        />
    );
}

export function LayerSecurite() {
    return (
        <LayerSection
            id="section-securite"
            eyebrow="AUTONOMIE CONTRÔLÉE"
            title="Le bon curseur entre autonomie et contrôle."
            lead="Nous construisons des systèmes au bon rapport autonomie-contrôle : assez d'autonomie pour aller chercher les meilleurs résultats, assez de contrôle pour protéger les systèmes critiques de votre entreprise. Chaque geste est journalisé, les actions sensibles attendent une validation humaine."
            points={['Le bon curseur autonomie / contrôle', 'Actions sensibles validées par un humain', 'Vos systèmes critiques protégés']}
            accent={TOKENS.ink}
            bg={TOKENS.surface}
            flip
            visual={<IlluSecurity accent={TOKENS.ink} />}
        />
    );
}
