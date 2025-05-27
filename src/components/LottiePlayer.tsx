
import { useEffect, useRef, useState } from 'react';

interface LottiePlayerProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  loop?: boolean;
  autoplay?: boolean;
}

const LottiePlayer = ({ 
  src, 
  className = "", 
  style = {}, 
  speed = 1, 
  loop = true, 
  autoplay = true 
}: LottiePlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if lottie-player script is already loaded
    if (!window.customElements.get('lottie-player')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      script.onload = () => setIsLoaded(true);
      script.onerror = () => setHasError(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`} style={style}>
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏗️</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Animation unavailable</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} style={style}>
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading animation...</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      <lottie-player
        src={src}
        background="transparent"
        speed={speed}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottiePlayer;
</lottie-player>

Now I'll update the Hero section with the new content and cityscape animation:

<lov-write file_path="src/components/Hero.tsx">
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import LogoAnimation from './LogoAnimation';
import LottiePlayer from './LottiePlayer';

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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Logo Animation */}
            <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <LogoAnimation />
            </div>
            
            {/* Main Heading */}
            <h1 className={`responsive-heading font-monument mb-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="block text-moonscape-navy dark:text-white">
                Building the Future with
              </span>
              <span className="block text-moonscape-blue dark:text-moonscape-accent mt-2">
                Precision and Innovation
              </span>
            </h1>
            
            {/* Accent Line */}
            <div className={`h-1 w-24 bg-moonscape-accent mx-auto lg:mx-0 mb-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            
            {/* Subtitle */}
            <p className={`responsive-body text-gray-600 dark:text-gray-300 leading-relaxed mb-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Transforming visions into architectural realities across Kerala and beyond.
            </p>
            
            {/* Call to Action */}
            <div className={`mb-16 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a 
                href="#projects" 
                className="modern-button group"
              >
                <span>Explore Our Projects</span>
                <div className="w-2 h-2 rounded-full bg-moonscape-accent group-hover:animate-pulse"></div>
              </a>
            </div>
          </div>

          {/* Animation Column */}
          <div className={`transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <LottiePlayer
              src="https://assets3.lottiefiles.com/packages/lf20_tapubt7q.json"
              className="w-full max-w-lg mx-auto"
              style={{ height: '400px' }}
            />
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
            <span className="text-xs mb-2 font-medium">Scroll to discover</span>
            <ChevronDown size={20} className="animate-bounce" />
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
