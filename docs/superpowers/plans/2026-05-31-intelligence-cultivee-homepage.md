# Refonte page d'accueil « Intelligence cultivée » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre le contenu et les concepts de la page d'accueil Leonard Intelligence selon la spec « Intelligence cultivée » — copie premium sans hype, zéro fausse preuve, sections impactantes, en gardant la DA et la carte Agent ID.

**Architecture :** React 19 + TypeScript + Vite + Tailwind v4. Page unique `Home.tsx` composant par composant dans `Hero.tsx`, `Navbar.tsx`, `Sections.tsx`. Système de perles existant (`pixels/`). Boutons via `ReliefButton`. On travaille en **deux phases** : Phase 1 = vérité du contenu (copie, anchors, suppression des fausses preuves, nouvelle section « Construit sur », navbar/footer) — *shippable seule, rend le site honnête et correct*. Phase 2 = concept & motion (révélations, cristallisation des perles, vizs originales, refonte showpiece Capacités).

**Tech Stack :** React 19, TypeScript, Tailwind CSS v4, CSS Modules, Vitest, lucide-react. Vérification visuelle via les outils `preview_*`. Typecheck via `npm run build`. Tests unitaires via `npm run test` (logique pure uniquement).

**Référence spec :** [docs/superpowers/specs/2026-05-31-intelligence-cultivee-content-design.md](../specs/2026-05-31-intelligence-cultivee-content-design.md)

---

## Conventions de vérification (frontend)

Ce projet est majoritairement visuel. Sauf logique pure (un hook, un générateur déterministe), on ne fait pas de TDD unitaire — on **vérifie dans le navigateur** :

- **Typecheck** après chaque task qui touche du `.tsx` : `npm run build` → attendu : build OK, 0 erreur TS.
- **Visuel** : `preview_start` (une fois), puis `preview_console_logs` (0 erreur), `preview_snapshot`/`preview_screenshot` de la section touchée. `preview_resize` pour mobile sur les sections layout.
- **Reduced-motion** : pour toute task de motion, vérifier que le contenu est présent et lisible avec `prefers-reduced-motion: reduce` (via `preview_eval` ou émulation), animations désactivées.
- **Commit** à la fin de chaque task.

**Tokens & helpers existants** (dans `src/components/layout/Sections.tsx:11-60`) : `TOKENS` (`paper #F7F7F5`, `surface #F5F5F2`, `pale #FBFBF8`, `white #FFFFFF`, `ink #171717`, `mutedText`, `lime #A3E635`, `gold #EEC75D`, `forest #71CE45`, `border`), `CARD_SHADOW`, `EMBOSS_DARK`, `EMBOSS_MUTED`. Système perles : `Pixel`, `PixelLayer`, `useBeadCtx`, `useBeadPx`, constantes `SAMPLE_W=102`, `SAMPLE_H=77`, `SOURCE_URL`.

---

## État actuel vs cible (divergences importantes)

- `SectionCapabilities` (Sections.tsx:709) est aujourd'hui une liste de **6 blocs** texte+visuel (`CAPABILITIES`, l.658-707) — dont `ActivityFeed` qui affiche des **métriques inventées** (« temps économisé », « actions exécutées »). La spec recentre Capacités sur **la carte Agent ID** (showpiece). → refonte lourde (Phase 2, Task 13).
- Le footer (Sections.tsx:2143) contient un lien `Cas clients` → **fausse preuve, à retirer** (Phase 1, Task 6).
- Les ancres : le 2e CTA du Hero doit pointer vers `#section-capabilities` (id réel), pas `#capacites`. Le CTA primaire `#contact` résout vers `id="contact"` posé sur le bouton du `SectionCTA` (Sections.tsx:1906) — comportement existant à conserver.
- `SectionMethod` header dit encore « Notre méthode / De l'idée à la production… » et `STEPS` = Cartographie/Conception/Build/Déploiement. La spec affine en 4 étapes renommées (Task 9).

---
---

# PHASE 1 — Vérité du contenu (shippable seule)

---

## Task 1 : Hero — copie + correction des CTAs

**Files:**
- Modify: `src/components/layout/Hero.tsx:114-151`

- [ ] **Step 1 : Remplacer le H1**

Dans `Hero.tsx`, le `<h1>` (l.114-129) contient actuellement :
```
L'intelligence en action.
<br />
Pour votre entreprise.
```
Remplacer le contenu textuel du `<h1>` par :
```tsx
Bienvenue dans l'ère des agents.
```
(supprimer le `<br />` et la 2e ligne — H1 sur une seule phrase ; conserver tous les `style`/`className` existants du `<h1>`.)

- [ ] **Step 2 : Remplacer le sous-titre**

Le `<p>` (l.131-141) contient « Des agents IA conçus sur mesure pour vos workflows… ». Remplacer son texte par :
```tsx
Leonard conçoit, déploie et pilote les agents sur-mesure de votre entreprise — branchés à vos systèmes, sur vos modèles et vos données.
```
(conserver `style`/`className`.)

- [ ] **Step 3 : Corriger les CTAs (tuer « cas clients »)**

Le bloc CTA (l.143-151) contient deux `ReliefButton`. Remplacer tout le bloc par :
```tsx
<div className="mt-10 flex flex-wrap items-center gap-3">
    <ReliefButton tone="lime" size="md" href="#contact" iconRight={<ArrowRight />}>
        Discutons de votre projet
    </ReliefButton>

    <ReliefButton tone="frost" size="md" href="#section-capabilities">
        Voir une fiche agent
    </ReliefButton>
</div>
```
(le 2e bouton ne pointe plus vers `#cas-clients` mais vers `#section-capabilities`, et le libellé devient « Voir une fiche agent ».)

