import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enes Wong | Discord', // <-- Sekmede/Sitede görünecek isim
};

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
      position: 'relative'
    }}>
      {/* Sol Üst Başlık / Site Adı */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        fontSize: '18px',
        fontWeight: 'bold',
        opacity: 0.8
      }}>
        eneswong.7
      </div>

      {/* Ortadaki Büyütülmüş Discord Kartı */}
      <a 
        href="https://discord.com/users/1532683555631665166" 
        target="_blank" 
        rel="noreferrer"
        style={{
          transform: 'scale(1.2)', // Kartı biraz büyütür
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
