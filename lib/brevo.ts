// Brevo (formerly Sendinblue) API Integration

export interface SignupData {
  email: string
  name?: string
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
export async function submitToBrevo({ email, name = '' }: SignupData): Promise<any> {
  // Call Netlify serverless function instead of Brevo API directly
  // This keeps API keys secure on the server
  // Default to 'A' for backward compatibility with existing Brevo function
  const response = await fetch('/.netlify/functions/brevo-signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, ctaVariant: 'A' }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to submit to Brevo')
  }

  return response.json()
}

/**
 * Track conversion event
 */
export function trackConversion(): void {
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'signup', {
      event_category: 'conversion',
      value: 1,
    })
  }

  // Can also send to other analytics platforms here
}
