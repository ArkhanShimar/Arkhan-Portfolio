"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/projects";
import Image from "next/image";
import { ExternalLink, Github, Code, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Projects() {
  const col1 = projects.filter((_, i) => i % 3 === 0);
  const col2 = projects.filter((_, i) => i % 3 === 1);
  const col3 = projects.filter((_, i) => i % 3 === 2);

  const ProjectCard = ({ project, idx }: { project: any; idx: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="group relative glass rounded-2xl overflow-hidden flex flex-col hover:border-green-500/20 transition-all duration-500 sticky h-[380px] sm:h-[400px] snap-start snap-always"
      style={{ 
        zIndex: idx + 1,
        top: `${90 + idx * 50}px`,
        scrollMarginTop: `${90 + idx * 50}px`
      }}
    >
      {/* Image Container */}
      <div className="relative h-36 sm:h-40 shrink-0 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors" />
        
        {/* Tech Badges on Image */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 2).map((t: string) => (
            <span key={t} className="px-2 py-0.5 glass text-[9px] font-mono text-green-500 rounded uppercase tracking-widest font-semibold">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow min-h-0">
        <div className="flex justify-between items-start mb-3 shrink-0">
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-green-500 transition-colors leading-tight">
            {project.title}
          </h3>
          <div className="flex gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-[12px] text-slate-400 font-sans line-clamp-3 leading-relaxed mb-4 overflow-hidden">
          {project.description}
        </p>

        <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5 shrink-0">
          <div className="flex gap-1.5">
            {project.tech.map((t: string) => (
              <div key={t} className="size-1 rounded-full bg-green-500/20" title={t}></div>
            ))}
          </div>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-green-500 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all font-semibold"
            >
              Source_Code <Code size={12} />
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="pt-24 pb-24 relative snap-start scroll-mt-24 min-h-screen">
      <div className="container mx-auto px-6">
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
            className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-end gap-3 md:mb-6"
          >
            <a 
              href="https://github.com/ArkhanShimar" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 md:px-6 md:py-3 glass rounded-full font-mono text-[10px] md:text-[11px] text-white hover:!bg-green-500 hover:!text-black hover:!border-green-500/30 transition-all flex items-center gap-3 uppercase tracking-[0.2em] font-bold"
            >
              <Github size={16} />
              Explore_Repositories
            </a>
            <Link 
              href="/projects"
              className="group size-8 rounded-full glass border-white/10 flex items-center justify-center text-green-500 hover:text-green-500 hover:border-green-500/30 transition-all"
              title="View All Projects"
            >
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Desktop 3-Column Individual Stacking */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          <div className="flex flex-col gap-32">
            {col1.map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
          </div>
          <div className="flex flex-col gap-32">
            {col2.map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
          </div>
          <div className="flex flex-col gap-32">
            {col3.map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
          </div>
        </div>

        {/* Tablet 2-Column Stacking */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
          <div className="flex flex-col gap-32">
            {projects.filter((_, i) => i % 2 === 0).map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
          </div>
          <div className="flex flex-col gap-32">
            {projects.filter((_, i) => i % 2 === 1).map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
          </div>
        </div>

        {/* Mobile 1-Column Stacking */}
        <div className="md:hidden flex flex-col gap-24">
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
        </div>

        {/* Explore All Projects Button */}
        <div className="mt-12 pb-4 flex justify-center snap-start">
          <Link
            href="/projects"
            className="group px-8 py-4 glass rounded-full font-mono text-[12px] text-white hover:!bg-green-500 hover:!text-black hover:!border-green-500/30 transition-all flex items-center gap-3 uppercase tracking-[0.2em] font-bold shadow-2xl shadow-green-500/10"
          >
            Explore_All_Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
