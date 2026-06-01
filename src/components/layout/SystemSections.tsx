// Layer sections — "Un seul système connecté" broken into one section per layer.
// Each layer = its own section with a distinct single-stroke illustration + accent.
// Layer 05 (Capacités métier) is the existing SectionCapabilities (Agent ID card).
import { useInViewReveal } from '../../hooks/useInViewReveal';
import { TOKENS, EMBOSS_DARK, EMBOSS_MUTED, CARD_SHADOW } from './Sections';
import { IlluModels } from './illustrations/IlluModels';
import { IlluHarness } from './illustrations/IlluHarness';
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
    visual: React.ReactNode;
};

function LayerSection({ id, index, eyebrow, title, lead, points, accent, bg, flip, wide, visual }: LayerProps) {
    const panelBg = bg === TOKENS.white ? TOKENS.surface : TOKENS.white;

    const heading = (
        <>
            <div className="font-mono" style={{ fontSize: 13, letterSpacing: '0.22em', ...EMBOSS_MUTED }}>
                {index} — {eyebrow}
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
                        {visualPanel}
                    </div>
                ) : (
                    <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className={flip ? 'md:order-2' : ''}>
                            {heading}
                            <div className="mt-5">{body}</div>
                        </div>
                        <div className={flip ? 'md:order-1' : ''}>{visualPanel}</div>
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
            eyebrow="MODÈLES"
            title="On choisit le modèle. Par tâche."
            lead="Claude, GPT, Mistral ou un modèle open-weight hébergé chez vous. Chaque tâche a ses contraintes — précision, coût, latence, confidentialité. On sélectionne le bon modèle pour chacune, jamais un seul par défaut."
            points={['Modèles propriétaires ou open-weight', 'Hébergeable dans votre périmètre', 'Arbitrage précision / coût / latence']}
            accent={TOKENS.lime}
            bg={TOKENS.paper}
            visual={<IlluModels accent={TOKENS.lime} />}
        />
    );
}

export function LayerHarnais() {
    return (
        <LayerSection
            id="section-harnais"
            index="02"
            eyebrow="HARNAIS AGENTIQUE"
            title="Ce qui transforme un LLM en agent."
            lead="La couche d'orchestration : routage d'outils, contrôle de flux, mémoire, sélection de modèle et garde-fous. Des sous-agents spécialisés s'exécutent en parallèle pour mener un workflow de bout en bout."
            points={["Routage d'outils & contrôle de flux", 'Mémoire et garde-fous intégrés', 'Sous-agents en parallèle']}
            accent={TOKENS.ink}
            bg={TOKENS.white}
            wide
            visual={<IlluHarness accent={TOKENS.ink} />}
        />
    );
}

export function LayerDonnees() {
    return (
        <LayerSection
            id="section-donnees"
            index="03"
            eyebrow="DONNÉES & INTÉGRATIONS"
            title="Ce à quoi l'agent se branche."
            lead="APIs internes, CRM, ERP, bases documentaires, connecteurs MCP. Tout converge sous un même toit pour alimenter le contexte de l'agent — sans recopie, sans silo."
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
            title="Un contexte qui prend de la valeur."
            lead="Playbooks, historique des dossiers, règles et positions de l'entreprise s'intègrent à chaque action de l'agent. Il reprend là où le tour précédent s'est arrêté — la connaissance s'accumule au lieu de se perdre."
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
            title="Là où vos équipes travaillent."
            lead="Les surfaces où humains et agents collaborent : add-in dans vos outils, tableau de bord de supervision, API. L'agent vit dans votre environnement de travail — pas dans un onglet à côté."
            points={['Add-ins dans vos outils', 'Tableau de bord de supervision', 'API & intégration sur-mesure']}
            accent={TOKENS.lime}
            bg={TOKENS.white}
            visual={<IlluSurfaces accent={TOKENS.lime} />}
        />
    );
}

export function LayerSecurite() {
    return (
        <LayerSection
            id="section-securite"
            index="07"
            eyebrow="SÉCURITÉ & GOUVERNANCE"
            title="Prêt pour l'entreprise, par construction."
            lead="Cloisonnement entre dossiers, traçabilité complète de chaque appel d'outil, contrôle d'accès par rôle, souveraineté des données. Intégré à chaque couche — pas ajouté après coup."
            points={["Cloisonnement & contrôle d'accès", 'Traçabilité de chaque action', 'Souveraineté des données']}
            accent={TOKENS.ink}
            bg={TOKENS.surface}
            flip
            visual={<IlluSecurity accent={TOKENS.ink} />}
        />
    );
}
