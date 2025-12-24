import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ChristmasTree: React.FC<{ warmth?: number }> = ({ warmth = 0 }) => {
  const treeRef = useRef<SVGSVGElement>(null);
  const lightsRef = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    // Idle sway animation
    if (treeRef.current) {
      gsap.to(treeRef.current, {
        rotation: 0.5,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'bottom center'
      });
    }

    // Twinkling lights
    lightsRef.current.forEach((light, i) => {
      if (light) {
        gsap.to(light, {
          opacity: 0.4 + Math.random() * 0.4,
          scale: 0.8 + Math.random() * 0.4,
          duration: 1 + Math.random() * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.1,
          transformOrigin: 'center center'
        });
      }
    });
  }, []);

  // Calculate glow intensity based on warmth
  const glowIntensity = Math.min(warmth / 100, 1);
  const glowFilter = `drop-shadow(0 0 ${20 + glowIntensity * 40}px rgba(255, 200, 100, ${0.3 + glowIntensity * 0.4}))`;

  const lightPositions = [
    // Layer 1 (top)
    { cx: 200, cy: 120, color: '#FFD700' },
    { cx: 180, cy: 140, color: '#FF6B6B' },
    { cx: 220, cy: 140, color: '#4ECDC4' },
    // Layer 2
    { cx: 160, cy: 180, color: '#FF6B6B' },
    { cx: 200, cy: 170, color: '#FFD700' },
    { cx: 240, cy: 180, color: '#4ECDC4' },
    // Layer 3
    { cx: 140, cy: 230, color: '#4ECDC4' },
    { cx: 175, cy: 220, color: '#FFD700' },
    { cx: 210, cy: 225, color: '#FF6B6B' },
    { cx: 245, cy: 235, color: '#FFD700' },
    { cx: 260, cy: 225, color: '#4ECDC4' },
    // Layer 4
    { cx: 120, cy: 290, color: '#FF6B6B' },
    { cx: 155, cy: 280, color: '#4ECDC4' },
    { cx: 190, cy: 285, color: '#FFD700' },
    { cx: 225, cy: 280, color: '#FF6B6B' },
    { cx: 260, cy: 285, color: '#4ECDC4' },
    { cx: 280, cy: 295, color: '#FFD700' },
    // Layer 5 (bottom)
    { cx: 100, cy: 350, color: '#FFD700' },
    { cx: 135, cy: 340, color: '#FF6B6B' },
    { cx: 170, cy: 345, color: '#4ECDC4' },
    { cx: 200, cy: 355, color: '#FFD700' },
    { cx: 230, cy: 345, color: '#FF6B6B' },
    { cx: 265, cy: 340, color: '#4ECDC4' },
    { cx: 300, cy: 350, color: '#FFD700' },
  ];

  return (
    <div className="relative">
      <svg
        ref={treeRef}
        viewBox="0 0 400 500"
        className="w-full h-full max-h-[70vh]"
        style={{ filter: glowFilter }}
      >
        {/* Tree trunk */}
        <rect
          x="175"
          y="380"
          width="50"
          height="80"
          fill="url(#trunkGradient)"
          rx="5"
        />

        {/* Tree pot */}
        <path
          d="M150 460 L160 500 L240 500 L250 460 Z"
          fill="url(#potGradient)"
        />
        <ellipse cx="200" cy="460" rx="50" ry="8" fill="#8B4513" />

        {/* Tree layers - bottom to top */}
        {/* Layer 5 (bottom) */}
        <path
          d="M80 380 L200 280 L320 380 Z"
          fill="url(#treeGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Layer 4 */}
        <path
          d="M100 310 L200 210 L300 310 Z"
          fill="url(#treeGradient2)"
          className="drop-shadow-lg"
        />
        
        {/* Layer 3 */}
        <path
          d="M120 250 L200 160 L280 250 Z"
          fill="url(#treeGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Layer 2 */}
        <path
          d="M145 200 L200 120 L255 200 Z"
          fill="url(#treeGradient2)"
          className="drop-shadow-lg"
        />
        
        {/* Layer 1 (top) */}
        <path
          d="M165 150 L200 80 L235 150 Z"
          fill="url(#treeGradient)"
          className="drop-shadow-lg"
        />

        {/* Star topper */}
        <g transform="translate(200, 50)">
          <polygon
            points="0,-30 8,-10 30,-10 12,5 20,28 0,15 -20,28 -12,5 -30,-10 -8,-10"
            fill="url(#starGradient)"
            className="animate-pulse"
            style={{ 
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
              transformOrigin: 'center'
            }}
          />
        </g>

        {/* Fairy lights */}
        {lightPositions.map((light, i) => (
          <circle
            key={i}
            ref={el => lightsRef.current[i] = el}
            cx={light.cx}
            cy={light.cy}
            r="6"
            fill={light.color}
            style={{
              filter: `drop-shadow(0 0 8px ${light.color})`,
            }}
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(145, 60%, 32%)" />
            <stop offset="100%" stopColor="hsl(145, 55%, 22%)" />
          </linearGradient>
          <linearGradient id="treeGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(145, 58%, 28%)" />
            <stop offset="100%" stopColor="hsl(145, 52%, 20%)" />
          </linearGradient>
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5D3A1A" />
            <stop offset="50%" stopColor="#8B5A2B" />
            <stop offset="100%" stopColor="#5D3A1A" />
          </linearGradient>
          <linearGradient id="potGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A0522D" />
            <stop offset="100%" stopColor="#6B3410" />
          </linearGradient>
          <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFACD" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ChristmasTree;
