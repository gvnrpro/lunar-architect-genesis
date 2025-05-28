
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Projects from '@/components/Projects';
import Clients from '@/components/Clients';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingContactWidget from '@/components/FloatingContactWidget';

// Lazy load desktop-only components
const LunarNavigation = lazy(() => import('@/components/LunarNavigation'));
const OptimizedMoonlightCursor = lazy(() => import('@/components/OptimizedMoonlightCursor'));

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    // Enhanced mobile detection with touch capability check
    const checkMobile = () => {
      const width = window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(width < 768 || (isTouchDevice && width < 1024));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Smooth scrolling with proper focus management and performance optimization
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault();
        
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          // Add offset for fixed navbar
          const navHeight = 80;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
          
          // Update URL and manage focus for accessibility
          history.pushState(null, '', target.hash);
          
          // Set focus for accessibility after scroll completes
          setTimeout(() => {
            (targetElement as HTMLElement).focus({ preventScroll: true });
          }, 500);
        }
      }
    };

    // Performance optimized parallax effect for desktop
    let rafId: number;
    const handleScroll = () => {
      if (isMobile) return;
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.05; // Reduced for better performance
            const yPos = scrollY * speed;
            (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
          }
        });
      });
    };

    document.addEventListener('click', handleAnchorClick);
    
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (!isMobile) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isMobile, isLoaded]);

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
    setIsLoaded(true);
  };

  if (showLoadingScreen) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-moonscape-charcoal text-moonscape-charcoal dark:text-white overflow-x-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Enhanced cursor for desktop only */}
      {!isMobile && (
        <Suspense fallback={null}>
          <OptimizedMoonlightCursor />
        </Suspense>
      )}
      
      {/* Lunar navigation for desktop */}
      {!isMobile && (
        <Suspense fallback={null}>
          <LunarNavigation />
        </Suspense>
      )}
      
      {/* Main navigation */}
      <Navbar />
      
      {/* Page sections with improved accessibility */}
      <main role="main">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Clients />
        <Contact />
      </main>
      
      <Footer />
      
      {/* Floating Contact Widget */}
      <FloatingContactWidget />
      
      {/* Optimized background effects for desktop only */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-moonscape-accent/2 to-transparent rounded-full blur-3xl will-change-transform parallax-bg"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-moonscape-blue/2 to-transparent rounded-full blur-3xl will-change-transform parallax-bg"></div>
        </div>
      )}
    </div>
  );
};

export default Index;
