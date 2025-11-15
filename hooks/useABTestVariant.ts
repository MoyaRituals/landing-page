'use client'

import { useState, useEffect } from 'react'
import type { CTAVariant } from '@/lib/constants'

/**
 * Hook to manage A/B test variant with localStorage persistence.
 * Ensures consistent variant across all components.
 */
export function useABTestVariant() {
  const [variant, setVariant] = useState<CTAVariant>('A')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if variant already exists in localStorage
    const storedVariant = localStorage.getItem('cta_variant') as CTAVariant | null

    if (storedVariant === 'A' || storedVariant === 'B') {
      // Use stored variant
      setVariant(storedVariant)
    } else {
      // Assign new random variant and store it
      const newVariant = Math.random() < 0.5 ? 'A' : 'B'
      setVariant(newVariant)
      localStorage.setItem('cta_variant', newVariant)
    }

    setIsLoaded(true)
  }, [])

  return { variant, isLoaded }
}
