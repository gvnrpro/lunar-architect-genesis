
import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    id: 1,
    title: 'Nexus Tech Hub',
    category: 'Commercial',
    description: 'A cutting-edge technology campus with smart office spaces and collaborative environments.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 2,
    title: 'Evergreen Residences',
    category: 'Residential',
    description: 'Sustainable luxury apartments with integrated smart home systems and green spaces.',
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 3,
    title: 'Riverside Bridge Complex',
    category: 'Infrastructure',
    description: 'A multi-functional bridge combining transportation, commercial spaces, and public recreation areas.',
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 4,
    title: 'Metro Central Plaza',
    category: 'Urban Development',
    description: 'An integrated urban development project featuring retail, office, and public transportation hub.',
    image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&h=500&q=80',
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
    >
      <div className="container px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 reveal-on-scroll">Featured Projects</h2>
          <div className="h-0.5 w-16 bg-moonscape-accent mx-auto mb-8 reveal-on-scroll"></div>
          <p className="text-gray-600 dark:text-gray-300 reveal-on-scroll">
            Discover our portfolio of landmark projects that showcase our commitment to excellence 
            and innovation in construction and development.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] overflow-hidden reveal-on-scroll">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === activeProject 
                    ? 'opacity-100 translate-x-0' 
                    : index < activeProject 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                  <span className="text-moonscape-accent text-sm">{project.category}</span>
                  <h3 className="text-2xl text-white mb-2">{project.title}</h3>
                </div>
              </div>
            ))}
            
            {/* Blueprint overlay */}
            <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>
            
            {/* Navigation dots */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeProject ? 'bg-moonscape-accent' : 'bg-white/50'
                  }`}
                  aria-label={`View project ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
          
          <div>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-500 ${
                  index === activeProject ? 'opacity-100' : 'opacity-0 absolute'
                } reveal-on-scroll`}
                style={{ zIndex: index === activeProject ? 10 : 0 }}
              >
                <span className="text-moonscape-accent text-sm">{project.category}</span>
                <h3 className="text-2xl md:text-3xl mb-4">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white dark:bg-moonscape-navy/40 p-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Location</span>
                    <p className="font-medium">Kerala, India</p>
                  </div>
                  <div className="bg-white dark:bg-moonscape-navy/40 p-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Project Area</span>
                    <p className="font-medium">12,500 sq.m</p>
                  </div>
                  <div className="bg-white dark:bg-moonscape-navy/40 p-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Completion</span>
                    <p className="font-medium">2024</p>
                  </div>
                  <div className="bg-white dark:bg-moonscape-navy/40 p-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Value</span>
                    <p className="font-medium">₹120 Cr</p>
                  </div>
                </div>
                
                <button className="group flex items-center gap-2 font-medium text-moonscape-navy dark:text-moonscape-silver hover:text-moonscape-accent dark:hover:text-moonscape-accent transition-colors">
                  View Project Details
                  <span className="w-6 h-0.5 bg-current transition-all group-hover:w-8"></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
