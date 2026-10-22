import React from 'react';
import { X, ShieldCheck, EyeOff, Zap, CheckCircle2 } from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface PrivacyShieldModalProps {
  onClose: () => void;
  trackersBlocked: number;
  cookiesBlocked: number;
  isLight?: boolean;
}

export const PrivacyShieldModal: React.FC<PrivacyShieldModalProps> = ({
  onClose,
  trackersBlocked,
  cookiesBlocked,
  isLight = false,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Privacy Shield Report"
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/65 backdrop-blur-md animate-in fade-in"
    >
      <GlassSurface
        variant="sheet"
        isLight={isLight}
        className="w-full rounded-t-3xl p-5 shadow-2xl border-t transition-all"
      >
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />

        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold tracking-tight">Aether Shield Protection</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy report"
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-white/10 opacity-70 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Protection Score Grid with tabular figures */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <div className="text-2xl font-extrabold text-emerald-400 tabular-nums">
              {trackersBlocked}
            </div>
            <div className="text-[11px] opacity-75 mt-0.5 font-medium">Trackers Neutralized</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
            <div className="text-2xl font-extrabold text-cyan-400 tabular-nums">
              {cookiesBlocked}
            </div>
            <div className="text-[11px] opacity-75 mt-0.5 font-medium">3rd-Party Cookies Blocked</div>
          </div>
        </div>

        {/* Status Checklist */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              HTTPS Everywhere Enforcement
            </span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Active</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="flex items-center gap-2">
              <EyeOff className="w-3.5 h-3.5 text-cyan-400" />
              Canvas & Audio Anti-Fingerprinting
            </span>
            <span className="text-[10px] text-cyan-400 font-bold uppercase">Shielded</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-violet-400" />
              Zero Telemetry / No Keystroke Logs
            </span>
            <span className="text-[10px] text-violet-400 font-bold uppercase">Enforced</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] py-2.5 rounded-2xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-lg active:scale-[0.98]"
        >
          Close Privacy Report
        </button>
      </GlassSurface>
    </div>
  );
};
