// Ambient Retro RPG Synth BGM Manager using Web Audio API

type BgmTrackType = 'none' | 'title' | 'battle' | 'boss' | 'victory';

interface NoteEvent {
  note: number; // frequency in Hz
  duration: number; // in beats
  type?: OscillatorType;
  volume?: number;
}

// Musical note frequencies
const NOTES = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50,
  REST: 0
};

class BgmManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private currentTrack: BgmTrackType = 'none';
  private isEnabled: boolean = true;
  private timerId: number | null = null;
  private listeners: Array<() => void> = [];

  constructor() {
    // Read preference if saved
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('grammaria_bgm_enabled');
      if (saved !== null) {
        this.isEnabled = saved === 'true';
      }
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  private initAudio() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        
        // Gentle low-pass filter for vintage warm synthesizer tone
        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(2200, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isEnabled ? 0.12 : 0, this.ctx.currentTime);

        this.filterNode.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getTrack(): BgmTrackType {
    return this.currentTrack;
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public toggleMusic(): boolean {
    this.isEnabled = !this.isEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('grammaria_bgm_enabled', String(this.isEnabled));
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      if (this.isEnabled) {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.12, now + 0.3);
        if (this.currentTrack !== 'none') {
          this.startLoop(this.currentTrack);
        }
      } else {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0, now + 0.3);
      }
    }

    this.notify();
    return this.isEnabled;
  }

  public playTrack(track: BgmTrackType) {
    if (this.currentTrack === track && this.timerId !== null) {
      return;
    }

    this.initAudio();
    this.stopCurrentLoop();
    this.currentTrack = track;

    if (track === 'none') {
      this.notify();
      return;
    }

    if (this.isEnabled && this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.linearRampToValueAtTime(0.12, now + 0.5);
    }

    this.startLoop(track);
    this.notify();
  }

  public stop() {
    this.stopCurrentLoop();
    this.currentTrack = 'none';
    this.notify();
  }

  private stopCurrentLoop() {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType = 'triangle', vol: number = 0.5) {
    if (!this.ctx || !this.filterNode || freq <= 0) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Attack and decay envelope
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(vol, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.01);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio failsafe
    }
  }

  private startLoop(track: BgmTrackType) {
    if (!this.ctx) return;
    this.stopCurrentLoop();

    const bpm = track === 'boss' ? 148 : track === 'battle' ? 132 : track === 'victory' ? 120 : 100;
    const beatDuration = 60 / bpm; // duration in seconds
    const loopBeats = 16;
    const loopDurationMs = loopBeats * beatDuration * 1000;

    const scheduleSequence = () => {
      if (!this.ctx || this.currentTrack !== track) return;
      const startTime = this.ctx.currentTime + 0.05;

      if (track === 'battle') {
        this.scheduleBattleTheme(startTime, beatDuration);
      } else if (track === 'boss') {
        this.scheduleBossTheme(startTime, beatDuration);
      } else if (track === 'victory') {
        this.scheduleVictoryTheme(startTime, beatDuration);
      } else if (track === 'title') {
        this.scheduleTitleTheme(startTime, beatDuration);
      }

      this.timerId = window.setTimeout(() => {
        scheduleSequence();
      }, loopDurationMs - 100);
    };

    scheduleSequence();
  }

  // 1. Classic Dungeon Battle Theme (A-minor driving synth arpeggios & retro bass)
  private scheduleBattleTheme(start: number, beat: number) {
    const bassline: NoteEvent[] = [
      { note: NOTES.A2, duration: 1 }, { note: NOTES.A2, duration: 1 },
      { note: NOTES.F2, duration: 1 }, { note: NOTES.G2, duration: 1 },
      { note: NOTES.A2, duration: 1 }, { note: NOTES.A2, duration: 1 },
      { note: NOTES.D3, duration: 1 }, { note: NOTES.E3, duration: 1 },
      { note: NOTES.A2, duration: 1 }, { note: NOTES.A2, duration: 1 },
      { note: NOTES.F2, duration: 1 }, { note: NOTES.G2, duration: 1 },
      { note: NOTES.F2, duration: 1 }, { note: NOTES.G2, duration: 1 },
      { note: NOTES.E2, duration: 1 }, { note: NOTES.A2, duration: 1 },
    ];

    const arpeggio = [
      NOTES.A3, NOTES.C4, NOTES.E4, NOTES.A4,
      NOTES.F3, NOTES.A3, NOTES.C4, NOTES.F4,
      NOTES.G3, NOTES.B3, NOTES.D4, NOTES.G4,
      NOTES.E3, NOTES.G3, NOTES.B3, NOTES.E4,
    ];

    // Schedule Bass
    let curr = start;
    bassline.forEach((item) => {
      this.playTone(item.note, curr, item.duration * beat * 0.85, 'sawtooth', 0.28);
      curr += item.duration * beat;
    });

    // Schedule High Arpeggio (stepped chiptune pulses)
    const sixteenth = beat / 2;
    for (let i = 0; i < 32; i++) {
      const freq = arpeggio[i % arpeggio.length];
      const t = start + i * sixteenth;
      this.playTone(freq, t, sixteenth * 0.7, 'square', 0.16);
    }
  }

  // 2. Boss Battle Theme (Faster, intense D-minor chaotic drive)
  private scheduleBossTheme(start: number, beat: number) {
    const bassline: NoteEvent[] = [
      { note: NOTES.D2, duration: 0.5 }, { note: NOTES.D2, duration: 0.5 }, { note: NOTES.F2, duration: 1 },
      { note: NOTES.D2, duration: 0.5 }, { note: NOTES.D2, duration: 0.5 }, { note: NOTES.G2, duration: 1 },
      { note: NOTES.D2, duration: 0.5 }, { note: NOTES.D2, duration: 0.5 }, { note: NOTES.A2, duration: 1 },
      { note: NOTES.A2, duration: 0.5 }, { note: NOTES.F2, duration: 0.5 }, { note: NOTES.E2, duration: 1 },
      { note: NOTES.D2, duration: 0.5 }, { note: NOTES.D2, duration: 0.5 }, { note: NOTES.F2, duration: 1 },
      { note: NOTES.D2, duration: 0.5 }, { note: NOTES.D2, duration: 0.5 }, { note: NOTES.G2, duration: 1 },
      { note: NOTES.A2, duration: 1 }, { note: NOTES.C3, duration: 1 },
      { note: NOTES.D3, duration: 1 }, { note: NOTES.D2, duration: 1 },
    ];

    let curr = start;
    bassline.forEach((item) => {
      this.playTone(item.note, curr, item.duration * beat * 0.9, 'sawtooth', 0.32);
      curr += item.duration * beat;
    });

    // High energetic lead melody
    const lead = [
      { note: NOTES.D4, time: 0, dur: 1 },
      { note: NOTES.F4, time: 1, dur: 1 },
      { note: NOTES.A4, time: 2, dur: 1.5 },
      { note: NOTES.G4, time: 3.5, dur: 0.5 },
      { note: NOTES.F4, time: 4, dur: 1 },
      { note: NOTES.E4, time: 5, dur: 1 },
      { note: NOTES.D4, time: 6, dur: 2 },
      { note: NOTES.F4, time: 8, dur: 1 },
      { note: NOTES.G4, time: 9, dur: 1 },
      { note: NOTES.A4, time: 10, dur: 1.5 },
      { note: NOTES.C5, time: 11.5, dur: 0.5 },
      { note: NOTES.D5, time: 12, dur: 2 },
      { note: NOTES.A4, time: 14, dur: 2 },
    ];

    lead.forEach((item) => {
      this.playTone(item.note, start + item.time * beat, item.dur * beat * 0.85, 'square', 0.22);
    });
  }

  // 3. Victory Fanfare Loop (Triumphant Major chords & bright chimes)
  private scheduleVictoryTheme(start: number, beat: number) {
    const chords = [
      { bass: NOTES.C3, notes: [NOTES.C4, NOTES.E4, NOTES.G4], time: 0, dur: 4 },
      { bass: NOTES.F2, notes: [NOTES.C4, NOTES.F4, NOTES.A4], time: 4, dur: 4 },
      { bass: NOTES.G2, notes: [NOTES.D4, NOTES.G4, NOTES.B4], time: 8, dur: 4 },
      { bass: NOTES.C3, notes: [NOTES.E4, NOTES.G4, NOTES.C5], time: 12, dur: 4 },
    ];

    chords.forEach((chord) => {
      const t = start + chord.time * beat;
      // Warm bass
      this.playTone(chord.bass, t, chord.dur * beat * 0.9, 'triangle', 0.35);

      // Polyphonic synth brass pad
      chord.notes.forEach((freq) => {
        this.playTone(freq, t, chord.dur * beat * 0.85, 'sawtooth', 0.15);
      });
    });

    // Sparkling bell arpeggio
    const sparkles = [
      NOTES.C5, NOTES.E5, NOTES.G5, NOTES.C5,
      NOTES.F5, NOTES.A5, NOTES.C5, NOTES.F5,
      NOTES.G5, NOTES.B5, NOTES.D5, NOTES.G5,
      NOTES.E5, NOTES.G5, NOTES.C5, NOTES.E5,
    ];

    const sixteenth = beat / 2;
    for (let i = 0; i < 32; i++) {
      const freq = sparkles[i % sparkles.length];
      this.playTone(freq, start + i * sixteenth, sixteenth * 0.6, 'sine', 0.14);
    }
  }

  // 4. Peaceful Tavern / Title Ambient Theme
  private scheduleTitleTheme(start: number, beat: number) {
    const chords = [
      { bass: NOTES.A2, chord: [NOTES.C4, NOTES.E4], time: 0, dur: 4 },
      { bass: NOTES.D2, chord: [NOTES.F4, NOTES.A4], time: 4, dur: 4 },
      { bass: NOTES.F2, chord: [NOTES.A4, NOTES.C4], time: 8, dur: 4 },
      { bass: NOTES.E2, chord: [NOTES.G4, NOTES.B4], time: 12, dur: 4 },
    ];

    chords.forEach((c) => {
      const t = start + c.time * beat;
      this.playTone(c.bass, t, c.dur * beat * 0.9, 'triangle', 0.3);
      c.chord.forEach((note) => {
        this.playTone(note, t, c.dur * beat * 0.8, 'sine', 0.18);
      });
    });

    // Gentle harp plucks
    const plucks = [NOTES.E4, NOTES.A4, NOTES.C5, NOTES.B4, NOTES.A4, NOTES.G4, NOTES.E4, NOTES.D4];
    plucks.forEach((note, idx) => {
      this.playTone(note, start + idx * beat * 2, beat * 1.5, 'triangle', 0.2);
    });
  }
}

export const bgmManager = new BgmManager();
