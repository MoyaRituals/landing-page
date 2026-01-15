'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function GoogleAnalytics() {
  const { analyticsConsented, isLoaded } = useCookieConsent()
  const [shouldLoad, setShouldLoad] = useState(false)

  // Don't load GA if no measurement ID
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  // Wait for consent check to complete AND user must have explicitly consented
  useEffect(() => {
    if (isLoaded) {
      if (analyticsConsented) return setShouldLoad(true)

      // User has NOT consented - clear any existing GA cookies
      setShouldLoad(false)
      if (typeof window !== 'undefined') {

        const gaCookies = ['_ga', '_ga_', '_gid', '_gat']
        gaCookies.forEach((cookieName) => {
          // Clear for current domain
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
          // Clear for root domain (if different)
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`
        })

        // Clear any _ga_* cookies (GA4 uses dynamic suffixes)
        document.cookie.split(';').forEach((cookie) => {
          const cookieName = cookie.split('=')[0].trim()
          if (cookieName.startsWith('_ga')) {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
          }
        })
      }

    }
  }, [isLoaded, analyticsConsented])

  // Never load GA until consent is explicitly confirmed
  if (!shouldLoad) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            'anonymize_ip': true
          });
        `}
      </Script>
    </>
  )
}
