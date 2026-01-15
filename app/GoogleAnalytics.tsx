'use client'

import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function GoogleAnalytics() {
  const { analyticsConsented, isLoaded } = useCookieConsent()

  // Don't load GA if no measurement ID
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  // Don't load GA until consent is checked
  if (!isLoaded) {
    return null
  }

  // Only load GA if user has consented to analytics
  if (!analyticsConsented) {
    return null
  }

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
