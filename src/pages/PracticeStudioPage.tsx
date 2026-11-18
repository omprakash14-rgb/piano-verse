import { useState } from 'react';
import { CheckCircle2, Play, RotateCcw, Clock } from 'lucide-react';
import { CHORDS, MELODIES, SCALES, getKeyByMidi } from '@/src/data/piano-notes';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { MetronomeWidget } from '@/src/components/lessons/MetronomeWidget';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { PianoKeyData } from '@/src/types/academy';
import { cn } from '@/src/lib/utils';

type DrillTab = 'scales' | 'progressions' | 'songs';

const PROGRESSION_CHORDS = [CHORDS[0], CHORDS[3], CHORDS[1], CHORDS[2]]; // C -> Am -> F -> G

export function PracticeStudioPage() {
  const { practiceMinutes, addPracticeMinutes, unlockBadge } = useAcademyStore();
  const [drillTab, setDrillTab] = useState<DrillTab>('scales');

  const [scaleId, setScaleId] = useState(SCALES[0].id);
  const [scaleStep, setScaleStep] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  const [progStep, setProgStep] = useState(0);
  const [songId, setSongId] = useState(MELODIES[0].id);
  const [songStep, setSongStep] = useState(0);
  const [sessionSaved, setSessionSaved] = useState(false);

  const activeScale = SCALES.find((s) => s.id === scaleId) ?? SCALES[0];
  const activeProgChord = PROGRESSION_CHORDS[progStep];
  const activeSong = MELODIES.find((m) => m.id === songId) ?? MELODIES[0];

  const handlePlay = (key: PianoKeyData) => {
    if (drillTab === 'scales') {
      const expected = activeScale.midiSample[scaleStep];
      if (key.midi === expected) {
        setHits((h) => h + 1);
        if (scaleStep + 1 >= activeScale.midiSample.length) {
          setScaleStep(0);
          unlockBadge('scale-master');
          addPracticeMinutes(2, 20);
        } else {
          setScaleStep((s) => s + 1);
        }
      } else {
        setMisses((m) => m + 1);
      }
    } else if (drillTab === 'progressions') {
      if (activeProgChord.midiNotes.includes(key.midi)) {
        setHits((h) => h + 1);
      } else {
        setMisses((m) => m + 1);
      }
    } else if (drillTab === 'songs') {
      const expected = activeSong.steps[songStep]?.midi;
      if (key.midi === expected) {
        setHits((h) => h + 1);
        if (songStep + 1 >= activeSong.steps.length) {
          setSongStep(0);
          unlockBadge('first-song');
          addPracticeMinutes(3, 30);
        } else {
          setSongStep((s) => s + 1);
        }
      } else {
        setMisses((m) => m + 1);
      }
    }
  };

  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;

  const targetMidi =
    drillTab === 'scales'
      ? [activeScale.midiSample[scaleStep]]
      : drillTab === 'progressions'
      ? activeProgChord.midiNotes
      : [activeSong.steps[songStep]?.midi].filter((v): v is number => v !== undefined);

  const highlightedMidi =
    drillTab === 'scales'
      ? activeScale.midiSample
      : drillTab === 'progressions'
      ? activeProgChord.midiNotes
      : activeSong.steps.map((s) => s.midi);

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Guided Workout Room
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
            Practice Studio
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Pair the live conservatory metronome with targeted scale, chord progression, and repertoire drills.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-[var(--text-secondary)]">Logged Practice</p>
            <p className="font-mono-tabular text-lg font-bold text-[var(--text-primary)]">
              {practiceMinutes} min
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              addPracticeMinutes(5, 25);
              setSessionSaved(true);
              setTimeout(() => setSessionSaved(false), 3000);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2 text-xs font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] cursor-pointer"
          >
            {sessionSaved ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            {sessionSaved ? 'Logged +5 min!' : 'Log 5m Practice'}
          </button>
        </div>
      </div>

      {/* Metronome & Drill Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <MetronomeWidget initialBpm={76} />
        </div>

        <div className="lg:col-span-7 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
            <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-1">
              {(
                [
                  { id: 'scales', label: 'Scale Drill' },
                  { id: 'progressions', label: 'Chord Progression' },
                  { id: 'songs', label: 'Song Repertoire' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setDrillTab(t.id)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer',
                    drillTab === t.id
                      ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)]'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono-tabular text-xs">
              <span className="text-[var(--text-secondary)]">
                Accuracy: <strong className="text-[var(--accent-gold)]">{accuracy}%</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setHits(0);
                  setMisses(0);
                  setScaleStep(0);
                  setSongStep(0);
                }}
                className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>

          {drillTab === 'scales' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {SCALES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setScaleId(s.id);
                      setScaleStep(0);
                    }}
                    className={cn(
                      'rounded-md border px-3 py-1.5 text-xs font-semibold cursor-pointer',
                      scaleId === s.id
                        ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                    )}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--bg-subtle)] p-4">
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Target Key ({scaleStep + 1}/{activeScale.midiSample.length})
                  </p>
                  <p className="mt-0.5 font-mono-tabular text-xl font-bold text-[var(--accent-gold)]">
                    {getKeyByMidi(activeScale.midiSample[scaleStep])?.note} · Finger {activeScale.fingeringsRH[scaleStep]}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => pianoAudio.playSequence(activeScale.midiSample, 350)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-gold)] px-3.5 py-2 text-xs font-semibold text-[#12100E] cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" />
                  Hear Tempo Demo
                </button>
              </div>
            </div>
          )}

          {drillTab === 'progressions' && (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                Practice the classic I – vi – IV – V progression: click each chord step below, hear its voicing, and play the highlighted triad keys.
              </p>
              <div className="grid grid-cols-4 gap-2.5">
                {PROGRESSION_CHORDS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      setProgStep(idx);
                      pianoAudio.playChord(ch.midiNotes, 900);
                    }}
                    className={cn(
                      'rounded-lg border p-3 text-center cursor-pointer transition-colors',
                      progStep === idx
                        ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)]'
                    )}
                  >
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{ch.name}</p>
                    <p className="mt-1 font-mono-tabular text-[11px] text-[var(--accent-gold)]">
                      {ch.notes.join('–')}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {drillTab === 'songs' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {MELODIES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSongId(m.id);
                      setSongStep(0);
                    }}
                    className={cn(
                      'rounded-md border px-3 py-1.5 text-xs font-semibold cursor-pointer',
                      songId === m.id
                        ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                    )}
                  >
                    {m.title}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--bg-subtle)] p-4">
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {activeSong.title} · Recommended {activeSong.bpm} BPM ({activeSong.timeSignature})
                  </p>
                  <p className="mt-1 font-mono-tabular text-lg font-bold text-[var(--accent-gold)]">
                    Next: {activeSong.steps[songStep]?.note} (Step {songStep + 1}/{activeSong.steps.length})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    pianoAudio.playSequence(
                      activeSong.steps.map((s) => s.midi),
                      Math.round((60 / activeSong.bpm) * 650)
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-gold)] px-3.5 py-2 text-xs font-semibold text-[#12100E] cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" />
                  Play Reference
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Practice Keyboard */}
      <VirtualPiano88
        variant="full88"
        highlightedMidi={highlightedMidi}
        targetMidi={targetMidi}
        onNotePlay={handlePlay}
        defaultLabels="all"
      />
    </div>
  );
}
