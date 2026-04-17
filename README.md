# tourismearcachon.fr — Myriam Madec

Site vitrine de **Myriam Madec**, Guide Interprète Nationale officielle du Bassin d'Arcachon depuis 1994. Visites guidées à pied, à vélo et en bateau.

🌐 **Production** : [myriam-madec.vercel.app](https://myriam-madec.vercel.app) → futur domaine : `tourismearcachon.fr`

---

## Stack

| Technologie | Usage |
|---|---|
| [Next.js 15](https://nextjs.org) (App Router) | Framework |
| TypeScript strict | Langage |
| Tailwind CSS + CSS variables | Styles |
| Framer Motion | Animations |
| Playfair Display + Inter | Polices (Google Fonts) |
| Lucide React | Icônes |
| [Resend](https://resend.com) | Envoi d'emails (formulaire contact) |
| Vercel | Hébergement & déploiement |

---

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Serveur de développement (http://localhost:3000)
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

### Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

> La clé Resend est nécessaire pour le formulaire de contact. Sans elle, les envois d'emails échouent en production.

---

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx                  # Layout global, metadata SEO, JSON-LD
│   ├── page.tsx                    # Accueil
│   ├── mes-visites/
│   │   ├── page.tsx                # Catalogue avec filtres
│   │   └── [slug]/page.tsx         # Page individuelle de visite
│   ├── actualites/
│   │   ├── page.tsx                # Liste des articles
│   │   └── [slug]/page.tsx         # Article individuel avec galerie
│   ├── tarifs/page.tsx
│   ├── votre-guide/page.tsx
│   ├── contact/page.tsx
│   ├── privatisation/page.tsx
│   ├── api/contact/route.ts        # API Resend
│   ├── sitemap.ts                  # Sitemap automatique
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Nav sticky, transparent sur hero
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── sections/                   # Sections de la page d'accueil
│   └── ui/
│       └── PhotoGallery.tsx        # Lightbox Framer Motion
├── data/
│   ├── visites.ts                  # 13 visites avec métadonnées
│   └── articles.ts                 # Articles actualités
public/
├── icon.png                        # Favicon
└── videos/
    └── hero-web.mp4                # Vidéo hero compressée (~7 Mo)
```

---

## Données

### Ajouter / modifier une visite — `src/data/visites.ts`

```typescript
{
  slug: 'mon-slug',            // URL : /mes-visites/mon-slug
  titre: 'Titre de la visite',
  sousTitre: 'Sous-titre',
  categorie: 'pied' | 'velo' | 'velo-electrique' | 'bateau',
  duree: '2h',
  description: '...',          // Description longue (page détail)
  descriptionCourte: '...',    // Max ~120 caractères (card catalogue)
  image: 'https://...',        // Thumbnail pour les cards
  imageDetail: 'https://...',  // Image HD pour le hero de la page détail
  imageCredit: '© Auteur',     // Affiché en overlay sur le hero
  reservation: 'office-tourisme' | 'contact-direct',
  reservationUrl: 'https://...', // Si office-tourisme
  tags: ['tag1', 'tag2'],
  niveauActivite: 'facile' | 'modere' | 'sportif',
  enfantsFriendly: boolean,
}
```

> **Images externes** : les domaines autorisés pour `next/image` sont déclarés dans `next.config.mjs`. Ajouter un nouveau domaine si nécessaire.

### Ajouter un article — `src/data/articles.ts`

Même principe : ajouter un objet au tableau `articles` avec `slug`, `titre`, `date`, `image`, `extrait`, `contenu` (tableau de paragraphes), `images` (galerie lightbox).

---

## Email de contact

Le formulaire `/contact` envoie via l'API Resend (`src/app/api/contact/route.ts`).

**Configuration actuelle (temporaire)** :
- `from` : `onboarding@resend.dev` (domaine de test Resend)
- `to` : `jolann.madec21@gmail.com`

**À mettre à jour quand le domaine OVH est accessible** :
```typescript
from: 'Myriam Madec <noreply@tourismearcachon.fr>',
to:   ['myramixa@aol.com'],
```
> Nécessite d'ajouter les enregistrements DNS Resend (TXT + DKIM) sur OVH.

---

## SEO

- **Metadata** : titre/description par page via `generateMetadata`
- **JSON-LD** : schéma `LocalBusiness` dans `layout.tsx`
- **Sitemap** : généré automatiquement via `src/app/sitemap.ts`
- **robots.txt** : `src/app/robots.ts`
- **Canonical** : `https://www.tourismearcachon.fr`

---

## Déploiement

Le projet est déployé sur **Vercel** via GitHub. Chaque push sur `main` déclenche un déploiement automatique.

```bash
# Vérifier le build avant de pousser
npm run build
```

Variable d'environnement à configurer dans Vercel : `RESEND_API_KEY`

---

## Photos — droits en attente

Images utilisées temporairement avec des alternatives libres (Wikimedia Commons / Pexels). Envoyer un mail pour autorisation avant mise en ligne officielle :

| Page | Contact |
|---|---|
| Bunker 502 | CDT Gironde |
| Criée d'Arcachon | Office de Tourisme d'Arcachon |
| Ville d'Hiver | Hugo Teste (photographe) |
| Prés Salés (à pied) | Tourisme La Teste de Buch |
| Dune lever de soleil | Splendia |
| Vélo Ville d'Hiver | Auteur à identifier |

Les URLs souhaitées sont conservées en commentaire `// TODO permission` dans `src/data/visites.ts`.
