'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import { FiBarChart3, FiMapPin, FiCalendar, FiStar } from 'react-icons/fi';

interface ProjectStatsProps {
  projects: Project[];
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const categories = new Set(projects.map((p) => p.category));
    const locations = new Set(projects.map((p) => p.location));
    const featured = projects.filter((p) => p.featured).length;
    const years = new Set(projects.map((p) => p.year));

    const categoryBreakdown = Array.from(categories).map((category) => ({
      name: category,
      count: projects.filter((p) => p.category === category).length,
    }));

    return {
      totalProjects,
      uniqueCategories: categories.size,
      uniqueLocations: locations.size,
      featuredProjects: featured,
      yearRange: `${Math.min(...Array.from(years))} - ${Math.max(...Array.from(years))}`,
      categoryBreakdown,
    };
  }, [projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="mb-16 lg:mb-20">
      {/* Main Stats Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Total Projects */}
        <motion.div
          variants={itemVariants}
          className="bg-luxury-white rounded-lg p-6 lg:p-8 border border-luxury-grey-light hover:border-luxury-accent transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm uppercase tracking-wider text-luxury-grey-medium font-display">
              Total Projects
            </h3>
            <FiBarChart3 className="text-luxury-accent" size={20} />
          </div>
          <p className="text-4xl lg:text-5xl font-display text-luxury-charcoal">
            {stats.totalProjects}
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={itemVariants}
          className="bg-luxury-white rounded-lg p-6 lg:p-8 border border-luxury-grey-light hover:border-luxury-accent transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm uppercase tracking-wider text-luxury-grey-medium font-display">
              Categories
            </h3>
            <FiBarChart3 className="text-luxury-accent" size={20} />
          </div>
          <p className="text-4xl lg:text-5xl font-display text-luxury-charcoal">
            {stats.uniqueCategories}
          </p>
        </motion.div>

        {/* Locations */}
        <motion.div
          variants={itemVariants}
          className="bg-luxury-white rounded-lg p-6 lg:p-8 border border-luxury-grey-light hover:border-luxury-accent transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm uppercase tracking-wider text-luxury-grey-medium font-display">
              Locations
            </h3>
            <FiMapPin className="text-luxury-accent" size={20} />
          </div>
          <p className="text-4xl lg:text-5xl font-display text-luxury-charcoal">
            {stats.uniqueLocations}
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div
          variants={itemVariants}
          className="bg-luxury-white rounded-lg p-6 lg:p-8 border border-luxury-grey-light hover:border-luxury-accent transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm uppercase tracking-wider text-luxury-grey-medium font-display">
              Featured
            </h3>
            <FiStar className="text-luxury-accent" size={20} />
          </div>
          <p className="text-4xl lg:text-5xl font-display text-luxury-charcoal">
            {stats.featuredProjects}
          </p>
        </motion.div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        className="bg-luxury-white rounded-lg p-8 border border-luxury-grey-light"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-6">
          <FiBarChart3 className="text-luxury-accent" size={24} />
          <h3 className="text-xl font-display">Projects by Category</h3>
        </div>
        <div className="space-y-4">
          {stats.categoryBreakdown.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-luxury-charcoal">
                  {category.name}
                </span>
                <span className="text-sm font-semibold text-luxury-accent">
                  {category.count} project{category.count !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="w-full bg-luxury-beige-light rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-luxury-accent h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(category.count / stats.totalProjects) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
