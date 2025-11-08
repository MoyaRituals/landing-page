# Business Email Setup with ImprovMX

Complete guide to setting up free professional email forwarding for `info@novaritualsbeauty.com` using ImprovMX.

## Table of Contents
1. [What is ImprovMX?](#what-is-improvmx)
2. [Create ImprovMX Account](#create-improvmx-account)
3. [Add Domain](#add-domain)
4. [Configure DNS in GoDaddy](#configure-dns-in-godaddy)
5. [Set Up Email Alias](#set-up-email-alias)
6. [Send Email From Custom Domain](#send-email-from-custom-domain)
7. [Testing](#testing)
8. [Alternative: Paid Email Options](#alternative-paid-email-options)

---

## What is ImprovMX?

**ImprovMX** is a free email forwarding service that lets you:
- Receive emails at `info@novaritualsbeauty.com`
- Forward them to your personal email (Gmail, etc.)
- Reply from your custom domain (with setup)

**Perfect for MVP because**:
- ✅ Completely free (unlimited forwards)
- ✅ No mailbox limits
- ✅ Easy setup (just DNS records)
- ✅ Works with any email provider

**Limitations**:
- ❌ Not a real mailbox (just forwarding)
- ❌ All emails end up in personal inbox
- ❌ Requires SMTP setup to send from custom domain

**When to upgrade**: When you need dedicated mailbox, team emails, or professional appearance.

---

## Create ImprovMX Account

### Step 1: Sign Up

1. Go to [https://improvmx.com](https://improvmx.com)
2. Click "Get started for free"
3. Enter email: Your personal email (where forwards will go)
4. Create password
5. Verify email address

### Step 2: Dashboard

You'll land on the ImprovMX dashboard:
- See all your domains
- Create email aliases
- View forwarding logs

---

## Add Domain

### Step 1: Add novaritualsbeauty.com

1. Click "Add domain"
2. Enter: `novaritualsbeauty.com`
3. Click "Add domain"

### Step 2: Note DNS Records

ImprovMX will show you two DNS records to add:

**MX Records** (Mail Exchange):
```
Type: MX
Host: @
Value: mx1.improvmx.com
Priority: 10

Type: MX
Host: @
Value: mx2.improvmx.com
Priority: 20
```

Keep this page open - you'll need these for GoDaddy.

---

## Configure DNS in GoDaddy

### Step 1: Access DNS Settings

1. Log in to [GoDaddy DNS Management](https://dcc.godaddy.com/control/dns)
2. Find `novaritualsbeauty.com`
3. Click "DNS" button

### Step 2: Remove Existing MX Records (If Any)

1. Scroll to MX (Mail Exchange) section
2. If you see any existing MX records, delete them:
   - Click "..." → "Delete"
   - Confirm deletion

**Why?** GoDaddy sometimes adds default MX records that conflict.

### Step 3: Add ImprovMX MX Records

Add **first MX record**:
1. Click "Add" under MX Records
2. Type: `MX`
3. Name: `@`
4. Value: `mx1.improvmx.com`
5. Priority: `10`
6. TTL: `1 Hour` (default)
7. Click "Save"

Add **second MX record**:
1. Click "Add" again
2. Type: `MX`
3. Name: `@`
4. Value: `mx2.improvmx.com`
5. Priority: `20`
6. TTL: `1 Hour`
7. Click "Save"

### Step 4: Add SPF Record (Recommended)

This helps with email deliverability:

1. Click "Add" under TXT Records
2. Type: `TXT`
3. Name: `@`
4. Value: `v=spf1 include:spf.improvmx.com ~all`
5. TTL: `1 Hour`
6. Click "Save"

---

## Set Up Email Alias

### Step 1: Create info@ Alias

1. Back in ImprovMX dashboard
2. Click on `novaritualsbeauty.com`
3. Click "Add alias"
4. **Alias**: `info`
5. **Forward to**: Your personal email (e.g., `you@gmail.com`)
6. Click "Create alias"

Now emails to `info@novaritualsbeauty.com` forward to your personal email!

### Step 2: Add More Aliases (Optional)

Create additional professional addresses:
- `hello@novaritualsbeauty.com` → your email
- `support@novaritualsbeauty.com` → your email
- `orders@novaritualsbeauty.com` → your email

All free, all forward to same personal inbox.

### Step 3: Catch-All (Optional)

Enable catch-all to receive ANY email to your domain:

1. In ImprovMX domain settings
2. Toggle "Catch-all" to ON
3. Choose forward address

Now `anything@novaritualsbeauty.com` forwards to you.

---

## Send Email From Custom Domain

To **reply** from `info@novaritualsbeauty.com` instead of your personal email:

### Option 1: Gmail SMTP (Easiest)

1. Go to Gmail Settings → "Accounts and Import"
2. Click "Add another email address"
3. Name: "Nova Rituals"
4. Email: `info@novaritualsbeauty.com`
5. Uncheck "Treat as an alias"
6. Click "Next"

**SMTP Settings**:
```
SMTP Server: smtp.gmail.com
Port: 587
Username: your-gmail@gmail.com
Password: Your Gmail app password
```

7. Gmail will send verification email to `info@novaritualsbeauty.com`
8. Check your inbox (it'll forward) for confirmation link
9. Click link to verify

Now you can send from `info@novaritualsbeauty.com` in Gmail!

**Dropdown**: When composing, click "From" dropdown to choose address.

### Option 2: ImprovMX SMTP (Advanced)

ImprovMX offers SMTP for **$9/month**:
1. Upgrade to ImprovMX Premium
2. Get SMTP credentials
3. Add to any email client

---

## Testing

### Test Receiving

1. Send test email to `info@novaritualsbeauty.com` from another account
2. Check your personal inbox
3. Should arrive within 1-2 minutes

**If delayed (10+ min)**:
- DNS propagation not complete (wait up to 48 hours)
- Check MX records in GoDaddy are correct
- Use [MX Toolbox](https://mxtoolbox.com/) to verify: `novaritualsbeauty.com`

### Test Sending (If configured Gmail SMTP)

1. In Gmail, compose new email
2. Click "From" → Choose `info@novaritualsbeauty.com`
3. Send to yourself
4. Check "From" address in received email

Should show: `info@novaritualsbeauty.com`

### Check Logs

ImprovMX dashboard shows:
- **Forwards**: All emails forwarded
- **Errors**: Failed forwards
- **Quota**: How many forwards used (unlimited on free)

---

## Alternative: Paid Email Options

If you need a real mailbox (not just forwarding):

### Google Workspace (Best for Business)

**Cost**: $6/user/month

**Features**:
- ✅ Professional Gmail interface
- ✅ 30GB storage
- ✅ Google Drive, Calendar, Meet included
- ✅ Best spam filtering
- ✅ Mobile apps

**Setup**:
1. Go to [workspace.google.com](https://workspace.google.com)
2. Sign up with `novaritualsbeauty.com`
3. Verify domain ownership
4. Add MX records (Google provides)
5. Create mailbox: `info@novaritualsbeauty.com`

### Zoho Mail

**Cost**: $1/user/month (Lite plan)

**Features**:
- ✅ 5GB storage
- ✅ Webmail interface
- ✅ Mobile apps
- ✅ Calendar, Notes, Tasks
- ❌ No Google Drive equivalent

**Setup**: Similar to Google Workspace

### GoDaddy Email

**Cost**: $5.99-$11.99/year

**Features**:
- ✅ Included with some GoDaddy hosting plans
- ✅ Basic webmail
- ✅ 10-25GB storage
- ❌ Interface not as modern

**Check**: Log in to GoDaddy and see if email is already included with domain.

---

## Deliverability Tips

### Improve Email Deliverability

1. **Add SPF Record** (done above)
   - Tells servers you authorize ImprovMX to send on your behalf

2. **Add DKIM Record** (ImprovMX Premium)
   - Authenticates your emails
   - Reduces spam score

3. **Don't Use for Mass Email**
   - ImprovMX is for transactional email (receipts, support)
   - Use Brevo for marketing emails (newsletters)

4. **Warm Up Domain**
   - Start with low volume (5-10 emails/day)
   - Gradually increase over 2 weeks
   - Builds sender reputation

---

## Troubleshooting

### Emails Not Arriving

**Check**:
1. MX records correct in GoDaddy
2. DNS propagation complete (use [DNSchecker](https://dnschecker.org))
3. Check spam folder in personal email
4. ImprovMX logs for errors

**MX Toolbox Test**:
1. Go to [mxtoolbox.com/SuperTool.aspx](https://mxtoolbox.com/SuperTool.aspx)
2. Enter: `novaritualsbeauty.com`
3. Should show `mx1.improvmx.com` and `mx2.improvmx.com`

### Emails Going to Spam

**Solutions**:
1. Add SPF record (see above)
2. Ask recipient to whitelist `info@novaritualsbeauty.com`
3. Avoid spam trigger words in content
4. Build sender reputation (send consistently, low volume)

### Can't Send From Custom Domain

**Gmail SMTP Issues**:
1. Enable 2-factor auth in Google Account
2. Generate "App Password" (not regular password)
3. Use app password in Gmail SMTP settings
4. Verify `info@novaritualsbeauty.com` in ImprovMX

---

## Usage Limits

### ImprovMX Free Tier

- ✅ **Unlimited forwards**
- ✅ **Unlimited aliases**
- ✅ **Unlimited domains** (well, 1 domain free)
- ✅ **No expiration**

### When to Upgrade

Upgrade to ImprovMX Premium ($9/mo) if you need:
- SMTP sending (send from custom domain)
- Multiple team members
- Priority support
- Email logs retention

---

## Managing Multiple Team Members

If you have team members:

### Option 1: Forward to Multiple Emails (ImprovMX Free)

```
info@novaritualsbeauty.com → you@gmail.com, partner@gmail.com
```

Both receive all emails to `info@`.

### Option 2: Role-Based Aliases (ImprovMX Free)

```
info@novaritualsbeauty.com → you@gmail.com
support@novaritualsbeauty.com → partner@gmail.com
orders@novaritualsbeauty.com → you@gmail.com
```

Different roles go to different people.

### Option 3: Real Mailboxes (Google Workspace)

Each person has their own:
```
yourname@novaritualsbeauty.com
partner@novaritualsbeauty.com
```

Best for growing teams.

---

## Security Best Practices

1. **Enable 2FA** on ImprovMX account
2. **Don't Share Password** - Use aliases instead
3. **Monitor Logs** - Check for unauthorized forwards
4. **Secure Personal Email** - Where forwards go should have strong security

---

## Next Steps

After email is set up:

1. **Test Thoroughly** - Send/receive multiple test emails
2. **Update Website** - Add `mailto:info@novaritualsbeauty.com` links
3. **Configure Brevo** - Set "From" address to `info@novaritualsbeauty.com`
4. **Professional Signature** - Add to Gmail signature:
   ```
   Nova Rituals
   Calm Skin. Clear Head.
   www.novaritualsbeauty.com
   ```

---

## Resources

- **ImprovMX Dashboard**: https://app.improvmx.com
- **ImprovMX Docs**: https://improvmx.com/guides
- **MX Toolbox**: https://mxtoolbox.com (test your MX records)
- **DNS Checker**: https://dnschecker.org (check propagation)

---

## Questions?

Test email: info@novaritualsbeauty.com (once setup is complete!)
