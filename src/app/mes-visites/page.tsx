import type { Metadata } from 'next'
import VisitesGrid from '@/components/sections/VisitesGrid'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Mes visites — Myriam Madec, Guide Conférencière Bassin d\'Arcachon',
  description:
    '13 visites guidées sur le Bassin d\'Arcachon : à pied, à vélo électrique, à vélo ou en bateau. Histoire, patrimoine, nature et gastronomie locale.',
}

export default function MesVisitesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Guide Conférencière Officielle"
        title="Mes visites guidées"
        description="À pied dans les ruelles de la Ville d'Hiver, à vélo le long du littoral, ou en bateau vers l'Île aux Oiseaux — chaque visite est une rencontre avec le Bassin."
        image="https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/tchanquees-nonos-qewz0yeny29vbztgj0dn9irjp5pmy46e3rxke0rwkg.jpg"
        imageAlt="Cabanes tchanquées du Bassin d'Arcachon"
      />
      <VisitesGrid />
    </main>
  )
}