- [ ] **Step 4 : Typecheck**

Run: `npm run build`
Expected: build OK, 0 erreur TS.

- [ ] **Step 5 : Vérif visuelle**

`preview_start` (si pas démarré), puis `preview_screenshot` du Hero. Attendu : H1 « Bienvenue dans l'ère des agents. », sous-titre correct, 2 boutons (lime « Discutons de votre projet », frost « Voir une fiche agent »). `preview_console_logs` : 0 erreur. Cliquer le bouton frost (`preview_click`) doit scroller vers la section Capacités.

- [ ] **Step 6 : Commit**

```bash
git add src/components/layout/Hero.tsx
git commit -m "content(hero): nouveau H1 'ère des agents', sous-titre précis, CTA secondaire vers Capacités"
```

---

## Task 2 : Navbar — lien Contact + solidification au scroll

**Files:**
- Modify: `src/components/layout/Navbar.tsx:1-30`

- [ ] **Step 1 : Ajouter l'état de scroll + fond solide**

Remplacer tout le contenu de `Navbar.tsx` par :
```tsx
import { useEffect, useState } from 'react';

export function Navbar() {
    const [solid, setSolid] = useState(false);

    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            id="section-navbar"
            className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center transition-all duration-300"
            style={{
                paddingInline: 20,
                paddingBlock: solid ? 10 : 20,
                backgroundColor: solid ? '#F7F7F5' : 'transparent',
                boxShadow: solid ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
            }}
            aria-label="Navigation principale"
        >
            <a href="/" className="inline-flex items-center" aria-label="Retour à l'accueil">
                <img
                    src={solid ? '/assets/logos/leonard-logo-black.png' : '/assets/logos/leonard-logo-white.png'}
                    alt="Leonard Intelligence"
                    width={512}
                    height={79}
                    className="h-7 w-auto object-contain"
                />
            </a>
            <a
                href="#contact"
                className="font-sans text-sm hover:opacity-70 transition-opacity px-3 py-2"
                style={{ color: solid ? '#171717' : '#ffffff' }}
            >
                Contact
            </a>
        </nav>
    );
}
```
(Note : la navbar « principale » `Navbar.tsx` n'est pas montée dans `Home.tsx` — le Hero a sa propre nav inline, Hero.tsx:73-103. Cette task prépare `Navbar.tsx` ; si l'on décide de l'utiliser à la place de la nav inline du Hero, ce sera une task séparée. Pour l'instant on corrige le composant pour qu'il soit cohérent et réutilisable.)

- [ ] **Step 2 : Typecheck**

Run: `npm run build`
Expected: build OK.

- [ ] **Step 3 : Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(navbar): fond solide + logo noir au scroll, transparent sur le hero"
```

---

## Task 3 : Propos (SectionIntro) — copie manifeste + 3 piliers

**Files:**
- Modify: `src/components/layout/Sections.tsx:314-344` (titre + features)

- [ ] **Step 1 : Remplacer le titre de section**

Dans `SectionIntro`, le `<h2>` (l.315-327) affiche « Leonard Intelligence est une agence agentique qui conçoit et déploie les agents IA de votre entreprise. » Remplacer le contenu interne du `<h2>` (les deux `<span>`) par :
```tsx
<span style={EMBOSS_DARK}>Tout le monde sait faire une démo.</span>{' '}
<span style={EMBOSS_MUTED}>Presque personne ne sait livrer un système qui tient en production. C'est notre métier.</span>
```
(conserver le `<h2>` et ses styles ; on garde la structure 2-spans dark/muted.)

- [ ] **Step 2 : Réécrire les 3 piliers**

Les trois `<FeatureCol>` (l.331-342) : remplacer leurs `title`/`body` par :
```tsx
<FeatureCol
    title="Sur-mesure"
    body="Branché à vos APIs, votre stack, vos modèles. Pas une solution générique déployée telle quelle."
/>
<FeatureCol
    title="Human in the loop"
    body="Validation humaine aux points critiques. La fiabilité par construction, pas par promesse."
/>
<FeatureCol
    title="Souverain"
    body="Vos données ne quittent pas votre périmètre. Vos modèles, vos règles, votre contrôle."
/>
```

- [ ] **Step 3 : Typecheck + visuel**

Run: `npm run build` (attendu OK). Puis `preview_snapshot` de `#section-intro` : titre démo/production, 3 piliers à la nouvelle copie. `preview_console_logs` : 0 erreur.

- [ ] **Step 4 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "content(propos): manifeste démo->production + 3 piliers réécrits"
```

---

## Task 4 : Méthode — copie 4 étapes

**Files:**
- Modify: `src/components/layout/Sections.tsx:378-399` (`STEPS`), `:602-614` (header)

- [ ] **Step 1 : Réécrire `STEPS`**

Remplacer le tableau `STEPS` (l.378-399) par :
```tsx
const STEPS = [
    {
        n: 'I',
        title: 'Cartographier',
        body: 'On identifie les workflows à fort levier : volumes, fréquence, coût du goulot. On classe les agents candidats par effort et retour.',
    },
    {
        n: 'II',
        title: 'Spécifier',
        body: 'On conçoit l\'agent au niveau plan d\'architecte : périmètre d\'autonomie, outils, données, garde-fous. Zéro code avant validation.',
    },
    {
        n: 'III',
        title: 'Construire & brancher',
        body: 'On assemble l\'agent et on le connecte à votre stack via MCP, API ou webhook. Tests sur cas limites avant la production.',
    },
    {
        n: 'IV',
        title: 'Piloter',
        body: 'L\'agent tourne en production avec des métriques de décision : réussite, escalades, dérives. On itère sur la spec.',
    },
];
```

- [ ] **Step 2 : Réécrire le sous-titre du header**

Le `<p>` du header (l.609-614) : remplacer le texte par :
```tsx
De l'idée à la production. Comment nous fabriquons des agents qui tiennent — avec vous, dans votre réalité.
```
(conserver le `<h2>` « Notre méthode ».)

- [ ] **Step 3 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` de `#section-method` : 4 cartes I-IV avec les nouveaux intitulés. 0 erreur console.

- [ ] **Step 4 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "content(methode): 4 etapes Cartographier/Specifier/Construire & brancher/Piloter"
```

---

## Task 5 : Services — copie 3 offres

**Files:**
- Modify: `src/components/layout/Sections.tsx` — le tableau `SERVICE_BLOCKS` (référencé l.542 ; rechercher `const SERVICE_BLOCKS` dans le fichier) et le titre `Ce que nous concevons` (l.537).

- [ ] **Step 1 : Localiser `SERVICE_BLOCKS`**

Rechercher `const SERVICE_BLOCKS` dans `Sections.tsx`. Il contient 3 objets `{ index, title, body, bg, fg, visual }`. Conserver `index`/`bg`/`fg`/`visual` ; remplacer uniquement `title` et `body` des trois blocs par (dans l'ordre) :

Bloc 1 :
```tsx
title: 'Conception d\'agents',
body: 'Architecture multi-agents, sélection et fine-tuning du modèle (ouvert ou privé, hébergeable chez vous), outils et connecteurs métier. Livrable : un agent de production testé et documenté.',
```
Bloc 2 :
```tsx
title: 'Automatisation de workflows',
body: 'Orchestration d\'agents sur vos flux — documents, qualification, reporting, relances — intégrée à vos outils (CRM, ERP, API internes). Les étapes critiques restent sous validation humaine.',
```
Bloc 3 :
```tsx
title: 'Déploiement & pilotage',
body: 'Mise en production sur votre infra (cloud souverain, on-prem, hybride), monitoring continu, SLA, itérations après go-live. Livrable : agents en production et tableau de bord de supervision.',
```

- [ ] **Step 2 : Vérifier le titre de section**

Le `<h2>` l.537 « Ce que nous concevons » : conserver tel quel (cohérent avec la spec).

- [ ] **Step 3 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` de `#section-services` : 3 offres avec les nouveaux libellés. `preview_resize` mobile : empilement correct. 0 erreur console.

- [ ] **Step 4 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "content(services): 3 offres Conception/Automatisation/Deploiement & pilotage"
```

---

## Task 6 : Footer — vérité (retrait « Cas clients ») + email visible + copie

**Files:**
- Modify: `src/components/layout/Sections.tsx:2129-2188`

- [ ] **Step 1 : Réécrire le paragraphe de marque**

Le `<p>` l.2135-2140 : remplacer le texte par :
```tsx
Agence agentique. Nous concevons, déployons et pilotons les agents IA de production — sur-mesure, branchés à vos systèmes.
```

- [ ] **Step 2 : Retirer « Cas clients » de la nav footer**

La liste l.2143 est `['Méthode', 'Cas clients', 'Mentions légales', 'CGV', 'Contact']`. Remplacer par :
```tsx
{['Méthode', 'Services', 'Mentions légales', 'Contact'].map((l) => (
```
(« Cas clients » supprimé — fausse preuve ; « CGV » retiré pour épurer ; « Services » ajouté.)

- [ ] **Step 3 : Ajouter l'email visible**

Sous la `<nav>` du footer (après la fermeture `</nav>` l.2153), ajouter dans le même `<div className="flex flex-col gap-6">` :
```tsx
<a
    href="mailto:guillaume3301@proton.me"
    className="font-mono hover:underline"
    style={{ fontSize: '13px', color: TOKENS.mutedText, letterSpacing: '0.02em' }}
>
    guillaume3301@proton.me
</a>
```

- [ ] **Step 4 : Mention de pied de page**

La barre basse (l.2183-2188) garde « © {year} Leonard Intelligence. Tous droits réservés. » et « Construit en France 🇫🇷 » — conserver.

- [ ] **Step 5 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` du footer : pas de « Cas clients », email visible, copie mise à jour. 0 erreur console.

- [ ] **Step 6 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "content(footer): retrait 'Cas clients' (fausse preuve), email visible, copie production"
```

---

## Task 7 : Retirer les fausses preuves de Capacités (avant refonte)

**Files:**
- Modify: `src/components/layout/Sections.tsx:678-684` (bloc `ActivityFeed` / « Mesurez l'impact ») et la copie des 6 blocs `CAPABILITIES` (l.658-707).

> Cette task est un **correctif de vérité minimal** sur la section existante, avant la refonte conceptuelle (Phase 2, Task 13). Objectif : zéro métrique inventée dès maintenant.

- [ ] **Step 1 : Réécrire le bloc « Mesurez l'impact »**

Le bloc l.678-684 (`title: 'Mesurez l'impact en temps réel'`, body avec « temps économisé », « actions exécutées ») : remplacer `title`/`body`/`link` par :
```tsx
title: 'Observez et pilotez en production',
body: 'Chaque agent est instrumenté : statut des exécutions, escalades vers l\'humain, latence, erreurs. Vous gardez la main, l\'agent reste traçable.',
link: 'Voir le pilotage',
```
(on retire les chiffres présentés comme résultats ; on décrit la capacité, pas un gain chiffré.)

- [ ] **Step 2 : Vérifier les autres blocs**

Scanner les 6 `body` de `CAPABILITIES` (l.658-707) : aucun ne doit contenir de métrique chiffrée présentée comme un résultat client. Les liens `link` pointent vers `#` (l.745) — acceptable pour l'instant (pas de fausse preuve, juste inertes).

- [ ] **Step 3 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` de `#section-capabilities` : le bloc ne montre plus de métriques inventées. 0 erreur console.

- [ ] **Step 4 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "content(capacites): retrait des metriques inventees (zero fausse preuve)"
```

---

## Task 8 : Nouvelle section « Construit sur » (règle graduée sobre)

**Files:**
- Create: `src/components/layout/ConstruitSur.tsx`
- Modify: `src/pages/Home.tsx:1-25` (import + montage entre Hero et SectionIntro)

- [ ] **Step 1 : Créer le composant**

Créer `src/components/layout/ConstruitSur.tsx` :
```tsx
const LOGOS: { src: string; name: string }[] = [
    { src: '/assets/logos/anthropic.svg', name: 'Anthropic' },
    { src: '/assets/logos/openai.svg', name: 'OpenAI' },
    { src: '/assets/logos/mistral.svg', name: 'Mistral' },
    { src: '/assets/logos/gemini.svg', name: 'Gemini' },
    { src: '/assets/logos/meta.svg', name: 'Meta · Llama' },
    { src: '/assets/logos/nvidia.svg', name: 'Nvidia' },
    { src: '/assets/logos/huggingface.svg', name: 'Hugging Face' },
    { src: '/assets/logos/ovhcloud.svg', name: 'OVHcloud' },
];

export function ConstruitSur() {
    return (
        <section
            id="section-construit-sur"
            className="relative"
            style={{ backgroundColor: '#F7F7F5', paddingBlock: '56px', paddingInline: '32px' }}
            aria-label="Construit sur"
        >
            <div className="max-w-[1100px] mx-auto">
                <div
                    className="font-mono text-center"
                    style={{ fontSize: 12, letterSpacing: '0.22em', color: 'rgba(23,23,23,0.5)' }}
                >
                    CONSTRUIT SUR
                </div>

                <ul
                    className="mt-8 flex flex-wrap items-end justify-center"
                    style={{ gap: '40px 56px', listStyle: 'none', padding: 0 }}
                >
                    {LOGOS.map((l) => (
                        <li key={l.name} className="flex flex-col items-center" style={{ gap: 8 }}>
                            <img
                                src={l.src}
                                alt={l.name}
                                style={{ height: 22, width: 'auto', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.7 }}
                            />
                            <span
                                className="font-mono"
                                style={{ fontSize: 10, letterSpacing: '0.04em', color: 'rgba(23,23,23,0.4)' }}
                            >
                                {l.name}
                            </span>
                        </li>
                    ))}
                </ul>

                <p
                    className="font-mono text-center mx-auto"
                    style={{ marginTop: 28, fontSize: 11, lineHeight: 1.5, color: 'rgba(23,23,23,0.35)', maxWidth: '60ch' }}
                >
                    Les marques sont la propriété de leurs titulaires respectifs. Leonard Intelligence n'est ni partenaire officiel ni revendeur agréé.
                </p>
            </div>
        </section>
    );
}
```

- [ ] **Step 2 : Vérifier les fichiers de logo présents**

Run: `ls public/assets/logos/`
Expected : confirmer la présence de `anthropic.svg`, `openai.svg`, `mistral.svg`, `gemini*.svg`, `meta*.svg`, `nvidia*.svg`, `huggingface*.svg`, `ovhcloud.svg`. Si un nom diffère (ex. `gemini-color.svg`, `meta.svg` absent), ajuster le `src` correspondant dans `LOGOS`. Si un logo manque totalement, le retirer du tableau (ne pas inventer d'asset).

- [ ] **Step 3 : Monter la section dans Home**

Dans `src/pages/Home.tsx`, ajouter l'import après la ligne 1 :
```tsx
import { ConstruitSur } from '../components/layout/ConstruitSur';
```
Et insérer `<ConstruitSur />` entre `<Hero />` et `<SectionIntro />` (l.15-16) :
```tsx
<Hero />
<ConstruitSur />
<SectionIntro />
```

- [ ] **Step 4 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` : nouvelle section juste après le Hero, logos monochromes alignés, kicker « CONSTRUIT SUR », mention légale. `preview_resize` mobile : wrap propre. 0 erreur console (notamment aucun 404 image — vérifier `preview_network`).

- [ ] **Step 5 : Commit**

```bash
git add src/components/layout/ConstruitSur.tsx src/pages/Home.tsx
git commit -m "feat(construit-sur): bandeau techno sobre (regle graduee), cadrage honnete sans endorsement"
```

---
---

# PHASE 2 — Concept & motion (dépend de Phase 1)

---

## Task 9 : Hook de révélation au scroll (`useInViewReveal`)

> Primitive de motion réutilisée par toutes les tasks de Phase 2. Logique pure → testable.

**Files:**
- Create: `src/hooks/useInViewReveal.ts`
- Test: `src/hooks/useInViewReveal.test.ts`

- [ ] **Step 1 : Écrire le test (logique reduced-motion)**

Créer `src/hooks/useInViewReveal.test.ts` :
```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prefersReducedMotion } from './useInViewReveal';

describe('prefersReducedMotion', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('returns true when the user prefers reduced motion', () => {
        vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduce'), media: q }));
        expect(prefersReducedMotion()).toBe(true);
    });

    it('returns false when no reduced-motion preference', () => {
        vi.stubGlobal('matchMedia', () => ({ matches: false, media: '' }));
        expect(prefersReducedMotion()).toBe(false);
    });
});
```

- [ ] **Step 2 : Lancer le test (échec attendu)**

Run: `npm run test -- useInViewReveal`
Expected: FAIL — module/`prefersReducedMotion` introuvable.

- [ ] **Step 3 : Implémenter le hook**

Créer `src/hooks/useInViewReveal.ts` :
```ts
import { useEffect, useRef, useState } from 'react';

export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Reveals once when the element enters the viewport.
 * Returns a ref to attach and a boolean `shown`.
 * If the user prefers reduced motion, `shown` is true immediately (no animation gating).
 */
export function useInViewReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
    const ref = useRef<T | null>(null);
    const [shown, setShown] = useState(() => prefersReducedMotion());

    useEffect(() => {
        if (shown) return;
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setShown(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [shown, threshold]);

    return { ref, shown } as const;
}
```

- [ ] **Step 4 : Lancer le test (succès attendu)**

Run: `npm run test -- useInViewReveal`
Expected: PASS (2 tests).

- [ ] **Step 5 : Commit**

```bash
git add src/hooks/useInViewReveal.ts src/hooks/useInViewReveal.test.ts
git commit -m "feat(motion): hook useInViewReveal (reveal au scroll, reduced-motion safe)"
```

---

## Task 10 : Hero — ouverture « grain par grain »

**Files:**
- Modify: `src/components/layout/Hero.tsx:52-71` (le `<div>` image de fond)

**Approche :** le fond bead du Hero est aujourd'hui une `backgroundImage` unique (l.59-63). Pour l'effet « grain par grain » sans réécrire tout le système, on superpose une **couche de masquage** (un calque papier `#F7F7F5`) qui se dissipe par colonnes au montage via un `clip-path`/opacité animée par étapes, donnant l'impression que les perles se posent. Pas de nouvelle dépendance.

- [ ] **Step 1 : Ajouter l'état d'apparition**

En haut du composant `Hero` (après la ligne `const [sz, setSz] = ...`, l.17), ajouter :
```tsx
const [revealed, setRevealed] = useState(false);
useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setRevealed(true); return; }
    const t = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(t);
}, []);
```

- [ ] **Step 2 : Ajouter le calque de masquage animé**

Dans le `<div>` image de fond (juste après son ouverture, avant la `<nav>`, ~l.71), ajouter un calque enfant qui se dissipe :
```tsx
{/* Reveal "grain par grain" — un voile papier qui s'efface par bandes au montage */}
<div
    aria-hidden="true"
    style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F7F7F5',
        opacity: revealed ? 0 : 1,
        transition: 'opacity 800ms cubic-bezier(0.25,0,0.15,1)',
        // bandes verticales : un dégradé répété qui s'amincit quand revealed
        maskImage: revealed
            ? 'none'
            : `repeating-linear-gradient(90deg, #000 0, #000 ${sz.beadPx}px, transparent ${sz.beadPx}px, transparent ${2 * sz.beadPx}px)`,
        WebkitMaskImage: revealed
            ? 'none'
            : `repeating-linear-gradient(90deg, #000 0, #000 ${sz.beadPx}px, transparent ${sz.beadPx}px, transparent ${2 * sz.beadPx}px)`,
        pointerEvents: 'none',
        zIndex: 10,
    }}
/>
```
(Effet : au chargement, une grille de bandes papier de la largeur d'une perle masque l'image, puis s'efface en opacité → les perles « apparaissent ». Sobre, CSS pur.)

- [ ] **Step 3 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_start` puis recharger (`preview_eval: window.location.reload()`), `preview_screenshot` juste après chargement (le voile peut être déjà dissipé — c'est OK). Vérifier `preview_console_logs` 0 erreur. Émuler reduced-motion et recharger : l'image doit être pleine immédiatement.

- [ ] **Step 4 : Commit**

```bash
git add src/components/layout/Hero.tsx
git commit -m "feat(hero): ouverture grain par grain (voile qui se dissipe), reduced-motion safe"
```

---

## Task 11 : Propos — concept « la fracture » DÉMO / PRODUCTION

**Files:**
- Modify: `src/components/layout/Sections.tsx` — `SectionIntro`, au-dessus du `<h2>` (l.314)

- [ ] **Step 1 : Ajouter le bloc fracture avant le titre**

Juste à l'intérieur de `<div className="max-w-[1200px] mx-auto">` (l.314), avant le `<h2>`, insérer :
```tsx
<div className="flex flex-col items-center mb-10" aria-hidden="true">
    <span
        className="font-mono"
        style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 600, color: 'rgba(23,23,23,0.25)', textDecoration: 'line-through', textDecorationThickness: '2px' }}
    >
        DÉMO
    </span>
    <span
        className="font-mono"
        style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700, color: TOKENS.ink, letterSpacing: '-0.02em', marginTop: 4 }}
    >
        PRODUCTION
    </span>
</div>
```
(L'opposition typographique pose la thèse avant la phrase. `aria-hidden` car le `<h2>` porte déjà le sens pour les lecteurs d'écran.)

- [ ] **Step 2 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` de `#section-intro` : DÉMO barré atténué au-dessus de PRODUCTION en gras, puis le manifeste, puis les 3 piliers. 0 erreur console.

- [ ] **Step 3 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "feat(propos): concept 'fracture' DEMO/PRODUCTION en tete de section"
```

---

## Task 12 : Méthode — viz « ligne de production »

**Files:**
- Modify: `src/components/layout/Sections.tsx` — `SectionMethod` (l.617-649), ajouter une ligne reliante au-dessus de la grille des 4 étapes.

- [ ] **Step 1 : Ajouter une ligne reliante avec repères**

Juste avant la `<div className="grid ...">` des étapes (l.617), insérer une ligne horizontale décorative avec 4 nœuds (repères numérotés) alignés sur les colonnes, visible en `lg` :
```tsx
<div className="hidden lg:block relative mb-8" aria-hidden="true" style={{ height: 2 }}>
    <div style={{ position: 'absolute', top: 0, left: '6%', right: '6%', height: 1, backgroundColor: TOKENS.border }} />
    {[0, 1, 2, 3].map((i) => (
        <span
            key={i}
            className="font-mono"
            style={{
                position: 'absolute',
                top: -9,
                left: `calc(12% + ${i} * 25%)`,
                transform: 'translateX(-50%)',
                width: 20, height: 20, lineHeight: '20px', textAlign: 'center',
                fontSize: 11, color: TOKENS.mutedText,
                backgroundColor: TOKENS.white, borderRadius: '50%',
                border: `1px solid ${TOKENS.border}`,
            }}
        >
            {i + 1}
        </span>
    ))}
</div>
```
(Version 1 statique et accessible. Une animation de tracé `stroke-dashoffset` pourra être ajoutée ensuite avec `useInViewReveal` — non bloquant pour cette task.)

- [ ] **Step 2 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` de `#section-method` desktop : ligne reliante + 4 repères au-dessus des cartes. `preview_resize` mobile : la ligne est masquée (`hidden lg:block`), pas de casse. 0 erreur console.

- [ ] **Step 3 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "feat(methode): ligne de production reliante avec reperes numerotes"
```

---

## Task 13 : Capacités — recentrer sur la carte Agent ID (showpiece)

> **Task la plus lourde.** Recentre `SectionCapabilities` sur la carte Agent ID au lieu des 6 blocs. À exécuter avec revue rapprochée. Les composants `AgentCard`, `AgentCardStack`, `AgentTemplate` (Sections.tsx:1140-1764) existent et sont conservés.

**Files:**
- Modify: `src/components/layout/Sections.tsx:658-770` (`CAPABILITIES` + `SectionCapabilities`)

- [ ] **Step 1 : Lire les composants carte existants**

Lire `Sections.tsx:1140-1764` (`AgentCard`, `AgentCardData`, `AgentCardStack`, `AgentTemplate`). Identifier le type `AgentCardData` et les champs affichés, ainsi que toute métrique de type « X actions/jour » à retirer.

- [ ] **Step 2 : Retirer la métrique inventée de la carte**

Dans les données de carte (chercher une valeur du type `actions`/`/jour`/`1 284`), supprimer le champ ou le remplacer par le tag `SPÉCIMEN`. Ajouter, en pied de carte (dans le rendu d'`AgentCard`), une ligne mono discrète :
```tsx
<span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.12em', opacity: 0.5 }}>
    SPÉCIMEN · DÉMONSTRATION DE SAVOIR-FAIRE
</span>
```
(emplacement : en bas de la carte, après le dernier champ.)

- [ ] **Step 3 : Réécrire `SectionCapabilities` pour mettre la carte au centre**

Remplacer le corps de `SectionCapabilities` (l.709-770) par une version recentrée : un header + le showpiece carte (`AgentCardStack` ou `AgentTemplate`) centré. Conserver l'`id="section-capabilities"` et les tokens :
```tsx
export function SectionCapabilities() {
    return (
        <section
            id="section-capabilities"
            className="relative"
            style={{ backgroundColor: TOKENS.surface, paddingBlock: '76px', paddingInline: '32px' }}
            aria-label="Capacités"
        >
            <div className="max-w-[1100px] mx-auto">
                <header className="text-center mb-14">
                    <div className="font-mono" style={{ fontSize: 13, letterSpacing: '0.22em', ...EMBOSS_MUTED }}>
                        CAPACITÉS
                    </div>
                    <h2
                        className="font-sans mt-3 mx-auto"
                        style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)', lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', maxWidth: '20ch', ...EMBOSS_DARK }}
                    >
                        Voici à quoi ressemble un agent de production.
                    </h2>
                    <p
                        className="font-sans mt-4 mx-auto"
                        style={{ fontSize: '17px', lineHeight: '24px', fontWeight: 460, color: TOKENS.mutedText, maxWidth: '52ch' }}
                    >
                        Instructions, sous-agents, outils branchés, garde-fous, latence : chaque agent est une fiche technique, pas une boîte noire.
                    </p>
                </header>

                <div className="flex justify-center">
                    <AgentCardStack />
                </div>
            </div>
        </section>
    );
}
```
(Si `AgentCardStack` ne se centre pas correctement, utiliser `AgentTemplate` à la place. Supprimer le tableau `CAPABILITIES` (l.658-707) **uniquement** si plus référencé ailleurs — vérifier avec une recherche `CAPABILITIES` avant suppression. Les composants visuels orphelins (`Schematic`, `StackArchitecture`, `ActivityFeed`, `Pipeline`, `BeadNetwork`) peuvent rester définis sans être montés ; ne pas les supprimer dans cette task pour limiter le risque.)

- [ ] **Step 4 : Typecheck + visuel**

Run: `npm run build` (OK — corriger tout import/variable inutilisé signalé par TS, ex. retirer un import devenu inutile). `preview_snapshot` de `#section-capabilities` : header + carte Agent ID centrée, tag SPÉCIMEN visible, plus aucune métrique inventée. Le bouton frost du Hero (« Voir une fiche agent ») scrolle bien ici. 0 erreur console.

- [ ] **Step 5 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "feat(capacites): recentrage sur la carte Agent ID (showpiece) + tag SPECIMEN"
```

---

## Task 14 : Capacités — sélecteur 3 archétypes (crossfade)

**Files:**
- Modify: `src/components/layout/Sections.tsx` — `SectionCapabilities` + données de carte.

- [ ] **Step 1 : Définir 3 jeux de données d'agent**

Au-dessus de `SectionCapabilities`, définir 3 `AgentCardData` (réutiliser le type existant repéré en Task 13) : `GTM-001 PROSPECTOR`, `SUP-002 DISPATCHER`, `OPS-003 SCHEDULER`. Chacun avec des `INSTRUCTIONS`/`SOUS-AGENTS`/`OUTILS`/`VALIDATION`/`LATENCE`/`RETRY` plausibles et distincts (voir la fiche affinée de la spec §Section 4 pour PROSPECTOR ; inventer des équivalents cohérents pour DISPATCHER = routage de tickets support, SCHEDULER = planification ops). **Aucune métrique présentée comme résultat réel.**

- [ ] **Step 2 : Ajouter l'état + les puces de sélection**

Dans `SectionCapabilities`, ajouter `const [sel, setSel] = useState(0);` et sous la carte, une rangée de 3 puces mono cliquables (`GTM-001 PROSPECTOR · SUP-002 DISPATCHER · OPS-003 SCHEDULER`) qui changent `sel`. La carte affiche `AGENTS[sel]` avec un crossfade :
```tsx
<div style={{ transition: 'opacity 150ms ease', opacity: 1 }} key={sel}>
    {/* carte rendue avec AGENTS[sel] */}
</div>
```
(le `key={sel}` force le remount → crossfade simple via une classe CSS d'apparition, ou animation `@keyframes fadeIn` ; garder sobre.)

- [ ] **Step 3 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_click` sur chaque puce → `preview_snapshot` : la carte change de contenu (3 archétypes distincts), transition douce. Clavier : les puces sont des `<button>` focusables. 0 erreur console.

- [ ] **Step 4 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "feat(capacites): selecteur 3 archetypes (PROSPECTOR/DISPATCHER/SCHEDULER) en crossfade"
```

---

## Task 15 : CTA — copie + « fiche d'appel »

**Files:**
- Modify: `src/components/layout/Sections.tsx:1890-1910` (`SectionCTA`)

- [ ] **Step 1 : Réécrire le titre + sous-texte**

Remplacer le `<h2>` (l.1891-1898) par un titre sur une ligne :
```tsx
<h2
    className="font-sans"
    style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)', lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', ...EMBOSS_DARK }}
