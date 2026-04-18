import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, Globe, Award, Heart } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Votre guide — Myriam Madec, Guide Conférencière Bassin d\'Arcachon',
  description:
    'Myriam Madec, Guide Interprète Nationale officielle du Bassin d\'Arcachon depuis 1994. Découvrez son parcours, ses spécialités et sa passion pour le territoire.',
}

const DIPLOMES = [
  { annee: '1994', label: 'Premiers pas de guide au Château de Lanquais' },
  { annee: '1995', label: 'Diplôme de Guide Accompagnatrice de Pays' },
  { annee: '1997', label: 'Diplôme de Guide Interprète Nationale' },
]

const SPECIALITES = [
  { icon: Heart,        label: 'Histoire locale',    desc: 'L\'occupation, les bains de mer, les origines d\'Arcachon — 30 ans de passion pour l\'histoire du Bassin.' },
  { icon: Award,        label: 'Patrimoine',          desc: 'Architecture de la Ville d\'Hiver, ostréiculture, dune du Pilat — un territoire d\'une richesse exceptionnelle.' },
  { icon: Globe,        label: 'Multilingue',         desc: 'Visites proposées en français, anglais et espagnol.' },
  { icon: GraduationCap, label: 'Pédagogie',          desc: 'Programmes scolaires adaptés de la maternelle au lycée, en lien avec les programmes officiels.' },
]

const PARTENAIRES = [
  'Association des Guides de Nouvelle-Aquitaine (AGNA)',
  'FNGIC — Fédération Nationale des Guides Interprètes et Conférenciers',
  'B\'A — Marque Territoriale Bassin d\'Arcachon',
  'Ecotours Arcachon',
  'Les Balades Tchanquées',
]

export default function VotreGuidePage() {
  return (
    <main className="bg-[var(--white)]">
      <PageHero
        eyebrow="Votre guide"
        title="Myriam Madec"
        description="Guide Interprète Nationale officielle du Bassin d'Arcachon depuis 1994."
        image="https://upload.wikimedia.org/wikipedia/commons/d/da/Arcachon-Jetee-Eyrac-byRundvald.jpg"
        imageAlt="Jetée Eyrac sur la plage d'Arcachon"
      />

      {/* ── Bio principale ──────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Photo */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden shadow-xl">
              <Image
                src="https://tourismearcachon.fr/wp-content/uploads/2021/02/cropped-Journee-Internationale-des-Guides-scaled-1.jpg"
                alt="Myriam Madec, guide conférencière officielle du Bassin d'Arcachon"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Badge flottant */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
              <p className="font-[var(--font-serif)] text-[var(--primary)] text-lg italic">Depuis 1994</p>
              <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-xs uppercase tracking-widest mt-0.5">Guide officielle</p>
            </div>
          </div>

          {/* Texte */}
          <div className="flex flex-col gap-7">
            <blockquote className="font-[var(--font-serif)] text-2xl italic text-[var(--text-primary)] leading-snug border-l-2 border-[var(--primary)] pl-6">
              "Des visites inoubliables gravées dans vos mémoires."
            </blockquote>

            <div className="flex flex-col gap-4 font-[var(--font-sans)] text-[var(--text-primary)] leading-relaxed">
              <p>
                Passionnée par le patrimoine et l'histoire du Bassin d'Arcachon, je vous accompagne depuis
                plus de 30 ans à la découverte d'un territoire d'une richesse exceptionnelle. Guide Interprète
                Nationale officielle, je propose des visites en français, anglais et espagnol, pour tous
                les publics — familles, groupes, scolaires, entreprises.
              </p>
              <p>
                Mon ambition : vous offrir bien plus qu'une visite. Un moment de partage, de curiosité
                et d'émerveillement. Qu'il s'agisse des ruelles de la Ville d'Hiver, des prés salés
                ou du lever de soleil sur la Dune du Pilat, chaque sortie est une rencontre authentique
                avec le Bassin.
              </p>
            </div>

            {/* Diplômes */}
            <div className="flex flex-col gap-3">
              <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-xl">Parcours</h3>
              {DIPLOMES.map(({ annee, label }) => (
                <div key={annee} className="flex items-center gap-4">
                  <span className="font-[var(--font-sans)] text-[var(--primary)] font-semibold text-sm w-10 shrink-0">{annee}</span>
                  <span className="font-[var(--font-sans)] text-[var(--text-primary)] text-sm">{label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className={[
                'inline-flex items-center px-7 py-3.5 rounded-[var(--radius-btn)] w-fit',
                'bg-[var(--primary)] text-white',
                'font-[var(--font-sans)] font-semibold text-sm',
                'hover:bg-[var(--primary-dark)] transition-colors duration-200',
              ].join(' ')}
            >
              Réserver une visite
            </Link>
          </div>
        </div>
      </section>

      {/* ── Spécialités ─────────────────────────────────────────────────────── */}
      <section className="w-full bg-[var(--off-white)] py-16">
        <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16">
          <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-center mb-10">
            Mes spécialités
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALITES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="bg-[var(--white)] rounded-[var(--radius-card)] p-6 flex flex-col gap-4"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="w-11 h-11 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                  <Icon size={20} className="text-[var(--primary)]" />
                </div>
                <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg">{label}</h3>
                <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partenaires & memberships ────────────────────────────────────────── */}
      <section className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-center mb-8">
          Affiliations professionnelles
        </h2>
        <ul className="flex flex-wrap justify-center gap-4">
          {PARTENAIRES.map((p) => (
            <li
              key={p}
              className="px-5 py-2.5 rounded-full border border-[var(--gray-100)] bg-[var(--off-white)] font-[var(--font-sans)] text-sm text-[var(--text-muted)]"
            >
              {p}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
