
import { useEffect, useRef, useState } from 'react';
import { Building2, Home, Construction, Leaf } from 'lucide-react';

const expertiseAreas = [
  {
    id: 1,
    title: 'Commercial Construction',
    description: 'Large-scale commercial projects including office complexes, shopping centers, and industrial facilities.',
    icon: Building2,
    projects: '45+',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    id: 2,
    title: 'Residential Development',
    description: 'Premium residential projects from luxury villas to modern apartment complexes.',
    icon: Home,
    projects: '60+',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    id: 3,
    title: 'Infrastructure Projects',
    description: 'Roads, bridges, and public infrastructure that connects communities.',
    icon: Construction,
    projects: '25+',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    id: 4,
    title: 'Green Building Solutions',
    description: 'Sustainable construction practices with eco-friendly materials and energy-efficient designs.',
    icon: Leaf,
    projects: '30+',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
];

const Expertise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-card-id]');
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="section-padding bg-gray-50 dark:bg-moonscape-navy/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="responsive-heading font-monument text-moonscape-navy dark:text-white mb-6">
            Our Expertise
          </h2>
          <div className="h-1 w-16 bg-moonscape-accent mx-auto mb-6"></div>
          <p className="responsive-body text-gray-600 dark:text-gray-300 leading-relaxed">
            With over 15 years of experience, we specialize in diverse construction projects 
            that showcase our commitment to quality, innovation, and sustainable development.
          </p>
        </div>
        
        {/* Expertise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {expertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            const isVisible = visibleCards.has(area.id);
            const delay = isMobile ? 0 : index * 100;
            
            return (
              <div 
                key={area.id}
                data-card-id={area.id}
                className={`modern-card group h-full transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 ${area.bgColor} ${area.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={24} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-moonscape-navy dark:text-white mb-3 group-hover:text-moonscape-accent transition-colors">
                  {area.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
                  {area.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-moonscape-accent font-semibold text-sm">
                    {area.projects} Projects
                  </span>
                  <div className="w-8 h-8 rounded-full bg-moonscape-accent/10 flex items-center justify-center group-hover:bg-moonscape-accent group-hover:text-white transition-colors">
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <p className="responsive-body text-gray-600 dark:text-gray-300 mb-6">
            Ready to discuss your next project?
          </p>
          <a 
            href="#contact" 
            className="modern-button"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
