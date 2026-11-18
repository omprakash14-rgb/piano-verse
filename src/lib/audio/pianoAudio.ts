import { getKeyByMidi } from '@/src/data/piano-notes';
import { PianoVoice } from '@/src/types/academy';

interface ActiveVoiceNode {
  oscillators: OscillatorNode[];
  masterGain: GainNode;
  filter: BiquadFilterNode;
  midi: number;
  stopping: boolean;
}

class PianoAudioEngine {
  private ctx: AudioContext | null = null;
  private mainGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private activeVoices = new Map<number, ActiveVoiceNode>();
  private sustainedNotes = new Set<number>();
  private heldKeys = new Set<number>();

  private volume = 0.78;
  private muted = false;
  private sustain = false;
  private voice: PianoVoice = 'grand';
  private listeners = new Set<() => void>();

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public isReady(): boolean {
    return this.ctx !== null && this.ctx.state === 'running';
  }

  public async ensureContext(): Promise<AudioContext | null> {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      this.ctx = new AudioCtx();
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-16, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(18, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.004, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.22, this.ctx.currentTime);

      this.mainGain = this.ctx.createGain();
      this.mainGain.gain.setValueAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime);

      this.compressor.connect(this.mainGain);
      this.mainGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.notify();
    return this.ctx;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(next: number) {
    this.volume = Math.max(0, Math.min(1, next));
    if (this.mainGain && this.ctx) {
      this.mainGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.02);
    }
    this.notify();
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(next: boolean) {
    this.muted = next;
    if (this.mainGain && this.ctx) {
      this.mainGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.02);
    }
    this.notify();
  }

  public getVoice(): PianoVoice {
    return this.voice;
  }

  public setVoice(next: PianoVoice) {
    this.voice = next;
    this.notify();
  }

  public getSustain(): boolean {
    return this.sustain;
  }

  public setSustain(next: boolean) {
    this.sustain = next;
    if (!next) {
      // Release all notes that are no longer physically held
      Array.from(this.sustainedNotes).forEach((midi) => {
        if (!this.heldKeys.has(midi)) {
          this.sustainedNotes.delete(midi);
          this.releaseVoice(midi);
        }
      });
    }
    this.notify();
  }

  public async playNote(midi: number, velocity = 0.85, overrideVoice?: PianoVoice) {
    const ctx = await this.ensureContext();
    if (!ctx || !this.compressor) return;

    const keyInfo = getKeyByMidi(midi);
    const freq = keyInfo ? keyInfo.frequency : 440 * Math.pow(2, (midi - 69) / 12);
    const activeVoiceType = overrideVoice ?? this.voice;

    this.heldKeys.add(midi);
    this.sustainedNotes.delete(midi);

    // Gracefully stop previous instance of same key
    if (this.activeVoices.has(midi)) {
      this.releaseVoice(midi, true);
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const oscillators: OscillatorNode[] = [];

    // Register compensation: lower notes sustain longer and have gentler peak gain
    const registerScale = Math.max(0.55, Math.min(1.1, 1.0 - (midi - 60) * 0.008));
    const decayTime = activeVoiceType === 'harpsichord' ? 1.1 : Math.max(1.2, 3.8 - (midi - 21) * 0.028);

    if (activeVoiceType === 'grand') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(11000, freq * 8.5), now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(320, freq * 2.1), now + 0.85);
      filter.Q.setValueAtTime(0.9, now);

      const harmonics: { mult: number; type: OscillatorType; amp: number; detune?: number }[] = [
        { mult: 1, type: 'triangle', amp: 0.62 },
        { mult: 1, type: 'sine', amp: 0.34, detune: 1.5 },
        { mult: 2, type: 'sine', amp: 0.24 },
        { mult: 3, type: 'triangle', amp: 0.11 },
        { mult: 4, type: 'sine', amp: 0.05 },
      ];

      harmonics.forEach((h) => {
        const osc = ctx.createOscillator();
        const partGain = ctx.createGain();
        osc.type = h.type;
        osc.frequency.setValueAtTime(freq * h.mult, now);
        if (h.detune) osc.detune.setValueAtTime(h.detune, now);
        partGain.gain.setValueAtTime(h.amp, now);
        osc.connect(partGain);
        partGain.connect(filter);
        osc.start(now);
        oscillators.push(osc);
      });

      const peak = 0.34 * velocity * registerScale;
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(peak, now + 0.006);
      masterGain.gain.exponentialRampToValueAtTime(peak * 0.45, now + 0.18);
      masterGain.gain.exponentialRampToValueAtTime(0.0008, now + decayTime);
    } else if (activeVoiceType === 'electric') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(7500, freq * 5.2), now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(280, freq * 1.6), now + 0.7);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);
      const bellGain = ctx.createGain();
      bellGain.gain.setValueAtTime(0.28, now);
      bellGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc1.connect(filter);
      osc2.connect(bellGain);
      bellGain.connect(filter);

      osc1.start(now);
      osc2.start(now);
      oscillators.push(osc1, osc2);

      const peak = 0.36 * velocity * registerScale;
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(peak, now + 0.008);
      masterGain.gain.exponentialRampToValueAtTime(0.0008, now + decayTime * 0.95);
    } else {
      // Harpsichord: plucked string harmonic richness
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(12000, freq * 11), now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(600, freq * 3.5), now + 0.55);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, now);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      const g1 = ctx.createGain();
      g1.gain.setValueAtTime(0.32, now);
      const g2 = ctx.createGain();
      g2.gain.setValueAtTime(0.18, now);

      osc1.connect(g1);
      osc2.connect(g2);
      g1.connect(filter);
      g2.connect(filter);

      osc1.start(now);
      osc2.start(now);
      oscillators.push(osc1, osc2);

      const peak = 0.28 * velocity * registerScale;
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(peak, now + 0.003);
      masterGain.gain.exponentialRampToValueAtTime(0.0008, now + 1.25);
    }

    filter.connect(masterGain);
    masterGain.connect(this.compressor);

    const node: ActiveVoiceNode = {
      oscillators,
      masterGain,
      filter,
      midi,
      stopping: false,
    };
    this.activeVoices.set(midi, node);
  }

  public stopNote(midi: number) {
    this.heldKeys.delete(midi);
    if (this.sustain) {
      this.sustainedNotes.add(midi);
      return;
    }
    this.releaseVoice(midi, false);
  }

  private releaseVoice(midi: number, fast = false) {
    const node = this.activeVoices.get(midi);
    if (!node || !this.ctx || node.stopping) return;
    node.stopping = true;
    this.activeVoices.delete(midi);

    const now = this.ctx.currentTime;
    const releaseDur = fast ? 0.04 : this.voice === 'harpsichord' ? 0.09 : 0.28;

    try {
      node.masterGain.gain.cancelScheduledValues(now);
      node.masterGain.gain.setValueAtTime(Math.max(0.0008, node.masterGain.gain.value), now);
      node.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + releaseDur);
      node.oscillators.forEach((osc) => {
        osc.stop(now + releaseDur + 0.02);
      });
    } catch {
      // Safe cleanup if oscillator already stopped
    }
  }

  public async playQuickNote(midi: number, durationMs = 550, voice?: PianoVoice) {
    await this.playNote(midi, 0.85, voice);
    setTimeout(() => {
      this.heldKeys.delete(midi);
      this.releaseVoice(midi, false);
    }, durationMs);
  }

  public async playChord(midiNotes: number[], durationMs = 950, arpeggiateMs = 28) {
    await this.ensureContext();
    midiNotes.forEach((midi, idx) => {
      setTimeout(() => {
        this.playQuickNote(midi, durationMs);
      }, idx * arpeggiateMs);
    });
  }

  public async playSequence(
    midiNotes: number[],
    intervalMs = 360,
    onStep?: (index: number, midi: number) => void
  ): Promise<void> {
    await this.ensureContext();
    return new Promise((resolve) => {
      midiNotes.forEach((midi, idx) => {
        setTimeout(() => {
          onStep?.(idx, midi);
          this.playQuickNote(midi, Math.max(260, intervalMs * 0.9));
          if (idx === midiNotes.length - 1) {
            setTimeout(resolve, intervalMs);
          }
        }, idx * intervalMs);
      });
    });
  }

  public async playMetronomeClick(isAccent = false) {
    const ctx = await this.ensureContext();
    if (!ctx || !this.mainGain) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isAccent ? 1240 : 880, now);
    osc.frequency.exponentialRampToValueAtTime(isAccent ? 620 : 440, now + 0.035);

    clickGain.gain.setValueAtTime(isAccent ? 0.35 : 0.22, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(clickGain);
    clickGain.connect(this.mainGain);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  public stopAll() {
    this.heldKeys.clear();
    this.sustainedNotes.clear();
    Array.from(this.activeVoices.keys()).forEach((midi) => this.releaseVoice(midi, true));
  }
}

export const pianoAudio = new PianoAudioEngine();
