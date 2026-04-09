'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const CREDENTIALS = [
  'Guide Interprète Nationale depuis 1997',
  'Guide Accompagnatrice de Pays depuis 1995',
  'Membre FNGIC & Guides de Nouvelle-Aquitaine',
  'Visites en français, anglais et espagnol',
]

export default function AboutMyriam() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-padding bg-[var(--white)]">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Photo ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[var(--shadow-card-hover)]"
          >
            <Image
              src="https://tourismearcachon.fr/wp-content/uploads/2021/02/cropped-Journee-Internationale-des-Guides-scaled-1.jpg"
              alt="Myriam Madec, guide conférencière officielle du Bassin d'Arcachon"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            {/* Badge flottant */}
            <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-lg">
              <p className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[1.5px] text-[var(--primary)]">
                Guide officielle
              </p>
              <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg italic mt-0.5">
                depuis 1994
              </p>
            </div>
          </motion.div>

          {/* ── Texte ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <p className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[3px] text-[var(--primary)]">
                Votre guide
              </p>
              <h2 className="font-[var(--font-serif)] text-[var(--text-primary)]">
                Myriam Madec
              </h2>
            </div>

            <blockquote className="border-l-2 border-[var(--primary)] pl-5">
              <p className="font-[var(--font-serif)] text-[var(--text-primary)] text-xl italic leading-relaxed">
                « Faire de votre séjour une expérience enrichissante et inoubliable — c'est ma mission depuis 30 ans. »
              </p>
            </blockquote>

            <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-base leading-relaxed">
              Passionnée d'archéologie depuis l'enfance, Myriam a découvert sa vraie vocation dans la transmission.
              Elle connaît le Bassin d'Arcachon dans ses moindres recoins — des cabanes tchanquées aux fouilles
              sous la dune du Pilat, des criées à l'aube aux allées secrètes de la Ville d'Hiver.
            </p>

            {/* Accréditations */}
            <ul className="flex flex-col gap-2.5">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex items-center gap-3 font-[var(--font-sans)] text-sm text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            <Link
              href="/votre-guide"
              className="inline-flex items-center gap-2 font-[var(--font-sans)] text-sm font-semibold text-[var(--primary)] hover:gap-3 transition-all duration-200 mt-2"
            >
              En savoir plus sur Myriam
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
