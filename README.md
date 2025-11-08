# Nova Rituals Landing Page

**The skincare ritual to reset your nervous system.**

A lean validation MVP landing page for Nova Rituals, built following "The Right It" and "The Lean Startup" methodologies to test product-market fit through waitlist signups.

## 🎯 Project Goals

- **Primary Hypothesis**: People are interested in neuro-calming skincare
- **Key Metric**: Email signup conversion rate (target: 5-10%)
- **Validation Method**: Small paid ad traffic from Instagram, TikTok, Meta

## 🛠 Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Rendering**: Static Site Generation (SSG) - pre-rendered HTML for maximum speed
- **Styling**: Tailwind CSS with Nova Rituals brand colors
- **Animations**: Framer Motion
- **Email Marketing**: Brevo (formerly Sendinblue)
- **Analytics**: Google Analytics 4
- **Hosting**: Netlify (free tier)
- **Domain**: novaritualsbeauty.com (GoDaddy)

## 📁 Project Structure

```
landing-page/
├── app/
│   ├── layout.tsx              # Root layout with fonts & SEO metadata
│   ├── page.tsx                # Home page (assembles components)
│   ├── globals.css             # Global styles & Tailwind
│   └── GoogleAnalytics.tsx     # GA4 integration component
├── components/
│   ├── Header.tsx              # Sticky header with logo & CTA
│   ├── Hero.tsx                # Hero section with A/B testing
│   ├── BenefitsGrid.tsx        # 3-column benefits display
│   ├── ProductShowcase.tsx     # Product cards section
│   ├── ProductCard.tsx         # Reusable product card
│   ├── RitualSteps.tsx         # 3-minute ritual breakdown
│   ├── FounderStory.tsx        # Brand story section
│   ├── EmailSignupForm.tsx     # Waitlist form with Brevo
│   ├── CTAButton.tsx           # Reusable CTA with tracking
│   └── Footer.tsx              # Footer component
├── lib/
│   ├── constants.ts            # Brand colors, copy, product data
│   ├── brevo.ts                # Brevo API integration
│   └── analytics.ts            # Google Analytics helpers
├── public/
│   ├── images/                 # Brand assets
│   └── robots.txt              # SEO robots file
├── docs/                       # Detailed setup guides
├── next.config.js              # Next.js config (static export)
├── tailwind.config.js          # Tailwind with brand colors
└── netlify.toml                # Netlify deployment config
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update with your credentials (see [BREVO_SETUP.md](docs/BREVO_SETUP.md) and [ANALYTICS_SETUP.md](docs/ANALYTICS_SETUP.md))

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
```

Output will be in the `/out` directory as static HTML/CSS/JS files.

## 📚 Documentation

Detailed setup guides:

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Technical decisions & architecture rationale
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deploy to Netlify + custom domain setup
- **[BREVO_SETUP.md](docs/BREVO_SETUP.md)** - Email marketing integration
- **[EMAIL_SETUP.md](docs/EMAIL_SETUP.md)** - Business email with ImprovMX
- **[ANALYTICS_SETUP.md](docs/ANALYTICS_SETUP.md)** - Google Analytics 4 + A/B tracking

## ✨ Features

### A/B Testing
- Two CTA variants tested automatically:
  - **Variant A**: "Join the Waitlist"
  - **Variant B**: "Preorder Your Ritual System"
- Variant tracked in Brevo contact attributes
- Conversion events tracked in Google Analytics

### SEO Optimized
- Static HTML for instant loading
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (Product schema)
- Responsive images

### Brand Integration
- Custom Tailwind colors from brand book
- Google Fonts (Cormorant Garamond + Inter)
- Real product photography
- Consistent brand voice

## 🎨 Brand Colors

```css
--nova-taupe: #A68C84
--nova-rose-clay: #D9A79B
--nova-warm-beige: #F2EDE9
--nova-stone: #C9BCB2
--nova-charcoal: #2B2B2B
```

## 📊 Success Metrics

Track these in Google Analytics:

- **Conversion Rate**: Email signups / Total visitors (target: 5-10%)
- **A/B Test Winner**: Compare variant A vs B conversion rates
- **Bounce Rate**: % of single-page sessions
- **Time on Page**: Average engagement time
- **Scroll Depth**: How far users scroll (25%, 50%, 75%, 100%)

## 🔄 Future Enhancements (Post-Validation)

If validation succeeds (5-10% conversion):

1. **Add Server Features** - Remove `output: 'export'` from next.config.js
2. **E-commerce Integration** - Stripe for payments
3. **User Accounts** - Auth for order tracking
4. **Product Reviews** - Social proof
5. **Email Automation** - Drip campaigns in Brevo

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for migration details.

## 🤝 Contributing

This is a private project for Nova Rituals. For questions, contact: info@novaritualsbeauty.com

## 📄 License

UNLICENSED - Private

---

Built with ❤️ following The Lean Startup methodology
