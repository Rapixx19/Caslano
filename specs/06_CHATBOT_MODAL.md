# Chatbot & Modal System

---

## Chatbot — `components/Chatbot.tsx`

### Architecture

The chatbot is a client component that:
1. Renders a FAB (floating action button) fixed bottom-right
2. Renders a chat panel that slides up/in on open
3. Sends messages to `/api/chat` (a Next.js route handler that proxies to Anthropic)
4. Maintains conversation history in local state

### FAB button

```
Position: fixed, right: max(20px, env(safe-area-inset-right)), bottom: max(20px, calc(env(safe-area-inset-bottom) + 8px))
z-index: 450
Size: 52×52px, border-radius: 50%
Background: var(--charcoal)
Icon: chat bubble SVG (24×24, stroke white, no fill)
Badge: 16×16px circle, bg-amber, top-right of FAB, shows "1" on first load (hides on open)
Hover/Active: background → var(--amber), scale(1.06)
```

### Chat panel

**Desktop positioning:**
```
bottom: 88px
right: max(20px, env(safe-area-inset-right))
width: 360px
max-height: min(600px, calc(100svh - 120px))
border-radius: 16px
border: 0.5px solid rgba(30,29,27,0.12)
box-shadow: 0 12px 48px rgba(0,0,0,0.18)
```

**Mobile (< 480px) — bottom sheet:**
```
left: 0, right: 0, bottom: 0, width: 100%
border-radius: 20px 20px 0 0
max-height: 88svh
transform-origin: bottom center
```

**Open/close animation:**
```css
/* Closed */
opacity: 0; pointer-events: none;
transform: scale(0.94) translateY(16px); /* desktop */
transform: translateY(20px);              /* mobile */

/* Open */
opacity: 1; pointer-events: auto;
transform: scale(1) translateY(0);
transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Chat panel layout

```
┌──────────────────────────────────────┐
│ [RC]  Assistente Residenza Caslano   │  ← header
│       ● Online · risposta immediata  │
│                               [✕]   │
├──────────────────────────────────────┤
│                                      │
│  [bot message bubble]                │  ← scrollable
│                [user message bubble] │
│  [typing indicator]                  │
│                                      │
├──────────────────────────────────────┤
│  [Prezzi Blocco A] [Disponibilità]   │  ← suggestion chips
│  [Come arrivare] [Prenota visita]    │
├──────────────────────────────────────┤
│  [textarea input          ] [→ send] │  ← input area
└──────────────────────────────────────┘
```

### Message bubbles

**User (right-aligned):**
```css
background: var(--charcoal);
color: white;
border-radius: 12px 12px 3px 12px;
padding: 10px 13px;
font-sans 13px font-light line-height 1.6;
max-width: 88%;
```

**Bot (left-aligned):**
```css
background: white;
color: var(--charcoal);
border: 0.5px solid rgba(30,29,27,0.10);
border-radius: 12px 12px 12px 3px;
/* same padding and font */
```

Timestamp below each bubble: `font-sans 8px text-muted`

### Typing indicator
```tsx
<div className="flex gap-1 p-[10px_13px] bg-white border border-charcoal/10 rounded-[12px_12px_12px_3px] self-start items-center">
  {[0, 200, 400].map(delay => (
    <div key={delay} className="w-[6px] h-[6px] rounded-full bg-muted animate-typingPulse"
      style={{ animationDelay: `${delay}ms` }} />
  ))}
</div>
```

### Suggestion chips
```tsx
<button className="border border-travertine rounded-full px-[13px] py-[6px] font-sans text-[11px] text-muted font-light
  hover:border-charcoal hover:text-charcoal transition-colors min-h-[36px]">
  {label}
</button>
```
Hide suggestions after first message is sent (`display: none`).

Initial suggestions:
- "Prezzi Blocco A"
- "Disponibilità"
- "Come arrivare"
- "Prenota visita"

### Booking buttons in chat
When Claude responds with `[BTN_VISITA]` or `[BTN_CHIAMATA]`, replace with actual buttons:
```tsx
const processMessage = (text: string) => text
  .replace('[BTN_VISITA]', '<button onclick="openModal(\'visit\')" class="chat-book-btn">🏛️ Prenota una visita →</button>')
  .replace('[BTN_CHIAMATA]', '<button onclick="openModal(\'call\')" class="chat-book-btn">📞 Prenota una chiamata →</button>')
