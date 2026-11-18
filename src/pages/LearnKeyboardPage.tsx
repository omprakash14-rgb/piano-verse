import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Volume2 } from 'lucide-react';
import { MODULE_LESSONS } from '@/src/data/lessons';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { KeyboardExplorerGame } from '@/src/components/lessons/KeyboardExplorerGame';
import { LessonQuizCard } from '@/src/components/lessons/LessonQuizCard';
import { cn } from '@/src/lib/utils';

export function LearnKeyboardPage() {
  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const lessons = MODULE_LESSONS.filter((l) => l.moduleId === 'keyboard');
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const [octaveMidi, setOctaveMidi] = useState(60); // Middle C default
  const [intervalDemo, setIntervalDemo] = useState<'half' | 'whole'>('half');

  const activeLesson = lessons.find((l) => l.id === activeLessonId) ?? lessons[0];

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Module 02 · Understand the Piano Keyboard
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
            Keyboard Structure, Notes, Sharps & Octaves
          </h1>
        </div>
        <Link
          to="/learn/posture"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
        >
          Next: Module 3 (Posture)
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

      {/* Lesson Explanation Card */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-6">
        <div className="border-b border-[var(--border-hairline)] pb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
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
          <div className="lg:col-span-8 space-y-5">
            {activeLesson.sections.map((sec) => (
              <div key={sec.heading} className="space-y-3">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{sec.heading}</h3>
                {sec.body.map((p, i) => (
                  <p key={i} className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                    {p}
                  </p>
                ))}
                {sec.keyTakeaway && (
                  <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 text-sm text-[var(--text-primary)]">
                    <strong>Key Takeaway:</strong> {sec.keyTakeaway}
                  </div>
                )}
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-5">
              <h4 className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
                Lesson Objectives
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
                {activeLesson.objectives.map((o) => (
                  <li key={o}>· {o}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-5">
              <h4 className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
                Key Terms
              </h4>
              <dl className="mt-3 space-y-2.5 text-xs">
                {activeLesson.terminology.map((t) => (
                  <div key={t.term}>
                    <dt className="font-semibold text-[var(--text-primary)]">{t.term}</dt>
                    <dd className="text-[var(--text-secondary)]">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        {/* Interactive Lab per Lesson */}
        {activeLesson.id === '2.3' && (
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                  Half-Step vs. Whole-Step Visual Demonstration
                </h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  Compare C4 → C#4 (1 half-step) vs. C4 → D4 (1 whole step = 2 half-steps).
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIntervalDemo('half');
                    pianoAudio.playSequence([60, 61], 420);
                  }}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold cursor-pointer',
                    intervalDemo === 'half'
                      ? 'bg-[var(--accent-gold)] text-[#12100E]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)]'
                  )}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  Half Step (C4 → C#4 / Db4)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIntervalDemo('whole');
                    pianoAudio.playSequence([60, 62], 420);
                  }}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold cursor-pointer',
                    intervalDemo === 'whole'
                      ? 'bg-[var(--accent-gold)] text-[#12100E]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-hairline)]'
                  )}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  Whole Step (C4 → D4)
                </button>
              </div>
            </div>
            <VirtualPiano88
              variant="focused"
              midiRange={[58, 72]}
              highlightedMidi={intervalDemo === 'half' ? [60, 61] : [60, 62]}
              defaultLabels="all"
              compactControls
              enableKeyboardInput={false}
            />
          </div>
        )}

        {activeLesson.id === '2.4' && (
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-5 space-y-4">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              Octave Pitch Comparison — Click Any C Across the Piano
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { label: 'C2 (Deep Bass)', midi: 36, hz: '65.41 Hz' },
                { label: 'C3 (Low Bass)', midi: 48, hz: '130.81 Hz' },
                { label: 'C4 (Middle C)', midi: 60, hz: '261.63 Hz' },
                { label: 'C5 (Treble)', midi: 72, hz: '523.25 Hz' },
                { label: 'C6 (High Treble)', midi: 84, hz: '1046.50 Hz' },
              ].map((oct) => (
                <button
                  key={oct.midi}
                  type="button"
                  onClick={() => {
                    setOctaveMidi(oct.midi);
                    pianoAudio.playQuickNote(oct.midi, 700);
                  }}
                  className={cn(
                    'rounded-lg border p-3 text-left transition-colors cursor-pointer',
                    octaveMidi === oct.midi
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]'
                  )}
                >
                  <p className="text-xs font-semibold text-[var(--text-primary)]">{oct.label}</p>
                  <p className="mt-1 font-mono-tabular text-[11px] text-[var(--accent-gold)]">
                    {oct.hz}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full Interactive 88-Key Exploration */}
      <div className="space-y-3">
        <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          Interactive 88-Key Explorer (52 White · 36 Black)
        </h3>
        <VirtualPiano88
          variant="full88"
          defaultLabels="all"
          highlightedMidi={activeLesson.id === '2.2' ? [24, 36, 48, 60, 72, 84, 96] : [octaveMidi]}
        />
      </div>

      {/* Keyboard Identification Game */}
      <KeyboardExplorerGame />

      <LessonQuizCard
        lessonId={activeLesson.id}
        xpReward={activeLesson.xpReward}
        questions={activeLesson.knowledgeCheck}
      />
    </div>
  );
}
