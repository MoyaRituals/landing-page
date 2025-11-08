// Google Analytics 4 Integration

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

/**
 * Initialize Google Analytics
 * Add this script tag to your layout or use a third-party package
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

/**
 * Track page view
 */
export function pageview(url: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

interface EventParams {
  action: string
  category: string
  label?: string
  value?: number
}

/**
 * Track custom event
 */
export function event({ action, category, label, value }: EventParams): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * Track CTA click (for A/B testing)
 */
export function trackCTAClick(variant: 'A' | 'B', location: string = 'hero'): void {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: `${location}_variant_${variant}`,
    value: 1,
  })
}

/**
 * Track form submission
 */
export function trackFormSubmit(variant: 'A' | 'B', success: boolean = true): void {
  event({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'conversion',
    label: `variant_${variant}`,
    value: success ? 1 : 0,
  })
}

/**
 * Track scroll depth (for engagement metrics)
 */
export function trackScrollDepth(percentage: 25 | 50 | 75 | 100): void {
  event({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  })
}
