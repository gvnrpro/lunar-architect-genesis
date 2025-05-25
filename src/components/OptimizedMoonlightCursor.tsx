
import { useEffect, useRef, useCallback } from 'react';

const OptimizedMoonlightCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  const updateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Smooth interpolation for cursor
    targetPos.current.x += (mousePos.current.x - targetPos.current.x) * 0.1;
    targetPos.current.y += (mousePos.current.y - targetPos.current.y) * 0.1;

    cursor.style.transform = `translate3d(${targetPos.current.x - 12}px, ${targetPos.current.y - 12}px, 0)`;

    // Update trails with staggered positions
    trailsRef.current.forEach((trail, index) => {
      const delay = (index + 1) * 0.02;
      const trailX = targetPos.current.x + (mousePos.current.x - targetPos.current.x) * (1 - delay);
      const trailY = targetPos.current.y + (mousePos.current.y - targetPos.current.y) * (1 - delay);
      
      trail.style.transform = `translate3d(${trailX - 4}px, ${trailY - 4}px, 0)`;
      trail.style.opacity = `${(5 - index) / 5 * 0.2}`;
    });

    animationFrameRef.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    // Create optimized trail elements
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div');
      trail.className = 'fixed pointer-events-none z-40 w-2 h-2 bg-moonscape-accent/20 rounded-full will-change-transform';
      trail.style.transform = 'translate3d(-100px, -100px, 0)';
      document.body.appendChild(trail);
      trailsRef.current.push(trail);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.opacity = '0';
    };

    const handleMouseDown = () => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.transform += ' scale(0.8)';
    };

    const handleMouseUp = () => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '');
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation loop
    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup trails
      trailsRef.current.forEach(trail => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
      trailsRef.current = [];
    };
  }, [updateCursor]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 w-6 h-6 border border-moonscape-accent/50 rounded-full opacity-0 will-change-transform"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      <div className="w-2 h-2 bg-moonscape-accent rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
    </div>
  );
};

export default OptimizedMoonlightCursor;
