/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
    },
    images: {
      unoptimized: process.env.UNOPTIMIZE_IMAGES ? Boolean(process.env.UNOPTIMIZE_IMAGES) : false,
      formats: ['image/webp'],
      minimumCacheTTL: 2678400, // 31 days
      remotePatterns: [
        {
          protocol: process.env.MEDIA_PROTOCOL,
          hostname: process.env.MEDIA_HOSTNAME,
          port: process.env.MEDIA_PORT,
        },
      ],
    },
    publicRuntimeConfig: {
      buildDate: new Date().toISOString(),
    },
  };

module.exports = nextConfig
