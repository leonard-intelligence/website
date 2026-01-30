export interface CatalogueItem {
    id: string;
    sector: string;
    mission: string;
    result: string;
    stats: { label: string; value: string }[];
    image?: string;
}

export const USE_CASES: CatalogueItem[] = [
    {
        id: 'retail',
        sector: 'E-commerce / Retail',
        mission: 'Automatisation fiches produits + Génération visuels',
        result: '-70% temps production · +15% taux conversion',
        stats: [
            { label: 'PRODUCTION', value: '-70%' },
            { label: 'CONVERSION', value: '+15%' }
        ],
        image: '/assets/illu-4.webp'
    },
    {
        id: 'industry',
        sector: 'Industrie / Manufacture',
        mission: 'Computer Vision détection défauts chaîne production',
        result: '0.02% taux erreur · ROI en 3 mois',
        stats: [
            { label: 'ERREUR', value: '0.02%' },
            { label: 'ROI', value: '3 MOIS' }
        ],
        image: '/assets/vision_background.png'
    },
    {
        id: 'service',
        sector: 'Services / B2B',
        mission: 'RAG + Chatbot connecté base documentaire interne',
        result: '-40% tickets niveau 1 · Satisfaction +25%',
        stats: [
            { label: 'TICKETS', value: '-40%' },
            { label: 'SATISFACTION', value: '+25%' }
        ],
        image: '/assets/textdata_background.png'
    }
];

// Keeping TECHNOLOGIES for reference if needed, or can be removed if unused.
// Brief doesn't explicitly use this list anymore as Stack is now Section 08.
export const TECHNOLOGIES = [];
