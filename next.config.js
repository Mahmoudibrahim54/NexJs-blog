/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "directus-production-655b.up.railway.app",
        protocol: "https",
      },
      {
        hostname: "localhost",
        protocol: "http",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  headers: () => [
    {
      source: "/:subcategory*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
