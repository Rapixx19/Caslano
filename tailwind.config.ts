import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stone: '#C8BA9F',
        travertine: '#D6C9AF',
        charcoal: '#1E1D1B',
        bronze: '#2D2926',
        amber: '#C8884A',
        muted: '#8A8070',
        cream: '#F5F0E6',
        offwhite: '#FDFAF4',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
