"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ y: -5 }}
              onClick={scrollToTop}
              className="size-12 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-slate-400 hover:text-green-400 hover:border-green-500/50 transition-all shadow-2xl"
              title="Scroll to Top"
            >
              <ArrowUp size={20} />
            </motion.button>

            <motion.a
              href="/Arkhan_Shimar.pdf"
              download
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ y: -5 }}
              transition={{ delay: 0.1 }}
              className="size-12 rounded-lg bg-green-500 flex items-center justify-center text-black hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)]"
              title="Download CV"
            >
              <Download size={20} />
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
