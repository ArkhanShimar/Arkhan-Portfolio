"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiFirebase,
  SiAndroidstudio,
  SiPostman,
  SiDocker,
  SiFigma,
  SiPhp,
  SiCplusplus,
  SiHtml5,
  SiMysql,
  SiCloudinary,
  SiGit,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa";

const technicalSkills = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-green-500" },
  { name: "React / Native", icon: SiReact, color: "text-green-500" },
  { name: "TypeScript", icon: SiTypescript, color: "text-green-500" },
  { name: "Node.js / Express", icon: SiNodedotjs, color: "text-green-500" },
  { name: "Java (Android)", icon: FaJava, color: "text-green-500" },
  { name: "PHP / .NET", icon: SiPhp, color: "text-green-500" },
  { name: "C#", icon: TbBrandCSharp, color: "text-green-500" },
  { name: "C++", icon: SiCplusplus, color: "text-green-500" },
  { name: "HTML / CSS", icon: SiHtml5, color: "text-green-500" },
];

const professionalSkills = [
  "Problem-Solving",
  "Team Collaboration",
  "Communication",
  "Leadership",
  "Time Management",
  "Adaptability",
  "Critical Thinking",
  "Public Speaking",
  "Agile Methodology",
  "Project Management",
  "Creativity",
  "Emotional Intelligence",
];

const tools = [
  { icon: SiAndroidstudio, name: "Android Studio" },
  { icon: SiGit, name: "Git" },
  { icon: VscVscode, name: "VS Code" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiFigma, name: "Figma" },
  { icon: SiPostman, name: "Postman" },
];

const databaseSkills = [
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Firebase", icon: SiFirebase },
  { name: "Cloudinary", icon: SiCloudinary },
];

export function Skills() {
  return (
    <section className="py-24 relative overflow-hidden snap-start">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 mb-12">
          
          {/* Left: Technical Stack */}
          <div className="space-y-12">
            <SectionHeading
              eyebrow="Core Stack"
              title="Expertise in modern web."
            />
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {technicalSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl glass hover:border-green-500/20 transition-all group flex items-center gap-3"
                >
                  <skill.icon className={`${skill.color} text-xl transition-transform group-hover:scale-110`} />
                  <span className="text-[11px] font-mono text-white font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Professional Skills */}
          <div className="space-y-12 lg:max-w-xl lg:ml-auto">
            <div className="p-10 rounded-3xl glass relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <SiReact size={240} className="text-green-500" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-3">
                <div className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                Soft Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {professionalSkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider hover:border-green-500/30 hover:text-green-500 transition-all cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-5 rounded-2xl bg-green-500/5 border border-green-500/10">
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  <span className="text-green-500 font-mono mr-2 font-bold uppercase">Summary:</span>
                  Seeking an internship to apply my technical stack in real-world environments while contributing to scalable system architecture.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Databases & Tools side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-white/5">
          {/* Databases list */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-1.5 bg-green-500 rounded-full" />
              <p className="text-[11px] font-mono text-white uppercase tracking-[0.2em] font-bold">Databases & Storage</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {databaseSkills.map((db, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl glass hover:border-green-500/20 transition-all group flex flex-col items-center justify-center gap-3 text-center"
                >
                  <db.icon className="text-xl text-slate-400 group-hover:text-green-500 transition-colors" />
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors">{db.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools list */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-1.5 bg-green-500 rounded-full" />
              <p className="text-[11px] font-mono text-white uppercase tracking-[0.2em] font-bold">Workflow Tools</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {tools.map((tool, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-xl glass hover:border-green-500/20 transition-all group flex flex-col items-center justify-center gap-2 text-center"
                >
                  <tool.icon className="text-lg text-slate-500 group-hover:text-green-500 transition-colors" />
                  <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
