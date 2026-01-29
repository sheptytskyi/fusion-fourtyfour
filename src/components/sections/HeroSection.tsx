import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Cpu, Smartphone, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onGrowWithUsClick: () => void;
}

const HeroSection = ({ onGrowWithUsClick }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const hero = heroRef.current;
      const image = imageWrapperRef.current;
      const content = contentRef.current;
      const backdrop = backdropTextRef.current;
      if (!hero || !image || !content || !backdrop) return;

      // 1. Immediate Entrance (Visibility First)
      gsap.set(image, { scale: 1, opacity: 1 }); // Shown immediately
      gsap.set(".hero-reveal", { y: 30, opacity: 0 });
      gsap.set(backdrop, { opacity: 0.05, scale: 1 });

      const entranceTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      entranceTl.to(".hero-reveal", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
      }, 0.2);

      // 2. Scroll Animation: Increase sizing only
      gsap.to(image, {
        scale: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Subtle backdrop text movement
      gsap.to(backdrop, {
        scale: 1.2,
        yPercent: -20,
        opacity: 0.02,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Fade content on scroll
      gsap.to(content, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "30% top",
          scrub: true,
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen flex flex-col justify-between bg-transparent overflow-hidden snap-start pt-24 pb-12"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Simplified Kinetic Backdrop Text */}
        <div ref={backdropTextRef} className="absolute inset-0 flex items-center justify-center select-none">
          <span className="text-[25vw] font-space font-black text-white/[0.02] leading-none tracking-tighter uppercase whitespace-nowrap">
            44FINGERS
          </span>
        </div>
      </div>

      {/* 2. TOP CONTENT: MISSION & VISION (CLEAR OF IMAGE) */}
      <div ref={contentRef} className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="hero-reveal space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-space text-indigo-400 capitalize tracking-[0.4em] font-black">
                Operational_Phase_01
              </span>
              <div className="w-8 h-px bg-white/10" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-space font-bold text-white tracking-tighter leading-[0.85]">
              STAY AHEAD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 italic">THE CURVE.</span>
            </h1>
          </div>

          <div className="hero-reveal lg:pt-8 space-y-10">
            <p className="text-xl md:text-2xl font-space font-light text-white/40 leading-relaxed max-w-xl">
              We architect elite mobile ecosystems and <span className="text-white">AI foundations</span> that redefine your market speed. Engineering for high-frequency growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <button
                onClick={onGrowWithUsClick}
                className="group relative px-10 py-5 bg-white text-black font-space font-black uppercase text-xs tracking-widest rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Initiate Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <style>{`
                  button:hover span { color: white !important; }
                `}</style>
              </button>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4" />
                  <span className="text-[9px] font-space uppercase tracking-[0.2em]">Neural</span>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[9px] font-space uppercase tracking-[0.2em]">Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CENTERPIECE: THE IMAGE (IMMEDIATELY SHOWN, ZOOM ONLY ON SCROLL) */}
      <div className="relative flex-1 flex items-center justify-center z-10">
        <div
          ref={imageWrapperRef}
          className="w-full max-w-[1200px] aspect-video flex items-center justify-center will-change-transform"
        >
          <img
            src="/iphones.webp"
            alt="44Fingers High-Performance Mobile Ecosystems"
            className="w-full h-full object-contain filter drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Depth HUD (Bottom Overlay) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-10 pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[8px] font-space text-white uppercase tracking-[0.6em]">Architecture_v4.4</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-space text-white uppercase tracking-[0.6em]">Kyiv_Hub</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
