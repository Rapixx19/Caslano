import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { MobileMenu } from '@/components/MobileMenu'
import { Chatbot } from '@/components/Chatbot'
import { Modal } from '@/components/Modal'
import { AppProvider } from '@/lib/context'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Residenza Caslano | Appartamenti di Lusso sul Lago di Lugano',
  description: '36 appartamenti esclusivi in travertino a Caslano, Canton Ticino, Svizzera. Vista sul Lago di Lugano, architettura premium, a partire da CHF 725\'000.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-offwhite text-charcoal overflow-hidden fixed w-full h-full">
        <AppProvider>
          <Nav />
          <MobileMenu />
          <main className="h-full" style={{ paddingTop: 'var(--nav-h)' }}>
            {children}
          </main>
          <Chatbot />
          <Modal />
        </AppProvider>
      </body>
    </html>
  )
}
