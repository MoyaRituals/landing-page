'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useABTestVariant } from '@/hooks/useABTestVariant'
import { CTA_VARIANTS } from '@/lib/constants'
import { trackCTAClick } from '@/lib/analytics'

export default function Header() {
  const { variant, isLoaded } = useABTestVariant()

  const handleCTAClick = () => {
    if (isLoaded) {
      trackCTAClick(variant, 'header')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-moya-warm-beige/95 backdrop-blur-sm border-b border-moya-stone/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo_primary.png"
              alt="Moya Rituals"
              width={180}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* CTA Button */}
          <a
            href="#waitlist"
            onClick={handleCTAClick}
            className={`px-6 py-2.5 bg-moya-taupe text-white font-body font-medium rounded-full hover:bg-moya-taupe/90 transition-all duration-500 ${!isLoaded ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
          >
            {isLoaded ? CTA_VARIANTS[variant] : ''}
          </a>
        </div>
      </div>
    </header>
  )
}
