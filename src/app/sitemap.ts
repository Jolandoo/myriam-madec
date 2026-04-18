import type { MetadataRoute } from 'next'
import { getVisites, getArticles } from '@/sanity/lib/queries'

const BASE_URL = 'https://www.tourismearcachon.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [visites, articles] = await Promise.all([getVisites(), getArticles()])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: new Date(), priority: 1.0,  changeFrequency: 'monthly'  },
    { url: `${BASE_URL}/mes-visites`,       lastModified: new Date(), priority: 0.9,  changeFrequency: 'monthly'  },
    { url: `${BASE_URL}/privatisation`,     lastModified: new Date(), priority: 0.7,  changeFrequency: 'monthly'  },
    { url: `${BASE_URL}/tarifs`,            lastModified: new Date(), priority: 0.8,  changeFrequency: 'monthly'  },
    { url: `${BASE_URL}/votre-guide`,       lastModified: new Date(), priority: 0.7,  changeFrequency: 'yearly'   },
    { url: `${BASE_URL}/actualites`,        lastModified: new Date(), priority: 0.4,  changeFrequency: 'monthly'  },
    { url: `${BASE_URL}/contact`,           lastModified: new Date(), priority: 0.8,  changeFrequency: 'yearly'   },
  ]

  const visitePages: MetadataRoute.Sitemap = visites.map((v) => ({
    url:              `${BASE_URL}/mes-visites/${v.slug}`,
    lastModified:     new Date(),
    priority:         0.8,
    changeFrequency:  'monthly',
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url:              `${BASE_URL}/actualites/${a.slug}`,
    lastModified:     new Date(),
    priority:         0.5,
    changeFrequency:  'yearly',
  }))

  return [...staticPages, ...visitePages, ...articlePages]
}
