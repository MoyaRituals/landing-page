// Moya Rituals Brand Constants

// Types
export type CTAVariant = 'A' | 'B'

export interface Product {
  name: string
  tagline: string
  description: string
  benefits: string[]
}

export interface Benefit {
  title: string
  description: string
  icon: string
}

export interface RitualStep {
  step: number
  title: string
  description: string
}

// Brand Colors
export const BRAND_COLORS = {
  taupe: '#A68C84',
  roseClay: '#D9A79B',
  warmBeige: '#F2EDE9',
  stone: '#C9BCB2',
  charcoal: '#2B2B2B',
}

export const BRAND_TAGLINE = 'The skincare ritual to reset your nervous system.'

export const BRAND_STATEMENT = 'Calm Skin. Clear Head.'

export const PRODUCTS = {
  mindSerum: {
    name: 'MindSerum™',
    tagline: 'Neuro-Calming Serum',
    description: 'A lightweight serum formulated with adaptogens and neuro-calming botanicals to soothe stressed skin and support your nervous system.',
    benefits: [
      'Reduces visible stress signs',
      'Supports skin barrier function',
      'Calms redness and inflammation',
      'Botanical adaptogen blend',
    ],
  },
  ritualMist: {
    name: 'Ritual Mist™',
    tagline: 'Aromatic Reset Mist',
    description: 'An aromatic facial mist designed to ground your senses and prepare your skin for deeper care, creating a mindful moment in your day.',
    benefits: [
      'Instantly refreshes and hydrates',
      'Grounding aromatic experience',
      'Prepares skin for serum',
      'Ritual-setting fragrance',
    ],
  },
}

export const BENEFITS = [
  {
    title: 'Neuro-Calming Formula',
    description: 'Botanicals chosen for their ability to support both skin health and nervous system balance.',
    icon: '🧠',
  },
  {
    title: '3-Minute Ritual',
    description: 'A simple, effective routine that creates space for mindfulness in your busy day.',
    icon: '⏱️',
  },
  {
    title: 'Clean Ingredients',
    description: 'Formulated without harsh chemicals, focusing on gentle, effective botanicals.',
    icon: '🌿',
  },
]

export const RITUAL_STEPS = [
  {
    step: 1,
    title: 'Pause & Breathe',
    description: 'Take three deep breaths. Create space for this moment.',
  },
  {
    step: 2,
    title: 'Mist & Ground',
    description: 'Spritz Ritual Mist to refresh skin and ground your senses.',
  },
  {
    step: 3,
    title: 'Smooth & Calm',
    description: 'Apply MindSerum™ with gentle upward motions. Feel tension release.',
  },
]

export const CTA_VARIANTS: Record<CTAVariant, string> = {
  A: 'Join the Waitlist',
  B: 'Preorder Your Ritual System',
} as const

export const CTA_SUBTEXT: Record<CTAVariant, string> = {
  A: 'Join the waitlist for exclusive launch access',
  B: 'Reserve now for exclusive preorder pricing',
} as const

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/moyarituals', // Update with actual handle
  tiktok: 'https://tiktok.com/@moyarituals', // Update with actual handle
}

export const CONTACT_EMAIL = 'info@moyaskincare.com'
