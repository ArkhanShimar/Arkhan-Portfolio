import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[rgba(3,7,18,0.6)] py-10 text-sm text-slate-400 backdrop-blur supports-[backdrop-filter]:bg-[rgba(3,7,18,0.45)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-slate-300">
          <p className="text-base font-semibold text-white">{siteConfig.name}</p>
          <p>{siteConfig.role}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.25em] text-slate-500">
          <Link href={siteConfig.socials.github} target="_blank" className="transition hover:text-cyan-200">
            GitHub
          </Link>
          <Link href={siteConfig.socials.linkedin} target="_blank" className="transition hover:text-cyan-200">
            LinkedIn
          </Link>
          <Link href={siteConfig.socials.email} className="transition hover:text-cyan-200">
            Email
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-6 flex w-full max-w-6xl items-center justify-between px-6 text-xs text-slate-500">
        <p>© {year} {siteConfig.name}. Crafted with Next.js, Tailwind CSS, and Framer Motion.</p>
        <Link
          href="#home"
          aria-label="Back to top"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200 shadow-lg shadow-cyan-500/10 transition hover:translate-y-[-4px] hover:border-cyan-300/60 hover:text-cyan-100"
        >
          <span className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-transparent opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
          <ArrowUp className="size-4 transition group-hover:-translate-y-1 group-hover:rotate-3" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">Top</span>
        </Link>
      </div>
    </footer>
  );
}
