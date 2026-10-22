import React, { useState } from 'react';
import {
  Key,
  Eye,
  EyeOff,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Search,
  Plus,
  Trash2,
  X,
  CreditCard,
  MapPin,
  Lock
} from 'lucide-react';
import { GlassSurface } from './GlassSurface';
import { SavedCredential } from '../types/browser';

interface PasswordManagerModalProps {
  onClose: () => void;
  isLight?: boolean;
}

const INITIAL_PASSWORDS: SavedCredential[] = [
  {
    id: 'cred-1',
    domain: 'google.com',
    username: 'traviswilson956@gmail.com',
    password: '••••••••••••••••',
    lastUsed: Date.now() - 3600000,
    compromised: false,
  },
  {
    id: 'cred-2',
    domain: 'github.com',
    username: 'traviswilson-dev',
    password: 'ghp_secretTokenAether992',
    lastUsed: Date.now() - 86400000,
    compromised: false,
  },
  {
    id: 'cred-3',
    domain: 'twitter.com',
    username: '@travis_aether',
    password: 'superSecretPassword2026!',
    lastUsed: Date.now() - 172800000,
    compromised: false,
  },
];

export const PasswordManagerModal: React.FC<PasswordManagerModalProps> = ({
  onClose,
  isLight = false,
}) => {
  const [activeTab, setActiveTab] = useState<'passwords' | 'autofill' | 'checkup'>('passwords');
  const [passwords, setPasswords] = useState<SavedCredential[]>(INITIAL_PASSWORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain || !newUsername) return;
    const newCred: SavedCredential = {
      id: `cred-${Date.now()}`,
      domain: newDomain,
      username: newUsername,
      password: newPassword || 'AetherVaultPass#2026',
      lastUsed: Date.now(),
      compromised: false,
    };
    setPasswords((prev) => [newCred, ...prev]);
    setNewDomain('');
    setNewUsername('');
    setNewPassword('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setPasswords((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPasswords = passwords.filter(
    (p) =>
      p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Google Password Manager"
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
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Google Password Manager</h3>
                <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Encrypted Vault (পাসওয়ার্ড ম্যানেজার)
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

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('passwords')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'passwords'
                  ? 'bg-amber-500/30 text-amber-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Passwords ({passwords.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checkup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'checkup'
                  ? 'bg-amber-500/30 text-amber-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Security Check
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('autofill')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'autofill'
                  ? 'bg-amber-500/30 text-amber-300 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Autofill Cards
            </button>
          </div>

          {/* Tab 1: Passwords List */}
          {activeTab === 'passwords' && (
            <div className="flex-1 flex flex-col space-y-2.5 overflow-hidden">
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search passwords..."
                    className="w-full bg-white/5 border border-white/10 pl-8 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>

              {/* Password Items List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredPasswords.map((item) => {
                  const isRevealed = revealedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5 hover:bg-white/[0.07] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-300">{item.domain}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.username, `${item.id}-user`)}
                            title="Copy username"
                            className="p-1 rounded-lg hover:bg-white/10 opacity-70 hover:opacity-100"
                          >
                            {copiedId === `${item.id}-user` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            title="Delete password"
                            className="p-1 rounded-lg hover:bg-rose-500/20 text-rose-400 opacity-70 hover:opacity-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px] opacity-75 font-mono truncate">{item.username}</div>

                      <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-xs">
                        <span className="tracking-wider">
                          {isRevealed ? item.password : '••••••••••••'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleReveal(item.id)}
                            className="p-1 rounded-lg hover:bg-white/10 opacity-70 hover:opacity-100"
                          >
                            {isRevealed ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.password, item.id)}
                            title="Copy password"
                            className="p-1 rounded-lg hover:bg-white/10 opacity-70 hover:opacity-100"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Security Checkup */}
          {activeTab === 'checkup' && (
            <div className="flex-1 overflow-y-auto space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Password Security Checkup</span>
                </div>
                <p className="text-[11px] opacity-80 leading-relaxed">
                  No compromised passwords found. Aether Vault checks credentials against dark web breaches and evaluates entropy score.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-center font-mono text-xs">
                  <div className="p-2 rounded-xl bg-black/20">
                    <div className="text-emerald-400 font-bold text-base">0</div>
                    <div className="text-[10px] opacity-60">Compromised</div>
                  </div>
                  <div className="p-2 rounded-xl bg-black/20">
                    <div className="text-cyan-400 font-bold text-base">{passwords.length}</div>
                    <div className="text-[10px] opacity-60">Strong Passwords</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Autofill Cards & Addresses */}
          {activeTab === 'autofill' && (
            <div className="flex-1 overflow-y-auto space-y-3">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <CreditCard className="w-4 h-4" />
                  <span>Autofill Payment Methods</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold">Google Pay •••• 4242</div>
                    <div className="text-[10px] opacity-60">Exp: 08/29</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                    Active
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-violet-400 font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>Autofill Address</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 text-xs space-y-0.5">
                  <div className="font-bold">Travis Wilson</div>
                  <div className="text-[11px] opacity-70">1600 Amphitheatre Pkwy, Mountain View, CA</div>
                </div>
              </div>
            </div>
          )}

          {/* Modal to add new credential */}
          {showAddModal && (
            <div className="p-3 rounded-2xl bg-black/50 border border-amber-500/30 space-y-2 animate-in fade-in">
              <h4 className="text-xs font-bold text-amber-300">Add Password</h4>
              <form onSubmit={handleAddCredential} className="space-y-2">
                <input
                  type="text"
                  placeholder="Website domain (e.g. netflix.com)"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Username or email"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs focus:outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs focus:outline-none"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1 text-xs opacity-70 hover:opacity-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 text-xs font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-500 shadow-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}

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
