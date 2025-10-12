/**
 * Web Vitals Reporter
 * Monitors and reports Core Web Vitals for performance tracking
 */

// Core Web Vitals thresholds
const THRESHOLDS = {
  FCP: 1800, // First Contentful Paint (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  TTFB: 800, // Time to First Byte (ms)
};

interface MetricData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
}

// Report metric to console (can be extended to send to analytics)
const reportMetric = (metric: MetricData) => {
  const { name, value, rating } = metric;
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  
  console.group(`⚡ ${name}`);
  console.log(`Value: ${value.toFixed(2)}${name === 'CLS' ? '' : 'ms'}`);
  console.log(`Rating: ${rating}`);
  if (threshold) {
    console.log(`Threshold: ${threshold}${name === 'CLS' ? '' : 'ms'}`);
  }
  console.groupEnd();

  // You can send this data to your analytics service
  // Example: sendToAnalytics(metric);
};

// Get rating based on value and thresholds
const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (name === 'CLS') {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  if (value <= threshold) return 'good';
  if (value <= threshold * 1.5) return 'needs-improvement';
  return 'poor';
};

// Measure First Contentful Paint (FCP)
const measureFCP = () => {
  try {
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    if (fcpEntry) {
      const value = fcpEntry.startTime;
      reportMetric({
        name: 'FCP',
        value,
        rating: getRating('FCP', value),
      });
    }
  } catch (error) {
    console.error('Error measuring FCP:', error);
  }
};

// Measure Largest Contentful Paint (LCP)
const measureLCP = () => {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const value = lastEntry.startTime;
      
      reportMetric({
        name: 'LCP',
        value,
        rating: getRating('LCP', value),
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (error) {
    console.error('Error measuring LCP:', error);
  }
};

// Measure Cumulative Layout Shift (CLS)
const measureCLS = () => {
  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      
      reportMetric({
        name: 'CLS',
        value: clsValue,
        rating: getRating('CLS', clsValue),
      });
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.error('Error measuring CLS:', error);
  }
};

// Measure Time to First Byte (TTFB)
const measureTTFB = () => {
  try {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const value = navigationEntry.responseStart - navigationEntry.requestStart;
      reportMetric({
        name: 'TTFB',
        value,
        rating: getRating('TTFB', value),
      });
    }
  } catch (error) {
    console.error('Error measuring TTFB:', error);
  }
};

// Measure First Input Delay (FID)
const measureFID = () => {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        const value = fidEntry.processingStart - fidEntry.startTime;
        reportMetric({
          name: 'FID',
          value,
          rating: getRating('FID', value),
        });
      }
    });
    
    observer.observe({ entryTypes: ['first-input'] });
  } catch (error) {
    console.error('Error measuring FID:', error);
  }
};

// Initialize all measurements
export const initWebVitals = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Wait for page load
  if (document.readyState === 'complete') {
    measureTTFB();
    measureFCP();
    measureLCP();
    measureCLS();
    measureFID();
  } else {
    window.addEventListener('load', () => {
      measureTTFB();
      measureFCP();
      measureLCP();
      measureCLS();
      measureFID();
    });
  }

  // Log bundle size info
  console.group('📦 Bundle Info');
  console.log('Check Network tab for detailed bundle sizes');
  console.log('Run: npm run build to see production bundle analysis');
  console.groupEnd();
};

// Export for use in main.tsx
export default initWebVitals;
