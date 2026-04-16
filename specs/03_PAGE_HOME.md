# Page: Home — `app/page.tsx`

## Layout overview

```
┌─────────────────────────────────────┐
│  HERO (100svh - nav height)         │
│  Full-bleed image + veil + text     │
│  Title + 2 CTA buttons              │
│  Stats strip bottom-right (desktop) │
├─────────────────────────────────────┤
│  TEASERS (3 cards)                  │
│  Click → navigate to page           │
├─────────────────────────────────────┤
│  STATS STRIP (dark)                 │
│  4 key numbers                      │
├─────────────────────────────────────┤
│  FOOTER                             │
└─────────────────────────────────────┘
```

---

## Hero section

### Image
- File: `/images/hero.jpg`
- `object-fit: cover`, `object-position: center 72%` — anchors to building, not sky
- Absolute fill behind all content

### Veil
```css
background: linear-gradient(
  to top,
  rgba(28,27,25,0.78) 0%,
  rgba(28,27,25,0.15) 55%,
  rgba(28,27,25,0) 100%
);
```

### Content (bottom-left)
Positioned at bottom of hero with padding:
- Mobile: `px-5 pb-10 pb-[max(40px,calc(env(safe-area-inset-bottom)+20px))]`
- Desktop: `px-[52px] pb-16`

**Eyebrow text:**
```
CASLANO · CANTON TICINO · SVIZZERA
font-sans, 9px, tracking-[0.24em], uppercase, white/45, font-light
margin-bottom: 14px
```

**H1 title:**
```
Pietra,
luce
e natura.
```
- `font-serif`, `clamp(52px, 11vw, 108px)`, `font-light`, `text-white`, `leading-[0.9]`
- "natura" in `<em>` — italic, `text-white/50`
- `margin-bottom: 32px`

**CTA buttons:**
Stack vertically on mobile (`< 480px`), row on larger screens.

Button 1: `primary` variant — "ESPLORA GLI APPARTAMENTI" → navigates to `/appartamenti`
Button 2: `ghost-light` variant — "HAI DOMANDE?" → opens chatbot (`openChat()`)

Both buttons: `min-height: 48px`, `max-width: fit-content`, no full-width stretching on mobile.

### Stats (bottom-right, desktop only — hidden on mobile)

```
┌──────────────┬──────────────┬──────────────┐
│     36       │   CHF 725K   │      3       │
│ Appartamenti │  A partire   │   Blocchi    │
│              │      da      │              │
└──────────────┴──────────────┴──────────────┘
```

- Positioned `absolute right-6 bottom-10` (desktop)
- Each stat: `text-right`, `padding: 12px 20px`, `border-left: 0.5px solid rgba(255,255,255,0.15)`
- Number: `font-serif 28px font-light text-white`
- Label: `font-sans 8px tracking-[0.16em] uppercase text-white/40 mt-1`
- Hide completely on `< 480px`

```tsx
<section className="relative h-[calc(100svh-64px)] min-h-[500px] overflow-hidden flex items-end">
  <Image src="/images/hero.jpg" fill className="object-cover object-[center_72%]" alt="Residenza Caslano" priority />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,27,25,0.78) 0%, rgba(28,27,25,0.15) 55%, transparent 100%)' }} />

  <div className="relative w-full px-5 sm:px-[52px] pb-[max(40px,calc(env(safe-area-inset-bottom)+20px))]">
    <p className="font-sans text-[9px] tracking-[0.24em] uppercase text-white/45 font-light mb-[14px]">
      Caslano · Canton Ticino · Svizzera
    </p>
    <h1 className="font-serif text-[clamp(52px,11vw,108px)] font-light text-white leading-[0.9] mb-8">
      Pietra,<br/>luce<br/>e <em className="not-italic text-white/50">natura.</em>
    </h1>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[10px] sm:gap-3">
      <Button variant="primary" onClick={() => router.push('/appartamenti')}>
        Esplora gli appartamenti
      </Button>
      <Button variant="ghost-light" onClick={openChat}>
        Hai domande?
      </Button>
    </div>
  </div>

  {/* Desktop stats */}
  <div className="absolute right-6 bottom-10 hidden sm:flex">
    {[
      { n: '36',       l: 'Appartamenti' },
      { n: 'CHF 725K', l: 'A partire da' },
      { n: '3',        l: 'Blocchi' },
    ].map(s => (
      <div key={s.n} className="text-right px-5 py-3 border-l border-white/15">
        <div className="font-serif text-[28px] font-light text-white leading-none">{s.n}</div>
        <div className="font-sans text-[8px] tracking-[0.16em] uppercase text-white/40 mt-1">{s.l}</div>
      </div>
    ))}
  </div>
</section>
```

---

## Teaser cards section

Three equal-width cards in a row (desktop) / stacked (mobile). Each card navigates to a different page on click.

```
Mobile:  1 column, each card 300px tall
Desktop: 3 columns, each card 360px tall
```

**Grid:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-[2px] bg-travertine">
```

**Each teaser card:**
```tsx
<div className="relative h-[300px] sm:h-[360px] overflow-hidden cursor-pointer group"
  onClick={() => router.push(href)}>
  <Image src={img} fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt={title} />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,27,25,.72) 0%, rgba(28,27,25,.08) 65%, transparent 100%)' }} />
  <div className="absolute bottom-0 left-0 right-0 p-6">
    <p className="font-sans text-[8px] tracking-[0.22em] uppercase text-white/50 mb-[6px]">{eyebrow}</p>
    <h3 className="font-serif text-[clamp(22px,4vw,28px)] font-light text-white leading-[1.05] mb-[10px]"
      dangerouslySetInnerHTML={{ __html: title }} />
    <div className="font-sans text-[9px] tracking-[0.16em] uppercase text-white/50 flex items-center gap-[5px]">
      {cta} <span className="transition-transform duration-200 group-hover:translate-x-[5px]">→</span>
    </div>
  </div>
</div>
```

**Three cards:**

| Card | Image | Eyebrow | Title HTML | CTA | Route |
|---|---|---|---|---|---|
| 1 | `courtyard.jpg` | Il Progetto | `Architettura<br/>in <em>travertino</em>` | Scopri | `/progetto` |
| 2 | `elevation.jpg` | Appartamenti | `36 unità<br/><em>disponibili</em>` | Sfoglia | `/appartamenti` |
| 3 | `aerial_lake.jpg` | Posizione | `Sul lago<br/><em>di Lugano</em>` | Esplora | `/posizione` |

---

## Stats strip section

Dark band below teasers. 4 stats in a 2×2 grid on mobile, 4-column row on desktop.

```
Background: var(--charcoal) #1E1D1B
Padding:    32px (safe-area aware)
```

```tsx
<div className="bg-charcoal grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-charcoal
  px-[max(24px,env(safe-area-inset-left))]">
```

Each item:
```
[number]   e.g. "69–126 m²"    font-serif clamp(22,4vw,30px) font-light text-white
[label]    e.g. "Superfici"    font-sans 8px tracking uppercase text-white/30 mt-1
padding: 20px 24px
border-right: 0.5px solid rgba(255,255,255,0.06)  — last item no border
```

**Four stats:**
1. `69–126 m²` / Superfici disponibili
2. `CHF 7'850` / Al metro quadro
3. `70` / Posteggi
4. `8 min` / Da Lugano
