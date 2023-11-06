/** @type {import('next').NextConfig} */
const nextConfig = {
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
