"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useTypewriter } from "@/hooks/use-typewriter";
import { GridBackground } from "./GridBackground";
import { ArrowRight, Github, Linkedin, Mail, Download, Terminal } from "lucide-react";
import Image from "next/image";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI Explorer",
];

export function Hero() {
  const typed = useTypewriter({ words: roles });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16 pb-8 lg:pt-20 lg:pb-16">
      <GridBackground />

      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.2]">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Background Portrait"
            fill
            priority
            className="object-contain object-center grayscale brightness-85 contrast-110 scale-95 -translate-x-16"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6">
        {/* Split Layout: Content Left, Code Right */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[9px] font-medium tracking-wide text-green-500 border-green-500/20"
            >
              <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
              AVAILABLE FOR NEW PROJECTS
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 max-w-xl"
            >
              <h1 className="text-xl md:text-3xl font-bold tracking-tight text-white leading-[1.1]">
                Build software <br />
                <span className="text-green-500 italic font-medium">faster</span> than ever.
              </h1>
              
              <div className="text-base md:text-lg text-slate-400 font-mono flex items-center gap-2">
                <span className="text-green-500 opacity-50">&gt;</span>
                <span>{typed}</span>
                <span className="w-1 h-4 bg-green-500 animate-pulse" />
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-sm text-sm text-slate-400 leading-relaxed font-sans"
            >
              An engineer focused on building intelligent, high-performance web applications 
              with a clean, minimalist aesthetic.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <a 
                href="#projects"
                className="group px-5 py-2 bg-white text-black text-[11px] font-bold rounded-full hover:bg-green-500 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                Explore Work
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/Arkhan_Shimar.pdf"
                download
                className="px-5 py-2 glass text-white text-[11px] font-bold rounded-full hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                Download CV
                <Download size={12} />
              </a>
            </motion.div>
          </div>

          {/* Right Content: GitHub Style Code Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block scale-100 origin-right"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-xl mx-auto lg:ml-auto">
              {/* Terminal Header */}
              <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-[#ff5f56]" />
                  <div className="size-3 rounded-full bg-[#ffbd2e]" />
                  <div className="size-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Arkhan_Console // v2.1.0</div>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "https://github.com/ArkhanShimar" },
                    { icon: Linkedin, href: "https://linkedin.com/in/arkhanshimar" },
                    { icon: Mail, href: `mailto:${siteConfig.email}` }
                  ].map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-500 transition-colors">
                      <social.icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 space-y-6 bg-black/40 font-mono">
                {/* User Comment */}
                <div className="flex gap-4 items-start border-b border-white/5 pb-6">
                  <div className="relative size-12 rounded-xl overflow-hidden border border-white/10">
                    <Image src="/profile.png" alt="User" fill className="object-cover grayscale" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">arkhan.sh <span className="text-slate-500 font-normal ml-2 text-[10px]">active_now</span></span>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10 text-[11px] text-slate-300 leading-relaxed">
                      Computer Science undergraduate building full-stack systems and Android apps. 
                      <span className="text-green-500 block mt-1 font-bold">@arkhan push_to_production --stable</span>
                    </div>
                  </div>
                </div>

                {/* Bot Review */}
                <div className="flex gap-4 items-start">
                  <div className="size-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                    <Terminal size={20} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">production_bot</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-green-500 text-black font-bold uppercase tracking-tighter">verified_engineer</span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] text-slate-500 truncate">src/core/profile/status.json</div>
                      <div className="rounded-lg overflow-hidden border border-white/5 bg-black/60">
                        <div className="bg-red-500/5 px-3 py-1.5 flex gap-4 text-[10px]">
                          <span className="text-red-500/50">01 -</span>
                          <span className="text-slate-500 line-through">{"\"availability\": \"full_time_student\""}</span>
                        </div>
                        <div className="bg-green-500/5 px-3 py-1.5 flex gap-4 text-[10px]">
                          <span className="text-green-500/50">02 +</span>
                          <span className="text-green-400 font-bold">{"\"availability\": \"seeking_internship\""}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <p className="text-[8px] text-slate-500 uppercase">Projects</p>
                        <p className="text-xs font-bold text-white tracking-tight">12+</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <p className="text-[8px] text-slate-500 uppercase">Stack</p>
                        <p className="text-xs font-bold text-green-500 tracking-tight">MERN</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <p className="text-[8px] text-slate-500 uppercase">Uptime</p>
                        <p className="text-xs font-bold text-white tracking-tight">99.9%</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                        Seeking Internship
                      </span>
                      <span className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Open to Collaborate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background glow for code box */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-green-500/50 to-transparent" />
      </motion.div>
    </section>
  );
}
