import { client } from '../client'
import { resolveVisites, type Visite } from '@/data/visites'
import { resolveArticles, type Article } from '@/data/articles'

type FallbackLocale = 'fr' | 'en' | 'es'
const isLocale = (l: string): l is FallbackLocale => l === 'fr' || l === 'en' || l === 'es'
const fb = (l: string): FallbackLocale => (isLocale(l) ? l : 'fr')

/* ── Types Sanity (même structure que les fichiers statiques) ──────────────── */

export type SanityVisite = Visite
export type SanityArticle = Article

export type SanityTarifs = {
  lignes:     { duree: string; prix: string }[]
  conditions: string[]
  annulation: { delai: string; montant: string }[]
  note?:      string
}

/* ── GROQ queries (locale-aware avec fallback FR) ─────────────────────────── */

// coalesce handles both migrated (object with .fr/.en) and legacy (flat string) data
const VISITE_FIELDS = `
  "slug":             slug.current,
  "titre":            coalesce(titre[$locale], titre.fr, titre),
  "sousTitre":        coalesce(sousTitre[$locale], sousTitre.fr, sousTitre),
  categorie, duree,
  "description":      coalesce(description[$locale], description.fr, description),
  "descriptionCourte":coalesce(descriptionCourte[$locale], descriptionCourte.fr, descriptionCourte),
  image, imageDetail, imageCredit,
  "programme":        coalesce(programme[$locale], programme.fr, programme),
  reservation, reservationUrl,
  tags, niveauActivite, enfantsFriendly, ordre
`

const ARTICLE_FIELDS = `
  "slug": slug.current,
  "titre":    coalesce(titre[$locale], titre.fr, titre),
  date, image,
  "imageAlt": coalesce(imageAlt[$locale], imageAlt.fr, imageAlt),
  "extrait":  coalesce(extrait[$locale], extrait.fr, extrait),
  "contenu":  coalesce(contenu[$locale], contenu.fr, contenu),
  images[]{ src, alt }
`

/* ── Fetchers avec fallback statique ───────────────────────────────────────── */

export async function getVisites(locale: string = 'fr'): Promise<SanityVisite[]> {
  try {
    if (!client) return resolveVisites(fb(locale))
    const data = await client.fetch<SanityVisite[]>(
      `*[_type == "visite"] | order(coalesce(ordre, 99)) { ${VISITE_FIELDS} }`,
      { locale },
      { next: { revalidate: 60 } }
    )
    if (data && data.length > 0) return data
  } catch (e) {
    console.error('Sanity getVisites error:', e)
  }
  return resolveVisites(fb(locale))
}

