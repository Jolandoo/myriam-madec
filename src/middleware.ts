import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('studio_auth')
  const secret = process.env.STUDIO_SECRET

  if (!secret || cookie?.value !== secret) {
    const loginUrl = new URL('/studio-login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'],
}
