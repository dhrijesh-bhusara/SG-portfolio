'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
        isScrolled ? 'bg-luxury-charcoal/95 backdrop-blur-sm shadow-luxury' : 'bg-luxury-charcoal'
      }`}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="LuxArch Home">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              className="transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              <rect x="8" y="8" width="32" height="32" stroke="#E8E4DF" strokeWidth="1" />
              <rect x="14" y="14" width="20" height="20" stroke="#C9B896" strokeWidth="1" />
              <line x1="24" y1="20" x2="24" y2="28" stroke="#E8E4DF" strokeWidth="1" />
              <line x1="20" y1="24" x2="28" y2="24" stroke="#E8E4DF" strokeWidth="1" />
            </svg>
            <span className="ml-3 text-xl font-display text-luxury-beige tracking-wider">
              LuxArch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-luxury-beige-light text-sm font-light tracking-wider uppercase group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-luxury-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-luxury-beige-light p-2 focus:outline-none focus:ring-2 focus:ring-luxury-accent"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" />
                  <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" strokeWidth="2" />
                  <line x1="4" y1="16" x2="20" y2="16" strokeWidth="2" />
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
                  className="block text-luxury-beige-light text-lg font-light tracking-wider uppercase py-2 hover:text-luxury-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
