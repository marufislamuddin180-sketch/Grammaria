import React from 'react';
import { Skull, RotateCcw } from 'lucide-react';
import { Player, MonsterTemplate } from '../types/game';
import { soundManager } from '../utils/audio';

interface GameOverScreenProps {
  player: Player;
  defeatedByMonster: MonsterTemplate;
  onRetryEncounter: () => void;
  onStartFresh: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  player,
  defeatedByMonster,
  onRetryEncounter,
  onStartFresh,
}) => {
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-slate-900 border border-rose-900/60 rounded-2xl p-6 sm:p-8 text-center shadow-2xl space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <Skull className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold block mb-1">
            Gugur Dalam Pertempuran
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-title">
            GAME OVER
          </h2>
          <p className="text-xs font-mono text-rose-300/80 mt-2">
            💀 {player.name} telah dikalahkan oleh kekacauan sintaksis {defeatedByMonster.name}...
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-400 leading-relaxed">
          &quot;Pelajari kembali aturan tata bahasamu dan bangkitlah kembali untuk menyelamatkan Grammaria!&quot;
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => {
              soundManager.playBlip();
              onRetryEncounter();
            }}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-title uppercase text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Lagi Pertarungan Ini</span>
          </button>

          <button
            onClick={() => {
              soundManager.playBlip();
              onStartFresh();
            }}
            className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-800 font-mono text-xs transition-all cursor-pointer"
          >
            Mulai Dari Awal
          </button>
        </div>
      </div>
    </div>
  );
};
