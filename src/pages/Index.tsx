import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CursorGlow from '../components/CursorGlow';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import ContactSection from '../components/sections/ContactSection';
import FooterSection from '../components/sections/FooterSection';
import { useScrollLinkedAnimations } from '../hooks/useScrollLinkedAnimations';

const Index = () => {
  // Initialize scroll-linked animations
  useScrollLinkedAnimations();

  useEffect(() => {
    // Initialize smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
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
