import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShieldAlert, Music, Music2, Volume1 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { bgmManager } from '../utils/bgm';

interface HeaderProps {
  currentStageIndex: number;
  totalStages: number;
  inGame: boolean;
  stageId?: number;
  stageTitle?: string;
  onChangeStage?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStageIndex,
  totalStages,
  inGame,
  stageId = 2,
  stageTitle,
  onChangeStage
}) => {
  const [sfxMuted, setSfxMuted] = useState(soundManager.getMuted());
  const [bgmEnabled, setBgmEnabled] = useState(bgmManager.getIsEnabled());
  const [bgmTrack, setBgmTrack] = useState(bgmManager.getTrack());
  const [bgmVolume, setBgmVolume] = useState(bgmManager.getVolume());

  useEffect(() => {
    const unsubscribe = bgmManager.subscribe(() => {
      setBgmEnabled(bgmManager.getIsEnabled());
      setBgmTrack(bgmManager.getTrack());
      setBgmVolume(bgmManager.getVolume());
    });
    return unsubscribe;
  }, []);

  const handleToggleSfx = () => {
    const isNowMuted = soundManager.toggleMute();
    setSfxMuted(isNowMuted);
    if (!isNowMuted) {
      soundManager.playBlip();
    }
  };

  const handleToggleBgm = () => {
    soundManager.playBlip();
    bgmManager.toggleMusic();
  };

  const handleCycleVolume = () => {
    soundManager.playBlip();
    // Cycle between 0.6 (medium), 0.85 (high), 1.0 (max)
    if (bgmVolume < 0.7) {
      bgmManager.setVolume(0.85);
    } else if (bgmVolume < 0.95) {
      bgmManager.setVolume(1.0);
    } else {
      bgmManager.setVolume(0.6);
    }
  };

  const isBgmPlaying = bgmEnabled && bgmTrack !== 'none';
  const volPercent = Math.round(bgmVolume * 100);

  return (
    <header className="border-b border-amber-900/40 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Title branding - Renamed to GramMaru */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 border border-amber-400/50">
            <span className="text-xl">⚔️</span>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-wider text-amber-300 font-title">
              GRAMMARU
            </h1>
            <p className="text-xs text-slate-400 font-mono tracking-tight hidden sm:block">
              THE QUEST FOR PERFECT SYNTAX
            </p>
          </div>
        </div>

        {/* Quest Progress (if in game) */}
        {inGame && (
          <div className="hidden sm:flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-md border border-slate-800">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/30">
                STAGE {stageId}
              </span>
              <span className="text-slate-400 hidden lg:inline">{stageTitle ? `• ${stageTitle}` : ''}</span>
              <span className="text-slate-400">• WILAYAH:</span>
              <span className="font-bold text-amber-400">
                {currentStageIndex + 1} / {totalStages}
              </span>
            </div>
            {onChangeStage && (
              <button
                type="button"
                onClick={onChangeStage}
                className="ml-1 text-[10px] text-amber-400/80 hover:text-amber-300 underline font-mono cursor-pointer"
                title="Ganti Stage Kampanye"
              >
                Ganti
              </button>
            )}
          </div>
        )}

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {/* Retro RPG Synth BGM Toggle Button */}
          <button
            onClick={handleToggleBgm}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer shadow-sm ${
              isBgmPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-900/20'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={bgmEnabled ? 'Matikan Musik Synth BGM' : 'Nyalakan Musik Synth BGM'}
          >
            {isBgmPlaying ? (
              <Music2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            ) : (
              <Music className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden md:inline font-bold">
              BGM: {bgmEnabled ? 'ON' : 'OFF'}
            </span>
            {/* Animated Equalizer Waves when active */}
            {isBgmPlaying && (
              <span className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5" aria-hidden="true">
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 bg-amber-300 rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 bg-amber-400 rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </button>

          {/* BGM Volume Up / Cycle Button */}
          {bgmEnabled && (
            <button
              onClick={handleCycleVolume}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors text-xs font-mono cursor-pointer"
              title={`Volume BGM: ${volPercent}% (Klik untuk ubah)`}
            >
              {bgmVolume >= 0.8 ? (
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Volume1 className="w-3.5 h-3.5 text-amber-400/80" />
              )}
              <span className="text-[11px] font-bold text-amber-400 font-mono">
                {volPercent}%
              </span>
            </button>
          )}

          {/* Sound Effects (SFX) Toggle */}
          <button
            onClick={handleToggleSfx}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
            title={sfxMuted ? 'Nyalakan Efek Suara (SFX)' : 'Matikan Efek Suara (SFX)'}
          >
            {sfxMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
