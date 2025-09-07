import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroSectionProps {
  onGrowWithUsClick: () => void;
}

const HeroSection = ({ onGrowWithUsClick }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const techStack = techStackRef.current;
    const cta = ctaRef.current;
    const spline = splineRef.current;

    if (!hero || !headline || !subtitle || !techStack || !cta || !spline) return;

    // Set initial states
    gsap.set([headline, subtitle, techStack, cta], { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set(spline, { opacity: 0, x: 100 });

    // Create timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate headline
    tl.to(headline, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    })
    
    // Animate tech stack
    .to(techStack, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.8')
    
    // Animate subtitle
    .to(subtitle, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.4')
    
    // Animate CTA
    .to(cta, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6')
    
    // Animate Spline
    .to(spline, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');

    // CTA hover animation
    const handleCTAHover = () => {
      gsap.to(cta, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    };

    const handleCTALeave = () => {
      gsap.to(cta, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    cta.addEventListener('mouseenter', handleCTAHover);
    cta.addEventListener('mouseleave', handleCTALeave);

    // Floating orbs animation
    const orbs = hero.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        y: -30,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.5
      });
    });

    return () => {
      tl.kill();
      cta.removeEventListener('mouseenter', handleCTAHover);
      cta.removeEventListener('mouseleave', handleCTALeave);
    };
  }, []);

  // Lazy load Spline after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const iframe = document.getElementById('spline-iframe') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = 'https://my.spline.design/boxeshover-KTp2w2sS2EjmPOLo0XCIdxvL/';
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="relative h-screen flex items-center justify-between px-8 md:px-16 overflow-hidden"
      style={{ backgroundColor: '#000' }}
    >
      {/* Spline 3D Background */}
      <div ref={splineRef} className="absolute inset-0 z-0">
        <iframe 
          id="spline-iframe"
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full"
        />
      </div>

      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* Left side - Headline */}
      <div className="relative z-20 flex flex-col justify-end h-full pb-20 max-w-2xl">
        <div ref={headlineRef} className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-jetbrains font-bold text-white leading-tight tracking-tight">
            STAY AHEAD OF YOUR
            <span className="block neon-text">COMPETITORS</span>
          </h1>
        </div>
        
        <div ref={techStackRef} className="mb-8">
          <p className="text-lg md:text-xl font-jetbrains font-light text-white/70 tracking-widest">
            AI \ MOBILE \ WEB \ CRYPTO
          </p>
        </div>
      </div>

      {/* Right side - Subtitle and CTA */}
      <div className="relative z-20 flex flex-col justify-end h-full pb-20 max-w-lg">
        <div ref={subtitleRef} className="mb-8">
          <p className="text-lg md:text-xl font-jetbrains font-light text-white/80 leading-relaxed">
            We design and develop digital products that help you scale faster and dominate your industry while others try to catch up.
          </p>
        </div>
        
        <button
          ref={ctaRef}
          onClick={onGrowWithUsClick}
          className="btn-neon font-jetbrains text-sm tracking-widest self-start"
        >
          GROW WITH US
        </button>
      </div>

      {/* Floating neon orbs */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-neon-blue rounded-full floating-orb opacity-60 z-15"></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-neon-purple rounded-full floating-orb opacity-40 z-15"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-neon-orange rounded-full floating-orb opacity-80 z-15"></div>
      <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-neon-red rounded-full floating-orb opacity-50 z-15"></div>
    </section>
  );
};

export default HeroSection;