"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { EducationTimeline } from "@/components/education-timeline";
import { Experience } from "@/components/experience";
import { SectionHeading } from "@/components/section-heading";
import { Award, Code2, Github, Linkedin, Mail, Rocket, Terminal, User } from "lucide-react";

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

export function About() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#000000]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
                  <div className="relative size-24 md:size-28 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(34,197,94,0.15)] group shrink-0">
                    <Image
                      src="/profile.png"
                      alt="Arkhan Shimar"
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="text-center sm:text-left space-y-0.5 py-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-tight">Arkhan Shimar</h2>
                    <p className="text-sm md:text-base font-mono text-green-500 tracking-tight">~/undergraduate-software-engineer</p>
                    
                    <div className="flex gap-3 justify-center sm:justify-start pt-2">
                      {[
                        { icon: Github, href: "https://github.com/ArkhanShimar" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/arkhan-shimar-77b3072ab/" },
                        { icon: Mail, href: `mailto:${siteConfig.email}` },
                      ].map((social, i) => (
                        <motion.a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -2, color: "#22c55e" }}
                          className="text-slate-500 transition-all"
                        >
                          <social.icon size={18} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-green-500 font-bold">Introduction</p>
                    <h3 className="text-6xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">Mission-driven Engineering.</h3>
                  </div>
                  <div className="mt-8 space-y-6 text-slate-400 font-sans text-base leading-relaxed max-w-2xl italic border-l-2 border-green-500/20 pl-6">
                    <p>
                      As a Software Engineering undergraduate, I blend technical rigor with a deep passion for modern digital experiences. My approach focuses on building high-performance systems that are as aesthetically pleasing as they are functionally sound.
                    </p>
                    <p>
                      I specialize in full-stack web architectures and Android development, always prioritizing clean code and scalable design patterns. Currently, I am seeking an internship where I can contribute my skills to real-world challenges while evolving as a professional engineer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-lg">
                {[
                  { icon: Terminal, label: "Full-Stack Dev" },
                  { icon: Code2, label: "UI/UX Design" },
                  { icon: User, label: "Leadership" },
                  { icon: Rocket, label: "Scalable Apps" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 transition-all group"
                  >
                    <div className="size-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 group-hover:shadow-[0_0_15px_rgba(34, 197, 94, 0.2)] transition-all">
                      <item.icon size={16} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black group-hover:text-white">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-12 space-y-8">
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="h-px w-8 bg-green-500/30 group-hover:w-12 transition-all" />
                  <p className="text-[11px] font-mono text-white/90 uppercase tracking-[0.3em] font-black">Professional Certifications</p>
                </div>
                <div className="grid gap-3">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 transition-all"
                    >
                      <div className="flex flex-col gap-1 min-w-[160px]">
                        <span className="text-[11px] font-black text-white group-hover:text-green-500 transition-colors uppercase tracking-tight">
                          {cert.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="size-1 bg-green-500/40 rounded-full" />
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">{cert.issuer}</span>
                        </div>
                      </div>
                      <div className="hidden md:block flex-1 px-8">
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors italic leading-tight block text-right">
                          {cert.desc}
                        </span>
                      </div>
                      <div className="size-1.5 rounded-full bg-green-500/20 group-hover:bg-green-500 group-hover:shadow-[0_0_8px_#22c55e] transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-10"
            >
              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="grid grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Projects_Shipped</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">12<span className="text-green-500">+</span></p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Expertise_Lvl</p>
                    <div className="inline-flex items-center gap-2 text-green-500">
                      <p className="text-2xl font-bold tracking-tighter">Undergrad</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-between gap-6 relative z-10">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black">Language Proficiency</span>
                  <div className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <span className="text-green-500 px-2 py-0.5 bg-green-500/10 rounded">English</span>
                    <span className="text-green-500 px-2 py-0.5 bg-green-500/10 rounded">Sinhala</span>
                    <span className="text-green-500 px-2 py-0.5 bg-green-500/10 rounded">Tamil</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-10 group cursor-default">
                  <div className="size-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                  <h3 className="text-[12px] font-mono text-white uppercase tracking-[0.4em] font-black">Work Experience</h3>
                </div>
                <Experience />
              </div>

              <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-10 group cursor-default">
                  <div className="size-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                  <h3 className="text-[12px] font-mono text-white uppercase tracking-[0.4em] font-black">Education Archive</h3>
                </div>
                <EducationTimeline education={education} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
