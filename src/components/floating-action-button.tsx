"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Download, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function FloatingActionButton() {
  const [footerInView, setFooterInView] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();
  const isBlogRoute = pathname.startsWith("/blog/");

  useEffect(() => {
    const readHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "home";
      return hash || "home";
    };

    const onHashChange = () => setActiveSection(readHash());
    const onSectionChange = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string }>;
      const id = custom.detail?.id;
      if (id) setActiveSection(id);
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("section-slider:navigate", onSectionChange as EventListener);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("section-slider:navigate", onSectionChange as EventListener);
    };
  }, [footerInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const checkFooter = () => {
      const footer = document.querySelector('[data-footer="true"]');
      if (footer) {
        observer.observe(footer);
      } else {
        // If footer not found yet, retry after a bit
        setTimeout(checkFooter, 500);
      }
    };

    checkFooter();

    return () => observer.disconnect();
  }, []);

  const shouldShow = (isBlogRoute || activeSection !== "home") && !footerInView;

  const scrollToTop = () => {
    const sliderScroll = document.querySelector<HTMLElement>('[data-section-slider-scroll="true"]');
    if (sliderScroll) {
      sliderScroll.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (window.location.hash !== "#home") {
      window.location.hash = "#home";
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    window.location.assign("/#home");
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100] flex flex-col gap-3 sm:gap-4">
      <AnimatePresence>
        {shouldShow && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1, y: -5 }}
              onClick={isBlogRoute ? goHome : scrollToTop}
              className="size-10 sm:size-12 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-slate-400 hover:text-green-400 hover:border-green-600/50 transition-all shadow-2xl backdrop-blur-md"
              title="Home"
            >
              <Home size={18} className="sm:size-5" />
            </motion.button>

            <motion.a
              href="/Arkhan_Shimar.pdf"
              download
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ delay: 0.1 }}
              className="size-10 sm:size-12 rounded-full bg-green-600/90 backdrop-blur-md  flex items-center justify-center text-black hover:bg-green-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              title="Download CV"
            >
              <Download size={18} className="sm:size-5" />
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
