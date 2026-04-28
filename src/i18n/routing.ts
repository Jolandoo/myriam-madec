import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/mes-visites': {
      fr: '/mes-visites',
      en: '/guided-tours',
      es: '/visitas-guiadas',
    },
    '/mes-visites/[slug]': {
      fr: '/mes-visites/[slug]',
      en: '/guided-tours/[slug]',
      es: '/visitas-guiadas/[slug]',
    },
    '/privatisation': {
      fr: '/privatisation',
      en: '/private-tours',
      es: '/visitas-privadas',
    },
    '/tarifs': {
      fr: '/tarifs',
      en: '/prices',
      es: '/precios',
    },
    '/actualites': {
      fr: '/actualites',
      en: '/news',
      es: '/noticias',
    },
    '/actualites/[slug]': {
      fr: '/actualites/[slug]',
      en: '/news/[slug]',
      es: '/noticias/[slug]',
    },
    '/votre-guide': {
      fr: '/votre-guide',
      en: '/your-guide',
      es: '/su-guia',
    },
    '/contact': '/contact',
  },
})

export type Locale = (typeof routing.locales)[number]
export type Pathnames = keyof typeof routing.pathnames
