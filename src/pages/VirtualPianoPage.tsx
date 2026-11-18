import { useMemo, useState } from 'react';
import { CheckCircle2, Play, RotateCcw, Volume2 } from 'lucide-react';
import { CHORDS, MELODIES, SCALES, getKeyByMidi } from '@/src/data/piano-notes';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { PianoKeyData, VirtualPianoMode } from '@/src/types/academy';
import { cn } from '@/src/lib/utils';

const GUIDED_TARGETS = [60, 64, 67, 65, 69, 62, 71, 66, 70, 72];

const MODE_TABS: { id: VirtualPianoMode; label: string; description: string }[] = [
  { id: 'free', label: '1. Free Play', description: 'Explore all 88 keys freely with Grand, Electric, or Harpsichord voices.' },
  { id: 'guided-notes', label: '2. Guided Notes', description: 'Follow highlighted target keys one at a time to build keyboard fluency.' },
  { id: 'scale-practice', label: '3. Scale Practice', description: 'Highlight scale notes and step cleanly from root to octave.' },
  { id: 'chord-practice', label: '4. Chord Practice', description: 'Learn Major and Minor triads and press every tone in the chord.' },
  { id: 'melody-practice', label: '5. Melody Practice', description: 'Follow highlighted note sequences and finger cues to play real songs.' },
];

