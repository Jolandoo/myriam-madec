import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import PageHero from '@/components/layout/PageHero'
import { getArticles } from '@/sanity/lib/queries'

export const revalidate = 60

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'actualites' })
  return { title: t('metaTitle'), description: t('metaDescription') }
}

export default async function ActualitesPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('actualites')
  const articles = await getArticles(locale)

  return (
    <main className="bg-[var(--white)]">
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        image="https://upload.wikimedia.org/wikipedia/commons/c/c9/Sunrise_Cap_Ferret_Banc_du_Toulinguet_-_Arcachon_-_Oc%C3%A9an_Atlantique_-_Picture_Image_Photography_-_Sunset_-_Coucher_de_soleil_-_Dune_du_pilat_pyla_-_Banc_d%27arguin_water_eau_vagues_waves_beach_plage_sky_colors_red_yellow_%2814501089751%29.jpg"
        imageAlt={t('imageAlt')}
      />

      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article
              key={article.slug}
              className="group flex flex-col rounded-[var(--radius-card)] overflow-hidden border border-[var(--gray-100)] bg-[var(--white)] transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="relative overflow-hidden" style={{ paddingTop: '62%' }}>
                <Image src={article.image} alt={article.imageAlt} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" priority={i < 3} />
              </div>
              <div className="flex flex-col gap-3 p-5 flex-1">
                <time className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[2px] text-[var(--primary)]">{article.date}</time>
                <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg leading-snug">{article.titre}</h2>
                <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed flex-1">{article.extrait}</p>
                <Link href={{ pathname: '/actualites/[slug]', params: { slug: article.slug } }} className="font-[var(--font-sans)] text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors mt-1">
                  {t('readMore')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
