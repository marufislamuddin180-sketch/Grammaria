import React, { useEffect } from 'react';
import { X, BookMarked, Sparkles, AlertCircle, Clock, Zap } from 'lucide-react';
import { CODEX_DATA, CAMPAIGN_CODEX_DATA } from '../data/codexData';
import { soundManager } from '../utils/audio';

interface GrammarCodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectorIndex: number;
  stageId?: number;
}

export const GrammarCodexModal: React.FC<GrammarCodexModalProps> = ({
  isOpen,
  onClose,
  sectorIndex,
  stageId = 2
}) => {
  // Keyboard ESC support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        soundManager.playBlip();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stageCodex = CAMPAIGN_CODEX_DATA[stageId] || CAMPAIGN_CODEX_DATA[2];
  const codex = stageCodex[sectorIndex] || stageCodex[0] || CODEX_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/30 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-md">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest font-bold">
                  Grammar Codex
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  • {codex.monsterName}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-title mt-0.5">
                {codex.sectorTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playBlip();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-100 border border-slate-700 transition-colors cursor-pointer"
            title="Tutup Codex (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guidance Notice Banner */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border-b border-amber-900/30 flex items-center justify-between text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Kumpulan Formula & Kaidah Sintaksis untuk memecahkan serangan musuh di wilayah ini.</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono hidden md:inline">[ESC untuk Tutup]</span>
        </div>

        {/* Scrollable Codex Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 select-text">
          {codex.topics.map((topic, idx) => (
            <div
              key={idx}
              className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-3 shadow-md hover:border-slate-700 transition-colors"
            >
              {/* Topic Title */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <h4 className="font-bold text-amber-300 text-sm font-mono flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xs text-amber-400 font-bold">
                    {idx + 1}
                  </span>
                  <span>{topic.title}</span>
                </h4>
              </div>

              {/* Main Formula Card */}
              <div className="space-y-1.5 font-mono">
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Rumus / Formula Dasar:
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/40 text-cyan-200 text-xs sm:text-sm font-bold tracking-wide break-words">
                  {topic.formula}
                </div>
                {topic.negativeFormula && (
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs break-words">
                    {topic.negativeFormula}
                  </div>
                )}
              </div>

              {/* Usage Explanation */}
              <div className="text-xs text-slate-300 leading-relaxed font-mono">
                <span className="text-amber-400 font-bold">Fungsi: </span>
                {topic.usage}
              </div>

              {/* Time Signals / Keywords */}
              {topic.timeSignals && topic.timeSignals.length > 0 && (
                <div className="pt-1">
                  <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> Kata Penanda Waktu (Signal Words):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.timeSignals.map((signal, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-medium"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips & Critical Pitfalls */}
              {topic.tips && (
                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs font-mono text-amber-200/90 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">Tips Kaidah: </span>
                    <span>{topic.tips}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            GramMaru Combat Reference
          </span>
          <button
            onClick={() => {
              soundManager.playBlip();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider transition-all cursor-pointer shadow-md"
          >
            Tutup Codex & Serang
          </button>
        </div>
      </div>
    </div>
  );
};
