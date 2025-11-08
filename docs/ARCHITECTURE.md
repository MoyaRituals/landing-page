# Architecture Documentation

## Table of Contents
1. [Technology Decisions](#technology-decisions)
2. [Static Export Rationale](#static-export-rationale)
3. [Component Architecture](#component-architecture)
4. [A/B Testing Implementation](#ab-testing-implementation)
5. [Migration Path to Server Features](#migration-path-to-server-features)

---

## Technology Decisions

### Why Next.js with Static Export?

**Decision**: Use Next.js 16 configured for static site generation (SSG) instead of server-side rendering or a simpler static site generator.

**Rationale**:
1. **Best of Both Worlds**
   - Write modern React components (great DX)
   - Export to pure HTML/CSS/JS (best performance)
   - No server needed (zero hosting cost)

2. **Lean Startup Alignment**
   - Fast to market (familiar React ecosystem)
   - Easy to iterate (component-based architecture)
   - Validate first, add complexity later

3. **Future-Proof**
   - Can add server features by removing one line of config
   - Smooth migration path when ready to scale
   - All code stays the same

4. **Performance**
   - Static HTML loads instantly
   - Critical for ad traffic (short attention spans)
   - Better SEO (Google loves static content)

### Why TypeScript?

**Decision**: Use TypeScript instead of JavaScript

**Rationale**:
- Type safety prevents bugs (especially in API integrations)
- Better IDE support (autocomplete, refactoring)
- Self-documenting code (types show intent)
- Scales better as team/codebase grows

### Why Tailwind CSS?

**Decision**: Use Tailwind instead of CSS Modules or styled-components

**Rationale**:
- Utility-first allows rapid iteration
- Brand colors defined once in config
- Consistent spacing/typography system
- Smaller bundle size (purges unused styles)
- Great mobile-first responsive design

### Why Framer Motion?

**Decision**: Use Framer Motion for animations instead of CSS transitions

**Rationale**:
- Declarative API (easier to maintain)
- Spring-based animations (more natural feel)
- Scroll-triggered animations (viewport detection)
- Production-ready (used by major brands)

---

## Static Export Rationale

### How It Works

```javascript
// next.config.js
module.exports = {
  output: 'export',  // This one line enables static export
}
```

**Build Process**:
1. `npm run build` → Next.js renders all pages to static HTML
2. Output goes to `/out` directory
3. Upload `/out` to any static host (Netlify, Vercel, S3, etc.)

**What You Get**:
- `index.html` - Pre-rendered home page
- `_next/` - JavaScript bundles (React hydration)
- `images/` - Optimized images
- `robots.txt`, `sitemap.xml` - SEO files

### Trade-offs

| Feature | Static Export | Server-Side |
|---------|--------------|-------------|
| **Hosting Cost** | $0 (Netlify free) | $0-$20/mo (Vercel/AWS) |
| **Page Load Speed** | Instant HTML | Slight delay (SSR) |
| **API Routes** | ❌ No | ✅ Yes |
| **Dynamic Data** | Client-side only | Server + Client |
| **SEO** | ✅ Perfect | ✅ Good |
| **Complexity** | Low | Medium |

**For MVP**: Static export wins (speed + cost + simplicity)

**For Scale**: Server-side becomes valuable (see Migration Path below)

---

## Component Architecture

### Design Principles

1. **Separation of Concerns**
   - Each component has one responsibility
   - Presentational vs. Container components
   - Business logic in `/lib`, not components

2. **Reusability**
   - `ProductCard` used for both products
   - `CTAButton` used throughout (A/B tracking built-in)
   - Consistent patterns

3. **Modularity**
   - Easy to add/remove sections
   - Components don't depend on each other
   - Page is just an assembly of components

### Component Hierarchy

```
app/page.tsx (Main Page)
├── Header
│   └── CTAButton (Join Waitlist)
├── Hero
│   ├── CTAButton (A/B variant)
│   └── Scroll Indicator
├── BenefitsGrid
│   └── Benefit Cards (3x)
├── ProductShowcase
│   ├── ProductCard (Ritual Mist)
│   └── ProductCard (MindSerum)
├── RitualSteps
│   └── Step Items (3x)
├── FounderStory
│   └── Image + Text
├── EmailSignupForm
│   ├── Form Fields
│   ├── Success State
│   └── Error Handling
└── Footer
    └── Links & Contact
```

### Client vs. Server Components

**Client Components** (marked with `'use client'`):
- `Hero` - Uses Framer Motion animations
- `EmailSignupForm` - Form state, API calls
- `CTAButton` - Click tracking
- `BenefitsGrid`, `ProductShowcase`, `RitualSteps`, `FounderStory` - Animations

**Server Components** (default):
- `Header` - Static content
- `Footer` - Static content
- `ProductCard` - Pure presentation

**Why This Split**:
- Server components = smaller JavaScript bundle
- Client components = interactive features
- Best balance for performance

---

## A/B Testing Implementation

### Random Variant Assignment

```typescript
// In Hero.tsx and EmailSignupForm.tsx
const [variant, setVariant] = useState<CTAVariant>('A')

useEffect(() => {
  setVariant(Math.random() < 0.5 ? 'A' : 'B')
}, [])
```

**Why client-side randomization?**
- Static export = can't do server-side
- Simple 50/50 split
- Good enough for MVP validation

**For production**, consider:
- Cookie-based persistence (same user always sees same variant)
- More sophisticated tools (Google Optimize, Optimizely)
- Server-side assignment (after migration)

### Data Collection

**What We Track**:
1. **In Brevo** - Which variant user signed up from (CTA_VARIANT attribute)
2. **In Google Analytics** - CTA clicks and form submissions by variant

**Analysis**:
```
Conversion Rate A = (Signups from A) / (Visitors who saw A)
Conversion Rate B = (Signups from B) / (Visitors who saw B)
```

Use statistical significance calculator to determine winner.

---

## Migration Path to Server Features

### When to Migrate

Migrate when you need:
- **E-commerce** (secure payment processing)
- **User accounts** (authentication, order tracking)
- **Dynamic content** (inventory levels, personalization)
- **API integrations** (webhooks, third-party services)

### How to Migrate (30 Minutes)

**Step 1**: Remove static export
```javascript
// next.config.js
module.exports = {
  // output: 'export',  // DELETE THIS LINE
  images: {
    unoptimized: false, // Re-enable image optimization
  },
}
```

**Step 2**: Deploy to Vercel (or similar Node.js host)
```bash
npm install -g vercel
vercel  # Follow prompts
```

**Step 3**: Add server features as needed

Example - API route for Brevo (hides API key):
```typescript
// app/api/signup/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, name, variant } = await request.json()

  // Server-side Brevo call (API key hidden)
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY, // Server-only env var
    },
    body: JSON.stringify({ email, attributes: { name, variant } }),
  })

  return NextResponse.json({ success: true })
}
```

Then update EmailSignupForm to call `/api/signup` instead of Brevo directly.

**Step 4**: Environment variables
- Move from `NEXT_PUBLIC_*` to regular env vars (server-only)
- More secure (keys never exposed to browser)

### What Stays the Same

- ✅ All React components (no changes needed)
- ✅ Tailwind styles
- ✅ Brand assets
- ✅ Page structure
- ✅ Routing

**Only changes**:
- Deployment target (Netlify → Vercel/AWS)
- Add API routes as needed
- Update fetch calls to use API routes

---

## Performance Optimizations

### Current Optimizations

1. **Static HTML** - No server rendering delay
2. **Font Loading** - `display: swap` prevents FOIT
3. **Image Loading** - Next/Image with `priority` for hero
4. **CSS Purging** - Tailwind removes unused styles
5. **Code Splitting** - Next.js automatically splits by route
6. **Lazy Loading** - Images below fold load on demand

### Lighthouse Targets

- **Performance**: 90+ (static HTML helps)
- **Accessibility**: 95+ (semantic HTML, ARIA labels)
- **Best Practices**: 95+
- **SEO**: 100 (static content, meta tags)

### Monitoring

Use Netlify Analytics (free) to track:
- Page load time
- Time to first byte
- Core Web Vitals

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Nov 2025 | Next.js Static Export | Balance of DX and performance |
| Nov 2025 | TypeScript | Type safety for API integrations |
| Nov 2025 | Brevo for Email | Best free tier (unlimited contacts) |
| Nov 2025 | Client-side A/B | Simplest for static export |
| Nov 2025 | Netlify Hosting | Free, fast, easy deployment |
| Nov 2025 | ImprovMX Email | Free forwarding for MVP |

---

## Questions?

See other guides:
- [DEPLOYMENT.md](DEPLOYMENT.md) - How to deploy
- [BREVO_SETUP.md](BREVO_SETUP.md) - Email integration
- [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md) - Tracking setup
