'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import VisiteCard from './VisiteCard'
import FilterBar, { type FilterValue } from './FilterBar'
import SectionHeader from '@/components/ui/SectionHeader'
import { type Visite } from '@/data/visites'

interface Props { visites: Visite[] }

export default function VisitesGrid({ visites }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')
  const t = useTranslations('visitesGrid')

  const filtered = useMemo(
    () => activeFilter === 'all'
      ? visites
      : visites.filter((v) => v.categorie === activeFilter),
    [activeFilter, visites],
  )

  const counts = useMemo(() => ({
    all:               visites.length,
    pied:              visites.filter((v) => v.categorie === 'pied').length,
    velo:              visites.filter((v) => v.categorie === 'velo').length,
    'velo-electrique': visites.filter((v) => v.categorie === 'velo-electrique').length,
    bateau:            visites.filter((v) => v.categorie === 'bateau').length,
  }), [visites])

  return (
    <section id="visites" className="section-padding bg-[var(--gray-50)]">
      <div className="section-container flex flex-col gap-12">

        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title', { count: visites.length })}
          titleAccent={t('titleAccent')}
          subtitle={t('subtitle')}
          align="center"
        />

        <FilterBar
          active={activeFilter}
          onChange={setActiveFilter}
          counts={counts}
        />

        <motion.div
          layout
          className="flex flex-wrap justify-center gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((visite, i) => (
              <motion.div
                key={visite.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
                className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <VisiteCard visite={visite} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center font-[var(--font-sans)] text-[var(--text-muted)] py-16">
            {t('empty')}
          </p>
        )}

      </div>
    </section>
  )
}
