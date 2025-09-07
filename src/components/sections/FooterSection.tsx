import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    // Set initial state
    gsap.set(content, { opacity: 0, y: 60 });

    // ScrollTrigger animation
    gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

    // Floating particles animation
    const particles = footer.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: -40,
        duration: 4 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.3
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="footer" 
      ref={footerRef} 
      className="section-light relative py-20 px-8 md:px-16 overflow-hidden"
    >
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-bg/90 to-light-bg/70 backdrop-blur-sm"></div>
      
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-jetbrains font-bold text-light-fg neon-text mb-4">
                44 FINGERS
              </h3>
              <p className="text-light-fg/70 font-jetbrains font-light leading-relaxed max-w-md">
                Transforming ideas into digital solutions that drive real results. 
                Your success is our mission.
              </p>
            </div>
            
            <div className="space-y-2 text-light-fg/60 font-jetbrains font-light">
              <p>📧 hello@44fingers.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>🌍 Serving clients globally</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-jetbrains font-semibold text-light-fg mb-6">
              QUICK LINKS
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection('hero')}
                className="block text-light-fg/70 hover:text-neon-blue transition-colors duration-300 font-jetbrains font-light"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block text-light-fg/70 hover:text-neon-blue transition-colors duration-300 font-jetbrains font-light"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block text-light-fg/70 hover:text-neon-blue transition-colors duration-300 font-jetbrains font-light"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-light-fg/70 hover:text-neon-blue transition-colors duration-300 font-jetbrains font-light"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-jetbrains font-semibold text-light-fg mb-6">
              SERVICES
            </h4>
            <div className="space-y-3 text-light-fg/70 font-jetbrains font-light">
              <p>Web Development</p>
              <p>Mobile Apps</p>
              <p>Desktop Solutions</p>
              <p>Web3 & Blockchain</p>
              <p>AI Integration</p>
              <p>UI/UX Design</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-light-fg/20">
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="#"
              className="w-10 h-10 glass-card flex items-center justify-center text-light-fg/60 hover:text-neon-blue transition-all duration-300 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.405.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
            
            <a
              href="#"
              className="w-10 h-10 glass-card flex items-center justify-center text-light-fg/60 hover:text-neon-blue transition-all duration-300 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            
            <a
              href="#"
              className="w-10 h-10 glass-card flex items-center justify-center text-light-fg/60 hover:text-neon-blue transition-all duration-300 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-light-fg/60 font-jetbrains font-light text-sm">
              © 2024 44 Fingers. All rights reserved.
            </p>
            <p className="text-light-fg/40 font-jetbrains font-light text-xs mt-1">
              Built with passion and cutting-edge technology
            </p>
          </div>
        </div>
      </div>

      {/* Floating background particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-neon-blue rounded-full floating-particle opacity-30"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-neon-purple rounded-full floating-particle opacity-20"></div>
      <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-neon-orange rounded-full floating-particle opacity-40"></div>
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-neon-red rounded-full floating-particle opacity-25"></div>
      <div className="absolute top-60 left-1/2 w-1 h-1 bg-neon-blue rounded-full floating-particle opacity-35"></div>
    </footer>
  );
};

export default FooterSection;