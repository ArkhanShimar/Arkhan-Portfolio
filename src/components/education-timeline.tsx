"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

export function EducationTimeline({ education }: { education: TimelineItem[] }) {
  return (
    <div className="space-y-6">
      {education?.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative pl-6 border-l border-white/10 group pb-4"
        >
          {/* Indicator */}
          <div className="absolute -left-[4.5px] top-1.5 size-2 rounded-full bg-slate-800 border border-white/20 group-hover:bg-green-500 group-hover:border-green-400 transition-colors" />
          
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest font-semibold">{item.year}</span>
            <h4 className="text-sm font-bold text-white group-hover:text-green-500 transition-colors">{item.title}</h4>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{item.subtitle}</p>
            <p className="text-[11px] text-slate-600 font-sans leading-relaxed pt-1 line-clamp-2 italic">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
