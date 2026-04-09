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
  title: 'Myriam Madec — Guide Conférencière Bassin d\'Arcachon',
  description:
    'Découvrez le Bassin d\'Arcachon autrement avec Myriam Madec, guide conférencière officielle. Visites guidées à pied, à vélo et en bateau.',
  keywords: ['guide conférencière', 'Arcachon', 'Bassin d\'Arcachon', 'visite guidée', 'tourisme'],
  openGraph: {
    title: 'Myriam Madec — Guide Conférencière Bassin d\'Arcachon',
    description: 'Visites guidées authentiques sur le Bassin d\'Arcachon — à pied, à vélo, en bateau.',
    locale: 'fr_FR',
    type: 'website',
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
          <Header />
          {children}
          <Footer />
        </body>
    </html>
  )
}
