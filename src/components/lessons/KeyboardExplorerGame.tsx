import { useState } from 'react';
import { CheckCircle2, AlertCircle, Target, RotateCcw } from 'lucide-react';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { PianoKeyData } from '@/src/types/academy';
import { cn } from '@/src/lib/utils';

interface ChallengeTarget {
  id: string;
  prompt: string;
  hint: string;
  targetMidi: number;
  allowAnyOctave: boolean;
}

const CHALLENGES: ChallengeTarget[] = [
  {
    id: 'find-middle-c',
    prompt: 'Find the Middle C (C4) key.',
    hint: 'Locate the 2-black-key cluster near the center of the keyboard. Middle C is the white key immediately to its left.',
    targetMidi: 60,
    allowAnyOctave: false,
  },
  {
    id: 'find-f',
    prompt: 'Find any F key on the keyboard.',
    hint: 'Look for a group of 3 black keys. F is always the white key immediately to the left of those 3 black keys.',
    targetMidi: 65,
    allowAnyOctave: true,
  },
  {
    id: 'find-f-sharp',
    prompt: 'Find F#4 (F sharp, or Gb4) in octave 4.',
    hint: 'Start on F4 (left of the central 3-black-key group) and press the black key one half step to the right.',
    targetMidi: 66,
    allowAnyOctave: false,
  },
  {
    id: 'find-g',
    prompt: 'Find any G key on the keyboard.',
    hint: 'G sits directly inside a 3-black-key group, between the first and second black keys.',
    targetMidi: 67,
    allowAnyOctave: true,
  },
  {
    id: 'find-c5',
    prompt: 'Find C5 — one octave above Middle C.',
    hint: 'Move eight white keys to the right of C4 to the next pair of 2 black keys.',
    targetMidi: 72,
    allowAnyOctave: false,
  },
];

export function KeyboardExplorerGame() {
  const unlockBadge = useAcademyStore((s) => s.unlockBadge);
  const [index, setIndex] = useState(0);
  const [misses, setMisses] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'correct' | 'wrong'; message: string }>({
    status: 'idle',
    message: 'Click the requested key on the interactive keyboard below.',
  });
  const [matchedMidi, setMatchedMidi] = useState<number[]>([]);
  const [errorMidi, setErrorMidi] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const current = CHALLENGES[index];
  const revealTarget = misses >= 2;

  const handleKeyPress = (key: PianoKeyData) => {
    if (completed) return;

    const targetPitchClass = current.targetMidi % 12;
    const isHit = current.allowAnyOctave
      ? key.midi % 12 === targetPitchClass
      : key.midi === current.targetMidi;

    if (isHit) {
      setMatchedMidi([key.midi]);
      setErrorMidi([]);
      const nextScore = score + 1;
      setScore(nextScore);
      setFeedback({
        status: 'correct',
        message: `Correct! You found ${key.note}${key.enharmonic ? ` (${key.enharmonic}${key.octave})` : ''}.`,
      });

      setTimeout(() => {
        setMatchedMidi([]);
        if (index + 1 >= CHALLENGES.length) {
          setCompleted(true);
          unlockBadge('keyboard-explorer');
        } else {
          setIndex((i) => i + 1);
          setMisses(0);
          setFeedback({
            status: 'idle',
            message: 'Click the requested key on the interactive keyboard below.',
          });
        }
      }, 900);
    } else {
      const nextMisses = misses + 1;
      setMisses(nextMisses);
      setErrorMidi([key.midi]);
      setTimeout(() => setErrorMidi([]), 450);

      setFeedback({
        status: 'wrong',
        message:
          nextMisses >= 2
            ? `You pressed ${key.note}. We highlighted the target key in gold—click it to continue.`
            : `You pressed ${key.note}. Gentle hint: ${current.hint}`,
      });
    }
  };

  const handleReset = () => {
    setIndex(0);
    setMisses(0);
    setScore(0);
    setCompleted(false);
    setMatchedMidi([]);
    setErrorMidi([]);
    setFeedback({
      status: 'idle',
      message: 'Click the requested key on the interactive keyboard below.',
    });
  };

  return (
    <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-gold)]">
            <Target className="h-4 w-4" />
            <span>Interactive Keyboard Identification Activity</span>
          </div>
          <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--text-primary)]">
            {completed ? 'All Keyboard Landmarks Found!' : current.prompt}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] font-mono-tabular">
          <span>
            Challenge {Math.min(index + 1, CHALLENGES.length)} / {CHALLENGES.length}
          </span>
          <span>Score: {score}</span>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-1.5 font-sans font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface)] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      <div
        className={cn(
          'flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm',
          feedback.status === 'correct'
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
            : feedback.status === 'wrong'
            ? 'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300'
            : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
        )}
      >
        {feedback.status === 'correct' ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
        ) : feedback.status === 'wrong' ? (
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
        ) : null}
        <span>{completed ? 'Great ear and visual recognition! You unlocked the Keyboard Explorer badge.' : feedback.message}</span>
      </div>

      <VirtualPiano88
        variant="focused"
        midiRange={[48, 76]}
        defaultLabels="none"
        targetMidi={!completed && revealTarget ? [current.targetMidi] : []}
        matchedMidi={matchedMidi}
        errorMidi={errorMidi}
        onNotePlay={handleKeyPress}
        compactControls
      />
    </div>
  );
}
