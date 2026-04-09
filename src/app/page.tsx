import Hero from '@/components/sections/Hero'
import VisitesGrid from '@/components/sections/VisitesGrid'
import AboutMyriam from '@/components/sections/AboutMyriam'

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="contenu">
        <VisitesGrid />
        <AboutMyriam />
        {/* TODO: CTAContact */}
      </div>
    </main>
  )
}