```
In React, parse these as JSX by splitting on the token and inserting `<Button>` components.

### Input area
```
textarea: font-sans 15px (16px for iOS), border 0.5px charcoal/14, border-radius 8px
          padding 10px 13px, auto-resize (up to 120px)
send btn: 38×38px, bg-charcoal, border-radius 8px, hover bg-amber
          SVG send icon (paper plane, 16px stroke white)
Enter key sends (Shift+Enter = new line)
```

---

## API Route — `app/api/chat/route.ts`

```ts
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic()

const SYSTEM_PROMPT = `Sei l'assistente virtuale di Residenza Caslano, un esclusivo complesso residenziale a Caslano, Canton Ticino, Svizzera, sul Lago di Lugano.

PROGETTO: 36 appartamenti in 3 blocchi (A, B, C), 4 piani ciascuno. CHF 7'850/m², terrazze CHF 4'000/m², giardini CHF 1'300/m², posteggi CHF 40'000.

BLOCCO A: A1 124.2m²+giardino CHF 1'144'830, A2 94.1m² CHF 1'024'645, A3 105.2m² CHF 995'550 (PT con giardino). Piano 1-3: A4/7/10 124.2m² CHF 1'082'170, A5/8/11 94.1m² CHF 919'085, A6/9/12 105.2m² CHF 933'020. A5 e A12 RISERVATI.

BLOCCO B: B1 118.4m²+giardino CHF 1'126'340, B2 69.4m² CHF 788'610, B3 82.2m² CHF 814'230 (PT). Piano 1-3: B4/7/10 118.4m² CHF 1'036'640, B5/8/11 69.4m² CHF 725'190, B6/9/12 82.2m² CHF 737'270. B7 RISERVATO. Blocco B è il più accessibile.

BLOCCO C: C1 126m² CHF 1'158'960, C2 119.3m² CHF 1'266'975, C3 124.6m² CHF 1'147'970 (PT). Piano 1-3: C4/7/10 126m² CHF 1'096'300, C5/8/11 119.3m² CHF 1'144'905, C6/9/12 124.6m² CHF 1'085'310. C4 e C5 RISERVATI. Blocco C è il più pregiato.

ARCHITETTURA: Facciata travertino naturale, serramenti alluminio bronze-anodizzato con triplo vetro, soffitti terrazze in dogato legno, balaustre vetro strutturale, percorsi granito grigio, cortile paesaggistico condominiale con area lounge.

POSIZIONE CASLANO: Sponda occidentale Lago di Lugano. 8 min Lugano, 45 min Malpensa, FFS Caslano 6 min a piedi, A2 6 min auto, aeroporto Lugano-Agno 10 min, confine italiano 5 min. Centro, negozi, ristoranti sul lago tutti a piedi. Ospedale Lugano 12 min. Scuole 8 min a piedi.

VITA A CASLANO: Borgo tranquillo, 3000 abitanti, cultura ticinese italiana, clima mite, accesso al lago, gastronomia italiana-svizzera. Ideale per famiglie, pendolari Lugano/Milano, seconda casa.

CONTATTI: info@residenzacaslano.ch · +41 91 000 00 00. Visite lun-ven e sabato su appuntamento.

ISTRUZIONI: Rispondi in italiano (o nella lingua dell'utente). Sii conciso e professionale. Per prenotazioni usa [BTN_VISITA] o [BTN_CHIAMATA] per mostrare un bottone interattivo. Non inventare informazioni. Per questioni legali/finanziarie rimanda al team vendite.`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 800,
    system: SYSTEM_PROMPT,
    messages,
  })

  return Response.json({ content: response.content })
}
```

Set `ANTHROPIC_API_KEY` in `.env.local`:
```
ANTHROPIC_API_KEY=your_key_here
```

---

## Modal System — `components/Modal.tsx`

The modal is global, rendered once in the root layout, controlled via a React context or Zustand store.

### Three modal types

**1. `call` — Book a phone call**
**2. `visit` — Book a site visit**
**3. `apt` — Apartment detail view**

### Modal visual spec

**Background overlay:**
```css
position: fixed; inset: 0; z-index: 600;
background: rgba(28,27,25,0.65);
backdrop-filter: blur(6px);
display: flex; align-items: flex-end; justify-content: center; /* mobile = bottom sheet */
@media(min-width: 640px) { align-items: center; }             /* desktop = center */
```

**Modal container:**
```css
background: var(--offwhite);
width: 100%; max-width: 500px;
border-radius: 20px 20px 0 0;   /* mobile */
@media(min-width: 640px) { border-radius: 4px; }
max-height: 90svh; overflow-y: scroll;
padding-bottom: max(24px, env(safe-area-inset-bottom));
```

**Slide-up animation:**
```css
/* closed */ transform: translateY(20px);
/* open   */ transform: translateY(0);
transition: transform 0.3s cubic-bezier(0.34, 1.1, 0.64, 1);
```

**Header (sticky):**
```tsx
<div className="sticky top-0 bg-offwhite z-10 px-6 pt-6 pb-4 border-b border-charcoal/9 flex justify-between items-start">
  <h2 className="font-serif text-[24px] font-light text-charcoal"
    dangerouslySetInnerHTML={{ __html: title }} />
  <button className="w-10 h-10 flex items-center justify-center text-muted text-[22px]"
    onClick={closeModal}>✕</button>
