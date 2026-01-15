# Netlify Functions Guide

Complete guide to developing and testing Netlify serverless functions locally and in production.

## Table of Contents

1. [Overview](#overview)
2. [Local Development](#local-development)
3. [Environment Variables](#environment-variables)
4. [Testing Functions Locally](#testing-functions-locally)
5. [Deployment](#deployment)
6. [Monitoring & Debugging](#monitoring--debugging)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### What are Netlify Functions?

Netlify Functions are serverless functions that run on AWS Lambda. They allow you to:

- Keep API keys secure (server-side only)
- Run backend logic without managing servers
- Scale automatically with traffic
- Pay only for what you use (or use free tier)

### Our Implementation

**Function**: `brevo-signup.js`

**Purpose**: Securely handle email signups by:
1. Receiving signup data from the client
2. Adding contacts to Brevo using server-side API key
3. Sending variant-specific welcome emails
4. Preventing duplicate welcome emails

**Why Serverless?**: Because Next.js static export (`output: 'export'`) runs entirely in the browser, we need a server-side function to keep API keys secure.

---

## Local Development

### Prerequisites

1. **Node.js 20+** installed
2. **Netlify CLI** installed (already in devDependencies)
3. **Environment variables** configured in `.env.local`

### Install Dependencies

```bash
npm install
```

This installs `netlify-cli` as a dev dependency.

### Start Development Server

```bash
npm run dev
```

This runs `netlify dev`, which:
- Starts Next.js dev server
- Starts Netlify Functions server
- Proxies requests to `/.netlify/functions/*` to local functions
- Loads environment variables from `.env.local`

**Important**: Use `npm run dev` (not `next dev`) to test functions locally.

### What Gets Started

When you run `npm run dev`:

```
◈ Netlify Dev ◈
◈ Injected build setting env var: NEXT_PUBLIC_GA_MEASUREMENT_ID
◈ Starting Netlify Dev with Next.js
◈ Server now ready on http://localhost:8888

┌─────────────────────────────────────────────────┐
│                                                 │
│   ◈ Server listening on http://localhost:8888  │
│                                                 │
│   ◈ Functions server:                          │
│     http://localhost:8888/.netlify/functions/  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Note**: Netlify Dev uses port `8888` by default (not `3000`).

---

## Environment Variables

### Local Development (`.env.local`)

Create `.env.local` in project root:

```bash
# Brevo API credentials (server-side only)
BREVO_API_KEY=xkeysib-abc123...
BREVO_LIST_ID=123
BREVO_TEMPLATE_WELCOME_A=456

# Google Analytics (client-side)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important**:
- ❌ **DO NOT** use `NEXT_PUBLIC_` prefix for API keys
- ✅ Server-side variables are automatically available to Netlify Functions
- ✅ Client-side variables need `NEXT_PUBLIC_` prefix

### Production (Netlify Dashboard)

Set the same variables in Netlify:

1. Go to Netlify Dashboard
2. Site Settings → Environment Variables
3. Add each variable:
   - `BREVO_API_KEY`
   - `BREVO_LIST_ID`
   - `BREVO_TEMPLATE_WELCOME_A`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`

---

## Testing Functions Locally

### Test the Signup Function

#### Method 1: Using the Website

1. Start dev server: `npm run dev`
2. Open http://localhost:8888
3. Scroll to "Join the Waitlist"
4. Enter email and submit
5. Check browser console for response
6. Verify contact in Brevo dashboard

#### Method 2: Using cURL

Test the function directly:

```bash
curl -X POST http://localhost:8888/.netlify/functions/brevo-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "ctaVariant": "A"
  }'
```

**Expected response** (new contact):

```json
{
  "success": true,
  "message": "Contact added and welcome email sent",
  "isNewContact": true
}
```

**Expected response** (existing contact):

```json
{
  "success": true,
  "message": "Contact updated",
  "isNewContact": false
}
```

#### Method 3: Using Postman/Insomnia

1. **Method**: POST
2. **URL**: `http://localhost:8888/.netlify/functions/brevo-signup`
3. **Headers**: `Content-Type: application/json`
4. **Body** (JSON):
```json
{
  "email": "test@example.com",
  "name": "Test User",
  "ctaVariant": "B"
}
```

### View Function Logs

Netlify CLI shows function logs in terminal:

```
◈ brevo-signup invoked
Request from ::1:54321
Response with status 200 in 234 ms
```

For detailed logs, check the terminal where `npm run dev` is running.

---

## Deployment

### Deploy to Netlify

#### Option 1: Git-based Deployment (Recommended)

1. **Commit changes**:
```bash
git add .
git commit -m "Add Netlify Functions for secure signup"
git push
```

2. **Netlify auto-deploys** from your Git repository

3. **Verify deployment**:
   - Go to Netlify Dashboard → Deploys
   - Click latest deploy
   - Check "Functions" tab to see `brevo-signup` deployed

#### Option 2: Manual Deployment

```bash
netlify deploy --prod
```

### Verify Functions are Deployed

1. Go to Netlify Dashboard → Functions
2. You should see `brevo-signup` listed
3. Click to view:
   - Invocations count
   - Error rate
   - Average execution time
   - Logs

### Test Production Function

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/brevo-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "ctaVariant": "A"
  }'
```

Replace `your-site.netlify.app` with your actual Netlify URL.

---

## Monitoring & Debugging

### Function Logs (Netlify Dashboard)

1. Go to Functions → `brevo-signup`
2. Click "Logs" tab
3. View:
   - Request timestamps
   - Response status codes
   - Execution duration
   - console.log() output
   - Errors and stack traces

### Real-time Logs

```bash
netlify functions:log brevo-signup --live
```

Shows function logs in terminal as they happen.

### Common Log Messages

#### Success (New Contact)

```
Request from 123.456.789.0
Contact added to Brevo: test@example.com
Welcome email sent (Template: 456)
Response with status 200 in 156 ms
```

#### Success (Existing Contact)

```
Request from 123.456.789.0
Contact updated: test@example.com (no email sent)
Response with status 200 in 89 ms
```

#### Error

```
Request from 123.456.789.0
Brevo contact error: { code: "invalid_parameter", message: "Email is invalid" }
Response with status 400 in 67 ms
```

---

## Troubleshooting

### Function Not Found (404)

**Error**: `{"message":"Function not found"}`

**Solutions**:

1. **Check netlify.toml**:
```toml
[build]
  functions = "netlify/functions"
```

2. **Verify file location**:
```
netlify/
  functions/
    brevo-signup.js  ← Must be here
```

3. **Redeploy**:
```bash
git add netlify/
git commit -m "Add functions"
git push
```

### Environment Variables Not Loading

**Error**: `Server configuration error`

**Solutions**:

1. **Check `.env.local` exists** (local development)
2. **Check Netlify env vars** (production):
   - Dashboard → Site Settings → Environment Variables
   - Verify `BREVO_API_KEY` and `BREVO_LIST_ID` are set
3. **Redeploy after adding env vars**:
   - Trigger a new deploy (env vars only load at build time)

### Invalid API Key

**Error**: `Invalid API key`

**Solutions**:

1. **Regenerate API key** in Brevo dashboard
2. **Update in both places**:
   - `.env.local` (local)
   - Netlify env vars (production)
3. **Restart dev server**: Stop and run `npm run dev` again
4. **Redeploy** if in production

### CORS Errors

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**: Already handled in `brevo-signup.js`:

```javascript
return {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',  // Allows all origins
  },
  body: JSON.stringify({ success: true })
}
```

**For production**: Change `'*'` to your specific domain:

```javascript
'Access-Control-Allow-Origin': 'https://moyaskincare.com'
```

### Function Timeout

**Error**: `Task timed out after 10.00 seconds`

**Causes**:
- Brevo API is slow/down
- Network issues
- Infinite loops in code

**Solutions**:

1. **Check Brevo status**: https://status.brevo.com
2. **Add timeout handling**:
```javascript
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 8000)

const response = await fetch('https://api.brevo.com/v3/contacts', {
  signal: controller.signal,
  // ... other options
})
clearTimeout(timeout)
```

3. **Increase timeout** (in `netlify.toml`):
```toml
[functions]
  node_bundler = "esbuild"

[[functions.brevo-signup]]
  timeout = 26  # Maximum allowed (26 seconds)
```

### Function Invocation Errors

Check Netlify function logs for specific errors:

```bash
netlify functions:log brevo-signup
```

Common errors:

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid JSON` | Malformed request body | Validate JSON before sending |
| `Missing parameter` | Required field missing | Check email & ctaVariant sent |
| `Unauthorized` | Invalid API key | Regenerate Brevo API key |
| `Rate limit exceeded` | Too many requests | Implement retry logic |

---

## Free Tier Limits

### Netlify Functions Free Tier

- ✅ **125,000 function requests/month**
- ✅ **100 hours of run time/month**
- ✅ **26 second max execution time**
- ✅ **Unlimited functions**

### Typical Usage

For a landing page with 1,000 signups/month:
- **Requests**: 1,000 (0.8% of limit)
- **Run time**: ~0.5 hours (0.5% of limit)

**Conclusion**: Free tier is more than enough for MVP.

---

## Best Practices

### 1. Error Handling

Always return proper HTTP status codes:

```javascript
// Success
return { statusCode: 200, body: JSON.stringify({ success: true }) }

// Client error (bad request)
return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email' }) }

// Server error
return { statusCode: 500, body: JSON.stringify({ error: 'Internal error' }) }
```

### 2. Logging

Use `console.log()` and `console.error()`:

```javascript
console.log('Processing signup:', email)
console.error('Brevo API error:', error)
```

Logs appear in Netlify dashboard and terminal.

### 3. Validation

Always validate inputs:

```javascript
if (!email || !ctaVariant) {
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Missing required fields' })
  }
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid email format' })
  }
}
```

### 4. Security

- ✅ Never expose API keys in client-side code
- ✅ Use server-side environment variables
- ✅ Validate and sanitize all inputs
- ✅ Rate limit requests (if needed)
- ✅ Use HTTPS only in production

---

## Resources

- **Netlify Functions Docs**: https://docs.netlify.com/functions/overview/
- **Netlify CLI Docs**: https://docs.netlify.com/cli/get-started/
- **AWS Lambda Limits**: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html
- **Brevo API Reference**: https://developers.brevo.com/reference/getting-started-1

---

## Questions?

Contact: info@moyaskincare.com
