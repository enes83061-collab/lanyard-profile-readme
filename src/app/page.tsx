'use client';

import { useState, useRef } from 'react';

export default function MusicPlayer() {
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
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-900/80 border border-neutral-800 backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl text-white">
      <audio ref={audioRef} src="/muzik.mp3" loop />
      <button 
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 transition cursor-pointer text-sm"
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <div className="text-xs">
        <p className="font-medium">Arka Plan Müziği</p>
        <p className="text-neutral-400">{isPlaying ? 'Çalıyor...' : 'Durduruldu'}</p>
      </div>
    </div>
  );
}
