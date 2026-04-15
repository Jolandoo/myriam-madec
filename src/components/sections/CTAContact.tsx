import Link from 'next/link'
import { Phone, Mail, Calendar } from 'lucide-react'

const ACTIONS = [
  {
    icon: Calendar,
    label: 'Réserver une visite',
    desc: 'Consultez le catalogue et choisissez votre expérience.',
    href: '/mes-visites',
    variant: 'primary' as const,
  },
  {
    icon: Mail,
    label: 'Demander un devis',
    desc: 'Groupes, scolaires, entreprises — visite sur mesure.',
    href: '/contact',
    variant: 'outline' as const,
  },
  {
    icon: Phone,
    label: '+33 6 80 43 96 78',
    desc: 'Disponible tous les jours pour répondre à vos questions.',
    href: 'tel:+33680439678',
    variant: 'outline' as const,
  },
]

export default function CTAContact() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' }}
    >
      {/* Décoration subtile */}
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-10 md:px-16 py-20">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <span className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[3px] text-white/60">
            Passez à l'action
          </span>
          <h2
            className="font-[var(--font-serif)] text-white max-w-xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,.2)' }}
          >
            Prêt à découvrir le Bassin d'Arcachon ?
          </h2>
          <p className="font-[var(--font-sans)] text-white/75 max-w-lg leading-relaxed">
            Des visites inoubliables gravées dans vos mémoires — réservez dès maintenant
            ou contactez Myriam pour une expérience sur mesure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ACTIONS.map(({ icon: Icon, label, desc, href, variant }) => (
            <Link
              key={label}
              href={href}
              className={[
                'group flex flex-col items-center text-center gap-4 p-7 rounded-[var(--radius-card)]',
                'transition-all duration-300',
                variant === 'primary'
                  ? 'bg-white text-[var(--primary)] hover:bg-white/95 hover:-translate-y-1'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:-translate-y-1',
              ].join(' ')}
            >
              <div className={[
                'w-12 h-12 rounded-full flex items-center justify-center',
                variant === 'primary' ? 'bg-[var(--primary-light)]' : 'bg-white/15',
              ].join(' ')}>
                <Icon size={20} className={variant === 'primary' ? 'text-[var(--primary)]' : 'text-white'} />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className={[
                  'font-[var(--font-serif)] text-lg',
                  variant === 'primary' ? 'text-[var(--text-primary)]' : 'text-white',
                ].join(' ')}>
                  {label}
                </p>
                <p className={[
                  'font-[var(--font-sans)] text-sm leading-relaxed',
                  variant === 'primary' ? 'text-[var(--text-muted)]' : 'text-white/65',
                ].join(' ')}>
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
