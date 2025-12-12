'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from './Animations';

export default function AboutSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Text Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={fadeUp}
          className="text-luxury-accent uppercase tracking-widest text-sm mb-4"
        >
          About Us
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-h2 mb-6 font-display">
          Refined Spaces, Timeless Design
        </motion.h2>
        <motion.p variants={fadeUp} className="text-body-lg text-luxury-grey-medium mb-6">
          S G Architects is a distinguished architecture and interior design studio specializing in
          creating spaces of exceptional quality and enduring elegance.
        </motion.p>
        <motion.p variants={fadeUp} className="text-body text-luxury-grey mb-6">
          Our approach is rooted in a deep understanding of materiality, proportion, and light.
          We believe that great architecture emerges from the careful orchestration of these
          elements, resulting in environments that elevate daily life.
        </motion.p>
        <motion.p variants={fadeUp} className="text-body text-luxury-grey">
          With a commitment to craft and attention to detail, we collaborate closely with our
          clients to realize spaces that reflect their vision while transcending trends.
        </motion.p>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative aspect-[4/5] bg-luxury-beige-light"
      >
        <div className="absolute inset-0 flex items-center justify-center text-luxury-grey-light">
          {/* Placeholder - would be replaced with actual image */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            stroke="currentColor"
            className="opacity-30"
          >
            <rect x="20" y="20" width="80" height="80" strokeWidth="1" />
            <rect x="30" y="30" width="60" height="60" strokeWidth="1" />
            <line x1="60" y1="30" x2="60" y2="90" strokeWidth="1" />
            <line x1="30" y1="60" x2="90" y2="60" strokeWidth="1" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
