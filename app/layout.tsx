import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from './GoogleAnalytics'
import CookieConsent from '@/components/CookieConsent'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://moyaskincare.com'),
  title: 'MOYA RITUALS | Reset Your Nervous System',
  description: 'The skincare ritual to reset your nervous system. Discover MindSerum™ and Ritual Mist™, neuro-calming skincare that brings calm to your skin and clarity to your mind.',
  keywords: ['skincare', 'wellness', 'stress relief', 'nervous system', 'self-care rituals', 'neuro-calming', 'mindfulness'],
  authors: [{ name: 'Moya Rituals' }],
  openGraph: {
    title: 'MOYA RITUALS | Reset Your Nervous System',
    description: 'The skincare ritual to reset your nervous system. Join the waitlist for MindSerum™ and Ritual Mist™.',
    url: 'https://moyaskincare.com',
    siteName: 'Moya Rituals',
    images: [
      {
        url: '/images/social_1x1.jpg',
        width: 1080,
        height: 1080,
        alt: 'Moya Rituals - MindSerum and Ritual Mist',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOYA RITUALS | Reset Your Nervous System',
    description: 'The skincare ritual to reset your nervous system.',
    images: ['/images/social_1x1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes after deployment
    // google: 'your-google-site-verification',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <CookieConsent />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
