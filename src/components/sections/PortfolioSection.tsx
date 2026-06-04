import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portfolioData = {
  'Real Estate': [
    {
      id: 10,
      name: '4Real Global Platform',
      image: 'mobile/4real.webp',
      images: ['mobile/all/4real.webp', 'mobile/all/4real1.webp', 'mobile/all/4rea2l.webp', 'mobile/all/4real3.webp', 'mobile/all/4real4.webp'],
      description: 'a unified management system for realtors and agencies to synchronize listings across multiple portals',
      detail_description: 'a centralized property management ecosystem built for agencies operating across multiple markets. agents manage listings, track client interactions, and automate follow-ups from a single dashboard — eliminating the manual re-entry that costs teams 12+ hours per week.',
      teamSize: 5,
      duration: '3 months',
      problems: ['Centralized database', 'Automated lead assignment', 'Portal integration', 'Demand analytics'],
      tech: ['Flutter', 'Python', 'Maps API', 'Stripe'],
      gradients: ['from-[#ffffff10] to-transparent']
    },
    {
      id: 8,
      name: 'Blago Property Search',
      image: 'mobile/blago.webp',
      images: ['mobile/all/blago.webp', 'mobile/all/blago2.webp', 'mobile/all/blago1.webp', 'mobile/all/blago3.webp', 'mobile/all/blago4.webp', 'mobile/all/blago5.webp', 'mobile/all/blago6.webp'],
      description: 'a buyer-facing property search platform with immersive 3D tours and real-time market analytics',
      detail_description: 'a full-stack search platform that lets buyers explore properties through immersive 3D walkthroughs, compare real-time price trends, and connect with agents instantly. built for a market where 70% of initial property research now starts online.',
      teamSize: 6,
      duration: '5 months',
      problems: ['3D virtual tours', 'Market data aggregation', 'Secure document handling', 'Location-based search'],
      tech: ['Flutter', 'Dart', 'WebRTC', 'Spring Boot'],
      gradients: ['from-[#ffffff10] to-transparent']
    },
    {
      id: 12,
      name: 'PropPay Transaction Hub',
      image: 'mobile/portmone.webp',
      images: ['mobile/all/portmone.webp', 'mobile/all/portmone1.webp', 'mobile/all/portmone2.webp', 'mobile/all/portmone3.webp', 'mobile/all/portmone4.webp', 'mobile/all/portmone5.webp'],
      description: 'an integrated payment gateway for rent collection, utility billing, and maintenance fee processing',
      detail_description: 'a specialized fintech layer for property managers handling thousands of monthly transactions. tenants pay rent, utilities, and service charges through a single interface with automatic reconciliation — reducing accounting overhead by 80%.',
      teamSize: 7,
      duration: '9 months',
      problems: ['Rent reconciliation', 'Payment distribution', 'Fraud prevention', 'Legacy integration'],
      tech: ['Flutter', 'Node.js', 'MongoDB', 'Redis'],
      gradients: ['from-[#ffffff10] to-transparent']
    },
    {
      id: 9,
      name: 'Mortgage & FinTech Guide',
      image: 'mobile/sense.webp',
      images: ['mobile/all/sense1.webp', 'mobile/all/sense2.webp', 'mobile/all/sense3.webp', 'mobile/all/sense4.webp', 'mobile/all/sense5.webp', 'mobile/all/sense6.webp', 'mobile/all/sense7.webp'],
      description: 'a mortgage comparison marketplace with built-in credit scoring and investment portfolio tracking',
      detail_description: 'a financial intelligence platform for property investors and homebuyers. users access instant mortgage comparisons across 30+ lenders, real-time credit score monitoring, and portfolio-level analytics that track yield across all their holdings.',
      teamSize: 8,
      duration: '12 months',
      problems: ['Calculation engines', 'Credit score integration', 'Secure data exchange', 'Document encryption'],
      tech: ['Swift', 'Kotlin', 'Blockchain', 'AWS'],
      gradients: ['from-[#ffffff10] to-transparent']
    },
    {
      id: 11,
      name: 'Smart Building IoT',
      image: 'mobile/ukrnafta.webp',
      images: ['mobile/all/nafta.webp', 'mobile/all/nafta1.webp', 'mobile/all/nafta2.webp', 'mobile/all/nafta3.webp', 'mobile/all/nafta4.webp', 'mobile/all/nafta5.webp'],
      description: 'an IoT-connected building management platform with contactless access and predictive maintenance',
      detail_description: 'a full-stack IoT solution for commercial and residential buildings. facility managers monitor hvac, lighting, and security from a unified web and mobile dashboard. predictive algorithms flag equipment failures 48 hours before they happen, cutting emergency maintenance costs by 40%.',
      teamSize: 5,
      duration: '4 months',
      problems: ['Hardware latency', 'Mesh network stability', 'Battery optimization', 'Remote access'],
      tech: ['React Native', 'Python', 'Websockets', 'IoT'],
      gradients: ['from-[#ffffff10] to-transparent']
    },
    {
      id: 7,
      name: 'Residential Amenity App',
      image: 'mobile/tosim.webp',
      images: ['mobile/all/sim.webp', 'mobile/all/sim1.webp', 'mobile/all/sim2.webp', 'mobile/all/sim3.webp', 'mobile/all/sim4.webp', 'mobile/all/sim5.webp', 'mobile/all/sim6.webp'],
      description: 'a resident-facing lifestyle app with concierge services, delivery tracking, and amenity bookings',
      detail_description: 'a white-label lifestyle platform deployed in premium residential complexes. residents book gym slots, schedule cleaning services, track package deliveries, and manage guest access — all from one app that increased tenant satisfaction scores by 34%.',
      teamSize: 4,
      duration: '3 months',
      problems: ['Vendor integration', 'Booking resolution', 'Last-mile delivery', 'User engagement'],
      tech: ['Flutter', 'Firebase', 'Node.js', 'Google Maps API'],
      gradients: ['from-[#ffffff10] to-transparent']
    }
  ]
};

