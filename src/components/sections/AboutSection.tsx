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
                  from multi-listing portals and <span className="italic text-white/60">AI-powered lead scoring</span> to IoT building management — we've delivered 15+ projects for agencies, developers, and property managers across 12 markets. mobile apps, web platforms, cloud backends — whatever the system demands.
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

            <div className="relative">
              <div
                ref={imageContainerRef}
                className="image-container relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
              >
                <img
                  ref={imageRef}
                  src="/team.webp"
                  alt="44FINGERS proptech software development team in Kyiv"
                  className="w-full h-full object-cover brightness-110 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;