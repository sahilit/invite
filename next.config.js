/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'assets.leapwallet.io',
        protocol: 'https'
      },
      {
        hostname: 'cloudflare-ipfs.com',
        protocol: 'https'
      }
    ]
  }
}

module.exports = nextConfig
