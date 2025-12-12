'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from './Animations';

const services = [
  {
    id: 'interior-design',
    title: 'Interior Design',
    description:
      'Curated spatial experiences that harmonize function with refined aesthetic sensibilities',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <rect x="8" y="12" width="32" height="24" strokeWidth="1.5" />
        <line x1="8" y1="24" x2="40" y2="24" strokeWidth="1.5" />
        <line x1="24" y1="12" x2="24" y2="36" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description:
      'Comprehensive architectural services from concept development through construction oversight',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <path d="M24 8 L40 20 L40 40 L8 40 L8 20 Z" strokeWidth="1.5" />
        <line x1="24" y1="8" x2="24" y2="40" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'concept-planning',
    title: 'Concept Planning',
    description:
      'Strategic design thinking and spatial programming tailored to your unique vision',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <circle cx="24" cy="24" r="16" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="8" strokeWidth="1.5" />
        <line x1="24" y1="8" x2="24" y2="16" strokeWidth="1.5" />
        <line x1="24" y1="32" x2="24" y2="40" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: '3d-visualization',
    title: '3D Visualization',
    description:
      'Photorealistic renderings and immersive visualizations to bring concepts to life',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <path d="M24 8 L40 16 L40 32 L24 40 L8 32 L8 16 Z" strokeWidth="1.5" />
        <path d="M24 8 L24 40" strokeWidth="1.5" />
        <path d="M8 16 L24 24 L40 16" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'renovation',
    title: 'Renovation',
    description:
      'Transformative redesign of existing spaces with respect for original architecture',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor">
        <rect x="12" y="12" width="24" height="24" strokeWidth="1.5" />
        <path d="M16 12 L16 36 M32 12 L32 36" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="4" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function ServicesGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
    >
      {services.map((service) => (
        <motion.article
          key={service.id}
          variants={fadeUp}
          className="group p-8 lg:p-10 bg-luxury-white hover:bg-luxury-beige-light transition-colors duration-400"
        >
          <div className="text-luxury-charcoal group-hover:text-luxury-accent transition-colors duration-400 mb-6">
            {service.icon}
          </div>
          <h3 className="text-2xl font-display mb-4">{service.title}</h3>
          <p className="text-luxury-grey-medium leading-relaxed">{service.description}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}
