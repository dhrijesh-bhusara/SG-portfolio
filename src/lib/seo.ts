import { SEOMetadata } from './types';

const SITE_NAME = 'S G Architects';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sgarchitects.com';
const DEFAULT_OG_IMAGE = '/og-image.jpg';

export function buildMetaTags(metadata: SEOMetadata) {
  const {
    title,
    description,
    keywords = [],
    ogImage = DEFAULT_OG_IMAGE,
    canonical,
    noindex = false,
  } = metadata;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || SITE_URL;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    ...(noindex && { robots: 'noindex, nofollow' }),
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export function buildProjectJSONLD(project: {
  title: string;
  description: string;
  coverImage: { url: string };
  year?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.coverImage.url,
    ...(project.year && { dateCreated: project.year }),
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

export function buildOrganizationJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Luxury interior architecture and design studio',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@luxarch.com',
    },
  };
}
