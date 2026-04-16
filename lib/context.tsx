'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Apartment } from './apartments'

type ModalType = 'call' | 'visit' | 'apt' | null

interface AppContextType {
  // Mobile menu
  isMobileMenuOpen: boolean
  openMobileMenu: () => void
  closeMobileMenu: () => void

  // Modal
  modalType: ModalType
  modalApt: Apartment | null
  openModal: (type: ModalType, apt?: Apartment) => void
  closeModal: () => void

  // Chatbot
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType>(null)
  const [modalApt, setModalApt] = useState<Apartment | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openMobileMenu = () => setIsMobileMenuOpen(true)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const openModal = (type: ModalType, apt?: Apartment) => {
    setModalType(type)
    setModalApt(apt || null)
  }
  const closeModal = () => {
    setModalType(null)
    setModalApt(null)
  }

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)
  const toggleChat = () => setIsChatOpen(prev => !prev)

  return (
    <AppContext.Provider
      value={{
        isMobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        modalType,
        modalApt,
        openModal,
        closeModal,
        isChatOpen,
        openChat,
        closeChat,
        toggleChat,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
