import React from 'react';
import {
  Plus,
  Shield,
  History,
  Download,
  Bookmark,
  Search,
  Languages,
  Monitor,
  ZoomIn,
  Key,
  Printer,
  Sliders,
  Terminal,
  Puzzle,
  Share2,
  Lock,
  Layers,
  RotateCw,
  Trash2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface ChromeOverflowMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNewTab: () => void;
  onNewIncognitoTab: () => void;
  onOpenHistory: () => void;
  onOpenDownloads: () => void;
  onOpenBookmarks: () => void;
  onOpenReadingList: () => void;
  onOpenFindInPage: () => void;
  onOpenTranslate: () => void;
  isDesktopSite: boolean;
  onToggleDesktopSite: () => void;
  onOpenPasswords: () => void;
  onOpenPrint: () => void;
  onOpenSiteSettings: () => void;
  onOpenDevTools: () => void;
  onOpenExtensions: () => void;
  onOpenTabGroups: () => void;
  onOpenSettings: () => void;
  onClearData: () => void;
  onShare: () => void;
  onReload: () => void;
  isLight?: boolean;
}

export const ChromeOverflowMenu: React.FC<ChromeOverflowMenuProps> = ({
  isOpen,
  onClose,
  onNewTab,
  onNewIncognitoTab,
  onOpenHistory,
  onOpenDownloads,
  onOpenBookmarks,
  onOpenReadingList,
  onOpenFindInPage,
  onOpenTranslate,
  isDesktopSite,
  onToggleDesktopSite,
  onOpenPasswords,
  onOpenPrint,
  onOpenSiteSettings,
  onOpenDevTools,
  onOpenExtensions,
  onOpenTabGroups,
  onOpenSettings,
  onClearData,
  onShare,
  onReload,
  isLight = false,
}) => {
  if (!isOpen) return null;

  const handleAction = (callback: () => void) => {
    callback();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chrome options menu"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-2 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-80 max-h-[88vh] overflow-y-auto mb-16 sm:mb-0 rounded-3xl shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassSurface
          variant="sheet"
          isLight={isLight}
          className="rounded-3xl p-2 divide-y divide-current/10 overflow-hidden"
        >
          {/* Quick Action Top Bar (Reload, Bookmark, Download, Share, Site Info) */}
          <div className="grid grid-cols-5 gap-1 p-1">
            <button
              type="button"
              onClick={() => handleAction(onReload)}
              title="Reload page"
              className="p-2.5 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-current"
            >
              <RotateCw className="w-4 h-4" />
              <span className="text-[9px] mt-1 opacity-70">Reload</span>
            </button>
            <button
              type="button"
              onClick={() => handleAction(onOpenBookmarks)}
              title="Bookmarks"
              className="p-2.5 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-current"
            >
              <Bookmark className="w-4 h-4 text-violet-400" />
              <span className="text-[9px] mt-1 opacity-70">Saved</span>
            </button>
            <button
              type="button"
              onClick={() => handleAction(onOpenDownloads)}
              title="Turbo Downloads"
              className="p-2.5 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-current"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span className="text-[9px] mt-1 opacity-70">Downloads</span>
            </button>
            <button
              type="button"
              onClick={() => handleAction(onOpenSiteSettings)}
              title="Page Info & Security"
              className="p-2.5 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-current"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="text-[9px] mt-1 opacity-70">Page Info</span>
            </button>
            <button
              type="button"
              onClick={() => handleAction(onShare)}
              title="Share Page"
              className="p-2.5 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-current"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span className="text-[9px] mt-1 opacity-70">Share</span>
            </button>
          </div>

          {/* Primary Chrome Navigation */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => handleAction(onNewTab)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>New tab</span>
              </span>
              <span className="text-[10px] opacity-40 font-mono">Ctrl+T</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction(onNewIncognitoTab)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>New Incognito tab</span>
              </span>
              <span className="text-[10px] opacity-40 font-mono">Ctrl+Shift+N</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction(onOpenTabGroups)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Tab groups</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">Chrome Grid</span>
            </button>
          </div>

          {/* Library & Tools */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => handleAction(onOpenHistory)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <History className="w-4 h-4 text-slate-400" />
                <span>History</span>
              </span>
              <span className="text-[10px] opacity-40 font-mono">Ctrl+H</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction(onOpenReadingList)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Reading list</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleAction(onOpenFindInPage)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Find in page</span>
              </span>
              <span className="text-[10px] opacity-40 font-mono">Ctrl+F</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction(onOpenTranslate)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Languages className="w-4 h-4 text-violet-400" />
                <span>Translate... (বাংলা / English)</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 font-mono">Google</span>
            </button>

            {/* Desktop Site Checkbox */}
            <button
              type="button"
              onClick={() => handleAction(onToggleDesktopSite)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Monitor className="w-4 h-4 text-blue-400" />
                <span>Desktop site</span>
              </span>
              <input
                type="checkbox"
                readOnly
                checked={isDesktopSite}
                className="w-4 h-4 accent-violet-600 rounded cursor-pointer pointer-events-none"
              />
            </button>
          </div>

          {/* Chrome Advanced & Security */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => handleAction(onOpenPasswords)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Key className="w-4 h-4 text-amber-400" />
                <span>Password Manager & Autofill</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono">Google Vault</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction(onOpenExtensions)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Puzzle className="w-4 h-4 text-fuchsia-400" />
                <span>Extensions & Add-ons</span>
              </span>
              <span className="text-[10px] opacity-40 font-mono">WebStore</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction(onOpenPrint)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-slate-300" />
                <span>Print or Save to PDF</span>
              </span>
              <span className="text-[10px] opacity-40 font-mono">Ctrl+P</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction(onOpenDevTools)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Chrome DevTools (Inspect)</span>
              </span>
              <span className="text-[10px] opacity-40 font-mono">F12</span>
            </button>
          </div>

          {/* System Settings & Clear Data */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => handleAction(onOpenSettings)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-white/10 active:bg-white/15 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Settings</span>
              </span>
            </button>

            <a
              href="/aether-browser-project.zip"
              download="aether-browser-project.zip"
              onClick={onClose}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>প্রজেক্ট ZIP ডাউনলোড (APK ফাইলস)</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">.ZIP</span>
            </a>

            <button
              type="button"
              onClick={() => handleAction(onClearData)}
              className="w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium hover:bg-rose-500/10 text-rose-300 active:bg-rose-500/20 transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Clear browsing data</span>
              </span>
            </button>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};
