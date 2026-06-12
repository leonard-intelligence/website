// Layer sections — "Un seul système connecté" broken into one section per layer.
// Each layer = its own section with a distinct single-stroke illustration + accent.
// Layer 05 (Capacités métier) is the existing SectionCapabilities (Agent ID card).
import { useInViewReveal } from '../../hooks/useInViewReveal';
import { TOKENS, EMBOSS_DARK, EMBOSS_MUTED, CARD_SHADOW } from './Sections';
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
    index: string;
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

function LayerSection({ id, index, eyebrow, title, lead, points, accent, bg, flip, wide, barePanel, visual, below }: LayerProps) {
    const panelBg = bg === TOKENS.white ? TOKENS.surface : TOKENS.white;

    const heading = (
        <>
            <div className="font-mono" style={{ fontSize: 13, letterSpacing: '0.22em', ...EMBOSS_MUTED }}>
                {index} · {eyebrow}
            </div>
            <h2
                className="font-sans mt-4"
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
            index="01"
            eyebrow="GRANDS MODÈLES DE LANGAGE"
            title="Jamais un modèle par défaut."
            lead="Claude, GPT, Mistral ou open-weight hébergé chez vous : chaque tâche a son optimum. Nous arbitrons précision, coût, latence et confidentialité — et nous remplaçons un modèle dès qu'un meilleur existe."
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
            index="02"
            eyebrow="HARNAIS AGENTIQUE"
            title="La couche d'orchestration."
            lead="La couche d'orchestration : routage d'outils, contrôle de flux, mémoire, sélection de modèle et garde-fous. Des sous-agents spécialisés s'exécutent en parallèle pour mener un workflow de bout en bout."
            points={["Routage d'outils & contrôle de flux", 'Mémoire et garde-fous intégrés', 'Sous-agents en parallèle']}
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
            index="03"
            eyebrow="DONNÉES & INTÉGRATIONS"
            title="Branché à toute votre stack."
            lead="APIs internes, CRM, ERP, bases documentaires, connecteurs MCP. Tout converge sous un même toit pour alimenter le contexte de l'agent, sans recopie, sans silo."
            points={['Connecteurs MCP, API, webhooks', 'CRM · ERP · DMS · bases internes', 'Ingestion documentaire']}
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
            index="04"
            eyebrow="CONTEXTE & CONNAISSANCE"
            title="Une mémoire qui se capitalise."
            lead="Playbooks, historique des dossiers, règles et positions métier s'intègrent à chaque action de l'agent. Il reprend là où le tour précédent s'est arrêté. La connaissance s'accumule au lieu de se perdre."
            points={['Playbooks & règles métier', 'Historique et mémoire des dossiers', 'La connaissance se capitalise']}
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
            index="06"
            eyebrow="PRODUITS & INTERFACES"
            title="Votre dashboard, cousu main."
            lead="Nous construisons votre tableau de bord sur mesure : exactement les fonctionnalités dont vous avez besoin, et nous en ajoutons à la demande. Spécialistes des interfaces agentiques, nous concevons la meilleure expérience entre vous et vos agents — sans jamais vous plonger dans la technique."
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
            index="07"
            eyebrow="SÉCURITÉ & GOUVERNANCE"
            title="Autonome, jamais hors de contrôle."
            lead="Un agent en production agit sur vos vrais systèmes — alors chaque geste est journalisé, les actions sensibles attendent une validation humaine, et vos données restent dans votre périmètre. Vous savez toujours qui a fait quoi, quand."
            points={['Actions sensibles validées par un humain', 'Chaque geste journalisé, rejouable', 'Données dans votre périmètre']}
            accent={TOKENS.ink}
            bg={TOKENS.surface}
            flip
            visual={<IlluSecurity accent={TOKENS.ink} />}
        />
    );
}
