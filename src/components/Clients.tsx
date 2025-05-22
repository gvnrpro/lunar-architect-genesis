
import { useEffect, useRef } from 'react';

const clients = [
  { id: 1, name: 'TechCorp', logo: 'TC' },
  { id: 2, name: 'Global Investments', logo: 'GI' },
  { id: 3, name: 'Kerala State', logo: 'KS' },
  { id: 4, name: 'Stellar Properties', logo: 'SP' },
  { id: 5, name: 'Greenfield Developers', logo: 'GD' },
  { id: 6, name: 'Urban Innovations', logo: 'UI' },
  { id: 7, name: 'Metro Transit', logo: 'MT' },
  { id: 8, name: 'Blue Ocean Ventures', logo: 'BOV' },
];

const Clients = () => {
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
      id="clients"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 reveal-on-scroll">Our Clients & Partners</h2>
          <div className="h-0.5 w-16 bg-moonscape-accent mx-auto mb-8 reveal-on-scroll"></div>
          <p className="text-gray-600 dark:text-gray-300 reveal-on-scroll">
            We're proud to collaborate with leading organizations who trust us with their most ambitious projects.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <div 
              key={client.id}
              className="bg-white dark:bg-moonscape-navy/40 shadow-md hover:shadow-xl transition-all p-8 flex items-center justify-center group hover:-translate-y-1 duration-300 reveal-on-scroll"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="hexagon w-16 h-16 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 group-hover:border-moonscape-accent transition-colors">
                <span className="font-monument text-lg text-gray-500 dark:text-gray-400 group-hover:text-moonscape-accent transition-colors">
                  {client.logo}
                </span>
              </div>
              <span className="ml-4 text-lg font-medium">{client.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal-on-scroll">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to collaborate on your next project?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 bg-moonscape-navy text-white px-8 py-3 hover:bg-moonscape-blue transition-colors"
          >
            Get in Touch
            <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block"></span>
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 hexagon border border-moonscape-blue/10 opacity-30 animate-float"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 hexagon border border-moonscape-blue/10 opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Clients;
