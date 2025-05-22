
import { useEffect, useRef } from 'react';

const LogoAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
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
      }
      
      // Animate paths
      paths.forEach((path, index) => {
        setTimeout(() => {
          path.style.animation = 'draw-line 1.5s ease-out forwards';
          
          // Fill after drawing
          setTimeout(() => {
            path.style.fill = '#16213E';
          }, 1200);
        }, index * 300);
      });
      
      // Animate circle
      if (circle) {
        setTimeout(() => {
          circle.style.animation = 'fade-in 0.8s ease-out forwards';
        }, 1500);
      }
    }
  }, []);

  return (
    <svg 
      ref={svgRef}
      width="200" 
      height="200" 
      viewBox="0 0 600 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
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
  );
};

export default LogoAnimation;
