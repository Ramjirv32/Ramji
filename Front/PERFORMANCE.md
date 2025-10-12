# Performance Optimization Guide

## Overview
This document outlines the performance optimizations implemented in the frontend application.

## Implemented Optimizations

### 1. Code Splitting & Lazy Loading
- **Lazy loading of route components**: All non-critical components are loaded on demand
- **Route-based code splitting**: Each route loads only necessary code
- **Suspense boundaries**: Smooth loading states for async components

### 2. Image Optimization
- **LazyImage component**: Custom component with intersection observer for lazy loading
- **Progressive image loading**: Blur effect while images load
- **Optimized image paths**: Assets organized in build output

### 3. Bundle Optimization
- **Manual chunk splitting**: Vendor libraries separated for better caching
  - React vendor: React, React DOM, React Router
  - Three.js vendor: Three, React Three Fiber, Drei
  - Animation vendor: Framer Motion, GSAP, AOS
  - UI vendor: Icons and UI components
- **Asset organization**: Images, fonts, and assets in separate directories
- **Console removal**: Console logs removed in production builds
- **Minification**: Terser minification with aggressive compression

### 4. Performance Utilities
New utilities in `src/utils/performance.ts`:
- `useDebounce`: Debounce values for search/input
- `useThrottle`: Throttle function calls
- `useIntersectionObserver`: Detect element visibility
- `useOptimizedResize`: Optimized window resize handler
- `useOptimizedScroll`: Optimized scroll handler
- `preloadImages`: Preload critical images
- `prefetchRoute`: Prefetch routes for faster navigation

### 5. React Optimizations
- **Memoization**: ScrollToTop component wrapped with React.memo
- **Suspense boundaries**: Multiple levels for better UX
- **Component lazy loading**: All route components lazy loaded

## Usage Examples

### Using LazyImage Component
```tsx
import LazyImage from '@/components/LazyImage';

<LazyImage 
  src="/path/to/image.jpg" 
  alt="Description"
  className="w-full h-auto"
/>
```

### Using Performance Hooks
```tsx
import { useDebounce, useThrottle, useIntersectionObserver } from '@/utils/performance';

// Debounce search input
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

// Throttle scroll handler
const handleScroll = useThrottle(() => {
  console.log('Scrolling...');
}, 200);

// Detect element visibility
const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
```

## Build Commands

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Analyze Bundle (Optional)
Install the visualizer plugin:
```bash
npm install -D rollup-plugin-visualizer
```

Then add to vite.config.ts and run build to generate stats.html

## Performance Metrics to Monitor

1. **First Contentful Paint (FCP)**: < 1.8s
2. **Largest Contentful Paint (LCP)**: < 2.5s
3. **Time to Interactive (TTI)**: < 3.8s
4. **Total Blocking Time (TBT)**: < 200ms
5. **Cumulative Layout Shift (CLS)**: < 0.1

## Best Practices

1. **Images**: 
   - Use WebP format when possible
   - Compress images before upload
   - Use appropriate dimensions

2. **Components**:
   - Lazy load heavy components
   - Use React.memo for components that re-render frequently
   - Implement proper key props in lists

3. **API Calls**:
   - Implement request caching
   - Use debouncing for search/filter operations
   - Batch API requests when possible

4. **Third-party Libraries**:
   - Audit bundle size regularly
   - Consider lighter alternatives
   - Load heavy libraries only when needed

## Next Steps for Further Optimization

1. **Image CDN**: Consider using a CDN for image delivery
2. **Service Worker**: Implement for offline support and caching
3. **HTTP/2 Server Push**: Configure server for resource pushing
4. **Preconnect/DNS-prefetch**: Add resource hints for external domains
5. **Web Vitals Monitoring**: Implement analytics to track performance metrics

## Monitoring

Use browser DevTools to monitor:
- Network tab: Check resource loading
- Performance tab: Analyze runtime performance
- Lighthouse: Run audits regularly
- React DevTools Profiler: Identify unnecessary re-renders
