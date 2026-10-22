import React from 'react';

interface AetherLogoProps {
  size?: number;
  className?: string;
  isPrivate?: boolean;
}

export const AetherLogo: React.FC<AetherLogoProps> = ({
  size = 64,
  className = '',
  isPrivate = false,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient blur aura */}
      <div
        className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 ${
          isPrivate
            ? 'bg-purple-600/35'
            : 'bg-gradient-to-tr from-violet-600/40 via-indigo-500/30 to-cyan-400/35'
        }`}
      />

      {/* Outer specular glass ring */}
      <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-tr from-white/30 via-white/5 to-cyan-400/40 shadow-inner">
        <div className="w-full h-full rounded-full bg-slate-900/60 backdrop-blur-md" />
      </div>

      {/* Main glass core with liquid gradient */}
      <div
        className={`relative z-10 flex items-center justify-center rounded-2xl shadow-2xl transition-all duration-500 ${
          isPrivate
            ? 'bg-gradient-to-br from-purple-900/80 via-violet-950/90 to-black/90 border border-purple-400/30'
            : 'bg-gradient-to-br from-violet-500/20 via-indigo-600/20 to-cyan-500/20 border border-white/20'
        }`}
        style={{
          width: size * 0.78,
          height: size * 0.78,
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Specular edge sheen */}
        <div className="absolute top-0 inset-x-2 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-xl pointer-events-none" />

        {/* Ethereal Prism Vector Glyph */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 drop-shadow-[0_2px_10px_rgba(139,92,246,0.6)]"
        >
          <defs>
            <linearGradient id="aetherGradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor={isPrivate ? '#C084FC' : '#38BDF8'} />
              <stop offset="0.5" stopColor={isPrivate ? '#A855F7' : '#818CF8'} />
              <stop offset="1" stopColor={isPrivate ? '#7E22CE' : '#C084FC'} />
            </linearGradient>
            <linearGradient id="innerGaze" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Infinity / Orbit Refractive Loops */}
          <path
            d="M16 16C11.5817 16 8 19.5817 8 24C8 28.4183 11.5817 32 16 32C21.5 32 26.5 16 32 16C36.4183 16 40 19.5817 40 24C40 28.4183 36.4183 32 32 32C26.5 32 21.5 16 16 16Z"
            stroke="url(#aetherGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Prismatic Diamond Focus */}
          <circle cx="24" cy="24" r="3" fill="url(#innerGaze)" />
          <circle cx="16" cy="24" r="1.5" fill="#38BDF8" />
          <circle cx="32" cy="24" r="1.5" fill="#C084FC" />
        </svg>
      </div>
    </div>
  );
};
