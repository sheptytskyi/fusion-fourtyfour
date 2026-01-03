import { useEffect, useRef } from 'react';
import { SiPython, SiGoland, SiJavascript, SiShopify, SiSwift, SiPhp, SiFlutter, SiNodedotjs } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../AnimatedBackground';

// Tech stack icons (using simple SVG paths for now)
const techStack = [
  { 
    name: "Python", 
    icon: SiPython, 
    color: "linear-gradient(135deg, #008cffff, #28527A)" 
  },
  { 
    name: "Go", 
    icon: SiGoland, 
    color: "linear-gradient(135deg, #00ccffff, #0099bfff)" 
  },
  { 
    name: "NodeJS", 
    icon: SiNodedotjs, 
    color: "linear-gradient(135deg, #a6ff00ff, #398b03ff)" 
  },
  { 
    name: "Flutter", 
    icon: SiFlutter, 
    color: "linear-gradient(135deg, #008CFF, #00BFFF)" 
  },
  { 
    name: "Shopify", 
    icon: SiShopify, 
    color: "linear-gradient(135deg, #a6ff00ff, #398b03ff)" 
  },
  { 
    name: "Swift", 
    icon: SiSwift, 
    color: "linear-gradient(135deg, #FA7343, #FF4E00)" 
  },
  { 
    name: "PHP", 
    icon: SiPhp, 
    color: "linear-gradient(135deg, #777BB4, #5A5E9A)" 
  },
];


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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        {/* Left side - Team Image */}
        <div ref={imageRef} className="relative">
          <div className="relative w-full h-96 md:h-[500px] rounded-glass overflow-hidden glass-card group">
            <img 
             src="/team.png"
              alt="44 Fingers Team"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-neon opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-neon rounded-glass opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
          </div>
        </div>

        {/* Right side - Content */}
        <div ref={contentRef} className="space-y-6 md:space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-jetbrains font-bold text-light-fg mb-4 md:mb-6">
              WHO WE <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              text-transparent bg-clip-text">ARE</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl font-jetbrains font-light text-light-fg/70 leading-relaxed">
              With 7+ years of experience, 220+ projects delivered across 15+ countries, we help businesses turn ideas into digital solutions that drive real results.
            </p>
            <p className="text-base md:text-lg lg:text-xl font-jetbrains font-light text-light-fg/70 leading-relaxed mt-3 md:mt-4">
              Our mission is simple — to make you stand out and stay ahead of competitors through technology, creativity, and smart strategy.
            </p>
          </div>

          {/* Tech Stack Icons */}
          <div>
            <h3 className="text-lg md:text-xl font-jetbrains font-medium text-light-fg mb-4 md:mb-6 tracking-wider">
              OUR TECH STACK
            </h3>
            <div
            ref={iconsRef}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-4"
          >
            {techStack.map((tech) => {
              const IconComponent = tech.icon;
              const isJs = tech.name === "JS"; // перевірка на JS

              return (
                <div
                  key={tech.name}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden p-[1px]"
                  style={{
                    background: `${tech.color}`,
                  }}
                >
                  {/* glass card inside with gradient border */}
                  <div className="flex flex-col items-center justify-center aspect-square rounded-2xl p-2 md:p-4 transition-transform duration-500 group-hover:scale-105">
                    <IconComponent
                      size={24}
                      className="mb-1 md:mb-2 md:w-8 md:h-8"
                      color={isJs ? "grey" : "white"} // іконка чорна для JS
                    />
                    <span
                      className={`text-xs font-jetbrains text-center font-bold ${
                        isJs ? "text-black" : "text-white"
                      }`}
                    >
                      {tech.name}
                    </span>
                  </div>
                </div>
              );
            })}
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