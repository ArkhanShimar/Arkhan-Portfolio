"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Globe } from "lucide-react";
import { SiGithub, SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "./section-heading";

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
      setMessage("Transmission successful. Awaiting connection...");
    } catch {
      setStatus("error");
      setMessage("Critical failure. System offline.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-stretch">
            
            {/* Left Column: Command Center */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="p-8 rounded-3xl glass flex flex-col justify-between h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <Globe size={180} className="text-green-500" />
                </div>

                <div className="space-y-6 relative z-10">
                  <SectionHeading
                    eyebrow="Communications"
                    title="Get in touch."
                  />
                  <p className="text-[11px] text-slate-500 font-mono leading-relaxed uppercase tracking-wider">
                    Establishing secure uplink for project collaboration and technical inquiries.
                  </p>
                </div>

                <div className="space-y-4 relative z-10 mt-12">
                  {[
                    { icon: Mail, label: "Encrypted Mail", value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: "text-green-500" },
                    { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phone, href: siteConfig.whatsapp, color: "text-green-500" },
                    { icon: Globe, label: "HQ Location", value: "Mawanella, Sri Lanka", color: "text-green-500" },
                  ].map((item, i) => (
                    <a 
                      key={i} 
                      href={item.href || "#"} 
                      className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5"
                    >
                      <div className={`size-8 rounded-lg bg-white/5 flex items-center justify-center ${item.color} border border-white/5 group-hover/item:border-white/10 transition-all`}>
                        <item.icon size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">{item.label}</span>
                        <span className="text-[10px] font-medium text-slate-300 group-hover/item:text-white transition-colors">{item.value}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5 mt-8 relative z-10">
                  <div className="flex gap-3">
                    {[
                      { icon: SiGithub, link: "https://github.com/ArkhanShimar" },
                      { icon: SiLinkedin, link: "https://linkedin.com/in/arkhanshimar" },
                      { icon: SiFacebook, link: "#" },
                      { icon: SiInstagram, link: "#" },
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-9 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-green-500 transition-all hover:-translate-y-1 hover:border-green-500/30 shadow-sm"
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Transmission Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex"
            >
              <div className="glass p-10 rounded-3xl relative z-10 w-full flex flex-col justify-center">
                <div className="mb-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-green-500 uppercase tracking-[0.3em] font-semibold">Initialize Transmission</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Contact Me</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest ml-1 font-medium">Identity_Identifier</p>
                      <input
                        name="name"
                        required
                        placeholder="NAME // FIRM"
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-[11px] font-mono text-white focus:border-green-500/30 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-slate-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest ml-1 font-medium">Return_Address</p>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="USER@DOMAIN.COM"
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-[11px] font-mono text-white focus:border-green-500/30 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest ml-1 font-medium">Payload_Content</p>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="ENTER MESSAGE DATA..."
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-[11px] font-mono text-white focus:border-green-500/30 focus:bg-white/[0.04] focus:outline-none transition-all placeholder:text-slate-800 resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center gap-6">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex-1 py-4 bg-white text-black text-[10px] font-bold font-mono tracking-[0.3em] rounded-xl hover:bg-green-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg"
                    >
                      {status === "loading" ? "SENDING..." : "CONTACT_ME"}
                      <Send size={14} />
                    </button>
                    
                    <div className="hidden md:flex flex-col gap-1 text-[8px] font-mono text-slate-700 uppercase font-bold">
                      <span>Protocol: HTTPS/WSS</span>
                      <span>Security: TLS 1.3</span>
                    </div>
                  </div>

                  {message && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg text-center text-[9px] font-mono border ${
                        status === "success" ? "bg-green-500/5 border-green-500/20 text-green-500" : "bg-red-500/5 border-red-500/20 text-red-400"
                      }`}
                    >
                      {message}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
