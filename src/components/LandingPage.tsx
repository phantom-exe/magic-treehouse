import React, { useState, useEffect, useRef } from 'react';
import { TreePine, Users, Link2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';

interface LandingPageProps {
  onCreateRoom: () => void;
  onJoinRoom: (code: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCreateRoom, onJoinRoom }) => {
  const [roomCode, setRoomCode] = useState('');
  const [showJoin, setShowJoin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate elements in
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo('.landing-element',
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        stagger: 0.15
      }
    );

    // Floating animation for decorative elements
    gsap.to('.float-element', {
      y: -15,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });
  }, []);

  const handleJoin = () => {
    if (roomCode.trim()) {
      onJoinRoom(roomCode.trim());
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-element absolute top-[15%] left-[10%] text-6xl opacity-20">🎄</div>
        <div className="float-element absolute top-[25%] right-[15%] text-5xl opacity-20">⭐</div>
        <div className="float-element absolute bottom-[30%] left-[20%] text-4xl opacity-20">🎁</div>
        <div className="float-element absolute bottom-[20%] right-[10%] text-5xl opacity-20">❄️</div>
        <div className="float-element absolute top-[60%] left-[5%] text-3xl opacity-20">🔔</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo / Icon */}
        <div className="landing-element mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full 
                          bg-secondary/30 border border-secondary/50 glow-gold">
            <TreePine className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 
          ref={titleRef}
          className="landing-element text-5xl md:text-7xl font-display font-bold text-foreground mb-4 text-glow"
        >
          Decorate Together
        </h1>

        {/* Subtitle */}
        <p className="landing-element text-xl md:text-2xl text-muted-foreground mb-12 max-w-lg mx-auto">
          Create magical Christmas memories with friends and family. Decorate your tree in real-time, 
          together from anywhere in the world.
        </p>

        {/* Actions */}
        <div className="landing-element flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            onClick={onCreateRoom}
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg rounded-full bg-primary text-primary-foreground
                       hover:scale-105 transition-transform duration-300 glow-gold"
          >
            <TreePine className="w-5 h-5 mr-2" />
            Create a Tree
          </Button>

          <Button
            onClick={() => setShowJoin(!showJoin)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg rounded-full border-primary/30 
                       hover:bg-primary/10 hover:scale-105 transition-all duration-300"
          >
            <Users className="w-5 h-5 mr-2" />
            Join a Tree
          </Button>
        </div>

        {/* Join room input */}
        {showJoin && (
          <div className="landing-element glass rounded-2xl p-6 max-w-md mx-auto animate-scale-in">
            <p className="text-sm text-muted-foreground mb-4">
              Enter the room code shared by your friend
            </p>
            <div className="flex gap-3">
              <Input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Enter room code..."
                className="text-center text-lg tracking-widest uppercase bg-muted/50"
                maxLength={6}
              />
              <Button
                onClick={handleJoin}
                disabled={!roomCode.trim()}
                className="px-6"
              >
                Join
              </Button>
            </div>
          </div>
        )}

        {/* Footer hint */}
        <p className="landing-element text-sm text-muted-foreground mt-12">
          ✨ No account needed • Share the magic instantly
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
