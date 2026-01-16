'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CTA_TEXT } from '@/lib/constants'
import { trackCTAClick } from '@/lib/analytics'

export default function Header() {
  const handleCTAClick = () => {
    trackCTAClick('header')
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

          {/* Right side: Badge + CTA Button */}
          <motion.a
            href="#waitlist"
            onClick={handleCTAClick}
            whileTap={{
              scale: 0.9,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className="relative inline-flex items-center gap-3 px-6 pr-9 py-2.5 bg-moya-taupe text-white font-body font-medium rounded-full hover:bg-moya-taupe/90 transition-all duration-500"
          >
            {CTA_TEXT}

            {/* 20% Badge - Part of button */}
            <div className="absolute -top-1 -right-1">
              <Image
                src="/images/badge_simple.svg"
                alt="20% off"
                width={50}
                height={50}
                className="w-10 h-10 drop-shadow-lg rotate-12"
              />
            </div>
          </motion.a>
        </div>
      </div>
    </header>
  )
}
