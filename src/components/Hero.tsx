
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import LogoAnimation from './LogoAnimation';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    setTimeout(() => setIsLoaded(true), 300);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-moonscape-charcoal dark:to-moonscape-navy"
    >
      {/* Subtle background pattern for desktop */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Logo Animation */}
          <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <LogoAnimation />
          </div>
          
          {/* Main Heading */}
          <h1 className={`responsive-heading font-monument mb-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block text-moonscape-navy dark:text-white">
              MOONSCAPE
            </span>
            <span className="block text-moonscape-blue dark:text-moonscape-accent mt-2">
              HOLDINGS
            </span>
          </h1>
          
          {/* Accent Line */}
          <div className={`h-1 w-24 bg-moonscape-accent mx-auto mb-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          
          {/* Subtitle */}
          <p className={`responsive-subheading text-gray-600 dark:text-gray-300 font-light mb-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            CONTRACTORS &amp; DEVELOPERS
          </p>
          
          {/* Description */}
          <div className={`max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="responsive-body text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Building the future with <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">precision</span> and <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">innovation</span>.
            </p>
            <p className="responsive-body text-gray-500 dark:text-gray-400">
              We transform visions into architectural realities across Kerala and beyond.
            </p>
          </div>
          
          {/* Call to Action */}
          <div className={`mb-16 transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a 
              href="#expertise" 
              className="modern-button group"
            >
              <span>Explore Our Work</span>
              <div className="w-2 h-2 rounded-full bg-moonscape-accent group-hover:animate-pulse"></div>
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <div className={`transition-all duration-1000 delay-1300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
              <span className="text-xs mb-2 font-medium">Scroll to discover</span>
              <ChevronDown size={20} className="animate-bounce" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements - Desktop Only */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-8 w-16 h-16 hexagon border border-moonscape-blue/10 animate-float-gentle"></div>
          <div className="absolute bottom-1/3 right-8 w-12 h-12 hexagon border border-moonscape-accent/10 animate-float-gentle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 hexagon border border-moonscape-blue/5 animate-float-gentle" style={{ animationDelay: '2s' }}></div>
        </>
      )}
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-moonscape-charcoal to-transparent"></div>
    </section>
  );
};

export default Hero;
