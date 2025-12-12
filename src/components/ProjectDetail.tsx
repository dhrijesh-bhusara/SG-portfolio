'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWrapper from './ImageWrapper';
import { Project } from '@/lib/types';
import { fadeUp, scaleIn } from './Animations';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [project.coverImage, ...project.gallery];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') previousImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  return (
    <div className="pt-24 lg:pt-32 pb-20">
      {/* Header */}
      <div className="container-luxury mb-12 lg:mb-16">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
          <p className="text-luxury-accent uppercase tracking-widest text-sm mb-4">
            {project.category}
          </p>
          <h1 className="text-h1 mb-6">{project.title}</h1>
          <p className="text-body-lg text-luxury-grey-medium">{project.description}</p>
        </motion.div>

        {/* Project Meta */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl"
        >
          {project.year && (
            <div>
              <p className="text-luxury-grey-medium text-sm uppercase tracking-wider mb-1">Year</p>
              <p className="font-display text-lg">{project.year}</p>
            </div>
          )}
          {project.location && (
            <div>
              <p className="text-luxury-grey-medium text-sm uppercase tracking-wider mb-1">
                Location
              </p>
              <p className="font-display text-lg">{project.location}</p>
            </div>
          )}
          {project.size && (
            <div>
              <p className="text-luxury-grey-medium text-sm uppercase tracking-wider mb-1">Size</p>
              <p className="font-display text-lg">{project.size}</p>
            </div>
          )}
          {project.client && (
            <div>
              <p className="text-luxury-grey-medium text-sm uppercase tracking-wider mb-1">
                Client
              </p>
              <p className="font-display text-lg">{project.client}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Image Carousel */}
      <div className="mb-16">
        <div
          className="relative aspect-[16/10] bg-luxury-beige-light max-w-6xl mx-auto"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Project image gallery"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0"
            >
              <ImageWrapper
                src={allImages[currentImageIndex].url}
                alt={allImages[currentImageIndex].alt}
                fill
                sizes="(max-width: 1536px) 100vw, 1536px"
                className="object-cover"
                priority={currentImageIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-luxury-white/90 hover:bg-luxury-white p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-accent"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="15 18 9 12 15 6" strokeWidth="2" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-luxury-white/90 hover:bg-luxury-white p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-accent"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6" strokeWidth="2" />
                </svg>
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-luxury-black/70 text-luxury-beige-light px-4 py-2 text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail navigation */}
        {allImages.length > 1 && (
          <div className="container-luxury mt-6">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 relative overflow-hidden transition-all ${
                    index === currentImageIndex
                      ? 'ring-2 ring-luxury-accent'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <ImageWrapper
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Details */}
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl">
          {/* Design Approach */}
          {project.designApproach && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-h3 mb-6 font-display">Design Approach</h2>
              <p className="text-body text-luxury-grey leading-relaxed">
                {project.designApproach}
              </p>
            </motion.div>
          )}

          {/* Materials */}
          {project.materials && project.materials.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-h3 mb-6 font-display">Materials</h2>
              <ul className="space-y-3">
                {project.materials.map((material, index) => (
                  <li
                    key={index}
                    className="flex items-start text-body text-luxury-grey"
                  >
                    <span className="text-luxury-accent mr-3 mt-1">—</span>
                    {material}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Floor Plans */}
        {project.floorPlans && project.floorPlans.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 lg:mt-24"
          >
            <h2 className="text-h3 mb-8 font-display">Floor Plans</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.floorPlans.map((plan, index) => (
                <div key={index} className="bg-luxury-white p-4">
                  <div className="relative aspect-[4/3]">
                    <ImageWrapper
                      src={plan.url}
                      alt={plan.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
