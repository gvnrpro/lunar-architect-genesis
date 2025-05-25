
import { useEffect, useRef, useState } from 'react';

interface LogoAnimationProps {
  onAnimationComplete?: () => void;
}

const LogoAnimation = ({ onAnimationComplete }: LogoAnimationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'animating' | 'complete'>('idle');
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check device and motion preferences
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    checkMobile();
    setPrefersReducedMotion(motionQuery.matches);
    
    window.addEventListener('resize', checkMobile);
    motionQuery.addEventListener('change', (e) => setPrefersReducedMotion(e.matches));

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', (e) => setPrefersReducedMotion(e.matches));
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimationState('complete');
      onAnimationComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setAnimationState('animating');
      startAnimation();
    }, 300);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, onAnimationComplete]);

  const startAnimation = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('path');
    const circle = svg.querySelector('circle');

    // Calculate and set proper stroke-dasharray for each path
    paths.forEach((path, index) => {
      const element = path as SVGPathElement;
      const length = element.getTotalLength();
      
      element.style.strokeDasharray = `${length}`;
      element.style.strokeDashoffset = `${length}`;
      element.style.fill = 'transparent';
      element.style.stroke = '#16213E';
      element.style.strokeWidth = index === 0 ? '15' : '20';
      element.style.willChange = 'stroke-dashoffset';
    });

    // Prepare circle
    if (circle) {
      const circleElement = circle as SVGCircleElement;
      circleElement.style.opacity = '0';
      circleElement.style.transform = 'scale(0.8)';
      circleElement.style.willChange = 'opacity, transform';
    }

    // Animate paths sequentially
    paths.forEach((path, index) => {
      setTimeout(() => {
        const element = path as SVGPathElement;
        element.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.strokeDashoffset = '0';
      }, index * 150);
    });

    // Animate circle last
    if (circle) {
      setTimeout(() => {
        const circleElement = circle as SVGCircleElement;
        circleElement.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        circleElement.style.opacity = '1';
        circleElement.style.transform = 'scale(1)';
        
        // Mark animation as complete
        setTimeout(() => {
          setAnimationState('complete');
          onAnimationComplete?.();
          
          // Add gentle pulse animation
          if (!isMobile) {
            circleElement.style.animation = 'lunar-pulse 4s ease-in-out infinite';
          }
        }, 800);
      }, 1200);
    }
  };

  const handleInteraction = () => {
    if (isMobile || animationState !== 'complete') return;
    
    const svg = svgRef.current;
    if (!svg) return;

    const circle = svg.querySelector('circle') as SVGCircleElement;
    const paths = svg.querySelectorAll('path');
    
    if (circle) {
      circle.style.transform = 'scale(1.05)';
      circle.style.filter = 'drop-shadow(0 0 12px rgba(0, 153, 255, 0.4))';
    }
    
    paths.forEach((path) => {
      const element = path as SVGPathElement;
      element.style.filter = 'drop-shadow(0 0 4px rgba(22, 33, 62, 0.2))';
    });
  };

  const handleInteractionEnd = () => {
    if (isMobile || animationState !== 'complete') return;
    
    const svg = svgRef.current;
    if (!svg) return;

    const circle = svg.querySelector('circle') as SVGCircleElement;
    const paths = svg.querySelectorAll('path');
    
    if (circle) {
      circle.style.transform = 'scale(1)';
      circle.style.filter = 'none';
    }
    
    paths.forEach((path) => {
      const element = path as SVGPathElement;
      element.style.filter = 'none';
    });
  };

  const logoSize = isMobile ? 120 : 180;

  return (
    <div 
      className="logo-container relative mx-auto touch-button"
      style={{ width: logoSize, height: logoSize }}
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteraction}
      onTouchEnd={handleInteractionEnd}
    >
      <svg 
        ref={svgRef}
        width={logoSize} 
        height={logoSize} 
        viewBox="0 0 600 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto transition-transform duration-300 ${
          animationState === 'complete' && !isMobile ? 'hover:scale-105' : ''
        }`}
        aria-label="Moonscape Holdings Logo"
        role="img"
      >
        {/* Hexagon outline */}
        <path 
          d="M300 50L550 175V425L300 550L50 425V175L300 50Z" 
          className={animationState === 'idle' ? 'opacity-0' : 'opacity-100'}
        />
        
        {/* M left vertical */}
        <path 
          d="M150 175V425" 
          className={animationState === 'idle' ? 'opacity-0' : 'opacity-100'}
        />
        
        {/* M right vertical */}
        <path 
          d="M450 175V425" 
          className={animationState === 'idle' ? 'opacity-0' : 'opacity-100'}
        />
        
        {/* M middle diagonal left */}
        <path 
          d="M150 175L300 325" 
          className={animationState === 'idle' ? 'opacity-0' : 'opacity-100'}
        />
        
        {/* M middle diagonal right */}
        <path 
          d="M450 175L300 325" 
          className={animationState === 'idle' ? 'opacity-0' : 'opacity-100'}
        />
        
        {/* Circle (moon) */}
        <circle 
          cx="300" 
          cy="175" 
          r="70" 
          fill="#16213E"
          className={animationState === 'idle' ? 'opacity-0' : ''}
        />
      </svg>
      
      {/* Loading indicator for mobile */}
      {animationState === 'animating' && isMobile && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-moonscape-accent rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default LogoAnimation;
