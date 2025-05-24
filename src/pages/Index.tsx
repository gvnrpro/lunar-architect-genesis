
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Projects from '@/components/Projects';
import Clients from '@/components/Clients';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LunarNavigation from '@/components/LunarNavigation';
import MoonlightCursor from '@/components/MoonlightCursor';

const Index = () => {
  const particlesTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Enhanced particle system for moonscape theme
    const createEnhancedParticles = () => {
      const containers = document.querySelectorAll('.particles-container');
      
      containers.forEach(container => {
        container.innerHTML = '';
        
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          
          // Different particle types for variety
          const particleType = Math.random();
          if (particleType < 0.7) {
            particle.classList.add('particle', 'stellar-dust');
          } else if (particleType < 0.9) {
            particle.classList.add('particle', 'cosmic-ray');
          } else {
            particle.classList.add('particle', 'lunar-fragment');
          }
          
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          
          const size = Math.random() * 4 + 1;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          
          particle.style.animationDuration = `${Math.random() * 15 + 8}s`;
          particle.style.animationDelay = `${Math.random() * 8}s`;
          
          container.appendChild(particle);
        }
      });
    };

    // Enhanced scroll handler with moonscape effects
    const handleEnhancedScroll = () => {
      if (particlesTimerRef.current) {
        cancelAnimationFrame(particlesTimerRef.current);
      }
      
      particlesTimerRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Reveal elements with enhanced effects
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
          
          if (elementTop < window.innerHeight * 0.85 && elementBottom > 0) {
            element.classList.add('revealed');
          }
        });
        
        // Enhanced parallax with lunar surface feel
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        parallaxElements.forEach((bg) => {
          const element = bg as HTMLElement;
          const speed = parseFloat(element.dataset.speed || '0.3');
          const yPos = scrollY * speed;
          element.style.transform = `translateY(${yPos}px) scale(${1 + scrollPercent * 0.1})`;
        });
        
        // Lunar phase transition based on scroll
        const lunarBg = document.querySelector('.lunar-phases-bg') as HTMLElement;
        if (lunarBg) {
          const phase = Math.sin(scrollPercent * Math.PI * 2);
          lunarBg.style.opacity = `${0.1 + Math.abs(phase) * 0.1}`;
          lunarBg.style.transform = `translate(50%, -50%) scale(${0.8 + Math.abs(phase) * 0.4}) rotate(${scrollPercent * 360}deg)`;
        }
        
        // Dynamic blueprint grid
        const grid = document.querySelector('.blueprint-grid') as HTMLElement;
        if (grid) {
          const gridSize = 50 + (scrollPercent * 30);
          grid.style.backgroundSize = `${gridSize}px ${gridSize}px`;
          grid.style.opacity = `${0.5 + scrollPercent * 0.3}`;
        }
        
        // Moonlight beam effects
        const moonbeams = document.querySelectorAll('.moonlight-beam');
        moonbeams.forEach((beam, index) => {
          const element = beam as HTMLElement;
          const intensity = Math.sin(scrollPercent * Math.PI + index) * 0.5 + 0.5;
          element.style.opacity = `${intensity * 0.2}`;
        });
      });
    };

    // Enhanced smooth scrolling with easing
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.hash && target.origin + target.pathname === window.location.origin + window.location.pathname) {
        e.preventDefault();
        
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          // Add moonscape transition effect
          targetElement.classList.add('moonscape-transition');
          
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          setTimeout(() => {
            targetElement.classList.remove('moonscape-transition');
          }, 1000);
          
          history.pushState(null, '', target.hash);
        }
      }
    };

    // Initialize enhanced effects
    createEnhancedParticles();
    window.addEventListener('scroll', handleEnhancedScroll, { passive: true });
    document.body.addEventListener('click', smoothScroll);
    handleEnhancedScroll();

    // Enhanced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createEnhancedParticles();
        handleEnhancedScroll();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleEnhancedScroll);
      document.body.removeEventListener('click', smoothScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      
      if (particlesTimerRef.current) {
        cancelAnimationFrame(particlesTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-moonscape-charcoal text-moonscape-charcoal dark:text-white overflow-x-hidden">
      {/* Enhanced lunar phase animation */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="lunar-phases-bg"></div>
        <div className="cosmic-dust-layer"></div>
      </div>
      
      {/* Enhanced cursor and navigation */}
      <MoonlightCursor />
      <LunarNavigation />
      
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Clients />
      <Contact />
      <Footer />
      
      {/* Enhanced floating design elements */}
      <div className="fixed top-1/4 right-5 w-24 h-24 hexagon border border-moonscape-blue/10 opacity-10 animate-orbital z-0"></div>
      <div className="fixed bottom-1/3 left-5 w-16 h-16 hexagon border border-moonscape-accent/10 opacity-10 animate-orbital-reverse z-0"></div>
      
      {/* Enhanced blueprint grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 blueprint-grid opacity-3"></div>
      
      {/* Moonlight beam effects */}
      <div className="fixed top-0 right-1/4 w-1 h-full bg-gradient-to-b from-moonscape-accent/5 to-transparent pointer-events-none z-0 moonlight-beam"></div>
      <div className="fixed top-0 left-1/3 w-1 h-full bg-gradient-to-b from-moonscape-blue/5 to-transparent pointer-events-none z-0 moonlight-beam"></div>
    </div>
  );
};

export default Index;
