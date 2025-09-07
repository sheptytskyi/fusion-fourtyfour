import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParallaxElement {
  ref: React.RefObject<HTMLDivElement>;
  speed: number;
  rotation?: boolean;
}

export const useMouseParallax = (elements: ParallaxElement[]) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      elements.forEach(({ ref, speed, rotation }) => {
        if (ref.current) {
          const moveX = x * speed * 20;
          const moveY = y * speed * 20;
          
          if (rotation) {
            gsap.to(ref.current, {
              x: moveX,
              y: moveY,
              rotation: x * speed * 10,
              duration: 0.3,
              ease: 'power2.out'
            });
          } else {
            gsap.to(ref.current, {
              x: moveX,
              y: moveY,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        }
      });
    };

    const handleMouseLeave = () => {
      elements.forEach(({ ref }) => {
        if (ref.current) {
          gsap.to(ref.current, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elements]);

  return containerRef;
};