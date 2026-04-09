import { Clock } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DurationPillProps {
  duree:     string    // ex : "1h30", "2-3h", "2h à 1 journée"
  className?: string
}

// ─── Composant ────────────────────────────────────────────────────────────────
// Affiche la durée d'une visite avec une icône horloge.
// Couleur ocre (--accent) pour évoquer le sable et la chaleur.

export default function DurationPill({ duree, className = '' }: DurationPillProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5',
        'font-[var(--font-sans)] text-[14px] font-medium',
        'text-[var(--accent)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Clock
        size={14}
        strokeWidth={2.5}
        aria-hidden="true"
        className="shrink-0"
      />
      {duree}
    </span>
  )
}
