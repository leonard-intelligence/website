// 04 · CONTEXTE & CONNAISSANCE — "Un contexte qui prend de la valeur." (decorative).
// Minimalist + explicit: ONE big curve — knowledge compounding over turns (avec
// mémoire) vs staying flat (sans). One clear idea, lots of air.
import { TOKENS } from '../Sections';
import { EMBOSS, DIVIDER, LineChart } from './kit';

export function IlluCompound({ accent }: { accent: string }) {
    const { ink, mutedText, white, pale } = TOKENS;
    const avec = [8, 16, 26, 38, 53, 70, 88];
    const sans = [8, 11, 12, 13, 13, 14, 15];
    return (
        <div className="w-full mx-auto font-sans" style={{ maxWidth: 440 }} aria-hidden="true">
            <div className="font-sans" style={{ fontSize: 16, fontWeight: 600, color: ink, lineHeight: 1.2 }}>La connaissance se capitalise</div>
            <div className="font-mono" style={{ fontSize: 10.5, color: mutedText, marginTop: 6, marginBottom: 16 }}>Chaque tour reprend là où le précédent s'est arrêté.</div>

            <div style={{ borderRadius: 14, background: `linear-gradient(180deg, ${white}, ${pale})`, boxShadow: EMBOSS, padding: '16px 16px 12px' }}>
                <LineChart
                    series={[{ color: '#C8C8C0', pts: sans }, { color: accent, pts: avec }]}
                    height={154}
                    yMax={95}
                    xLabels={['T0', '', '', '', '', '', 'T+n']}
                />
                <div className="flex items-center" style={{ gap: 20, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${DIVIDER}` }}>
                    <span className="inline-flex items-center font-mono" style={{ gap: 8, fontSize: 10.5, color: ink }}>
                        <span style={{ width: 16, height: 3, borderRadius: 2, background: accent }} />
                        Avec mémoire
                    </span>
                    <span className="inline-flex items-center font-mono" style={{ gap: 8, fontSize: 10.5, color: mutedText }}>
                        <span style={{ width: 16, height: 3, borderRadius: 2, background: '#C8C8C0' }} />
                        Sans mémoire
                    </span>
                </div>
            </div>
        </div>
    );
}
