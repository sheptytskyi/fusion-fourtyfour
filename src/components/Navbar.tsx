import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

const Navbar = ({ onContactClick }: NavbarProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isOnAboutSection, setIsOnAboutSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Use IntersectionObserver for about section detection
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const checkAboutSection = () => {
        const rect = aboutSection.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight;
        
        // Check if about section is in viewport
        // More lenient check - if top of section is above viewport center
        const isInView = rect.top < viewportHeight * 0.6 && rect.bottom > 0;
        setIsOnAboutSection(isInView);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsOnAboutSection(entry.isIntersecting);
          });
        },
        {
          root: null,
          rootMargin: '-10% 0px -10% 0px',
          threshold: [0, 0.1, 0.5, 1]
        }
      );

      observer.observe(aboutSection);
      checkAboutSection(); // Initial check

      window.addEventListener('scroll', () => {
        handleScroll();
        checkAboutSection();
      });
      
      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
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
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile menu animation
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenu, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              style={{ color: isOnAboutSection ? '#374151' : '#ffffff', transition: 'color 0.3s ease' }}
              className="font-jetbrains text-sm font-light hover:text-shadow-neon tracking-wider"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              style={{ color: isOnAboutSection ? '#374151' : '#ffffff', transition: 'color 0.3s ease' }}
              className="font-jetbrains text-sm font-light hover:text-shadow-neon tracking-wider"
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              style={{ color: isOnAboutSection ? '#374151' : '#ffffff', transition: 'color 0.3s ease' }}
              className="font-jetbrains text-sm font-light hover:text-shadow-neon tracking-wider"
            >
              CONTACT
            </button>
          </div>

          {/* Mobile Burger Button */}
          <button
            onClick={toggleMobileMenu}
            style={{ color: isOnAboutSection ? '#374151' : '#ffffff', transition: 'color 0.3s ease' }}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Right side CTA */}
          <button
            onClick={onContactClick}
            className="font-jetbrains text-xs tracking-widest px-4 md:px-6 py-2 rounded-lg
                      bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                      text-white font-bold transition-transform duration-300
                      hover:scale-105 hover:shadow-lg"
          >
            <span className="hidden sm:inline">CONTACT US</span>
            <span className="sm:hidden">CONTACT</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 md:hidden"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative top-16 mx-4 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 p-6">
            <div className="flex flex-col space-y-6">
              <button
                onClick={() => scrollToSection('about')}
                className="font-jetbrains text-lg font-light text-white hover:text-neon-blue transition-all duration-300 text-left tracking-wider"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="font-jetbrains text-lg font-light text-white hover:text-neon-blue transition-all duration-300 text-left tracking-wider"
              >
                PORTFOLIO
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-jetbrains text-lg font-light text-white hover:text-neon-blue transition-all duration-300 text-left tracking-wider"
              >
                CONTACT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;