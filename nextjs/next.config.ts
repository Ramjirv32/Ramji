import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  reactCompiler: true,
  
  // Enable modern output with minification
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Production optimization (SWC minification enabled by default in Next.js 16+)
  productionBrowserSourceMaps: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
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
