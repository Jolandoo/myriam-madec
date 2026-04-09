# Myriam Madec — Guide Conférencière Arcachon
# Instructions pour Claude Code

## Vue d'ensemble du projet
Refonte complète du site tourismearcachon.fr — site vitrine pour Myriam Madec,
guide conférencière officielle sur le Bassin d'Arcachon. Le site présente ses visites
guidées (à pied, à vélo, en bateau), permet la réservation et met en valeur
l'authenticité et la richesse patrimoniale du territoire.

Le site actuel est un WordPress Neve très basique. La refonte vise un site moderne,
élégant, qui donne envie de partir en visite — inspiré des codes du tourisme de
qualité (Airbnb Experiences, guides Lonely Planet premium).

---

## Stack technique
- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript strict
- **Styles** : Tailwind CSS + CSS variables custom
- **Animations** : Framer Motion
- **Polices** : Playfair Display (titres, serif élégant) + Inter (corps)
- **Icônes** : Lucide React

---

## Design system

### Palette de couleurs — inspirée du Bassin d'Arcachon
```css
--primary:      #1B4F6B;   /* Bleu Bassin profond */
--primary-dark: #0F3347;   /* Bleu nuit, hover */
--primary-light:#E8F4F9;   /* Bleu ciel clair, fonds */
--accent:       #C4862A;   /* Ocre doré, sable de dune */
--accent-light: #FAF0E0;   /* Crème sable, fonds chauds */
--sand:         #F5EDD8;   /* Beige sable */
--forest:       #2D5016;   /* Vert forêt des Landes */
--white:        #FFFFFF;
--gray-50:      #F9F8F6;   /* Fond général */
--gray-100:     #EEE9E1;   /* Séparateurs */
--text-primary: #1A2530;   /* Texte principal */
--text-muted:   #5A6A75;   /* Texte secondaire */
```

### Typographie
- H1 : Playfair Display, 52px desktop / 32px mobile, italic pour les accents
- H2 : Playfair Display, 36px desktop / 26px mobile
- H3 : Playfair Display, 22px
- Corps : Inter, 16px, line-height 1.75
- Labels/catégories : Inter, 11px, 500, uppercase, letter-spacing 2px
- Prix/durée : Inter, 14px, 500

### Règles visuelles
- Ambiance : chaleureuse, nature, authentique — pas corporate
- Photos en pleine largeur avec overlay dégradé pour lisibilité du texte
- Cartes visites : image haute en haut, contenu en bas, hover avec légère élévation
- Bordures : 1px solid var(--gray-100)
- Border radius cards : 16px
- Border radius boutons : 8px
- Pas de design trop tech ou trop minimaliste — c'est du tourisme humain

---

## Structure des dossiers

```
myriam-madec/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Accueil
│   │   ├── mes-visites/
│   │   │   ├── page.tsx           # Catalogue toutes visites
│   │   │   ├── bunker-502/page.tsx
│   │   │   ├── criee-arcachon/page.tsx
│   │   │   ├── ville-hiver/page.tsx
│   │   │   ├── origines-arcachon/page.tsx
│   │   │   ├── pres-sales/page.tsx
│   │   │   ├── dune-pilat-lever/page.tsx
│   │   │   ├── decouverte-archeologique/page.tsx
│   │   │   ├── randonnee-crete/page.tsx
│   │   │   ├── velo-ville-hiver/page.tsx
│   │   │   ├── velo-pres-sales/page.tsx
│   │   │   ├── littoral-velo/page.tsx
│   │   │   ├── sentier-littoral/page.tsx
│   │   │   └── balades-bateau/page.tsx
│   │   ├── privatisation/page.tsx
│   │   ├── tarifs/page.tsx
│   │   ├── actualites/page.tsx
│   │   ├── votre-guide/page.tsx   # À propos de Myriam
│   │   └── contact/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Nav sticky, transparent sur hero
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx           # Hero plein écran avec photo Bassin
│   │   │   ├── VisitesGrid.tsx    # Grille des visites filtrables
│   │   │   ├── VisiteCard.tsx     # Carte individuelle visite
│   │   │   ├── Testimonials.tsx
│   │   │   ├── AboutMyriam.tsx    # Section présentation guide
│   │   │   ├── CTAContact.tsx
│   │   │   └── FilterBar.tsx      # Filtres : À pied / Vélo / Bateau
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx          # "À pied", "Vélo", "Bateau", durée
│   │       ├── DurationPill.tsx   # "1h30", "2-3h"
│   │       └── SectionHeader.tsx
│   ├── data/
│   │   └── visites.ts             # Toutes les visites avec métadonnées
│   └── styles/
│       ├── globals.css
│       └── tokens.css
├── public/images/
├── CLAUDE.md
└── package.json
```

---

## Données — visites.ts

Chaque visite doit avoir cette structure TypeScript :

