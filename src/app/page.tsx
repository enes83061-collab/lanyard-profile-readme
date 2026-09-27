'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [audioHeights, setAudioHeights] = useState<number[]>(Array(24).fill(20));
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAudioHeights(
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 60) + 15)
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Arka Plan Videosu */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          filter: 'brightness(0.5)',
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Ses Aç/Kapat Butonu */}
      <button
        onClick={toggleSound}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 20,
          backgroundColor: 'rgba(22, 27, 34, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff',
          padding: '10px 16px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {isMuted ? '🔇 Sesi Aç' : '🔊 Sesi Kapat'}
      </button>

      {/* Ortadaki Profil Kartı */}
      <div
        style={{
          backgroundColor: 'rgba(22, 27, 34, 0.82)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '32px 28px',
          width: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          zIndex: 10,
        }}
      >
        {/* Discord Avatar */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <img
            src="https://api.lanyard.rest/1532683555631665166/avatar"
            alt="Discord Avatar"
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #5865F2',
              boxShadow: '0 0 25px rgba(88, 101, 242, 0.5)',
            }}
          />
        </div>

        {/* Kullanıcı Adı ve Rozet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <h2 style={{ color: '#ffffff', margin: 0, fontSize: '24px', fontWeight: '700' }}>
            eneswong.7
          </h2>
          <span
            style={{
              backgroundColor: 'rgba(168, 85, 247, 0.2)',
              color: '#c084fc',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            💎 GUNS
          </span>
        </div>

        {/* Sosyal Medya Linkleri */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <a
            href="https://github.com/enes83061-collab"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#f0f6fc',
              padding: '8px 16px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            GitHub
          </a>

          <a
            href="https://discord.com/users/1532683555631665166"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(88, 101, 242, 0.2)',
              border: '1px solid rgba(88, 101, 242, 0.4)',
              color: '#5865f2',
              padding: '8px 16px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            Discord
          </a>

          <a
            href="https://steamcommunity.com/id/enes61ts7"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(23, 26, 33, 0.8)',
              border: '1px solid rgba(102, 192, 244, 0.4)',
              color: '#66c0f4',
              padding: '8px 16px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            Steam
          </a>
        </div>

        {/* Canlı Aktivite */}
        <div style={{ width: '100%' }}>
          <img
            src="https://lanyard.cnrad.dev/api/1532683555631665166?hideUsers=true"
            alt="Lanyard Activity"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </div>

      {/* Sol Alt Equalizer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          padding: '0 20px',
          zIndex: 10,
        }}
      >
        {audioHeights.slice(0, 12).map((height, i) => (
          <div
            key={`left-${i}`}
            style={{
              width: '12px',
              height: `${height}px`,
              background: 'linear-gradient(to top, #3b82f6, #8b5cf6)',
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.15s ease',
            }}
          />
        ))}
      </div>

      {/* Sağ Alt Equalizer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          padding: '0 20px',
          zIndex: 10,
        }}
      >
        {audioHeights.slice(12, 24).map((height, i) => (
          <div
            key={`right-${i}`}
            style={{
              width: '12px',
              height: `${height}px`,
              background: 'linear-gradient(to top, #8b5cf6, #ec4899)',
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.15s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
