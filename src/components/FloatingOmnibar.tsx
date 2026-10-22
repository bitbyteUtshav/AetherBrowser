import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Lock,
  ArrowLeft,
  ArrowRight,
  Settings,
  X,
  Share2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Globe,
  Download,
  Zap,
  MoreVertical,
  Mic
} from 'lucide-react';
import { BrowserSettings } from '../types/browser';
import { GlassSurface } from './GlassSurface';

interface FloatingOmnibarProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  canGoBack: boolean;
  onBack: () => void;
  canGoForward: boolean;
  onForward: () => void;
  tabCount: number;
  onOpenTabs: () => void;
  onOpenSettings: () => void;
  onOpenShare: () => void;
  onOpenDownloads: () => void;
  onOpenChromeMenu?: () => void;
  onOpenSiteSettings?: () => void;
  hasActiveDownloads?: boolean;
  settings: BrowserSettings;
  isPrivateMode?: boolean;
}

export const FloatingOmnibar: React.FC<FloatingOmnibarProps> = ({
  currentUrl,
  onNavigate,
  canGoBack,
  onBack,
  canGoForward,
  onForward,
  tabCount,
  onOpenTabs,
  onOpenSettings,
  onOpenShare,
  onOpenDownloads,
  onOpenChromeMenu,
  onOpenSiteSettings,
  hasActiveDownloads = false,
  settings,
  isPrivateMode = false,
}) => {
  const [inputValue, setInputValue] = useState(currentUrl);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(currentUrl);
  }, [currentUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onNavigate(inputValue.trim());
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (query: string) => {
    setInputValue(query);
    onNavigate(query);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const isLight = settings.theme === 'light';

  // Smart suggestions with zero-pill unboxed metadata
  const suggestions = [
    { label: 'Jetpack Compose Material 3 Guidelines', type: 'search', domain: 'developer.android.com' },
    { label: 'Safari Liquid Glass Shader Architecture', type: 'search', domain: 'design.aether.io' },
    { label: 'github.com/android/architecture-samples', type: 'url', domain: 'github.com' },
    { label: 'arxiv.org/abs/cs.HC', type: 'url', domain: 'arxiv.org' },
  ];

  return (
    <nav
      aria-label="Browser navigation bar"
      className="relative w-full z-40 px-3 pb-2 pt-1 sm:px-4 sm:pb-3"
    >
      {/* Suggestions Drawer Popup when focused */}
      {isFocused && (
        <div className="absolute bottom-full left-3 right-3 sm:left-4 sm:right-4 mb-2.5 z-50">
          <GlassSurface
            variant="sheet"
            isLight={isLight}
            isPrivate={isPrivateMode}
            blurLevel={settings.glassBlurLevel}
            className="rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="px-3.5 py-2.5 border-b border-current/10 flex items-center justify-between">
              <div className="text-xs font-semibold text-current opacity-85 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Search Suggestions</span>
                <span className="opacity-40">·</span>
                <span className="text-[11px] font-normal opacity-60">{settings.searchEngine}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsFocused(false)}
                aria-label="Close suggestions"
                className="w-7 h-7 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-1.5 divide-y divide-current/5">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSuggestionClick(item.label)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between group transition-colors min-h-[44px] ${
                    isLight
                      ? 'hover:bg-slate-100/90 text-slate-800'
                      : 'hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {item.type === 'url' ? (
                      <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-violet-400 shrink-0" />
                    )}
                    <span className="text-xs truncate font-medium">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-mono opacity-50 shrink-0">
                    {item.domain}
                  </span>
                </button>
              ))}
            </div>

            <div className="px-3.5 py-2 border-t border-current/5 bg-black/5 flex items-center justify-between text-[11px] opacity-60">
              <span>Press Enter to search</span>
              <span className="flex items-center gap-1 text-emerald-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Encrypted Query
              </span>
            </div>
          </GlassSurface>
        </div>
      )}

      {/* Main Safari-Style Floating Liquid Glass Nav Bar */}
      <GlassSurface
        variant="floating"
        isLight={isLight}
        isPrivate={isPrivateMode}
        blurLevel={settings.glassBlurLevel}
        className="rounded-3xl p-1.5 sm:p-2"
      >
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Back Navigation Button */}
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            title="Go back"
            aria-label="Back"
            className={`min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center rounded-2xl transition-all duration-150 active:scale-95 ${
              canGoBack
                ? 'opacity-85 hover:opacity-100 hover:bg-white/10 active:bg-white/15'
                : 'opacity-25 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Forward Navigation Button */}
          <button
            type="button"
            onClick={onForward}
            disabled={!canGoForward}
            title="Go forward"
            aria-label="Forward"
            className={`min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center rounded-2xl transition-all duration-150 active:scale-95 ${
              canGoForward
                ? 'opacity-85 hover:opacity-100 hover:bg-white/10 active:bg-white/15'
                : 'opacity-25 cursor-not-allowed'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Interactive Address / Search Omnibox */}
          <form onSubmit={handleSubmit} className="relative flex-1 min-w-0">
            <div
              className={`relative flex items-center h-10 px-3 rounded-2xl transition-all duration-200 ${
                isFocused
                  ? isLight
                    ? 'bg-white ring-2 ring-violet-500/60 shadow-sm'
                    : 'bg-white/15 ring-2 ring-cyan-400/60 shadow-sm'
                  : isLight
                  ? 'bg-slate-100/90 hover:bg-slate-200/80'
                  : 'bg-white/[0.07] hover:bg-white/[0.12]'
              }`}
            >
              {/* Security Lock or Search Glyph (Clickable for Site Permissions) */}
              <button
                type="button"
                onClick={onOpenSiteSettings}
                title="View Site Permissions & TLS Security"
                className="mr-2 shrink-0 hover:scale-110 transition-transform cursor-pointer"
              >
                {inputValue.startsWith('http') ? (
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </button>

              {/* Text Input */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Search or enter address..."
                className="w-full bg-transparent text-xs font-medium focus:outline-none placeholder:text-current placeholder:opacity-40 select-text"
              />

              {/* Clear Action */}
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    inputRef.current?.focus();
                  }}
                  title="Clear input"
                  aria-label="Clear text"
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 opacity-60 hover:opacity-100 transition-opacity ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </form>

          {/* Downloads Action Button */}
          <button
            type="button"
            onClick={onOpenDownloads}
            title="Downloads Manager (Turbo Acceleration)"
            aria-label="Downloads"
            className="relative min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all active:scale-95 text-current"
          >
            <Download className={`w-4 h-4 ${hasActiveDownloads ? 'text-cyan-400 animate-bounce' : 'opacity-80 hover:opacity-100'}`} />
            {hasActiveDownloads && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
            )}
          </button>

          {/* Tab Switcher Button with Active Badge */}
          <button
            type="button"
            onClick={onOpenTabs}
            title="Tabs overview"
            aria-label={`Open tabs (${tabCount})`}
            className="relative min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-2xl hover:bg-white/10 active:scale-95 transition-all"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 border-current/40 hover:border-current/80 flex items-center justify-center font-bold text-[11px] tabular-nums transition-colors">
              {tabCount}
              {isPrivateMode && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-slate-900" />
              )}
            </div>
          </button>

          {/* Chrome 3-Dot Options Menu Button */}
          <button
            type="button"
            onClick={onOpenChromeMenu}
            title="Chrome Options (ক্রোম অপশন)"
            aria-label="Chrome options"
            className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-2xl opacity-80 hover:opacity-100 hover:bg-white/10 active:bg-white/15 transition-all active:scale-95"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </GlassSurface>
    </nav>
  );
};
