# Moya Rituals Landing Page

Next.js 16 + Tailwind CSS + TypeScript site hosted on Netlify. Waitlist landing page for a neuro-calming skincare brand.

## Quick start

```bash
npm run dev        # local dev server at localhost:3000
npm run build      # production build → out/
netlify deploy --prod --dir=out   # manual Netlify deploy
```

## Project structure

```
app/
  page.tsx          # page composition — imports and orders all sections
  layout.tsx        # root layout, fonts, metadata
  globals.css       # global styles and Tailwind base

lib/
  constants.ts      # ALL brand content (text, products, benefits, CTAs)

components/
  Hero.tsx          # hero section
  BenefitsGrid.tsx  # three benefit cards (renders BENEFITS from constants)
  ProductShowcase.tsx  # product cards (renders PRODUCTS from constants)
  RitualSteps.tsx   # 3-step ritual guide (renders RITUAL_STEPS from constants)
  FounderStory.tsx  # founder/brand story
  EmailSignupForm.tsx  # waitlist signup (id="waitlist"), calls brevo-signup function
  Header.tsx        # top nav
  Footer.tsx        # footer

netlify/functions/
  brevo-signup.js   # serverless function: adds email to Brevo list

public/images/      # all site images
emails/             # MJML email templates (build with npm run emails:build)
```

## Content changes

**Almost all copy lives in `lib/constants.ts`.** Edit that file first for any text change. Components import and render the exported values — they do not hardcode copy.

Key exports in `lib/constants.ts`:
- `BRAND_TAGLINE`, `BRAND_STATEMENT` — hero headline and tagline
- `CTA_TEXT`, `CTA_SUBTEXT` — call-to-action button and subtext
- `BENEFITS` — array of benefit cards (title, description, lucide-react icon)
- `PRODUCTS` — object with MindSerum™ and Ritual Mist™ details
- `RITUAL_STEPS` — array of 3-step ritual guide items
- `SOCIAL_LINKS`, `CONTACT_EMAIL` — footer links

## Non-technical edits (lp agent)

Team members without coding experience can use the `lp` script:

```bash
./lp change "Update the hero headline to 'Better Skin. Calmer Mind.'"
./lp add "Add a new benefit: Vegan Formula – 100% plant-based ingredients"
./lp deploy
```

The sub-agent definition is in `.claude/agents/landing-page-editor.md`.

## Styling

- Tailwind CSS with custom brand tokens defined in `tailwind.config.js`
- Brand colors: `moya-taupe`, `moya-rose-clay`, `moya-warm-beige`, `moya-stone`, `moya-charcoal`
- Fonts: `font-heading` (display), `font-body` (body text)
- Animations via Framer Motion (`framer-motion`)

## Icons

Uses `lucide-react`. Add new icons with a named import: `import { IconName } from 'lucide-react'`

## Email templates

MJML source in `emails/`. Build and upload with `npm run emails:deploy`. See `docs/EMAIL_SETUP.md`.

## Deployment

Netlify auto-deploys from pushes to `main`. Build command: `npm run build`. Publish dir: `out`. Functions dir: `netlify/functions`.

For manual deploy: `netlify deploy --prod --dir=out`

Environment variables required: see `.env.example`.
