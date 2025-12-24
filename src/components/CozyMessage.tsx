import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface CozyMessageProps {
  decorationCount: number;
}

const CozyMessage: React.FC<CozyMessageProps> = ({ decorationCount }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const lastCountRef = useRef(0);

  const messages = [
    { threshold: 1, text: "Your first ornament! ✨" },
    { threshold: 3, text: "The tree is starting to glow..." },
    { threshold: 5, text: "Looking more magical! 🎄" },
    { threshold: 8, text: "So cozy and warm 💫" },
    { threshold: 10, text: "Almost complete! Keep going..." },
    { threshold: 12, text: "Your tree is beautiful! 🌟" },
    { threshold: 15, text: "Pure Christmas magic! ❄️" },
  ];

  useEffect(() => {
    // Check if we crossed a threshold
    const crossedThreshold = messages.find(
      m => decorationCount >= m.threshold && lastCountRef.current < m.threshold
    );

    if (crossedThreshold) {
      setMessage(crossedThreshold.text);
      setIsVisible(true);

      // Animate in
      if (messageRef.current) {
        gsap.fromTo(messageRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
      }

      // Hide after delay
      const timer = setTimeout(() => {
        if (messageRef.current) {
          gsap.to(messageRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => setIsVisible(false)
          });
        }
      }, 3000);

      return () => clearTimeout(timer);
    }

    lastCountRef.current = decorationCount;
  }, [decorationCount]);

  if (!isVisible) return null;

  return (
    <div 
      ref={messageRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="glass-strong rounded-full px-6 py-3 text-center">
        <p className="text-sm text-foreground/80">
          {message}
        </p>
      </div>
    </div>
  );
};

export default CozyMessage;
