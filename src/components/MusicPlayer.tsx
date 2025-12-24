import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import gsap from 'gsap';

interface MusicPlayerProps {
  className?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Royalty-free cozy winter lo-fi music from Pixabay
  const musicUrl = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946f9ed848.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // Fade out
        gsap.to(audioRef.current, {
          volume: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            audioRef.current?.pause();
            if (audioRef.current) audioRef.current.volume = volume;
          }
        });
      } else {
        audioRef.current.volume = 0;
        audioRef.current.play();
        // Fade in
        gsap.to(audioRef.current, {
          volume: volume,
          duration: 1,
          ease: 'power2.inOut'
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        preload="auto"
      />
      
      {/* Main toggle button */}
      <button
        onClick={togglePlay}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full 
          glass transition-all duration-300
          hover:scale-105 active:scale-95
          ${isPlaying ? 'glow-gold' : ''}
        `}
      >
        {isPlaying ? (
          <>
            <Music className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-foreground/80">Playing</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Music</span>
          </>
        )}
      </button>

      {/* Volume slider popup */}
      <div 
        className={`
          absolute top-full right-0 mt-2 p-4 rounded-xl glass-strong
          transition-all duration-300 min-w-[200px]
          ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-primary" />
            ) : (
              <Play className="w-4 h-4 text-primary" />
            )}
          </button>
          <span className="text-sm text-foreground/70">
            {isPlaying ? 'Now Playing' : 'Paused'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {volume === 0 ? (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-primary" />
          )}
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="flex-1"
          />
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          ☕ Cozy Winter Vibes
        </p>
      </div>
    </div>
  );
};

export default MusicPlayer;
