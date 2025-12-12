'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ImageWrapper from './ImageWrapper';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <motion.article
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative overflow-hidden bg-luxury-white shadow-luxury hover:shadow-luxury-lg transition-shadow duration-400"
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-luxury-beige-light">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full"
          >
            <ImageWrapper
              src={project.coverImage.url}
              alt={project.coverImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-luxury-black/60 flex items-center justify-center"
          >
            <div className="text-center text-luxury-off-white px-6">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-2xl font-display mb-2"
              >
                {project.title}
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-luxury-beige-light text-sm uppercase tracking-wider mb-4"
              >
                {project.category}
              </motion.p>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-block px-6 py-2 border border-luxury-accent text-luxury-accent text-sm tracking-wide"
              >
                View Project
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Info below image (visible on mobile, hidden on desktop with overlay) */}
        <div className="p-6 lg:hidden">
          <h3 className="text-xl font-display mb-1">{project.title}</h3>
          <p className="text-luxury-grey-medium text-sm uppercase tracking-wider">
            {project.category}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
