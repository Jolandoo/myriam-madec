'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionHeaderProps {
  eyebrow?:     string
  title:        string
  titleAccent?: string
  subtitle?:    string
  align?:       'center' | 'left'
  className?:   string
}

export default function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align     = 'center',
  className = '',
}: SectionHeaderProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const isCenter = align === 'center'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={[
        'flex flex-col gap-3',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className,
      ].filter(Boolean).join(' ')}
    >
      {eyebrow && (
        <p className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[3px] text-[var(--primary)]">
          {eyebrow}
        </p>
      )}

      <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] leading-tight">
        {title}
        {titleAccent && (
          <em className="italic text-[var(--primary)]" style={{ fontStyle: 'italic' }}>
            {' '}{titleAccent}
          </em>
        )}
      </h2>

      {subtitle && (
        <p className={[
          'font-[var(--font-sans)] text-[var(--text-muted)] text-base leading-relaxed',
          isCenter ? 'max-w-2xl' : 'max-w-xl',
        ].join(' ')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
