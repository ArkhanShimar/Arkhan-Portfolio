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
    const newElements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 95 + 2.5, 
      y: Math.random() * 95 + 2.5, 
      size: Math.random() * (48 - 24) + 24, 
      duration: Math.random() * (25 - 15) + 15, // Slightly faster overall
      delay: Math.random() * 5 // Much shorter delay
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-green-500"
          initial={{ 
            left: `${el.x}%`, 
            top: `${el.y}%`, 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            y: [0, -40, 0],
            x: [0, 20, 0],
            opacity: [0, 0.1, 0],
            rotate: [0, 180, 0]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut"
          }}
          style={{ width: el.size, height: el.size }}
        >
          <el.Icon size={el.size} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
}
