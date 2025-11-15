/**
 * Netlify Serverless Function - Brevo Signup
 *
 * Handles email signups securely by keeping API keys server-side.
 * Adds contact to Brevo and sends variant-specific welcome email.
 *
 * Environment variables required (set in Netlify dashboard):
 *   - BREVO_API_KEY
 *   - BREVO_LIST_ID
 *   - BREVO_TEMPLATE_WELCOME_A
 *   - BREVO_TEMPLATE_WELCOME_B
 */

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  // Parse request body
  let body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    }
  }

  const { email, name = '', ctaVariant } = body

  // Validate inputs
  if (!email || !ctaVariant) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Email and ctaVariant are required' })
    }
  }

  if (ctaVariant !== 'A' && ctaVariant !== 'B') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'ctaVariant must be "A" or "B"' })
    }
  }

  // Get environment variables
  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID
  const templateIdA = process.env.BREVO_TEMPLATE_WELCOME_A
  const templateIdB = process.env.BREVO_TEMPLATE_WELCOME_B

  if (!apiKey || !listId) {
    console.error('Missing required environment variables')
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    }
  }

  try {
    // Add contact to Brevo
    const contactData = {
      email,
      attributes: {
        FIRSTNAME: name || '',
        CTA_VARIANT: ctaVariant,
        SIGNUP_DATE: new Date().toISOString(),
      },
      listIds: [parseInt(listId)],
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
      console.error('Brevo contact error:', error)
      return {
        statusCode: contactResponse.status,
        body: JSON.stringify({ error: error.message || 'Failed to add contact to Brevo' })
      }
    }

    // Check if this is a new contact
    const isNewContact = contactResponse.status === 201

    // Only send welcome email for new contacts (not updates)
    if (isNewContact) {
      const templateId = ctaVariant === 'A' ? templateIdA : templateIdB

      if (templateId) {
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
          // Don't fail the request if email fails - contact was still added
        }
      }
    }

    // Return success
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Adjust in production
      },
      body: JSON.stringify({
        success: true,
        message: isNewContact ? 'Contact added and welcome email sent' : 'Contact updated',
        isNewContact
      })
    }

  } catch (error) {
    console.error('Unexpected error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}
