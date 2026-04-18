import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Bike, Footprints, Sailboat } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import GalerieCarousel from '@/components/ui/GalerieCarousel'

export const metadata: Metadata = {
  title: 'Privatisation — Myriam Madec, Guide Conférencière Bassin d\'Arcachon',
  description:
    'Privatisez votre guide conférencière pour une visite sur mesure du Bassin d\'Arcachon — à pied, à vélo ou en bateau, en famille, entre amis ou en groupe.',
}

const MODES = [
  {
    icon: Bike,
    label: 'À vélo',
    desc: 'Explorez le littoral et la forêt landaise à votre rythme, à vélo classique ou électrique.',
  },
  {
    icon: Footprints,
    label: 'À pied',
    desc: 'Flânez dans les allées de la Ville d\'Hiver ou sur les sentiers des prés salés.',
  },
  {
    icon: Sailboat,
    label: 'En bateau',
    desc: 'Naviguez vers l\'Île aux Oiseaux et les cabanes tchanquées pour une expérience unique.',
  },
]

const GALERIE = [
  { src: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/IMG-20210116-WA0006-qewz0p0a1px03w741wbdkl4xrazyt552qhepl95uao.jpeg', alt: 'Plage Pereire' },
  { src: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/nonos-velo-qewz0unb6q4q1jyx4yr4zjppbm863brgr9bmgwxh9c.jpg', alt: 'Arcachon en vélo' },
  { src: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/tchanquees-nonos-qewz0yeny29vbztgj0dn9irjp5pmy46e3rxke0rwkg.jpg', alt: 'Cabanes tchanquées' },
  { src: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/VIN2830-2-scaled-qewz1260pef0mfnzx205jhte2p73swlbgajib4mbvk.jpg', alt: 'Tour des cabanes en bateau' },
  { src: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/IMG_2767-qewz0py48jyafi5qweq052wecovc0u8t2m272j4g4g.jpg', alt: 'Dégustation au bord du Bassin' },
  { src: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/Port-de-la-teste-qewz0jd8wppa68faytvm5mk66zrriyiopphsple7c0.jpg', alt: 'Port de La Teste-de-Buch' },
  { src: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/ville-hiver-qewz0jd8wppa68faytvm5mk66zrriyiopphsple7c0.jpg', alt: 'Ville d\'Hiver d\'Arcachon' },
  { src: 'https://tourismearcachon.fr/wp-content/uploads/elementor/thumbs/Port-Ostreicole-qewz0buje1ezlcq86qmlloghfwsttdou0o9wvdpcps.jpg', alt: 'Port ostréicole' },
]

export default function PrivatisationPage() {
  return (
    <main className="bg-[var(--white)]">
      <PageHero
        eyebrow="Sur mesure"
        title="Balades privatisées sur le littoral Arcachonnais"
        description="À pied, à vélo ou en bateau — choisissez votre jour, votre heure et votre thème. Votre visite devient unique et personnalisée."
        image="https://upload.wikimedia.org/wikipedia/commons/a/a6/Bassin_d%27Arcachon_-_Cabanes_tchanqu%C3%A9es.jpg"
        imageAlt="Cabanes tchanquées sur l'Île aux Oiseaux, Bassin d'Arcachon"
      />

      {/* ── Modes de visite ─────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MODES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-4 p-8 rounded-[var(--radius-card)] border border-[var(--gray-100)]"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="w-14 h-14 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                <Icon size={24} className="text-[var(--primary)]" />
              </div>
              <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-xl">
                {label}
              </h3>
              <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Galerie ─────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[var(--off-white)] py-12">
        <div className="max-w-[1280px] mx-auto px-10 md:px-16">
          <GalerieCarousel photos={GALERIE} />
        </div>
      </section>

      {/* ── Texte principal ─────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-5 font-[var(--font-sans)] text-[var(--text-primary)] text-base leading-relaxed">
          <p>
            Que ce soit à pied, en vélo ou en bateau, je vous propose de découvrir le Bassin
            d'Arcachon, ses plages, son ambiance, ainsi que les <strong>quartiers Arcachonnais,
            Pereire, Abatilles et Moulleau</strong> en famille ou entre amis.
          </p>
          <p>
            Tout au long de l'année, je vous propose de privatiser votre guide pour découvrir
            en toute liberté notre patrimoine. C'est pour vous l'occasion de choisir le jour,
            l'heure, le thème de votre visite et d'en profiter — de vous construire des
            souvenirs entre amis ou en famille. Toutes mes visites se déclinent en petit groupe,
            pour partager des moments privilégiés.
          </p>
          <p>
            En privatisant une guide conférencière locale, vous avez un véritable moment de
            partage et de convivialité. Je peux répondre à toutes vos questions sur la visite
            ou sur votre séjour en général, vous conseiller sur des établissements, des endroits
            ou des animations à ne pas manquer.{' '}
            <strong>Votre visite devient unique et personnalisée.</strong>
          </p>
        </div>
      </section>

      {/* ── Coup de cœur ────────────────────────────────────────────────────── */}
      <section className="w-full bg-[var(--primary-light)] py-16">
        <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4">
              <span className="font-[var(--font-sans)] text-[11px] font-semibold uppercase tracking-[3px] text-[var(--primary)]">
                Mon coup de cœur
              </span>
              <h2 className="font-[var(--font-serif)] text-[var(--text-primary)]">
                "On a marché sur la Dune"
              </h2>
              <p className="font-[var(--font-sans)] text-[var(--text-primary)] leading-relaxed">
                Soyez les premiers à laisser vos empreintes sur la dune du Pilat, lors d'un
                lever de soleil — et profitez de la dune, rien que pour vous.
              </p>
              <Link
                href="/contact"
                className={[
                  'inline-flex items-center px-6 py-3 rounded-[var(--radius-btn)] w-fit mt-2',
                  'bg-[var(--primary)] text-white',
                  'font-[var(--font-sans)] font-semibold text-sm',
                  'hover:bg-[var(--primary-dark)] transition-colors duration-200',
                ].join(' ')}
              >
                Réserver cette expérience
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden shadow-lg">
              <Image
                src="https://tourismearcachon.fr/wp-content/uploads/2021/02/lever-du-soleil-1808.jpg"
                alt="Lever de soleil sur la Dune du Pilat"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16 text-center">
        <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] mb-4">
          Composez votre visite sur mesure
        </h2>
        <p className="font-[var(--font-sans)] text-[var(--text-muted)] max-w-lg mx-auto mb-8 leading-relaxed">
          Groupes, familles, scolaires — contactez-moi pour construire ensemble une expérience
          qui vous ressemble.
        </p>
        <Link
          href="/contact"
          className={[
            'inline-flex items-center px-8 py-4 rounded-[var(--radius-btn)]',
            'bg-[var(--primary)] text-white',
            'font-[var(--font-sans)] font-semibold text-sm',
            'hover:bg-[var(--primary-dark)] transition-colors duration-200 shadow-lg',
          ].join(' ')}
        >
          Me contacter
        </Link>
      </section>
    </main>
  )
}
