import { ImageResult } from './types';

// In-memory cache for image results (5 minutes)
const imageCache = new Map<string, { data: ImageResult[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Curated fallback images for luxury interior architecture
const CURATED_IMAGES: ImageResult[] = [
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    alt: 'Minimalist luxury interior with high ceilings',
    width: 1920,
    height: 1280,
    source: 'curated',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
    alt: 'Modern architectural space with natural light',
    width: 1920,
    height: 1280,
    source: 'curated',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
    alt: 'Contemporary interior design with geometric elements',
    width: 1920,
    height: 1280,
    source: 'curated',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    alt: 'Luxury residential architecture',
    width: 1920,
    height: 1280,
    source: 'curated',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
    alt: 'Elegant minimalist living space',
    width: 1920,
    height: 1280,
    source: 'curated',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f',
    alt: 'Modern bathroom with premium finishes',
    width: 1920,
    height: 1280,
    source: 'curated',
    credit: 'Unsplash',
  },
];

interface FetchImageOptions {
  query: string;
  count?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
}

/**
 * Fetches luxury interior/architecture images from Unsplash, Pexels, or fallback curated list.
 * UNSPLASH_ACCESS_KEY and PEXELS_API_KEY env vars enable live fetching.
 * 
 * NOTE: Pinterest scraping is against their Terms of Service and is NOT implemented.
 * For Pinterest images, manually download and store them in your project or CDN.
 */
export async function fetchLuxuryInteriorImages(
  options: FetchImageOptions
): Promise<ImageResult[]> {
  const { query, count = 6, orientation = 'landscape' } = options;
  const cacheKey = `${query}-${count}-${orientation}`;

  // Check cache first
  const cached = imageCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Try Unsplash first
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  if (unsplashKey) {
    try {
      const images = await fetchFromUnsplash(query, count, orientation, unsplashKey);
      if (images.length > 0) {
        imageCache.set(cacheKey, { data: images, timestamp: Date.now() });
        return images;
      }
    } catch (error) {
      console.warn('Unsplash fetch failed:', error);
    }
  }

  // Fallback to Pexels
  const pexelsKey = process.env.PEXELS_API_KEY;
  if (pexelsKey) {
    try {
      const images = await fetchFromPexels(query, count, pexelsKey);
      if (images.length > 0) {
        imageCache.set(cacheKey, { data: images, timestamp: Date.now() });
        return images;
      }
    } catch (error) {
      console.warn('Pexels fetch failed:', error);
    }
  }

  // Final fallback: curated list
  const fallbackImages = CURATED_IMAGES.slice(0, count);
  imageCache.set(cacheKey, { data: fallbackImages, timestamp: Date.now() });
  return fallbackImages;
}

async function fetchFromUnsplash(
  query: string,
  count: number,
  orientation: string,
  apiKey: string
): Promise<ImageResult[]> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=${count}&orientation=${orientation}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results.map((photo: any) => ({
    url: photo.urls.regular,
    alt: photo.alt_description || photo.description || 'Luxury interior architecture',
    width: photo.width,
    height: photo.height,
    blurDataURL: photo.blur_hash,
    source: 'unsplash' as const,
    credit: photo.user.name,
    creditUrl: photo.user.links.html,
  }));
}

async function fetchFromPexels(
  query: string,
  count: number,
  apiKey: string
): Promise<ImageResult[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=${count}`;

  const response = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.statusText}`);
  }

  const data = await response.json();

  return data.photos.map((photo: any) => ({
    url: photo.src.large2x,
    alt: photo.alt || 'Luxury interior architecture',
    width: photo.width,
    height: photo.height,
    source: 'pexels' as const,
    credit: photo.photographer,
    creditUrl: photo.photographer_url,
  }));
}
