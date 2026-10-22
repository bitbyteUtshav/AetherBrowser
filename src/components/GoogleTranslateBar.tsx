import React, { useState } from 'react';
import { Languages, Check, ArrowRightLeft, X, Sparkles } from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface GoogleTranslateBarProps {
  sourceLang: string;
  targetLang: string;
  isTranslated: boolean;
  onToggleTranslate: () => void;
  onSelectTargetLang: (lang: string) => void;
  onClose: () => void;
  isLight?: boolean;
}

const SUPPORTED_LANGUAGES = [
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'de', label: 'Deutsch (German)' },
  { code: 'ja', label: '日本語 (Japanese)' },
  { code: 'ar', label: 'العربية (Arabic)' },
];

export const GoogleTranslateBar: React.FC<GoogleTranslateBarProps> = ({
  sourceLang,
  targetLang,
  isTranslated,
  onToggleTranslate,
  onSelectTargetLang,
  onClose,
  isLight = false,
}) => {
  const [showLangPicker, setShowLangPicker] = useState(false);

  return (
    <div className="w-full z-30 px-3 py-1.5 animate-in slide-in-from-top-2 duration-150">
      <GlassSurface
        variant="card"
        isLight={isLight}
        className="rounded-2xl p-2.5 shadow-lg border space-y-2"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              G
            </div>
            <div className="text-xs font-semibold flex items-center gap-1.5">
              <span>Google Translate</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-400 font-mono">
                অনুবাদ
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss translation bar"
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 opacity-60 hover:opacity-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Translation Mode Buttons: English / Bengali */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                if (isTranslated) onToggleTranslate();
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
                !isTranslated
                  ? 'bg-white/20 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sourceLang}
            </button>
            <span className="px-1 text-slate-500">→</span>
            <button
              type="button"
              onClick={() => {
                if (!isTranslated) onToggleTranslate();
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
                isTranslated
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {targetLang}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowLangPicker(!showLangPicker)}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium flex items-center gap-1"
          >
            <Languages className="w-3.5 h-3.5 text-blue-400" />
            <span>More</span>
          </button>
        </div>

        {/* Language dropdown modal */}
        {showLangPicker && (
          <div className="p-2 rounded-xl bg-black/40 border border-white/10 grid grid-cols-2 gap-1.5 pt-2 animate-in fade-in duration-100">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onSelectTargetLang(lang.label.split(' ')[0]);
                  setShowLangPicker(false);
                }}
                className={`px-2 py-1.5 rounded-lg text-xs text-left truncate flex items-center justify-between ${
                  targetLang.includes(lang.label.split(' ')[0])
                    ? 'bg-blue-600/30 text-blue-300 font-bold'
                    : 'hover:bg-white/10 text-slate-300'
                }`}
              >
                <span className="truncate">{lang.label}</span>
                {targetLang.includes(lang.label.split(' ')[0]) && (
                  <Check className="w-3 h-3 text-blue-400 shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </GlassSurface>
    </div>
  );
};
