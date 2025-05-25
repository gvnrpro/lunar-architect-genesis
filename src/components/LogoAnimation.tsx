
import { useEffect, useRef, useState } from 'react';

const LogoAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
      animateLogo();
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const animateLogo = () => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll('path');
    const circle = svgRef.current.querySelector('circle');
    
    // Reset all elements
    paths.forEach((path) => {
      const element = path as SVGPathElement;
      element.style.strokeDasharray = '1000';
      element.style.strokeDashoffset = '1000';
      element.style.fill = 'transparent';
      element.style.stroke = '#16213E';
      element.style.strokeWidth = '15';
    });
    
    if (circle) {
      const circleElement = circle as SVGCircleElement;
      circleElement.style.opacity = '0';
      circleElement.style.transform = 'scale(0.8)';
      circleElement.style.fill = '#16213E';
    }
    
    // Animate paths sequentially
    paths.forEach((path, index) => {
      setTimeout(() => {
        const element = path as SVGPathElement;
        element.style.transition = 'stroke-dashoffset 2s ease-out';
        element.style.strokeDashoffset = '0';
        
        // Adjust stroke width for M letters
        if (index > 0) {
          element.style.strokeWidth = '20';
        }
      }, index * 200);
    });
    
    // Animate circle (moon) last
    if (circle) {
      setTimeout(() => {
        const circleElement = circle as SVGCircleElement;
        circleElement.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        circleElement.style.opacity = '1';
        circleElement.style.transform = 'scale(1)';
        
        // Add subtle pulsing after initial animation
        setTimeout(() => {
          circleElement.style.animation = 'lunar-pulse 4s ease-in-out infinite';
        }, 1000);
      }, 1000);
    }
  };

  const handleHover = () => {
    if (isMobile || !isAnimating) return; // Skip hover effects on mobile
    
    const container = containerRef.current;
    const circle = svgRef.current?.querySelector('circle') as SVGCircleElement;
    const paths = svgRef.current?.querySelectorAll('path');
    
    if (circle) {
      circle.style.transform = 'scale(1.1)';
      circle.style.filter = 'drop-shadow(0 0 8px rgba(0, 153, 255, 0.6))';
    }
    
    paths?.forEach((path, index) => {
      const element = path as SVGPathElement;
      element.style.transition = 'all 0.3s ease-out';
      if (index === 0) {
        element.style.transform = 'rotate(2deg)';
      } else {
        element.style.filter = 'drop-shadow(0 0 4px rgba(22, 33, 62, 0.3))';
      }
    });
  };

  const handleHoverEnd = () => {
    if (isMobile) return;
    
    const circle = svgRef.current?.querySelector('circle') as SVGCircleElement;
    const paths = svgRef.current?.querySelectorAll('path');
    
    if (circle) {
      circle.style.transform = 'scale(1)';
      circle.style.filter = 'none';
    }
    
    paths?.forEach((path) => {
      const element = path as SVGPathElement;
      element.style.transform = 'rotate(0deg)';
      element.style.filter = 'none';
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="logo-container relative w-full max-w-[200px] mx-auto"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      <svg 
        ref={svgRef}
        width="200" 
        height="200" 
        viewBox="0 0 600 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto transform transition-transform duration-300 hover:scale-105"
        style={{ maxWidth: isMobile ? '150px' : '200px' }}
      >
        {/* Hexagon outline */}
        <path 
          d="M300 50L550 175V425L300 550L50 425V175L300 50Z" 
          stroke="#16213E" 
          strokeWidth="15" 
          fill="transparent"
        />
        
        {/* M left vertical */}
        <path 
          d="M150 175V425" 
          stroke="#16213E" 
          strokeWidth="20" 
          fill="transparent"
        />
        
        {/* M right vertical */}
        <path 
          d="M450 175V425" 
          stroke="#16213E" 
          strokeWidth="20" 
          fill="transparent"
        />
        
        {/* M middle diagonal left */}
        <path 
          d="M150 175L300 325" 
          stroke="#16213E" 
          strokeWidth="20" 
          fill="transparent"
        />
        
        {/* M middle diagonal right */}
        <path 
          d="M450 175L300 325" 
          stroke="#16213E" 
          strokeWidth="20" 
          fill="transparent"
        />
        
        {/* Circle (moon) */}
        <circle 
          cx="300" 
          cy="175" 
          r="70" 
          fill="#16213E" 
          opacity="0"
        />
      </svg>
      
      {/* Simplified effects for mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-moonscape-accent/5 to-transparent animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
