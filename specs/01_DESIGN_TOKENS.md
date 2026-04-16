# Design Tokens & Global Styles

## CSS Variables

Add to `styles/globals.css`. These are the single source of truth for all colours, typography and spacing. Never hardcode values — always reference a variable.

```css
:root {
  /* Colour palette — pulled directly from the travertine building */
  --stone:        #C8BA9F;   /* warm stone mid */
  --travertine:   #D6C9AF;   /* light travertine — borders, grid gaps */
  --charcoal:     #1E1D1B;   /* near-black — primary text, dark surfaces */
  --bronze:       #2D2926;   /* darker near-black — footer bg */
  --amber:        #C8884A;   /* warm amber — primary CTA, accents */
  --muted:        #8A8070;   /* warm grey — secondary text, labels */
  --cream:        #F5F0E6;   /* warm off-white — section backgrounds */
  --offwhite:     #FDFAF4;   /* page background, card backgrounds */

  /* Typography */
  --serif:        'Cormorant Garamond', serif;
  --sans:         'Jost', sans-serif;

  /* Layout */
  --nav-h:        64px;
}
```

---

## Tailwind config additions

In `tailwind.config.ts`, extend the theme to expose these tokens as Tailwind classes:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stone:       '#C8BA9F',
        travertine:  '#D6C9AF',
        charcoal:    '#1E1D1B',
        bronze:      '#2D2926',
        amber:       '#C8884A',
        muted:       '#8A8070',
        cream:       '#F5F0E6',
        offwhite:    '#FDFAF4',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans:  ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

---

## Google Fonts

In `app/layout.tsx`, load via `next/font/google`:

```tsx
import { Cormorant_Garamond, Jost } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})
```

Apply both variables to the `<html>` element:
```tsx
<html className={`${cormorant.variable} ${jost.variable}`}>
```

---

## Typography scale

| Name | Font | Size | Weight | Usage |
|---|---|---|---|---|
| Hero title | serif | clamp(56px, 7.5vw, 106px) | 300 | Hero H1 |
| Page H1 | serif | clamp(32px, 5vw, 60px) | 300 | Page heroes |
| Section H2 | serif | clamp(26px, 4vw, 42px) | 300 | Content sections |
| Teaser title | serif | clamp(22px, 4vw, 28px) | 300 | Cards |
| Price | serif | 22px–26px | 300 | Apartment pricing |
| Stats large | serif | clamp(22px, 4vw, 30px) | 300 | Number callouts |
| Body | sans | 14px | 300 | All body copy |
| Label/eyebrow | sans | 8–9px | 400 | Uppercase labels, letter-spacing 0.22em |
| Nav links | sans | 10px | 400 | Navigation |
| Button text | sans | 10–11px | 400 | CTAs |

**Rule:** Headings always `font-weight: 300`. Italic variant (`<em>`) always at `opacity: 0.5` of the parent colour. Never use font-weight above 500 anywhere in the UI.

---

## Spacing system

Use Tailwind's default scale. Key values used throughout:

| Token | px | Usage |
|---|---|---|
| `p-5` | 20px | Mobile padding |
| `p-6` | 24px | Mobile padding (cards) |
| `p-12` / `p-14` | 48–56px | Section padding desktop |
| `gap-0.5px` | 0.5px | Grid dividers (use background color trick) |
| `gap-2px` | 2px | Gallery grid gaps |

**Grid gap trick** — instead of `gap`, set `background: var(--travertine)` on the grid container and `background: var(--offwhite)` on each child. The 2px gap between children shows the travertine colour as a divider.

```tsx
// Example
<div className="grid grid-cols-3 gap-[2px] bg-travertine">
  <div className="bg-offwhite p-6">...</div>
  <div className="bg-offwhite p-6">...</div>
</div>
```

---

## Border style

All borders use `0.5px` (half-pixel) — this is intentional, gives an extremely fine, premium feel:

```css
border: 0.5px solid rgba(30, 29, 27, 0.10);   /* light surface */
border: 0.5px solid rgba(255, 255, 255, 0.08); /* dark surface */
border: 0.5px solid var(--travertine);          /* mid surface */
```

---

## Button variants

Three button types used across the site. Build as a `Button` component with a `variant` prop.

### `primary` (amber filled)
```css
background: var(--amber);
color: #fff;
border: none;
padding: 14px 28px;
font-size: 11px;
letter-spacing: 0.14em;
text-transform: uppercase;
font-family: var(--sans);
font-weight: 400;
min-height: 48px;
transition: opacity 0.2s;
/* hover: opacity 0.85 */
```

### `outline-dark` (charcoal outline on light bg)
```css
background: transparent;
border: 0.5px solid var(--charcoal);
color: var(--charcoal);
padding: 13px 26px;
/* same type settings as primary */
/* hover: background charcoal, color offwhite */
```

### `ghost-light` (white outline on dark/image bg)
```css
background: transparent;
border: 0.5px solid rgba(255, 255, 255, 0.5);
color: #fff;
/* hover: background rgba(255,255,255,0.1) */
```

All buttons: `min-height: 48px`, no border-radius (sharp corners), `white-space: nowrap`.

---

## Overlay / veil patterns

Used on every full-bleed image section:

```css
/* Hero veil — gradient from bottom */
background: linear-gradient(
  to top,
  rgba(28, 27, 25, 0.78) 0%,
  rgba(28, 27, 25, 0.15) 55%,
  rgba(28, 27, 25, 0) 100%
);

/* Page hero veil — lighter */
background: linear-gradient(
  to top,
  rgba(28, 27, 25, 0.65) 0%,
  rgba(28, 27, 25, 0.10) 100%
);

/* Teaser card veil */
background: linear-gradient(
  to top,
  rgba(28, 27, 25, 0.72) 0%,
  rgba(28, 27, 25, 0.08) 65%,
  transparent 100%
);
```

---

## Safe area insets (iOS)

Apply on all fixed/sticky elements and page bottom padding:

```css
padding-top:    env(safe-area-inset-top, 0px);
padding-bottom: max(24px, calc(env(safe-area-inset-bottom) + 24px));
padding-left:   max(20px, env(safe-area-inset-left));
padding-right:  max(20px, env(safe-area-inset-right));
```

In Tailwind, use arbitrary values:
```tsx
className="pb-[max(24px,calc(env(safe-area-inset-bottom)+24px))]"
```

---

## Animations

**Page transition** — fade + slight vertical drift:
```css
@keyframes pageIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.page-enter { animation: pageIn 0.35s ease forwards; }
```

**Image hover zoom** — on all photo cards:
```css
.img-wrap { overflow: hidden; }
.img-wrap img { transition: transform 0.7s ease; }
.img-wrap:hover img { transform: scale(1.05); }
```

**Typing indicator dots** (chatbot):
```css
@keyframes typingPulse {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30%           { transform: translateY(-5px); opacity: 1; }
}
.dot:nth-child(1) { animation: typingPulse 1.2s ease-in-out infinite; }
.dot:nth-child(2) { animation: typingPulse 1.2s ease-in-out infinite 0.2s; }
.dot:nth-child(3) { animation: typingPulse 1.2s ease-in-out infinite 0.4s; }
```
