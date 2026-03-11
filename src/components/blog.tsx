"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export function Blog() {
  return (
    <section id="blog" className="py-24 relative overflow-x-hidden bg-[#000000] min-h-screen flex items-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[100px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[100px] rounded-full translate-x-1/2" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          eyebrow="Insights"
          title="Sharing knowledge."
          description="Sharing experiences and thoughts on software engineering."
        />

        {blogPosts.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-white/5 bg-white/[0.02] p-12 text-center backdrop-blur-sm">
            <div className="size-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mx-auto mb-6 border border-green-500/20">
              <Calendar size={32} />
            </div>
            <p className="text-slate-400 font-sans mb-6">No posts yet. New articles will appear here soon.</p>
            <Link href="/" className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-green-600 text-black text-[11px] font-bold font-mono tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              Refresh Feed
            </Link>
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {blogPosts.map((article, idx) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block h-full group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative h-full p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 group-hover:border-green-500/30 group-hover:bg-white/[0.06] transition-all overflow-hidden"
              >
                {/* Card Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono text-slate-400 px-3 py-1 bg-white/[0.05] border border-white/5 rounded-full uppercase tracking-widest font-black group-hover:text-green-500 group-hover:border-green-500/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4 leading-tight group-hover:text-green-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-[13px] text-slate-400 mb-8 line-clamp-3 font-sans leading-relaxed italic border-l-2 border-green-500/20 pl-4">
                    {article.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] font-black">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-green-500/50" /> {article.date}
                      </span>
                    </div>
                    <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-black group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
