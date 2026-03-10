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
  { name: "Next.js", level: 90, icon: SiNextdotjs, color: "text-green-500" },
  { name: "React / Native", level: 95, icon: SiReact, color: "text-green-500" },
  { name: "TypeScript", level: 85, icon: SiTypescript, color: "text-green-500" },
  { name: "Node.js / Express", level: 80, icon: SiNodedotjs, color: "text-green-500" },
  { name: "Java (Android)", level: 85, icon: FaJava, color: "text-green-500" },
  { name: "PHP / .NET", level: 75, icon: SiPhp, color: "text-green-500" },
  { name: "C#", level: 70, icon: TbBrandCSharp, color: "text-green-500" },
  { name: "C++", level: 65, icon: SiCplusplus, color: "text-green-500" },
  { name: "HTML / CSS", level: 90, icon: SiHtml5, color: "text-green-500" },
];

const professionalSkills = [
  { name: "Problem-Solving", value: 95 },
  { name: "Team Collaboration", value: 90 },
  { name: "Communication", value: 85 },
  { name: "Leadership", value: 80 },
  { name: "Time Management", value: 85 },
  { name: "Adaptability", value: 88 },
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
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          
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
                  className="p-4 rounded-xl glass hover:border-green-500/20 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <skill.icon className={`${skill.color} text-xl transition-transform group-hover:scale-110`} />
                    <span className="text-[11px] font-mono text-white font-medium">{skill.name}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Databases list */}
            <div className="pt-2">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 font-semibold">Databases & Storage</p>
              <div className="flex flex-wrap gap-4">
                {databaseSkills.map((db, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors cursor-default">
                    <db.icon size={16} />
                    <span className="text-[10px] font-mono">{db.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools list */}
            <div className="pt-2">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 font-semibold">Workflow Tools</p>
              <div className="flex flex-wrap gap-4">
                {tools.map((tool, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-green-500 transition-colors cursor-default">
                    <tool.icon size={16} />
                    <span className="text-[10px] font-mono">{tool.name}</span>
                  </div>
                ))}
              </div>
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

              <div className="space-y-8">
                {professionalSkills.map((skill, i) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400 uppercase tracking-widest">{skill.name}</span>
                      <span className="text-green-500">{skill.value}%</span>
                    </div>
                    <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1 }}
                        className="absolute inset-y-0 left-0 bg-green-500"
                      />
                    </div>
                  </div>
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
      </div>
    </section>
  );
}
