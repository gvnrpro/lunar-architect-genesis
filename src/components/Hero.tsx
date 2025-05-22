
import { useState, useEffect } from 'react';
import LogoAnimation from './LogoAnimation';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen relative overflow-hidden flex items-center justify-center blueprint-grid"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/95 dark:from-moonscape-charcoal/50 dark:to-moonscape-charcoal/95"></div>
      
      <div className="container px-6 md:px-10 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`mb-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <LogoAnimation />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl opacity-0 animate-fade-up-delay-1">
            MOONSCAPE HOLDINGS
          </h1>
          
          <div className="h-0.5 w-32 md:w-48 bg-moonscape-accent mx-auto my-6 opacity-0 animate-fade-in-slow"></div>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light tracking-wide opacity-0 animate-fade-up-delay-2">
            CONTRACTORS &amp; DEVELOPERS
          </p>
          
          <p className="mt-8 max-w-2xl mx-auto text-gray-500 dark:text-gray-400 opacity-0 animate-fade-up-delay-3">
            Building the future with precision and innovation. We transform visions into architectural realities across Kerala and beyond.
          </p>
          
          <div className="mt-12 opacity-0 animate-fade-up-delay-3">
            <a 
              href="#expertise" 
              className="inline-flex items-center gap-2 bg-moonscape-navy text-white px-8 py-3 rounded-sm hover:bg-moonscape-blue transition-colors"
            >
              Explore Our Work
              <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block"></span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-moonscape-charcoal to-transparent"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 hexagon border-2 border-moonscape-blue/20 opacity-30"></div>
      <div className="absolute top-32 -left-8 w-16 h-16 hexagon border border-moonscape-blue/20 opacity-20"></div>
    </section>
  );
};

export default Hero;
