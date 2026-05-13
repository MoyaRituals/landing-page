---
description: Build and deploy the landing page to production
---

Deploy the Moya Rituals landing page to production.

Run these steps in order:

1. Check for uncommitted changes:
   ```bash
   git status
   ```

2. If there are uncommitted changes, stage and commit them:
   ```bash
   git add -A
   git commit -m "Content update"
   ```

3. Push to main to trigger Netlify auto-deploy:
   ```bash
   git push origin main
   ```

4. Confirm the push succeeded and remind the user to check https://app.netlify.com for build status.

If the push fails for any reason, stop and report the error — do not force push.
