'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Project } from '@/lib/types';
import { staggerContainer, fadeUp } from './Animations';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={fadeUp}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
