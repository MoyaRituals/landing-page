import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-nova-charcoal text-nova-warm-beige py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-3">NOVA RITUALS</h3>
            <p className="text-sm text-nova-stone">
              Calm Skin. Clear Head.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-heading font-semibold mb-3">Contact</h4>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-nova-stone hover:text-nova-warm-beige transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-heading font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-nova-stone hover:text-nova-warm-beige transition-colors"
              >
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-nova-stone hover:text-nova-warm-beige transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-nova-stone/20 text-center">
          <p className="text-sm text-nova-stone">
            © {currentYear} Moya Rituals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
