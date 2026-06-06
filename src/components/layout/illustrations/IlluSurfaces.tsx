// 06 · PRODUITS & INTERFACES — product-surface preview + agent operations thread (cofounder idiom).
// LEFT (base): an embossed preview of a delivered surface (an agent console).
// RIGHT (overlay, taller): a conversational thread of the agent operating it — messages,
//   sub-agent delegation, tool runs, validation gate, input bar.
// Light palette + Geist. Sample data is illustrative process chrome (no business outcomes).
import { TOKENS } from '../Sections';
import { Spinner, Check, PulseDot } from './kit';

const EMBOSS = '0 0 0 0.8px #FFFFFF inset, 0 0 0 0.8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)';
const PREVIEW_SHADOW =
    '0 0 2px rgba(0,0,0,0.22), 0 0 0 4px rgba(232,231,230,0.32), inset 0 0 0.357px 1.5px rgba(255,255,255,0.35), inset 0 2px 0 #FFFFFF';
const PANEL_SHADOW =
    '0 0 0 1px rgba(0,0,0,0.08), 0 0 20px rgba(0,0,0,0.03), 0 25px 25px rgba(0,0,0,0.02), 0 15px 15px rgba(0,0,0,0.02), inset 0 0 0 1px #FFFFFF';
const BUBBLE_SHADOW =
    'inset 0 0 0.26px 1.1px rgba(255,255,255,0.35), inset 0 1.47px 0 #FFFFFF, 0 0 1.47px rgba(0,0,0,0.22)';
const ROW_BG = 'linear-gradient(180deg, #F5F5F2 0%, rgba(245,245,242,0.5) 100%)';
const SEND_BG =
    'linear-gradient(0deg, rgba(32,32,32,0.10), rgba(32,32,32,0.10)), linear-gradient(180deg, #4F4F4F 0%, rgba(32,32,32,0.85) 100%)';
const SEND_SHADOW =
    '0 0 0 1px rgba(64,64,64,0.12), 0 3px 4px rgba(0,0,0,0.16), inset 0 2px 0 rgba(255,255,255,0.24), inset 0 -0.5px 2px rgba(0,0,0,0.25)';
const PILL_SHADOW =
    '0 0.2px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.05)';

// ── Pixel agent glyph (cofounder avatar) ─────────────────────────────────────
function PixelGlyph({ size = 12 }: { size?: number }) {
    const c = (o: number) => `rgba(23,23,23,${o})`;
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
            <rect x="5.27" y="1.84" width="1.47" height="1.47" fill={c(0.6)} />
            <rect x="5.27" y="8.45" width="1.47" height="1.47" fill={c(0.6)} />
            <rect x="5.63" y="5.88" width="0.73" height="0.73" fill={c(0.2)} />
            <rect x="3.06" y="8.81" width="0.73" height="0.73" fill={c(0.2)} />
            <rect x="8.2" y="8.81" width="0.73" height="0.73" fill={c(0.2)} />
            <rect x="0.12" y="8.45" width="1.47" height="1.47" fill={c(0.6)} />
            <rect x="2.33" y="5.14" width="1.47" height="1.47" fill={c(0.6)} />
            <rect x="8.2" y="5.14" width="1.47" height="1.47" fill={c(0.6)} />
            <rect x="10.41" y="8.45" width="1.47" height="1.47" fill={c(0.6)} />
        </svg>
    );
}

// ── Sub-agent progress glyph (3×3 fading grid) ───────────────────────────────
function ProgressGrid() {
    const cells = [0.9, 0.6, 0.35, 0.6, 0.35, 0.35, 0.35, 0.2, 0.2];
    return (
        <span style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 2px)', gridTemplateRows: 'repeat(3, 2px)', gap: 1.6, width: 10, height: 10 }}>
            {cells.map((o, i) => (
                <span key={i} style={{ width: 2, height: 2, background: `rgba(23,23,23,${o})` }} />
            ))}
        </span>
    );
}