interface PortfolioSectionProps {
  onWantSameClick: () => void;
}

/* ───────────────────────────────────────────────────────
   Project Modal — kept from original, only visual polish
   ─────────────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose, onWantSameClick }: { project: any, onClose: () => void, onWantSameClick: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center md:p-12 p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
        className="relative w-full h-full md:max-w-7xl md:h-[85vh] bg-[#0d0d0d] border border-white/15 md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/8 hover:bg-white/20 transition-colors duration-200 text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Visual Block */}
        <div className="w-full md:w-[65%] h-[40vh] md:h-full relative bg-white/[0.02]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={project.images[currentImageIndex]}
              className="w-full h-full object-contain p-12"
            />
          </AnimatePresence>

          <div className="absolute inset-x-8 bottom-12 flex justify-between items-center z-20">
            <div className="flex gap-2">
              <button
                onClick={prevImage}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>

        {/* Modal Info Block */}
        <div className="w-full md:w-[35%] flex flex-col h-[60vh] md:h-full bg-white/[0.03] border-l border-white/10">
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12">
            <div className="space-y-4">
              <div className="text-[10px] text-white/30 uppercase tracking-[0.5em]">selected project</div>
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-none lowercase">{project.name}</h2>
            </div>

            <div className="space-y-6">
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">objective</span>
              <p className="text-lg font-light text-white/60 leading-relaxed">{project.detail_description}</p>
            </div>

            <div className="space-y-6">
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">architecture</span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 uppercase">{t}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] text-white/20 uppercase tracking-widest block mb-2">Duration</span>
                <span className="text-sm text-white font-bold">{project.duration}</span>
              </div>
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] text-white/20 uppercase tracking-widest block mb-2">Team</span>
                <span className="text-sm text-white font-bold">{project.teamSize} head</span>
              </div>
            </div>
          </div>

          <div className="p-12 border-t border-white/10">
            <button
              onClick={() => { onClose(); onWantSameClick(); }}
              className="w-full py-6 bg-white text-black rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-white/90 transition-colors duration-200 flex items-center justify-center gap-3"
            >
              build this for me <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

