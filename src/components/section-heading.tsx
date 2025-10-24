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
      className="space-y-3 text-center lg:text-left"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="text-sm uppercase tracking-[0.4em] text-cyan-400/80">
        {eyebrow}
      </p>
      <h2 className="mx-auto max-w-3xl text-3xl font-semibold text-[var(--foreground)] sm:text-4xl lg:mx-0">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto max-w-2xl text-base text-[var(--muted)] sm:text-lg lg:mx-0">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
