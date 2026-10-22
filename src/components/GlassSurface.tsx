import React from 'react';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'floating' | 'card' | 'pill' | 'sheet' | 'tile';
  isLight?: boolean;
  isPrivate?: boolean;
  interactive?: boolean;
  elevated?: boolean;
  blurLevel?: 'subtle' | 'medium' | 'deep';
  className?: string;
  children?: React.ReactNode;
}

/**
 * Reusable Liquid Glass Surface component with:
 * - Layered translucency
 * - Specular highlight rim (refractive top light edge)
 * - Hardware-accelerated backdrop blur with graceful fallback
 * - Theme-aware light and dark mode styling
 * - Smooth interactive scale & focus transitions
 */
export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  variant = 'card',
  isLight = false,
  isPrivate = false,
  interactive = false,
  elevated = false,
  blurLevel = 'medium',
  className = '',
  children,
  ...props
}) => {
  const blurClasses = {
    subtle: 'backdrop-blur-md',
    medium: 'backdrop-blur-xl',
    deep: 'backdrop-blur-2xl',
  }[blurLevel];

  // Base styling for each variant
  let surfaceStyle = '';
  let borderStyle = '';
  let shadowStyle = '';

  if (isLight) {
    // Light Liquid Pearl Mode
    borderStyle = isPrivate
      ? 'border border-purple-200/80'
      : 'border border-slate-200/80';
    
    switch (variant) {
      case 'floating':
        surfaceStyle = isPrivate
          ? 'bg-white/85 text-purple-950'
          : 'bg-white/85 text-slate-900';
        shadowStyle = 'shadow-[0_12px_36px_rgba(15,23,42,0.12),0_1px_2px_rgba(15,23,42,0.06)]';
        break;
      case 'pill':
        surfaceStyle = isPrivate
          ? 'bg-purple-50/90 text-purple-900'
          : 'bg-white/90 text-slate-800';
        shadowStyle = 'shadow-sm';
        break;
      case 'sheet':
        surfaceStyle = isPrivate
          ? 'bg-white/95 text-slate-900'
          : 'bg-white/95 text-slate-900';
        shadowStyle = 'shadow-[0_-12px_40px_rgba(15,23,42,0.16)]';
        break;
      case 'tile':
        surfaceStyle = isPrivate
          ? 'bg-purple-50/70 text-purple-950 hover:bg-white'
          : 'bg-white/75 text-slate-800 hover:bg-white';
        shadowStyle = 'shadow-[0_4px_16px_rgba(15,23,42,0.06)]';
        break;
      case 'card':
      default:
        surfaceStyle = isPrivate
          ? 'bg-white/80 text-slate-900 hover:bg-white/95'
          : 'bg-white/80 text-slate-900 hover:bg-white/95';
        shadowStyle = elevated
          ? 'shadow-[0_10px_28px_rgba(15,23,42,0.1)]'
          : 'shadow-[0_2px_8px_rgba(15,23,42,0.05)]';
        break;
    }
  } else {
    // Dark Charcoal / Liquid Glass Mode
    borderStyle = isPrivate
      ? 'border border-purple-400/25'
      : 'border border-white/[0.12]';

    switch (variant) {
      case 'floating':
        surfaceStyle = isPrivate
          ? 'bg-[#150F22]/75 text-slate-100'
          : 'bg-[#12151D]/75 text-slate-100';
        shadowStyle = isPrivate
          ? 'shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_24px_rgba(168,85,247,0.15)]'
          : 'shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_24px_rgba(99,102,241,0.08)]';
        break;
      case 'pill':
        surfaceStyle = isPrivate
          ? 'bg-purple-950/40 text-purple-200'
          : 'bg-white/[0.08] text-slate-200';
        shadowStyle = 'shadow-inner';
        break;
      case 'sheet':
        surfaceStyle = isPrivate
          ? 'bg-[#120B20]/95 text-slate-100'
          : 'bg-[#0E1118]/95 text-slate-100';
        shadowStyle = 'shadow-[0_-16px_48px_rgba(0,0,0,0.7)]';
        break;
      case 'tile':
        surfaceStyle = isPrivate
          ? 'bg-purple-950/30 text-purple-100 hover:bg-purple-900/40'
          : 'bg-white/[0.06] text-slate-100 hover:bg-white/[0.1]';
        shadowStyle = 'shadow-[0_4px_16px_rgba(0,0,0,0.3)]';
        break;
      case 'card':
      default:
        surfaceStyle = isPrivate
          ? 'bg-purple-950/20 text-slate-100 hover:bg-purple-900/30'
          : 'bg-white/[0.05] text-slate-100 hover:bg-white/[0.08]';
        shadowStyle = elevated
          ? 'shadow-[0_12px_32px_rgba(0,0,0,0.5)]'
          : 'shadow-[0_4px_16px_rgba(0,0,0,0.25)]';
        break;
    }
  }

  const interactiveClasses = interactive
    ? 'transition-all duration-200 active:scale-[0.98] cursor-pointer'
    : '';

  return (
    <div
      className={`relative overflow-hidden ${blurClasses} ${surfaceStyle} ${borderStyle} ${shadowStyle} ${interactiveClasses} ${className}`}
      {...props}
    >
      {/* Specular Top Rim Highlight for authentic glass reflection */}
      <div
        className={`absolute top-0 inset-x-0 h-[1px] pointer-events-none ${
          isLight
            ? 'bg-gradient-to-r from-transparent via-white to-transparent opacity-80'
            : 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
        }`}
      />
      {children}
    </div>
  );
};
