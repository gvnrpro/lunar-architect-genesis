
import ScrollReveal from './ScrollReveal';
import ProjectGallery from './ProjectGallery';
import { Building, Target, Award } from 'lucide-react';

const Projects = () => {
  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
      role="region"
      aria-labelledby="projects-heading"
    >
      <div className="container px-6 md:px-10">
        {/* Header with Visual */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <ScrollReveal>
              <h2 id="projects-heading" className="text-3xl md:text-4xl mb-6 font-monument">Featured Projects</h2>
              <div className="h-0.5 w-16 bg-moonscape-accent mx-auto lg:mx-0 mb-8"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Discover our portfolio of remarkable projects that showcase our commitment to excellence and innovation. From luxury residential complexes to cutting-edge commercial developments, each project demonstrates our expertise in creating sustainable architectural solutions.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={200}>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-80 flex items-center justify-center">
                {/* Project Achievement Icons */}
                <div className="grid grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <div className="bg-moonscape-navy dark:bg-moonscape-accent/20 rounded-full p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center shadow-lg">
                      <Building size={32} className="text-moonscape-accent" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">50+ Projects</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-moonscape-blue dark:bg-moonscape-blue/20 rounded-full p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center shadow-xl transform scale-110">
                      <Target size={40} className="text-white dark:text-moonscape-accent" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">100% Quality</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-moonscape-accent dark:bg-moonscape-accent/20 rounded-full p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center shadow-lg">
                      <Award size={32} className="text-white dark:text-moonscape-accent" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Award Winning</p>
                  </div>
                </div>
                
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-moonscape-blue/5 to-moonscape-accent/5 rounded-full blur-2xl"></div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={400}>
          <ProjectGallery />
        </ScrollReveal>
        
        <ScrollReveal delay={600}>
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Ready to start your next project?
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-moonscape-navy text-white px-8 py-3 rounded-sm hover:bg-moonscape-blue transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-moonscape-accent focus:ring-offset-2"
              aria-label="Contact us to discuss your project"
            >
              Get Started Today
              <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block"></span>
            </a>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-32 right-10 w-28 h-28 hexagon border border-moonscape-blue/10 opacity-25 animate-float" aria-hidden="true"></div>
      <div className="absolute bottom-32 left-10 w-20 h-20 hexagon border border-moonscape-accent/10 opacity-30 animate-float" style={{ animationDelay: '1.5s' }} aria-hidden="true"></div>
    </section>
  );
};

export default Projects;
