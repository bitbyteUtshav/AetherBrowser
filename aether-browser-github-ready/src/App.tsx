/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Maximize2,
  Code2,
  Moon,
  Sun,
  Shield,
  Wifi,
  Signal,
  Battery,
  Sparkles,
  Layers,
  Search,
  Settings,
  Tablet,
  Bookmark,
  Download,
  RotateCcw,
  PauseCircle,
  PlayCircle,
  CheckCircle2,
  Package
} from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { FloatingOmnibar } from './components/FloatingOmnibar';
import { SimulatedWebScreen } from './components/SimulatedWebScreen';
import { TabsSwitcherModal } from './components/TabsSwitcherModal';
import { SettingsModal } from './components/SettingsModal';
import { ShareSheetModal } from './components/ShareSheetModal';
import { PrivacyShieldModal } from './components/PrivacyShieldModal';
import { BookmarksHistoryModal } from './components/BookmarksHistoryModal';
import { DownloadsModal } from './components/DownloadsModal';
import { KotlinCodeViewer } from './components/KotlinCodeViewer';
import { ChromeOverflowMenu } from './components/ChromeOverflowMenu';
import { SiteSettingsModal } from './components/SiteSettingsModal';
import { PasswordManagerModal } from './components/PasswordManagerModal';
import { DevToolsDrawer } from './components/DevToolsDrawer';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { ExtensionsModal } from './components/ExtensionsModal';
import {
  QuickTile,
  RecentSite,
  TabItem,
  BrowserSettings,
  BookmarkItem,
  HistoryItem,
  DownloadItem,
  TabGroup,
  ClosedTabItem,
  ReadingListItem,
} from './types/browser';

