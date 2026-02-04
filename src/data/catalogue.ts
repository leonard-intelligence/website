

// --- ASSET IMPORTS ---

// 1. CONVERSATION IA (Theme: Tron / Futuristic Night - Digital Signal)
import conv1 from '../assets/images/illustrations/illustration-conversation-tron-01.png';
import conv2 from '../assets/images/illustrations/illustration-conversation-tron-02.png';
import conv3 from '../assets/images/illustrations/illustration-conversation-tron-01.png'; // Reusing 01
import conv4 from '../assets/images/illustrations/illustration-conversation-night-01.png';
import conv5 from '../assets/images/illustrations/illustration-conversation-night-02.png';

// 2. VISION & INDUSTRIE (Theme: Warhammer 40k - Heavy Industry)
import vis1 from '../assets/images/illustrations/illustration-vision-warhammer-01.png';
import vis2 from '../assets/images/illustrations/illustration-vision-warhammer-02.png';
import vis3 from '../assets/images/illustrations/illustration-vision-warhammer-03.png';
import vis4 from '../assets/images/illustrations/illustration-vision-warhammer-04.png';

// 3. INTELLIGENCE DOCUMENTAIRE (Theme: Matrix - Data Rain)
import doc1 from '../assets/images/illustrations/illustration-doc-matrix-01.png';
import doc2 from '../assets/images/illustrations/illustration-doc-matrix-02.png';
import doc3 from '../assets/images/illustrations/illustration-doc-matrix-03.png';
import doc4 from '../assets/images/illustrations/illustration-doc-matrix-04.png';
import doc5 from '../assets/images/illustrations/illustration-doc-matrix-01.png'; // Reusing 01

// 4. INFRASTRUCTURE & SÉCURITÉ (Theme: Dark Side Building - Fortress)
import infra1 from '../assets/images/illustrations/illustration-infra-dark-side-01.png';
import infra2 from '../assets/images/illustrations/illustration-infra-dark-side-02.png'; // Using _2 for variation

// 5. MARKETING & VENTES (Theme: Inception - Creative Structure)
import mark1 from '../assets/images/illustrations/illustration-marketing-inception-01.png';
import mark2 from '../assets/images/illustrations/illustration-marketing-inception-02.png';
import mark3 from '../assets/images/illustrations/illustration-marketing-inception-03.png';

// 6. EXPERTISE TECHNIQUE (Theme: Blade Runner - High Tech)
import tech1 from '../assets/images/illustrations/illustration-tech-blade-runner-01.png';
import tech2 from '../assets/images/illustrations/illustration-tech-blade-runner-02.png';
import tech3 from '../assets/images/illustrations/illustration-tech-blade-runner-03.png';
import tech4 from '../assets/images/illustrations/illustration-tech-blade-runner-04.png';
import tech5 from '../assets/images/illustrations/illustration-tech-blade-runner-01.png'; // Reusing 01
import tech6 from '../assets/images/illustrations/illustration-tech-blade-runner-02.png'; // Reusing 02
import tech7 from '../assets/images/illustrations/illustration-tech-blade-runner-03.png'; // Reusing 03

// --- INFRASTRUCTURE & SÉCURITÉ (Catalogue fix, Infra2 ref) ---
// Note: The previous image infra2 was defined but I need to ensure the ID matches.
// infra2 usage in data below matches variable name.

export interface CatalogueItem {
    id: string;
    category: string;
    sector: string;
    mission: string;
    tags?: string[];
    features?: { label: string; icon?: string }[];
    image?: string;
}

