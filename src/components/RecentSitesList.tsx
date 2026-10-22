import React from 'react';
import { Clock, BookOpen, ChevronRight, Sparkles, Globe } from 'lucide-react';
import { RecentSite } from '../types/browser';
import { GlassSurface } from './GlassSurface';

interface RecentSitesListProps {
  sites: RecentSite[];
  onSiteClick: (url: string) => void;
  onClearHistory?: () => void;
  isLight?: boolean;
}

export const RecentSitesList: React.FC<RecentSitesListProps> = ({
  sites,
  onSiteClick,
  onClearHistory,
  isLight = false,
}) => {
  return (
    <section aria-labelledby="recent-sites-heading" className="w-full space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <h2 id="recent-sites-heading" className="text-xs font-semibold uppercase tracking-wider text-current opacity-70">
            Recent Sites
          </h2>
        </div>
        {onClearHistory && sites.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="text-[11px] opacity-50 hover:opacity-100 transition-opacity min-h-[32px] px-2 rounded-lg"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Phase 1 Verification Note */}
      <GlassSurface
        variant="card"
        isLight={isLight}
        className="px-3.5 py-2.5 rounded-2xl text-[11px] flex items-center gap-2.5 leading-snug"
      >
        <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
        <span className="opacity-85">
          <strong>Phase 1 UI Architecture:</strong> Website previews use simulated placeholder data. WebView and GeckoView integration scheduled for Phase 2.
        </span>
      </GlassSurface>

      {/* List of Liquid Glass Cards */}
      <div className="space-y-2">
        {sites.length === 0 ? (
          <div className="py-8 text-center text-xs opacity-50">
            No recent sites in history
          </div>
        ) : (
          sites.map((site) => {
            const cleanHost = site.url.replace(/^https?:\/\//, '').split('/')[0];
            return (
              <GlassSurface
                key={site.id}
                variant="card"
                interactive={true}
                isLight={isLight}
                onClick={() => onSiteClick(site.url)}
                className="group p-3.5 rounded-2xl text-left"
              >
                {/* Top Meta Line: Zero-pill unboxed text with dot separators */}
                <div className="flex items-center justify-between text-[11px] opacity-65 mb-1.5">
                  <div className="flex items-center gap-1.5 font-mono text-cyan-400 font-medium truncate max-w-[200px]">
                    <Globe className="w-3 h-3 shrink-0" />
                    <span>{cleanHost}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-current shrink-0">
                    <span>{site.readingTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{site.timeAgo}</span>
                  </div>
                </div>

                {/* Article / Site Title */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {site.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Snippet */}
                <p className="text-[11px] opacity-70 line-clamp-2 mt-1 leading-relaxed">
                  {site.snippet}
                </p>
              </GlassSurface>
            );
          })
        )}
      </div>
    </section>
  );
};
