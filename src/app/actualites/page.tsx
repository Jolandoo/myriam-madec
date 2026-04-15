import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import { articles } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Actualités — Myriam Madec, Guide Conférencière Bassin d\'Arcachon',
  description:
    'Suivez les actualités de Myriam Madec — nouvelles visites, journées des guides, événements autour du Bassin d\'Arcachon.',
}

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
          {articles.map((article, i) => (
            <article
              key={article.slug}
              className="group flex flex-col rounded-[var(--radius-card)] overflow-hidden border border-[var(--gray-100)] bg-[var(--white)] transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ paddingTop: '62%' }}>
                <Image
                  src={article.image}
                  alt={article.imageAlt}
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
