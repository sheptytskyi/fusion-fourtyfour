import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Users, Clock, Code, AlertCircle, ArrowUpRight, X, ChevronLeft, ChevronRight, Smartphone, Cpu, Zap, Brain, Bitcoin } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

gsap.registerPlugin(ScrollTrigger);

const portfolioData = {
  Mobile: [
    {
      id: 7,
      name: 'Online Grocery Shop App',
      image: 'mobile/tosim.webp',
      images: ['mobile/all/sim.webp', 'mobile/all/sim1.webp', 'mobile/all/sim2.webp', 'mobile/all/sim3.webp', 'mobile/all/sim4.webp', 'mobile/all/sim5.webp', 'mobile/all/sim6.webp'], // Placeholder images for slider
      description: 'Easy grocery shopping with secure payments and fast delivery',
      detail_description: 'A comprehensive mobile application for online grocery shopping that streamlines the user experience from product discovery to final delivery. The app features real-time inventory tracking, secure payment gateways, and a robust delivery management system. Users can easily browse categories, create recurring orders, and track their deliveries in real-time.',
      teamSize: 4,
      duration: '3 months',
      problems: ['Delivery tracking accuracy in rural areas', 'Product search latency with large datasets', 'User Engagement and retention rates'],
      tech: ['Flutter', 'Firebase', 'Node.js', 'Google Maps API'],
      gradients: [
        'from-[#3D1F66] via-[#020617] to-[#020617]',
        'from-[#4A2566] via-[#020617] to-[#020617]',
        'from-[#552A8E] via-[#020617] to-[#020617]',
        'from-[#6B3BA3] via-[#020617] to-[#020617]',
        'from-[#7D4DB8] via-[#020617] to-[#020617]',
        'from-[#8F5FCD] via-[#020617] to-[#020617]',
        'from-[#A171E2] via-[#020617] to-[#020617]'
      ],
      link: 'https://apps.apple.com/us/app/tosim/id1517805115'
    },
    {
      id: 8,
      name: 'Real-Estate App',
      image: 'mobile/blago.webp',
      images: ['mobile/all/blago.webp', 'mobile/all/blago2.webp', 'mobile/all/blago1.webp', 'mobile/all/blago3.webp', 'mobile/all/blago4.webp', 'mobile/all/blago5.webp', 'mobile/all/blago6.webp'],
      description: 'Modern property search and investment management for the real estate market',
      detail_description: 'A comprehensive real estate platform designed for both buyers and investors. It features immersive 3D virtual tours, real-time market data analytics, and a seamless communication channel between agents and clients. The app simplifies the complex process of property acquisition and portfolio management, providing a one-stop shop for modern real estate needs.',
      teamSize: 6,
      duration: '5 months',
      problems: ['Integrating high-resolution 3D virtual tours', 'Aggregating real-time market data from multiple sources', 'Secure document handling for digital contracts', 'Ensuring accurate location-based search results'],
      tech: ['Flutter', 'Dart', 'WebRTC', 'Spring Boot'],
      gradients: [
        'from-[#5A7A0A] via-[#020617] to-[#020617]',
        'from-[#6B8F0B] via-[#020617] to-[#020617]',
        'from-[#7CA50C] via-[#020617] to-[#020617]',
        'from-[#9EC90D] via-[#020617] to-[#020617]',
        'from-[#B0D91E] via-[#020617] to-[#020617]',
        'from-[#C2E92F] via-[#020617] to-[#020617]',
        'from-[#D4F940] via-[#020617] to-[#020617]'
      ],
      link: 'https://blagodeveloper.com/'
    },
    {
      id: 9,
      name: 'Online Banking App',
      image: 'mobile/sense.webp',
      images: ['mobile/all/sense1.webp', 'mobile/all/sense2.webp', 'mobile/all/sense3.webp', 'mobile/all/sense4.webp', 'mobile/all/sense5.webp', 'mobile/all/sense6.webp', 'mobile/all/sense7.webp'],
      description: 'Secure digital banking with instant transfers and expense tracking',
      detail_description: 'A full-featured online banking application designed for the modern user. It offers intuitive expense tracking with visual analytics, instant internal and external transfers, and seamless management of multiple accounts. The app focuses on providing a frictionless user experience while maintaining the highest security standards.',
      teamSize: 8,
      duration: '12 months',
      problems: ['Real-time Transaction Processing', 'Multi-factor Security Implementation', 'Legacy System Migration', 'User Authentication Scalability'],
      tech: ['Swift', 'Kotlin', 'Blockchain', 'AWS'],
      gradients: [
        'from-[#4A4B93] via-[#020617] to-[#020617]',
        'from-[#5455A3] via-[#020617] to-[#020617]',
        'from-[#5E5FB3] via-[#020617] to-[#020617]',
        'from-[#696AD3] via-[#020617] to-[#020617]',
        'from-[#7A7BD8] via-[#020617] to-[#020617]',
        'from-[#8B8CDD] via-[#020617] to-[#020617]',
        'from-[#9C9DE2] via-[#020617] to-[#020617]'
      ],
      link: 'https://apps.apple.com/us/app/sense-superapp-online-bank-ua/id1494135206'
    },
    {
      id: 10,
      name: 'Web-Platform For Relators',
      image: 'mobile/4real.webp',
      images: ['mobile/all/4real.webp', 'mobile/all/4real1.webp', 'mobile/all/4rea2l.webp', 'mobile/all/4real3.webp', 'mobile/all/4real4.webp'],
      description: 'Unified management system for realtors and agencies to streamline property listings',
      detail_description: 'An advanced digital ecosystem tailored specifically for realtors to manage their entire property portfolio. The platform enables multi-listing synchronization, automated client follow-ups via integrated CRM, and sophisticated lead scoring. It empowers agents to close deals faster by providing comprehensive data on property views and interested buyers in real-time.',
      teamSize: 5,
      duration: '3 months',
      problems: ['Centralized database for multi-agency listings', 'Automated lead assignment and tracking', 'Seamless integration with external real estate portals', 'Real-time property demand analytics'],
      tech: ['Flutter', 'Python', 'Maps API', 'Stripe'],
      gradients: [
        'from-[#8F5A3A] via-[#020617] to-[#020617]',
        'from-[#A36643] via-[#020617] to-[#020617]',
        'from-[#B7724C] via-[#020617] to-[#020617]',
        'from-[#D37D53] via-[#020617] to-[#020617]',
        'from-[#E08F65] via-[#020617] to-[#020617]',
        'from-[#EDA177] via-[#020617] to-[#020617]'
      ],
      link: 'https://4real.global/'
    },
    {
      id: 11,
      name: 'Gas Station App',
      image: 'mobile/ukrnafta.webp',
      images: ['mobile/all/nafta.webp', 'mobile/all/nafta1.webp', 'mobile/all/nafta2.webp', 'mobile/all/nafta3.webp', 'mobile/all/nafta4.webp', 'mobile/all/nafta5.webp'],
      description: 'Smart fuel management with contactless payments and loyalty rewards',
      detail_description: 'A companion app for gas station networks that allows drivers to pay for fuel directly from the pump without entering the shop. It integrates a loyalty program, fuel price monitoring, and finding the nearest station with specific amenities. The goal was to reduce queue times and enhance customer convenience.',
      teamSize: 5,
      duration: '4 months',
      problems: ['Contactless Pump Activation', 'Loyalty System Integration', 'Real-time price synchronization', 'Offline mode support'],
      tech: ['React Native', 'Python', 'Websockets', 'IoT'],
      gradients: [
        'from-[#2F3033] via-[#020617] to-[#020617]',
        'from-[#37383B] via-[#020617] to-[#020617]',
        'from-[#3F4043] via-[#020617] to-[#020617]',
        'from-[#4F5054] via-[#020617] to-[#020617]',
        'from-[#5F6064] via-[#020617] to-[#020617]',
        'from-[#6F7074] via-[#020617] to-[#020617]'
      ],
      link: 'https://apps.apple.com/us/app/ukrnafta/id6449353231'
    },
    {
      id: 12,
      name: 'Online Payment Transaction',
      image: 'mobile/portmone.webp',
      images: ['mobile/all/portmone.webp', 'mobile/all/portmone1.webp', 'mobile/all/portmone2.webp', 'mobile/all/portmone3.webp', 'mobile/all/portmone4.webp', 'mobile/all/portmone5.webp'],
      description: 'Fast and secure online payment processing for businesses and users',
      detail_description: 'A universal payment processing application that aggregates various utility bills, fines, and subscription payments into one dashboard. Users can set up auto-payments, view detailed transaction history, and receive notifications. For businesses, it offers easy invoicing and payment link generation.',
      teamSize: 7,
      duration: '9 months',
      problems: ['High-speed Transaction Processing', 'PCI DSS Compliance', 'Fraud Prevention Algorithms', 'Cross-platform consistency'],
      tech: ['Flutter', 'Node.js', 'MongoDB', 'Redis'],
      gradients: [
        'from-[#3A6F97] via-[#020617] to-[#020617]',
        'from-[#417AA3] via-[#020617] to-[#020617]',
        'from-[#4885AF] via-[#020617] to-[#020617]',
        'from-[#59A7D9] via-[#020617] to-[#020617]',
        'from-[#6AB3DD] via-[#020617] to-[#020617]',
        'from-[#7BBFE1] via-[#020617] to-[#020617]'
      ],
      link: 'https://apps.apple.com/us/app/portmone-payment-systems/id587804458'
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
      {/* Rich Atmospheric Backdrop */}
      <div className="absolute inset-0 overflow-hidden bg-[#020202]">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradients[currentImageIndex % project.gradients.length]} opacity-20 blur-[120px]`} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)]" />
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { type: "spring", damping: 25, stiffness: 300 }
        }}
        exit={{ y: 50, opacity: 0 }}
        className="relative w-full h-full md:max-w-7xl md:h-[800px] bg-black/40 backdrop-blur-3xl md:rounded-[48px] overflow-hidden flex flex-col md:flex-row border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        </button>

        {/* LEFT: VISUAL STAGE (MAXIMIZED) */}
        <div
          className="w-full md:w-[70%] h-[40vh] md:h-full relative flex items-center justify-center overflow-hidden bg-black/10 cursor-pointer"
          onClick={nextImage}
        >
          {/* Rich Mesh Gradient Backdrop */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradients[currentImageIndex % project.gradients.length]} opacity-60`} />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          </div>

          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              src={project.images[currentImageIndex]}
              alt={`${project.name} - Case Study by 44FINGERS`}
              title={`${project.name} - Detailed View`}
              className="relative w-full h-full object-contain z-10 will-change-transform brightness-[1.05] contrast-[1.05]"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
            />
          </AnimatePresence>

          {/* Nav Dots */}
          {project.images.length > 1 && (
            <div className="absolute bottom-10 flex gap-3 z-40" onClick={(e) => e.stopPropagation()}>
              {project.images.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${idx === currentImageIndex ? 'w-10 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 md:px-8 flex justify-between pointer-events-none z-50">
            <button
              onClick={prevImage}
              className="pointer-events-auto p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="pointer-events-auto p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* RIGHT: CONTENT ZONE */}
        <div className="w-full md:w-[30%] flex flex-col h-[60vh] md:h-full relative bg-[#080808]/60 backdrop-blur-3xl border-l border-white/5">
          <div className="flex-1 overflow-y-auto px-8 md:px-14 py-12 custom-scrollbar">
            <div className="space-y-10">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 rounded-md border border-indigo-500/30 bg-indigo-500/10 text-[9px] font-black text-indigo-400 uppercase tracking-widest">Archive_Entry_{project.id}</div>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.85]">
                  {project.name.toUpperCase()}
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em]">Context</span>
                <p className="text-lg font-light text-white/60 leading-relaxed">
                  {project.detail_description}
                </p>
              </div>

              {/* Challenges */}
              {project.problems && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
                    <AlertCircle className="w-3 h-3 text-indigo-500" />
                    <span>Obstacles</span>
                  </div>
                  <div className="grid gap-3">
                    {project.problems.map((prob: string, i: number) => (
                      <div key={i} className="flex gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-colors">
                        <div className="text-indigo-500 font-mono text-[10px]">0{i + 1}</div>
                        <p className="text-sm text-white/50 leading-snug">{prob}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
                  <Code className="w-3 h-3 text-indigo-500" />
                  <span>Architecture</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t: string, i: number) => (
                    <span key={i} className="px-5 py-3 rounded-2xl text-[10px] font-mono font-bold text-white/60 bg-white/5 border border-white/5 uppercase hover:bg-white/10 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/5">
                <div className="bg-black/40 p-6 flex flex-col gap-2">
                  <span className="text-[9px] text-white/20 uppercase tracking-widest font-black">Timeline</span>
                  <div className="flex items-center gap-3 font-bold text-white text-sm uppercase">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    {project.duration}
                  </div>
                </div>
                <div className="bg-black/40 p-6 flex flex-col gap-2">
                  <span className="text-[9px] text-white/20 uppercase tracking-widest font-black">Scale</span>
                  <div className="flex items-center gap-3 font-bold text-white text-sm uppercase">
                    <Users className="w-4 h-4 text-indigo-500" />
                    {project.teamSize} Head
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-14 bg-gradient-to-t from-[#080808] via-[#080808]/90 to-transparent pt-16">
            <button
              onClick={() => { onClose(); onWantSameClick(); }}
              className="group relative w-full py-7 bg-white rounded-[24px] overflow-hidden transition-all active:scale-[0.97]"
            >
              <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              <span className="relative z-10 flex items-center justify-center gap-4 text-black font-black uppercase text-xs tracking-[0.2em] group-hover:text-white transition-colors duration-500">
                Initiate Project <ArrowUpRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};


const ProjectCard = ({ project, onClick, onMouseEnter, onMouseLeave, className }: { project: any, onClick: () => void, onMouseEnter?: () => void, onMouseLeave?: () => void, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative overflow-hidden rounded-[40px] cursor-pointer border border-white/5 bg-[#050505] portfolio-item will-change-transform ${className}`}
      onClick={onClick}
    >
      {/* Rich Mesh Card Backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradients[0]} opacity-[0.25] transition-opacity duration-700`} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
      </div>

      {/* Content Meta */}
      <div className="absolute top-6 left-6 z-20">
        <span className="px-3 py-1.5 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
          Entry {project.id}
        </span>
      </div>

      {/* Main Visual - Full Cover */}
      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-[1200ms] ease-[0.22,1,0.36,1]">
        <img
          src={project.image}
          alt={`${project.name} - AI-Powered Mobile Development by 44FINGERS`}
          title={`${project.name} - High-Performance Mobile Solution`}
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Info Strip */}
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-px bg-indigo-500" />
            <span className="text-[10px] font-black text-indigo-500/80 uppercase tracking-[0.3em]">{project.tech[0]}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none">
            {project.name}
          </h3>
        </div>
      </div>

      <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
        <ArrowUpRight className="w-5 h-5 text-white" />
      </div>
    </motion.div>
  );
};

const PortfolioSection = ({ onWantSameClick }: PortfolioSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const activeFilter: keyof typeof portfolioData = 'Mobile';
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [hoveredProject, setHoveredProject] = useState<any | null>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Backdrop Parallax (Simple and smooth)
      gsap.to(marqueeRef.current, {
        yPercent: -20,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Bento Spanning Logic for 3-column grid
  const getBentoClass = (index: number) => {
    const base = "h-[450px]";
    switch (index) {
      case 0: return `${base} lg:col-span-2 lg:h-[500px]`;
      case 1: return `${base} lg:col-span-1 lg:row-span-2 lg:h-full`;
      case 2: return `${base} lg:col-span-1 lg:h-[500px]`;
      case 3: return `${base} lg:col-span-1 lg:h-[500px]`;
      case 4: return `${base} lg:col-span-1 lg:h-[500px]`;
      case 5: return `${base} lg:col-span-2 lg:h-[500px]`;
      default: return `${base} lg:col-span-1 lg:h-[500px]`;
    }
  };

  const activeGrad = hoveredProject?.gradients[0] || (selectedProject?.gradients[0] || 'from-indigo-600 to-purple-800');

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative min-h-screen bg-[#020202] py-24 md:py-40 overflow-hidden"
    >
      {/* Original Minimal Background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.06]">
        <div ref={marqueeRef} className="text-[23vw] font-black text-white leading-none whitespace-nowrap will-change-transform uppercase tracking-tighter">
          PROJECTS
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mb-24 md:mb-40">
          <div className="flex items-center gap-6 mb-8 group">
            <span className="text-indigo-500 font-mono text-xs tracking-[0.5em] font-black uppercase bg-indigo-500/5 px-4 py-1.5 rounded-full border border-indigo-500/10">Archive.v3</span>
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black text-white tracking-[-0.04em] leading-[0.75] mb-12">
            SELECT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500">SYSTEMS</span>
          </h2>
          <p className="text-2xl text-white/40 font-light max-w-xl leading-relaxed tracking-tight">
            A high-performance manifest of digital engineering, architectural precision, and avant-garde mobile solutions.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {portfolioData[activeFilter].map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={getBentoClass(idx)}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
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