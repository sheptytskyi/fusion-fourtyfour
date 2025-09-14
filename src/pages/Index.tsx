import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import CursorGlow from '../components/CursorGlow';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import ContactSection from '../components/sections/ContactSection';
import FooterSection from '../components/sections/FooterSection';
import { useScrollLinkedAnimations } from '../hooks/useScrollLinkedAnimations';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize scroll-linked animations
  useScrollLinkedAnimations();

  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      const font = new FontFace(
        'JetBrains Mono',
        'url(https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200;300;400;500;600;700&display=swap)'
      );
      
      try {
        await font.load();
        document.fonts.add(font);
      } catch (error) {
        console.warn('Font preload failed:', error);
      }
    };

    preloadResources();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Initialize smooth scrolling after loading
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Loading Screen */}
      {isLoading && <Loader onComplete={handleLoadingComplete} />}
      
      {/* Main Content */}
      <div className={`${isLoading ? 'hidden' : 'block'} h-screen overflow-y-scroll snap-y snap-mandatory`}>
        {/* Cursor Glow Effect */}
        <CursorGlow />
        
        {/* Navigation */}
        <Navbar onContactClick={scrollToContact} />
        
        {/* Sections */}
        <main>
          <HeroSection onGrowWithUsClick={scrollToContact} />
          <AboutSection />
          <PortfolioSection onWantSameClick={scrollToContact} />
          <ContactSection />
          <FooterSection />
        </main>
      </div>
    </div>
  );
};

export default Index;
