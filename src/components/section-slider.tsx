"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

const transition = { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const };

const sectionsStatic: SectionDef[] = [
  { id: "home", element: <Hero /> },
  { id: "about", element: <About /> },
  { id: "skills", element: <Skills /> },
  { id: "projects", element: <Projects /> },
  { id: "blog", element: <Blog /> },
  {
    id: "contact",
    element: (
      <>
        <Contact />
        <Footer />
      </>
    ),
  },
];

const idToIndexStatic = new Map<string, number>(sectionsStatic.map((s, i) => [s.id, i]));
const sectionChangeEventName = "section-slider:navigate";

export function SectionSlider() {
  const sections = useMemo(() => sectionsStatic, []);
  const idToIndex = useMemo(() => idToIndexStatic, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const transitionTimeoutRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  const [blendId, setBlendId] = useState<string | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const setHash = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const next = `#${id}`;
    if (window.location.hash === next) return;
    window.history.pushState(null, "", next);
  }, []);

  const announceActiveSection = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(sectionChangeEventName, { detail: { id } }));
  }, []);

  const navigateToIndex = useCallback(
    (nextIndex: number) => {
      if (transitioningRef.current) return;
      const clamped = Math.max(0, Math.min(sections.length - 1, nextIndex));
      if (clamped === activeIndexRef.current) return;

      setDirection(clamped > activeIndexRef.current ? 1 : -1);
      transitioningRef.current = true;
      setActiveIndex(clamped);
      const nextId = sections[clamped].id;
      setHash(nextId);
      announceActiveSection(nextId);
      setBlendId(nextId);

      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = window.setTimeout(() => {
        transitioningRef.current = false;
        setBlendId(null);
        transitionTimeoutRef.current = null;
      }, 1250);
    },
    [announceActiveSection, sections, setHash]
  );

  const navigateToId = useCallback(
    (id: string) => {
      const idx = idToIndex.get(id);
      if (idx == null) return;
      navigateToIndex(idx);
    },
    [idToIndex, navigateToIndex]
  );

  const active = sections[activeIndex];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#home") {
      window.history.replaceState(null, "", "#home");
    }
    announceActiveSection("home");
  }, [announceActiveSection]);

  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTop = 0;
  }, [active.id]);

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
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const next = Math.max(0, el.scrollHeight);
      setContentHeight(next);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active.id]);

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

  const swipeEdgeRef = useRef<{ atTop: boolean; atBottom: boolean } | null>(null);

  const swipeHandlers = useSwipeable({
    onSwipeStart: () => {
      const el = scrollContainerRef.current;
      if (!el) {
        swipeEdgeRef.current = null;
        return;
      }

      const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
      const canScroll = maxScrollTop > 2;
      swipeEdgeRef.current = {
        atTop: el.scrollTop <= 1,
        atBottom: !canScroll || el.scrollTop >= maxScrollTop - 1,
      };
    },
    onSwipedUp: () => {
      const edge = swipeEdgeRef.current;
      swipeEdgeRef.current = null;
      if (transitioningRef.current) return;
      if (!edge?.atBottom) return;
      navigateToIndex(activeIndexRef.current + 1);
    },
    onSwipedDown: () => {
      const edge = swipeEdgeRef.current;
      swipeEdgeRef.current = null;
      if (transitioningRef.current) return;
      if (!edge?.atTop) return;
      navigateToIndex(activeIndexRef.current - 1);
    },
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: false,
    delta: 60,
  });

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
    <div className="relative h-[100svh] w-full overflow-hidden">
      <Navbar activeId={active.id} onNavigate={navigateToId} />

      <div className="relative h-full w-full" {...swipeHandlers}>
        <div
          ref={scrollContainerRef}
          data-section-slider-scroll="true"
          className="h-full w-full overflow-y-auto overscroll-contain"
        >
          <div className="relative w-full" style={{ height: contentHeight > 0 ? contentHeight : "100%" }}>
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
                setBlendId(null);
                const el = scrollContainerRef.current;
                if (el) el.scrollTop = 0;
              }}
            >
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0.0, filter: "blur(26px)", scale: 0.985, y: 12 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
                exit={{ opacity: 0.0, filter: "blur(30px)", scale: 1.01, y: -10 }}
                transition={transition}
                className="absolute inset-0 will-change-transform"
              >
                <div id={active.id} className="relative">
                  <div ref={measureRef} className="relative">
                    {active.element}
                  </div>

                  {blendId === active.id && (
                    <div className="pointer-events-none absolute inset-0">
                    <motion.div
                      initial={{ x: -160, opacity: 0.0, filter: "blur(18px)" }}
                      animate={{ x: [-160, 0, 0], opacity: [0.0, 0.85, 0.0], filter: ["blur(18px)", "blur(0px)", "blur(12px)"] }}
                      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                      style={{ clipPath: "inset(0 50% 0 0)" }}
                      className="absolute inset-0"
                    >
                      {active.element}
                    </motion.div>

                    <motion.div
                      initial={{ x: 160, opacity: 0.0, filter: "blur(18px)" }}
                      animate={{ x: [160, 0, 0], opacity: [0.0, 0.85, 0.0], filter: ["blur(18px)", "blur(0px)", "blur(12px)"] }}
                      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                      style={{ clipPath: "inset(0 0 0 50%)" }}
                      className="absolute inset-0"
                    >
                      {active.element}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0.0 }}
                      animate={{ opacity: [0.0, 0.75, 0.0] }}
                      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-green-500/35 to-transparent blur-[1px]"
                    />

                    <motion.div
                      initial={{ opacity: 0.0 }}
                      animate={{ opacity: [0.0, 0.35, 0.0] }}
                      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_55%)]"
                    />
                  </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
