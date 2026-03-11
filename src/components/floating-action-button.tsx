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

  const shouldShow = (isBlogRoute || activeSection !== "home") && !footerInView;

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPos = window.scrollY;
      
      const sliderScroll = document.querySelector<HTMLElement>('[data-section-slider-scroll="true"]');
      if (sliderScroll) {
        const isNearBottom = sliderScroll.scrollTop + sliderScroll.clientHeight >= sliderScroll.scrollHeight - 100;
        setFooterInView(isNearBottom);
      } else {
        const isNearBottom = scrollPos + clientHeight >= scrollHeight - 100;
        setFooterInView(isNearBottom);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const sliderScroll = document.querySelector<HTMLElement>('[data-section-slider-scroll="true"]');
    if (sliderScroll) {
      sliderScroll.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sliderScroll) {
        sliderScroll.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <AnimatePresence>
        {shouldShow && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1, y: -5 }}
              onClick={isBlogRoute ? goHome : scrollToTop}
              className="size-12 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-slate-400 hover:text-green-400 hover:border-green-600/50 transition-all shadow-2xl backdrop-blur-md"
              title={isBlogRoute ? "Home" : "Scroll to Top"}
            >
              {isBlogRoute ? <Home size={20} /> : <ArrowUp size={20} />}
            </motion.button>

            <motion.a
              href="/Arkhan_Shimar.pdf"
              download
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ delay: 0.1 }}
              className="size-12 rounded-full bg-green-600/90 backdrop-blur-md  flex items-center justify-center text-black hover:bg-green-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
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
