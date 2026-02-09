import { LegalPageLayout } from './LegalPageLayout';

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
    return (
        <section className="group">
            <h2 className="text-lg md:text-xl font-medium text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#e67d23] rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></span>
                {title}
            </h2>
            <div className="pl-4 border-l border-white/5 text-sm md:text-base">
                {children}
            </div>
        </section>
    );
}

interface InfoItemProps {
    label: string;
    value: string | React.ReactNode;
}

function InfoItem({ label, value }: InfoItemProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:gap-2 py-2 border-b border-white/5 last:border-0">
            <span className="text-gray-500 text-sm sm:min-w-[200px]">{label}</span>
            <span className="text-gray-300">{value}</span>
        </div>
    );
}

export function MentionsLegales() {
    return (
        <LegalPageLayout title="Mentions Légales" path="/mentions-legales">
            <Section title="1. Éditeur du site">
                <p className="mb-6">
                    Le site leonardintelligence.com (ci-après le "Site") est édité par la
                    société <span className="text-white font-medium">Leonard Intelligence</span>.
                </p>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-0">
                    <InfoItem label="Forme juridique" value="[SASU / SAS / SARL - À COMPLÉTER]" />
                    <InfoItem label="Capital social" value="[XX XXX] €" />
                    <InfoItem label="Siège social" value="[ADRESSE COMPLÈTE À COMPLÉTER]" />
                    <InfoItem label="RCS" value="[VILLE] B [NUMÉRO SIREN]" />
                    <InfoItem label="TVA Intracommunautaire" value="FR[XX XXX XXX XXX]" />
                    <InfoItem label="Directeur de la publication" value="[NOM DU DIRIGEANT]" />
                    <InfoItem
                        label="Email de contact"
                        value={
                            <a
                                href="mailto:hello@leonardintelligence.com"
                                className="text-[#e67d23] hover:text-[#F39C12] transition-colors"
                            >
                                hello@leonardintelligence.com
                            </a>
                        }
                    />
                </div>
            </Section>

            <Section title="2. Hébergement">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <p className="text-white font-medium mb-2">[NOM DE L'HÉBERGEUR - ex: Vercel Inc.]</p>
                    <p className="text-gray-400 text-sm">
                        [Adresse de l'hébergeur]<br />
                        [Site web de l'hébergeur]
                    </p>
                </div>
            </Section>

            <Section title="3. Propriété Intellectuelle">
                <p>
                    L'ensemble de ce Site relève de la législation française et
                    internationale sur le droit d'auteur et la propriété intellectuelle.
                    Tous les droits de reproduction sont réservés, y compris pour les
                    documents téléchargeables et les représentations iconographiques et
                    photographiques.
                </p>
                <p className="mt-4 text-gray-400 text-sm">
                    La reproduction de tout ou partie de ce site sur un support électronique
                    quel qu'il soit est formellement interdite sauf autorisation expresse du
                    directeur de la publication.
                </p>
            </Section>

            <Section title="4. Données Personnelles (RGPD)">
                <p>
                    Les informations recueillies via le formulaire de contact sont
                    enregistrées dans un fichier informatisé par Leonard Intelligence pour
                    la gestion de la relation client. Elles sont conservées pendant la durée
                    nécessaire à la gestion de la relation commerciale et sont destinées
                    exclusivement aux services de Leonard Intelligence.
                </p>

                <div className="mt-6 p-4 bg-[#e67d23]/10 rounded-lg border border-[#e67d23]/30">
                    <p className="text-sm">
                        <span className="text-white font-medium">Vos droits :</span> Conformément à
                        la loi « informatique et libertés » et au RGPD, vous pouvez exercer
                        votre droit d'accès, de rectification, de suppression des données
                        vous concernant en contactant :{' '}
                        <a
                            href="mailto:hello@leonardintelligence.com"
                            className="text-[#e67d23] hover:text-[#F39C12] transition-colors"
                        >
                            hello@leonardintelligence.com
                        </a>
                    </p>
                </div>
            </Section>

            <Section title="5. Cookies">
                <p>
                    Le site peut utiliser des cookies pour améliorer l'expérience utilisateur
                    et réaliser des statistiques de visites anonymes.
                </p>
                <p className="mt-4 text-gray-400 text-sm">
                    Vous pouvez configurer votre navigateur pour refuser les cookies.
                </p>
            </Section>
        </LegalPageLayout>
    );
}

export default MentionsLegales;
