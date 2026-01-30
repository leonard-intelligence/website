import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    type?: string;
    twitterHandle?: string;
}

export function SEO({
    title = "Leonard Intelligence - Experts IA & Automatisation",
    description = "Automatisez vos processus internes avec une IA souveraine et sécurisée. Texte, image, audio, vidéo. Déploiement Local ou Cloud UE.",
    canonical,
    image = "/assets/hero_background.webp", // Default social share image
    type = "website",
    twitterHandle = "@leonardintelligence"
}: SEOProps) {
    const siteUrl = "https://leonardintelligence.com"; // Replace with actual domain
    const fullUrl = canonical ? canonical : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
        </Helmet>
    );
}
