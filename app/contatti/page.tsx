'use client'

import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { useApp } from '@/lib/context'
import { APARTMENTS } from '@/lib/apartments'

export default function ContattiPage() {
  const { openModal } = useApp()
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    appartamento: '',
    messaggio: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div
      className="fixed inset-0 overflow-y-scroll overflow-x-hidden animate-pageIn"
      style={{ paddingTop: 'var(--nav-h)', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
    >
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100svh-64px)]">
        {/* Left Panel - Light */}
        <div
          className="bg-cream px-6 py-12 md:px-14 md:py-16"
          style={{
            paddingLeft: 'max(24px, env(safe-area-inset-left))',
          }}
        >
          {/* Header */}
          <p className="font-sans text-[8px] tracking-[0.22em] uppercase text-muted mb-4">
            Contatti
          </p>
          <h1 className="font-serif text-[clamp(28px,4vw,48px)] font-light text-charcoal leading-[1.1] mb-6">
            Parla con<br />
            il <em className="not-italic text-muted">nostro team.</em>
          </h1>
          <p className="font-sans text-[14px] font-light text-muted leading-[1.7] mb-7">
            Il nostro team vendite è a tua disposizione per rispondere a qualsiasi domanda
            e accompagnarti nella scelta del tuo nuovo appartamento.
          </p>

          {/* Agent Card */}
          <div className="bg-offwhite border border-travertine p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-white font-serif text-sm flex-shrink-0">
                RC
              </div>
              <div>
                <div className="font-sans text-[13px] font-medium text-charcoal">Team Vendite</div>
                <div className="font-sans text-[12px] text-muted font-light">Residenza Caslano</div>
                <div className="font-sans text-[12px] text-muted font-light mt-2">info@residenzacaslano.ch</div>
                <div className="font-sans text-[12px] text-muted font-light">+41 91 000 00 00</div>
              </div>
            </div>
          </div>

          {/* Scheduling Cards */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => openModal('call')}
              className="bg-offwhite border border-travertine p-[18px] text-left hover:border-charcoal transition-colors"
            >
              <span className="text-xl mb-2 block">📞</span>
              <div className="font-sans text-[12px] font-medium text-charcoal mb-1">Prenota una chiamata</div>
              <div className="font-sans text-[10px] text-muted">Lun–Ven 9:00–18:00</div>
            </button>
            <button
              onClick={() => openModal('visit')}
              className="bg-offwhite border border-travertine p-[18px] text-left hover:border-charcoal transition-colors"
            >
              <span className="text-xl mb-2 block">🏛️</span>
              <div className="font-sans text-[12px] font-medium text-charcoal mb-1">Prenota una visita</div>
              <div className="font-sans text-[10px] text-muted">Anche il sabato</div>
            </button>
          </div>
        </div>

        {/* Right Panel - Dark */}
        <div
          className="bg-charcoal px-6 py-12 md:px-14 md:py-16 overflow-y-auto"
          style={{
            paddingRight: 'max(24px, env(safe-area-inset-right))',
            paddingBottom: 'max(48px, calc(env(safe-area-inset-bottom) + 48px))',
          }}
        >
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-[40px] mb-[14px]">✓</div>
              <h3 className="font-serif text-[24px] font-light text-white mb-2">Messaggio inviato</h3>
              <p className="text-[13px] text-white/50 font-light leading-[1.65]">
                Grazie per averci contattato.<br />
                Ti risponderemo entro 24 ore.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Form Fields */}
              <div className="flex flex-col gap-[1px] bg-white/[0.06]">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-[1px] bg-white/[0.06]">
                  <div className="bg-charcoal p-4">
                    <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/[0.28] mb-[5px]">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      autoComplete="given-name"
                      placeholder="Il tuo nome"
                      className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light placeholder:text-white/[0.28]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  <div className="bg-charcoal p-4">
                    <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/[0.28] mb-[5px]">
                      Cognome
                    </label>
                    <input
                      type="text"
                      name="cognome"
                      value={formData.cognome}
                      onChange={handleChange}
                      required
                      autoComplete="family-name"
                      placeholder="Cognome"
                      className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light placeholder:text-white/[0.28]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-2 gap-[1px] bg-white/[0.06]">
                  <div className="bg-charcoal p-4">
                    <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/[0.28] mb-[5px]">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      placeholder="+41 XX XXX XX XX"
                      className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light placeholder:text-white/[0.28]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                  <div className="bg-charcoal p-4">
                    <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/[0.28] mb-[5px]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="email@esempio.ch"
                      className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light placeholder:text-white/[0.28]"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>

                {/* Apartment select */}
                <div className="bg-charcoal p-4">
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/[0.28] mb-[5px]">
                    Appartamento di interesse
                  </label>
                  <select
                    name="appartamento"
                    value={formData.appartamento}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light appearance-none cursor-pointer"
                    style={{ fontSize: '16px' }}
                  >
                    <option value="" className="bg-charcoal">— seleziona —</option>
                    {['A', 'B', 'C'].map(block => (
                      <optgroup key={block} label={`Blocco ${block}`} className="bg-charcoal">
                        {APARTMENTS.filter(a => a.block === block).map(a => (
                          <option key={`${a.block}${a.num}`} value={`${a.block}${a.num}`} className="bg-charcoal">
                            {a.block}{a.num} · {a.floor === 'Terra' ? 'Piano Terra' : `Piano ${a.floor}`} · {a.sqm} m²
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="posteggio" className="bg-charcoal">Posteggio (CHF 40&apos;000)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="bg-charcoal p-4">
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-white/[0.28] mb-[5px]">
                    Messaggio
                  </label>
                  <textarea
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Come possiamo aiutarti?"
                    className="w-full bg-transparent border-none outline-none font-sans text-[15px] text-white/90 font-light placeholder:text-white/[0.28] resize-none"
                    style={{ fontSize: '16px', minHeight: '72px' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="bg-amber text-white font-sans text-[11px] tracking-[0.14em] uppercase py-4 hover:opacity-90 transition-opacity flex items-center justify-between px-5"
                >
                  <span>Invia la richiesta</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          {!submitted && (
            <>
              <div className="flex items-center gap-4 my-6 text-[10px] tracking-[0.1em] uppercase text-white/20">
                <div className="flex-1 h-px bg-white/[0.08]" />
                oppure
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>

              {/* Scheduling buttons */}
              <div className="grid grid-cols-2 gap-[1px] bg-white/[0.06]">
                <button
                  onClick={() => openModal('call')}
                  className="bg-charcoal p-5 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-lg mb-2 block">📞</span>
                  <div className="font-sans text-[11px] font-medium text-white mb-1">Chiamata</div>
                  <div className="font-sans text-[9px] text-white/40">Lun–Ven 9:00–18:00</div>
                </button>
                <button
                  onClick={() => openModal('visit')}
                  className="bg-charcoal p-5 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-lg mb-2 block">🏛️</span>
                  <div className="font-sans text-[11px] font-medium text-white mb-1">Visita</div>
                  <div className="font-sans text-[9px] text-white/40">Anche il sabato</div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
