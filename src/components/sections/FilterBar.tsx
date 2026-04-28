'use client'

import { useTranslations } from 'next-intl'
import type { Visite } from '@/data/visites'

export type FilterValue = Visite['categorie'] | 'all'

interface FilterBarProps {
  active: FilterValue
  onChange: (value: FilterValue) => void
  counts: Record<FilterValue, number>
}

export default function FilterBar({ active, onChange, counts }: FilterBarProps) {
  const t = useTranslations('filters')
  const tGrid = useTranslations('visitesGrid')

  const FILTERS: { value: FilterValue; label: string }[] = [
    { value: 'all',             label: t('all') },
    { value: 'pied',            label: t('pied') },
    { value: 'velo-electrique', label: t('velo-electrique') },
    { value: 'velo',            label: t('velo') },
    { value: 'bateau',          label: t('bateau') },
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label={tGrid('filterLabel')}>
      {FILTERS.map((f) => {
        const isActive = active === f.value
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            aria-pressed={isActive}
            className={[
              'inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full',
              'font-[var(--font-sans)] text-sm font-medium transition-all duration-150 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]',
              isActive
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'bg-white text-[var(--text-muted)] border border-[var(--gray-100)] hover:border-[var(--primary)] hover:text-[var(--primary)]',
            ].join(' ')}
          >
            {f.label}
            <span className={['text-xs tabular-nums', isActive ? 'text-white/60' : 'text-[var(--text-muted)]/50'].join(' ')}>
              {counts[f.value] ?? 0}
            </span>
          </button>
        )
      })}
    </div>
  )
}
