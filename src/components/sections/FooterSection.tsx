import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const marquee = marqueeRef.current;
    const content = contentRef.current;

    if (!footer || !marquee || !content) return;

    // Kinetic Marquee Scroll Effect
    gsap.set(marquee, { x: '0%' });
    gsap.to(marquee, {
      x: '-20%',
      scrollTrigger: {
        trigger: footer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Content Reveal
    const items = content.querySelectorAll('.reveal');
    gsap.fromTo(items,
      { opacity: 0, y: 50, rotateX: -10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Fallback: Show if first item isn't visible after 1.5s
    const timeout = setTimeout(() => {
      if (items[0] && window.getComputedStyle(items[0]).opacity === '0') {
        gsap.to(items, { opacity: 1, y: 0, rotateX: 0, duration: 0.5 });
      }
    }, 1500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative min-h-[80vh] bg-transparent overflow-hidden flex flex-col items-center justify-center py-20"
    >

      {/* Parallax Marquee Branding */}
      <div
        ref={marqueeRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[200%] select-none pointer-events-none z-0 whitespace-nowrap"
      >
        <span className="text-[29vw] font-space font-black text-white/[0.03] tracking-tighter leading-none inline-block px-10">
          44FINGERS 44FINGERS 44FINGERS
        </span>
      </div>

      <div ref={contentRef} className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">

          {/* Left: Huge Message */}
          <div className="space-y-16">
            <div className="reveal">
              <span className="text-purple-500 font-space text-xs uppercase tracking-[0.5em] mb-6 block">Future-Proofing Digitally</span>
              <h2 className="text-6xl md:text-8xl font-space font-bold text-white tracking-tighter leading-[0.9]">
                LET'S MAKE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 italic">IMPACT.</span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-24 reveal">
              <div className="space-y-6">
                <h4 className="text-white/20 font-space text-[10px] uppercase tracking-widest">Sitemap</h4>
                <nav className="flex flex-col gap-4">
                  {['about', 'portfolio', 'contact'].map(link => (
                    <button
                      key={link}
                      onClick={() => scrollToSection(link)}
                      className="text-white/60 hover:text-white transition-all hover:translate-x-2 text-left font-space capitalize text-lg"
                    >
                      {link}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="space-y-6">
                <h4 className="text-white/20 font-space text-[10px] uppercase tracking-widest">Socials</h4>
                <nav className="flex flex-col gap-4">
                  <a
                    className="text-white/60 hover:text-white transition-all hover:translate-x-2 font-space text-lg"
                    href="https://www.linkedin.com/company/44fingers"
                  >
                    Linkedin
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Right: Contact Card */}
          <div className="reveal w-full lg:max-w-md ml-auto">
            <div className="group relative p-1 bg-gradient-to-br from-white/10 to-white/0 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:rotate-[-1deg] hover:scale-[1.02]">
              <div className="bg-black/80 backdrop-blur-2xl p-10 py-12 rounded-[2.4rem] space-y-10">
                <div className="space-y-4">
                  <h4 className="text-3xl font-space font-bold text-white">Start a project</h4>
                  <p className="text-white/40 font-space text-sm leading-relaxed">
                    Have an idea that needs to scale? We help companies <span className="text-white/60">reduce operational costs by 30%</span> with AI-powered mobile apps.
                  </p>
                </div>

                <div className="space-y-14">
                  <a
                    href="mailto:hello@44fingers.tech"
                    className="flex items-center justify-between p-6 bg-white text-black rounded-2xl font-space font-black tracking-widest uppercase text-sm hover:bg-purple-500 hover:text-white transition-all"
                  >
                    Get in touch <ArrowUpRight className="w-5 h-5" />
                  </a>

                  <div className="flex items-center gap-6 px-2 text-white/40">
                    <div className="flex items-center gap-2 group/icon">
                      <Mail className="w-4 h-4 text-purple-500" />
                      <span className="text-[10px] font-space group-hover/icon:text-white transition-colors">hello@44fingers.tech</span>
                    </div>
                    <div className="flex items-center gap-2 group/icon">
                      <MapPin className="w-4 h-4 text-pink-500" />
                      <span className="text-[10px] font-space group-hover/icon:text-white transition-colors">New York, NY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Branding Footer Bottom */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[10px] font-space font-medium text-white/20 uppercase tracking-[0.5em]">
            © 2026 44FINGERS — ALL RIGHTS DIGITALIZED
          </div>

          <div className="flex gap-10">
            {['Terms', 'Privacy', 'Legal'].map(p => (
              <a key={p} href="#" className="text-[10px] font-space font-medium text-white/10 hover:text-white/40 transition-colors uppercase tracking-[0.5em]">{p}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;