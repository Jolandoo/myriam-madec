'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo {
  src: string
  alt: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const open  = (i: number) => setActiveIndex(i)
  const close = () => setActiveIndex(null)
  const prev  = () => setActiveIndex((i) => (i! > 0 ? i! - 1 : photos.length - 1))
  const next  = () => setActiveIndex((i) => (i! < photos.length - 1 ? i! + 1 : 0))

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <>
      {/* ── Grille ──────────────────────────────────────────────────────── */}
      <div className={[
        'grid gap-4',
        photos.length === 1 ? 'grid-cols-1' :
        photos.length === 2 ? 'grid-cols-2' :
        'grid-cols-2 sm:grid-cols-3',
      ].join(' ')}>
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="relative rounded-[var(--radius-card)] overflow-hidden cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            style={{ paddingTop: '75%' }}
            aria-label={`Agrandir : ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={close}
            onKeyDown={handleKey}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse de photos"
          >
            {/* Fermer */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={22} />
            </button>

            {/* Précédent */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                aria-label="Photo précédente"
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Suivant */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
                aria-label="Photo suivante"
              >
                <ChevronRight size={26} />
              </button>
            )}

            {/* Compteur */}
            {photos.length > 1 && (
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-[var(--font-sans)] text-white/60 text-sm">
                {activeIndex + 1} / {photos.length}
              </p>
            )}

            {/* Légende */}
            <p className="absolute bottom-10 left-1/2 -translate-x-1/2 font-[var(--font-sans)] text-white/80 text-sm text-center max-w-lg px-4">
              {photos[activeIndex].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
