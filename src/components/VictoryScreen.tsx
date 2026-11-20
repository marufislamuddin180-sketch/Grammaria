import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, FlaskConical, Award, RotateCcw } from 'lucide-react';
import { Player, MonsterTemplate } from '../types/game';
import { soundManager } from '../utils/audio';

interface EncounterVictoryProps {
  player: Player;
  defeatedMonster: MonsterTemplate;
  encounterIndex: number;
  totalEncounters: number;
  stageId?: number;
  stageTitle?: string;
  droppedItemName?: string;
  potionDropped?: boolean;
  leveledUp: boolean;
  onProceedNext: () => void;
}

interface GameClearedProps {
  player: Player;
  stageId?: number;
  stageTitle?: string;
  onRestart: () => void;
  onNextStage?: (nextStageId: number) => void;
}

const CelebrationBackdropOverlay: React.FC<{ isTransitioning: boolean }> = ({ isTransitioning }) => (
  <>
    {/* Arrival Flash Sheen continuing from Boss Defeat Climax */}
    <div
      className="fixed inset-0 z-40 pointer-events-none bg-gradient-to-b from-amber-200/75 via-amber-100/35 to-transparent animate-stage-arrival-flash"
      aria-hidden="true"
    />

    {/* Next-Stage / Next-Sector Transition Portal Flash */}
    {isTransitioning && (
      <div
        className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-b from-white via-amber-200/95 to-emerald-200/90 animate-portal-flash"
        aria-hidden="true"
      />
    )}

    {/* Ambient Floating Celebration Sparks */}
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <span className="absolute bottom-16 left-[12%] text-amber-300/75 text-lg animate-float-spark-slow">✦</span>
      <span className="absolute bottom-24 left-[26%] text-emerald-300/70 text-sm animate-float-spark-med">★</span>
      <span className="absolute bottom-12 left-[42%] text-amber-200/70 text-base animate-float-spark-fast">✦</span>
      <span className="absolute bottom-20 right-[38%] text-cyan-300/70 text-sm animate-float-spark-slow">★</span>
      <span className="absolute bottom-14 right-[22%] text-amber-300/80 text-lg animate-float-spark-med">✦</span>
      <span className="absolute bottom-28 right-[10%] text-emerald-300/70 text-base animate-float-spark-fast">★</span>
    </div>
  </>
);

