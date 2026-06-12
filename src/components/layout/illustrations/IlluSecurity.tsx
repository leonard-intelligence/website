// 07 · SÉCURITÉ & GOUVERNANCE — séquence vivante : le journal d'audit en
// direct. Les actions de l'agent s'inscrivent une à une (tout est tracé),
// l'action sensible S'ARRÊTE à la validation humaine (gate Approuver/Refuser),
// puis le livrable part. Le client ne lit pas « sécurité », il voit : l'agent
// travaille sur de vrais systèmes ET je garde la main. Boucle douce.
import { useEffect, useState } from 'react';
import { TOKENS } from '../Sections';
import { EMBOSS, EMBOSS_SOFT, PILL_EMBOSS, PulseDot, Check } from './kit';

const ROW_BG = 'linear-gradient(180deg, #F5F5F2 0%, rgba(245,245,242,0.55) 100%)';

// Échéancier du cycle (ms)
const CYCLE = 11000;
const T_ROWS = [500, 1300, 2100]; // apparition des 3 premières lignes
const T_GATE = 3000; // la gate apparaît (EN ATTENTE)
const T_APPROVED = 5600; // validation humaine
const T_FINAL = 6800; // dernière ligne (envoi)
const T_FADE = 10200; // fondu de sortie

const ROWS = [
    { time: '09:41:02', label: 'Lecture CRM · dossier #2481' },
    { time: '09:41:05', label: 'Extraction de 12 pièces' },
    { time: '09:41:11', label: 'Rédaction de la synthèse' },
];

function AuditRow({ time, label, shown }: { time: string; label: string; shown: boolean }) {
    const { ink, mutedText, forest } = TOKENS;
    return (
        <div
            className="flex items-center"
            style={{
                gap: 10,
                padding: '7px 11px',
                borderRadius: 9,
                background: ROW_BG,
                boxShadow: `0 0 0 0.8px ${ink}14, inset 0 1.2px 0 #FFFFFF`,
                opacity: shown ? 1 : 0,
                transform: shown ? 'none' : 'translateY(6px)',
                transition: 'opacity 450ms ease, transform 450ms ease',
            }}
        >
            <span className="font-mono shrink-0" style={{ fontSize: 9.5, color: mutedText }}>{time}</span>
            <span className="font-sans truncate" style={{ fontSize: 11.5, fontWeight: 500, color: ink }}>{label}</span>
            <span className="ml-auto shrink-0 inline-flex"><Check color={forest} size={10} /></span>
        </div>
    );
}

export function IlluSecurity({ accent }: { accent: string }) {
    const { ink, mutedText, white, pale, surface, gold, forest } = TOKENS;
    const [t, setT] = useState(0);

    useEffect(() => {
        // état final statique si l'utilisateur préfère réduire les animations
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setT(T_FINAL + 500);
            return;
        }
        const t0 = performance.now();
        const id = setInterval(() => setT((performance.now() - t0) % CYCLE), 120);
        return () => clearInterval(id);
    }, []);

    const approved = t >= T_APPROVED;
    const gateShown = t >= T_GATE;
    const fading = t >= T_FADE;

    return (
        <div
            className="w-full mx-auto font-sans"
            style={{ maxWidth: 420, opacity: fading ? 0 : 1, transition: 'opacity 650ms ease' }}
            aria-hidden="true"
        >
            {/* entête du journal — tout est tracé */}
            <div className="flex items-center" style={{ gap: 8, marginBottom: 11 }}>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: mutedText, padding: '3px 9px', borderRadius: 999, background: surface, boxShadow: PILL_EMBOSS }}>
                    JOURNAL D'AUDIT
                </span>
                <span className="ml-auto inline-flex items-center" style={{ gap: 6 }}>
                    <PulseDot color={accent} size={6} />
                    <span className="font-mono" style={{ fontSize: 9, color: mutedText }}>en direct</span>
                </span>
            </div>

            {/* les actions s'inscrivent une à une */}
            <div className="flex flex-col" style={{ gap: 7 }}>
                {ROWS.map((r, i) => (
                    <AuditRow key={r.label} time={r.time} label={r.label} shown={t >= T_ROWS[i]} />
                ))}
            </div>

            {/* l'action sensible s'arrête : validation humaine */}
            <div
                style={{
                    marginTop: 10,
                    borderRadius: 14,
                    background: `linear-gradient(180deg, ${white}, ${pale})`,
                    boxShadow: approved ? `0 0 0 1.5px ${forest}88, ${EMBOSS}` : `0 0 0 1.5px ${accent}, ${EMBOSS}`,
                    padding: '14px 16px',
                    opacity: gateShown ? 1 : 0,
                    transform: gateShown ? 'none' : 'translateY(8px)',
                    transition: 'opacity 450ms ease, transform 450ms ease, box-shadow 450ms ease',
                }}
            >
                <div className="flex items-center" style={{ gap: 9, marginBottom: 5 }}>
                    <span className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.14em', color: mutedText, padding: '2px 8px', borderRadius: 999, background: surface, boxShadow: PILL_EMBOSS }}>
                        ACTION SENSIBLE
                    </span>
                </div>
                <div className="font-sans" style={{ fontSize: 14.5, fontWeight: 600, color: ink, marginBottom: 11 }}>
                    Export de données client
                </div>

                {approved ? (
                    <div className="flex items-center" style={{ gap: 8 }}>
                        <Check color={forest} size={13} />
                        <span className="font-sans" style={{ fontSize: 12.5, fontWeight: 500, color: forest }}>Approuvé</span>
                        <span className="font-mono" style={{ fontSize: 9.5, color: mutedText, marginLeft: 'auto' }}>validé par un humain</span>
                    </div>
                ) : (
                    <div className="flex items-center" style={{ gap: 10 }}>
                        <span className="inline-flex items-center" style={{ gap: 7, marginRight: 2 }}>
                            <PulseDot color={gold} size={7} />
                            <span className="font-mono" style={{ fontSize: 9.5, color: mutedText, whiteSpace: 'nowrap' }}>En attente</span>
                        </span>
                        <span className="inline-flex items-center justify-center font-mono" style={{ flex: '1 1 0', gap: 6, padding: '8px 0', borderRadius: 9, fontSize: 11, color: forest, background: surface, boxShadow: `0 0 0 1px ${forest}66, ${EMBOSS_SOFT}` }}>
                            <Check color={forest} size={11} />
                            Approuver
                        </span>
                        <span className="inline-flex items-center justify-center font-mono" style={{ flex: '1 1 0', padding: '8px 0', borderRadius: 9, fontSize: 11, color: mutedText, background: surface, boxShadow: EMBOSS_SOFT }}>
                            Refuser
                        </span>
                    </div>
                )}
            </div>

            {/* le livrable part — le résultat */}
            <div style={{ marginTop: 10 }}>
                <AuditRow time="09:41:58" label="Synthèse envoyée au client" shown={t >= T_FINAL} />
            </div>
        </div>
    );
}
