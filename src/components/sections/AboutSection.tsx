import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // 1. TEXT REVEAL ANIMATION
      gsap.fromTo(".about-content > *",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // 2. MAGNETIC 3D IMAGE ANIMATION (SCROLL-BASED)
      gsap.fromTo(".image-container",
        { rotateY: -20, rotateX: 10, scale: 0.9, opacity: 0 },
        {
          rotateY: 5,
          rotateX: -5,
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );



      // 5. MOUSE REACTIVE HOVER (IMAGE ONLY)
      const imageContainer = imageContainerRef.current;
      if (imageContainer) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = imageContainer.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(imageContainer, {
            rotateY: x * 30,
            rotateX: -y * 30,
            scale: 1.05,
            duration: 0.8,
            ease: "power2.out"
          });

          gsap.to(".image-hover-overlay", {
            opacity: 1,
            x: x * 20,
            y: y * 20,
            duration: 0.8
          });
        };

        const handleMouseLeave = () => {
          gsap.to(imageContainer, {
            rotateY: 5,
            rotateX: -5,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)"
          });

          gsap.to(".image-hover-overlay", {
            opacity: 0,
            duration: 0.8
          });
        };

        imageContainer.addEventListener('mousemove', handleMouseMove);
        imageContainer.addEventListener('mouseleave', handleMouseLeave);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-transparent py-24 lg:py-48 overflow-hidden perspective-1000"
    >
      <div className="absolute inset-0 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div className="about-content space-y-10 lg:pr-12 relative">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-[10px] font-space text-white/40 uppercase tracking-[0.5em]">Who_We_Are</span>
            </div>

            <h2 className="text-6xl md:text-8xl lg:text-9xl font-space font-bold text-white tracking-tighter leading-[0.85]">
              WE ARE <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">44FINGERS.</span>
            </h2>

            <div className="space-y-6 max-w-xl">
              <p className="text-xl md:text-2xl font-space font-light text-white/60 leading-relaxed">
                We care about clarity, honest communication, and results without buzzwords or unnecessary features.
              </p>
              <p className="text-lg md:text-xl font-space font-light text-white/40 leading-relaxed">
                We are small, focused mobile team. We work with founders and companies to turn ideas into mobile apps that solve real problems and help the business grow.
              </p>
            </div>

            <div className="flex gap-10 pt-4">
              <div className="space-y-1">
                <div className="text-[10px] font-space text-white/20 uppercase tracking-widest">Base_Location</div>
                <div className="text-lg font-space text-white">Kyiv, Ukraine</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-space text-white/20 uppercase tracking-widest">Specialization</div>
                <div className="text-lg font-space text-white">Mobile & AI</div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div
              ref={imageContainerRef}
              className="image-container relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] cursor-none"
            >
              <img
                ref={imageRef}
                src="/team.webp"
                alt="44Fingers Team"
                className="w-full h-full object-cover brightness-110 contrast-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

              {/* Creative Hover Overlay */}
              <div className="image-hover-overlay absolute inset-0 opacity-0 pointer-events-none">
                {/* Digital Mesh */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(99,102,241,0.1)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

                {/* Corner Targets */}
                <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-indigo-500/50" />
                <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-indigo-500/50" />
                <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-indigo-500/50" />
                <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-indigo-500/50" />

                {/* Scanner Beam */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent animate-scan" />
              </div>

              {/* Custom Cursor for Image */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                </div>
              </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(1000%); }
                }
                .animate-scan {
                    animation: scan 3s linear infinite;
                }
            `}</style>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;