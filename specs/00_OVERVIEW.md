# Residenza Caslano — Project Overview

## What we are building

A multi-page real estate marketing website for **Residenza Caslano**, a luxury residential complex of 36 apartments across 3 blocks (A, B, C) in Caslano, Canton Ticino, Switzerland, on the shores of Lago di Lugano.

The site is Italian-language first, targets Swiss and Italian buyers, and must work flawlessly on iPhone (all sizes) and desktop.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript strict |
| Styling | Tailwind CSS + CSS variables for tokens |
| Fonts | Google Fonts: Cormorant Garamond + Jost |
| State | React useState / useReducer (no external store) |
| AI Chatbot | Anthropic Claude API via `/api/chat` route |
| Deployment | Vercel |

No UI component libraries. All components custom-built from scratch to match the exact design.

---

## Folder structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with fonts, nav, chatbot, modals
│   ├── page.tsx            # Home page
│   ├── progetto/page.tsx   # Il Progetto
│   ├── appartamenti/page.tsx
│   ├── posizione/page.tsx
│   ├── contatti/page.tsx
│   └── api/
│       └── chat/route.ts   # Claude proxy endpoint
├── components/
│   ├── Nav.tsx
│   ├── MobileMenu.tsx
│   ├── Chatbot.tsx
│   ├── Modal.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── AptCard.tsx
│       └── Teaser.tsx
├── lib/
│   ├── apartments.ts       # All 36 apartment data objects
│   └── constants.ts        # Site config, POIs
├── public/
│   └── images/             # All 12 project images
└── styles/
    └── globals.css         # CSS variables + base styles
```

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero + teaser cards + stats strip |
| `/progetto` | Architecture description + gallery |
| `/appartamenti` | Filterable grid of all 36 units |
| `/posizione` | Aerial map + distances + POI list |
| `/contatti` | Contact form + booking buttons |

Navigation between pages uses Next.js `<Link>` with a custom page transition (fade + slight translateY).

---

## Key behaviours

- Nav is **transparent + dark text** on all inner pages, **semi-transparent dark** on the home hero
- On mobile, desktop nav links are hidden and replaced with a **hamburger → slide-in drawer**
- All pages are **full-height**, scroll happens within each page independently
- The **chatbot** floats fixed bottom-right on every page, powered by Claude API
- **Booking modals** (call / visit / apartment detail) are global and triggered from multiple places
- The apartment filter bar **collapses to a toggle on mobile**, expands inline
- All `<input>` and `<select>` elements have `font-size: 16px` to prevent iOS zoom
- Safe area insets applied everywhere via `env(safe-area-inset-*)`

---

## Image assets

All images live in `/public/images/`. File names match the keys below:

| Key | File | Used on |
|---|---|---|
| `hero` | `hero.jpg` | Home hero |
| `courtyard` | `courtyard.jpg` | Home teaser, Progetto split |
| `facade_evening` | `facade_evening.jpg` | Gallery strip, Progetto hero |
| `alley` | `alley.jpg` | Gallery strip, Progetto gallery |
| `outdoor` | `outdoor.jpg` | Gallery strip, Progetto feature |
| `terrace` | `terrace.jpg` | Apt card Block A |
| `elevation` | `elevation.jpg` | Home teaser, Apt card Block C |
| `ground_floor` | `ground_floor.jpg` | Apt card ground floor |
| `corner` | `corner.jpg` | Apt card ground floor alt |
| `aerial_lake` | `aerial_lake.jpg` | Home teaser, Posizione |
| `aerial_render` | `aerial_render.jpg` | Gallery strip 2 |
| `courtyard2` | `courtyard2.jpg` | Progetto gallery |
