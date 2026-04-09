import type { ReactNode } from 'react'
import Image from 'next/image'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  image?: string          // URL ou chemin local — active le mode photo de fond
  imageAlt?: string
  children?: ReactNode
}

export default function PageHero({ eyebrow, title, description, image, imageAlt = '', children }: PageHeroProps) {

  /* ── Avec image de fond ──────────────────────────────────────────────── */
  if (image) {
    return (
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '58vh' }}>

        {/* Image de fond */}
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Overlay dégradé */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.30) 0%, rgba(0,0,0,.55) 100%)' }}
        />
        {/* Gradient top pour lisibilité du header */}
        <div
          className="absolute top-0 left-0 right-0 h-36"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.50) 0%, transparent 100%)' }}
        />

        {/* Contenu */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-10 md:px-16 flex flex-col items-center text-center gap-4 pt-32 pb-20">
          {eyebrow && (
            <span className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[3px] text-white/70">
              {eyebrow}
            </span>
          )}
          <h1
            className="font-[var(--font-serif)] text-white max-w-2xl"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,.3)' }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="font-[var(--font-sans)] text-white/80 max-w-xl text-base leading-relaxed"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,.3)' }}
            >
              {description}
            </p>
          )}
          {children}
        </div>

      </section>
    )
  }

  /* ── Sans image (fallback gradient) ─────────────────────────────────── */
  return (
    <div
      className="pt-32 pb-16"
      style={{ background: 'linear-gradient(to bottom, var(--primary-light), var(--off-white))' }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 flex flex-col items-center text-center gap-4">
        {eyebrow && (
          <span className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[3px] text-[var(--primary)]">
            {eyebrow}
          </span>
        )}
        <h1 className="font-[var(--font-serif)] text-[var(--text-primary)] max-w-2xl">
          {title}
        </h1>
        {description && (
          <p className="font-[var(--font-sans)] text-[var(--text-muted)] max-w-xl text-base leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
