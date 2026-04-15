/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tourismearcachon.fr',
        pathname: '/wp-content/uploads/**',
      },
      {
        // Photos libres de droits Wikimedia Commons
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/**',
      },
    ],
  },
}

export default nextConfig
