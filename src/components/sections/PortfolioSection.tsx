import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Users, Clock, Code, AlertCircle, ArrowUpRight, X, ChevronLeft, ChevronRight, Smartphone, Cpu, Zap, Brain, Bitcoin } from 'lucide-react';
import AnimatedBackground from '../AnimatedBackground';

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
        'from-[#0F766E] via-[#020617] to-[#020617]',
        'from-[#134E4A] via-[#020617] to-[#020617]',
        'from-[#0D9488] via-[#020617] to-[#020617]',
        'from-[#14B8A6] via-[#020617] to-[#020617]',
        'from-[#2DD4BF] via-[#020617] to-[#020617]',
        'from-[#5EEAD4] via-[#020617] to-[#020617]',
        'from-[#99F6E4] via-[#020617] to-[#020617]'
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
        'from-[#4338CA] via-[#020617] to-[#020617]',
        'from-[#4F46E5] via-[#020617] to-[#020617]',
        'from-[#6366F1] via-[#020617] to-[#020617]',
        'from-[#818CF8] via-[#020617] to-[#020617]',
        'from-[#A5B4FC] via-[#020617] to-[#020617]',
        'from-[#C7D2FE] via-[#020617] to-[#020617]',
        'from-[#E0E7FF] via-[#020617] to-[#020617]'
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
        'from-[#1D4ED8] via-[#020617] to-[#020617]',
        'from-[#2563EB] via-[#020617] to-[#020617]',
        'from-[#3B82F6] via-[#020617] to-[#020617]',
        'from-[#60A5FA] via-[#020617] to-[#020617]',
        'from-[#93C5FD] via-[#020617] to-[#020617]',
        'from-[#BFDBFE] via-[#020617] to-[#020617]',
        'from-[#DBEAFE] via-[#020617] to-[#020617]'
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
        'from-[#B45309] via-[#020617] to-[#020617]',
        'from-[#D97706] via-[#020617] to-[#020617]',
        'from-[#F59E0B] via-[#020617] to-[#020617]',
        'from-[#FBBF24] via-[#020617] to-[#020617]',
        'from-[#FCD34D] via-[#020617] to-[#020617]',
        'from-[#FDE68A] via-[#020617] to-[#020617]'
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
        'from-[#047857] via-[#020617] to-[#020617]',
        'from-[#059669] via-[#020617] to-[#020617]',
        'from-[#10B981] via-[#020617] to-[#020617]',
        'from-[#34D399] via-[#020617] to-[#020617]',
        'from-[#6EE7B7] via-[#020617] to-[#020617]',
        'from-[#A7F3D0] via-[#020617] to-[#020617]'
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
        'from-[#7E22CE] via-[#020617] to-[#020617]',
        'from-[#9333EA] via-[#020617] to-[#020617]',
        'from-[#A855F7] via-[#020617] to-[#020617]',
        'from-[#C084FC] via-[#020617] to-[#020617]',
        'from-[#D8B4FE] via-[#020617] to-[#020617]',
        'from-[#E9D5FF] via-[#020617] to-[#020617]'
      ],
      link: 'https://apps.apple.com/us/app/portmone-payment-systems/id587804458'
    }
  ],
  // Web: [
  //   {
  //     id: 1,
  //     name: 'E-Commerce Platform',
  //     image: 'web/ecomerce.webp',
  //     images: ['web/all/ecomerce.webp', 'web/all/ecomerce1.webp'],
  //     description: 'Modern e-commerce solution with AI-powered recommendations',
  //     detail_description: 'A highly scalable e-commerce platform built for high-volume retail. It features an AI-driven recommendation engine that personalizes the shopping experience for each user. The platform supports multi-vendor capabilities, advanced inventory management, and a customizable storefront theme engine.',
  //     teamSize: 5,
  //     duration: '4 months',
  //     problems: ['Database Scalability during sales', 'Frontend Performance Optimization', 'Personalized User Experience', 'SEO Management'],
  //     tech: ['React', 'Node.js', 'MongoDB', 'Elasticsearch']
  //   },
  //   {
  //     id: 2,
  //     name: 'Banking Dashboard',
  //     image: 'web/bank.webp',
  //     images: ['web/all/bank.webp', 'web/all/bank2.webp'],
  //     description: 'Secure financial management system with real-time analytics',
  //     detail_description: 'A comprehensive web dashboard for corporate banking clients. It provides visualizations of cash flow, automated reporting, and role-based access control for team members. The interface is designed for high data density and quick decision-making, using real-time websockets for live updates.',
  //     teamSize: 8,
  //     duration: '6 months',
  //     problems: ['Data Security & Encryption', 'Real-time Data Visualization', 'Regulatory Compliance Reporting', 'Complex Permission Systems'],
  //     tech: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js']
  //   },
  //   {
  //     id: 3,
  //     name: 'SaaS Analytics',
  //     image: 'web/saas.webp',
  //     images: ['web/all/saas.webp', 'web/all/saas1.webp', 'web/all/saas2.webp'],
  //     description: 'Advanced analytics platform for business intelligence',
  //     detail_description: 'A SaaS product that aggregates data from various marketing and sales channels into a unified view. It offers customizable widgets, automated insights generation, and exportable reports. The challenge was processing large volumes of data efficiently to provide near-instant feedback to the user.',
  //     teamSize: 6,
  //     duration: '5 months',
  //     problems: ['Big Data Processing', 'Interactive Data Visualization', 'Query Performance', 'Multi-tenant Architecture'],
  //     tech: ['Next.js', 'TypeScript', 'D3.js', 'ClickHouse']
  //   },
  //   {
  //     id: 4,
  //     name: 'CRM System',
  //     image: 'web/crm.webp',
  //     images: ['web/all/crm.webp', 'web/all/crm1.webp', 'web/all/crm2.webp'],
  //     description: 'Complete customer relationship management solution',
  //     detail_description: 'A bespoke CRM system designed for enterprise needs. It tracks customer interactions across email, phone, and chat. Features include lead scoring, automated follow-ups, and a visual sales pipeline. Integration with third-party tools like Slack and Gmail was a key requirement.',
  //     teamSize: 7,
  //     duration: '8 months',
  //     problems: ['AI-driven Automation', 'Third-party API Integration', 'System Scalability', 'Data Consistency'],
  //     tech: ['React', 'Django', 'PostgreSQL', 'Redis']
  //   },
  //   {
  //     id: 5,
  //     name: 'Learning Management',
  //     image: 'web/edu.webp',
  //     images: ['web/all/edu.webp', 'web/all/edu1.webp', 'web/all/edu2.webp', 'web/all/edu3.webp'],
  //     description: 'Interactive learning platform with gamification',
  //     detail_description: 'An engaging LMS used by educational institutions. It supports video courses, interactive quizzes, and peer-to-peer assignments. Gamification elements like badges, leaderboards, and streaks were implemented to increase student retention and engagement.',
  //     teamSize: 5,
  //     duration: '6 months',
  //     problems: ['Student Engagement', 'Video Content Delivery', 'Progress Tracking Accuracy', 'Real-time Classrooms'],
  //     tech: ['Vue.js', 'Laravel', 'MySQL', 'WebSockets']
  //   },
  //   {
  //     id: 6,
  //     name: 'Healthcare Portal',
  //     image: 'web/health.webp',
  //     images: ['web/all/health.webp', 'web/all/health1.webp', 'web/all/health2.webp'],
  //     description: 'Secure patient management and telemedicine platform',
  //     detail_description: 'A HIPAA-compliant portal facilitating secure communication between doctors and patients. It includes features for booking appointments, viewing medical records, and conducting video consultations. Great attention was paid to UI accessibility and data privacy.',
  //     teamSize: 9,
  //     duration: '10 months',
  //     problems: ['HIPAA Compliance', 'Real-time Video Communication', 'Medical Data Security', 'Legacy EMR Integration'],
  //     tech: ['React', 'Node.js', 'MongoDB', 'WebRTC']
  //   }
  // ],
  // AI: [
  //   {
  //     id: 1,
  //     name: 'SmartCV Analyzer',
  //     image: 'ai/cv.webp',
  //     images: ['ai/all/cv.webp', 'ai/all/cv1.webp', 'ai/all/cv3.webp'],
  //     description: 'Automated CV screening and ranking system',
  //     detail_description: 'An AI-powered tool that helps HR teams screen thousands of resumes in minutes. It uses Natural Language Processing to extract key skills and experiences, matching them against job descriptions to rank candidates. The system learns from recruiter feedback to improve over time.',
  //     teamSize: 5,
  //     duration: '4 months',
  //     problems: ['Hiring speed', 'Candidate Filtering', 'Bias Reduction', 'Multilingual Support'],
  //     tech: ['Python', 'Hugging Face', 'PyTorch', 'FastAPI']
  //   },
  //   {
  //     id: 2,
  //     name: 'VisionGuard',
  //     image: 'ai/auto.webp',
  //     images: ['ai/all/auto.webp', 'ai/all/auto1.webp', 'ai/all/auto2.webp'],
  //     description: 'AI-powered process automation platform',
  //     detail_description: 'An intelligent automation system that uses machine learning and computer vision to optimize and automate operational workflows. The platform automatically analyzes visual and data inputs, identifies inefficiencies, triggers automated actions, and provides real-time insights. This significantly reduces manual work, minimizes human errors, and increases overall business productivity.',
  //     teamSize: 8,
  //     duration: '6 months',
  //     problems: [
  //       'Automated Workflow Recognition',
  //       'Data Accuracy & Noise Reduction',
  //       'Scalable Model Deployment',
  //       'Integration with Existing Systems'
  //     ],
  //     tech: ['Python', 'OpenCV', 'AWS', 'TensorFlow']
  //   },
  //   {
  //     id: 3,
  //     name: 'ChatDoc Assistant',
  //     image: 'ai/chat.webp',
  //     images: ['ai/all/chat.webp', 'ai/all/chat1.webp', 'ai/all/chat2.webp'],
  //     description: 'AI chatbot for document understanding and query',
  //     detail_description: 'An intelligent assistant that allows users to "chat" with their documents. Users can upload PDFs, Word docs, or text files and ask questions in natural language. The AI retrieves relevant sections and summarizes answers, making information retrieval from large archives instant.',
  //     teamSize: 6,
  //     duration: '5 months',
  //     problems: ['Semantic Document Search', 'Context Window Limits', 'Hallucination Prevention', 'Multiple Format Support'],
  //     tech: ['LangChain', 'FastAPI', 'OpenAI', 'Pinecone']
  //   },
  // ],
};

