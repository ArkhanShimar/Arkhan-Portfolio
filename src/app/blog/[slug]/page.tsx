import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamic = "force-static";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const renderInline = (text: string) => {
    const codeTokens = [
      "CRUD",
      "PIN",
      "UI",
      "API",
      "DB",
      "JSON",
      "REST",
      "AI",
      "prompt",
      "code",
      "debug",
      "portfolio",
      "projects",
      "project",
      "logic",
      "build",
    ];

    const pattern = new RegExp(`\\b(?:${codeTokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "gi");

    const byTicks = text.split("`");
    const out: Array<{ t: string; code: boolean }> = [];

    byTicks.forEach((chunk, i) => {
      if (i % 2 === 1) {
        out.push({ t: chunk, code: true });
        return;
      }

      let lastIndex = 0;
      for (const match of chunk.matchAll(pattern)) {
        const start = match.index ?? 0;
        const token = match[0];
        if (start > lastIndex) out.push({ t: chunk.slice(lastIndex, start), code: false });
        out.push({ t: token, code: true });
        lastIndex = start + token.length;
      }
      if (lastIndex < chunk.length) out.push({ t: chunk.slice(lastIndex), code: false });
    });

    return out.map((p, i) =>
      p.code ? (
        <span
          key={`${p.t}-${i}`}
          className="rounded-md border border-green-500/20 bg-green-500/10 px-1.5 py-0.5 font-mono text-green-500"
        >
          {p.t}
        </span>
      ) : (
        <span key={`${p.t}-${i}`}>{p.t}</span>
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),transparent_55%)]" />
      <div className="pointer-events-none fixed -z-10 left-[-10%] top-[10%] h-56 w-56 rounded-full bg-green-500/10 blur-[38px] sm:h-96 sm:w-96 sm:blur-[80px] blog-blob" />
      <div className="pointer-events-none fixed -z-10 right-[-10%] bottom-[10%] h-48 w-48 rounded-full bg-green-500/5 blur-[34px] sm:h-80 sm:w-80 sm:blur-[72px] blog-blob-2" />
      <div className="pointer-events-none fixed inset-0 -z-10 hidden sm:block">
        <div className="blog-scanline" />
      </div>

      <div className="container mx-auto px-6 py-14 sm:py-16">
        <article className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-slate-500 hover:text-green-500 transition-colors"
            >
              <span className="text-green-500 opacity-60">&lt;</span>
              Back to blog
            </Link>
          </div>

          <header className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.10),transparent_45%)]" />
            <div className="relative space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="!text-xl sm:!text-2xl md:!text-3xl font-bold tracking-tight leading-tight">
                {post.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-widest text-slate-600">
                <span>{post.date}</span>
                <span className="text-slate-700">•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          <div className="mt-7 rounded-3xl border border-white/10 bg-black/20 p-5 sm:p-8">
            <div className="space-y-6 text-slate-200">
              {post.content.map((block, index) => {
                if (block.type === "h2") {
                  return (
                    <div key={index} className="pt-2">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="size-1.5 rounded-full bg-green-500/80" />
                      <h2 className="!text-xl sm:!text-2xl font-bold text-green-500 tracking-tight font-mono">
                          {block.text}
                        </h2>
                      </div>
                    </div>
                  );
                }

                if (block.type === "ul") {
                  return (
                    <ul
                      key={index}
                      className="list-disc pl-5 space-y-2 text-[13px] sm:text-sm text-slate-300 leading-relaxed"
                    >
                      {block.items.map((item) => {
                        const [left, ...rest] = item.split(":");
                        const right = rest.join(":").trim();
                        return (
                          <li key={item}>
                            {right ? (
                              <>
                                <span className="font-mono text-slate-200">{left}</span>
                                <span className="text-slate-500">:</span>{" "}
                                <span>{renderInline(right)}</span>
                              </>
                            ) : (
                              <>{renderInline(item)}</>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                return (
                  <p key={index} className="text-[13px] sm:text-sm leading-relaxed text-slate-300">
                    {renderInline(block.text)}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#blog"
              className="rounded-full border border-white/10 bg-white/[0.02] px-5 py-2 text-[11px] font-mono uppercase tracking-widest text-slate-300 hover:border-green-500/30 hover:text-green-500 transition-colors"
            >
              Back to blog
            </Link>
            <span />
          </div>
        </article>
      </div>
    </main>
  );
}
