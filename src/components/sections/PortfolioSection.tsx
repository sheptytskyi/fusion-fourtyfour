import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Users, Clock, Code, AlertCircle, ArrowUpRight, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

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
      className="fixed inset-0 z-[100] flex items-center justify-center md:p-12 p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.95 }}
        className="relative w-full h-full md:max-w-7xl md:h-[85vh] bg-white/[0.05] border border-white/20 md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10">
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
              src={project.images[currentImageIndex]}
              className="w-full h-full object-contain p-12"
            />
          </AnimatePresence>

          <div className="absolute inset-x-8 bottom-12 flex justify-between items-center z-20">
            <div className="flex gap-2">
              <button onClick={prevImage} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>

        {/* Modal Info Block */}
        <div className="w-full md:w-[35%] flex flex-col h-[60vh] md:h-full bg-white/[0.03] backdrop-blur-3xl border-l border-white/10">
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-12">
            <div className="space-y-4">
              <div className="text-[10px] text-white/30 uppercase tracking-[0.5em]">selected project</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none lowercase">{project.name}</h2>
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
              className="w-full py-6 bg-white text-black rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center gap-3"
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

const ProjectCard = ({ project, onClick, className }: { project: any, onClick: () => void, className?: string }) => {
  return (
    <div
      className={`portfolio-card group relative overflow-hidden rounded-[2.5rem] bg-white/[0.08] backdrop-blur-[40px] border border-white/30 shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/[0.15] hover:border-white/60 transition-all duration-700 active:scale-[0.98] opacity-0 translate-y-12 will-change-transform ${className}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1200ms] ease-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span></span>
          <div className="p-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-white/60" />
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none lowercase">
            {project.name}
          </h3>
        </div>
      </div>

      {/* Frozen Shimmer */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] ease-out" />
      </div>

      <style>{`
        .portfolio-card {
            backface-visibility: hidden;
            transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

const PortfolioSection = ({ onWantSameClick }: PortfolioSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // ARCHITECTURAL GRID REVEAL
      gsap.fromTo(".portfolio-grid-line-v",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      gsap.fromTo(".portfolio-grid-line-h",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Large background text shift
      gsap.to(".portfolio-bg-text", {
        x: -300,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // HEADER TEXT REVEAL
      gsap.fromTo(".portfolio-header > *",
        { opacity: 0, y: 50, rotateX: -20, filter: 'blur(10px)', transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // Stable Staggered Card Entrance
      gsap.to(".portfolio-card", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 80%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getBentoClass = (index: number) => {
    const mobileBase = "col-span-1 aspect-[4/5]";
    switch (index) {
      case 0: return `${mobileBase} lg:col-span-2 lg:aspect-[16/8]`; // 2 columns wide on desktop
      case 1: return `${mobileBase} lg:col-span-1 lg:aspect-[8/8]`;  // 1 column wide
      case 2: return `${mobileBase} lg:col-span-1 lg:aspect-[8/8]`;
      case 3: return `${mobileBase} lg:col-span-1 lg:aspect-[8/8]`;
      case 4: return `${mobileBase} lg:col-span-1 lg:aspect-[8/8]`;
      case 5: return `${mobileBase} lg:col-span-3 lg:aspect-[16/5]`; // Full width highlight
      default: return `${mobileBase} lg:col-span-1 lg:aspect-[8/8]`;
    }
  };

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-32 lg:py-60 overflow-hidden bg-transparent">
      {/* Architectural Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="portfolio-grid-line-v absolute left-1/4 top-0 w-px h-full bg-white/5 origin-top" />
        <div className="portfolio-grid-line-v absolute left-2/4 top-0 w-px h-full bg-white/5 origin-top" />
        <div className="portfolio-grid-line-v absolute left-3/4 top-0 w-px h-full bg-white/5 origin-top" />
        <div className="portfolio-grid-line-h absolute top-1/2 left-0 w-full h-px bg-white/5 origin-left" />
      </div>

      {/* Background Parallax Narrative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 w-full overflow-hidden">
        <span className="portfolio-bg-text text-[30vw] font-bold text-white/[0.01] leading-none whitespace-nowrap lowercase italic inline-block">
          production // grade // code
        </span>
      </div>


      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="portfolio-header max-w-4xl mb-32 relative">
          <div className="flex items-center gap-6 mb-12">
            <span className="text-[10px] text-white/40 uppercase tracking-[1.2em] font-light">shipped projects</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <h2 className="text-6xl md:text-9xl font-bold text-white tracking-tight leading-[0.9] lowercase mb-12">
            platforms we've
            <span className="italic text-white/40 font-light"> delivered.</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/50 font-light max-w-xl leading-relaxed lowercase">
            real systems for real businesses. each project below is a production platform serving thousands of daily users in the real estate industry.
          </p>
        </div>

        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {portfolioData['Real Estate'].map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={getBentoClass(idx)}
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
    </section>
  );
};

export default PortfolioSection;