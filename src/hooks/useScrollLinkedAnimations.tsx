import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollLinkedAnimations = () => {
  useEffect(() => {
    // Scroll-linked animations for all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      // Create timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
          scrub: 0.5, // Smooth scroll-linked animation
        }
      });

      // Animate section with fade + slide-up + blur effects
      gsap.set(section, { opacity: 0, y: 60, filter: 'blur(10px)' });
      
      tl.to(section, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      });

      // Animate all text elements within the section
      const textElements = section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
      textElements.forEach((element, i) => {
        gsap.set(element, { opacity: 0, y: 30, filter: 'blur(5px)' });
        
        gsap.to(element, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            scrub: 0.3,
          }
        });
      });

      // Animate images with scale + fade effects
      const images = section.querySelectorAll('img');
      images.forEach((image, i) => {
        gsap.set(image, { opacity: 0, scale: 0.8, filter: 'blur(5px)' });
        
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            scrub: 0.4,
          }
        });
      });

      // Animate cards and interactive elements
      const cards = section.querySelectorAll('.glass-card');
      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 40, scale: 0.9 });
        
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            scrub: 0.2,
          }
        });
      });

      // Animate buttons with special effects
      const buttons = section.querySelectorAll('button');
      buttons.forEach((button, i) => {
        gsap.set(button, { opacity: 0, scale: 0.8, filter: 'blur(3px)' });
        
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: i * 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: button,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
            scrub: 0.3,
          }
        });
      });

      // Animate form inputs (for contact section)
      const inputs = section.querySelectorAll('input, textarea');
      inputs.forEach((input, i) => {
        gsap.set(input, { opacity: 0, x: -50, filter: 'blur(5px)' });
        
        gsap.to(input, {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: input,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
            scrub: 0.3,
          }
        });
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};