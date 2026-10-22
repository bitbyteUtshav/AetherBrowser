import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  MapPin,
  Camera,
  Mic,
  Bell,
  Cookie,
  Trash2,
  X,
  ExternalLink,
  Check,
  AlertTriangle,
  Layers,
  Code
} from 'lucide-react';
import { GlassSurface } from './GlassSurface';
import { SitePermission } from '../types/browser';

interface SiteSettingsModalProps {
  url: string;
  domain: string;
  onClose: () => void;
  onClearSiteData?: (domain: string) => void;
  isLight?: boolean;
}

export const SiteSettingsModal: React.FC<SiteSettingsModalProps> = ({
  url,
  domain,
  onClose,
  onClearSiteData,
  isLight = false,
}) => {
  const [permissions, setPermissions] = useState<SitePermission>({
    domain,
    location: 'ask',
    camera: 'block',
    mic: 'block',
    notifications: 'allow',
    cookies: 'allow',
    popups: 'block',
    javascript: 'allow',
  });

  const [cookiesDeleted, setCookiesDeleted] = useState(false);

  const togglePerm = (key: keyof SitePermission) => {
    if (key === 'domain') return;
    setPermissions((prev) => {
      const current = prev[key];
      let nextVal: any = current;
      if (current === 'allow') nextVal = 'block';
      else if (current === 'block') nextVal = 'ask';
      else nextVal = 'allow';
      return { ...prev, [key]: nextVal };
    });
  };

  const handleClearCookies = () => {
    onClearSiteData?.(domain);
    setCookiesDeleted(true);
    setTimeout(() => setCookiesDeleted(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site settings and page info"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassSurface
          variant="sheet"
          isLight={isLight}
          className="rounded-3xl p-4 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-current/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold truncate max-w-[200px]">{domain || 'aether.io'}</h3>
                <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Connection is secure (TLS 1.3)
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

          {/* Certificate & Encryption Details */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="opacity-70">Security Protocol</span>
              <span className="text-emerald-400 font-bold">TLS 1.3 • AES_256_GCM</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="opacity-70">Certificate Authority</span>
              <span className="text-cyan-300">Google Trust Services (GTS CA 1C3)</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="opacity-70">Public Key Hash</span>
              <span className="text-slate-400 truncate max-w-[150px]">SHA256: 4e:b2:91:...</span>
            </div>
          </div>

          {/* Site Permissions (Chrome Mobile Site Settings) */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Site Permissions (অনুমতিসমূহ)
            </h4>

            <div className="space-y-1">
              {[
                { key: 'location', label: 'Location (অবস্থান)', icon: MapPin },
                { key: 'camera', label: 'Camera (ক্যামেরা)', icon: Camera },
                { key: 'mic', label: 'Microphone (মাইক্রোফোন)', icon: Mic },
                { key: 'notifications', label: 'Notifications (বিজ্ঞপ্তি)', icon: Bell },
                { key: 'cookies', label: 'Cookies & Storage', icon: Cookie },
                { key: 'popups', label: 'Pop-ups & Redirects', icon: ExternalLink },
              ].map((item) => {
                const Icon = item.icon;
                const status = (permissions as any)[item.key];
                return (
                  <div
                    key={item.key}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePerm(item.key as any)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono uppercase font-bold transition-all active:scale-95 ${
                        status === 'allow'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : status === 'block'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {status}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cookies & Stored Data */}
          <div className="space-y-2 pt-1 border-t border-current/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-current">Cookies in use</h4>
                <p className="text-[10px] opacity-60">12 cookies & 2.4 MB stored data</p>
              </div>
              <button
                type="button"
                onClick={handleClearCookies}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            </div>

            {cookiesDeleted && (
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-[11px] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Cookies & cache cleared for {domain}</span>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-500 transition-colors shadow-lg active:scale-95"
          >
            Done
          </button>
        </GlassSurface>
      </div>
    </div>
  );
};
