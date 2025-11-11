import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  reactCompiler: true,
  
  // Enable modern output with minification
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Production optimization (SWC minification enabled by default in Next.js 16+)
  productionBrowserSourceMaps: false,
  
  // Cache control headers for better performance
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
      {
        source: '/((?!api|_next/static|_next/image).*)',
        headers: [
          {
            key: 'Cache-Control', 
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(assets|personal|h|com|Momo_Trust_Display|Montserrat)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
        ],
      },
      {
        source: '/non-critical.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
  minimumCacheTTL: 86400,
  dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      'react-icons/fa',
      'react-icons/si',
      'react-icons/tb',
      'react-icons/rx',
      'react-icons/io5',
      'aos'
    ],
  },
  
  // Turbopack configuration (replaces webpack)
  turbopack: {},
};

export default nextConfig;