>
    30 minutes pour savoir où un agent vous fait gagner du temps.
</h2>
```
Remplacer le `<p>` (l.1899-1904) par :
```tsx
On cartographie vos workflows à fort levier. À l'issue : un diagnostic écrit des 2-3 processus où un agent de production aurait le plus d'impact, et une estimation de faisabilité. Sans engagement.
```

- [ ] **Step 2 : Ajouter la « fiche d'appel » avant les boutons**

Avant le `<div className="mt-10 flex ...">` (l.1905), insérer une fiche mono encadrée :
```tsx
<dl
    className="font-mono mx-auto mt-8 text-left"
    style={{ maxWidth: 360, padding: '20px 24px', borderRadius: 12, backgroundColor: TOKENS.pale, boxShadow: CARD_SHADOW, fontSize: 13, lineHeight: 1.9 }}
>
    {[
        ['DURÉE', '30:00'],
        ['FORMAT', 'APPEL VISIO'],
        ['LIVRABLE', 'DIAGNOSTIC_WORKFLOWS.PDF'],
        ['ENGAGEMENT', 'AUCUN'],
    ].map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4">
            <dt style={{ color: TOKENS.mutedText, letterSpacing: '0.08em' }}>{k}</dt>
            <dd style={{ color: TOKENS.ink }}>{v}</dd>
        </div>
    ))}
