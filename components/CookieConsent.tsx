'use client'

import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import '../app/cookieconsent.css'

export default function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      // Category configuration
      categories: {
        necessary: {
          enabled: true, // Always enabled
          readOnly: true, // Cannot be disabled
        },
        analytics: {
          enabled: false, // Requires explicit consent
          readOnly: false,
        },
      },

      // Language configuration
      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We Value Your Privacy',
              description:
                'We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of analytics cookies.',
              acceptAllBtn: 'Accept',
              acceptNecessaryBtn: 'Reject',
              showPreferencesBtn: 'Manage preferences',
            },
            preferencesModal: {
              title: 'Cookie Preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save preferences',
              closeIconLabel: 'Close',
              sections: [
                {
                  title: 'Cookie Usage',
                  description:
                    'We use cookies to improve your experience on our site. You can choose which cookies you want to accept.',
                },
                {
                  title: 'Strictly Necessary Cookies',
                  description:
                    'These cookies are essential for the website to function properly. They remember your cookie consent preferences.',
                  linkedCategory: 'necessary',
                  cookieTable: {
                    headers: {
                      name: 'Cookie',
                      description: 'Description',
                      duration: 'Duration',
                    },
                    body: [
                      {
                        name: 'cc_cookie',
                        description: 'Stores your cookie consent preferences',
                        duration: '6 months',
                      },
                      {
                        name: 'cta_variant',
                        description: 'Remembers which A/B test variant you saw',
                        duration: 'Persistent',
                      },
                    ],
                  },
                },
                {
                  title: 'Analytics Cookies',
                  description:
                    'These cookies help us understand how visitors interact with our website by collecting anonymous information.',
                  linkedCategory: 'analytics',
                  cookieTable: {
                    headers: {
                      name: 'Cookie',
                      description: 'Description',
                      duration: 'Duration',
                    },
                    body: [
                      {
                        name: '_ga',
                        description: 'Google Analytics - tracks visitor behavior',
                        duration: '2 years',
                      },
                      {
                        name: '_ga_*',
                        description: 'Google Analytics - session tracking',
                        duration: '2 years',
                      },
                    ],
                  },
                },
                {
                  title: 'More Information',
                  description:
                    'For any queries in relation to our policy on cookies and your choices, please <a href="mailto:info@moyaskincare.com">contact us</a>.',
                },
              ],
            },
          },
        },
      },

      // UI configuration
      guiOptions: {
        consentModal: {
          layout: 'box inline',
          position: 'bottom center',
          equalWeightButtons: false,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      // Cookie configuration
      cookie: {
        name: 'cc_cookie',
        domain: typeof window !== 'undefined' ? window.location.hostname : '',
        path: '/',
        sameSite: 'Lax',
        expiresAfterDays: 182, // 6 months
      },

      // Auto-clear cookies if user rejects analytics
      onConsent: () => {
        const cookie = CookieConsent.getCookie()
        if (!cookie?.categories?.includes('analytics')) {
          // Clear GA cookies if analytics rejected
          if (typeof window !== 'undefined') {
            const gaCookies = document.cookie
              .split(';')
              .filter((cookie) => cookie.trim().startsWith('_ga'))
            gaCookies.forEach((cookie) => {
              const cookieName = cookie.split('=')[0].trim()
              document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
            })
          }
        }
      },

      onChange: () => {
        const cookie = CookieConsent.getCookie()
        if (!cookie?.categories?.includes('analytics')) {
          // Clear GA cookies if analytics rejected
          if (typeof window !== 'undefined') {
            const gaCookies = document.cookie
              .split(';')
              .filter((cookie) => cookie.trim().startsWith('_ga'))
            gaCookies.forEach((cookie) => {
              const cookieName = cookie.split('=')[0].trim()
              document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
            })
          }
        }
      },
    })
  }, [])

  return null // Component doesn't render anything, just initializes the library
}
