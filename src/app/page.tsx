'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LanyardData {
  discord_user: {
    username: string;
    discriminator: string;
    avatar: string;
    id: string;
  };
  discord_status: string;
  spotify?: {
    song: string;
    artist: string;
    album_art_url: string;
  };
}

export default function Home() {
  const [lanyard, setLanyard] = useState<LanyardData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const discordId = "1532683555631665166"; // Senin Discord ID'n

  useEffect(() => {
    // Lanyard API Bağlantısı (Canlı Discord Durumu)
    const ws = new WebSocket('wss://api.lanyard.rest/socket');

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: discordId,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
        if (data.d) setLanyard(data.d);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <main style={styles.main}>
      {/* Simsiyah Arka Plan & Profil Konteyneri */}
      <div style={styles.card}>
        {lanyard && lanyard.discord_user ? (
          <div style={styles.profileSection}>
            <img
              src={`https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.png`}
              alt="Avatar"
              style={styles.avatar}
            />
            <h1 style={styles.username}>{lanyard.discord_user.username}</h1>
            <p style={styles.statusText}>
              Durum: <span style={{ textTransform: 'capitalize', color: '#7289da' }}>{lanyard.discord_status}</span>
            </p>

            {/* Spotify Varsa Göster */}
            {lanyard.spotify && (
              <div style={styles.spotifyBox}>
                <p style={styles.spotifyTitle}>🎵 Dinliyor:</p>
                <p style={styles.spotifySong}>{lanyard.spotify.song}</p>
                <p style={styles.spotifyArtist}>{lanyard.spotify.artist}</p>
              </div>
            )}
          </div>
        ) : (
          <p style={{ color: '#888' }}>Discord Verisi Yükleniyor...</p>
        )}
      </div>

      {/* Arka Plan Müziği İçin Audio */}
      <audio ref={audioRef} src="/muzik.mp3" loop />

      {/* Özel Müzik Kontrolcüsü */}
      <div style={styles.musicController}>
        <span style={styles.musicInfo}>{isPlaying ? "Müzik Çalıyor 🎶" : "Ambient Müzik"}</span>
        <button onClick={toggleMusic} style={styles.button}>
          {isPlaying ? "Durdur" : "Oynat"}
        </button>
      </div>
    </main>
  );
}

// Inline Stiller (Harici CSS ile uğraşmamak için)
const styles: { [key: string]: React.CSSProperties } = {
  main: {
    backgroundColor: '#000000',
    color: '#ffffff',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  card: {
    background: 'rgba(18, 18, 18, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '30px',
    borderRadius: '16px',
    textAlign: 'center' as const,
    width: '320px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    zIndex: 10,
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  avatar: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    border: '2px solid #7289da',
    marginBottom: '15px',
  },
  username: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  statusText: {
    fontSize: '14px',
    color: '#b9bbbe',
    marginBottom: '15px',
  },
  spotifyBox: {
    background: 'rgba(29, 185, 84, 0.1)',
    border: '1px solid rgba(29, 185, 84, 0.3)',
    padding: '10px',
    borderRadius: '8px',
    width: '100%',
    marginTop: '10px',
  },
  spotifyTitle: {
    fontSize: '11px',
    color: '#1db954',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  spotifySong: {
    fontSize: '13px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  spotifyArtist: {
    fontSize: '12px',
    color: '#b9bbbe',
  },
  musicController: {
    position: 'absolute',
    bottom: '30px',
    right: '30px',
    background: 'rgba(25, 25, 25, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '12px 20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    zIndex: 100,
    backdropFilter: 'blur(10px)',
  },
  musicInfo: {
    fontSize: '14px',
    color: '#b9bbbe',
  },
  button: {
    background: '#7289da',
    border: 'none',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.2s',
  },
};
