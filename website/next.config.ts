import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
} satisfies NextConfig

export default nextConfig
