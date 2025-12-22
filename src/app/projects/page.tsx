import { Metadata } from 'next';
import ProjectsGrid from '@/components/ProjectsGrid';
import { SAMPLE_PROJECTS } from '@/data/sampleProjects';

export const metadata: Metadata = {
  title: 'Projects | S G Architects',
  description: 'Explore our portfolio of luxury interior architecture and design projects',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-luxury-off-white relative">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url(/bg2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative z-10">
        <div className="container-luxury">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="text-h1 mb-6">Our Projects</h1>
            <p className="text-body-lg text-luxury-grey-medium max-w-3xl mx-auto">
              Each project is a unique expression of spatial harmony, materiality, and refined
              aesthetics. Explore our portfolio of distinguished architectural works.
            </p>
          </div>
          <ProjectsGrid projects={SAMPLE_PROJECTS} />
        </div>
      </section>
    </div>
  );
}
