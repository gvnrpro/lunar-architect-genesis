
import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Nexus Tech Hub',
    category: 'Commercial',
    description: 'A cutting-edge technology campus with smart office spaces and collaborative environments.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&h=500&q=80',
    completion: '2024',
    area: '12,500 sq.m',
    value: '₹120 Cr',
    location: 'Kerala, India',
    highlights: [
      'Smart building automation systems',
      'Sustainable design with LEED Platinum certification',
      'Flexible workspaces for 1,200+ professionals',
      'Integrated transit connections'
    ]
  },
  {
    id: 2,
    title: 'Evergreen Residences',
    category: 'Residential',
    description: 'Sustainable luxury apartments with integrated smart home systems and green spaces.',
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&h=500&q=80',
    completion: '2023',
    area: '8,200 sq.m',
    value: '₹85 Cr',
    location: 'Kochi, Kerala',
    highlights: [
      'Zero-carbon footprint design',
      'Rainwater harvesting and solar energy integration',
      '64 premium residential units',
      'Community gardens and wellness centers'
    ]
  },
  {
    id: 3,
    title: 'Riverside Bridge Complex',
    category: 'Infrastructure',
    description: 'A multi-functional bridge combining transportation, commercial spaces, and public recreation areas.',
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&h=500&q=80',
    completion: '2025',
    area: '18,000 sq.m',
    value: '₹250 Cr',
    location: 'Thiruvananthapuram, Kerala',
    highlights: [
      'Innovative dual-level transit system',
      'Earthquake-resistant engineering',
      'Integrated commercial and leisure spaces',
      'Pedestrian-friendly design with scenic viewpoints'
    ]
  },
  {
    id: 4,
    title: 'Metro Central Plaza',
    category: 'Urban Development',
    description: 'An integrated urban development project featuring retail, office, and public transportation hub.',
    image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&h=500&q=80',
    completion: '2024',
    area: '22,000 sq.m',
    value: '₹180 Cr',
    location: 'Kozhikode, Kerala',
    highlights: [
      'Multi-modal transportation hub',
      'Mixed-use development with 40+ retail spaces',
      'Office towers with panoramic views',
      'Public plazas and green infrastructure'
    ]
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveProject((prev) => (prev + 1) % projects.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };
  
  const prevProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };
  
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
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Create new timer
    timerRef.current = setInterval(() => {
      if (!isAnimating) {
        nextProject();
      }
    }, 7000);
    
    // Clean up interval on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeProject, isAnimating]);

  // Pause auto-rotation when user interacts
  const pauseAutoRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      
      // Resume after 10 seconds of inactivity
      setTimeout(() => {
        timerRef.current = setInterval(() => {
          if (!isAnimating) {
            nextProject();
          }
        }, 7000);
      }, 10000);
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
      aria-label="Our Featured Projects"
    >
      <div className="container px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight">Featured Projects</h2>
            <div className="h-0.5 w-16 bg-moonscape-accent mx-auto mb-8"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Discover our portfolio of landmark projects that showcase our commitment to excellence 
              and innovation in construction and development.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-sm group">
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
                  aria-hidden={index !== activeProject}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <span className="text-moonscape-accent text-sm">{project.category}</span>
                    <h3 className="text-2xl text-white mb-2">{project.title}</h3>
                  </div>
                </div>
              ))}
              
              {/* Blueprint overlay */}
              <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>
              
              {/* Control arrows */}
              <button 
                onClick={() => {
                  prevProject();
                  pauseAutoRotation();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-moonscape-navy/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none" 
                aria-label="Previous project"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => {
                  nextProject();
                  pauseAutoRotation();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-moonscape-navy/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none" 
                aria-label="Next project"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Navigation dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveProject(index);
                      pauseAutoRotation();
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === activeProject ? 'bg-moonscape-accent' : 'bg-white/50'
                    }`}
                    aria-label={`View project ${index + 1}`}
                    aria-current={index === activeProject ? 'true' : 'false'}
                  ></button>
                ))}
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={200}>
            <div className="relative">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`transition-all duration-500 ${
                    index === activeProject ? 'opacity-100 translate-y-0' : 'opacity-0 absolute translate-y-4'
                  }`}
                  style={{ zIndex: index === activeProject ? 10 : 0 }}
                  aria-hidden={index !== activeProject}
                >
                  <span className="text-moonscape-accent text-sm">{project.category}</span>
                  <h3 className="text-2xl md:text-3xl mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <Card className="bg-white dark:bg-moonscape-navy/40 overflow-hidden border-moonscape-blue/10 dark:border-moonscape-accent/10">
                      <CardContent className="p-4">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Location</span>
                        <p className="font-medium">{project.location}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-moonscape-navy/40 overflow-hidden border-moonscape-blue/10 dark:border-moonscape-accent/10">
                      <CardContent className="p-4">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Project Area</span>
                        <p className="font-medium">{project.area}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-moonscape-navy/40 overflow-hidden border-moonscape-blue/10 dark:border-moonscape-accent/10">
                      <CardContent className="p-4">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Completion</span>
                        <p className="font-medium">{project.completion}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-moonscape-navy/40 overflow-hidden border-moonscape-blue/10 dark:border-moonscape-accent/10">
                      <CardContent className="p-4">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Value</span>
                        <p className="font-medium">{project.value}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-medium mb-3">Project Highlights</h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block mt-1.5"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    className="group flex items-center gap-2 hover:text-moonscape-accent dark:hover:text-moonscape-accent transition-colors"
                    variant="ghost"
                  >
                    <span>View Project Details</span>
                    <span className="w-6 h-0.5 bg-current transition-all group-hover:w-8"></span>
                  </Button>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-20 right-0 w-32 h-32 hexagon border border-moonscape-blue/10 opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 hexagon border border-moonscape-accent/10 opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Enhanced background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particles-container"></div>
      </div>
    </section>
  );
};

export default Projects;
