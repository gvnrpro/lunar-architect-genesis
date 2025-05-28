
import { useEffect, RefObject } from 'react';

export const useOptimizedScroll = (sectionRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealElements = entry.target.querySelectorAll('.reveal-on-scroll:not(.revealed)');
            revealElements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('revealed');
              }, index * 100);
            });
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );
    
    const revealElements = sectionRef.current.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [sectionRef]);
};
