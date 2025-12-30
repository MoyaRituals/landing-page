'use client'

import { useState, useEffect } from 'react'
import type { CTAVariant } from '@/lib/constants'

/**
 * Hook to manage A/B test variant with localStorage persistence.
 * Supports query parameter override via ?campaign=A or ?campaign=B.
 * Priority: localStorage > query parameter > randomize
 * Ensures consistent variant across all components.
 */
export function useABTestVariant() {
  const [variant, setVariant] = useState<CTAVariant>('A')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Priority 1: Check if variant already exists in localStorage
    const storedVariant = localStorage.getItem('cta_variant') as CTAVariant | null

    if (storedVariant === 'A' || storedVariant === 'B') {
      // Use stored variant (highest priority)
      setVariant(storedVariant)
      setIsLoaded(true)
      return
    }

    // Priority 2: Check query parameter (only if no localStorage variant)
    // Read from URL search params directly to avoid Suspense requirements
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const campaignParam = urlParams.get('campaign')
      if (campaignParam) {
        const normalizedCampaign = campaignParam.toUpperCase() as CTAVariant
        if (normalizedCampaign === 'A' || normalizedCampaign === 'B') {
          // Use query parameter variant and store it for consistency
          setVariant(normalizedCampaign)
          localStorage.setItem('cta_variant', normalizedCampaign)
          setIsLoaded(true)
          return
        }
      }
    }

    // Priority 3: Assign new random variant and store it
    const newVariant = Math.random() < 0.5 ? 'A' : 'B'
    setVariant(newVariant)
    localStorage.setItem('cta_variant', newVariant)
    setIsLoaded(true)
  }, [])

  return { variant, isLoaded }
}
