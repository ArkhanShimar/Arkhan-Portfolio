"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing system...");

  useEffect(() => {
    // Force scroll to top on refresh
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      const sliderScroll = document.querySelector<HTMLElement>('[data-section-slider-scroll="true"]');
      if (sliderScroll) {
        sliderScroll.scrollTo(0, 0);
      }
      if (window.location.hash !== "" && window.location.hash !== "#home") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    const texts = [
      "Initializing system...",
      "Loading kernel modules...",
      "Establishing secure connection...",
      "Mounting assets...",
      "Compiling shaders...",
      "READY"
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < texts.length - 1) {
        setLoadingText(texts[i]);
        i++;
      } else {
        setLoadingText(texts[texts.length - 1]);
        clearInterval(interval);
        setTimeout(() => setIsReady(true), 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isReady ? (
          <motion.div
            key="initial-loader"
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-[#000000]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="size-16 rounded-lg bg-green-500 flex items-center justify-center text-black shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <Terminal size={32} />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-green-500/20 rounded-full border-t-green-500"
              />
            </motion.div>
            
            <div className="space-y-2 text-center">
              <motion.p 
                key={loadingText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono text-green-500 tracking-[0.2em] uppercase"
              >
                {loadingText}
              </motion.p>
              <div className="h-0.5 w-48 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
