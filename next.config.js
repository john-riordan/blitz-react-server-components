/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.blitz.gg',
      },
    ],
  },
};

module.exports = nextConfig;
