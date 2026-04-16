'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from '@/lib/context'

const MENU_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/progetto', label: 'Il Progetto' },
  { href: '/appartamenti', label: 'Appartamenti' },
  { href: '/posizione', label: 'Posizione' },
  { href: '/contatti', label: 'Contatti' },
]

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useApp()
  const pathname = usePathname()

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[500] backdrop-blur-sm bg-charcoal/55 transition-opacity duration-300
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMobileMenu}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[501] w-[min(320px,85vw)] bg-offwhite
          flex flex-col
          transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          paddingTop: 'max(64px, env(safe-area-inset-top))',
          paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        <button
          className="absolute top-[14px] right-4 w-11 h-11 flex items-center justify-center text-muted text-[22px]"
          onClick={closeMobileMenu}
        >
          ✕
        </button>

        <nav className="flex-1 overflow-y-auto pt-8">
          {MENU_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobileMenu}
              className={`block w-full text-left px-8 py-[18px] font-sans text-[15px] tracking-[0.08em] uppercase font-light border-b border-charcoal/[0.07] transition-colors
                ${pathname === href ? 'text-amber' : 'text-charcoal hover:text-amber'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-8 pt-6">
          <Link
            href="/contatti"
            onClick={closeMobileMenu}
            className="block w-full text-center bg-charcoal text-white font-sans text-[11px] tracking-[0.16em] uppercase py-4"
          >
            Richiedi informazioni
          </Link>
        </div>
      </div>
    </>
  )
}
