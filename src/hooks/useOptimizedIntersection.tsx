
import { useEffect, useRef, useState } from 'react';

interface UseOptimizedIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export const useOptimizedIntersection = ({
  threshold = 0.1,
  rootMargin = '50px 0px -50px 0px',
  once = true,
  delay = 0
}: UseOptimizedIntersectionOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
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
    }, 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer);
            if (delay > 0) {
              setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
            
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once, delay]);

  return { elementRef, isVisible, shouldAnimate };
};
