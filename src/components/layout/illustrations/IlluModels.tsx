// 01 · MODÈLES — "Le bon modèle, par tâche." (decorative).
// Grille des derniers modèles de chaque fournisseur, chacun dans une carte.
// Les logos (SVG monochromes) sont rendus via CSS mask : gris par défaut,
// couleur de marque au survol.
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
    return (
        <div className="w-full font-sans" aria-hidden="true">
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14 }}>
                {MODELS.map((m) => (
                    <div
                        key={m.name}
                        className="group flex items-center"
                        style={{ '--lc': m.color, gap: 13, padding: '15px 17px', borderRadius: 13, background: white, boxShadow: EMBOSS_SOFT } as React.CSSProperties}
                    >
                        <span
                            aria-hidden="true"
                            className="shrink-0 transition-colors duration-300 [background-color:#171717] group-hover:[background-color:var(--lc)]"
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
