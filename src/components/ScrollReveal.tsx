
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
  cascade?: boolean;
  cascadeDelay?: number;
  fadeOnly?: boolean;
  classNames?: string;
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
  stagger = false,
  cascade = false,
  cascadeDelay = 100,
  fadeOnly = false,
  classNames = ''
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    // Set initial styles based on direction
    const initialStyles: Record<string, string> = {
      opacity: '0',
      transition: `opacity ${duration}ms ${easing}${fadeOnly ? '' : `, transform ${duration}ms ${easing}`}`,
      transitionDelay: `${delay}ms`,
    };
    
    if (!fadeOnly) {
      initialStyles.transform = `translate${direction === 'up' || direction === 'down' ? 'Y' : 'X'}(${direction === 'down' || direction === 'right' ? distance : -distance}px)`;
    }
    
    Object.assign(element.style, initialStyles);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !isRevealed)) {
            // Apply revealed styles
            const revealedStyles = {
              opacity: '1',
              transform: fadeOnly ? undefined : 'translate(0, 0)',
            };
            
            setTimeout(() => {
              Object.assign(element.style, revealedStyles);
              setIsRevealed(true);
              
              // Handle staggered or cascading children animation
              if (stagger || cascade) {
                const children = Array.from(element.children);
                children.forEach((child, index) => {
                  const childEl = child as HTMLElement;
                  childEl.style.opacity = '0';
                  
                  if (!fadeOnly) {
                    childEl.style.transform = `translate${direction === 'up' || direction === 'down' ? 'Y' : 'X'}(${direction === 'down' || direction === 'right' ? distance/2 : -distance/2}px)`;
                  }
                  
                  childEl.style.transition = `opacity ${duration}ms ${easing}${fadeOnly ? '' : `, transform ${duration}ms ${easing}`}`;
                  
                  // Different delay calculation for stagger vs cascade
                  const itemDelay = cascade 
                    ? delay + (index * cascadeDelay) 
                    : delay + (index * 100);
                    
                  childEl.style.transitionDelay = `${itemDelay}ms`;
                  
                  setTimeout(() => {
                    childEl.style.opacity = '1';
                    if (!fadeOnly) {
                      childEl.style.transform = 'translate(0, 0)';
                    }
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
  }, [delay, direction, distance, duration, easing, once, threshold, isRevealed, stagger, cascade, cascadeDelay, fadeOnly]);
  
  return (
    <div ref={elementRef} className={`reveal-element ${classNames}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
