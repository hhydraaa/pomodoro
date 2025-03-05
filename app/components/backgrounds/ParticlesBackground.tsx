'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePomodoro } from '../../context/PomodoroContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const { progress, mode } = usePomodoro();
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateParticles();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Generate particles
    function generateParticles() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const count = Math.min(Math.floor(window.innerWidth * window.innerHeight / 10000), 100);
      particles.current = [];

      // Color based on current timer mode
      let baseColor: string;
      if (mode === 'focus') {
        baseColor = theme === 'dark' ? '#FF5A5A' : '#FF0000';
      } else if (mode === 'shortBreak') {
        baseColor = theme === 'dark' ? '#5AFF5A' : '#00FF00';
      } else {
        baseColor = theme === 'dark' ? '#5A5AFF' : '#0000FF';
      }

      for (let i = 0; i < count; i++) {
        // Create slight variations of the base color
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);
        
        const variation = 30; // Color variation range
        const newR = Math.min(255, Math.max(0, r + (Math.random() * variation * 2 - variation)));
        const newG = Math.min(255, Math.max(0, g + (Math.random() * variation * 2 - variation)));
        const newB = Math.min(255, Math.max(0, b + (Math.random() * variation * 2 - variation)));
        
        const color = `rgb(${Math.floor(newR)}, ${Math.floor(newG)}, ${Math.floor(newB)})`;

        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color,
        });
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background with opacity based on timer progress
      const bgOpacity = 0.05 + progress * 0.15; // 0.05 to 0.2
      ctx.fillStyle = theme === 'dark' 
        ? `rgba(0, 0, 0, ${bgOpacity})` 
        : `rgba(255, 255, 255, ${bgOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.current.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Particles respond slightly to mouse
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 500;
          particle.speedX += Math.cos(angle) * force;
          particle.speedY += Math.sin(angle) * force;
          
          // Limit speed
          const maxSpeed = 3;
          const currentSpeed = Math.sqrt(particle.speedX ** 2 + particle.speedY ** 2);
          if (currentSpeed > maxSpeed) {
            particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
            particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
          }
        }
        
        // Add slight friction
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Boundary checks
        if (particle.x < 0 || particle.x > canvas!.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas!.height) particle.speedY *= -1;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    }

    generateParticles();
    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme, mode, progress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default ParticlesBackground; 