import React, { useState, useEffect } from 'react';
import {
  Lock,
  RotateCw,
  Share2,
  Bookmark,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Home,
  Check,
  AlertTriangle,
  Download,
  Square,
  ShieldAlert,
  X,
  FileDown,
  WifiOff,
  MoreVertical,
  Monitor,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Languages
} from 'lucide-react';
import { GlassSurface } from './GlassSurface';
import { FindInPageBar } from './FindInPageBar';
import { GoogleTranslateBar } from './GoogleTranslateBar';

interface SimulatedWebScreenProps {
  url: string;
  onClose: () => void;
  onOpenShare: () => void;
  onAddBookmark: (title: string, url: string) => void;
  onRemoveBookmark: (url: string) => void;
  isBookmarked: boolean;
  onTriggerDownload: (filename: string, url: string, size: string) => void;
  onOpenChromeMenu?: () => void;
  onOpenSiteSettings?: () => void;
  isDesktopSite?: boolean;
  onToggleDesktopSite?: () => void;
  showFindInPage?: boolean;
  onCloseFindInPage?: () => void;
  showTranslate?: boolean;
  onCloseTranslate?: () => void;
  isLight?: boolean;
}

export const SimulatedWebScreen: React.FC<SimulatedWebScreenProps> = ({
  url,
  onClose,
  onOpenShare,
  onAddBookmark,
  onRemoveBookmark,
  isBookmarked,
  onTriggerDownload,
  onOpenChromeMenu,
  onOpenSiteSettings,
  isDesktopSite = false,
  onToggleDesktopSite,
  showFindInPage = false,
  onCloseFindInPage,
  showTranslate = false,
  onCloseTranslate,
  isLight = false,
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Chrome Find in Page state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // Chrome Google Translate state
  const [isTranslated, setIsTranslated] = useState(false);
  const [targetLang, setTargetLang] = useState('বাংলা');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isTlsError =
    url.toLowerCase().includes('expired') ||
    url.toLowerCase().includes('untrusted') ||
    url.toLowerCase().includes('insecure');
  const isOffline =
    !isOnline ||
    url.toLowerCase().includes('offline') ||
    url.toLowerCase().includes('disconnected');

  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(15);
    const t1 = setTimeout(() => setLoadingProgress(65), 180);
    const t2 = setTimeout(() => {
      setLoadingProgress(100);
      setIsLoading(false);
    }, 450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [url]);

  const cleanDomain = url
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .toLowerCase();

  const handleReload = () => {
    setIsLoading(true);
    setLoadingProgress(10);
    setTimeout(() => setLoadingProgress(70), 150);
    setTimeout(() => {
      setLoadingProgress(100);
      setIsLoading(false);
    }, 380);
  };

  const handleStop = () => {
    setIsLoading(false);
    setLoadingProgress(100);
  };

  // Helper to highlight matching text in page for Chrome Find on Page
  const highlightMatches = (text: string) => {
    if (!searchTerm.trim()) return text;
    const parts = text.split(new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={i} className="bg-amber-400 text-black px-0.5 rounded font-bold shadow-xs">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Calculate total matches on screen
  const calculateTotalMatches = () => {
    if (!searchTerm.trim()) return 0;
    const bodyText = `${cleanDomain} chromium android webview tls safe browsing secure session`.toLowerCase();
    const matches = bodyText.split(searchTerm.toLowerCase()).length - 1;
    return Math.max(matches, 3);
  };

  return (
    <div
      className={`relative flex-1 flex flex-col overflow-hidden ${
        isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#0B0D13] text-slate-100'
      }`}
    >
      {/* Top Browser Header with Chrome Controls */}
      <GlassSurface
        variant="floating"
        isLight={isLight}
        className="px-3 py-2 border-b flex items-center justify-between gap-2 shadow-sm rounded-none z-20 shrink-0"
      >
        <button
          type="button"
          onClick={onClose}
          className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-xl hover:bg-white/10 opacity-75 hover:opacity-100 transition-colors"
          title="Return to Home"
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Center Domain & SSL Badge Pill (Click opens Site Settings & Permissions) */}
        <button
          type="button"
          onClick={onOpenSiteSettings}
          title="View Site Permissions & TLS Security"
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-3 rounded-full text-xs font-mono font-medium max-w-[240px] truncate transition-all active:scale-95 ${
            isTlsError
              ? 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/40'
              : isLight
              ? 'bg-slate-200/70 text-slate-800'
              : 'bg-white/10 text-slate-200 hover:bg-white/15'
          }`}
        >
          {isTlsError ? (
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          )}
          <span className="truncate">{cleanDomain || 'aether.io'}</span>
          {isDesktopSite && (
            <span className="text-[9px] px-1 rounded bg-blue-500/20 text-blue-300 uppercase font-sans">
              Desktop
            </span>
          )}
        </button>

        {/* Quick Actions & Chrome 3-Dot Overflow Menu */}
        <div className="flex items-center gap-1">
          {/* Reader Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsReaderMode(!isReaderMode)}
            className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl transition-colors ${
              isReaderMode
                ? 'bg-violet-600 text-white'
                : 'hover:bg-white/10 opacity-70 hover:opacity-100'
            }`}
            title="Toggle Reader Mode"
            aria-label="Reader Mode"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Bookmark Toggle */}
          <button
            type="button"
            onClick={() => {
              if (isBookmarked) {
                onRemoveBookmark(url);
              } else {
                onAddBookmark(cleanDomain || 'Page', url);
              }
            }}
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl hover:bg-white/10 opacity-80 hover:opacity-100 transition-colors"
            title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-violet-400 text-violet-400' : ''}`} />
          </button>

          {/* Reload or Stop */}
          {isLoading ? (
            <button
              type="button"
              onClick={handleStop}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl hover:bg-white/10 text-rose-400 transition-colors"
              title="Stop Loading"
              aria-label="Stop"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReload}
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl hover:bg-white/10 opacity-70 hover:opacity-100 transition-colors"
              title="Reload Page"
              aria-label="Reload"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          )}

          {/* Chrome 3-Dot Overflow Menu Button */}
          <button
            type="button"
            onClick={onOpenChromeMenu}
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl hover:bg-white/10 active:scale-95 transition-all text-current"
            title="Chrome Options (ক্রোম মেনু)"
            aria-label="Chrome Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </GlassSurface>

      {/* Real Loading Progress Bar */}
      {loadingProgress < 100 && (
        <div className="h-0.5 w-full bg-transparent overflow-hidden shrink-0">
          <div
            className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 transition-all duration-200 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      )}

      {/* Chrome Find in Page Bar */}
      {showFindInPage && onCloseFindInPage && (
        <FindInPageBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentMatchIndex={currentMatchIndex}
          totalMatches={calculateTotalMatches()}
          onNextMatch={() => setCurrentMatchIndex((prev) => (prev + 1) % Math.max(1, calculateTotalMatches()))}
          onPrevMatch={() => setCurrentMatchIndex((prev) => (prev - 1 + calculateTotalMatches()) % Math.max(1, calculateTotalMatches()))}
          onClose={onCloseFindInPage}
          isLight={isLight}
        />
      )}

      {/* Chrome Google Translate Bar */}
      {showTranslate && onCloseTranslate && (
        <GoogleTranslateBar
          sourceLang="English"
          targetLang={targetLang}
          isTranslated={isTranslated}
          onToggleTranslate={() => setIsTranslated(!isTranslated)}
          onSelectTargetLang={(lang) => {
            setTargetLang(lang);
            setIsTranslated(true);
          }}
          onClose={onCloseTranslate}
          isLight={isLight}
        />
      )}

      {/* Main Web View / Content Body */}
      {isTlsError ? (
        /* Strict TLS Security Blocker Screen */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h2 className="text-base font-extrabold text-white">Your connection is not private</h2>
            <p className="text-xs opacity-75 leading-relaxed">
              Attackers might be trying to steal your information from <strong>{cleanDomain}</strong>. Aether Browser strictly forbids bypassing TLS/SSL certificate failures.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 font-mono text-[11px] text-rose-300">
            NET::ERR_CERT_AUTHORITY_INVALID
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-lg active:scale-95"
          >
            Back to Safety
          </button>
        </div>
      ) : isOffline ? (
        /* Offline Dinosaur / Network Error Screen */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <WifiOff className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h2 className="text-base font-extrabold text-white">No internet connection</h2>
            <p className="text-xs opacity-75 leading-relaxed">
              Aether Browser could not connect to <strong>{cleanDomain}</strong>. Check your cellular data or Wi-Fi settings.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 font-mono text-[11px] text-amber-300">
            ERR_INTERNET_DISCONNECTED
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleReload}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors shadow-lg active:scale-95"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-white/10 text-white hover:bg-white/15 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      ) : (
        /* Web Content Body with Desktop Mode & Zoom transformation */
        <div
          className="flex-1 overflow-y-auto p-4 pb-28 space-y-4 transition-all duration-200"
          style={{
            zoom: `${zoomLevel}%`,
            maxWidth: isDesktopSite ? '1024px' : '100%',
            margin: isDesktopSite ? '0 auto' : '0',
          }}
        >
          {/* Chromium Engine & Chrome Features Status Banner */}
          <GlassSurface
            variant="card"
            isLight={isLight}
            className="p-4 rounded-2xl border shadow-lg space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>
                  {isTranslated ? 'Google Translate (সক্রিয় অনুবাদ)' : 'Chromium WebView Engine'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {isDesktopSite && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-mono uppercase">
                    Desktop View
                  </span>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono uppercase">
                  Chrome Core
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed opacity-85">
              {isTranslated
                ? highlightMatches(
                    `${url} এর জন্য গুগল অনুবাদ সক্রিয় করা হয়েছে। ক্রোমিয়াম আর্কিটেকচার, কঠোর টিএলএস এবং সেফ ব্রাউজিং দ্বারা চালিত।`
                  )
                : highlightMatches(
                    `Active web session for ${url}. Backed by installed Chromium provider with strict TLS enforcement, DownloadManager integration, and Safe Browsing.`
                  )}
            </p>

            {/* Quick in-page Chrome utilities: Zoom controls & PDF export */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] opacity-75 border-t border-current/10">
              <div className="flex items-center gap-1">
                <span className="opacity-60">Zoom:</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                  title="Zoom out"
                  className="p-1 rounded-md hover:bg-white/10"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-cyan-400 font-bold">{zoomLevel}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                  title="Zoom in"
                  className="p-1 rounded-md hover:bg-white/10"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  onTriggerDownload(
                    `${cleanDomain || 'document'}_export.pdf`,
                    url,
                    '2.4 MB'
                  )
                }
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                {isTranslated ? 'টার্বো ডাউনলোড' : 'Test Turbo Download'}
              </button>
            </div>
          </GlassSurface>

          {/* Article / Web Page Layout */}
          <article
            className={`p-5 rounded-3xl border shadow-xl space-y-4 ${
              isReaderMode
                ? 'bg-amber-50 text-slate-900 border-amber-200'
                : isLight
                ? 'bg-white border-slate-200/90'
                : 'bg-white/[0.04] border-white/10'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] opacity-60">
                <span className="text-violet-400 font-semibold">Web Navigation</span>
                <span>·</span>
                <span>HTTPS Enforced</span>
                <span>·</span>
                <span>JavaScript Sandboxed</span>
                {isDesktopSite && <span>· Desktop Agent</span>}
              </div>

              <h1 className="text-lg font-extrabold leading-tight text-balance">
                {isTranslated
                  ? highlightMatches(
                      cleanDomain.includes('github')
                        ? 'গিটহাব: উচ্চ কর্মক্ষমতা সম্পন্ন অ্যান্ড্রয়েড ক্রোমিয়াম ইন্টিগ্রেশন'
                        : cleanDomain.includes('wikipedia')
                        ? 'উইকিপিডিয়া: ট্রান্সপোর্ট লেয়ার সিকিউরিটি এবং নিরাপদ ব্রাউজিং'
                        : `${cleanDomain || 'এথার ইঞ্জিন'} ব্রাউজিং`
                    )
                  : highlightMatches(
                      cleanDomain.includes('github')
                        ? 'GitHub: High Performance Android Chromium Integration'
                        : cleanDomain.includes('wikipedia')
                        ? 'Wikipedia: Transport Layer Security & Safe Browsing Standards'
                        : `Browsing ${cleanDomain || 'Aether Engine'}`
                    )}
              </h1>

              <div className="flex items-center justify-between pt-1 text-xs opacity-70 border-b pb-3 border-current/10">
                <span>URL: {url}</span>
                <span className="font-mono text-emerald-400">Secure 200 OK</span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed opacity-85">
              <p>
                {isTranslated
                  ? highlightMatches(
                      'এথার ব্রাউজারে ক্রোম ব্রাউজারের সকল আধুনিক সুবিধা একীভূত করা হয়েছে—ট্যাব গ্রুপ, গুগল পাসওয়ার্ড ম্যানেজার, পেজ অনুবাদ (Translate), ফাইন্ড ইন পেজ (Ctrl+F), ডেস্কটপ সাইট এবং এক্সটেনশন।'
                    )
                  : highlightMatches(
                      'In Aether Browser, all power features of Google Chrome have been unified with high-craft Liquid Glass aesthetics—including Tab Groups, Google Password Manager, in-page Google Translate, Find in Page (Ctrl+F), Desktop Site, and Chrome Extensions.'
                    )}
              </p>
              <p>
                {isTranslated
                  ? highlightMatches(
                      'প্রতিটি ট্যাব নিজস্ব ক্রোমিয়াম ওয়েবভিউ ইনস্ট্যান্সে চলে। কুকিজ, সেশন ডেটা এবং ওয়েবস্টোরেজ কঠোর সুরক্ষায় এনক্রিপ্ট করা।'
                    )
                  : highlightMatches(
                      'Every tab operates an isolated WebView instance. Cookies, HTTP cache, and WebStorage are segregated per window, and can be inspected via DevTools or wiped via Clear Browsing Data.'
                    )}
              </p>

              <div
                className={`p-3.5 rounded-2xl border ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-white/5 border-white/10 text-cyan-200'
                }`}
              >
                <div className="font-mono text-[11px] font-semibold mb-1">
                  // Chrome Suite Features Active
                </div>
                <div className="font-mono text-[10px] opacity-80 space-y-0.5">
                  <div>1. Tab Groups & Grid Overview (ট্যাব গ্রুপ)</div>
                  <div>2. Google Password Manager Vault & Autofill (পাসওয়ার্ড ম্যানেজার)</div>
                  <div>3. Google Translate with বাংলা Bengali & Multilingual Engine</div>
                  <div>4. Find in Page (Ctrl+F) with dynamic text search</div>
                  <div>5. Desktop Site User-Agent switcher</div>
                  <div>6. Chrome DevTools (Console, Network, Elements, Storage)</div>
                  <div>7. Site Permissions & TLS 1.3 Certificate Inspector</div>
                  <div>8. Save as PDF / Print Spooler</div>
                  <div>9. Extensions Manager (uBlock, Dark Reader, Translate)</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-current/10">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <Home className="w-3.5 h-3.5" /> Return to Home
              </button>
              <button
                type="button"
                onClick={onOpenShare}
                className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-1.5 opacity-80 hover:opacity-100 active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
