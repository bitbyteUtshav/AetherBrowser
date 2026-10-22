import React, { useState } from 'react';
import {
  X,
  Moon,
  Sun,
  Shield,
  Search,
  Sliders,
  Sparkles,
  Check,
  EyeOff,
  Trash2,
  AlertTriangle,
  Code2,
  FileCode,
  Info,
  Download,
  Zap,
  Lock
} from 'lucide-react';
import { BrowserSettings, ThemeMode } from '../types/browser';
import { GlassSurface } from './GlassSurface';

interface SettingsModalProps {
  settings: BrowserSettings;
  onUpdateSettings: (newSettings: Partial<BrowserSettings>) => void;
  onClearBrowsingData: () => void;
  onOpenDownloads?: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClearBrowsingData,
  onOpenDownloads,
  onClose,
}) => {
  const [clearedNotice, setClearedNotice] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClear = () => {
    onClearBrowsingData();
    setShowClearConfirm(false);
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Browser settings"
      className="absolute inset-0 z-50 flex flex-col bg-[#07090F]/95 backdrop-blur-2xl text-slate-100 animate-in fade-in duration-200"
    >
      {/* Header */}
      <header className="px-4 py-3.5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-bold tracking-tight">Aether Settings (Phase 2)</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close settings"
          className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* Settings Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Appearance & Glass Theme */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Appearance & Liquid Glass
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'dark', label: 'Dark Charcoal', icon: Moon, desc: '#0B0D13' },
              { id: 'light', label: 'Light Pearl', icon: Sun, desc: 'Crystalline' },
              { id: 'amoled', label: 'True Black', icon: Moon, desc: 'OLED Pure' },
            ].map((th) => {
              const IconComp = th.icon;
              const isSelected = settings.theme === th.id;
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => onUpdateSettings({ theme: th.id as ThemeMode })}
                  className={`min-h-[64px] p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all text-center active:scale-95 ${
                    isSelected
                      ? 'bg-violet-600/35 border-violet-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span className="text-xs font-bold">{th.label}</span>
                  <span className="text-[10px] opacity-60 font-mono">{th.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Glass Blur Depth Intensity */}
          <GlassSurface variant="card" className="p-3.5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Liquid Glass Blur Strength</span>
              <span className="text-[11px] font-mono text-cyan-300 capitalize">
                {settings.glassBlurLevel}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(['subtle', 'medium', 'deep'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onUpdateSettings({ glassBlurLevel: lvl })}
                  className={`min-h-[40px] py-1.5 px-2 rounded-xl text-xs font-semibold capitalize border transition-all active:scale-95 ${
                    settings.glassBlurLevel === lvl
                      ? 'bg-violet-600 text-white border-violet-400 shadow-sm'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </GlassSurface>
        </div>

        {/* Search Engine */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Default Search Provider
          </h3>
          <GlassSurface variant="card" className="rounded-2xl divide-y divide-white/5 overflow-hidden">
            {(['Google', 'DuckDuckGo', 'Ecosia', 'Kagi', 'Brave'] as const).map((engine) => {
              const isSelected = settings.searchEngine === engine;
              return (
                <button
                  key={engine}
                  type="button"
                  onClick={() => onUpdateSettings({ searchEngine: engine })}
                  className="w-full min-h-[44px] px-4 py-2.5 flex items-center justify-between text-xs hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">{engine}</span>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              );
            })}
          </GlassSurface>
        </div>

        {/* Chromium Engine & Safe Browsing */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Chromium Security & Controls
          </h3>
          <GlassSurface variant="card" className="p-3.5 rounded-2xl space-y-3">
            <label className="flex items-center justify-between cursor-pointer min-h-[40px]">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Google Safe Browsing
                </div>
                <div className="text-[10px] opacity-60">Block malicious phishing and malware attacks</div>
              </div>
              <input
                type="checkbox"
                checked={settings.safeBrowsingEnabled}
                onChange={(e) => onUpdateSettings({ safeBrowsingEnabled: e.target.checked })}
                className="w-5 h-5 accent-violet-600 rounded cursor-pointer shrink-0"
              />
            </label>

            <div className="h-[1px] bg-white/5" />

            <label className="flex items-center justify-between cursor-pointer min-h-[40px]">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-medium flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  JavaScript Engine
                </div>
                <div className="text-[10px] opacity-60">Enabled for website compatibility (no privileged bridge)</div>
              </div>
              <input
                type="checkbox"
                checked={settings.javascriptEnabled}
                onChange={(e) => onUpdateSettings({ javascriptEnabled: e.target.checked })}
                className="w-5 h-5 accent-violet-600 rounded cursor-pointer shrink-0"
              />
            </label>

            <div className="h-[1px] bg-white/5" />

            <label className="flex items-center justify-between cursor-pointer min-h-[40px]">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-medium flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-violet-400" />
                  Third-Party Cookie Isolation
                </div>
                <div className="text-[10px] opacity-60">Prevent cross-site tracking across tabs</div>
              </div>
              <input
                type="checkbox"
                checked={settings.trackingProtection}
                onChange={(e) => onUpdateSettings({ trackingProtection: e.target.checked })}
                className="w-5 h-5 accent-violet-600 rounded cursor-pointer shrink-0"
              />
            </label>
          </GlassSurface>
        </div>

        {/* Turbo Download Options & Extreme Security */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Download Engine & Security
            </h3>
            {onOpenDownloads && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDownloads();
                }}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <Download className="w-3 h-3" />
                View Manager
              </button>
            )}
          </div>
          <GlassSurface variant="card" className="p-3.5 rounded-2xl space-y-3">
            <label className="flex items-center justify-between cursor-pointer min-h-[40px]">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-medium flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Turbo Multi-Stream Download Acceleration
                </div>
                <div className="text-[10px] opacity-60">8 concurrent HTTP range threads for 3-5x throughput</div>
              </div>
              <input
                type="checkbox"
                checked={settings.turboDownloadEnabled ?? true}
                onChange={(e) => onUpdateSettings({ turboDownloadEnabled: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 rounded cursor-pointer shrink-0"
              />
            </label>

            <div className="h-[1px] bg-white/5" />

            <label className="flex items-center justify-between cursor-pointer min-h-[40px]">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-violet-400" />
                  Maximum QoS Network Priority
                </div>
                <div className="text-[10px] opacity-60">Prioritizes bandwidth socket queues over background sync</div>
              </div>
              <input
                type="checkbox"
                checked={settings.highPriorityNetwork ?? true}
                onChange={(e) => onUpdateSettings({ highPriorityNetwork: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 rounded cursor-pointer shrink-0"
              />
            </label>

            <div className="h-[1px] bg-white/5" />

            <label className="flex items-center justify-between cursor-pointer min-h-[40px]">
              <div className="space-y-0.5 pr-2">
                <div className="text-xs font-medium flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Extreme-Level Security & SHA-256 Sandboxing
                </div>
                <div className="text-[10px] opacity-60">Real-time cryptographic checksums and malware heuristic quarantine</div>
              </div>
              <input
                type="checkbox"
                checked={settings.extremeSecurityScan ?? true}
                onChange={(e) => onUpdateSettings({ extremeSecurityScan: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 rounded cursor-pointer shrink-0"
              />
            </label>
          </GlassSurface>
        </div>

        {/* Clear Browsing Data */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400">
            Privacy & Data Removal
          </h3>
          <GlassSurface variant="card" className="p-3.5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">Clear Browsing Data</h4>
                <p className="text-[10px] opacity-60">Purge CookieManager, WebStorage cache, and history</p>
              </div>
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 transition-colors"
              >
                Clear Data
              </button>
            </div>

            {clearedNotice && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Cookies, cache, and history purged successfully.</span>
              </div>
            )}

            {showClearConfirm && (
              <div className="p-3 rounded-xl bg-black/40 border border-rose-500/30 space-y-2.5">
                <p className="text-xs text-rose-200">
                  Are you sure? This will remove all stored session cookies, cached files, and browsing records.
                </p>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-3 py-1 text-xs rounded-lg opacity-70 hover:opacity-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-3 py-1 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-500"
                  >
                    Confirm Clear
                  </button>
                </div>
              </div>
            )}
          </GlassSurface>
        </div>

        {/* Incomplete / Phase 3 Status Disclosure */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-cyan-300">
            <Info className="w-4 h-4" />
            <span>Architecture & Feature Completeness Report</span>
          </div>
          <div className="space-y-1 text-[11px] opacity-75 leading-relaxed">
            <div>• <strong>Phase 2 (Completed):</strong> Chromium WebView integration via AndroidView, dedicated BrowserViewModel, multi-tab isolation, strict TLS cancellation, Safe Browsing, DownloadManager integration, local Bookmarks & History, and Clear Browsing Data.</div>
            <div>• <strong>Phase 3 (Scheduled):</strong> Hardware-backed WebAuthn FIDO2 keys, WebRTC video streaming permissions modal, and multi-profile container workspaces.</div>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <footer className="p-3 border-t border-white/10 bg-black/40 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] py-2.5 rounded-2xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors shadow-lg active:scale-[0.98]"
        >
          Save & Return
        </button>
      </footer>
    </div>
  );
};
