'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { BRAND_TAGLINE, BRAND_STATEMENT, CTA_VARIANTS, CTA_SUBTEXT } from '@/lib/constants'
import CTAButton from './CTAButton'
import { useABTestVariant } from '@/hooks/useABTestVariant'

export default function Hero() {
  const { variant, isLoaded } = useABTestVariant()

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Don't render CTA until variant is loaded to prevent flash
  if (!isLoaded) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-moya-warm-beige">
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="min-h-[400px]" />
        </div>
      </section>
    )
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CTAButton
              variant={variant}
              text={CTA_VARIANTS[variant]}
              onClick={scrollToWaitlist}
              size="lg"
            />
          </motion.div>

          {/* Social Proof / Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-sm text-moya-charcoal/60"
          >
            {CTA_SUBTEXT[variant]}
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
