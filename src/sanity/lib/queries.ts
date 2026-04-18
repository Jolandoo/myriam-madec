import { client } from '../client'
import { visites as staticVisites, type Visite } from '@/data/visites'
import { articles as staticArticles, type Article } from '@/data/articles'

/* ── Types Sanity (même structure que les fichiers statiques) ──────────────── */

export type SanityVisite = Visite
export type SanityArticle = Article

export type SanityTarifs = {
  lignes:     { duree: string; prix: string }[]
  conditions: string[]
  annulation: { delai: string; montant: string }[]
  note?:      string
}

/* ── GROQ queries ──────────────────────────────────────────────────────────── */

const VISITE_FIELDS = `
  "slug":             slug.current,
  titre, sousTitre, categorie, duree,
  description, descriptionCourte,
  image, imageDetail, imageCredit,
  programme,
  reservation, reservationUrl,
  tags, niveauActivite, enfantsFriendly, ordre
`

const ARTICLE_FIELDS = `
  "slug": slug.current,
  titre, date, image, imageAlt,
  extrait, contenu,
  images[]{ src, alt }
`

/* ── Fetchers avec fallback statique ───────────────────────────────────────── */

export async function getVisites(): Promise<SanityVisite[]> {
  try {
    if (!client) return staticVisites
    const data = await client.fetch<SanityVisite[]>(
      `*[_type == "visite"] | order(coalesce(ordre, 99)) { ${VISITE_FIELDS} }`,
      {},
      { next: { revalidate: 60 } }
    )
    if (data && data.length > 0) return data
  } catch (e) {
    console.error('Sanity getVisites error:', e)
  }
  // Fallback fichier statique
  return staticVisites
}

export async function getVisite(slug: string): Promise<SanityVisite | null> {
  try {
    if (!client) return staticVisites.find(v => v.slug === slug) ?? null
    const data = await client.fetch<SanityVisite>(
      `*[_type == "visite" && slug.current == $slug][0] { ${VISITE_FIELDS} }`,
      { slug },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch (e) {
    console.error('Sanity getVisite error:', e)
  }
  // Fallback fichier statique
  return staticVisites.find(v => v.slug === slug) ?? null
}

export async function getArticles(): Promise<SanityArticle[]> {
  try {
    if (!client) return staticArticles
    const data = await client.fetch<SanityArticle[]>(
      `*[_type == "article"] | order(_createdAt desc) { ${ARTICLE_FIELDS} }`,
      {},
      { next: { revalidate: 60 } }
    )
    if (data && data.length > 0) return data
  } catch (e) {
    console.error('Sanity getArticles error:', e)
  }
  return staticArticles
}

export async function getArticle(slug: string): Promise<SanityArticle | null> {
  try {
    if (!client) return staticArticles.find(a => a.slug === slug) ?? null
    const data = await client.fetch<SanityArticle>(
      `*[_type == "article" && slug.current == $slug][0] { ${ARTICLE_FIELDS} }`,
      { slug },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch (e) {
    console.error('Sanity getArticle error:', e)
  }
  return staticArticles.find(a => a.slug === slug) ?? null
}

export async function getTarifs(): Promise<SanityTarifs | null> {
  try {
    if (!client) return null
    const data = await client.fetch<SanityTarifs>(
      `*[_type == "tarifs"][0] { lignes, conditions, annulation, note }`,
      {},
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch (e) {
    console.error('Sanity getTarifs error:', e)
  }
  return null // la page tarifs a ses propres fallbacks statiques
}
