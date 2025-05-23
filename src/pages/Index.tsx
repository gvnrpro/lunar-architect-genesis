
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Projects from '@/components/Projects';
import Clients from '@/components/Clients';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const particlesTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize particle system for all screens using requestAnimationFrame for better performance
    const createParticles = () => {
      const containers = document.querySelectorAll('.particles-container');
      
      containers.forEach(container => {
        // Clear existing particles first to avoid duplication
        container.innerHTML = '';
        
        // Create fewer particles for better performance
        const particleCount = window.innerWidth < 768 ? 10 : 20;
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.classList.add('particle');
          
          // Random position
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          
          // Random size with more variation
          const size = Math.random() * 3 + 1;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          
          // Random animation duration
          particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
          
          // Random animation delay
          particle.style.animationDelay = `${Math.random() * 5}s`;
          
          // Add to container
          container.appendChild(particle);
        }
      });
    };
    
    // Handle scroll animations with improved performance using requestAnimationFrame
    const handleScroll = () => {
      // Use cancelAnimationFrame to prevent multiple animations queuing up
      if (particlesTimerRef.current) {
        cancelAnimationFrame(particlesTimerRef.current);
      }
      
      particlesTimerRef.current = requestAnimationFrame(() => {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        revealElements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
          
          if (elementTop < window.innerHeight * 0.85 && elementBottom > 0) {
            element.classList.add('revealed');
          }
        });
        
        // Parallax effect for backgrounds with better performance
        const parallaxBackgrounds = document.querySelectorAll('.parallax-bg');
        parallaxBackgrounds.forEach((bg) => {
          const scrollPosition = window.scrollY;
          const element = bg as HTMLElement;
          const speed = parseFloat(element.dataset.speed || '0.2');
          element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        // Animate text lines on scroll
        const textLines = document.querySelectorAll('.animate-on-scroll .line');
        textLines.forEach((line, index) => {
          const lineTop = line.getBoundingClientRect().top;
          if (lineTop < window.innerHeight * 0.8) {
            (line as HTMLElement).style.transform = 'translateX(0)';
            (line as HTMLElement).style.opacity = '1';
          }
        });
        
        // Animate architectural grid
        const grid = document.querySelector('.blueprint-grid');
        if (grid) {
          const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          (grid as HTMLElement).style.backgroundSize = `${50 + (scrollPercentage * 20)}px ${50 + (scrollPercentage * 20)}px`;
        }
      });
    };
    
    // Add smooth scrolling behavior
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      // Only process hash links within the same page
      if (target.tagName === 'A' && target.hash && target.origin + target.pathname === window.location.origin + window.location.pathname) {
        e.preventDefault();
        
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without reload
          history.pushState(null, '', target.hash);
        }
      }
    };
    
    // Check if URL has a hash on load and scroll to that section
    const handleInitialHash = () => {
      if (window.location.hash) {
        setTimeout(() => {
          const targetElement = document.querySelector(window.location.hash);
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 500); // Short delay to allow page to fully render
      }
    };
    
    // Start everything
    createParticles();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('click', smoothScroll);
    handleScroll(); // Check on initial load
    handleInitialHash();
    
    // Set up resize handler with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createParticles();
        handleScroll();
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      {/* Lunar phase animation in the background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="lunar-phases-bg"></div>
      </div>
      
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Clients />
      <Contact />
      <Footer />
      
      {/* Floating design elements */}
      <div className="fixed top-1/4 right-5 w-24 h-24 hexagon border border-moonscape-blue/10 opacity-10 animate-float z-0"></div>
      <div className="fixed bottom-1/3 left-5 w-16 h-16 hexagon border border-moonscape-accent/10 opacity-10 animate-float z-0" style={{ animationDelay: '3s' }}></div>
      
      {/* Blueprint grid overlay with reduced opacity for better performance */}
      <div className="fixed inset-0 pointer-events-none z-0 blueprint-grid opacity-3"></div>
    </div>
  );
};

export default Index;
