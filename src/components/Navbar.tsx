'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-luxury-charcoal/95 backdrop-blur-sm shadow-luxury border-b border-luxury-accent/20' : 'bg-luxury-charcoal border-b border-luxury-accent/10'
      }`}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between py-2 lg:py-3">
          {/* Left: Logo & Branding */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group" 
            aria-label="S G Architects Home"
          >
            <motion.div 
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/logo.png"
                alt="S G Architects"
                width={96}
                height={96}
                className="transition-transform duration-300"
                priority
              />
            </motion.div>
            <div className="hidden sm:flex flex-col gap-1">
              <span className="text-lg font-display text-luxury-beige tracking-wider font-semibold leading-tight">
                SG Architects
              </span>
              <span className="text-xs text-luxury-grey-light tracking-wider font-light">
                Ar. Satish Gurubaxani
              </span>
            </div>
          </Link>

          {/* Right: Navigation & Info */}
          <div className="flex items-center gap-2 lg:gap-6 ml-auto">{" "}
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">{" "}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-luxury-beige-light text-base font-light tracking-wider uppercase hover:text-luxury-accent transition-colors duration-300 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-luxury-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-luxury-beige-light p-2 hover:text-luxury-accent transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-luxury-charcoal border-t border-luxury-charcoal-light"
            >
              <div className="container-luxury py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-luxury-beige-light text-xl font-light tracking-wider uppercase py-2 hover:text-luxury-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
