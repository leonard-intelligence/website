// 03 · DONNÉES & INTÉGRATIONS — "Ce à quoi l'agent se branche." (decorative).
// Minimalist + explicit: a few sources fan-in (dashed) into ONE dominant
// "Contexte unifié" node. One clear idea — tout converge, sans silo.
import { TOKENS } from '../Sections';
import { EMBOSS, EMBOSS_SOFT, PulseDot } from './kit';

export function IlluConnect({ accent }: { accent: string }) {
    const { ink, mutedText, surface, white, pale, forest } = TOKENS;
    const sources = ['CRM', 'ERP', 'MCP', 'API'];
    const ys = [45, 114, 186, 255]; // viewBox-space y centers (0..300)

    return (
        <div className="w-full mx-auto font-sans" style={{ maxWidth: 460 }} aria-hidden="true">
            <div className="relative w-full" style={{ aspectRatio: '460 / 300' }}>
                {/* fan-in connectors */}
                <svg viewBox="0 0 460 300" width="100%" height="100%" style={{ position: 'absolute', inset: 0, display: 'block' }} aria-hidden="true">
                    {ys.map((cy, i) => (
                        <path key={i} d={`M156 ${cy} C 216 ${cy}, 216 150, 276 150`} fill="none" stroke="rgba(23,23,23,0.18)" strokeWidth="1.2" strokeDasharray="4 4" strokeLinecap="round" />
                    ))}
                    {ys.map((cy, i) => (
                        <circle key={'s' + i} cx="156" cy={cy} r="2.4" fill={surface} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
                    ))}
                    <circle cx="276" cy="150" r="3" fill={surface} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
                </svg>

                {/* source chips */}
                {sources.map((s, i) => (
                    <div
                        key={s}
                        className="flex items-center"
                        style={{ position: 'absolute', left: 0, top: `${(ys[i] / 300) * 100}%`, transform: 'translateY(-50%)', width: '34%', gap: 9, padding: '11px 13px', borderRadius: 11, background: surface, boxShadow: EMBOSS_SOFT }}
                    >
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: forest, flex: '0 0 auto' }} />
                        <span className="font-mono" style={{ fontSize: 12, color: ink, letterSpacing: '0.04em' }}>{s}</span>
                    </div>
                ))}

                {/* unified context node — dominant */}
                <div
                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '40%', borderRadius: 14, background: `linear-gradient(180deg, ${white}, ${pale})`, boxShadow: `0 0 0 1.5px ${accent}, ${EMBOSS}`, padding: '16px 16px' }}
                >
                    <span className="inline-flex items-center" style={{ gap: 7, marginBottom: 7 }}>
                        <PulseDot color={accent} size={7} />
                        <span className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.16em', color: mutedText }}>UNIFIÉ</span>
                    </span>
                    <div className="font-sans" style={{ fontSize: 16, fontWeight: 600, color: ink, lineHeight: 1.15 }}>Contexte unifié</div>
                    <div className="font-mono" style={{ fontSize: 10.5, color: mutedText, marginTop: 6 }}>1 agent · 0 silo</div>
                </div>
            </div>

            <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: mutedText, textAlign: 'center', marginTop: 8 }}>
                VOS SOURCES · UN SEUL CONTEXTE
            </div>
        </div>
    );
}
