import React from 'react';
import { Shield, Download, Zap } from 'lucide-react';
import { AetherLogo } from './AetherLogo';
import { QuickAccessGrid } from './QuickAccessGrid';
import { RecentSitesList } from './RecentSitesList';
import { GlassSurface } from './GlassSurface';
import { QuickTile, RecentSite } from '../types/browser';

interface HomeScreenProps {
  quickTiles: QuickTile[];
  recentSites: RecentSite[];
  onTileClick: (domain: string) => void;
  onAddTile: (tile: Omit<QuickTile, 'id'>) => void;
  onSiteClick: (url: string) => void;
  onClearHistory: () => void;
  onOpenPrivacyShield: () => void;
  onOpenDownloads: () => void;
  trackersBlocked: number;
  downloadCount?: number;
  isLight?: boolean;
  isPrivateMode?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  quickTiles,
  recentSites,
  onTileClick,
  onAddTile,
  onSiteClick,
  onClearHistory,
  onOpenPrivacyShield,
  onOpenDownloads,
  trackersBlocked,
  downloadCount = 0,
  isLight = false,
  isPrivateMode = false,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-5 pb-28 space-y-6 select-none scroll-smooth">
      {/* Hero Header: Logo & Contextual Greeting */}
      <div className="flex flex-col items-center text-center space-y-3 pt-2">
        <AetherLogo size={64} isPrivate={isPrivateMode} />

        <div className="space-y-1">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-cyan-400">
            {isPrivateMode ? 'Private Shield' : 'Aether Browser'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-current text-balance">
            {getGreeting()}
          </h1>
          <p className="text-xs opacity-60 font-medium">
            Safari-inspired Liquid Glass navigation for Android.
          </p>
        </div>

        {/* Dual Status Chips: Privacy Shield & Turbo Downloads */}
        <div className="flex items-center gap-2 flex-wrap justify-center pt-1">
          {/* Clickable Privacy Shield Chip */}
          <button
            type="button"
            onClick={onOpenPrivacyShield}
            title="Open Privacy Shield report"
            aria-label={`Aether Shield Active, ${trackersBlocked} trackers blocked`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-full"
          >
            <GlassSurface
              variant="pill"
              interactive={true}
              isLight={isLight}
              isPrivate={isPrivateMode}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 border"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Shield Active <span className="opacity-40">·</span>{' '}
                <strong className="text-emerald-400 font-bold tabular-nums">{trackersBlocked}</strong>
              </span>
            </GlassSurface>
          </button>

          {/* Clickable Turbo Downloads Chip */}
          <button
            type="button"
            onClick={onOpenDownloads}
            title="Open Turbo Downloads Manager"
            aria-label="Downloads"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
          >
            <GlassSurface
              variant="pill"
              interactive={true}
              isLight={isLight}
              isPrivate={isPrivateMode}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 border"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                Turbo Downloads <span className="opacity-40">·</span>{' '}
                <strong className="text-cyan-400 font-bold">QoS Max</strong>
              </span>
            </GlassSurface>
          </button>
        </div>
      </div>

      {/* Quick Access Favorites Grid */}
      <QuickAccessGrid
        tiles={quickTiles}
        onTileClick={onTileClick}
        onAddTile={onAddTile}
        isLight={isLight}
      />

      {/* Recent Sites / Reading Feed */}
      <RecentSitesList
        sites={recentSites}
        onSiteClick={onSiteClick}
        onClearHistory={onClearHistory}
        isLight={isLight}
      />
    </div>
  );
};
