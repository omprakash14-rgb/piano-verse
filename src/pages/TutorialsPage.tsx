import { useState } from 'react';
import { CheckCircle2, Play, RotateCcw, UserCheck, Volume2 } from 'lucide-react';
import { TUTORIAL_CHAPTERS } from '@/src/data/tutorials';
import { getKeyByMidi } from '@/src/data/piano-notes';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { LessonQuizCard } from '@/src/components/lessons/LessonQuizCard';
import { PianoKeyData } from '@/src/types/academy';
import { cn } from '@/src/lib/utils';

export function TutorialsPage() {
  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const [activeChapterId, setActiveChapterId] = useState(TUTORIAL_CHAPTERS[0].id);

  // Interactive exercise progress state per chapter
  const [exerciseStep, setExerciseStep] = useState(0);
  const [chordHits, setChordHits] = useState<number[]>([]);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [demoHighlightMidi, setDemoHighlightMidi] = useState<number[]>([]);
  const [checkedPractice, setCheckedPractice] = useState<Record<string, boolean>>({});

  const chapter =
    TUTORIAL_CHAPTERS.find((c) => c.id === activeChapterId) ?? TUTORIAL_CHAPTERS[0];

  const selectChapter = (id: string) => {
    setActiveChapterId(id);
    setExerciseStep(0);
    setChordHits([]);
    setExerciseCompleted(false);
    setDemoHighlightMidi([]);
  };

  const runVisualDemo = async () => {
    await pianoAudio.playSequence(chapter.visualDemoNotes, 340, (_, midi) => {
      setDemoHighlightMidi([midi]);
    });
    setDemoHighlightMidi([]);
  };

  const handleExercisePlay = (key: PianoKeyData) => {
    if (exerciseCompleted) return;
    const ex = chapter.interactiveExercise;

    if (ex.mode === 'chord') {
      if (ex.targetNotes.includes(key.midi)) {
        setChordHits((prev) => {
          if (prev.includes(key.midi)) return prev;
          const next = [...prev, key.midi];
          if (next.length === ex.targetNotes.length) {
            setExerciseCompleted(true);
          }
          return next;
        });
      }
      return;
    }

    const target = ex.targetNotes[exerciseStep];
    if (key.midi === target) {
      if (exerciseStep + 1 >= ex.targetNotes.length) {
        setExerciseCompleted(true);
      } else {
        setExerciseStep((s) => s + 1);
      }
    }
  };

  const targetMidi = exerciseCompleted
    ? []
    : chapter.interactiveExercise.mode === 'chord'
    ? chapter.interactiveExercise.targetNotes.filter((n) => !chordHits.includes(n))
    : [chapter.interactiveExercise.targetNotes[exerciseStep]];

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-8">
      <div className="border-b border-[var(--border-hairline)] pb-6">
        <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
          Module 06 · Guided Piano Classroom
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
          Structured Beginner Piano Tutorials (Chapters 1–6)
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Every chapter simulates a conservatory lesson with objectives, instructor demonstrations, interactive keyboard drills, guided & solo practice, and a knowledge check.
        </p>
      </div>

      {/* Chapter Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {TUTORIAL_CHAPTERS.map((ch) => {
          const isDone = completedLessons.includes(ch.id);
          const isActive = ch.id === chapter.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => selectChapter(ch.id)}
              className={cn(
                'rounded-xl border p-3.5 text-left transition-colors cursor-pointer',
                isActive
                  ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)]'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)]'
              )}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono-tabular font-semibold text-[var(--accent-gold)]">
                  Ch. {ch.chapterNumber}
                </span>
                {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
              </div>
              <p className="mt-1 text-xs font-semibold text-[var(--text-primary)] line-clamp-2">
                {ch.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Instructor Classroom Container */}
      <div className="space-y-8">
        {/* 1. Objectives & 2. Teacher-Style Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[var(--accent-gold)] font-semibold">
                  <UserCheck className="h-4 w-4" />
                  <span>{chapter.teacherPersona}</span>
                </div>
                <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--text-primary)]">
                  Chapter {chapter.chapterNumber}: {chapter.title}
                </h2>
              </div>
              <span className="font-mono-tabular text-xs text-[var(--text-secondary)]">
                {chapter.durationMinutes} min · +{chapter.xpReward} XP
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Teacher Explanation
              </h3>
              {chapter.teacherExplanation.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  {para}
                </p>
              ))}
            </div>

            {/* 3. Visual & Audio Demonstration */}
            <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[var(--accent-gold)]">
                  Visual & Audio Demonstration
                </p>
                <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                  {chapter.visualDemoLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={runVisualDemo}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2 text-xs font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] cursor-pointer whitespace-nowrap"
              >
                <Volume2 className="h-4 w-4" />
                Play Teacher Demo
              </button>
            </div>
          </div>

          {/* 1. Lesson Objectives & 7. Summary */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
                1. Lesson Objectives
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-[var(--text-secondary)]">
                {chapter.objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)] shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
                Lesson Summary
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {chapter.summary}
              </p>
            </div>
          </aside>
        </div>

        {/* 4. Interactive Piano Exercise */}
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--accent-gold)]">
                Interactive Piano Exercise
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--text-primary)]">
                {chapter.interactiveExercise.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {chapter.interactiveExercise.instruction}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {exerciseCompleted ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Exercise Complete!
                </span>
              ) : (
                <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-gold)]">
                  {chapter.interactiveExercise.mode === 'chord'
                    ? `Matched ${chordHits.length} / ${chapter.interactiveExercise.targetNotes.length}`
                    : `Next: ${getKeyByMidi(chapter.interactiveExercise.targetNotes[exerciseStep])?.note} (${exerciseStep + 1}/${chapter.interactiveExercise.targetNotes.length})`}
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setExerciseStep(0);
                  setChordHits([]);
                  setExerciseCompleted(false);
                }}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>

          <VirtualPiano88
            variant="focused"
            midiRange={[48, 76]}
            highlightedMidi={demoHighlightMidi}
            targetMidi={targetMidi}
            matchedMidi={
              chapter.interactiveExercise.mode === 'chord'
                ? chordHits
                : exerciseCompleted
                ? chapter.interactiveExercise.targetNotes
                : chapter.interactiveExercise.targetNotes.slice(0, exerciseStep)
            }
            onNotePlay={handleExercisePlay}
            defaultLabels="all"
          />
        </div>

        {/* 5. Guided Practice & 6. Independent Practice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--accent-gold)]">Guided Practice</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--text-primary)]">
                  {chapter.guidedPractice.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => pianoAudio.playSequence(chapter.visualDemoNotes, 420)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-gold)] cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
                Play Guide
              </button>
            </div>
            <ol className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              {chapter.guidedPractice.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-gold)] mt-0.5">
                    0{i + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
            <div>
              <p className="text-xs font-semibold text-[var(--accent-gold)]">Independent Practice</p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--text-primary)]">
                {chapter.independentPractice.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {chapter.independentPractice.prompt}
              </p>
            </div>
            <div className="space-y-2.5 pt-2">
              {chapter.independentPractice.checklist.map((item) => {
                const key = `${chapter.id}-${item}`;
                const checked = !!checkedPractice[key];
                return (
                  <label
                    key={key}
                    className="flex items-start gap-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-3 text-xs text-[var(--text-primary)] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setCheckedPractice((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                      className="mt-0.5 accent-[var(--accent-gold)] cursor-pointer"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* 8. Short Knowledge Check */}
        <LessonQuizCard
          lessonId={chapter.id}
          xpReward={chapter.xpReward}
          questions={chapter.knowledgeCheck}
        />
      </div>
    </div>
  );
}
