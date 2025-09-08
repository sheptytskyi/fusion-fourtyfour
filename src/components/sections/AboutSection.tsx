import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../AnimatedBackground';

// Tech stack icons (using simple SVG paths for now)
const techStack = [
  { name: 'Python', color: '#3776ab' },
  { name: 'Golang', color: '#00add8' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'C#', color: '#239120' },
  { name: 'Shopify', color: '#7ab55c' },
  { name: 'Swift', color: '#fa7343' },
  { name: 'PHP', color: '#777bb4' },
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

    // Set initial states - fade + slide-up + blur
    gsap.set(section, { opacity: 0, y: 60, filter: 'blur(10px)' });
    gsap.set(image, { opacity: 0, x: -100 });
    gsap.set(content, { opacity: 0, y: 50 });
    gsap.set(icons.children, { opacity: 0, y: 30 });

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="section-light min-h-screen flex items-center px-8 md:px-16 py-20 relative overflow-hidden snap-start"
    >
      <AnimatedBackground variant="light" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left side - Team Image */}
        <div ref={imageRef} className="relative">
          <div className="relative w-full h-96 md:h-[500px] rounded-glass overflow-hidden glass-card group">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=faces"
              alt="44 Fingers Team"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-neon opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-neon rounded-glass opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
          </div>
        </div>

        {/* Right side - Content */}
        <div ref={contentRef} className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-jetbrains font-bold text-light-fg mb-6">
              WHO WE <span className="neon-text">ARE</span>
            </h2>
            <p className="text-lg md:text-xl font-jetbrains font-light text-light-fg/70 leading-relaxed">
              With 7+ years of experience, 220+ projects delivered across 15+ countries, we help businesses turn ideas into digital solutions that drive real results.
            </p>
            <p className="text-lg md:text-xl font-jetbrains font-light text-light-fg/70 leading-relaxed mt-4">
              Our mission is simple — to make you stand out and stay ahead of competitors through technology, creativity, and smart strategy.
            </p>
          </div>

          {/* Tech Stack Icons */}
          <div>
            <h3 className="text-xl font-jetbrains font-medium text-light-fg mb-6 tracking-wider">
              OUR TECH STACK
            </h3>
            <div ref={iconsRef} className="grid grid-cols-4 md:grid-cols-7 gap-4">
              {techStack.map((tech, index) => (
                <div 
                  key={tech.name}
                  className="glass-card p-4 flex flex-col items-center justify-center aspect-square group cursor-pointer"
                >
                  <div 
                    className="w-8 h-8 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: tech.color }}
                  ></div>
                  <span className="text-xs font-jetbrains text-light-fg/60 text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
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