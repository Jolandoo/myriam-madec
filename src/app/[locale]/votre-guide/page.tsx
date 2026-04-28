import type { Metadata } from 'next'
import Image from 'next/image'
import { GraduationCap, Globe, Award, Heart, Star, Leaf } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import PageHero from '@/components/layout/PageHero'
import { getPageGuide } from '@/sanity/lib/queries'

export const revalidate = 60

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'votreGuide' })
  return { title: t('metaTitle'), description: t('metaDescription') }
}

const DIPLOMES_DEFAULT = [
  { annee: '1994', label: 'Premiers pas de guide au Château de Lanquais' },
  { annee: '1995', label: 'Diplôme de Guide Accompagnatrice de Pays' },
  { annee: '1997', label: 'Diplôme de Guide Interprète Nationale' },
]

const SPECIALITES_DEFAULT = [
  { icone: 'heart',      label: 'Histoire locale',  desc: 'L\'occupation, les bains de mer, les origines d\'Arcachon — 30 ans de passion pour l\'histoire du Bassin.' },
  { icone: 'award',      label: 'Patrimoine',        desc: 'Architecture de la Ville d\'Hiver, ostréiculture, dune du Pilat — un territoire d\'une richesse exceptionnelle.' },
  { icone: 'globe',      label: 'Multilingue',       desc: 'Visites proposées en français, anglais et espagnol.' },
  { icone: 'graduation', label: 'Pédagogie',         desc: 'Programmes scolaires adaptés de la maternelle au lycée, en lien avec les programmes officiels.' },
]

const AFFILIATIONS_DEFAULT = [
  'Association des Guides de Nouvelle-Aquitaine (AGNA)',
  'FNGIC — Fédération Nationale des Guides Interprètes et Conférenciers',
  'B\'A — Marque Territoriale Bassin d\'Arcachon',
  'Ecotours Arcachon',
  'Les Balades Tchanquées',
]

const BIO_DEFAULT = [
  'Passionnée par le patrimoine et l\'histoire du Bassin d\'Arcachon, je vous accompagne depuis plus de 30 ans à la découverte d\'un territoire d\'une richesse exceptionnelle. Guide Interprète Nationale officielle, je propose des visites en français, anglais et espagnol, pour tous les publics — familles, groupes, scolaires, entreprises.',
  'Mon ambition : vous offrir bien plus qu\'une visite. Un moment de partage, de curiosité et d\'émerveillement. Qu\'il s\'agisse des ruelles de la Ville d\'Hiver, des prés salés ou du lever de soleil sur la Dune du Pilat, chaque sortie est une rencontre authentique avec le Bassin.',
]

const ICONS: Record<string, React.ElementType> = {
  heart: Heart, graduation: GraduationCap, globe: Globe, award: Award, star: Star, leaf: Leaf,
}

export default async function VotreGuidePage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('votreGuide')
  const cms = await getPageGuide(locale)

  const heroTitle       = cms?.heroTitle       ?? t('defaultHeroTitle')
  const heroDescription = cms?.heroDescription ?? t('defaultHeroDescription')
  const heroImage       = cms?.heroImage       ?? 'https://upload.wikimedia.org/wikipedia/commons/d/da/Arcachon-Jetee-Eyrac-byRundvald.jpg'
  const heroImageAlt    = cms?.heroImageAlt    ?? t('defaultHeroImageAlt')
  const photo           = cms?.photo           ?? 'https://tourismearcachon.fr/wp-content/uploads/2021/02/cropped-Journee-Internationale-des-Guides-scaled-1.jpg'
  const photoAlt        = cms?.photoAlt        ?? 'Myriam Madec'
  const citation        = cms?.citation        ?? 'Des visites inoubliables gravées dans vos mémoires.'
  const bio             = cms?.bio?.length     ? cms.bio        : BIO_DEFAULT
  const parcours        = cms?.parcours?.length ? cms.parcours  : DIPLOMES_DEFAULT
  const specialites     = cms?.specialites?.length ? cms.specialites : SPECIALITES_DEFAULT
  const affiliations    = cms?.affiliations?.length ? cms.affiliations : AFFILIATIONS_DEFAULT

  return (
    <main className="bg-[var(--white)]">
      <PageHero eyebrow={t('eyebrow')} title={heroTitle} description={heroDescription} image={heroImage} imageAlt={heroImageAlt} />

      <section className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden shadow-xl">
              <Image src={photo} alt={photoAlt} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            </div>
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
              <p className="font-[var(--font-serif)] text-[var(--primary)] text-lg italic">{t('since')}</p>
              <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-xs uppercase tracking-widest mt-0.5">{t('officialGuide')}</p>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <blockquote className="font-[var(--font-serif)] text-2xl italic text-[var(--text-primary)] leading-snug border-l-2 border-[var(--primary)] pl-6">
              &ldquo;{citation}&rdquo;
            </blockquote>
            <div className="flex flex-col gap-4 font-[var(--font-sans)] text-[var(--text-primary)] leading-relaxed">
              {bio.map((paragraphe, i) => <p key={i}>{paragraphe}</p>)}
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-xl">{t('parcours')}</h3>
              {parcours.map(({ annee, label }) => (
                <div key={annee} className="flex items-center gap-4">
                  <span className="font-[var(--font-sans)] text-[var(--primary)] font-semibold text-sm w-10 shrink-0">{annee}</span>
                  <span className="font-[var(--font-sans)] text-[var(--text-primary)] text-sm">{label}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className={['inline-flex items-center px-7 py-3.5 rounded-[var(--radius-btn)] w-fit', 'bg-[var(--primary)] text-white', 'font-[var(--font-sans)] font-semibold text-sm', 'hover:bg-[var(--primary-dark)] transition-colors duration-200'].join(' ')}>
              {t('bookVisit')}
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--off-white)] py-16">
        <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16">
          <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-center mb-10">{t('specialities')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialites.map(({ icone, label, desc }) => {
              const Icon = ICONS[icone] ?? Heart
              return (
                <div key={label} className="bg-[var(--white)] rounded-[var(--radius-card)] p-6 flex flex-col gap-4" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="w-11 h-11 rounded-full bg-[var(--primary-light)] flex items-center justify-center"><Icon size={20} className="text-[var(--primary)]" /></div>
                  <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg">{label}</h3>
                  <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed">{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-center mb-8">{t('affiliations')}</h2>
        <ul className="flex flex-wrap justify-center gap-4">
          {affiliations.map((p) => (
            <li key={p} className="px-5 py-2.5 rounded-full border border-[var(--gray-100)] bg-[var(--off-white)] font-[var(--font-sans)] text-sm text-[var(--text-muted)]">{p}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
