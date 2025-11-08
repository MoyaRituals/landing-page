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
 * Submit email signup to Brevo
 */
export async function submitToBrevo({ email, name = '', ctaVariant }: SignupData): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!apiKey) {
    throw new Error('Brevo API key not configured. Please add NEXT_PUBLIC_BREVO_API_KEY to your .env.local file.')
  }

  const contactData: BrevoContact = {
    email,
    attributes: {
      FIRSTNAME: name || '',
      CTA_VARIANT: ctaVariant,
      SIGNUP_DATE: new Date().toISOString(),
    },
    listIds: [parseInt(process.env.NEXT_PUBLIC_BREVO_LIST_ID || '1')], // Update with your list ID
    updateEnabled: true, // Update if contact already exists
  }

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(contactData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to submit to Brevo')
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
