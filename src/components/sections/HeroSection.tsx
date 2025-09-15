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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle responsive Spline positioning
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
  
    const updateSplineTransform = () => {
      if (window.innerWidth < 768) {
        // Mobile: зменшена модель без обрізання
        const scaleFactor = 0.3; // обираєш масштаб
        const width = 150 / scaleFactor; // робимо ширше для зменшення моделі
        const height = 100 / scaleFactor;
  
        iframe.style.position = 'absolute';
        iframe.style.left = `${-(width - 50) / 2}vw`; // центруємо по горизонталі
        iframe.style.top = `${-(height - 250) / 2}dvh`; // центруємо по вертикалі
        iframe.style.width = `${width}vw`;
        iframe.style.height = `${height}dvh`;
        iframe.style.transform = 'none';
        iframe.style.transformOrigin = 'center center';
        iframe.style.margin = '0';
      } else {
        // Desktop: стандартне положення
        iframe.style.position = 'relative';
        iframe.style.left = 'auto';
        iframe.style.top = 'auto';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.transform = 'scale(1)';
        iframe.style.transformOrigin = 'center center';
        iframe.style.margin = '0';
      }
    };
  
    updateSplineTransform();
    window.addEventListener('resize', updateSplineTransform);
  
    return () => {
      window.removeEventListener('resize', updateSplineTransform);
    };
  }, []);
  

  // GSAP animation
  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const techStack = techStackRef.current;
    const cta = ctaRef.current;
    const spline = splineRef.current;

    if (!hero || !headline || !subtitle || !techStack || !cta || !spline) return;

    gsap.set([headline, subtitle, techStack, cta], { opacity: 0, y: 50, filter: 'blur(10px)' });
    gsap.set(spline, { opacity: 0, x: 100 });

    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(headline, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' })
      .to(techStack, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, '-=0.8')
      .to(subtitle, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }, '-=0.4')
      .to(cta, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .to(spline, { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }, '-=1');

    const handleCTAHover = () => gsap.to(cta, { scale: 1.05, duration: 0.3, ease: 'power2.out', repeat: -1, yoyo: true });
    const handleCTALeave = () => { gsap.killTweensOf(cta); gsap.to(cta, { scale: 1, duration: 0.3, ease: 'power2.out' }); };

    cta.addEventListener('mouseenter', handleCTAHover);
    cta.addEventListener('mouseleave', handleCTALeave);

    const orbs = hero.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
      gsap.to(orb, { y: -30, duration: 4 + index, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: index * 0.5 });
    });

    return () => {
      tl.kill();
      cta.removeEventListener('mouseenter', handleCTAHover);
      cta.removeEventListener('mouseleave', handleCTALeave);
    };
  }, []);

  // Spline mouse interaction
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'Spline.ready') {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = iframe.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          iframe.contentWindow?.postMessage({ type: 'mouseMove', x, y }, '*');
        };

        const handleMouseEnterLeave = (type: 'mouseEnter' | 'mouseLeave') => {
          iframe.contentWindow?.postMessage({ type }, '*');
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseenter', () => handleMouseEnterLeave('mouseEnter'));
        window.addEventListener('mouseleave', () => handleMouseEnterLeave('mouseLeave'));

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseenter', () => handleMouseEnterLeave('mouseEnter'));
          window.removeEventListener('mouseleave', () => handleMouseEnterLeave('mouseLeave'));
        };
      }
    };

    window.addEventListener('message', handleMessage);

    // Lazy load Spline                             
    const timer = setTimeout(() => { iframe.src = 'https://my.spline.design/worldplanet-jU7yqiRaHhcnNY4EcyCYHnBr/'; }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden snap-start" style={{ backgroundColor: '#000' }}>
      
      {/* Spline 3D Background */}
      <div ref={splineRef} className="absolute inset-0 z-0">
  {/* Spline iframe як фон */}
  <iframe
    id="spline-iframe"
    ref={iframeRef}
    frameBorder="0"
    className="absolute inset-0 w-full h-[100dvh] md:h-screen block"
  />

  {/* Чорний блок для водяного знака */}
  <div
    className="hidden md:block"
    style={{
      position: 'absolute',
      bottom: 15,
      right: 10,
      width: 145,
      height: 45,
      backgroundColor: 'black',
      pointerEvents: 'none',
      zIndex: 5,
    }}
  />
</div>

{/* Overlay */}
<div className="absolute inset-0 bg-black/30 z-10"></div>

{/* Content */}
<div className="relative z-20 text-center max-w-4xl px-2">
  <div ref={headlineRef} className="mb-4 md:mb-6">
    <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-jetbrains font-bold leading-tight tracking-tight text-center text-white">
      <span>STAY AHEAD OF YOUR</span>
      <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        {" "}
        COMPETITORS
      </span>
    </h1>
  </div>


        <div ref={techStackRef} className="mb-6 md:mb-8">
          <p className="text-sm sm:text-base md:text-lg font-jetbrains font-light leading-relaxed text-center text-white tracking-widest">
            AI \ MOBILE \ WEB \ CRYPTO
          </p>
        </div>

        <div ref={subtitleRef} className="mb-6 md:mb-8 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-jetbrains font-light leading-relaxed text-center text-white">
            We design and develop digital products that help you scale faster and dominate your industry while others try to catch up.
          </p>
        </div>

        <button ref={ctaRef} onClick={onGrowWithUsClick} className="btn-neon font-jetbrains text-xs sm:text-sm tracking-widest mx-auto block">
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
