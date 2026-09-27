'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [audioHeights, setAudioHeights] = useState<number[]>(Array(24).fill(20));

  // Rastgele/Ses ritmine göre oynayan equalizer efekti
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioHeights(
        Array.from({ length: 24 }, () => Math.floor(Math.random() * 60) + 15)
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#0a0c10',
        backgroundImage: 'radial-gradient(circle at center, rgba(16, 22, 34, 0.8) 0%, rgba(5, 7, 10, 0.95) 100%)',
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
      {/* Ortadaki Büyük Profil Kartı */}
      <div
        style={{
          backgroundColor: 'rgba(22, 27, 34, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '32px 28px',
          width: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          zIndex: 10,
        }}
      >
        {/* Büyütülmüş Avatar */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <img
            src="https://lanyard.cnrad.dev/api/1532683555631665166"
            alt="Discord Avatar"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #5865F2',
              boxShadow: '0 0 20px rgba(88, 101, 242, 0.4)',
            }}
          />
        </div>

        {/* Kullanıcı Adı ve Rozetler */}
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

        {/* İsim Altındaki Sosyal Medya & Profil Linkleri */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* GitHub Linki */}
          <a
            href="https://github.com/enes83061-collab"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f0f6fc',
              padding: '8px 14px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
          >
            GitHub
          </a>

          {/* Discord Linki */}
          <a
            href="https://discord.com/users/1532683555631665166"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(88, 101, 242, 0.15)',
              border: '1px solid rgba(88, 101, 242, 0.3)',
              color: '#5865f2',
              padding: '8px 14px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
          >
            Discord
          </a>

          {/* Steam Linki */}
          <a
            href="https://steamcommunity.com" // Kendi Steam profil linkinle değiştirebilirsin kanka
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(23, 26, 33, 0.6)',
              border: '1px solid rgba(102, 192, 244, 0.3)',
              color: '#66c0f4',
              padding: '8px 14px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
          >
            Steam
          </a>
        </div>

        {/* Canlı Aktivite / Lanyard Banner */}
        <div style={{ width: '100%' }}>
          <img
            src="https://lanyard.cnrad.dev/api/1532683555631665166?hideUsers=true"
            alt="Lanyard Activity"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </div>

      {/* Sol Alt Equalizer (Mavi / Mor Tonlarında) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          padding: '0 20px',
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
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Sağ Alt Equalizer (Mavi / Mor Tonlarında) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          padding: '0 20px',
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
              boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
