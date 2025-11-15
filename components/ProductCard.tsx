import Image from 'next/image'
import type { Product } from '@/lib/constants'

interface ProductCardProps {
  product: Product
  imageSrc: string
  imagePosition?: string
}

export default function ProductCard({ product, imageSrc, imagePosition = 'object-[center_15%]' }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-[40rem] bg-moya-warm-beige">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className={`object-cover ${imagePosition}`}
        />
      </div>

      {/* Product Info */}
      <div className="p-8">
        <h3 className="font-heading text-2xl font-bold text-moya-charcoal mb-2">
          {product.name}
        </h3>
        <p className="font-body text-sm text-moya-taupe font-medium mb-4 uppercase tracking-wide">
          {product.tagline}
        </p>
        <p className="font-body text-base text-moya-charcoal/80 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Benefits List */}
        <ul className="space-y-2">
          {product.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-moya-taupe mr-2 mt-1">✓</span>
              <span className="font-body text-sm text-moya-charcoal/70">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
