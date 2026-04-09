'use client'

import type { Visite } from '@/data/visites'

export type FilterValue = Visite['categorie'] | 'all'

interface FilterOption {
  value: FilterValue
  label: string
}

interface FilterBarProps {
  active:   FilterValue
  onChange: (value: FilterValue) => void
  counts:   Record<FilterValue, number>
}

const FILTERS: FilterOption[] = [
  { value: 'all',              label: 'Toutes'          },
  { value: 'pied',             label: 'À pied'          },
  { value: 'velo-electrique',  label: 'Vélo électrique' },
  { value: 'velo',             label: 'À vélo'          },
  { value: 'bateau',           label: 'En bateau'       },
]

export default function FilterBar({ active, onChange, counts }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filtrer les visites">
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
