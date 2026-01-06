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
  const backgroundRef = useRef<HTMLDivElement>(null);

  // GSAP animation
  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const techStack = techStackRef.current;
    const cta = ctaRef.current;
    const background = backgroundRef.current;

    if (!hero || !headline || !subtitle || !techStack || !cta || !background) return;

    gsap.set([headline, subtitle, techStack], { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set(background, { opacity: 0, x: 100 });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(headline, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' })
      .to(techStack, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, '-=0.8')
      .to(subtitle, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }, '-=0.4')
      .to(background, { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }, '-=1');

    // Fallback to ensure elements are never stuck with blur
    setTimeout(() => {
      [headline, subtitle, techStack].forEach(el => {
        if (el) {
          gsap.set(el, { filter: 'blur(0px)' });
        }
      });
    }, 3000);

    const orbs = hero.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
      gsap.to(orb, { y: -30, duration: 4 + index, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: index * 0.5 });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-start md:items-center justify-center md:justify-start px-4 md:px-8 lg:px-16 overflow-hidden snap-start pt-20 md:pt-0" style={{ backgroundColor: '#000' }}>
      
      {/* Responsive Background Images */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        {/* Phone Small - default for mobile (< 640px) */}
        <img
          src="/phone-s.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover sm:hidden"
        />
        
        {/* Phone Large - small screens (640px - 768px) */}
        <img
          src="/phone-l.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover hidden sm:block md:hidden"
        />
        
        {/* Laptop - medium screens (768px - 1024px) */}
        <img
          src="/laptop.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover hidden md:block lg:hidden"
        />
        
        {/* Desktop - large screens (1024px+) */}
        <img
          src="/desktop.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover hidden lg:block"
        />
      </div>

{/* Overlay */}
<div className="absolute inset-0 bg-black/30 z-10"></div>

{/* Content */}
<div className="relative z-20 text-center md:text-left max-w-4xl px-2">
  <div ref={headlineRef} className="mb-4 md:mb-6">
    <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-jetbrains font-bold leading-tight tracking-tight text-center md:text-left text-white">
      <span>STAY AHEAD OF YOUR</span>
      <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        {" "}
        COMPETITORS
      </span>
    </h1>
  </div>


        <div ref={techStackRef} className="mb-6 md:mb-8">
          <p className="text-sm sm:text-base md:text-lg font-jetbrains font-light leading-relaxed text-center md:text-left text-white tracking-widest">
            MOBILE \ WEB \ CRYPTO \ AI
          </p>
        </div>

        <div ref={subtitleRef} className="mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-jetbrains font-medium text-white">
            We build AI-powered mobile apps that scale — without hiring headaches
          </p>

          <p className="text-xs sm:text-sm md:text-sm lg:text-base font-jetbrains font-light text-white/80 mt-2">
            iOS, Android & cross-platform development for funded startups and growing products
          </p>
        </div>

        <button ref={ctaRef} onClick={onGrowWithUsClick} className="font-jetbrains text-xs sm:text-sm tracking-widest mx-auto md:mx-0 block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-none px-8 py-3 rounded-lg font-medium uppercase transition-all duration-300 hover:brightness-110">
          GROW WITH US
        </button>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full floating-orb opacity-60 z-15" style={{ background: 'radial-gradient(circle, #00ffff 0%, #0066ff 50%, transparent 100%)', filter: 'blur(1px)', boxShadow: '0 0 20px #00ffff, 0 0 40px #0066ff' }}></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 rounded-full floating-orb opacity-40 z-15" style={{ background: 'radial-gradient(circle, #ff00ff 0%, #6600ff 50%, transparent 100%)', filter: 'blur(2px)', boxShadow: '0 0 25px #ff00ff, 0 0 50px #6600ff' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full floating-orb opacity-80 z-15" style={{ background: 'radial-gradient(circle, #ffaa00 0%, #ff6600 50%, transparent 100%)', filter: 'blur(0.5px)', boxShadow: '0 0 15px #ffaa00, 0 0 30px #ff6600' }}></div>
      <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full floating-orb opacity-50 z-15" style={{ background: 'radial-gradient(circle, #ff0066 0%, #cc0044 50%, transparent 100%)', filter: 'blur(1px)', boxShadow: '0 0 18px #ff0066, 0 0 35px #cc0044' }}></div>
    </section>
  );
};

export default HeroSection;
