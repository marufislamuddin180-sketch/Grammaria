import React, { useState, useEffect } from 'react';
import { Player, MonsterState, GameStage } from './types/game';
import { MONSTER_ENCOUNTERS } from './data/monsters';
import { Header } from './components/Header';
import { CharacterSelect } from './components/CharacterSelect';
import { BattleScreen } from './components/BattleScreen';
import { EncounterVictoryScreen, GameClearedScreen } from './components/VictoryScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { soundManager } from './utils/audio';
import { bgmManager } from './utils/bgm';

export const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>('character-creation');
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentEncounterIndex, setCurrentEncounterIndex] = useState<number>(0);
  const [currentMonster, setCurrentMonster] = useState<MonsterState | null>(null);
  const [lastBattleOutcome, setLastBattleOutcome] = useState<{
    potionDropped: boolean;
    leveledUp: boolean;
  }>({ potionDropped: false, leveledUp: false });

  // Synchronize BGM tracks with the active stage and encounter
  useEffect(() => {
    if (stage === 'battle') {
      const isBoss = currentEncounterIndex === MONSTER_ENCOUNTERS.length - 1;
      bgmManager.playTrack(isBoss ? 'boss' : 'battle');
    } else if (stage === 'battle-victory' || stage === 'game-cleared') {
      bgmManager.playTrack('victory');
    } else if (stage === 'character-creation') {
      bgmManager.playTrack('title');
    } else if (stage === 'game-over') {
      bgmManager.stop();
    }
  }, [stage, currentEncounterIndex]);

  // Start Quest from character selection
  const handleStartQuest = (newPlayer: Player) => {
    setPlayer(newPlayer);
    setCurrentEncounterIndex(0);
    const firstMonster = MONSTER_ENCOUNTERS[0];
    setCurrentMonster({
      ...firstMonster,
      currentHp: firstMonster.hp
    });
    setStage('battle');
  };

  // Called when a monster is defeated
  const handleMonsterDefeated = (updatedPlayer: Player, droppedPotion: boolean) => {
    let p = { ...updatedPlayer };
    if (droppedPotion) {
      p.potions += 1;
    }

    // EXP Gain & Level Up logic (matching grammaria.py)
    const expGained = 35;
    let newExp = p.exp + expGained;
    let leveledUp = false;

    if (newExp >= p.expNeeded) {
      leveledUp = true;
      soundManager.playLevelUp();
      const newLevel = p.level + 1;
      newExp = newExp - p.expNeeded;
      const newExpNeeded = p.expNeeded + 50;
      const newMaxHp = p.maxHp + 20;

      p = {
        ...p,
        level: newLevel,
        exp: newExp,
        expNeeded: newExpNeeded,
        maxHp: newMaxHp,
        hp: newMaxHp // Fully heal on level up
      };
    } else {
      p = {
        ...p,
        exp: newExp
      };
    }

    setPlayer(p);
    setLastBattleOutcome({
      potionDropped: droppedPotion,
      leveledUp
    });

    // Check if final boss was defeated
    if (currentEncounterIndex >= MONSTER_ENCOUNTERS.length - 1) {
      setStage('game-cleared');
    } else {
      setStage('battle-victory');
    }
  };

  // Proceed to next encounter
  const handleProceedNextEncounter = () => {
    const nextIndex = currentEncounterIndex + 1;
    if (nextIndex < MONSTER_ENCOUNTERS.length) {
      setCurrentEncounterIndex(nextIndex);
      const nextMon = MONSTER_ENCOUNTERS[nextIndex];
      setCurrentMonster({
        ...nextMon,
        currentHp: nextMon.hp
      });
      setStage('battle');
    } else {
      setStage('game-cleared');
    }
  };

  // Player died
  const handlePlayerDefeated = (updatedPlayer: Player) => {
    setPlayer(updatedPlayer);
    setStage('game-over');
  };

  // Retry same encounter
  const handleRetryEncounter = () => {
    if (!player) return;
    const restoredPlayer: Player = {
      ...player,
      hp: player.maxHp,
      potions: Math.max(player.potions, 1) // Give at least 1 potion for retry
    };
    setPlayer(restoredPlayer);
    const mon = MONSTER_ENCOUNTERS[currentEncounterIndex];
    setCurrentMonster({
      ...mon,
      currentHp: mon.hp
    });
    setStage('battle');
  };

  // Start fresh
  const handleStartFresh = () => {
    setPlayer(null);
    setCurrentMonster(null);
    setCurrentEncounterIndex(0);
    setStage('character-creation');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-mono relative selection:bg-amber-500 selection:text-slate-950">
      {/* Scanline CRT overlay */}
      <div className="fixed inset-0 scanlines opacity-30 z-30 pointer-events-none" />

      {/* Main App Navigation */}
      <Header
        currentStageIndex={currentEncounterIndex}
        totalStages={MONSTER_ENCOUNTERS.length}
        inGame={stage === 'battle' || stage === 'battle-victory'}
      />

      {/* Screen Views */}
      <main className="flex-1 pb-12">
        {stage === 'character-creation' && (
          <CharacterSelect onStartQuest={handleStartQuest} />
        )}

        {stage === 'battle' && player && currentMonster && (
          <BattleScreen
            player={player}
            monster={currentMonster}
            encounterIndex={currentEncounterIndex}
            totalEncounters={MONSTER_ENCOUNTERS.length}
            onMonsterDefeated={handleMonsterDefeated}
            onPlayerDefeated={handlePlayerDefeated}
          />
        )}

        {stage === 'battle-victory' && player && currentMonster && (
          <EncounterVictoryScreen
            player={player}
            defeatedMonster={MONSTER_ENCOUNTERS[currentEncounterIndex]}
            encounterIndex={currentEncounterIndex}
            totalEncounters={MONSTER_ENCOUNTERS.length}
            potionDropped={lastBattleOutcome.potionDropped}
            leveledUp={lastBattleOutcome.leveledUp}
            onProceedNext={handleProceedNextEncounter}
          />
        )}

        {stage === 'game-cleared' && player && (
          <GameClearedScreen
            player={player}
            onRestart={handleStartFresh}
          />
        )}

        {stage === 'game-over' && player && currentMonster && (
          <GameOverScreen
            player={player}
            defeatedByMonster={currentMonster}
            onRetryEncounter={handleRetryEncounter}
            onStartFresh={handleStartFresh}
          />
        )}
      </main>

      {/* Bottom status bar / Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-2.5 text-center text-[11px] text-slate-500 font-mono">
        Grammaria: The Quest for Perfect Syntax • Retro Educational English Grammar RPG
      </footer>
    </div>
  );
};
