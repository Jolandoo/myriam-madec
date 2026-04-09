'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import MobileNav from './MobileNav'

// ─── Configuration ─────────────────────────────────────────────────────────────
// Modifier ici pour ajouter ou réordonner des liens de navigation

const NAV_LINKS = [
  { label: 'Mes visites',    href: '/mes-visites'    },
  { label: 'Privatisation',  href: '/privatisation'  },
  { label: 'Tarifs',         href: '/tarifs'         },
  { label: 'Actualités',     href: '/actualites'     },
  { label: 'Votre guide',    href: '/votre-guide'    },
  { label: 'Contact',        href: '/contact'        },
]

// ─── Composant ────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  // Détecte le scroll pour passer de transparent à blanc
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ferme le menu mobile si l'écran est redimensionné en desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
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
            ? 'bg-[var(--white)] shadow-[0_1px_0_var(--gray-100)]'
            : 'bg-black/30 backdrop-blur-sm',
        ].join(' ')}
      >
        <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 flex items-center justify-between py-5">

          {/* Logo — photo + nom, tout cliquable vers accueil */}
          <Link
            href="/"
            aria-label="Retour à l'accueil — Myriam Madec, Guide Conférencière"
            className="flex items-center gap-3 shrink-0"
          >
            {/* Photo de Myriam — cercle */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white/30">
              <Image
                src="https://tourismearcachon.fr/wp-content/uploads/2021/02/cropped-Journee-Internationale-des-Guides-scaled-1.jpg"
                alt="Myriam Madec, guide conférencière officielle du Bassin d'Arcachon"
                fill
                sizes="48px"
                className="object-cover object-top"
              />
            </div>

            {/* Nom + titre */}
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
                Guide Conférencière
              </span>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-1">
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

            {/* CTA Réservation */}
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
              Réserver
            </Link>
          </nav>

          {/* Burger mobile */}
          <button
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className={[
              'md:hidden p-2 -mr-1 rounded-lg transition-colors',
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
