import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/data/blog";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <div className="container mx-auto px-6 py-16">
        <article className="mx-auto max-w-3xl">
          <div className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-green-500 font-semibold">
              {post.tags.join(" / ")}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-slate-400">{post.description}</p>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600">
              {post.date} · {post.readTime}
            </div>
          </div>

          <div className="mt-10 space-y-6 text-slate-200">
            {post.content.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2 key={index} className="pt-4 text-xl font-bold text-white">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "ul") {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-2 text-slate-300">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index} className="text-base leading-relaxed text-slate-300">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
            <Link
              href="/blog"
              className="rounded-full border border-white/10 bg-white/[0.02] px-5 py-2 text-[11px] font-mono uppercase tracking-widest text-slate-300 hover:border-green-500/30 hover:text-green-500 transition-colors"
            >
              Back to blog
            </Link>
            <Link
              href="/#blog"
              className="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-green-500"
            >
              Back to portfolio
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

