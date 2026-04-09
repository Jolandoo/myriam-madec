import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

const NAV_VISITES = [
  { label: 'Toutes les visites',       href: '/mes-visites'           },
  { label: 'Ville d\'Hiver',           href: '/mes-visites/ville-hiver' },
  { label: 'Dune du Pilat au lever',   href: '/mes-visites/dune-lever-soleil' },
  { label: 'Balades en bateau',        href: '/mes-visites/balades-bateau' },
  { label: 'Privatisation',            href: '/privatisation'         },
  { label: 'Tarifs',                   href: '/tarifs'                },
]

const NAV_INFO = [
  { label: 'Votre guide',   href: '/votre-guide'  },
  { label: 'Actualités',    href: '/actualites'   },
  { label: 'Contact',       href: '/contact'      },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F1923] text-white/60">

      {/* ── Contenu principal ──────────────────────────────────────────── */}
      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Colonne 1 — Identité */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group w-fit" aria-label="Accueil">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/20 shrink-0">
                <Image
                  src="https://tourismearcachon.fr/wp-content/uploads/2021/02/cropped-Journee-Internationale-des-Guides-scaled-1.jpg"
                  alt="Myriam Madec"
                  fill
                  sizes="44px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-[var(--font-serif)] text-white text-lg italic leading-tight">
                  Myriam Madec
                </p>
                <p className="font-[var(--font-sans)] text-[9px] uppercase tracking-[2px] text-white/40 font-medium">
                  Guide Conférencière
                </p>
              </div>
            </Link>

            <p className="font-[var(--font-sans)] text-sm leading-relaxed text-white/50">
              Guide Interprète Nationale officielle du Bassin d'Arcachon depuis 1994.
              Visites en français, anglais et espagnol.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 mt-1">
              <a href="tel:+33680439678" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                <Phone size={13} className="text-white/30 shrink-0" />
                +33 6 80 43 96 78
              </a>
              <a href="mailto:contact@tourismearcachon.fr" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                <Mail size={13} className="text-white/30 shrink-0" />
                contact@tourismearcachon.fr
              </a>
              <span className="flex items-center gap-2.5 text-sm">
                <MapPin size={13} className="text-white/30 shrink-0" />
                Bassin d'Arcachon, Gironde
              </span>
            </div>
          </div>

          {/* Colonne 2 — Visites */}
          <div className="flex flex-col gap-5">
            <h3 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[2px] text-white/40">
              Visites
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_VISITES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[var(--font-sans)] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Informations */}
          <div className="flex flex-col gap-5">
            <h3 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[2px] text-white/40">
              Informations
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_INFO.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-[var(--font-sans)] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Réservation CTA */}
          <div className="flex flex-col gap-5">
            <h3 className="font-[var(--font-sans)] text-xs font-semibold uppercase tracking-[2px] text-white/40">
              Réserver une visite
            </h3>
            <p className="font-[var(--font-sans)] text-sm leading-relaxed text-white/50">
              Groupes, familles, scolaires — contactez Myriam pour composer votre visite sur mesure.
            </p>
            <Link
              href="/contact"
              className={[
                'inline-flex items-center justify-center px-5 py-3 mt-1',
                'rounded-[var(--radius-btn)]',
                'bg-[var(--primary)] text-white',
                'font-[var(--font-sans)] text-sm font-semibold',
                'hover:bg-[var(--primary-dark)] transition-colors duration-200',
                'w-fit',
              ].join(' ')}
            >
              Prendre contact
            </Link>
          </div>

        </div>
      </div>

      {/* ── Barre de bas de page ───────────────────────────────────────── */}
      <div className="border-t border-white/8">
        <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-[var(--font-sans)] text-xs text-white/30">
            © {new Date().getFullYear()} Myriam Madec — Guide Conférencière Officielle du Bassin d'Arcachon
          </p>
          <div className="flex items-center gap-4">
            <span className="font-[var(--font-sans)] text-[10px] uppercase tracking-[1.5px] text-white/20">
              Membre FNGIC
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="font-[var(--font-sans)] text-[10px] uppercase tracking-[1.5px] text-white/20">
              Guides de Nouvelle-Aquitaine
            </span>
          </div>
        </div>
      </div>

    </footer>
  )
}
