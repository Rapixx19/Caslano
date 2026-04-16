'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface TeaserProps {
  img: string
  eyebrow: string
  title: string
  cta: string
  href: string
}

export function Teaser({ img, eyebrow, title, cta, href }: TeaserProps) {
  const router = useRouter()

  return (
    <div
      className="relative h-[300px] sm:h-[360px] overflow-hidden cursor-pointer group bg-offwhite"
      onClick={() => router.push(href)}
    >
      <Image
        src={img}
        alt={eyebrow}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Veil */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(28,27,25,0.72) 0%, rgba(28,27,25,0.08) 65%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="font-sans text-[8px] tracking-[0.22em] uppercase text-white/50 mb-[6px]">
          {eyebrow}
        </p>
        <h3
          className="font-serif text-[clamp(22px,4vw,28px)] font-light text-white leading-[1.05] mb-[10px] [&_em]:not-italic [&_em]:text-white/50"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="font-sans text-[9px] tracking-[0.16em] uppercase text-white/50 flex items-center gap-[5px]">
          {cta}
          <span className="transition-transform duration-200 group-hover:translate-x-[5px]">→</span>
        </div>
      </div>
    </div>
  )
}
