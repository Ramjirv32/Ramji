/**
 * Route Prefetching Configuration
 * Automatically prefetch routes when links are hovered or visible
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Routes to prefetch on hover/visibility
const PREFETCH_ROUTES = [
  '/certifications',
  '/project/1',
  '/project/2',
  '/project/3',
  '/project/4',
  '/project/5',
  '/research',
  '/internship/society',
  '/internship/oodser',
  '/internship/luxor-holiday',
];

/**
 * Hook to enable route prefetching on link hover
 * Usage: Add to your App component
 */
export const usePrefetchRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Prefetch routes when user hovers over links
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href) {
        const url = new URL(link.href);
        const path = url.pathname;
        
        if (PREFETCH_ROUTES.includes(path)) {
          // Prefetch the route
          const linkElement = document.createElement('link');
          linkElement.rel = 'prefetch';
          linkElement.as = 'document';
          linkElement.href = path;
          document.head.appendChild(linkElement);
        }
      }
    };

    document.addEventListener('mouseover', handleMouseEnter);
    return () => document.removeEventListener('mouseover', handleMouseEnter);
  }, []);

  // Prefetch next likely route based on current location
  useEffect(() => {
    const prefetchNextRoute = () => {
      let nextRoute: string | null = null;

      // Smart prefetching based on current route
      if (location.pathname === '/') {
        // On home page, prefetch first project
        nextRoute = '/project/1';
      } else if (location.pathname.startsWith('/project/')) {
        // On project page, prefetch next project
        const currentNum = parseInt(location.pathname.split('/').pop() || '1');
        if (currentNum < 5) {
          nextRoute = `/project/${currentNum + 1}`;
        }
      }

      if (nextRoute) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'prefetch';
        linkElement.as = 'document';
        linkElement.href = nextRoute;
        document.head.appendChild(linkElement);
      }
    };

    // Prefetch after a short delay
    const timer = setTimeout(prefetchNextRoute, 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);
};

/**
 * Preload critical images
 * Call this with your most important images
 */
export const preloadCriticalImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Preload critical fonts
 * Add this to your index.html or call in main.tsx
 */
export const preloadFonts = (fontUrls: string[]) => {
  fontUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

export default usePrefetchRoutes;
