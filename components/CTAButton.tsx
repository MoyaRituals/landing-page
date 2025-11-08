'use client'

import { trackCTAClick } from '@/lib/analytics'
import type { CTAVariant } from '@/lib/constants'

interface CTAButtonProps {
  variant: CTAVariant
  text: string
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function CTAButton({
  variant,
  text,
  onClick,
  className = '',
  size = 'md'
}: CTAButtonProps) {
  const handleClick = () => {
    trackCTAClick(variant)
    onClick?.()
  }

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        bg-nova-taupe text-white font-body font-semibold rounded-full
        hover:bg-nova-taupe/90 hover:scale-105
        transition-all duration-200
        shadow-lg hover:shadow-xl
        ${className}
      `}
    >
      {text}
    </button>
  )
}
