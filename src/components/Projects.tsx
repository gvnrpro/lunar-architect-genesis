
import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import ProjectGallery from './ProjectGallery';
import LottiePlayer from './LottiePlayer';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    console.log('Projects component mounted');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const revealElements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    revealElements?.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
    >
      <div className="container px-6 md:px-10">
        {/* Header with Animation */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl mb-6 font-monument">Featured Projects</h2>
              <div className="h-0.5 w-16 bg-moonscape-accent mx-auto lg:mx-0 mb-8"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                A showcase of our commitment to excellence and innovation. Explore our portfolio of remarkable projects that demonstrate our expertise in creating innovative and sustainable architectural solutions.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={200}>
            <div className="flex justify-center">
              <LottiePlayer
                src="https://assets1.lottiefiles.com/private_files/lf30_hvlzlduk.json"
                className="w-full max-w-md"
                style={{ height: '350px' }}
              />
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={400}>
          <ProjectGallery />
        </ScrollReveal>
        
        <ScrollReveal delay={600}>
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Want to see more of our work?
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-moonscape-navy text-white px-8 py-3 rounded-sm hover:bg-moonscape-blue transition-all duration-300 hover:scale-105"
            >
              View All Projects
              <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block"></span>
            </a>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-32 right-10 w-28 h-28 hexagon border border-moonscape-blue/10 opacity-25 animate-float"></div>
      <div className="absolute bottom-32 left-10 w-20 h-20 hexagon border border-moonscape-accent/10 opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
    </section>
  );
};

export default Projects;
