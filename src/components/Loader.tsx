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
      duration: 2.5,
      ease: 'power2.out',
      delay: 0.3,
      onUpdate: () => {
        // Simulate actual loading progress
        const progress = Math.round((gsap.getProperty(progressBar, 'width') as number / progressBar.parentElement!.offsetWidth) * 100);
        if (progress >= 100) {
          // Complete animation
          gsap.to(loader, {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            delay: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              onComplete();
            }
          });
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="preloader">
      <div 
        ref={textRef} 
        className="text-6xl md:text-8xl font-jetbrains font-bold neon-text mb-8 tracking-wider"
      >
        44 FINGERS
      </div>
      
      <div className="progress-container">
        <div ref={progressBarRef} className="progress-bar"></div>
      </div>
      
      <div className="text-sm font-jetbrains text-foreground/60 mt-4 tracking-widest">
        LOADING EXPERIENCE...
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-blue rounded-full floating opacity-60"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-neon-purple rounded-full floating-delayed opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-neon-orange rounded-full floating opacity-80"></div>
    </div>
  );
};

export default Loader;