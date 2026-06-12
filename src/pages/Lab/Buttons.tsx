import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    ArrowRight,
    Calendar,
    Clapperboard,
    Plus,
    Sparkles,
} from 'lucide-react';

import {
    ReliefButton,
    type ReliefForceState,
    type ReliefSize,
    type ReliefTone,
} from '@/components/ui/ReliefButton';

const PAPER = '#F7F7F5';
const INK = '#171717';
const MUTED = '#7A7A73';
const FAINT = '#9A9A93';
const BEADS = "url('/assets/backgrounds/flowers-beads.webp') center/cover";

const mono: React.CSSProperties = {
    fontFamily: "'Geist Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: FAINT,
};

const SIZES: ReliefSize[] = ['sm', 'md', 'lg'];
const SOLID_TONES: { tone: ReliefTone; label: string }[] = [
    { tone: 'dark', label: 'dark · CTA principal' },
    { tone: 'light', label: 'light · secondaire' },
    { tone: 'lime', label: 'lime · accent' },
    { tone: 'gold', label: 'gold · accent' },
    { tone: 'ghost', label: 'ghost · tertiaire' },
];
const STATES: { state?: ReliefForceState; label: string }[] = [
    { state: undefined, label: 'repos' },
    { state: 'hover', label: 'hover' },
    { state: 'active', label: 'pressé' },
    { state: 'focus', label: 'focus' },
    { state: 'disabled', label: 'désactivé' },
];

function Label({ children }: { children: React.ReactNode }) {
    return <div style={{ ...mono, marginBottom: 14 }}>{children}</div>;
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section style={{ marginTop: 56 }}>
            <Label>{title}</Label>
            {children}
        </section>
    );
}