/* ───────────────────────────────────────────────────────
   Project Card — cinematic layout with stacked layout
   ─────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index, onClick }: { project: any; index: number; onClick: () => void }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className="pf-reveal-card group relative cursor-pointer"
      onClick={onClick}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 lg:gap-12 items-center`}>
        {/* Image side */}
        <div className="pf-card-visual w-full lg:w-[55%] relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] aspect-[4/3] lg:aspect-[16/10]">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="pf-card-img w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-r ${isEven ? 'from-transparent via-transparent to-black/40' : 'from-black/40 via-transparent to-transparent'} hidden lg:block`} />


          {/* Arrow icon on hover */}
          <div className="pf-card-arrow absolute top-6 right-6 lg:top-8 lg:right-8 z-10 p-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>

          {/* Bottom gradient stripe */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Info side */}
        <div className={`pf-card-info w-full lg:w-[45%] py-8 lg:py-0 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
          <div className="space-y-6">

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.1] lowercase">
              {project.name}
            </h3>

            <p className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-md">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.slice(0, 3).map((t: string) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] text-white/40 uppercase tracking-wider font-medium">
                  {t}
                </span>
              ))}
            </div>

            {/* Duration & Team */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <span className="text-[9px] text-white/20 uppercase tracking-widest block mb-1">duration</span>
                <span className="text-sm text-white/70 font-medium">{project.duration}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-[9px] text-white/20 uppercase tracking-widest block mb-1">team</span>
                <span className="text-sm text-white/70 font-medium">{project.teamSize} engineers</span>
              </div>
            </div>

            {/* CTA line */}
            <div className="pf-card-cta flex items-center gap-3 pt-4">
              <span className="text-[11px] text-white/50 uppercase tracking-[0.3em] font-bold">explore project</span>
              <div className="pf-cta-line h-px bg-white/30 transition-all duration-500" style={{ width: 24 }} />
              <ArrowUpRight className="w-4 h-4 text-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider between cards */}
      <div className="pf-card-divider mt-16 lg:mt-24 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

/* ───────────────────────────────────────────────────────
   Main Section
   ─────────────────────────────────────────────────────── */
const PortfolioSection = ({ onWantSameClick }: PortfolioSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const isMobile = useRef(false);

  useLayoutEffect(() => {
    isMobile.current = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      /* ── Header ── */
      gsap.set(".pf-header > *", { opacity: 0, y: 50 });
      gsap.to(".pf-header > *", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pf-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      });

      /* ── Marquee parallax ── */
      gsap.to(".pf-marquee-track", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });

      /* ── Per-card cinematic reveals ── */
      const cards = gsap.utils.toArray<HTMLElement>(".pf-reveal-card");

      cards.forEach((card, i) => {
        const isEven = i % 2 === 0;
        const visual = card.querySelector(".pf-card-visual") as HTMLElement;
        const info = card.querySelector(".pf-card-info") as HTMLElement;
        const divider = card.querySelector(".pf-card-divider") as HTMLElement;

        if (!visual || !info) return;

        // Use compositor-friendly transforms only
        const xOffset = isMobile.current ? 0 : (isEven ? -60 : 60);
        const infoXOffset = isMobile.current ? 0 : (isEven ? 60 : -60);

        // Set initial states
        gsap.set(visual, { opacity: 0, x: xOffset, scale: 0.95 });
        gsap.set(info, { opacity: 0, x: infoXOffset });
        if (divider) gsap.set(divider, { scaleX: 0 });

        // Entrance timeline — scrubbed to scroll for bidirectional animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: isMobile.current ? "top 90%" : "top 80%",
            end: isMobile.current ? "top 30%" : "top 30%",
            scrub: isMobile.current ? 0.3 : 0.6,
            // toggleActions not needed with scrub — it's inherently bidirectional
          }
        });

        tl.to(visual, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }, 0);

        tl.to(info, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
        }, 0.15);

        if (divider) {
          tl.to(divider, {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.inOut",
          }, 0.3);
        }

        // Parallax on the image within the visual — subtle, compositor-safe
        if (!isMobile.current) {
          const img = visual.querySelector(".pf-card-img") as HTMLElement;
          if (img) {
            gsap.to(img, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              }
            });
          }
        }
      });

      /* ── Floating progress line ── */
      gsap.to(".pf-progress-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.3,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 lg:py-40 overflow-hidden bg-transparent">
      {/* Vertical progress line — left edge */}
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 z-0 pointer-events-none hidden lg:block">
        <div className="pf-progress-line absolute left-0 top-0 w-px h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent origin-top" style={{ transform: 'scaleY(0)' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="pf-header max-w-4xl mb-24 lg:mb-40 relative">
          <div className="flex items-center gap-6 mb-10">
            <span className="text-[10px] text-white/40 uppercase tracking-[1.2em] font-light">shipped projects</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light text-white tracking-tight leading-[1.05] lowercase">
            platforms we've <br />
            <span className="italic text-white/40">delivered.</span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-white/45 font-light max-w-xl leading-relaxed lowercase mt-8">
            real systems for real businesses. each project below is a production platform serving thousands of daily users in the real estate industry.
          </p>
        </div>

        {/* Cards — stacked cinematic list */}
        <div className="space-y-0">
          {portfolioData['Real Estate'].map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onWantSameClick={onWantSameClick}
          />
        )}
      </AnimatePresence>

      <style>{`
        /* ── Card visuals ── */
        .pf-reveal-card {
          transform: translateZ(0);
          will-change: transform;
        }
        .pf-card-visual {
          transform: translateZ(0);
          will-change: transform, opacity;
        }
        .pf-card-info {
          will-change: transform, opacity;
        }
        .pf-card-img {
          opacity: 0.7;
          transform: scale(1.1) translateZ(0);
          transition: opacity 0.7s ease;
          will-change: transform;
        }
        .pf-reveal-card:hover .pf-card-img {
          opacity: 0.9;
        }
        /* Arrow hover */
        .pf-card-arrow {
          opacity: 0;
          transform: translate(8px, -8px) translateZ(0);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pf-reveal-card:hover .pf-card-arrow {
          opacity: 1;
          transform: translate(0, 0) translateZ(0);
        }
        /* CTA line expansion */
        .pf-cta-line {
          width: 24px;
        }
        .pf-reveal-card:hover .pf-cta-line {
          width: 48px;
        }
        .pf-reveal-card:hover .pf-card-cta span {
          color: rgba(255,255,255,0.8);
        }
        .pf-card-cta span {
          transition: color 0.3s ease;
        }

        /* Card visual hover — subtle lift */
        .pf-card-visual {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        @media (hover: hover) {
          .pf-reveal-card:hover .pf-card-visual {
            transform: translateY(-4px) translateZ(0) !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          }
        }

        /* Divider */
        .pf-card-divider {
          transform-origin: left center;
          will-change: transform;
        }

        /* Progress line */
        .pf-progress-line {
          will-change: transform;
        }

        /* Marquee */
        .pf-marquee-track {
          will-change: transform;
        }

        /* Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }

        /* Mobile adjustments */
        @media (max-width: 1023px) {
          .pf-card-arrow {
            opacity: 0.6;
            transform: translate(0, 0) translateZ(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection;