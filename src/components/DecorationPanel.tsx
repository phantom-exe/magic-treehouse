import React, { useState } from 'react';
import { Sparkles, Gift, Star, CandyCane, Ribbon } from 'lucide-react';
import DecorationItem, { Decoration } from './DecorationItem';
import gsap from 'gsap';

interface DecorationPanelProps {
  onDragStart: (e: React.DragEvent, decoration: Decoration) => void;
}

type Category = 'baubles' | 'toppers' | 'candy' | 'ribbons' | 'gifts';

const DecorationPanel: React.FC<DecorationPanelProps> = ({ onDragStart }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('baubles');

  const categories = [
    { id: 'baubles' as Category, icon: '🎄', label: 'Ornaments' },
    { id: 'toppers' as Category, icon: '⭐', label: 'Topper' },
    { id: 'candy' as Category, icon: '🍬', label: 'Candy' },
    { id: 'ribbons' as Category, icon: '🎀', label: 'Ribbons' },
    { id: 'gifts' as Category, icon: '🎁', label: 'Gifts' },
  ];

  const decorations: Record<Category, Decoration[]> = {
    baubles: [
      { id: 'bauble-red', type: 'bauble', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-gold', type: 'bauble', color: '#FFD700', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-blue', type: 'bauble', color: '#1E88E5', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-silver', type: 'bauble', color: '#9E9E9E', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-green', type: 'bauble', color: '#43A047', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-purple', type: 'bauble', color: '#8E24AA', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-pink', type: 'bauble', color: '#EC407A', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'bauble-teal', type: 'bauble', color: '#26A69A', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
    toppers: [
      { id: 'star-gold', type: 'star', color: '#FFD700', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'star-silver', type: 'star', color: '#C0C0C0', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'star-red', type: 'star', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
    candy: [
      { id: 'candy-red', type: 'candy', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'candy-green', type: 'candy', color: '#43A047', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'candy-blue', type: 'candy', color: '#1E88E5', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
    ribbons: [
      { id: 'ribbon-red', type: 'ribbon', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'ribbon-gold', type: 'ribbon', color: '#FFD700', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'ribbon-silver', type: 'ribbon', color: '#C0C0C0', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
    gifts: [
      { id: 'gift-red', type: 'gift', color: '#E53935', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'gift-blue', type: 'gift', color: '#1E88E5', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'gift-green', type: 'gift', color: '#43A047', x: 0, y: 0, scale: 1, rotation: 0 },
      { id: 'gift-purple', type: 'gift', color: '#8E24AA', x: 0, y: 0, scale: 1, rotation: 0 },
    ],
  };

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
  };

  return (
    <div className="glass-strong rounded-2xl p-4 w-72 max-h-[70vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-medium text-foreground">Decorate the Tree</h2>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm
              transition-all duration-300
              ${activeCategory === cat.id 
                ? 'bg-primary/20 text-primary border border-primary/30' 
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent'
              }
            `}
          >
            <span>{cat.icon}</span>
            <span className="hidden sm:inline">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Decorations grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-3">
          {decorations[activeCategory].map((decoration, index) => (
            <div
              key={decoration.id}
              className="aspect-square p-2 rounded-xl bg-muted/30 hover:bg-muted/50 
                         transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <DecorationItem
                decoration={decoration}
                onDragStart={onDragStart}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className="mt-4 pt-3 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          ✨ Drag ornaments onto the tree
        </p>
      </div>
    </div>
  );
};

export default DecorationPanel;
