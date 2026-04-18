# tourismearcachon.fr

Site vitrine pour une guide conférencière officielle du Bassin d'Arcachon. Présentation des visites guidées à pied, à vélo et en bateau, avec un CMS headless permettant la gestion autonome du contenu.

🌐 [myriam-madec.vercel.app](https://myriam-madec.vercel.app)

---

## Stack

| Technologie | Usage |
|---|---|
| [Next.js 15](https://nextjs.org) App Router | Framework |
| TypeScript | Langage |
| Tailwind CSS + CSS variables | Styles |
| Framer Motion | Animations |
| [Sanity v3](https://www.sanity.io) | CMS headless |
| [Resend](https://resend.com) | Emails transactionnels |
| Vercel | Déploiement |

---

## Architecture

### Route groups Next.js

```
app/
├── layout.tsx              # Root layout (fonts, metadata, JSON-LD)
├── (site)/                 # Groupe avec Header + Footer
│   ├── layout.tsx
│   ├── mes-visites/[slug]
│   ├── actualites/[slug]
│   ├── tarifs/
│   ├── contact/
│   └── ...
└── studio/[[...tool]]/     # Sanity Studio (layout isolé, sans Header/Footer)
```

Le groupe `(site)/` injecte le Header et le Footer sur toutes les pages publiques sans affecter le Studio embarqué.

### Sanity + fallback statique

Les données (visites, articles, tarifs) sont servies par Sanity via des queries GROQ. Si Sanity est indisponible ou non configuré, le site bascule automatiquement sur des fichiers statiques TypeScript (`src/data/`). Le site ne tombe jamais.

```typescript
export async function getVisites(): Promise<Visite[]> {
  try {
    if (!client) return staticVisites
    const data = await client.fetch(QUERY, {}, { next: { revalidate: 60 } })
    if (data?.length > 0) return data
  } catch (e) { console.error(e) }
  return staticVisites
}
```

### ISR

Toutes les pages de contenu utilisent `revalidate: 60` — les modifications dans le CMS sont reflétées en production en moins d'une minute sans redéploiement.

---

## Démarrage

```bash
npm install --legacy-peer-deps
npm run dev
```

### Variables d'environnement

```env
# Sanity (optionnel — fallback statique si absent)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=            # Droits write, pour le script de migration uniquement

# Contact
RESEND_API_KEY=
CONTACT_EMAIL=
```

### Migration des données vers Sanity

```bash
# Importe les données statiques dans un projet Sanity existant
node scripts/migrate-to-sanity.mjs
```

---

## Structure des dossiers

```
src/
├── app/
│   ├── (site)/                     # Pages publiques
│   ├── studio/[[...tool]]/         # Studio embarqué (force-dynamic, ssr: false)
│   └── api/contact/route.ts        # Endpoint Resend
├── components/
│   ├── layout/                     # Header, Footer, MobileNav
│   ├── sections/                   # Blocs de page (Hero, VisitesGrid, …)
│   └── ui/                         # Composants atomiques
├── data/                           # Fallback statique (visites, articles)
└── sanity/
    ├── client.ts                   # Client null-safe
    ├── lib/queries.ts              # GROQ + fallback
    └── schemas/                    # visite, article, tarifs
sanity.config.ts
scripts/migrate-to-sanity.mjs
```

---

## SEO

- Metadata et `generateMetadata` par page
- Schéma JSON-LD `LocalBusiness` dans le root layout
- Sitemap automatique (`src/app/sitemap.ts`)
- `robots.ts` avec exclusion du Studio
- Canonical sur `tourismearcachon.fr`
