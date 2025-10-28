"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/projects";

const CARD_GAP = 220;
const STACK_DEPTH = 3;
const AUTO_ROTATE_MS = 7000;

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const items = useMemo(() => projects.map((project, index) => ({ project, index })), []);
  const total = items.length;
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle swipe events
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      // Only update offset for horizontal swipes
      if (Math.abs(eventData.deltaX) > 10 && Math.abs(eventData.deltaX) > Math.abs(eventData.deltaY) * 2) {
        eventData.event.preventDefault();
        setSwipeOffset(eventData.deltaX * 0.5);
      }
    },
    onSwipedLeft: (eventData) => {
      // Only trigger on horizontal swipes with significant movement
      if (Math.abs(eventData.deltaX) > 50 && Math.abs(eventData.deltaX) > Math.abs(eventData.deltaY) * 2) {
        moveNext();
        setSwipeOffset(0);
      }
    },
    onSwipedRight: (eventData) => {
      // Only trigger on horizontal swipes with significant movement
      if (Math.abs(eventData.deltaX) > 50 && Math.abs(eventData.deltaX) > Math.abs(eventData.deltaY) * 2) {
        movePrev();
        setSwipeOffset(0);
      }
    },
    onSwiped: () => {
      setSwipeOffset(0);
    },
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: false, // Allow scroll on touch devices
    delta: 10, // Minimum distance to trigger swipe
    swipeDuration: 300,
    touchEventOptions: { passive: false } // Need to be able to preventDefault
  });

  const moveNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const movePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = window.setInterval(moveNext, AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [moveNext, total]);

  return (
    <section id="projects" className="relative border-t border-white/5 py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Highlighted work"
          description="A selection of projects where I delivered end-to-end solutions, from responsive interfaces to reliable backends."
        />
        <div className="mt-16">
          <div 
            className="relative flex flex-col items-center touch-none"
            ref={(node) => {
              // Set the ref from react-swipeable
              const { ref } = handlers;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
              }
              
              // Set our container ref
              (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            {...Object.fromEntries(
              Object.entries(handlers).filter(([key]) => key !== 'ref')
            )}
          >
            <div className="relative flex h-[520px] w-full items-center justify-center overflow-visible sm:h-[500px]">
              {items.map(({ project, index }) => {
                const rawOffset = index - activeIndex;
                let offset = rawOffset;
                if (rawOffset > total / 2) offset = rawOffset - total;
                if (rawOffset < -total / 2) offset = rawOffset + total;

                const depth = Math.abs(offset);
                const isVisible = depth <= STACK_DEPTH;
                const scale = isVisible ? 1 - depth * 0.12 : 0.94;
                const translateX = (offset * CARD_GAP) + (offset === 0 ? swipeOffset : 0);
                const translateY = depth * 18;
                const rotateY = offset * -5;
                const zIndex = total - depth;

                return (
                  <motion.article
                    key={project.title}
                    className="group absolute flex h-[420px] w-full max-w-[520px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 shadow-2xl shadow-cyan-500/10 sm:h-[460px]"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{
                      scale,
                      opacity: isVisible ? 1 - depth * 0.12 : 0,
                      x: translateX,
                      y: translateY,
                      rotateY,
                      zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  >
                    <div className="pointer-events-none absolute inset-0 flex opacity-0 transition duration-500 group-hover:opacity-100">
                      <div className="absolute -inset-20 bg-gradient-to-r from-cyan-500/25 via-transparent to-blue-500/25 blur-[120px]" />
                    </div>
                    <div className="relative h-44 w-full overflow-hidden border-b border-white/5 bg-slate-900 sm:h-56">
                      <motion.div
                        aria-hidden
                        className="absolute inset-0 scale-105 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.18),transparent_65%)] blur-2xl"
                        initial={{ opacity: 0.35, scale: 1 }}
                        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.05, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {project.image ? (
                        <div className="relative h-full w-full">
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              // If image fails to load, show the fallback UI
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.parentElement?.querySelector('.fallback-content');
                              if (fallback) {
                                (fallback as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                          <div className="fallback-content hidden absolute inset-0 flex-col items-center justify-center gap-3 bg-slate-900">
                            <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                              Preview Pending
                            </span>
                            <span className="text-sm text-slate-400">Visual coming soon</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3">
                          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                            Preview Pending
                          </span>
                          <span className="text-sm text-slate-400">Visual coming soon</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-5 p-8">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                        <p className="text-sm text-[var(--muted)]">{project.description}</p>
                      </div>
                      <motion.ul
                        className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-cyan-200/80"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                      >
                        {project.tech.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                          >
                            {item}
                          </li>
                        ))}
                      </motion.ul>
                      <div className="mt-auto flex gap-3">
                        {project.demo ? (
                          <Link
                            href={project.demo}
                            target="_blank"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/50 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300 hover:text-cyan-50"
                          >
                            Live Demo
                          </Link>
                        ) : null}
                        <Link
                          href={project.github}
                          target="_blank"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-300 hover:text-cyan-100"
                        >
                          GitHub
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            {total > 1 ? (
              <div className="mt-8 flex items-center gap-6">
                <button
                  type="button"
                  onClick={movePrev}
                  className="inline-flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-200"
                >
                  ‹
                </button>
                <div className="flex items-center gap-2">
                  {items.map(({ project, index }) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={project.title}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className="relative size-2.5 rounded-full bg-white/10 transition"
                        style={{
                          opacity: isActive ? 1 : 0.4,
                          transform: isActive ? "scale(1.4)" : "scale(1)",
                          boxShadow: isActive ? "0 0 12px rgba(34,211,238,0.65)" : "none",
                          background: isActive ? "rgba(34,211,238,0.8)" : "rgba(255,255,255,0.18)",
                        }}
                      />
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={moveNext}
                  className="inline-flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-200"
                >
                  ›
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* All Projects Grid */}
        <motion.div 
          className="mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Projects"
              title="All Projects"
              description="A comprehensive showcase of my development work, from web applications to mobile solutions."
            />
          </div>
          
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/50 to-slate-900/80 shadow-2xl shadow-cyan-500/5 transition-all duration-300 hover:border-cyan-400/20 hover:shadow-cyan-400/10"
              >
                <div className="relative h-52 overflow-hidden border-b border-white/5 bg-slate-900">
                  {project.image ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          // If image fails to load, show the fallback UI
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-content');
                          if (fallback) {
                            (fallback as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      <div className="fallback-content hidden absolute inset-0 flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-900 to-slate-950">
                        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                          Preview Pending
                        </span>
                        <span className="text-sm text-slate-400">Visual coming soon</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-900 to-slate-950">
                      <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                        Preview Pending
                      </span>
                      <span className="text-sm text-slate-400">Visual coming soon</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                  
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="rounded-full border border-cyan-900/50 bg-cyan-900/30 px-3 py-1 text-xs font-medium tracking-wide text-cyan-300/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex gap-3">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        className="group/btn flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-white/90 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-100 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.26.82-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.604-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.604-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span>Code</span>
                        </span>
                      </Link>
                    )}
                    {project.demo ? (
                      <Link
                        href={project.demo}
                        target="_blank"
                        className="group/btn flex-1 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2.5 text-center text-sm font-medium text-cyan-100 transition-all duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:text-white hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)]"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>Live Demo</span>
                        </span>
                      </Link>
                    ) : (
                      <span className="flex-1 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-slate-500">
                        Demo Coming Soon
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute -inset-8 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_70%)]" />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
