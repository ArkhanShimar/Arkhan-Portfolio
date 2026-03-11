"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/projects";
import Image from "next/image";
import { ExternalLink, Github, Code, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextProject = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  // Swipe gesture support
  const dragX = useMotionValue(0);
  const DRAG_THRESHOLD = 50;

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_THRESHOLD) {
      nextProject();
    } else if (x >= DRAG_THRESHOLD) {
      prevProject();
    }
  };

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(nextProject, 8000);
    return () => clearInterval(timer);
  }, [nextProject]);

  const getCardIndex = (index: number) => {
    return (index + projects.length) % projects.length;
  };

  return (
    <section className="pt-24 pb-24 relative scroll-mt-24 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between items-center gap-8 mb-12 lg:mb-16 text-center md:text-left">
          <SectionHeading
            eyebrow="Development"
            title="Engineered to perform."
            description="A selection of high-performance applications built with modern frameworks."
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-end gap-4 md:mb-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="https://github.com/ArkhanShimar" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-black border border-white/10 rounded-full font-mono text-[10px] md:text-[11px] text-white hover:bg-white/5 transition-all flex items-center gap-3 uppercase tracking-[0.2em] font-black"
              >
                <Github size={18} />
                Explore_Repositories
              </a>
              <Link 
                href="/projects"
                className="px-8 py-3.5 bg-[#22c55e] text-black rounded-full font-mono text-[10px] md:text-[11px] hover:bg-white transition-all flex items-center gap-4 uppercase tracking-[0.2em] font-black shadow-[0_0_25px_rgba(34,197,94,0.4)]"
              >
                View_All_Projects
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-6xl mx-auto h-[420px] sm:h-[500px] flex items-center justify-center">
          
          {/* Navigation Arrows - Hidden on small mobile, shown on md+ */}
          <button
            onClick={prevProject}
            className="absolute left-4 md:-left-4 z-50 p-3 rounded-full glass border-white/10 text-white hover:text-green-500 hover:border-green-500/30 transition-all group hidden sm:flex"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextProject}
            className="absolute right-4 md:-right-4 z-50 p-3 rounded-full glass border-white/10 text-white hover:text-green-500 hover:border-green-500/30 transition-all group hidden sm:flex"
            aria-label="Next project"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 3D Carousel Display */}
          <div className="relative w-full h-full flex items-center justify-center perspective-1000 touch-pan-y">
            <motion.div 
              className="relative w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x: dragX }}
              onDragEnd={onDragEnd}
            >
              {projects.map((proj, i) => {
                let offset = i - currentIndex;
                if (offset > projects.length / 2) offset -= projects.length;
                if (offset < -projects.length / 2) offset += projects.length;

                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={proj.title}
                    initial={false}
                    animate={{
                      x: offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 300),
                      scale: isActive ? 1 : 0.8,
                      z: isActive ? 0 : -150,
                      rotateY: offset * -20,
                      opacity: isActive ? 1 : 0.5,
                      zIndex: 10 - Math.abs(offset),
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      mass: 0.8
                    }}
                    className={`absolute w-[280px] sm:w-[400px] h-[360px] sm:h-[450px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl will-change-transform ${
                      isActive ? "glass cursor-default" : "bg-white/[0.02] cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!isActive) {
                        setDirection(offset > 0 ? 1 : -1);
                        setCurrentIndex(i);
                      }
                    }}
                  >
                    {/* Project Content */}
                    <div className="relative w-full h-full flex flex-col">
                      {/* Image - Use simple opacity instead of blur/grayscale for performance */}
                      <div className="relative h-2/5 sm:h-1/2 w-full overflow-hidden shrink-0">
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          className={`object-cover transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-50"}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        
                        {/* Tech Badges */}
                        <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                          {proj.tech.slice(0, 2).map((t) => (
                            <span key={t} className="px-2 py-0.5 glass text-[8px] font-mono text-green-500 rounded uppercase tracking-widest font-black">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Details */}
                      <div className={`p-5 sm:p-8 flex flex-col flex-grow justify-between transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50"}`}>
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-1">{proj.title}</h3>
                            <div className="flex gap-3">
                              {proj.github && (
                                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-colors">
                                  <Github size={18} />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="text-[11px] sm:text-[12px] text-slate-400 font-sans leading-relaxed line-clamp-3 italic border-l border-green-500/20 pl-3">
                            {proj.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          {proj.github ? (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] font-mono text-green-500 uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors font-black"
                            >
                              Source_Code <Code size={12} />
                            </a>
                          ) : (
                            <div />
                          )}
                          <Link 
                            href="/projects" 
                            className="text-[9px] font-mono text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors font-bold"
                          >
                            Details <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex 
                    ? "w-6 sm:w-8 h-1 sm:h-1.5 bg-green-500" 
                    : "w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Explore Link */}
        <div className="mt-20 sm:mt-24 flex justify-center">
          <Link
            href="/projects"
            className="group flex items-center gap-3 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.4em] text-slate-500 hover:text-green-500 transition-all"
          >
            <span className="h-px w-8 bg-slate-800 group-hover:bg-green-500/50 transition-all" />
            Explore_All_Projects
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}



