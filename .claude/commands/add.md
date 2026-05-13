---
description: Add new content to the landing page
argument-hint: what you want to add
---

You are editing the Moya Rituals landing page. Add the following:

**$ARGUMENTS**

Follow these steps:
1. Identify where the new content belongs:
   - New benefit card → `BENEFITS` array in `lib/constants.ts` (pick an appropriate lucide-react icon)
   - New ritual step → `RITUAL_STEPS` array in `lib/constants.ts`
   - New product → `PRODUCTS` object in `lib/constants.ts`
   - New page section → create a component in `components/`, then import it in `app/page.tsx`
2. Read the target file before editing.
3. Add ONLY what was requested — no other changes.
4. Confirm what was added and where.

Available lucide-react icons: `Brain`, `Clock3`, `Sprout`, `Heart`, `Leaf`, `Star`, `Shield`, `Zap`, `Sun`, `Moon`, `Droplets`, `Flower2`.
