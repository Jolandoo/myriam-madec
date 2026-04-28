import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

async function hmacHex(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function verifyToken(cookie: string, secret: string): Promise<boolean> {
  const dot = cookie.indexOf('.')
  if (dot === -1) return false
  const token = cookie.slice(0, dot)
  const sig = cookie.slice(dot + 1)
  const expected = await hmacHex(secret, token)
  if (sig.length !== expected.length) return false
  let match = 0
  for (let i = 0; i < sig.length; i++) match |= sig.charCodeAt(i) ^ expected.charCodeAt(i)
  return match === 0
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/studio')) {
    const cookie = req.cookies.get('studio_auth')
    const secret = process.env.STUDIO_SECRET

    if (!secret || !cookie?.value || !(await verifyToken(cookie.value, secret))) {
      const loginUrl = new URL('/studio-login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: [
    '/studio/:path*',
    '/((?!api|_next|_vercel|studio-login|.*\\..*).*)',
  ],
}
