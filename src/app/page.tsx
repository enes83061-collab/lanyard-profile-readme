'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [volume, setVolume] = useState<number>(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const DISCORD_ID = '1532683555631665166';

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then((res) => res.json())
      .then((response: any) => {
        const userData = response?.data;
        if (userData?.discord_user?.avatar) {
          const avatarHash = userData.discord_user.avatar;
          const isAnimated = avatarHash.startsWith('a_');
          const ext = isAnimated ? 'gif' : 'png';
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* ARKA PLAN VİDEOSU */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* ARKA PLAN MÜZİĞİ */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* SAĞ ÜST SES KONTROLÜ VE YÜZDESİ */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
        <span className="text-xs font-semibold tracking-wider text-gray-300">
          SES: %{Math.round(volume * 100)}
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-purple-500 cursor-pointer"
        />
      </div>

      {/* ORTA KART CONTAINER */}
      <div className="relative z-10 w-full max-w-md p-6 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center gap-4">
        {/* GIF PP */}
        {avatarUrl && (
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-xl font-bold tracking-wide">eneswong.7</h1>
      </div>
    </main>
  );
}
