import React, { useState } from 'react';
import {
  Bookmark,
  Clock,
  X,
  Trash2,
  ExternalLink,
  Plus,
  Globe,
  Search
} from 'lucide-react';
import { BookmarkItem, HistoryItem } from '../types/browser';
import { GlassSurface } from './GlassSurface';

interface BookmarksHistoryModalProps {
  bookmarks: BookmarkItem[];
  history: HistoryItem[];
  onSelectUrl: (url: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearHistory: () => void;
  onClose: () => void;
  isLight?: boolean;
}

export const BookmarksHistoryModal: React.FC<BookmarksHistoryModalProps> = ({
  bookmarks,
  history,
  onSelectUrl,
  onRemoveBookmark,
  onClearHistory,
  onClose,
  isLight = false,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredBookmarks = bookmarks.filter((b) =>
    b.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    b.url.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const filteredHistory = history.filter((h) =>
    h.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    h.url.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bookmarks and History"
      className="absolute inset-0 z-50 flex flex-col bg-[#07090F]/95 backdrop-blur-2xl text-slate-100 animate-in fade-in duration-200"
    >
      {/* Header */}
      <header className="px-4 py-3.5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {activeTab === 'bookmarks' ? (
            <Bookmark className="w-4 h-4 text-violet-400" />
          ) : (
            <Clock className="w-4 h-4 text-cyan-400" />
          )}
          <h2 className="text-sm font-bold tracking-tight">
            {activeTab === 'bookmarks' ? 'Saved Bookmarks' : 'Browsing History'}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl hover:bg-white/10 opacity-70 hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* Segmented Switcher & Search Bar */}
      <div className="p-3 border-b border-white/10 space-y-2 shrink-0">
        <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 w-full">
          <button
            type="button"
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bookmarks'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Bookmarks ({bookmarks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> History ({history.length})
          </button>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Filter ${activeTab}...`}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400"
          />
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {activeTab === 'bookmarks' ? (
          filteredBookmarks.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center opacity-60 text-xs">
              <Bookmark className="w-6 h-6 mb-2 text-violet-400 opacity-60" />
              <span>No bookmarks saved yet.</span>
            </div>
          ) : (
            filteredBookmarks.map((bm) => (
              <GlassSurface
                key={bm.id}
                variant="card"
                interactive={true}
                onClick={() => {
                  onSelectUrl(bm.url);
                  onClose();
                }}
                className="p-3 rounded-2xl flex items-center justify-between gap-3 text-left group"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                    <Bookmark className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold truncate group-hover:text-cyan-300 transition-colors">
                      {bm.title}
                    </h4>
                    <p className="text-[11px] font-mono opacity-50 truncate">
                      {bm.url.replace(/^https?:\/\//, '')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBookmark(bm.id);
                  }}
                  title="Remove bookmark"
                  aria-label="Remove bookmark"
                  className="p-1.5 rounded-lg opacity-40 hover:opacity-100 hover:bg-rose-500/20 hover:text-rose-300 transition-colors shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </GlassSurface>
            ))
          )
        ) : filteredHistory.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-center opacity-60 text-xs">
            <Clock className="w-6 h-6 mb-2 text-cyan-400 opacity-60" />
            <span>No browsing history found.</span>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <GlassSurface
              key={item.id}
              variant="card"
              interactive={true}
              onClick={() => {
                onSelectUrl(item.url);
                onClose();
              }}
              className="p-3 rounded-2xl flex items-center justify-between gap-3 text-left group"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold truncate group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-mono opacity-50 truncate">
                    {item.url.replace(/^https?:\/\//, '')}
                  </p>
                </div>
              </div>

              <span className="text-[10px] opacity-40 font-mono shrink-0">
                {new Date(item.visitedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </GlassSurface>
          ))
        )}
      </div>

      {/* Footer */}
      {activeTab === 'history' && history.length > 0 && (
        <footer className="p-3 border-t border-white/10 bg-black/40 flex justify-between items-center shrink-0">
          <button
            type="button"
            onClick={onClearHistory}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors"
          >
            Clear All History
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors"
          >
            Done
          </button>
        </footer>
      )}
    </div>
  );
};
