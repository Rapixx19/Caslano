import Link from 'next/link'

export function Footer() {
  return (
    <footer
      className="bg-bronze px-6 md:px-12 py-8 md:py-10"
      style={{
        paddingLeft: 'max(24px, env(safe-area-inset-left))',
        paddingRight: 'max(24px, env(safe-area-inset-right))',
        paddingBottom: 'max(32px, calc(env(safe-area-inset-bottom) + 32px))',
      }}
    >
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-5 text-center md:text-left">
        {/* Logo */}
        <div>
          <div className="font-serif text-[17px] font-light text-white">
            Residenza Caslano
          </div>
          <div className="font-sans text-[8px] tracking-[0.26em] uppercase text-white/30 mt-1">
            Lago di Lugano · Ticino
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {['Privacy', 'Cookie', 'Documenti'].map(label => (
            <Link
              key={label}
              href="#"
              className="font-sans text-[9px] tracking-[0.14em] uppercase text-white/[0.28] hover:text-white/50 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="font-sans text-[10px] text-white/[0.15]">
          © 2025 Residenza Caslano
        </div>
      </div>
    </footer>
  )
}
