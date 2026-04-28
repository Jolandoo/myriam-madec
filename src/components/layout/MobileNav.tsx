'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '../ui/LanguageSwitcher'

interface NavLink {
  label: string
  href: string
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const t = useTranslations('nav')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--text-primary)]/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            key="panel"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={[
              'fixed top-0 left-0 right-0 z-50',
              'bg-[var(--white)] shadow-lg',
              'px-6 pt-5 pb-8',
            ].join(' ')}
            aria-label="Menu de navigation mobile"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-[var(--font-serif)] text-lg text-[var(--primary)] italic">
                Myriam Madec
              </span>
              <div className="flex items-center gap-2">
                <LanguageSwitcher scrolled />
                <button
                  onClick={onClose}
                  aria-label={t('closeMenu')}
                  className="p-2 -mr-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <ul className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                >
                  <Link
                    href={link.href as '/mes-visites'}
                    onClick={onClose}
                    className={[
                      'block py-3 px-2 rounded-lg',
                      'font-[var(--font-sans)] text-base text-[var(--text-primary)]',
                      'hover:bg-[var(--primary-light)] hover:text-[var(--primary)]',
                      'transition-colors duration-150',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
              <Link
                href="/contact"
                onClick={onClose}
                className={[
                  'block w-full text-center py-3 rounded-[var(--radius-btn)]',
                  'bg-[var(--primary)] text-[var(--white)]',
                  'font-[var(--font-sans)] font-medium',
                  'transition-colors hover:bg-[var(--primary-dark)]',
                ].join(' ')}
              >
                {t('contactReservation')}
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
