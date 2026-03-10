"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const bottom = top + rect.height;

        if (scrollPosition >= top && scrollPosition < bottom) {
          currentSection = section.id;
        }
      }

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-2xl py-2 border-b border-white/5 shadow-2xl" : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6">
        <Link
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="flex items-center gap-2 group"
        >
          <div className="size-5 rounded bg-green-500 flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="size-1.5 bg-black rounded-sm rotate-45" />
          </div>
          <span className="text-base font-bold tracking-tighter text-white">
            ARKHAN<span className="text-green-500">.</span>SH
          </span>
        </Link>

        {/* Desktop Nav - Refined Cursor Style */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full glass border-white/10 bg-white/[0.02]">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => scrollToSection(e, section.id)}
              className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full ${
                active === section.id 
                  ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {section.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass border-b border-white/10 overflow-hidden mt-2 mx-4 rounded-2xl"
          >
            <ul className="flex flex-col p-6 space-y-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className={`text-sm font-medium ${
                      active === section.id ? "text-green-500" : "text-slate-400"
                    }`}
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
