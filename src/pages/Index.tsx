import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Snowfall from '@/components/Snowfall';
import LandingPage from '@/components/LandingPage';
import TreeScene from '@/components/TreeScene';
import Header from '@/components/Header';
import CozyMessage from '@/components/CozyMessage';

type AppState = 'landing' | 'decorating';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [roomCode, setRoomCode] = useState<string>('');
  const [decorationCount, setDecorationCount] = useState(0);

  // Check URL for room code on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room) {
      setRoomCode(room);
      setAppState('decorating');
    }
  }, []);

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const handleCreateRoom = () => {
    const code = generateRoomCode();
    setRoomCode(code);
    setAppState('decorating');
    
    // Update URL without reload
    window.history.pushState({}, '', `?room=${code}`);
  };

  const handleJoinRoom = (code: string) => {
    setRoomCode(code);
    setAppState('decorating');
    window.history.pushState({}, '', `?room=${code}`);
  };

  return (
    <>
      <Helmet>
        <title>Decorate Together | Collaborative Christmas Tree</title>
        <meta name="description" content="Create magical Christmas memories with friends and family. Decorate your virtual Christmas tree together in real-time from anywhere in the world." />
        <meta name="keywords" content="Christmas tree, decorate, collaboration, real-time, holiday, festive, friends, family" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-night relative overflow-hidden">
        {/* Vignette overlay */}
        <div className="fixed inset-0 vignette pointer-events-none z-20" />
        
        {/* Snowfall */}
        <Snowfall intensity={appState === 'landing' ? 'medium' : 'light'} />

        {/* Background gradient */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(139, 90, 43, 0.15) 0%, transparent 60%)',
          }}
        />

        {/* Header - only show when decorating */}
        {appState === 'decorating' && <Header roomCode={roomCode} />}

        {/* Main content */}
        <main className="relative z-10 min-h-screen flex flex-col">
          {appState === 'landing' ? (
            <LandingPage 
              onCreateRoom={handleCreateRoom}
              onJoinRoom={handleJoinRoom}
            />
          ) : (
            <div className="flex-1 pt-20">
              <TreeScene />
            </div>
          )}
        </main>

        {/* Cozy messages */}
        {appState === 'decorating' && (
          <CozyMessage decorationCount={decorationCount} />
        )}
      </div>
    </>
  );
};

export default Index;
