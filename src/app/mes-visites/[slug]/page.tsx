import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, MapPin, Users, Star, ArrowLeft, ExternalLink } from 'lucide-react'
import { visites, categorieLabels, niveauLabels, type Visite } from '@/data/visites'

/* ── Static params ────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return visites.map((v) => ({ slug: v.slug }))
}

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const visite = visites.find((v) => v.slug === slug)
  if (!visite) return {}
  return {
    title: `${visite.titre} — Myriam Madec, Guide Conférencière`,
    description: visite.descriptionCourte,
  }
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */
const categorieIcon: Record<Visite['categorie'], string> = {
  pied: '🚶',
  velo: '🚴',
  'velo-electrique': '⚡',
  bateau: '⛵',
}

const niveauColor: Record<Visite['niveauActivite'], string> = {
  facile:  'bg-emerald-50 text-emerald-700',
  modere:  'bg-amber-50 text-amber-700',
  sportif: 'bg-red-50 text-red-700',
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default async function VisitePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const visite = visites.find((v) => v.slug === slug)
  if (!visite) notFound()

  const related = visites
    .filter((v) => v.slug !== visite.slug && v.categorie === visite.categorie)
    .slice(0, 3)

  return (
    <main className="bg-[var(--white)]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '55vh' }}>
        <Image
          src={visite.imageDetail ?? visite.image}
          alt={visite.titre}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.30) 0%, rgba(0,0,0,.60) 100%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-36"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.50) 0%, transparent 100%)' }}
        />
        {/* Crédit photo */}
        {visite.imageCredit && (
          <p className="absolute bottom-3 right-4 z-10 text-white/50 text-[10px] font-[var(--font-sans)]">
            {visite.imageCredit}
          </p>
        )}

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-10 md:px-16 flex flex-col justify-end pb-12 pt-32" style={{ minHeight: '55vh' }}>
          {/* Breadcrumb */}
          <Link
            href="/mes-visites"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-[var(--font-sans)] mb-6 transition-colors w-fit"
          >
            <ArrowLeft size={14} />
            Toutes les visites
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-semibold font-[var(--font-sans)] uppercase tracking-wide">
              {categorieIcon[visite.categorie]} {categorieLabels[visite.categorie]}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-[var(--font-sans)] ${niveauColor[visite.niveauActivite]}`}>
              {niveauLabels[visite.niveauActivite]}
            </span>
            {visite.enfantsFriendly && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold font-[var(--font-sans)]">
                👨‍👩‍👧 Famille
              </span>
            )}
          </div>

          <h1
            className="font-[var(--font-serif)] text-white max-w-2xl mb-2"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,.3)' }}
          >
            {visite.titre}
          </h1>
          <p className="font-[var(--font-sans)] text-white/80 text-lg italic">
            {visite.sousTitre}
          </p>
        </div>
      </section>

      {/* ── Contenu + Sidebar ─────────────────────────────────────────────── */}
      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Contenu principal ──────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Infos rapides */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <Clock size={16} className="text-[var(--primary)]" />
                <span className="font-[var(--font-sans)] font-semibold text-sm">{visite.duree}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <MapPin size={16} className="text-[var(--primary)]" />
                <span className="font-[var(--font-sans)] text-sm">Bassin d'Arcachon</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <Users size={16} className="text-[var(--primary)]" />
                <span className="font-[var(--font-sans)] text-sm">Petit groupe</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <Star size={16} className="text-[var(--primary)]" />
                <span className="font-[var(--font-sans)] text-sm">{niveauLabels[visite.niveauActivite]}</span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl">La visite</h2>
              <p className="font-[var(--font-sans)] text-[var(--text-primary)] leading-relaxed text-base">
                {visite.description}
              </p>
            </div>

            {/* Au programme — lorem ipsum si pas encore de contenu */}
            <div className="flex flex-col gap-4">
              <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl">Au programme</h2>
              <div className="bg-[var(--off-white)] rounded-[var(--radius-card)] p-6 border border-[var(--gray-100)]">
                <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm italic leading-relaxed">
                  {/* TODO — Myriam : ajouter le détail du programme étape par étape */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            {/* Infos pratiques */}
            <div className="flex flex-col gap-4">
              <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl">Infos pratiques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Durée', value: visite.duree },
                  { label: 'Mode', value: categorieLabels[visite.categorie] },
                  { label: 'Niveau', value: niveauLabels[visite.niveauActivite] },
                  { label: 'Enfants', value: visite.enfantsFriendly ? 'Adapté aux familles' : 'Adultes et ados' },
                  { label: 'Réservation', value: visite.reservation === 'office-tourisme' ? 'Office de tourisme' : 'Contact direct' },
                  { label: 'Langues', value: 'Français · Anglais · Espagnol' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 p-4 rounded-xl bg-[var(--off-white)] border border-[var(--gray-100)]">
                    <span className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[2px] text-[var(--text-muted)]">{label}</span>
                    <span className="font-[var(--font-sans)] text-sm font-medium text-[var(--text-primary)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {visite.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-medium font-[var(--font-sans)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Sidebar réservation ────────────────────────────────────────── */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <div
              className="rounded-[var(--radius-card)] overflow-hidden border border-[var(--gray-100)]"
              style={{ boxShadow: 'var(--shadow-card-hover)' }}
            >
              {/* Header carte */}
              <div className="bg-[var(--primary)] px-6 py-5">
                <p className="font-[var(--font-sans)] text-white/70 text-xs uppercase tracking-[2px] mb-1">Durée</p>
                <p className="font-[var(--font-serif)] text-white text-2xl">{visite.duree}</p>
              </div>

              {/* Corps */}
              <div className="p-6 flex flex-col gap-4 bg-[var(--white)]">
                <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed">
                  {visite.descriptionCourte}
                </p>

                {visite.reservation === 'office-tourisme' && visite.reservationUrl ? (
                  <a
                    href={visite.reservationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'flex items-center justify-center gap-2 px-5 py-3.5 rounded-[var(--radius-btn)]',
                      'bg-[var(--primary)] text-white',
                      'font-[var(--font-sans)] font-semibold text-sm',
                      'hover:bg-[var(--primary-dark)] transition-colors duration-200',
                    ].join(' ')}
                  >
                    Réserver en ligne
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className={[
                      'flex items-center justify-center gap-2 px-5 py-3.5 rounded-[var(--radius-btn)]',
                      'bg-[var(--primary)] text-white',
                      'font-[var(--font-sans)] font-semibold text-sm',
                      'hover:bg-[var(--primary-dark)] transition-colors duration-200',
                    ].join(' ')}
                  >
                    Contact &amp; Réservation
                  </Link>
                )}
              </div>
            </div>

            {/* Guide card */}
            <div className="rounded-[var(--radius-card)] p-5 bg-[var(--primary-light)] border border-[var(--gray-100)] flex flex-col gap-3">
              <p className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[2px] text-[var(--primary)]">Votre guide</p>
              <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg">Myriam Madec</p>
              <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed">
                Guide Interprète Nationale officielle du Bassin d'Arcachon depuis 1994.
              </p>
              <Link
                href="/votre-guide"
                className="font-[var(--font-sans)] text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors"
              >
                En savoir plus →
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Visites similaires ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16 flex flex-col gap-8">
            <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl">
              Visites similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((v) => (
                <Link
                  key={v.slug}
                  href={`/mes-visites/${v.slug}`}
                  className="group flex flex-col rounded-[var(--radius-card)] overflow-hidden border border-[var(--gray-100)] hover:-translate-y-1 transition-all duration-300"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="relative overflow-hidden" style={{ paddingTop: '62%' }}>
                    <Image
                      src={v.image}
                      alt={v.titre}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-1.5">
                    <p className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[2px] text-[var(--primary)]">
                      {categorieLabels[v.categorie]} · {v.duree}
                    </p>
                    <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-base leading-snug">
                      {v.titre}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
