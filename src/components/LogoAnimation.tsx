
import { useEffect, useRef } from 'react';

const LogoAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      const circle = svgRef.current.querySelector('circle');
      
      // Reset animations
      paths.forEach((path) => {
        path.style.strokeDasharray = '1000';
        path.style.strokeDashoffset = '1000';
        path.style.fill = 'transparent';
      });
      
      if (circle) {
        circle.style.opacity = '0';
        circle.style.transform = 'scale(0.8)';
      }
      
      // Animate paths
      paths.forEach((path, index) => {
        setTimeout(() => {
          path.style.animation = 'draw-line 2s ease-out forwards';
          
          // Fill after drawing
          setTimeout(() => {
            path.style.fill = '#16213E';
          }, 1800);
        }, index * 300);
      });
      
      // Animate circle with lunar phases effect
      if (circle) {
        setTimeout(() => {
          circle.style.animation = 'lunar-phase 2.5s ease-out forwards';
        }, 1500);
      }

      // Add hover animation for the container
      const container = containerRef.current;
      if (container) {
        container.addEventListener('mouseenter', () => {
          // Scale the circle slightly on hover
          if (circle) {
            circle.style.transform = 'scale(1.1)';
            circle.style.transition = 'transform 0.5s ease-out';
          }
          
          // Slightly rotate the paths for an interactive feel
          paths.forEach((path) => {
            path.style.transition = 'transform 0.5s ease-out';
            path.style.transformOrigin = 'center';
            path.style.transform = 'rotate(2deg)';
          });
        });
        
        container.addEventListener('mouseleave', () => {
          // Reset the animations on mouse leave
          if (circle) {
            circle.style.transform = 'scale(1)';
          }
          
          paths.forEach((path) => {
            path.style.transform = 'rotate(0deg)';
          });
        });
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="logo-container relative">
      <svg 
        ref={svgRef}
        width="200" 
        height="200" 
        viewBox="0 0 600 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto transform transition-transform duration-700 hover:scale-105"
      >
        {/* Hexagon outline */}
        <path 
          d="M300 50L550 175V425L300 550L50 425V175L300 50Z" 
          stroke="#16213E" 
          strokeWidth="15" 
          fill="transparent"
          className="transition-all duration-700"
        />
        
        {/* M left vertical */}
        <path 
          d="M150 175V425" 
          stroke="#16213E" 
          strokeWidth="20" 
          fill="transparent"
          className="transition-all duration-700"
        />
        
        {/* M right vertical */}
        <path 
          d="M450 175V425" 
          stroke="#16213E" 
          strokeWidth="20" 
          fill="transparent"
          className="transition-all duration-700"
        />
        
        {/* M middle diagonal left */}
        <path 
          d="M150 175L300 325" 
          stroke="#16213E" 
          strokeWidth="20" 
          fill="transparent"
          className="transition-all duration-700"
        />
        
        {/* M middle diagonal right */}
        <path 
          d="M450 175L300 325" 
          stroke="#16213E" 
          strokeWidth="20" 
          fill="transparent"
          className="transition-all duration-700"
        />
        
        {/* Circle (moon) with lunar phase effect */}
        <circle 
          cx="300" 
          cy="175" 
          r="70" 
          fill="#16213E" 
          opacity="0"
          className="lunar-circle transition-all duration-700"
        />
      </svg>
      
      {/* Particle system for enhanced logo effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="particles-container"></div>
      </div>
    </div>
  );
};

export default LogoAnimation;
