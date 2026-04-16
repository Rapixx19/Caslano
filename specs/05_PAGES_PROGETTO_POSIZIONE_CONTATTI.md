# Pages: Progetto, Posizione, Contatti

---

## Page: Il Progetto — `app/progetto/page.tsx`

### Layout overview

```
┌─────────────────────────────────────┐
│  PAGE HERO (50vh)                   │
│  facade_evening.jpg                 │
├─────────────────────────────────────┤
│  SPLIT: text left / image right     │
│  Architecture description           │
│  Feature list                       │
│  → "Vedi gli appartamenti" button   │
├─────────────────────────────────────┤
│  GALLERY 3 (3 images)               │
├─────────────────────────────────────┤
│  SPLIT: image left / text right     │
│  Courtyard description              │
│  → "Richiedi informazioni" button   │
├─────────────────────────────────────┤
│  FOOTER                             │
└─────────────────────────────────────┘
```

### Page hero

- Image: `facade_evening.jpg`, `object-position: center 60%`
- Height: `min(50vh, 380px)`
- Veil: lighter gradient (see 01_DESIGN_TOKENS)
- Content bottom-left:
  - Eyebrow: `IL PROGETTO` — white/45, 8px sans uppercase tracking
  - H1: `Un'architettura che dura nel tempo.` — "dura nel tempo." in `<em>` italic white/50

### Split sections

**Pattern for all split sections:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2">
  <div className="px-6 py-12 md:px-14 md:py-16 bg-offwhite">{/* text */}</div>
  <div className="relative min-h-[300px] md:min-h-[460px] overflow-hidden">
    <Image fill className="object-cover" ... />
  </div>
</div>
```
On mobile: text first, then image below. On desktop: side by side.

**Split 1 — Architecture**

Left text content:
```
Label:   DESCRIZIONE                        (8px sans uppercase tracking muted)
H2:      Travertino, calcestruzzo           (serif clamp(26,4vw,42px) font-light)
         e luce naturale.                   ("luce naturale." in <em>)
Body:    Two paragraphs about the project
Feature list (5 items):
```

Feature list item pattern:
```tsx
<div className="flex items-baseline gap-3 py-3 border-b border-charcoal/9 text-[13px]">
  <div className="w-1 h-1 rounded-full bg-amber flex-shrink-0 relative top-[1px]" />
  <span className="font-medium text-charcoal min-w-[130px]">{key}</span>
  <span className="text-muted font-light">{value}</span>
</div>
```

Feature list data:
| Key | Value |
|---|---|
| Facciata | Pietra travertino naturale |
| Serramenti | Alluminio bronze · triplo vetro |
| Soffitti terrazze | Dogato in legno naturale |
| Balaustre | Vetro strutturale trasparente |
| Percorsi esterni | Lastricato in granito grigio |

CTA: `outline-dark` button → `/appartamenti`

Right image: `terrace.jpg`

**Gallery (3 images):**
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] bg-travertine" style={{ height: 'clamp(240px, 35vw, 380px)' }}>
```

Images and captions:
1. `alley.jpg` → "Percorso interno"
2. `outdoor.jpg` → "Area lounge"
3. `courtyard2.jpg` → "Cortile condominiale"

On mobile (2-col grid): third image spans full width (`col-span-2`).

Caption style: `absolute bottom-0 left-0 right-0`, gradient veil, `font-sans 8px tracking uppercase text-white/50`, `padding: 28px 16px 12px`

**Split 2 — Courtyard (reversed on desktop)**

Left: `ground_floor.jpg`
Right: text
```
Label:   IL CORTILE
H2:      Uno spazio comune da vivere.   ("vivere." italic)
Body:    2 paragraphs about shared courtyard
CTA:     primary button → /contatti — "Richiedi informazioni"
```

On desktop, use `order` to put image first:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2">
  <div className="md:order-1 relative min-h-[300px] overflow-hidden"><Image /></div>
  <div className="md:order-2 px-6 py-12 md:px-14 md:py-16">{text}</div>
</div>
```

---

## Page: Posizione — `app/posizione/page.tsx`

### Layout overview

```
┌──────────────────┬──────────────────┐
│  MAP IMAGE       │  LOCATION PANEL  │
│  aerial_lake.jpg │  Dark background │
│  full height     │  scroll inside   │
└──────────────────┴──────────────────┘
```

### Desktop: two equal columns, full viewport height
### Mobile: image on top (300px tall), panel below

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100svh-64px)]">
  <div className="relative h-[300px] md:h-auto overflow-hidden">
    <Image src="/images/aerial_lake.jpg" fill className="object-cover" alt="Vista aerea Caslano" />
    <p className="absolute bottom-4 left-4 font-sans text-[8px] tracking-[0.18em] uppercase text-white/40">
      Caslano · Lago di Lugano · Canton Ticino
    </p>
  </div>

  <div className="bg-charcoal px-6 py-12 md:px-14 md:py-16 overflow-y-auto
    pb-[max(48px,calc(env(safe-area-inset-bottom)+48px))]">
    {/* panel content */}
  </div>
</div>
```

### Panel content

**Header:**
```
Label:   LA POSIZIONE          (8px sans uppercase muted)
H1:      A pochi minuti        (serif clamp(28,4vw,48px) font-light white, mt-4 mb-6)
         dal lago e
         da Lugano.
         "pochi minuti" in <em> white/40
Body:    1 paragraph white/45 font-light 14px mb-8
```

**Distance grid (2×2):**
```tsx
<div className="grid grid-cols-2 gap-[1px] bg-white/6 mb-8">
  {dists.map(d => (
    <div key={d.v} className="bg-charcoal p-[18px]">
      <div className="font-serif text-[22px] font-light text-white">{d.v}</div>
      <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-1">{d.l}</div>
    </div>
  ))}
</div>
```

