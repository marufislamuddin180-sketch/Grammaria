import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  FlaskConical, 
  Sword, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { Player, MonsterState, GrammarQuestion, BattleLogEntry } from '../types/game';
import { GRAMMAR_DB, REGION_GRAMMAR_DB } from '../data/grammarDb';
import { soundManager } from '../utils/audio';
import { BattleLog } from './BattleLog';

interface BattleScreenProps {
  player: Player;
  monster: MonsterState;
  encounterIndex: number;
  totalEncounters: number;
  onMonsterDefeated: (updatedPlayer: Player, droppedPotion: boolean) => void;
  onPlayerDefeated: (updatedPlayer: Player) => void;
}

const CLASS_ABILITIES: Record<Player['charClass'], { name: string; verb: string }> = {
  "Syntax Knight": { name: "Blade of Proper Agreement", verb: "swung" },
  "Vocab Mage": { name: "Lexical Surge", verb: "used" },
  "Punctuation Rogue": { name: "Semicolon Dagger", verb: "hurled" }
};

const MONSTER_ABILITIES: Record<string, string> = {
  "Typo Goblin": "Typo Ambush",
  "Tense-Twisting Troll": "Timeline Warp",
  "Comma Splice Dragon": "Run-On Breath",
  "Dangling Modifier Chimera": "Ambiguity Strike",
  "The Great Chaos Overlord (Passive Voice Demon)": "Passive Chaos Ray",
};

