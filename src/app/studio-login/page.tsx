import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHmac, timingSafeEqual, randomUUID } from 'crypto'

function signToken(token: string, secret: string): string {
  return createHmac('sha256', secret).update(token).digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

async function login(formData: FormData) {
  'use server'
  const password = formData.get('password') as string
  const secret   = process.env.STUDIO_SECRET

  if (secret && safeEqual(password, secret)) {
    const token = randomUUID()
    const signed = `${token}.${signToken(token, secret)}`
    const cookieStore = await cookies()
    cookieStore.set('studio_auth', signed, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   60 * 60 * 24 * 30,
      path:     '/',
    })
    redirect('/studio')
  }

  redirect('/studio-login?error=1')
}

export default function StudioLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gray-50)]">
      <div className="w-full max-w-sm px-8 py-10 bg-white rounded-2xl border border-[var(--gray-100)] shadow-sm flex flex-col gap-6">

        <div className="flex flex-col gap-1 text-center">
          <h1 className="font-[var(--font-serif)] text-2xl text-[var(--text-primary)]">
            Administration
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Accès réservé
          </p>
        </div>

        <form action={login} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            autoFocus
            className="w-full px-4 py-3 rounded-lg border border-[var(--gray-100)] bg-[var(--gray-50)] text-[var(--text-primary)] text-sm outline-none focus:border-[var(--primary)] transition-colors"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            Accéder au Studio
          </button>
        </form>

        {/* error shown after redirect */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (new URLSearchParams(location.search).get('error')) {
                document.querySelector('input').placeholder = 'Mot de passe incorrect';
                document.querySelector('input').classList.add('border-red-400');
              }
            `,
          }}
        />
      </div>
    </div>
  )
}
