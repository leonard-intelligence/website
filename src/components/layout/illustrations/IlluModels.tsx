// 01 · MODÈLES — "On choisit le modèle. Par tâche." (decorative).
// Minimalist + explicit (cofounder philosophy): one task → one retained model
// (dominant, accent ring), with the criteria that decided it and two discreet
// discarded alternatives. Lots of air, big labels, one clear idea.
import { TOKENS } from '../Sections';
import { EMBOSS, EMBOSS_SOFT, PILL_EMBOSS } from './kit';

export function IlluModels({ accent }: { accent: string }) {
    const { ink, mutedText, white, pale, surface } = TOKENS;
    const criteria = ['Précision', 'Confidentialité', 'Coût'];
    const alts = [
        { name: 'GPT-4o', vendor: 'OpenAI' },
        { name: 'Mistral Large', vendor: 'Mistral AI' },
    ];
    return (
        <div className="w-full font-sans mx-auto" style={{ maxWidth: 420 }} aria-hidden="true">
            {/* Task */}
            <div className="flex items-center" style={{ gap: 10 }}>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: mutedText, padding: '3px 9px', borderRadius: 999, background: surface, boxShadow: PILL_EMBOSS, flex: '0 0 auto' }}>TÂCHE</span>
                <span className="font-sans" style={{ fontSize: 15, fontWeight: 500, color: ink }}>Analyse de contrat</span>
            </div>

            {/* Connector */}
            <div className="flex items-center" style={{ gap: 9, margin: '12px 0', paddingLeft: 7 }}>
                <span style={{ width: 0, height: 16, borderLeft: '1px dashed rgba(23,23,23,0.28)' }} />
                <span className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: mutedText }}>MODÈLE RETENU</span>
            </div>

            {/* Retained model — dominant */}
            <div style={{ borderRadius: 14, background: `linear-gradient(180deg, ${white}, ${pale})`, boxShadow: `0 0 0 1.5px ${accent}, ${EMBOSS}`, padding: '16px 18px' }}>
                <div className="flex items-center" style={{ gap: 10 }}>
                    <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                        <div className="font-sans" style={{ fontSize: 19, fontWeight: 600, color: ink, lineHeight: 1.1 }}>Claude</div>
                        <div className="font-mono" style={{ fontSize: 10.5, color: mutedText, marginTop: 4 }}>Anthropic · propriétaire</div>
                    </div>
                    <span className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.12em', color: ink, padding: '4px 11px', borderRadius: 999, background: surface, boxShadow: PILL_EMBOSS, flex: '0 0 auto' }}>RETENU</span>
                </div>
                <div className="flex items-center" style={{ gap: 16, marginTop: 15 }}>
                    {criteria.map((c) => (
                        <span key={c} className="inline-flex items-center font-mono" style={{ gap: 6, fontSize: 10.5, color: mutedText }}>
                            <span style={{ width: 6, height: 6, borderRadius: 999, background: accent, flex: '0 0 auto' }} />
                            {c}
                        </span>
                    ))}
                </div>
            </div>

            {/* Alternatives */}
            <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: mutedText, margin: '18px 0 9px' }}>AUTRES CANDIDATS</div>
            <div className="flex flex-col" style={{ gap: 8 }}>
                {alts.map((a) => (
                    <div key={a.name} className="flex items-center" style={{ gap: 10, padding: '11px 15px', borderRadius: 11, background: surface, boxShadow: EMBOSS_SOFT, opacity: 0.7 }}>
                        <span className="font-sans" style={{ fontSize: 13, fontWeight: 500, color: ink }}>{a.name}</span>
                        <span className="font-mono" style={{ fontSize: 10, color: mutedText }}>{a.vendor}</span>
                        <span className="ml-auto font-mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: mutedText }}>écarté</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
