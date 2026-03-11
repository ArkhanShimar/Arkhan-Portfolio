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
  const [blendId, setBlendId] = useState<string | null>(null);
  const [enableBlend, setEnableBlend] = useState(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 640px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setEnableBlend(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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
      setBlendId(enableBlend ? nextId : null);

      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = window.setTimeout(() => {
        transitioningRef.current = false;
        setBlendId(null);
        transitionTimeoutRef.current = null;
      }, 1250);
    },
    [announceActiveSection, enableBlend, sections, setHash]
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
    const current = window.location.hash.replace("#", "");
    if (!current) {
      window.history.replaceState(null, "", "#home");
      announceActiveSection("home");
      return;
    }
    const idx = idToIndex.get(current);
    if (idx != null) {
      window.setTimeout(() => {
        navigateToIndex(idx);
        announceActiveSection(current);
      }, 0);
    } else {
      window.history.replaceState(null, "", "#home");
      announceActiveSection("home");
    }
  }, [announceActiveSection, idToIndex, navigateToIndex]);

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
                setBlendId(null);
                const el = scrollContainerRef.current;
                if (el) el.scrollTop = 0;
              }}
            >
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0.0, scale: 0.995, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0.0, scale: 1.005, y: -12 }}
                transition={transition}
                className="relative will-change-transform"
              >
                <div id={active.id} className="relative">
                  <div className="relative">{active.element}</div>
                  {!isLast && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center">
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

                  {blendId === active.id && (
                    <div className="pointer-events-none absolute inset-0 hidden sm:block">
                    <motion.div
                      initial={{ x: -160, opacity: 0.0 }}
                      animate={{ x: [-160, 0, 0], opacity: [0.0, 0.85, 0.0] }}
                      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                      style={{ clipPath: "inset(0 50% 0 0)" }}
                      className="absolute inset-0"
                    >
                      {active.element}
                    </motion.div>

                    <motion.div
                      initial={{ x: 160, opacity: 0.0 }}
                      animate={{ x: [160, 0, 0], opacity: [0.0, 0.85, 0.0] }}
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
