'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/Footer'
import { FEATURES, GALLERY_IMAGES } from '@/lib/constants'

export default function ProgettoPage() {
  return (
    <div
      className="fixed inset-0 overflow-y-scroll overflow-x-hidden animate-pageIn"
      style={{ paddingTop: 'var(--nav-h)', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
    >
      {/* Page Hero */}
      <section className="relative h-[min(50vh,380px)] overflow-hidden flex items-end">
        <Image
          src="/images/facade_evening.jpg"
          fill
          className="object-cover object-[center_60%]"
          alt="Facciata Residenza Caslano"
          priority
        />

        {/* Veil */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(28,27,25,0.65) 0%, rgba(28,27,25,0.10) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative w-full px-5 sm:px-[52px] pb-8 sm:pb-12">
          <p className="font-sans text-[8px] tracking-[0.22em] uppercase text-white/45 mb-3">
            Il Progetto
          </p>
          <h1 className="font-serif text-[clamp(32px,5vw,60px)] font-light text-white leading-[1.05]">
            Un&apos;architettura che dura<br />
            <em className="not-italic text-white/50">nel tempo.</em>
          </h1>
        </div>
      </section>

      {/* Split Section 1: Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Text */}
        <div className="px-6 py-12 md:px-14 md:py-16 bg-offwhite">
          <p className="font-sans text-[8px] tracking-[0.22em] uppercase text-muted mb-4">
            Descrizione
          </p>
          <h2 className="font-serif text-[clamp(26px,4vw,42px)] font-light text-charcoal leading-[1.1] mb-6">
            Travertino, calcestruzzo<br />
            e <em className="not-italic text-muted">luce naturale.</em>
          </h2>
          <p className="font-sans text-[14px] font-light text-muted leading-[1.7] mb-4">
            Residenza Caslano nasce dalla volontà di creare un complesso residenziale che si integri perfettamente
            con il paesaggio ticinese, utilizzando materiali nobili e tecniche costruttive all&apos;avanguardia.
          </p>
          <p className="font-sans text-[14px] font-light text-muted leading-[1.7] mb-8">
            La facciata in travertino naturale dialoga con la luce del lago, mentre gli interni ampi e luminosi
            offrono spazi di vita contemporanei pensati per il comfort quotidiano.
          </p>

          {/* Features */}
          <div className="mb-8">
            {FEATURES.map(f => (
              <div key={f.key} className="flex items-baseline gap-3 py-3 border-b border-charcoal/[0.09] text-[13px]">
                <div className="w-1 h-1 rounded-full bg-amber flex-shrink-0 relative top-[1px]" />
                <span className="font-medium text-charcoal min-w-[130px]">{f.key}</span>
                <span className="text-muted font-light">{f.value}</span>
              </div>
            ))}
          </div>

          <Link href="/appartamenti">
            <Button variant="outline-dark">Vedi gli appartamenti</Button>
          </Link>
        </div>

        {/* Image */}
        <div className="relative min-h-[300px] md:min-h-[460px] overflow-hidden">
          <Image
            src="/images/terrace.jpg"
            fill
            className="object-cover"
            alt="Terrazza"
          />
        </div>
      </div>

      {/* Gallery */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-[2px] bg-travertine"
        style={{ height: 'clamp(240px, 35vw, 380px)' }}
      >
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={img.src}
            className={`relative overflow-hidden group ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}
          >
            <Image
              src={img.src}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              alt={img.caption}
            />
            {/* Caption */}
            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-3"
              style={{
                background: 'linear-gradient(to top, rgba(28,27,25,0.6) 0%, transparent 100%)',
                paddingTop: '28px',
              }}
            >
              <span className="font-sans text-[8px] tracking-[0.18em] uppercase text-white/50">
                {img.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Split Section 2: Courtyard (reversed) */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image (first on desktop) */}
        <div className="relative min-h-[300px] md:min-h-[460px] overflow-hidden md:order-1">
          <Image
            src="/images/ground_floor.jpg"
            fill
            className="object-cover"
            alt="Piano terra"
          />
        </div>

        {/* Text */}
        <div className="px-6 py-12 md:px-14 md:py-16 bg-cream md:order-2">
          <p className="font-sans text-[8px] tracking-[0.22em] uppercase text-muted mb-4">
            Il Cortile
          </p>
          <h2 className="font-serif text-[clamp(26px,4vw,42px)] font-light text-charcoal leading-[1.1] mb-6">
            Uno spazio comune<br />
            da <em className="not-italic text-muted">vivere.</em>
          </h2>
          <p className="font-sans text-[14px] font-light text-muted leading-[1.7] mb-4">
            Il cortile paesaggistico è il cuore pulsante di Residenza Caslano. Un&apos;oasi verde progettata
            per favorire la convivialità e il relax, con aree lounge, percorsi pedonali e vegetazione mediterranea.
          </p>
          <p className="font-sans text-[14px] font-light text-muted leading-[1.7] mb-8">
            Gli spazi comuni sono pensati per offrire ai residenti un&apos;esperienza abitativa esclusiva,
            dove la qualità della vita si esprime anche negli ambienti condivisi.
          </p>

          <Link href="/contatti">
            <Button variant="primary">Richiedi informazioni</Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
