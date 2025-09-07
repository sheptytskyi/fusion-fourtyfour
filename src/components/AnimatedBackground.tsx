import { useRef } from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';

interface AnimatedBackgroundProps {
  variant?: 'light' | 'gray' | 'dark';
}

const AnimatedBackground = ({ variant = 'light' }: AnimatedBackgroundProps) => {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const particle1Ref = useRef<HTMLDivElement>(null);
  const particle2Ref = useRef<HTMLDivElement>(null);
  const particle3Ref = useRef<HTMLDivElement>(null);

  const containerRef = useMouseParallax([
    { ref: shape1Ref, speed: 1, rotation: true },
    { ref: shape2Ref, speed: 1.5, rotation: true },
    { ref: shape3Ref, speed: 0.8 },
    { ref: line1Ref, speed: 0.5 },
    { ref: line2Ref, speed: 0.7 },
    { ref: particle1Ref, speed: 2 },
    { ref: particle2Ref, speed: 1.2 },
    { ref: particle3Ref, speed: 1.8 }
  ]);

  const getColors = () => {
    switch (variant) {
      case 'gray':
        return {
          primary: 'hsl(var(--neon-blue))',
          secondary: 'hsl(var(--neon-purple))',
          accent: 'hsl(var(--neon-orange))'
        };
      case 'dark':
        return {
          primary: 'hsl(var(--neon-purple))',
          secondary: 'hsl(var(--neon-red))',
          accent: 'hsl(var(--neon-blue))'
        };
      default:
        return {
          primary: 'hsl(var(--neon-blue))',
          secondary: 'hsl(var(--neon-purple))',
          accent: 'hsl(var(--neon-orange))'
        };
    }
  };

  const colors = getColors();

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Shapes */}
      <div
        ref={shape1Ref}
        className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-10 animate-floating"
        style={{
          background: `linear-gradient(45deg, ${colors.primary}, transparent)`,
          filter: 'blur(20px)'
        }}
      />
      
      <div
        ref={shape2Ref}
        className="absolute bottom-40 right-32 w-24 h-24 opacity-15 animate-floating-delayed"
        style={{
          background: `linear-gradient(135deg, ${colors.secondary}, transparent)`,
          filter: 'blur(15px)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      />
      
      <div
        ref={shape3Ref}
        className="absolute top-1/2 left-1/4 w-20 h-20 opacity-12 animate-floating"
        style={{
          background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
          filter: 'blur(10px)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
        }}
      />

      {/* Animated Lines */}
      <div
        ref={line1Ref}
        className="absolute top-1/3 left-0 w-full h-px opacity-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
          transform: 'rotate(-15deg)'
        }}
      />
      
      <div
        ref={line2Ref}
        className="absolute bottom-1/3 right-0 w-full h-px opacity-15"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)`,
          transform: 'rotate(25deg)'
        }}
      />

      {/* Floating Particles */}
      <div
        ref={particle1Ref}
        className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full opacity-30 animate-floating"
        style={{ background: colors.primary }}
      />
      
      <div
        ref={particle2Ref}
        className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full opacity-40 animate-floating-delayed"
        style={{ background: colors.accent }}
      />
      
      <div
        ref={particle3Ref}
        className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full opacity-25 animate-floating"
        style={{ background: colors.secondary }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primary} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;