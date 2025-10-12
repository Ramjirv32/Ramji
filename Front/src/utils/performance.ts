/**
 * Performance Optimization Utilities
 * Collection of hooks and utilities for improving React app performance
 */

import { useCallback, useEffect, useRef, DependencyList } from 'react';

/**
 * Custom hook for debouncing values
 * Useful for search inputs, scroll handlers, etc.
 */
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for throttling function calls
 * Limits how often a function can be executed
 */
export const useThrottle = (callback: Function, delay: number = 500) => {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: any[]) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  );
};

/**
 * Custom hook for intersection observer
 * Detects when an element enters/exits the viewport
 */
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
): [(node: Element | null) => void, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [node, setNode] = useState<Element | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, options]);

  return [setNode, isIntersecting];
};

/**
 * Custom hook for optimized window resize handler
 * Uses requestAnimationFrame for better performance
 */
export const useOptimizedResize = (callback: () => void, deps: DependencyList = []) => {
  useEffect(() => {
    let ticking = false;

    const handleResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, deps);
};

/**
 * Custom hook for optimized scroll handler
 * Uses requestAnimationFrame and passive listeners
 */
export const useOptimizedScroll = (callback: () => void, deps: DependencyList = []) => {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, deps);
};

/**
 * Utility to preload images
 */
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = reject;
    });
  });

  return Promise.all(promises);
};

/**
 * Utility to prefetch routes for faster navigation
 */
export const prefetchRoute = (routePath: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'document';
  link.href = routePath;
  document.head.appendChild(link);
};

import { useState } from 'react';
