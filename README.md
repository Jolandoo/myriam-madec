# tourismearcachon.fr — Myriam Madec

Site vitrine de **Myriam Madec**, Guide Interprète Nationale officielle du Bassin d'Arcachon depuis 1994. Visites guidées à pied, à vélo et en bateau.

🌐 **Production** : [myriam-madec.vercel.app](https://myriam-madec.vercel.app) → futur domaine : `tourismearcachon.fr`
🎛️ **Studio** : [myriam-madec.vercel.app/studio](https://myriam-madec.vercel.app/studio)

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
| [Sanity v3](https://www.sanity.io) | CMS headless (visites, actualités, tarifs) |
| [Resend](https://resend.com) | Envoi d'emails (formulaire contact) |
| Vercel | Hébergement & déploiement |

---

## Démarrage rapide

```bash
# Installer les dépendances
npm install --legacy-peer-deps

# Serveur de développement (http://localhost:3000)
npm run dev

# Build production
npm run build
```

### Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...          # Token avec droits write, pour le script de migration

# Contact
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=myramixa@aol.com
```

> Sans `NEXT_PUBLIC_SANITY_PROJECT_ID`, le site fonctionne en mode fallback (données statiques de `src/data/`). Le Studio ne sera pas accessible.

---

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx                  # Layout global, metadata SEO, JSON-LD
│   ├── page.tsx                    # Accueil
│   ├── (site)/                     # Groupe de routes avec Header + Footer
│   │   ├── layout.tsx
│   │   ├── mes-visites/
│   │   │   ├── page.tsx            # Catalogue avec filtres
│   │   │   └── [slug]/page.tsx     # Page individuelle de visite
│   │   ├── actualites/
│   │   │   ├── page.tsx            # Liste des articles
│   │   │   └── [slug]/page.tsx     # Article individuel avec galerie
│   │   ├── tarifs/page.tsx
│   │   ├── votre-guide/page.tsx
│   │   ├── contact/page.tsx
│   │   └── privatisation/page.tsx
│   ├── studio/[[...tool]]/         # Sanity Studio embarqué (sans Header/Footer)
│   │   ├── page.tsx
│   │   └── studio-client.tsx
│   ├── api/contact/route.ts        # API Resend
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Nav sticky, transparent sur hero
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── sections/                   # Sections de la page d'accueil
│   └── ui/
│       └── PhotoGallery.tsx        # Lightbox Framer Motion
├── data/                           # Données statiques (fallback si Sanity indisponible)
│   ├── visites.ts
│   └── articles.ts
├── sanity/
│   ├── client.ts                   # Client Sanity (null si projectId manquant)
│   ├── env.ts                      # Lecture des variables d'environnement
│   ├── lib/queries.ts              # GROQ queries + fallback statique
│   └── schemas/                    # Schémas de contenu
│       ├── visite.ts
│       ├── article.ts
│       └── tarifs.ts
sanity.config.ts                    # Config Studio (structure, plugins)
scripts/
└── migrate-to-sanity.mjs           # Migration one-shot données statiques → Sanity
public/
├── icon.png
└── videos/
    └── hero-web.mp4                # Vidéo hero (~7 Mo)
```

---

## CMS — Sanity Studio

Le contenu du site (visites, actualités, tarifs) est géré via Sanity Studio, accessible à `/studio`.

### Accès
Myriam doit être invitée sur [sanity.io/manage](https://sanity.io/manage) → projet → Members.

### Ce qui est éditable
- **Visites guidées** : tous les champs (titre, description, programme, images, etc.)
- **Actualités** : articles avec galerie photos
- **Tarifs** : grille de prix, conditions, politique d'annulation

### Fallback statique
Si Sanity est indisponible ou si `NEXT_PUBLIC_SANITY_PROJECT_ID` est vide, le site affiche les données de `src/data/visites.ts` et `src/data/articles.ts`. Le site ne tombe jamais.

### Migration initiale

Pour pousser les données statiques vers un nouveau projet Sanity :

```bash
# Nécessite SANITY_API_TOKEN dans .env.local (droits write)
node scripts/migrate-to-sanity.mjs
```

---

## Email de contact

Le formulaire `/contact` envoie via l'API Resend (`src/app/api/contact/route.ts`).

**Configuration actuelle (temporaire)** :
- `from` : `onboarding@resend.dev` (domaine de test Resend)
- `to` : défini par `CONTACT_EMAIL` (`.env.local` / Vercel)

**À mettre à jour quand le domaine OVH est accessible** :
```typescript
from: 'Myriam Madec <noreply@tourismearcachon.fr>',
```
> Nécessite d'ajouter les enregistrements DNS Resend (TXT + DKIM) sur OVH.

---

## SEO

- **Metadata** : titre/description par page via `generateMetadata`
- **JSON-LD** : schéma `LocalBusiness` dans `layout.tsx`
- **Sitemap** : généré automatiquement via `src/app/sitemap.ts`
- **robots.txt** : `src/app/robots.ts` — Studio exclu (`/studio`)
- **Canonical** : `https://www.tourismearcachon.fr`

---

## Déploiement

Déployé sur **Vercel** via GitHub. Chaque push sur `master` déclenche un déploiement automatique.

### Variables à configurer dans Vercel

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID du projet Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `RESEND_API_KEY` | Clé API Resend |
| `CONTACT_EMAIL` | Email de destination du formulaire contact |

### CORS Sanity

Sur [sanity.io/manage](https://sanity.io/manage) → API → CORS origins → ajouter `https://www.tourismearcachon.fr`.

```bash
# Vérifier le build avant de pousser
npm run build
```

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
