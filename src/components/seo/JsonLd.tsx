import { Helmet } from 'react-helmet-async';

export function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Leonard Intelligence",
        "url": "https://leonardintelligence.com",
        "logo": "https://leonardintelligence.com/logo_black_512.png",
        "description": "Cabinet de conseil expert en IA Générative et Data pour entreprises.",
        "inLanguage": "fr-FR",
        "sameAs": [
            "https://www.linkedin.com/company/leonard-intelligence",
            "https://twitter.com/leonardintelligence"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "hello@leonardintelligence.com"
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
        </Helmet>
    );
}
