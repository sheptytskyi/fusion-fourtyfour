import { useEffect, useRef } from 'react';
import { SiPython, SiGoland, SiKotlin, SiSwift, SiFlutter, SiNodedotjs } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../AnimatedBackground';



gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const icons = iconsRef.current;

    if (!section || !image || !content || !icons) return;

    // Ensure sections are visible by default
    gsap.set(section, { opacity: 1, y: 0, filter: 'blur(0px)' });
    gsap.set(image, { opacity: 1, x: 0 });
    gsap.set(content, { opacity: 1, y: 0 });
    gsap.set(icons.children, { opacity: 1, y: 0 });

    // Check if section is already in viewport - if not, hide and animate
    const rect = section.getBoundingClientRect();
    const isBelowViewport = rect.top > window.innerHeight * 0.5;

    if (isBelowViewport) {
      // Only animate if section is below viewport
      gsap.set(section, { opacity: 0, y: 60, filter: 'blur(10px)' });
      gsap.set(image, { opacity: 0, x: -100 });
      gsap.set(content, { opacity: 0, y: 50 });
      gsap.set(icons.children, { opacity: 0, y: 30 });
    }

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Section fade + blur-clear + slide-up
    tl.to(section, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power2.out'
    })

      // Image enters from left  
      .to(image, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=1.2')

      // Content appears
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.8')

      // Icons appear staggered
      .to(icons.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
      }, '-=0.4');

    // Fallback: ensure section is visible after 2 seconds if ScrollTrigger didn't fire
    const fallbackTimeout = setTimeout(() => {
      if (section && window.getComputedStyle(section).opacity === '0') {
        gsap.to([section, image, content, icons.children], {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    }, 2000);

    return () => {
      clearTimeout(fallbackTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-light min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-16 md:py-20 relative overflow-hidden snap-start"
    >
      <AnimatedBackground variant="light" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Image and Text Description in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-stretch mb-12 md:mb-16">
          {/* Left side - Team Image */}
          <div ref={imageRef} className="relative lg:col-span-3 flex">
            <div
              className="relative w-full h-full rounded-glass overflow-hidden glass group cursor-pointer"
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) gsap.to(img, { scale: 1.1, duration: 0.8, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) gsap.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' });
              }}
            >
              <img
                src="/team.webp"
                alt="44 Fingers Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div ref={contentRef} className="space-y-6 md:space-y-8 lg:col-span-2">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-space font-bold text-light-fg mb-4 md:mb-6">
                WHO WE <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                text-transparent bg-clip-text">ARE</span>
              </h2>
              <p className="text-base md:text-lg lg:text-s font-space font-light text-light-fg/70 leading-relaxed">
                We help businesses build digital products that actually make sense.
              </p>
              <p className="text-base md:text-lg lg:text-s font-space font-light text-light-fg/70 leading-relaxed mt-3 md:mt-4">
                44fingers is a small, focused mobile team. We work with founders and companies to turn ideas into mobile apps that solve real problems and help the business grow.
              </p>
              <p className="text-base md:text-lg lg:text-s font-space font-light text-light-fg/70 leading-relaxed mt-3 md:mt-4">
                We care about clarity, honest communication, and results without buzzwords or unnecessary features. We think about users, business goals, and long-term growth before writing code.
              </p>
              <p className="text-base md:text-lg lg:text-s font-space font-light text-light-fg/70 leading-relaxed mt-3 md:mt-4">
                We don’t just build apps. <br></br>
                We build products that move businesses forward.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-neon-blue rounded-full opacity-30 floating"></div>
      <div className="absolute bottom-20 right-20 w-3 h-3 bg-neon-purple rounded-full opacity-20 floating-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-neon-orange rounded-full opacity-40 floating"></div>
    </section>
  );
};

export default AboutSection;