'use client';

export default function Home() {
  return (
    <div style={{
      backgroundColor: '#0d1117',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      margin: 0,
      position: 'relative',
      fontFamily: 'sans-serif'
    }}>
      {/* Sol Üstteki Site İsmi */}
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '24px',
        color: '#ffffff',
        fontSize: '20px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        opacity: 0.9
      }}>
        eneswong.7
      </div>

      {/* Ortadaki Discord Kartı */}
      <a 
        href="https://discord.com/users/1532683555631665166" 
        target="_blank" 
        rel="noreferrer"
        style={{
          transform: 'scale(1.15)',
          transition: 'transform 0.2s ease'
        }}
      >
        <img 
          src="https://lanyard.cnrad.dev/api/1532683555631665166" 
          alt="Discord Presence" 
          style={{ borderRadius: '8px' }}
        />
      </a>
    </div>
  );
}
