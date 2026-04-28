import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const rateLimit = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60_000
const RATE_LIMIT_MAX = 3

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateLimit.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW)
  if (timestamps.length >= RATE_LIMIT_MAX) return true
  timestamps.push(now)
  rateLimit.set(ip, timestamps)
  return false
}

export async function POST(request: Request) {
  try {
    const contactEmail = process.env.CONTACT_EMAIL
    if (!contactEmail) {
      return NextResponse.json(
        { error: 'Service indisponible.' },
        { status: 503 }
      )
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' },
        { status: 429 }
      )
    }

    const { nom, prenom, email, telephone, message } = await request.json()

    if (!nom || !prenom || !email || !message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants.' },
        { status: 400 }
      )
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      )
    }

    const safeNom = escapeHtml(String(nom))
    const safePrenom = escapeHtml(String(prenom))
    const safeEmail = escapeHtml(String(email))
    const safeTelephone = telephone ? escapeHtml(String(telephone)) : ''
    const safeMessage = escapeHtml(String(message))

    const { error } = await resend.emails.send({
      from: 'Arcachon Tourisme - Myriam Madec <onboarding@resend.dev>',
      to:   [contactEmail],
      replyTo: email,
      subject: `Nouveau message de ${safePrenom} ${safeNom} — tourismearcachon.fr`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f8f6;">
          <div style="background: #1B4F6B; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nouveau message depuis tourismearcachon.fr</h1>
          </div>
          <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #EEE9E1;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #5A6A75; font-size: 13px; width: 120px; vertical-align: top;">Nom</td>
                <td style="padding: 8px 0; color: #1A2530; font-size: 14px; font-weight: 600;">${safePrenom} ${safeNom}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #5A6A75; font-size: 13px; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; color: #1A2530; font-size: 14px;">
                  <a href="mailto:${safeEmail}" style="color: #1B4F6B;">${safeEmail}</a>
                </td>
              </tr>
              ${safeTelephone ? `
              <tr>
                <td style="padding: 8px 0; color: #5A6A75; font-size: 13px; vertical-align: top;">Téléphone</td>
                <td style="padding: 8px 0; color: #1A2530; font-size: 14px;">${safeTelephone}</td>
              </tr>` : ''}
              <tr>
                <td colspan="2" style="padding: 20px 0 8px; color: #5A6A75; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid #EEE9E1; margin-top: 16px;">Message</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 0; color: #1A2530; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</td>
              </tr>
            </table>
            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #EEE9E1;">
              <a href="mailto:${safeEmail}" style="display: inline-block; background: #1B4F6B; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                Répondre à ${safePrenom}
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #5A6A75; font-size: 12px; margin-top: 16px;">
            Envoyé depuis tourismearcachon.fr
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', JSON.stringify(error))
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi. Veuillez réessayer.', detail: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API contact error:', err)
    return NextResponse.json(
      { error: 'Erreur serveur.' },
      { status: 500 }
    )
  }
}
