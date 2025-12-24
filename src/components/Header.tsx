import React, { useState, useEffect, useRef } from 'react';
import { TreePine, Users, Share2, Copy, Check } from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  roomCode?: string;
  friendCount?: number;
}

const Header: React.FC<HeaderProps> = ({ roomCode, friendCount = 0 }) => {
  const [copied, setCopied] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?room=${roomCode}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied! 🎄",
        description: "Share it with friends to decorate together",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Couldn't copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border border-primary/30">
            <TreePine className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-display font-semibold text-foreground hidden sm:block">
            Decorate Together
          </span>
        </div>

        {/* Center - Room info */}
        {roomCode && (
          <div className="glass rounded-full px-4 py-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Room:</span>
            <span className="font-mono text-sm text-primary font-semibold tracking-wider">
              {roomCode}
            </span>
            {friendCount > 0 && (
              <div className="flex items-center gap-1.5 text-secondary">
                <Users className="w-4 h-4" />
                <span className="text-sm">{friendCount + 1}</span>
              </div>
            )}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {roomCode && (
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="rounded-full border-primary/30 hover:bg-primary/10"
            >
              {copied ? (
                <Check className="w-4 h-4 text-secondary" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              <span className="ml-2 hidden sm:inline">
                {copied ? 'Copied!' : 'Share'}
              </span>
            </Button>
          )}
          
          <MusicPlayer />
        </div>
      </div>
    </header>
  );
};

export default Header;
