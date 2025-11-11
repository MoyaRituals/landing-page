'use client'

import { motion } from 'framer-motion'
import { RITUAL_STEPS } from '@/lib/constants'

export default function RitualSteps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-moya-charcoal mb-4 text-balance">
            Your 3-Minute Ritual
          </h2>
          <p className="font-body text-lg text-moya-charcoal/70">
            Simple steps to reset your nervous system
          </p>
        </motion.div>

        <div className="space-y-12">
          {RITUAL_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-start gap-6"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-moya-taupe/10 flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-moya-taupe">
                    {step.step}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-2">
                <h3 className="font-heading text-2xl font-semibold text-moya-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-base text-moya-charcoal/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
