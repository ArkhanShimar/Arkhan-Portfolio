import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-green-500 font-semibold">Blog</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Notes from building stuff.</h1>
            <p className="text-slate-400">
              Short posts I write as I learn. Some are messy. That’s the point.
            </p>
          </div>

          <div className="space-y-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 hover:border-green-500/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-base font-bold">{post.title}</h2>
                    <p className="text-sm text-slate-400">{post.description}</p>
                    <div className="pt-1 text-[10px] font-mono uppercase tracking-widest text-slate-600">
                      {post.date} · {post.readTime}
                    </div>
                  </div>
                  <span className="text-green-500 text-sm font-mono">Read</span>
                </div>
              </Link>
            ))}
          </div>

          <div>
            <Link href="/#blog" className="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-green-500">
              Back to portfolio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

