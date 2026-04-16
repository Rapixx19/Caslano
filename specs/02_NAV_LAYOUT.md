# Navigation & Layout

## Root layout — `app/layout.tsx`

The root layout wraps every page. It renders:
- `<Nav>` (fixed top)
- `<MobileMenu>` (slide-in drawer, hidden by default)
- `{children}` with top padding equal to `--nav-h`
- `<Chatbot>` (fixed bottom-right, all pages)
- `<Modal>` (global modal system, all pages)
- `<Footer>` inside each page (not here)

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-offwhite text-charcoal overflow-hidden fixed w-full h-full">
        <Nav />
        <MobileMenu />
        <main style={{ paddingTop: 'var(--nav-h)' }}>
          {children}
        </main>
        <Chatbot />
        <Modal />
      </body>
    </html>
  )
}
```

The `overflow-hidden fixed` on body prevents the outer document from scrolling. Each page manages its own scroll independently via `overflow-y: scroll` on its page container.

---

## Nav component — `components/Nav.tsx`

### Behaviour
- Fixed, full width, `z-index: 400`, height `64px`
- **Home page:** semi-transparent dark background (`rgba(28,27,25,0.55)`) — logo and links in white
- **All other pages:** near-opaque light background (`rgba(253,250,244,0.97)`) — logo and links in charcoal
- The nav switches mode based on current route using `usePathname()`
- Backdrop blur: `blur(16px)` with `-webkit-backdrop-filter` fallback
- Bottom border: `0.5px solid` — dark-mode `rgba(255,255,255,0.08)`, light-mode `rgba(30,29,27,0.10)`

### Desktop layout
Logo left, links right. Links disappear at `md` breakpoint (768px).

```
[Residenza Caslano    ]  [Home] [Il Progetto] [Appartamenti] [Posizione] [Contatti →]
[LAGO DI LUGANO ...]
```

### Mobile layout
Logo left, hamburger icon right. All nav links hidden.

```
[Residenza Caslano    ]                                                   [☰]
[LAGO DI LUGANO ...]
```

### Nav link active state
Active route link gets `color: var(--amber)`. Non-active hover also uses amber.

### Contatti button
The "Contatti" item is styled as `outline-dark` button variant (or `ghost-light` when in dark mode). It navigates to `/contatti`.

### Component structure

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Nav() {
  const pathname = usePathname()
  const isDark = pathname === '/'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[400] h-[64px] flex items-center justify-between
      px-[max(20px,env(safe-area-inset-left))]
      backdrop-blur-md
      border-b
      transition-all duration-300
      ${isDark
        ? 'bg-[rgba(28,27,25,0.55)] border-white/8'
        : 'bg-[rgba(253,250,244,0.97)] border-charcoal/10'
      }`}
    >
      <Link href="/" className="flex flex-col leading-none cursor-pointer">
        <span className={`font-serif text-[19px] font-light tracking-[0.06em] transition-colors
          ${isDark ? 'text-white' : 'text-charcoal'}`}>
          Residenza Caslano
        </span>
        <span className={`font-sans text-[8px] tracking-[0.26em] uppercase mt-[3px] transition-colors
          ${isDark ? 'text-white/40' : 'text-muted'}`}>
          Lago di Lugano · Canton Ticino
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-[30px]">
        {['/', '/progetto', '/appartamenti', '/posizione'].map(href => (
          <Link key={href} href={href}
            className={`font-sans text-[10px] tracking-[0.13em] uppercase transition-colors
              ${pathname === href ? 'text-amber' : isDark ? 'text-white/75 hover:text-white' : 'text-charcoal hover:text-amber'}`}>
            {{ '/': 'Home', '/progetto': 'Il Progetto', '/appartamenti': 'Appartamenti', '/posizione': 'Posizione' }[href]}
          </Link>
        ))}
        <Link href="/contatti"
          className={`font-sans text-[10px] tracking-[0.14em] uppercase px-5 py-[9px] border transition-all
            ${isDark
              ? 'border-white/45 text-white hover:bg-white hover:text-charcoal'
              : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-offwhite'
            }`}>
          Contatti
        </Link>
      </div>

      {/* Hamburger */}
      <button className="md:hidden flex flex-col justify-center gap-[5px] w-11 h-11 p-2"
        onClick={() => openMobileMenu()}
        aria-label="Menu">
        <span className={`block h-px transition-colors ${isDark ? 'bg-white' : 'bg-charcoal'}`} />
        <span className={`block h-px transition-colors ${isDark ? 'bg-white' : 'bg-charcoal'}`} />
        <span className={`block h-px transition-colors ${isDark ? 'bg-white' : 'bg-charcoal'}`} />
      </button>
    </nav>
  )
}
```

---

## Mobile menu — `components/MobileMenu.tsx`

### Behaviour
- Slides in from the right, full height
- Dark overlay covers the rest of the screen
- Width: `min(320px, 85vw)`
- Closes when: overlay tapped, close button pressed, link tapped
- Body scroll locked while open

### Visual spec
- Background: `var(--offwhite)`
- Each link: full width, `18px` padding vertical, `32px` padding horizontal
- Link font: `font-sans`, `15px`, `tracking-[0.08em]`, uppercase, `font-light`
- Border between links: `0.5px solid rgba(30,29,27,0.07)`
- Active link: `color: var(--amber)`
- Bottom CTA button: full width, `bg-charcoal`, white text — navigates to `/contatti`

```tsx
'use client'
import { useMobileMenu } from '@/lib/store' // or Context

