"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { EducationTimeline } from "@/components/education-timeline";
import {
  SiAndroidstudio,
  SiCplusplus,
  SiCss3,
  SiDotnet,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiPython,
  SiReact,
  SiR,
  SiTailwindcss,
  SiTypescript,
  SiGithub,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skills = [
  { label: "Java", icon: FaJava },
  { label: "PHP", icon: SiPhp },
  { label: "JavaScript", icon: SiJavascript },
  { label: "TypeScript", icon: SiTypescript },
  { label: "React", icon: SiReact },
  { label: "Tailwind", icon: SiTailwindcss },
  { label: "Android Studio", icon: SiAndroidstudio },
  { label: "Firebase", icon: SiFirebase },
  { label: "MySQL", icon: SiMysql },
  { label: "MongoDB", icon: SiMongodb },
  { label: "HTML", icon: SiHtml5 },
  { label: "CSS", icon: SiCss3 },
  { label: "C++", icon: SiCplusplus },
  { label: "C#", icon: SiDotnet },
  { label: "R", icon: SiR },
  { label: "Github", icon: SiGithub },
];

const education = [
  {
    title: "BSc (Hons) Software Engineering",
    subtitle: "Cardiff Metropolitan University / ICBT Kandy Campus",
    year: "2023 – Present",
    description:
      "Reading software engineering with focus on full-stack web and mobile development, collaborative projects, and industry-focused coursework.",
  },
  {
    title: "G.C.E Advanced Level – Physical Science",
    subtitle: "Baduriya National School, Mawanella",
    year: "2022",
    description: "Achieved 2S results in the Physical Science stream with emphasis on mathematics and physics.",
  },
  {
    title: "G.C.E Ordinary Level",
    subtitle: "Baduriya National School, Mawanella",
    year: "2019",
    description: "Secured 8A and 1C grades highlighting strong academic foundation.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-white/5 bg-[rgba(3,7,18,0.3)] py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="mx-auto w-full max-w-6xl space-y-16 px-6 text-center lg:text-left">
        <div className="gap-12 lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-10"
          >
            <SectionHeading
              eyebrow="About"
              title="Mission-driven student developer"
              description="Second-year software engineering undergraduate focused on web platforms and Android apps that feel intuitive and reliable."
            />
            <div className="space-y-5 text-base text-[var(--muted)] sm:text-lg">
              <p>
                I&apos;m currently deepening my skills in full-stack JavaScript, PHP, and native Android through degree projects and self-driven builds. I enjoy translating ideas into polished, user-friendly software.
              </p>
              <p>
                My toolkit spans modern frameworks, cloud-backed databases, and collaborative tooling. Outside code, I design branding assets, mentor maths students, and help run campus events.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur lg:mt-0"
          >
            <h3 className="text-sm uppercase tracking-[0.3em] text-cyan-300">Core Skills</h3>
            <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {skills.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-white/5 p-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
                >
                  <Icon className="size-6 text-cyan-200 transition group-hover:scale-110" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-slate-200 backdrop-blur lg:justify-between lg:text-base"
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Languages</p>
            <p className="text-[var(--muted)]">
              Communicating confidently across native Tamil, fluent Sinhala, and professional English helps me collaborate with diverse teams and users.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-cyan-200 sm:flex-row sm:items-center sm:gap-6 lg:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2">
              <span className="size-2 rounded-full bg-cyan-400" /> Tamil · Native
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2">
              <span className="size-2 rounded-full bg-cyan-300" /> Sinhala · Strong
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2">
              <span className="size-2 rounded-full bg-cyan-200" /> English · Fluent
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <h3 className="text-sm uppercase tracking-[0.3em] text-cyan-300">Education Journey</h3>
          <EducationTimeline items={education} />
        </motion.div>
      </div>
    </section>
  );
}
