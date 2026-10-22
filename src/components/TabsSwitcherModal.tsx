import React, { useState } from 'react';
import {
  Plus,
  X,
  Shield,
  Layers,
  Search,
  Globe,
  Trash2,
  Check,
  FolderPlus,
  Grid,
  List,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { TabItem, TabGroup, ClosedTabItem } from '../types/browser';
import { GlassSurface } from './GlassSurface';

interface TabsSwitcherModalProps {
  tabs: TabItem[];
  activeTabId: string;
  tabGroups?: TabGroup[];
  closedTabs?: ClosedTabItem[];
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: (isPrivate: boolean) => void;
  onCloseAll: () => void;
  onCloseModal: () => void;
  onReopenClosedTab?: (closedTab: ClosedTabItem) => void;
  onCreateTabGroup?: (name: string, color: string) => void;
  onAssignTabToGroup?: (tabId: string, groupId?: string) => void;
  isLight?: boolean;
}

export const TabsSwitcherModal: React.FC<TabsSwitcherModalProps> = ({
  tabs,
  activeTabId,
  tabGroups = [
    { id: 'grp-work', name: 'Work', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', tabIds: [] },
    { id: 'grp-research', name: 'Research', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', tabIds: [] },
    { id: 'grp-social', name: 'Social', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', tabIds: [] },
  ],
  closedTabs = [
    { id: 'closed-1', title: 'Android Developers: Jetpack Compose Material 3', url: 'https://developer.android.com', closedAt: Date.now() - 120000, isPrivate: false },
    { id: 'closed-2', title: 'GitHub: Chromium for Android', url: 'https://github.com/chromium', closedAt: Date.now() - 360000, isPrivate: false },
  ],
  onSelectTab,
  onCloseTab,
  onNewTab,
  onCloseAll,
  onCloseModal,
  onReopenClosedTab,
  onCreateTabGroup,
  onAssignTabToGroup,
  isLight = false,
}) => {
  const [filterPrivate, setFilterPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showRecentlyClosed, setShowRecentlyClosed] = useState(false);

  const displayedTabs = tabs
    .filter((t) => t.isPrivate === filterPrivate)
    .filter((t) => (selectedGroupId ? t.groupId === selectedGroupId : true))
    .filter((t) =>
      searchQuery
        ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.url.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const standardCount = tabs.filter((t) => !t.isPrivate).length;
  const privateCount = tabs.filter((t) => t.isPrivate).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chrome Tabs Switcher"
      className="absolute inset-0 z-50 flex flex-col bg-[#07090F]/95 backdrop-blur-2xl text-slate-100 animate-in fade-in duration-200"
    >
      {/* Top Header */}
      <header className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold tracking-tight">
            {filterPrivate ? 'Private Incognito Tabs' : 'Chrome Tab Overview'}
          </h2>
          <span className="text-xs text-slate-400 tabular-nums">
            ({displayedTabs.length})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white/20 text-white' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              title="List view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white/20 text-white' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {displayedTabs.length > 1 && (
            <button
              type="button"
              onClick={onCloseAll}
              className="text-xs px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-rose-300 transition-colors"
            >
              Close All
            </button>
          )}

          <button
            type="button"
            onClick={onCloseModal}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 transition-colors"
          >
            Done
          </button>
        </div>
      </header>

      {/* Mode Control & Search */}
      <div className="px-4 pt-3 pb-2 flex flex-col sm:flex-row items-center gap-2 shrink-0">
        <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 w-full max-w-xs">
          <button
            type="button"
            onClick={() => setFilterPrivate(false)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              !filterPrivate
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Standard ({standardCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterPrivate(true)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              filterPrivate
                ? 'bg-purple-700 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Incognito ({privateCount})
          </button>
        </div>

        {/* Tab Search Filter */}
        <div className="relative w-full max-w-xs sm:w-48">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search open tabs..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-400"
          />
        </div>
      </div>

      {/* Chrome Tab Groups Bar */}
      <div className="px-4 py-1.5 flex items-center gap-2 overflow-x-auto shrink-0 border-b border-white/5 text-xs">
        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Groups:</span>
        <button
          type="button"
          onClick={() => setSelectedGroupId(null)}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            selectedGroupId === null
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          All Tabs
        </button>
        {tabGroups.map((grp) => (
          <button
            key={grp.id}
            type="button"
            onClick={() => setSelectedGroupId(selectedGroupId === grp.id ? null : grp.id)}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all shrink-0 ${grp.color} ${
              selectedGroupId === grp.id ? 'ring-2 ring-white/50' : 'opacity-70 hover:opacity-100'
            }`}
          >
            ● {grp.name}
          </button>
        ))}

        {closedTabs.length > 0 && (
          <button
            type="button"
            onClick={() => setShowRecentlyClosed(!showRecentlyClosed)}
            className="ml-auto text-[11px] font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg hover:bg-white/5"
          >
            <RotateCcw className="w-3 h-3" />
            Recent ({closedTabs.length})
          </button>
        )}
      </div>

      {/* Recently Closed Tabs Drawer */}
      {showRecentlyClosed && closedTabs.length > 0 && (
        <div className="mx-4 my-2 p-3 rounded-2xl bg-black/60 border border-violet-500/30 space-y-2 animate-in fade-in shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-violet-300">
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              Recently Closed Tabs (বন্ধ হওয়া ট্যাব)
            </span>
            <button
              type="button"
              onClick={() => setShowRecentlyClosed(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            {closedTabs.map((ct) => (
              <div
                key={ct.id}
                className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-2 hover:bg-white/10 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-white truncate">{ct.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">{ct.url}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onReopenClosedTab?.(ct);
                    setShowRecentlyClosed(false);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shrink-0 active:scale-95 transition-all"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs Container (Grid or List) */}
      <div className="flex-1 overflow-y-auto p-4 select-none">
        {displayedTabs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 opacity-70">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Layers className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-sm font-medium">
              {searchQuery
                ? 'No tabs matching your search'
                : filterPrivate
                ? 'No private incognito tabs open'
                : 'No open tabs in this group'}
            </p>
            <button
              type="button"
              onClick={() => onNewTab(filterPrivate)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-500 shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Open New Tab
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Chrome Grid View */
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
            {displayedTabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const domain = tab.url
                ? tab.url.replace(/^https?:\/\//, '').split('/')[0]
                : 'aether://start';

              return (
                <div
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`group relative h-56 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 active:scale-[0.97] shadow-lg ${
                    filterPrivate
                      ? 'bg-gradient-to-b from-purple-950/60 to-[#0A0714] border border-purple-500/25'
                      : 'bg-gradient-to-b from-[#131622]/90 to-[#0B0D15]/95 border border-white/15'
                  } ${
                    isActive
                      ? filterPrivate
                        ? 'ring-2 ring-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.3)]'
                        : 'ring-2 ring-cyan-400 shadow-[0_0_24px_rgba(56,189,248,0.25)]'
                      : 'hover:border-white/30'
                  }`}
                  style={{ backdropFilter: 'blur(20px)' }}
                >
                  {/* Top Bar inside Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Globe className="w-2.5 h-2.5 text-cyan-300" />
                      </div>
                      <span className="text-xs font-bold truncate text-slate-100">
                        {tab.title || 'Untitled Tab'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseTab(tab.id);
                      }}
                      title="Close Tab"
                      aria-label="Close Tab"
                      className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-rose-500 text-white transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Browser Mini Viewport Representation */}
                  <div className="flex-1 my-2 rounded-xl bg-black/40 border border-white/5 p-2.5 flex flex-col justify-between overflow-hidden">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="h-1.5 w-12 rounded-full bg-violet-400/40" />
                        <div className="h-1.5 w-6 rounded-full bg-white/20" />
                      </div>
                      <div className="h-2 w-4/5 rounded-full bg-white/25" />
                      <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
                      <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                    </div>

                    <div className="font-mono text-[10px] text-cyan-300/80 truncate pt-2 border-t border-white/5">
                      {domain}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="flex items-center justify-between text-[11px] opacity-70">
                    <span className="truncate max-w-[100px]">
                      {tab.isDesktopMode ? 'Desktop' : tab.isPrivate ? 'Incognito' : 'Mobile'}
                    </span>
                    {isActive ? (
                      <span className="text-cyan-400 font-bold flex items-center gap-1 text-[10px]">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] opacity-50">Tap to switch</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Chrome List View */
          <div className="space-y-2">
            {displayedTabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const domain = tab.url
                ? tab.url.replace(/^https?:\/\//, '').split('/')[0]
                : 'aether://start';

              return (
                <div
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.98] ${
                    isActive
                      ? 'bg-violet-600/30 border-cyan-400 ring-1 ring-cyan-400'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">
                        {tab.title || 'Untitled Tab'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{domain}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold">
                        Active
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseTab(tab.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-300 opacity-70 hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Bar: New Tab & Actions */}
      <footer className="p-3 sm:p-4 border-t border-white/10 flex items-center justify-between bg-black/50 backdrop-blur-xl shrink-0">
        <button
          type="button"
          onClick={() => onNewTab(true)}
          className="min-h-[44px] px-3.5 py-2 rounded-2xl text-xs font-semibold bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:bg-purple-900/50 transition-colors flex items-center gap-1.5 active:scale-95"
        >
          <Shield className="w-3.5 h-3.5" /> Incognito Tab
        </button>

        <button
          type="button"
          onClick={() => onNewTab(false)}
          className="min-h-[44px] px-5 py-2 rounded-2xl text-xs font-bold bg-violet-600 text-white shadow-lg hover:bg-violet-500 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4" /> New Tab
        </button>
      </footer>
    </div>
  );
};
