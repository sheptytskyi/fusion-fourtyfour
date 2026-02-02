import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const glow = glowRef.current;
    if (!glow) return;

    // Use quickSetter for high-performance updates
    const xSetter = gsap.quickSetter(glow, "x", "px");
    const ySetter = gsap.quickSetter(glow, "y", "px");

    // Hide initially
    gsap.set(glow, { opacity: 0, xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      // Use quickSetter for immediate value application without overhead
      xSetter(e.clientX);
      ySetter(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(glow, { opacity: 0.6, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow"></div>;
};

export default CursorGlow;