import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const grid = gridRef.current;
      if (!section || !grid) return;

      // 1. 3D PERSPECTIVE ZOOM-SETTLE
      // The whole grid starts deep in Z-space and zoomed in
      gsap.fromTo(grid,
        {
          z: 500,
          rotateX: 15,
          scale: 1.15,
          opacity: 0
        },
        {
          z: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: 1.5,
          }
        }
      );

      // 2. MECHANICAL SHUTTER REVEAL (Clip-path Fan)
      gsap.fromTo(shutterRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );

      // 3. KINETIC VELOCITY TYPOGRAPHY
      // Elements skew based on scroll speed
      let proxy = { skew: 0 };
      let skewSetter = gsap.quickSetter(".contact-reveal", "skewY", "deg");
      let clamp = gsap.utils.clamp(-15, 15);

      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });

      // 4. STRUCTURAL "CALIPER" LINES ASSEMBLY
      gsap.fromTo(".caliper-line",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // 5. STATS ROLL ANIMATION (Slot machine style)
      const stats = section.querySelectorAll('.stat-item');
      stats.forEach((stat) => {
        const value = stat.querySelector('.stat-value');
        if (value) {
          const targetValue = value.getAttribute('data-value') || "0";
          gsap.from(value, {
            yPercent: 100,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-transparent overflow-hidden flex items-center justify-center py-24 perspective-1000"
    >
      <div ref={gridRef} className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 will-change-transform">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* SIDE A: SHUTTER-REVEAL PORTRAIT */}
          <div className="relative aspect-[3/4] md:max-w-md lg:max-w-full mx-auto order-2 lg:order-1">

            {/* Structural Caliper Brackets */}
            <div className="caliper-line absolute -top-8 left-0 w-full h-px bg-white/10 origin-left" />
            <div className="caliper-line absolute -bottom-8 left-0 w-full h-px bg-white/10 origin-right" />
            <div className="caliper-line absolute top-0 -left-8 h-full w-px bg-white/10 origin-top" />
            <div className="caliper-line absolute top-0 -right-8 h-full w-px bg-white/10 origin-bottom" />

            {/* Main Shutter Container */}
            <div
              ref={shutterRef}
              className="relative h-full w-full overflow-hidden rounded-[1rem] border border-white/5 bg-white/[0.02] shadow-2xl"
            >
              <img
                ref={imageRef}
                src="/founder.webp"
                alt="Dmytro Sheptytskyi"
                className="w-full h-full object-cover opacity-100 brightness-105 contrast-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Founder Meta Badge */}
              <div className="absolute bottom-8 left-8 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-1 bg-indigo-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-space text-indigo-400 uppercase tracking-widest">FOUNDER</span>
                </div>
                <h3 className="text-3xl font-space font-bold text-white tracking-tighter uppercase mb-1">Dmytro Sheptytskyi</h3>
              </div>
            </div>
          </div>

          {/* SIDE B: FLUID TYPOGRAPHY & CTA */}
          <div className="space-y-16 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="caliper-line w-12 h-px bg-indigo-500/50 origin-left mb-6" />
              <h2 className="contact-reveal text-6xl md:text-8xl font-space font-bold text-white tracking-tighter leading-[0.85] will-change-transform">
                BUILD WITH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 italic">TRANSPARENCY.</span>
              </h2>
              <p className="contact-reveal text-xl md:text-2xl font-space font-light text-white/40 leading-relaxed max-w-lg">
                Direct access to the founder. Direct engineering. No layers, just <span className="text-white border-b border-white/10 pb-1">pure architecture</span> for your vision.
              </p>
            </div>

            <div className="contact-reveal space-y-12">
              <div className="pt-2">
                <a
                  href="https://calendly.com/channektoshka/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-8 px-12 py-8 bg-white text-black font-space font-black tracking-[0.3em] uppercase text-[10px] rounded-full transition-all hover:pr-16 active:scale-[0.95] overflow-hidden"
                >
                  Request Deep-Dive
                  <ArrowRight className="absolute right-8 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                  <div className="absolute inset-0 border-2 border-black/5 rounded-full scale-105" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;