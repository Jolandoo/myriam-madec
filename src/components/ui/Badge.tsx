import type { Visite } from '@/data/visites'

type BadgeVariant = Visite['categorie'] | 'default'

interface BadgeProps {
  label:      string
  variant?:   BadgeVariant
  className?: string
}

// Toutes les variantes utilisent le bleu principal  - sobre, cohérent
const variantStyles: Record<BadgeVariant, string> = {
  pied:             'bg-[var(--primary-light)] text-[var(--primary)]',
  velo:             'bg-[var(--primary-light)] text-[var(--primary)]',
  'velo-electrique':'bg-[var(--primary-light)] text-[var(--primary)]',
  bateau:           'bg-[var(--primary-light)] text-[var(--primary)]',
  default:          'bg-[var(--gray-100)] text-[var(--text-muted)]',
}

export default function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={[
      'inline-block rounded-full px-2.5 py-1',
      'font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[1px]',
      'whitespace-nowrap',
      variantStyles[variant],
      className,
    ].filter(Boolean).join(' ')}>
      {label}
    </span>
  )
}
