"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ToggleSize = "sm" | "md";

const sizeMap: Record<ToggleSize, string> = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
};

export function ThemeToggle({ size = "md" }: { size?: ToggleSize }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <motion.button
      type="button"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-300 shadow-sm backdrop-blur transition-colors hover:border-cyan-400/50 hover:text-cyan-200 dark:border-white/10 dark:bg-black/40 ${sizeMap[size]}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? <Moon className="size-5" /> : <Sun className="size-5" />
      ) : (
        <span className="size-5" />
      )}
    </motion.button>
  );
}
