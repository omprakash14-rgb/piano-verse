import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Volume2 } from 'lucide-react';
import { MODULE_LESSONS } from '@/src/data/lessons';
import { CHORDS, SCALES } from '@/src/data/piano-notes';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { NotationTheoryLab } from '@/src/components/lessons/NotationTheoryLab';
import { MetronomeWidget } from '@/src/components/lessons/MetronomeWidget';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { LessonQuizCard } from '@/src/components/lessons/LessonQuizCard';
import { cn } from '@/src/lib/utils';

export function LearnTheoryPage() {
  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const lessons = MODULE_LESSONS.filter((l) => l.moduleId === 'theory');
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const [selectedScaleId, setSelectedScaleId] = useState(SCALES[0].id);
  const [selectedChordId, setSelectedChordId] = useState(CHORDS[0].id);

  const activeLesson = lessons.find((l) => l.id === activeLessonId) ?? lessons[0];
  const activeScale = SCALES.find((s) => s.id === selectedScaleId) ?? SCALES[0];
  const activeChord = CHORDS.find((c) => c.id === selectedChordId) ?? CHORDS[0];

  const highlightedNotes =
    activeLesson.id === '4.5'
      ? activeChord.midiNotes
      : activeLesson.id === '4.4'
      ? activeScale.midiSample
      : [60, 62, 64, 65, 67, 69, 71, 72];

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Module 04 · Music Theory Fundamentals
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
            Notation, Durations, Rhythm, Scales & Chords
          </h1>
        </div>
        <Link
          to="/tutorials"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors"
        >
          Next: Structured Tutorials
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Lesson Tabs */}
      <div className="flex flex-wrap gap-2">
        {lessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);
          const isActive = lesson.id === activeLesson.id;
          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => setActiveLessonId(lesson.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap',
                isActive
                  ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)] font-semibold'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >
              {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
              <span>{lesson.numberLabel}: {lesson.title}</span>
            </button>
          );
        })}
      </div>

      {/* Lesson Narrative */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[var(--border-hairline)] pb-4">
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--accent-gold)]">{activeLesson.numberLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{activeLesson.durationMinutes} min</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">+{activeLesson.xpReward} XP</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--text-primary)]">
            {activeLesson.title}
          </h2>
          <p className="mt-1 text-base text-[var(--text-secondary)]">{activeLesson.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {activeLesson.sections.map((sec) => (
              <div key={sec.heading} className="space-y-3">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{sec.heading}</h3>
                {sec.body.map((p, i) => (
                  <p key={i} className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <aside className="lg:col-span-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-5 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
              Terminology
            </h4>
            <dl className="space-y-2.5 text-xs">
              {activeLesson.terminology.map((t) => (
                <div key={t.term}>
                  <dt className="font-semibold text-[var(--text-primary)]">{t.term}</dt>
                  <dd className="text-[var(--text-secondary)]">{t.definition}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>

      {/* Interactive Labs */}
      {(activeLesson.id === '4.1' || activeLesson.id === '4.2') && <NotationTheoryLab />}

      {activeLesson.id === '4.3' && <MetronomeWidget />}

      {/* Interactive Scale Explorer */}
      {activeLesson.id === '4.4' && (
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                Interactive Scale Highlighter
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Select a scale to highlight its notes on the keyboard and hear the step pattern.
              </p>
            </div>
            <button
              type="button"
              onClick={() => pianoAudio.playSequence(activeScale.midiSample, 340)}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2 text-xs font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] cursor-pointer"
            >
              <Volume2 className="h-4 w-4" />
              Play {activeScale.name} Scale
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {SCALES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedScaleId(s.id)}
                className={cn(
                  'rounded-lg border px-4 py-2 text-xs font-semibold cursor-pointer',
                  selectedScaleId === s.id
                    ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                )}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-lg bg-[var(--bg-subtle)] p-4 text-xs">
            <div>
              <span className="text-[var(--text-secondary)]">Pattern:</span>
              <p className="mt-1 font-mono-tabular font-semibold text-[var(--accent-gold)]">
                {activeScale.formula}
              </p>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Notes:</span>
              <p className="mt-1 font-mono-tabular font-semibold text-[var(--text-primary)]">
                {activeScale.notes.join(' – ')}
              </p>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Right-Hand Fingering:</span>
              <p className="mt-1 font-mono-tabular text-[var(--text-primary)]">
                {activeScale.fingeringsRH.join(' · ')}
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{activeScale.description}</p>
        </div>
      )}

      {/* Interactive Chord Explorer */}
      {activeLesson.id === '4.5' && (
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-5">
          <div>
            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              Interactive Triad Explorer (Click a Chord to Hear All Notes)
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Click any chord card below to sound all three notes together and view its shape on the keys.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CHORDS.map((ch) => {
              const isSelected = ch.id === activeChord.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setSelectedChordId(ch.id);
                    pianoAudio.playChord(ch.midiNotes, 1100);
                  }}
                  className={cn(
                    'rounded-xl border p-4 text-left transition-colors cursor-pointer',
                    isSelected
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)]'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{ch.name}</span>
                    <Volume2 className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
                  </div>
                  <p className="mt-1 font-mono-tabular text-xs font-semibold text-[var(--accent-gold)]">
                    {ch.notes.join(' – ')}
                  </p>
                  <p className="mt-1.5 text-[11px] text-[var(--text-secondary)]">{ch.mood}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Shared Theory Interactive Keyboard */}
      <VirtualPiano88
        variant="focused"
        midiRange={[53, 81]}
        highlightedMidi={highlightedNotes}
        defaultLabels="all"
      />

      <LessonQuizCard
        lessonId={activeLesson.id}
        xpReward={activeLesson.xpReward}
        questions={activeLesson.knowledgeCheck}
      />
    </div>
  );
}
