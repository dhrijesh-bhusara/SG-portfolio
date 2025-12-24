'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import { FiX, FiSearch } from 'react-icons/fi';

interface ProjectFilterProps {
  projects: Project[];
  onFiltered: (filtered: Project[]) => void;
}

export default function ProjectFilter({ projects, onFiltered }: ProjectFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Extract unique values
  const categories = useMemo(() => [...new Set(projects.map((p) => p.category))], [projects]);
  const years = useMemo(() => [...new Set(projects.map((p) => p.year))].sort().reverse(), [projects]);
  const locations = useMemo(() => [...new Set(projects.map((p) => p.location))], [projects]);

  // Filter logic
  useMemo(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Year filter
    if (selectedYears.length > 0) {
      filtered = filtered.filter((p) => selectedYears.includes(p.year));
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((p) => selectedLocations.includes(p.location));
    }

    onFiltered(filtered);
  }, [searchTerm, selectedCategories, selectedYears, selectedLocations, projects, onFiltered]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedYears([]);
    setSelectedLocations([]);
  };

  const hasActiveFilters =
    searchTerm || selectedCategories.length > 0 || selectedYears.length > 0 || selectedLocations.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 lg:mb-16 space-y-6"
    >
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-grey-medium" />
        <input
          type="text"
          placeholder="Search projects by name, description, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-luxury-white border border-luxury-grey-light rounded text-luxury-charcoal placeholder-luxury-grey-medium focus:outline-none focus:ring-2 focus:ring-luxury-accent"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-display uppercase tracking-wider mb-3 text-luxury-charcoal">
            Category
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 text-sm rounded border transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-luxury-accent text-luxury-white border-luxury-accent'
                    : 'bg-luxury-white text-luxury-charcoal border-luxury-grey-light hover:border-luxury-accent'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Years */}
        <div>
          <h4 className="text-sm font-display uppercase tracking-wider mb-3 text-luxury-charcoal">
            Year
          </h4>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <motion.button
                key={year}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleYear(year)}
                className={`px-4 py-2 text-sm rounded border transition-all ${
                  selectedYears.includes(year)
                    ? 'bg-luxury-accent text-luxury-white border-luxury-accent'
                    : 'bg-luxury-white text-luxury-charcoal border-luxury-grey-light hover:border-luxury-accent'
                }`}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-sm font-display uppercase tracking-wider mb-3 text-luxury-charcoal">
            Location
          </h4>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <motion.button
                key={location}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleLocation(location)}
                className={`px-4 py-2 text-sm rounded border transition-all ${
                  selectedLocations.includes(location)
                    ? 'bg-luxury-accent text-luxury-white border-luxury-accent'
                    : 'bg-luxury-white text-luxury-charcoal border-luxury-grey-light hover:border-luxury-accent'
                }`}
              >
                {location}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={clearAllFilters}
          className="flex items-center gap-2 px-4 py-2 bg-luxury-charcoal text-luxury-white text-sm hover:bg-luxury-charcoal-light transition-colors rounded"
        >
          <FiX size={16} />
          Clear All Filters
        </motion.button>
      )}
    </motion.div>
  );
}
