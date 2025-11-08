'use client'

import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/constants'
import ProductCard from './ProductCard'

export default function ProductShowcase() {
  return (
    <section className="py-20 bg-nova-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-nova-charcoal mb-4 text-balance">
            The Reset Duo
          </h2>
          <p className="font-body text-lg text-nova-charcoal/70 max-w-2xl mx-auto">
            Two products. Three minutes. Complete nervous system reset.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProductCard
              product={PRODUCTS.ritualMist}
              imageSrc="/images/social_4x5.jpg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ProductCard
              product={PRODUCTS.mindSerum}
              imageSrc="/images/social_1x1.jpg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
