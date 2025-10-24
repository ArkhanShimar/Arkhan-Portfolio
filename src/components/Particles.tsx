"use client";

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
  targetX: number;
  targetY: number;
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, radius: 150 });
  const particlesArray = useRef<Particle[]>([]);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const centerMouse = () => {
      mouse.current.x = canvas.width / 2;
      mouse.current.y = canvas.height / 2;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    centerMouse();

    // Create particles
    const init = () => {
      particlesArray.current = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        
        particlesArray.current.push({
          x,
          y,
          size,
          baseX: x,
          baseY: y,
          density: Math.random() * 10 + 5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          angle: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.5,
          targetX: x,
          targetY: y
        });
      }
    };

    // Draw particle with glow effect
    const drawParticle = (particle: Particle) => {
      // Glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, 'rgba(34, 211, 238, 0.8)');
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Particle core
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(100, 220, 255, 0.8)';
      ctx.fill();
    };

    // Connect particles with smoother lines
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.current.length; a++) {
        for (let b = a; b < particlesArray.current.length; b++) {
          const p1 = particlesArray.current[a];
          const p2 = particlesArray.current[b];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) { // Increased connection distance
            const opacity = 1 - (distance / 120);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.6})`; // More visible connections
            ctx.lineWidth = 0.8; // Slightly thicker lines
            
            // Draw a subtle glow around the line
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            
            // Reset shadow
            ctx.shadowBlur = 0;
          }
        }
      }
    };

    // Animate particles
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const timeFactor = time * 0.001; // Convert to seconds

      for (let i = 0; i < particlesArray.current.length; i++) {
        const p = particlesArray.current[i];
        
        // Continuous floating movement - faster and more dynamic
        p.angle += 0.01; // Increased from 0.002
        const speed = 1.5; // Increased movement speed
        p.targetX = p.baseX + Math.cos(timeFactor * speed + i * 0.5) * 30; // Increased amplitude
        p.targetY = p.baseY + Math.sin(timeFactor * speed * 1.3 + i * 0.5) * 30; // Different multiplier for Y to create more interesting patterns
        
        // Smoother and faster movement towards target position
        p.x += (p.targetX - p.x) * 0.1; // Increased from 0.05 for more responsive movement
        p.y += (p.targetY - p.y) * 0.1; // Increased from 0.05
        
        // More responsive mouse interaction
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.current.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.current.radius;
          const force = (maxDistance - distance) / maxDistance;
          // Increased multiplier from 2 to 3 for stronger mouse interaction
          const directionX = forceDirectionX * force * p.density * 3;
          const directionY = forceDirectionY * force * p.density * 3;
          
          p.x -= directionX;
          p.y -= directionY;
          
          // Add some extra movement when near cursor
          p.angle += 0.05;
          p.x += Math.cos(p.angle) * 0.5;
          p.y += Math.sin(p.angle) * 0.5;
        }

        drawParticle(particlesArray.current[i]);
      }

      connectParticles();
      animationId.current = requestAnimationFrame((time) => animate(time));
    };

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    // Initialize and start animation
    init();
    animationId.current = requestAnimationFrame((time) => animate(time));
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
