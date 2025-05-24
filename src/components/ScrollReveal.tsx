
import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  classNames?: string;
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 600,
  threshold = 0.1,
  once = true,
  classNames = ''
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeoutFallback, setTimeoutFallback] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Fallback timeout to ensure content shows after 2 seconds
    const fallbackTimer = setTimeout(() => {
      console.log('ScrollReveal fallback triggered for element');
      setTimeoutFallback(true);
      setIsRevealed(true);
    }, 2000);
    
    // Set initial styles
    const getTransform = () => {
      if (direction === 'none') return 'none';
      const axis = direction === 'up' || direction === 'down' ? 'Y' : 'X';
      const value = direction === 'down' || direction === 'right' ? distance : -distance;
      return `translate${axis}(${value}px)`;
    };
    
    Object.assign(element.style, {
      opacity: '0',
      transform: getTransform(),
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      transitionDelay: `${delay}ms`,
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !isRevealed)) {
            clearTimeout(fallbackTimer);
            console.log('ScrollReveal intersection triggered');
            
            setTimeout(() => {
              Object.assign(element.style, {
                opacity: '1',
                transform: 'translate(0, 0)',
              });
              setIsRevealed(true);
            }, 50);
            
            if (once) {
              observer.unobserve(element);
            }
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );
    
    observer.observe(element);
    
    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(element);
    };
  }, [delay, direction, distance, duration, threshold, once, isRevealed]);
  
  // Force show content if timeout fallback triggered
  useEffect(() => {
    if (timeoutFallback && elementRef.current) {
      Object.assign(elementRef.current.style, {
        opacity: '1',
        transform: 'translate(0, 0)',
      });
    }
  }, [timeoutFallback]);
  
  return (
    <div ref={elementRef} className={`scroll-reveal-element ${classNames}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
