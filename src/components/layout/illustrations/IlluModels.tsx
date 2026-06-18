// 01 · MODÈLES — "Le bon modèle, par tâche." (decorative).
// Grille des derniers modèles de chaque fournisseur, chacun dans une carte.
// Les logos (SVG monochromes) sont rendus via CSS mask : gris par défaut,
// couleur de marque au survol — ET au scroll d'entrée, chaque carte s'allume
// brièvement dans le désordre (vague animée), le hover restant prioritaire.
import { useEffect, useRef, useState } from 'react';
import { TOKENS } from '../Sections';
import { EMBOSS_SOFT } from './kit';

const MODELS = [
    { name: 'Claude Opus 4.8', vendor: 'Anthropic', logo: '/assets/logos/anthropic-color.svg', color: '#D97757' },
    { name: 'GPT-5.5', vendor: 'OpenAI', logo: '/assets/logos/openai-color.svg', color: '#10A37F' },
    { name: 'Gemini 3 Pro', vendor: 'Google', logo: '/assets/logos/gemini.svg', color: '#4285F4' },
    { name: 'Mistral Large 3', vendor: 'Mistral AI', logo: '/assets/logos/mistral-color.svg', color: '#FA520F' },
    { name: 'Llama 4 Maverick', vendor: 'Meta', logo: '/assets/logos/meta-color.svg', color: '#0866FF' },
    { name: 'Nemotron 3 Ultra', vendor: 'NVIDIA', logo: '/assets/logos/nvidia-color.svg', color: '#76B900' },
];

export function IlluModels() {
    const { ink, mutedText, white } = TOKENS;
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

        // Pause entre deux vagues, une fois la précédente terminée.
        const PAUSE = 1700;
        let timers: number[] = [];
        let running = false;

        const clearTimers = () => {
            timers.forEach((t) => clearTimeout(t));
            timers = [];
        };

        // Une vague : chaque logo s'allume dans sa couleur de marque, dans le
        // désordre ; à la fin on attend un peu, puis ça repart (boucle continue).
        const runWave = () => {
            const order = MODELS.map((m) => m.name);
            for (let i = order.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [order[i], order[j]] = [order[j], order[i]];
            }
            let lastOff = 0;
            order.forEach((name, i) => {
                const onAt = 280 + i * 300 + Math.random() * 140;
                const offAt = onAt + 780;
                lastOff = Math.max(lastOff, offAt);
                timers.push(window.setTimeout(() => setActive((a) => ({ ...a, [name]: true })), onAt));
                timers.push(window.setTimeout(() => setActive((a) => ({ ...a, [name]: false })), offAt));
            });
            timers.push(window.setTimeout(runWave, lastOff + PAUSE));
        };

        const start = () => {
            if (running) return;
            running = true;
            runWave();
        };
        const stop = () => {
            running = false;
            clearTimers();
            setActive({});
        };

        // Tourne uniquement quand la section est visible (pause sinon).
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) start();
                else stop();
            },
            { threshold: 0.35 },
        );
        obs.observe(el);
        return () => {
            obs.disconnect();
            clearTimers();
        };
    }, []);

    return (
        <div ref={ref} className="w-full font-sans" aria-hidden="true">
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
                {MODELS.map((m) => (
                    <div
                        key={m.name}
                        className="group flex items-center"
                        style={{ '--lc': m.color, gap: 13, padding: '15px 17px', borderRadius: 13, background: white, boxShadow: EMBOSS_SOFT } as React.CSSProperties}
                    >
                        <span
                            aria-hidden="true"
                            data-active={active[m.name] ? 'true' : undefined}
                            className="shrink-0 transition-colors duration-500 [background-color:#171717] group-hover:[background-color:var(--lc)] data-[active=true]:[background-color:var(--lc)] data-[active=true]:duration-300"
                            style={{
                                width: 30,
                                height: 30,
                                WebkitMaskImage: `url(${m.logo})`,
                                maskImage: `url(${m.logo})`,
                                WebkitMaskRepeat: 'no-repeat',
                                maskRepeat: 'no-repeat',
                                WebkitMaskSize: 'contain',
                                maskSize: 'contain',
                                WebkitMaskPosition: 'center',
                                maskPosition: 'center',
                            }}
                        />
                        <div style={{ minWidth: 0 }}>
                            <div className="font-sans" style={{ fontSize: 15, fontWeight: 600, color: ink, lineHeight: 1.15, whiteSpace: 'nowrap' }}>
                                {m.name}
                            </div>
                            <div className="font-mono" style={{ fontSize: 10.5, color: mutedText, marginTop: 2 }}>
                                {m.vendor}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
