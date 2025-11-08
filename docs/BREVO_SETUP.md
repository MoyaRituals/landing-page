# Brevo Setup Guide

Complete guide to setting up Brevo (formerly Sendinblue) for email marketing and waitlist management.

## Table of Contents
1. [Create Brevo Account](#create-brevo-account)
2. [Get API Key](#get-api-key)
3. [Create Contact List](#create-contact-list)
4. [Configure Environment Variables](#configure-environment-variables)
5. [Test Integration](#test-integration)
6. [Managing Contacts](#managing-contacts)
7. [Email Campaigns](#email-campaigns)

---

## Create Brevo Account

### Step 1: Sign Up

1. Go to [https://www.brevo.com](https://www.brevo.com)
2. Click "Sign up free"
3. Fill in:
   - Email: Your business email (or use ImprovMX forwarding address)
   - Password: Strong password
   - Company name: "Nova Rituals"
4. Verify email address (check inbox)

### Step 2: Complete Profile

1. Business type: "E-commerce"
2. Number of contacts: "< 1,000"
3. Use case: "Send marketing emails"
4. Skip phone verification for now

### Free Tier Limits

- ✅ **Unlimited contacts** (no limit!)
- ✅ **300 emails/day** (9,000/month)
- ✅ **Email templates**
- ✅ **Contact management**
- ✅ **Basic automation**
- ❌ No SMS (upgrade needed)
- ❌ No phone support

Perfect for MVP validation!

---

## Get API Key

### Step 1: Navigate to API Keys

1. Log in to [Brevo Dashboard](https://app.brevo.com)
2. Click your name (top right) → "SMTP & API"
3. Or go directly to: https://app.brevo.com/settings/keys/api

### Step 2: Create API Key

1. Click "Create a new API key"
2. Name it: "Landing Page"
3. Click "Generate"
4. **Copy the key immediately** (looks like: `xkeysib-xxxxx...`)
5. Save it securely (you can't view it again!)

### API Key Types

Brevo has two types:
- **API v3 key** (what we're using) - For REST API access
- **SMTP key** - For sending email via SMTP (not needed)

We use the **API v3 key**.

---

## Create Contact List

### Step 1: Create List

1. Go to "Contacts" → "Lists"
2. Click "Create a list"
3. Name: "Landing Page Waitlist"
4. Folder: Create new folder "Nova Rituals" (optional)
5. Click "Create"

### Step 2: Get List ID

1. Click on "Landing Page Waitlist"
2. Look at the URL: `https://app.brevo.com/contact/list/id/123`
3. The number at the end is your **List ID** (e.g., `123`)
4. Save this number (you'll need it for env vars)

### Step 3: Add Custom Attributes (Optional but Recommended)

1. Go to "Contacts" → "Settings" → "Contact attributes"
2. Click "Create an attribute"
3. Add these custom attributes:

| Attribute Name | Type | Category |
|----------------|------|----------|
| `CTA_VARIANT` | Text | Normal |
| `SIGNUP_DATE` | Date | Normal |

These let you track which A/B test variant each contact came from.

---

## Configure Environment Variables

### Step 1: Create `.env.local`

In your project root, create `.env.local`:

```bash
cp .env.example .env.local
```

### Step 2: Add Brevo Credentials

Edit `.env.local`:

```bash
# Replace with your actual values
NEXT_PUBLIC_BREVO_API_KEY=xkeysib-abc123xyz456...
NEXT_PUBLIC_BREVO_LIST_ID=123
```

**Important**:
- `NEXT_PUBLIC_` prefix is required (makes it available client-side)
- Never commit `.env.local` to git (it's in `.gitignore`)

### Step 3: Add to Netlify (for Production)

See [DEPLOYMENT.md](DEPLOYMENT.md#environment-variables) for adding these to Netlify.

---

## Test Integration

### Step 1: Test Locally

1. Start dev server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Scroll to "Join the Waitlist"
4. Submit your email
5. Check for success message

### Step 2: Verify in Brevo

1. Go to Brevo → "Contacts" → "Lists"
2. Click "Landing Page Waitlist"
3. You should see your email address
4. Click the contact to see attributes:
   - `CTA_VARIANT`: A or B
   - `SIGNUP_DATE`: Today's date

### Step 3: Check Browser Console

If something fails:
1. Open Browser DevTools (F12)
2. Go to "Console" tab
3. Look for error messages
4. Common issues:
   - "API key not configured" → Check `.env.local`
   - "Invalid API key" → Regenerate key in Brevo
   - "List not found" → Check list ID is correct

---

## Managing Contacts

### View All Contacts

1. Brevo → "Contacts" → "All contacts"
2. Filter by list: "Landing Page Waitlist"
3. See all signups with timestamps

### Export Contacts

1. Go to your list
2. Click "..." → "Export contacts"
3. Choose format: CSV or Excel
4. Download for backup or import to other tools

### Segment Contacts

Create segments for A/B test analysis:

1. Go to "Contacts" → "Segments"
2. Click "Create a segment"
3. **Variant A Segment**:
   - Name: "Waitlist - Variant A"
   - Condition: `CTA_VARIANT` equals `A`
4. **Variant B Segment**:
   - Name: "Waitlist - Variant B"
   - Condition: `CTA_VARIANT` equals `B`

Now you can see conversion rates for each variant!

---

## Email Campaigns

### When to Send

After collecting signups, send:
1. **Welcome Email** (immediately) - Thank them for joining
2. **Launch Announcement** (when ready) - Products available
3. **Exclusive Offer** (launch day) - Early bird pricing

### Create Welcome Email Template

1. Go to "Campaigns" → "Email"
2. Click "Create a campaign"
3. Choose template or "Start from scratch"
4. **Subject**: "Welcome to Nova Rituals 🌿"
5. **From**: `info@novaritualsbeauty.com` (set up ImprovMX first!)
6. **Content**:

```
Hi {FIRSTNAME},

Thank you for joining the Nova Rituals waitlist!

You're now part of an exclusive group who will be the first to experience our neuro-calming skincare ritual.

Here's what happens next:
- We'll email you when we launch (coming soon!)
- You'll get exclusive early access pricing
- Plus a special gift with your first order

In the meantime, follow us:
Instagram: @novarituals
TikTok: @novarituals

To calm skin and clear minds,
The Nova Rituals Team

---

Calm Skin. Clear Head.
www.novaritualsbeauty.com
```

### Send Campaign

1. **Recipients**: Choose "Landing Page Waitlist"
2. **Schedule**: Send now or schedule for later
3. **A/B Test** (optional): Test different subject lines
4. Click "Send"

### Automation (Advanced)

Set up automatic welcome email:

1. Go to "Automation" → "Create a workflow"
2. **Trigger**: "Contact added to list"
3. **List**: "Landing Page Waitlist"
4. **Action**: "Send an email"
5. **Wait time**: 0 minutes (immediate)
6. **Template**: Your welcome email
7. Activate workflow

Now every signup gets instant welcome email!

---

## Monitoring & Analytics

### Email Performance

Brevo Dashboard shows:
- **Open rate** (target: 20-30%)
- **Click rate** (target: 2-5%)
- **Unsubscribe rate** (< 0.5% is good)
- **Bounce rate** (< 2% is good)

### Contact Growth

Track daily:
- Total contacts on list
- Contacts by variant (A vs B)
- Signup dates (when did spikes occur?)

### A/B Test Analysis

Compare segments:
1. Go to "Contacts" → "Segments"
2. Compare "Variant A" vs "Variant B" size
3. Calculate:
   - **Conversion Rate A** = Variant A contacts / Total traffic to A
   - **Conversion Rate B** = Variant B contacts / Total traffic to B
4. Use Google Analytics to get traffic numbers (see [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md))

---

## Best Practices

### Email Deliverability

1. **Verify Sender Domain** (advanced):
   - Go to "Senders" → "Domains"
   - Add `novaritualsbeauty.com`
   - Add DNS records (SPF, DKIM)
   - Improves inbox delivery

2. **Clean Content**:
   - Avoid spam words ("FREE!", "ACT NOW!")
   - Use plain text + HTML versions
   - Include unsubscribe link (Brevo adds automatically)

3. **Warm Up Sending** (if sending in bulk):
   - Start with small batches (100/day)
   - Gradually increase over 2 weeks
   - Builds sender reputation

### GDPR Compliance

Brevo is GDPR compliant, but you should:
- ✅ Only email people who signed up
- ✅ Include unsubscribe link (automatic)
- ✅ Have privacy policy on website
- ✅ Don't sell or share email list

### List Hygiene

Monthly:
1. Remove hard bounces (invalid emails)
2. Remove long-term non-openers (6+ months)
3. Keep list engaged (better deliverability)

---

## Troubleshooting

### API Error: "Invalid API key"

**Solution**:
1. Regenerate API key in Brevo
2. Update `.env.local`
3. Restart dev server: `npm run dev`
4. Update in Netlify env vars (if deployed)

### Contacts Not Appearing

**Check**:
1. List ID is correct in `.env.local`
2. Browser console for JavaScript errors
3. Brevo dashboard → "Logs" → "API calls" for errors
4. Network tab in DevTools (look for 400/500 errors)

### Duplicate Contacts

Brevo automatically handles duplicates:
- Same email = updates existing contact
- `updateEnabled: true` in code merges data

### Emails Going to Spam

**Fix**:
1. Verify sender domain (see Best Practices)
2. Ask subscribers to whitelist your email
3. Avoid spam trigger words
4. Send from personal domain (not Gmail/Yahoo)

---

## Upgrade Options (If Needed)

If you exceed free tier:

| Plan | Price | Limits |
|------|-------|--------|
| **Free** | $0/mo | 300 emails/day |
| **Starter** | $25/mo | 20,000 emails/mo |
| **Business** | $65/mo | 60,000 emails/mo |
| **Enterprise** | Custom | Unlimited |

**When to upgrade**:
- Sending > 300 emails/day
- Need advanced automation
- Want phone support
- Need SMS marketing

For MVP validation, **free tier is perfect!**

---

## Next Steps

1. **Collect Signups** - Drive traffic via ads
2. **Send Welcome Email** - Keep subscribers engaged
3. **Monitor Growth** - Track daily signups
4. **Analyze A/B Test** - Which variant wins?
5. **Launch Campaign** - When ready to sell

---

## Resources

- **Brevo Documentation**: https://developers.brevo.com
- **API Reference**: https://developers.brevo.com/reference/getting-started-1
- **Support**: support@brevo.com
- **Status Page**: https://status.brevo.com

---

## Questions?

Contact: info@novaritualsbeauty.com
