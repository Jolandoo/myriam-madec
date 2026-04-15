import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { articles } from '@/data/articles'
import PhotoGallery from '@/components/ui/PhotoGallery'

/* ── Static params ────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

/* ── Metadata ─────────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.titre} — Myriam Madec, Guide Conférencière`,
    description: article.extrait,
  }
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const related = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  // Convertit le contenu texte en paragraphes (double saut de ligne = nouveau §)
  const paragraphs = article.contenu
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <main className="bg-[var(--white)]">

      {/* ── Hero article ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '52vh' }}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.25) 0%, rgba(0,0,0,.62) 100%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-36"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.50) 0%, transparent 100%)' }}
        />

        <div
          className="relative z-10 w-full max-w-[1280px] mx-auto px-10 md:px-16 flex flex-col justify-end pb-14 pt-36"
          style={{ minHeight: '52vh' }}
        >
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-[var(--font-sans)] mb-6 transition-colors w-fit"
          >
            <ArrowLeft size={14} />
            Toutes les actualités
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Calendar size={13} className="text-white/60" />
            <time className="font-[var(--font-sans)] text-sm text-white/70">
              {article.date}
            </time>
          </div>

          <h1
            className="font-[var(--font-serif)] text-white max-w-3xl"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,.3)' }}
          >
            {article.titre}
          </h1>
        </div>
      </section>

      {/* ── Contenu ───────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* Texte principal */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Extrait mis en avant */}
            <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-xl italic leading-relaxed border-l-2 border-[var(--primary)] pl-5">
              {article.extrait}
            </p>

            {/* Corps de l'article */}
            <div className="flex flex-col gap-4">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={[
                    'font-[var(--font-sans)] leading-relaxed',
                    p.startsWith('**') && p.endsWith('**')
                      ? 'font-semibold text-[var(--text-primary)] text-base'
                      : 'text-[var(--text-muted)] text-base',
                  ].join(' ')}
                >
                  {p.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>

            {/* Galerie photos si disponible */}
            {article.images && article.images.length > 0 && (
              <div className="mt-4 flex flex-col gap-4">
                <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl">
                  Photos
                </h2>
                <PhotoGallery photos={article.images} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">

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

            {/* CTA réservation */}
            <div
              className="rounded-[var(--radius-card)] p-5 border border-[var(--gray-100)] flex flex-col gap-3"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg">
                Réserver une visite
              </p>
              <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed">
                Découvrez toutes les visites guidées du Bassin d'Arcachon.
              </p>
              <Link
                href="/mes-visites"
                className={[
                  'flex items-center justify-center px-5 py-3 rounded-[var(--radius-btn)]',
                  'bg-[var(--primary)] text-white',
                  'font-[var(--font-sans)] font-semibold text-sm',
                  'hover:bg-[var(--primary-dark)] transition-colors duration-200',
                ].join(' ')}
              >
                Voir les visites
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Autres articles ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16 flex flex-col gap-8">
            <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl">
              Autres actualités
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/actualites/${a.slug}`}
                  className="group flex flex-col rounded-[var(--radius-card)] overflow-hidden border border-[var(--gray-100)] hover:-translate-y-1 transition-all duration-300"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="relative overflow-hidden" style={{ paddingTop: '62%' }}>
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-1.5">
                    <time className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[2px] text-[var(--primary)]">
                      {a.date}
                    </time>
                    <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-base leading-snug">
                      {a.titre}
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
