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
