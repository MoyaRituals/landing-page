/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nova Rituals Brand Colors
        'nova-taupe': '#A68C84',
        'nova-rose-clay': '#D9A79B',
        'nova-warm-beige': '#F2EDE9',
        'nova-stone': '#C9BCB2',
        'nova-charcoal': '#2B2B2B',
      },
      fontFamily: {
        'heading': ['var(--font-cormorant)', 'serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
