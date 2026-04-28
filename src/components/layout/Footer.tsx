import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  const NAV_VISITES_STATIC = [
    { label: t('allVisites'), href: '/mes-visites' as const },
  ]
  const NAV_VISITES_SLUGS = [
    { label: t('villeHiver'),    slug: 'ville-hiver' },
    { label: t('dunePilat'),     slug: 'dune-lever-soleil' },
    { label: t('baladesBateau'), slug: 'balades-bateau' },
  ]
  const NAV_VISITES_BOTTOM = [
    { label: tNav('privatisation'), href: '/privatisation' as const },
    { label: tNav('tarifs'),        href: '/tarifs' as const },
  ]

  const NAV_INFO = [
    { label: tNav('votreGuide'), href: '/votre-guide' as const },
    { label: tNav('actualites'), href: '/actualites' as const },
    { label: 'Contact',         href: '/contact' as const },
  ]

  return (
    <footer className="bg-[#0F1923] text-white/60">

      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Colonne 1 — Identité */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group w-fit" aria-label={t('accueil')}>
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/20 shrink-0">
                <Image
                  src="https://tourismearcachon.fr/wp-content/uploads/2021/02/cropped-Journee-Internationale-des-Guides-scaled-1.jpg"
                  alt="Myriam Madec"
                  fill
                  sizes="44px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-[var(--font-serif)] text-white text-lg italic leading-tight">
                  Myriam Madec
                </p>
                <p className="font-[var(--font-sans)] text-[9px] uppercase tracking-[2px] text-white/40 font-medium">
                  {tNav('guideConferenciere')}
                </p>
              </div>
            </Link>

            <p className="font-[var(--font-sans)] text-sm leading-relaxed text-white/50">
              {t('description')}
            </p>

            <div className="flex flex-col gap-2.5 mt-1">
              <a href="tel:+33680439678" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                <Phone size={13} className="text-white/30 shrink-0" />
                +33 6 80 43 96 78
              </a>
              <a href="mailto:contact@tourismearcachon.fr" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                <Mail size={13} className="text-white/30 shrink-0" />
                contact@tourismearcachon.fr
              </a>
              <span className="flex items-center gap-2.5 text-sm">
                <MapPin size={13} className="text-white/30 shrink-0" />
                {t('location')}
              </span>
            </div>
          </div>

          {/* Colonne 2 — Visites */}
          <div className="flex flex-col gap-5">
            <h3 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[2px] text-white/40">
              {t('visites')}
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_VISITES_STATIC.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-[var(--font-sans)] text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {NAV_VISITES_SLUGS.map((link) => (
                <li key={link.slug}>
                  <Link href={{ pathname: '/mes-visites/[slug]', params: { slug: link.slug } }} className="font-[var(--font-sans)] text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {NAV_VISITES_BOTTOM.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-[var(--font-sans)] text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Informations */}
          <div className="flex flex-col gap-5">
            <h3 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[2px] text-white/40">
              {t('informations')}
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_INFO.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[var(--font-sans)] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Réservation CTA */}
          <div className="flex flex-col gap-5">
            <h3 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[2px] text-white/40">
              {t('bookVisit')}
            </h3>
            <p className="font-[var(--font-sans)] text-sm leading-relaxed text-white/50">
              {t('bookVisitDesc')}
            </p>
            <Link
              href="/contact"
              className={[
                'inline-flex items-center justify-center px-5 py-3 mt-1',
                'rounded-[var(--radius-btn)]',
                'bg-[var(--primary)] text-white',
                'font-[var(--font-sans)] text-sm font-semibold',
                'hover:bg-[var(--primary-dark)] transition-colors duration-200',
                'w-fit',
              ].join(' ')}
            >
              {t('contact')}
            </Link>
          </div>

        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-[var(--font-sans)] text-xs text-white/30">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-[var(--font-sans)] text-[10px] uppercase tracking-[1.5px] text-white/20">
              {t('fngic')}
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="font-[var(--font-sans)] text-[10px] uppercase tracking-[1.5px] text-white/20">
              {t('guidesNA')}
            </span>
          </div>
        </div>
      </div>

    </footer>
  )
}