</div>
```

**Form fields (light surface):**
```tsx
<div className="mb-[14px]">
  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
    {label}
  </label>
  <input className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite"
    style={{ fontSize: '16px', borderRadius: 0 }} ... />
</div>
```

### Call booking modal fields

1. Nome + Cognome (2-col)
2. Telefono (full width)
3. Email (full width)
4. Data preferita (`type="date"`, min = today) + Fascia oraria select (2-col)
5. Note textarea (optional)
6. Submit: `bg-charcoal text-white w-full py-4 uppercase tracking text-[11px]` → `submitModal()`

Time slots: 09:00–11:00, 11:00–13:00, 14:00–16:00, 16:00–18:00

### Visit booking modal fields

1. Nome + Cognome (2-col)
2. Telefono + Email (2-col)
3. Data preferita + Orario (2-col)
4. Appartamento di interesse (select, all 36 units)
5. Note textarea (optional)
6. Submit button

Time slots: 09:00, 10:00, 11:00, 14:00, 15:00, 16:00, 10:00 (Sabato), 11:00 (Sabato)

### Apartment detail modal

```
┌─────────────────────────────┐
│ Blocco A · Apt A1           │  ← modal title
│                        [✕]  │
├─────────────────────────────┤
│ [apartment image 200px]     │
│                             │
│ 124.2 m²  26.8 m²  48.2 m² │
│ Superficie Portico  Giardino│
│ ─────────────────────────── │
│ DISPONIBILE   CHF 1'144'830 │
│               prezzo indic. │
│ ─────────────────────────── │
│ [📞 Prenota chiamata] [🏛️ Visita] │
└─────────────────────────────┘
```

The two CTA buttons close the apt modal and open the call/visit modal.

### Success state

After submit, replace form with:
```tsx
<div className="text-center py-6 px-4">
  <div className="text-[40px] mb-[14px]">✓</div>
  <h3 className="font-serif text-[24px] font-light text-charcoal mb-2">Confermato</h3>
  <p className="text-[13px] text-muted font-light leading-[1.65]">
    La tua richiesta di {type} è stata ricevuta.<br/>
    Ti contatteremo entro 24 ore per confermare i dettagli.
  </p>
</div>
```
Auto-close after 3 seconds.

### Global modal state

Use React Context or Zustand:

```ts
type ModalState = {
  type: 'call' | 'visit' | 'apt' | null
  apt?: Apartment
  open: (type: ModalState['type'], apt?: Apartment) => void
  close: () => void
}
```

Accessible from any component via `useModal()` hook.
