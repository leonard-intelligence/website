import { TechCard } from "@/components/ui/TechCard";

export function Solutions() {
    return (
        <section className="solutions-section">
            <div className="section-header centered">
                <h2>Solutions par Métier</h2>
                <p className="subtitle">Nous résolvons des problèmes business, pas juste de la tech.</p>
            </div>
            <div className="solutions-grid">
                <TechCard>
                    <div className="icon-wrapper blue mb-6 rounded-none bg-white/10 w-12 h-12 flex items-center justify-center text-2xl">💼</div>
                    <h3 className="text-xl font-bold mb-4">Pour les Sales</h3>
                    <ul className="space-y-3">
                        <li className="text-sm text-muted-foreground"><strong className="text-white">Email AI</strong> : Personnalisation de cold outreach à l'échelle.</li>
                        <li className="text-sm text-muted-foreground"><strong className="text-white">CRM Auto</strong> : Enrichissement de leads automatique.</li>
                        <li className="text-sm text-muted-foreground"><strong className="text-white">Chatbots</strong> : Qualification 24/7 sur votre site.</li>
                    </ul>
                </TechCard>
                <TechCard>
                    <div className="icon-wrapper purple mb-6 rounded-none bg-white/10 w-12 h-12 flex items-center justify-center text-2xl">🎨</div>
                    <h3 className="text-xl font-bold mb-4">Pour le Marketing</h3>
                    <ul className="space-y-3">
                        <li className="text-sm text-muted-foreground"><strong className="text-white">Contenu Infini</strong> : Articles SEO & Visuels sociaux.</li>
                        <li className="text-sm text-muted-foreground"><strong className="text-white">Brand Safe</strong> : Respect strict de votre tonalité.</li>
                        <li className="text-sm text-muted-foreground"><strong className="text-white">Reporting</strong> : Analyse de tendances automatique.</li>
                    </ul>
                </TechCard>
                <TechCard>
                    <div className="icon-wrapper green mb-6 rounded-none bg-white/10 w-12 h-12 flex items-center justify-center text-2xl">⚙️</div>
                    <h3 className="text-xl font-bold mb-4">Pour les Ops & RH</h3>
                    <ul className="space-y-3">
                        <li className="text-sm text-muted-foreground"><strong className="text-white">Flux RH</strong> : Tri de CVs et onboarding automatique.</li>
                        <li className="text-sm text-muted-foreground"><strong className="text-white">OCR</strong> : Extraction de données factures/contrats.</li>
                        <li className="text-sm text-muted-foreground"><strong className="text-white">RAG</strong> : Chatbot sur votre base de connaissance interne.</li>
                    </ul>
                </TechCard>
            </div>
        </section>
    );
}
