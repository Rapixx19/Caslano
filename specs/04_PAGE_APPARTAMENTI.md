# Page: Appartamenti — `app/appartamenti/page.tsx`

## Layout overview

```
┌─────────────────────────────────────┐
│  FILTER BAR (sticky, dark)          │
│  5 selects + search button          │
│  Collapses to toggle on mobile      │
├─────────────────────────────────────┤
│  APARTMENT GRID                     │
│  1 col mobile / 2 col tablet /      │
│  3 col desktop                      │
│  Live filtered, all 36 units        │
├─────────────────────────────────────┤
│  FOOTER                             │
└─────────────────────────────────────┘
```

---

## Filter bar

**Behaviour:**
- Sticky below nav, `background: var(--charcoal)`
- On desktop (≥768px): always visible as a single horizontal row — 5 select fields + reset button
- On mobile: collapsed to a single toggle button "Filtra appartamenti ▾" — tapping expands the fields stacked vertically below

**Toggle button (mobile only):**
```
width: 100%
padding: 16px
font-sans 11px tracking uppercase
color: rgba(255,255,255,0.75)
background: none, border: none
flex justify-between
```

**Each filter field (`<select>`):**
```
label:  8px sans tracking uppercase white/32, margin-bottom 6px
select: transparent bg, no border, font-sans 15px white/88, appearance-none
        font-size MUST be 16px on mobile to prevent iOS zoom
padding: 14px 18px
border-right: 0.5px solid rgba(255,255,255,0.08)
```

**Filter fields:**

| ID | Label | Options |
|---|---|---|
| `f-block` | Blocco | Tutti, Blocco A, Blocco B, Blocco C |
| `f-floor` | Piano | Tutti, Piano Terra, Primo Piano, Secondo Piano, Terzo Piano |
| `f-outdoor` | Spazio esterno | Tutti, Con giardino, Con terrazza |
| `f-size` | Superficie | Qualsiasi, fino a 80 m², 80–110 m², oltre 110 m² |
| `f-avail` | Disponibilità | Tutti, Disponibili, Riservati |

**Reset button:** text-only, `color: rgba(255,255,255,0.4)`, clears all filters.

---

## Apartment grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-travertine">
  {filtered.map(apt => <AptCard key={`${apt.block}${apt.num}`} apt={apt} onClick={openModal} />)}
</div>
```

Empty state (no matches):
```tsx
<div className="col-span-full py-16 text-center text-muted text-sm bg-offwhite">
  Nessun appartamento trovato. <button onClick={resetFilters}>Reset filtri</button>
</div>
```

---

## AptCard component — `components/ui/AptCard.tsx`

### Image assignment logic
```ts
function getAptImage(apt: Apartment): string {
  if (apt.floor === 'Terra') return '/images/corner.jpg'
  if (apt.block === 'A') return '/images/terrace.jpg'
  if (apt.block === 'B') return '/images/ground_floor.jpg'
  return '/images/elevation.jpg' // Block C upper floors
}
```

### Card structure

```
┌────────────────────────────────┐
│  [IMAGE 210px tall]            │
│  [block badge bottom-left]     │  ← "Blocco A"
│  [status badge top-right]      │  ← "Disponibile" / "Riservato"
├────────────────────────────────┤
│  Appartamento A1               │  serif 18px font-light
│  Piano Terra · Giardino 48 m²  │  sans 9px uppercase muted
│                                │
│  124.2 m²   26.8 m²   48.2 m² │  specs row
│  Superficie  Portico  Giardino │
│  ─────────────────────────── │
│  CHF 1'144'830        →       │  serif 19px / arrow
│  prezzo indicativo            │  8px muted
└────────────────────────────────┘
```

**Status badge styles:**
- `Disponibile`: `bg-[rgba(253,250,244,0.93)] text-charcoal`
- `Riservato`: `bg-[rgba(28,27,25,0.70)] text-white/70`

Both: `font-sans text-[8px] tracking-[0.14em] uppercase padding: 4px 9px`, positioned `absolute top-3 right-3`

**Block tag:**
`font-sans text-[8px] tracking-[0.14em] uppercase text-white/60`
`bg-[rgba(0,0,0,0.32)] backdrop-blur-sm padding: 3px 9px`
Positioned `absolute bottom-3 left-3`

**Arrow hover effect:**
On card hover, arrow transitions from `text-travertine` → `text-charcoal` and `translateX(4px)`

**Click:** opens apartment detail modal (`openModal('apt', apt)`)

---

## Apartment data — `lib/apartments.ts`

```ts
export type Apartment = {
  block:  'A' | 'B' | 'C'
  num:    number
  floor:  'Terra' | 'Primo' | 'Secondo' | 'Terzo'
  out:    'Giardino' | 'Terrazza'
  sqm:    number
  ext:    number    // portico or terrazza sqm
  garden: number    // 0 if no garden
  price:  number
  status: 'Disponibile' | 'Riservato'
}

