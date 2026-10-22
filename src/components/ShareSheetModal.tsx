import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Send, Bookmark, Download, Zap } from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface ShareSheetModalProps {
  url: string;
  onClose: () => void;
  onOpenDownloads?: () => void;
  isLight?: boolean;
}

export const ShareSheetModal: React.FC<ShareSheetModalProps> = ({
  url,
  onClose,
  onOpenDownloads,
  isLight = false,
}) => {
  const [copied, setCopied] = useState(false);
  const targetUrl = url || 'https://aether.browser.io';

  const handleCopy = () => {
    navigator.clipboard?.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share and Page Actions"
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-md animate-in fade-in"
    >
      <GlassSurface
        variant="sheet"
        isLight={isLight}
        className="w-full rounded-t-3xl p-5 shadow-2xl border-t transition-all"
      >
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />

        <div className="flex items-center justify-between pb-3">
          <h3 className="text-sm font-bold">Page Actions & Share</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close share sheet"
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-white/10 opacity-70 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* URL Pill */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-4">
          <span className="text-xs font-mono truncate mr-2 opacity-80">{targetUrl}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-colors flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[64px] p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Bookmark className="w-4 h-4 text-violet-400" />
            <span className="text-[10px] font-medium opacity-80">Bookmark</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenDownloads) onOpenDownloads();
            }}
            className="min-h-[64px] p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 text-cyan-300"
          >
            <Download className="w-4 h-4" />
            <span className="text-[10px] font-medium opacity-90">Downloads</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[64px] p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-medium opacity-80">QR Code</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[64px] p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Send className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-medium opacity-80">Send Device</span>
          </button>
        </div>
      </GlassSurface>
    </div>
  );
};
