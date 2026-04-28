'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useParams } from 'next/navigation'

function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <rect width="213.3" height="480" fill="#002654" />
      <rect x="213.3" width="213.4" height="480" fill="#fff" />
      <rect x="426.7" width="213.3" height="480" fill="#ce1126" />
    </svg>
  )
}

function FlagEN({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <defs>
        <clipPath id="diag-tl"><polygon points="0,0 640,0 0,480" /></clipPath>
        <clipPath id="diag-br"><polygon points="640,0 640,480 0,480" /></clipPath>
      </defs>
      {/* Top-left  - Stars & Stripes */}
      <g clipPath="url(#diag-tl)">
        <path fill="#B22234" d="M0 0h640v480H0z" />
        <path fill="#FFF" d="M0 37h640v37H0zm0 74h640v37H0zm0 73h640v37H0zm0 74h640v37H0zm0 73h640v37H0zm0 74h640v37H0z" />
        <path fill="#3C3B6E" d="M0 0h260v258H0z" />
        <g fill="#FFF">
          <circle cx="45" cy="24" r="8" /><circle cx="90" cy="24" r="8" /><circle cx="135" cy="24" r="8" /><circle cx="180" cy="24" r="8" /><circle cx="225" cy="24" r="8" />
          <circle cx="68" cy="48" r="8" /><circle cx="113" cy="48" r="8" /><circle cx="158" cy="48" r="8" /><circle cx="203" cy="48" r="8" />
          <circle cx="45" cy="72" r="8" /><circle cx="90" cy="72" r="8" /><circle cx="135" cy="72" r="8" /><circle cx="180" cy="72" r="8" /><circle cx="225" cy="72" r="8" />
          <circle cx="68" cy="96" r="8" /><circle cx="113" cy="96" r="8" /><circle cx="158" cy="96" r="8" /><circle cx="203" cy="96" r="8" />
          <circle cx="45" cy="120" r="8" /><circle cx="90" cy="120" r="8" /><circle cx="135" cy="120" r="8" /><circle cx="180" cy="120" r="8" /><circle cx="225" cy="120" r="8" />
          <circle cx="68" cy="144" r="8" /><circle cx="113" cy="144" r="8" /><circle cx="158" cy="144" r="8" /><circle cx="203" cy="144" r="8" />
          <circle cx="45" cy="168" r="8" /><circle cx="90" cy="168" r="8" /><circle cx="135" cy="168" r="8" /><circle cx="180" cy="168" r="8" /><circle cx="225" cy="168" r="8" />
          <circle cx="68" cy="192" r="8" /><circle cx="113" cy="192" r="8" /><circle cx="158" cy="192" r="8" /><circle cx="203" cy="192" r="8" />
          <circle cx="45" cy="216" r="8" /><circle cx="90" cy="216" r="8" /><circle cx="135" cy="216" r="8" /><circle cx="180" cy="216" r="8" /><circle cx="225" cy="216" r="8" />
        </g>
      </g>
      {/* Bottom-right  - Union Jack */}
      <g clipPath="url(#diag-br)">
        <path fill="#012169" d="M0 0h640v480H0z" />
        <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
        <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
        <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
        <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
      </g>
    </svg>
  )
}

function FlagES({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className} aria-hidden="true">
      <path fill="#AA151B" d="M0 0h640v480H0z" />
      <path fill="#F1BF00" d="M0 120h640v240H0z" />
    </svg>
  )
}

const FLAGS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  fr: FlagFR,
  en: FlagEN,
  es: FlagES,
}

const LANGUAGES = [
  { code: 'fr' as const, label: 'FR' },
  { code: 'en' as const, label: 'EN' },
  { code: 'es' as const, label: 'ES' },
]

interface LanguageSwitcherProps {
  scrolled?: boolean
}

export default function LanguageSwitcher({ scrolled = true }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const routeParams = useParams()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]
  const CurrentFlag = FLAGS[current.code]

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const switchLocale = (code: 'fr' | 'en' | 'es') => {
    setOpen(false)
    if (code === locale) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = routeParams as any
    const href = params?.slug
      ? { pathname: pathname as any, params: { slug: params.slug } }
      : (pathname as any)
    router.replace(href, { locale: code })
  }

  return (
    <div ref={ref} className="relative ml-3">
      <button
        onClick={() => setOpen(!open)}
        className={[
          'flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-btn)]',
          'font-[var(--font-sans)] text-sm font-medium',
          'transition-all duration-200 cursor-pointer',
          scrolled
            ? 'text-[var(--text-primary)] hover:bg-[var(--primary-light)]'
            : 'text-white hover:bg-white/15',
        ].join(' ')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe size={14} className="opacity-60" />
        <span>{current.label}</span>
        <CurrentFlag className="w-4 h-3 rounded-[2px] object-cover" />
        <ChevronDown size={12} className={['opacity-50 transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-1 min-w-[130px] py-1 rounded-xl bg-white border border-[var(--gray-100)] overflow-hidden"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,.12)' }}
        >
          {LANGUAGES.map((lang) => {
            const Flag = FLAGS[lang.code]
            return (
              <li key={lang.code} role="option" aria-selected={lang.code === locale}>
                <button
                  onClick={() => switchLocale(lang.code)}
                  className={[
                    'w-full flex items-center gap-2.5 px-4 py-2.5 text-left cursor-pointer',
                    'font-[var(--font-sans)] text-sm transition-colors duration-150',
                    lang.code === locale
                      ? 'bg-[var(--primary-light)] text-[var(--primary)] font-semibold'
                      : 'text-[var(--text-primary)] hover:bg-[var(--off-white)]',
                  ].join(' ')}
                >
                  <Globe size={14} className="opacity-50" />
                  <span>{lang.label}</span>
                  <Flag className="ml-auto w-4 h-3 rounded-[2px]" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
