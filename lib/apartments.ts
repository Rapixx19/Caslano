export type Apartment = {
  block: 'A' | 'B' | 'C'
  num: number
  floor: 'Terra' | 'Primo' | 'Secondo' | 'Terzo'
  out: 'Giardino' | 'Terrazza'
  sqm: number
  ext: number
  garden: number
  price: number
  status: 'Disponibile' | 'Riservato'
}

export const APARTMENTS: Apartment[] = [
  // ── BLOCCO A ──────────────────────────────────────────────
  { block: 'A', num: 1, floor: 'Terra', out: 'Giardino', sqm: 124.2, ext: 26.8, garden: 48.2, price: 1144830, status: 'Disponibile' },
  { block: 'A', num: 2, floor: 'Terra', out: 'Giardino', sqm: 94.1, ext: 45.1, garden: 81.2, price: 1024645, status: 'Disponibile' },
  { block: 'A', num: 3, floor: 'Terra', out: 'Giardino', sqm: 105.2, ext: 26.8, garden: 48.1, price: 995550, status: 'Disponibile' },
  { block: 'A', num: 4, floor: 'Primo', out: 'Terrazza', sqm: 124.2, ext: 26.8, garden: 0, price: 1082170, status: 'Disponibile' },
  { block: 'A', num: 5, floor: 'Primo', out: 'Terrazza', sqm: 94.1, ext: 45.1, garden: 0, price: 919085, status: 'Riservato' },
  { block: 'A', num: 6, floor: 'Primo', out: 'Terrazza', sqm: 105.2, ext: 26.8, garden: 0, price: 933020, status: 'Disponibile' },
  { block: 'A', num: 7, floor: 'Secondo', out: 'Terrazza', sqm: 124.2, ext: 26.8, garden: 0, price: 1082170, status: 'Disponibile' },
  { block: 'A', num: 8, floor: 'Secondo', out: 'Terrazza', sqm: 94.1, ext: 45.1, garden: 0, price: 919085, status: 'Disponibile' },
  { block: 'A', num: 9, floor: 'Secondo', out: 'Terrazza', sqm: 105.2, ext: 26.8, garden: 0, price: 933020, status: 'Disponibile' },
  { block: 'A', num: 10, floor: 'Terzo', out: 'Terrazza', sqm: 124.2, ext: 26.8, garden: 0, price: 1082170, status: 'Disponibile' },
  { block: 'A', num: 11, floor: 'Terzo', out: 'Terrazza', sqm: 94.1, ext: 45.1, garden: 0, price: 919085, status: 'Disponibile' },
  { block: 'A', num: 12, floor: 'Terzo', out: 'Terrazza', sqm: 105.2, ext: 26.8, garden: 0, price: 933020, status: 'Riservato' },

  // ── BLOCCO B ──────────────────────────────────────────────
  { block: 'B', num: 1, floor: 'Terra', out: 'Giardino', sqm: 118.4, ext: 26.8, garden: 69, price: 1126340, status: 'Disponibile' },
  { block: 'B', num: 2, floor: 'Terra', out: 'Giardino', sqm: 69.4, ext: 33.2, garden: 85.4, price: 788610, status: 'Disponibile' },
  { block: 'B', num: 3, floor: 'Terra', out: 'Giardino', sqm: 82.2, ext: 23, garden: 59.2, price: 814230, status: 'Disponibile' },
  { block: 'B', num: 4, floor: 'Primo', out: 'Terrazza', sqm: 118.4, ext: 26.8, garden: 0, price: 1036640, status: 'Disponibile' },
  { block: 'B', num: 5, floor: 'Primo', out: 'Terrazza', sqm: 69.4, ext: 45.1, garden: 0, price: 725190, status: 'Disponibile' },
  { block: 'B', num: 6, floor: 'Primo', out: 'Terrazza', sqm: 82.2, ext: 23, garden: 0, price: 737270, status: 'Disponibile' },
  { block: 'B', num: 7, floor: 'Secondo', out: 'Terrazza', sqm: 118.4, ext: 26.8, garden: 0, price: 1036640, status: 'Riservato' },
  { block: 'B', num: 8, floor: 'Secondo', out: 'Terrazza', sqm: 69.4, ext: 45.1, garden: 0, price: 725190, status: 'Disponibile' },
  { block: 'B', num: 9, floor: 'Secondo', out: 'Terrazza', sqm: 82.2, ext: 23, garden: 0, price: 737270, status: 'Disponibile' },
  { block: 'B', num: 10, floor: 'Terzo', out: 'Terrazza', sqm: 118.4, ext: 26.8, garden: 0, price: 1036640, status: 'Disponibile' },
  { block: 'B', num: 11, floor: 'Terzo', out: 'Terrazza', sqm: 69.4, ext: 45.1, garden: 0, price: 725190, status: 'Disponibile' },
  { block: 'B', num: 12, floor: 'Terzo', out: 'Terrazza', sqm: 82.2, ext: 23, garden: 0, price: 737270, status: 'Disponibile' },

  // ── BLOCCO C ──────────────────────────────────────────────
  { block: 'C', num: 1, floor: 'Terra', out: 'Giardino', sqm: 126, ext: 26.8, garden: 48.2, price: 1158960, status: 'Disponibile' },
  { block: 'C', num: 2, floor: 'Terra', out: 'Giardino', sqm: 119.3, ext: 52.1, garden: 93.9, price: 1266975, status: 'Disponibile' },
  { block: 'C', num: 3, floor: 'Terra', out: 'Giardino', sqm: 124.6, ext: 26.8, garden: 48.2, price: 1147970, status: 'Disponibile' },
  { block: 'C', num: 4, floor: 'Primo', out: 'Terrazza', sqm: 126, ext: 26.8, garden: 0, price: 1096300, status: 'Riservato' },
  { block: 'C', num: 5, floor: 'Primo', out: 'Terrazza', sqm: 119.3, ext: 52.1, garden: 0, price: 1144905, status: 'Riservato' },
  { block: 'C', num: 6, floor: 'Primo', out: 'Terrazza', sqm: 124.6, ext: 26.8, garden: 0, price: 1085310, status: 'Disponibile' },
  { block: 'C', num: 7, floor: 'Secondo', out: 'Terrazza', sqm: 126, ext: 26.8, garden: 0, price: 1096300, status: 'Disponibile' },
  { block: 'C', num: 8, floor: 'Secondo', out: 'Terrazza', sqm: 119.3, ext: 52.1, garden: 0, price: 1144905, status: 'Disponibile' },
  { block: 'C', num: 9, floor: 'Secondo', out: 'Terrazza', sqm: 124.6, ext: 26.8, garden: 0, price: 1085310, status: 'Disponibile' },
  { block: 'C', num: 10, floor: 'Terzo', out: 'Terrazza', sqm: 126, ext: 26.8, garden: 0, price: 1096300, status: 'Disponibile' },
  { block: 'C', num: 11, floor: 'Terzo', out: 'Terrazza', sqm: 119.3, ext: 52.1, garden: 0, price: 1144905, status: 'Disponibile' },
  { block: 'C', num: 12, floor: 'Terzo', out: 'Terrazza', sqm: 124.6, ext: 26.8, garden: 0, price: 1085310, status: 'Disponibile' },
]

export function formatPrice(price: number): string {
  return 'CHF ' + price.toLocaleString('de-CH')
}

export function getAptImage(apt: Apartment): string {
  if (apt.floor === 'Terra') return '/images/corner.jpg'
  if (apt.block === 'A') return '/images/terrace.jpg'
  if (apt.block === 'B') return '/images/ground_floor.jpg'
  return '/images/elevation.jpg'
}

export type FilterState = {
  block: string
  floor: string
  outdoor: string
  size: string
  availability: string
}

export function filterApartments(
  apts: Apartment[],
  filters: FilterState
): Apartment[] {
  return apts.filter(a => {
    if (filters.block && a.block !== filters.block) return false
    if (filters.floor && a.floor !== filters.floor) return false
    if (filters.outdoor) {
      if (filters.outdoor === 'Giardino' && a.out !== 'Giardino') return false
      if (filters.outdoor === 'Terrazza' && a.out !== 'Terrazza') return false
    }
    if (filters.size === 'small' && a.sqm >= 80) return false
    if (filters.size === 'mid' && (a.sqm < 80 || a.sqm >= 110)) return false
    if (filters.size === 'large' && a.sqm < 110) return false
    if (filters.availability && a.status !== filters.availability) return false
    return true
  })
}
