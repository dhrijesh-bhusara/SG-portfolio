'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWrapperProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  blurDataURL?: string;
}

export default function ImageWrapper({
  src,
  alt,
  width,
  height,
  fill,
  className = '',
  priority = false,
  sizes,
  blurDataURL,
}: ImageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width: width || 1920, height: height || 1280 })}
        className={`transition-all duration-700 ${
          isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        sizes={sizes}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
