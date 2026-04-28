import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <main className="bg-[var(--white)] min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-6">

        <span className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[3px] text-[var(--primary)]">
          {t('eyebrow')}
        </span>

        <p
          className="font-[var(--font-serif)] text-[var(--primary)] leading-none select-none"
          style={{ fontSize: 'clamp(80px, 16vw, 160px)' }}
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="font-[var(--font-serif)] text-[var(--text-primary)] text-3xl md:text-4xl">
          {t('title')}
        </h1>

        <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-base md:text-lg leading-relaxed max-w-lg">
          {t('description')}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Link
            href="/"
            className={[
              'inline-flex items-center px-7 py-3.5 rounded-[var(--radius-btn)]',
              'bg-[var(--primary)] text-white',
              'font-[var(--font-sans)] font-semibold text-sm',
              'hover:bg-[var(--primary-dark)] transition-colors duration-200',
              'shadow-lg',
            ].join(' ')}
          >
            {t('ctaHome')}
          </Link>
          <Link
            href="/mes-visites"
            className={[
              'inline-flex items-center px-7 py-3.5 rounded-[var(--radius-btn)]',
              'bg-[var(--off-white)] text-[var(--primary)]',
              'border border-[var(--gray-100)]',
              'font-[var(--font-sans)] font-medium text-sm',
              'hover:bg-[var(--primary-light)] transition-colors duration-200',
            ].join(' ')}
          >
            {t('ctaVisites')}
          </Link>
        </div>

      </div>
    </main>
  )
}
