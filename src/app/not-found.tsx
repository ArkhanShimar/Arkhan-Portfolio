"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#000000] px-6 text-center text-slate-200">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.1),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-xl space-y-6 rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-xl"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-green-500 font-bold">404</p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl tracking-tight">Page not found</h1>
        <p className="text-base text-slate-400 sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-8 py-3 text-sm font-bold text-green-500 transition hover:-translate-y-1 hover:bg-green-500/20"
        >
          <ArrowLeft className="size-4" />
          BACK TO ORIGIN
        </Link>
      </motion.div>
    </div>
  );
}