interface PortfolioSectionProps {
  onWantSameClick: () => void;
}

const ProjectModal = ({ project, onClose, onWantSameClick }: { project: any, onClose: () => void, onWantSameClick: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    // Prevent body scroll - stricter for mobile
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Animate in
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
    );

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={modalRef}
        className="bg-gray-900 w-full h-full md:h-auto md:max-w-6xl md:max-h-[90vh] md:rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row border-none md:border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Image Slider */}
        <div className={`w-full md:w-1/2 h-[25vh] md:h-auto relative bg-gradient-to-br ${project.gradients[currentImageIndex]} group flex-shrink-0 overflow-hidden transition-all duration-700`}>
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.name} screenshot ${currentImageIndex + 1}`}
            className="w-full h-full object-cover object-center transition-all duration-500"
            style={{ transform: 'scale(0.83)', transformOrigin: 'center center' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Close Button Mobile Overlay */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white z-50 border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Slider Controls - Smaller on mobile */}
          <button
            onClick={prevImage}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full glass hover:bg-white/20 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full glass hover:bg-white/20 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {project.images.map((_: any, idx: number) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-neon-blue w-3 md:w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-1/2 p-5 md:p-10 flex flex-col overflow-y-auto bg-gray-900 h-[75vh] md:h-full">
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div>
              <h2 className="text-xl md:text-3xl font-space font-bold text-white mb-2">{project.name}</h2>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {project.tech.map((t: string, i: number) => (
                  <span key={i} className="text-[9px] md:text-[10px] uppercase tracking-wider font-space px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-white/5 text-neon-blue border border-neon-blue/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={onClose} className="hidden md:block p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6 text-white/70" />
            </button>
          </div>

          <div className="space-y-8 flex-grow">
            <div>
              <h3 className="text-sm font-space font-semibold text-white/50 uppercase tracking-widest mb-3">About Project</h3>
              <p className="text-white/80 font-space font-light leading-relaxed mb-4">
                {project.detail_description}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neon-blue hover:text-cyan-300 transition-colors font-space text-sm font-medium border-b border-neon-blue/0 hover:border-neon-blue/50 pb-0.5"
                >
                  Check ready product <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <div className="p-2 md:p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <Clock className="w-3 h-3 md:w-5 md:h-5 text-purple-400" />
                  <span className="text-[10px] md:text-sm font-space text-white/60">Duration</span>
                </div>
                <p className="text-sm md:text-xl font-space font-bold text-white">{project.duration}</p>
              </div>
              <div className="p-2 md:p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <Users className="w-3 h-3 md:w-5 md:h-5 text-pink-400" />
                  <span className="text-[10px] md:text-sm font-space text-white/60">Team</span>
                </div>
                <p className="text-sm md:text-xl font-space font-bold text-white">{project.teamSize} <span className="hidden md:inline">Specialists</span><span className="md:hidden">People</span></p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-space font-semibold text-white/50 uppercase tracking-widest mb-3">Solved Challenges</h3>
              <ul className="space-y-3">
                {project.problems.map((problem: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-white/80 font-space font-light text-sm">
                    <AlertCircle className="w-4 h-4 text-neon-blue mt-0.5 flex-shrink-0" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                onClose();
                onWantSameClick();
              }}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-space font-bold rounded-xl text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-cyan-900/20 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Start Similar Project <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ProjectCard = ({ project, onClick }: { project: any, onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, { scale: 1.1, duration: 0.8, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, { scale: 1, duration: 0.8, ease: 'power2.out' });
  };

  return (
    <div
      ref={cardRef}
      className="group relative w-full h-[400px] rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradients[0]} overflow-hidden`}>
        <img
          ref={imageRef}
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-center opacity-80 transition-opacity duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      {/* Icon top right */}
      <div className="absolute top-4 right-4 p-2 rounded-full glass border border-white/10 group-hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
        <ArrowUpRight className="w-5 h-5 text-white" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent pt-12">
        <div className="transform transition-transform duration-300 ease-out group-hover:-translate-y-1">
          <h3 className="text-2xl font-space font-bold text-white mb-2 leading-tight drop-shadow-md">
            {project.name}
          </h3>
          <p className="text-white/90 font-space font-light text-sm line-clamp-2 drop-shadow-sm">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const PortfolioSection = ({ onWantSameClick }: PortfolioSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // const [activeFilter, setActiveFilter] = useState<keyof typeof portfolioData>('Web');
  const activeFilter: keyof typeof portfolioData = 'Mobile'; // Always show Mobile cards
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  // const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    // Ensure visible by default to prevent "sometimes not displayed" issue
    gsap.set(title, { opacity: 1, y: 0 });

    // Only hide and animate if the section is comfortably below the viewport
    const rect = section.getBoundingClientRect();
    const isBelowViewport = rect.top > window.innerHeight * 0.8;

    if (isBelowViewport) {
      gsap.set(title, { opacity: 0, y: 50 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Final safety fallback: ensure visibility after 2 seconds regardless of scroll
    const fallbackTimeout = setTimeout(() => {
      if (title && window.getComputedStyle(title).opacity === '0') {
        gsap.to(title, { opacity: 1, y: 0, duration: 0.5 });
      }
    }, 2000);

    return () => {
      clearTimeout(fallbackTimeout);
      ScrollTrigger.getAll().filter(st => st.vars.trigger === section).forEach(st => st.kill());
    };
  }, []);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current!.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)'
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []); // Removed activeFilter dependency since filtering is disabled

  // Filtering functionality commented out - only showing Mobile cards
  // const handleFilterChange = (filter: keyof typeof portfolioData) => {
  //   if (activeFilter === filter || isAnimating) return;
  //   setActiveFilter(filter);
  // };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-gray min-h-screen relative overflow-hidden py-20 px-4 md:px-8 lg:px-16"
    >
      <AnimatedBackground variant="gray" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-space font-bold text-white tracking-tight">
            OUR <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">WORK</span>
          </h2>
          <p className="text-white/60 font-space font-light max-w-2xl mx-auto text-lg leading-relaxed">
            Empowering global brands with future-ready mobile apps and intelligent automation.
          </p>
        </div>

        {/* Filter buttons commented out - only showing Mobile cards */}
        {/* <div ref={filtersRef} className="flex justify-center mb-10 md:mb-16 px-4 md:px-0 z-20 overflow-x-auto no-scrollbar mask-gradient-x w-full">
          <div className="glass p-1 md:p-1.5 rounded-2xl flex flex-nowrap md:flex-wrap gap-1 md:gap-2 min-w-max mx-auto">
            {Object.keys(portfolioData).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter as keyof typeof portfolioData)}
                className={`
                  relative px-4 py-2 md:px-6 md:py-3 rounded-xl font-space text-xs md:text-sm font-medium tracking-wide transition-all duration-300 flex-shrink-0
                  ${activeFilter === filter
                    ? 'text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'}
                `}
              >
                {activeFilter === filter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl -z-10" />
                )}
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                  {filter === 'Mobile' && <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                  {filter === 'Web' && <Code className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                  {filter === 'AI' && <Brain className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                {filter}
                </span>
              </button>
            ))}
          </div>
        </div> */}

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {portfolioData[activeFilter].map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onWantSameClick={onWantSameClick}
          />
        )}

      </div>
    </section>
  );
};

export default PortfolioSection;