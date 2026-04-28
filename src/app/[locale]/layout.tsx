import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: {
      default: t('title.default'),
      template: t('title.template'),
    },
    description: t('description'),
    keywords: t('keywords').split(', '),
    icons: {
      icon: '/icon.png',
      shortcut: '/icon.png',
      apple: '/icon.png',
    },
    authors: [{ name: 'Myriam Madec' }],
    creator: 'Myriam Madec',
    metadataBase: new URL('https://www.tourismearcachon.fr'),
    alternates: {
      canonical: '/',
      languages: {
        fr: '/',
        en: '/en',
        es: '/es',
        'x-default': '/',
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: 'https://www.tourismearcachon.fr',
      siteName: t('ogSiteName'),
      locale: locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

function buildJsonLd(t: (key: string) => string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: t('name'),
    description: t('description'),
    url: 'https://www.tourismearcachon.fr',
    telephone: '+33680439678',
    email: 'contact@tourismearcachon.fr',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Arcachon',
      addressRegion: 'Gironde',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.6611,
      longitude: -1.1681,
    },
    areaServed: {
      '@type': 'Place',
      name: t('areaServedName'),
    },
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    openingHours: 'Mo-Su 06:00-20:00',
    hasMap: 'https://maps.google.com/?q=Arcachon,France',
    sameAs: ['https://tourismearcachon.fr'],
    founder: {
      '@type': 'Person',
      name: 'Myriam Madec',
      jobTitle: t('jobTitle'),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'fr' | 'en' | 'es')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const tJsonLd = await getTranslations({ locale, namespace: 'jsonLd' })
  const jsonLd = buildJsonLd(tJsonLd)

  return (
    <NextIntlClientProvider messages={messages}>
      <div data-locale={locale}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
