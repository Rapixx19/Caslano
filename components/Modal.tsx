'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useApp } from '@/lib/context'
import { formatPrice, getAptImage } from '@/lib/apartments'
import { APARTMENTS } from '@/lib/apartments'

const TIME_SLOTS_CALL = ['09:00–11:00', '11:00–13:00', '14:00–16:00', '16:00–18:00']
const TIME_SLOTS_VISIT = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '10:00 (Sabato)', '11:00 (Sabato)']

export function Modal() {
  const { modalType, modalApt, closeModal, openModal } = useApp()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    data: '',
    orario: '',
    appartamento: '',
    note: '',
  })

  useEffect(() => {
    if (modalType) {
      setSubmitted(false)
      setFormData({
        nome: '',
        cognome: '',
        telefono: '',
        email: '',
        data: '',
        orario: '',
        appartamento: modalApt ? `${modalApt.block}${modalApt.num}` : '',
        note: '',
      })
    }
  }, [modalType, modalApt])

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        closeModal()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [submitted, closeModal])

  if (!modalType) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const today = new Date().toISOString().split('T')[0]

  const titles: Record<string, string> = {
    call: 'Prenota una<br/><em>chiamata</em>',
    visit: 'Prenota una<br/><em>visita</em>',
    apt: `Blocco ${modalApt?.block} · Apt ${modalApt?.block}${modalApt?.num}`,
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[600] bg-charcoal/65 backdrop-blur-[6px] flex items-end sm:items-center justify-center"
        onClick={closeModal}
      />

      {/* Modal */}
      <div
        className="fixed z-[601] bg-offwhite w-full max-w-[500px] rounded-t-[20px] sm:rounded-[4px] max-h-[90svh] overflow-y-auto
          left-1/2 -translate-x-1/2 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
          animate-[slideUp_0.3s_ease-out]"
        style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-offwhite z-10 px-6 pt-6 pb-4 border-b border-charcoal/[0.09] flex justify-between items-start">
          <h2
            className="font-serif text-[24px] font-light text-charcoal [&_em]:not-italic [&_em]:text-muted"
            dangerouslySetInnerHTML={{ __html: titles[modalType] || '' }}
          />
          <button
            onClick={closeModal}
            className="w-10 h-10 flex items-center justify-center text-muted text-[22px] hover:text-charcoal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-[40px] mb-[14px]">✓</div>
              <h3 className="font-serif text-[24px] font-light text-charcoal mb-2">Confermato</h3>
              <p className="text-[13px] text-muted font-light leading-[1.65]">
                La tua richiesta di {modalType === 'call' ? 'chiamata' : 'visita'} è stata ricevuta.<br />
                Ti contatteremo entro 24 ore per confermare i dettagli.
              </p>
            </div>
          ) : modalType === 'apt' && modalApt ? (
            // Apartment detail
            <div>
              <div className="relative h-[200px] mb-5 overflow-hidden">
                <Image
                  src={getAptImage(modalApt)}
                  alt={`Appartamento ${modalApt.block}${modalApt.num}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Specs */}
              <div className="flex gap-6 mb-5">
                <div>
                  <div className="font-serif text-[18px] font-light text-charcoal">{modalApt.sqm} m²</div>
                  <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">Superficie</div>
                </div>
                <div>
                  <div className="font-serif text-[18px] font-light text-charcoal">{modalApt.ext} m²</div>
                  <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">
                    {modalApt.out === 'Giardino' ? 'Portico' : 'Terrazza'}
                  </div>
                </div>
                {modalApt.garden > 0 && (
                  <div>
                    <div className="font-serif text-[18px] font-light text-charcoal">{modalApt.garden} m²</div>
                    <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted mt-0.5">Giardino</div>
                  </div>
                )}
              </div>

              <div className="h-px bg-charcoal/[0.08] mb-5" />

              {/* Status & Price */}
              <div className="flex justify-between items-center mb-5">
                <span
                  className={`font-sans text-[10px] tracking-[0.14em] uppercase px-3 py-1
                    ${modalApt.status === 'Disponibile'
                      ? 'bg-cream text-charcoal'
                      : 'bg-charcoal/10 text-muted'
                    }`}
                >
                  {modalApt.status}
                </span>
                <div className="text-right">
                  <div className="font-serif text-[22px] font-light text-charcoal">{formatPrice(modalApt.price)}</div>
                  <div className="font-sans text-[8px] tracking-[0.1em] uppercase text-muted">prezzo indicativo</div>
                </div>
              </div>

              <div className="h-px bg-charcoal/[0.08] mb-5" />

              {/* CTA buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => openModal('call', modalApt)}
                  className="bg-charcoal text-white font-sans text-[10px] tracking-[0.14em] uppercase py-3 hover:bg-amber transition-colors"
                >
                  📞 Chiamata
                </button>
                <button
                  onClick={() => openModal('visit', modalApt)}
                  className="bg-charcoal text-white font-sans text-[10px] tracking-[0.14em] uppercase py-3 hover:bg-amber transition-colors"
                >
                  🏛️ Visita
                </button>
              </div>
            </div>
          ) : (
            // Call or Visit form
            <form onSubmit={handleSubmit}>
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3 mb-[14px]">
                <div>
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
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
                    className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite"
                    style={{ fontSize: '16px' }}
                  />
                </div>
                <div>
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
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
                    className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              {/* Contact row */}
              <div className={`grid gap-3 mb-[14px] ${modalType === 'call' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
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
                    className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite"
                    style={{ fontSize: '16px' }}
                  />
                </div>
                {modalType === 'visit' && (
                  <div>
                    <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
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
                      className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                )}
              </div>

              {modalType === 'call' && (
                <div className="mb-[14px]">
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
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
                    className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              )}

              {/* Date & Time row */}
              <div className="grid grid-cols-2 gap-3 mb-[14px]">
                <div>
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
                    Data preferita
                  </label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    min={today}
                    className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite"
                    style={{ fontSize: '16px' }}
                  />
                </div>
                <div>
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
                    {modalType === 'call' ? 'Fascia oraria' : 'Orario'}
                  </label>
                  <select
                    name="orario"
                    value={formData.orario}
                    onChange={handleChange}
                    required
                    className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite appearance-none"
                    style={{ fontSize: '16px' }}
                  >
                    <option value="">— seleziona —</option>
                    {(modalType === 'call' ? TIME_SLOTS_CALL : TIME_SLOTS_VISIT).map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Apartment select (visit only) */}
              {modalType === 'visit' && (
                <div className="mb-[14px]">
                  <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
                    Appartamento di interesse
                  </label>
                  <select
                    name="appartamento"
                    value={formData.appartamento}
                    onChange={handleChange}
                    className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite appearance-none"
                    style={{ fontSize: '16px' }}
                  >
                    <option value="">— seleziona —</option>
                    {['A', 'B', 'C'].map(block => (
                      <optgroup key={block} label={`Blocco ${block}`}>
                        {APARTMENTS.filter(a => a.block === block).map(a => (
                          <option key={`${a.block}${a.num}`} value={`${a.block}${a.num}`}>
                            {a.block}{a.num} · {a.floor === 'Terra' ? 'Piano Terra' : `Piano ${a.floor}`} · {a.sqm} m²
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="posteggio">Posteggio (CHF 40&apos;000)</option>
                  </select>
                </div>
              )}

              {/* Notes */}
              <div className="mb-[14px]">
                <label className="block font-sans text-[8px] tracking-[0.18em] uppercase text-muted mb-[6px]">
                  Note (opzionale)
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Eventuali richieste o domande..."
                  className="w-full border border-charcoal/15 px-[14px] py-3 font-sans text-charcoal font-light outline-none focus:border-charcoal bg-offwhite resize-none"
                  style={{ fontSize: '16px', minHeight: '72px' }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-charcoal text-white font-sans text-[11px] tracking-[0.14em] uppercase py-4 hover:bg-amber transition-colors flex items-center justify-between px-5"
              >
                <span>Invia la richiesta</span>
                <span>→</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translate(-50%, 20px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        @media (min-width: 640px) {
          @keyframes slideUp {
            from {
              transform: translate(-50%, calc(-50% + 20px));
              opacity: 0;
            }
            to {
              transform: translate(-50%, -50%);
              opacity: 1;
            }
          }
        }
      `}</style>
    </>
  )
}
