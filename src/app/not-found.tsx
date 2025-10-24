"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[rgba(3,7,18,1)] px-6 text-center text-slate-200">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.12),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">404</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Page not found</h1>
        <p className="text-base text-[var(--muted)] sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back home.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-cyan-400/20"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
