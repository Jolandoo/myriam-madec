import Hero from '@/components/sections/Hero'
import VisitesGrid from '@/components/sections/VisitesGrid'
import AboutMyriam from '@/components/sections/AboutMyriam'
import CTAContact from '@/components/sections/CTAContact'

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="contenu">
        <VisitesGrid />
        <AboutMyriam />
        <CTAContact />
      </div>
    </main>
  )
}
