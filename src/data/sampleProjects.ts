import { Project } from '@/lib/types';

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'modern-loft-residence',
    title: 'Modern Loft Residence',
    category: 'Residential Architecture',
    description:
      'A transformative renovation of a 1920s industrial warehouse into a contemporary loft residence. The design celebrates raw materiality while introducing refined interventions that enhance spatial flow and natural light.',
    designApproach:
      'Our approach preserved the industrial heritage of exposed brick and steel beams while introducing contemporary elements - polished concrete floors, minimalist partitions, and carefully positioned glazing. The result is a dialogue between past and present, honoring the building\'s history while creating a thoroughly modern living environment.',
    materials: [
      'Polished concrete flooring',
      'Reclaimed oak millwork',
      'Steel-framed glazing systems',
      'Exposed structural steel beams',
      'Limestone accent walls',
    ],
    year: '2023',
    location: 'New York, NY',
    client: 'Private Client',
    size: '3,200 sq ft',
    featured: true,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920',
      alt: 'Modern loft interior with high ceilings and exposed brick',
      width: 1920,
      height: 1280,
      source: 'curated',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920',
        alt: 'Living area with natural light',
        width: 1920,
        height: 1280,
        source: 'curated',
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920',
        alt: 'Kitchen with minimalist design',
        width: 1920,
        height: 1280,
        source: 'curated',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920',
        alt: 'Bedroom with city views',
        width: 1920,
        height: 1280,
        source: 'curated',
      },
    ],
  },
  {
    id: '2',
    slug: 'coastal-villa',
    title: 'Coastal Villa',
    category: 'Private Residence',
    description:
      'A contemporary villa nestled into a coastal hillside, designed to frame panoramic ocean views while maintaining intimate connection with the landscape.',
    designApproach:
      'The villa is conceived as a series of interconnected pavilions that step down the hillside, each oriented to capture specific views and microclimates. Floor-to-ceiling glass dissolves boundaries between interior and exterior, while deep overhangs and carefully positioned screens provide shelter and privacy.',
    materials: [
      'Travertine stone cladding',
      'European white oak flooring',
      'Minimal-frame glass systems',
      'Brushed stainless steel details',
      'Honed Carrara marble',
    ],
    year: '2022',
    location: 'Malibu, CA',
    size: '5,800 sq ft',
    featured: true,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920',
      alt: 'Modern coastal villa with ocean views',
      width: 1920,
      height: 1280,
      source: 'curated',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920',
        alt: 'Master bathroom with ocean views',
        width: 1920,
        height: 1280,
        source: 'curated',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920',
        alt: 'Open-plan living space',
        width: 1920,
        height: 1280,
        source: 'curated',
      },
    ],
  },
  {
    id: '3',
    slug: 'urban-penthouse',
    title: 'Urban Penthouse',
    category: 'Interior Design',
    description:
      'A sophisticated penthouse transformation that maximizes light, views, and spatial quality in a constrained urban footprint.',
    designApproach:
      'We removed non-structural partitions to create an open, flowing plan that maximizes natural light penetration. Custom millwork defines functional zones without visual barriers, while a restrained material palette emphasizes spatial continuity and calm.',
    materials: [
      'Venetian plaster walls',
      'Ebonized walnut millwork',
      'Honed marble countertops',
      'Polished nickel fixtures',
      'Hand-troweled concrete',
    ],
    year: '2023',
    location: 'San Francisco, CA',
    size: '2,400 sq ft',
    featured: true,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920',
      alt: 'Minimalist penthouse interior',
      width: 1920,
      height: 1280,
      source: 'curated',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920',
        alt: 'Dining area with city views',
        width: 1920,
        height: 1280,
        source: 'curated',
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920',
        alt: 'Custom millwork details',
        width: 1920,
        height: 1280,
        source: 'curated',
      },
    ],
  },
];
