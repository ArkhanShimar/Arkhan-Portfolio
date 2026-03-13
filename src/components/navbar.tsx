"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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

type NavbarProps = {
  activeId?: string;
  onNavigate?: (id: string) => void;
};

export function Navbar({ activeId, onNavigate }: NavbarProps) {
  const [activeInternal, setActiveInternal] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = activeId ?? activeInternal;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);

    if (onNavigate) {
      onNavigate(id);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (onNavigate ? 0 : window.pageYOffset) - headerOffset;

      if (onNavigate) {
        const sliderScroll = document.querySelector<HTMLElement>('[data-section-slider-scroll="true"]');
        if (sliderScroll) {
          sliderScroll.scrollTo({
            top: sliderScroll.scrollTop + elementPosition - headerOffset,
            behavior: "smooth",
          });
        }
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
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

      setActiveInternal(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onNavigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const checkFooter = () => {
      const footer = document.querySelector('[data-footer="true"]');
      if (footer) {
        observer.observe(footer);
      } else {
        setTimeout(checkFooter, 500);
      }
    };

    checkFooter();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!onNavigate) return;

    const el = document.querySelector<HTMLElement>('[data-section-slider-scroll="true"]');
    if (!el) return;

    const handleScroll = () => {
      setScrolled(el.scrollTop > 20);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [onNavigate]);

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } ${
        scrolled ? "bg-black/60 backdrop-blur-md sm:backdrop-blur-2xl py-2 shadow-lg sm:shadow-2xl" : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto relative flex items-center justify-between px-6">
        <Link
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="flex items-center gap-2 group"
        >
          <div className="relative size-6 transition-transform group-hover:scale-110 rounded-md overflow-hidden shadow-[0_0_10px_rgba(34,197,94,0.1)]">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain scale-110"
            />
          </div>
          <span className="text-base font-bold tracking-tighter text-white">
            ARKHAN<span className="text-green-500"> . </span>SHIMAR
          </span>
        </Link>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => scrollToSection(e, section.id)}
              className={`text-[11px] font-mono uppercase tracking-widest transition-colors ${
                active === section.id ? "text-green-500" : "text-slate-400 hover:text-green-500"
              }`}
            >
              {section.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Arkhan_Shimar.pdf"
            download
            className="size-9 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-green-500 hover:border-green-500/30 transition-all"
            title="Download CV"
          >
            <Download size={16} />
          </a>
          <ThemeToggle size="sm" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle size="sm" />
          <button 
            className="text-white p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
              <li className="pt-2 border-t border-white/10">
                <a
                  href="/Arkhan_Shimar.pdf"
                  download
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-green-500 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Download size={16} />
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
