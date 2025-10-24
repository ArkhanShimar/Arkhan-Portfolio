"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function InitialLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsReady(true);

    if (document.readyState === "complete") {
      handleReady();
      return;
    }

    window.addEventListener("load", handleReady);
    return () => {
      window.removeEventListener("load", handleReady);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isReady ? (
          <motion.div
            key="initial-loader"
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-[#030712]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src="/logo.png"
                alt="Arkhan Shimar logo"
                width={140}
                height={140}
                className="h-20 w-auto object-contain"
                priority
              />
            </motion.div>
            <motion.div className="h-1 w-28 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full w-full bg-cyan-400"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, repeatType: "loop", duration: 1.4, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div
        className={`min-h-screen transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