export const EncounterVictoryScreen: React.FC<EncounterVictoryProps> = ({
  player,
  defeatedMonster,
  encounterIndex,
  totalEncounters,
  stageId = 2,
  stageTitle = "Stage 2: 16 Tenses",
  droppedItemName,
  potionDropped,
  leveledUp,
  onProceedNext,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    soundManager.playSectorVictory(encounterIndex);
    const sectorConfettiColors: string[][] = [
      ['#10b981', '#34d399', '#f59e0b', '#ffffff'], // Sector 1
      ['#f59e0b', '#d97706', '#ef4444', '#ffffff'], // Sector 2
      ['#06b6d4', '#3b82f6', '#8b5cf6', '#ffffff'], // Sector 3
      ['#a855f7', '#ec4899', '#fbbf24', '#ffffff'], // Sector 4
      ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#ffffff'] // Boss Sector 5
    ];
    const palette = sectorConfettiColors[encounterIndex] || ['#f59e0b', '#10b981', '#ffffff'];

    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.55 },
        colors: palette
      });
      setTimeout(() => {
        try {
          confetti({
            particleCount: 45,
            angle: 60,
            spread: 55,
            origin: { x: 0.08, y: 0.7 },
            colors: palette
          });
          confetti({
            particleCount: 45,
            angle: 120,
            spread: 55,
            origin: { x: 0.92, y: 0.7 },
            colors: palette
          });
        } catch {
          // Safe fallback
        }
      }, 320);
    } catch {
      // Safe fallback
    }
  }, [encounterIndex]);

  const handleProceedWithFlash = () => {
    if (isTransitioning) return;
    soundManager.playBlip();
    setIsTransitioning(true);
    setTimeout(() => {
      onProceedNext();
    }, 260);
  };

  const sectorIcons = ['🌿', '🏰', '⏳', '🔮', '👑'];

  const getSuccessMessage = () => {
    if (stageId === 1) {
      if (encounterIndex === 0) return "✨ Keberhasilan: Kamu telah menguasai Nouns & Pronouns!";
      if (encounterIndex === 1) return "✨ Keberhasilan: Kamu telah menguasai Verbs & Modals!";
      if (encounterIndex === 2) return "✨ Keberhasilan: Kamu telah menguasai Adjectives & Adverbs!";
      if (encounterIndex === 3) return "✨ Keberhasilan: Kamu telah menguasai Prepositions & Articles!";
      return "✨ Kemenangan Akbar: Seluruh 8 Parts of Speech telah kamu kuasai!";
    }
    if (stageId === 3) {
      if (encounterIndex === 0) return "✨ Keberhasilan: Kamu telah menguasai Noun Clauses & Embedded Questions!";
      if (encounterIndex === 1) return "✨ Keberhasilan: Kamu telah menguasai Relative & Adjective Clauses!";
      if (encounterIndex === 2) return "✨ Keberhasilan: Kamu telah menguasai Adverbial Clauses of Time & Conditionals!";
      if (encounterIndex === 3) return "✨ Keberhasilan: Kamu telah menguasai Cause, Purpose & Concession Clauses!";
      return "✨ Kemenangan Akbar: Seluruh Klausa Kompleks, Reduksi & Inversi telah kamu kuasai!";
    }
    // Default Stage 2 (16 Tenses)
    if (encounterIndex === 0) return "✨ Keberhasilan: Kamu telah menguasai 4 Present Tenses!";
    if (encounterIndex === 1) return "✨ Keberhasilan: Kamu telah menguasai 4 Past Tenses!";
    if (encounterIndex === 2) return "✨ Keberhasilan: Kamu telah menguasai 4 Future Tenses!";
    if (encounterIndex === 3) return "✨ Keberhasilan: Lengkap! Ke-16 Tenses bahasa Inggris telah kamu kuasai!";
    return "✨ Kemenangan Akbar: Seluruh Kata Hubung (Conjunctions) telah dipulihkan!";
  };

  return (
    <div className="relative max-w-2xl mx-auto py-10 px-4 animate-victory-banner">
      <CelebrationBackdropOverlay isTransitioning={isTransitioning} />

      <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border-2 border-amber-500/60 rounded-2xl p-6 sm:p-8 text-center shadow-2xl space-y-6 animate-gold-pulse">
        <div className="inline-flex p-4 rounded-full bg-amber-500/15 border-2 border-amber-400 text-amber-300 text-4xl mb-2 animate-bounce">
          {sectorIcons[encounterIndex] || '🏆'}
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
            ✦ {stageTitle.toUpperCase()} • WILAYAH {encounterIndex + 1} DISUCIKAN! ✦
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-title">
            Kemenangan Melawan {defeatedMonster.name}!
          </h2>
          <p className="text-xs text-amber-300 font-mono mt-2 font-semibold">
            {getSuccessMessage()}
          </p>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Kekacauan sintaksis pada wilayah ini telah dinetralkan.
          </p>
        </div>

        {/* Rewards Box */}
        <div className="bg-slate-950/85 border border-slate-800 rounded-xl p-5 space-y-4 text-left font-mono">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Hasil Pertarungan &amp; Imbalan:
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Pengalaman (EXP) Diperoleh:</span>
            <span className="font-bold text-amber-400">+35 EXP</span>
          </div>

          {(droppedItemName || potionDropped) && (
            <div className="flex items-center justify-between text-sm bg-amber-950/40 border border-amber-500/40 p-2.5 rounded-lg text-amber-300">
              <span className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-amber-400" /> Drop Monster:
              </span>
              <span className="font-bold text-amber-200">+{droppedItemName || "1x Elixir of Eloquence"}!</span>
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

        {/* Next Sector Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleProceedWithFlash}
            disabled={isTransitioning}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-title tracking-wider uppercase text-sm transition-all cursor-pointer shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 mx-auto whitespace-nowrap shrink-0 disabled:opacity-75"
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

export const GameClearedScreen: React.FC<GameClearedProps> = ({ 
  player, 
  stageId = 2,
  stageTitle = "Stage 2: 16 Tenses & Conjunctions",
  onRestart,
  onNextStage
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    soundManager.playVictory();
    try {
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.58 },
        colors: ['#fbbf24', '#10b981', '#38bdf8', '#ffffff']
      });
      setTimeout(() => {
        try {
          confetti({
            particleCount: 70,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.7 }
          });
          confetti({
            particleCount: 70,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.7 }
          });
        } catch {
          // safe fallback
        }
      }, 380);
      setTimeout(() => {
        try {
          confetti({
            particleCount: 80,
            spread: 110,
            origin: { y: 0.4 },
            colors: ['#fbbf24', '#f59e0b', '#ffffff']
          });
        } catch {
          // safe fallback
        }
      }, 760);
    } catch {
      // safe fallback
    }
  }, []);

  const accuracy = player.questionsAnswered > 0 
    ? Math.round((player.correctAnswers / player.questionsAnswered) * 100) 
    : 100;

  const nextStageId = stageId < 3 ? stageId + 1 : null;
  const nextStageName = stageId === 1 
    ? "Stage 2: 16 Tenses (Wilayah 1-5)" 
    : stageId === 2 
    ? "Stage 3: Clauses Mastery" 
    : null;

  const getBestowedTitle = () => {
    if (stageId === 1) return "Grand Master of Parts of Speech";
    if (stageId === 3) return "Arch-Grandmaster of Complex Clauses";
    return "Grand Master of 16 Tenses & Conjunctions";
  };

  const handleNextStageTransition = () => {
    if (!nextStageId || !onNextStage || isTransitioning) return;
    soundManager.playSlash();
    setIsTransitioning(true);
    setTimeout(() => {
      onNextStage(nextStageId);
    }, 280);
  };

  return (
    <div className="relative max-w-3xl mx-auto py-10 px-4 animate-victory-banner">
      <CelebrationBackdropOverlay isTransitioning={isTransitioning} />

      <div className="relative z-10 bg-gradient-to-b from-slate-900/92 via-slate-950/92 to-slate-900/92 backdrop-blur-md border-2 border-amber-400 rounded-2xl p-6 sm:p-10 text-center shadow-2xl space-y-8 glow-gold">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-4xl shadow-xl border-2 border-amber-200 animate-bounce">
          👑
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-2">
            🏆 {stageTitle.toUpperCase()} BERHASIL DISELESAIKAN! 🏆
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-title tracking-wider">
            SELAMAT, {player.name.toUpperCase()}!
          </h2>
          <p className="text-sm font-mono text-slate-300 mt-3 max-w-lg mx-auto leading-relaxed">
            {stageId === 1 && "Kamu telah menguasai seluruh 8 kelas kata bahasa Inggris! Fondasi sintaksismu kini kokoh tak tertandingi."}
            {stageId === 2 && "Ke-16 Tenses dan seluruh aturan konjungsi telah dipulihkan! Wilayah 1-5 kini aman dan damai."}
            {stageId === 3 && "Puncak klausa kompleks, relative clauses, dan inversi telah kamu kuasai! Kamu adalah ahli sintaksis tertinggi!"}
          </p>
        </div>

        {/* Player Final Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/85 border border-slate-800 rounded-xl p-4 font-mono text-left">
          <div className="p-3 bg-slate-900/60 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Level Akhir</span>
            <span className="text-lg font-bold text-amber-300 tabular-nums">Lv.{player.level}</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Akurasi Jawaban</span>
            <span className="text-lg font-bold text-emerald-400 tabular-nums">{accuracy}%</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Total Kerusakan</span>
            <span className="text-lg font-bold text-rose-400 tabular-nums">{player.totalDamageDealt} DMG</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-lg">
            <span className="text-[11px] text-slate-400 block">Potion Diminum</span>
            <span className="text-lg font-bold text-blue-400 tabular-nums">{player.potionsUsed}x</span>
          </div>
        </div>

        {/* Title bestowed */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-3 text-amber-300 font-mono text-sm">
          <Award className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Gelar Tertinggi: <strong>{getBestowedTitle()}</strong></span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {nextStageId && onNextStage && (
            <button
              type="button"
              onClick={handleNextStageTransition}
              disabled={isTransitioning}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold font-title tracking-wider uppercase text-sm transition-all cursor-pointer shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 disabled:opacity-75"
            >
              <ArrowRight className="w-4 h-4 shrink-0" />
              <span>Lanjut ke {nextStageName}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              soundManager.playBlip();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold font-mono tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Pilih Stage Lain / Ulangi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
