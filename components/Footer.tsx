import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-moya-charcoal text-moya-warm-beige py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-3">moya RITUALS</h3>
            <p className="text-sm text-moya-stone">
              Calm Skin. Clear Head.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-heading font-semibold mb-3">Contact</h4>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-moya-stone hover:text-moya-warm-beige transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-heading font-semibold mb-3">Follow Us</h4>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-moya-stone hover:text-moya-warm-beige transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-moya-stone/20 text-center">
          <p className="text-sm text-moya-stone">
            © {currentYear} Moya Rituals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
