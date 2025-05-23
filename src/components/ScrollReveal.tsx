
import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  easing?: string;
  threshold?: number;
  once?: boolean;
  stagger?: boolean;
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 700,
  easing = 'cubic-bezier(0.5, 0, 0, 1)',
  threshold = 0.1,
  once = true,
  stagger = false
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    // Set initial styles based on direction
    const initialStyles: Record<string, string> = {
      opacity: '0',
      transform: `translate${direction === 'up' || direction === 'down' ? 'Y' : 'X'}(${direction === 'down' || direction === 'right' ? distance : -distance}px)`,
      transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
      transitionDelay: `${delay}ms`,
    };
    
    Object.assign(element.style, initialStyles);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !isRevealed)) {
            // Apply revealed styles
            const revealedStyles = {
              opacity: '1',
              transform: 'translate(0, 0)',
            };
            
            setTimeout(() => {
              Object.assign(element.style, revealedStyles);
              setIsRevealed(true);
              
              // Handle staggered children animation
              if (stagger) {
                const children = Array.from(element.children);
                children.forEach((child, index) => {
                  const childEl = child as HTMLElement;
                  childEl.style.opacity = '0';
                  childEl.style.transform = `translate${direction === 'up' || direction === 'down' ? 'Y' : 'X'}(${direction === 'down' || direction === 'right' ? distance/2 : -distance/2}px)`;
                  childEl.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
                  childEl.style.transitionDelay = `${delay + (index * 100)}ms`;
                  
                  setTimeout(() => {
                    childEl.style.opacity = '1';
                    childEl.style.transform = 'translate(0, 0)';
                  }, 50);
                });
              }
            }, 50);
            
            if (once) {
              observer.unobserve(element);
            }
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, direction, distance, duration, easing, once, threshold, isRevealed, stagger]);
  
  return (
    <div ref={elementRef} className="reveal-element">
      {children}
    </div>
  );
};

export default ScrollReveal;
