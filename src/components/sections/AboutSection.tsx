import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // 0. RISING PANEL TRANSITION
      const panel = panelRef.current;
      if (panel) {
        gsap.set(panel, {
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        });

        gsap.fromTo(panel,
          {
            borderRadius: '4rem',
            scale: 0.85,
            y: 100,
            opacity: 0,
            filter: 'brightness(0.5)',
            rotateX: 8,
          },
          {
            borderRadius: '0rem',
            scale: 1,
            y: 0,
            opacity: 1,
            filter: 'brightness(1)',
            rotateX: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 120%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }

      // 1. BACKGROUND PARALLAX TEXT
      gsap.to(".bg-parallax-text", {
        x: -200,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 2. ARCHITECTURAL GRID REVEAL
      gsap.fromTo(".about-grid-line-v",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      gsap.fromTo(".about-grid-line-h",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 3. TEXT REVEAL ANIMATION
      // 3. TEXT REVEAL ANIMATION (Cinematic 3D Bidirectional)
      const textElements = gsap.utils.toArray<HTMLElement>(".about-content > *");
      gsap.fromTo(textElements,
        {
          y: 50,
          opacity: 0,
          rotateX: -20,
          filter: 'blur(10px)',
          transformPerspective: 1000
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            // scrub: 1 // Optional: tied directly to scrollbar
          }
        }
      );

      // 4. FLOATING ACCENTS PARALLAX
      gsap.to(".floating-accent", {
        y: -100,
        rotate: 45,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          scrub: 2,
        }
      });

      // 5. MAGNETIC 3D IMAGE ANIMATION (SCROLL-BASED)
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
      const isTouch = window.matchMedia('(pointer: coarse)').matches;

      if (imageContainer && !isTouch) {
        const xSetter = gsap.quickSetter(imageContainer, "rotationY", "deg");
        const ySetter = gsap.quickSetter(imageContainer, "rotationX", "deg");
        const sSetter = gsap.quickSetter(imageContainer, "scale");
        const oXSetter = gsap.quickSetter(".image-hover-overlay", "x", "px");
        const oYSetter = gsap.quickSetter(".image-hover-overlay", "y", "px");

        const handleMouseMove = (e: MouseEvent) => {
          const rect = imageContainer.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          xSetter(x * 30);
          ySetter(-y * 30);
          sSetter(1.05);

          gsap.to(".image-hover-overlay", { opacity: 1, duration: 0.4 });
          oXSetter(x * 20);
          oYSetter(y * 20);
        };

        const handleMouseLeave = () => {
          gsap.to(imageContainer, {
            rotateY: 5,
            rotateX: -5,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)",
            force3D: true
          });

          gsap.to(".image-hover-overlay", {
            opacity: 0,
            duration: 0.8
          });
        };

        imageContainer.addEventListener('mousemove', handleMouseMove, { passive: true });
        imageContainer.addEventListener('mouseleave', handleMouseLeave);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative -mt-16 z-10"
    >
      <div
        ref={panelRef}
        className="relative py-24 lg:py-48 overflow-hidden bg-transparent"
        style={{ transformOrigin: 'center top', willChange: 'transform, border-radius' }}
      >
        {/* Architectural Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="about-grid-line-v absolute left-1/4 top-0 w-px h-full bg-white/5 origin-top" />
          <div className="about-grid-line-v absolute left-2/4 top-0 w-px h-full bg-white/5 origin-top" />
          <div className="about-grid-line-v absolute left-3/4 top-0 w-px h-full bg-white/5 origin-top" />
          <div className="about-grid-line-h absolute top-1/4 left-0 w-full h-px bg-white/5 origin-left" />
          <div className="about-grid-line-h absolute top-3/4 left-0 w-full h-px bg-white/5 origin-left" />
        </div>

        {/* Background Parallax Narrative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full overflow-hidden">
          <span className="bg-parallax-text text-[30vw] font-bold text-white/[0.01] leading-none whitespace-nowrap lowercase italic inline-block">
            44fingers // proptech engineering
          </span>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div className="about-content space-y-16 lg:pr-24 relative">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-light text-white/30 uppercase tracking-[0.8em]">who we are</span>
                <div className="h-px w-12 bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05] lowercase">
                we are <br />
                <span className="italic text-white/40">44fingers.</span>
              </h2>

              <div className="space-y-8 max-w-xl">
                <p className="text-xl md:text-2xl font-light text-white/70 leading-relaxed tracking-tight">
                  we engineer digital platforms that help real estate businesses close faster, manage smarter, and scale without friction.
                </p>
                <p className="text-base md:text-lg font-light text-white/40 leading-relaxed">
                  from multi-listing portals and <span className="italic text-white/60">AI-powered lead scoring</span> to IoT building management — we've delivered 140+ projects for agencies, developers, and property managers across 12 markets. mobile apps, web platforms, cloud backends — whatever the system demands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/5 max-w-md">
                <div className="space-y-3 group cursor-default">
                  <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] group-hover:text-white/40 transition-colors">location</div>
                  <div className="text-lg font-light text-white/80 transition-transform group-hover:translate-x-1 duration-500">Kyiv, Ukraine</div>
                </div>
                <div className="space-y-3 group cursor-default">
                  <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] group-hover:text-white/40 transition-colors">focus</div>
                  <div className="text-lg font-light text-white/80 transition-transform group-hover:translate-x-1 duration-500">PropTech</div>
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
      </div>
    </section>
  );
};

export default AboutSection;