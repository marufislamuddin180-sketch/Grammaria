import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, FlaskConical, Award, RotateCcw } from 'lucide-react';
import { Player, MonsterTemplate } from '../types/game';
import { soundManager } from '../utils/audio';

interface EncounterVictoryProps {
  player: Player;
  defeatedMonster: MonsterTemplate;
  encounterIndex: number;
  totalEncounters: number;
  potionDropped: boolean;
  leveledUp: boolean;
  onProceedNext: () => void;
}

interface GameClearedProps {
  player: Player;
  onRestart: () => void;
}

export const EncounterVictoryScreen: React.FC<EncounterVictoryProps> = ({
  player,
  defeatedMonster,
  encounterIndex,
  totalEncounters,
  potionDropped,
  leveledUp,
  onProceedNext,
}) => {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-6 sm:p-8 text-center shadow-2xl space-y-6">
        <div className="inline-flex p-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-3xl mb-2">
          🏆
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
            Wilayah {encounterIndex + 1} Berhasil Disucikan!
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-title">
            Kemenangan Melawan {defeatedMonster.name}!
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-2">
            Kekacauan sintaksis pada wilayah ini telah dinetralkan.
          </p>
        </div>

        {/* Rewards Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-left font-mono">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Hasil Pertarungan & Imbalan:
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Pengalaman (EXP) Diperoleh:</span>
            <span className="font-bold text-amber-400">+35 EXP</span>
          </div>

          {potionDropped && (
            <div className="flex items-center justify-between text-sm bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded-lg text-emerald-300">
              <span className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400" /> Drop Monster:
              </span>
              <span className="font-bold">+1x Elixir of Eloquence!</span>
            </div>
          )}

          {leveledUp && (
            <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/40 p-3 rounded-lg space-y-1">
              <div className="text-amber-300 font-bold text-sm flex items-center gap-2">
                <span>🎉</span> LEVEL UP! Mencapai Level {player.level}!
              </div>
              <p className="text-xs text-slate-300">
                Darah dipulihkan penuh! Max HP bertambah menjadi {player.maxHp}.
              </p>
            </div>
          )}
        </div>

        {/* Next Stage Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              soundManager.playBlip();
              onProceedNext();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-title tracking-wider uppercase text-sm transition-all cursor-pointer shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 mx-auto"
          >
            <span>
              {encounterIndex + 1 < totalEncounters
                ? `Lanjut ke Wilayah ${encounterIndex + 2}`
                : 'Hadapi Puncak Pertempuran'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const GameClearedScreen: React.FC<GameClearedProps> = ({ player, onRestart }) => {
  useEffect(() => {
    soundManager.playVictory();
    // Confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 500);
    } catch {
      // safe fallback
    }
  }, []);

  const accuracy = player.questionsAnswered > 0 
    ? Math.round((player.correctAnswers / player.questionsAnswered) * 100) 
    : 100;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-400 rounded-2xl p-6 sm:p-10 text-center shadow-2xl space-y-8 glow-gold">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-4xl shadow-xl border-2 border-amber-200">
          👑
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-2">
            🏆 SELURUH WILAYAH GRAMMARIA TERSELAMATKAN! 🏆
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-title tracking-wider">
            SELAMAT, {player.name.toUpperCase()}!
          </h2>
          <p className="text-sm font-mono text-slate-300 mt-3 max-w-lg mx-auto leading-relaxed">
            Hukum tata bahasa telah dipulihkan di seluruh penjuru negeri. Setiap kalimat kini berdiri tegak dengan makna yang sempurna!
          </p>
        </div>

        {/* Player Final Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-left">
          <div className="p-3 bg-slate-900/60 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Level Akhir</span>
            <span className="text-lg font-bold text-amber-300">Lv.{player.level}</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Akurasi Jawaban</span>
            <span className="text-lg font-bold text-emerald-400">{accuracy}%</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Total Kerusakan</span>
            <span className="text-lg font-bold text-rose-400">{player.totalDamageDealt} DMG</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Potion Diminum</span>
            <span className="text-lg font-bold text-blue-400">{player.potionsUsed}x</span>
          </div>
        </div>

        {/* Title bestowed */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-3 text-amber-300 font-mono text-sm">
          <Award className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Gelar Tertinggi: <strong>Grand Master of Syntax & Diction</strong></span>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              soundManager.playBlip();
              onRestart();
            }}
            className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-title tracking-wider uppercase text-sm transition-all cursor-pointer shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Petualangan Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
