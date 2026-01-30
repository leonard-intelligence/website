import { LegalPageLayout } from './LegalPageLayout';

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
    return (
        <section className="group">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#E67E22] rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></span>
                {title}
            </h2>
            <div className="pl-4 border-l border-white/5 text-sm md:text-base">
                {children}
            </div>
        </section>
    );
}

export function CGV() {
    const currentDate = new Date().toLocaleDateString('fr-FR');

    return (
        <LegalPageLayout title="Conditions Générales de Vente" lastUpdate={currentDate}>
            <Section title="Article 1 - Objet">
                <p>
                    Les présentes Conditions Générales de Vente (ci-après "CGV") déterminent
                    les droits et obligations des parties dans le cadre de la vente de
                    prestations de services proposées par{' '}
                    <strong className="text-white">Leonard Intelligence</strong> (ci-après le
                    "Prestataire").
                </p>
            </Section>

            <Section title="Article 2 - Dispositions Générales">
                <p>
                    Les présentes CGV s'appliquent à toutes les ventes de prestations de
                    services (conseil en intelligence artificielle, développement, formation,
                    audit) effectuées auprès de tout client professionnel (ci-après "le
                    Client").
                </p>
                <p className="mt-4">
                    Toute commande passée implique l'adhésion entière et sans réserve du
                    Client aux présentes CGV. Aucune condition particulière ne peut, sauf
                    acceptation formelle et écrite du Prestataire, prévaloir contre les CGV.
                </p>
            </Section>

            <Section title="Article 3 - Devis et Commandes">
                <p>
                    Le Prestataire établit un devis gratuit pour toute prestation. Le devis
                    est valable pour une durée de <strong className="text-white">30 jours</strong> à
                    compter de sa date d'émission.
                </p>
                <p className="mt-4">
                    La commande est considérée comme définitive dès réception par le
                    Prestataire du devis daté et signé par le Client, avec la mention "Bon
                    pour accord", accompagné, le cas échéant, de l'acompte prévu au devis.
                </p>
            </Section>

            <Section title="Article 4 - Prix et Modalités de paiement">
                <p>
                    Les prix des prestations sont ceux en vigueur au jour de la prise de
                    commande. Ils sont libellés en euros et calculés hors taxes. Des frais de
                    déplacement ou d'hébergement pourront être facturés en supplément sur
                    justificatifs.
                </p>
                <p className="mt-4">
                    Le règlement des commandes s'effectue par virement bancaire. Sauf
                    convention contraire, les factures sont payables à réception ou selon
                    l'échéancier défini dans le devis (ex: 30% à la commande, solde à la
                    livraison).
                </p>
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-400">
                        <strong className="text-white">⚠️ Retard de paiement :</strong> Tout
                        retard entraînera l'exigibilité immédiate de la totalité des sommes
                        dues, ainsi que l'application de pénalités de retard (3× le taux
                        d'intérêt légal) et une indemnité forfaitaire de 40€.
                    </p>
                </div>
            </Section>

            <Section title="Article 5 - Nature des obligations">
                <p>
                    Le Prestataire s'engage à apporter tout le soin et la diligence
                    nécessaires à la fourniture d'une prestation de qualité conformément aux
                    usages de la profession et à l'état de l'art. Il ne répond que d'une{' '}
                    <strong className="text-white">obligation de moyens</strong>.
                </p>
            </Section>

            <Section title="Article 6 - Propriété Intellectuelle">
                <p>
                    Le Prestataire conserve la propriété exclusive de ses méthodes,
                    savoir-faire, et outils propriétaires utilisés pour réaliser la
                    prestation.
                </p>
                <p className="mt-4">
                    Sauf stipulation contraire dans le devis, les livrables spécifiques
                    réalisés pour le Client deviennent sa propriété à compter du paiement
                    intégral du prix de la prestation.
                </p>
            </Section>

            <Section title="Article 7 - Confidentialité">
                <p>
                    Chaque partie s'engage à conserver strictement confidentiels les
                    informations, documents, et données de toute nature provenant de l'autre
                    partie, dont elle aurait eu connaissance à l'occasion de l'exécution du
                    contrat. Cette obligation perdure pendant l'exécution du contrat et
                    pendant une durée de <strong className="text-white">2 ans</strong> après son
                    expiration.
                </p>
            </Section>

            <Section title="Article 8 - Responsabilité">
                <p>
                    La responsabilité du Prestataire ne saurait être engagée pour des
                    dommages indirects subis par le Client (tels que perte de chiffre
                    d'affaires, perte de données, préjudice d'image).
                </p>
                <p className="mt-4 text-gray-400 text-sm">
                    En tout état de cause, le montant des dommages-intérêts qui pourraient
                    être mis à la charge du Prestataire, si sa responsabilité était engagée,
                    est plafonné au montant des sommes versées par le Client au titre de la
                    prestation concernée.
                </p>
            </Section>

            <Section title="Article 9 - Droit applicable et Juridiction">
                <p>
                    Les présentes CGV sont soumises au{' '}
                    <strong className="text-white">droit français</strong>. Tout litige relatif
                    à leur interprétation et/ou à leur exécution relève des tribunaux
                    compétents du ressort du siège social du Prestataire.
                </p>
            </Section>
        </LegalPageLayout>
    );
}

export default CGV;
