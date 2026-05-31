// Layer sections — "Un seul système connecté" broken into one section per layer.
// Each layer = its own section with a distinct single-stroke illustration + accent.
// Layer 05 (Capacités métier) is the existing SectionCapabilities (Agent ID card).
import { useInViewReveal } from '../../hooks/useInViewReveal';
import { TOKENS, EMBOSS_DARK, EMBOSS_MUTED, CARD_SHADOW } from './Sections';

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
    visual: React.ReactNode;
};

function LayerSection({ id, index, eyebrow, title, lead, points, accent, bg, flip, visual }: LayerProps) {
    const panelBg = bg === TOKENS.white ? TOKENS.surface : TOKENS.white;
    return (
        <section
            id={id}
            className="relative"
            style={{ backgroundColor: bg, paddingBlock: '88px', paddingInline: '32px' }}
            aria-label={eyebrow}
        >
            <Reveal>
                <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Text */}
                    <div className={flip ? 'md:order-2' : ''}>
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
                        <p
                            className="font-sans mt-5"
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
                    </div>

                    {/* Visual */}
                    <div className={flip ? 'md:order-1' : ''}>
                        <div
                            className="flex items-center justify-center"
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${TOKENS.border}`,
                                backgroundColor: panelBg,
                                boxShadow: CARD_SHADOW,
                                minHeight: 360,
                                padding: 28,
                            }}
                        >
                            {visual}
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

const svgBox: React.CSSProperties = { width: '100%', maxWidth: 360, height: 'auto' };

// ── 01 · Modèles — model selector ───────────────────────────────────────────
function IlluModels({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const chips = ['CLAUDE', 'GPT', 'MISTRAL', 'OPEN-WEIGHT'];
    const selected = 0;
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            <rect x="20" y="116" width="78" height="48" rx="8" fill="none" stroke={stroke} strokeWidth="1.25" opacity="0.5" />
            <text x="59" y="144" textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: stroke, opacity: 0.65 }}>TÂCHE</text>
            {chips.map((c, i) => {
                const y = 24 + i * 60;
                const cy = y + 23;
                const active = i === selected;
                return (
                    <g key={c}>
                        <path
                            d={`M98 140 C 152 140, 168 ${cy}, 222 ${cy}`}
                            fill="none"
                            stroke={active ? accent : stroke}
                            strokeWidth={active ? 1.75 : 1}
                            opacity={active ? 0.95 : 0.28}
                            strokeDasharray={active ? 'none' : '3 4'}
                        />
                        <rect x="222" y={y} width="120" height="46" rx="9" fill="none" stroke={active ? accent : stroke} strokeWidth={active ? 1.75 : 1.1} opacity={active ? 1 : 0.42} />
                        <text x="282" y={cy + 4} textAnchor="middle" className="font-mono" style={{ fontSize: 12, fill: stroke, opacity: active ? 0.9 : 0.5 }}>{c}</text>
                        {active && <circle cx="333" cy={y + 9} r="3" fill={accent} />}
                    </g>
                );
            })}
        </svg>
    );
}

// ── 02 · Harnais agentique — orchestration loop + parallel sub-agents ────────
function IlluHarness({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const cx = 180;
    const cy = 108;
    const subs = [104, 180, 256];
    const loop = [
        { t: 'ROUTE', x: cx, y: cy - 74 },
        { t: 'OUTIL', x: cx + 80, y: cy + 2 },
        { t: 'MÉMOIRE', x: cx, y: cy + 84 },
        { t: 'GARDE-FOU', x: cx - 84, y: cy + 2 },
    ];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            <circle cx={cx} cy={cy} r="64" fill="none" stroke={stroke} strokeWidth="1" opacity="0.28" strokeDasharray="3 5" />
            <path d={`M ${cx + 64} ${cy - 8} l 7 8 l -9 4`} fill="none" stroke={accent} strokeWidth="1.5" />
            {loop.map((l) => (
                <text key={l.t} x={l.x} y={l.y} textAnchor="middle" className="font-mono" style={{ fontSize: 9.5, fill: stroke, opacity: 0.5 }}>{l.t}</text>
            ))}
            <rect x={cx - 46} y={cy - 22} width="92" height="44" rx="9" fill="none" stroke={accent} strokeWidth="1.75" />
            <text x={cx} y={cy + 4} textAnchor="middle" className="font-mono" style={{ fontSize: 12, fill: stroke, opacity: 0.9 }}>HARNAIS</text>
            {subs.map((x, i) => (
                <g key={i}>
                    <line x1={cx} y1={cy + 22} x2={x} y2="218" stroke={stroke} strokeWidth="1" opacity="0.4" />
                    <circle cx={x} cy="232" r="14" fill="none" stroke={stroke} strokeWidth="1.25" opacity="0.55" />
                    <circle cx={x} cy="232" r="3.5" fill={accent} />
                </g>
            ))}
        </svg>
    );
}

// ── 03 · Données & intégrations — ports converging into a hub ────────────────
function IlluConnect({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const ports = ['CRM', 'ERP', 'DMS', 'MCP', 'API'];
    const hub = { x: 282, y: 140 };
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            {ports.map((p, i) => {
                const y = 22 + i * 52;
                const cy = y + 18;
                return (
                    <g key={p}>
                        <rect x="14" y={y} width="74" height="36" rx="7" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
                        <text x="51" y={cy + 4} textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: stroke, opacity: 0.6 }}>{p}</text>
                        <path d={`M88 ${cy} C 176 ${cy}, 196 ${hub.y}, ${hub.x - 28} ${hub.y}`} fill="none" stroke={accent} strokeWidth="1.1" opacity="0.5" />
                    </g>
                );
            })}
            <circle cx={hub.x} cy={hub.y} r="30" fill="none" stroke={accent} strokeWidth="1.75" />
            <circle cx={hub.x} cy={hub.y} r="5" fill={accent} />
            <text x={hub.x} y={hub.y + 50} textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: stroke, opacity: 0.7 }}>AGENT</text>
        </svg>
    );
}

// ── 04 · Contexte & connaissance — concentric rings compounding T0 → T+n ─────
function IlluCompound({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const cx = 180;
    const cy = 140;
    const rings = [34, 62, 90, 118];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
                const a = (k / 8) * Math.PI * 2;
                return (
                    <line
                        key={k}
                        x1={cx + 30 * Math.cos(a)}
                        y1={cy + 30 * Math.sin(a)}
                        x2={cx + 120 * Math.cos(a)}
                        y2={cy + 120 * Math.sin(a)}
                        stroke={stroke}
                        strokeWidth="0.75"
                        opacity="0.1"
                    />
                );
            })}
            {rings.map((r, i) => (
                <circle
                    key={r}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={i === rings.length - 1 ? accent : stroke}
                    strokeWidth={1 + i * 0.7}
                    opacity={0.28 + i * 0.18}
                />
            ))}
            <circle cx={cx} cy={cy} r="4" fill={accent} />
            <text x={cx + 12} y={cy + 4} className="font-mono" style={{ fontSize: 10, fill: stroke, opacity: 0.7 }}>T0</text>
            <text x={cx + 92} y={cy - 82} className="font-mono" style={{ fontSize: 10, fill: stroke, opacity: 0.7 }}>T+n</text>
        </svg>
    );
}

// ── 06 · Produits & interfaces — stacked surface frames ──────────────────────
function IlluSurfaces({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const frames = [
        { dx: 0, dy: 48, label: 'API', active: false },
        { dx: 26, dy: 24, label: 'TABLEAU DE BORD', active: false },
        { dx: 52, dy: 0, label: 'ADD-IN', active: true },
    ];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            {frames.map((f, i) => {
                const x = 18 + f.dx;
                const y = 26 + f.dy;
                const w = 232;
                const h = 152;
                const c = f.active ? accent : stroke;
                const op = f.active ? 1 : 0.4;
                return (
                    <g key={i}>
                        <rect x={x} y={y} width={w} height={h} rx="10" fill={TOKENS.white} stroke={c} strokeWidth={f.active ? 1.75 : 1.1} opacity={op} />
                        <line x1={x} y1={y + 28} x2={x + w} y2={y + 28} stroke={c} strokeWidth="1" opacity={op * 0.8} />
                        {[0, 1, 2].map((d) => (
                            <circle key={d} cx={x + 16 + d * 12} cy={y + 14} r="3" fill="none" stroke={c} strokeWidth="1" opacity={op * 0.8} />
                        ))}
                        <text x={x + w - 12} y={y + 18} textAnchor="end" className="font-mono" style={{ fontSize: 10, fill: stroke, opacity: f.active ? 0.85 : 0.45 }}>{f.label}</text>
                        {f.active && (
                            <>
                                <line x1={x + 16} y1={y + 54} x2={x + w - 64} y2={y + 54} stroke={stroke} strokeWidth="1" opacity="0.22" />
                                <line x1={x + 16} y1={y + 72} x2={x + w - 32} y2={y + 72} stroke={stroke} strokeWidth="1" opacity="0.22" />
                                <line x1={x + 16} y1={y + 90} x2={x + w - 96} y2={y + 90} stroke={stroke} strokeWidth="1" opacity="0.22" />
                                <rect x={x + 16} y={y + 110} width="68" height="24" rx="6" fill="none" stroke={accent} strokeWidth="1.5" />
                            </>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

// ── 07 · Sécurité & gouvernance — ethical walls + lock + audit trail ─────────
function IlluSecurity({ accent }: { accent: string }) {
    const stroke = TOKENS.ink;
    const x = 30;
    const y = 44;
    const w = 300;
    const h = 128;
    const cells = ['DOSSIER A', 'DOSSIER B', 'DOSSIER C'];
    return (
        <svg viewBox="0 0 360 280" aria-hidden="true" style={svgBox}>
            <rect x={x} y={y} width={w} height={h} rx="10" fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.5" />
            {[1, 2].map((k) => (
                <line key={k} x1={x + (k * w) / 3} y1={y} x2={x + (k * w) / 3} y2={y + h} stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
            ))}
            {cells.map((c, i) => (
                <text key={c} x={x + w / 6 + (i * w) / 3} y={y + h - 14} textAnchor="middle" className="font-mono" style={{ fontSize: 10, fill: stroke, opacity: 0.5 }}>{c}</text>
            ))}
            {/* lock straddling the top edge */}
            <rect x="166" y="38" width="28" height="22" rx="4" fill={TOKENS.white} stroke={accent} strokeWidth="1.5" />
            <path d="M172 38 v-6 a8 8 0 0 1 16 0 v6" fill="none" stroke={accent} strokeWidth="1.5" />
            <circle cx="180" cy="48" r="2.5" fill={accent} />
            {/* audit trail */}
            <text x={x} y={y + h + 26} className="font-mono" style={{ fontSize: 9.5, fill: stroke, opacity: 0.5 }}>AUDIT</text>
            {[0, 1, 2, 3].map((r) => {
                const ay = y + h + 40 + r * 16;
                return (
                    <g key={r}>
                        <path d={`M${x + 4} ${ay - 1} l4 4 l8 -9`} fill="none" stroke={accent} strokeWidth="1.4" />
                        <line x1={x + 24} y1={ay} x2={x + (r % 2 ? 230 : 270)} y2={ay} stroke={stroke} strokeWidth="1" opacity="0.2" />
                    </g>
                );
            })}
        </svg>
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
            flip
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
