'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // Also handle initial page load
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    
    // Scroll to top on initial page load
    window.scrollTo(0, 0);
    
    // Cleanup
    return () => {
      if (history.scrollRestoration) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null;
}
