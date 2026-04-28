'use client'

import { motion, type Transition } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const fadeUp = (delay: number): {
  initial: { opacity: number; y: number }
  animate: { opacity: number; y: number }
  transition: Transition
} => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section
      className="relative flex items-center justify-center min-h-[100svh] overflow-hidden"
      aria-label={t('banner')}
    >

      <div className="absolute inset-0 bg-[#0a1520] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-web.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,.15) 0%, rgba(0,0,0,.30) 55%, rgba(0,0,0,.58) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-36"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.45) 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 section-container flex flex-col items-center text-center gap-5 pt-20 pb-24">

        <motion.p {...fadeUp(0.2)}
          className="font-[var(--font-sans)] text-sm font-semibold uppercase tracking-[3px] text-white/70"
        >
          {t('eyebrow')}
        </motion.p>

        <motion.h1 {...fadeUp(0.35)}
          className="font-[var(--font-serif)] text-white leading-[1.1] max-w-3xl"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,.3)' }}
        >
          {t('title')}
        </motion.h1>

        <motion.p {...fadeUp(0.52)}
          className="font-[var(--font-sans)] text-white/80 max-w-lg text-xl leading-relaxed"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,.3)' }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div {...fadeUp(0.68)} className="flex flex-wrap justify-center gap-3 mt-2">
          <Link
            href="/mes-visites"
            className={[
              'inline-flex items-center px-7 py-3.5 rounded-[var(--radius-btn)]',
              'bg-[var(--primary)] text-white',
              'font-[var(--font-sans)] font-semibold text-base',
              'hover:bg-[var(--primary-dark)] transition-colors duration-200',
              'shadow-lg',
            ].join(' ')}
          >
            {t('cta')}
          </Link>
          <Link
            href="/contact"
            className={[
              'inline-flex items-center px-7 py-3.5 rounded-[var(--radius-btn)]',
              'bg-white/10 backdrop-blur-sm text-white',
              'border border-white/30',
              'font-[var(--font-sans)] font-medium text-base',
              'hover:bg-white/20 hover:border-white/50 transition-all duration-200',
            ].join(' ')}
          >
            {t('ctaContact')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center gap-10 mt-6 pt-6 border-t border-white/15"
        >
          {[
            { count: '8', label: t('countWalking') },
            { count: '4', label: t('countBike') },
            { count: '1', label: t('countBoat') },
          ].map(({ count, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="font-[var(--font-serif)] text-white text-4xl">{count}</span>
              <span className="font-[var(--font-sans)] text-white/50 text-xs uppercase tracking-[1.5px]">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-white/40" />
        </motion.div>
      </motion.div>

    </section>
  )
}