</dl>
```

- [ ] **Step 3 : Mettre à jour le bouton**

Le `ReliefButton` (l.1906-1908) conserve `id="contact"` et `href="#contact"`. Changer le libellé en `Réserver la cartographie` et le `tone` en `lime` :
```tsx
<ReliefButton tone="lime" size="md" href="#contact" id="contact" iconRight={<ArrowRight />}>
    Réserver la cartographie
</ReliefButton>
```

- [ ] **Step 4 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` de `#section-cta` : titre, sous-texte, fiche d'appel mono, bouton lime « Réserver la cartographie ». Le CTA primaire du Hero (« Discutons de votre projet » → `#contact`) scrolle bien ici. 0 erreur console.

- [ ] **Step 5 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "feat(cta): fiche d'appel + copie cartographie 30 min, bouton lime"
```

---

## Task 16 : Footer — signature (repères + build-stamp)

**Files:**
- Modify: `src/components/layout/Sections.tsx:2179-2189` (barre basse du footer)

- [ ] **Step 1 : Remplacer la barre basse par une signature mono + repères**

Remplacer la barre basse (l.2179-2189) par :
```tsx
<div
    className="max-w-[1200px] mx-auto mt-16 pt-6 relative flex flex-wrap justify-between items-center gap-3"
    style={{ borderTop: `1px solid ${TOKENS.border}` }}
