"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingActionButton() {
  const [footerInView, setFooterInView] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

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

  const shouldShow = activeSection !== "home" && !footerInView;

  useEffect(() => {
    const getRoot = () => document.querySelector<HTMLElement>('[data-section-slider-scroll="true"]') ?? null;

    let observer: IntersectionObserver | null = null;

    const tryAttach = () => {
      const root = getRoot();
      const footers = Array.from(document.querySelectorAll<HTMLElement>('[data-footer="true"]'));
      if (!footers.length) return false;

      if (!observer) {
        observer = new IntersectionObserver(
          ([entry]) => {
            setFooterInView(entry.isIntersecting);
          },
          { root, threshold: 0.1 }
        );
      }

      footers.forEach((el) => observer?.observe(el));
      return true;
    };

    if (tryAttach()) {
      return () => observer?.disconnect();
    }

    const mo = new MutationObserver(() => {
      if (tryAttach()) mo.disconnect();
    });

    mo.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observer?.disconnect();
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

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <AnimatePresence>
        {shouldShow && (
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
