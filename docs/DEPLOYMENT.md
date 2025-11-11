# Deployment Guide

Complete guide to deploying the Moya Rituals landing page to Netlify with custom domain setup.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Option A: Netlify Drop (Easiest)](#option-a-netlify-drop-easiest)
3. [Option B: Netlify via Git (Recommended)](#option-b-netlify-via-git-recommended)
4. [Custom Domain Setup (GoDaddy)](#custom-domain-setup-godaddy)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- [ ] Built the production site locally (`npm run build`)
- [ ] Brevo API key ready (see [BREVO_SETUP.md](BREVO_SETUP.md))
- [ ] Google Analytics ID ready (see [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md))
- [ ] Access to GoDaddy DNS settings

---

## Option A: Netlify Drop (Easiest)

Perfect for quick testing or if you don't want to use Git.

### Step 1: Build the Site

```bash
npm run build
```

This creates an `/out` folder with static files.

### Step 2: Drag & Drop to Netlify

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Create free account (or log in)
3. Drag the `/out` folder onto the drop zone
4. Wait 30 seconds for deployment
5. Get temporary URL: `https://random-name-12345.netlify.app`

### Step 3: Configure Site

1. Click "Site settings"
2. Change site name: `moya-rituals` (URL becomes `moya-rituals.netlify.app`)
3. Add environment variables (see [Environment Variables](#environment-variables))

**Pros**: Fastest way to deploy
**Cons**: Manual redeployment needed for updates

---

## Option B: Netlify via Git (Recommended)

Best for continuous deployment. Push to GitHub → auto-deploys to Netlify.

### Step 1: Push to GitHub

(Assuming the git setup is complete per main plan)

```bash
git remote add origin https://github.com/moyaRituals/landing-page.git
git push -u origin main
```

### Step 2: Connect Netlify to GitHub

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify to access your GitHub
5. Select `moyaRituals/landing-page` repository

### Step 3: Configure Build Settings

Netlify should auto-detect Next.js, but verify:

```
Build command: npm run build
Publish directory: out
```

### Step 4: Add Environment Variables

Before deploying, add:

1. Click "Site settings" → "Environment variables"
2. Add each variable:
   - `NEXT_PUBLIC_BREVO_API_KEY` = your_brevo_key
   - `NEXT_PUBLIC_BREVO_LIST_ID` = your_list_id
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = G-XXXXXXXXXX

### Step 5: Deploy

Click "Deploy site"

Wait 2-3 minutes for build to complete.

**Pros**: Auto-deploys on git push, version history
**Cons**: Requires GitHub setup

---

## Custom Domain Setup (GoDaddy)

Connect `moyaskincare.com` to your Netlify site.

### Step 1: Add Domain in Netlify

1. In Netlify, go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter: `moyaskincare.com`
4. Click "Verify"
5. Netlify will show you DNS records to add

### Step 2: Configure DNS in GoDaddy

1. Log in to [GoDaddy](https://dcc.godaddy.com/control/dns)
2. Find `moyaskincare.com` → click "DNS"
3. **Add these records:**

#### Primary Domain (moyaskincare.com)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `75.2.60.5` | 600 |

#### WWW Subdomain (www.moyaskincare.com)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `moya-rituals.netlify.app` | 600 |

**Note**: The IP address `75.2.60.5` is Netlify's load balancer. Check [Netlify docs](https://docs.netlify.com/domains-https/custom-domains/) for current IPs.

### Step 3: Enable HTTPS

1. In Netlify "Domain settings"
2. Scroll to "HTTPS"
3. Click "Verify DNS configuration"
4. Wait 5-10 minutes for SSL certificate to provision
5. Enable "Force HTTPS"

### Step 4: Test

- Visit `http://moyaskincare.com` → should redirect to HTTPS
- Visit `https://www.moyaskincare.com` → should work
- Visit `https://moyaskincare.com` → should work

**DNS propagation**: Can take up to 48 hours, but usually 10-30 minutes.

---

## Environment Variables

### Required Variables

Add these in Netlify Site Settings → Environment Variables:

```bash
# Brevo (Email Marketing)
NEXT_PUBLIC_BREVO_API_KEY=xkeysib-xxxxx
NEXT_PUBLIC_BREVO_LIST_ID=1

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### How to Add

1. Netlify Dashboard → Your Site → Site Settings
2. Build & deploy → Environment
3. Click "Add a variable"
4. Key: `NEXT_PUBLIC_BREVO_API_KEY`
5. Value: (paste your Brevo API key)
6. Click "Create variable"
7. Repeat for each variable

### Security Note

`NEXT_PUBLIC_*` variables are **exposed in the browser**. This is okay for:
- Brevo **public** API key (designed for client-side use)
- Google Analytics tracking ID (public by design)

If you migrate to server features later, move sensitive keys to server-only env vars.

---

## Deployment Checklist

Before going live:

- [ ] Production build tested locally (`npm run dev` then `npm run build`)
- [ ] All environment variables added in Netlify
- [ ] Custom domain DNS configured in GoDaddy
- [ ] SSL certificate active (green padlock in browser)
- [ ] Email signup form works (test with real email)
- [ ] Google Analytics tracking (verify in GA4 Real-Time report)
- [ ] Mobile responsive (test on phone)
- [ ] Social sharing works (share link on social media, check preview)
- [ ] 404 page works (visit `/random-page`)

---

## Ongoing Updates

### Option A (Netlify Drop)

1. Make code changes locally
2. Run `npm run build`
3. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
4. Drag new `/out` folder
5. Replaces previous deployment

### Option B (Git-based)

1. Make code changes locally
2. Commit changes: `git commit -am "Update homepage copy"`
3. Push to GitHub: `git push`
4. Netlify auto-deploys in 2-3 minutes
5. Check deploy status in Netlify dashboard

---

## Troubleshooting

### Domain Not Working

**Symptom**: `moyaskincare.com` shows error

**Check**:
1. DNS records match exactly (case-sensitive)
2. Wait 30 minutes for DNS propagation
3. Use [DNS Checker](https://dnschecker.org/) to verify propagation
4. In Netlify, check "Domain management" for verification status

### SSL Certificate Error

**Symptom**: "Your connection is not private"

**Fix**:
1. Netlify → Domain settings → HTTPS
2. Click "Verify DNS configuration"
3. Wait 10 minutes for Let's Encrypt to provision cert
4. If fails, check DNS records are correct

### Build Fails

**Symptom**: Netlify build shows error

**Check**:
1. Build logs in Netlify dashboard
2. Verify `netlify.toml` matches project
3. Check environment variables are set
4. Test build locally first (`npm run build`)

### Form Submissions Not Working

**Symptom**: Form submits but no emails in Brevo

**Check**:
1. Brevo API key is correct in Netlify env vars
2. Brevo list ID is correct
3. Check Brevo dashboard → Contacts for new entries
4. Look for errors in Browser DevTools console
5. Verify `NEXT_PUBLIC_` prefix is used (required for client-side access)

### Images Not Loading

**Symptom**: Broken image icons

**Check**:
1. Images exist in `/public/images/` folder
2. Image paths start with `/images/` (not `./images/`)
3. File names match exactly (case-sensitive)
4. Images included in `/out` folder after build

---

## Performance Monitoring

### Netlify Analytics (Recommended)

1. Netlify Dashboard → Analytics
2. Enable for $9/month (optional, but great insights)
3. See real visitor data, no cookies needed

### Google Analytics (Free)

See [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md) for setup.

Track:
- Page views
- Conversion rates (signups)
- A/B test performance
- Traffic sources (Instagram, TikTok, etc.)

### Core Web Vitals

Test with:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

Target scores:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## Rollback

If deployment breaks something:

### Netlify Drop

1. Rebuild from last working commit
2. Drag new `/out` folder to Netlify Drop

### Git-based

1. Netlify Dashboard → Deploys
2. Find last working deploy
3. Click "..." → "Publish deploy"
4. Or revert git commit: `git revert HEAD && git push`

---

## Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| **Netlify Hosting** | $0/mo | 100GB bandwidth, 300 build minutes |
| **Domain (GoDaddy)** | ~$15/year | Already purchased |
| **SSL Certificate** | $0 | Included with Netlify |
| **Brevo Email** | $0/mo | Free tier: unlimited contacts, 300 emails/day |
| **Google Analytics** | $0/mo | Always free |
| **ImprovMX Email** | $0/mo | Free email forwarding |
| **Total** | **$0/month** | Only domain renewal yearly |

---

## Next Steps After Deployment

1. **Test Ad Campaigns**
   - Set up Instagram/TikTok/Meta ads
   - Drive traffic to `moyaskincare.com`
   - Monitor conversion rates

2. **Monitor Analytics**
   - Check GA4 daily for first week
   - Track which variant (A or B) performs better
   - Look for bounce rate, time on page

3. **Collect Feedback**
   - Email first signups for feedback
   - Ask what resonated
   - Iterate based on learnings

4. **Validate Hypothesis**
   - If conversion rate 5-10%: Strong validation!
   - If < 5%: Iterate on messaging, design, offer
   - If > 10%: Excellent! Scale up ads

---

## Support

- **Netlify Docs**: https://docs.netlify.com
- **GoDaddy DNS Help**: https://www.godaddy.com/help/dns-29908
- **Moya Rituals Support**: info@moyaskincare.com
