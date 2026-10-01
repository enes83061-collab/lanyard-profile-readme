'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-purple-500 selection:text-white">
      
      {/* Arka Plan Hafif Işık Efekti */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* ORTADAKİ PROFİL KARTI */}
      <div className="z-10 bg-neutral-900/90 border border-neutral-800/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-80 flex flex-col items-center text-center">
        
        {/* Profil Resmi */}
        <div className="relative mb-3">
          <img 
            src="https://github.com/enes83061-collab.png" 
            alt="Profil" 
            className="w-20 h-20 rounded-full border-2 border-purple-500/50 object-cover shadow-lg"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-purple-600 border-2 border-neutral-900 rounded-full"></span>
        </div>

        {/* Kullanıcı Adı */}
        <div className="flex items-center gap-1.5 mb-5">
          <h1 className="font-semibold text-lg tracking-wide">eneswong.7</h1>
          <span className="bg-purple-950 text-purple-400 text-[10px] px-2 py-0.5 rounded-full border border-purple-800/50 font-medium">
            ✦ Lvl. 29
          </span>
        </div>

        {/* Sosyal Medya Butonları */}
        <div className="grid grid-cols-3 gap-2 w-full mb-4">
          <a 
            href="https://github.com/enes83061-collab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/50 py-2 rounded-xl text-xs font-medium transition text-neutral-300 hover:text-white"
          >
            GitHub
          </a>
          <a 
            href="https://discord.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/50 py-2 rounded-xl text-xs font-medium transition text-neutral-300 hover:text-white"
          >
            Discord
          </a>
          <a 
            href="https://steamcommunity.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/50 py-2 rounded-xl text-xs font-medium transition text-neutral-300 hover:text-white"
          >
            Steam
          </a>
        </div>

        {/* Alt Bilgi Kartı (Gencola / Etkileşim Alanı) */}
        <div className="w-full bg-neutral-950/60 border border-neutral-800/50 p-3 rounded-xl flex items-center gap-3 text-left">
          <div className="w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-bold">
            ⚡
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-neutral-200">Gencola</p>
            <p className="text-[11px] text-neutral-400 truncate">Gen-z & Etkileşim</p>
          </div>
        </div>

      </div>

      {/* SAĞ ALT MÜZİK ÇALAR */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-900/90 border border-neutral-800 backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl text-white">
        <audio ref={audioRef} src="/muzik.mp3" loop />
        <button 
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 transition cursor-pointer text-sm shadow-md"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div className="text-xs">
          <p className="font-medium">Arka Plan Müziği</p>
          <p className="text-neutral-400">{isPlaying ? 'Çalıyor...' : 'Durduruldu'}</p>
        </div>
      </div>

    </main>
  );
}
