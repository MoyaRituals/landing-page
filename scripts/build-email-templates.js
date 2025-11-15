#!/usr/bin/env node

/**
 * Build Email Templates
 *
 * Compiles MJML email templates to HTML and saves them to the build directory.
 * Run this script before deploying email templates to Brevo.
 *
 * Usage:
 *   node scripts/build-email-templates.js
 */

const fs = require('fs')
const path = require('path')
const mjml2html = require('mjml')

const EMAILS_DIR = path.join(__dirname, '../emails')
const BUILD_DIR = path.join(__dirname, '../emails/build')

// Ensure build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true })
}

// Get all MJML files
const mjmlFiles = fs.readdirSync(EMAILS_DIR).filter(file => file.endsWith('.mjml'))

console.log(`\n📧 Building ${mjmlFiles.length} email template(s)...\n`)

mjmlFiles.forEach(file => {
  const mjmlPath = path.join(EMAILS_DIR, file)
  const htmlFileName = file.replace('.mjml', '.html')
  const htmlPath = path.join(BUILD_DIR, htmlFileName)

  // Read MJML file
  const mjmlContent = fs.readFileSync(mjmlPath, 'utf8')

  // Compile to HTML
  const result = mjml2html(mjmlContent, {
    validationLevel: 'strict',
    filePath: mjmlPath
  })

  // Check for errors
  if (result.errors.length > 0) {
    console.error(`❌ Error compiling ${file}:`)
    result.errors.forEach(error => {
      console.error(`   ${error.formattedMessage}`)
    })
    process.exit(1)
  }

  // Save HTML file
  fs.writeFileSync(htmlPath, result.html)

  console.log(`✅ ${file} → ${htmlFileName}`)

  // Show warnings if any
  if (result.warnings && result.warnings.length > 0) {
    console.log(`   ⚠️  ${result.warnings.length} warning(s):`)
    result.warnings.forEach(warning => {
      console.log(`      ${warning.formattedMessage}`)
    })
  }
})

console.log(`\n✨ Email templates built successfully!\n`)
console.log(`📁 Output: ${BUILD_DIR}\n`)
