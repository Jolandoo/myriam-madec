'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, animate, useMotionValue, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo { src: string; alt: string }

const INTERVAL        = 4000
const DRAG_THRESHOLD  = 50
const SPRING          = { type: 'spring', stiffness: 300, damping: 35, mass: 0.8 } as const

export default function GalerieCarousel({ photos }: { photos: Photo[] }) {
  const [index,   setIndex]   = useState(0)
  const [cardW,   setCardW]   = useState(0)
  const [visible, setVisible] = useState(3)

  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef  = useRef<ReturnType<typeof setInterval>>()
  const x            = useMotionValue(0)

  /* ── Mesure responsive ──────────────────────────────────────────────── */
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const v = w >= 768 ? 3 : w >= 520 ? 2 : 1
      setVisible(v)
      setCardW(w / v)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const maxIndex = Math.max(0, photos.length - visible)

  /* ── Snap sur changement d'index ou de cardW ────────────────────────── */
  useEffect(() => {
    if (cardW > 0) animate(x, -(index * cardW), SPRING)
  }, [index, cardW, x])

  /* ── Clamp index si visible change ─────────────────────────────────── */
  useEffect(() => {
    setIndex(i => Math.min(i, maxIndex))
  }, [maxIndex])

  /* ── Auto-avance ────────────────────────────────────────────────────── */
  const next = useCallback(() => setIndex(i => (i < maxIndex ? i + 1 : 0)), [maxIndex])

  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, INTERVAL)
  }, [next])

  useEffect(() => {
    intervalRef.current = setInterval(next, INTERVAL)
    return () => clearInterval(intervalRef.current)
  }, [next])

  /* ── Handlers nav ───────────────────────────────────────────────────── */
  const goPrev = () => { setIndex(i => (i > 0 ? i - 1 : maxIndex)); resetTimer() }
  const goNext = () => { setIndex(i => (i < maxIndex ? i + 1 : 0));  resetTimer() }
  const goTo   = (i: number) => { setIndex(i); resetTimer() }

  /* ── Drag ───────────────────────────────────────────────────────────── */
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const snapped = Math.round(-x.get() / cardW)
    const clamped = Math.max(0, Math.min(snapped, maxIndex))
    if (info.offset.x < -DRAG_THRESHOLD) goNext()
    else if (info.offset.x > DRAG_THRESHOLD) goPrev()
    else { setIndex(clamped); resetTimer() }
  }

  return (
    <div>
      {/* ── Carousel ────────────────────────────────────────────────────── */}
      <div ref={containerRef} className="relative overflow-hidden select-none">
        <motion.div
          style={{ x }}
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -(maxIndex * cardW), right: 0 }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-1.5"
              style={{ width: cardW || `${100 / 3}%` }}
            >
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{ paddingTop: '75%' }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 520px) 100vw, (max-width: 768px) 50vw, 33vw"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Flèches */}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
          aria-label="Précédent"
        >
          <ChevronLeft size={18} className="text-[var(--text-primary)]" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
          aria-label="Suivant"
        >
          <ChevronRight size={18} className="text-[var(--text-primary)]" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={[
              'h-1.5 rounded-full transition-all duration-300',
              i === index
                ? 'w-5 bg-[var(--primary)]'
                : 'w-1.5 bg-[var(--gray-100)] hover:bg-[var(--text-muted)]',
            ].join(' ')}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