Distance data:
| Value | Label |
|---|---|
| 8 min | da Lugano |
| 45 min | da Malpensa |
| Lago | accesso diretto |
| FFS | stazione Caslano |

**POI sections (3 groups):**

Each section:
```tsx
<div className="mb-5">
  <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-amber mb-2">{title}</p>
  {items.map(item => (
    <div key={item.name} className="flex justify-between py-[7px] border-b border-white/5 text-[12px]">
      <span className="text-white/60 font-light">{item.name}</span>
      <span className="text-white/28 font-light">{item.dist}</span>
    </div>
  ))}
</div>
```

POI data:
```ts
const POIS = [
  {
    title: 'Servizi & Ristorazione',
    items: [
      { name: 'Centro Caslano', dist: '5 min a piedi' },
      { name: 'Ristoranti sul lago', dist: '7 min a piedi' },
      { name: 'Supermercato', dist: '4 min in auto' },
    ]
  },
  {
    title: 'Istruzione & Salute',
    items: [
      { name: 'Scuole elementari', dist: '8 min a piedi' },
      { name: 'Ospedale Lugano', dist: '12 min in auto' },
    ]
  },
  {
    title: 'Connessioni',
    items: [
      { name: 'Autostrada A2', dist: '6 min in auto' },
      { name: 'Aeroporto Lugano-Agno', dist: '10 min in auto' },
      { name: 'Confine italiano', dist: '5 min in auto' },
    ]
  },
]
```

**CTA at bottom:**
`primary` button → opens visit modal: "Prenota una visita"

---

## Page: Contatti — `app/contatti/page.tsx`

### Layout overview

```
┌──────────────────┬──────────────────┐
│  LEFT PANEL      │  RIGHT PANEL     │
│  Light (cream)   │  Dark (charcoal) │
│  Info + 2 sched  │  Contact form    │
│  cards           │  + 2 sched btns  │
└──────────────────┴──────────────────┘
```

Desktop: two equal columns, full viewport height.
Mobile: left panel first, then right panel below.

### Left panel

```
Background: var(--cream)
Padding: 48px (mobile) / 64px 56px (desktop)
```

Content:
```
Label:   CONTATTI
H1:      Parla con           (serif clamp(28,4vw,48px) font-light)
         il nostro team.     ("nostro team." in <em> text-muted)
Body:    1 paragraph text-muted font-light 14px mb-7

Agent card:
  ┌─────────────────────────────────┐
  │ [RC]  Team Vendite              │
  │       Residenza Caslano         │
  │       info@residenzacaslano.ch  │
  │       +41 91 000 00 00          │
  └─────────────────────────────────┘
  bg-offwhite border border-travertine p-4

2 scheduling cards (grid 2-col):
  Card 1: "Prenota una chiamata" → openModal('call')
  Card 2: "Prenota una visita"   → openModal('visit')
  Each: border-travertine, bg-offwhite, p-[18px], emoji icon, title, subtitle
  hover: border-charcoal
```

### Right panel

```
Background: var(--charcoal)
Padding: 48px (mobile) / 64px 56px (desktop)
overflow-y: auto
```

**Contact form:**

Form wrapper — use the grid gap trick for the dark form:
```tsx
<div className="flex flex-col gap-[1px] bg-white/6">
  <div className="grid grid-cols-2 gap-[1px] bg-white/6">
    <FormField label="Nome" type="text" placeholder="Il tuo nome" autoComplete="given-name" />
    <FormField label="Cognome" type="text" placeholder="Cognome" autoComplete="family-name" />
  </div>
  ...
</div>
```

`FormField` on dark surface:
```tsx
<div className="bg-charcoal p-4">
  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/28 mb-[5px]">
    {label}
  </label>
  <input className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/88 font-light placeholder:text-white/28"
    style={{ fontSize: '16px' }} {/* prevent iOS zoom */}
    ... />
</div>
```

Form fields:
1. Nome + Cognome (2-col row)
2. Telefono + Email (2-col row)
3. Appartamento di interesse (select with all 36 units grouped by block)
4. Messaggio (textarea, min-height 72px)
5. Submit button: `bg-amber text-white` full width, flex justify-between, "Invia la richiesta →"

**Divider:**
```tsx
<div className="flex items-center gap-4 my-6 text-[10px] tracking-[0.1em] uppercase text-white/20 before:flex-1 before:h-px before:bg-white/8 after:flex-1 after:h-px after:bg-white/8">
  oppure
</div>
```

**Scheduling buttons (dark surface, 2-col):**
```tsx
<div className="grid grid-cols-2 gap-[1px] bg-white/6">
  <SchedDark icon="📞" title="Chiamata" sub="Lun–Ven 9:00–18:00" onClick={() => openModal('call')} />
  <SchedDark icon="🏛️" title="Visita" sub="Anche il sabato" onClick={() => openModal('visit')} />
</div>
```

Style: `bg-charcoal p-5 text-left hover:bg-white/4 transition-colors`

### Apartment select options (grouped)

```tsx
<select style={{ fontSize: '16px' }}>
  <option>— seleziona —</option>
  <optgroup label="Blocco A">
    <option>A · Piano Terra (A1–A3)</option>
    <option>A · Primo Piano (A4–A6)</option>
    <option>A · Secondo Piano (A7–A9)</option>
    <option>A · Terzo Piano (A10–A12)</option>
  </optgroup>
  <optgroup label="Blocco B">...</optgroup>
  <optgroup label="Blocco C">...</optgroup>
  <option>Posteggio (CHF 40'000)</option>
</select>
```