export const USE_CASES: CatalogueItem[] = [
    // --- CONVERSATION IA ---
    {
        id: 'conversation-intelligence',
        category: 'Conversation IA',
        sector: 'Intelligence Conversationnelle',
        mission: 'Analyse automatique des interactions, insights clients et coaching commercial.',
        tags: ['IA', 'COACHING', 'AUDIO'],
        features: [
            { label: 'Analyse Sentiment', icon: 'heart' },
            { label: 'Temps Réel', icon: 'lightning' }
        ],
        image: conv1
    },
    {
        id: 'contact-centers',
        category: 'Conversation IA',
        sector: 'Centre de Contact',
        mission: 'Automatisation du support, routage intelligent et priorisation des appels.',
        tags: ['SUPPORT', 'ROUTAGE', 'IA'],
        features: [
            { label: 'Routage Auto', icon: 'route' },
            { label: 'Analytique', icon: 'chart' }
        ],
        image: conv2
    },
    {
        id: 'voice-agents',
        category: 'Conversation IA',
        sector: 'Agents Vocaux',
        mission: 'Agents conversationnels vocaux pour la prise de commande et le service client.',
        tags: ['VOCAL', 'BOT', '24/7'],
        features: [
            { label: 'Latence < 500ms', icon: 'clock' },
            { label: 'Voix Naturelle', icon: 'wave' }
        ],
        image: conv3
    },
    {
        id: 'ai-notetakers',
        category: 'Conversation IA',
        sector: 'Prise de Notes IA',
        mission: 'Compte-rendu automatique, résumé et liste d\'actions pour vos réunions.',
        tags: ['PRODUCTIVITÉ', 'RÉUNION', 'SYNTHÈSE'],
        features: [
            { label: 'Multi-locuteurs', icon: 'mic' },
            { label: 'Résumés', icon: 'document' }
        ],
        image: conv4
    },
    {
        id: 'medical-transcription',
        category: 'Conversation IA',
        sector: 'Transcription Médicale',
        mission: 'Transcription sécurisée des consultations et génération de comptes-rendus.',
        tags: ['SANTÉ', 'HDS', 'SECRET'],
        features: [
            { label: 'Diarisation', icon: 'users' },
            { label: 'Conformité', icon: 'shield' }
        ],
        image: conv5
    },

    // --- VISION & INDUSTRIE ---
    {
        id: 'cv-quality-control',
        category: 'Vision & Industrie',
        sector: 'Contrôle Qualité',
        mission: 'Détection automatique de défauts sur chaîne de production avec précision.',
        tags: ['INDUSTRIE', 'QUALITÉ', 'VISION'],
        features: [
            { label: 'Zéro Défaut', icon: 'check-circle' },
            { label: 'Temps Réel', icon: 'lightning' }
        ],
        image: vis1
    },
    {
        id: 'cv-safety-epi',
        category: 'Vision & Industrie',
        sector: 'Sécurité & EPI',
        mission: 'Vérification du port des équipements (EPI) et sécurisation des zones.',
        tags: ['SÉCURITÉ', 'CHANTIER', 'IA'],
        features: [
            { label: 'Alertes SMS', icon: 'bell' },
            { label: 'Monitoring', icon: 'eye' }
        ],
        image: vis2
    },
    {
        id: 'cv-inventory',
        category: 'Vision & Industrie',
        sector: 'Inventaire & Logistique',
        mission: 'Comptage automatique de stock et détection de ruptures en rayon.',
        tags: ['LOGISTIQUE', 'STOCK', 'AUTOMATION'],
        features: [
            { label: 'Inventaire', icon: 'box' },
            { label: 'Gain Temps', icon: 'clock' }
        ],
        image: vis3
    },
    {
        id: 'industry-maintenance',
        category: 'Vision & Industrie',
        sector: 'Maintenance Terrain',
        mission: 'Assistant maintenance déconnecté (Edge) sur tablette durcie.',
        tags: ['EDGE IA', 'OFFLINE', 'MAINTENANCE'],
        features: [
            { label: 'Mode Hors-Ligne', icon: 'wifi-off' },
            { label: 'Mobile', icon: 'tablet' }
        ],
        image: vis4
    },

    // --- INTELLIGENCE DOCUMENTAIRE ---
    {
        id: 'rag-soverain',
        category: 'Intelligence Documentaire',
        sector: 'Moteur de Recherche (RAG)',
        mission: 'Retrouvez toute votre connaissance interne instantanément et sans fuite de données.',
        tags: ['SOUVERAINETÉ', 'RAG', 'KNOWLEDGE'],
        features: [
            { label: 'Indexation Locale', icon: 'server' },
            { label: 'Sources', icon: 'file-text' }
        ],
        image: doc1
    },
    {
        id: 'legal-compliance',
        category: 'Intelligence Documentaire',
        sector: 'Juridique & Conformité',
        mission: 'Audit de contrats et veille réglementaire automatisée.',
        tags: ['JURIDIQUE', 'AUDIT', 'RISQUE'],
        features: [
            { label: 'Comparateur', icon: 'scales' },
            { label: 'Citations', icon: 'quote' }
        ],
        image: doc2
    },
    {
        id: 'finance-idp',
        category: 'Intelligence Documentaire',
        sector: 'Finance & IDP',
        mission: 'Extraction automatique de factures et détection de fraudes.',
        tags: ['FINANCE', 'OCR', 'COMPTA'],
        features: [
            { label: 'Export ERP', icon: 'database' },
            { label: 'Anti-Fraude', icon: 'shield-alert' }
        ],
        image: doc3
    },
    {
        id: 'doc-processing',
        category: 'Intelligence Documentaire',
        sector: 'Tri & Routage',
        mission: 'Classification et distribution automatique des emails et documents entrants.',
        tags: ['PROCESS', 'EMAIL', 'TRI'],
        features: [
            { label: 'Routage Auto', icon: 'mail' },
            { label: 'Gain Admin', icon: 'check' }
        ],
        image: doc4
    },
    {
        id: 'rh-recrutement',
        category: 'Intelligence Documentaire',
        sector: 'Ressources Humaines',
        mission: 'Analyse de CV et aide au recrutement sans biais.',
        tags: ['RH', 'RECRUTEMENT', 'IA'],
        features: [
            { label: 'Anonymisation', icon: 'user-x' },
            { label: 'Matching', icon: 'search' }
        ],
        image: doc5
    },

    // --- INFRASTRUCTURE & SÉCURITÉ ---
    {
        id: 'infra-llmops',
        category: 'Infrastructure & Sécurité',
        sector: 'Déploiement Sur-Mesure',
        mission: 'Installation de modèles (Mistral, Llama) sur vos serveurs (On-Premise).',
        tags: ['ON-PREMISE', 'INFRA', 'SOUVERAIN'],
        features: [
            { label: 'Optimisation', icon: 'cpu' },
            { label: 'Contrôle Total', icon: 'lock' }
        ],
        image: infra1
    },
    {
        id: 'agent-workflow',
        category: 'Infrastructure & Sécurité',
        sector: 'Automatisation & Agents',
        mission: 'Agents autonomes pour nettoyer vos données (Green IT) et gérer vos workflows.',
        tags: ['AGENTS', 'GREEN IT', 'AUTO'],
        features: [
            { label: 'Nettoyage', icon: 'trash' },
            { label: 'Efficacité', icon: 'zap' }
        ],
        image: infra2
    },

    // --- MARKETING & VENTES ---
    {
        id: 'marketing-content',
        category: 'Marketing & Ventes',
        sector: 'Création de Contenu',
        mission: 'Génération automatique de posts LinkedIn, articles de blog et visuels marketing.',
        tags: ['GÉNÉRATION', 'MARKETING', 'CONTENU'],
        features: [
            { label: 'Multicanal', icon: 'share-2' },
            { label: 'SEO Friendly', icon: 'search' }
        ],
        image: mark1
    },
    {
        id: 'sales-outreach',
        category: 'Marketing & Ventes',
        sector: 'Ventes B2B',
        mission: 'Hyper-personnalisation des emails de prospection à partir du profil LinkedIn.',
        tags: ['SALES', 'EMAIL', 'B2B'],
        features: [
            { label: 'Scraping', icon: 'download' },
            { label: 'Personnalisation', icon: 'user-check' }
        ],
        image: mark2
    },
    {
        id: 'lead-scoring',
        category: 'Marketing & Ventes',
        sector: 'CRM & Data',
        mission: 'Analyse des comportements pour identifier les prospects les plus chauds.',
        tags: ['DATA', 'SCORING', 'CRM'],
        features: [
            { label: 'Prédiction', icon: 'trending-up' },
            { label: 'ROI', icon: 'dollar-sign' }
        ],
        image: mark3
    },
    // --- EXPERTISE TECHNIQUE (New) ---
    {
        id: 'tech-codegen',
        category: 'Expertise Technique',
        sector: 'Génération de Code',
        mission: 'Créez et optimisez du code avec des modèles personnalisables, de l\'auto-complétion à la génération de fonctions.',
        tags: ['DEV', 'CODEX', 'AUTO-COMPLETION'],
        features: [
            { label: 'Refactoring', icon: 'code' },
            { label: 'Clean Code', icon: 'check-circle' }
        ],
        image: tech1
    },
    {
        id: 'tech-rag',
        category: 'Expertise Technique',
        sector: 'RAG Avancé',
        mission: 'Construisez des applications de génération enrichie par récupération avec un contrôle total sur l\'implémentation.',
        tags: ['RAG', 'VECTOR', 'SEARCH'],
        features: [
            { label: 'Konwledge Graph', icon: 'share-2' },
            { label: 'Hybrid Search', icon: 'search' }
        ],
        image: tech2
    },
    {
        id: 'tech-agents',
        category: 'Expertise Technique',
        sector: 'Agents Autonomes',
        mission: 'Créez des agents spécialisés qui automatisent des flux complexes et interagissent avec divers systèmes.',
        tags: ['AGENTS', 'TOOL USE', 'AUTO'],
        features: [
            { label: 'Orchestration', icon: 'git-merge' },
            { label: 'Multi-Agent', icon: 'users' }
        ],
        image: tech3
    },
    {
        id: 'tech-reasoning',
        category: 'Expertise Technique',
        sector: 'Raisonnement & Maths',
        mission: 'Construisez des applications sophistiquées combinant un raisonnement puissant (CoT) avec un accès à l\'information.',
        tags: ['REASONING', 'MATH', 'LOGIC'],
        features: [
            { label: 'Chain of Thought', icon: 'brain-circuit' },
            { label: 'Problem Solving', icon: 'puzzle' }
        ],
        image: tech4
    },
    {
        id: 'tech-extraction',
        category: 'Expertise Technique',
        sector: 'Extraction Structurée',
        mission: 'Transformez des données non structurées en informations exploitables avec des modèles de haute précision.',
        tags: ['EXTRACTION', 'JSON', 'DATA'],
        features: [
            { label: 'Schema Validation', icon: 'table' },
            { label: 'Haute Précision', icon: 'target' }
        ],
        image: tech5
    },
    {
        id: 'tech-embedded',
        category: 'Expertise Technique',
        sector: 'IA Embarquée / Edge',
        mission: 'Déployez des capacités IA puissantes même dans des environnements à ressources limitées (Mobile, IoT).',
        tags: ['EDGE', 'IOT', 'MOBILE'],
        features: [
            { label: 'Quantization', icon: 'cpu' },
            { label: 'Low Latency', icon: 'zap' }
        ],
        image: tech6
    },
    {
        id: 'tech-security',
        category: 'Expertise Technique',
        sector: 'Sécurité & Guardrails',
        mission: 'Protégez vos applications avec des filtres de contenu et des mécanismes de sécurité robustes.',
        tags: ['SECURITY', 'SAFETY', 'COMPLIANCE'],
        features: [
            { label: 'Jailbreak Check', icon: 'shield' },
            { label: 'PII Protection', icon: 'lock' }
        ],
        image: tech7
    }
];

// Keeping TECHNOLOGIES for reference if needed, or can be removed if unused.
// Brief doesn't explicitly use this list anymore as Stack is now Section 08.
export const TECHNOLOGIES = [];
