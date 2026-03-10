"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useTypewriter } from "@/hooks/use-typewriter";
import { GridBackground } from "./GridBackground";
import { ArrowRight, Github, Linkedin, Mail, Download, Terminal, User, Code2, Rocket, Award, CheckCircle2, MessageSquare } from "lucide-react";
import Image from "next/image";
import { EducationTimeline } from "@/components/education-timeline";
import { Experience } from "@/components/experience";
import { SectionHeading } from "@/components/section-heading";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI Explorer",
];

const education = [
  {
    title: "BSc (Hons) Computer Science (Software Engineering) (R)",
    subtitle: "CINEC Campus // Affiliated with University of Wolverhampton - UK",
    year: "2024 - Present",
    description: "Specializing in software architecture and modern web engineering.",
  },
  {
    title: "Higher Diploma in Computing and Software Engineering",
    subtitle: "ICBT Campus // Affiliated with Cardiff Metropolitan University - UK",
    year: "2024 – 2026",
    description: "Foundation in full-stack systems and mobile development.",
  },
  {
    title: "G.C.E Advanced Level – Physical Science Stream",
    subtitle: "Baduriya National School, Mawanella",
    year: "2023",
    description: "Emphasis on Mathematics and Physics.",
  },
  {
    title: "G.C.E Ordinary Level",
    subtitle: "Baduriya National School, Mawanella",
    year: "2020",
    description: "Successfully completed secondary education.",
  },
];

const certifications = [
  { title: "Introduction To AI", issuer: "GOOGLE", desc: "Foundational AI & ML concepts" },
  { title: "Data Science", issuer: "Cisco", desc: "Data analysis & visualization" },
  { title: "Postman Expert", issuer: "Postman", desc: "API testing & documentation" },
  { title: "JS Essentials 2", issuer: "Cisco", desc: "Advanced logic & patterns" },
  { title: "Modern AI", issuer: "Cisco", desc: "Neural networks & deep learning" },
  { title: "GenZis.AI Cert", issuer: "ICBT Campus", desc: "AI-driven dev certification" },
];

