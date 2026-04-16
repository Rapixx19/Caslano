'use client'

import Image from 'next/image'
import { Apartment, formatPrice, getAptImage } from '@/lib/apartments'

interface AptCardProps {
  apt: Apartment
  onClick: () => void
}

export function AptCard({ apt, onClick }: AptCardProps) {
  const floorLabel = apt.floor === 'Terra' ? 'Piano Terra' : `Piano ${apt.floor}`
  const extLabel = apt.out === 'Giardino' ? 'Giardino' : 'Terrazza'

  return (
    <div
      className="bg-offwhite cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-[210px] overflow-hidden">
        <Image
          src={getAptImage(apt)}
          alt={`Appartamento ${apt.block}${apt.num}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Block tag */}
        <div className="absolute bottom-3 left-3 font-sans text-[8px] tracking-[0.14em] uppercase text-white/60 bg-black/[0.32] backdrop-blur-sm px-[9px] py-[3px]">
          Blocco {apt.block}
        </div>

        {/* Status badge */}
        <div
          className={`absolute top-3 right-3 font-sans text-[8px] tracking-[0.14em] uppercase px-[9px] py-1
            ${apt.status === 'Disponibile'
              ? 'bg-[rgba(253,250,244,0.93)] text-charcoal'
              : 'bg-[rgba(28,27,25,0.70)] text-white/70'
            }`}
        >
          {apt.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-serif text-[18px] font-light text-charcoal mb-1">
          Appartamento {apt.block}{apt.num}
        </h3>

        {/* Subtitle */}
        <p className="font-sans text-[9px] tracking-[0.12em] uppercase text-muted mb-4">
          {floorLabel} · {extLabel} {apt.garden > 0 ? `${apt.garden} m²` : `${apt.ext} m²`}
        </p>

        {/* Specs row */}
        <div className="flex gap-4 mb-4">
          <div>
            <div className="font-serif text-[15px] font-light text-charcoal">{apt.sqm} m²</div>
            <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">Superficie</div>
          </div>
          <div>
            <div className="font-serif text-[15px] font-light text-charcoal">{apt.ext} m²</div>
            <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">
              {apt.out === 'Giardino' ? 'Portico' : 'Terrazza'}
            </div>
          </div>
          {apt.garden > 0 && (
            <div>
              <div className="font-serif text-[15px] font-light text-charcoal">{apt.garden} m²</div>
              <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">Giardino</div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-charcoal/[0.08] mb-4" />

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-serif text-[19px] font-light text-charcoal">{formatPrice(apt.price)}</div>
            <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">prezzo indicativo</div>
          </div>
          <span className="text-travertine group-hover:text-charcoal group-hover:translate-x-1 transition-all duration-200 text-lg">
            →
          </span>
        </div>
      </div>
    </div>
  )
}
