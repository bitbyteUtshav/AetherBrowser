import React, { useState } from 'react';
import {
  Plus,
  Github,
  BookOpen,
  Figma,
  Flame,
  Globe,
  Radio,
  Dribbble,
  FileText,
  X,
  Check
} from 'lucide-react';
import { QuickTile } from '../types/browser';
import { GlassSurface } from './GlassSurface';

interface QuickAccessGridProps {
  tiles: QuickTile[];
  onTileClick: (domain: string) => void;
  onAddTile: (tile: Omit<QuickTile, 'id'>) => void;
  isLight?: boolean;
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({
  tiles,
  onTileClick,
  onAddTile,
  isLight = false,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDomain.trim()) return;
    onAddTile({
      title: newTitle.trim(),
      domain: newDomain.trim().replace(/^https?:\/\//, ''),
      category: 'Favorites',
      color: '#8B5CF6',
      iconName: 'Globe',
    });
    setNewTitle('');
    setNewDomain('');
    setShowAddModal(false);
  };

  const getTileIcon = (name: string, color: string) => {
    const iconClass = "w-5 h-5";
    switch (name) {
      case 'Github':
        return <Github className={iconClass} />;
      case 'Wikipedia':
        return <BookOpen className={iconClass} />;
      case 'Figma':
        return <Figma className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Dribbble':
        return <Dribbble className={iconClass} />;
      case 'Radio':
        return <Radio className={iconClass} />;
      case 'FileText':
        return <FileText className={iconClass} />;
      default:
        return <Globe className={iconClass} />;
    }
  };

  return (
    <section aria-labelledby="quick-access-heading" className="w-full space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <h2 id="quick-access-heading" className="text-xs font-semibold uppercase tracking-wider text-current opacity-70">
          Quick Access
        </h2>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 min-h-[36px] px-2 rounded-lg"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      {/* Grid: 4 columns on mobile, 4-8 on tablet */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => onTileClick(tile.domain)}
            title={`Open ${tile.title}`}
            aria-label={tile.title}
            className="group flex flex-col items-center gap-1.5 focus:outline-none min-h-[72px]"
          >
            {/* Liquid Glass Tile Container */}
            <GlassSurface
              variant="tile"
              isLight={isLight}
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 group-hover:scale-105"
            >
              <div
                className="relative z-10 transition-colors duration-200"
                style={{ color: isLight ? tile.color : undefined }}
              >
                {getTileIcon(tile.iconName, tile.color)}
              </div>
            </GlassSurface>

            {/* Label */}
            <span className="text-[11px] font-medium text-current opacity-80 group-hover:opacity-100 truncate max-w-[68px] text-center tracking-tight">
              {tile.title}
            </span>
          </button>
        ))}

        {/* Add Shortcut Tile */}
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          title="Add quick access shortcut"
          aria-label="Add site"
          className="group flex flex-col items-center gap-1.5 focus:outline-none min-h-[72px]"
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-dashed transition-all duration-200 active:scale-90 group-hover:scale-105 ${
              isLight
                ? 'border-slate-300 bg-white/40 hover:bg-white text-slate-500'
                : 'border-white/20 bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white/90'
            }`}
          >
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-current opacity-50 truncate max-w-[68px]">
            New
          </span>
        </button>
      </div>

      {/* Add Shortcut Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in"
        >
          <GlassSurface
            variant="sheet"
            isLight={isLight}
            className="w-full max-w-sm rounded-3xl p-5 shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10">
              <h3 className="text-sm font-bold">Add Quick Access Tile</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full opacity-60 hover:opacity-100"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold opacity-70 block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Substack"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium focus:outline-none ring-1 min-h-[40px] ${
                    isLight
                      ? 'bg-slate-100 ring-slate-300 focus:ring-violet-500 text-slate-900'
                      : 'bg-white/10 ring-white/15 focus:ring-cyan-400 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70 block mb-1">
                  URL / Domain
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. substack.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-medium focus:outline-none ring-1 min-h-[40px] ${
                    isLight
                      ? 'bg-slate-100 ring-slate-300 focus:ring-violet-500 text-slate-900'
                      : 'bg-white/10 ring-white/15 focus:ring-cyan-400 text-white'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold opacity-70 hover:opacity-100 min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-500 shadow-md flex items-center gap-1.5 min-h-[40px]"
                >
                  <Check className="w-3.5 h-3.5" /> Save Tile
                </button>
              </div>
            </form>
          </GlassSurface>
        </div>
      )}
    </section>
  );
};
