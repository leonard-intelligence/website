import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
    type?: 'Organization' | 'BreadcrumbList';
    breadcrumbs?: { name: string; item: string }[];
}

export function JsonLd({ type = 'Organization', breadcrumbs }: JsonLdProps) {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://leonardintelligence.com';

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Leonard Intelligence',
        url: siteUrl,
        logo: `${siteUrl}/logo_black_512.png`,
        description: "Agence agentique : conception, déploiement et pilotage d'agents IA sur mesure pour les entreprises.",
        inLanguage: 'fr-FR',
        areaServed: 'FR',
        sameAs: ['https://www.linkedin.com/company/leonard-intelligence'],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'FR',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'hello@leonardintelligence.com',
        },
    };

    // ProfessionalService schema for richer search results
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Leonard Intelligence',
        url: siteUrl,
        description:
            "Conception, déploiement et pilotage d'agents IA sur mesure, branchés à vos outils, pour augmenter les performances de votre entreprise.",
        areaServed: 'FR',
        serviceType: [
            "Conception d'agents IA",
            'Automatisation de workflows agentiques',
            "Déploiement et pilotage d'agents IA",
        ],
        knowsAbout: [
            'Agents IA autonomes',
            'Grands modèles de langage (LLM)',
            'Orchestration agentique',
            'Intégration de données et de contexte',
            'Interfaces et produits agentiques',
        ],
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Leonard Intelligence',
        url: siteUrl,
        inLanguage: 'fr-FR',
        publisher: { '@type': 'Organization', name: 'Leonard Intelligence' },
    };

    const breadcrumbSchema =
        type === 'BreadcrumbList' && breadcrumbs
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: breadcrumbs.map((crumb, index) => ({
                      '@type': 'ListItem',
                      position: index + 1,
                      name: crumb.name,
                      item: crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`,
                  })),
              }
            : null;

    return (
        <Helmet>
            {type === 'Organization' && (
                <>
                    {/* Organization schema - static data only, safe for dangerouslySetInnerHTML */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                    />
                </>
            )}
            {breadcrumbSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            )}
        </Helmet>
    );
}
