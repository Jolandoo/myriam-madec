'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import MobileNav from './MobileNav'
import LanguageSwitcher from '../ui/LanguageSwitcher'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('nav')

  const NAV_LINKS = [
    { label: t('mesVisites'),   href: '/mes-visites' as const },
    { label: t('privatisation'), href: '/privatisation' as const },
    { label: t('tarifs'),        href: '/tarifs' as const },
    { label: t('actualites'),    href: '/actualites' as const },
    { label: t('votreGuide'),    href: '/votre-guide' as const },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-30',
          'transition-all duration-300 ease-in-out',
          scrolled
            ? 'bg-white/70 backdrop-blur-xl saturate-[1.8] shadow-[0_1px_0_var(--gray-100)]'
            : 'bg-black/30 backdrop-blur-sm',
        ].join(' ')}
      >
        <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 flex items-center justify-between py-5">

          <Link
            href="/"
            aria-label={t('backToHome')}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white/30">
              <Image
                src="https://tourismearcachon.fr/wp-content/uploads/2021/02/cropped-Journee-Internationale-des-Guides-scaled-1.jpg"
                alt="Myriam Madec"
                fill
                sizes="48px"
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={[
                'font-[var(--font-serif)] text-[20px] italic font-normal',
                'transition-colors duration-300',
                scrolled ? 'text-[var(--primary)]' : 'text-white',
              ].join(' ')}>
                Myriam Madec
              </span>
              <span className={[
                'font-[var(--font-sans)] text-[9px] uppercase tracking-[2px] font-medium',
                'transition-colors duration-300',
                scrolled ? 'text-[var(--text-muted)]' : 'text-white/75',
              ].join(' ')}>
                {t('guideConferenciere')}
              </span>
            </div>
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'px-4 py-2 rounded-lg text-sm font-medium',
                  'font-[var(--font-sans)] transition-all duration-200',
                  scrolled
                    ? 'text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)]'
                    : 'text-white hover:bg-white/15',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className={[
                'ml-3 px-5 py-2 rounded-[var(--radius-btn)]',
                'font-[var(--font-sans)] text-sm font-medium',
                'transition-all duration-200',
                scrolled
                  ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
                  : 'bg-white text-[var(--primary)] hover:bg-white/90',
              ].join(' ')}
            >
              {t('contactReservation')}
            </Link>

            <LanguageSwitcher scrolled={scrolled} />
          </nav>

          <button
            aria-label={t('openMenu')}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className={[
              'lg:hidden p-2 -mr-1 rounded-lg transition-colors',
              scrolled
                ? 'text-[var(--text-primary)] hover:bg-[var(--primary-light)]'
                : 'text-white hover:bg-white/15',
            ].join(' ')}
          >
            <Menu size={24} />
          </button>

        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}
