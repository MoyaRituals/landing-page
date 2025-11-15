// Brevo (formerly Sendinblue) API Integration
import type { CTAVariant } from './constants'

export interface SignupData {
  email: string
  name?: string
  ctaVariant: CTAVariant
}

interface BrevoContact {
  email: string
  attributes: {
    FIRSTNAME: string
    CTA_VARIANT: string
    SIGNUP_DATE: string
  }
  listIds: number[]
  updateEnabled: boolean
}

/**
 * Submit email signup via Netlify Function (secure, server-side)
 */
export async function submitToBrevo({ email, name = '', ctaVariant }: SignupData): Promise<any> {
  // Call Netlify serverless function instead of Brevo API directly
  // This keeps API keys secure on the server
  const response = await fetch('/.netlify/functions/brevo-signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, ctaVariant }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to submit to Brevo')
  }

  return response.json()
}

/**
 * Track conversion event (A/B test)
 */
export function trackConversion(variant: CTAVariant): void {
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'signup', {
      event_category: 'conversion',
      event_label: `CTA_${variant}`,
      value: 1,
    })
  }

  // Can also send to other analytics platforms here
}
