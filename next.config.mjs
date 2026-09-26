import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.SUPABASE_STORAGE_HOSTNAME,
      },
      {
        protocol: 'https',
        hostname: process.env.SUPABASE_S3_HOSTNAME,
      },
      {
        protocol: 'https',
        hostname: '**.netlify.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
