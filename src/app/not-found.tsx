import Link from 'next/link'

/**
 * Fallback 404 hors préfixe locale (rare : le middleware redirige normalement).
 * Le 404 localisé "vrai" est dans `src/app/[locale]/not-found.tsx`.
 *
 * Note : pas de <html>/<body> ici, ils sont fournis par le RootLayout.
 */
export default function RootNotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        background: '#fff',
        color: '#1A2530',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <p style={{ fontSize: 96, margin: 0, color: '#1B4F6B', fontWeight: 300 }}>404</p>
        <h1 style={{ fontSize: 28, margin: '8px 0 12px' }}>Page introuvable / Page not found</h1>
        <p style={{ color: '#5A6A75', margin: '0 0 24px' }}>
          La page demandée n&apos;existe pas. / The requested page does not exist.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#1B4F6B',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Accueil / Home
        </Link>
      </div>
    </main>
  )
}
