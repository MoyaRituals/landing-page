#!/usr/bin/env node

/**
 * Upload Email Templates to Brevo
 *
 * Uploads compiled HTML email templates to Brevo via their API.
 * Creates new templates or updates existing ones based on template name.
 *
 * Requirements:
 *   - NEXT_PUBLIC_BREVO_API_KEY environment variable must be set in .env.local
 *   - Email templates must be built first (run build-email-templates.js)
 *
 * Usage:
 *   node scripts/upload-email-templates.js
 *
 * Or use the combined command:
 *   npm run emails:deploy
 */

require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')

const BUILD_DIR = path.join(__dirname, '../emails/build')
const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY

// Template metadata
const TEMPLATES = {
  'welcome-variant-a.html': {
    name: 'Welcome Email - Variant A (Waitlist)',
    subject: 'Welcome to Moya Rituals - Exclusive Launch Access',
    sender: {
      name: 'Moya Rituals',
      email: 'info@moyaskincare.com'
    },
    tag: 'welcome-a'
  },
  'welcome-variant-b.html': {
    name: 'Welcome Email - Variant B (Reserve)',
    subject: 'Your Spot is Reserved - Exclusive Preorder Access',
    sender: {
      name: 'Moya Rituals',
      email: 'info@moyaskincare.com'
    },
    tag: 'welcome-b'
  }
}

async function uploadTemplate(htmlFile, metadata) {
  const htmlPath = path.join(BUILD_DIR, htmlFile)

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`HTML file not found: ${htmlPath}`)
  }

  const htmlContent = fs.readFileSync(htmlPath, 'utf8')

  // First, check if template already exists
  const listResponse = await fetch('https://api.brevo.com/v3/smtp/templates', {
    method: 'GET',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json'
    }
  })

  if (!listResponse.ok) {
    throw new Error(`Failed to list templates: ${listResponse.statusText}`)
  }

  const listData = await listResponse.json()
  const existingTemplate = listData.templates?.find(t => t.name === metadata.name)

  if (existingTemplate) {
    // Update existing template
    console.log(`📝 Updating existing template: ${metadata.name} (ID: ${existingTemplate.id})`)

    const updateResponse = await fetch(`https://api.brevo.com/v3/smtp/templates/${existingTemplate.id}`, {
      method: 'PUT',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        templateName: metadata.name,
        subject: metadata.subject,
        sender: metadata.sender,
        htmlContent: htmlContent,
        tag: metadata.tag,
        isActive: true
      })
    })

    if (!updateResponse.ok) {
      const error = await updateResponse.text()
      throw new Error(`Failed to update template: ${error}`)
    }

    return { id: existingTemplate.id, action: 'updated' }
  } else {
    // Create new template
    console.log(`✨ Creating new template: ${metadata.name}`)

    const createResponse = await fetch('https://api.brevo.com/v3/smtp/templates', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        templateName: metadata.name,
        subject: metadata.subject,
        sender: metadata.sender,
        htmlContent: htmlContent,
        tag: metadata.tag,
        isActive: true
      })
    })

    if (!createResponse.ok) {
      const error = await createResponse.text()
      throw new Error(`Failed to create template: ${error}`)
    }

    const createData = await createResponse.json()
    return { id: createData.id, action: 'created' }
  }
}

async function main() {
  console.log('\n📤 Uploading email templates to Brevo...\n')

  // Validate API key
  if (!BREVO_API_KEY) {
    console.error('❌ Error: NEXT_PUBLIC_BREVO_API_KEY environment variable not set')
    console.error('   Please set it in your .env.local file')
    console.error('   Example: NEXT_PUBLIC_BREVO_API_KEY=your_api_key_here')
    process.exit(1)
  }

  // Validate build directory
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Error: Build directory not found')
    console.error('   Please run: node scripts/build-email-templates.js')
    process.exit(1)
  }

  const results = []

  for (const [htmlFile, metadata] of Object.entries(TEMPLATES)) {
    try {
      const result = await uploadTemplate(htmlFile, metadata)
      results.push({ ...result, file: htmlFile, metadata })
      console.log(`✅ ${result.action === 'created' ? 'Created' : 'Updated'} template ID: ${result.id}\n`)
    } catch (error) {
      console.error(`❌ Failed to upload ${htmlFile}:`)
      console.error(`   ${error.message}\n`)
      process.exit(1)
    }
  }

  console.log('✨ All templates uploaded successfully!\n')
  console.log('📋 Template IDs (add these to your .env.local):')
  console.log('')

  results.forEach(result => {
    const envVarName = result.metadata.tag.toUpperCase().replace(/-/g, '_')
    console.log(`   BREVO_TEMPLATE_${envVarName}=${result.id}`)
  })

  console.log('')
}

main().catch(error => {
  console.error('\n❌ Unexpected error:', error)
  process.exit(1)
})
