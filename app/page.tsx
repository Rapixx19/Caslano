'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Teaser } from '@/components/ui/Teaser'
import { Footer } from '@/components/Footer'
import { useApp } from '@/lib/context'
import { TEASER_CARDS, HOME_STATS } from '@/lib/constants'

const HERO_STATS = [
  { n: '36', l: 'Appartamenti' },
  { n: 'CHF 725K', l: 'A partire da' },
  { n: '3', l: 'Blocchi' },
]

export default function HomePage() {
  const router = useRouter()
  const { openChat } = useApp()

  return (
    <div
      className="fixed inset-0 overflow-y-scroll overflow-x-hidden animate-pageIn"
      style={{ paddingTop: 'var(--nav-h)', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
    >
      {/* Hero Section */}
      <section className="relative h-[calc(100svh-64px)] min-h-[500px] overflow-hidden flex items-end">
        <Image
          src="/images/hero.jpg"
          fill
          className="object-cover object-[center_72%]"
          alt="Residenza Caslano"
          priority
        />

        {/* Veil */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(28,27,25,0.78) 0%, rgba(28,27,25,0.15) 55%, transparent 100%)',
          }}
        />

        {/* Hero Content */}
        <div
          className="relative w-full px-5 sm:px-[52px] pb-10 sm:pb-16"
          style={{ paddingBottom: 'max(40px, calc(env(safe-area-inset-bottom) + 20px))' }}
        >
          <p className="font-sans text-[9px] tracking-[0.24em] uppercase text-white/45 font-light mb-[14px]">
            Caslano · Canton Ticino · Svizzera
          </p>
          <h1 className="font-serif text-[clamp(52px,11vw,108px)] font-light text-white leading-[0.9] mb-8">
            Pietra,<br />luce<br />e <em className="not-italic text-white/50">Bamba.</em>
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

        {/* Desktop Stats */}
        <div className="absolute right-6 bottom-10 hidden sm:flex">
          {HERO_STATS.map(s => (
            <div key={s.n} className="text-right px-5 py-3 border-l border-white/[0.15]">
              <div className="font-serif text-[28px] font-light text-white leading-none">{s.n}</div>
              <div className="font-sans text-[8px] tracking-[0.16em] uppercase text-white/40 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaser Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[2px] bg-travertine">
        {TEASER_CARDS.map(card => (
          <Teaser key={card.href} {...card} />
        ))}
      </div>

      {/* Stats Strip */}
      <div
        className="bg-charcoal grid grid-cols-2 sm:grid-cols-4"
        style={{
          paddingLeft: 'max(24px, env(safe-area-inset-left))',
          paddingRight: 'max(24px, env(safe-area-inset-right))',
        }}
      >
        {HOME_STATS.map((stat, i) => (
          <div
            key={stat.n}
            className={`p-5 sm:p-6 ${i < HOME_STATS.length - 1 ? 'border-r border-white/[0.06]' : ''}`}
          >
            <div className="font-serif text-[clamp(22px,4vw,30px)] font-light text-white">{stat.n}</div>
            <div className="font-sans text-[8px] tracking-[0.14em] uppercase text-white/30 mt-1">{stat.l}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
