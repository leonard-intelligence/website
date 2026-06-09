// 01 · MODÈLES — "Le bon modèle, par tâche." (decorative).
// Affiche les derniers modèles de langage de chaque grand fournisseur
// (logo + nom du modèle de dernière génération), plus parlant qu'un schéma.
import { TOKENS } from '../Sections';
import { EMBOSS_SOFT } from './kit';

const MODELS = [
    { name: 'Claude Opus 4.8', vendor: 'Anthropic', logo: '/assets/logos/anthropic-color.svg' },
    { name: 'GPT-5.5', vendor: 'OpenAI', logo: '/assets/logos/openai-color.svg' },
    { name: 'Gemini 3 Pro', vendor: 'Google', logo: '/assets/logos/gemini-color.svg' },
    { name: 'Mistral Large 3', vendor: 'Mistral AI', logo: '/assets/logos/mistral-color.svg' },
    { name: 'Llama 4 Maverick', vendor: 'Meta', logo: '/assets/logos/meta-color.svg' },
    { name: 'Nemotron 3 Ultra', vendor: 'NVIDIA', logo: '/assets/logos/nvidia-color.svg' },
];

export function IlluModels() {
    const { ink, mutedText, surface } = TOKENS;
    return (
        <div className="w-full font-sans" aria-hidden="true">
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
                {MODELS.map((m) => (
                    <div
                        key={m.name}
                        className="flex items-center"
                        style={{ gap: 14, padding: '17px 18px', borderRadius: 14, background: surface, boxShadow: EMBOSS_SOFT }}
                    >
                        <img
                            src={m.logo}
                            alt=""
                            width={30}
                            height={30}
                            style={{ width: 30, height: 30, objectFit: 'contain', flex: '0 0 auto' }}
                        />
                        <div style={{ minWidth: 0 }}>
                            <div className="font-sans" style={{ fontSize: 15, fontWeight: 600, color: ink, lineHeight: 1.15, whiteSpace: 'nowrap' }}>
                                {m.name}
                            </div>
                            <div className="font-mono" style={{ fontSize: 10.5, color: mutedText, marginTop: 3 }}>
                                {m.vendor}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