>
    {/* repères de coin */}
    <span aria-hidden="true" style={{ position: 'absolute', left: 0, bottom: -4, width: 10, height: 10, borderLeft: `1px solid ${TOKENS.border}`, borderBottom: `1px solid ${TOKENS.border}` }} />
    <span aria-hidden="true" style={{ position: 'absolute', right: 0, bottom: -4, width: 10, height: 10, borderRight: `1px solid ${TOKENS.border}`, borderBottom: `1px solid ${TOKENS.border}` }} />

    <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: TOKENS.mutedText }}>
        © {new Date().getFullYear()} LEONARD INTELLIGENCE · BUILD v2 · PARIS, FRANCE
    </span>
    <span className="font-mono" style={{ fontSize: 11, letterSpacing: '0.04em', color: TOKENS.mutedText }}>
        Construit en France 🇫🇷
    </span>
</div>
```

- [ ] **Step 2 : Typecheck + visuel**

Run: `npm run build` (OK). `preview_snapshot` du footer : build-stamp mono + 2 repères de coin discrets. 0 erreur console.

- [ ] **Step 3 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "feat(footer): signature 'fiche produit' (reperes de coin + build-stamp mono)"
```

---

## Task 17 : Révélations au scroll (cristallisation légère) sur les sections

> Applique `useInViewReveal` (Task 9) pour faire apparaître le contenu des sections au scroll, dans le vocabulaire de motion de la spec (entrée 600ms, easing contenu). Sobre — pas de cristallisation lourde des perles dans cette passe (différé / hors périmètre, voir spec §6).

