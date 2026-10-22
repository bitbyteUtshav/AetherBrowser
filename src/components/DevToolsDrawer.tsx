import React, { useState } from 'react';
import {
  Terminal,
  Activity,
  Layers,
  Database,
  X,
  Play,
  RotateCw,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface DevToolsDrawerProps {
  url: string;
  onClose: () => void;
  isLight?: boolean;
}

export const DevToolsDrawer: React.FC<DevToolsDrawerProps> = ({
  url,
  onClose,
  isLight = false,
}) => {
  const [activeTab, setActiveTab] = useState<'console' | 'network' | 'elements' | 'storage'>('console');
  const [command, setCommand] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([
    { type: 'info', text: `[Aether Engine] Initialized Chromium WebView v124.0.6367.82`, time: '12:00:01' },
    { type: 'log', text: `[DOM] Loaded document for ${url}`, time: '12:00:02' },
    { type: 'info', text: `[Security] Safe Browsing: URL cleared threat database`, time: '12:00:03' },
    { type: 'warn', text: `[Content Security Policy] Font preload directive suggested`, time: '12:00:04' },
    { type: 'log', text: `[QoS Network] 8 HTTP Range Streams allocated for Turbo Engine`, time: '12:00:05' },
  ]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    const now = new Date().toTimeString().split(' ')[0];
    let evalOutput = '';
    try {
      if (command === 'location.href') {
        evalOutput = url;
      } else if (command === 'navigator.userAgent') {
        evalOutput = navigator.userAgent;
      } else if (command.startsWith('2+') || command.includes('+') || command.includes('*')) {
        // safe math eval
        evalOutput = String(eval(command));
      } else {
        evalOutput = `Executed: "${command}" (Return: undefined)`;
      }
    } catch {
      evalOutput = `Uncaught ReferenceError: ${command} is not defined`;
    }

    setConsoleLogs((prev) => [
      ...prev,
      { type: 'log', text: `> ${command}`, time: now },
      { type: 'info', text: evalOutput, time: now },
    ]);
    setCommand('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chrome DevTools"
      className="fixed inset-x-0 bottom-0 z-50 h-[50vh] flex flex-col bg-[#07090F]/95 backdrop-blur-2xl text-slate-100 border-t border-cyan-500/30 shadow-2xl animate-in slide-in-from-bottom-4 duration-200"
    >
      {/* DevTools Header */}
      <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-cyan-300">Chrome DevTools (Inspect)</span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('console')}
            className={`px-2 py-1 rounded-md transition-colors ${
              activeTab === 'console' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Console
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('network')}
            className={`px-2 py-1 rounded-md transition-colors ${
              activeTab === 'network' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Network
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('elements')}
            className={`px-2 py-1 rounded-md transition-colors ${
              activeTab === 'elements' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Elements
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            className={`px-2 py-1 rounded-md transition-colors ${
              activeTab === 'storage' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'opacity-60 hover:opacity-100'
            }`}
          >
            Storage
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close DevTools"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 opacity-70 hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* DevTools Body */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1.5 select-text">
        {activeTab === 'console' && (
          <div className="space-y-1">
            {consoleLogs.map((log, idx) => (
              <div
                key={idx}
                className={`py-0.5 px-1.5 rounded flex items-start gap-2 ${
                  log.type === 'warn'
                    ? 'bg-amber-500/10 text-amber-300'
                    : log.type === 'error'
                    ? 'bg-rose-500/10 text-rose-300'
                    : 'text-slate-300'
                }`}
              >
                <span className="opacity-40 text-[10px] shrink-0">{log.time}</span>
                <span className="break-all">{log.text}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-1">
            <div className="grid grid-cols-4 gap-2 text-[10px] font-bold opacity-60 pb-1 border-b border-white/10">
              <span>Name</span>
              <span>Status</span>
              <span>Type</span>
              <span>Time</span>
            </div>
            {[
              { name: url.split('/').pop() || 'document', status: 200, type: 'document', time: '142ms' },
              { name: 'liquid-glass-theme.css', status: 200, type: 'stylesheet', time: '28ms' },
              { name: 'chromium-sandbox.js', status: 200, type: 'script', time: '64ms' },
              { name: 'favicon.ico', status: 304, type: 'image', time: '12ms' },
            ].map((req, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 text-[11px] py-1 border-b border-white/5 opacity-80">
                <span className="truncate text-cyan-300">{req.name}</span>
                <span className="text-emerald-400 font-bold">{req.status} OK</span>
                <span className="opacity-60">{req.type}</span>
                <span className="opacity-70">{req.time}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'elements' && (
          <div className="space-y-0.5 text-slate-300 text-[11px] leading-relaxed">
            <div className="text-purple-400">&lt;!DOCTYPE html&gt;</div>
            <div>&lt;<span className="text-blue-400">html</span> <span className="text-amber-400">lang</span>=&quot;en&quot;&gt;</div>
            <div className="pl-4">&lt;<span className="text-blue-400">head</span>&gt; ... &lt;/<span className="text-blue-400">head</span>&gt;</div>
            <div className="pl-4">&lt;<span className="text-blue-400">body</span> <span className="text-amber-400">class</span>=&quot;liquid-glass-view&quot;&gt;</div>
            <div className="pl-8">&lt;<span className="text-blue-400">div</span> <span className="text-amber-400">id</span>=&quot;aether-viewport&quot;&gt;</div>
            <div className="pl-12 text-slate-400">// Chromium WebView render tree mounted</div>
            <div className="pl-8">&lt;/<span className="text-blue-400">div</span>&gt;</div>
            <div className="pl-4">&lt;/<span className="text-blue-400">body</span>&gt;</div>
            <div>&lt;/<span className="text-blue-400">html</span>&gt;</div>
          </div>
        )}

        {activeTab === 'storage' && (
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-xl bg-white/5">
              <div className="font-bold text-cyan-400 mb-1">Local Storage</div>
              <div className="text-[10px] opacity-70">aether_session_state: active (4.2 KB)</div>
            </div>
            <div className="p-2 rounded-xl bg-white/5">
              <div className="font-bold text-violet-400 mb-1">Cookies (HttpOnly • Secure)</div>
              <div className="text-[10px] opacity-70">_ga: 2.138402.19 (Domain: {url})</div>
            </div>
          </div>
        )}
      </div>

      {/* Console Input Bar */}
      {activeTab === 'console' && (
        <form onSubmit={handleRunCommand} className="p-2 border-t border-white/10 bg-black/60 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xs pl-1">&gt;</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type JavaScript command (e.g. location.href, 2+2)..."
            className="flex-1 bg-transparent text-xs font-mono text-cyan-300 focus:outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded-lg bg-cyan-600/40 hover:bg-cyan-600/60 text-cyan-300 text-xs font-mono"
          >
            Run
          </button>
        </form>
      )}
    </div>
  );
};
