'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function AboutMyriam() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useTranslations('about')

  const CREDENTIALS = [
    t('credential1'),
    t('credential2'),
    t('credential3'),
    t('credential4'),
  ]

  return (
    <section ref={ref} className="section-padding bg-[var(--white)]">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[var(--shadow-card-hover)]"
          >
            <Image
              src="https://tourismearcachon.fr/wp-content/uploads/2021/02/cropped-Journee-Internationale-des-Guides-scaled-1.jpg"
              alt="Myriam Madec"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-lg">
              <p className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[1.5px] text-[var(--primary)]">
                {t('guideOfficielle')}
              </p>
              <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg italic mt-0.5">
                {t('depuis')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <p className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[3px] text-[var(--primary)]">
                {t('eyebrow')}
              </p>
              <h2 className="font-[var(--font-serif)] text-[var(--text-primary)]">
                Myriam Madec
              </h2>
            </div>

            <blockquote className="border-l-2 border-[var(--primary)] pl-5">
              <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-xl italic leading-relaxed">
                {t('quote')}
              </p>
            </blockquote>

            <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-base leading-relaxed">
              {t('bio')}
            </p>

            <ul className="flex flex-col gap-2.5">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex items-center gap-3 font-[var(--font-sans)] text-sm text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            <Link
              href="/votre-guide"
              className="inline-flex items-center gap-2 font-[var(--font-sans)] text-sm font-semibold text-[var(--primary)] hover:gap-3 transition-all duration-200 mt-2"
            >
              {t('learnMore')}
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
