// 07 · SÉCURITÉ & GOUVERNANCE — "Les étapes critiques restent sous contrôle." (decorative).
// Minimalist + explicit: the human-in-the-loop moment as the hero — a sensitive
// action stops at a validation gate (Approuver / Refuser), with two governance
// chips for breadth (rôles, audit). One clear idea.
import { TOKENS } from '../Sections';
import { EMBOSS, EMBOSS_SOFT, PILL_EMBOSS, PulseDot, Check } from './kit';

export function IlluSecurity({ accent }: { accent: string }) {
    const { ink, mutedText, white, pale, surface, gold, forest } = TOKENS;
    return (
        <div className="w-full mx-auto font-sans" style={{ maxWidth: 420 }} aria-hidden="true">
            {/* Sensitive action */}
            <div className="flex items-center" style={{ gap: 10 }}>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: mutedText, padding: '3px 9px', borderRadius: 999, background: surface, boxShadow: PILL_EMBOSS, flex: '0 0 auto' }}>ACTION SENSIBLE</span>
                <span className="font-sans" style={{ fontSize: 15, fontWeight: 500, color: ink }}>Export de données client</span>
            </div>

            {/* Connector */}
            <div className="flex items-center" style={{ gap: 9, margin: '12px 0', paddingLeft: 7 }}>
                <span style={{ width: 0, height: 16, borderLeft: '1px dashed rgba(23,23,23,0.28)' }} />
                <span className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', color: mutedText }}>VALIDATION REQUISE</span>
            </div>

            {/* Gate — dominant */}
            <div style={{ borderRadius: 14, background: `linear-gradient(180deg, ${white}, ${pale})`, boxShadow: `0 0 0 1.5px ${accent}, ${EMBOSS}`, padding: '16px 18px' }}>
                <div className="flex items-center" style={{ gap: 9, marginBottom: 15 }}>
                    <PulseDot color={gold} size={8} />
                    <span className="font-sans" style={{ fontSize: 17, fontWeight: 600, color: ink }}>En attente d'approbation</span>
                </div>
                <div className="flex items-center" style={{ gap: 10 }}>
                    <span className="inline-flex items-center justify-center font-mono" style={{ flex: '1 1 0', gap: 7, padding: '10px 0', borderRadius: 10, fontSize: 12, color: forest, background: surface, boxShadow: `0 0 0 1px ${forest}66, ${EMBOSS_SOFT}` }}>
                        <Check color={forest} size={12} />
                        Approuver
                    </span>
                    <span className="inline-flex items-center justify-center font-mono" style={{ flex: '1 1 0', padding: '10px 0', borderRadius: 10, fontSize: 12, color: mutedText, background: surface, boxShadow: EMBOSS_SOFT }}>
                        Refuser
                    </span>
                </div>
            </div>

            {/* Governance breadth */}
            <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: mutedText, margin: '18px 0 9px' }}>GOUVERNANCE</div>
            <div className="flex items-center" style={{ gap: 9 }}>
                {['Accès par rôle', "Journal d'audit"].map((c) => (
                    <span key={c} className="inline-flex items-center font-mono" style={{ flex: '1 1 0', justifyContent: 'center', gap: 7, padding: '10px 0', borderRadius: 10, fontSize: 11, color: ink, background: surface, boxShadow: EMBOSS_SOFT }}>
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: accent, flex: '0 0 auto' }} />
                        {c}
                    </span>
                ))}
            </div>
        </div>
    );
}
