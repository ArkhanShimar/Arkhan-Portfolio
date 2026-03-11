"use client";

import { useState, useMemo, useEffect } from "react";
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
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPos = window.scrollY;
      setHeaderHidden(scrollPos + clientHeight >= scrollHeight - 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen text-white selection:bg-green-500 selection:text-black font-sans bg-[#000000]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none fixed" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none fixed" />
      
      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.05),transparent_50%)]" />

      {/* Navigation Bar */}
      <header className={`sticky top-0 z-50 py-4 transition-all duration-500 ${
        headerHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/#home" 
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-green-500/10 group-hover:text-green-500 transition-all border border-white/5 group-hover:border-green-500/20">
                <Home size={16} />
              </div>
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest font-bold">Home</span>
            </Link>
            <Link 
              href="/#projects" 
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-green-500/10 group-hover:text-green-500 transition-all border border-white/5 group-hover:border-green-500/20">
                <ArrowLeft size={16} />
              </div>
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-widest font-bold">Back</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/ArkhanShimar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="size-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-green-500 transition-all border border-white/5 hover:border-green-500/30 shadow-sm"
            >
              <Github size={18} />
            </a>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-[9px] font-mono font-black tracking-[0.2em] text-green-500 border border-green-500/20 uppercase">
              <div className="size-1 bg-green-500 rounded-full animate-pulse" />
              Full Archive
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Project Gallery<span className="text-green-500">.</span>
            </h1>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed italic border-l-2 border-green-500/30 pl-5">
              A comprehensive collection of my digital experiences, engineered with performance and scalability in mind.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-0 bg-green-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors z-10" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH REPOSITORY..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-5 text-[10px] font-mono text-white focus:outline-none focus:border-green-500/40 focus:bg-white/[0.06] transition-all placeholder:text-slate-700 relative z-10 uppercase tracking-widest"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden flex flex-col hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 h-[280px] sm:h-[400px]"
                >
                  <div className="relative h-24 sm:h-40 shrink-0 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex flex-wrap gap-1">
                      {project.tech.slice(0, 2).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-[7px] sm:text-[8px] font-mono text-green-500 rounded-md uppercase tracking-widest font-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 sm:p-6 flex flex-col flex-grow relative z-10">
                    <div className="flex justify-between items-start mb-2 sm:mb-4">
                      <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-green-500 transition-colors leading-tight tracking-tight">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 sm:gap-3">
                        {project.github && (
                          <motion.a 
                            whileHover={{ scale: 1.1, color: "#22c55e" }}
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-slate-500 transition-colors"
                          >
                            <Github size={14} className="sm:size-[18px]" />
                          </motion.a>
                        )}
                        {project.demo && (
                          <motion.a 
                            whileHover={{ scale: 1.1, color: "#22c55e" }}
                            href={project.demo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-slate-500 transition-colors"
                          >
                            <ExternalLink size={14} className="sm:size-[18px]" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-[12px] text-slate-400 font-sans line-clamp-3 leading-relaxed mb-3 sm:mb-6 italic border-l-2 border-green-500/20 pl-2 sm:pl-4">
                      {project.description}
                    </p>

                    <div className="pt-2 sm:pt-4 mt-auto flex items-center justify-between border-t border-white/5">
                      <div className="flex gap-1 sm:gap-2">
                        {project.tech.map((t) => (
                          <div key={t} className="size-1 sm:size-1.5 rounded-full bg-green-500/20 group-hover:bg-green-500/40 transition-colors" title={t}></div>
                        ))}
                      </div>
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[8px] sm:text-[10px] font-mono text-green-500 uppercase tracking-widest flex items-center gap-1 sm:gap-2 hover:gap-1.5 sm:hover:gap-3 transition-all font-black group-hover:text-white"
                        >
                          REPO <Code size={10} className="sm:size-[14px]" />
                        </a>
                      ) : (
                        <div className="text-[7px] sm:text-[9px] font-mono text-slate-600 uppercase tracking-widest">Confidential</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full py-24 text-center"
              >
                <div className="inline-flex items-center justify-center size-20 rounded-3xl bg-white/[0.02] border border-white/5 text-slate-700 mb-8">
                  <Search size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">No matching results</h2>
                <p className="text-slate-500 font-sans italic">Try searching with a different technology or keyword.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="size-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-green-500 disabled:opacity-30 disabled:pointer-events-none transition-all hover:border-white/20"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`size-10 flex items-center justify-center rounded-xl font-mono text-[10px] transition-all border ${
                    currentPage === i + 1 
                      ? "bg-green-500 text-black border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] font-black" 
                      : "bg-white/[0.02] text-slate-500 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="size-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-400 hover:text-green-500 disabled:opacity-30 disabled:pointer-events-none transition-all hover:border-white/20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="size-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black">Archive Integrity Verified</span>
          </div>
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-[0.2em] text-center">
            © {new Date().getFullYear()} ARKHAN.SHIMAR // ENGINEERED FOR EXCELLENCE
          </p>
        </div>
      </footer>
    </div>
  );
}