// ── Preview: a delivered agent console surface ───────────────────────────────
function PreviewCard() {
    const { ink, mutedText, border, white, pale, surface, gold, forest } = TOKENS;
    const rows: { id: string; status: string; mark: 'done' | 'run' | 'queue' }[] = [
        { id: 'Demande #2481', status: 'Réponse proposée', mark: 'done' },
        { id: 'Demande #2482', status: 'Traitement en cours', mark: 'run' },
        { id: 'Demande #2483', status: 'En file', mark: 'queue' },
    ];
    return (
        <div style={{ width: '100%', padding: 2, borderRadius: 8, background: surface, boxShadow: PREVIEW_SHADOW }}>
            {/* tab */}
            <div className="flex items-center" style={{ padding: '11px 11px 6px' }}>
                <span className="inline-flex items-center font-mono" style={{ fontSize: 9, color: mutedText, padding: '2px 9px', borderRadius: 100, background: surface, boxShadow: PILL_SHADOW, whiteSpace: 'nowrap' }}>
                    Console agent
                </span>
            </div>
            {/* screen */}
            <div style={{ borderRadius: 7, background: pale, boxShadow: '0 0 0 0.7px rgba(0,0,0,0.08), inset 0 0 0 0.7px #FFFFFF', overflow: 'hidden', padding: 2 }}>
                <div style={{ background: white, borderRadius: 6, overflow: 'hidden' }}>
                    {/* console header */}
                    <div className="flex items-center" style={{ gap: 7, padding: '9px 12px', borderBottom: `1px solid ${border}` }}>
                        <span className="flex" style={{ gap: 4 }}>
                            {['#E6675A', '#E8B53D', '#5BB85B'].map((c) => (
                                <span key={c} style={{ width: 6, height: 6, borderRadius: 999, background: c, opacity: 0.5 }} />
                            ))}
                        </span>
                        <span className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.12em', color: mutedText }}>CONSOLE · RELATION CLIENT</span>
                    </div>
                    {/* rows */}
                    <div className="flex flex-col" style={{ gap: 7, padding: 12 }}>
                        {rows.map((r) => (
                            <div key={r.id} className="flex items-center" style={{ gap: 10, padding: '8px 10px', borderRadius: 9, background: pale, boxShadow: EMBOSS }}>
                                <span className="inline-flex items-center justify-center" style={{ width: 24, height: 24, borderRadius: 7, background: surface, boxShadow: 'inset 0 0 0 0.7px #FFFFFF, 0 0 0 0.7px rgba(0,0,0,0.07)', flex: '0 0 auto' }}>
                                    <PixelGlyph size={11} />
                                </span>
                                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                                    <div className="font-sans truncate" style={{ fontSize: 11, fontWeight: 500, color: ink, lineHeight: '15px' }}>{r.id}</div>
                                    <div className="font-sans truncate" style={{ fontSize: 10.5, color: mutedText, lineHeight: '14px' }}>{r.status}</div>
                                </div>
                                <span className="inline-flex items-center" style={{ flex: '0 0 auto' }}>
                                    {r.mark === 'done' && <Check color={forest} size={11} />}
                                    {r.mark === 'run' && <Spinner color={ink} size={11} />}
                                    {r.mark === 'queue' && <span style={{ width: 7, height: 7, borderRadius: 999, background: gold }} />}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* label */}
            <div style={{ padding: '8px 11px 6px' }}>
                <span className="font-sans" style={{ fontSize: 9, fontWeight: 500, color: mutedText }}>Console · Relation client</span>
            </div>
        </div>
    );
}

// ── Thread atoms ─────────────────────────────────────────────────────────────
function UserBubble({ children }: { children: React.ReactNode }) {
    const { ink } = TOKENS;
    return (
        <div className="flex" style={{ justifyContent: 'flex-end', width: '100%' }}>
            <div style={{ maxWidth: '78%', padding: '8px 11px', borderRadius: 8, background: ROW_BG, boxShadow: BUBBLE_SHADOW }}>
                <p className="font-sans" style={{ margin: 0, fontSize: 11, fontWeight: 500, lineHeight: 1.5, color: ink }}>{children}</p>
            </div>
        </div>
    );
}

function AgentMsg({ children }: { children: React.ReactNode }) {
    const { mutedText } = TOKENS;
    return (
        <div className="flex items-start" style={{ gap: 8, width: '100%', padding: '3px 8px 3px 0' }}>
            <span style={{ width: 16, height: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PixelGlyph /></span>
            <p className="font-sans" style={{ margin: 0, flex: '1 1 0%', fontSize: 11, fontWeight: 430, lineHeight: 1.6, color: mutedText }}>{children}</p>
        </div>
    );
}

function SubAgentCard({ label, time }: { label: string; time: string }) {
    const { ink, mutedText } = TOKENS;
    return (
        <div style={{ padding: '4px 8px 4px 24px', width: '100%' }}>
            <div className="flex items-center justify-between" style={{ gap: 10, padding: 8, border: '0.7px solid rgba(32,32,32,0.08)', background: 'rgba(255,255,255,0.18)', borderRadius: 4 }}>
                <span className="inline-flex items-center" style={{ gap: 9 }}>
                    <PixelGlyph />
                    <span className="font-mono" style={{ fontSize: 10, letterSpacing: '-0.01em', color: ink }}>{label}</span>
                </span>
                <span className="inline-flex items-center" style={{ gap: 7 }}>
                    <ProgressGrid />
                    <span className="font-mono" style={{ fontSize: 9.5, color: mutedText }}>{time}</span>
                </span>
            </div>
        </div>
    );
}

function ToolRun({ label, detail, state }: { label: string; detail: string; state: 'done' | 'run' }) {
    const { ink, mutedText, forest } = TOKENS;
    return (
        <div className="flex items-center" style={{ gap: 8, padding: '5px 8px 5px 24px', width: '100%' }}>
            {state === 'done' ? <Check color={forest} size={11} /> : <Spinner color={ink} size={11} />}
            <span className="font-mono" style={{ fontSize: 10, color: ink, flex: '0 0 auto' }}>{label}</span>
            <span className="font-sans truncate" style={{ fontSize: 10, color: mutedText, flex: '1 1 auto' }}>{detail}</span>
        </div>
    );
}

function ThreadPanel() {
    const { ink, mutedText, border, surface, pale, gold } = TOKENS;
    return (
        <div className="flex flex-col" style={{ width: '100%', minHeight: 420, height: '100%', padding: '6px 2px 2px', borderRadius: 12, background: pale, boxShadow: PANEL_SHADOW, overflow: 'hidden' }}>
            {/* breadcrumb */}
            <div className="flex items-center" style={{ gap: 5, padding: '4px 13px 8px', flexShrink: 0 }}>
                <span className="font-sans" style={{ fontSize: 10, fontWeight: 500, color: mutedText }}>Agent · Relation client</span>
                <span className="font-sans" style={{ fontSize: 10, fontWeight: 500, color: mutedText }}>/</span>
                <span className="font-sans" style={{ fontSize: 10, fontWeight: 500, color: ink }}>Session</span>
                <span className="ml-auto inline-flex items-center" style={{ gap: 5 }}>
                    <PulseDot color={gold} size={6} />
                    <span className="font-mono" style={{ fontSize: 9, color: mutedText }}>en cours</span>
                </span>
            </div>

            {/* thread area */}
            <div className="relative" style={{ flex: '1 1 auto', minHeight: 0, borderRadius: 11, border: `0.6px solid ${border}`, background: surface, boxShadow: 'inset 0 1.1px 0 rgba(255,255,255,0.25), inset 0 1.5px 9px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <div className="flex flex-col" style={{ gap: 2, padding: '14px 16px 56px' }}>
                    <UserBubble>Traite les demandes entrantes et escalade si besoin.</UserBubble>
                    <div style={{ height: 6 }} />
                    <AgentMsg>Je récupère le contexte du dossier et je m'appuie sur les outils branchés.</AgentMsg>
                    <AgentMsg>Délégation à un sous-agent</AgentMsg>
                    <SubAgentCard label="Sous-agent · Qualification" time="1m 20s" />
                    <ToolRun label="Outil · CRM" detail="fiche client récupérée" state="done" />
                    <AgentMsg>Réponse rédigée. Une action sensible nécessite ta validation avant envoi.</AgentMsg>
                    <ToolRun label="Outil · Email" detail="brouillon prêt, en attente" state="run" />
                </div>
                {/* bottom fade */}
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, background: 'linear-gradient(rgba(245,245,242,0) 0%, #F5F5F2 70%)', pointerEvents: 'none' }} />
            </div>

            {/* input bar */}
            <div style={{ flexShrink: 0, marginTop: 8, height: 42, borderRadius: 8, background: pale, boxShadow: '0 2px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 1px #FFFFFF', position: 'relative' }}>
                <span className="font-sans" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 11, fontWeight: 500, color: '#BFBFBF', whiteSpace: 'nowrap' }}>Demander à l'agent…</span>
                <span className="inline-flex items-center justify-center" style={{ position: 'absolute', right: 7, top: 7, width: 28, height: 28, borderRadius: 6, border: '1px solid #383838', background: SEND_BG, boxShadow: SEND_SHADOW }}>
                    <svg width="12" height="12" viewBox="0 0 17 17" fill="none" aria-hidden="true"><path d="M8.5 14.17V2.83M8.5 2.83 3.54 7.79M8.5 2.83 13.46 7.79" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
            </div>
        </div>
    );
}

export function IlluSurfaces({ accent }: { accent: string }) {
    // accent (lime) reserved for the section; this surface reads in neutral product chrome.
    void accent;
    return (
        <div className="w-full font-sans mx-auto" style={{ maxWidth: 960 }} aria-hidden="true">
            <div className="relative min-[768px]:h-[440px]">
                <div className="w-full min-[768px]:absolute min-[768px]:left-0 min-[768px]:top-1/2 min-[768px]:w-[62%] min-[768px]:-translate-y-1/2" style={{ zIndex: 1 }}>
                    <PreviewCard />
                </div>
                <div className="w-full mt-4 min-[768px]:mt-0 min-[768px]:absolute min-[768px]:right-0 min-[768px]:top-0 min-[768px]:bottom-0 min-[768px]:w-[42%]" style={{ zIndex: 2 }}>
                    <ThreadPanel />
                </div>
            </div>
        </div>
    );
}