export function MobileMenu() {
  const { isOpen, close } = useMobileMenu()

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[500] backdrop-blur-sm bg-charcoal/55 transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-[501] w-[min(320px,85vw)] bg-offwhite
        flex flex-col
        pt-[max(64px,env(safe-area-inset-top))]
        pb-[max(32px,env(safe-area-inset-bottom))]
        pr-[env(safe-area-inset-right)]
        transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button className="absolute top-[14px] right-4 w-11 h-11 flex items-center justify-center text-muted text-[22px]"
          onClick={close}>✕</button>

        <nav className="flex-1 overflow-y-auto pt-8">
          {[
            { href: '/',              label: 'Home' },
            { href: '/progetto',      label: 'Il Progetto' },
            { href: '/appartamenti',  label: 'Appartamenti' },
            { href: '/posizione',     label: 'Posizione' },
            { href: '/contatti',      label: 'Contatti' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={close}
              className="block w-full text-left px-8 py-[18px] font-sans text-[15px] tracking-[0.08em] uppercase text-charcoal font-light border-b border-charcoal/7 hover:text-amber transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-8 pt-6">
          <Link href="/contatti" onClick={close}
            className="block w-full text-center bg-charcoal text-white font-sans text-[11px] tracking-[0.16em] uppercase py-4">
            Richiedi informazioni
          </Link>
        </div>
      </div>
    </>
  )
}
```

---

## Page container pattern

Every page component wraps its content in this container. This enables per-page independent scrolling:

```tsx
// Standard page wrapper
<div className="fixed inset-0 overflow-y-scroll overflow-x-hidden"
  style={{ paddingTop: 'var(--nav-h)', WebkitOverflowScrolling: 'touch' }}>
  {/* page content */}
</div>
```

Apply `overscroll-behavior: contain` to prevent scroll chaining on iOS.

---

## Page transition

Wrap page content in a motion div (use Framer Motion or a simple CSS class):

```tsx
// Simple CSS approach — add to each page's outermost div
className="animate-pageIn"

// In globals.css:
@keyframes pageIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-pageIn {
  animation: pageIn 0.35s ease forwards;
}
```

---

## Footer — `components/Footer.tsx`

Used at the bottom of every page. Always placed inside the page scroll container, not in the root layout.

```
Background: var(--bronze) #2D2926
Padding: 32px horizontal (safe area aware)
Layout: flex row, space-between, wrap on mobile

Left:   "Residenza Caslano"  [serif 17px font-light]
        "LAGO DI LUGANO · TICINO"  [sans 8px tracking uppercase muted]

Center: Privacy  Cookie  Documenti  [sans 9px tracking uppercase white/28]

Right:  "© 2025 Residenza Caslano"  [10px white/15]
```

On mobile, stack vertically with `gap-5` between items, center-aligned.
