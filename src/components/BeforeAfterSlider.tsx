'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeAlt: string;
  afterAlt: string;
  width?: number;
  height?: number;
}

export default function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeAlt,
  afterAlt,
  width = 1920,
  height = 1280,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPosition = (x / rect.width) * 100;

    if (newPosition >= 0 && newPosition <= 100) {
      setSliderPosition(newPosition);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const newPosition = (x / rect.width) * 100;

    if (newPosition >= 0 && newPosition <= 100) {
      setSliderPosition(newPosition);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden bg-luxury-beige-light rounded-lg cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterUrl}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={beforeUrl}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
      </div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-luxury-accent cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        animate={{ x: 0 }}
      >
        {/* Handle Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-luxury-accent text-luxury-white rounded-full p-3 shadow-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="8 5 3 10 8 15" />
            <polyline points="12 5 17 10 12 15" />
          </svg>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-semibold pointer-events-none">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-semibold pointer-events-none">
        AFTER
      </div>
    </div>
  );
}
