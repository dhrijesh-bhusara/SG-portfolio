'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeUp, staggerContainer } from './Animations';

const HERO_COPY = [
  {
    headline: 'Spaces That Define Excellence',
    subhead: 'Where architectural vision meets refined luxury',
  },
  {
    headline: 'Crafting Timeless Interiors',
    subhead: 'Minimalist design with uncompromising attention to detail',
  },
  {
    headline: 'Architecture Reimagined',
    subhead: 'Elevating spaces through purposeful design and premium materiality',
  },
];

export default function Hero() {
  const copyIndex = 0;
  const currentCopy = HERO_COPY[copyIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/a1.png"
          alt="Luxury architectural interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/40 to-luxury-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-start pt-32 md:pt-40">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.h1
              variants={fadeUp}
              className="text-hero font-display font-light text-luxury-off-white mb-6 leading-tight"
            >
              {currentCopy.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-body-lg md:text-2xl text-luxury-beige-light mb-12 max-w-2xl font-light"
            >
              {currentCopy.subhead}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a
                href="/#projects"
                className="inline-block px-8 py-4 bg-luxury-accent text-luxury-black font-medium tracking-wide hover:bg-luxury-beige transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:ring-offset-2 focus:ring-offset-luxury-black"
              >
                Explore Projects
              </a>
              <a
                href="/#contact"
                className="inline-block px-8 py-4 border border-luxury-beige-light text-luxury-beige-light hover:bg-luxury-beige-light hover:text-luxury-black transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-beige-light focus:ring-offset-2 focus:ring-offset-luxury-black"
              >
                Start a Project
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-luxury-beige-light">
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-12 bg-luxury-beige-light/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
