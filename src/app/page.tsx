import Link from 'next/link';
import Hero from '@/components/Hero';
import ProjectsGrid from '@/components/ProjectsGrid';
import ServicesGrid from '@/components/ServicesGrid';
import AboutSection from '@/components/AboutSection';
import ContactForm from '@/components/ContactForm';
import { SAMPLE_PROJECTS } from '@/data/sampleProjects';

export default function HomePage() {
  const featuredProjects = SAMPLE_PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <Hero />

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 lg:py-32 bg-luxury-off-white">
        <div className="container-luxury">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-h2 mb-6">Selected Works</h2>
            <p className="text-body-lg text-luxury-grey-medium max-w-2xl mx-auto">
              A curated collection of our most distinctive architectural projects
            </p>
          </div>
          <ProjectsGrid projects={featuredProjects} />
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-block px-8 py-4 border border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-white transition-all duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-luxury-beige-light">
        <div className="container-luxury">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-h2 mb-6">Our Services</h2>
            <p className="text-body-lg text-luxury-grey-medium max-w-2xl mx-auto">
              Comprehensive architectural and design solutions tailored to your vision
            </p>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-luxury-off-white">
        <div className="container-luxury">
          <AboutSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-luxury-charcoal text-luxury-off-white">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-h2 mb-6">Let&apos;s Create Together</h2>
              <p className="text-body-lg text-luxury-grey-light">
                Tell us about your project and we&apos;ll bring your vision to life
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
