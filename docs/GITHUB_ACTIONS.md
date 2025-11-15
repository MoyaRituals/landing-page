# GitHub Actions - Netlify Deployment

Automated deployment to Netlify using GitHub Actions.

## Overview

This setup automatically deploys your site to Netlify whenever you push to the `main` branch or create a pull request.

**Benefits**:
- ✅ Automatic deployments on every push
- ✅ Preview deployments for pull requests
- ✅ Deploy comments on commits and PRs
- ✅ No manual deployment needed

---

## Setup Instructions

### Step 1: Get Netlify Credentials

#### 1.1 Get Netlify Site ID

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site Settings** → **General** → **Site details**
4. Copy the **Site ID** (looks like: `abc12345-6789-def0-1234-56789abcdef0`)

#### 1.2 Get Netlify Auth Token

1. Go to [Netlify User Settings](https://app.netlify.com/user/applications)
2. Click **New access token**
3. Name it: "GitHub Actions"
4. Click **Generate token**
5. **Copy the token immediately** (you won't see it again!)

---

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

| Name | Value | Description |
|------|-------|-------------|
| `NETLIFY_AUTH_TOKEN` | Your Netlify auth token from Step 1.2 | Authenticates with Netlify |
| `NETLIFY_SITE_ID` | Your site ID from Step 1.1 | Identifies which site to deploy |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Your Google Analytics ID (e.g., `G-XXXXXXXXXX`) | Embedded in build |

**Important**: `GITHUB_TOKEN` is automatically provided by GitHub - you don't need to add it.

---

### Step 3: Add Netlify Environment Variables

The GitHub Action only deploys the built files. Serverless functions need environment variables set in Netlify:

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site Settings** → **Environment Variables**
4. Click **Add a variable**
5. Add each variable:

| Key | Value | Description |
|-----|-------|-------------|
| `BREVO_API_KEY` | Your Brevo API key | Server-side only |
| `BREVO_LIST_ID` | Your Brevo list ID | Server-side only |
| `BREVO_TEMPLATE_WELCOME_A` | Template ID for variant A | Server-side only |
| `BREVO_TEMPLATE_WELCOME_B` | Template ID for variant B | Server-side only |

**Note**: These are server-side only and are NOT included in the GitHub Action build. They're used by Netlify Functions at runtime.

---

### Step 4: Test the Deployment

1. Make a small change to your code
2. Commit and push to `main`:
```bash
git add .
git commit -m "Test GitHub Actions deployment"
git push
```

3. Go to GitHub → **Actions** tab
4. You should see a workflow running
5. Click on it to see deployment progress

---

## Workflow Behavior

### On Push to Main

- ✅ Runs automatically
- ✅ Builds the project
- ✅ Deploys to **production**
- ✅ Comments on the commit with deploy URL

### On Pull Request

- ✅ Runs automatically
- ✅ Builds the project
- ✅ Deploys to a **preview URL**
- ✅ Comments on the PR with preview URL
- ✅ Updates comment on each new push to PR

---

## Monitoring Deployments

### View in GitHub

1. Go to your repository
2. Click **Actions** tab
3. See all workflow runs
4. Click any run to see detailed logs

### View in Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Click **Deploys** tab
4. See all deployments with:
   - Deploy time
   - Commit message
   - Deploy preview URL
   - Build logs

---

## Troubleshooting

### Deployment Fails

**Check build logs**:
1. GitHub → Actions → Click failed workflow
2. Expand "Build project" step
3. Look for error messages

**Common errors**:

| Error | Solution |
|-------|----------|
| "Missing NEXT_PUBLIC_GA_MEASUREMENT_ID" | Add the secret in GitHub Settings → Secrets |
| "Build failed" | Check your code builds locally: `npm run build` |
| "Invalid NETLIFY_AUTH_TOKEN" | Regenerate token in Netlify, update GitHub secret |
| "Site not found" | Check NETLIFY_SITE_ID is correct |

### Functions Not Working in Production

**Check environment variables**:
1. Netlify Dashboard → Site Settings → Environment Variables
2. Verify all server-side variables are set:
   - `BREVO_API_KEY`
   - `BREVO_LIST_ID`
   - `BREVO_TEMPLATE_WELCOME_A`
   - `BREVO_TEMPLATE_WELCOME_B`
3. **Trigger new deploy** (env vars only load at build time)

**Test function directly**:
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/brevo-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","ctaVariant":"A"}'
```

### Preview Deployments Don't Work

**Check branch protection**:
- Ensure GitHub Actions has permission to comment on PRs
- Repository Settings → Actions → General → Workflow permissions → "Read and write permissions"

---

## Customization

### Deploy from Different Branch

Edit `.github/workflows/netlify-deploy.yml`:

```yaml
on:
  push:
    branches:
      - main
      - develop  # Add other branches here
```

### Add Build Checks

Add linting and testing before deployment:

```yaml
- name: Run linter
  run: npm run lint

- name: Run tests
  run: npm test
```

### Deploy Only on Tag

```yaml
on:
  push:
    tags:
      - 'v*'  # Triggers on tags like v1.0.0
```

---

## Manual Deployment (Fallback)

If GitHub Actions fails, you can deploy manually:

### Option 1: Netlify CLI

```bash
npm run build
npx netlify deploy --prod
```

### Option 2: Netlify Dashboard

1. Run: `npm run build`
2. Drag the `out` folder to Netlify deploy zone
3. Functions are uploaded automatically from `netlify/functions/`

---

## Security Best Practices

### 1. Never Commit Secrets

- ✅ Use GitHub Secrets for sensitive data
- ✅ Add `.env.local` to `.gitignore`
- ❌ Never commit API keys in code

### 2. Rotate Tokens Regularly

- Regenerate Netlify auth token every 6-12 months
- Update GitHub secret with new token

### 3. Limit Token Permissions

- Use site-specific deploy keys when possible
- Don't use personal access tokens for automation

---

## Monitoring Costs

### GitHub Actions

- ✅ **Free tier**: 2,000 minutes/month for private repos
- ✅ **Unlimited for public repos**

### Netlify

- ✅ **Free tier**: 300 build minutes/month
- ✅ **Functions**: 125,000 invocations/month

**Typical usage** for this project: ~50 minutes/month (well within free tier)

---

## Resources

- **GitHub Actions Docs**: https://docs.github.com/actions
- **Netlify CLI Docs**: https://docs.netlify.com/cli/get-started/
- **actions-netlify**: https://github.com/nwtgck/actions-netlify

---

## Questions?

Contact: info@moyaskincare.com
