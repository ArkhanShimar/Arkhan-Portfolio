"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/projects";

const CARD_GAP = 220;
const STACK_DEPTH = 3;
const AUTO_ROTATE_MS = 7000;

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = useMemo(() => projects.map((project, index) => ({ project, index })), []);
  const total = items.length;

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
    <section id="projects" className="relative border-t border-white/5 py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Highlighted work"
          description="A selection of projects where I delivered end-to-end solutions, from responsive interfaces to reliable backends."
        />
        <div className="mt-16">
          <div className="relative flex flex-col items-center">
            <div className="relative flex h-[520px] w-full items-center justify-center overflow-visible sm:h-[500px]">
              {items.map(({ project, index }) => {
                const rawOffset = index - activeIndex;
                let offset = rawOffset;
                if (rawOffset > total / 2) offset = rawOffset - total;
                if (rawOffset < -total / 2) offset = rawOffset + total;

                const depth = Math.abs(offset);
                const isVisible = depth <= STACK_DEPTH;
                const scale = isVisible ? 1 - depth * 0.12 : 0.94;
                const translateX = offset * CARD_GAP;
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
                      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3">
                        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                          Preview Pending
                        </span>
                        <span className="text-sm text-slate-400">Visual coming soon</span>
                      </div>
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
      </div>
    </section>
  );
}
