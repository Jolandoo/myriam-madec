import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Visite } from '@/data/visites'

interface VisiteCardProps {
  visite: Visite
}

export default function VisiteCard({ visite }: VisiteCardProps) {
  const tCat = useTranslations('categories')
  const tCard = useTranslations('visiteCard')

  return (
    <Link
      href={{ pathname: '/mes-visites/[slug]', params: { slug: visite.slug } }}
      className="group flex flex-col bg-[var(--white)] rounded-[var(--radius-card)] overflow-hidden cursor-pointer"
      style={{ boxShadow: 'var(--shadow-card)', transition: 'box-shadow .25s, transform .25s' }}
      aria-label={tCard('seeLabel', { title: visite.titre })}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'var(--shadow-card-hover)'
        el.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'var(--shadow-card)'
        el.style.transform = 'translateY(0)'
      }}
    >
      <div className="relative overflow-hidden" style={{ paddingTop: '62%' }}>
        <Image
          src={visite.image}
          alt={`${visite.titre} — ${visite.sousTitre}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          quality={80}
        />
      </div>

      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <span className={[
            'text-[11px] font-semibold uppercase tracking-[1px]',
            'px-2.5 py-1 rounded-full',
            'bg-[var(--primary-light)] text-[var(--primary)]',
            'font-[var(--font-sans)]',
          ].join(' ')}>
            {tCat(visite.categorie)}
          </span>
          <span className="flex items-center gap-1 text-[var(--text-muted)] text-xs font-[var(--font-sans)]">
            <Clock size={11} strokeWidth={2} />
            {visite.duree}
          </span>
        </div>

        <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg leading-snug">
          {visite.titre}
        </h3>

        <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed line-clamp-2">
          {visite.descriptionCourte}
        </p>

        <div className="flex items-center gap-1 mt-1 font-[var(--font-sans)] text-sm font-semibold text-[var(--primary)]">
          {tCard('viewTour')}
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  )
}
