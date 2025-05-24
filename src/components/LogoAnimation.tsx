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
        path.style.stroke = '#16213E';
      });
      
      if (circle) {
        circle.style.opacity = '0';
        circle.style.transform = 'scale(0.8)';
        circle.style.fill = '#16213E';
      }
      
      // Animate paths with preserved styling
      paths.forEach((path, index) => {
        setTimeout(() => {
          path.style.animation = 'draw-line 2s ease-out forwards';
          
          // Keep paths as strokes only (no fill for M letters)
          if (index === 0) {
            // Hexagon outline - keep as stroke only
            setTimeout(() => {
              path.style.stroke = '#16213E';
              path.style.fill = 'transparent';
            }, 1800);
          } else {
            // M letter paths - keep as strokes
            setTimeout(() => {
              path.style.stroke = '#16213E';
              path.style.fill = 'transparent';
              path.style.strokeWidth = '20';
            }, 1800);
          }
        }, index * 300);
      });
      
      // Animate circle (moon) with lunar phases effect
      if (circle) {
        setTimeout(() => {
          circle.style.animation = 'lunar-phase 2.5s ease-out forwards';
          // Add subtle pulsing animation after initial animation
          setTimeout(() => {
            circle.style.animation = 'lunar-pulse 4s ease-in-out infinite';
          }, 2500);
        }, 1500);
      }

      // Enhanced hover animations
      const container = containerRef.current;
      if (container) {
        container.addEventListener('mouseenter', () => {
          if (circle) {
            circle.style.transform = 'scale(1.1)';
            circle.style.transition = 'transform 0.5s ease-out';
            circle.style.filter = 'drop-shadow(0 0 8px rgba(0, 153, 255, 0.6))';
          }
          
          paths.forEach((path, index) => {
            path.style.transition = 'all 0.5s ease-out';
            path.style.transformOrigin = 'center';
            if (index === 0) {
              // Hexagon - subtle rotation
              path.style.transform = 'rotate(2deg)';
            } else {
              // M letters - slight glow effect
              path.style.filter = 'drop-shadow(0 0 4px rgba(22, 33, 62, 0.3))';
            }
          });
        });
        
        container.addEventListener('mouseleave', () => {
          if (circle) {
            circle.style.transform = 'scale(1)';
            circle.style.filter = 'none';
          }
          
          paths.forEach((path) => {
            path.style.transform = 'rotate(0deg)';
            path.style.filter = 'none';
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
      
      {/* Enhanced particle system */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="particles-container orbital-particles"></div>
      </div>
      
      {/* Moonlight beam effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="moonlight-beam"></div>
      </div>
    </div>
  );
};

export default LogoAnimation;
