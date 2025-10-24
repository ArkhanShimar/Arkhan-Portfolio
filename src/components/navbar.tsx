"use client";

import Image from "next/image";
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
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentSection = sections[0]?.id ?? "home";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const bottom = top + rect.height;

        if (scrollPosition >= top && scrollPosition < bottom) {
          currentSection = section.id;
          break;
        }
      }

      setActive(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[rgba(3,7,18,0.75)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(3,7,18,0.55)]">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#home"
          className="relative inline-flex items-center justify-center"
          aria-label="Back to home"
        >
          <Image
            src="/logo.png"
            alt="Arkhan Shimar logo"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            {sections.map((section) => (
              <li key={section.id} className="relative">
                <Link
                  href={`#${section.id}`}
                  className="transition-colors hover:text-cyan-200"
                >
                  {section.label}
                </Link>
                {active === section.id ? (
                  <motion.span
                    className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-cyan-400"
                    layoutId="active-link"
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  />
                ) : null}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:border-cyan-300/60 hover:text-cyan-200 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur">
              <ul className="space-y-4 text-sm font-medium text-slate-200">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 transition hover:border-cyan-400/50 hover:bg-white/5"
                      onClick={() => setOpen(false)}
                    >
                      <span>{section.label}</span>
                      {active === section.id ? (
                        <span className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                          Active
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
