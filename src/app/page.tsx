'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [avatarUrl, setAvatarUrl] = useState<string>('https://cdn.discordapp.com/embed/avatars/0.png');
  const [volume, setVolume] = useState<number>(0.5); // Varsayılan ses %50
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioHeights, setAudioHeights] = useState<number[]>(Array(24).fill(10));

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const DISCORD_ID = '1532683555631665166';

  // Discord Profil Resmini Çekme
  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then((data: any) => {
  if (data?.data?.discord_user?.avatar) {
    const avatarHash = data.data.discord_user.avatar;
    const isAnimated = avatarHash.startsWith('a_');
    const ext = isAnimated ? 'gif' : 'png';
      // Discord Profil Resmi Çekme
useEffect(() => {
  fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
    .then((res) => res.json())
    .then((data: any) => {
      if (data?.data?.discord_user?.avatar) {
        const avatarHash = data.data.discord_user.avatar;
        const isAnimated = avatarHash.startsWith('a_');
        const ext = isAnimated ? 'gif' : 'png';
        // buradaki alt kodlar devam ediyor...
          setAvatarUrl(
            `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${avatarHash}.${ext}?size=256`
          );
        } else {
          setAvatarUrl(`https://unavatar.io/discord/${DISCORD_ID}`);
        }
      })
      .catch(() => {
        setAvatarUrl(`https://unavatar.io/discord/${DISCORD_ID}`);
      });
  }, []);

  // Web Audio API ile Gerçek Ses Analizi (Ekolayzır)
  const initAudioAnalysis = () => {
    if (audioCtxRef.current || !videoRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64; // 32 frekans aralığı yakalar

      const source = audioCtx.createMediaElementSource(videoRef.current);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateData = () => {
        analyser.getByteFrequencyData(dataArray);
        
        // 24 tane devasa çubuk için frekans verilerini alıyoruz
        const heights: number[] = [];
        for (let i = 0; i < 24; i++) {
          const val = dataArray[i % bufferLength] || 0;
          // Ses ne kadar yüksekse o kadar uzun olur (Maksimum ~250px-300px yüksekliğe kadar çıkar)
          const scaledHeight = Math.max(10, (val / 255) * 260);
          heights.push(scaledHeight);
        }
        setAudioHeights(heights);

        animationFrameRef.current = requestAnimationFrame(updateData);
      };

      updateData();
    } catch (e) {
      console.log('AudioContext başlatılamadı:', e);
    }
  };

  // Sayfaya ilk tıklamada AudioContext izinlerini aktifleştir
  const handleUserInteraction = () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    } else if (!audioCtxRef.current) {
      initAudioAnalysis();
    }
  };

  // Ses Kaydırıcısı (Volume Slider) Değişimi
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
    handleUserInteraction();
  };

  // Mute / Unmute Butonu
  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuteState = !isMuted;
      videoRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);
      if (!nextMuteState && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
    handleUserInteraction();
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <main
      onClick={handleUserInteraction}
      style={{
        height: '100vh',
        width: '100vw',
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0d1117',
        backgroundImage: 'radial-gradient(circle at center, #161b22 0%, #0d1117 100%)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Arka Plan Videosu */}
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          filter: 'brightness(0.45)',
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Sol Üst - Gelişmiş Ses Kontrol Paneli */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 20,
          backgroundColor: 'rgba(22, 27, 34, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '10px 18px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        <button
          onClick={toggleMute}
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isMuted || volume === 0 ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          style={{
            width: '100px',
            cursor: 'pointer',
            accentColor: '#8b5cf6',
          }}
        />

        <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600', width: '35px' }}>
          {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
        </span>
      </div>

      {/* Ortadaki Profil Kartı */}
      <div
        style={{
          backgroundColor: 'rgba(22, 27, 34, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '32px 28px',
          width: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          zIndex: 10,
        }}
      >
        {/* Dairesel Profil Resmi (Avatar) */}
        <div style={{ position: 'relative', marginBottom: '16px', width: '110px', height: '110px' }}>
          <img
            src={avatarUrl}
            alt="Profile Avatar"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
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
            marginBottom: '12px',
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

        {/* Biyo / Açıklama Metni */}
        <div
          style={{
            color: '#8b949e',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          yazılım öğreniyorum...
        </div>

        {/* Canlı Aktivite Kartı */}
        <div style={{ width: '100%' }}>
          <img
            src="https://lanyard.cnrad.dev/api/1532683555631665166?hideUsers=true"
            alt="Lanyard Activity"
            style={{ width: '100%', borderRadius: '12px' }}
          />
        </div>
      </div>

      {/* Sol Alt Dev Ekolayzır (4x - 5x Büyütülmüş) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          padding: '0 30px',
          zIndex: 10,
        }}
      >
        {audioHeights.slice(0, 12).map((height, i) => (
          <div
            key={`left-${i}`}
            style={{
              width: '28px', // Genişlik 4-5 katına çıkarıldı (12px -> 28px)
              height: `${height}px`, // Yükseklik ses seviyesine duyarlı ve devasa
              background: 'linear-gradient(to top, #3b82f6, #8b5cf6)',
              borderRadius: '8px 8px 0 0',
              transition: 'height 0.05s ease',
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)',
            }}
          />
        ))}
      </div>

      {/* Sağ Alt Dev Ekolayzır (4x - 5x Büyütülmüş) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          padding: '0 30px',
          zIndex: 10,
        }}
      >
        {audioHeights.slice(12, 24).map((height, i) => (
          <div
            key={`right-${i}`}
            style={{
              width: '28px', // Genişlik 4-5 katına çıkarıldı (12px -> 28px)
              height: `${height}px`, // Yükseklik ses seviyesine duyarlı ve devasa
              background: 'linear-gradient(to top, #8b5cf6, #ec4899)',
              borderRadius: '8px 8px 0 0',
              transition: 'height 0.05s ease',
              boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)',
            }}
          />
        ))}
      </div>
    </main>
  );
}
