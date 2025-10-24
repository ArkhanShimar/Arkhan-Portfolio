"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Download, Send } from "lucide-react";
import { SiGithub, SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useEffect, useRef } from "react";
import { Particles } from "./Particles";

const roles = [
  "Software Engineering Undergraduate",
  "Full-Stack Web Developer",
  "Android App Builder",
];

export function Hero() {
  const typed = useTypewriter({ words: roles });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log('Video element found');
      
      // Set up event listeners
      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        console.log('Video dimensions:', video.videoWidth, 'x', video.videoHeight);
        
        // Try to play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Auto-play was prevented:', error);
            // Try again with user interaction
            const handleFirstInteraction = () => {
              video.play().catch(e => console.error('Still cannot play video:', e));
              document.removeEventListener('click', handleFirstInteraction);
              document.removeEventListener('touchstart', handleFirstInteraction);
            };
            document.addEventListener('click', handleFirstInteraction);
            document.addEventListener('touchstart', handleFirstInteraction);
          });
        }
      };
      
      const handleError = () => {
        console.error('Video error:', video.error);
        console.log('Video source was:', video.currentSrc);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      // Log initial state
      console.log('Video source:', video.currentSrc);
      console.log('Video ready state:', video.readyState);
      
      // Cleanup
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <section id="home" className="relative flex min-h-[85vh] items-center overflow-hidden bg-[#030712]">
      {/* Particle Background */}
      <Particles />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030712]/90 via-[#030712]/60 to-[#030712]/90" />
      
      {/* Content Container - Top Layer */}
      <div className="relative z-20 w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 px-6 py-24 text-center lg:flex-row lg:items-center lg:gap-24 lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 space-y-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            Hello, I am
          </p>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <div className="text-lg text-cyan-200 sm:text-xl">
            <span className="font-mono">{typed}</span>
            <span className="animate-pulse">_</span>
          </div>
          <p className="mx-auto max-w-xl text-base text-[var(--muted)] sm:text-lg">
            {siteConfig.tagline} I enjoy crafting reliable, human-centered software that scales from mobile apps to web platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href={siteConfig.resumeUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100 shadow-lg shadow-cyan-500/10 transition hover:-translate-y-1 hover:bg-cyan-400/20"
            >
              <Download className="size-4" />
              Download CV
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-1 hover:border-cyan-400/60 hover:text-cyan-100"
            >
              <ArrowRight className="size-4" />
              View Projects
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-white/20"
            >
              <Send className="size-4" />
              Contact Me
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 lg:justify-start">
            <div className="flex items-center gap-3">
              <Link
                href={siteConfig.socials.github}
                target="_blank"
                className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                <SiGithub className="size-5 transition group-hover:scale-110" />
              </Link>
              <Link
                href={siteConfig.socials.linkedin}
                target="_blank"
                className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                <SiLinkedin className="size-5 transition group-hover:scale-110" />
              </Link>
              <Link
                href={siteConfig.socials.email}
                className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                <Mail className="size-5 transition group-hover:scale-110" />
              </Link>
              <Link
                href={siteConfig.socials.instagram}
                target="_blank"
                className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-pink-500/60 hover:text-pink-400"
              >
                <SiInstagram className="size-5 transition group-hover:scale-110" />
              </Link>
              <Link
                href={siteConfig.socials.facebook}
                target="_blank"
                className="group inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-blue-500/60 hover:text-blue-400"
              >
                <SiFacebook className="size-5 transition group-hover:scale-110" />
              </Link>
            </div>
            <span className="hidden h-6 w-px bg-white/10 lg:block" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
              {siteConfig.location}
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.94, rotate: 6 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
          className="relative flex-1"
        >
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, -2.5, 0],
              y: [0, -10, 0],
            }}
            transition={{
              delay: 0.35,
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="relative mx-auto h-72 w-72 max-w-full rounded-[36px] border border-cyan-400/40 bg-gradient-to-br from-cyan-500/25 via-transparent to-transparent p-4 shadow-[0_25px_60px_-25px_rgba(34,211,238,0.35)] backdrop-blur sm:h-80 sm:w-80"
          >
            <motion.span
              aria-hidden
              className="absolute -inset-6 rounded-[46px] border border-cyan-400/20"
              animate={{ opacity: [0.25, 0.55, 0.25], rotate: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[#020617]/80">
              <Image
                src="/profile.png"
                alt="Portrait of Arkhan Shimar"
                fill
                priority
                sizes="(min-width: 1024px) 20rem, 16rem"
                className="object-contain"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200 shadow-2xl shadow-cyan-500/10 backdrop-blur-lg"
          >
            <span className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-cyan-400" />
              Available for internships
            </span>
          </motion.div>
        </motion.div>
      </div>
      </div>

      <Link
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-white/5 p-3 text-cyan-200 transition hover:bg-cyan-400/20"
      >
        <ChevronDown className="size-5 animate-bounce" />
      </Link>
    </section>
  );
}
