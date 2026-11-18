import { useEffect, useRef, useState } from 'react';
import { Play, Square, Volume2, VolumeX, Minus, Plus } from 'lucide-react';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { cn } from '@/src/lib/utils';

interface MetronomeWidgetProps {
  initialBpm?: number;
  initialTimeSignature?: '4/4' | '3/4';
}

export function MetronomeWidget({
  initialBpm = 84,
  initialTimeSignature = '4/4',
}: MetronomeWidgetProps) {
  const addPracticeMinutes = useAcademyStore((s) => s.addPracticeMinutes);
  const unlockBadge = useAcademyStore((s) => s.unlockBadge);

  const [bpm, setBpm] = useState(initialBpm);
  const [timeSig, setTimeSig] = useState<'4/4' | '3/4'>(initialTimeSignature);
  const [running, setRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [currentBeat, setCurrentBeat] = useState(0); // 1..beatsPerMeasure
  const beatRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  const beatsPerMeasure = timeSig === '4/4' ? 4 : 3;

  useEffect(() => {
    if (!running) {
      setCurrentBeat(0);
      beatRef.current = 0;
      if (startTimeRef.current) {
        const elapsedMin = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000));
        addPracticeMinutes(elapsedMin, 15);
        startTimeRef.current = null;
      }
      return;
    }

    startTimeRef.current = Date.now();
    unlockBadge('rhythm-beginner');
    const intervalMs = (60 / bpm) * 1000;

    const tick = () => {
      const nextBeat = (beatRef.current % beatsPerMeasure) + 1;
      beatRef.current = nextBeat;
      setCurrentBeat(nextBeat);
      if (soundOn) {
        pianoAudio.playMetronomeClick(nextBeat === 1);
      }
    };

    tick();
    const timer = setInterval(tick, intervalMs);
    return () => clearInterval(timer);
  }, [running, bpm, beatsPerMeasure, soundOn, addPracticeMinutes, unlockBadge]);

  return (
    <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Conservatory Metronome
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Lock onto an even musical pulse in {timeSig} meter.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-1">
            {(['4/4', '3/4'] as const).map((sig) => (
              <button
                key={sig}
                type="button"
                onClick={() => setTimeSig(sig)}
                className={cn(
                  'rounded px-3 py-1 font-mono-tabular text-xs font-semibold cursor-pointer',
                  timeSig === sig
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-secondary)]'
                )}
              >
                {sig}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSoundOn((s) => !s)}
            aria-label={soundOn ? 'Mute metronome sound' : 'Unmute metronome sound'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] cursor-pointer"
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Beat Visual Indicator */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-5">
        <div className="flex items-center gap-3">
          {Array.from({ length: beatsPerMeasure }).map((_, idx) => {
            const beatNum = idx + 1;
            const isLit = running && currentBeat === beatNum;
            const isDownbeat = beatNum === 1;

            return (
              <div
                key={beatNum}
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-lg border font-mono-tabular text-base font-bold transition-transform duration-75',
                  isLit
                    ? isDownbeat
                      ? 'scale-105 border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[#12100E]'
                      : 'scale-105 border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                )}
              >
                {beatNum}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="font-mono-tabular text-3xl font-bold text-[var(--text-primary)]">
              {bpm}
            </span>
            <span className="ml-1.5 text-xs font-semibold text-[var(--text-secondary)]">BPM</span>
          </div>

          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap',
              running
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-[var(--accent-gold)] text-[#12100E] hover:bg-[var(--accent-gold-hover)]'
            )}
          >
            {running ? (
              <>
                <Square className="h-4 w-4 fill-current" />
                Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                Start Metronome
              </>
            )}
          </button>
        </div>
      </div>

      {/* BPM Slider & Fine Controls */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setBpm((b) => Math.max(40, b - 4))}
          aria-label="Decrease tempo"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] cursor-pointer"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="range"
          aria-label="Tempo in Beats Per Minute"
          min={40}
          max={200}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="flex-1 accent-[var(--accent-gold)] cursor-pointer"
        />
        <button
          type="button"
          onClick={() => setBpm((b) => Math.min(200, b + 4))}
          aria-label="Increase tempo"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
