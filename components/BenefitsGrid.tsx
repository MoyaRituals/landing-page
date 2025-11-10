'use client'

import { motion } from 'framer-motion'
import { BENEFITS } from '@/lib/constants'

export default function BenefitsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-nova-charcoal mb-4 text-balance">
            Why Moya Rituals?
          </h2>
          <p className="font-body text-lg text-nova-charcoal/70 max-w-2xl mx-auto">
            Skincare that honors both your skin and your nervous system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="text-5xl mb-6">{benefit.icon}</div>

              {/* Title */}
              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-nova-charcoal mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="font-body text-base text-nova-charcoal/70 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
