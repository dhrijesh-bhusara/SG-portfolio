'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';

export default function ArchitectInfo() {
  const [showInfo, setShowInfo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        onClick={() => setShowInfo(!showInfo)}
        className="flex items-center gap-2 px-3 py-2 text-luxury-accent hover:text-luxury-beige transition-colors text-sm"
        title="About the Architect"
      >
        <FiInfo size={18} />
        <span className="hidden sm:inline">Architect</span>
      </button>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            className="absolute right-0 top-full mt-2 bg-luxury-charcoal border border-luxury-accent/50 rounded-lg shadow-luxury p-4 w-80 text-sm z-50"
          >
            <div className="space-y-3">
              <div>
                <p className="text-luxury-accent font-semibold mb-1">Ar. Satish Gurubaxani</p>
                <p className="text-luxury-grey-light text-xs uppercase tracking-wide">
                  Architect & Design Visionary
                </p>
              </div>
              
              <p className="text-luxury-grey-light leading-relaxed text-xs">
                With extensive expertise in luxury residential architecture and contemporary interior design, 
                Ar. Satish Gurubaxani specializes in creating sophisticated spaces that blend innovative design 
                with timeless elegance.
              </p>

              <div className="space-y-2 pt-2 border-t border-luxury-accent/30">
                <div>
                  <p className="text-luxury-accent text-xs font-semibold mb-1">SPECIALIZATIONS</p>
                  <p className="text-luxury-grey-light text-xs">
                    Luxury Residential • Commercial Design • Interior Architecture • Heritage Restoration
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-luxury-accent/30">
                <p className="text-luxury-accent text-xs font-semibold">PHILOSOPHY</p>
                <p className="text-luxury-grey-light text-xs italic">
                  "Creating spaces of exceptional quality and enduring elegance through refined architectural design."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