export function VirtualPianoPage() {
  const unlockBadge = useAcademyStore((s) => s.unlockBadge);
  const addPracticeMinutes = useAcademyStore((s) => s.addPracticeMinutes);

  const [mode, setMode] = useState<VirtualPianoMode>('free');
  const [recentHistory, setRecentHistory] = useState<string[]>([]);

  // Guided Notes state
  const [guidedIdx, setGuidedIdx] = useState(0);
  const [guidedHits, setGuidedHits] = useState(0);

  // Scale Practice state
  const [selectedScaleId, setSelectedScaleId] = useState(SCALES[0].id);
  const [scaleStep, setScaleStep] = useState(0);
  const [scaleDone, setScaleDone] = useState(false);

  // Chord Practice state
  const [selectedChordId, setSelectedChordId] = useState(CHORDS[0].id);
  const [chordFoundMidi, setChordFoundMidi] = useState<number[]>([]);

  // Melody Practice state
  const [selectedMelodyId, setSelectedMelodyId] = useState(MELODIES[1].id); // Ode to Joy default
  const [melodyStep, setMelodyStep] = useState(0);
  const [melodyDone, setMelodyDone] = useState(false);

  const [errorMidi, setErrorMidi] = useState<number[]>([]);

  const activeScale = SCALES.find((s) => s.id === selectedScaleId) ?? SCALES[0];
  const activeChord = CHORDS.find((c) => c.id === selectedChordId) ?? CHORDS[0];
  const activeMelody = MELODIES.find((m) => m.id === selectedMelodyId) ?? MELODIES[0];

  const handleNotePlay = (key: PianoKeyData) => {
    setRecentHistory((prev) => [key.note, ...prev].slice(0, 12));

    if (mode === 'guided-notes') {
      const target = GUIDED_TARGETS[guidedIdx];
      if (key.midi === target) {
        setGuidedHits((h) => h + 1);
        setGuidedIdx((i) => (i + 1) % GUIDED_TARGETS.length);
      } else {
        setErrorMidi([key.midi]);
        setTimeout(() => setErrorMidi([]), 320);
      }
      return;
    }

    if (mode === 'scale-practice' && !scaleDone) {
      const expected = activeScale.midiSample[scaleStep];
      if (key.midi === expected) {
        const next = scaleStep + 1;
        if (next >= activeScale.midiSample.length) {
          setScaleDone(true);
          unlockBadge('scale-master');
          addPracticeMinutes(2, 25);
        } else {
          setScaleStep(next);
        }
      } else {
        setErrorMidi([key.midi]);
        setTimeout(() => setErrorMidi([]), 320);
      }
      return;
    }

    if (mode === 'chord-practice') {
      if (activeChord.midiNotes.includes(key.midi)) {
        setChordFoundMidi((prev) => {
          if (prev.includes(key.midi)) return prev;
          const next = [...prev, key.midi];
          if (next.length === activeChord.midiNotes.length) {
            addPracticeMinutes(1, 15);
          }
          return next;
        });
      } else {
        setErrorMidi([key.midi]);
        setTimeout(() => setErrorMidi([]), 320);
      }
      return;
    }

    if (mode === 'melody-practice' && !melodyDone) {
      const expected = activeMelody.steps[melodyStep]?.midi;
      if (key.midi === expected) {
        const next = melodyStep + 1;
        if (next >= activeMelody.steps.length) {
          setMelodyDone(true);
          unlockBadge('first-song');
          addPracticeMinutes(3, 35);
        } else {
          setMelodyStep(next);
        }
      } else {
        setErrorMidi([key.midi]);
        setTimeout(() => setErrorMidi([]), 320);
      }
    }
  };

  const { highlightedMidi, targetMidi, matchedMidi } = useMemo(() => {
    if (mode === 'guided-notes') {
      return {
        highlightedMidi: [],
        targetMidi: [GUIDED_TARGETS[guidedIdx]],
        matchedMidi: [],
      };
    }
    if (mode === 'scale-practice') {
      return {
        highlightedMidi: activeScale.midiSample,
        targetMidi: scaleDone ? [] : [activeScale.midiSample[scaleStep]],
        matchedMidi: activeScale.midiSample.slice(0, scaleDone ? activeScale.midiSample.length : scaleStep),
      };
    }
    if (mode === 'chord-practice') {
      return {
        highlightedMidi: activeChord.midiNotes,
        targetMidi: activeChord.midiNotes.filter((m) => !chordFoundMidi.includes(m)),
        matchedMidi: chordFoundMidi,
      };
    }
    if (mode === 'melody-practice') {
      const stepObj = activeMelody.steps[melodyStep];
      return {
        highlightedMidi: activeMelody.steps.map((s) => s.midi),
        targetMidi: melodyDone || !stepObj ? [] : [stepObj.midi],
        matchedMidi: melodyDone ? activeMelody.steps.map((s) => s.midi) : [],
      };
    }
    return { highlightedMidi: [], targetMidi: [], matchedMidi: [] };
  }, [
    mode,
    guidedIdx,
    activeScale,
    scaleStep,
    scaleDone,
    activeChord,
    chordFoundMidi,
    activeMelody,
    melodyStep,
    melodyDone,
  ]);

  const currentModeInfo = MODE_TABS.find((m) => m.id === mode) ?? MODE_TABS[0];

  return (
    <div className="mx-auto max-w-[1380px] px-5 py-10 md:px-8 space-y-8">
      <div className="border-b border-[var(--border-hairline)] pb-6">
        <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
          Module 05 · Interactive Digital Instrument Studio
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
          88-Key Virtual Piano
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Use mouse, touch, or your computer keyboard (A–L white keys, W/E/T/Y/U black keys, Spacebar for sustain, Z/X to shift octave).
        </p>
      </div>

      {/* 5 Learning Mode Selector */}
      <div className="flex flex-wrap gap-2">
        {MODE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setMode(tab.id);
              setErrorMidi([]);
            }}
            className={cn(
              'rounded-lg border px-4 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap',
              mode === tab.id
                ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[#12100E]'
                : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Mode Context Panel */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              {currentModeInfo.label}
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-[var(--text-secondary)]">
              {currentModeInfo.description}
            </p>
          </div>

          {mode === 'free' && recentHistory.length > 0 && (
            <div className="text-xs text-[var(--text-secondary)] font-mono-tabular">
              Recent notes: <span className="text-[var(--text-primary)] font-semibold">{recentHistory.join(' · ')}</span>
            </div>
          )}

          {mode === 'guided-notes' && (
            <div className="flex items-center gap-4 text-sm">
              <span className="font-mono-tabular text-[var(--accent-gold)] font-semibold">
                Play Target: {getKeyByMidi(GUIDED_TARGETS[guidedIdx])?.note}
              </span>
              <span className="font-mono-tabular text-xs text-[var(--text-secondary)]">
                Matched: {guidedHits}
              </span>
            </div>
          )}
        </div>

        {/* Scale Controls */}
        {mode === 'scale-practice' && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-4">
            <div className="flex flex-wrap gap-2">
              {SCALES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedScaleId(s.id);
                    setScaleStep(0);
                    setScaleDone(false);
                  }}
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-xs font-semibold cursor-pointer',
                    selectedScaleId === s.id
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {scaleDone ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  {activeScale.name} Scale Completed!
                </span>
              ) : (
                <span className="font-mono-tabular text-xs text-[var(--text-primary)]">
                  Next Note: <strong>{getKeyByMidi(activeScale.midiSample[scaleStep])?.note}</strong> ({scaleStep + 1}/{activeScale.midiSample.length})
                </span>
              )}
              <button
                type="button"
                onClick={() => pianoAudio.playSequence(activeScale.midiSample, 340)}
                className="inline-flex items-center gap-1.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-hairline)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
                Hear Scale
              </button>
              <button
                type="button"
                onClick={() => {
                  setScaleStep(0);
                  setScaleDone(false);
                }}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Chord Controls */}
        {mode === 'chord-practice' && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-4">
            <div className="flex flex-wrap gap-2">
              {CHORDS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setSelectedChordId(ch.id);
                    setChordFoundMidi([]);
                    pianoAudio.playChord(ch.midiNotes, 900);
                  }}
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-xs font-semibold cursor-pointer',
                    selectedChordId === ch.id
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                  )}
                >
                  {ch.name} ({ch.notes.join('–')})
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {chordFoundMidi.length === activeChord.midiNotes.length ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  {activeChord.name} Triad Mastered!
                </span>
              ) : (
                <span className="text-xs text-[var(--text-secondary)]">
                  Press all 3 highlighted keys ({chordFoundMidi.length}/3)
                </span>
              )}
              <button
                type="button"
                onClick={() => pianoAudio.playChord(activeChord.midiNotes, 1000)}
                className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent-gold)] px-3 py-1.5 text-xs font-semibold text-[#12100E] cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" />
                Hear Triad
              </button>
            </div>
          </div>
        )}

        {/* Melody Controls */}
        {mode === 'melody-practice' && (
          <div className="space-y-3 border-t border-[var(--border-hairline)] pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {MELODIES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMelodyId(m.id);
                      setMelodyStep(0);
                      setMelodyDone(false);
                    }}
                    className={cn(
                      'rounded-md border px-3 py-1.5 text-xs font-semibold cursor-pointer',
                      selectedMelodyId === m.id
                        ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                    )}
                  >
                    {m.title}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    pianoAudio.playSequence(
                      activeMelody.steps.map((s) => s.midi),
                      Math.round((60 / activeMelody.bpm) * 650)
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent-gold)] px-3 py-1.5 text-xs font-semibold text-[#12100E] cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" />
                  Listen to Melody
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMelodyStep(0);
                    setMelodyDone(false);
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Restart
                </button>
              </div>
            </div>

            {/* Step Notation Strip */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[var(--bg-subtle)] p-3">
              {activeMelody.steps.map((s, idx) => {
                const isDoneStep = melodyDone || idx < melodyStep;
                const isCurrent = !melodyDone && idx === melodyStep;
                return (
                  <div
                    key={`${s.note}-${idx}`}
                    className={cn(
                      'rounded px-2.5 py-1 font-mono-tabular text-xs font-semibold transition-colors',
                      isCurrent
                        ? 'bg-[var(--accent-gold)] text-[#12100E]'
                        : isDoneStep
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                    )}
                  >
                    {s.note}
                    {s.finger ? ` (${s.finger})` : ''}
                  </div>
                );
              })}
              {melodyDone && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Melody Completed!
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Full 88-Key Scrollable Piano */}
      <VirtualPiano88
        variant="full88"
        highlightedMidi={highlightedMidi}
        targetMidi={targetMidi}
        matchedMidi={matchedMidi}
        errorMidi={errorMidi}
        onNotePlay={handleNotePlay}
        defaultLabels="c-only"
      />
    </div>
  );
}
