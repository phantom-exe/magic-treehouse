import React from 'react';

export interface Decoration {
  id: string;
  type: 'bauble' | 'star' | 'candy' | 'ribbon' | 'gift' | 'light';
  color: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface DecorationItemProps {
  decoration: Decoration;
  onDragStart?: (e: React.DragEvent, decoration: Decoration) => void;
  isDraggable?: boolean;
  className?: string;
}

const DecorationItem: React.FC<DecorationItemProps> = ({ 
  decoration, 
  onDragStart,
  isDraggable = true,
  className = ''
}) => {
  const renderDecoration = () => {
    switch (decoration.type) {
      case 'bauble':
        return (
          <svg viewBox="0 0 40 48" className="w-full h-full">
            {/* Cap */}
            <rect x="15" y="0" width="10" height="6" fill="#C0C0C0" rx="2" />
            <circle cx="20" cy="3" r="2" fill="#808080" />
            {/* Ball */}
            <circle 
              cx="20" 
              cy="28" 
              r="18" 
              fill={decoration.color}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            />
            {/* Shine */}
            <ellipse cx="14" cy="22" rx="5" ry="8" fill="rgba(255,255,255,0.3)" />
          </svg>
        );
      
      case 'star':
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <polygon
              points="20,2 25,15 38,15 27,24 32,38 20,30 8,38 13,24 2,15 15,15"
              fill={decoration.color}
              style={{ filter: `drop-shadow(0 0 8px ${decoration.color})` }}
            />
          </svg>
        );
      
      case 'candy':
        return (
          <svg viewBox="0 0 40 50" className="w-full h-full">
            {/* Candy cane */}
            <path
              d="M30 5 Q35 5 35 12 L35 40 Q35 48 27 48 Q19 48 19 40 L19 25"
              fill="none"
              stroke={decoration.color}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Stripes */}
            <path
              d="M30 5 Q35 5 35 12 L35 40 Q35 48 27 48 Q19 48 19 40 L19 25"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="6 6"
            />
          </svg>
        );
      
      case 'ribbon':
        return (
          <svg viewBox="0 0 50 30" className="w-full h-full">
            <path
              d="M5 15 Q15 5 25 15 Q35 25 45 15"
              fill="none"
              stroke={decoration.color}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="25" cy="15" r="5" fill={decoration.color} />
          </svg>
        );
      
      case 'gift':
        return (
          <svg viewBox="0 0 44 44" className="w-full h-full">
            {/* Box */}
            <rect x="4" y="14" width="36" height="28" fill={decoration.color} rx="3" />
            {/* Lid */}
            <rect x="2" y="8" width="40" height="8" fill={decoration.color} rx="2" 
              style={{ filter: 'brightness(1.1)' }}
            />
            {/* Ribbon vertical */}
            <rect x="19" y="8" width="6" height="34" fill="#FFD700" />
            {/* Ribbon horizontal */}
            <rect x="2" y="10" width="40" height="4" fill="#FFD700" />
            {/* Bow */}
            <circle cx="22" cy="8" r="6" fill="#FFD700" />
            <ellipse cx="14" cy="6" rx="6" ry="4" fill="#FFD700" />
            <ellipse cx="30" cy="6" rx="6" ry="4" fill="#FFD700" />
          </svg>
        );
      
      case 'light':
        return (
          <svg viewBox="0 0 20 30" className="w-full h-full">
            {/* Socket */}
            <rect x="7" y="0" width="6" height="6" fill="#2a2a2a" rx="1" />
            {/* Bulb */}
            <ellipse 
              cx="10" 
              cy="18" 
              rx="8" 
              ry="12" 
              fill={decoration.color}
              style={{ filter: `drop-shadow(0 0 10px ${decoration.color})` }}
            />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={(e) => onDragStart?.(e, decoration)}
      className={`cursor-grab active:cursor-grabbing transition-transform duration-200 hover:scale-110 ${className}`}
      style={{
        transform: `rotate(${decoration.rotation}deg) scale(${decoration.scale})`,
      }}
    >
      {renderDecoration()}
    </div>
  );
};

export default DecorationItem;
