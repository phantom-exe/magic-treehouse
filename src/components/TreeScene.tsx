import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ChristmasTree from './ChristmasTree';
import DecorationPanel from './DecorationPanel';
import DecorationItem, { Decoration } from './DecorationItem';
import MagicMeter from './MagicMeter';
import { createSparkle } from './Sparkle';

interface PlacedDecoration extends Decoration {
  placedId: string;
}

const TreeScene: React.FC = () => {
  const [placedDecorations, setPlacedDecorations] = useState<PlacedDecoration[]>([]);
  const [draggedDecoration, setDraggedDecoration] = useState<Decoration | null>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const warmth = Math.min(100, placedDecorations.length * 8);

  useEffect(() => {
    // Animate scene in
    if (sceneRef.current) {
      gsap.fromTo(sceneRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, []);

  const handleDragStart = (e: React.DragEvent, decoration: Decoration) => {
    setDraggedDecoration(decoration);
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a custom drag image
    const dragImg = document.createElement('div');
    dragImg.style.opacity = '0';
    document.body.appendChild(dragImg);
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    setTimeout(() => dragImg.remove(), 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedDecoration || !treeContainerRef.current) return;

    const rect = treeContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Create new placed decoration
    const newDecoration: PlacedDecoration = {
      ...draggedDecoration,
      id: `${draggedDecoration.id}-${Date.now()}`,
      placedId: `placed-${Date.now()}`,
      x,
      y,
      rotation: Math.random() * 20 - 10,
    };

    setPlacedDecorations(prev => [...prev, newDecoration]);

    // Create sparkle effect
    createSparkle(e.clientX, e.clientY, draggedDecoration.color);

    // Animate the new decoration
    setTimeout(() => {
      const element = document.getElementById(newDecoration.placedId);
      if (element) {
        gsap.fromTo(element,
          { scale: 0, rotation: -180 },
          { 
            scale: 1, 
            rotation: newDecoration.rotation,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
          }
        );
      }
    }, 10);

    setDraggedDecoration(null);
  };

  const handleDecorationClick = (placedId: string) => {
    // Remove decoration on click
    setPlacedDecorations(prev => prev.filter(d => d.placedId !== placedId));
  };

  return (
    <div ref={sceneRef} className="flex-1 flex items-start justify-center gap-6 p-6 relative">
      {/* Decoration Panel - Left */}
      <div className="flex-shrink-0">
        <DecorationPanel onDragStart={handleDragStart} />
      </div>

      {/* Tree Container - Center */}
      <div 
        ref={treeContainerRef}
        className="relative flex-shrink-0"
        style={{ width: '400px', height: '500px' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <ChristmasTree warmth={warmth} />
        
        {/* Placed decorations */}
        {placedDecorations.map((decoration) => (
          <div
            key={decoration.placedId}
            id={decoration.placedId}
            className="absolute cursor-pointer hover:scale-110 transition-transform"
            style={{
              left: `${decoration.x}%`,
              top: `${decoration.y}%`,
              transform: `translate(-50%, -50%) rotate(${decoration.rotation}deg)`,
              width: decoration.type === 'gift' ? '50px' : '35px',
              height: decoration.type === 'gift' ? '50px' : '40px',
            }}
            onClick={() => handleDecorationClick(decoration.placedId)}
          >
            <DecorationItem 
              decoration={decoration} 
              isDraggable={false}
            />
          </div>
        ))}

        {/* Drop indicator */}
        {draggedDecoration && (
          <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-xl 
                          pointer-events-none animate-pulse" />
        )}
      </div>

      {/* Magic Meter - Right */}
      <div className="flex-shrink-0">
        <MagicMeter warmth={warmth} />
      </div>
    </div>
  );
};

export default TreeScene;
