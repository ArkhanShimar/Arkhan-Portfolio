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
import { ArrowDown } from "lucide-react";

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

      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = window.setTimeout(() => {
        transitioningRef.current = false;
        transitionTimeoutRef.current = null;
      }, 1000);
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
  const isLast = activeIndex === sections.length - 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const hash = window.location.hash.replace("#", "");
    const initialIndex = idToIndex.get(hash);
    
    if (initialIndex != null) {
      setActiveIndex(initialIndex);
      announceActiveSection(hash);
    } else {
      // Always start at home on refresh/initial load if no hash
      window.history.replaceState(null, "", "#home");
      announceActiveSection("home");
      setActiveIndex(0);
    }
    
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = 0;
  }, [announceActiveSection, idToIndex]);

  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    // Immediate reset
    el.scrollTop = 0;
    window.scrollTo(0, 0);
    
    // Multiple delayed resets for different browser behaviors
    const timers = [10, 50, 100].map(ms => setTimeout(() => {
      if (el) el.scrollTop = 0;
      window.scrollTo(0, 0);
    }, ms));

    return () => timers.forEach(clearTimeout);
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
  const edgeArmRef = useRef<{
    downArmed: boolean;
    upArmed: boolean;
  }>({ downArmed: false, upArmed: false });
  const wheelIdleRef = useRef(true);
  const wheelIdleTimerRef = useRef<number | null>(null);

  const swipeHandlers = useSwipeable({
    onSwipeStart: () => {
      const el = scrollContainerRef.current;
      if (!el) {
        swipeEdgeRef.current = null;
        return;
      }

      const edge = 2;
      const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
      const canScroll = maxScrollTop > 2;
      swipeEdgeRef.current = {
        atTop: el.scrollTop <= edge,
        atBottom: !canScroll || el.scrollTop >= maxScrollTop - edge,
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
    const edgeArm = edgeArmRef.current;

    const onWheel = (event: WheelEvent) => {
      if (transitioningRef.current) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;
      if (Math.abs(delta) < 6) return;

      const wasIdle = wheelIdleRef.current;
      wheelIdleRef.current = false;
      if (wheelIdleTimerRef.current) window.clearTimeout(wheelIdleTimerRef.current);
      wheelIdleTimerRef.current = window.setTimeout(() => {
        wheelIdleRef.current = true;
        wheelIdleTimerRef.current = null;
      }, 220);

      const edge = 2;
      const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);
      const canScroll = maxScrollTop > 2;
      const atTop = el.scrollTop <= edge;
      const atBottom = !canScroll || el.scrollTop >= maxScrollTop - edge;
      const currentIndex = activeIndexRef.current;
      const navDelta = 18;

      if (!atBottom) edgeArmRef.current.downArmed = false;
      if (!atTop) edgeArmRef.current.upArmed = false;
      if (delta < 0) edgeArmRef.current.downArmed = false;
      if (delta > 0) edgeArmRef.current.upArmed = false;

      if (delta > navDelta && atBottom) {
        if (!edgeArmRef.current.downArmed) {
          edgeArmRef.current.downArmed = true;
          return;
        }

        if (!wasIdle) return;

        edgeArmRef.current.downArmed = false;
        event.preventDefault();
        navigateToIndex(currentIndex + 1);
        return;
      }

      if (delta < -navDelta && atTop) {
        if (!edgeArmRef.current.upArmed) {
          edgeArmRef.current.upArmed = true;
          return;
        }

        if (!wasIdle) return;

        edgeArmRef.current.upArmed = false;
        event.preventDefault();
        navigateToIndex(currentIndex - 1);
        return;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelIdleTimerRef.current) {
        window.clearTimeout(wheelIdleTimerRef.current);
        wheelIdleTimerRef.current = null;
      }
      wheelIdleRef.current = true;
      edgeArm.downArmed = false;
      edgeArm.upArmed = false;
    };
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
          <div className="relative min-h-full">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                className="relative will-change-transform"
                onAnimationStart={() => {
                  const el = scrollContainerRef.current;
                  if (el) el.scrollTop = 0;
                }}
              >
                <div id={active.id} className="relative">
                  <div className="relative">{active.element}</div>
                  {!isLast && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 backdrop-blur-[2px]">
                        <span>Scroll for next</span>
                        <motion.span
                          animate={{ y: [0, 4, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                          className="text-green-500"
                        >
                          <ArrowDown size={12} />
                        </motion.span>
                      </div>
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
