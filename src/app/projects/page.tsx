"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { 
  ExternalLink, 
  Github, 
  Code, 
  Search, 
  ArrowLeft, 
  Home, 
  LayoutGrid,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const ITEMS_PER_PAGE = 6;

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-green-500 selection:text-black font-sans">
      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.05),transparent_50%)]" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/#home" 
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Home size={18} />
              <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest">Home</span>
            </Link>
            <Link 
              href="/#projects" 
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline text-xs font-mono uppercase tracking-widest">Back</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/ArkhanShimar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full glass text-slate-400 hover:text-green-500 transition-all border-white/5 hover:border-green-500/30"
            >
              <Github size={20} />
            </a>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-1">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] font-mono font-medium tracking-wide text-green-500 border-green-500/20 uppercase">
              <LayoutGrid size={12} />
              All Projects
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Full Portfolio<span className="text-green-500">.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Explore the complete collection of my development work, ranging from web applications to AI-driven tools.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search projects or tech..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/[0.03] border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-sm font-sans focus:outline-none focus:border-green-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {currentProjects.length > 0 ? (
              currentProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative glass rounded-2xl overflow-hidden flex flex-col hover:border-green-500/20 transition-all duration-500 h-[420px]"
                >
                  <div className="relative h-44 shrink-0 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 2).map((t) => (
                        <span key={t} className="px-2 py-0.5 glass text-[9px] font-mono text-green-500 rounded uppercase tracking-widest font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow min-h-0">
                    <div className="flex justify-between items-start mb-4 shrink-0">
                      <h3 className="text-lg font-bold text-white group-hover:text-green-500 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex gap-3">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                            <Github size={18} />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-[13px] text-slate-400 font-sans line-clamp-3 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5 shrink-0">
                      <div className="flex gap-2">
                        {project.tech.map((t) => (
                          <div key={t} className="size-1.5 rounded-full bg-green-500/20" title={t}></div>
                        ))}
                      </div>
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-green-500 uppercase tracking-widest flex items-center gap-1.5 hover:gap-2.5 transition-all font-semibold"
                        >
                          Source_Code <Code size={14} />
                        </a>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full py-20 text-center"
              >
                <div className="inline-flex items-center justify-center size-16 rounded-full glass text-slate-600 mb-6">
                  <Search size={32} />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">No projects found</h2>
                <p className="text-slate-500">Try searching with a different keyword or technology.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 glass rounded-xl text-slate-400 hover:text-green-500 disabled:opacity-30 disabled:pointer-events-none transition-all border-white/5"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`size-11 flex items-center justify-center rounded-xl font-mono text-sm transition-all border ${
                    currentPage === i + 1 
                      ? "bg-green-500 text-black border-green-500 shadow-lg shadow-green-500/20 font-bold" 
                      : "glass text-slate-400 hover:text-white border-white/5"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 glass rounded-xl text-slate-400 hover:text-green-500 disabled:opacity-30 disabled:pointer-events-none transition-all border-white/5"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Arkhan Shimar. Built with Precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
