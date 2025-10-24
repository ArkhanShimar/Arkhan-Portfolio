"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { SiGithub, SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si";
import { siteConfig } from "@/config/site";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks for reaching out! I will get back to you shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <section id="contact" className="relative border-t border-white/5 bg-[rgba(3,7,18,0.3)] py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 text-center lg:flex-row lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex-1 space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contact</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Let&apos;s collaborate on something impactful
          </h2>
          <p className="text-base text-[var(--muted)] sm:text-lg">
            Share a bit about your project or the opportunity you have in mind. I&apos;m currently open to full-time internships focused on building user-centric products.
          </p>
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="group flex flex-col items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 text-center transition hover:border-cyan-400/30 sm:flex-row sm:text-left">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
                  <Mail className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">Email me at</p>
                  <Link 
                    href={`mailto:${siteConfig.email}`} 
                    className="text-cyan-300 transition hover:text-cyan-200"
                  >
                    {siteConfig.email}
                  </Link>
                </div>
              </div>
              
              <div className="group flex flex-col items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 text-center transition hover:border-emerald-400/30 sm:flex-row sm:text-left">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
                  <MessageCircle className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">Chat on WhatsApp</p>
                  <Link 
                    href={siteConfig.whatsapp} 
                    target="_blank"
                    className="text-emerald-300 transition hover:text-emerald-200"
                  >
                    {siteConfig.phone}
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="mb-3 text-sm font-medium text-slate-300">Connect with me</p>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                <Link
                  href={siteConfig.socials.github}
                  target="_blank"
                  className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-slate-100/50 hover:bg-slate-100/5"
                >
                  <SiGithub className="size-5 transition group-hover:scale-110" />
                </Link>
                <Link
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-400 transition hover:border-sky-400/50 hover:bg-sky-400/5"
                >
                  <SiLinkedin className="size-5 transition group-hover:scale-110" />
                </Link>
                <Link
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pink-400 transition hover:border-pink-400/50 hover:bg-pink-400/5"
                >
                  <SiInstagram className="size-5 transition group-hover:scale-110" />
                </Link>
                <Link
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-blue-400 transition hover:border-blue-400/50 hover:bg-blue-400/5"
                >
                  <SiFacebook className="size-5 transition group-hover:scale-110" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
          className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur"
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status !== "idle" && message ? (
              <p
                className={`text-sm ${status === "error" ? "text-red-400" : "text-cyan-200"}`}
              >
                {message}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
