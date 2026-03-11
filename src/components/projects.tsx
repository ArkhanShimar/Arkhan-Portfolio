"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/projects";
import Image from "next/image";
import { ExternalLink, Github, Code } from "lucide-react";

export function Projects() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Development"
          title="Engineered to perform."
          description="A selection of high-performance applications built with modern frameworks."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-16">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative glass rounded-2xl overflow-hidden flex flex-col hover:border-green-500/20 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-36 sm:h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors" />
                
                {/* Tech Badges on Image */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 2).map((t) => (
                    <span key={t} className="px-2 py-0.5 glass text-[9px] font-mono text-green-500 rounded uppercase tracking-widest font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-green-500 transition-colors">
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

                <p className="text-[12px] text-slate-400 font-sans line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5">
                  <div className="flex gap-1.5">
                    {project.tech.map((t) => (
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
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <a 
            href="https://github.com/ArkhanShimar" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 glass rounded-full font-mono text-[11px] text-white hover:!bg-green-500 hover:!text-black hover:!border-green-500/30 transition-all flex items-center gap-3 uppercase tracking-[0.2em] font-bold"
          >
            <Github size={16} />
            Explore_Repositories
          </a>
        </div>
      </div>
    </section>
  );
}
