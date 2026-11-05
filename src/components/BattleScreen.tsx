import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sword, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookMarked
} from 'lucide-react';
import { Player, MonsterState, GrammarQuestion, BattleLogEntry } from '../types/game';
import { REGION_GRAMMAR_DB, CAMPAIGN_GRAMMAR_DB } from '../data/grammarDb';
import { CLASS_ACTIVE_SKILLS } from '../data/itemData';
import { soundManager } from '../utils/audio';
import { BattleLog } from './BattleLog';
import { GrammarCodexModal } from './GrammarCodexModal';

interface BattleScreenProps {
  player: Player;
  monster: MonsterState;
  encounterIndex: number;
  totalEncounters: number;
  stageId?: number;
  stageTitle?: string;
  onMonsterDefeated: (updatedPlayer: Player, droppedItemName?: string) => void;
  onPlayerDefeated: (updatedPlayer: Player) => void;
}

const CLASS_ABILITIES: Record<Player['charClass'], { name: string; verb: string }> = {
  "Syntax Knight": { name: "Blade of Proper Agreement", verb: "swung" },
  "Vocab Mage": { name: "Lexical Surge", verb: "used" },
  "Punctuation Rogue": { name: "Semicolon Dagger", verb: "hurled" }
};

const MONSTER_ABILITIES: Record<string, string> = {
  // Stage 1: Parts of Speech
  "Noun & Pronoun Goblin": "Anaphoric Confusion",
  "Action Verb Troll": "Stative Transgression",
  "Modifier Dragon": "Adjectival Chaos",
  "Preposition Chimera": "Spatial Displacement",
  "The Lexical Part-of-Speech Overlord": "Lexical Chaos Blast",

  // Stage 2: 16 Tenses & Conjunctions (Wilayah 1-5)
  "Present Tense Goblin": "Present Distortion",
  "Past Tense Troll": "Past Timeline Warp",
  "Future Chrono Dragon": "Chrono Future Breath",
  "Past-Future Chimera": "Hypothetical Strike",
  "The Great Conjunction Overlord": "Nexus Severance Ray",

  // Stage 3: Clauses Mastery
  "Noun Clause Goblin": "Embedded Interrogation",
  "Relative Clause Troll": "Antecedent Sever",
  "Temporal & Conditional Drake": "Temporal Paradox Split",
  "Contrast & Cause Chimera": "Concessive Paradox",
  "The Arch-Clause Nexus Overlord": "Subordinate Desolation",

  // Fallbacks
  "Typo Goblin": "Typo Ambush",
  "Tense-Twisting Troll": "Timeline Warp",
  "Comma Splice Dragon": "Run-On Breath",
  "Dangling Modifier Chimera": "Ambiguity Strike",
  "The Great Chaos Overlord (Passive Voice Demon)": "Passive Chaos Ray",
};

// Helper to randomize multiple-choice options for each question without mutating source databases
function shuffleQuestionOptions(question: GrammarQuestion): GrammarQuestion {
  const indexedOptions = question.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === question.correct,
  }));

  // Fisher-Yates shuffle algorithm
  for (let i = indexedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexedOptions[i], indexedOptions[j]] = [indexedOptions[j], indexedOptions[i]];
  }

  const randomizedOptions = indexedOptions.map((item) => item.text);
  const newCorrectIndex = indexedOptions.findIndex((item) => item.isCorrect);

  return {
    ...question,
    options: randomizedOptions,
    correct: newCorrectIndex >= 0 ? newCorrectIndex : 0,
  };
}

