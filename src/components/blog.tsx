"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export function Blog() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Insights"
          title="Sharing knowledge."
          description="Sharing experiences and thoughts on software engineering."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-16">
          {blogPosts.map((article, idx) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block h-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group h-full p-4 sm:p-5 glass rounded-2xl hover:border-green-500/20 transition-all"
              >
                <div className="flex gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-slate-500 px-2 py-0.5 border border-white/5 rounded-full uppercase tracking-widest font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-3 group-hover:text-green-500 transition-colors">
                  {article.title}
                </h3>

                <p className="text-[12px] text-slate-400 mb-5 line-clamp-2 font-sans leading-relaxed">
                  {article.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-[10px] text-slate-600 font-mono uppercase tracking-widest font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>
                  <span className="text-green-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
