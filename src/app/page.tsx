'use client';

import { useEffect, useState, useRef } from 'react';

interface LanyardData {
  discord_user: {
    username: string;
    avatar: string;
    discriminator: string;
    id: string;
  };
  activities: Array<{
    name: string;
    details?: string;
    state?: string;
    timestamps?: {
      start?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
  }>;
  discord_status: string;
}

export default function Home() {
  const [lanyardData, setLanyardData] = useState<LanyardData | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [volume, setVolume] = useState<number>(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const DISCORD_ID = '1532683555631665166';

  useEffect(() => {
    const fetchLanyard = () => {
      fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            setLanyardData(response.data);
            const userData = response.data.discord_user;
            if (userData?.avatar) {
              const avatarHash = userData.avatar;
              const isAnimated = avatarHash.startsWith('a_');
              const ext = isAnimated ? 'gif' : 'png';
              setAvatarUrl(
                `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${avatarHash}.${ext}?size=256`
              );
            } else {
              setAvatarUrl(`https://unavatar.io/discord/${DISCORD_ID}`);
            }
          }
        })
        .catch(() => {
          setAvatarUrl(`https://unavatar.io/discord/${DISCORD_ID}`);
        });
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const primaryActivity = lanyardData?.activities?.[0];

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

      {/* SAĞ ÜST SES KONTROLÜ */}
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
        {/* DISCORD AVATAR / STATUS */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/20">
          {avatarUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 animate-pulse" />
          )}
        </div>

        {/* KULLANICI ADI VE BADGE */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-wide">eneswong.7</h1>
          <span className="px-2 py-0.5 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full flex items-center gap-1">
            💎 GUNS
          </span>
        </div>

        {/* SOSYAL MEDYA BUTONLARI */}
        <div className="flex gap-3 w-full justify-center mt-1">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
          >
            GitHub
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-medium bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 rounded-xl transition-all"
          >
            Discord
          </a>
          <a
            href="https://steamcommunity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
          >
            Steam
          </a>
        </div>

        {/* DİSCORD AKTİVİTE / OYUN DURUMU KARTI */}
        {primaryActivity && (
          <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-lg bg-purple-600/30 flex items-center justify-center font-bold text-sm">
              🎮
            </div>
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-bold text-gray-200 truncate">
                {primaryActivity.name}
              </span>
              <span className="text-[11px] text-gray-400 truncate">
                {primaryActivity.details || primaryActivity.state || 'Aktif'}
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
