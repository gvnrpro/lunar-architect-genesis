
import { useEffect, useRef, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if mobile and set loaded state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set loaded state after initial render
    setTimeout(() => setIsLoaded(true), 100);

    // Optimized scroll handler
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = requestAnimationFrame(() => {
        // Simple scroll-based reveals
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          
          if (isVisible) {
            element.classList.add('revealed');
          }
        });

        // Lightweight parallax only on desktop
        if (!isMobile) {
          const parallaxElements = document.querySelectorAll('.parallax-bg');
          parallaxElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const speed = 0.2;
            const yPos = window.scrollY * speed;
            (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
          });
        }
      });
    };

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault();
        
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without triggering navigation
          history.pushState(null, '', target.hash);
        }
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick);
    
    // Initial scroll check
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [isMobile]);

  return (
    <div className={`min-h-screen bg-white dark:bg-moonscape-charcoal text-moonscape-charcoal dark:text-white overflow-x-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Enhanced cursor for desktop only */}
      {!isMobile && <MoonlightCursor />}
      
      {/* Lunar navigation for desktop */}
      {!isMobile && <LunarNavigation />}
      
      {/* Main navigation */}
      <Navbar />
      
      {/* Page sections */}
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Clients />
      <Contact />
      <Footer />
      
      {/* Subtle background effects for desktop */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-moonscape-accent/3 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-moonscape-blue/3 to-transparent rounded-full blur-3xl"></div>
        </div>
      )}
    </div>
  );
};

export default Index;
