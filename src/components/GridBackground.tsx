"use client";

import { motion } from "framer-motion";

export function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-[#000000] overflow-hidden">
      {/* Dynamic Glow Points - Cursor Style (Subtle Green) */}
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] z-[2] size-[600px] bg-green-500/10 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] z-[1] size-[500px] bg-green-600/5 rounded-full blur-[120px]" 
      />

      {/* Primary Grid */}
      <div className="absolute inset-0 z-[4] bg-grid opacity-15" />
      
      {/* Radial Gradient Overlay for depth */}
      <div className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,1)_100%)]" />

      {/* Floating Light Rays */}
      <div className="absolute inset-0 z-[4] bg-[linear-gradient(to_right,rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:120px_120px]" />
    </div>
  );
}
