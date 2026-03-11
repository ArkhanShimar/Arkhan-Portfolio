"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useTypewriter } from "@/hooks/use-typewriter";
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 pb-8 lg:pt-20 lg:pb-16">
      <div className="hidden sm:block absolute inset-0 z-[1] pointer-events-none opacity-[0.2]">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Background Portrait"
            fill
            priority
            className="hero-bg--dark object-contain object-center grayscale brightness-65 contrast-110 sm:scale-90 lg:scale-95 lg:-translate-x-16 transition-opacity duration-300"
          />
          <Image
            src="/hero-bg-light.png"
            alt="Background Portrait"
            fill
            priority
            className="hero-bg--light object-contain object-center grayscale brightness-65 contrast-110 sm:scale-90 lg:scale-95 lg:-translate-x-16 transition-opacity duration-300"
          />
          <div className="hero-bg-overlay absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Split Layout: Content Left, Code Right */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-12 lg:mb-16">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left space-y-4 pr-24 sm:pr-0">
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
              className="space-y-2 max-w-xl relative"
            >
              <div className="pointer-events-none absolute -right-36 top-4 h-72 w-72 opacity-[0.35] sm:hidden">
                <div className="absolute inset-0">
                  <Image
                    src="/profile.png"
                    alt="Profile Portrait"
                    fill
                    priority
                    className="object-cover object-center grayscale brightness-90 contrast-110 rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/25 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
                </div>
              </div>

              <h1 className="relative z-10 text-[30px] leading-[1.05] sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Build software <br />
                <span className="text-green-500 italic font-medium">faster</span> than ever.
              </h1>
              
              <div className="relative z-10 text-base md:text-lg text-slate-400 font-mono flex items-center gap-2">
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
              className="flex gap-3"
            >
              <a 
                href="#projects"
                className="group flex-1 min-w-0 px-4 sm:px-5 py-2 glass text-green-500 border border-green-500/20 text-[10px] sm:text-[11px] font-bold rounded-full hover:border-white/50 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg whitespace-nowrap"
              >
                Explore Work
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/Arkhan_Shimar.pdf"
                download
                className="group flex-1 min-w-0 px-4 sm:px-5 py-2 glass text-white border border-white/20 text-[10px] sm:text-[11px] font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg whitespace-nowrap"
              >
                Download CV
                <Download size={12} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Content: GitHub Style Code Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative block w-full mt-10 lg:mt-0 scale-100 origin-right"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-xl mx-auto lg:ml-auto">
              {/* Terminal Header */}
              <div className="bg-white/5 px-3 sm:px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-[#ff5f56]" />
                  <div className="size-3 rounded-full bg-[#ffbd2e]" />
                  <div className="size-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Arkhan_Console // v2.1.0</div>
                <div className="hidden sm:flex gap-3">
                  {[
                    { icon: Github, href: "https://github.com/ArkhanShimar" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/arkhan-shimar-77b3072ab/" },
                    { icon: Mail, href: `mailto:${siteConfig.email}` }
                  ].map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-500 transition-colors">
                      <social.icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-6 space-y-6 bg-black/40 font-mono max-h-[340px] sm:max-h-[520px] lg:max-h-none overflow-y-auto">
                {/* User Comment */}
                <div className="flex gap-4 items-start border-b border-white/5 pb-6">
                  <div className="relative size-12 rounded-xl overflow-hidden border border-white/10">
                    <Image src="/profile.png" alt="User" fill className="object-cover grayscale" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Arkhan.Shimar <span className="text-slate-500 font-normal ml-2 text-[10px]">active_now</span></span>
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
            <div className="hidden sm:block absolute -z-10 -bottom-10 -right-10 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="hidden sm:block absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-green-500/50 to-transparent" />
      </motion.div>
    </section>
  );
}
