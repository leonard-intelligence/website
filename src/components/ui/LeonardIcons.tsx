import React from 'react';

// ══════════════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════════════

export interface LeonardIconDefinition {
    name: string;
    category: string;
    description: string;
    pattern: number[][];
}

export interface DotIconProps {
    icon: LeonardIconDefinition;
    size?: number;
    dotRadius?: number;
    gap?: number;
    className?: string;
    fillColor?: string; // Optional override
    bgColor?: string;
}

// ══════════════════════════════════════════════════════════════════════════════
// ICON LIBRARY
// ══════════════════════════════════════════════════════════════════════════════

export const leonardIcons: Record<string, LeonardIconDefinition> = {
    // STRATÉGIE & VALEUR
    avantageConcurrentiel: {
        name: "Avantage Concurrentiel",
        category: "Stratégie & Valeur",
        description: "Prenez l'avantage sur vos concurrents - graphique progression",
        pattern: [
            [0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },
    memoireEntreprise: {
        name: "Mémoire d'Entreprise",
        category: "Stratégie & Valeur",
        description: "Ne perdez plus le savoir-faire de vos experts - cerveau/base",
        pattern: [
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 0],
        ]
    },
    souveraineteNumerique: {
        name: "Souveraineté Numérique",
        category: "Stratégie & Valeur",
        description: "Vos données ne sortent pas de chez vous - bouclier européen",
        pattern: [
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
        ]
    },
    productivite: {
        name: "Productivité",
        category: "Stratégie & Valeur",
        description: "Réduisez vos coûts opérationnels - courbe croissance",
        pattern: [
            [0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0],
        ]
    },
    performanceMonitor: {
        name: "Performance Monitor",
        category: "Stratégie & Valeur",
        description: "Impact mesuré - dashboard métriques",
        pattern: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },

    // CONFORMITÉ & CERTIFICATIONS

    rgpdCompliant: {
        name: "RGPD Compliant",
        category: "Conformité & Certifications",
        description: "Conformité protection des données - document validé",
        pattern: [
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
        ]
    },
    aiActReady: {
        name: "AI Act Ready",
        category: "Conformité & Certifications",
        description: "Conformité réglementation IA européenne",
        pattern: [
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
        ]
    },
    hdsReady: {
        name: "HDS Compatible",
        category: "Conformité & Certifications",
        description: "Hébergement Données de Santé - croix médicale",
        pattern: [
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
        ]
    },
    hebergementUE: {
        name: "Hébergement UE",
        category: "Conformité & Certifications",
        description: "Serveurs en Europe - drapeau étoiles",
        pattern: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 0, 1, 0],
            [1, 0, 0, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 0, 0, 1, 0, 1, 0],
            [1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },

    onPremise: {
        name: "On-Premise",
        category: "Conformité & Certifications",
        description: "Déploiement local - serveur bâtiment",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },

    // APPROCHE TECHNIQUE
    architectureAgnostique: {
        name: "Architecture Agnostique",
        category: "Approche Technique",
        description: "Sans dogmatisme technologique - connecteur universel",
        pattern: [
            [0, 1, 1, 0, 0, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 0, 0, 1, 1, 0],
        ]
    },
    openSourceFirst: {
        name: "Open Source First",
        category: "Approche Technique",
        description: "Mistral, Llama, Flux, Whisper - cercle ouvert",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ]
    },
    proprietaire: {
        name: "Propriétaire si Requis",
        category: "Approche Technique",
        description: "OpenAI, Claude, Midjourney - verrou premium",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },
    llmAgnostique: {
        name: "LLM Agnostique",
        category: "Approche Technique",
        description: "Mistral · Llama · Claude · GPT-4 - multi-modèle",
        pattern: [
            [0, 1, 1, 0, 0, 1, 1, 0],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [0, 1, 1, 0, 0, 1, 1, 0],
        ]
    },

    // MODULE 01 - VISUAL INTELLIGENCE
    visualIntelligence: {
        name: "01 Visual Intelligence",
        category: "Module 01 - Vision",
        description: "Logistique, qualité, marketing visuel - œil IA",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ]
    },
    computerVision: {
        name: "Computer Vision",
        category: "Module 01 - Vision",
        description: "Contrôle qualité, détection temps réel, comptage",
        pattern: [
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
        ]
    },
    imageGeneration: {
        name: "Image Generation",
        category: "Module 01 - Vision",
        description: "Assets marketing, virtual staging, visuels",
        pattern: [
            [0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },

    // MODULE 02 - LANGUAGE & PROCESS
    languageProcess: {
        name: "02 Language & Process",
        category: "Module 02 - Language",
        description: "Service client, RH, administratif - document flux",
        pattern: [
            [1, 1, 1, 1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 1, 0],
            [1, 0, 1, 1, 0, 0, 1, 0],
            [1, 0, 1, 1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },
    ragChatbot: {
        name: "RAG & Chatbots",
        category: "Module 02 - Language",
        description: "Assistants connectés base documentaire, support 24/7",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0],
        ]
    },
    fineTuning: {
        name: "Fine-Tuning",
        category: "Module 02 - Language",
        description: "Entraînement sur ton de marque et vocabulaire métier",
        pattern: [
            [0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0],
        ]
    },
    marketingAutomation: {
        name: "Marketing Automation",
        category: "Module 02 - Language",
        description: "Fiches produits auto, SEO, personnalisation emails",
        pattern: [
            [0, 0, 0, 0, 1, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [1, 1, 1, 0, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },

    // MODULE 03 - AUDIO & SIGNAL
    audioSignal: {
        name: "03 Audio & Signal",
        category: "Module 03 - Audio",
        description: "Centres d'appels et industrie - ondes sonores",
        pattern: [
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
        ]
    },
    speechToText: {
        name: "Speech-to-Text",
        category: "Module 03 - Audio",
        description: "Transcription réunions, analyse sentiment, extraction",
        pattern: [
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1],
        ]
    },
    textToSpeech: {
        name: "Text-to-Speech (TTS)",
        category: "Module 03 - Audio",
        description: "Voix synthèse, accueil téléphonique, doublage",
        pattern: [
            [0, 0, 0, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0],
        ]
    },

    // MODULE 04 - VIDEO INTELLIGENCE
    videoIntelligence: {
        name: "04 Video Intelligence",
        category: "Module 04 - Video",
        description: "Contenus dynamiques, Avatars & Motion",
        pattern: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 1, 0],
            [1, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    avatarsIA: {
        name: "Avatars IA",
        category: "Module 04 - Video",
        description: "Présentateurs virtuels, formation, personnalisation",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 0, 0, 1, 1],
        ]
    },
    productionAutomatisee: {
        name: "Production Automatisée",
        category: "Module 04 - Video",
        description: "Clips marketing, adaptation formats, montage IA",
        pattern: [
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0, 1, 1, 1],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },

    // BUSINESS & PROCESS
    audit: {
        name: "Audit",
        category: "Business & Process",
        description: "Identification des opportunités d'automatisation",
        pattern: [
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
        ]
    },
    roi: {
        name: "ROI",
        category: "Business & Process",
        description: "Retour sur investissement",
        pattern: [
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
        ]
    },
    automatisation: {
        name: "Automatisation",
        category: "Business & Process",
        description: "L'IA absorbe le répétitif",
        pattern: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    workflows: {
        name: "Workflows",
        category: "Business & Process",
        description: "Orchestration automatique des processus",
        pattern: [
            [1, 1, 0, 0, 0, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 0, 0],
        ]
    },
    reponse24h: {
        name: "Réponse 24h",
        category: "Business & Process",
        description: "Consultant vous répond sous 24h",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ]
    },
    transformationIA: {
        name: "Transformation IA",
        category: "Business & Process",
        description: "Valorisation de vos données",
        pattern: [
            [1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1],
        ]
    },

    // MÉMOIRE DOCUMENTAIRE
    saisieAutomatisee: {
        name: "Saisie Automatisée",
        category: "Mémoire Documentaire",
        description: "Extraction documentaire sans intervention",
        pattern: [
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
        ]
    },
    emailsTries: {
        name: "Emails Triés",
        category: "Mémoire Documentaire",
        description: "Priorisation intelligente automatique",
        pattern: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },
    sourcesCitees: {
        name: "Sources Citées",
        category: "Mémoire Documentaire",
        description: "Chaque réponse avec références vérifiables",
        pattern: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    questionsNaturelles: {
        name: "Questions Naturelles",
        category: "Mémoire Documentaire",
        description: "Posez vos questions comme à un collègue expert",
        pattern: [
            [0, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 0, 0, 0, 1, 1, 0],
            [1, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
        ]
    },

    // SECTEURS D'ACTIVITÉ
    sectorRetail: {
        name: "Retail & E-commerce",
        category: "Secteurs",
        description: "Case #1: -70% production, +15% conversion",
        pattern: [
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 0],
        ]
    },
    sectorIndustrie: {
        name: "Industrie & Qualité",
        category: "Secteurs",
        description: "Case #2: 0.02% erreur, 3 mois ROI",
        pattern: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },
    sectorServices: {
        name: "Services & B2B",
        category: "Secteurs",
        description: "Case #3: -40% tickets, +25% satisfaction",
        pattern: [
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
        ]
    },

    // UI ELEMENTS & GENERIC
    arrowRight: {
        name: "Arrow Right",
        category: "UI",
        description: "Direction, action",
        pattern: [
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    sparkles: {
        name: "Sparkles",
        category: "UI",
        description: "Magie, IA, Chat",
        pattern: [
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1],
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    check: {
        name: "Check",
        category: "UI",
        description: "Validation",
        pattern: [
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1, 0],
            [1, 0, 0, 0, 1, 1, 0, 0],
            [1, 1, 0, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    lock: {
        name: "Lock",
        category: "Security",
        description: "Sécurité, verrou",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    globe: {
        name: "Globe",
        category: "UI",
        description: "Monde, Web",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ]
    },
    building: {
        name: "Building",
        category: "UI",
        description: "Entreprise, Structure",
        pattern: [
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },
    scale: {
        name: "Scale",
        category: "Legal",
        description: "Justice, Droit",
        pattern: [
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ]
    },
    users: {
        name: "Users",
        category: "UI",
        description: "Équipe, Collaboration",
        pattern: [
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ]
    },
    loading: {
        name: "Loading",
        category: "UI",
        description: "Chargement",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ]
    },
    search: {
        name: "Search",
        category: "UI",
        description: "Recherche",
        pattern: [
            [0, 1, 1, 1, 1, 0, 0, 0],
            [1, 1, 0, 0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0],
            [1, 1, 0, 0, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 1],
        ]
    },

    // SOLUTIONS TABS
    solutionAll: {
        name: "Solution All",
        category: "Solutions",
        description: "Tout voir",
        pattern: [
            [1, 1, 0, 1, 1, 0, 0, 0],
            [1, 1, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1, 0, 0, 0],
            [1, 1, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    solutionConversation: {
        name: "Solution Conversation",
        category: "Solutions",
        description: "Conversation IA",
        pattern: [
            [0, 1, 1, 1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 1, 0],
            [1, 0, 1, 1, 1, 0, 1, 0],
            [1, 0, 0, 0, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    solutionVision: {
        name: "Solution Vision",
        category: "Solutions",
        description: "Vision & Industrie",
        pattern: [
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 1, 1, 0, 0, 1],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ]
    },
    solutionDoc: {
        name: "Solution Doc",
        category: "Solutions",
        description: "Intelligence Documentaire",
        pattern: [
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    solutionInfra: {
        name: "Solution Infra",
        category: "Solutions",
        description: "Infrastructure & Sécurité",
        pattern: [
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    solutionMarketing: {
        name: "Solution Marketing",
        category: "Solutions",
        description: "Marketing & Ventes",
        pattern: [
            [0, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
};

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

export const DotIcon: React.FC<DotIconProps> = ({
    icon,
    size = 24,
    dotRadius = 0.4,
    gap = 0.12,
    fillColor = "currentColor",
    bgColor = "transparent",
    className
}) => {
    if (!icon || !icon.pattern) return null;

    const pattern = icon.pattern;
    const gridSize = pattern.length;
    const cellSize = size / gridSize;
    const actualDotRadius = (cellSize / 2) * (1 - gap) * dotRadius * 2;

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={className}
            aria-label={icon.name}
            role="img"
        >
            <rect width={size} height={size} fill={bgColor} />
            {pattern.map((row, y) =>
                row.map((cell, x) => cell === 1 && (
                    <circle
                        key={`${x}-${y}`}
                        cx={x * cellSize + cellSize / 2}
                        cy={y * cellSize + cellSize / 2}
                        r={actualDotRadius}
                        fill={fillColor}
                    />
                ))
            )}
        </svg>
    );
};
