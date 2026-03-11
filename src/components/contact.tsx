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
    <section className="py-24 relative overflow-hidden bg-[#000000] min-h-screen flex items-center">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-stretch">
            
            {/* Left Column: Command Center */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6 sm:gap-8"
            >
              <div className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex flex-col justify-between h-full relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 rotate-12 hidden md:block">
                  <Globe size={300} className="text-green-500" />
                </div>

                <div className="space-y-6 sm:space-y-8 relative z-10">
                  <SectionHeading
                    eyebrow="Communications"
                    title="Get in touch."
                  />
                  <p className="text-[11px] sm:text-[13px] text-slate-400 font-sans leading-relaxed italic border-l-2 border-green-500/30 pl-4">
                    Establishing secure uplink for project collaboration, technical inquiries, and potential partnerships.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 relative z-10 mt-10 sm:mt-12">
                  {[
                    { icon: Mail, label: "Encrypted Mail", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                    { icon: MessageCircle, label: "Direct Message", value: "WhatsApp / Telegram", href: siteConfig.whatsapp },
                    { icon: Globe, label: "HQ Location", value: "Mawanella, Sri Lanka" },
                  ].map((item, i) => (
                    <motion.a 
                      key={i} 
                      href={item.href || "#"} 
                      whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      className="group/item flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-500/30 transition-all shadow-sm"
                    >
                      <div className="size-9 sm:size-10 rounded-lg sm:rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 group-hover/item:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all">
                        <item.icon size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">{item.label}</span>
                        <span className="text-[12px] sm:text-[13px] font-medium text-slate-300 group-hover/item:text-white transition-colors truncate max-w-[180px] sm:max-w-none">{item.value}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="pt-6 sm:pt-8 border-t border-white/5 mt-8 sm:mt-10 relative z-10">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-600 uppercase tracking-widest font-bold">Social_Uplinks</span>
                    <div className="flex gap-3 sm:gap-4">
                      {[
                        { icon: SiGithub, link: "https://github.com/ArkhanShimar" },
                        { icon: SiLinkedin, link: "https://www.linkedin.com/in/arkhan-shimar-77b3072ab/" },
                        { icon: SiFacebook, link: "https://www.facebook.com/arkhan.smr.9/" },
                        { icon: SiInstagram, link: "https://www.instagram.com/arkhvn__/" },
                      ].map((social, i) => (
                        <motion.a 
                          key={i} 
                          href={social.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -3, color: "#22c55e" }}
                          className="text-slate-500 transition-all"
                        >
                          <social.icon size={18} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Transmission Form */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative flex h-full"
            >
              <div className="bg-white/[0.02] border border-white/5 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] relative z-10 w-full flex flex-col justify-center backdrop-blur-sm group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] sm:rounded-[2.5rem]" />
                
                <div className="mb-8 sm:mb-10 space-y-2 sm:space-y-3 relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="size-1.5 sm:size-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                    <span className="text-[10px] sm:text-[12px] font-mono text-green-500 uppercase tracking-[0.4em] font-black">Initialize Transmission</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Send a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-widest font-bold ml-1">Identity_Identifier</p>
                      <input
                        name="name"
                        required
                        placeholder="NAME // FIRM"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-[11px] sm:text-xs font-mono text-white focus:border-green-500/40 focus:bg-white/[0.06] focus:outline-none transition-all placeholder:text-slate-700"
                      />
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-widest font-bold ml-1">Return_Address</p>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="USER@DOMAIN.COM"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-[11px] sm:text-xs font-mono text-white focus:border-green-500/40 focus:bg-white/[0.06] focus:outline-none transition-all placeholder:text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase tracking-widest font-bold ml-1">Payload_Content</p>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="ENTER MESSAGE DATA..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-[11px] sm:text-xs font-mono text-white focus:border-green-500/40 focus:bg-white/[0.06] focus:outline-none transition-all placeholder:text-slate-700 resize-none"
                    />
                  </div>

                  <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-green-600 text-black text-[11px] sm:text-[12px] font-black font-mono tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 sm:gap-4 disabled:opacity-50 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10 flex items-center gap-3 sm:gap-4">
                        {status === "loading" ? "SENDING..." : "CONTACT_ME"}
                        <Send size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </span>
                    </motion.button>
                    
                    <div className="flex flex-col gap-1 text-[9px] sm:text-[10px] font-mono text-slate-600 uppercase font-black text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="size-1 bg-green-500/50 rounded-full" />
                        <span>Protocol: HTTPS/TLS 1.3</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="size-1 bg-green-500/50 rounded-full" />
                        <span>Endpoint: SECURE_WSS</span>
                      </div>
                    </div>
                  </div>

                  {message && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl text-center text-[11px] font-mono font-bold border ${
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
