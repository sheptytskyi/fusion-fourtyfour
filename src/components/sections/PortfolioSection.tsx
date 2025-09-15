import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedBackground from '../AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const portfolioData = {
  Web: [
    {
      id: 1,
      name: 'E-Commerce Platform',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      description: 'Modern e-commerce solution with AI-powered recommendations',
      teamSize: 5,
      duration: '4 months',
      problems: ['Scalability', 'Performance', 'User Experience'],
      tech: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      id: 2,
      name: 'Banking Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      description: 'Secure financial management system with real-time analytics',
      teamSize: 8,
      duration: '6 months',
      problems: ['Security', 'Real-time Data', 'Compliance'],
      tech: ['Vue.js', 'Python', 'PostgreSQL', 'Docker']
    },
    {
      id: 3,
      name: 'SaaS Analytics',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      description: 'Advanced analytics platform for business intelligence',
      teamSize: 6,
      duration: '5 months',
      problems: ['Data Processing', 'Visualization', 'Performance'],
      tech: ['Next.js', 'TypeScript', 'D3.js', 'Redis']
    },
    {
      id: 4,
      name: 'CRM System',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
      description: 'Complete customer relationship management solution',
      teamSize: 7,
      duration: '8 months',
      problems: ['Automation', 'Integration', 'Scalability'],
      tech: ['React', 'Django', 'PostgreSQL', 'Celery']
    },
    {
      id: 5,
      name: 'Learning Management',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      description: 'Interactive learning platform with gamification',
      teamSize: 5,
      duration: '6 months',
      problems: ['Engagement', 'Content Delivery', 'Progress Tracking'],
      tech: ['Vue.js', 'Laravel', 'MySQL', 'FFmpeg']
    },
    {
      id: 6,
      name: 'Healthcare Portal',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      description: 'Secure patient management and telemedicine platform',
      teamSize: 9,
      duration: '10 months',
      problems: ['HIPAA Compliance', 'Real-time Communication', 'Security'],
      tech: ['React', 'Node.js', 'MongoDB', 'WebRTC']
    }
  ],
  Mobile: [
    {
      id: 7,
      name: 'Fitness Tracker App',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      description: 'AI-powered fitness tracking with personalized workouts',
      teamSize: 4,
      duration: '3 months',
      problems: ['Battery Optimization', 'Data Sync', 'User Engagement'],
      tech: ['React Native', 'Firebase', 'TensorFlow', 'Node.js']
    },
    {
      id: 8,
      name: 'Social Media App',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop',
      description: 'Next-gen social platform with AR filters and real-time chat',
      teamSize: 6,
      duration: '5 months',
      problems: ['Real-time Communication', 'AR Integration', 'Scalability'],
      tech: ['Flutter', 'Dart', 'WebRTC', 'ARCore']
    },
    {
      id: 9,
      name: 'Food Delivery App',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      description: 'Real-time food delivery with GPS tracking and payments',
      teamSize: 8,
      duration: '7 months',
      problems: ['Real-time Tracking', 'Payment Integration', 'Driver Management'],
      tech: ['React Native', 'Node.js', 'Socket.io', 'Stripe']
    },
    {
      id: 10,
      name: 'Banking Mobile App',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      description: 'Secure mobile banking with biometric authentication',
      teamSize: 10,
      duration: '12 months',
      problems: ['Security', 'Biometric Auth', 'Regulatory Compliance'],
      tech: ['Flutter', 'Kotlin', 'Swift', 'Blockchain']
    },
    {
      id: 11,
      name: 'Travel Companion',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
      description: 'AI-powered travel planning and booking assistant',
      teamSize: 5,
      duration: '4 months',
      problems: ['API Integration', 'Offline Functionality', 'Location Services'],
      tech: ['React Native', 'Python', 'TensorFlow', 'Google Maps']
    },
    {
      id: 12,
      name: 'Healthcare Mobile',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
      description: 'Telemedicine app with appointment scheduling and prescriptions',
      teamSize: 7,
      duration: '9 months',
      problems: ['HIPAA Compliance', 'Video Calling', 'Prescription Management'],
      tech: ['Flutter', 'Node.js', 'MongoDB', 'WebRTC']
    }
  ],
  Desktop: [
    {
      id: 13,
      name: 'Design Studio Suite',
      image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=300&fit=crop',
      description: 'Professional design tools with collaborative features',
      teamSize: 7,
      duration: '8 months',
      problems: ['Performance', 'File Management', 'Collaboration'],
      tech: ['Electron', 'React', 'C++', 'WebGL']
    },
    {
      id: 14,
      name: 'Analytics Platform',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      description: 'Advanced data visualization and business intelligence tool',
      teamSize: 5,
      duration: '6 months',
      problems: ['Data Processing', 'Visualization', 'Performance'],
      tech: ['PyQt', 'Python', 'D3.js', 'PostgreSQL']
    },
    {
      id: 15,
      name: 'Video Editor Pro',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
      description: 'Professional video editing software with AI enhancements',
      teamSize: 9,
      duration: '14 months',
      problems: ['Real-time Processing', 'GPU Acceleration', 'Codec Support'],
      tech: ['C++', 'CUDA', 'FFmpeg', 'Qt']
    },
    {
      id: 16,
      name: 'CAD Software',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      description: '3D modeling and engineering design platform',
      teamSize: 12,
      duration: '18 months',
      problems: ['3D Rendering', 'Precision Calculations', 'File Formats'],
      tech: ['C++', 'OpenGL', 'Qt', 'NURBS']
    },
    {
      id: 17,
      name: 'Trading Terminal',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      description: 'High-frequency trading platform with real-time data',
      teamSize: 8,
      duration: '10 months',
      problems: ['Low Latency', 'Data Streaming', 'Risk Management'],
      tech: ['C++', 'FIX Protocol', 'Qt', 'Redis']
    },
    {
      id: 18,
      name: 'Scientific Calculator',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      description: 'Advanced scientific computation and visualization tool',
      teamSize: 4,
      duration: '5 months',
      problems: ['Mathematical Precision', 'Graphing', 'Export Formats'],
      tech: ['Python', 'NumPy', 'Matplotlib', 'Tkinter']
    }
  ],
  Web3: [
    {
      id: 19,
      name: 'DeFi Trading Platform',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      description: 'Decentralized trading platform with advanced charting',
      teamSize: 6,
      duration: '7 months',
      problems: ['Smart Contracts', 'Security', 'Gas Optimization'],
      tech: ['Solidity', 'Web3.js', 'React', 'Ethereum']
    },
    {
      id: 20,
      name: 'NFT Marketplace',
      image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=300&fit=crop',
      description: 'Premium NFT marketplace with creator tools and analytics',
      teamSize: 8,
      duration: '5 months',
      problems: ['Blockchain Integration', 'IPFS Storage', 'User Experience'],
      tech: ['Next.js', 'Solidity', 'IPFS', 'Polygon']
    },
    {
      id: 21,
      name: 'DAO Governance',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
      description: 'Decentralized autonomous organization management platform',
      teamSize: 7,
      duration: '8 months',
      problems: ['Voting Mechanisms', 'Treasury Management', 'Proposal System'],
      tech: ['Solidity', 'React', 'IPFS', 'The Graph']
    },
    {
      id: 22,
      name: 'Yield Farming Protocol',
      image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=300&fit=crop',
      description: 'Automated yield optimization with smart contract farming',
      teamSize: 5,
      duration: '6 months',
      problems: ['Smart Contract Security', 'APY Calculations', 'Gas Efficiency'],
      tech: ['Solidity', 'Hardhat', 'OpenZeppelin', 'Chainlink']
    },
    {
      id: 23,
      name: 'Cross-Chain Bridge',
      image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&h=300&fit=crop',
      description: 'Secure asset bridge between multiple blockchain networks',
      teamSize: 10,
      duration: '12 months',
      problems: ['Cross-Chain Security', 'Validator Network', 'Asset Locking'],
      tech: ['Solidity', 'Rust', 'Cosmos SDK', 'Tendermint']
    },
    {
      id: 24,
      name: 'Metaverse Platform',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      description: 'Virtual world with NFT land ownership and social features',
      teamSize: 15,
      duration: '24 months',
      problems: ['3D Rendering', 'Avatar Systems', 'Virtual Economy'],
      tech: ['Unity', 'Solidity', 'IPFS', 'WebRTC']
    }
  ]
};

