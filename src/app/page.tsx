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
  const discordId = "1532683555631665166";

  useEffect(() => {
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
    <div style={styles.container}>
      {/* Profil Kutusu - Tam Merkezde */}
      <div style={styles.card}>
        {lanyard && lanyard.discord_user ? (
          <div style={styles.profileSection}>
            <img
              src={`https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.png`}
              alt="Avatar"
              style={styles.avatar}
            />
            <h1 style={styles.username}>{lanyard.discord_user.username}</h1>
            <div style={styles.badgeContainer}>
              <span style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: lanyard.discord_status === 'online' ? '#43b581' : lanyard.discord_status === 'idle' ? '#faa61a' : lanyard.discord_status === 'dnd' ? '#f04747' : '#747f8d',
                display: 'inline-block' 
              }}></span>
              <span style={styles.statusText}>{lanyard.discord_status.toUpperCase()}</span>
            </div>

            {/* Butonlar (GitHub, Discord, Steam) */}
            <div style={styles.buttonGroup}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.linkButton}>GitHub</a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" style={styles.linkButton}>Discord</a>
              <a href="https://steamcommunity.com" target="_blank" rel="noreferrer" style={styles.linkButton}>Steam</a>
            </div>

            {/* Spotify Kartı */}
            {lanyard.spotify && (
              <div style={styles.spotifyBox}>
                <p style={styles.spotifyTitle}>⚡ Spotify</p>
                <p style={styles.spotifySong}>{lanyard.spotify.song}</p>
                <p style={styles.spotifyArtist}>{lanyard.spotify.artist}</p>
              </div>
            )}
          </div>
        ) : (
          <p style={{ color: '#888', fontSize: '14px' }}>Bağlanıyor...</p>
        )}
      </div>

      {/* Müzik Oynatıcı */}
      <audio ref={audioRef} src="/muzik.mp3" loop />
      <div style={styles.musicController}>
        <span style={styles.musicInfo}>{isPlaying ? "🎶 Çalıyor" : "🎵 Müzik"}</span>
        <button onClick={toggleMusic} style={styles.musicBtn}>
          {isPlaying ? "Durdur" : "Oynat"}
        </button>
      </div>
    </div>
  );
}

// Tam Ekran ve Merkezleme Odaklı Stiller
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#090a0f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#ffffff',
    overflow: 'hidden',
  },
  card: {
    background: 'rgba(18, 20, 28, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '28px',
    borderRadius: '20px',
    textAlign: 'center',
    width: '340px',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: '88px',
    height: '88px',
    borderRadius: '50%',
    border: '2px solid rgba(114, 137, 218, 0.5)',
    marginBottom: '14px',
    objectFit: 'cover',
  },
  username: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '6px',
    letterSpacing: '0.5px',
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '18px',
  },
  statusText: {
    fontSize: '12px',
    color: '#9ba0a6',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    width: '100%',
    marginBottom: '14px',
  },
  linkButton: {
    flex: 1,
    padding: '8px 0',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    color: '#e2e8f0',
    fontSize: '12px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: '0.2s',
  },
  spotifyBox: {
    background: 'rgba(29, 185, 84, 0.08)',
    border: '1px solid rgba(29, 185, 84, 0.2)',
    padding: '12px',
    borderRadius: '12px',
    width: '100%',
    textAlign: 'left',
    marginTop: '4px',
  },
  spotifyTitle: {
    fontSize: '11px',
    color: '#1db954',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  spotifySong: {
    fontSize: '13px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#ffffff',
  },
  spotifyArtist: {
    fontSize: '11px',
    color: '#9ba0a6',
  },
  musicController: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: 'rgba(18, 20, 28, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '10px 16px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backdropFilter: 'blur(12px)',
    zIndex: 999,
  },
  musicInfo: {
    fontSize: '13px',
    color: '#9ba0a6',
    fontWeight: '500',
  },
  musicBtn: {
    background: '#7289da',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  },
};
