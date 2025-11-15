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
 * Submit email signup to Brevo and send welcome email
 */
export async function submitToBrevo({ email, name = '', ctaVariant }: SignupData): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!apiKey) {
    throw new Error('Brevo API key not configured. Please add NEXT_PUBLIC_BREVO_API_KEY to your .env.local file.')
  }

  // Add contact to list
  const contactData: BrevoContact = {
    email,
    attributes: {
      FIRSTNAME: name || '',
      CTA_VARIANT: ctaVariant,
      SIGNUP_DATE: new Date().toISOString(),
    },
    listIds: [parseInt(process.env.NEXT_PUBLIC_BREVO_LIST_ID || '1')],
    updateEnabled: true, // Update if contact already exists
  }

  const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(contactData),
  })

  if (!contactResponse.ok) {
    const error = await contactResponse.json()
    throw new Error(error.message || 'Failed to submit to Brevo')
  }

  // Send welcome email using variant-specific template
  await sendWelcomeEmail({ email, name, ctaVariant })

  return contactResponse.json()
}

/**
 * Send welcome email using Brevo template
 */
async function sendWelcomeEmail({ email, name, ctaVariant }: SignupData): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY

  if (!apiKey) {
    console.error('Brevo API key not configured for sending emails')
    return
  }

  // Get template ID based on variant
  const templateId = ctaVariant === 'A'
    ? process.env.BREVO_TEMPLATE_WELCOME_A
    : process.env.BREVO_TEMPLATE_WELCOME_B

  if (!templateId) {
    console.error(`Welcome email template ID not configured for variant ${ctaVariant}`)
    return
  }

  const emailData = {
    to: [{ email, name: name || '' }],
    templateId: parseInt(templateId),
    params: {
      FIRSTNAME: name || '',
      CTA_VARIANT: ctaVariant,
    }
  }

  const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })

  if (!emailResponse.ok) {
    const error = await emailResponse.json()
    console.error('Failed to send welcome email:', error)
    // Don't throw - we don't want to fail signup if email fails
  }
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
