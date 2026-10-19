import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Terminal, 
  Sword, 
  ShieldAlert, 
  FlaskConical, 
  Lightbulb, 
  Sparkles, 
  ChevronDown, 
  Maximize2, 
  Minimize2, 
  Trash2,
  Filter
} from 'lucide-react';
import { BattleLogEntry } from '../types/game';
import { soundManager } from '../utils/audio';

interface BattleLogProps {
  logs: BattleLogEntry[];
  onClearLogs?: () => void;
  className?: string;
}

type LogFilter = 'all' | 'attacks' | 'damage_taken' | 'heals' | 'insights';

export const BattleLog: React.FC<BattleLogProps> = ({
  logs,
  onClearLogs,
  className = ''
}) => {
  const [filter, setFilter] = useState<LogFilter>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [userHasScrolledUp, setUserHasScrolledUp] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollHeightRef = useRef<number>(0);
  const prevLogCountRef = useRef<number>(logs.length);

  // Filter logs according to active filter
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (filter === 'all') return true;
      if (filter === 'attacks') return log.type === 'hero' || log.type === 'damage-deal';
      if (filter === 'damage_taken') return log.type === 'monster' || log.type === 'damage-take';
      if (filter === 'heals') return log.type === 'heal';
      if (filter === 'insights') return log.type === 'explanation' || log.type === 'system';
      return true;
    });
  }, [logs, filter]);

  // Check scroll position to determine if user manually scrolled up
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isAtBottom = distanceFromBottom < 30;

    if (isAtBottom) {
      setUserHasScrolledUp(false);
      setUnreadCount(0);
    } else {
      setUserHasScrolledUp(true);
    }
  };

  // Scroll smoothly to bottom
  const scrollToBottom = (smooth = true) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    });
    setUserHasScrolledUp(false);
    setUnreadCount(0);
  };

  // Track new logs and auto-scroll if at bottom
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const newLogsAdded = logs.length > prevLogCountRef.current;
    if (newLogsAdded) {
      if (!userHasScrolledUp) {
        // Automatically scroll to bottom
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
          }
        }, 50);
      } else {
        // Increment unread count if user was inspecting historical logs
        setUnreadCount((c) => c + (logs.length - prevLogCountRef.current));
      }
    }

    prevLogCountRef.current = logs.length;
    lastScrollHeightRef.current = el.scrollHeight;
  }, [logs, userHasScrolledUp]);

  // Filter button click
  const handleFilterChange = (f: LogFilter) => {
    soundManager.playBlip();
    setFilter(f);
  };

  // Render styled log text with highlighted spells, abilities, and numbers
  const renderLogMessage = (log: BattleLogEntry) => {
    const { text, type, actionName, damage, heal } = log;

    return (
      <div className="flex-1 text-xs font-mono leading-relaxed break-words">
        {/* Render combat announcement line */}
        <span className="tracking-wide">
          {formatCombatText(text)}
        </span>

        {/* Action badge if available */}
        {(actionName || damage !== undefined || heal !== undefined) && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
            {actionName && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                {type === 'hero' ? <Sword className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                {actionName}
              </span>
            )}
            {damage !== undefined && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-rose-950/90 border border-rose-500/50 text-rose-300 font-extrabold shadow-sm">
                💥 -{damage} DMG
              </span>
            )}
            {heal !== undefined && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-extrabold shadow-sm">
                🧪 +{heal} HP
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  // Format combat text with highlighted quotes and numbers
  const formatCombatText = (raw: string) => {
    // Regex matching quoted spell names or keywords like 'Blade of Proper Agreement', 'Lexical Surge', etc.
    const parts = raw.split(/('[^']+'|"[^"]+"|\b\d+\s+damage\b|\b\+\d+\s+poin\b)/gi);

    return parts.map((part, i) => {
      if (/^'[^']+'$/.test(part) || /^"[^"]+"$/.test(part)) {
        return (
          <span key={i} className="font-extrabold text-cyan-300 underline decoration-cyan-500/40 decoration-1 underline-offset-2">
            {part}
          </span>
        );
      }
      if (/\b\d+\s+damage\b/i.test(part)) {
        return (
          <span key={i} className="font-black text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/30">
            {part}
          </span>
        );
      }
      if (/\b\+\d+\s+poin\b/i.test(part)) {
        return (
          <span key={i} className="font-black text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/30">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={`bg-slate-950 border border-slate-800 rounded-xl shadow-xl flex flex-col relative overflow-hidden transition-all duration-300 ${className}`}>
      {/* Log Header & Controls */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-title text-xs font-bold text-slate-200 tracking-wider flex items-center gap-1.5">
              <span>BATTLE LOG & COMBAT CHRONICLE</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {logs.length}
              </span>
            </h4>
          </div>
        </div>

        {/* Filter Badges & Actions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => handleFilterChange('all')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('attacks')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                filter === 'attacks'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sword className="w-3 h-3" />
              <span>Serangan</span>
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('damage_taken')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                filter === 'damage_taken'
                  ? 'bg-rose-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Damage</span>
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('heals')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                filter === 'heals'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FlaskConical className="w-3 h-3" />
              <span>Item</span>
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('insights')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                filter === 'insights'
                  ? 'bg-purple-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3 h-3" />
              <span>Kaidah</span>
            </button>
          </div>

          {/* Expand/Collapse Height */}
          <button
            type="button"
            onClick={() => {
              soundManager.playBlip();
              setIsExpanded(!isExpanded);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title={isExpanded ? 'Kecilkan Tampilan' : 'Perbesar Tampilan Log'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Clear button if provided */}
          {onClearLogs && (
            <button
              type="button"
              onClick={() => {
                soundManager.playBlip();
                onClearLogs();
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors cursor-pointer"
              title="Bersihkan Riwayat Log"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Log Stream */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`overflow-y-auto px-4 py-3 space-y-2 select-text font-mono transition-all duration-300 scroll-smooth ${
          isExpanded ? 'h-80 sm:h-96' : 'h-44 sm:h-52'
        }`}
      >
        {filteredLogs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs py-8">
            <Filter className="w-6 h-6 mb-2 opacity-50 text-slate-600" />
            <span>Tidak ada catatan untuk filter ini.</span>
          </div>
        ) : (
          filteredLogs.map((log) => {
            let containerBg = 'bg-slate-900/40 border-slate-800/80';
            let iconBadge = '⚔️';
            let iconTheme = 'bg-slate-800 text-slate-300';

            if (log.type === 'hero' || log.type === 'damage-deal') {
              containerBg = 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500/50';
              iconBadge = '⚔️';
              iconTheme = 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30';
            } else if (log.type === 'monster') {
              containerBg = 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50';
              iconBadge = '👹';
              iconTheme = 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
            } else if (log.type === 'damage-take') {
              containerBg = 'bg-rose-950/40 border-rose-600/40';
              iconBadge = '⚡';
              iconTheme = 'bg-rose-600/30 text-rose-300 border border-rose-500/40';
            } else if (log.type === 'heal') {
              containerBg = 'bg-emerald-950/30 border-emerald-500/40';
              iconBadge = '🧪';
              iconTheme = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
            } else if (log.type === 'explanation') {
              containerBg = 'bg-amber-950/20 border-amber-500/30 text-amber-200/90';
              iconBadge = '💡';
              iconTheme = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
            } else if (log.type === 'system') {
              containerBg = 'bg-purple-950/20 border-purple-500/30 text-purple-200';
              iconBadge = '📜';
              iconTheme = 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
            }

            return (
              <div
                key={log.id}
                className={`p-2.5 rounded-lg border flex items-start gap-3 transition-colors ${containerBg}`}
              >
                {/* Icon badge */}
                <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 text-xs ${iconTheme}`}>
                  {iconBadge}
                </div>

                {/* Log body */}
                {renderLogMessage(log)}

                {/* Timestamp */}
                <span className="text-[10px] text-slate-600 font-mono shrink-0 pt-0.5">
                  {log.timestamp}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Floating "Jump to Latest" Button when user has scrolled up */}
      {userHasScrolledUp && (
        <div className="absolute bottom-3 right-4 z-20">
          <button
            type="button"
            onClick={() => {
              soundManager.playBlip();
              scrollToBottom(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono shadow-lg shadow-amber-900/50 border border-amber-300 animate-bounce cursor-pointer"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span>Lompat ke Terbaru</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-300 text-[10px]">
                +{unreadCount}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
