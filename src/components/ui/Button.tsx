import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?:   Variant
  size?:      Size
  href?:      string
  external?:  boolean
  disabled?:  boolean
  className?: string
  children:   React.ReactNode
  onClick?:   () => void
}

// Modifier ici pour changer l'apparence globale des boutons
const variantStyles: Record<Variant, string> = {
  primary:   'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-sm hover:shadow-md',
  secondary: 'bg-[var(--text-primary)] text-white hover:opacity-90 shadow-sm',
  outline:   'bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary-light)]',
  ghost:     'bg-transparent text-[var(--primary)] hover:bg-[var(--primary-light)]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 gap-1.5',
  md: 'text-sm px-6 py-3 gap-2',
  lg: 'text-base px-8 py-3.5 gap-2.5 font-semibold',
}

export default function Button({
  variant  = 'primary',
  size     = 'md',
  href,
  external = false,
  disabled = false,
  className = '',
  children,
  onClick,
}: ButtonProps) {
  const base = [
    'inline-flex items-center justify-center rounded-[var(--radius-btn)]',
    'font-[var(--font-sans)] font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
    'select-none',
  ].join(' ')

  const classes = [
    base,
    variantStyles[variant],
    sizeStyles[size],
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    const linkProps = external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}
    return <Link href={href} className={classes} {...linkProps}>{children}</Link>
  }

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
