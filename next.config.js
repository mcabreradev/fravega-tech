/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.cache = false
    return config
  },
  pageExtensions: ['ts', 'tsx'],
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig
