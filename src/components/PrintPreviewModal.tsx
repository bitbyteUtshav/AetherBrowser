import React, { useState } from 'react';
import { Printer, Download, X, Check, FileText } from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface PrintPreviewModalProps {
  url: string;
  title: string;
  onClose: () => void;
  onSavePdf: () => void;
  isLight?: boolean;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  url,
  title,
  onClose,
  onSavePdf,
  isLight = false,
}) => {
  const [layout, setLayout] = useState<'portrait' | 'landscape'>('portrait');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSavePdf();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Print or Save to PDF"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm max-h-[88vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassSurface
          variant="sheet"
          isLight={isLight}
          className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-current/10 shrink-0">
            <div className="flex items-center gap-2">
              <Printer className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold">Print & Save to PDF</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Paper Sheet Preview */}
          <div className="flex-1 flex items-center justify-center p-2 bg-black/30 rounded-2xl border border-white/5 overflow-hidden">
            <div
              className={`bg-white text-slate-800 p-4 rounded-lg shadow-2xl transition-all duration-200 border border-slate-300 ${
                layout === 'portrait' ? 'w-48 h-64' : 'w-64 h-44'
              } flex flex-col justify-between text-[8px] select-none`}
            >
              <div className="space-y-1">
                <div className="font-bold text-[10px] text-slate-900 truncate border-b border-slate-200 pb-1">
                  {title || 'Aether Web Document'}
                </div>
                <div className="text-slate-400 font-mono text-[7px] truncate">{url}</div>
                <div className="space-y-1 pt-1 opacity-70">
                  <div className="h-1 bg-slate-200 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-4/5" />
                  <div className="h-1 bg-slate-200 rounded w-5/6" />
                  <div className="h-1 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
              <div className="flex items-center justify-between text-slate-400 font-mono text-[7px] border-t border-slate-100 pt-1">
                <span>Page 1 of 1</span>
                <span>Chrome Print Spooler</span>
              </div>
            </div>
          </div>

          {/* Print Options */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="opacity-75">Layout</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLayout('portrait')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    layout === 'portrait'
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  Portrait
                </button>
                <button
                  type="button"
                  onClick={() => setLayout('landscape')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    layout === 'landscape'
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  Landscape
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="opacity-75">Destination</span>
              <span className="font-mono text-cyan-300 font-semibold">Save as PDF</span>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>PDF document queued in Turbo Downloads!</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1 border-t border-current/10 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors shadow-lg flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              Save PDF
            </button>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
};
