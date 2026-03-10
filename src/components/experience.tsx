"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description?: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Web Developer | Graphic Designer",
    company: "Freelance",
    period: "2024 - Present",
  },
  {
    title: "Math Tutor | Part Time",
    company: "GCE O/L",
    period: "2023 - Present",
  }
];

export function Experience() {
  return (
    <div className="space-y-6">
      {experiences.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative pl-6 border-l border-white/10 group pb-4"
        >
          <div className="absolute -left-[4.5px] top-1.5 size-2 rounded-full bg-slate-800 border border-white/20 group-hover:bg-green-500 group-hover:border-green-400 transition-colors" />
          
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest font-semibold">{exp.period}</span>
            <h4 className="text-sm font-bold text-white group-hover:text-green-500 transition-colors">{exp.title}</h4>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{exp.company}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