export default function App() {
  // Screen and viewport modes: 'pixel' (Pixel 9 Pro), 'compact' (Small phone 360px), 'tablet' (Full Canvas), 'code' (Kotlin source)
  const [viewMode, setViewMode] = useState<'pixel' | 'compact' | 'tablet' | 'code'>('pixel');
  const [isLandscape, setIsLandscape] = useState(false);
  const [isAppPaused, setIsAppPaused] = useState(false); // Simulates Android lifecycle onPause / onResume

  // Browser Settings State
  const [settings, setSettings] = useState<BrowserSettings>({
    theme: 'dark',
    searchEngine: 'Google',
    trackingProtection: true,
    httpsOnly: true,
    glassBlurLevel: 'medium',
    specularGloss: true,
    cookiesBlocked: 26,
    trackersBlocked: 48,
    safeBrowsingEnabled: true,
    javascriptEnabled: true,
    turboDownloadEnabled: true,
    highPriorityNetwork: true,
    extremeSecurityScan: true,
    downloadLocation: '/sdcard/Download (Aether Vault)',
  });

  // Persistent Bookmarks State with localStorage sync
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('aether_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading bookmarks from localStorage', e);
    }
    return [
      { id: 'bm-1', title: 'GitHub: Where the world builds', url: 'https://github.com', createdAt: Date.now() - 86400000 },
      { id: 'bm-2', title: 'Wikipedia: Transport Layer Security', url: 'https://en.wikipedia.org/wiki/Transport_Layer_Security', createdAt: Date.now() - 172800000 },
      { id: 'bm-3', title: 'Android Developers: WebKit Guide', url: 'https://developer.android.com/develop/ui/views/layout/webapps/webview', createdAt: Date.now() - 259200000 },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('aether_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed saving bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  // Persistent Browsing History State with localStorage sync
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('aether_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading history from localStorage', e);
    }
    return [
      { id: 'h-1', title: 'GitHub', url: 'https://github.com', visitedAt: Date.now() - 3600000 },
      { id: 'h-2', title: 'Wikipedia', url: 'https://en.wikipedia.org', visitedAt: Date.now() - 7200000 },
      { id: 'h-3', title: 'Figma', url: 'https://figma.com', visitedAt: Date.now() - 14400000 },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('aether_history', JSON.stringify(historyItems));
    } catch (e) {
      console.warn('Failed saving history to localStorage', e);
    }
  }, [historyItems]);

  // Downloads Queue
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: 'dl-1',
      filename: 'aether_phase2_architecture.pdf',
      url: 'https://aether.io/docs/architecture.pdf',
      size: '1.8 MB',
      progress: 100,
      speed: '28.4 MB/s',
      eta: 'Completed',
      status: 'completed',
      timestamp: Date.now() - 120000,
      securityStatus: 'verified_safe',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      threads: 8,
    }
  ]);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Tabs State (Each tab maintains its own independent history, URL, title, progress)
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: 'tab-1',
      title: 'Aether Start',
      url: '',
      isPrivate: false,
      timestamp: Date.now(),
      progress: 0,
      history: [],
      historyIndex: -1,
      sslStatus: 'secure',
    },
    {
      id: 'tab-2',
      title: 'GitHub: Where the world builds',
      url: 'https://github.com',
      isPrivate: false,
      timestamp: Date.now() - 3600000,
      progress: 100,
      history: ['https://github.com'],
      historyIndex: 0,
      sslStatus: 'secure',
    },
    {
      id: 'tab-3',
      title: 'Wikipedia: Transport Layer Security',
      url: 'https://en.wikipedia.org/wiki/Transport_Layer_Security',
      isPrivate: false,
      timestamp: Date.now() - 7200000,
      progress: 100,
      history: ['https://en.wikipedia.org/wiki/Transport_Layer_Security'],
      historyIndex: 0,
      sslStatus: 'secure',
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');

  // Modals Visibility
  const [showTabsModal, setShowTabsModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showBookmarksModal, setShowBookmarksModal] = useState<boolean>(false);
  const [showDownloadsModal, setShowDownloadsModal] = useState<boolean>(false);

  // Chrome Power Features States
  const [showChromeMenu, setShowChromeMenu] = useState<boolean>(false);
  const [showFindInPage, setShowFindInPage] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const [showSiteSettings, setShowSiteSettings] = useState<boolean>(false);
  const [showPasswordManager, setShowPasswordManager] = useState<boolean>(false);
  const [showDevTools, setShowDevTools] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [showExtensionsModal, setShowExtensionsModal] = useState<boolean>(false);
  const [isDesktopSite, setIsDesktopSite] = useState<boolean>(false);

  // Chrome Tab Groups & Closed Tabs States
  const [tabGroups, setTabGroups] = useState<TabGroup[]>([
    { id: 'grp-work', name: 'Work', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', tabIds: ['tab-2'] },
    { id: 'grp-research', name: 'Research', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', tabIds: ['tab-3'] },
    { id: 'grp-social', name: 'Social', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', tabIds: [] },
  ]);
  const [closedTabs, setClosedTabs] = useState<ClosedTabItem[]>([
    { id: 'closed-1', title: 'Android Developers: Jetpack Compose Material 3', url: 'https://developer.android.com', closedAt: Date.now() - 120000, isPrivate: false },
    { id: 'closed-2', title: 'Chromium Source: Multi-Process Architecture', url: 'https://chromium.googlesource.com', closedAt: Date.now() - 360000, isPrivate: false },
  ]);
  const [readingList, setReadingList] = useState<ReadingListItem[]>([
    { id: 'rl-1', title: 'Android Chromium WebView Architecture', url: 'https://developer.android.com', domain: 'developer.android.com', addedAt: Date.now() - 86400000, read: false },
    { id: 'rl-2', title: 'High Performance Browser Networking', url: 'https://hpbn.co', domain: 'hpbn.co', addedAt: Date.now() - 172800000, read: true },
  ]);

  // Quick Access Tiles State
  const [quickTiles, setQuickTiles] = useState<QuickTile[]>([
    { id: '1', title: 'GitHub', domain: 'github.com', category: 'Dev', color: '#8B5CF6', iconName: 'Github' },
    { id: '2', title: 'Wikipedia', domain: 'wikipedia.org', category: 'Knowledge', color: '#38BDF8', iconName: 'Wikipedia' },
    { id: '3', title: 'Figma', domain: 'figma.com', category: 'Design', color: '#6366F1', iconName: 'Figma' },
    { id: '4', title: 'Hacker News', domain: 'news.ycombinator.com', category: 'Tech', color: '#F97316', iconName: 'Flame' },
    { id: '5', title: 'Reddit', domain: 'reddit.com', category: 'Community', color: '#EF4444', iconName: 'Globe' },
    { id: '6', title: 'ArXiv', domain: 'arxiv.org', category: 'Science', color: '#10B981', iconName: 'FileText' },
    { id: '7', title: 'Dribbble', domain: 'dribbble.com', category: 'Inspiration', color: '#EC4899', iconName: 'Dribbble' },
    { id: '8', title: 'Radio Ethereal', domain: 'radio.aether.io', category: 'Audio', color: '#A855F7', iconName: 'Radio' },
  ]);

  // Recent Sites Feed
  const [recentSites, setRecentSites] = useState<RecentSite[]>([
    {
      id: 'r1',
      title: 'Phase 2: Android Chromium WebView Architecture',
      url: 'https://developer.android.com/develop/ui/views/layout/webapps/webview',
      timeAgo: '10m ago',
      readingTime: '5 min',
      snippet: 'Deep dive into single-activity Jetpack Compose integration with AndroidView, DownloadManager, and strict TLS cancellation.',
      category: 'Engineering'
    },
    {
      id: 'r2',
      title: 'Transport Layer Security 1.3 & Safe Browsing Standards',
      url: 'https://en.wikipedia.org/wiki/Transport_Layer_Security',
      timeAgo: '1h ago',
      readingTime: '6 min',
      snippet: 'Why modern mobile browsers reject broken TLS certificates and delegate malicious threat mitigation to Google Safe Browsing.',
      category: 'Security'
    },
    {
      id: 'r3',
      title: 'Translucent Spatial UI in Post-Flat Operating Systems',
      url: 'https://chronicles.ethereal.tech/spatial-glass',
      timeAgo: 'Yesterday',
      readingTime: '3 min',
      snippet: 'How mathematical restraint and high-DPI displays enable authentic optical depth without excessive distraction.',
      category: 'Research'
    }
  ]);

  // Clock for Android status bar
  const [currentTime, setCurrentTime] = useState<string>('9:41');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const isPrivateMode = activeTab?.isPrivate || false;
  const canGoBack = activeTab.historyIndex > 0 || (activeTab.historyIndex === 0 && activeTab.url !== '');
  const canGoForward = activeTab.historyIndex < activeTab.history.length - 1;

  // System Back Handling (Hardware Escape / Keyboard Back)
  useEffect(() => {
    const handleSystemBack = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showChromeMenu) { setShowChromeMenu(false); return; }
        if (showFindInPage) { setShowFindInPage(false); return; }
        if (showTranslate) { setShowTranslate(false); return; }
        if (showSiteSettings) { setShowSiteSettings(false); return; }
        if (showPasswordManager) { setShowPasswordManager(false); return; }
        if (showDevTools) { setShowDevTools(false); return; }
        if (showPrintModal) { setShowPrintModal(false); return; }
        if (showExtensionsModal) { setShowExtensionsModal(false); return; }
        if (showTabsModal) { setShowTabsModal(false); return; }
        if (showSettingsModal) { setShowSettingsModal(false); return; }
        if (showBookmarksModal) { setShowBookmarksModal(false); return; }
        if (showDownloadsModal) { setShowDownloadsModal(false); return; }
        if (showShareModal) { setShowShareModal(false); return; }
        if (showPrivacyModal) { setShowPrivacyModal(false); return; }
        if (canGoBack) {
          handleBack();
        }
      }
    };
    window.addEventListener('keydown', handleSystemBack);
    return () => window.removeEventListener('keydown', handleSystemBack);
  }, [
    showChromeMenu,
    showFindInPage,
    showTranslate,
    showSiteSettings,
    showPasswordManager,
    showDevTools,
    showPrintModal,
    showExtensionsModal,
    showTabsModal,
    showSettingsModal,
    showBookmarksModal,
    showDownloadsModal,
    showShareModal,
    showPrivacyModal,
    canGoBack,
  ]);

  // Handle URL navigation for the ACTIVE tab
  const handleNavigate = (input: string) => {
    let target = input.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      if (target.includes('.') && !target.includes(' ')) {
        target = `https://${target}`;
      } else {
        const searchEngineUrls: Record<string, string> = {
          Google: 'https://www.google.com/search?q=',
          DuckDuckGo: 'https://duckduckgo.com/?q=',
          Ecosia: 'https://www.ecosia.org/search?q=',
          Kagi: 'https://kagi.com/search?q=',
          Brave: 'https://search.brave.com/search?q=',
        };
        const baseUrl = searchEngineUrls[settings.searchEngine] || searchEngineUrls.Google;
        target = `${baseUrl}${encodeURIComponent(target)}`;
      }
    }

    // Check for TLS error simulation
    const isError = target.includes('untrusted') || target.includes('expired');

    // Update active tab state
    setTabs((prev) =>
      prev.map((t) => {
        if (t.id === activeTabId) {
          const newHistory = t.history.slice(0, t.historyIndex + 1);
          newHistory.push(target);
          return {
            ...t,
            url: target,
            title: target.replace(/^https?:\/\//, '').split('/')[0],
            history: newHistory,
            historyIndex: newHistory.length - 1,
            sslStatus: isError ? 'error' : 'secure',
            progress: 100,
          };
        }
        return t;
      })
    );

    // Record in history if not private
    if (!isPrivateMode) {
      setHistoryItems((prev) => [
        {
          id: `h-${Date.now()}`,
          title: target.replace(/^https?:\/\//, '').split('/')[0],
          url: target,
          visitedAt: Date.now(),
        },
        ...prev.slice(0, 49),
      ]);
    }
  };

  const handleBack = () => {
    setTabs((prev) =>
      prev.map((t) => {
        if (t.id === activeTabId) {
          if (t.historyIndex > 0) {
            const newIdx = t.historyIndex - 1;
            const newUrl = t.history[newIdx];
            return {
              ...t,
              url: newUrl,
              historyIndex: newIdx,
              title: newUrl.replace(/^https?:\/\//, '').split('/')[0],
            };
          } else if (t.historyIndex === 0) {
            return {
              ...t,
              url: '',
              historyIndex: -1,
              title: 'Aether Start',
            };
          }
        }
        return t;
      })
    );
  };

  const handleForward = () => {
    setTabs((prev) =>
      prev.map((t) => {
        if (t.id === activeTabId && t.historyIndex < t.history.length - 1) {
          const newIdx = t.historyIndex + 1;
          const newUrl = t.history[newIdx];
          return {
            ...t,
            url: newUrl,
            historyIndex: newIdx,
            title: newUrl.replace(/^https?:\/\//, '').split('/')[0],
          };
        }
        return t;
      })
    );
  };

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    setShowTabsModal(false);
  };

  const handleCloseTab = (id: string) => {
    const targetTab = tabs.find((t) => t.id === id);
    if (targetTab && targetTab.url) {
      setClosedTabs((prev) => [
        {
          id: `closed-${Date.now()}`,
          title: targetTab.title || 'Closed Tab',
          url: targetTab.url,
          closedAt: Date.now(),
          isPrivate: targetTab.isPrivate,
        },
        ...prev.slice(0, 9),
      ]);
    }

    const remaining = tabs.filter((t) => t.id !== id);
    if (remaining.length === 0) {
      const newId = `tab-${Date.now()}`;
      setTabs([
        {
          id: newId,
          title: 'Aether Start',
          url: '',
          isPrivate: false,
          timestamp: Date.now(),
          progress: 0,
          history: [],
          historyIndex: -1,
          sslStatus: 'secure',
        },
      ]);
      setActiveTabId(newId);
    } else {
      setTabs(remaining);
      if (activeTabId === id) {
        setActiveTabId(remaining[remaining.length - 1].id);
      }
    }
  };

  const handleReopenClosedTab = (closedTab: ClosedTabItem) => {
    const newId = `tab-${Date.now()}`;
    const restoredTab: TabItem = {
      id: newId,
      title: closedTab.title,
      url: closedTab.url,
      isPrivate: closedTab.isPrivate,
      timestamp: Date.now(),
      progress: 100,
      history: [closedTab.url],
      historyIndex: 0,
      sslStatus: 'secure',
    };
    setTabs((prev) => [...prev, restoredTab]);
    setActiveTabId(newId);
    setClosedTabs((prev) => prev.filter((t) => t.id !== closedTab.id));
  };

  const handleNewTab = (isPrivate: boolean = false) => {
    const newId = `tab-${Date.now()}`;
    const newTab: TabItem = {
      id: newId,
      title: isPrivate ? 'Private Tab' : 'Aether Start',
      url: '',
      isPrivate,
      timestamp: Date.now(),
      progress: 0,
      history: [],
      historyIndex: -1,
      sslStatus: 'secure',
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
    setShowTabsModal(false);
  };

  const handleCloseAll = () => {
    const newId = `tab-${Date.now()}`;
    setTabs([
      {
        id: newId,
        title: 'Aether Start',
        url: '',
        isPrivate: false,
        timestamp: Date.now(),
        progress: 0,
        history: [],
        historyIndex: -1,
        sslStatus: 'secure',
      },
    ]);
    setActiveTabId(newId);
  };

  const handleAddBookmark = (title: string, url: string) => {
    setBookmarks((prev) => [
      { id: `bm-${Date.now()}`, title, url, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const handleRemoveBookmark = (urlOrId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== urlOrId && b.url !== urlOrId));
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('aether_history');
    } catch (e) {
      console.warn('Failed clearing history from localStorage', e);
    }
    setHistoryItems([]);
  };

  const handleClearBrowsingData = () => {
    try {
      localStorage.removeItem('aether_history');
      localStorage.removeItem('aether_downloads');
    } catch (e) {
      console.warn('Failed clearing localStorage', e);
    }
    setHistoryItems([]);
    setDownloads([]);
    setTabs((prev) =>
      prev.map((t) => ({
        ...t,
        url: '',
        title: 'Aether Start',
        history: [],
        historyIndex: -1,
      }))
    );
  };

  const handleTriggerDownload = (filename: string, url: string, size: string) => {
    const newDlId = `dl-${Date.now()}`;
    const generatedHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newDl: DownloadItem = {
      id: newDlId,
      filename,
      url,
      size,
      progress: 25,
      speed: '31.2 MB/s',
      eta: '1s remaining',
      status: 'downloading',
      timestamp: Date.now(),
      securityStatus: 'scanning',
      sha256Hash: generatedHash,
      threads: 8,
    };
    setDownloads((prev) => [newDl, ...prev]);
    setDownloadToast(`Turbo Downloader: [8 Streams • QoS Priority] Starting ${filename}...`);

    setTimeout(() => {
      setDownloads((prev) =>
        prev.map((d) => (d.id === newDlId ? { ...d, progress: 80, speed: '27.8 MB/s', eta: '< 1s' } : d))
      );
    }, 400);

    setTimeout(() => {
      setDownloads((prev) =>
        prev.map((d) => (d.id === newDlId ? {
          ...d,
          progress: 100,
          speed: '28.5 MB/s',
          eta: 'Completed',
          status: 'completed',
          securityStatus: 'verified_safe',
        } : d))
      );
      setDownloadToast(`🛡️ Verified Safe: ${filename} saved to /sdcard/Download (SHA-256 Passed)`);
      setTimeout(() => setDownloadToast(null), 4000);
    }, 900);
  };

  const isLight = settings.theme === 'light';

  // Compute container dimensions based on viewMode and isLandscape
  let containerDimensions = 'w-[412px] h-[870px] max-h-[92vh] rounded-[48px] border-[10px] border-[#161822] shadow-[0_25px_70px_rgba(0,0,0,0.85)]';
  if (isLandscape && (viewMode === 'pixel' || viewMode === 'compact')) {
    containerDimensions = 'w-[820px] h-[412px] max-w-[94vw] max-h-[85vh] rounded-[36px] border-[10px] border-[#161822] shadow-[0_25px_70px_rgba(0,0,0,0.85)]';
  } else if (viewMode === 'compact') {
    containerDimensions = 'w-[360px] h-[780px] max-h-[90vh] rounded-[40px] border-[8px] border-[#161822] shadow-[0_20px_60px_rgba(0,0,0,0.85)]';
  } else if (viewMode === 'tablet') {
    containerDimensions = 'w-full max-w-4xl h-[86vh] rounded-3xl border border-white/10 shadow-2xl';
  }

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col items-center justify-start antialiased select-none font-sans">
      {/* Top Application Bar following Top Bar Contract */}
      <header className="w-full bg-[#0B0D14]/90 backdrop-blur-xl border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-4 z-30">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.5)]">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-extrabold tracking-wide text-white uppercase whitespace-nowrap">
            Aether Browser
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-cyan-300 font-mono hidden sm:inline">
            Phase 2: Android WebView Active
          </span>
        </div>

        {/* Zone 2: Viewport, Orientation & Lifecycle Switchers */}
        <nav aria-label="Screen mode" className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 gap-1 text-xs shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setViewMode('pixel')}
            className={`min-h-[34px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all whitespace-nowrap ${
              viewMode === 'pixel'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Pixel 9 Pro (412px)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('compact')}
            className={`min-h-[34px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all whitespace-nowrap ${
              viewMode === 'compact'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            Compact (360px)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('tablet')}
            className={`min-h-[34px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all whitespace-nowrap ${
              viewMode === 'tablet'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            Canvas
          </button>
          <button
            type="button"
            onClick={() => setViewMode('code')}
            className={`min-h-[34px] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all whitespace-nowrap ${
              viewMode === 'code'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg shadow-emerald-950/40'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-emerald-300" />
            APK & App ফাইলস
          </button>

          {/* 1-Click Direct Project ZIP Download */}
          <a
            href="/aether-browser-project.zip"
            download="aether-browser-project.zip"
            title="সম্পূর্ণ প্রজেক্ট জিপ ফাইল ডাউনলোড করুন (Ready for Android Studio)"
            onClick={() => {
              setDownloadToast('Aether Browser জিপ ফাইল ডাউনলোড শুরু হয়েছে! (~115 KB)');
              setTimeout(() => setDownloadToast(null), 4000);
            }}
            className="min-h-[34px] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all whitespace-nowrap bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>ZIP ডাউনলোড</span>
          </a>

          {/* Orientation Toggle */}
          <button
            type="button"
            onClick={() => setIsLandscape(!isLandscape)}
            title="Rotate Device (Portrait/Landscape)"
            className={`min-h-[34px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-semibold transition-all ${
              isLandscape ? 'bg-cyan-500/30 text-cyan-200' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isLandscape ? 'Landscape' : 'Rotate'}
          </button>

          {/* Lifecycle Pause/Resume simulation */}
          <button
            type="button"
            onClick={() => setIsAppPaused(!isAppPaused)}
            title="Simulate Android onPause / onResume"
            className={`min-h-[34px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-semibold transition-all ${
              isAppPaused ? 'bg-amber-500/30 text-amber-200' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAppPaused ? <PlayCircle className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
            {isAppPaused ? 'Resumed' : 'Background'}
          </button>
        </nav>

        {/* Zone 3: Quick Shortcuts */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Bookmarks Shortcut */}
          <button
            type="button"
            onClick={() => setShowBookmarksModal(true)}
            title="Bookmarks and History"
            aria-label="Bookmarks"
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Downloads Shortcut */}
          <button
            type="button"
            onClick={() => setShowDownloadsModal(true)}
            title="DownloadManager"
            aria-label="Downloads"
            className="relative min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            {downloads.some((d) => d.status === 'downloading') && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>

          {/* Quick Theme Toggle */}
          <button
            type="button"
            onClick={() =>
              setSettings((s) => ({
                ...s,
                theme: s.theme === 'light' ? 'dark' : 'light',
              }))
            }
            title={settings.theme === 'light' ? 'Switch to Dark Charcoal' : 'Switch to Light Pearl'}
            aria-label="Toggle theme"
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            {settings.theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300" />
            )}
          </button>

          {/* Quick Private Toggle */}
          <button
            type="button"
            onClick={() => handleNewTab(true)}
            title="Open Private Tab"
            aria-label="New private tab"
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 transition-colors"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Download Toast Notification */}
      {downloadToast && (
        <div className="fixed top-14 z-50 px-4 py-2 rounded-2xl bg-slate-900/90 border border-cyan-400/40 text-cyan-200 text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Download className="w-4 h-4 text-cyan-400" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Main Preview Stage */}
      <main className="flex-1 w-full flex items-center justify-center p-2 sm:p-5 overflow-hidden">
        {viewMode === 'code' ? (
          /* Kotlin & Jetpack Compose Source Code Explorer */
          <div className="w-full max-w-5xl h-[84vh] rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col">
            <KotlinCodeViewer />
          </div>
        ) : (
          /* Interactive Android Device Container */
          <div
            className={`relative transition-all duration-300 flex flex-col overflow-hidden ${containerDimensions} ${
              isLight
                ? 'bg-slate-100 text-slate-900'
                : isPrivateMode
                ? 'bg-[#0E0A1A] text-slate-100'
                : 'bg-[#0B0D14] text-slate-100'
            }`}
          >
            {/* Backgrounded App Simulation Overlay */}
            {isAppPaused && (
              <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 space-y-3">
                <PauseCircle className="w-12 h-12 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Application Backgrounded (onPause)</h3>
                <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                  WebViews paused and JS timers suspended to conserve CPU & battery. Tap Resume to bring to foreground.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAppPaused(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
                >
                  Resume Aether Browser
                </button>
              </div>
            )}

            {/* Subtle Ambient Refractive Sheen */}
            <div
              className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
                isPrivateMode ? 'bg-purple-600/15' : 'bg-violet-600/15'
              }`}
            />
            <div
              className={`absolute top-1/2 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
                isPrivateMode ? 'bg-indigo-900/15' : 'bg-cyan-500/10'
              }`}
            />

            {/* Android Dynamic Status Bar */}
            <div className="relative z-30 px-5 pt-3 pb-1.5 flex items-center justify-between text-xs select-none shrink-0">
              <span className="font-semibold tracking-tight text-[13px] tabular-nums">
                {currentTime}
              </span>

              {/* Punch-hole camera (for portrait phone frame views) */}
              {!isLandscape && (viewMode === 'pixel' || viewMode === 'compact') && (
                <div className="absolute left-1/2 top-3 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black ring-2 ring-slate-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-slate-900" />
                </div>
              )}

              <div className="flex items-center gap-1.5">
                {isPrivateMode && (
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                )}
                <Signal className="w-3.5 h-3.5 opacity-85" />
                <Wifi className="w-3.5 h-3.5 opacity-85" />
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono font-bold opacity-80 tabular-nums">98%</span>
                  <Battery className="w-4 h-4 opacity-85" />
                </div>
              </div>
            </div>

            {/* Main Screen Scroll/Content Area */}
            <div className="relative flex-1 flex flex-col overflow-hidden">
              {activeTab.url ? (
                /* Simulated Android WebView Page with real Phase 2 controller binding & Chrome features */
                <SimulatedWebScreen
                  url={activeTab.url}
                  onClose={() => handleNavigate('')}
                  onOpenShare={() => setShowShareModal(true)}
                  onAddBookmark={handleAddBookmark}
                  onRemoveBookmark={handleRemoveBookmark}
                  isBookmarked={bookmarks.some((b) => b.url === activeTab.url)}
                  onTriggerDownload={handleTriggerDownload}
                  onOpenChromeMenu={() => setShowChromeMenu(true)}
                  onOpenSiteSettings={() => setShowSiteSettings(true)}
                  isDesktopSite={isDesktopSite}
                  onToggleDesktopSite={() => setIsDesktopSite(!isDesktopSite)}
                  showFindInPage={showFindInPage}
                  onCloseFindInPage={() => setShowFindInPage(false)}
                  showTranslate={showTranslate}
                  onCloseTranslate={() => setShowTranslate(false)}
                  isLight={isLight}
                />
              ) : (
                /* Aether Home Screen */
                <HomeScreen
                  quickTiles={quickTiles}
                  recentSites={recentSites}
                  onTileClick={(domain) => handleNavigate(domain)}
                  onAddTile={(tile) => {
                    const newTile: QuickTile = {
                      id: `tile-${Date.now()}`,
                      ...tile,
                    };
                    setQuickTiles((prev) => [...prev, newTile]);
                  }}
                  onSiteClick={(url) => handleNavigate(url)}
                  onClearHistory={handleClearHistory}
                  onOpenPrivacyShield={() => setShowPrivacyModal(true)}
                  onOpenDownloads={() => setShowDownloadsModal(true)}
                  downloadCount={downloads.length}
                  trackersBlocked={settings.trackersBlocked}
                  isLight={isLight}
                  isPrivateMode={isPrivateMode}
                />
              )}

              {/* Floating Safari-Style Omnibar with Chrome 3-Dot Options */}
              <FloatingOmnibar
                currentUrl={activeTab.url}
                onNavigate={handleNavigate}
                canGoBack={canGoBack}
                onBack={handleBack}
                canGoForward={canGoForward}
                onForward={handleForward}
                tabCount={tabs.length}
                onOpenTabs={() => setShowTabsModal(true)}
                onOpenSettings={() => setShowSettingsModal(true)}
                onOpenShare={() => setShowShareModal(true)}
                onOpenDownloads={() => setShowDownloadsModal(true)}
                onOpenChromeMenu={() => setShowChromeMenu(true)}
                onOpenSiteSettings={() => setShowSiteSettings(true)}
                hasActiveDownloads={downloads.some((d) => d.status === 'downloading')}
                settings={settings}
                isPrivateMode={isPrivateMode}
              />

              {/* Modals & Overlays */}
              {showTabsModal && (
                <TabsSwitcherModal
                  tabs={tabs}
                  activeTabId={activeTabId}
                  tabGroups={tabGroups}
                  closedTabs={closedTabs}
                  onSelectTab={handleSelectTab}
                  onCloseTab={handleCloseTab}
                  onNewTab={handleNewTab}
                  onCloseAll={handleCloseAll}
                  onCloseModal={() => setShowTabsModal(false)}
                  onReopenClosedTab={handleReopenClosedTab}
                  isLight={isLight}
                />
              )}

              {showSettingsModal && (
                <SettingsModal
                  settings={settings}
                  onUpdateSettings={(newVals) =>
                    setSettings((prev) => ({ ...prev, ...newVals }))
                  }
                  onClearBrowsingData={handleClearBrowsingData}
                  onOpenDownloads={() => setShowDownloadsModal(true)}
                  onClose={() => setShowSettingsModal(false)}
                />
              )}

              {showShareModal && (
                <ShareSheetModal
                  url={activeTab.url}
                  onOpenDownloads={() => setShowDownloadsModal(true)}
                  onClose={() => setShowShareModal(false)}
                  isLight={isLight}
                />
              )}

              {showPrivacyModal && (
                <PrivacyShieldModal
                  onClose={() => setShowPrivacyModal(false)}
                  trackersBlocked={settings.trackersBlocked}
                  cookiesBlocked={settings.cookiesBlocked}
                  isLight={isLight}
                />
              )}

              {showBookmarksModal && (
                <BookmarksHistoryModal
                  bookmarks={bookmarks}
                  history={historyItems}
                  onSelectUrl={handleNavigate}
                  onRemoveBookmark={handleRemoveBookmark}
                  onClearHistory={handleClearHistory}
                  onClose={() => setShowBookmarksModal(false)}
                  isLight={isLight}
                />
              )}

              {showDownloadsModal && (
                <DownloadsModal
                  downloads={downloads}
                  settings={settings}
                  onUpdateSettings={(newVals) =>
                    setSettings((prev) => ({ ...prev, ...newVals }))
                  }
                  onClearDownloads={() => setDownloads([])}
                  onTriggerTestDownload={handleTriggerDownload}
                  onClose={() => setShowDownloadsModal(false)}
                  isLight={isLight}
                />
              )}

              {/* Chrome Full Suite Overlays */}
              {showChromeMenu && (
                <ChromeOverflowMenu
                  isOpen={showChromeMenu}
                  onClose={() => setShowChromeMenu(false)}
                  onNewTab={() => handleNewTab(false)}
                  onNewIncognitoTab={() => handleNewTab(true)}
                  onOpenHistory={() => setShowBookmarksModal(true)}
                  onOpenDownloads={() => setShowDownloadsModal(true)}
                  onOpenBookmarks={() => setShowBookmarksModal(true)}
                  onOpenReadingList={() => setShowBookmarksModal(true)}
                  onOpenFindInPage={() => {
                    if (!activeTab.url) handleNavigate('https://google.com');
                    setShowFindInPage(true);
                  }}
                  onOpenTranslate={() => {
                    if (!activeTab.url) handleNavigate('https://google.com');
                    setShowTranslate(true);
                  }}
                  isDesktopSite={isDesktopSite}
                  onToggleDesktopSite={() => setIsDesktopSite(!isDesktopSite)}
                  onOpenPasswords={() => setShowPasswordManager(true)}
                  onOpenPrint={() => setShowPrintModal(true)}
                  onOpenSiteSettings={() => setShowSiteSettings(true)}
                  onOpenDevTools={() => setShowDevTools(true)}
                  onOpenExtensions={() => setShowExtensionsModal(true)}
                  onOpenTabGroups={() => setShowTabsModal(true)}
                  onOpenSettings={() => setShowSettingsModal(true)}
                  onClearData={handleClearBrowsingData}
                  onShare={() => setShowShareModal(true)}
                  onReload={() => handleNavigate(activeTab.url || 'https://google.com')}
                  isLight={isLight}
                />
              )}

              {showSiteSettings && (
                <SiteSettingsModal
                  url={activeTab.url || 'aether://start'}
                  domain={activeTab.url ? activeTab.url.replace(/^https?:\/\//, '').split('/')[0] : 'aether.io'}
                  onClose={() => setShowSiteSettings(false)}
                  onClearSiteData={() => handleClearBrowsingData()}
                  isLight={isLight}
                />
              )}

              {showPasswordManager && (
                <PasswordManagerModal
                  onClose={() => setShowPasswordManager(false)}
                  isLight={isLight}
                />
              )}

              {showDevTools && (
                <DevToolsDrawer
                  url={activeTab.url || 'https://aether.io/start'}
                  onClose={() => setShowDevTools(false)}
                  isLight={isLight}
                />
              )}

              {showPrintModal && (
                <PrintPreviewModal
                  url={activeTab.url || 'https://aether.io'}
                  title={activeTab.title || 'Aether Web Document'}
                  onClose={() => setShowPrintModal(false)}
                  onSavePdf={() =>
                    handleTriggerDownload(
                      `${(activeTab.title || 'document').replace(/\s+/g, '_')}.pdf`,
                      activeTab.url || 'https://aether.io/print',
                      '2.1 MB'
                    )
                  }
                  isLight={isLight}
                />
              )}

              {showExtensionsModal && (
                <ExtensionsModal
                  onClose={() => setShowExtensionsModal(false)}
                  isLight={isLight}
                />
              )}
            </div>

            {/* Android Navigation Gesture Home Pill */}
            {!isLandscape && (viewMode === 'pixel' || viewMode === 'compact') && (
              <div className="relative z-30 py-2 flex items-center justify-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleNavigate('')}
                  aria-label="Android Home gesture"
                  className="w-32 h-1 rounded-full bg-current opacity-30 hover:opacity-80 active:scale-95 transition-all cursor-pointer"
                  title="Return to Home"
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
