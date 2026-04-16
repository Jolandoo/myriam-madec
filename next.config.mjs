/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      {
        // Thumbnails cards — WordPress Myriam
        protocol: 'https',
        hostname: 'tourismearcachon.fr',
        pathname: '/wp-content/uploads/**',
      },
      {
        // Photos libres de droits — Wikimedia Commons
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/**',
      },
      {
        // Photos libres de droits — Pexels
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
}

export default nextConfig
