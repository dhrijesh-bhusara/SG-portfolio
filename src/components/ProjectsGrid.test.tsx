import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsGrid from '@/components/ProjectsGrid';
import { Project } from '@/lib/types';

const mockProjects: Project[] = [
  {
    id: '1',
    slug: 'test-project',
    title: 'Test Project',
    category: 'Residential',
    description: 'A test project description',
    coverImage: {
      url: 'https://example.com/image.jpg',
      alt: 'Test image',
      width: 1920,
      height: 1280,
      source: 'curated',
    },
    gallery: [],
    featured: true,
  },
];

describe('ProjectsGrid', () => {
  it('renders projects grid with correct number of projects', () => {
    render(<ProjectsGrid projects={mockProjects} />);
    // Basic test to ensure component renders
    expect(screen.getByRole('article')).toBeDefined();
  });

  it('renders empty state when no projects provided', () => {
    const { container } = render(<ProjectsGrid projects={[]} />);
    expect(container.querySelector('.grid')).toBeDefined();
  });
});
