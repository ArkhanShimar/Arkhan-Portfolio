"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function EducationTimeline({ items }: TimelineProps) {
  return (
    <ol className="relative space-y-8 border-l border-white/10 pl-6">
      {items.map((item, index) => (
        <li key={item.title} className="relative">
          <span className="absolute -left-[0.7rem] top-2 inline-flex size-3 rounded-full border border-cyan-300/70 bg-cyan-300/40" />
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-cyan-500/10 backdrop-blur"
          >
            <h4 className="text-lg font-semibold text-white">{item.title}</h4>
            <p className="text-sm text-slate-300">{item.subtitle}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">{item.year}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">{item.description}</p>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
