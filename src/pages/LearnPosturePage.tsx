import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MODULE_LESSONS } from '@/src/data/lessons';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { PostureAndHandLab } from '@/src/components/lessons/PostureAndHandLab';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { LessonQuizCard } from '@/src/components/lessons/LessonQuizCard';
import { cn } from '@/src/lib/utils';

export function LearnPosturePage() {
  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const lessons = MODULE_LESSONS.filter((l) => l.moduleId === 'posture');
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);

  const activeLesson = lessons.find((l) => l.id === activeLessonId) ?? lessons[0];

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Module 03 · Posture & Playing Techniques
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
            Sitting Alignment, Curved Hands & Finger Numbering
          </h1>
        </div>
        <Link
          to="/learn/theory"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
        >
          Next: Module 4 (Theory)
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
              Lesson Objectives
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              {activeLesson.objectives.map((o) => (
                <li key={o}>· {o}</li>
              ))}
            </ul>
            <p className="border-t border-[var(--border-hairline)] pt-3 text-xs text-[var(--text-primary)]">
              <strong>Summary:</strong> {activeLesson.summary}
            </p>
          </aside>
        </div>
      </div>

      {/* Interactive Posture, Hand Shape & Finger Numbering Lab */}
      <PostureAndHandLab />

      {/* Practice Five-Finger Exercise */}
      <div className="space-y-3">
        <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          Five-Finger Technique Practice (C4–G4 Highlighted)
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Place fingers 1–5 over the gold-highlighted keys C4–D4–E4–F4–G4 and practice playing smoothly one note at a time.
        </p>
        <VirtualPiano88
          variant="focused"
          midiRange={[48, 72]}
          highlightedMidi={[60, 62, 64, 65, 67]}
          defaultLabels="all"
        />
      </div>

      <LessonQuizCard
        lessonId={activeLesson.id}
        xpReward={activeLesson.xpReward}
        questions={activeLesson.knowledgeCheck}
      />
    </div>
  );
}
