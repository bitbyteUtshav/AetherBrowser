import React, { useEffect, useRef } from 'react';
import { Search, ChevronUp, ChevronDown, X } from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface FindInPageBarProps {
  searchTerm: string;
  onSearchChange: (query: string) => void;
  currentMatchIndex: number;
  totalMatches: number;
  onNextMatch: () => void;
  onPrevMatch: () => void;
  onClose: () => void;
  isLight?: boolean;
}

export const FindInPageBar: React.FC<FindInPageBarProps> = ({
  searchTerm,
  onSearchChange,
  currentMatchIndex,
  totalMatches,
  onNextMatch,
  onPrevMatch,
  onClose,
  isLight = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full z-30 px-3 py-1.5 animate-in slide-in-from-top-2 duration-150">
      <GlassSurface
        variant="card"
        isLight={isLight}
        className="rounded-2xl p-2 flex items-center justify-between gap-2 shadow-lg border"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Search className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Find in page (পৃষ্ঠায় খুঁজুন)..."
            className="w-full bg-transparent text-xs font-medium focus:outline-none placeholder:text-current placeholder:opacity-40 select-text"
          />
        </div>

        {/* Counter badge */}
        <div className="text-[11px] font-mono opacity-70 shrink-0 px-2 py-0.5 rounded-md bg-white/5">
          {totalMatches > 0 ? (
            <span>
              {currentMatchIndex + 1}/{totalMatches}
            </span>
          ) : searchTerm ? (
            <span className="text-rose-400">0/0</span>
          ) : (
            <span>0</span>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-0.5 shrink-0 border-l border-current/10 pl-1">
          <button
            type="button"
            onClick={onPrevMatch}
            disabled={totalMatches === 0}
            title="Previous match"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNextMatch}
            disabled={totalMatches === 0}
            title="Next match"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Close find"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-rose-400 active:scale-95 ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </GlassSurface>
    </div>
  );
};
