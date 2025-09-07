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
    gsap.set(content, { opacity: 0, y: 50 });

    // ScrollTrigger animation
    gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Floating particles animation
    const particles = footer.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: -20,
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
      className="relative min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black overflow-hidden snap-start"
      style={{
        background: 'linear-gradient(135deg, #000 0%, #1a0033 25%, #000066 50%, #0033cc 75%, #000 100%)',
        position: 'relative'
      }}
    >
      {/* Electrified Background Effects */}
      <div className="absolute inset-0">
        {/* Electric Grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        
        {/* Neon Orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full opacity-20 animate-pulse"
             style={{ 
               background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)',
               filter: 'blur(20px)',
               animation: 'glow-pulse 3s ease-in-out infinite'
             }} />
        <div className="absolute bottom-40 right-32 w-32 h-32 rounded-full opacity-25 animate-pulse"
             style={{ 
               background: 'radial-gradient(circle, #ff00ff 0%, transparent 70%)',
               filter: 'blur(15px)',
               animation: 'glow-pulse 2.5s ease-in-out infinite 1s'
             }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full opacity-30 animate-pulse"
             style={{ 
               background: 'radial-gradient(circle, #ffff00 0%, transparent 70%)',
               filter: 'blur(10px)',
               animation: 'glow-pulse 3.5s ease-in-out infinite 0.5s'
             }} />
      </div>

      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-white/5 to-transparent"></div>
      
      <div ref={contentRef} className="relative z-10 container mx-auto px-8 md:px-16 py-20 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-jetbrains font-bold neon-text mb-4">
              44 FINGERS
            </h3>
            <p className="text-white/80 font-jetbrains font-light leading-relaxed">
              Cutting-edge digital solutions that electrify your business and leave competitors in the dark.
            </p>
            <div className="space-y-3 text-white/70">
              <p className="flex items-center space-x-3">
                <span className="text-cyan-400">📧</span>
                <span>contact@44fingers.com</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="text-cyan-400">📱</span>
                <span>+1 (555) 044-4444</span>
              </p>
              <p className="flex items-center space-x-3">
                <span className="text-cyan-400">🌍</span>
                <span>Worldwide</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-jetbrains font-semibold text-cyan-400 mb-4 tracking-wider">
              QUICK LINKS
            </h4>
            <div className="space-y-3">
              {['hero', 'about', 'portfolio', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block text-white/70 hover:text-cyan-400 transition-colors duration-300 font-jetbrains capitalize tracking-wide"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-jetbrains font-semibold text-magenta-400 mb-4 tracking-wider">
              SERVICES
            </h4>
            <div className="space-y-3 text-white/70">
              {[
                'Web Development',
                'Mobile Apps',
                'AI Solutions', 
                'Blockchain',
                'UI/UX Design',
                'Digital Strategy'
              ].map((service) => (
                <div key={service} className="font-jetbrains tracking-wide hover:text-magenta-400 transition-colors duration-300">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-jetbrains font-semibold text-yellow-400 mb-4 tracking-wider">
              CONNECT
            </h4>
            <div className="flex space-x-4">
              {[
                { name: 'LinkedIn', icon: '🔗', color: 'hover:text-blue-400' },
                { name: 'Twitter', icon: '🐦', color: 'hover:text-blue-300' },
                { name: 'GitHub', icon: '💻', color: 'hover:text-gray-300' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`text-2xl ${social.color} transition-all duration-300 transform hover:scale-110 hover:glow-pulse`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="mt-8 p-4 rounded-lg border border-cyan-400/30 bg-cyan-400/5">
              <p className="text-sm text-white/60 font-jetbrains leading-relaxed">
                Ready to electrify your business? Let's create something that sparks innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-cyan-400/20 pt-8 text-center">
          <p className="text-white/50 font-jetbrains text-sm tracking-wider">
            © 2024 44 FINGERS. All rights electrified. ⚡
          </p>
          <p className="text-white/30 font-jetbrains text-xs mt-2">
            Powered by innovation, driven by excellence.
          </p>
        </div>
      </div>

      {/* Electrified Floating particles */}
      <div className="absolute top-32 left-16 w-3 h-3 rounded-full floating-particle opacity-60"
           style={{ background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)', filter: 'blur(1px)' }} />
      <div className="absolute bottom-32 right-24 w-4 h-4 rounded-full floating-particle opacity-50"
           style={{ background: 'radial-gradient(circle, #ff00ff 0%, transparent 70%)', filter: 'blur(1px)' }} />
      <div className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full floating-particle opacity-70"
           style={{ background: 'radial-gradient(circle, #ffff00 0%, transparent 70%)', filter: 'blur(1px)' }} />
      <div className="absolute top-1/4 right-1/3 w-5 h-5 rounded-full floating-particle opacity-40"
           style={{ background: 'radial-gradient(circle, #00ff00 0%, transparent 70%)', filter: 'blur(2px)' }} />
      <div className="absolute bottom-1/4 left-2/3 w-3 h-3 rounded-full floating-particle opacity-55"
           style={{ background: 'radial-gradient(circle, #ff6600 0%, transparent 70%)', filter: 'blur(1px)' }} />
    </footer>
  );
};

export default FooterSection;