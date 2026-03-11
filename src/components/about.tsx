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
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
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
                        { icon: Mail, href: `mailto:${siteConfig.email}` },
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-green-500 transition-colors"
                        >
                          <social.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <SectionHeading eyebrow="Introduction" title="Mission-driven Engineering." />

                <div className="space-y-6 text-slate-400 font-sans text-base leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                  <p>
                    Software Engineering undergraduate with practical experience in web, backend, and Android application development.
                    Specializing in building high-performance systems with a clean, minimalist aesthetic.
                  </p>
                  <p>
                    Seeking an internship to apply technical skills, gain real-world experience, and grow as a professional software engineer.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-lg">
                {[
                  { icon: Terminal, label: "Full-Stack Dev" },
                  { icon: Code2, label: "UI/UX Design" },
                  { icon: User, label: "Leadership" },
                  { icon: Rocket, label: "Scalable Apps" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl glass hover:border-green-500/20 transition-all group"
                  >
                    <item.icon size={16} className="text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>

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
                        <span className="text-[10px] font-bold text-white group-hover:text-green-500 transition-colors uppercase tracking-tight">
                          {cert.title}
                        </span>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-2xl glass border-green-500/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Projects_Shipped</p>
                    <p className="text-2xl font-bold text-white tracking-tight">12+</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Experience_Lvl</p>
                    <p className="text-2xl font-bold text-green-500 tracking-tight">Fresher</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass">
                <div className="flex items-center justify-between gap-6">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Languages</span>
                  <div className="flex items-center gap-4 text-[10px] font-mono">
                    <span className="text-green-500/70">English</span>
                    <span className="text-green-500/70">Sinhala</span>
                    <span className="text-green-500/70">Tamil</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl glass">
                <div className="flex items-center gap-2 mb-8">
                  <div className="size-1.5 bg-green-500 rounded-full" />
                  <h3 className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.3em] font-semibold">Work Experience</h3>
                </div>
                <Experience />
              </div>

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
    </section>
  );
}
