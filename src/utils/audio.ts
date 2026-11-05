// Web Audio API Retro 8-bit Sound Generator

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playBlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio playback failsafe
    }
  }

  public playSlash() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Audio failsafe
    }
  }

  public playHit() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Audio failsafe
    }
  }

  public playPotion() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [300, 420, 560, 700].forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.06);

        gain.gain.setValueAtTime(0.12, now + index * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (index + 1) * 0.08);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + index * 0.06);
        osc.stop(now + (index + 1) * 0.08);
      });
    } catch {
      // Audio failsafe
    }
  }

  public playLevelUp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C E G C E G
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.2);
      });
    } catch {
      // Audio failsafe
    }
  }

  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chords = [
        { freq: 440, time: 0 },
        { freq: 554.37, time: 0.12 },
        { freq: 659.25, time: 0.24 },
        { freq: 880, time: 0.36 },
        { freq: 880, time: 0.55 },
      ];
      chords.forEach((note) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(note.freq, now + note.time);

        gain.gain.setValueAtTime(0.12, now + note.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + note.time);
        osc.stop(now + note.time + 0.25);
      });
    } catch {
      // Audio failsafe
    }
  }

  public playShake() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Low-frequency rumble impact
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(32, now + 0.28);

      gain1.gain.setValueAtTime(0.22, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      // Sub-bass thud
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(80, now);
      osc2.frequency.exponentialRampToValueAtTime(25, now + 0.32);

      gain2.gain.setValueAtTime(0.3, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.28);
      osc2.start(now);
      osc2.stop(now + 0.32);
    } catch {
      // Audio failsafe
    }
  }

  public playShield() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.22);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio failsafe
    }
  }

  public playSkill() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [440, 554, 659, 880].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.18, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * 0.08);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + (idx + 1) * 0.08);
      });
    } catch {
      // Audio failsafe
    }
  }

  public playItemUse() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio failsafe
    }
  }

  public playSmoke() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio failsafe
    }
  }

  public playSectorVictory(sectorIndex: number = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const ctx = this.ctx;

      // Helper to schedule notes
      const playTone = (
        freq: number, 
        startTime: number, 
        duration: number, 
        type: OscillatorType = 'square', 
        volume: number = 0.15
      ) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      if (sectorIndex === 0) {
        // --- SEKTOR 1 (PRESENT TENSES): Cheerful Woodland / Flute Chime Fanfare ---
        const notes = [
          { f: 392.00, t: 0.00, d: 0.10 }, // G4
          { f: 523.25, t: 0.09, d: 0.10 }, // C5
          { f: 659.25, t: 0.18, d: 0.10 }, // E5
          { f: 783.99, t: 0.27, d: 0.12 }, // G5
          { f: 880.00, t: 0.38, d: 0.12 }, // A5
          { f: 1046.50, t: 0.50, d: 0.14 }, // C6
          { f: 1174.66, t: 0.64, d: 0.16 }, // D6
          { f: 1318.51, t: 0.80, d: 0.45 }, // E6
        ];
        notes.forEach((n) => playTone(n.f, now + n.t, n.d, 'triangle', 0.22));
        
        // Gentle sparkle bell tail
        const bells = [
          { f: 1567.98, t: 0.95 },
          { f: 1318.51, t: 1.08 },
          { f: 1046.50, t: 1.20 }
        ];
        bells.forEach((b) => playTone(b.f, now + b.t, 0.25, 'sine', 0.12));

      } else if (sectorIndex === 1) {
        // --- SEKTOR 2 (PAST TENSES): Majestic Medieval Brass & Stone Fortress Cleared ---
        const brass = [
          { f: 293.66, t: 0.00, d: 0.14 }, // D4
          { f: 369.99, t: 0.13, d: 0.14 }, // F#4
          { f: 440.00, t: 0.26, d: 0.14 }, // A4
          { f: 587.33, t: 0.39, d: 0.20 }, // D5
          { f: 554.37, t: 0.58, d: 0.12 }, // C#5
          { f: 587.33, t: 0.70, d: 0.16 }, // D5
          { f: 739.99, t: 0.86, d: 0.55 }, // F#5
        ];
        brass.forEach((n) => playTone(n.f, now + n.t, n.d, 'sawtooth', 0.14));

        // Resonant royal low brass foundation chord
        [146.83, 220.00, 293.66, 369.99].forEach((freq) => {
          playTone(freq, now + 0.86, 0.95, 'triangle', 0.18);
        });

      } else if (sectorIndex === 2) {
        // --- SEKTOR 3 (FUTURE TENSES): Fast Celestial Chrono-Starlight Fanfare ---
        const cosmic = [
          { f: 369.99, t: 0.00, d: 0.08 }, // F#4
          { f: 466.16, t: 0.07, d: 0.08 }, // A#4
          { f: 554.37, t: 0.14, d: 0.08 }, // C#5
          { f: 739.99, t: 0.21, d: 0.09 }, // F#5
          { f: 830.61, t: 0.29, d: 0.09 }, // G#5
          { f: 932.33, t: 0.38, d: 0.11 }, // A#5
          { f: 1108.73, t: 0.49, d: 0.13 }, // C#6
          { f: 1479.98, t: 0.62, d: 0.60 }, // F#6
        ];
        cosmic.forEach((n) => playTone(n.f, now + n.t, n.d, 'square', 0.13));

        // Shimmering octave echo & starlight resonance
        const starlight = [
          { f: 1479.98, t: 0.75, d: 0.15 },
          { f: 1108.73, t: 0.88, d: 0.15 },
          { f: 932.33, t: 1.00, d: 0.18 },
          { f: 1479.98, t: 1.15, d: 0.45 },
        ];
        starlight.forEach((s) => playTone(s.f, now + s.t, s.d, 'sine', 0.16));

      } else if (sectorIndex === 3) {
        // --- SEKTOR 4 (PAST FUTURE TENSES): Mystic Regal Anthem (All 16 Tenses Complete!) ---
        const anthem = [
          { f: 329.63, t: 0.00, d: 0.11 }, // E4
          { f: 415.30, t: 0.10, d: 0.11 }, // G#4
          { f: 493.88, t: 0.20, d: 0.11 }, // B4
          { f: 659.25, t: 0.30, d: 0.13 }, // E5
          { f: 739.99, t: 0.43, d: 0.13 }, // F#5
          { f: 830.61, t: 0.56, d: 0.15 }, // G#5
          { f: 987.77, t: 0.70, d: 0.18 }, // B5
          { f: 1318.51, t: 0.88, d: 0.70 }, // E6
        ];
        anthem.forEach((n) => playTone(n.f, now + n.t, n.d, 'square', 0.14));

        // Harmonizing royal triumph chord
        [659.25, 830.61, 987.77, 1318.51].forEach((freq) => {
          playTone(freq, now + 0.88, 1.1, 'triangle', 0.14);
        });

      } else {
        // --- SEKTOR 5 (FINAL BOSS - CONJUNCTIONS OVERLORD): Epic Grand World Victory Fanfare ---
        // Phrase 1: Grand heroic trumpet run 1
        const run1 = [
          { f: 261.63, t: 0.00, d: 0.09 }, // C4
          { f: 329.63, t: 0.08, d: 0.09 }, // E4
          { f: 392.00, t: 0.16, d: 0.09 }, // G4
          { f: 523.25, t: 0.24, d: 0.15 }, // C5
        ];
        run1.forEach((n) => playTone(n.f, now + n.t, n.d, 'sawtooth', 0.14));

        // Phrase 2: Secondary soaring trumpet run 2
        const run2 = [
          { f: 392.00, t: 0.42, d: 0.09 }, // G4
          { f: 493.88, t: 0.50, d: 0.09 }, // B4
          { f: 587.33, t: 0.58, d: 0.09 }, // D5
          { f: 783.99, t: 0.66, d: 0.20 }, // G5
        ];
        run2.forEach((n) => playTone(n.f, now + n.t, n.d, 'sawtooth', 0.14));

        // Phrase 3: Grand Orchestral Strike (C Major Full Choir)
        const bossChord = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        bossChord.forEach((freq) => {
          playTone(freq, now + 0.92, 1.4, 'square', 0.11);
          playTone(freq, now + 0.92, 1.4, 'triangle', 0.11);
        });

        // Sub-bass victory rumble
        playTone(65.41, now + 0.92, 0.8, 'sawtooth', 0.28); // C2

        // Phrase 4: Cascading Golden Harps & Sparkles
        const harp = [
          { f: 2093.00, t: 1.10 }, // C7
          { f: 1567.98, t: 1.25 }, // G6
          { f: 1318.51, t: 1.40 }, // E6
          { f: 1046.50, t: 1.55 }, // C6
        ];
        harp.forEach((h) => playTone(h.f, now + h.t, 0.45, 'sine', 0.16));
      }
    } catch {
      // Audio failsafe
    }
  }

  public playDefeat() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [350, 310, 260, 180];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);

        gain.gain.setValueAtTime(0.15, now + idx * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.3);
      });
    } catch {
      // Audio failsafe
    }
  }
}

export const soundManager = new SoundManager();
