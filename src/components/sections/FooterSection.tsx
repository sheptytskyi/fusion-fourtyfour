import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, ArrowUpRight, Github, Linkedin, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const footer = footerRef.current;
      const marquee = marqueeRef.current;
      if (!footer || !marquee) return;

      // Background Parallax
      gsap.to(".footer-bg-image", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Branding Marquee
      gsap.to(marquee, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Content Reveal
      gsap.fromTo(".footer-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-end py-20"
    >
      {/* Architectural Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/building2.jpg"
          alt=""
          className="footer-bg-image w-full h-full object-cover opacity-20 scale-125 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* Branding Parallax Text */}
      <div className="absolute top-1/2 left-0 w-full pointer-events-none opacity-[0.02] select-none z-0 -translate-y-1/2 overflow-hidden">
        <div ref={marqueeRef} className="text-[35vw] font-bold text-white whitespace-nowrap leading-none tracking-tighter lowercase italic">
          44fingers // proptech engineering
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-end pb-32">

          {/* Vision Block */}
          <div className="footer-reveal space-y-16">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-light text-white/30 uppercase tracking-[1em]">what's next</span>
                <div className="h-px w-24 bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] lowercase">
                your next <br />
                <span className="italic text-white/40">platform.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h4 className="text-white/20 font-bold text-[10px] uppercase tracking-widest">Sitemap</h4>
                <nav className="flex flex-col gap-4">
                  {['about', 'process', 'solutions', 'portfolio', 'contact'].map(link => (
                    <button
                      key={link}
                      onClick={() => scrollToSection(link)}
                      className="text-white/50 hover:text-white transition-all hover:translate-x-1 text-left font-light lowercase text-lg italic"
                    >
                      {link}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="space-y-6">
                <h4 className="text-white/20 font-bold text-[10px] uppercase tracking-widest">Social</h4>
                <nav className="flex flex-col gap-4">
                  <a href="#" className="flex items-center gap-3 text-white/50 hover:text-white transition-all hover:translate-x-1 font-light lowercase text-lg italic"><Linkedin className="w-4 h-4" /> Linkedin</a>
                </nav>
              </div>
            </div>
          </div>

          {/* Frozen Contact Card */}
          <div className="footer-reveal w-full lg:max-w-xl ml-auto">
            <div className="group relative p-1 rounded-[3rem] overflow-hidden transition-all duration-700 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
              <div className="relative bg-[#080808]/80 backdrop-blur-[60px] p-12 md:p-16 rounded-[2.9rem] border border-white/20 space-y-12">
                <div className="space-y-6">
                  <h4 className="text-4xl md:text-5xl font-bold text-white tracking-tight lowercase italic">
                    start your <br />
                    <span className="text-white/40">project.</span>
                  </h4>
                  <p className="text-white/50 font-light leading-relaxed text-lg lowercase">
                    tell us about the real estate problem you're solving. we'll respond within 24 hours with a clear scope and timeline.
                  </p>
                </div>

                <div className="space-y-8">
                  <a
                    href="mailto:hello@44fingers.tech"
                    className="w-full py-6 bg-white text-black rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center gap-4 group/btn"
                  >
                    <span>start a project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8 text-white/60 border-t border-white/5 pt-10">
                    <div className="flex items-center gap-3 hover:text-white/100 transition-colors">
                      <Mail className="w-4 h-4" />
                      <span className="text-[12px] tracking-widest">hello@44fingers.tech</span>
                    </div>
                    <div className="flex items-center gap-3 hover:text-white/100 transition-colors">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[12px] tracking-widest">Kyiv, Ukraine</span>
                    </div>
                  </div>
                </div>

                {/* Inner Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-reveal border-t border-white/5 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.6em]">
            © 2026 44fingers — real estate technology, engineered.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;