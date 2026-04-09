/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Images du site WordPress existant — à remplacer par /images/... locales
        // une fois que Myriam aura exporté ses photos
        protocol: 'https',
        hostname: 'tourismearcachon.fr',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig
