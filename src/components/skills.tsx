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
    <section className="py-24 relative overflow-x-hidden snap-start bg-[#000000]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[100px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[100px] rounded-full translate-x-1/2" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 mb-16">
          
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
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-green-500/30 hover:bg-white/[0.06] transition-all group flex items-center gap-3 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <skill.icon className={`${skill.color} text-xl relative z-10 transition-transform group-hover:scale-110`} />
                  <span className="text-[11px] font-mono text-white/80 group-hover:text-white relative z-10 font-semibold uppercase tracking-wider">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Professional Skills */}
          <div className="space-y-12 lg:max-w-xl lg:ml-auto">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/5 relative overflow-hidden group">
              {/* Background Icon Decor */}
              <div className="absolute -top-20 -right-20 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700 pointer-events-none">
                <SiReact size={300} className="text-green-500 rotate-12" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-4">
                  <div className="size-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                  Professional Skills
                </h3>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {professionalSkills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-widest hover:border-green-500/40 hover:text-green-500 transition-all cursor-default shadow-sm"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 p-5 rounded-2xl bg-gradient-to-br from-green-500/[0.08] to-transparent border border-green-500/20 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 px-2 py-0.5 rounded bg-green-500 text-[8px] font-mono font-black text-black uppercase shrink-0">Goal</div>
                    <p className="text-[12px] text-slate-300 font-sans leading-relaxed italic">
                      "Dedicated to building high-performance applications through clean code, agile methodologies, and effective team leadership."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Databases & Tools side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-white/5 relative z-10">
          {/* Databases list */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="h-px w-8 bg-green-500/30 group-hover:w-12 transition-all" />
              <p className="text-[11px] font-mono text-white/90 uppercase tracking-[0.3em] font-black">Databases & Storage</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {databaseSkills.map((db, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ y: -3, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 transition-all group flex flex-col items-center justify-center gap-3 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <db.icon className="text-xl text-slate-400 group-hover:text-green-500 transition-colors relative z-10" />
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-white transition-colors relative z-10 uppercase tracking-wider font-bold">{db.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools list */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="h-px w-8 bg-green-500/30 group-hover:w-12 transition-all" />
              <p className="text-[11px] font-mono text-white/90 uppercase tracking-[0.3em] font-black">Workflow Tools</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {tools.map((tool, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.05)" }}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 transition-all group flex flex-col items-center justify-center gap-2 text-center relative overflow-hidden"
                >
                  <tool.icon className="text-lg text-slate-500 group-hover:text-green-500 transition-colors relative z-10" />
                  <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-300 transition-colors relative z-10 font-bold">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
