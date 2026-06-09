// 02 · HARNAIS AGENTIQUE — schéma épuré (essentiel d'abord) :
// un Orchestrateur central, des sous-agents spécialisés en parallèle sur un
// anneau, et UN garde-fou humain en satellite. Plus de console, de toolbar ni
// de compteurs : une seule idée, lisible en deux secondes — en gardant le
// langage schématique créatif (anneau pointillé, cartes embossées, états).
import { TOKENS } from '../Sections';
import { Spinner, PulseDot, Check } from './kit';

const EMBOSS = '0 0 0 0.8px #FFFFFF inset, 0 0 0 0.8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)';
const ROW_BG = 'linear-gradient(180deg, #F5F5F2 0%, rgba(245,245,242,0.55) 100%)';
const STROKE = 'rgba(23,23,23,0.12)';

type SubState = 'run' | 'queue' | 'done';
type Sub = { label: string; state: SubState };

// 6 sous-agents sur l'anneau — moins de nœuds, plus de lisibilité.
const SUBS: Sub[] = [
    { label: 'Recherche', state: 'run' }, // haut
    { label: 'Extraction', state: 'run' }, // haut-droite
    { label: 'Vérification', state: 'queue' }, // bas-droite
    { label: 'Rédaction', state: 'run' }, // bas
    { label: 'Classification', state: 'queue' }, // bas-gauche
    { label: 'Synthèse', state: 'done' }, // haut-gauche
];

const R_CARD = 40; // rayon de l'anneau (en % du conteneur)
const placed = SUBS.map((s, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { ...s, x: 50 + R_CARD * Math.cos(a), y: 50 + R_CARD * Math.sin(a) };
});

// ── Atomes d'état ────────────────────────────────────────────────────────────
function SeedDot({ color, inner }: { color: string; inner: string }) {
    return <span style={{ width: 6, height: 6, borderRadius: 999, background: color, boxShadow: `inset 0 0.8px 0.8px ${inner}`, flex: '0 0 auto', display: 'inline-block' }} />;
}

function StateMark({ state, accent }: { state: SubState; accent: string }) {
    const { gold, forest } = TOKENS;
    if (state === 'run') return <Spinner color={accent} size={10} />;
    if (state === 'queue') return <SeedDot color={gold} inner="rgba(120,90,20,0.55)" />;
    return <Check color={forest} size={11} />;
}

// ── Nœud sous-agent (carte embossée) ─────────────────────────────────────────
function NodeCard({ label, state, accent }: { label: string; state: SubState; accent: string }) {
    const { mutedText, pale } = TOKENS;
    return (
        <span
            className="inline-flex items-center font-mono"
            style={{ gap: 7, padding: '8px 13px', borderRadius: 9, background: pale, boxShadow: EMBOSS, fontSize: 11.5, color: mutedText, whiteSpace: 'nowrap' }}
        >
            <StateMark state={state} accent={accent} />
            {label}
        </span>
    );
}

// ── Le graphe radial — anneau pointillé + rayons + nœuds ─────────────────────
function RadialGraph({ accent }: { accent: string }) {
    const { ink, mutedText, pale } = TOKENS;
    return (
        <div className="relative w-full" style={{ maxWidth: 520, aspectRatio: '1 / 1' }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, display: 'block' }} aria-hidden="true">
                <circle cx="50" cy="50" r={R_CARD} fill="none" stroke={STROKE} strokeWidth="0.22" strokeDasharray="1 1.4" />
                {placed.map((p) => (
                    <line key={p.label} x1="50" y1="50" x2={p.x} y2={p.y} stroke={STROKE} strokeWidth="0.24" strokeLinecap="round" strokeDasharray="1.1 1.1" />
                ))}
            </svg>

            {placed.map((p) => (
                <span key={p.label} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
                    <NodeCard label={p.label} state={p.state} accent={accent} />
                </span>
            ))}

            {/* Orchestrateur central */}
            <span
                className="inline-flex font-mono"
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    padding: '12px 17px',
                    borderRadius: 11,
                    background: '#F0F0EB',
                    boxShadow: `0 0 0 1px ${accent}22, ${EMBOSS}`,
                    whiteSpace: 'nowrap',
                }}
            >
                <span className="inline-flex items-center" style={{ gap: 7 }}>
                    <Spinner color={accent} size={12} />
                    <span style={{ fontSize: 12.5, color: ink }}>Orchestrateur</span>
                </span>
                <span style={{ fontSize: 8.5, letterSpacing: '0.16em', color: mutedText }}>BOUCLE ACTIVE</span>
            </span>

            <span className="font-mono" style={{ position: 'absolute', left: 2, bottom: 0, fontSize: 9, letterSpacing: '0.12em', color: mutedText, background: pale, padding: '3px 7px', borderRadius: 6, boxShadow: EMBOSS }}>
                SOUS-AGENTS · PARALLÈLE
            </span>
        </div>
    );
}

// ── Garde-fou — l'unique carte satellite (validation humaine) ────────────────
function ApprovalCard() {
    const { ink, mutedText, gold, forest } = TOKENS;
    const pill = (label: string, color: string, ring: string) => (
        <span className="inline-flex items-center font-mono" style={{ fontSize: 9.5, color, padding: '4px 11px', borderRadius: 999, boxShadow: `0 0 0 0.7px ${ring}` }}>{label}</span>
    );
    return (
        <div style={{ width: 224, padding: '11px 13px', borderRadius: 10, background: ROW_BG, boxShadow: `0 0 0 0.8px ${ink}1f, inset 0 1.4px 0 #FFFFFF, 0 4px 12px rgba(0,0,0,0.06)` }}>
            <div className="flex items-center" style={{ gap: 7, marginBottom: 7 }}>
                <span className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.12em', color: mutedText }}>GARDE-FOU</span>
                <span className="ml-auto inline-flex items-center" style={{ gap: 6 }}>
                    <PulseDot color={gold} size={7} />
                    <span className="font-mono" style={{ fontSize: 9, color: mutedText }}>En attente</span>
                </span>
            </div>
            <div className="font-sans" style={{ fontSize: 11.5, color: ink, lineHeight: 1.45, marginBottom: 9 }}>Action sensible : envoi externe avant validation.</div>
            <div className="flex items-center" style={{ gap: 8 }}>
                {pill('Approuver', forest, `${forest}66`)}
                {pill('Refuser', mutedText, 'rgba(0,0,0,0.15)')}
            </div>
        </div>
    );
}

export function IlluHarness({ accent }: { accent: string }) {
    return (
        <div className="w-full font-sans" aria-hidden="true">
            <div className="flex flex-wrap items-center justify-center" style={{ gap: 'clamp(24px, 4vw, 56px)', padding: '8px 0' }}>
                <RadialGraph accent={accent} />
                <ApprovalCard />
            </div>
        </div>
    );
}
