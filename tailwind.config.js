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
        // moya Rituals Brand Colors
        'moya-taupe': '#A68C84',
        'moya-rose-clay': '#D9A79B',
        'moya-warm-beige': '#F2EDE9',
        'moya-stone': '#C9BCB2',
        'moya-charcoal': '#2B2B2B',
      },
      fontFamily: {
        'heading': ['var(--font-cormorant)', 'serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
