import React, { useState } from 'react';
import { Shield, Sparkles, Zap, Heart, Sword, CheckCircle2, Map, BookOpen } from 'lucide-react';
import { CharacterClass, Player } from '../types/game';
import { CAMPAIGN_STAGES } from '../data/campaignStages';
import { STAGE_ENCOUNTERS } from '../data/monsters';
import { CLASS_STARTING_LOADOUTS, CLASS_ACTIVE_SKILLS } from '../data/itemData';
import { soundManager } from '../utils/audio';

interface CharacterSelectProps {
  onStartQuest: (player: Player, stageId: number) => void;
  defaultStageId?: number;
}

interface ClassOption {
  type: CharacterClass;
  title: string;
  tagline: string;
  weapon: string;
  narrationPreview: string;
  icon: React.ReactNode;
  borderTheme: string;
  badgeBg: string;
}

const CLASS_OPTIONS: ClassOption[] = [
  {
    type: 'Syntax Knight',
    title: 'Syntax Knight',
    tagline: 'HP tebal, stabil, menguasai perisai concord dan pantulan serangan gramatikal.',
    weapon: 'Blade of Proper Agreement',
    narrationPreview: "Menghunuskan 'Blade of Proper Agreement' dan menebas struktur kacau lawan!",
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    borderTheme: 'hover:border-blue-500/80 border-slate-700 data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-950/30',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
  },
  {
    type: 'Vocab Mage',
    title: 'Vocab Mage',
    tagline: 'Damage tinggi, menguasai kitab leksikal pelenyap opsi jawaban keliru (50:50).',
    weapon: 'Lexical Surge',
    narrationPreview: "Merapal mantra 'Lexical Surge', menyemburkan ledakan sinonim tingkat tinggi!",
    icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    borderTheme: 'hover:border-purple-500/80 border-slate-700 data-[selected=true]:border-purple-500 data-[selected=true]:bg-purple-950/30',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  },
  {
    type: 'Punctuation Rogue',
    title: 'Punctuation Rogue',
    tagline: 'Lincah membawa bom asap dan titik koma temporal untuk mengganti soal membingungkan.',
    weapon: 'Semicolon Dagger',
    narrationPreview: "Melemparkan 'Semicolon Dagger', membelah run-on sentence monster dengan presisi mematikan!",
    icon: <Zap className="w-8 h-8 text-amber-400" />,
    borderTheme: 'hover:border-amber-500/80 border-slate-700 data-[selected=true]:border-amber-500 data-[selected=true]:bg-amber-950/30',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  }
];

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ 
  onStartQuest,
  defaultStageId = 1
}) => {
  const [heroName, setHeroName] = useState<string>('Hero');
  const [selectedClass, setSelectedClass] = useState<CharacterClass>('Syntax Knight');
  const [selectedStageId, setSelectedStageId] = useState<number>(defaultStageId);

  const handleSelectClass = (c: CharacterClass) => {
    soundManager.playBlip();
    setSelectedClass(c);
  };

  const handleSelectStage = (id: number) => {
    soundManager.playBlip();
    setSelectedStageId(id);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSlash();

    const loadout = CLASS_STARTING_LOADOUTS[selectedClass];
    const initialPlayer: Player = {
      name: heroName.trim() || 'Hero',
      charClass: selectedClass,
      hp: loadout.hp,
      maxHp: loadout.hp,
      level: 1,
      exp: 0,
      expNeeded: 50,
      potions: loadout.potions,
      scrollEliminate: loadout.scrollEliminate,
      smokeBombs: loadout.smokeBombs,
      damageRunes: loadout.damageRunes,
      aegisWards: loadout.aegisWards,
      skillCooldown: 0,
      damageMod: loadout.damageMod,
      questionsAnswered: 0,
      correctAnswers: 0,
      potionsUsed: 0,
      itemsUsed: 0,
      totalDamageDealt: 0,
      totalDamageTaken: 0,
    };

    onStartQuest(initialPlayer, selectedStageId);
  };

  const currentStageInfo = CAMPAIGN_STAGES.find((s) => s.id === selectedStageId) || CAMPAIGN_STAGES[0];
  const stageMonsters = STAGE_ENCOUNTERS[selectedStageId] || STAGE_ENCOUNTERS[1];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Storyline Lore Banner */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-900/50 rounded-xl p-6 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
            Retro Educational Text RPG
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-title tracking-wider mb-2">
            GRAMMARU
          </h2>
          <p className="text-amber-500/80 font-mono tracking-widest text-xs uppercase">
            The Multi-Stage Quest for Perfect Syntax
          </p>
        </div>

        {/* Selected Stage Detail Showcase */}
        <div className="bg-black/60 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">📜</span>
              <span className="font-bold text-amber-400">{currentStageInfo.title}</span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
              {currentStageInfo.badge} • {currentStageInfo.difficulty}
            </span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm">
            {currentStageInfo.description}
          </p>

          {/* Sektor Breakdown for the selected stage */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              5 Sektor / Wilayah dalam {currentStageInfo.title}:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {stageMonsters.slice(0, 4).map((mon, idx) => (
                <div key={idx} className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60 border border-slate-800">
                  <span className="font-bold text-amber-400">Wilayah {idx + 1}:</span>
                  <span className="text-slate-200 truncate">{mon.name}</span>
                </div>
              ))}
            </div>
            {stageMonsters[4] && (
              <div className="flex items-center gap-2 p-2 rounded bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-300 font-semibold mt-1">
                <span>👑</span>
                <span>Wilayah 5 (Final Boss): {stageMonsters[4].name} — {stageMonsters[4].title}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleStart} className="space-y-8">
        {/* STEP 1: CAMPAIGN STAGE SELECTOR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
              1
            </div>
            <div>
              <h3 className="font-title text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <Map className="w-4 h-4 text-amber-400" />
                Pilih Stage Materi Tata Bahasa
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Pilih stage kampanye yang ingin kamu selesaikan (masing-masing memiliki 5 sektor/wilayah unik)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CAMPAIGN_STAGES.map((stg) => {
              const isSelected = selectedStageId === stg.id;
              return (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => handleSelectStage(stg.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/30 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/70 hover:bg-slate-900/60'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                        {stg.badge}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {stg.difficulty}
                      </span>
                    </div>

                    <h4 className="font-title text-sm sm:text-base font-bold text-slate-100 mt-1">
                      {stg.title}
                    </h4>
                    <p className="text-xs text-amber-300/90 font-mono mt-0.5 font-semibold">
                      {stg.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-2 line-clamp-3 leading-relaxed">
                      {stg.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" /> 5 Sektor
                    </span>
                    <span className={isSelected ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                      {isSelected ? '✓ Terpilih' : 'Klik untuk Pilih'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: HERO NAME INPUT */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
              2
            </div>
            <div>
              <label htmlFor="heroName" className="font-title text-base sm:text-lg font-bold text-slate-100 block">
                Nama Pahlawan Tata Bahasa
              </label>
              <p className="text-xs text-slate-400 font-mono">
                Beri nama ksatriamu yang akan menaklukkan monster bahasa
              </p>
            </div>
          </div>

          <div className="relative max-w-md">
            <input
              id="heroName"
              type="text"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              maxLength={20}
              placeholder="Contoh: Arthur, Gandalf, Arya"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono text-sm tracking-wider"
              required
            />
          </div>
        </div>

        {/* STEP 3: CLASS SELECTION WITH UNIQUE ARTIFACT & ACTIVE SKILL & ITEMS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
              3
            </div>
            <div>
              <h3 className="font-title text-base sm:text-lg font-bold text-slate-100">
                Pilih Kelas & Item Pusaka Karakter
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Setiap kelas memiliki Item Bawaan (Artefak Unik), Skill Aktif Khusus, dan Pasokan Item Awal yang Berbeda!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CLASS_OPTIONS.map((cls) => {
              const isSelected = selectedClass === cls.type;
              const loadout = CLASS_STARTING_LOADOUTS[cls.type];
              const skill = CLASS_ACTIVE_SKILLS[cls.type];

              return (
                <div
                  key={cls.type}
                  onClick={() => handleSelectClass(cls.type)}
                  data-selected={isSelected}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${cls.borderTheme} ${
                    isSelected ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-amber-400 shadow-xl' : 'bg-slate-950/70 hover:bg-slate-900/80'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        {cls.icon}
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-amber-400" />
                      )}
                    </div>

                    <div className="mb-2">
                      <h4 className="font-title text-base font-bold text-slate-100">
                        {cls.title}
                      </h4>
                      <div className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono border font-semibold uppercase tracking-wider bg-slate-900 text-amber-400 border-amber-500/30">
                        Senjata: {cls.weapon}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {cls.tagline}
                    </p>

                    {/* Innate Artifact & Active Skill Card */}
                    <div className="bg-slate-900/90 border border-amber-500/30 rounded-lg p-2.5 mb-3 font-mono">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
                        <span className="flex items-center gap-1">
                          <span>{skill.icon}</span> {skill.artifactName}
                        </span>
                        <span className="text-[10px] text-amber-400/80">CD: {skill.cooldownMax} Turn</span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-100">
                        Skill: {skill.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 leading-snug">
                        {skill.description}
                      </div>
                    </div>
                  </div>

                  {/* Class Stats & Starting Inventory */}
                  <div className="space-y-2 pt-3 border-t border-slate-800/80 font-mono text-xs">
                    <div className="flex justify-between items-center text-rose-400">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Heart className="w-3.5 h-3.5 text-rose-500" /> Max HP
                      </span>
                      <span className="font-bold">{loadout.hp}</span>
                    </div>

                    <div className="flex justify-between items-center text-amber-400">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Sword className="w-3.5 h-3.5 text-amber-500" /> Base Attack
                      </span>
                      <span className="font-bold">{loadout.damageMod} (+5~15)</span>
                    </div>

                    {/* Starting Items Breakdown */}
                    <div className="pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1.5">
                        📦 Pasokan Item Awal:
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-semibold">
                          🧪 {loadout.potions}x Elixir (+45 HP)
                        </span>
                        {loadout.scrollEliminate > 0 && (
                          <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold">
                            📜 {loadout.scrollEliminate}x 50:50
                          </span>
                        )}
                        {loadout.smokeBombs > 0 && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-600 text-slate-200 font-semibold">
                            💨 {loadout.smokeBombs}x Bom Asap
                          </span>
                        )}
                        {loadout.damageRunes > 0 && (
                          <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 font-semibold">
                            ⚡ {loadout.damageRunes}x Rune +25 DMG
                          </span>
                        )}
                        {loadout.aegisWards > 0 && (
                          <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 font-semibold">
                            🛡️ {loadout.aegisWards}x Aegis Ward
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Game Action */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-extrabold text-base tracking-wider uppercase shadow-xl shadow-amber-900/30 hover:shadow-amber-500/20 border border-amber-300 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 font-title"
          >
            <span>Mulai Petualangan di {currentStageInfo.title}</span>
            <span className="text-xl">⚔️</span>
          </button>
        </div>
      </form>
    </div>
  );
};
