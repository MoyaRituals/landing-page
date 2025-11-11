import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
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

          {/* CTA Button */}
          <a
            href="#waitlist"
            className="px-6 py-2.5 bg-moya-taupe text-white font-body font-medium rounded-full hover:bg-moya-taupe/90 transition-colors duration-200"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </header>
  )
}
