# Email Template Workflow

Complete guide to managing, building, and deploying email templates for Moya Rituals using MJML and Brevo.

## Table of Contents

1. [Overview](#overview)
2. [Template Structure](#template-structure)
3. [Editing Templates](#editing-templates)
4. [Building Templates](#building-templates)
5. [Deploying to Brevo](#deploying-to-brevo)
6. [Testing](#testing)
7. [A/B Testing](#ab-testing)
8. [Troubleshooting](#troubleshooting)

---

## Overview

We use **MJML** (Mailjet Markup Language) to create responsive email templates that are:

- ✅ **Version Controlled** - Templates stored in Git
- ✅ **Responsive** - Mobile-friendly by default
- ✅ **Branded** - Aligned with Moya colors and fonts
- ✅ **Variant-Specific** - Separate templates for A/B test variants
- ✅ **Automated** - Deployed to Brevo via API

### Tech Stack

- **MJML** - Responsive email markup language
- **Brevo API** - Email delivery and template hosting
- **Node.js scripts** - Build and deployment automation

---

## Template Structure

```
emails/
├── welcome-variant-a.mjml    # Welcome email for Variant A (Waitlist)
├── welcome-variant-b.mjml    # Welcome email for Variant B (Reserve)
└── build/                    # Compiled HTML (auto-generated)
    ├── welcome-variant-a.html
    └── welcome-variant-b.html
```

### Template Metadata

Each template has associated metadata in `scripts/upload-email-templates.js`:

```javascript
{
  name: 'Welcome Email - Variant A (Waitlist)',
  subject: 'Welcome to Moya Rituals - Exclusive Launch Access',
  sender: {
    name: 'Moya Rituals',
    email: 'info@moyaskincare.com'
  },
  tag: 'welcome-a'
}
```

---

## Editing Templates

### Brand Colors

Our Moya brand colors are used throughout the templates:

```mjml
<mj-text color="#2B2B2B">       <!-- moya-charcoal (text) -->
<mj-text color="#A68C84">       <!-- moya-taupe (accent) -->
<mj-button background-color="#A68C84">  <!-- moya-taupe (CTA) -->
<mj-body background-color="#F2EDE9">    <!-- moya-warm-beige (background) -->
```

### Font Families

- **Headings**: `'Cormorant Garamond', Georgia, serif`
- **Body**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Template Sections

Each template includes:

1. **Header** - Logo text and tagline
2. **Main Content** - Welcome message and variant-specific copy
3. **Product Teaser** - MindSerum & Ritual Mist preview
4. **Social Links** - Instagram and TikTok
5. **Footer** - Branding and unsubscribe info

### Variant Differences

**Variant A (Waitlist)**:

- Focus on "exclusive launch access"
- Benefits: First access, launch pricing, updates
- CTA: "Follow Our Journey"

**Variant B (Reserve)**:

- Focus on "exclusive preorder pricing"
- Benefits: Preorder pricing (25% off), priority shipping
- Highlighted benefits box with border
- CTA: "Follow Our Journey"

---

## Building Templates

### Compile MJML to HTML

```bash
npm run emails:build
```

This will:

1. Read all `.mjml` files from `emails/` directory
2. Compile them to responsive HTML
3. Save output to `emails/build/` directory
4. Show any errors or warnings

**Output**:

```
📧 Building 2 email template(s)...

✅ welcome-variant-a.mjml → welcome-variant-a.html
✅ welcome-variant-b.mjml → welcome-variant-b.html

✨ Email templates built successfully!
```

### Preview Templates

After building, you can preview the HTML files locally:

1. Open `emails/build/welcome-variant-a.html` in a browser
2. Or use an email testing tool like [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com)

---

## Deploying to Brevo

### Prerequisites

1. **Brevo Account** - Sign up at [brevo.com](https://www.brevo.com)
2. **API Key** - Get from [Brevo Settings → API Keys](https://app.brevo.com/settings/keys/api)
3. **Environment Variable** - Add to `.env.local`:

   ```bash
   BREVO_API_KEY=your_api_key_here
   ```

4. **Verified Sender** - Verify `info@moyaskincare.com` in Brevo

### Deploy Templates

```bash
npm run emails:deploy
```

This will:

1. Build MJML templates to HTML
2. Upload/update templates in Brevo via API
3. Return template IDs

**Output**:

```
📧 Building 2 email template(s)...
✅ welcome-variant-a.mjml → welcome-variant-a.html
✅ welcome-variant-b.mjml → welcome-variant-b.html
✨ Email templates built successfully!

📤 Uploading email templates to Brevo...

✨ Creating new template: Welcome Email - Variant A (Waitlist)
✅ Created template ID: 1

✨ Creating new template: Welcome Email - Variant B (Reserve)
✅ Created template ID: 2

✨ All templates uploaded successfully!

📋 Template ID (add to your .env.local):

   BREVO_TEMPLATE_WELCOME_A=1
```

### Add Template IDs to Environment

Copy the template IDs to your `.env.local`:

```bash
BREVO_TEMPLATE_WELCOME_A=1
```

**Important**: Also add these to your Netlify environment variables when deploying!

---

## Testing

### Test Welcome Email Flow

1. **Local Development**:

   ```bash
   npm run dev
   ```

2. **Sign up with test email** on your landing page
3. **Check Brevo logs**:
   - Go to [Brevo → Transactional → Logs](https://app.brevo.com/log)
   - Verify email was sent
4. **Check inbox** for welcome email

### Send Test Email from Brevo

1. Go to [Brevo → Campaigns → Email Templates](https://app.brevo.com/camp/lists/template)
2. Find your template
3. Click "Preview & Test"
4. Send test email to yourself
5. Verify design and links

### Email Testing Tools

**Free**:

- [Litmus](https://litmus.com) - 7-day free trial
- [Email on Acid](https://www.emailonacid.com) - Free previews
- [Mail-Tester](https://www.mail-tester.com) - Spam score checker

**Test Across**:

- Gmail (desktop & mobile)
- Apple Mail (desktop & mobile)
- Outlook (desktop)
- Yahoo Mail
- Dark mode

---

## Welcome Email Flow

### How It Works

1. User signs up on landing page
2. Contact is added to Brevo with `CTA_VARIANT` attribute (set to 'A' for "Join the Waitlist")
3. Welcome email is sent using the welcome template: `BREVO_TEMPLATE_WELCOME_A`

### Measuring Results

Track which variant performs better by comparing:

**In Google Analytics**:

- Signup events by variant (`CTA_A` vs `CTA_B`)
- Click-through rates on social links

**In Brevo**:

1. Go to [Brevo → Statistics → Email](https://app.brevo.com/statistics/email)
2. Filter by template
3. Compare:
   - Open rates
   - Click rates (Instagram/TikTok links)
   - Unsubscribe rates

### Create New Variants

To add more variants:

1. **Create MJML template**:

   ```bash
   emails/welcome-variant-c.mjml
   ```

2. **Add metadata** to `scripts/upload-email-templates.js`:

   ```javascript
   'welcome-variant-c.html': {
     name: 'Welcome Email - Variant C (New Angle)',
     subject: 'Your Custom Subject',
     sender: { name: 'Moya Rituals', email: 'info@moyaskincare.com' },
     tag: 'welcome-c'
   }
   ```

3. **Deploy**:

   ```bash
   npm run emails:deploy
   ```

4. **Update code** to use new variant in `lib/brevo.ts`

---

## Troubleshooting

### Template Not Compiling

**Error**: `MJML compilation failed`

**Solutions**:

1. Check MJML syntax - missing closing tags?
2. Validate with [MJML Validator](https://mjml.io/try-it-live)
3. Check error message for line number
4. Ensure all `<mj-*>` tags are properly nested

### Template Not Uploading

**Error**: `Failed to upload template`

**Check**:

1. API key is correct in `.env.local`
2. API key has "Send emails" permission
3. Sender email `info@moyaskincare.com` is verified in Brevo
4. Template HTML was built first (`npm run emails:build`)

### Welcome Email Not Sending

**Possible causes**:

1. **Template ID not set**:
   - Check `.env.local` has `BREVO_TEMPLATE_WELCOME_A`
   - ID matches template in Brevo dashboard

2. **API Key issues**:
   - API key has "Send transactional emails" permission
   - API key is for correct Brevo account

3. **Sender not verified**:
   - Verify `info@moyaskincare.com` in [Brevo → Senders](https://app.brevo.com/senders)

4. **Check Brevo logs**:
   - [Brevo → Transactional → Logs](https://app.brevo.com/log)
   - Look for errors or bounces

### Email Goes to Spam

**Solutions**:

1. **Verify sender domain** (SPF, DKIM, DMARC):
   - Add SPF record to GoDaddy DNS
   - Enable DKIM in Brevo settings

2. **Authenticate domain**:
   - [Brevo → Senders → Domains](https://app.brevo.com/senders/domain)
   - Follow authentication steps

3. **Avoid spam triggers**:
   - Don't use all caps in subject
   - Avoid words like "FREE", "URGENT"
   - Include physical address in footer
   - Add unsubscribe link

4. **Warm up sending**:
   - Start with low volume (10-20/day)
   - Gradually increase over 2 weeks
   - Builds sender reputation

---

## Workflow Commands

### Quick Reference

```bash
# Build templates only (compile MJML to HTML)
npm run emails:build

# Upload templates to Brevo only (requires build first)
npm run emails:upload

# Build AND upload (recommended)
npm run emails:deploy
```

### When to Run

**Run `npm run emails:deploy` when**:

- You edit any `.mjml` template
- You add new templates
- You update colors, copy, or design
- Before deploying to production

**Don't need to run if**:

- Only code changes (no email template changes)
- Only updating website content

---

## Best Practices

### Email Design

1. **Keep it simple** - Focus on one CTA per email
2. **Mobile-first** - 60%+ opens are mobile
3. **Test links** - Verify all links work
4. **Alt text** - Add for images (if you add any)
5. **Accessible colors** - Ensure contrast ratios

### Template Management

1. **Version control** - Commit template changes
2. **Test before deploy** - Send test email to yourself
3. **Document changes** - Note what you changed in commits
4. **Backup IDs** - Save template IDs in `.env.local`

### A/B Testing

1. **One variable** - Test one thing at a time
2. **Measure properly** - Define success metrics first
3. **Sufficient sample** - Wait for 100+ signups per variant
4. **Statistical significance** - Use A/B test calculator

---

## Resources

- **MJML Documentation**: [mjml.io/documentation](https://mjml.io/documentation)
- **MJML Try It Live**: [mjml.io/try-it-live](https://mjml.io/try-it-live)
- **Brevo API Docs**: [developers.brevo.com](https://developers.brevo.com)
- **Brevo Templates**: [app.brevo.com/camp/lists/template](https://app.brevo.com/camp/lists/template)
- **Email Design Guide**: [reallygoodemails.com](https://reallygoodemails.com)

---

## Next Steps

1. **Set up Brevo account** - Get API key
2. **Verify sender email** - `info@moyaskincare.com`
3. **Deploy templates** - `npm run emails:deploy`
4. **Add template IDs** - Update `.env.local`
5. **Test signup flow** - Verify welcome email sends
6. **Monitor metrics** - Track A/B test results

---

## Questions?

Need help with email templates? Check:

1. MJML syntax errors in build output
2. Brevo API errors in upload output
3. Template IDs in Brevo dashboard
4. Transactional logs in Brevo

Contact: info@moyaskincare.com
