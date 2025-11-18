"use client";

import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle, Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add scroll event listener
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };
    
    window.addEventListener('resize', checkIfMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMobile) setIsOpen(false);
  };

  // Don't show scroll-to-top button when already at top
  const showScrollToTop = !isAtTop || isOpen;

  return (
    <div className={`fixed z-50 flex flex-col items-end gap-3 sm:gap-4 ${
      isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'
    }`}>
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex flex-col gap-3 sm:mb-3"
          >
            {showScrollToTop && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-100 shadow-lg shadow-cyan-500/10 hover:bg-cyan-400/20 transition-all"
                title="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            )}

            <Link href="#contact" onClick={() => isMobile && setIsOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/10 bg-white/5 text-white shadow-lg shadow-cyan-500/10 hover:border-cyan-400/60 hover:text-cyan-100 transition-all"
                title="Contact me"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            </Link>

            <a href="/Arkhan_Shimar.pdf" download>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-100 shadow-lg shadow-cyan-500/10 hover:bg-cyan-400/20 transition-all"
                title="Download CV"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && (
        <motion.button
          key="fab-main"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-100 shadow-lg shadow-cyan-500/10 hover:bg-cyan-400/20 transition-all ${
            isOpen ? 'rotate-90' : ''
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <span className="text-2xl sm:text-3xl font-bold">+</span>
          )}
        </motion.button>
      )}
    </div>
  );
}
