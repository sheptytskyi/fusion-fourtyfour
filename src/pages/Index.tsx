import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CursorGlow from '../components/CursorGlow';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProcessSection from '../components/sections/ProcessSection';
import SolutionsSection from '../components/sections/SolutionsSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import FAQSection from '../components/sections/FAQSection';
import FooterSection from '../components/sections/FooterSection';
import GlobalBackground from '../components/GlobalBackground';
import UnifiedScrollBackground from '../components/UnifiedScrollBackground';
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
    <div className="relative min-h-screen">
      <CursorGlow />
      <Navbar onContactClick={scrollToContact} />
      <main className="relative">
        <UnifiedScrollBackground />
        <HeroSection onGrowWithUsClick={scrollToContact} />
        <AboutSection />
        <ProcessSection />
        <SolutionsSection onContactClick={scrollToContact} />
        <PortfolioSection onWantSameClick={scrollToContact} />
        <TestimonialsSection />
        <ContactSection />
        <FAQSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
