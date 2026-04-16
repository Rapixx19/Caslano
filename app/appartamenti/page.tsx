'use client'

import { useState } from 'react'
import { AptCard } from '@/components/ui/AptCard'
import { Footer } from '@/components/Footer'
import { useApp } from '@/lib/context'
import { APARTMENTS, filterApartments, FilterState } from '@/lib/apartments'

const initialFilters: FilterState = {
  block: '',
  floor: '',
  outdoor: '',
  size: '',
  availability: '',
}

export default function AppartamentiPage() {
  const { openModal } = useApp()
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filtered = filterApartments(APARTMENTS, filters)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== '')

  return (
    <div
      className="fixed inset-0 overflow-y-scroll overflow-x-hidden animate-pageIn"
      style={{ paddingTop: 'var(--nav-h)', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
    >
      {/* Filter Bar */}
      <div className="sticky top-0 z-[50] bg-charcoal">
        {/* Mobile Toggle */}
        <button
          className="md:hidden w-full px-5 py-4 flex items-center justify-between font-sans text-[11px] tracking-[0.14em] uppercase text-white/75"
          onClick={() => setIsFilterOpen(prev => !prev)}
        >
          <span>Filtra appartamenti {hasActiveFilters && `(${filtered.length})`}</span>
          <span className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}>▾</span>
        </button>

        {/* Filter Fields */}
        <div
          className={`md:flex md:items-end overflow-hidden transition-all duration-300
            ${isFilterOpen ? 'max-h-[500px] pb-4' : 'max-h-0 md:max-h-none'}`}
          style={{
            paddingLeft: 'max(20px, env(safe-area-inset-left))',
            paddingRight: 'max(20px, env(safe-area-inset-right))',
          }}
        >
          {/* Block */}
          <div className="flex-1 px-4 py-3 md:py-4 md:border-r md:border-white/[0.08]">
            <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/30 mb-[6px]">
              Blocco
            </label>
            <select
              value={filters.block}
              onChange={e => handleFilterChange('block', e.target.value)}
              className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light appearance-none cursor-pointer"
              style={{ fontSize: '16px' }}
            >
              <option value="" className="bg-charcoal">Tutti</option>
              <option value="A" className="bg-charcoal">Blocco A</option>
              <option value="B" className="bg-charcoal">Blocco B</option>
              <option value="C" className="bg-charcoal">Blocco C</option>
            </select>
          </div>

          {/* Floor */}
          <div className="flex-1 px-4 py-3 md:py-4 md:border-r md:border-white/[0.08]">
            <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/30 mb-[6px]">
              Piano
            </label>
            <select
              value={filters.floor}
              onChange={e => handleFilterChange('floor', e.target.value)}
              className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light appearance-none cursor-pointer"
              style={{ fontSize: '16px' }}
            >
              <option value="" className="bg-charcoal">Tutti</option>
              <option value="Terra" className="bg-charcoal">Piano Terra</option>
              <option value="Primo" className="bg-charcoal">Primo Piano</option>
              <option value="Secondo" className="bg-charcoal">Secondo Piano</option>
              <option value="Terzo" className="bg-charcoal">Terzo Piano</option>
            </select>
          </div>

          {/* Outdoor */}
          <div className="flex-1 px-4 py-3 md:py-4 md:border-r md:border-white/[0.08]">
            <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/30 mb-[6px]">
              Spazio esterno
            </label>
            <select
              value={filters.outdoor}
              onChange={e => handleFilterChange('outdoor', e.target.value)}
              className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light appearance-none cursor-pointer"
              style={{ fontSize: '16px' }}
            >
              <option value="" className="bg-charcoal">Tutti</option>
              <option value="Giardino" className="bg-charcoal">Con giardino</option>
              <option value="Terrazza" className="bg-charcoal">Con terrazza</option>
            </select>
          </div>

          {/* Size */}
          <div className="flex-1 px-4 py-3 md:py-4 md:border-r md:border-white/[0.08]">
            <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/30 mb-[6px]">
              Superficie
            </label>
            <select
              value={filters.size}
              onChange={e => handleFilterChange('size', e.target.value)}
              className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light appearance-none cursor-pointer"
              style={{ fontSize: '16px' }}
            >
              <option value="" className="bg-charcoal">Qualsiasi</option>
              <option value="small" className="bg-charcoal">fino a 80 m²</option>
              <option value="mid" className="bg-charcoal">80–110 m²</option>
              <option value="large" className="bg-charcoal">oltre 110 m²</option>
            </select>
          </div>

          {/* Availability */}
          <div className="flex-1 px-4 py-3 md:py-4 md:border-r md:border-white/[0.08]">
            <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/30 mb-[6px]">
              Disponibilità
            </label>
            <select
              value={filters.availability}
              onChange={e => handleFilterChange('availability', e.target.value)}
              className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light appearance-none cursor-pointer"
              style={{ fontSize: '16px' }}
            >
              <option value="" className="bg-charcoal">Tutti</option>
              <option value="Disponibile" className="bg-charcoal">Disponibili</option>
              <option value="Riservato" className="bg-charcoal">Riservati</option>
            </select>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-4 py-4 font-sans text-[11px] tracking-[0.12em] uppercase text-white/40 hover:text-white/70 transition-colors whitespace-nowrap"
            >
              Reset filtri
            </button>
          )}
        </div>
      </div>

      {/* Apartment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-travertine">
        {filtered.length > 0 ? (
          filtered.map(apt => (
            <AptCard
              key={`${apt.block}${apt.num}`}
              apt={apt}
              onClick={() => openModal('apt', apt)}
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-muted text-sm bg-offwhite">
            Nessun appartamento trovato.{' '}
            <button onClick={resetFilters} className="underline hover:text-charcoal">
              Reset filtri
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
