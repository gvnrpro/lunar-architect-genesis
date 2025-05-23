
import { useState, useEffect, useRef } from 'react';
import LogoAnimation from './LogoAnimation';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const textLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const handleScroll = () => {
      if (heroRef.current) {
        const position = window.scrollY;
        setScrollPosition(position);

        // Parallax effect
        const parallaxElements = heroRef.current.querySelectorAll('.parallax-element');
        parallaxElements.forEach((element, index) => {
          const speed = 0.1 + (index * 0.05);
          const yPos = position * speed;
          const el = element as HTMLElement;
          el.style.transform = `translateY(${yPos}px)`;
        });

        // Text reveal on scroll
        if (textLinesRef.current) {
          const lines = textLinesRef.current.querySelectorAll('.reveal-line');
          lines.forEach((line, index) => {
            if (position > 100 + (index * 30)) {
              line.classList.add('revealed-line');
            }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transitionDelay = (index: number) => {
    return { transitionDelay: `${0.3 + (index * 0.1)}s` };
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden flex items-center justify-center blueprint-grid"
    >
      {/* Dynamic architectural grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/95 dark:from-moonscape-charcoal/50 dark:to-moonscape-charcoal/95"></div>
      <div className="absolute inset-0 grid-overlay"></div>
      
      {/* Floating hexagon decorative elements */}
      <div className="absolute -top-10 left-1/4 w-32 h-32 hexagon border-2 border-moonscape-blue/10 parallax-element animate-float"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 hexagon border border-moonscape-blue/20 parallax-element animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/5 w-24 h-24 hexagon border border-moonscape-accent/10 parallax-element animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container px-6 md:px-10 relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <LogoAnimation />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl opacity-0 animate-fade-up-delay-1 tracking-tight relative">
            <span className="block relative overflow-hidden">
              <span className="block transform transition-transform duration-1000" style={transitionDelay(1)}>
                MOONSCAPE
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-moonscape-accent transform scale-x-0 origin-left transition-transform duration-1000" style={transitionDelay(2)}></span>
            </span>
            <span className="block mt-2 text-3xl md:text-5xl lg:text-6xl text-moonscape-blue dark:text-moonscape-accent relative overflow-hidden">
              <span className="block transform transition-transform duration-1000" style={transitionDelay(3)}>
                HOLDINGS
              </span>
            </span>
          </h1>
          
          <div className="h-0.5 w-32 md:w-48 bg-moonscape-accent mx-auto my-6 opacity-0 animate-fade-in-slow"></div>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light tracking-wide opacity-0 animate-fade-up-delay-2">
            CONTRACTORS &amp; DEVELOPERS
          </p>
          
          <div ref={textLinesRef} className="mt-8 max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
            <p className="reveal-line opacity-0 transform translate-y-6 transition-all duration-700">
              Building the future with <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">precision</span> and <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">innovation</span>.
            </p>
            <p className="reveal-line opacity-0 transform translate-y-6 transition-all duration-700 mt-2">
              We transform visions into architectural realities across Kerala and beyond.
            </p>
          </div>
          
          <div className="mt-12 opacity-0 animate-fade-up-delay-3">
            <a 
              href="#expertise" 
              className="group inline-flex items-center gap-2 bg-moonscape-navy text-white px-8 py-3 rounded-sm hover:bg-moonscape-blue transition-colors relative overflow-hidden"
            >
              <span className="relative z-10">Explore Our Work</span>
              <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block group-hover:animate-pulse"></span>
              
              {/* Button hover effect */}
              <span className="absolute inset-0 w-full h-full bg-moonscape-blue scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
            </a>
          </div>
          
          {/* Scroll indicator animation */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in-slow" style={{ animationDelay: '2s' }}>
            <span className="text-xs text-gray-400 mb-2">Scroll to discover</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-moonscape-accent/0 to-moonscape-accent/80 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-moonscape-charcoal to-transparent"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 hexagon border-2 border-moonscape-blue/20 opacity-30"></div>
      <div className="absolute top-32 -left-8 w-16 h-16 hexagon border border-moonscape-blue/20 opacity-20"></div>
      
      {/* Lunar surface transition at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-12 lunar-surface-transition"></div>
    </section>
  );
};

export default Hero;
