import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

const Navbar = ({ onContactClick }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const activeBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. SECTION TRACKING
    const sections = ['hero', 'about', 'process', 'solutions', 'portfolio', 'testimonials', 'contact', 'faq'];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 2. SCROLL STATE
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // 3. SLIDING BACKGROUND ANIMATION
    const activeBtn = document.querySelector(`[data-nav="${activeSection}"]`) as HTMLElement;
    const activeBg = activeBgRef.current;

    if (activeBtn && activeBg && window.innerWidth >= 768) {
      gsap.to(activeBg, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.6,
        ease: "expo.out"
      });
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'process', label: 'Process' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-center p-6 md:p-8 pointer-events-none transition-all duration-500">
        <div
          ref={pillRef}
          className={`group relative flex items-center md:gap-2 px-3 py-2 rounded-full border border-white/10 backdrop-blur-2xl transition-all duration-700 pointer-events-auto ${isScrolled
            ? 'bg-black/40 scale-95 md:px-6 opacity-100'
            : activeSection === 'hero'
              ? 'bg-white/5 scale-100 opacity-0 hover:opacity-100'
              : 'bg-white/5 scale-100 opacity-100'
            }`}
        >
          {/* Logo / Home */}
          <button
            data-nav="hero"
            onClick={() => scrollToSection('hero')}
            className={`relative z-10 px-4 py-2 font-onest font-black text-sm transition-all duration-500 ${activeSection === 'hero' ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
          >
            44F
          </button>

          <div className="h-4 w-px bg-white/10 mx-1 hidden md:block" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <div
              ref={activeBgRef}
              className="absolute h-[calc(100%-16px)] top-2 left-0 bg-white/10 rounded-full pointer-events-none z-0"
            />
            {navItems.map((item) => (
              <button
                key={item.id}
                data-nav={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative z-10 px-6 py-2 rounded-full font-onest text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${activeSection === item.id ? 'text-white' : 'text-white/40 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 flex md:hidden items-center justify-center w-10 h-10 ml-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <X className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                >
                  <Menu className="w-5 h-5 text-white/70" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Action Button - Desktop only */}
          <div className="h-4 w-px bg-white/10 mx-1 hidden md:block" />

          <button
            onClick={onContactClick}
            className="relative z-10 px-5 py-2 group/btn hidden md:block"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse group-hover/btn:scale-125 transition-transform" />
              <span className="absolute left-full ml-4 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-onest text-indigo-400 font-bold uppercase tracking-widest">
                Initiate
              </span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl flex flex-col justify-center p-12 md:hidden"
          >
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-onest font-black tracking-[0.5em] text-indigo-500 uppercase">Navigation</span>
                <div className="w-12 h-[1px] bg-indigo-500/30" />
              </div>

              <div className="flex flex-col gap-8">
                {[{ id: 'hero', label: 'Index' }, ...navItems].map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center justify-between group"
                  >
                    <span className={`text-5xl font-black tracking-tighter transition-all duration-300 ${activeSection === item.id ? 'text-white' : 'text-white/20 group-hover:text-white/40'}`}>
                      {item.label.toUpperCase()}
                    </span>
                    <ArrowUpRight className={`w-6 h-6 transition-all duration-300 ${activeSection === item.id ? 'text-indigo-500' : 'text-white/10 group-hover:text-white/30'}`} />
                  </motion.button>
                ))}
              </div>

              <div className="pt-12 border-t border-white/5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="w-full py-6 bg-white rounded-2xl flex items-center justify-center gap-3 text-black font-black uppercase text-xs tracking-widest active:scale-95 transition-transform"
                >
                  Start Project <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;