export function Hero() {
  const typed = useTypewriter({ words: roles });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16 pb-8 lg:pt-20 lg:pb-16">
      <GridBackground />
      
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
                href="/Arkhan_Shimar_CV.pdf"
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
            className="relative hidden lg:block scale-90 origin-right"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-lg mx-auto lg:ml-auto">
              {/* Terminal Header */}
              <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-[#ff5f56]" />
                  <div className="size-3 rounded-full bg-[#ffbd2e]" />
                  <div className="size-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] font-mono text-slate-500">GitHub Pull Request</div>
                <div className="size-3" />
              </div>

              {/* Terminal Body */}
              <div className="p-6 space-y-6 bg-black/40 font-mono">
                {/* User Comment */}
                <div className="flex gap-4 items-start">
                  <div className="relative size-8 rounded-full overflow-hidden border border-white/10">
                    <Image src="/profile.png" alt="User" fill className="object-cover grayscale" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">arkhanshimar <span className="text-slate-500 font-normal">2m ago</span></span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-300">
                      @engineer review this implementation?
                    </div>
                  </div>
                </div>

                {/* Bot Review */}
                <div className="flex gap-4 items-start">
                  <div className="size-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                    <Terminal size={16} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">engineer</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 text-slate-500 border border-white/10 uppercase">bot</span>
                      <span className="text-[10px] text-slate-500">reviewed 1m ago</span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] text-slate-500 truncate">src/core/architecture/performance.ts</div>
                      <div className="rounded-lg overflow-hidden border border-white/5">
                        <div className="bg-red-500/10 px-3 py-1.5 flex gap-4 text-[10px]">
                          <span className="text-red-500/50">3292 -</span>
                          <span className="text-red-400">{"{ legacyMode().init }"}</span>
                        </div>
                        <div className="bg-green-500/10 px-3 py-1.5 flex gap-4 text-[10px]">
                          <span className="text-green-500/50">3293 +</span>
                          <span className="text-green-400">{"{ modernStackInitialise() }"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <CheckCircle2 size={14} className="text-green-500" />
                        Optimization Identified
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Transitioning to <span className="text-green-500">modernStackInitialise</span> ensures 
                        sub-100ms hydration and improved LCP metrics.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <div className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-white flex items-center gap-2">
                        <Rocket size={12} className="text-green-500" />
                        Apply Fix
                      </div>
                      <div className="px-3 py-1.5 rounded-md border border-white/10 text-[9px] font-bold text-slate-500">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background glow for code box */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Integrated Details Section */}
        <div className="max-w-6xl mx-auto mt-24">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
            
            {/* Identity & Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative size-20 md:size-24 rounded-2xl overflow-hidden border border-white/10 glow-green shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                    <Image 
                      src="/profile.png" 
                      alt="Arkhan Shimar" 
                      fill 
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="text-left space-y-1">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Arkhan Shimar</h2>
                    <p className="text-sm font-mono text-green-500/80">~/software-engineer</p>
                    <div className="flex gap-3 mt-3">
                      {[
                        { icon: Github, href: "https://github.com/ArkhanShimar" },
                        { icon: Linkedin, href: "https://linkedin.com/in/arkhanshimar" },
                        { icon: Mail, href: `mailto:${siteConfig.email}` }
                      ].map((social, i) => (
                        <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-green-500 transition-colors">
                          <social.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <SectionHeading
                  eyebrow="Introduction"
                  title="Mission-driven Engineering."
                />
                
                <div className="space-y-6 text-slate-400 font-sans text-base leading-relaxed max-w-xl">
                  <p>
                    Software Engineering undergraduate with practical experience in web, backend, and Android application development. 
                    Specializing in building high-performance systems with a clean, minimalist aesthetic.
                  </p>
                  <p>
                    Seeking an internship to apply technical skills, gain real-world experience, and grow as a professional software engineer.
                  </p>
                </div>
              </div>

              {/* Roles Badges */}
              <div className="grid grid-cols-2 gap-3 max-w-lg">
                {[
                  { icon: Terminal, label: "Full-Stack Dev" },
                  { icon: Code2, label: "UI/UX Design" },
                  { icon: User, label: "Leadership" },
                  { icon: Rocket, label: "Scalable Apps" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl glass hover:border-green-500/20 transition-all group">
                    <item.icon size={16} className="text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="pt-8 space-y-6">
                <div className="flex items-center gap-2">
                  <Award className="text-green-500" size={16} />
                  <h3 className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.3em] font-semibold">Certifications</h3>
                </div>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex items-center justify-between p-3 rounded-xl glass hover:border-green-500/20 transition-all"
                    >
                      <div className="flex flex-col gap-0.5 min-w-[140px]">
                        <span className="text-[10px] font-bold text-white group-hover:text-green-500 transition-colors uppercase tracking-tight">{cert.title}</span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{cert.issuer}</span>
                      </div>
                      <div className="hidden md:block flex-1 px-4 text-right">
                        <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors italic tracking-tight">
                          {cert.desc}
                        </span>
                      </div>
                      <div className="size-1.5 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Work & Education History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Stats Card */}
              <div className="p-6 rounded-2xl glass border-green-500/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Projects_Shipped</p>
                    <p className="text-2xl font-bold text-white tracking-tight">12+</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Experience_Lvl</p>
                    <p className="text-2xl font-bold text-green-500 tracking-tight">Engineer</p>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div className="p-6 rounded-2xl glass">
                <div className="flex items-center gap-2 mb-8">
                  <div className="size-1.5 bg-green-500 rounded-full" />
                  <h3 className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.3em] font-semibold">Work Experience</h3>
                </div>
                <Experience />
              </div>

              {/* Education Section */}
              <div className="p-6 rounded-2xl glass">
                <div className="flex items-center gap-2 mb-8">
                  <div className="size-1.5 bg-green-500 rounded-full" />
                  <h3 className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.3em] font-semibold">Education History</h3>
                </div>
                <EducationTimeline education={education} />
              </div>
            </motion.div>
          </div>
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
