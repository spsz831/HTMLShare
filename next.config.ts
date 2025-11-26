import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 性能优化配置
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // 启用压缩
  compress: true,

  // 优化捆绑包
  webpack: (config, { isServer, dev }) => {
    // 生产环境优化
    if (!dev) {
      // 启用生产环境的优化
      if (!isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // 将React相关库分离到单独的chunk
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 20,
            },
            // 将其他vendor库分离
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              enforce: true,
            },
          },
        }
      }

      // 优化文件大小
      config.optimization.usedExports = true
      config.optimization.sideEffects = false

      // 启用压缩
      config.optimization.minimize = true
    }

    return config
  },

  // 缓存配置 - 开发环境
  ...(process.env.NODE_ENV === 'development' && {
    assetPrefix: '',
  }),

  // 生产环境缓存策略和安全配置
  ...(process.env.NODE_ENV === 'production' && {
    headers: async () => [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/snippets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600, stale-while-revalidate=86400',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
      {
        source: '/snippet/(.*)/view',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'",
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ],
  }),
}

export default nextConfig