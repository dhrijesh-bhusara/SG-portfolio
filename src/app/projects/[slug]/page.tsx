import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/ProjectDetail';
import { SAMPLE_PROJECTS } from '@/data/sampleProjects';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SAMPLE_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(props: ProjectPageProps): Promise<Metadata> {
  const params = await props.params;
  const project = SAMPLE_PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found | S G Architects',
    };
  }

  return {
    title: `${project.title} | S G Architects`,
    description: project.description,
    openGraph: {
      images: [project.coverImage.url],
    },
  };
}

export default async function ProjectPage(props: ProjectPageProps) {
  const params = await props.params;
  const project = SAMPLE_PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-luxury-off-white">
      <ProjectDetail project={project} />
    </div>
  );
}
