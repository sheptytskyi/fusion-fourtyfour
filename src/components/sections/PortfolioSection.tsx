import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedBackground from '../AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const portfolioData = {
  Mobile: [
    {
      id: 7,
      name: 'Online Grocery Shop App',
      image: 'mobile/tosim.png',
      description: 'Easy grocery shopping with secure payments and fast delivery',
      teamSize: 4,
      duration: '3 months',
      problems: ['Delivery tracking', 'Product search', 'User Engagement'],
      tech: ['Flutter', 'Firebase', 'Node.js']
    },
    {
      id: 8,
      name: 'Neobank for telecom App',
      image: 'mobile/vodafone.png',
      description: 'Digital banking with instant payments for telecom users',
      teamSize: 6,
      duration: '5 months',
      problems: ['Telecom Integration', 'Instant Payments', 'Data Security', 'Service Automation', ''],
      tech: ['Flutter', 'Dart', 'WebRTC']
    },
    {
      id: 9,
      name: 'Online Banking App',
      image: 'mobile/sense.png',
      description: 'Secure digital banking with instant transfers and expense tracking',
      teamSize: 8,
      duration: '12 months',
      problems: ['Real-time Transactions', 'Security', 'User Authentication', 'Scalability'],
      tech: ['Swift', 'Kotlin', 'Blockchain']
    },
    {
      id: 10,
      name: 'Online Alcohol Shop App',
      image: 'mobile/okwine.png',
      description: 'Convenient online alcohol ordering with delivery and age verification',
      teamSize: 5,
      duration: '3 months',
      problems: ['Product Discovery', 'Secure Payments', 'Age Verification', 'Delivery Tracking'],
      tech: ['Flutter', 'Python', 'Maps API']
    },
    {
      id: 11,
      name: 'Gas Station App',
      image: 'mobile/ukrnafta.png',
      description: 'Smart fuel management with contactless payments and loyalty rewards',
      teamSize: 5,
      duration: '4 months',
      problems: ['Contactless Payments', 'Loyalty Integration', 'Real-time prices'],
      tech: ['React Native', 'Python', 'Websockets']
    },
    {
      id: 12,
      name: 'Online Payment Transaction',
      image: 'mobile/portmone.png',
      description: 'Fast and secure online payment processing for businesses and users',
      teamSize: 7,
      duration: '9 months',
      problems: ['Transaction Speed', 'Data Security', 'Fraud Prevention'],
      tech: ['Flutter', 'Node.js', 'MongoDB', 'WebRTC']
    }
  ],
  Web: [
    {
      id: 1,
      name: 'E-Commerce Platform',
      image: 'web/ecomerce.jpg',
      description: 'Modern e-commerce solution with AI-powered recommendations',
      teamSize: 5,
      duration: '4 months',
      problems: ['Scalability', 'Performance', 'User Experience'],
      tech: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      id: 2,
      name: 'Banking Dashboard',
      image: 'web/bank.jpg',
      description: 'Secure financial management system with real-time analytics',
      teamSize: 8,
      duration: '6 months',
      problems: ['Data Security', 'Real-time Data', 'Compliance'],
      tech: ['Vue.js', 'Python', 'PostgreSQL', 'Docker']
    },
    {
      id: 3,
      name: 'SaaS Analytics',
      image: 'web/saas.jpg',
      description: 'Advanced analytics platform for business intelligence',
      teamSize: 6,
      duration: '5 months',
      problems: ['Data Processing', 'Visualization', 'Performance'],
      tech: ['Next.js', 'TypeScript', 'D3.js', 'Redis']
    },
    {
      id: 4,
      name: 'CRM System',
      image: 'web/crm.jpg',
      description: 'Complete customer relationship management solution',
      teamSize: 7,
      duration: '8 months',
      problems: ['AI Automation', 'Integration', 'System Scalability'],
      tech: ['React', 'Django', 'PostgreSQL', 'Celery']
    },
    {
      id: 5,
      name: 'Learning Management',
      image: 'web/edu.jpg',
      description: 'Interactive learning platform with gamification',
      teamSize: 5,
      duration: '6 months',
      problems: ['Engagement', 'Content Delivery', 'Progress Tracking'],
      tech: ['Vue.js', 'Laravel', 'MySQL', 'FFmpeg']
    },
    {
      id: 6,
      name: 'Healthcare Portal',
      image: 'web/health.jpg',
      description: 'Secure patient management and telemedicine platform',
      teamSize: 9,
      duration: '10 months',
      problems: ['HIPAA Compliance', 'Real-time Communication', 'Security'],
      tech: ['React', 'Node.js', 'MongoDB', 'WebRTC']
    }
  ],
  AI: [
    {
      id: 1,
      name: 'SmartResume Analyzer',
      image: 'ai/cv.jpg',
      description: 'Manual monitoring, delayed alerts, scalability',
      teamSize: 5,
      duration: '4 months',
      problems: ['Hiring speed', 'Candidate Filtering Accuracy'],
      tech: ['Python', 'Hugging Face', 'PyTorch']
    },
    {
      id: 2,
      name: 'VisionGuard',
      image: 'ai/secure.jpg',
      description: 'Secure financial management system with real-time analytics',
      teamSize: 8,
      duration: '6 months',
      problems: ['Data Security', 'Real-time Data', 'Compliance'],
      tech: ['Python', 'OpenCV', 'AWS']
    },
    {
      id: 3,
      name: 'ChatDoc Assistant',
      image: 'ai/chat.jpg',
      description: 'AI chatbot for document comprehension',
      teamSize: 6,
      duration: '5 months',
      problems: ['Slow document search', 'Poor user support', 'Context loss'],
      tech: ['LangChain', 'FastAPI', 'OpenAI API']
    },
    {
      id: 4,
      name: 'PredictiveSales Engine',
      image: 'ai/1.jpg',
      description: 'AI model predicting customer purchase intent',
      teamSize: 7,
      duration: '8 months',
      problems: ['Low conversion rate', 'Poor Targeting', 'Data Overload'],
      tech: ['Python', 'Scikit-Learn', 'Airflow']
    },
    {
      id: 5,
      name: 'AutoSketch Generator',
      image: 'ai/sketch.jpg',
      description: 'Interactive learning platform with gamification',
      teamSize: 5,
      duration: '6 months',
      problems: ['Creative block', 'Design iteration speed', 'Visualization'],
      tech: ['Stable Diffusion', 'FastAPI', 'Python']
    },
  ],
  Crypto: [
    {
      id: 19,
      name: 'DeFi Trading Platform',
      image: 'crypto/defi.jpg',
      description: 'Decentralized trading platform with advanced charting',
      teamSize: 6,
      duration: '7 months',
      problems: ['Smart Contracts', 'Security', 'Gas Optimization'],
      tech: ['Solidity', 'Web3.js', 'React', 'Ethereum']
    },
    {
      id: 20,
      name: 'NFT Marketplace',
      image: 'crypto/nft.jpg',
      description: 'Premium NFT marketplace with creator tools and analytics',
      teamSize: 8,
      duration: '5 months',
      problems: ['Blockchain Integration', 'IPFS Storage', 'User Experience'],
      tech: ['Next.js', 'Solidity', 'IPFS', 'Polygon']
    },
    {
      id: 23,
      name: 'Cross-Chain Bridge',
      image: 'crypto/chain.jpg',
      description: 'Secure asset bridge between multiple blockchain networks',
      teamSize: 10,
      duration: '12 months',
      problems: ['Cross-Chain Security', 'Validator Network', 'Asset Locking'],
      tech: ['Solidity', 'Rust', 'Cosmos SDK', 'Tendermint']
    },
    {
      id: 24,
      name: 'Metaverse Platform',
      image: 'crypto/metaverse.jpg',
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

    // Ensure sections are visible by default
    gsap.set([title, filters], { opacity: 1, y: 0 });
    
    // Check if section is already in viewport - if not, hide and animate
    const rect = section.getBoundingClientRect();
    const isBelowViewport = rect.top > window.innerHeight * 0.5;
    
    if (isBelowViewport) {
      // Only animate if section is below viewport
      gsap.set([title, filters], { opacity: 0, y: 50 });
    }

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

    // Fallback: ensure section is visible after 2 seconds if ScrollTrigger didn't fire
    const fallbackTimeout = setTimeout(() => {
      if (section && title && filters) {
        const titleOpacity = window.getComputedStyle(title).opacity;
        if (titleOpacity === '0') {
          gsap.to([title, filters], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      }
    }, 2000);

    return () => {
      clearTimeout(fallbackTimeout);
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
                      <span className="text-gray-fg/60 text-xs">Solved problems:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.problems.slice(0, 4).map((problem, index) => (
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
                      <span className="text-gray-fg/60 text-xs">Solved problems:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.problems.slice(0, 4).map((problem, index) => (
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