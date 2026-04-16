'use client'

import { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline-dark' | 'ghost-light'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-amber text-white border-none
    hover:opacity-85
  `,
  'outline-dark': `
    bg-transparent border border-charcoal text-charcoal
    hover:bg-charcoal hover:text-offwhite
  `,
  'ghost-light': `
    bg-transparent border border-white/50 text-white
    hover:bg-white/10
  `,
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        px-7 py-[14px]
        font-sans text-[11px] tracking-[0.14em] uppercase font-normal
        min-h-[48px]
        transition-all duration-200
        whitespace-nowrap
        ${variantStyles[variant]}
        ${className}
      `}
      style={{ borderWidth: variant !== 'primary' ? '0.5px' : undefined }}
      {...props}
    >
      {children}
    </button>
  )
}
