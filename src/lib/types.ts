export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  designApproach?: string;
  materials?: string[];
  year?: string;
  location?: string;
  client?: string;
  size?: string;
  coverImage: ImageResult;
  gallery: ImageResult[];
  floorPlans?: ImageResult[];
  featured?: boolean;
  createdAt?: string;
}

export interface ImageResult {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  source?: 'unsplash' | 'pexels' | 'curated' | 'upload';
  credit?: string;
  creditUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  projectType?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}
