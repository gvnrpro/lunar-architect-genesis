
import { useEffect, useRef } from 'react';

const expertiseAreas = [
  {
    id: 1,
    title: 'Urban Development',
    description: 'Comprehensive planning and execution of city-scale projects that shape modern urban landscapes.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="15" width="8" height="20" stroke="currentColor" strokeWidth="2" />
        <rect x="16" y="5" width="8" height="30" stroke="currentColor" strokeWidth="2" />
        <rect x="27" y="10" width="8" height="25" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Commercial Builds',
    description: 'State-of-the-art commercial spaces designed for functionality, aesthetics, and business growth.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="30" height="25" stroke="currentColor" strokeWidth="2" />
        <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="20" x2="20" y2="35" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Infrastructure',
    description: 'Critical infrastructure projects that connect communities and power economic development.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 30L20 10L35 30" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Smart Living Projects',
    description: 'Residential developments that integrate technology and sustainable design for modern living.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5L35 15V35H5V15L20 5Z" stroke="currentColor" strokeWidth="2" />
        <rect x="15" y="25" width="10" height="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

const Expertise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
      }
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
          <h2 className="text-3xl md:text-4xl mb-6 reveal-on-scroll">Our Expertise</h2>
          <div className="h-0.5 w-16 bg-moonscape-accent mx-auto mb-8 reveal-on-scroll"></div>
          <p className="text-gray-600 dark:text-gray-300 reveal-on-scroll">
            We specialize in a diverse range of construction and development services, delivering exceptional 
            results across various sectors. Our expertise encompasses:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseAreas.map((area, index) => (
            <div 
              key={area.id}
              className="bg-white dark:bg-moonscape-navy/40 p-8 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-2 duration-300 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-moonscape-blue dark:text-moonscape-accent mb-6 group-hover:text-moonscape-accent dark:group-hover:text-white transition-colors">
                {area.icon}
              </div>
              <h3 className="text-xl mb-4">{area.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{area.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal-on-scroll">
          <a 
            href="#projects" 
            className="inline-flex items-center gap-2 border-2 border-moonscape-navy dark:border-moonscape-silver px-8 py-3 hover:bg-moonscape-navy hover:text-white dark:hover:bg-moonscape-silver dark:hover:text-moonscape-charcoal transition-colors"
          >
            View Our Projects
            <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block"></span>
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 hexagon border border-moonscape-blue/10 opacity-50"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 hexagon border border-moonscape-blue/10 opacity-30"></div>
    </section>
  );
};

export default Expertise;
