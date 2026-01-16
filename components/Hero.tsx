'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { BRAND_TAGLINE, BRAND_STATEMENT, CTA_SUBTEXT } from '@/lib/constants'

export default function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-moya-warm-beige">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_16x9.jpg"
          alt="Moya Rituals Products"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-moya-warm-beige/60 via-transparent to-moya-warm-beige/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <p className="text-moya-taupe font-body font-medium text-sm sm:text-base tracking-wide uppercase mb-6">
            {BRAND_STATEMENT}
          </p>

          {/* Headline */}
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-moya-charcoal mb-6 leading-tight text-balance">
            {BRAND_TAGLINE}
          </h1>

          {/* Subheadline */}
          <p className="font-body text-lg sm:text-xl md:text-2xl text-moya-charcoal/80 mb-12 max-w-2xl mx-auto text-balance">
            Discover MindSerum™ and Ritual Mist™{' '}
            <span className="inline-block">neuro-calming skincare</span> that brings calm to your skin and clarity to your mind.
          </p>

          {/* Badge Button - Primary CTA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={scrollToWaitlist}
            className="mb-3 inline-block cursor-pointer hover:scale-110 hover:drop-shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-moya-taupe focus:ring-offset-2 rounded-full"
            aria-label="20% off - Join waitlist"
          >
            <Image
              src="/images/badge_full.svg"
              alt="20% off for founding members - Join waitlist"
              width={170}
              height={170}
              className="drop-shadow-lg"
              priority
            />
          </motion.button>

          {/* Social Proof / Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-3 text-sm text-moya-charcoal/60"
          >
            {CTA_SUBTEXT}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-moya-taupe rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-moya-taupe rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
