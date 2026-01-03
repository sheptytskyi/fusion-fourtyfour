import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const progressBar = progressBarRef.current;
    const text = textRef.current;

    if (!loader || !progressBar || !text) return;

    // Initial state
    gsap.set(text, { opacity: 0, y: 30 });
    gsap.set(progressBar, { width: '0%' });

    // Create timeline
    const tl = gsap.timeline();

    // Text animation
    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
    
    // Progress bar animation
    .to(progressBar, {
      width: '100%',
      duration: 2,
      ease: 'power2.out',
      delay: 0.3
    })
    
    // Complete animation after progress finishes
    .to(loader, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    });

    // Fallback timeout to ensure loader doesn't freeze
    const fallbackTimeout = setTimeout(() => {
      if (loader && loader.style.opacity !== '0') {
        onComplete();
      }
    }, 4000);

    return () => {
      tl.kill();
      clearTimeout(fallbackTimeout);
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="preloader">
      <div 
        ref={textRef} 
        className="text-6xl md:text-6xl font-jetbrains font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              text-transparent bg-clip-text mb-8 tracking-wider"
      >
        44 fingers
      </div>
      
      <div className="progress-container">
        <div ref={progressBarRef} className="progress-bar"></div>
      </div>
      
      <div className="text-sm font-mono text-foreground/60 mt-4 tracking-widest">
        LOADING EXPERIENCE...
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full floating opacity-60" style={{background: 'hsl(var(--neon-blue))'}}></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 rounded-full floating-delayed opacity-40" style={{background: 'hsl(var(--neon-purple))'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full floating opacity-80" style={{background: 'hsl(var(--neon-orange))'}}></div>
    </div>
  );
};

export default Loader;