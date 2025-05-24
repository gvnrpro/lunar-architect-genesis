
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
    console.log('Index page mounted');
    
    // Simplified particle system
    const createParticles = () => {
      const containers = document.querySelectorAll('.particles-container');
      
      containers.forEach(container => {
        container.innerHTML = '';
        
        const particleCount = window.innerWidth < 768 ? 8 : 15;
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.classList.add('particle', 'stellar-dust');
          
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.width = `${Math.random() * 3 + 1}px`;
          particle.style.height = `${Math.random() * 3 + 1}px`;
          particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
          particle.style.animationDelay = `${Math.random() * 5}s`;
          
          container.appendChild(particle);
        }
      });
    };

    // Simplified scroll handler
    const handleScroll = () => {
      if (particlesTimerRef.current) {
        cancelAnimationFrame(particlesTimerRef.current);
      }
      
      particlesTimerRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Simple reveal elements
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          
          if (elementTop < window.innerHeight * 0.8) {
            element.classList.add('revealed');
          }
        });
        
        // Parallax effects
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        parallaxElements.forEach((bg) => {
          const element = bg as HTMLElement;
          const speed = 0.3;
          const yPos = scrollY * speed;
          element.style.transform = `translateY(${yPos}px)`;
        });
      });
    };

    // Smooth scrolling for anchor links
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault();
        
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          history.pushState(null, '', target.hash);
        }
      }
    };

    // Initialize
    createParticles();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('click', smoothScroll);
    handleScroll(); // Initial call

    // Resize handler
    const handleResize = () => {
      createParticles();
      handleScroll();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('click', smoothScroll);
      window.removeEventListener('resize', handleResize);
      
      if (particlesTimerRef.current) {
        cancelAnimationFrame(particlesTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-moonscape-charcoal text-moonscape-charcoal dark:text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="lunar-phases-bg"></div>
        <div className="cosmic-dust-layer"></div>
      </div>
      
      {/* Enhanced cursor and navigation */}
      <MoonlightCursor />
      <LunarNavigation />
      
      {/* Main content */}
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Clients />
      <Contact />
      <Footer />
      
      {/* Decorative elements */}
      <div className="fixed top-1/4 right-5 w-24 h-24 hexagon border border-moonscape-blue/10 opacity-10 animate-orbital z-0"></div>
      <div className="fixed bottom-1/3 left-5 w-16 h-16 hexagon border border-moonscape-accent/10 opacity-10 animate-orbital-reverse z-0"></div>
      
      {/* Blueprint grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 blueprint-grid opacity-5"></div>
      
      {/* Moonlight beams */}
      <div className="fixed top-0 right-1/4 w-1 h-full bg-gradient-to-b from-moonscape-accent/5 to-transparent pointer-events-none z-0 moonlight-beam"></div>
      <div className="fixed top-0 left-1/3 w-1 h-full bg-gradient-to-b from-moonscape-blue/5 to-transparent pointer-events-none z-0 moonlight-beam"></div>
    </div>
  );
};

export default Index;
