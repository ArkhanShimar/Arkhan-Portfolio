import { Download, Heart, Terminal, Home } from "lucide-react";
import Image from "next/image";
import { SiGithub, SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-footer="true" className="relative bg-[#000000] border-t border-white/5 py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center text-center gap-3 md:flex-row md:items-center md:text-left">
            <div className="relative size-10 rounded-md overflow-hidden shadow-[0_0_18px_rgba(34,197,94,0.15)] transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain scale-110"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-mono font-bold tracking-tighter text-white">
                ARKHAN<span className="text-green-500">.</span>SHIMAR
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                Engineered for excellence
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[11px] font-mono text-slate-500 uppercase tracking-widest hover:text-green-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 md:justify-end">
            {[
              { icon: SiGithub, link: "https://github.com/ArkhanShimar" },
              { icon: SiLinkedin, link: "https://www.linkedin.com/in/arkhan-shimar-77b3072ab/" },
              { icon: SiFacebook, link: "https://www.facebook.com/arkhan.smr.9/" },
              { icon: SiInstagram, link: "https://www.instagram.com/arkhvn__/" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="size-9 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-green-500 hover:border-green-500/30 transition-all"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4 border-t border-white/5 pt-4">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
            <span className="text-[11px] font-mono text-slate-600 uppercase tracking-widest text-center md:text-left">
              © {year} Arkhan Shimar
            </span>

            <div className="flex items-center justify-center gap-4">
              <a
                href="/Arkhan_Shimar.pdf"
                download
                className="inline-flex items-center justify-center size-10 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 hover:text-green-500 hover:border-green-500/30 transition-all"
                title="Download CV"
              >
                <Download size={16} />
              </a>
              <a
                href="#home"
                className="inline-flex items-center justify-center size-10 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 hover:text-green-500 hover:border-green-500/30 transition-all"
                title="Go to Home"
              >
                <Home size={16} />
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 md:justify-end">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 uppercase tracking-widest">
                <div className="size-1.5 bg-green-500/30 rounded-full animate-pulse" />
                <span>System online</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-600 uppercase tracking-widest">
                <span>Built with</span>
                <Heart size={12} className="text-red-500/40 fill-red-500/20" />
                <span>Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
