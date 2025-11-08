'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { submitToBrevo, trackConversion } from '@/lib/brevo'
import { trackFormSubmit } from '@/lib/analytics'
import { CTA_VARIANTS, type CTAVariant } from '@/lib/constants'
import CTAButton from './CTAButton'

export default function EmailSignupForm() {
  const [variant, setVariant] = useState<CTAVariant>('A')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Assign A/B test variant on mount (client-side only)
  useEffect(() => {
    setVariant(Math.random() < 0.5 ? 'A' : 'B')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await submitToBrevo({
        email,
        name,
        ctaVariant: variant,
      })

      // Track successful conversion
      trackConversion(variant)
      trackFormSubmit(variant, true)

      setSuccess(true)
      setEmail('')
      setName('')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(errorMessage)
      trackFormSubmit(variant, false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="py-20 bg-gradient-to-b from-white to-nova-warm-beige">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {!success ? (
            <>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-nova-charcoal mb-4 text-balance">
                {variant === 'A' ? 'Join the Waitlist' : 'Preorder Your Ritual System'}
              </h2>
              <p className="font-body text-lg text-nova-charcoal/70 mb-8">
                {variant === 'A'
                  ? 'Be the first to know when we launch. Plus, get exclusive early access pricing.'
                  : 'Reserve your Reset Duo now and enjoy exclusive preorder pricing.'}
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="w-full px-6 py-3 rounded-full border-2 border-nova-stone/30 focus:border-nova-taupe focus:outline-none font-body text-base transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full px-6 py-3 rounded-full border-2 border-nova-stone/30 focus:border-nova-taupe focus:outline-none font-body text-base transition-colors"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 font-body text-sm"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`
                        w-full px-8 py-4 text-lg
                        bg-nova-taupe text-white font-body font-semibold rounded-full
                        hover:bg-nova-taupe/90 hover:scale-105
                        transition-all duration-200
                        shadow-lg hover:shadow-xl
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                      `}
                    >
                      {loading ? 'Submitting...' : CTA_VARIANTS[variant]}
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-xs text-nova-charcoal/50 font-body">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <div className="w-16 h-16 bg-nova-taupe/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-nova-taupe"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-3xl font-bold text-nova-charcoal mb-4">
                You're on the list!
              </h3>
              <p className="font-body text-lg text-nova-charcoal/70 mb-8">
                We'll be in touch soon with exclusive early access details.
              </p>
              <p className="font-body text-base text-nova-charcoal/60">
                Check your email for a confirmation message.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
