import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: {
    default:  'Myriam Madec — Guide Conférencière Bassin d\'Arcachon',
    template: '%s — Myriam Madec, Guide Conférencière',
  },
  description:
    'Découvrez le Bassin d\'Arcachon avec Myriam Madec, guide conférencière officielle depuis 1994. Visites guidées à pied, à vélo et en bateau — Arcachon, Dune du Pilat, Cap Ferret, Île aux Oiseaux.',
  keywords: [
    'guide conférencière Arcachon',
    'visite guidée Bassin d\'Arcachon',
    'guide touristique Arcachon',
    'visite guidée dune du Pilat',
    'guide officiel Arcachon',
    'balade guidée Arcachon',
    'visite Île aux Oiseaux',
    'guide vélo Arcachon',
    'excursion bateau Bassin d\'Arcachon',
    'tourisme Arcachon',
  ],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  authors: [{ name: 'Myriam Madec' }],
  creator: 'Myriam Madec',
  metadataBase: new URL('https://www.tourismearcachon.fr'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Myriam Madec — Guide Conférencière Bassin d\'Arcachon',
    description: 'Visites guidées authentiques sur le Bassin d\'Arcachon — à pied, à vélo, en bateau. Guide officielle depuis 1994.',
    url: 'https://www.tourismearcachon.fr',
    siteName: 'Myriam Madec — Guide Conférencière',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myriam Madec — Guide Conférencière Bassin d\'Arcachon',
    description: 'Visites guidées à pied, à vélo et en bateau sur le Bassin d\'Arcachon.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Myriam Madec — Guide Conférencière',
  description: 'Guide Conférencière Officielle du Bassin d\'Arcachon depuis 1994. Visites guidées à pied, à vélo et en bateau.',
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
    name: 'Bassin d\'Arcachon',
  },
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  openingHours: 'Mo-Su 06:00-20:00',
  hasMap: 'https://maps.google.com/?q=Arcachon,France',
  sameAs: [
    'https://tourismearcachon.fr',
  ],
  founder: {
    '@type': 'Person',
    name: 'Myriam Madec',
    jobTitle: 'Guide Interprète Nationale',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
