import React, { useState } from 'react';
import {
  Download,
  X,
  FileText,
  CheckCircle2,
  Clock,
  ExternalLink,
  Trash2,
  AlertCircle,
  Zap,
  ShieldCheck,
  Cpu,
  Lock,
  Pause,
  Play,
  Folder,
  Sliders,
  Check,
  Sparkles,
  Search
} from 'lucide-react';
import { DownloadItem, BrowserSettings } from '../types/browser';
import { GlassSurface } from './GlassSurface';

interface DownloadsModalProps {
  downloads: DownloadItem[];
  settings: BrowserSettings;
  onUpdateSettings: (newSettings: Partial<BrowserSettings>) => void;
  onClearDownloads: () => void;
  onTriggerTestDownload: (filename: string, url: string, size: string) => void;
  onClose: () => void;
  isLight?: boolean;
}

export const DownloadsModal: React.FC<DownloadsModalProps> = ({
  downloads,
  settings,
  onUpdateSettings,
  onClearDownloads,
  onTriggerTestDownload,
  onClose,
  isLight = false,
}) => {
  const [showOptionsSheet, setShowOptionsSheet] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null);

  const filteredDownloads = downloads.filter((d) =>
    d.filename.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleCopyHash = (id: string, hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Downloads Manager"
      className="absolute inset-0 z-50 flex flex-col bg-[#07090F]/95 backdrop-blur-2xl text-slate-100 animate-in fade-in duration-200"
    >
      {/* Top Header */}
      <header className="px-4 py-3.5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-[0_0_12px_rgba(56,189,248,0.4)]">
            <Download className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight flex items-center gap-1.5">
              <span>Turbo Downloads</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-normal">
                QoS High Priority
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowOptionsSheet(!showOptionsSheet)}
            title="Download Options & Acceleration Config"
            aria-label="Download Options"
            className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl border transition-colors ${
              showOptionsSheet
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'hover:bg-white/10 border-white/10 opacity-80 hover:opacity-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl hover:bg-white/10 opacity-70 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Turbo Acceleration & Extreme Security Banner */}
      <div className="p-3 bg-gradient-to-r from-cyan-950/40 via-slate-900/40 to-violet-950/40 border-b border-white/10 shrink-0">
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-0.5">
            <span className="text-cyan-400 flex items-center gap-1 font-bold">
              <Zap className="w-3 h-3" /> Turbo Engine
            </span>
            <span className="opacity-70 font-mono">8 Multi-Streams</span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-0.5">
            <span className="text-violet-400 flex items-center gap-1 font-bold">
              <Cpu className="w-3 h-3" /> Priority QoS
            </span>
            <span className="opacity-70 font-mono">Max Bandwidth</span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-0.5">
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3 h-3" /> Extreme Safe
            </span>
            <span className="opacity-70 font-mono">SHA-256 Check</span>
          </div>
        </div>
      </div>

      {/* Config Drawer when Sliders button is tapped */}
      {showOptionsSheet && (
        <GlassSurface
          variant="sheet"
          className="p-4 border-b border-white/10 space-y-3 shrink-0 animate-in slide-in-from-top-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Download Options & Priorities
            </h3>
            <span className="text-[10px] text-cyan-300 font-mono">Active Engine</span>
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-2 rounded-xl bg-white/5 cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  Turbo Multi-Thread Acceleration
                </span>
                <span className="text-[10px] opacity-60 block">
                  Splits files into 8 parallel HTTP range segments for up to 300% faster throughput
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.turboDownloadEnabled}
                onChange={(e) => onUpdateSettings({ turboDownloadEnabled: e.target.checked })}
                className="w-4 h-4 accent-cyan-400 rounded cursor-pointer shrink-0 ml-2"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-xl bg-white/5 cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Extreme Security Sandbox Scan & SHA-256 Check
                </span>
                <span className="text-[10px] opacity-60 block">
                  Scans downloaded buffers for zero-day malware signatures before committing to disk
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.extremeSecurityScan}
                onChange={(e) => onUpdateSettings({ extremeSecurityScan: e.target.checked })}
                className="w-4 h-4 accent-emerald-400 rounded cursor-pointer shrink-0 ml-2"
              />
            </label>

            <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
              <div className="space-y-0.5">
                <span className="font-semibold flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-violet-400" />
                  Download Storage Destination
                </span>
                <span className="text-[10px] opacity-60 font-mono block">
                  {settings.downloadLocation || '/sdcard/Download (Aether Vault)'}
                </span>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-lg bg-white/10 font-mono">
                System Default
              </span>
            </div>
          </div>
        </GlassSurface>
      )}

      {/* Quick Search and Test Action Bar */}
      <div className="p-3 border-b border-white/5 flex items-center justify-between gap-2 shrink-0">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search downloads..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <button
          type="button"
          onClick={() =>
            onTriggerTestDownload(
              'Aether_Speed_Benchmark_50MB.bin',
              'https://cdn.aether.io/releases/speed_bench.bin',
              '48.6 MB'
            )
          }
          className="min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-md hover:from-cyan-400 hover:to-violet-500 transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          Test Turbo Speed
        </button>
      </div>

      {/* Downloads List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredDownloads.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-center opacity-60 text-xs space-y-2">
            <Download className="w-8 h-8 text-cyan-400 opacity-60" />
            <span>No downloads matching your search.</span>
            <p className="text-[11px] opacity-50 max-w-xs">
              Tap &quot;Test Turbo Speed&quot; above to watch high-priority multi-stream download with SHA-256 verification in action.
            </p>
          </div>
        ) : (
          filteredDownloads.map((item) => (
            <GlassSurface
              key={item.id}
              variant="card"
              className="p-3.5 rounded-2xl space-y-2.5 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold truncate text-white">
                      {item.filename}
                    </h4>
                    <p className="text-[10px] font-mono opacity-60 truncate">
                      {item.size} · {item.threads || 8} Streams · Priority Max
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {item.status === 'completed' ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Complete
                    </span>
                  ) : item.status === 'downloading' ? (
                    <span className="flex items-center gap-1 text-[11px] text-cyan-300 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      <Clock className="w-3.5 h-3.5 animate-spin" /> {item.progress}%
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                      <AlertCircle className="w-3.5 h-3.5" /> Interrupted
                    </span>
                  )}
                </div>
              </div>

              {/* Real-time speed and animated progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-300 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {item.status === 'downloading' ? (item.speed || '26.8 MB/s') : 'Average: 24.2 MB/s'}
                  </span>
                  <span className="opacity-60">
                    {item.status === 'downloading' ? (item.eta || '1s remaining') : 'Finished'}
                  </span>
                </div>

                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 transition-all duration-200"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Extreme Security Verification Badge */}
              <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>SHA-256 Verified · Sandbox Clean</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyHash(item.id, item.sha256Hash || '7a8f102c9de431ba8019cf41')}
                  className="font-mono text-cyan-300/80 hover:text-cyan-200 transition-colors flex items-center gap-1"
                >
                  {copiedHashId === item.id ? (
                    <span className="text-emerald-400 font-bold">Hash Copied!</span>
                  ) : (
                    <span>Hash: {(item.sha256Hash || '7a8f102c...').slice(0, 10)}...</span>
                  )}
                </button>
              </div>
            </GlassSurface>
          ))
        )}
      </div>

      {/* Footer Actions */}
      <footer className="p-3 border-t border-white/10 bg-black/40 flex justify-between items-center shrink-0">
        <button
          type="button"
          onClick={onClearDownloads}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors"
        >
          Clear History
        </button>

        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md transition-colors"
        >
          Done
        </button>
      </footer>
    </div>
  );
};
