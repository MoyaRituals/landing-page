# Business Email Setup with Google Workspace

Complete guide to setting up professional email for `info@moyaskincare.com` using Google Workspace.

## Table of Contents

1. [What is Google Workspace?](#what-is-google-workspace)
2. [Create Google Workspace Account](#create-google-workspace-account)
3. [Verify Domain Ownership](#verify-domain-ownership)
4. [Configure MX Records in GoDaddy](#configure-mx-records-in-godaddy)
5. [Create Email Accounts](#create-email-accounts)
6. [Access Your Email](#access-your-email)
7. [Testing](#testing)

---

## What is Google Workspace?

**Google Workspace** (formerly G Suite) is Google's professional email and productivity suite:

**Features**:

- ✅ Professional Gmail with your domain (`info@moyaskincare.com`)
- ✅ 30GB storage per user
- ✅ Google Drive, Calendar, Meet included
- ✅ Best-in-class spam filtering
- ✅ Mobile apps (Gmail, Drive, Calendar)
- ✅ Professional appearance

**Cost**: $6/user/month (Business Starter plan)

**Why Google Workspace**:

- Industry-standard professional email
- Familiar Gmail interface
- Reliable 99.9% uptime SLA
- Easy team collaboration
- Scales as you grow

---

## Create Google Workspace Account

### Step 1: Sign Up

1. Go to [workspace.google.com](https://workspace.google.com)
2. Click "Get Started"
3. Enter business name: **Moya Rituals**
4. Select "Just you" or number of employees
5. Select your country/region
6. Click "Next"

### Step 2: Enter Domain

1. Choose "Yes, I have one I can use"
2. Enter domain: `moyaskincare.com`
3. Click "Next"

### Step 3: Create Admin Account

1. First name: Your first name
2. Last name: Your last name
3. Email username: Your choice (this will be your admin account)
   - Recommended: Your name (e.g., `yourname@moyaskincare.com`)
4. Create strong password
5. Click "Next"

### Step 4: Billing Information

1. Select plan: **Business Starter** ($6/user/month)
2. Enter payment information
3. Review and accept terms
4. Click "Subscribe"

**Note**: 14-day free trial available, no credit card required initially.

---

## Verify Domain Ownership

Before you can use email, you must prove you own `moyaskincare.com`.

### Step 1: Choose Verification Method

Google will show verification options:

#### Option 1: TXT Record** (Recommended)

- Add a TXT record to your domain's DNS

#### Option 2: HTML File Upload*

- Upload file to your website

#### Option 3: Meta Tag

- Add tag to your website's homepage

Choose **TXT Record** (easiest for domains on GoDaddy).

### Step 2: Get Verification Code

Google will show something like:

```bash
TXT Record Name: @
TXT Record Value: google-site-verification=abc123xyz456...
```

Copy this value and keep the page open.

### Step 3: Add TXT Record in GoDaddy

1. Log in to [GoDaddy DNS Management](https://dcc.godaddy.com/control/dns)
2. Find `moyaskincare.com`
3. Click "DNS" button
4. Scroll to TXT Records section
5. Click "Add"
6. **Type**: `TXT`
7. **Name**: `@`
8. **Value**: Paste the verification code
9. **TTL**: `1 Hour`
10. Click "Save"

### Step 4: Verify in Google

1. Back in Google Workspace setup
2. Click "Verify" or "Protect domain"
3. Wait a few minutes for DNS propagation
4. If it fails, wait 15 minutes and try again

Once verified, you'll see a success message!

---

## Configure MX Records in GoDaddy

MX records tell the internet to deliver email to Google's servers.

### Step 1: Get Google MX Records

Google will show you 5 MX records:

```bash
Priority 1:  ASPMX.L.GOOGLE.COM
Priority 5:  ALT1.ASPMX.L.GOOGLE.COM
Priority 5:  ALT2.ASPMX.L.GOOGLE.COM
Priority 10: ALT3.ASPMX.L.GOOGLE.COM
Priority 10: ALT4.ASPMX.L.GOOGLE.COM
```

### Step 2: Access GoDaddy DNS

1. Log in to [GoDaddy DNS Management](https://dcc.godaddy.com/control/dns)
2. Find `moyaskincare.com`
3. Click "DNS"

### Step 3: Remove Existing MX Records

1. Scroll to MX (Mail Exchange) section
2. Delete ALL existing MX records:
   - Click "..." → "Delete" for each record
   - Confirm deletion

**Important**: Remove all old MX records to avoid conflicts.

### Step 4: Add Google MX Records

Add each of the 5 Google MX records:

**Record 1**:

- Type: `MX`
- Name: `@`
- Value: `ASPMX.L.GOOGLE.COM`
- Priority: `1`
- TTL: `1 Hour`

**Record 2**:

- Type: `MX`
- Name: `@`
- Value: `ALT1.ASPMX.L.GOOGLE.COM`
- Priority: `5`
- TTL: `1 Hour`

**Record 3**:

- Type: `MX`
- Name: `@`
- Value: `ALT2.ASPMX.L.GOOGLE.COM`
- Priority: `5`
- TTL: `1 Hour`

**Record 4**:

- Type: `MX`
- Name: `@`
- Value: `ALT3.ASPMX.L.GOOGLE.COM`
- Priority: `10`
- TTL: `1 Hour`

**Record 5**:

- Type: `MX`
- Name: `@`
- Value: `ALT4.ASPMX.L.GOOGLE.COM`
- Priority: `10`
- TTL: `1 Hour`

Click "Save" after each record.

### Step 5: Verify MX Setup in Google

1. Back in Google Workspace Admin Console
2. Click "Activate Gmail"
3. Google will verify MX records (may take a few minutes)
4. Once verified, Gmail is active!

---

## Create Email Accounts

Now create email addresses for your team.

### Step 1: Access Admin Console

1. Go to [admin.google.com](https://admin.google.com)
2. Sign in with your admin account

### Step 2: Add User

1. Click "Users" in the left sidebar
2. Click "Add new user"
3. Enter details:
   - **First name**: Moya
   - **Last name**: Rituals
   - **Primary email**: `info`
   - Full address will be: `info@moyaskincare.com`
4. Create password or let Google generate one
5. Click "Add new user"

### Step 3: Create Additional Accounts (Optional)

Create more accounts as needed:

- `support@moyaskincare.com`
- `hello@moyaskincare.com`
- `orders@moyaskincare.com`

**Cost**: $6/month per account

### Step 4: Email Aliases (Free Alternative)

Instead of creating multiple accounts, use **aliases** (free):

1. Click on a user (e.g., `info@moyaskincare.com`)
2. Click "User information"
3. Scroll to "Email aliases"
4. Click "Add alternate email"
5. Add aliases:
   - `support@moyaskincare.com`
   - `hello@moyaskincare.com`

All aliases deliver to the same inbox, no extra cost!

---

## Access Your Email

### Via Web (Gmail)

1. Go to [mail.google.com](https://mail.google.com)
2. Sign in with: `info@moyaskincare.com`
3. Use the password you created
4. You're in! Professional Gmail interface with your domain

### Via Mobile App

1. Download Gmail app (iOS/Android)
2. Tap "Add account"
3. Select "Google"
4. Enter: `info@moyaskincare.com`
5. Enter password
6. Done! Email syncs across all devices

### Via Desktop Client (Optional)

You can use Outlook, Apple Mail, Thunderbird:

- **IMAP Server**: `imap.gmail.com` (Port 993, SSL)
- **SMTP Server**: `smtp.gmail.com` (Port 587, TLS)
- **Username**: Full email address
- **Password**: Your account password

---

## Testing

### Test Receiving

1. Send test email to `info@moyaskincare.com` from another account
2. Check your personal inbox
3. Should arrive within 1-2 minutes

**If delayed (10+ min)**:

- DNS propagation not complete (wait up to 48 hours)
- Check MX records in GoDaddy are correct
- Use [MX Toolbox](https://mxtoolbox.com/) to verify: `moyaskincare.com`

### Test Sending (If configured Gmail SMTP)

1. In Gmail, compose new email
2. Click "From" → Choose `info@moyaskincare.com`
3. Send to yourself
4. Check "From" address in received email

Should show: `info@moyaskincare.com`

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
2. Sign up with `moyaskincare.com`
3. Verify domain ownership
4. Add MX records (Google provides)
5. Create mailbox: `info@moyaskincare.com`

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
2. Enter: `moyaskincare.com`
3. Should show `mx1.improvmx.com` and `mx2.improvmx.com`

### Emails Going to Spam

**Solutions**:

1. Add SPF record (see above)
2. Ask recipient to whitelist `info@moyaskincare.com`
3. Avoid spam trigger words in content
4. Build sender reputation (send consistently, low volume)

### Can't Send From Custom Domain

**Gmail SMTP Issues**:

1. Enable 2-factor auth in Google Account
2. Generate "App Password" (not regular password)
3. Use app password in Gmail SMTP settings
4. Verify `info@moyaskincare.com` in ImprovMX

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

```bash
info@moyaskincare.com → you@gmail.com, partner@gmail.com
```

Both receive all emails to `info@`.

### Option 2: Role-Based Aliases (ImprovMX Free)

```bash
info@moyaskincare.com → you@gmail.com
support@moyaskincare.com → partner@gmail.com
orders@moyaskincare.com → you@gmail.com
```

Different roles go to different people.

### Option 3: Real Mailboxes (Google Workspace)

Each person has their own:

```bash
yourname@moyaskincare.com
partner@moyaskincare.com
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
2. **Update Website** - Add `mailto:info@moyaskincare.com` links
3. **Configure Brevo** - Set "From" address to `info@moyaskincare.com`
4. **Professional Signature** - Add to Gmail signature:

   ```bash
   Moya Rituals
   Calm Skin. Clear Head.
   www.moyaskincare.com
   ```

---

## Resources

- **ImprovMX Dashboard**: <https://app.improvmx.com>
- **ImprovMX Docs**: <https://improvmx.com/guides>
- **MX Toolbox**: <https://mxtoolbox.com> (test your MX records)
- **DNS Checker**: <https://dnschecker.org> (check propagation)

---

## Questions?

Test email: <info@moyaskincare.com> (once setup is complete!)
