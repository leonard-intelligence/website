# Leonard Intelligence — Refonte v2 · Spec de contenu « Intelligence cultivée »

> Conception du contenu (copie + concept de chaque section) de la page d'accueil.
> Branche `v2-redesign`. Phase design — **aucun code** ici, l'implémentation suivra via un plan dédié.
> Date : 2026-05-31.

---

## 1. Contexte & objectif

Leonard Intelligence est une **agence agentique française** : elle conçoit, déploie et pilote les agents IA sur-mesure des entreprises. La refonte v2 doit *crédibiliser une agence haut de gamme* alors que la seule preuve réellement disponible est la qualité du savoir-faire et la techno sur laquelle on construit.

**Objectif de cette spec :** définir, section par section, le contenu (copie) et le concept créatif (animation / illustration / idée forte) qui rendent chaque section impactante **sans trahir la retenue** de la direction artistique.

---

## 2. Cadre directeur (non négociable)

- **Direction artistique « Intelligence cultivée »** : tension ORGANIQUE (mosaïques de perles/« beads » façon fleurs, pixel-art) × MACHINE (carte « Agent ID » embossée, monospace, marques de repère, précision). Exécutée avec **RETENUE**. Quatre piliers : Beads (imagerie), Frost (verre dépoli sur imagerie), Relief (boutons biseautés tactiles), Carte ID (précision/spec).
- **Typographie : Geist + Geist Mono UNIQUEMENT.** (Tout document mentionnant « Neoris » est obsolète.)
- **Palette :** papier `#F7F7F5`, surface `#F5F5F2`, encre `#171717`, lime `#A3E635`, or `#EEC75D`, gris chauds.
- **Audience :** décideur **technique** (CTO / head of eng / lead data). Apprécie la précision technique, déteste le hype.
- **Colonne narrative (A+B) :** les agents sont (A) **de production** (fiables, orchestrés, garde-fous, validation humaine — pas des démos) ET (B) **sur-mesure & souverains** (l'agent exact de votre métier, branché à votre stack via MCP/APIs/webhooks, sur vos modèles et vos données).
- **Règle absolue — ZÉRO FAUSSE PREUVE :** aucun cas client, témoignage, logo client, ni métrique chiffrée réelle. Ne jamais inventer clients/chiffres/résultats. Seules preuves autorisées : (1) le savoir-faire (carte Agent ID), (2) la techno « Construit sur » (logos modèles/cloud, cadrage « construit sur » sans endorsement), (3) la clarté de la méthode.
- **À garder :** la carte « Agent ID » (pièce maîtresse).

---

## 3. Les deux systèmes unificateurs

Plusieurs pistes ont convergé vers deux systèmes qui tiennent toute la page.

### 3.1 Le mouvement — « cristallisation des perles »
Le scroll raconte une histoire : **chaos organique → mise en ordre → précision machine → relâchement.**
- Hero : densité/chaos maximal (la fleur).
- Propos → Méthode : les perles se mettent en ordre.
- Capacités → Services : précision machine, les perles deviennent des pixels de registre (au repos, stables).
- CTA → Footer : tension relâchée, légère dispersion.

Les perles « déjà peintes » (drips statiques existants) ne bougent pas — elles sont la fondation. Seules les perles de **liaison narrative** s'animent, par `IntersectionObserver` (threshold ~0.15), en CSS, **sans** scroll-listener continu. `prefers-reduced-motion` → tout présent au chargement, sans animation.

**Vocabulaire de motion unifié :**
- Deux tempos : lent `600ms` (entrée de contenu) ; très lent `1200ms` (déplacement de perles / liaisons). Pas de `<300ms` sauf feedback d'interaction (hover/press).
- Easing contenu : `cubic-bezier(0.25, 0, 0.15, 1)`. Easing perles : `cubic-bezier(0.4, 0, 0.2, 1)`.
- Parallax interdit sauf Hero (translation imperceptible du fond bead, ≤ `0.08 * scrollY`).

### 3.2 Le motif — « fiche technique » (Geist Mono)
Récurrence **voulue mais parcimonieuse** du langage *spec/datasheet* : `Construit sur` (liste sobre), la carte Agent ID, le CTA en « fiche d'appel », le build-stamp du footer. C'est le signal de rigueur qui parle au décideur technique.

---

## 4. Charte éditoriale (transversale)

**Lexique à privilégier :** agent de production · sur-mesure · orchestration · garde-fous · validation humaine · souverain · branché à votre stack · déployer · piloter · intégré · fiable · précis · méthode · observable · vos données / vos modèles / vos systèmes.

**Bannis (aucune exception) :** révolutionnaire · disruptif · game-changer · boostez · propulsé par l'IA · magie · puissant · next-gen · solution clé en main · plug-and-play · tout superlatif non étayé.

**Règles de style :**
- Voix active (« Leonard conçoit », jamais « des agents sont conçus »).
- Phrases ≤ 22 mots, une idée par phrase.
- Titres en minuscules sauf premier mot et noms propres. Pas de titres tout-en-majuscules (sauf labels mono courts).
- Geist Mono réservé aux labels techniques (specs, identifiants, valeurs, tags). Jamais dans le corps courant.
- Anglicismes tolérés seulement si terme d'art sans équivalent (`MCP`, `stack`, `webhook`, `pipeline`).
- Nombres chiffrés ; **aucun chiffre inventé**.

**Note de tension assumée :** le H1 du Hero adopte un registre **vision / FOMO** (décision client). La rigueur anti-hype est alors portée par le **sous-titre** et le reste de la page. Le H1 capte ; la ligne d'en dessous prouve.

**Checklist garde-fou (à passer pour chaque section avant validation) :**
- [ ] Aucun client / logo client / témoignage
- [ ] Aucune métrique chiffrée inventée (ROI, gains de temps, économies)
- [ ] Aucun superlatif non étayé, aucun mot banni
- [ ] Voix active, phrases ≤ 22 mots
- [ ] Geist Mono uniquement sur labels techniques
- [ ] Les CTAs ne promettent pas de résultat invérifiable

---

## 5. L'arc des sections

`1 Hero → 2 Construit sur → 3 Propos → 4 Capacités (carte Agent ID) → 5 Méthode → 6 Services → 7 CTA → 8 Footer` (+ Navbar transversale).

---

### Section 1 · Hero

**Rôle :** le seuil. Crée la tension qui donne envie de descendre.

**Copie (décidée) :**
- H1 : **« Bienvenue dans l'ère des agents. »**
- Sous-titre : *« Leonard conçoit, déploie et pilote les agents sur-mesure de votre entreprise — branchés à vos systèmes, sur vos modèles et vos données. »*
- CTA primaire (relief lime) : `Discutons de votre projet →` (`#contact`)
- CTA secondaire (frost) : `Voir une fiche agent` → `#capacites`
- **Supprimé :** le bouton `Voir nos cas clients` (preuve interdite, aucune cible).

**Concept — ouverture « grain par grain » :** la mosaïque de perles se construit perle par perle au chargement (colonnes d'abord lentes puis accélérant ; chaque bead « pop » par opacité, pas de fondu). La fleur s'achève en ~800 ms ; le texte monte par le bas tandis que les dernières perles se posent. La construction mime « on construit, composant par composant — pas de magie » et **amorce la cristallisation** (système 3.1).

---

### Section 2 · Construit sur

**Rôle :** sas de crédibilité juste après le Hero. Répond à « sur quoi ça roule vraiment ? » en désamorçant le scepticisme.

**Copie (décidée — traitement « règle graduée » sobre) :**
- Kicker (Geist Mono, capitales, gris chaud) : `CONSTRUIT SUR`
- Micro-mention légale (Geist Mono ~11 px, gris) : *« Les marques sont la propriété de leurs titulaires respectifs. Leonard Intelligence n'est ni partenaire officiel ni revendeur agréé. »*

**Concept :** logos **monochromes** (encre) alignés sur une ligne unique, espacés comme les graduations d'une règle ; nom de chaque entité en Geist Mono ~10 px sous le logo, en opacité réduite. Aucun fond, aucun badge, aucune carte. Effet datasheet, zéro hiérarchie commerciale.

**Sélection & ordre :** `Anthropic · OpenAI · Mistral · Gemini · Meta (Llama) · Nvidia · HuggingFace · OVHcloud` (8 max ; OVHcloud en fin = souveraineté). Variante ultra-épurée possible : `Anthropic · Mistral · OpenAI · OVHcloud`. Assets disponibles dans `public/assets/logos/`.

---

### Section 3 · Propos

**Rôle :** pivot de crédibilité. Dit *pourquoi Leonard existe* via la bascule **démo → production**.

**Copie :**
- Manifeste (court, dense) : *« Tout le monde sait faire une démo convaincante. Presque personne ne sait livrer un système qui tient. Le réel, c'est votre stack, vos données, vos contraintes, vos équipes qui valident. C'est là que les agents échouent — ou tiennent. Leonard conçoit des agents qui tiennent. »*
- 3 piliers :
  - **Sur-mesure** — Branché à vos APIs, votre stack, vos modèles — pas une solution générique déployée telle quelle.
  - **Human in the loop** — Validation humaine aux points critiques. Fiabilité par construction, pas par promesse.
  - **Souverain** — Vos données ne quittent pas votre périmètre. Vos modèles, vos règles, votre contrôle.

**Concept — « La fracture » (+ proto-carte) :** opposition typographique `DÉMO` (atténué/barré) vs **`PRODUCTION`** (plein, display), séparés par une rangée de perles (1 ligne du système bead) qui matérialise la cassure organique↔machine. Les 3 piliers sont présentés en mini **proto-carte** (bordure fine, inset shadow léger, 3 champs label/valeur) qui *préfigure* la carte Agent ID de la section suivante.

---

### Section 4 · Capacités (carte Agent ID)

**Rôle :** la preuve par le savoir-faire. **On garde la carte ; on la sublime.**

**Contenu de la fiche (affiné, agent-spécimen) :**
| Champ | Valeur |
|---|---|
| `AGENT ID` | `GTM-001` (codename, pas un client) |
| `TYPE` | `AGENT · GTM / OUTBOUND` |
| `INSTRUCTION` | *« Tu qualifies les ICP SaaS B2B ≥ 50 ETP, rédiges des séquences d'approche contextuelle, escalades dès qu'un signal d'intent est détecté. »* |
| `SOUS-AGENTS` | `03 — Qualifier · Rédacteur · Scorer` |
| `OUTILS` | `LinkedIn API · Apollo · Notion (MCP) · Webhook CRM` |
| `VALIDATION HUMAINE` | `01 — séquence avant envoi` |
| `LATENCE P95` | `1.8 s` |
| `RETRY POLICY` | `3× exp. backoff · fallback` |
| `ORCHESTRATION` | `Leonard Orchestration Layer` |

**Correctif preuve :** retirer la métrique « 1 284 actions/jour » (résultat non vérifiable). Taguer la carte `SPÉCIMEN · DÉMONSTRATION DE SAVOIR-FAIRE` (mono, petit) pour signaler son caractère illustratif.

**Concept — « la spec qui se dépose » :** la carte est à ~70 % visible au repos (coupée par le bas du viewport) ; au scroll elle monte (`translateY`) et 5 champs-clés s'allument un par un (`opacity` + `translateY` 8 px, décalage ~80 ms) dans l'ordre où l'ingénieur lit : `INSTRUCTIONS → SOUS-AGENTS → OUTILS → VALIDATION → LATENCE/RETRY`. **Sélecteur 3 archétypes** sous la carte (`GTM-001 PROSPECTOR · SUP-002 DISPATCHER · OPS-003 SCHEDULER`) : clic = crossfade (~150 ms) du contenu → prouve que la carte est un **template de déploiement**, pas un spécimen isolé. `prefers-reduced-motion` → carte pleine, sans animation.

---

### Section 5 · Méthode

**Rôle :** « comment on fabrique avec vous ». Preuve de rigueur opérationnelle.

**Copie — 4 étapes :**
1. **Cartographier** — On identifie les workflows à fort levier : volumes, fréquence, coût du goulot. On classe les agents candidats par effort / retour.
2. **Spécifier** — On conçoit l'agent au niveau plan d'architecte : périmètre d'autonomie, outils, données, garde-fous, supervision. Zéro code avant validation.
3. **Construire & brancher** — On assemble l'agent et on le connecte à votre stack (MCP / API / webhook). Tests sur cas limites et sorties dégradées avant la prod.
4. **Piloter** — L'agent tourne en production avec des métriques de décision (réussite, escalades, dérives). On itère sur la spec, pas seulement sur le code.

**Concept — « la ligne de production qui se trace » :** une ligne fine horizontale se dessine au scroll (`stroke-dashoffset`). À chaque étape elle marque une pause : une perle (organique) émerge, grossit, puis se fige en repère mécanique numéroté (`○1…○4`, style annotation de plan). Texture de la ligne : légèrement organique en conception, rigide en build. Fond papier, pas de carte ; le seul relief = la ligne + les repères. Dégradable sans animation (accessible).

---

### Section 6 · Services

**Rôle :** « ce que je peux acheter ». Trois offres distinctes, sans recouvrement, axées **livrables** (pas promesses d'impact).

**Copie — 3 offres :**
1. **Conception d'agents** — Analyse de vos process, architecture multi-agents, sélection/fine-tuning du modèle (ouvert ou privé, hébergeable chez vous), outils et connecteurs métier. *Livrable : un agent de production testé, documenté, déployable.*
2. **Automatisation de workflows** — Orchestration d'agents sur vos flux (documents, qualification, reporting, relances), intégrée aux outils en place (CRM, ERP, API internes). Étapes critiques sous validation humaine. *Livrable : un pipeline observable, avec seuils de reprise.*
3. **Déploiement & pilotage** — Mise en production sur votre infra (cloud souverain, on-prem, hybride), monitoring continu, SLA, itérations post go-live. *Livrable : agents en production + tableau de bord + protocole de maintenance.*

**Concept — « perles de procédé » + specs :** icône de chaque offre = une **constellation de perles** propre (spirale ouverte = conception, ligne brisée = workflow, anneau fermé = pilotage), petit format (~40×40 px), au-dessus du titre. Pied de carte = ligne de « specs » mono en opacité réduite (`STACK: API · RAG · Fine-tuning`, `ENV: cloud / on-prem`). Cohérence DA, lisibilité froide.

---

### Section 7 · CTA

**Rôle :** rendre le passage à l'acte évident en réduisant le coût perçu de la première conversation.

**Copie :**
- Titre : **« 30 minutes pour savoir où un agent vous fait gagner du temps. »**
- Sous-texte : *« On cartographie vos workflows à fort levier. À l'issue : un diagnostic écrit des 2-3 processus où un agent de production aurait le plus d'impact, et une estimation de faisabilité. Sans engagement. »*
- Bouton primaire (relief lime) : `Réserver la cartographie`
- Bouton secondaire (optionnel, ghost/frost) : `Voir comment on travaille` → `#methode`

**Concept — « fiche d'appel » :** la cartographie présentée comme un artefact, même langage que la carte Agent ID :
```
CARTOGRAPHIE / SESSION_01
DURÉE        30:00
FORMAT       APPEL VISIO
LIVRABLE     DIAGNOSTIC_WORKFLOWS.PDF
ENGAGEMENT   AUCUN
```
Fond papier, encadrement biseau léger, labels Geist Sans / valeurs Geist Mono. La section CTA **documente son propre livrable** — l'objection « qu'est-ce que je reçois ? » disparaît.

---

### Section 8 · Navbar & Footer

**Navbar :** ultra-minimale — logo + `Contact`. Transparente sur le Hero (logo blanc) ; au scroll hors Hero, fond `#F7F7F5` + ombre légère (`0 1px 0 rgba(0,0,0,0.08)`). Pas de hamburger, pas d'ancres multiples.

**Footer — registre « fiche produit » :**
- Corps : *« Agence agentique. Nous concevons, déployons et pilotons les agents IA de production — sur-mesure, branchés à vos systèmes. »*
- Liens : `Méthode · Services · Mentions légales · Contact`
- Email visible : `guillaume3301@proton.me`
- Mention : `© 2026 Leonard Intelligence — Construit en France`

**Concept signature — repères + build-stamp :** marques d'impression (registration marks, L-shaped, 1 px) dans les angles bas + bloc build-stamp Geist Mono discret (`LEONARD INTELLIGENCE · BUILD v2 · Paris, France`). La « bead strip » (mosaïque de perles qui boucle le Hero depuis le footer) est **en attente** — à intégrer une fois le PixelLayer stabilisé.

---

## 6. Hors-périmètre / différé à l'implémentation

- Génération stable des positions « diffuses » des perles (seed `useMemo` sur `src+at`) — détail technique du plan d'implémentation.
- Bead strip du footer (différée).
- Choix final 8 logos vs 4 logos « Construit sur » (par défaut : liste sobre, ajustable).
- Pages légales (Mentions légales) — hors de cette spec de page d'accueil.

---

## 7. Décisions verrouillées

- H1 Hero : « Bienvenue dans l'ère des agents. » + sous-titre précis.
- « Construit sur » : règle graduée sobre, logos monochromes, micro-mention légale.
- CTA secondaire Hero : `Voir une fiche agent` → `#capacites`.
- On garde la carte Agent ID ; on retire la métrique « actions/jour » et on la tague `SPÉCIMEN`.
- Spine motion : cristallisation des perles, `IntersectionObserver` + CSS, reduced-motion safe.
- Typo Geist + Geist Mono uniquement. Zéro fausse preuve.
