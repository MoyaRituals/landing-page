# Google Analytics 4 Setup Guide

Complete guide to setting up Google Analytics 4 (GA4) for tracking visitors, conversions, and A/B test performance.

## Table of Contents
1. [Create GA4 Property](#create-ga4-property)
2. [Get Measurement ID](#get-measurement-id)
3. [Configure Environment Variables](#configure-environment-variables)
4. [Verify Tracking](#verify-tracking)
5. [A/B Test Analysis](#ab-test-analysis)
6. [Key Metrics to Track](#key-metrics-to-track)
7. [Create Custom Reports](#create-custom-reports)

---

## Create GA4 Property

### Step 1: Create Google Analytics Account

1. Go to [https://analytics.google.com](https://analytics.google.com)
2. Click "Start measuring"
3. **Account name**: "Moya Rituals"
4. Check sharing settings (optional)
5. Click "Next"

### Step 2: Create Property

1. **Property name**: "Moya Rituals Landing Page"
2. **Reporting time zone**: Your timezone
3. **Currency**: USD
4. Click "Next"

### Step 3: Business Details

1. **Industry**: "Health & Beauty"
2. **Business size**: "Small" (1-10 employees)
3. **How do you intend to use Google Analytics**:
   - ✅ Examine user behavior
   - ✅ Measure advertising ROI
4. Click "Create"
5. Accept Terms of Service

---

## Get Measurement ID

### Step 1: Set Up Data Stream

After creating property:

1. **Platform**: Web
2. **Website URL**: `https://moyaskincare.com`
3. **Stream name**: "Moya Rituals Website"
4. Click "Create stream"

### Step 2: Copy Measurement ID

You'll see a box with:

```
Measurement ID: G-XXXXXXXXXX
```

**Copy this ID** - you'll need it for environment variables.

**Format**: Always starts with `G-` followed by letters/numbers.

---

## Configure Environment Variables

### Step 1: Local Development

Edit `.env.local`:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Step 2: Production (Netlify)

1. Netlify Dashboard → Site Settings → Environment Variables
2. Click "Add a variable"
3. **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. **Value**: `G-XXXXXXXXXX`
5. Click "Create variable"
6. Redeploy site for changes to take effect

---

## Verify Tracking

### Method 1: Real-Time Report

1. Go to GA4 → Reports → Real-time
2. Open your website: `https://moyaskincare.com`
3. You should see:
   - 1 user active
   - Page view event
   - Your location on map

**If you don't see yourself**:
- Wait 30 seconds and refresh
- Check Measurement ID is correct
- Check browser isn't blocking analytics (turn off ad blockers)
- Open DevTools Console for errors

### Method 2: Browser DevTools

1. Open your site
2. Press F12 → Network tab
3. Filter by "gtag"
4. Reload page
5. Look for requests to `www.googletagmanager.com`
6. If you see them → tracking is working!

### Method 3: GA Debugger Extension

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Enable extension
3. Open your site
4. Open Console (F12)
5. Look for GA debug messages

---

## A/B Test Analysis

### Events We're Tracking

The landing page tracks these custom events:

| Event Name | When It Fires | Parameters |
|------------|---------------|------------|
| `cta_click` | User clicks CTA button | `variant`: A or B, `location`: hero/header |
| `form_submit_success` | Email signup succeeds | `variant`: A or B |
| `form_submit_error` | Email signup fails | `variant`: A or B |
| `scroll_depth` | User scrolls | `percentage`: 25/50/75/100 |

### View Events in GA4

1. Go to Reports → Engagement → Events
2. You'll see:
   - `page_view` (built-in)
   - `cta_click` (custom)
   - `form_submit_success` (custom)
   - `scroll_depth` (custom)

### Create Conversion Events

Mark important events as conversions:

1. Go to Configure → Events
2. Find `form_submit_success`
3. Toggle "Mark as conversion"
4. This appears in Conversions report

Repeat for:
- `cta_click` (engagement conversion)
- `form_submit_success` (primary conversion)

---

## Key Metrics to Track

### 1. Conversion Rate by Variant

**Goal**: Determine if Variant A or B performs better

**How to Calculate**:

1. Go to Explore → Create new exploration
2. Choose "Free form"
3. **Dimensions**:
   - Add `Event name`
   - Add `Event parameter: variant`
4. **Metrics**:
   - Add `Event count`
5. **Rows**: `Event parameter: variant`
6. **Values**: `Event count`
7. **Filters**: `Event name = form_submit_success`

You'll see:
```
Variant A: 25 conversions
Variant B: 35 conversions
```

Divide by total traffic to each variant for conversion rate.

### 2. Traffic Sources

**Where are visitors coming from?**

1. Go to Reports → Acquisition → Traffic acquisition
2. See breakdown:
   - Direct
   - Organic Search
   - Social (Instagram, TikTok, Facebook)
   - Paid Search
   - Referral

**Track Ad Performance**:
Use UTM parameters in your ads:
```
https://moyaskincare.com/?utm_source=instagram&utm_medium=paid&utm_campaign=launch
```

### 3. Engagement Metrics

1. **Average Engagement Time**
   - Reports → Engagement → Pages and screens
   - Look for `/` (home page)
   - See "Average engagement time"
   - **Target**: 1-2 minutes (good engagement)

2. **Scroll Depth**
   - Reports → Engagement → Events
   - Click `scroll_depth`
   - See breakdown by percentage
   - **Target**: 50%+ reach bottom

3. **Bounce Rate**
   - Reports → Engagement → Pages and screens
   - **Bounce rate** = single-page sessions
   - **Target**: < 60% (lower is better)

### 4. User Demographics

1. Go to Reports → User → Demographics
2. See:
   - Age ranges
   - Gender
   - Locations
   - Languages

**Use for**:
- Refining ad targeting
- Understanding audience
- Content personalization

---

## Create Custom Reports

### A/B Test Performance Report

1. Go to Explore → Create new exploration
2. Template: "Funnel exploration"
3. **Steps**:
   - Step 1: `page_view`
   - Step 2: `cta_click`
   - Step 3: `form_submit_success`
4. **Breakdown**: `Event parameter: variant`
5. Save as "A/B Test Funnel"

**Shows**:
- How many users progress through each step
- Drop-off rates
- Conversion rates by variant

### Daily Signups Report

1. Explore → Free form
2. **Dimensions**: `Date`
3. **Metrics**: `Event count`
4. **Filters**: `Event name = form_submit_success`
5. **Visualization**: Line chart
6. Save as "Daily Signups"

**Use for**:
- Tracking growth over time
- Spotting trends
- Correlating with ad spend

### Traffic Source Performance

1. Explore → Free form
2. **Dimensions**:
   - `Session source/medium`
3. **Metrics**:
   - `Sessions`
   - `Conversions` (form_submit_success)
4. **Calculated field**: Conversion Rate = Conversions / Sessions
5. Save as "Source Performance"

**Shows**:
- Which channels drive best conversions
- ROI by traffic source
- Where to invest ad budget

---

## Set Up Conversion Goals

### Primary Goal: Email Signup

Already set up as `form_submit_success` conversion.

**Track**:
- Total conversions
- Conversion rate
- Conversion value (set to $1 per signup for tracking)

### Secondary Goals

1. **Engagement Goal**: `scroll_depth` at 75%
   - Shows deep engagement
   - Mark as conversion

2. **CTA Click Goal**: `cta_click`
   - Shows interest
   - Mid-funnel metric

**Why track multiple goals?**
- Understand full customer journey
- Identify drop-off points
- Optimize each step

---

## Advanced: Enhanced Measurement

GA4 automatically tracks these (no code needed):

- ✅ **Page views** - Every page load
- ✅ **Scrolls** - 90% scroll depth
- ✅ **Outbound clicks** - Links to other sites
- ✅ **Site search** - If you add search
- ✅ **Video engagement** - If you add videos
- ✅ **File downloads** - PDF, images, etc.

Enable in: Configure → Data streams → Enhanced measurement

---

## Privacy & GDPR

### Cookie Consent (Required in EU)

If targeting EU users, add cookie consent banner:

1. Use a tool like [CookieYes](https://www.cookieyes.com/)
2. Or code your own
3. Only load GA after user consents

**Example**:
```typescript
// Only initialize GA after consent
if (userConsentedToCookies) {
  // Load GoogleAnalytics component
}
```

### IP Anonymization

GA4 anonymizes IPs by default (good for privacy).

### Data Retention

1. Go to Configure → Data Settings → Data Retention
2. Set to **14 months** (maximum on free tier)
3. Saves historical data for analysis

---

## Monitoring Dashboard

### Create Daily Check Dashboard

1. Go to Home in GA4
2. Click "Customize report"
3. Add cards:
   - **Users** (today vs yesterday)
   - **Conversions** (today vs yesterday)
   - **Top traffic sources** (last 7 days)
   - **Conversion rate** (last 7 days)
4. Save as "Daily Dashboard"

**Check daily**:
- Are signups growing?
- Which ads are working?
- Any technical issues? (sudden drop in traffic)

---

## Alerts & Anomalies

### Set Up Custom Alerts

1. Go to Admin → Property → Custom definitions
2. Create alert: "Daily signup drop"
   - Condition: Conversions < 5
   - Frequency: Daily
   - Recipients: Your email

**Use for**:
- Catch technical issues fast
- Monitor campaign performance
- React to sudden changes

---

## Integrations

### Connect to Google Ads (If Running Ads)

1. Go to Admin → Product links → Google Ads links
2. Link your Google Ads account
3. Import conversions to Google Ads
4. Optimize ads based on actual signups (not just clicks)

### Connect to Google Search Console

1. Go to Admin → Product links → Search Console links
2. Link your Search Console property
3. See organic search performance in GA4

---

## Troubleshooting

### Not Seeing Data

**Check**:
1. Measurement ID is correct in `.env.local` and Netlify
2. Ad blocker disabled
3. Real-time report (data can take 24-48 hours for full reports)
4. Browser console for errors

### Events Not Firing

**Debug**:
1. Open DevTools → Console
2. Look for `gtag` errors
3. Check `lib/analytics.ts` is imported correctly
4. Verify event names match exactly

### Duplicate Page Views

**Cause**: GA script loaded twice

**Fix**:
1. Check only one `GoogleAnalytics` component in layout
2. Remove any other GA scripts

---

## Best Practices

### 1. Check Daily (First Week)

- Monitor real-time traffic
- Verify events firing
- Check for errors

### 2. Weekly Review

- Conversion rates trending up?
- Which variant winning A/B test?
- Traffic sources performing?

### 3. Monthly Deep Dive

- Export data to sheets
- Statistical significance of A/B test
- ROI by channel
- User demographics insights

### 4. Document Learnings

Keep a log:
```
Week 1: 3% conversion rate, Variant A winning
Week 2: Increased to 5% after tweaking ad copy
Week 3: Instagram outperforming TikTok 2:1
```

---

## Statistical Significance

### When to Call A/B Test

Don't declare a winner too early!

**Minimum Requirements**:
- 100+ conversions per variant
- 95% statistical confidence
- At least 1 week of data

**Calculator**:
Use [A/B Test Calculator](https://www.ab-testcalculator.com/)

**Example**:
```
Variant A: 120 conversions, 2,000 visitors = 6% conversion
Variant B: 150 conversions, 2,000 visitors = 7.5% conversion

Result: Variant B wins with 95% confidence
```

---

## Export Data

### Export to Google Sheets

1. Explore → Your report
2. Click "Share" → "Download file"
3. Choose "Google Sheets"
4. Automatically creates sheet with data

**Use for**:
- Custom analysis
- Sharing with stakeholders
- Creating charts

### Export to CSV

Same process, choose "CSV" format.

---

## Resources

- **GA4 Documentation**: https://support.google.com/analytics
- **GA4 Training**: https://skillshop.withgoogle.com/analytics
- **Measurement Protocol**: https://developers.google.com/analytics/devguides/collection/protocol/ga4
- **GA4 Community**: https://www.en.advertisercommunity.com/t5/Google-Analytics/ct-p/Google_Analytics

---

## Next Steps

1. **Set Up Property** (15 min)
2. **Verify Tracking** (5 min)
3. **Create Dashboards** (20 min)
4. **Mark Conversions** (5 min)
5. **Launch Ads** → Start collecting data!
6. **Monitor Daily** (first week)
7. **Analyze A/B Test** (after 100+ conversions)
8. **Iterate Based on Data**

---

## Questions?

Need help with GA4 setup?
Contact: info@moyaskincare.com
