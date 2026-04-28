import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import VisitesGrid from '@/components/sections/VisitesGrid'
import PageHero from '@/components/layout/PageHero'
import { getVisites } from '@/sanity/lib/queries'

export const revalidate = 60

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'mesVisites' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function MesVisitesPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('mesVisites')
  const visites = await getVisites(locale)

  return (
    <main>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
        image="https://upload.wikimedia.org/wikipedia/commons/7/7a/Coucher_de_soleil_sur_le_bassin_%2810731201504%29.jpg"
        imageAlt={t('imageAlt')}
      />
      <VisitesGrid visites={visites} />
    </main>
  )
}
