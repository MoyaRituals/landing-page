'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FounderStory() {
  return (
    <section className="py-20 bg-moya-warm-beige">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="flex justify-center lg:justify-end">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl relative w-full max-w-md">
                <Image
                  src="/images/Bridget.png"
                  alt="Bridget, Founder of Moya Rituals"
                  fill
                  className="object-cover object-top"
                />
                {/* Founder Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-moya-charcoal/80 to-transparent p-6">
                  <p className="text-white font-heading text-2xl">Bridget</p>
                  <p className="text-white/70 font-body text-sm">Founder</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-moya-charcoal mb-6 text-balance">
                From Stress to Serenity
              </h2>
              <div className="space-y-4 font-body text-base text-moya-charcoal/80 leading-relaxed">
                <p>
                  Moya Rituals was born from a simple truth: our skin and nervous system are deeply connected.
                </p>
                <p>
                  After years of struggling with stress-related skin issues, I discovered that the most effective skincare wasn't just about what I put on my skin, it was about how I felt when I did it.
                </p>
                <p>
                  That's why every Moya Rituals formula combines neuro-calming botanicals with ritual-setting aromatics. It's not just skincare, it's a daily practice of coming home to yourself.
                </p>
                <p className="text-moya-taupe font-medium">
                  - Bridget, Founder
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