export const BattleScreen: React.FC<BattleScreenProps> = ({
  player: initialPlayer,
  monster: initialMonster,
  encounterIndex,
  totalEncounters,
  onMonsterDefeated,
  onPlayerDefeated,
}) => {
  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [monster, setMonster] = useState<MonsterState>(initialMonster);
  const [battleLogs, setBattleLogs] = useState<BattleLogEntry[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<GrammarQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<{
    answered: boolean;
    isCorrect: boolean;
    explanation: string;
  } | null>(null);
  const [isAttacking, setIsAttacking] = useState<'player' | 'monster' | null>(null);
  const [floatingDamage, setFloatingDamage] = useState<{ target: 'monster' | 'player'; amount: number } | null>(null);

  const addLog = (
    text: string, 
    type: BattleLogEntry['type'], 
    meta?: Partial<Omit<BattleLogEntry, 'id' | 'text' | 'type' | 'timestamp'>>
  ) => {
    const entry: BattleLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      ...meta,
    };
    setBattleLogs((prev) => [...prev, entry]);
  };

  // Helper for attack narration
  const getAttackNarration = (charClass: Player['charClass']) => {
    if (charClass === "Syntax Knight") {
      return "menghunuskan 'Blade of Proper Agreement' dan menebas struktur kacau lawan!";
    } else if (charClass === "Vocab Mage") {
      return "merapal mantra 'Lexical Surge', menyemburkan ledakan sinonim tingkat tinggi!";
    } else {
      return "melemparkan 'Semicolon Dagger', membelah run-on sentence monster dengan presisi mematikan!";
    }
  };

  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());

  // Pick question tailored specifically to the encounter's region with zero duplicates
  const pickNewQuestion = (overrideUsedIds?: Set<string>) => {
    const currentUsed = overrideUsedIds ?? usedQuestionIds;
    // 1. Get region-specific pool
    const regionPool = REGION_GRAMMAR_DB[encounterIndex] || GRAMMAR_DB[monster.tier] || REGION_GRAMMAR_DB[0];

    // 2. Filter out already presented questions
    let availableQuestions = regionPool.filter((q) => !currentUsed.has(q.id));

    // 3. If all questions in this region have been used, recycle cleanly
    if (availableQuestions.length === 0) {
      availableQuestions = regionPool;
      setUsedQuestionIds(new Set());
    }

    // 4. Select random question from unused pool
    const chosen = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    setUsedQuestionIds((prev) => new Set(prev).add(chosen.id));
    setCurrentQuestion(chosen);
    setSelectedOption(null);
    setAnsweredState(null);
  };

  // Initialize encounter
  useEffect(() => {
    setPlayer(initialPlayer);
    setMonster(initialMonster);
    const freshUsed = new Set<string>();
    setUsedQuestionIds(freshUsed);
    setBattleLogs([
      {
        id: 'init_1',
        text: `⚠️ MONSTER MUNCUL! Seekor ${initialMonster.name} menghadang jalanmu di Wilayah ${encounterIndex + 1}!`,
        type: 'monster',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 'init_2',
        text: `HP Monster: ${initialMonster.currentHp}/${initialMonster.hp} | Kekuatan Serangan: ${initialMonster.damage} DMG`,
        type: 'system',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    pickNewQuestion(freshUsed);
  }, [encounterIndex]);

  // Handle using potion
  const handleUsePotion = () => {
    if (player.potions <= 0) {
      soundManager.playHit();
      addLog("❌ Kamu tidak memiliki potion tersisa!", 'system');
      return;
    }

    if (player.hp >= player.maxHp) {
      addLog("ℹ️ HP kamu sudah penuh!", 'system');
      return;
    }

    soundManager.playPotion();
    const healAmount = 40;
    const newHp = Math.min(player.maxHp, player.hp + healAmount);
    const updated: Player = {
      ...player,
      hp: newHp,
      potions: player.potions - 1,
      potionsUsed: player.potionsUsed + 1,
    };
    setPlayer(updated);
    addLog(`🧪 You used 'Elixir of Eloquence', restoring +${healAmount} HP! (${newHp}/${player.maxHp})`, 'heal', {
      actor: player.name,
      actionName: 'Elixir of Eloquence',
      heal: healAmount
    });
  };

  // Handle submitting grammar answer
  const handleSelectOption = (idx: number) => {
    if (answeredState?.answered) return;
    setSelectedOption(idx);
    soundManager.playBlip();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion || answeredState?.answered) return;

    const isCorrect = selectedOption === currentQuestion.correct;
    const correctLetter = String.fromCharCode(65 + currentQuestion.correct);

    if (isCorrect) {
      soundManager.playSlash();
      setIsAttacking('player');
      const baseDmg = player.damageMod;
      const roll = Math.floor(Math.random() * 11) + 5; // 5-15
      const damageDealt = baseDmg + roll;
      const nextMonsterHp = Math.max(0, monster.currentHp - damageDealt);

      setFloatingDamage({ target: 'monster', amount: damageDealt });
      setMonster((prev) => ({ ...prev, currentHp: nextMonsterHp }));

      const updatedPlayer: Player = {
        ...player,
        questionsAnswered: player.questionsAnswered + 1,
        correctAnswers: player.correctAnswers + 1,
        totalDamageDealt: player.totalDamageDealt + damageDealt,
      };
      setPlayer(updatedPlayer);

      const ability = CLASS_ABILITIES[player.charClass];
      addLog(`⚔️ You used '${ability.name}' for ${damageDealt} damage!`, 'hero', {
        actor: player.name,
        target: monster.name,
        actionName: ability.name,
        damage: damageDealt,
        isCritical: damageDealt >= player.damageMod + 12
      });
      addLog(`✨ ${player.name} ${getAttackNarration(player.charClass)} (${monster.name}: ${nextMonsterHp}/${monster.hp} HP)`, 'damage-deal', {
        actor: player.name,
        target: monster.name,
        damage: damageDealt
      });

      setAnsweredState({
        answered: true,
        isCorrect: true,
        explanation: currentQuestion.explanation
      });

      setTimeout(() => {
        setIsAttacking(null);
        setFloatingDamage(null);

        if (nextMonsterHp <= 0) {
          // Monster defeated!
          soundManager.playVictory();
          addLog(`🏆 VICTORY! Kamu berhasil menyucikan ${monster.name}!`, 'system');
          const droppedPotion = Math.random() < 0.5;
          if (droppedPotion) {
            addLog(`🎁 Monster menjatuhkan 1x Potion 'Elixir of Eloquence'!`, 'heal', {
              actionName: 'Elixir of Eloquence',
              heal: 40
            });
          }
          setTimeout(() => {
            onMonsterDefeated(updatedPlayer, droppedPotion);
          }, 1200);
        }
      }, 800);
    } else {
      // Wrong answer - monster retaliates!
      soundManager.playHit();
      setIsAttacking('monster');
      const damageTaken = monster.damage;
      const nextPlayerHp = Math.max(0, player.hp - damageTaken);

      setFloatingDamage({ target: 'player', amount: damageTaken });

      const updatedPlayer: Player = {
        ...player,
        hp: nextPlayerHp,
        questionsAnswered: player.questionsAnswered + 1,
        totalDamageTaken: player.totalDamageTaken + damageTaken,
      };
      setPlayer(updatedPlayer);

      const monsterSpell = MONSTER_ABILITIES[monster.name] || 'Syntax Corruption';
      addLog(`👹 ${monster.name} used '${monsterSpell}' for ${damageTaken} damage!`, 'monster', {
        actor: monster.name,
        target: player.name,
        actionName: monsterSpell,
        damage: damageTaken
      });
      addLog(`❌ SALAH! Jawaban yang benar adalah [${correctLetter}].`, 'damage-take');
      addLog(`💡 Penjelasan Edukasi: ${currentQuestion.explanation}`, 'explanation');

      setAnsweredState({
        answered: true,
        isCorrect: false,
        explanation: currentQuestion.explanation
      });

      setTimeout(() => {
        setIsAttacking(null);
        setFloatingDamage(null);

        if (nextPlayerHp <= 0) {
          soundManager.playDefeat();
          addLog(`💀 ${player.name} telah dikalahkan oleh kekacauan sintaksis...`, 'system');
          setTimeout(() => {
            onPlayerDefeated(updatedPlayer);
          }, 1500);
        }
      }, 800);
    }
  };

  const handleNextTurn = () => {
    soundManager.playBlip();
    pickNewQuestion();
  };

  // Keyboard shortcut support (A, B, C, or 1, 2)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (answeredState?.answered) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (monster.currentHp > 0 && player.hp > 0) {
            handleNextTurn();
          }
        }
        return;
      }

      if (e.key === 'a' || e.key === 'A') handleSelectOption(0);
      if (e.key === 'b' || e.key === 'B') handleSelectOption(1);
      if (e.key === 'c' || e.key === 'C') handleSelectOption(2);
      if (e.key === 'p' || e.key === 'P') handleUsePotion();
      if (e.key === 'Enter') handleSubmitAnswer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answeredState, selectedOption, currentQuestion, player, monster]);

  const monsterHpPercent = Math.max(0, Math.min(100, (monster.currentHp / monster.hp) * 100));
  const playerHpPercent = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
  const playerExpPercent = Math.min(100, (player.exp / player.expNeeded) * 100);

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      {/* Top Arena Header: Stage indicator */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-amber-400">⚔</span>
          <span className="font-bold text-slate-200 uppercase font-title">
            Wilayah {encounterIndex + 1} dari {totalEncounters}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-amber-300/80">{monster.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Tier {monster.tier} Difficulty</span>
        </div>
      </div>

      {/* Main Battle Grid: Combatants & Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Monster Card (5 cols) */}
        <div className={`lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
          isAttacking === 'monster' ? 'animate-monster-lunge ring-2 ring-rose-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]' : ''
        } ${isAttacking === 'player' ? 'animate-hit-flash animate-shake' : ''}`}>
          
          {/* Floating Damage Indicator */}
          {floatingDamage?.target === 'monster' && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-40 font-pixel text-2xl text-rose-400 font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-frame-damage">
              -{floatingDamage.amount} DMG!
            </div>
          )}

          {/* Frame-Based Spell Casting Effects on Monster */}
          {isAttacking === 'player' && (
            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
              {player.charClass === 'Vocab Mage' && (
                <div className="w-48 h-48 rounded-full border-4 border-purple-400/90 animate-lexical-surge flex items-center justify-center bg-gradient-to-tr from-purple-600/40 via-cyan-500/30 to-purple-400/50 shadow-[0_0_35px_rgba(168,85,247,0.9)]">
                  <span className="font-pixel text-[11px] text-cyan-200 tracking-wider font-bold select-none text-center px-2">
                    ✦ LEXICAL SURGE ✦
                  </span>
                </div>
              )}
              {player.charClass === 'Syntax Knight' && (
                <div className="w-56 h-12 bg-gradient-to-r from-transparent via-cyan-300 via-amber-200 to-transparent shadow-[0_0_25px_rgba(245,158,11,1)] animate-blade-cleave rotate-[-30deg] border-y-2 border-white flex items-center justify-center">
                  <span className="font-title text-xs font-black text-amber-950 tracking-widest uppercase">
                    ⚔ BLADE CLEAVE ⚔
                  </span>
                </div>
              )}
              {player.charClass === 'Punctuation Rogue' && (
                <div className="animate-dagger-flurry flex items-center justify-center gap-4 text-3xl font-pixel text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,1)]">
                  <span className="text-4xl text-cyan-400">;</span>
                  <span className="text-3xl text-amber-300">⚔</span>
                  <span className="text-4xl text-cyan-400">:</span>
                </div>
              )}
            </div>
          )}

          <div>
            {/* Monster Tag & Tier */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold uppercase tracking-wider">
                Monster • Tier {monster.tier}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ATK: <strong className="text-amber-400">{monster.damage} DMG</strong>
              </span>
            </div>

            {/* Monster Avatar & Title */}
            <div className="flex flex-col items-center py-4 text-center">
              <div className="relative mb-3">
                <div className={`w-24 h-24 rounded-2xl bg-slate-950 border-2 border-slate-700 flex items-center justify-center text-5xl shadow-2xl relative transition-transform ${
                  !isAttacking && monster.currentHp > 0 ? 'animate-monster-idle' : ''
                } ${isAttacking === 'player' ? 'scale-90 brightness-150' : ''}`}>
                  {encounterIndex === 0 && '👺'}
                  {encounterIndex === 1 && '🧌'}
                  {encounterIndex === 2 && '🐉'}
                  {encounterIndex === 3 && '🦁'}
                  {encounterIndex === 4 && '👿'}
                </div>
                {monster.currentHp <= 0 && (
                  <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center text-rose-400 font-bold font-mono text-sm">
                    DEFEATED
                  </div>
                )}
              </div>

              <h3 className="text-xl font-extrabold text-rose-200 font-title">
                {monster.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono italic max-w-xs mt-1">
                &quot;{monster.title}&quot;
              </p>
            </div>

            {/* Monster HP Bar */}
            <div className="space-y-1.5 mt-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> HP Monster
                </span>
                <span className="font-bold text-rose-400">
                  {monster.currentHp} / {monster.hp}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300"
                  style={{ width: `${monsterHpPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Monster Dialogue / Speech bubble with corrupted text */}
          <div className="mt-5 p-3.5 rounded-lg bg-black/60 border border-rose-900/40 relative">
            <div className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Distorsi Bahasa:
            </div>
            <p className="font-mono text-xs sm:text-sm text-rose-200 italic font-semibold leading-relaxed">
              &quot;{currentQuestion?.monster_text || monster.lore}&quot;
            </p>
          </div>
        </div>

        {/* Right Column: Player Status & Battle Controls (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Player Status Card */}
          <div className={`bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-4 relative overflow-hidden transition-all duration-300 ${
            isAttacking === 'player' ? 'animate-player-cast ring-2 ring-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : ''
          } ${isAttacking === 'monster' ? 'animate-hit-flash animate-shake ring-2 ring-rose-500' : ''}`}>
            
            {/* Frame-Based Monster Strike Overlay on Player */}
            {isAttacking === 'monster' && (
              <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className="animate-claw-strike flex flex-col items-center justify-center select-none w-full">
                  <div className="w-56 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent rotate-[-25deg] shadow-[0_0_15px_rgba(239,68,68,1)] my-1" />
                  <div className="w-64 h-1.5 bg-gradient-to-r from-transparent via-red-400 to-transparent rotate-[-22deg] shadow-[0_0_20px_rgba(239,68,68,1)] my-1" />
                  <div className="w-52 h-1 bg-gradient-to-r from-transparent via-rose-600 to-transparent rotate-[-19deg] shadow-[0_0_15px_rgba(239,68,68,1)] my-1" />
                  <span className="font-pixel text-[10px] text-rose-300 font-bold tracking-widest uppercase mt-1 drop-shadow-md">
                    ⚡ SYNTAX BREACH! ⚡
                  </span>
                </div>
              </div>
            )}

            {/* Floating Damage Indicator for player */}
            {floatingDamage?.target === 'player' && (
              <div className="absolute top-4 right-1/3 z-40 font-pixel text-xl text-rose-400 font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-frame-damage">
                -{floatingDamage.amount} HP!
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300 text-sm font-mono">
                  Lv.{player.level}
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-base font-title">
                    {player.name}
                  </h4>
                  <span className="text-xs text-amber-400 font-mono">
                    {player.charClass}
                  </span>
                </div>
              </div>

              {/* Potions & Quick Drink */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUsePotion}
                  disabled={player.potions <= 0 || player.hp >= player.maxHp}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
                  title="Minum Elixir of Eloquence (Pulihkan 40 HP)"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-400" />
                  <span>Elixir ({player.potions}x)</span>
                  <span className="text-[10px] text-emerald-400/80 hidden sm:inline">[P]</span>
                </button>
              </div>
            </div>

            {/* Health & EXP Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              {/* HP Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400" /> Darah (HP)
                  </span>
                  <span className={`font-bold ${player.hp < 30 ? 'text-rose-500 animate-pulse' : 'text-slate-200'}`}>
                    {player.hp} / {player.maxHp}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      player.hp < 30 ? 'bg-rose-600' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                    }`}
                    style={{ width: `${playerHpPercent}%` }}
                  />
                </div>
              </div>

              {/* EXP Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> EXP
                  </span>
                  <span className="font-bold text-amber-300">
                    {player.exp} / {player.expNeeded}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                    style={{ width: `${playerExpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grammar Challenge Card (Question & Options) */}
          {currentQuestion && monster.currentHp > 0 && player.hp > 0 && (
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-5 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                    <Sword className="w-3.5 h-3.5" /> Tantangan Tata Bahasa
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {currentQuestion.category || `Tier ${monster.tier}`}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-100 mb-4 leading-relaxed">
                  {currentQuestion.question}
                </p>

                {/* Options List */}
                <div className="space-y-2 mb-4">
                  {currentQuestion.options.map((option, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    const isSelected = selectedOption === idx;
                    const isAnswered = answeredState?.answered;
                    const isCorrect = idx === currentQuestion.correct;
                    const isUserPick = selectedOption === idx;

                    let optionBorder = 'border-slate-800 hover:border-amber-500/50 bg-slate-950/70 text-slate-200';
                    if (isSelected && !isAnswered) {
                      optionBorder = 'border-amber-400 bg-amber-500/10 text-amber-200 ring-1 ring-amber-400';
                    } else if (isAnswered) {
                      if (isCorrect) {
                        optionBorder = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold';
                      } else if (isUserPick) {
                        optionBorder = 'border-rose-500 bg-rose-950/40 text-rose-300';
                      } else {
                        optionBorder = 'border-slate-800 opacity-50 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${optionBorder}`}
                      >
                        <span className="w-6 h-6 rounded bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                          {letter}
                        </span>
                        <span className="text-xs sm:text-sm flex-1 leading-snug">
                          {option}
                        </span>
                        {isAnswered && isCorrect && (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                        )}
                        {isAnswered && isUserPick && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action / Feedback row */}
              <div>
                {!answeredState?.answered ? (
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      Tip: Tekan tombol [A], [B], [C] lalu [Enter]
                    </span>
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="w-full sm:w-auto ml-auto px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30"
                    >
                      <span>Lancarkan Serangan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    {/* Educational feedback note */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-400">Penjelasan Kaidah: </span>
                        <span>{answeredState.explanation}</span>
                      </div>
                    </div>

                    {monster.currentHp > 0 && player.hp > 0 && (
                      <button
                        onClick={handleNextTurn}
                        className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Lanjutkan Pertarungan</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Battle Log Component */}
      <BattleLog
        logs={battleLogs}
        onClearLogs={() => setBattleLogs([])}
      />
    </div>
  );
};
