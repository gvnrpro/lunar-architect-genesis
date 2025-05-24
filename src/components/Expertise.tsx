
import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const expertiseAreas = [
  {
    id: 1,
    title: 'Commercial Construction',
    description: 'Large-scale commercial projects including office complexes, shopping centers, and industrial facilities.',
    icon: '🏢',
    projects: '45+',
  },
  {
    id: 2,
    title: 'Residential Development',
    description: 'Premium residential projects from luxury villas to modern apartment complexes.',
    icon: '🏠',
    projects: '60+',
  },
  {
    id: 3,
    title: 'Infrastructure Projects',
    description: 'Roads, bridges, and public infrastructure that connects communities.',
    icon: '🌉',
    projects: '25+',
  },
  {
    id: 4,
    title: 'Green Building Solutions',
    description: 'Sustainable construction practices with eco-friendly materials and energy-efficient designs.',
    icon: '🌱',
    projects: '30+',
  },
];

const Expertise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    console.log('Expertise component mounted');
    
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
      id="expertise"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl mb-6 font-monument">Our Expertise</h2>
            <div className="h-0.5 w-16 bg-moonscape-accent mx-auto mb-8"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              With over 15 years of experience, we specialize in diverse construction projects 
              that showcase our commitment to quality, innovation, and sustainable development.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseAreas.map((area, index) => (
            <ScrollReveal key={area.id} delay={index * 100} direction="up">
              <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-sm h-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-moonscape-accent transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {area.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-moonscape-accent font-medium text-sm">
                    {area.projects} Projects
                  </span>
                  <div className="w-6 h-6 hexagon bg-moonscape-accent/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xs">→</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={400}>
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Ready to discuss your next project?
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-moonscape-navy text-white px-8 py-3 rounded-sm hover:bg-moonscape-blue transition-all duration-300 hover:scale-105"
            >
              Start Your Project
              <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block"></span>
            </a>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 hexagon border border-moonscape-blue/10 opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 hexagon border border-moonscape-accent/10 opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Expertise;
