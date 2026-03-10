"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

const articles = [
  {
    title: "Mastering Next.js 15 Server Components",
    description: "A deep dive into the latest features of Next.js and performance optimization.",
    date: "Mar 10, 2024",
    readTime: "8 min",
    tags: ["Next.js", "React"],
  },
  {
    title: "Building Scalable APIs with Node.js",
    description: "Best practices for designing and implementing RESTful APIs for high traffic.",
    date: "Feb 25, 2024",
    readTime: "12 min",
    tags: ["Node.js", "API"],
  },
  {
    title: "The Future of Mobile Development",
    description: "Exploring cross-platform mobile development in 2024 and beyond.",
    date: "Jan 15, 2024",
    readTime: "6 min",
    tags: ["Mobile", "Flutter"],
  },
];

export function Blog() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Insights"
          title="Sharing knowledge."
          description="Sharing experiences and thoughts on software engineering."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {articles.map((article, idx) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 glass rounded-2xl hover:border-green-500/20 transition-all"
            >
              <div className="flex gap-2 mb-4">
                {article.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-mono text-slate-500 px-2 py-0.5 border border-white/5 rounded-full uppercase tracking-widest font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-base font-bold text-white mb-3 group-hover:text-green-500 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-[12px] text-slate-400 mb-6 line-clamp-2 font-sans leading-relaxed">
                {article.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4 text-[10px] text-slate-600 font-mono uppercase tracking-widest font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} /> {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>
                <a href="#" className="text-green-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
