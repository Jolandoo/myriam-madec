import { setRequestLocale } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import VisitesGrid from '@/components/sections/VisitesGrid'
import AboutMyriam from '@/components/sections/AboutMyriam'
import CTAContact from '@/components/sections/CTAContact'
import { getVisites } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function Home(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params
  setRequestLocale(locale)

  const visites = await getVisites(locale)

  return (
    <main>
      <Hero />
      <div id="contenu">
        <VisitesGrid visites={visites} />
        <AboutMyriam />
        <CTAContact />
      </div>
    </main>
  )
}