export default function ButtonsLab() {
    const [bg, setBg] = useState<'paper' | 'dark' | 'beads'>('paper');
    const [toast, setToast] = useState<string | null>(null);
    const [clicks, setClicks] = useState(0);
    const toastTimer = useRef<number | null>(null);

    const surface =
        bg === 'paper' ? PAPER : bg === 'dark' ? '#161616' : '#5f8a36';
    const onDark = bg !== 'paper';

    // Délégation : un seul handler rend chaque ReliefButton de la page cliquable.
    // On lit le ton/la taille/le label sur le bouton réellement cliqué.
    function handleShowcaseClick(e: React.MouseEvent<HTMLDivElement>) {
        const el = (e.target as HTMLElement).closest('[data-tone]') as
            | HTMLElement
            | null;
        if (!el) return;
        if (
            (el as HTMLButtonElement).disabled ||
            el.getAttribute('aria-disabled') === 'true'
        )
            return;
        const tone = el.getAttribute('data-tone') ?? '—';
        const sizeAttr = el.getAttribute('data-size') ?? '—';
        const label = el.textContent?.trim() || 'icône';
        setClicks((c) => c + 1);
        setToast(`${tone} · ${sizeAttr} · « ${label} »`);
        if (toastTimer.current) window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => setToast(null), 1500);
    }

    return (
        <div style={{ minHeight: '100vh', background: surface, transition: 'background .25s ease' }}>
            <Helmet>
                <title>Lab · Boutons Relief — Leonard</title>
            </Helmet>

            {/* top bar + background switcher */}
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 32px',
                    background: onDark ? 'rgba(0,0,0,.25)' : 'rgba(255,255,255,.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${onDark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.08)'}`,
                }}
            >
                <div style={{ ...mono, color: onDark ? 'rgba(255,255,255,.8)' : MUTED }}>
                    [ lab ] · système de boutons relief
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {(['paper', 'dark', 'beads'] as const).map((b) => (
                        <button
                            key={b}
                            onClick={() => setBg(b)}
                            style={{
                                ...mono,
                                cursor: 'pointer',
                                padding: '6px 12px',
                                borderRadius: 8,
                                border: '1px solid',
                                borderColor:
                                    bg === b
                                        ? '#A3E635'
                                        : onDark
                                          ? 'rgba(255,255,255,.2)'
                                          : 'rgba(0,0,0,.12)',
                                background:
                                    bg === b
                                        ? 'rgba(163,230,53,.18)'
                                        : 'transparent',
                                color: onDark ? 'rgba(255,255,255,.85)' : MUTED,
                            }}
                        >
                            {b}
                        </button>
                    ))}
                </div>
            </div>

            <div
                onClick={handleShowcaseClick}
                style={{ maxWidth: 1040, margin: '0 auto', padding: '40px 32px 120px' }}
            >
                <h1
                    style={{
                        fontFamily: "'Geist Sans', sans-serif",
                        fontSize: 40,
                        fontWeight: 600,
                        letterSpacing: '-0.025em',
                        color: onDark ? '#fff' : INK,
                        margin: '0 0 8px',
                    }}
                >
                    Boutons — pilier Relief
                </h1>
                <p
                    style={{
                        fontFamily: "'Geist Sans', sans-serif",
                        fontSize: 15,
                        color: onDark ? 'rgba(255,255,255,.7)' : MUTED,
                        margin: 0,
                        maxWidth: '60ch',
                    }}
                >
                    Toutes les variantes, tailles et états. Survole / clique pour
                    tester le ressenti. Change le fond en haut à droite pour
                    vérifier le contraste.
                </p>

                {/* TEST DU CLIC */}
                <Section title="Test du clic — maintiens pour sentir l'enfoncement">
                    <p
                        style={{
                            fontFamily: "'Geist Sans', sans-serif",
                            fontSize: 13,
                            color: onDark ? 'rgba(255,255,255,.6)' : MUTED,
                            margin: '0 0 20px',
                            maxWidth: '56ch',
                        }}
                    >
                        Maintiens le clic : le bouton s'enfonce, puis remonte
                        dès que tu lâches.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36 }}>
                        {(['dark', 'light', 'lime', 'gold'] as ReliefTone[]).map(
                            (tone) => (
                                <ClickTester key={tone} tone={tone} onDark={onDark} />
                            )
                        )}
                    </div>
                </Section>

                {/* TONS × TAILLES */}
                <Section title="Tons × tailles — interactifs">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto repeat(3, 1fr)',
                            gap: '22px 28px',
                            alignItems: 'center',
                        }}
                    >
                        <div />
                        {SIZES.map((s) => (
                            <div key={s} style={{ ...mono, textAlign: 'left' }}>
                                {s}
                            </div>
                        ))}
                        {SOLID_TONES.map(({ tone, label }) => (
                            <Row key={tone} label={label} onDark={onDark}>
                                {SIZES.map((s) => (
                                    <div key={s}>
                                        <ReliefButton
                                            tone={tone}
                                            size={s}
                                            iconRight={<ArrowRight />}
                                        >
                                            Démarrer
                                        </ReliefButton>
                                    </div>
                                ))}
                            </Row>
                        ))}
                    </div>
                </Section>

                {/* ÉTATS */}
                <Section title="États — repos / hover / pressé / focus / désactivé">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                        {(['dark', 'light', 'lime'] as ReliefTone[]).map((tone) => (
                            <div
                                key={tone}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(5, 1fr)',
                                    gap: 18,
                                }}
                            >
                                {STATES.map(({ state, label }) => (
                                    <div key={label} style={{ textAlign: 'center' }}>
                                        <ReliefButton
                                            tone={tone}
                                            size="md"
                                            forceState={state}
                                            iconRight={<ArrowRight />}
                                        >
                                            Action
                                        </ReliefButton>
                                        <div style={{ ...mono, marginTop: 10, letterSpacing: '0.1em' }}>
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ICÔNES */}
                <Section title="Icônes — gauche / droite / seule">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                        <ReliefButton tone="dark" iconLeft={<Plus />}>
                            Ajouter un agent
                        </ReliefButton>
                        <ReliefButton tone="light" iconLeft={<Clapperboard />}>
                            Add media
                        </ReliefButton>
                        <ReliefButton tone="light" iconRight={<ArrowRight />}>
                            Voir la méthode
                        </ReliefButton>
                        <ReliefButton tone="lime" iconLeft={<Sparkles />}>
                            Générer
                        </ReliefButton>
                        <ReliefButton tone="dark" iconOnly aria-label="Ajouter">
                            <Plus />
                        </ReliefButton>
                        <ReliefButton tone="light" iconOnly aria-label="Calendrier">
                            <Calendar />
                        </ReliefButton>
                    </div>
                </Section>

                {/* FROST */}
                <Section title="Frost — sur imagerie (hero / contact)">
                    <div
                        style={{
                            position: 'relative',
                            borderRadius: 16,
                            overflow: 'hidden',
                            padding: 40,
                            background: BEADS,
                            display: 'flex',
                            gap: 16,
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        <ReliefButton tone="frost" size="lg" iconRight={<ArrowRight />}>
                            Discutons-en
                        </ReliefButton>
                        <ReliefButton tone="frost" size="md">
                            En savoir plus
                        </ReliefButton>
                        <ReliefButton tone="dark" size="lg" iconRight={<ArrowRight />}>
                            Démarrer
                        </ReliefButton>
                    </div>
                </Section>

                {/* EMPLACEMENT */}
                <Section title="En contexte — emplacements types">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                        {/* navbar */}
                        <ContextCard caption="navbar — minimale, 1 CTA clair">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '14px 22px',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                                    <strong style={{ fontFamily: "'Geist Sans'", fontWeight: 600, color: INK }}>
                                        Leonard
                                    </strong>
                                    <ReliefButton tone="ghost" size="sm">Méthode</ReliefButton>
                                    <ReliefButton tone="ghost" size="sm">Capacités</ReliefButton>
                                </div>
                                <ReliefButton tone="light" size="sm">Discutons-en</ReliefButton>
                            </div>
                        </ContextCard>

                        {/* hero */}
                        <ContextCard caption="hero — frost sur perles + CTA dark" pad={false}>
                            <div
                                style={{
                                    position: 'relative',
                                    background: BEADS,
                                    padding: '56px 40px',
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: 460,
                                        padding: 30,
                                        borderRadius: 16,
                                        backdropFilter: 'blur(15px) saturate(118%)',
                                        WebkitBackdropFilter: 'blur(15px) saturate(118%)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        boxShadow: '0 2px 6px 0 rgba(0,0,0,0.15)',
                                        backgroundImage:
                                            'linear-gradient(to right, rgba(0,0,0,0.12), rgba(0,0,0,0.07), rgba(0,0,0,0.07))',
                                        backgroundClip: 'padding-box',
                                        color: '#fff',
                                    }}
                                >
                                    <div style={{ ...mono, color: 'rgba(255,255,255,.8)' }}>
                                        Leonard Intelligence
                                    </div>
                                    <h2
                                        style={{
                                            fontFamily: "'Geist Sans'",
                                            fontSize: 32,
                                            fontWeight: 600,
                                            letterSpacing: '-0.025em',
                                            lineHeight: 1.05,
                                            margin: '12px 0 18px',
                                        }}
                                    >
                                        L'intelligence,<br />mise au travail.
                                    </h2>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <ReliefButton tone="dark" iconRight={<ArrowRight />}>
                                            Démarrer
                                        </ReliefButton>
                                        <ReliefButton tone="frost">Voir la méthode</ReliefButton>
                                    </div>
                                </div>
                            </div>
                        </ContextCard>

                        {/* card footer */}
                        <ContextCard caption="pied de carte — secondaire + principal alignés à droite">
                            <div style={{ padding: '22px 24px' }}>
                                <h3 style={{ fontFamily: "'Geist Sans'", fontWeight: 600, color: INK, margin: '0 0 6px', fontSize: 18 }}>
                                    Anatomie d'un agent
                                </h3>
                                <p style={{ fontFamily: "'Geist Sans'", color: MUTED, margin: '0 0 18px', fontSize: 14 }}>
                                    Modèle, outils, garde-fous, statut — chaque agent est une fiche.
                                </p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                    <ReliefButton tone="light" size="sm">En savoir plus</ReliefButton>
                                    <ReliefButton tone="dark" size="sm" iconRight={<ArrowRight />}>
                                        Démarrer
                                    </ReliefButton>
                                </div>
                            </div>
                        </ContextCard>

                        {/* form submit */}
                        <ContextCard caption="formulaire — bouton pleine largeur">
                            <div style={{ padding: 24, maxWidth: 420 }}>
                                <div
                                    style={{
                                        background: '#fff',
                                        border: '1px solid #E4E4DE',
                                        borderRadius: 10,
                                        padding: '12px 14px',
                                        fontFamily: "'Geist Sans'",
                                        color: FAINT,
                                        fontSize: 14,
                                        marginBottom: 12,
                                    }}
                                >
                                    votre@email.com
                                </div>
                                <ReliefButton tone="dark" block iconRight={<ArrowRight />}>
                                    Envoyer
                                </ReliefButton>
                            </div>
                        </ContextCard>
                    </div>
                </Section>
            </div>

            {/* retour de clic — confirme que chaque bouton fonctionne */}
            <div
                aria-live="polite"
                style={{
                    position: 'fixed',
                    left: '50%',
                    bottom: 28,
                    transform: `translateX(-50%) translateY(${toast ? '0' : '12px'})`,
                    opacity: toast ? 1 : 0,
                    pointerEvents: 'none',
                    transition: 'opacity .18s ease, transform .18s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 16px',
                    borderRadius: 999,
                    background: 'rgba(22,22,22,.92)',
                    color: '#fff',
                    boxShadow: '0 8px 28px rgba(0,0,0,.28)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 50,
                }}
            >
                <span
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: '#A3E635',
                        flex: 'none',
                    }}
                />
                <span style={{ fontFamily: "'Geist Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>
                    Cliqué
                </span>
                <span style={{ ...mono, color: 'rgba(255,255,255,.65)', fontSize: 11 }}>
                    {toast}
                </span>
                <span style={{ ...mono, color: 'rgba(255,255,255,.4)', fontSize: 11 }}>
                    #{clicks}
                </span>
            </div>
        </div>
    );
}

function ClickTester({ tone, onDark }: { tone: ReliefTone; onDark: boolean }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <ReliefButton tone={tone} size="lg" iconRight={<ArrowRight />}>
                Cliquer
            </ReliefButton>
            <div
                style={{
                    ...mono,
                    marginTop: 12,
                    letterSpacing: '0.1em',
                    color: onDark ? 'rgba(255,255,255,.7)' : MUTED,
                }}
            >
                {tone}
            </div>
        </div>
    );
}

function Row({
    label,
    children,
    onDark,
}: {
    label: string;
    children: React.ReactNode;
    onDark: boolean;
}) {
    return (
        <>
            <div style={{ ...mono, color: onDark ? 'rgba(255,255,255,.7)' : MUTED, textTransform: 'none', letterSpacing: '0.04em' }}>
                {label}
            </div>
            {children}
        </>
    );
}

function ContextCard({
    caption,
    children,
    pad = true,
}: {
    caption: string;
    children: React.ReactNode;
    pad?: boolean;
}) {
    return (
        <div>
            <div style={{ ...mono, marginBottom: 8, letterSpacing: '0.1em' }}>{caption}</div>
            <div
                style={{
                    background: PAPER,
                    border: '1px solid #E4E4DE',
                    borderRadius: 14,
                    overflow: 'hidden',
                    boxShadow: 'rgba(0,0,0,0.04) 0 1px 2px, rgba(0,0,0,0.05) 0 8px 24px',
                    ...(pad ? {} : {}),
                }}
            >
                {children}
            </div>
        </div>
    );
}
