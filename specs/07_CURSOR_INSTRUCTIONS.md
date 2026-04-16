# Cursor Build Instructions

## How to use these files

Each `.md` file in this folder is a Cursor Composer prompt. Paste them one at a time into Cursor Composer in the order below. Always use **plan mode first**, review the plan, then execute.

**Order:**
1. `00_OVERVIEW.md` — paste first to initialise the project scaffold
2. `01_DESIGN_TOKENS.md` — set up globals.css and tailwind.config.ts
3. `02_NAV_LAYOUT.md` — build Nav, MobileMenu, root layout
4. `03_PAGE_HOME.md` — build home page
5. `04_PAGE_APPARTAMENTI.md` — build apartments page + data file
6. `05_PAGES_PROGETTO_POSIZIONE_CONTATTI.md` — remaining 3 pages
7. `06_CHATBOT_MODAL.md` — chatbot component + API route + modal system

---

## Project initialisation (run before anything)

```bash
npx create-next-app@latest residenza-caslano \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd residenza-caslano
npm install @anthropic-ai/sdk
npm install clsx tailwind-merge
```

Create `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Cursor rules file — `.cursorrules`

Create this file in the project root before starting. It keeps Cursor aligned with the design system on every generation.

```
# Residenza Caslano — Cursor Rules

## Stack
- Next.js 14 App Router, TypeScript strict, Tailwind CSS
- Fonts: Cormorant Garamond (serif) + Jost (sans) via next/font
- No UI library — all components custom

## Design rules (NEVER break these)
- All colours from CSS variables: --charcoal, --amber, --cream, --offwhite, --travertine, --muted, --stone, --bronze
- Headings always font-weight: 300 (font-light). Never bold headings.
- Italic in headings: <em> tag with opacity 50% of parent colour
- All borders: 0.5px (half-pixel). Never 1px borders on UI elements.
- All buttons: no border-radius (sharp corners), min-height 48px
- All inputs/selects: font-size 16px minimum (iOS zoom prevention)
- Grid gaps: use background-color trick (bg-travertine container + bg-offwhite children), NOT gap utility
- Safe area insets on all page padding and fixed elements

## Component rules
- 'use client' only when hooks or browser APIs are needed
- Server components by default
- No inline styles except for CSS custom properties and clamp() values
- Images: always use next/image with fill + object-cover
- Page containers: fixed inset-0 overflow-y-scroll with padding-top: var(--nav-h)

## File limits
- Max 150 lines per component file
- Split large components into subcomponents
- Co-locate types with their component

## Naming
- Components: PascalCase
- Hooks: useXxx
- Utils: camelCase
- CSS classes: kebab-case (Tailwind arbitrary values only when no utility exists)
```

---

## Image setup

Copy all 12 images to `/public/images/` with these exact filenames:

```
hero.jpg
courtyard.jpg
facade_evening.jpg
alley.jpg
outdoor.jpg
terrace.jpg
elevation.jpg
ground_floor.jpg
corner.jpg
aerial_lake.jpg
aerial_render.jpg
courtyard2.jpg
```

Add to `next.config.js` if using external images (not needed if local):
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
}
module.exports = nextConfig
```

---

## Key implementation notes for Cursor

### Page scroll isolation
Each page must be `position: fixed; inset: 0; overflow-y: scroll`. This is critical — without it, the outer document scrolls instead of the page content.

### Nav dark mode on home
The Nav uses `usePathname()` to detect `/` and switches to dark mode. This must be a `'use client'` component.

### Global state for modal + mobile menu
Use React Context (simpler) or Zustand. Create `lib/store.ts`:

```ts
// Minimal Zustand store
import { create } from 'zustand'

interface AppStore {
  mobileMenuOpen: boolean
  openMobileMenu: () => void
  closeMobileMenu: () => void

  modal: { type: 'call' | 'visit' | 'apt' | null; apt?: any }
  openModal: (type: string, apt?: any) => void
  closeModal: () => void

  chatOpen: boolean
  toggleChat: () => void
  openChat: () => void
}
```

If not using Zustand, use `createContext` + `useReducer`.

### Mobile filter toggle
On the Appartamenti page, the filter bar must:
- Show as a single-line horizontal bar on `md+`
- Show as a collapsed toggle button on mobile
- Expand below the toggle when tapped

Use a `useState<boolean>` for `filterOpen`, toggled on mobile only.

### Chat panel mobile
On screens `< 480px`, the chat panel changes position from bottom-right float to a full-width bottom sheet. Implement with:

```tsx
const isMobile = useMediaQuery('(max-width: 480px)')
```

Or use a CSS-only approach with `@media` variants in the className.

### iOS input zoom prevention
CRITICAL: Every `<input>`, `<select>`, `<textarea>` must have `style={{ fontSize: '16px' }}` or `text-base` (16px) to prevent iOS Safari from zooming on focus. The Tailwind class `text-[16px]` works.

### Vercel deployment

```bash
vercel --prod
```

Set environment variables in Vercel dashboard:
- `ANTHROPIC_API_KEY` → your key

The site deploys as a static + serverless hybrid. The `/api/chat` route becomes a serverless function. All other pages are statically generated.

---

## Recommended Cursor prompts per file

### After pasting 00_OVERVIEW.md:
```
Create the Next.js 14 project scaffold with this exact folder structure. Install @anthropic-ai/sdk. Create the .cursorrules file. Do not create any page content yet.
```

### After pasting 01_DESIGN_TOKENS.md:
```
Set up globals.css with all CSS variables as specified. Configure tailwind.config.ts to extend the theme with the exact colour values. Set up the Google Fonts loading in app/layout.tsx with Cormorant Garamond and Jost. Do not add any other styles yet.
```

### After pasting 02_NAV_LAYOUT.md:
```
Build the Nav component, MobileMenu component, and root layout exactly as specified. The Nav must use usePathname to switch between dark and light modes. The mobile menu must slide in from the right with the overlay. Add the Footer component.
```

### After pasting 03_PAGE_HOME.md:
```
Build the home page (app/page.tsx) exactly as specified. The hero image must use object-position: center 72% to show the building facade not the sky. The two CTA buttons must stack vertically on mobile and side-by-side on larger screens. Include the teaser cards and stats strip.
```

### After pasting 04_PAGE_APPARTAMENTI.md:
```
Create lib/apartments.ts with all 36 apartment objects and helper functions exactly as specified. Build the Appartamenti page with the filter bar (collapsible on mobile) and the AptCard component. Wire up live filtering. Each card click should call openModal('apt', apt).
```

### After pasting 05_PAGES_PROGETTO_POSIZIONE_CONTATTI.md:
```
Build all three remaining pages exactly as specified. The Posizione page must be a two-column full-height layout. The Contatti page must have the split left/right panels. All scheduling buttons must call openModal().
```

### After pasting 06_CHATBOT_MODAL.md:
```
Build the Chatbot component, the /api/chat route, and the global Modal system exactly as specified. The chatbot must be a bottom sheet on mobile and a floating panel on desktop. The modal system must handle all three modal types. Wire up all openModal() and openChat() calls throughout the existing pages.
```
