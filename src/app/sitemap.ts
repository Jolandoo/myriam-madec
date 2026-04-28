import type { MetadataRoute } from 'next'
import { getVisites, getArticles } from '@/sanity/lib/queries'

const BASE_URL = 'https://www.tourismearcachon.fr'

const PATHNAME_MAP: Record<string, { fr: string; en: string; es: string }> = {
  '/':              { fr: '/',              en: '/en/',              es: '/es/' },
  '/mes-visites':   { fr: '/mes-visites',   en: '/en/guided-tours',  es: '/es/visitas-guiadas' },
  '/privatisation': { fr: '/privatisation', en: '/en/private-tours', es: '/es/visitas-privadas' },
  '/tarifs':        { fr: '/tarifs',        en: '/en/prices',        es: '/es/precios' },
  '/votre-guide':   { fr: '/votre-guide',   en: '/en/your-guide',    es: '/es/su-guia' },
  '/actualites':    { fr: '/actualites',    en: '/en/news',          es: '/es/noticias' },
  '/contact':       { fr: '/contact',       en: '/en/contact',       es: '/es/contact' },
}

function alternates(frPath: string, enPath: string, esPath: string) {
  return {
    languages: {
      fr: `${BASE_URL}${frPath}`,
      en: `${BASE_URL}${enPath}`,
      es: `${BASE_URL}${esPath}`,
      'x-default': `${BASE_URL}${frPath}`,
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [visites, articles] = await Promise.all([getVisites(), getArticles()])

  const staticPages: MetadataRoute.Sitemap = Object.entries(PATHNAME_MAP).map(
    ([, paths]) => ({
      url: `${BASE_URL}${paths.fr}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: paths.fr === '/' ? 1.0 : 0.8,
      alternates: alternates(paths.fr, paths.en, paths.es),
    })
  )

  const visitePages: MetadataRoute.Sitemap = visites.map((v) => ({
    url: `${BASE_URL}/mes-visites/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: alternates(
      `/mes-visites/${v.slug}`,
      `/en/guided-tours/${v.slug}`,
      `/es/visitas-guiadas/${v.slug}`
    ),
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/actualites/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
    alternates: alternates(
      `/actualites/${a.slug}`,
      `/en/news/${a.slug}`,
      `/es/noticias/${a.slug}`
    ),
  }))

  return [...staticPages, ...visitePages, ...articlePages]
}