export const BattleScreen: React.FC<BattleScreenProps> = ({
  player: initialPlayer,
  monster: initialMonster,
  encounterIndex,
  totalEncounters,
  stageId = 2,
  stageTitle = "Stage 2: 16 Tenses",
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
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);
  const [isSectorDefeated, setIsSectorDefeated] = useState<boolean>(false);

  // New item & active skill states
  const [eliminatedOptions, setEliminatedOptions] = useState<Set<number>>(new Set());
  const [isShieldActive, setIsShieldActive] = useState<boolean>(false);
  const [isKnightParryActive, setIsKnightParryActive] = useState<boolean>(false);
  const [isDamageBuffActive, setIsDamageBuffActive] = useState<boolean>(false);
  const [damageBuffAmount, setDamageBuffAmount] = useState<number>(0);

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
    // 1. Get stage- and region-specific pool
    const stagePool = CAMPAIGN_GRAMMAR_DB[stageId] || CAMPAIGN_GRAMMAR_DB[2];
    const regionPool = stagePool[encounterIndex] || REGION_GRAMMAR_DB[encounterIndex] || stagePool[0];

    // 2. Filter out already presented questions
    let availableQuestions = regionPool.filter((q) => !currentUsed.has(q.id));

    // 3. If all questions in this region have been used, recycle cleanly
    if (availableQuestions.length === 0) {
      availableQuestions = regionPool;
      setUsedQuestionIds(new Set());
    }

    // 4. Select random question from unused pool and randomize multiple-choice options
    const chosen = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    setUsedQuestionIds((prev) => new Set(prev).add(chosen.id));
    setCurrentQuestion(shuffleQuestionOptions(chosen));
    setSelectedOption(null);
    setAnsweredState(null);
    setEliminatedOptions(new Set()); // Reset 50:50 eliminated choices for the new question
  };

  // Initialize encounter
  useEffect(() => {
    setPlayer(initialPlayer);
    setMonster(initialMonster);
    setIsSectorDefeated(false);
    setIsShieldActive(false);
    setIsKnightParryActive(false);
    setIsDamageBuffActive(false);
    const freshUsed = new Set<string>();
    setUsedQuestionIds(freshUsed);
    setBattleLogs([
      {
        id: 'init_1',
        text: `⚠️ MONSTER MUNCUL! Seekor ${initialMonster.name} menghadang jalanmu di [${stageTitle}] Wilayah ${encounterIndex + 1}!`,
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

  // ==========================================
  // CONSUMABLE ITEM HANDLERS
  // ==========================================

  // 1. Use Elixir of Eloquence (Potion HP)
  const handleUsePotion = () => {
    if (player.potions <= 0) {
      soundManager.playHit();
      addLog("❌ Kamu tidak memiliki Elixir tersisa!", 'system');
      return;
    }

    if (player.hp >= player.maxHp) {
      addLog("ℹ️ HP kamu sudah penuh!", 'system');
      return;
    }

    soundManager.playPotion();
    const healAmount = 45;
    const newHp = Math.min(player.maxHp, player.hp + healAmount);
    const updated: Player = {
      ...player,
      hp: newHp,
      potions: player.potions - 1,
      potionsUsed: player.potionsUsed + 1,
      itemsUsed: (player.itemsUsed || 0) + 1,
    };
    setPlayer(updated);
    addLog(`🧪 Kamu meminum 'Elixir of Eloquence', memulihkan +${healAmount} HP! (${newHp}/${player.maxHp})`, 'heal', {
      actor: player.name,
      actionName: 'Elixir of Eloquence',
      heal: healAmount
    });
  };

  // 2. Use Scroll of Clarification (50:50 - eliminates 1 wrong option)
  const handleUseScrollEliminate = () => {
    if ((player.scrollEliminate || 0) <= 0) {
      soundManager.playHit();
      addLog("❌ Kamu tidak memiliki Scroll of Clarification tersisa!", 'system');
      return;
    }

    if (!currentQuestion || answeredState?.answered) return;

    // Find wrong options that haven't been eliminated yet
    const wrongIndices = currentQuestion.options
      .map((_, idx) => idx)
      .filter((idx) => idx !== currentQuestion.correct && !eliminatedOptions.has(idx));

    if (wrongIndices.length === 0) {
      addLog("ℹ️ Semua pilihan yang salah sudah tereliminasi!", 'system');
      return;
    }

    // Pick 1 wrong option to eliminate
    const toEliminate = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
    const newEliminated = new Set(eliminatedOptions);
    newEliminated.add(toEliminate);
    setEliminatedOptions(newEliminated);

    // If the player currently had that option selected, deselect it
    if (selectedOption === toEliminate) {
      setSelectedOption(null);
    }

    soundManager.playItemUse();
    setPlayer((prev) => ({
      ...prev,
      scrollEliminate: (prev.scrollEliminate || 0) - 1,
      itemsUsed: (prev.itemsUsed || 0) + 1,
    }));

    addLog(`📜 Kamu menggunakan 'Scroll of Clarification (50:50)'! Pilihan [${String.fromCharCode(65 + toEliminate)}] berhasil dilenyapkan!`, 'hero');
  };

  // 3. Use Punctuation Smoke Bomb (Skip question safely)
  const handleUseSmokeBomb = () => {
    if ((player.smokeBombs || 0) <= 0) {
      soundManager.playHit();
      addLog("❌ Kamu tidak memiliki Bom Asap tersisa!", 'system');
      return;
    }

    if (answeredState?.answered) return;

    soundManager.playSmoke();
    setPlayer((prev) => ({
      ...prev,
      smokeBombs: (prev.smokeBombs || 0) - 1,
      itemsUsed: (prev.itemsUsed || 0) + 1,
    }));

    addLog(`💨 Kamu melempar 'Punctuation Smoke Bomb'! Asap tebal membubung, soal membingungkan diganti tanpa serangan monster!`, 'hero');
    pickNewQuestion();
  };

  // 4. Use Rune of Critical Agreement (+25 DMG)
  const handleUseDamageRune = () => {
    if ((player.damageRunes || 0) <= 0) {
      soundManager.playHit();
      addLog("❌ Kamu tidak memiliki Rune of Critical Agreement tersisa!", 'system');
      return;
    }

    if (isDamageBuffActive) {
      addLog("ℹ️ Rune serangan sudah aktif!", 'system');
      return;
    }

    soundManager.playSkill();
    setIsDamageBuffActive(true);
    setDamageBuffAmount(25);
    setPlayer((prev) => ({
      ...prev,
      damageRunes: (prev.damageRunes || 0) - 1,
      itemsUsed: (prev.itemsUsed || 0) + 1,
    }));

    addLog(`⚡ Kamu mengaktifkan 'Rune of Critical Agreement'! Senjata berpendar tajam: serangan benar berikutnya bertambah +25 DMG!`, 'hero');
  };

  // 5. Use Aegis Ward (Barrier Scroll - blocks 1 wrong attack)
  const handleUseAegisWard = () => {
    if ((player.aegisWards || 0) <= 0) {
      soundManager.playHit();
      addLog("❌ Kamu tidak memiliki Aegis Ward tersisa!", 'system');
      return;
    }

    if (isShieldActive) {
      addLog("ℹ️ Perisai perlindungan sudah aktif!", 'system');
      return;
    }

    soundManager.playShield();
    setIsShieldActive(true);
    setPlayer((prev) => ({
      ...prev,
      aegisWards: (prev.aegisWards || 0) - 1,
      itemsUsed: (prev.itemsUsed || 0) + 1,
    }));

    addLog(`🛡️ Kamu merapalkan 'Aegis Ward'! Perisai sihir melindungimu dari 1 kali serangan monster jika jawabanmu salah!`, 'hero');
  };

  // ==========================================
  // CLASS ACTIVE SKILL HANDLER
  // ==========================================
  const activeSkill = CLASS_ACTIVE_SKILLS[player.charClass];

  const handleUseClassSkill = () => {
    if (player.skillCooldown > 0) {
      soundManager.playHit();
      addLog(`⏳ Skill '${activeSkill.name}' sedang cooldown! Tunggu ${player.skillCooldown} putaran lagi.`, 'system');
      return;
    }

    if (answeredState?.answered) return;

    if (player.charClass === 'Syntax Knight') {
      soundManager.playShield();
      soundManager.playSkill();
      setIsShieldActive(true);
      setIsKnightParryActive(true);
      setPlayer((prev) => ({ ...prev, skillCooldown: activeSkill.cooldownMax }));
      addLog(`🛡️ [SKILL AKTIF] ${player.name} membangkitkan '${activeSkill.name}' dari ${activeSkill.artifactName}! Kebal terhadap 1x kesalahan & siap memantulkan 20 DMG!`, 'hero');
    } else if (player.charClass === 'Vocab Mage') {
      if (!currentQuestion) return;
      const wrongIndices = currentQuestion.options
        .map((_, idx) => idx)
        .filter((idx) => idx !== currentQuestion.correct && !eliminatedOptions.has(idx));

      if (wrongIndices.length === 0) {
        addLog("ℹ️ Semua pilihan salah sudah tereliminasi!", 'system');
        return;
      }

      const toEliminate = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
      const newEliminated = new Set(eliminatedOptions);
      newEliminated.add(toEliminate);
      setEliminatedOptions(newEliminated);

      if (selectedOption === toEliminate) setSelectedOption(null);

      soundManager.playSkill();
      setPlayer((prev) => ({ ...prev, skillCooldown: activeSkill.cooldownMax }));
      addLog(`📖 [SKILL AKTIF] ${player.name} merapal '${activeSkill.name}' dari ${activeSkill.artifactName}! Pilihan keliru [${String.fromCharCode(65 + toEliminate)}] langsung lenyap!`, 'hero');
    } else {
      // Punctuation Rogue
      soundManager.playSmoke();
      soundManager.playSkill();
      setIsDamageBuffActive(true);
      setDamageBuffAmount(20);
      setPlayer((prev) => ({ ...prev, skillCooldown: activeSkill.cooldownMax }));
      addLog(`⏳ [SKILL AKTIF] ${player.name} mengaktifkan '${activeSkill.name}' dari ${activeSkill.artifactName}! Soal diganti ke kalimat baru dan serangan berikutnya bertambah +20 DMG!`, 'hero');
      pickNewQuestion();
    }
  };

  // Handle selecting grammar options
  const handleSelectOption = (idx: number) => {
    if (answeredState?.answered) return;
    if (eliminatedOptions.has(idx)) {
      soundManager.playHit();
      addLog("❌ Pilihan ini sudah dieliminasi!", 'system');
      return;
    }
    setSelectedOption(idx);
    soundManager.playBlip();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion || answeredState?.answered) return;

    const isCorrect = selectedOption === currentQuestion.correct;
    const correctLetter = String.fromCharCode(65 + currentQuestion.correct);

    // Cooldown progression: decrement by 1 on each question answered
    const nextCooldown = Math.max(0, (player.skillCooldown || 0) - 1);

    if (isCorrect) {
      soundManager.playSlash();
      soundManager.playShake();
      setIsAttacking('player');

      const baseDmg = player.damageMod;
      const roll = Math.floor(Math.random() * 11) + 5; // 5-15
      let bonusDmg = 0;

      if (isDamageBuffActive) {
        bonusDmg = damageBuffAmount;
        setIsDamageBuffActive(false);
        setDamageBuffAmount(0);
      }

      const totalDmgDealt = baseDmg + roll + bonusDmg;
      const nextMonsterHp = Math.max(0, monster.currentHp - totalDmgDealt);

      setFloatingDamage({ target: 'monster', amount: totalDmgDealt });
      setMonster((prev) => ({ ...prev, currentHp: nextMonsterHp }));

      const updatedPlayer: Player = {
        ...player,
        questionsAnswered: player.questionsAnswered + 1,
        correctAnswers: player.correctAnswers + 1,
        totalDamageDealt: player.totalDamageDealt + totalDmgDealt,
        skillCooldown: nextCooldown,
      };
      setPlayer(updatedPlayer);

      const ability = CLASS_ABILITIES[player.charClass];
      addLog(`⚔️ You used '${ability.name}' for ${totalDmgDealt} damage!${bonusDmg > 0 ? ` (+${bonusDmg} Bonus Rune/Skill!)` : ''}`, 'hero', {
        actor: player.name,
        target: monster.name,
        actionName: ability.name,
        damage: totalDmgDealt,
        isCritical: totalDmgDealt >= player.damageMod + 12 || bonusDmg > 0
      });
      addLog(`✨ ${player.name} ${getAttackNarration(player.charClass)} (${monster.name}: ${nextMonsterHp}/${monster.hp} HP)`, 'damage-deal', {
        actor: player.name,
        target: monster.name,
        damage: totalDmgDealt
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
          // Monster defeated & Sector Cleared!
          soundManager.playSectorVictory(encounterIndex);
          setIsSectorDefeated(true);
          const sectorConfettiColors: string[][] = [
            ['#10b981', '#34d399', '#f59e0b', '#ffffff'],
            ['#f59e0b', '#d97706', '#ef4444', '#ffffff'],
            ['#06b6d4', '#3b82f6', '#8b5cf6', '#ffffff'],
            ['#a855f7', '#ec4899', '#fbbf24', '#ffffff'],
            ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#ffffff']
          ];
          try {
            confetti({
              particleCount: 90,
              spread: 75,
              origin: { y: 0.55 },
              colors: sectorConfettiColors[encounterIndex] || ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24', '#ffffff']
            });
          } catch {
            // Safe fallback
          }
          addLog(`🏆 SEKTOR DISUCIKAN! Kamu berhasil mengalahkan & menyucikan ${monster.name}!`, 'system');

          // Generous varied item drop
          let droppedItemText: string | undefined = undefined;
          const dropRoll = Math.random();
          if (dropRoll < 0.50) {
            droppedItemText = "1x Elixir of Eloquence (+45 HP)";
            updatedPlayer.potions += 1;
          } else if (dropRoll < 0.70) {
            droppedItemText = "1x Scroll of Clarification (50:50)";
            updatedPlayer.scrollEliminate = (updatedPlayer.scrollEliminate || 0) + 1;
          } else if (dropRoll < 0.85) {
            droppedItemText = "1x Rune of Critical Agreement (+25 DMG)";
            updatedPlayer.damageRunes = (updatedPlayer.damageRunes || 0) + 1;
          } else {
            droppedItemText = "1x Aegis Ward (Perisai Tangkal Serangan)";
            updatedPlayer.aegisWards = (updatedPlayer.aegisWards || 0) + 1;
          }

          if (droppedItemText) {
            addLog(`🎁 Monster menjatuhkan ${droppedItemText}!`, 'heal');
          }

          setTimeout(() => {
            onMonsterDefeated(updatedPlayer, droppedItemText);
          }, 1600);
        }
      }, 800);
    } else {
      // Wrong answer - monster retaliates (unless shielded!)
      soundManager.playHit();
      soundManager.playShake();
      setIsAttacking('monster');

      let damageTaken = monster.damage;
      let nextPlayerHp = player.hp;

      if (isShieldActive) {
        soundManager.playShield();
        damageTaken = 0;
        setIsShieldActive(false);

        if (isKnightParryActive) {
          setIsKnightParryActive(false);
          const parryDmg = 20;
          const parriedMonsterHp = Math.max(0, monster.currentHp - parryDmg);
          setMonster((prev) => ({ ...prev, currentHp: parriedMonsterHp }));
          setFloatingDamage({ target: 'monster', amount: parryDmg });
          addLog(`🛡️ PANTULAN CONCORD! Perisai 'Aegis of Concord' memantulkan ${parryDmg} DMG balik ke ${monster.name}!`, 'hero');
        }

        addLog(`🛡️ PERISAI MENAHAN SERANGAN! Serangan ${monster.name} sepenuhnya dinetralkan oleh Aegis Ward / Fortress of Concord!`, 'system');
      } else {
        nextPlayerHp = Math.max(0, player.hp - damageTaken);
        setFloatingDamage({ target: 'player', amount: damageTaken });
      }

      const updatedPlayer: Player = {
        ...player,
        hp: nextPlayerHp,
        questionsAnswered: player.questionsAnswered + 1,
        totalDamageTaken: player.totalDamageTaken + damageTaken,
        skillCooldown: nextCooldown,
      };
      setPlayer(updatedPlayer);

      const monsterSpell = MONSTER_ABILITIES[monster.name] || 'Syntax Corruption';
      if (damageTaken > 0) {
        addLog(`👹 ${monster.name} used '${monsterSpell}' for ${damageTaken} damage!`, 'monster', {
          actor: monster.name,
          target: player.name,
          actionName: monsterSpell,
          damage: damageTaken
        });
      }
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

  // Keyboard shortcut support (A, B, C, D, P for Potion, S for Skill)
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
      if (e.key === 'd' || e.key === 'D') handleSelectOption(3);
      if (e.key === 'p' || e.key === 'P') handleUsePotion();
      if (e.key === 's' || e.key === 'S') handleUseClassSkill();
      if (e.key === 'g' || e.key === 'G') {
        soundManager.playBlip();
        setIsCodexOpen((prev) => !prev);
      }
      if (e.key === 'Enter') handleSubmitAnswer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answeredState, selectedOption, currentQuestion, player, monster, eliminatedOptions, isShieldActive, isDamageBuffActive]);

  const monsterHpPercent = Math.max(0, Math.min(100, (monster.currentHp / monster.hp) * 100));
  const playerHpPercent = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
  const playerExpPercent = Math.max(0, Math.min(100, (player.exp / player.expNeeded) * 100));
  const isMonsterTakingDamage = isAttacking === 'player';
  const isPlayerTakingDamage = isAttacking === 'monster' && !isShieldActive;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Sector Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-lg">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
            {stageTitle}
          </span>
          <span className="text-slate-400">
            • WILAYAH {encounterIndex + 1} DARI {totalEncounters}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>FOKUS: {currentQuestion?.category || monster.title}</span>
        </div>
      </div>

      {/* Main Battle Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Left Column: Monster Visual & Info Card (5 cols) */}
        <div className={`lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
          isMonsterTakingDamage ? 'animate-hit-flash animate-shake ring-2 ring-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)]' : ''
        } ${isSectorDefeated ? 'animate-purify ring-2 ring-emerald-400' : ''}`}>
          
          {/* Confetti & Particle Sparks on Damage */}
          {isMonsterTakingDamage && (
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-amber-400/20 blur-xl animate-ping" />
              <div className="text-amber-300 font-pixel text-lg font-bold animate-bounce drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">
                ⚡ HIT! ⚡
              </div>
            </div>
          )}

          {/* Floating Damage Indicator */}
          {floatingDamage?.target === 'monster' && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 font-pixel text-2xl text-amber-400 font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-frame-damage">
              -{floatingDamage.amount} DMG!
            </div>
          )}

          {/* Monster Title & Tier */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase tracking-widest font-bold">
                Tier {monster.tier} Boss
              </span>
              <span className="text-xs font-mono text-slate-400">
                DMG: <strong className="text-rose-400">{monster.damage}</strong>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-title mb-1 flex items-center gap-2">
              <span>{monster.name}</span>
            </h3>
            <p className="text-xs text-amber-400/90 font-mono mb-4">
              {monster.title}
            </p>

            {/* Monster Avatar Graphic */}
            <div className={`relative h-44 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/80 flex items-center justify-center overflow-hidden my-2 shadow-inner ${
              isAttacking === 'monster' ? 'animate-monster-lunge ring-2 ring-rose-500/80 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : ''
            } ${isMonsterTakingDamage ? 'animate-shake' : ''}`}>
              <div className="text-6xl sm:text-7xl select-none filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] transition-transform duration-200">
                {monster.avatarType === 'goblin' && '👺'}
                {monster.avatarType === 'troll' && '👹'}
                {monster.avatarType === 'dragon' && '🐲'}
                {monster.avatarType === 'chimera' && '🦁'}
                {monster.avatarType === 'overlord' && '👑'}
              </div>

              {isSectorDefeated && (
                <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center animate-fade-in">
                  <span className="text-emerald-300 font-pixel text-sm font-bold tracking-widest border border-emerald-500/50 bg-emerald-950/90 px-3 py-1.5 rounded-lg shadow-lg">
                    ✨ DISUCIKAN ✨
                  </span>
                </div>
              )}
            </div>

            {/* Monster HP Bar */}
            <div className="mt-4 space-y-1 font-mono">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> HP Monster
                </span>
                <span className="font-bold text-slate-200">
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

        {/* Right Column: Player Status, Artifact Skill & Inventory (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Player Status Card */}
          <div className={`bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-4 relative overflow-hidden transition-all duration-300 ${
            isAttacking === 'player' ? 'animate-player-cast ring-2 ring-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : ''
          } ${isPlayerTakingDamage ? 'animate-hit-flash animate-shake ring-2 ring-rose-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]' : ''} ${
            isShieldActive ? 'ring-2 ring-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''
          }`}>
            
            {/* Frame-Based Monster Strike Overlay on Player */}
            {isAttacking === 'monster' && !isShieldActive && (
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
                <div className={`w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300 text-sm font-mono ${
                  isPlayerTakingDamage ? 'animate-shake ring-2 ring-rose-500' : ''
                }`}>
                  Lv.{player.level}
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-base font-title flex items-center gap-2">
                    <span>{player.name}</span>
                    {isShieldActive && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold animate-pulse">
                        🛡️ PERISAI AKTIF
                      </span>
                    )}
                    {isDamageBuffActive && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold animate-pulse">
                        ⚡ +{damageBuffAmount} DMG AKTIF
                      </span>
                    )}
                  </h4>
                  <span className="text-xs text-amber-400 font-mono">
                    {player.charClass} • Senjata: {CLASS_ABILITIES[player.charClass]?.name}
                  </span>
                </div>
              </div>

              {/* Grammar Codex Modal Trigger */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playBlip();
                  setIsCodexOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900/90 border border-amber-500/60 text-amber-300 text-xs font-mono font-semibold transition-all cursor-pointer shadow-md hover:shadow-amber-500/20 active:scale-95"
                title="Buka Grammar Codex: Pelajari rumus & kaidah tenses/conjunction monster ini"
              >
                <BookMarked className="w-4 h-4 text-amber-400" />
                <span>Grammar Codex</span>
                <span className="text-[10px] text-amber-400/80 hidden sm:inline">[G]</span>
              </button>
            </div>

            {/* Health & EXP Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
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

            {/* SECTION: CLASS INNATE ARTIFACT & ACTIVE SKILL */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm">
                  {activeSkill.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                    <span>{activeSkill.artifactName}:</span>
                    <span className="text-slate-200">{activeSkill.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {activeSkill.effectLabel}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleUseClassSkill}
                disabled={player.skillCooldown > 0 || answeredState?.answered}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                  player.skillCooldown > 0 || answeredState?.answered
                    ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 border-amber-300 active:scale-95 shadow-amber-900/30'
                }`}
                title={`Gunakan Skill Aktif '${activeSkill.name}' (Tombol S)`}
              >
                <span>{activeSkill.icon}</span>
                <span>
                  {player.skillCooldown > 0 ? `CD: ${player.skillCooldown} Turn` : 'Gunakan Skill [S]'}
                </span>
              </button>
            </div>

            {/* SECTION: QUICK CONSUMABLE ITEMS INVENTORY */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/60">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                  📦 Tas Perlengkapan & Item Cepat:
                </span>
                <span className="text-[10px] text-slate-500">Klik item untuk menggunakan</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                {/* 1. Elixir of Eloquence (Potion HP) */}
                <button
                  type="button"
                  onClick={handleUsePotion}
                  disabled={player.potions <= 0 || player.hp >= player.maxHp}
                  className="p-2 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-left transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm group"
                  title="Elixir of Eloquence: Pulihkan +45 HP [P]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">🧪</span>
                    <span className="font-bold text-[11px] px-1.5 py-0.2 rounded bg-emerald-900/80 text-emerald-200 border border-emerald-500/30">
                      {player.potions}x
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-1 truncate">
                    Elixir HP
                  </div>
                  <div className="text-[9px] text-emerald-400 truncate">
                    +45 HP
                  </div>
                </button>

                {/* 2. Scroll of Clarification (50:50) */}
                <button
                  type="button"
                  onClick={handleUseScrollEliminate}
                  disabled={(player.scrollEliminate || 0) <= 0 || answeredState?.answered}
                  className="p-2 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-left transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm group"
                  title="Scroll of Clarification: Lenyapkan 1 opsi salah (50:50)"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">📜</span>
                    <span className="font-bold text-[11px] px-1.5 py-0.2 rounded bg-cyan-900/80 text-cyan-200 border border-cyan-500/30">
                      {player.scrollEliminate || 0}x
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-1 truncate">
                    Scroll 50:50
                  </div>
                  <div className="text-[9px] text-cyan-400 truncate">
                    -1 Opsi Salah
                  </div>
                </button>

                {/* 3. Punctuation Smoke Bomb */}
                <button
                  type="button"
                  onClick={handleUseSmokeBomb}
                  disabled={(player.smokeBombs || 0) <= 0 || answeredState?.answered}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-left transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm group"
                  title="Punctuation Smoke Bomb: Ganti soal saat ini tanpa diserang monster"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">💨</span>
                    <span className="font-bold text-[11px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-200 border border-slate-600">
                      {player.smokeBombs || 0}x
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-1 truncate">
                    Bom Asap
                  </div>
                  <div className="text-[9px] text-slate-400 truncate">
                    Ganti Soal
                  </div>
                </button>

                {/* 4. Rune of Critical Agreement */}
                <button
                  type="button"
                  onClick={handleUseDamageRune}
                  disabled={(player.damageRunes || 0) <= 0 || isDamageBuffActive || answeredState?.answered}
                  className="p-2 rounded-lg bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 text-left transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm group"
                  title="Rune of Critical Agreement: Serangan benar berikutnya +25 DMG"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">⚡</span>
                    <span className="font-bold text-[11px] px-1.5 py-0.2 rounded bg-amber-900/80 text-amber-200 border border-amber-500/30">
                      {player.damageRunes || 0}x
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-1 truncate">
                    Rune Serangan
                  </div>
                  <div className="text-[9px] text-amber-400 truncate">
                    +25 DMG Hit
                  </div>
                </button>

                {/* 5. Aegis Ward */}
                <button
                  type="button"
                  onClick={handleUseAegisWard}
                  disabled={(player.aegisWards || 0) <= 0 || isShieldActive || answeredState?.answered}
                  className="p-2 rounded-lg bg-blue-950/50 hover:bg-blue-900/60 border border-blue-500/40 text-blue-300 text-left transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm group"
                  title="Aegis Ward: Menahan 1 kali serangan salah monster"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">🛡️</span>
                    <span className="font-bold text-[11px] px-1.5 py-0.2 rounded bg-blue-900/80 text-blue-200 border border-blue-500/30">
                      {player.aegisWards || 0}x
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-1 truncate">
                    Aegis Ward
                  </div>
                  <div className="text-[9px] text-blue-400 truncate">
                    Blok 1x Salah
                  </div>
                </button>
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
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playBlip();
                        setIsCodexOpen(true);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold cursor-pointer transition-all hover:border-amber-400 shadow-sm"
                      title="Buka Codex Formula materi saat ini"
                    >
                      <BookMarked className="w-3.5 h-3.5 text-amber-400" />
                      <span>Rumus & Kaidah</span>
                    </button>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {currentQuestion.category || `Tier ${monster.tier}`}
                    </span>
                  </div>
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
                    const isEliminated = eliminatedOptions.has(idx);

                    let optionBorder = 'border-slate-800 hover:border-amber-500/50 bg-slate-950/70 text-slate-200';
                    if (isEliminated) {
                      optionBorder = 'border-red-950/60 bg-red-950/20 text-red-400/50 line-through opacity-40 cursor-not-allowed';
                    } else if (isSelected && !isAnswered) {
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
                        disabled={isAnswered || isEliminated}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${optionBorder}`}
                      >
                        <span className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                          isEliminated 
                            ? 'bg-red-950 border border-red-800 text-red-400' 
                            : 'bg-slate-900 border border-slate-700 text-slate-300'
                        }`}>
                          {letter}
                        </span>
                        <span className={`text-xs sm:text-sm flex-1 leading-snug ${isEliminated ? 'line-through' : ''}`}>
                          {option}
                        </span>
                        {isEliminated && (
                          <span className="text-[10px] font-mono text-red-400 px-2 py-0.5 rounded bg-red-950/60 border border-red-800/40 shrink-0">
                            ❌ Dieliminasi (50:50)
                          </span>
                        )}
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
                      Tip: Tekan tombol [A], [B], [C], [P] Potion, [S] Skill lalu [Enter]
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

      {/* Grammar Codex Modal with Sector Formulas */}
      <GrammarCodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        sectorIndex={encounterIndex}
        stageId={stageId}
      />
    </div>
  );
};
