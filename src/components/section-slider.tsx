"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

type SectionDef = {
  id: string;
  element: React.ReactNode;
};

const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

const sectionsStatic: SectionDef[] = [
  { id: "home", element: <Hero /> },
  { id: "about", element: <About /> },
  { id: "skills", element: <Skills /> },
  { id: "projects", element: <Projects /> },
  { id: "blog", element: <Blog /> },
  { id: "contact", element: <Contact /> },
  { id: "footer", element: <Footer /> },
];

const idToIndexStatic = new Map<string, number>(sectionsStatic.map((s, i) => [s.id, i]));

export function SectionSlider() {
  const sections = useMemo(() => sectionsStatic, []);
  const idToIndex = useMemo(() => idToIndexStatic, []);

  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const initial = window.location.hash.replace("#", "");
    const idx = idToIndexStatic.get(initial);
    return idx ?? 0;
  });
  const [direction, setDirection] = useState<1 | -1>(1);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const setHash = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const next = `#${id}`;
    if (window.location.hash === next) return;
    window.history.pushState(null, "", next);
  }, []);

  const navigateToIndex = useCallback(
    (nextIndex: number) => {
      if (transitioningRef.current) return;
      const clamped = Math.max(0, Math.min(sections.length - 1, nextIndex));
      if (clamped === activeIndexRef.current) return;

      setDirection(clamped > activeIndexRef.current ? 1 : -1);
      transitioningRef.current = true;
      setActiveIndex(clamped);
      setHash(sections[clamped].id);

      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = window.setTimeout(() => {
        transitioningRef.current = false;
        transitionTimeoutRef.current = null;
      }, 900);
    },
    [sections, setHash]
  );

  const navigateToId = useCallback(
    (id: string) => {
      const idx = idToIndex.get(id);
      if (idx == null) return;
      navigateToIndex(idx);
    },
    [idToIndex, navigateToIndex]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onHashChange = () => {
      const next = window.location.hash.replace("#", "");
      const idx = idToIndex.get(next);
      if (idx == null) return;
      navigateToIndex(idx);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [idToIndex, navigateToIndex]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const el = scrollContainerRef.current;
      if (!el) return;
      if (transitioningRef.current) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;
      if (Math.abs(delta) < 8) return;

      const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
      const canScroll = maxScrollTop > 2;
      const atTop = el.scrollTop <= 1;
      const atBottom = el.scrollTop >= maxScrollTop - 1;

      const currentIndex = activeIndexRef.current;

      if (!canScroll) {
        event.preventDefault();
        navigateToIndex(currentIndex + (delta > 0 ? 1 : -1));
        return;
      }

      if (delta > 0 && atBottom) {
        event.preventDefault();
        navigateToIndex(currentIndex + 1);
        return;
      }

      if (delta < 0 && atTop) {
        event.preventDefault();
        navigateToIndex(currentIndex - 1);
        return;
      }

      event.preventDefault();
      el.scrollTop = Math.max(0, Math.min(maxScrollTop, el.scrollTop + delta));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigateToIndex, sections.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (transitioningRef.current) return;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        navigateToIndex(activeIndexRef.current + 1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        navigateToIndex(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigateToIndex]);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => navigateToIndex(activeIndexRef.current + 1),
    onSwipedDown: () => navigateToIndex(activeIndexRef.current - 1),
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  const active = sections[activeIndex];

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (transitioningRef.current) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;
      if (Math.abs(delta) < 6) return;

      const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
      const canScroll = maxScrollTop > 2;
      const atTop = el.scrollTop <= 1;
      const atBottom = !canScroll || el.scrollTop >= maxScrollTop - 1;
      const currentIndex = activeIndexRef.current;

      if (delta > 0 && atBottom) {
        event.preventDefault();
        navigateToIndex(currentIndex + 1);
        return;
      }

      if (delta < 0 && atTop) {
        event.preventDefault();
        navigateToIndex(currentIndex - 1);
        return;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [navigateToIndex, active.id]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar activeId={active.id} onNavigate={navigateToId} />

      <div className="relative h-full w-full" {...swipeHandlers}>
        <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto overscroll-contain">
          <div className="relative min-h-full">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
              onExitComplete={() => {
                if (transitionTimeoutRef.current) {
                  window.clearTimeout(transitionTimeoutRef.current);
                  transitionTimeoutRef.current = null;
                }
                transitioningRef.current = false;
                const el = scrollContainerRef.current;
                if (el) el.scrollTop = 0;
              }}
            >
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ x: direction > 0 ? "35%" : "-35%", opacity: 0.0, filter: "blur(10px)" }}
                animate={{ x: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ x: direction > 0 ? "-35%" : "35%", opacity: 0.0, filter: "blur(10px)" }}
                transition={transition}
                className="absolute inset-0"
              >
                {active.element}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
