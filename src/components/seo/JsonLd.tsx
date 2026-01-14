import { Helmet } from 'react-helmet-async';

export function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MELIES.ai",
        "url": "https://melies.ai",
        "logo": "https://melies.ai/vite.svg",
        "description": "Cabinet de conseil expert en IA Générative et Data pour entreprises.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "contact@melies.ai"
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