```typescript
interface Visite {
  slug: string
  titre: string
  sousTitre: string           // ex: "Arcachon sous l'Occupation"
  categorie: 'pied' | 'velo' | 'bateau' | 'velo-electrique'
  duree: string               // ex: "1h30", "2-3h"
  description: string
  descriptionCourte: string   // Max 120 caractères pour les cards
  image: string               // chemin /images/...
  reservation: 'office-tourisme' | 'contact-direct'
  reservationUrl?: string     // URL office de tourisme si applicable
  tags: string[]              // ex: ['histoire', 'architecture', 'nature']
  niveauActivite: 'facile' | 'modere' | 'sportif'
  enfantsFriendly: boolean
}
```

### Les 13 visites à intégrer
1. **bunker-502** — À pied, 1h, histoire/WWII, réservation office tourisme
2. **criee-arcachon** — À pied, 1h30, pêche/découverte, réservation office tourisme
3. **ville-hiver** — À pied, 2h, architecture XIXe, contact direct
4. **origines-arcachon** — À pied, 2h, histoire bains de mer, contact direct
5. **pres-sales-pied** — À pied, 2-3h, nature/huîtres, contact direct
6. **dune-lever-soleil** — À pied, 1h30, départ 6h, expérience unique, contact direct
7. **decouverte-archeologique** — À pied, 2h, archéologie/dune, contact direct
8. **randonnee-crete** — À pied, 2-3h, randonnée, contact direct
9. **velo-ville-hiver** — Vélo électrique, 2h, forêt/architecture, contact direct
10. **velo-pres-sales** — Vélo électrique, 1-2h, ostréiculture, contact direct
11. **littoral-velo** — Vélo, 2h, front de mer, contact direct
12. **sentier-littoral** — Vélo, 2-3h, Réserve Teich/huîtres, contact direct
13. **balades-bateau** — Bateau, 2h à 1 journée, Île aux Oiseaux, contact direct

---

## Pages clés — contenu attendu

### Accueil (page.tsx)
- Hero plein écran : photo du Bassin, titre "Découvrez le Bassin d'Arcachon autrement"
- Sous-titre : "Myriam Madec, Guide Conférencière Officielle"
- 3 catégories en avant : À pied / À vélo / En bateau
- Section "Pourquoi choisir un guide officiel" (3 arguments)
- 3 visites coup de cœur en avant
- Section Myriam en bref (photo + bio courte)
- CTA contact/réservation

### Mes visites (catalogue)
- Barre de filtres : Tous / À pied / À vélo / En bateau
- Filtre durée : < 2h / 2-3h / Demi-journée / Journée
- Grille de cards responsive : 3 col desktop / 2 tablet / 1 mobile
- Chaque card : image, catégorie badge, titre, durée, description courte, bouton réserver

### Votre guide
- Photo professionnelle de Myriam
- Bio : guide conférencière officielle du Bassin d'Arcachon
- Ses spécialités : histoire, patrimoine, nature, gastronomie locale
- Langues parlées
- Certifications et accréditations

---

## Conventions de code

- Composants PascalCase, fichiers kebab-case
- Props typées avec interface
- Pas de `any`, pas de `@ts-ignore`
- Couleurs via CSS variables uniquement (jamais hardcodées sauf tokens.css)
- Images : toujours avec alt descriptif en français
- Liens de réservation : ouvrir dans nouvel onglet (`target="_blank" rel="noopener"`)

### Pattern animation scroll (Framer Motion)
```tsx
const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 24 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: index * 0.1 }}
>
```

---

## Ton éditorial

- **Langue** : français, registre chaleureux et expert
- **Voix** : Myriam parle à la première personne dans les descriptions de visites
  - ✅ "Je vous invite à me suivre dans les allées de la Ville d'Hiver"
  - ❌ "La guide vous emmène découvrir..."
- **Ton** : passionné, pédagogue, ancré dans le territoire
- **Mise en valeur** : l'authenticité locale, les coulisses inaccessibles, la transmission
- Toujours mentionner la durée et le mode de déplacement en début de description

---

## Ce qu'il ne faut jamais faire

- Pas de lorem ipsum — utiliser le contenu réel du site ou `{/* TODO */}`
- Pas de photos stock génériques de "tourisme" — uniquement des photos du Bassin
- Pas de jargon technique visible pour l'utilisateur final
- Pas de dark mode (le site doit rester clair, lumineux, estival)
- Pas de composants > 150 lignes — découper
- Pas de dépendances inutiles — confirmer avant d'en ajouter

---

## Commandes utiles

```bash
npm run dev        # Serveur de développement
npm run build      # Build production
npm run lint       # Lint
npm run type-check # Vérification TypeScript
```

---

## Checklist avant chaque composant

- [ ] Responsive : mobile (1 col) / tablet (2 col) / desktop (3 col)
- [ ] Photos avec alt en français
- [ ] Couleurs via CSS variables
- [ ] Animations avec triggerOnce: true
- [ ] Texte en français, ton Myriam respecté
- [ ] Liens réservation en target="_blank"
