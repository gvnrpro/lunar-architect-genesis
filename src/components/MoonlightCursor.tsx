
import { useEffect, useRef } from 'react';

const MoonlightCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Create trail elements
    for (let i = 0; i < 6; i++) {
      const trail = document.createElement('div');
      trail.className = 'fixed pointer-events-none z-50 w-2 h-2 bg-moonscape-accent/20 rounded-full transition-all duration-500';
      trail.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(trail);
      trailRef.current.push(trail);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Update trail with delay
      trailRef.current.forEach((trail, index) => {
        setTimeout(() => {
          trail.style.left = `${e.clientX}px`;
          trail.style.top = `${e.clientY}px`;
          trail.style.opacity = `${(6 - index) / 6 * 0.3}`;
        }, index * 50);
      });
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    };

    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Cleanup trail elements
      trailRef.current.forEach(trail => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
      trailRef.current = [];
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 w-6 h-6 border border-moonscape-accent/50 rounded-full opacity-0 transition-all duration-200"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <div className="w-2 h-2 bg-moonscape-accent rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
    </div>
  );
};

export default MoonlightCursor;