**Files:**
- Modify: `src/components/layout/Sections.tsx` — wrappers d'entrée de `SectionIntro`, `SectionMethod`, `SectionServices`, `SectionCapabilities`, `SectionCTA`.

- [ ] **Step 1 : Créer un petit composant `Reveal`**

En haut de `Sections.tsx` (après les imports), ajouter :
```tsx
import { useInViewReveal } from '../../hooks/useInViewReveal';

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
    const { ref, shown } = useInViewReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'none' : 'translateY(12px)',
                transition: 'opacity 600ms cubic-bezier(0.25,0,0.15,1), transform 600ms cubic-bezier(0.25,0,0.15,1)',
            }}
        >
            {children}
        </div>
    );
}
```

- [ ] **Step 2 : Envelopper les conteneurs de contenu**

Dans chaque section listée, envelopper le conteneur de contenu principal (`<div className="max-w-[...] mx-auto">`) avec `<Reveal>` (ne PAS envelopper les `PixelLayer`/calques absolus — uniquement le contenu lisible). Faire une section à la fois.

- [ ] **Step 3 : Typecheck + visuel**

Run: `npm run build` (OK). Recharger la preview en haut de page, scroller (`preview_eval: window.scrollTo(0, document.body.scrollHeight/2)`), `preview_screenshot` : le contenu apparaît en fondu+montée. Émuler reduced-motion : tout est visible immédiatement, sans translation. 0 erreur console.

