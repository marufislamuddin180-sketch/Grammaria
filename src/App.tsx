import React, { useState, useEffect } from 'react';
import { Player, MonsterState, GameStage } from './types/game';
import { STAGE_ENCOUNTERS, MONSTER_ENCOUNTERS } from './data/monsters';
import { CAMPAIGN_STAGES } from './data/campaignStages';
import { Header } from './components/Header';
import { CharacterSelect } from './components/CharacterSelect';
import { BattleScreen } from './components/BattleScreen';
import { EncounterVictoryScreen, GameClearedScreen } from './components/VictoryScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { soundManager } from './utils/audio';
import { bgmManager } from './utils/bgm';

export const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>('character-creation');
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentEncounterIndex, setCurrentEncounterIndex] = useState<number>(0);
  const [currentMonster, setCurrentMonster] = useState<MonsterState | null>(null);
  const [lastBattleOutcome, setLastBattleOutcome] = useState<{
    droppedItemName?: string;
    leveledUp: boolean;
  }>({ leveledUp: false });

  const activeStageInfo = CAMPAIGN_STAGES.find((s) => s.id === currentStageId) || CAMPAIGN_STAGES[0];
  const activeEncounters = STAGE_ENCOUNTERS[currentStageId] || STAGE_ENCOUNTERS[2] || MONSTER_ENCOUNTERS;

  // Synchronize BGM tracks with the active stage and encounter
  useEffect(() => {
    if (stage === 'battle') {
      const isBoss = currentEncounterIndex === activeEncounters.length - 1;
      bgmManager.playTrack(isBoss ? 'boss' : 'battle');
    } else if (stage === 'battle-victory' || stage === 'game-cleared') {
      bgmManager.playTrack('victory');
    } else if (stage === 'character-creation') {
      bgmManager.playTrack('title');
    } else if (stage === 'game-over') {
      bgmManager.stop();
    }
  }, [stage, currentEncounterIndex, activeEncounters.length]);

  // Start Quest from character selection with chosen stage
  const handleStartQuest = (newPlayer: Player, stageId: number) => {
    setCurrentStageId(stageId);
    setPlayer(newPlayer);
    setCurrentEncounterIndex(0);
    const encounters = STAGE_ENCOUNTERS[stageId] || STAGE_ENCOUNTERS[1];
    const firstMonster = encounters[0];
    setCurrentMonster({
      ...firstMonster,
      currentHp: firstMonster.hp
    });
    setStage('battle');
  };

  // Called when a monster is defeated
  const handleMonsterDefeated = (updatedPlayer: Player, droppedItemName?: string) => {
    let p = { ...updatedPlayer };

    // EXP Gain & Level Up logic
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
      droppedItemName,
      leveledUp
    });

    // Check if final boss was defeated
    if (currentEncounterIndex >= activeEncounters.length - 1) {
      setStage('game-cleared');
    } else {
      setStage('battle-victory');
    }
  };

  // Proceed to next encounter
  const handleProceedNextEncounter = () => {
    const nextIndex = currentEncounterIndex + 1;
    if (nextIndex < activeEncounters.length) {
      setCurrentEncounterIndex(nextIndex);
      const nextMon = activeEncounters[nextIndex];
      setCurrentMonster({
        ...nextMon,
        currentHp: nextMon.hp
      });
      setStage('battle');
    } else {
      setStage('game-cleared');
    }
  };

  // Advance to next Campaign Stage (e.g., Stage 1 -> Stage 2 -> Stage 3)
  const handleNextCampaignStage = (nextStageId: number) => {
    setCurrentStageId(nextStageId);
    setCurrentEncounterIndex(0);
    if (player) {
      const restoredPlayer: Player = {
        ...player,
        hp: player.maxHp,
        potions: Math.max(player.potions, 2)
      };
      setPlayer(restoredPlayer);
    }
    const encounters = STAGE_ENCOUNTERS[nextStageId] || STAGE_ENCOUNTERS[2];
    const firstMonster = encounters[0];
    setCurrentMonster({
      ...firstMonster,
      currentHp: firstMonster.hp
    });
    setStage('battle');
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
      potions: Math.max(player.potions, 1), // Give at least 1 potion for retry
      skillCooldown: 0
    };
    setPlayer(restoredPlayer);
    const mon = activeEncounters[currentEncounterIndex];
    setCurrentMonster({
      ...mon,
      currentHp: mon.hp
    });
    setStage('battle');
  };

  // Start fresh or select another stage
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
        totalStages={activeEncounters.length}
        inGame={stage === 'battle' || stage === 'battle-victory'}
        stageId={currentStageId}
        stageTitle={activeStageInfo.title}
        onChangeStage={handleStartFresh}
      />

      {/* Screen Views */}
      <main className="flex-1 pb-12">
        {stage === 'character-creation' && (
          <CharacterSelect 
            onStartQuest={handleStartQuest}
            defaultStageId={currentStageId}
          />
        )}

        {stage === 'battle' && player && currentMonster && (
          <BattleScreen
            player={player}
            monster={currentMonster}
            encounterIndex={currentEncounterIndex}
            totalEncounters={activeEncounters.length}
            stageId={currentStageId}
            stageTitle={activeStageInfo.title}
            onMonsterDefeated={handleMonsterDefeated}
            onPlayerDefeated={handlePlayerDefeated}
          />
        )}

        {stage === 'battle-victory' && player && currentMonster && (
          <EncounterVictoryScreen
            player={player}
            defeatedMonster={activeEncounters[currentEncounterIndex]}
            encounterIndex={currentEncounterIndex}
            totalEncounters={activeEncounters.length}
            stageId={currentStageId}
            stageTitle={activeStageInfo.title}
            droppedItemName={lastBattleOutcome.droppedItemName}
            leveledUp={lastBattleOutcome.leveledUp}
            onProceedNext={handleProceedNextEncounter}
          />
        )}

        {stage === 'game-cleared' && player && (
          <GameClearedScreen
            player={player}
            stageId={currentStageId}
            stageTitle={activeStageInfo.title}
            onRestart={handleStartFresh}
            onNextStage={handleNextCampaignStage}
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
        GramMaru: Multi-Stage Educational English Grammar RPG • Stage 1: Parts of Speech • Stage 2: 16 Tenses (Wilayah 1-5) • Stage 3: Clauses Mastery
      </footer>
    </div>
  );
};
