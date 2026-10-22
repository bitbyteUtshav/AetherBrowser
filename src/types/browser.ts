export interface QuickTile {
  id: string;
  title: string;
  domain: string;
  category: string;
  color: string;
  iconName: string;
}

export interface RecentSite {
  id: string;
  title: string;
  url: string;
  timeAgo: string;
  readingTime: string;
  snippet: string;
  category: string;
}

export interface TabGroup {
  id: string;
  name: string;
  color: string;
  tabIds: string[];
  collapsed?: boolean;
}

export interface TabItem {
  id: string;
  title: string;
  url: string;
  isPrivate: boolean;
  timestamp: number;
  progress: number;
  history: string[];
  historyIndex: number;
  sslStatus: 'secure' | 'warning' | 'error';
  sslErrorDetails?: string;
  groupId?: string;
  isDesktopMode?: boolean;
  zoomLevel?: number;
}

export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  createdAt: number;
}

export interface ReadingListItem {
  id: string;
  title: string;
  url: string;
  domain: string;
  addedAt: number;
  read: boolean;
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  visitedAt: number;
}

export interface ClosedTabItem {
  id: string;
  title: string;
  url: string;
  closedAt: number;
  isPrivate: boolean;
}

export interface SavedCredential {
  id: string;
  domain: string;
  username: string;
  password: string;
  lastUsed: number;
  compromised?: boolean;
}

export interface SitePermission {
  domain: string;
  location: 'allow' | 'block' | 'ask';
  camera: 'allow' | 'block' | 'ask';
  mic: 'allow' | 'block' | 'ask';
  notifications: 'allow' | 'block' | 'ask';
  cookies: 'allow' | 'block';
  popups: 'allow' | 'block';
  javascript: 'allow' | 'block';
}

export interface ChromeExtensionItem {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  enabled: boolean;
  iconColor: string;
}

export interface DownloadItem {
  id: string;
  filename: string;
  url: string;
  size: string;
  progress: number;
  speed: string;
  eta: string;
  status: 'downloading' | 'completed' | 'paused' | 'failed';
  timestamp: number;
  securityStatus: 'scanning' | 'verified_safe' | 'quarantined';
  sha256Hash: string;
  threads: number;
}

export type ThemeMode = 'dark' | 'light' | 'amoled';

export interface BrowserSettings {
  theme: ThemeMode;
  searchEngine: 'Google' | 'DuckDuckGo' | 'Ecosia' | 'Kagi' | 'Brave';
  trackingProtection: boolean;
  httpsOnly: boolean;
  glassBlurLevel: 'subtle' | 'medium' | 'deep';
  specularGloss: boolean;
  cookiesBlocked: number;
  trackersBlocked: number;
  safeBrowsingEnabled: boolean;
  javascriptEnabled: boolean;
  turboDownloadEnabled: boolean;
  highPriorityNetwork: boolean;
  extremeSecurityScan: boolean;
  downloadLocation: string;
  defaultDesktopMode?: boolean;
  autofillEnabled?: boolean;
  passwordManagerEnabled?: boolean;
  translateTargetLanguage?: string;
  defaultZoom?: number;
}

