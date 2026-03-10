import Link from "next/link";
import { ArrowUp, Terminal, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SiGithub, SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000000] border-t border-white/5 py-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-green-500/5 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-xs">
            <Link href="#home" className="flex items-center gap-2 group">
              <div className="size-7 rounded-lg bg-green-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-transform group-hover:scale-110">
                <Terminal size={16} />
              </div>
              <span className="text-base font-mono font-bold tracking-tighter text-white">
                ARKHAN<span className="text-green-500">.</span>SH
              </span>
            </Link>
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest leading-relaxed text-center md:text-left">
              Engineered for excellence. <br />
              © {year} ARKHAN SHIMAR // VERSION 2.1
            </p>
          </div>

          {/* Social Grid */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.4em]">Connect Nodes</span>
            <div className="flex gap-3">
              {[
                { icon: SiGithub, link: "https://github.com/ArkhanShimar" },
                { icon: SiLinkedin, link: "https://linkedin.com/in/arkhanshimar" },
                { icon: SiFacebook, link: "#" },
                { icon: SiInstagram, link: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-green-500 hover:border-green-500/30 transition-all hover:-translate-y-1 shadow-lg"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* System Status & Navigation */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Languages:</span>
              <span className="text-[9px] font-mono text-green-500/60">EN</span>
              <span className="text-[9px] font-mono text-green-500/60">SI</span>
              <span className="text-[9px] font-mono text-green-500/60">TA</span>
            </div>
            
            <Link 
              href="#home"
              className="group flex items-center gap-3 px-4 py-2 glass rounded-xl hover:border-green-500/50 transition-all"
            >
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-green-500">Jump to Origin</span>
              <div className="size-5 rounded-full bg-white/5 flex items-center justify-center transition-colors group-hover:bg-green-500/10">
                <ArrowUp size={12} className="text-slate-500 group-hover:text-green-500 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>
          </div>

        </div>

        {/* Dynamic Footer Line */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <div className="flex items-center gap-2 text-[8px] font-mono text-slate-800">
            <div className="size-1 bg-green-500/20 rounded-full animate-pulse" />
            <span>SYSTEM_ONLINE // LATENCY: 24MS</span>
          </div>
          <div className="flex items-center gap-2 text-[8px] font-mono text-slate-800">
            <span>BUILT WITH</span>
            <Heart size={8} className="text-red-500/40 fill-red-500/20" />
            <span>AND NEXT.JS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