- [ ] **Step 4 : Commit**

```bash
git add src/components/layout/Sections.tsx
git commit -m "feat(motion): revelations au scroll sobres sur les sections (reduced-motion safe)"
```

---

## Vérification finale (après toutes les tasks)

- [ ] `npm run build` → 0 erreur TS, build OK.
- [ ] `npm run test` → tous les tests passent.
- [ ] `npm run lint` → 0 erreur (corriger imports inutiles laissés par la refonte Capacités).
- [ ] Parcours visuel complet de haut en bas (`preview_screenshot` à chaque section), desktop + mobile (`preview_resize`).
- [ ] `preview_network` : aucun 404 (logos « Construit sur »).
- [ ] Audit zéro-fausse-preuve : aucune métrique chiffrée présentée comme résultat, aucun « cas clients », carte taguée SPÉCIMEN.
- [ ] Tous les liens d'ancre résolvent (`#contact`, `#section-capabilities`).

---

## Self-review (rempli par l'auteur du plan)

**Couverture spec :** Hero (T1, T10) · Construit sur (T8) · Propos (T3, T11) · Capacités carte + sélecteur + correctif preuve (T7, T13, T14) · Méthode (T4, T12) · Services (T5) · CTA (T15) · Footer/Navbar (T2, T6, T16) · charte éditoriale (appliquée dans toutes les copies) · spine motion (T9, T17 ; cristallisation lourde des perles explicitement différée, cohérent spec §6). **Zéro fausse preuve** traité en T1 (cas clients Hero), T6 (footer), T7 + T13 (métriques Capacités).

**Placeholders :** copies fournies verbatim ; code fourni pour chaque step structurel. Seules zones « à localiser » : `SERVICE_BLOCKS` (T5) et le type `AgentCardData` (T13/T14) — non inlinés car volumineux/non lus intégralement, l'implémenteur les lit dans le fichier. Acceptable.

**Cohérence des noms :** `useInViewReveal`/`prefersReducedMotion` (T9) réutilisés tels quels en T17. `id="section-capabilities"` (cible du CTA Hero T1) conservé en T13. `#contact` (id sur le bouton du CTA, T15) cible des CTAs primaires (T1).