export async function getVisite(slug: string, locale: string = 'fr'): Promise<SanityVisite | null> {
  const fallback = () => resolveVisites(fb(locale)).find(v => v.slug === slug) ?? null
  try {
    if (!client) return fallback()
    const data = await client.fetch<SanityVisite>(
      `*[_type == "visite" && slug.current == $slug][0] { ${VISITE_FIELDS} }`,
      { slug, locale },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch (e) {
    console.error('Sanity getVisite error:', e)
  }
  return fallback()
}

export async function getArticles(locale: string = 'fr'): Promise<SanityArticle[]> {
  try {
    if (!client) return resolveArticles(fb(locale))
    const data = await client.fetch<SanityArticle[]>(
      `*[_type == "article"] | order(_createdAt desc) { ${ARTICLE_FIELDS} }`,
      { locale },
      { next: { revalidate: 60 } }
    )
    if (data && data.length > 0) return data
  } catch (e) {
    console.error('Sanity getArticles error:', e)
  }
  return resolveArticles(fb(locale))
}

export async function getArticle(slug: string, locale: string = 'fr'): Promise<SanityArticle | null> {
  const fallback = () => resolveArticles(fb(locale)).find(a => a.slug === slug) ?? null
  try {
    if (!client) return fallback()
    const data = await client.fetch<SanityArticle>(
      `*[_type == "article" && slug.current == $slug][0] { ${ARTICLE_FIELDS} }`,
      { slug, locale },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch (e) {
    console.error('Sanity getArticle error:', e)
  }
  return fallback()
}

/* ── Types pages singletons ────────────────────────────────────────────────── */

export type SanityPageGuide = {
  heroTitle?:       string
  heroDescription?: string
  heroImage?:       string
  heroImageAlt?:    string
  photo?:           string
  photoAlt?:        string
  citation?:        string
  bio?:             string[]
  parcours?:        { annee: string; label: string }[]
  specialites?:     { icone: string; label: string; desc: string }[]
  affiliations?:    string[]
}

export type SanityPagePrivatisation = {
  heroTitle?:           string
  heroDescription?:     string
  heroImage?:           string
  heroImageAlt?:        string
  modes?:               { icone: string; label: string; desc: string }[]
  galerie?:             { src: string; alt: string }[]
  texte?:               string[]
  coupDeCoeurTitre?:    string
  coupDeCoeurTexte?:    string
  coupDeCoeurImage?:    string
  coupDeCoeurImageAlt?: string
  coupDeCoeurCta?:      string
}

export async function getPageGuide(locale: string = 'fr'): Promise<SanityPageGuide | null> {
  try {
    if (!client) return null
    const data = await client.fetch<SanityPageGuide>(
      `*[_type == "pageGuide"][0] {
        "heroTitle":       coalesce(heroTitle[$locale], heroTitle.fr, heroTitle),
        "heroDescription": coalesce(heroDescription[$locale], heroDescription.fr, heroDescription),
        heroImage, heroImageAlt,
        photo, photoAlt,
        "citation":        coalesce(citation[$locale], citation.fr, citation),
        "bio":             bio[]{ "text": coalesce(@[$locale], @.fr, @) }.text,
        parcours[]{ annee, "label": coalesce(label[$locale], label.fr, label) },
        specialites[]{ icone, "label": coalesce(label[$locale], label.fr, label), "desc": coalesce(desc[$locale], desc.fr, desc) },
        "affiliations":    affiliations[]{ "text": coalesce(@[$locale], @.fr, @) }.text
      }`,
      { locale },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch (e) {
    console.error('Sanity getPageGuide error:', e)
  }
  return null
}

export async function getPagePrivatisation(locale: string = 'fr'): Promise<SanityPagePrivatisation | null> {
  try {
    if (!client) return null
    const data = await client.fetch<SanityPagePrivatisation>(
      `*[_type == "pagePrivatisation"][0] {
        "heroTitle":       coalesce(heroTitle[$locale], heroTitle.fr, heroTitle),
        "heroDescription": coalesce(heroDescription[$locale], heroDescription.fr, heroDescription),
        heroImage, heroImageAlt,
        modes[]{ icone, "label": coalesce(label[$locale], label.fr, label), "desc": coalesce(desc[$locale], desc.fr, desc) },
        galerie[]{ src, alt },
        "texte":               texte[]{ "text": coalesce(@[$locale], @.fr, @) }.text,
        "coupDeCoeurTitre":    coalesce(coupDeCoeurTitre[$locale], coupDeCoeurTitre.fr, coupDeCoeurTitre),
        "coupDeCoeurTexte":    coalesce(coupDeCoeurTexte[$locale], coupDeCoeurTexte.fr, coupDeCoeurTexte),
        coupDeCoeurImage, coupDeCoeurImageAlt,
        "coupDeCoeurCta":      coalesce(coupDeCoeurCta[$locale], coupDeCoeurCta.fr, coupDeCoeurCta)
      }`,
      { locale },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch (e) {
    console.error('Sanity getPagePrivatisation error:', e)
  }
  return null
}

export async function getTarifs(locale: string = 'fr'): Promise<SanityTarifs | null> {
  try {
    if (!client) return null
    const data = await client.fetch<SanityTarifs>(
      `*[_type == "tarifs"][0] {
        lignes[]{ "duree": coalesce(duree[$locale], duree.fr, duree), prix },
        "conditions": conditions[]{ "text": coalesce(@[$locale], @.fr, @) }.text,
        annulation[]{ "delai": coalesce(delai[$locale], delai.fr, delai), "montant": coalesce(montant[$locale], montant.fr, montant) },
        "note": coalesce(note[$locale], note.fr, note)
      }`,
      { locale },
      { next: { revalidate: 60 } }
    )
    if (data) return data
  } catch (e) {
    console.error('Sanity getTarifs error:', e)
  }
  return null
}
