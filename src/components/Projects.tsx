
import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const projects = [
  {
    id: 1,
    title: 'Skyline Business Complex',
    category: 'Commercial',
    location: 'Kochi, Kerala',
    year: '2023',
    description: 'A modern 15-story business complex featuring sustainable design and smart building technologies.',
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Heritage Residential Towers',
    category: 'Residential',
    location: 'Trivandrum, Kerala',
    year: '2023',
    description: 'Luxury residential towers with traditional Kerala architecture blended with modern amenities.',
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    status: 'Ongoing',
  },
  {
    id: 3,
    title: 'Green Valley Infrastructure',
    category: 'Infrastructure',
    location: 'Calicut, Kerala',
    year: '2022',
    description: 'Comprehensive infrastructure development including roads, bridges, and utilities.',
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Eco-Smart Campus',
    category: 'Educational',
    location: 'Thrissur, Kerala',
    year: '2024',
    description: 'State-of-the-art educational campus with sustainable building practices and smart technologies.',
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    status: 'Planning',
  },
];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
    >
      <div className="container px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl mb-6 font-monument">Featured Projects</h2>
            <div className="h-0.5 w-16 bg-moonscape-accent mx-auto mb-8"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Explore our portfolio of remarkable projects that demonstrate our expertise 
              in creating innovative and sustainable architectural solutions.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
              <div className="bg-white dark:bg-moonscape-navy/40 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden rounded-sm">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-moonscape-accent text-sm font-medium">{project.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{project.year}</span>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2 group-hover:text-moonscape-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </div>
                    
                    <button className="flex items-center gap-2 text-moonscape-accent hover:text-moonscape-blue transition-colors text-sm font-medium">
                      View Details
                      <span className="w-4 h-4">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={400}>
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
