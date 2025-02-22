'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // Function to handle smooth scrolling
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link?.hash && link.origin === window.location.origin) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          // Update URL without scroll
          window.history.pushState({}, '', link.hash);
        }
      }
    };

    // Add event listener
    document.addEventListener('click', handleSmoothScroll);
    
    // Cleanup
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return null;
} 