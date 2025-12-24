import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SparkleProps {
  x: number;
  y: number;
  color?: string;
  onComplete?: () => void;
}

const Sparkle: React.FC<SparkleProps> = ({ x, y, color = '#FFD700', onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = Array.from({ length: 8 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full';
      particle.style.background = color;
      particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
      particle.style.left = '50%';
      particle.style.top = '50%';
      containerRef.current?.appendChild(particle);
      return particle;
    });

    const angles = particles.map((_, i) => (i / particles.length) * Math.PI * 2);

    gsap.to(particles, {
      duration: 0.8,
      x: (i) => Math.cos(angles[i]) * 40,
      y: (i) => Math.sin(angles[i]) * 40,
      scale: 0,
      opacity: 0,
      ease: 'power4.out',
      stagger: 0.02,
      onComplete: () => {
        particles.forEach(p => p.remove());
        onComplete?.();
      }
    });

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [color, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
    />
  );
};

// Sparkle manager for creating sparkles
export const createSparkle = (x: number, y: number, color?: string) => {
  const container = document.createElement('div');
  container.className = 'fixed inset-0 pointer-events-none z-50';
  document.body.appendChild(container);

  const particles = Array.from({ length: 12 }, () => {
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full';
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color || '#FFD700';
    particle.style.boxShadow = `0 0 ${size * 2}px ${color || '#FFD700'}`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    container.appendChild(particle);
    return particle;
  });

  const angles = particles.map(() => Math.random() * Math.PI * 2);
  const distances = particles.map(() => Math.random() * 60 + 20);

  gsap.to(particles, {
    duration: 0.8,
    x: (i) => Math.cos(angles[i]) * distances[i],
    y: (i) => Math.sin(angles[i]) * distances[i],
    scale: 0,
    opacity: 0,
    ease: 'power4.out',
    stagger: 0.02,
    onComplete: () => container.remove()
  });
};

export default Sparkle;
