import React from 'react';
import { Sparkles } from 'lucide-react';

interface MagicMeterProps {
  warmth: number; // 0-100
}

const MagicMeter: React.FC<MagicMeterProps> = ({ warmth }) => {
  const clampedWarmth = Math.min(100, Math.max(0, warmth));
  
  const getMessage = () => {
    if (clampedWarmth < 10) return "Start decorating ✨";
    if (clampedWarmth < 30) return "Getting cozy...";
    if (clampedWarmth < 50) return "Feeling warmer 💫";
    if (clampedWarmth < 70) return "Almost magical! ✨";
    if (clampedWarmth < 90) return "So beautiful! 🎄";
    return "Pure magic! 🌟";
  };

  return (
    <div className="glass rounded-2xl p-4 w-48">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles 
          className="w-4 h-4 text-primary" 
          style={{ 
            filter: `drop-shadow(0 0 ${4 + clampedWarmth * 0.2}px hsl(var(--primary)))`,
          }}
        />
        <span className="text-sm font-medium text-foreground">Tree Warmth</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-muted/50 rounded-full overflow-hidden mb-2">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${clampedWarmth}%`,
            background: `linear-gradient(90deg, 
              hsl(var(--secondary)) 0%, 
              hsl(var(--primary)) 50%, 
              hsl(var(--accent)) 100%
            )`,
            boxShadow: clampedWarmth > 30 
              ? `0 0 ${clampedWarmth * 0.3}px hsl(var(--primary) / 0.5)` 
              : 'none',
          }}
        />
        
        {/* Shimmer effect */}
        {clampedWarmth > 20 && (
          <div 
            className="absolute inset-0 animate-shimmer opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              backgroundSize: '200% 100%',
            }}
          />
        )}
      </div>

      {/* Message */}
      <p className="text-xs text-muted-foreground text-center">
        {getMessage()}
      </p>
    </div>
  );
};

export default MagicMeter;
