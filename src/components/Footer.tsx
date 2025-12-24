'use client';

import SocialLinks from './SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-charcoal text-luxury-beige-light py-12 lg:py-16 border-t border-luxury-charcoal-light">
      <div className="container-luxury">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display mb-4 text-luxury-beige">S G Architects</h3>
            <p className="text-luxury-grey-light text-sm leading-relaxed">
              Creating spaces of exceptional quality and enduring elegance through refined
              architectural design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#projects"
                  className="text-luxury-grey-light hover:text-luxury-accent transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="text-luxury-grey-light hover:text-luxury-accent transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="text-luxury-grey-light hover:text-luxury-accent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-luxury-grey-light hover:text-luxury-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:contact@sgarchitects.com"
                  className="text-luxury-grey-light hover:text-luxury-accent transition-colors"
                >
                  contact@sgarchitects.com
                </a>
              </li>
              <li className="text-luxury-grey-light">+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-luxury-charcoal-light">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-sm text-luxury-grey-light">&copy; {currentYear} S G Architects. All rights reserved.</p>
            <SocialLinks variant="footer" size="md" />
          </div>
        </div>
      </div>
    </footer>
  );
}
