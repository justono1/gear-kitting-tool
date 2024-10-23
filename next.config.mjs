import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;  // Disable webpack cache in development mode
    }
    return config;
  },
}

export default withPayload(nextConfig)