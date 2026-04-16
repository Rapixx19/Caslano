'use client'

import Image from 'next/image'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { useApp } from '@/lib/context'
import { DISTANCES, POIS } from '@/lib/constants'

export default function PosizionePage() {
  const { openModal } = useApp()

  return (
    <div
      className="fixed inset-0 overflow-y-scroll overflow-x-hidden animate-pageIn"
      style={{ paddingTop: 'var(--nav-h)', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
    >
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100svh-64px)]">
        {/* Map Image */}
        <div className="relative h-[300px] md:h-auto overflow-hidden">
          <Image
            src="/images/aerial_lake.jpg"
            fill
            className="object-cover"
            alt="Vista aerea Caslano"
            priority
          />
          <p className="absolute bottom-4 left-4 font-sans text-[8px] tracking-[0.18em] uppercase text-white/40">
            Caslano · Lago di Lugano · Canton Ticino
          </p>
        </div>

        {/* Panel */}
        <div
          className="bg-charcoal px-6 py-12 md:px-14 md:py-16 overflow-y-auto"
          style={{ paddingBottom: 'max(48px, calc(env(safe-area-inset-bottom) + 48px))' }}
        >
          {/* Header */}
          <p className="font-sans text-[8px] tracking-[0.22em] uppercase text-muted mb-4">
            La Posizione
          </p>
          <h1 className="font-serif text-[clamp(28px,4vw,48px)] font-light text-white leading-[1.1] mb-6">
            A <em className="not-italic text-white/40">pochi minuti</em><br />
            dal lago e<br />
            da Lugano.
          </h1>
          <p className="font-sans text-[14px] font-light text-white/45 leading-[1.7] mb-8">
            Caslano si trova sulla sponda occidentale del Lago di Lugano, in una posizione privilegiata
            che offre tranquillità e connessioni eccellenti verso la Svizzera e l&apos;Italia.
          </p>

          {/* Distance Grid */}
          <div className="grid grid-cols-2 gap-[1px] bg-white/[0.06] mb-8">
            {DISTANCES.map(d => (
              <div key={d.v} className="bg-charcoal p-[18px]">
                <div className="font-serif text-[22px] font-light text-white">{d.v}</div>
                <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-1">{d.l}</div>
              </div>
            ))}
          </div>

          {/* POI Sections */}
          {POIS.map(section => (
            <div key={section.title} className="mb-5">
              <p className="font-sans text-[8px] tracking-[0.2em] uppercase text-amber mb-2">
                {section.title}
              </p>
              {section.items.map(item => (
                <div
                  key={item.name}
                  className="flex justify-between py-[7px] border-b border-white/[0.05] text-[12px]"
                >
                  <span className="text-white/60 font-light">{item.name}</span>
                  <span className="text-white/[0.28] font-light">{item.dist}</span>
                </div>
              ))}
            </div>
          ))}

          {/* CTA */}
          <div className="mt-8">
            <Button variant="primary" onClick={() => openModal('visit')}>
              Prenota una visita
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
