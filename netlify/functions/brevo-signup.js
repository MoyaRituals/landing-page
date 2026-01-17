// Determine allowed origin for CORS
function getAllowedOrigin(origin) {
  // Production domain
  const PRODUCTION_DOMAIN = 'https://moyaskincare.com'

  // If no origin header, it's a same-origin request (shouldn't happen with CORS, but be safe)
  if (!origin) {
    return PRODUCTION_DOMAIN
  }

  // Check if it's a localhost dev origin (any port)
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    return origin // Allow the specific dev origin (with port)
  }

  // Check if it's the production domain (with or without www)
  if (origin === PRODUCTION_DOMAIN ||
      origin === 'https://www.moyaskincare.com' ||
      origin === 'http://moyaskincare.com' ||
      origin === 'http://www.moyaskincare.com') {
    return PRODUCTION_DOMAIN
  }

  // Default: reject (don't allow unknown origins)
  // Return null to indicate origin should be rejected
  return null
}

exports.handler = async (event, context) => {
  const origin = event.headers.origin || event.headers.Origin
  const allowedOrigin = getAllowedOrigin(origin)

  // If origin is provided but not allowed, reject the request
  if (origin && allowedOrigin === null) {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Origin not allowed' })
    }
  }

  // Build CORS headers
  // If no origin (same-origin request), we don't need CORS, but include headers for consistency
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin || 'https://moyaskincare.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle CORS preflight (OPTIONS) requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'CORS preflight' })
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
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
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    }
  }

  const { email, name = '', ctaVariant = 'A' } = body

  // Validate inputs
  if (!email) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Email is required' })
    }
  }

  // Default to 'A' for backward compatibility
  const variant = ctaVariant || 'A'

  // Get environment variables
  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID
  const templateId = process.env.BREVO_TEMPLATE_WELCOME_A


  if (!apiKey || !listId) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Server configuration error' })
    }
  }

  try {
    // Add contact to Brevo
    const contactData = {
      email,
      attributes: {
        FIRSTNAME: name || '',
        CTA_VARIANT: variant,
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
      return {
        statusCode: contactResponse.status,
        headers: corsHeaders,
        body: JSON.stringify({ error: error.message || 'Failed to add contact to Brevo' })
      }
    }

    // Check if this is a new contact
    const isNewContact = contactResponse.status === 201

    // Only send welcome email for new contacts (not updates)
    if (isNewContact) {
      const recipientName = (name || '').trim() || email

      if (templateId) {
        const emailData = {
          to: [{ email, name: recipientName }],
          templateId: parseInt(templateId),
          params: {
            FIRSTNAME: (name || '').trim(),
            CTA_VARIANT: variant,
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
          // Don't fail the request if email fails - contact was still added
        }
      }
    }

    // Return success
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: isNewContact ? 'Contact added and welcome email sent' : 'Contact updated',
        isNewContact
      })
    }

  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}