interface PortfolioSectionProps {
  onWantSameClick: () => void;
}

const PortfolioSection = ({ onWantSameClick }: PortfolioSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [activeFilter, setActiveFilter] = useState<keyof typeof portfolioData>('Web');
  const [visibleProjects, setVisibleProjects] = useState(6);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const filters = filtersRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !filters || !cards) return;

    // Set initial states
    gsap.set([title, filters], { opacity: 0, y: 50 });

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .to(filters, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Animate cards when filter changes with GSAP + ScrollTrigger
    const cards = cardsRef.current;
    if (!cards) return;

    gsap.fromTo(cards.children, 
      { opacity: 0, scale: 0.8, y: 30 },
      { 
        opacity: 1, 
        scale: 1,
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power2.out' 
      }
    );
  }, [activeFilter]);

  const currentProjects = portfolioData[activeFilter];

  const handleFilterChange = (filter: keyof typeof portfolioData) => {
    setActiveFilter(filter);
  };

  const scrollLeft = () => {
    const container = window.innerWidth < 768 ? mobileScrollContainerRef.current : scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = window.innerWidth < 768 ? mobileScrollContainerRef.current : scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef} 
      className="section-gray min-h-screen px-4 md:px-8 lg:px-16 py-16 md:py-20 relative overflow-hidden snap-start"
    >
      <AnimatedBackground variant="gray" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-jetbrains font-bold text-gray-fg mb-4">
            OUR <span className="bg-gradient-to-r from-pink-300 via-purple-400 to-purple-500
              text-transparent bg-clip-text">PORTFOLIO</span>
          </h2>
          <p className="text-base md:text-lg font-jetbrains font-light text-gray-fg/70">
            Showcasing our best work across different domains
          </p>
        </div>

        {/* Filter Buttons */}
        <div ref={filtersRef} className="flex justify-center mb-6 md:mb-8">
          <div className="glass-card p-1 flex flex-wrap justify-center gap-1">
            {Object.keys(portfolioData).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter as keyof typeof portfolioData)}
                className={`px-2 md:px-3 py-2 font-jetbrains text-xs tracking-wider transition-all duration-300 rounded-md ${
                  activeFilter === filter
                    ? 'bg-gradient-neon text-white'
                    : 'text-gray-fg/70 hover:text-neon-blue'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards - Responsive Layout */}
        <div className="relative overflow-hidden">
          {/* Desktop Scroll Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass-card p-3 hover:bg-purple-blue/20 transition-all duration-300 hidden md:block"
          >
            <ChevronLeft className="w-5 h-5 text-purple-blue" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass-card p-3 hover:bg-purple-blue/20 transition-all duration-300 hidden md:block"
          >
            <ChevronRight className="w-5 h-5 text-purple-blue" />
          </button>

          {/* Mobile: Horizontal Scroll Layout */}
          <div className="block md:hidden relative">
            {/* Mobile Scroll Arrows */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass-card p-2 hover:bg-purple-blue/20 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4 text-purple-blue" />
            </button>
            
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass-card p-2 hover:bg-purple-blue/20 transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4 text-purple-blue" />
            </button>

            <div 
              ref={mobileScrollContainerRef}
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-blue/30 scroll-smooth mx-8"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div ref={cardsRef} className="flex space-x-4">
                {currentProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="glass-card group cursor-pointer flex-shrink-0 w-72 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-500"
                    style={{ scrollSnapAlign: 'start' }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { 
                      y: -5, 
                      scale: 1.01,
                      boxShadow: '0 10px 20px rgba(174, 0, 255, 0.2)',
                      duration: 0.2, 
                      ease: 'power2.out' 
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      y: 0, 
                      scale: 1,
                      boxShadow: '0 0 0 rgba(0,255,255,0)',
                      duration: 0.2, 
                      ease: 'power2.out' 
                    });
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-glass">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-102"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="glass-card px-2 py-1 text-xs font-jetbrains text-gray-fg/80">
                        {activeFilter}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-jetbrains font-semibold text-gray-fg">
                      {project.name}
                    </h3>
                    
                    <p className="text-gray-fg/70 font-jetbrains font-light leading-relaxed text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-fg/60">Team:</span>
                        <span className="text-neon-blue ml-1">{project.teamSize}</span>
                      </div>
                      <div>
                        <span className="text-gray-fg/60">Duration:</span>
                        <span className="text-neon-blue ml-1">{project.duration}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-fg/60 text-xs">Problems:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.problems.slice(0, 2).map((problem, index) => (
                          <span key={index} className="glass px-1 py-0.5 text-xs text-gray-fg/80">
                            {problem}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-fg/60 text-xs">Tech:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tech.slice(0, 3).map((tech, index) => (
                          <span key={index} className="glass px-1 py-0.5 text-xs text-neon-blue">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={onWantSameClick}
                        className="btn-neon flex-1 text-xs"
                      >
                        I WANT THE SAME
                      </button>

                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition"
                        title="View Result"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0 0L10 21l-7-7L14 3z" />
                        </svg>
                      </a>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Horizontal Scroll Layout */}
          <div className="hidden md:block">
            <div 
              ref={scrollContainerRef}
              className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-blue/30 scroll-smooth mx-16"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div className="flex space-x-6">
                {currentProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="glass-card group cursor-pointer flex-shrink-0 w-80 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-500"
                    style={{ scrollSnapAlign: 'start' }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { 
                        y: -10, 
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(174, 0, 255, 0.3)',
                        duration: 0.1, 
                        ease: 'power2.out' 
                      });
                    }}
                    onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      y: 0, 
                      scale: 1,
                      boxShadow: '0 0 0 rgba(0,255,255,0)',
                      duration: 0.1, 
                      ease: 'power2.out' 
                    });
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-glass">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-102"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="glass-card px-2 py-1 text-xs font-jetbrains text-gray-fg/80">
                        {activeFilter}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-jetbrains font-semibold text-gray-fg">
                      {project.name}
                    </h3>
                    
                    <p className="text-gray-fg/70 font-jetbrains font-light leading-relaxed text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-fg/60">Team:</span>
                        <span className="text-neon-blue ml-1">{project.teamSize}</span>
                      </div>
                      <div>
                        <span className="text-gray-fg/60">Duration:</span>
                        <span className="text-neon-blue ml-1">{project.duration}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-fg/60 text-xs">Problems:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.problems.slice(0, 2).map((problem, index) => (
                          <span key={index} className="glass px-1 py-0.5 text-xs text-gray-fg/80">
                            {problem}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-fg/60 text-xs">Tech:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tech.slice(0, 3).map((tech, index) => (
                          <span key={index} className="glass px-1 py-0.5 text-xs text-neon-blue">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      {/* Кнопка "I WANT THE SAME" */}
                      <button
                        onClick={onWantSameClick}
                        className="btn-neon flex-1 text-xs"
                      >
                        I WANT THE SAME
                      </button>

                      {/* Кругла мінімалістична кнопка для результату */}
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition"
                        title="View Result"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0 0L10 21l-7-7L14 3z" />
                        </svg>
                      </a>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-neon-blue rounded-full opacity-20 floating"></div>
      <div className="absolute bottom-40 right-20 w-3 h-3 bg-neon-purple rounded-full opacity-15 floating-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-neon-orange rounded-full opacity-25 floating"></div>
    </section>
  );
};

export default PortfolioSection;