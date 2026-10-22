import React, { useState } from 'react';
import { Puzzle, Shield, Check, X, ExternalLink, Power } from 'lucide-react';
import { GlassSurface } from './GlassSurface';
import { ChromeExtensionItem } from '../types/browser';

interface ExtensionsModalProps {
  onClose: () => void;
  isLight?: boolean;
}

const INITIAL_EXTENSIONS: ChromeExtensionItem[] = [
  {
    id: 'ext-1',
    name: 'uBlock Aether AdBlock',
    version: '1.57.0',
    description: 'An efficient blocker: fast, potent, and lean. Blocks cosmetic tracking and video ads.',
    author: 'Raymond Hill / Aether Labs',
    enabled: true,
    iconColor: 'text-rose-400 bg-rose-500/20',
  },
  {
    id: 'ext-2',
    name: 'Dark Reader OLED',
    version: '4.9.82',
    description: 'Inverts brightness of websites and applies high-contrast dark themes to all web pages.',
    author: 'Alexander Shutau',
    enabled: true,
    iconColor: 'text-amber-400 bg-amber-500/20',
  },
  {
    id: 'ext-3',
    name: 'Google Translate Quick',
    version: '2.0.12',
    description: 'Instant inline translation of foreign web pages into Bengali, Spanish, Hindi, or French.',
    author: 'Google LLC',
    enabled: true,
    iconColor: 'text-blue-400 bg-blue-500/20',
  },
  {
    id: 'ext-4',
    name: 'Bitwarden Password Vault',
    version: '2024.4.1',
    description: 'Cross-platform secure credentials and two-factor authenticator token autofill.',
    author: 'Bitwarden Inc.',
    enabled: false,
    iconColor: 'text-cyan-400 bg-cyan-500/20',
  },
];

export const ExtensionsModal: React.FC<ExtensionsModalProps> = ({
  onClose,
  isLight = false,
}) => {
  const [extensions, setExtensions] = useState<ChromeExtensionItem[]>(INITIAL_EXTENSIONS);

  const toggleExtension = (id: string) => {
    setExtensions((prev) =>
      prev.map((ext) => (ext.id === id ? { ...ext, enabled: !ext.enabled } : ext))
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chrome Extensions"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[88vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassSurface
          variant="sheet"
          isLight={isLight}
          className="flex-1 flex flex-col p-4 space-y-3.5 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-current/10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center">
                <Puzzle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Chrome Extensions</h3>
                <div className="text-[10px] text-fuchsia-300 font-medium">
                  Add-ons & Content Script Shields
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 opacity-70 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Extension List */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {extensions.map((ext) => (
              <div
                key={ext.id}
                className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 space-y-2 hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${ext.iconColor}`}>
                      <Puzzle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{ext.name}</span>
                        <span className="text-[10px] opacity-50 font-mono">v{ext.version}</span>
                      </h4>
                      <p className="text-[10px] opacity-60">By {ext.author}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExtension(ext.id)}
                    className={`min-w-[44px] min-h-[26px] px-2 py-1 rounded-full flex items-center transition-all ${
                      ext.enabled ? 'bg-violet-600 justify-end' : 'bg-white/10 justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                <p className="text-[11px] opacity-80 leading-relaxed pl-10">
                  {ext.description}
                </p>

                <div className="pl-10 pt-1 flex items-center gap-3 text-[10px] opacity-60">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Manifest V3 Sandboxed
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors shadow-lg active:scale-95 shrink-0"
          >
            Done
          </button>
        </GlassSurface>
      </div>
    </div>
  );
};
