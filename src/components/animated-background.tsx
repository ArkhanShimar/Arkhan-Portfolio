"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Binary, 
  Braces,
  Hash
} from "lucide-react";
import { useEffect, useState } from "react";

const icons = [
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Binary, 
  Braces,
  Hash
];

export function AnimatedBackground() {
  const [elements, setElements] = useState<{ id: number; Icon: any; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 10 : 20; // Fewer icons on mobile
    
    const newElements = Array.from({ length: count }).map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 95 + 2.5, 
      y: Math.random() * 95 + 2.5, 
      size: isMobile ? Math.random() * (32 - 16) + 16 : Math.random() * (48 - 24) + 24, 
      duration: Math.random() * (25 - 15) + 15, 
      delay: Math.random() * 5 
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-green-500/10" // Reduced default opacity for better perf
          initial={{ 
            left: `${el.x}%`, 
            top: `${el.y}%`, 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            y: [0, -30, 0], // Reduced range
            opacity: [0, 0.1, 0],
            rotate: [0, 90, 0] // Reduced rotation
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear" // Linear is cheaper than easeInOut
          }}
          style={{ 
            width: el.size, 
            height: el.size,
            willChange: "transform, opacity" // Performance hint
          }}
        >
          <el.Icon size={el.size} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
}
