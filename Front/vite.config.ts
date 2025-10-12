import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion', 'gsap', 'aos'],
          'ui-vendor': ['lucide-react', 'react-icons'],
          // Split large component pages
          'project-pages': [
            './src/components/compoPages/Projects/Pro1.tsx',
            './src/components/compoPages/Projects/Pro2.tsx',
            './src/components/compoPages/Projects/Pro3.tsx',
            './src/components/compoPages/Projects/Pro4.tsx',
            './src/components/compoPages/Projects/Pro5.tsx',
          ],
          'internship-pages': [
            './src/components/compoPages/internships/Oodser.tsx',
            './src/components/compoPages/internships/Society.tsx',
            './src/components/compoPages/internships/LuxorHoliday.tsx',
            './src/components/compoPages/internships/Menagalme.tsx',
          ],
        },
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').slice(-1)[0] : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          const info = name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `img/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Enable minification (using esbuild, faster than terser)
    minify: 'esbuild',
    // Enable CSS code splitting
    cssCodeSplit: true,
    //
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
    exclude: ['@splinetool/react-spline'], // Heavy dependency, load on demand
  },
  // Performance optimizations
  server: {
    hmr: {
      overlay: true,
    },
  },
});