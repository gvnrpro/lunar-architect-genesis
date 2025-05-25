
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
  distance = 20,
  duration = 600,
  threshold = 0.1,
  once = true,
  classNames = ''
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Fallback timeout to ensure content shows
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer);
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '50px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(element);
    };
  }, [delay, threshold, once]);

  const getTransform = () => {
    if (!shouldAnimate || isVisible) return 'none';
    
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return 'none';
    }
  };

  const styles = shouldAnimate ? {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  } : {
    opacity: 1,
    transform: 'none',
  };

  return (
    <div 
      ref={elementRef} 
      className={`scroll-reveal-element ${classNames}`}
      style={styles}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
