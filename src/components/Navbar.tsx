import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface NavbarProps {
  onContactClick: () => void;
}

const Navbar = ({ onContactClick }: NavbarProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial animation
    gsap.fromTo(nav, 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
    );

    // Handle scroll visibility
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollY = window.scrollY;
        
        if (scrollY > heroHeight * 0.9) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.to(nav, {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : -50,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [isVisible]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side navigation */}
        <div className="flex space-x-8">
          <button
            onClick={() => scrollToSection('about')}
            className="font-jetbrains text-sm font-light text-foreground/80 hover:text-neon-blue transition-all duration-300 hover:text-shadow-neon tracking-wider"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="font-jetbrains text-sm font-light text-foreground/80 hover:text-neon-blue transition-all duration-300 hover:text-shadow-neon tracking-wider"
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="font-jetbrains text-sm font-light text-foreground/80 hover:text-neon-blue transition-all duration-300 hover:text-shadow-neon tracking-wider"
          >
            CONTACT
          </button>
        </div>

        {/* Right side CTA */}
        <button
          onClick={onContactClick}
          className="btn-glass font-jetbrains text-xs tracking-widest"
        >
          CONTACT US
        </button>
      </div>
    </nav>
  );
};

export default Navbar;