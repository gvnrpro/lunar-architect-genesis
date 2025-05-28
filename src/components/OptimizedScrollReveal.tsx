
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

const OptimizedScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 600,
  threshold = 0.1,
  once = true,
  className = ''
}: OptimizedScrollRevealProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    delay,
    once
  });

  const getTransform = () => {
    if (isVisible) return 'none';
    
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

  const styles = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    willChange: isVisible ? 'auto' : 'opacity, transform'
  };

  return (
    <div 
      ref={elementRef} 
      className={className}
      style={styles}
    >
      {children}
    </div>
  );
};

export default OptimizedScrollReveal;