export const APARTMENTS: Apartment[] = [
  // ── BLOCCO A ──────────────────────────────────────────────
  { block:'A', num:1,  floor:'Terra',   out:'Giardino', sqm:124.2, ext:26.8, garden:48.2, price:1144830, status:'Disponibile' },
  { block:'A', num:2,  floor:'Terra',   out:'Giardino', sqm:94.1,  ext:45.1, garden:81.2, price:1024645, status:'Disponibile' },
  { block:'A', num:3,  floor:'Terra',   out:'Giardino', sqm:105.2, ext:26.8, garden:48.1, price:995550,  status:'Disponibile' },
  { block:'A', num:4,  floor:'Primo',   out:'Terrazza', sqm:124.2, ext:26.8, garden:0,    price:1082170, status:'Disponibile' },
  { block:'A', num:5,  floor:'Primo',   out:'Terrazza', sqm:94.1,  ext:45.1, garden:0,    price:919085,  status:'Riservato'   },
  { block:'A', num:6,  floor:'Primo',   out:'Terrazza', sqm:105.2, ext:26.8, garden:0,    price:933020,  status:'Disponibile' },
  { block:'A', num:7,  floor:'Secondo', out:'Terrazza', sqm:124.2, ext:26.8, garden:0,    price:1082170, status:'Disponibile' },
  { block:'A', num:8,  floor:'Secondo', out:'Terrazza', sqm:94.1,  ext:45.1, garden:0,    price:919085,  status:'Disponibile' },
  { block:'A', num:9,  floor:'Secondo', out:'Terrazza', sqm:105.2, ext:26.8, garden:0,    price:933020,  status:'Disponibile' },
  { block:'A', num:10, floor:'Terzo',   out:'Terrazza', sqm:124.2, ext:26.8, garden:0,    price:1082170, status:'Disponibile' },
  { block:'A', num:11, floor:'Terzo',   out:'Terrazza', sqm:94.1,  ext:45.1, garden:0,    price:919085,  status:'Disponibile' },
  { block:'A', num:12, floor:'Terzo',   out:'Terrazza', sqm:105.2, ext:26.8, garden:0,    price:933020,  status:'Riservato'   },

  // ── BLOCCO B ──────────────────────────────────────────────
  { block:'B', num:1,  floor:'Terra',   out:'Giardino', sqm:118.4, ext:26.8, garden:69,   price:1126340, status:'Disponibile' },
  { block:'B', num:2,  floor:'Terra',   out:'Giardino', sqm:69.4,  ext:33.2, garden:85.4, price:788610,  status:'Disponibile' },
  { block:'B', num:3,  floor:'Terra',   out:'Giardino', sqm:82.2,  ext:23,   garden:59.2, price:814230,  status:'Disponibile' },
  { block:'B', num:4,  floor:'Primo',   out:'Terrazza', sqm:118.4, ext:26.8, garden:0,    price:1036640, status:'Disponibile' },
  { block:'B', num:5,  floor:'Primo',   out:'Terrazza', sqm:69.4,  ext:45.1, garden:0,    price:725190,  status:'Disponibile' },
  { block:'B', num:6,  floor:'Primo',   out:'Terrazza', sqm:82.2,  ext:23,   garden:0,    price:737270,  status:'Disponibile' },
  { block:'B', num:7,  floor:'Secondo', out:'Terrazza', sqm:118.4, ext:26.8, garden:0,    price:1036640, status:'Riservato'   },
  { block:'B', num:8,  floor:'Secondo', out:'Terrazza', sqm:69.4,  ext:45.1, garden:0,    price:725190,  status:'Disponibile' },
  { block:'B', num:9,  floor:'Secondo', out:'Terrazza', sqm:82.2,  ext:23,   garden:0,    price:737270,  status:'Disponibile' },
  { block:'B', num:10, floor:'Terzo',   out:'Terrazza', sqm:118.4, ext:26.8, garden:0,    price:1036640, status:'Disponibile' },
  { block:'B', num:11, floor:'Terzo',   out:'Terrazza', sqm:69.4,  ext:45.1, garden:0,    price:725190,  status:'Disponibile' },
  { block:'B', num:12, floor:'Terzo',   out:'Terrazza', sqm:82.2,  ext:23,   garden:0,    price:737270,  status:'Disponibile' },

  // ── BLOCCO C ──────────────────────────────────────────────
  { block:'C', num:1,  floor:'Terra',   out:'Giardino', sqm:126,   ext:26.8, garden:48.2, price:1158960, status:'Disponibile' },
  { block:'C', num:2,  floor:'Terra',   out:'Giardino', sqm:119.3, ext:52.1, garden:93.9, price:1266975, status:'Disponibile' },
  { block:'C', num:3,  floor:'Terra',   out:'Giardino', sqm:124.6, ext:26.8, garden:48.2, price:1147970, status:'Disponibile' },
  { block:'C', num:4,  floor:'Primo',   out:'Terrazza', sqm:126,   ext:26.8, garden:0,    price:1096300, status:'Riservato'   },
  { block:'C', num:5,  floor:'Primo',   out:'Terrazza', sqm:119.3, ext:52.1, garden:0,    price:1144905, status:'Riservato'   },
  { block:'C', num:6,  floor:'Primo',   out:'Terrazza', sqm:124.6, ext:26.8, garden:0,    price:1085310, status:'Disponibile' },
  { block:'C', num:7,  floor:'Secondo', out:'Terrazza', sqm:126,   ext:26.8, garden:0,    price:1096300, status:'Disponibile' },
  { block:'C', num:8,  floor:'Secondo', out:'Terrazza', sqm:119.3, ext:52.1, garden:0,    price:1144905, status:'Disponibile' },
  { block:'C', num:9,  floor:'Secondo', out:'Terrazza', sqm:124.6, ext:26.8, garden:0,    price:1085310, status:'Disponibile' },
  { block:'C', num:10, floor:'Terzo',   out:'Terrazza', sqm:126,   ext:26.8, garden:0,    price:1096300, status:'Disponibile' },
  { block:'C', num:11, floor:'Terzo',   out:'Terrazza', sqm:119.3, ext:52.1, garden:0,    price:1144905, status:'Disponibile' },
  { block:'C', num:12, floor:'Terzo',   out:'Terrazza', sqm:124.6, ext:26.8, garden:0,    price:1085310, status:'Disponibile' },
]

export function formatPrice(price: number): string {
  return 'CHF ' + price.toLocaleString('de-CH')
}

export function filterApartments(
  apts: Apartment[],
  filters: {
    block?: string
    floor?: string
    outdoor?: string
    size?: string
    availability?: string
  }
): Apartment[] {
  return apts.filter(a => {
    if (filters.block && a.block !== filters.block) return false
    if (filters.floor && !a.floor.startsWith(filters.floor)) return false
    if (filters.outdoor && a.out !== filters.outdoor) return false
    if (filters.size === 'small' && a.sqm >= 80) return false
    if (filters.size === 'mid' && (a.sqm < 80 || a.sqm >= 110)) return false
    if (filters.size === 'large' && a.sqm < 110) return false
    if (filters.availability && a.status !== filters.availability) return false
    return true
  })
}
```

---

## Price summary by block

| Block | Price range | Notes |
|---|---|---|
| A | CHF 919'085 – CHF 1'144'830 | Mid-range |
| B | CHF 725'190 – CHF 1'126'340 | Most accessible entry point |
| C | CHF 1'085'310 – CHF 1'266'975 | Premium block, largest units |
| Posteggio | CHF 40'000 each | 70 available |
