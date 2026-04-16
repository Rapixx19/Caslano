'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '@/lib/context'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/progetto', label: 'Il Progetto' },
  { href: '/appartamenti', label: 'Appartamenti' },
  { href: '/posizione', label: 'Posizione' },
]

export function Nav() {
  const pathname = usePathname()
  const { openMobileMenu } = useApp()
  const isDark = pathname === '/'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[400] h-[64px] flex items-center justify-between
        px-5 md:px-8
        backdrop-blur-md
        border-b
        transition-all duration-300
        ${isDark
          ? 'bg-[rgba(28,27,25,0.55)] border-white/[0.08]'
          : 'bg-[rgba(253,250,244,0.97)] border-charcoal/10'
        }`}
      style={{
        paddingLeft: 'max(20px, env(safe-area-inset-left))',
        paddingRight: 'max(20px, env(safe-area-inset-right))',
      }}
    >
      <Link href="/" className="flex flex-col leading-none cursor-pointer">
        <span
          className={`font-serif text-[19px] font-light tracking-[0.06em] transition-colors
            ${isDark ? 'text-white' : 'text-charcoal'}`}
        >
          Residenza Caslano
        </span>
        <span
          className={`font-sans text-[8px] tracking-[0.26em] uppercase mt-[3px] transition-colors
            ${isDark ? 'text-white/40' : 'text-muted'}`}
        >
          Lago di Lugano · Canton Ticino
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-[30px]">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`font-sans text-[10px] tracking-[0.13em] uppercase transition-colors
              ${pathname === href
                ? 'text-amber'
                : isDark
                  ? 'text-white/75 hover:text-white'
                  : 'text-charcoal hover:text-amber'
              }`}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contatti"
          className={`font-sans text-[10px] tracking-[0.14em] uppercase px-5 py-[9px] border transition-all
            ${isDark
              ? 'border-white/45 text-white hover:bg-white hover:text-charcoal'
              : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-offwhite'
            }`}
        >
          Contatti
        </Link>
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col justify-center gap-[5px] w-11 h-11 p-2"
        onClick={openMobileMenu}
        aria-label="Menu"
      >
        <span className={`block w-full h-px transition-colors ${isDark ? 'bg-white' : 'bg-charcoal'}`} />
        <span className={`block w-full h-px transition-colors ${isDark ? 'bg-white' : 'bg-charcoal'}`} />
        <span className={`block w-full h-px transition-colors ${isDark ? 'bg-white' : 'bg-charcoal'}`} />
      </button>
    </nav>
  )
}
