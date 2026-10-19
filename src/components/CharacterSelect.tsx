import React, { useState } from 'react';
import { Shield, Sparkles, Zap, Heart, Sword, FlaskConical, CheckCircle2 } from 'lucide-react';
import { CharacterClass, Player } from '../types/game';
import { soundManager } from '../utils/audio';

interface CharacterSelectProps {
  onStartQuest: (player: Player) => void;
}

interface ClassOption {
  type: CharacterClass;
  title: string;
  tagline: string;
  hp: number;
  damageMod: number;
  potions: number;
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
    tagline: 'HP tebal, stabil, menguasai tatanan kata dan keselarasan kalimat.',
    hp: 120,
    damageMod: 30,
    potions: 2,
    weapon: 'Blade of Proper Agreement',
    narrationPreview: "Menghunuskan 'Blade of Proper Agreement' dan menebas struktur kacau lawan!",
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    borderTheme: 'hover:border-blue-500/80 border-slate-700 data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-950/30',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
  },
  {
    type: 'Vocab Mage',
    title: 'Vocab Mage',
    tagline: 'Damage tinggi, ahli diksi mematikan dan perbendaharaan kata adidaya.',
    hp: 100,
    damageMod: 40,
    potions: 2,
    weapon: 'Lexical Surge',
    narrationPreview: "Merapal mantra 'Lexical Surge', menyemburkan ledakan sinonim tingkat tinggi!",
    icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    borderTheme: 'hover:border-purple-500/80 border-slate-700 data-[selected=true]:border-purple-500 data-[selected=true]:bg-purple-950/30',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  },
  {
    type: 'Punctuation Rogue',
    title: 'Punctuation Rogue',
    tagline: 'Membawa ekstra potion, lincah membelah run-on sentence dengan presisi maut.',
    hp: 100,
    damageMod: 35,
    potions: 3,
    weapon: 'Semicolon Dagger',
    narrationPreview: "Melemparkan 'Semicolon Dagger', membelah run-on sentence monster dengan presisi mematikan!",
    icon: <Zap className="w-8 h-8 text-amber-400" />,
    borderTheme: 'hover:border-amber-500/80 border-slate-700 data-[selected=true]:border-amber-500 data-[selected=true]:bg-amber-950/30',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  }
];

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onStartQuest }) => {
  const [heroName, setHeroName] = useState<string>('Hero');
  const [selectedClass, setSelectedClass] = useState<CharacterClass>('Syntax Knight');

  const handleSelectClass = (c: CharacterClass) => {
    soundManager.playBlip();
    setSelectedClass(c);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSlash();

    const selectedOption = CLASS_OPTIONS.find((c) => c.type === selectedClass)!;
    const initialPlayer: Player = {
      name: heroName.trim() || 'Hero',
      charClass: selectedClass,
      hp: selectedOption.hp,
      maxHp: selectedOption.hp,
      level: 1,
      exp: 0,
      expNeeded: 50,
      potions: selectedOption.potions,
      damageMod: selectedOption.damageMod,
      questionsAnswered: 0,
      correctAnswers: 0,
      potionsUsed: 0,
      totalDamageDealt: 0,
      totalDamageTaken: 0,
    };

    onStartQuest(initialPlayer);
  };

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
            GRAMMARIA
          </h2>
          <p className="text-amber-500/80 font-mono tracking-widest text-xs uppercase">
            The Quest for Perfect Syntax
          </p>
        </div>

        <div className="bg-black/60 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
          <p className="text-amber-400 flex items-center gap-2">
            <span>📜</span>
            <span className="font-semibold">Prolog Kerajaan:</span>
          </p>
          <p>
            &quot;Dunia Grammaria berada di ambang kehancuran...&quot;
          </p>
          <p className="text-rose-300/90">
            &quot;Kutukan <span className="font-bold underline decoration-rose-500">Syntax Error</span> telah mengubah makna kalimat suci menjadi monster-monster liar yang meneror seluruh penjuru negeri!&quot;
          </p>
          <p className="text-slate-400 pt-1">
            Hanya seorang pahlawan tata bahasa sejati yang sanggup menghadapi kegelapan ini dengan pedang argumen kata dan mantra sintaksis yang benar!
          </p>
        </div>
      </div>

      {/* Creation Form */}
      <form onSubmit={handleStart} className="space-y-8">
        {/* Hero Name Input */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
          <label htmlFor="hero-name-input" className="block text-sm font-semibold text-slate-200 mb-2 font-mono flex items-center gap-2">
            <span className="text-amber-400">▶</span> Masukkan Nama Pahlawanmu:
          </label>
          <div className="relative">
            <input
              id="hero-name-input"
              type="text"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              maxLength={20}
              placeholder="Contoh: Arthur, Lyra, Merlin..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono text-base tracking-wide"
            />
            <span className="absolute right-3 top-3.5 text-xs text-slate-500 font-mono">
              {heroName.length}/20
            </span>
          </div>
        </div>

        {/* Hero Class Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-100 font-title flex items-center gap-2">
              <span className="text-amber-400">⚔</span> Pilih Kelas Pahlawan:
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Setiap kelas memiliki pasif dan gaya serangan unik
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CLASS_OPTIONS.map((cls) => {
              const isSelected = selectedClass === cls.type;
              return (
                <div
                  key={cls.type}
                  data-selected={isSelected}
                  onClick={() => handleSelectClass(cls.type)}
                  className={`p-5 rounded-xl border bg-slate-900/60 transition-all cursor-pointer relative flex flex-col justify-between ${cls.borderTheme} ${
                    isSelected ? 'ring-2 ring-amber-500/40 shadow-xl' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 text-amber-400">
                      <CheckCircle2 className="w-5 h-5 fill-amber-500 text-slate-950" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        {cls.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-base">{cls.title}</h4>
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono border ${cls.badgeBg}`}>
                          {cls.weapon}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {cls.tagline}
                    </p>
                  </div>

                  {/* Class Stats */}
                  <div className="space-y-2 pt-3 border-t border-slate-800/80 font-mono text-xs">
                    <div className="flex justify-between items-center text-rose-400">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Heart className="w-3.5 h-3.5 text-rose-500" /> Max HP
                      </span>
                      <span className="font-bold">{cls.hp}</span>
                    </div>

                    <div className="flex justify-between items-center text-amber-400">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Sword className="w-3.5 h-3.5 text-amber-500" /> Base Attack
                      </span>
                      <span className="font-bold">{cls.damageMod} (+5~15)</span>
                    </div>

                    <div className="flex justify-between items-center text-emerald-400">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <FlaskConical className="w-3.5 h-3.5 text-emerald-500" /> Potion Awal
                      </span>
                      <span className="font-bold">{cls.potions}x</span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/50 text-[11px] text-slate-400 italic">
                      &quot;{cls.narrationPreview}&quot;
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
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-slate-950 font-extrabold text-base tracking-wider uppercase shadow-xl shadow-amber-900/30 hover:shadow-amber-500/20 border border-amber-300 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 font-title"
          >
            <span>Mulai Petualangan Tata Bahasa</span>
            <span className="text-xl">⚔️</span>
          </button>
        </div>
      </form>
    </div>
  );
};
