import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollLinkedAnimations = () => {
  useEffect(() => {
    // This hook is disabled because each section has its own animations
    // Removing it prevents conflicts with section-specific ScrollTrigger animations
    
    // Just ensure no elements are stuck with opacity 0
    const ensureVisibility = () => {
      const sections = document.querySelectorAll('section:not([id=""])');
      sections.forEach(section => {
        // Only ensure visibility if section is in viewport
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Section is visible, ensure it's not hidden
          const computedStyle = window.getComputedStyle(section);
          if (computedStyle.opacity === '0') {
            // If somehow opacity is 0 but section should be visible, restore it
            gsap.set(section, { opacity: 1, clearProps: 'filter' });
          }
        }
      });
    };
    
    // Run after a delay to let sections initialize their own animations
    const timeout = setTimeout(ensureVisibility, 500);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);
};