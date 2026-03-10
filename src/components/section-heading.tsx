"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className="space-y-4 text-center lg:text-left"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-green-500 font-semibold">
        {eyebrow}
      </p>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl mx-auto lg:mx-0 text-slate-400 text-lg leading-relaxed font-sans">
          {description}
        </p>
      )}
    </motion.div>
  );
}
