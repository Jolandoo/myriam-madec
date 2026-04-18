'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  return (
    <main className="bg-[var(--white)]">
      <PageHero
        eyebrow="Contact"
        title="Me contacter"
        description="Pour réserver une visite, obtenir un devis ou simplement poser une question — je réponds sous 24h."
        image="https://upload.wikimedia.org/wikipedia/commons/6/6f/Aerial_view_of_Bassin_d%27Arcachon_and_Dune_du_Pilat_%281%29.JPG"
        imageAlt="Vue aérienne du Bassin d'Arcachon et de la Dune du Pilat"
      />

      <div className="w-full max-w-[1280px] mx-auto px-10 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* ── Formulaire ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center">
                  <Send size={24} className="text-[var(--primary)]" />
                </div>
                <h2 className="font-[var(--font-serif)] text-[var(--text-primary)] text-2xl">
                  Message envoyé !
                </h2>
                <p className="font-[var(--font-sans)] text-[var(--text-muted)] max-w-sm">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Nom" name="nom" value={form.nom} onChange={handleChange} required />
                  <Field label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} required />
                </div>
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                <Field label="Téléphone" name="telephone" type="tel" placeholder="+33 6 00 00 00 00" value={form.telephone} onChange={handleChange} />
                <div className="flex flex-col gap-1.5">
                  <label className="font-[var(--font-sans)] text-sm font-medium text-[var(--text-primary)]">
                    Message <span className="text-[var(--primary)]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Décrivez votre projet de visite — type, nombre de personnes, date souhaitée..."
                    className={[
                      'w-full px-4 py-3 rounded-xl resize-none',
                      'border border-[var(--gray-100)] bg-[var(--off-white)]',
                      'font-[var(--font-sans)] text-sm text-[var(--text-primary)]',
                      'placeholder:text-[var(--text-muted)]',
                      'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
                      'transition-all duration-200',
                    ].join(' ')}
                  />
                </div>
                {status === 'error' && (
                  <p className="font-[var(--font-sans)] text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                    Une erreur est survenue. Veuillez réessayer ou me contacter directement par téléphone.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={[
                    'flex items-center justify-center gap-2 px-8 py-3.5 rounded-[var(--radius-btn)]',
                    'bg-[var(--primary)] text-white',
                    'font-[var(--font-sans)] font-semibold text-sm',
                    'hover:bg-[var(--primary-dark)] transition-colors duration-200',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                  ].join(' ')}
                >
                  <Send size={15} />
                  {status === 'sending' ? 'Envoi…' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>

          {/* ── Infos contact ──────────────────────────────────────────────── */}
          <aside className="lg:col-span-2 flex flex-col gap-6">
            <div
              className="p-6 rounded-[var(--radius-card)] bg-[var(--primary-light)] flex flex-col gap-5"
            >
              <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-xl">
                Myriam Madec
              </h3>
              <p className="font-[var(--font-sans)] text-[var(--text-muted)] text-sm leading-relaxed">
                Guide Conférencière Officielle du Bassin d'Arcachon · Visites en français, anglais et espagnol.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+33680439678"
                  className="flex items-center gap-3 text-sm font-[var(--font-sans)] text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-[var(--primary)]" />
                  </div>
                  +33 6 80 43 96 78
                </a>
                <a
                  href="mailto:contact@tourismearcachon.fr"
                  className="flex items-center gap-3 text-sm font-[var(--font-sans)] text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-[var(--primary)]" />
                  </div>
                  contact@tourismearcachon.fr
                </a>
                <span className="flex items-center gap-3 text-sm font-[var(--font-sans)] text-[var(--text-muted)]">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-[var(--primary)]" />
                  </div>
                  Bassin d'Arcachon, Gironde
                </span>
              </div>
            </div>

            {/* Disponibilités */}
            <div className="p-6 rounded-[var(--radius-card)] border border-[var(--gray-100)]" style={{ boxShadow: 'var(--shadow-card)' }}>
              <h3 className="font-[var(--font-serif)] text-[var(--text-primary)] text-lg mb-3">Visites disponibles</h3>
              <ul className="flex flex-col gap-2 font-[var(--font-sans)] text-sm text-[var(--text-muted)]">
                <li>· Toute l'année sur réservation</li>
                <li>· En semaine et week-end</li>
                <li>· Groupes dès 10 personnes</li>
                <li>· Familles et particuliers bienvenus</li>
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}

/* ── Composant Field réutilisable ───────────────────────────────────────────── */
function Field({
  label, name, value, onChange, type = 'text', placeholder, required,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-[var(--font-sans)] text-sm font-medium text-[var(--text-primary)]">
        {label} {required && <span className="text-[var(--primary)]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={[
          'w-full px-4 py-3 rounded-xl',
          'border border-[var(--gray-100)] bg-[var(--off-white)]',
          'font-[var(--font-sans)] text-sm text-[var(--text-primary)]',
          'placeholder:text-[var(--text-muted)]',
          'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
          'transition-all duration-200',
        ].join(' ')}
      />
    </div>
  )
}
