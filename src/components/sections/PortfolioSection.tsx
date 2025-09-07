import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioData = {
  Web: [
    {
      id: 1,
      name: 'E-Commerce Platform',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      description: 'Modern e-commerce solution with AI-powered recommendations',
      teamSize: 5,
      duration: '4 months',
      problems: ['Scalability', 'Performance', 'User Experience'],
      tech: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      id: 2,
      name: 'Banking Dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'Secure financial management system with real-time analytics',
      teamSize: 8,
      duration: '6 months',
      problems: ['Security', 'Real-time Data', 'Compliance'],
      tech: ['Vue.js', 'Python', 'PostgreSQL', 'Docker']
    },
    // Add more projects...
  ],
  Mobile: [
    {
      id: 3,
      name: 'Fitness Tracker App',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      description: 'AI-powered fitness tracking with personalized workouts',
      teamSize: 4,
      duration: '3 months',
      problems: ['Battery Optimization', 'Data Sync', 'User Engagement'],
      tech: ['React Native', 'Firebase', 'TensorFlow', 'Node.js']
    },
    {
      id: 4,
      name: 'Social Media App',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&h=400&fit=crop',
      description: 'Next-gen social platform with AR filters and real-time chat',
      teamSize: 6,
      duration: '5 months',
      problems: ['Real-time Communication', 'AR Integration', 'Scalability'],
      tech: ['Flutter', 'Dart', 'WebRTC', 'ARCore']
    },
  ],
  Desktop: [
    {
      id: 5,
      name: 'Design Studio Suite',
      image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop',
      description: 'Professional design tools with collaborative features',
      teamSize: 7,
      duration: '8 months',
      problems: ['Performance', 'File Management', 'Collaboration'],
      tech: ['Electron', 'React', 'C++', 'WebGL']
    },
    {
      id: 6,
      name: 'Analytics Platform',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'Advanced data visualization and business intelligence tool',
      teamSize: 5,
      duration: '6 months',
      problems: ['Data Processing', 'Visualization', 'Performance'],
      tech: ['PyQt', 'Python', 'D3.js', 'PostgreSQL']
    },
  ],
  Web3: [
    {
      id: 7,
      name: 'DeFi Trading Platform',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      description: 'Decentralized trading platform with advanced charting',
      teamSize: 6,
      duration: '7 months',
      problems: ['Smart Contracts', 'Security', 'Gas Optimization'],
      tech: ['Solidity', 'Web3.js', 'React', 'Ethereum']
    },
    {
      id: 8,
      name: 'NFT Marketplace',
      image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&h=400&fit=crop',
      description: 'Premium NFT marketplace with creator tools and analytics',
      teamSize: 8,
      duration: '5 months',
      problems: ['Blockchain Integration', 'IPFS Storage', 'User Experience'],
      tech: ['Next.js', 'Solidity', 'IPFS', 'Polygon']
    },
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
  
  const [activeFilter, setActiveFilter] = useState<keyof typeof portfolioData>('Web');
  const [visibleProjects, setVisibleProjects] = useState(2);

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
    // Animate cards when filter changes
    const cards = cardsRef.current;
    if (!cards) return;

    gsap.fromTo(cards.children, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power2.out' 
      }
    );
  }, [activeFilter]);

  const currentProjects = portfolioData[activeFilter].slice(0, visibleProjects);

  const handleFilterChange = (filter: keyof typeof portfolioData) => {
    setActiveFilter(filter);
    setVisibleProjects(2); // Reset to show first 2 projects
  };

  const showMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 2, portfolioData[activeFilter].length));
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef} 
      className="section-gray min-h-screen px-8 md:px-16 py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-jetbrains font-bold text-gray-fg mb-4">
            OUR <span className="neon-text">PORTFOLIO</span>
          </h2>
          <p className="text-lg font-jetbrains font-light text-gray-fg/70">
            Showcasing our best work across different domains
          </p>
        </div>

        {/* Filter Buttons */}
        <div ref={filtersRef} className="flex justify-center mb-12">
          <div className="glass-card p-2 flex space-x-2">
            {Object.keys(portfolioData).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter as keyof typeof portfolioData)}
                className={`px-6 py-3 font-jetbrains text-sm tracking-wider transition-all duration-300 rounded-lg ${
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

        {/* Project Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {currentProjects.map((project) => (
            <div key={project.id} className="glass-card group cursor-pointer">
              <div className="relative overflow-hidden rounded-t-glass">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="glass-card px-3 py-1 text-xs font-jetbrains text-gray-fg/80">
                    {activeFilter}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-jetbrains font-semibold text-gray-fg">
                  {project.name}
                </h3>
                
                <p className="text-gray-fg/70 font-jetbrains font-light leading-relaxed">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-fg/60">Team Size:</span>
                    <span className="text-neon-blue ml-2">{project.teamSize} people</span>
                  </div>
                  <div>
                    <span className="text-gray-fg/60">Duration:</span>
                    <span className="text-neon-blue ml-2">{project.duration}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-fg/60 text-sm">Problems Solved:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.problems.map((problem, index) => (
                      <span key={index} className="glass px-2 py-1 text-xs text-gray-fg/80">
                        {problem}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-fg/60 text-sm">Tech Stack:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="glass px-2 py-1 text-xs text-neon-blue">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={onWantSameClick}
                  className="btn-neon w-full mt-6"
                >
                  I WANT THE SAME
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {visibleProjects < portfolioData[activeFilter].length && (
          <div className="text-center">
            <button
              onClick={showMoreProjects}
              className="btn-glass"
            >
              SHOW MORE PROJECTS
            </button>
          </div>
        )}
      </div>

      {/* Background particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-neon-blue rounded-full opacity-20 floating"></div>
      <div className="absolute bottom-40 right-20 w-3 h-3 bg-neon-purple rounded-full opacity-15 floating-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-neon-orange rounded-full opacity-25 floating"></div>
    </section>
  );
};

export default PortfolioSection;