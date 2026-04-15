import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Actualités — Myriam Madec, Guide Conférencière Bassin d\'Arcachon',
  description:
    'Suivez les actualités de Myriam Madec — nouvelles visites, journées des guides, événements autour du Bassin d\'Arcachon.',
}

const ARTICLES = [
  {
    slug: 'journee-internationale-guides-2023',
    titre: 'Journée internationale des guides 2023',
    date: '27 janvier 2023',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2023/01/IMG-20230127-WA0002.jpg',
    extrait: 'À l\'occasion de la Journée Internationale des Guides, Myriam célèbre avec ses confrères guides du monde entier la passion du patrimoine et de la transmission.',
  },
  {
    slug: 'fat-bike-foret-littoral',
    titre: 'Entre forêt et littoral en FAT BIKE',
    date: '25 avril 2022',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2022/04/277766484_2223405004475339_634637019580051229_n.jpg',
    extrait: 'Une nouvelle façon de découvrir le littoral arcachonnais — à bord d\'un fat bike pour glisser entre pinède et Bassin.',
  },
  {
    slug: 'journee-internationale-guides-2022',
    titre: 'Journée Internationale des Guides 2022',
    date: '28 mars 2022',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2022/03/IMG-20220210-WA0005.jpg',
    extrait: 'Retour sur la Journée Internationale des Guides 2022 — un moment de partage et de fierté pour tous les guides conférenciers.',
  },
  {
    slug: 'visites-2021-histoire-bains-de-mer',
    titre: 'Visites 2021 : Histoire des bains de mer',
    date: '11 mai 2021',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/04/71559405_10217253503988131_4387037376052985856_o.jpg',
    extrait: 'Retour sur les origines balnéaires d\'Arcachon — comment la ville est devenue l\'une des premières stations de bains de mer de France.',
  },
  {
    slug: 'journee-internationale-guides-2021',
    titre: 'Journée Internationale des Guides',
    date: '24 février 2021',
    image: 'https://tourismearcachon.fr/wp-content/uploads/2021/02/tourist-_internationnale.jpg',
    extrait: 'Célébration de la Journée Internationale des Guides — un métier de passion au service de la transmission culturelle.',
  },
]

export default function ActualitesPage() {
  return (
    <main className="bg-[var(--white)]">
      <PageHero
        eyebrow="Actualités"
        title="Les dernières nouvelles"
        description="Nouveautés, événements, journées des guides — suivez la vie du Bassin d'Arcachon."
        image="https://upload.wikimedia.org/wikipedia/commons/c/c9/Sunrise_Cap_Ferret_Banc_du_Toulinguet_-_Arcachon_-_Oc%C3%A9an_Atlantique_-_Picture_Image_Photography_-_Sunset_-_Coucher_de_soleil_-_Dune_du_pilat_pyla_-_Banc_d%27arguin_water_eau_vagues_waves_beach_plage_sky_colors_red_yellow_%2814501089751%29.jpg"
        imageAlt="Lever de soleil au Cap Ferret, Bassin d'Arcachon"
      />

      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <article
              key={article.slug}
              className="group flex flex-col rounded-[var(--radius-card)] overflow-hidden border border-[var(--gray-100)] bg-[var(--white)] transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ paddingTop: '62%' }}>
                <Image
                  src={article.image}
                  alt={article.titre}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  priority={i < 3}
                />
              </div>

              {/* Contenu */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <time className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[2px] text-[var(--primary)]">
                  {article.date}
                </time>
                <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg leading-snug">
                  {article.titre}
                </h2>
                <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed flex-1">
                  {article.extrait}
                </p>
                <Link
                  href={`/actualites/${article.slug}`}
                  className="font-[var(--font-sans)] text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors mt-1"
                >
                  Lire la suite →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
