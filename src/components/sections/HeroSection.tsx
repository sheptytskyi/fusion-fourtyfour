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
    
    // Animate Spline fades in from right
    .to(spline, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');

    // CTA hover animation with scale pulse
    const handleCTAHover = () => {
      gsap.to(cta, { 
        scale: 1.05, 
        duration: 0.3, 
        ease: 'power2.out',
        repeat: -1,
        yoyo: true
      });
    };

    const handleCTALeave = () => {
      gsap.killTweensOf(cta);
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
        iframe.src = 'https://my.spline.design/orb-6b0fiDVcWjz6a7jDbCTTtO8g/';
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="relative h-screen flex items-center justify-center px-8 md:px-16 overflow-hidden"
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
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Centered Content */}
      <div className="relative z-20 text-center max-w-4xl">
        <div ref={headlineRef} className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-jetbrains font-bold leading-tight tracking-tight text-center">
            <span className="neon-text">STAY AHEAD OF YOUR</span>
            <span className="block neon-text">COMPETITORS</span>
          </h1>
        </div>
        
        <div ref={techStackRef} className="mb-8">
          <p className="text-lg md:text-xl font-jetbrains font-light text-white/70 tracking-widest">
            AI \ MOBILE \ WEB \ CRYPTO
          </p>
        </div>

        <div ref={subtitleRef} className="mb-8 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl font-jetbrains font-light leading-relaxed text-center text-white">
            We design and develop digital products that help you scale faster and dominate your industry while others try to catch up.
          </p>
        </div>
        
        <button
          ref={ctaRef}
          onClick={onGrowWithUsClick}
          className="btn-neon font-jetbrains text-sm tracking-widest mx-auto block"
        >
          GROW WITH US
        </button>
      </div>

      {/* Floating neon orbs with enhanced glow */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full floating-orb opacity-60 z-15" 
           style={{ 
             background: 'radial-gradient(circle, #00ffff 0%, #0066ff 50%, transparent 100%)',
             filter: 'blur(1px)',
             boxShadow: '0 0 20px #00ffff, 0 0 40px #0066ff' 
           }}></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 rounded-full floating-orb opacity-40 z-15"
           style={{ 
             background: 'radial-gradient(circle, #ff00ff 0%, #6600ff 50%, transparent 100%)',
             filter: 'blur(2px)',
             boxShadow: '0 0 25px #ff00ff, 0 0 50px #6600ff' 
           }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full floating-orb opacity-80 z-15"
           style={{ 
             background: 'radial-gradient(circle, #ffaa00 0%, #ff6600 50%, transparent 100%)',
             filter: 'blur(0.5px)',
             boxShadow: '0 0 15px #ffaa00, 0 0 30px #ff6600' 
           }}></div>
      <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full floating-orb opacity-50 z-15"
           style={{ 
             background: 'radial-gradient(circle, #ff0066 0%, #cc0044 50%, transparent 100%)',
             filter: 'blur(1px)',
             boxShadow: '0 0 18px #ff0066, 0 0 35px #cc0044' 
           }}></div>
      
      {/* Additional floating glow elements */}
      <div className="absolute top-1/6 right-1/5 w-8 h-8 rounded-full floating-orb opacity-20 z-10"
           style={{ 
             background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)',
             filter: 'blur(4px)'
           }}></div>
      <div className="absolute bottom-1/6 left-1/5 w-5 h-5 rounded-full floating-orb opacity-30 z-10"
           style={{ 
             background: 'radial-gradient(circle, #8800ff 0%, transparent 70%)',
             filter: 'blur(3px)'
           }}></div>
    </section>
  );
};

export default HeroSection;