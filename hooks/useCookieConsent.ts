'use client'

import { useState, useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'

/**
 * Hook to check if user has consented to analytics cookies.
 * Returns true only after user explicitly accepts analytics.
 */
export function useCookieConsent() {
  const [analyticsConsented, setAnalyticsConsented] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if cookie consent has been initialized
    if (typeof window !== 'undefined') {
      // Get current consent status
      const cookie = CookieConsent.getCookie()
      const hasAnalyticsConsent = cookie?.categories?.includes('analytics') || false

      setAnalyticsConsented(hasAnalyticsConsent)
      setIsLoaded(true)

      // Listen for consent changes
      const handleConsentChange = () => {
        const updatedCookie = CookieConsent.getCookie()
        const hasConsent = updatedCookie?.categories?.includes('analytics') || false
        setAnalyticsConsented(hasConsent)
      }

      // CookieConsent events
      window.addEventListener('cc:onConsent', handleConsentChange)
      window.addEventListener('cc:onChange', handleConsentChange)

      return () => {
        window.removeEventListener('cc:onConsent', handleConsentChange)
        window.removeEventListener('cc:onChange', handleConsentChange)
      }
    }
  }, [])

  return { analyticsConsented, isLoaded }
}
