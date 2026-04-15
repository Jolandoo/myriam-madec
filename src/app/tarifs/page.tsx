import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, AlertCircle } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: 'Tarifs — Myriam Madec, Guide Conférencière Bassin d\'Arcachon',
  description:
    'Tarifs des visites guidées privatisées sur le Bassin d\'Arcachon. Groupes, familles, scolaires — à partir de 200 €.',
}

const PRIX = [
  { duree: '2 heures',        prix: '200 €' },
  { duree: '3 heures',        prix: '230 €' },
  { duree: '4 heures',        prix: '260 €' },
  { duree: '5 heures',        prix: '290 €' },
  { duree: '6 heures',        prix: '320 €' },
  { duree: '7 heures',        prix: '350 €' },
  { duree: 'Journée entière', prix: '400 €' },
]

const CONDITIONS = [
  'Tarifs TTC (toutes taxes comprises).',
  'Prestations le 1er mai et le 1er janvier majorées au double.',
  'Réservations de plus d\'un jour : acompte de 30 % à la réservation.',
  'Entrées de sites et repas du guide non inclus — à la charge du client.',
  'Dégustations, balades en bateau et location de vélos non compris.',
]

const ANNULATION = [
  { delai: 'Annulation à 48h',  montant: '50 % du montant de la prestation' },
  { delai: 'Annulation à 24h',  montant: '100 % du montant de la prestation' },
]

export default function TarifsPage() {
  return (
    <main className="bg-[var(--white)]">
      <PageHero
        eyebrow="Tarifs"
        title="Tarifs groupe & privatisation"
        description="Tous les tarifs s'entendent par groupe, quelle que soit la taille — à pied, à vélo ou en bateau."
        image="https://upload.wikimedia.org/wikipedia/commons/1/1a/Port_d%27Arcachon.jpg"
        imageAlt="Port d'Arcachon"
      />

      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Tableau des prix ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl">
              Tarifs par durée
            </h2>
            <div className="rounded-[var(--radius-card)] overflow-hidden border border-[var(--gray-100)]" style={{ boxShadow: 'var(--shadow-card)' }}>
              {PRIX.map(({ duree, prix }, i) => (
                <div
                  key={duree}
                  className={[
                    'flex items-center justify-between px-6 py-4',
                    i < PRIX.length - 1 ? 'border-b border-[var(--gray-100)]' : '',
                    i % 2 === 0 ? 'bg-[var(--white)]' : 'bg-[var(--off-white)]',
                  ].join(' ')}
                >
                  <span className="font-[var(--font-sans)] text-[var(--text-primary)] font-medium">
                    {duree}
                  </span>
                  <span className="font-[var(--font-serif)] text-[var(--primary)] text-xl font-normal">
                    {prix}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm">
              Groupes à pied : minimum 30 personnes · Groupes à vélo : minimum 15 personnes
            </p>

            {/* Annulation */}
            <div className="mt-4">
              <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl mb-4">
                Politique d'annulation
              </h2>
              <div className="flex flex-col gap-3">
                {ANNULATION.map(({ delai, montant }) => (
                  <div
                    key={delai}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[var(--off-white)] border border-[var(--gray-100)]"
                  >
                    <AlertCircle size={18} className="text-[var(--primary)] shrink-0" />
                    <div>
                      <p className="font-[var(--font-sans)] font-semibold text-sm text-[var(--text-primary)]">{delai}</p>
                      <p className="font-[var(--font-sans)] text-sm text-[var(--text-muted)]">{montant}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Conditions ───────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <div
              className="p-6 rounded-[var(--radius-card)] bg-[var(--primary-light)] border border-[var(--gray-100)] flex flex-col gap-4"
            >
              <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-xl">
                Conditions générales
              </h3>
              <ul className="flex flex-col gap-3">
                {CONDITIONS.map((cond) => (
                  <li key={cond} className="flex items-start gap-3">
                    <Check size={15} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <span className="font-[var(--font-sans)] text-sm text-[var(--text-primary)] leading-relaxed">
                      {cond}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              className="p-6 rounded-[var(--radius-card)] bg-[var(--primary)] flex flex-col gap-3 text-center"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="font-[var(--font-serif)] text-white text-xl">
                Demander un devis
              </h3>
              <p className="font-[var(--font-sans)] text-white/75 text-sm leading-relaxed">
                Pour les scolaires, les entreprises ou les groupes spéciaux, contactez-moi directement.
              </p>
              <Link
                href="/contact"
                className={[
                  'mt-2 inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-btn)]',
                  'bg-white text-[var(--primary)]',
                  'font-[var(--font-sans)] font-semibold text-sm',
                  'hover:bg-white/90 transition-colors duration-200',
                ].join(' ')}
              >
                Me contacter
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
